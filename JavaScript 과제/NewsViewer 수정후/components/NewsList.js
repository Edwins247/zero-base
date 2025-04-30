import Component from "./Component.js";
import { store } from "../utils/store.js";
import { fetchNews } from "../utils/api.js";
import { cacheNews, getCachedNews } from "../utils/cache.js";
import escapeHTML from "../utils/escapeHTML.js";

export default class NewsList extends Component {
  constructor(element) {
    super(element);
    this.articles = [];
    this.hasMore = true;
    this.loading = false;
    this.observer = null;
    this.observedElement = null;
    this.errorMessage = "";
    store.subscribe(this);
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.loadNews();
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.loading && this.hasMore) {
            this.loadMoreNews();
          }
        });
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      }
    );
  }

  async loadNews() {
    const { category, page, isChangeCategory } = store.state;

    try {
      const cachedData = this.checkCache(category, page, isChangeCategory);
      if (cachedData) return;

      this.setLoading(true);
      const response = await this.fetchAndCacheNews(category, page);
      this.processNewsData(response, isChangeCategory);
    } catch (error) {
      this.handleError(error);
    } finally {
      this.setLoading(false);
      this.cleanupAfterLoad(isChangeCategory);
    }
  }

  checkCache(category, page, isChangeCategory) {
    const cached = getCachedNews(category, page);
    if (!cached) return false;

    this.processNewsData(cached, isChangeCategory);
    return true;
  }

  async fetchAndCacheNews(category, page) {
    const response = await fetchNews(category, page);
    cacheNews(category, page, response);
    return response;
  }

  processNewsData(data, isChangeCategory) {
    this.errorMessage = "";
    this.articles = isChangeCategory
      ? data.articles
      : [...this.articles, ...data.articles];

    this.hasMore = data.articles.length > 0;
    this.render();
  }

  loadMoreNews() {
    if (!this.loading && this.hasMore) {
      console.log("현재 페이지: ", store.state.page);
      store.state.page += 1;
    }
  }

  setLoading(state) {
    this.loading = state;
    this.render();
  }

  handleError(error) {
    console.error("뉴스를 불러오던 중 에러가 발생했습니다:", error);
    this.showErrorMessage(
      "뉴스를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
    );
    this.hasMore = false;
    this.loading = false;
    this.render();
  }

  showErrorMessage(message) {
    this.errorMessage = message;
    this.render();
  }

  update(data) {
    console.log("뉴스 목록 업데이트:", data);
    if (data.property === "category") this.handleCategoryChange();
    if (data.property === "page") this.loadNews();
    if (data.property === undefined) this.loadNews();
  }

  handleCategoryChange() {
    this.articles = [];
    this.hasMore = true;
    this.loadNews();
  }

  render() {
    this.clearExistingElements(".news-list-container, .error-message");

    if (this.errorMessage) {
      const errorContainer = document.createElement("div");
      errorContainer.className = "error-message";
      errorContainer.textContent = this.errorMessage;
      this.element.appendChild(errorContainer);
    }

    const container = document.createElement("div");
    container.className = "news-list-container";
    container.innerHTML = this.generateHTML();

    this.element.appendChild(container);
    this.setupScrollObserver();
  }

  generateHTML() {
    const defaultImage =
      "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

    return `
      ${this.articles.length ? this.generateArticleHTML(defaultImage) : ""}
      ${this.generateLoaderHTML()}
    `;
  }

  generateArticleHTML(defaultImage) {
    return `
      <article class="news-list">
        ${this.articles
          .map(
            (article) => `
          <section class="news-item">
            ${this.generateThumbnailHTML(article, defaultImage)}
            ${this.generateContentHTML(article)}
          </section>
        `
          )
          .join("")}
      </article>
    `;
  }

  generateThumbnailHTML(article, defaultImage) {
    return `
      <div class="thumbnail">
        <a href="${escapeHTML(
          article.url
        )}" target="_blank" rel="noopener noreferrer">
          <img src="${escapeHTML(
            article.urlToImage || defaultImage
          )}" alt="thumbnail">
        </a>
      </div>
    `;
  }

  generateContentHTML(article) {
    return `
      <div class="contents">
        <h2>
          <a href="${escapeHTML(
            article.url
          )}" target="_blank" rel="noopener noreferrer">
            ${escapeHTML(article.title)}
          </a>
        </h2>
        <p>${escapeHTML(article.description || "")}</p>
      </div>
    `;
  }

  generateLoaderHTML() {
    return `
      <div class="scroll-observer">
        <div class="loading-spinner" ${
          !this.loading ? 'style="display:none;"' : ""
        }></div>
      </div>
    `;
  }

  clearExistingElements(selector) {
    const elements = this.element.querySelectorAll(selector);
    elements.forEach((element) => element.remove());
  }

  setupScrollObserver() {
    const scrollObserver = this.element.querySelector(".scroll-observer");
    if (this.observer) {
      if (this.observedElement) this.observer.unobserve(this.observedElement);
      if (scrollObserver) this.observer.observe(scrollObserver);
      this.observedElement = scrollObserver;
    }
  }

  cleanupAfterLoad(isChangeCategory) {
    if (isChangeCategory) {
      store.state.isChangeCategory = false;
    }
  }
}
