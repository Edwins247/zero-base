import Component from "./Component.js";
import { store } from "../utils/store.js";
import { fetchNews } from "../utils/api.js";
import { cacheNews, getCachedNews } from "../utils/cache.js";
import escapeHTML from "../utils/escapeHTML.js";


export default class NewsList extends Component {
  constructor(element) {
    super(element);

    this.articles = [];
    this.loading = false;
    this.hasMore = true;

    store.subscribe(this);

    this.loadNews();

    this.setupIntersectionObserver();
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
    const { category, page } = store.state;

    const cached = getCachedNews(category, page);
    if (cached) {
      if (page === 1) {
        this.articles = cached.articles;
      } else {
        this.articles = [...this.articles, ...cached.articles];
      }
      this.hasMore = cached.articles.length > 0;
      this.render();
      return;
    }

    try {
      this.loading = true;
      this.render(); 

      const response = await fetchNews(category, page);
      cacheNews(category, page, response);

      if (page === 1) {
        this.articles = response.articles;
      } else {
        this.articles = [...this.articles, ...response.articles];
      }

      this.hasMore = response.articles.length > 0;
    } catch (error) {
      console.error("뉴스를 불러오던 중 에러가 발생했습니다:", error);
    } finally {
      this.loading = false;
      this.render();
    }
  }

  loadMoreNews() {
    if (!this.loading && this.hasMore) {
      console.log("현재 페이지: ", store.state.page);
      store.state.page += 1;
    } else {
      console.log(
        "더 이상 불러올 뉴스가 없습니다.",
      );
    }
  }

  update(data) {
    console.log("뉴스 목록 업데이트:", data);

    if (data.property === "category") {
      this.articles = [];
      this.hasMore = true;
      this.loadNews();
    }
    else if (data.property === "page") {
      this.loadNews();
    }
    else if (data.property === undefined) {
      this.loadNews();
    }
  }

  observeLastItem() {
    if (this.observedElement && this.observer) {
      this.observer.unobserve(this.observedElement);
      this.observedElement = null;
    }

    const scrollObserver = this.element.querySelector(".scroll-observer");

    if (scrollObserver && this.observer) {
      this.observer.observe(scrollObserver);
      this.observedElement = scrollObserver;
      console.log("Scroll Observer 관찰 시작");
    }
  }

  render() {
    const defaultImage =
      "data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";

    const existingContainer = this.element.querySelector(
      ".news-list-container"
    );
    if (existingContainer) {
      existingContainer.remove();
    }

    const container = document.createElement("div");
    container.className = "news-list-container";

    let html = "";

    if (this.articles.length > 0) {
      html += '<article class="news-list">';

      this.articles.forEach((article) => {
        html += `
          <section class="news-item">
            <div class="thumbnail">
              <a href="${
                escapeHTML(article.url)
              }" target="_blank" rel="noopener noreferrer">
                <img src="${
                  escapeHTML(article.urlToImage || defaultImage)
                }" alt="thumbnail">
              </a>
            </div>
            <div class="contents">
              <h2>
                <a href="${
                  escapeHTML(article.url)
                }" target="_blank" rel="noopener noreferrer">
                  ${escapeHTML(article.title)}
                </a>
              </h2>
              <p>${escapeHTML(article.description || "")}</p>
            </div>
          </section>
        `;
      });

      html += "</article>";
    }

    html += `
    <div class="scroll-observer">
      <div class="loading-spinner" ${
        !this.loading ? 'style="display:none;"' : ""
      }></div>
    </div>
  `;

    container.innerHTML = html;

    this.element.appendChild(container);

    this.observeLastItem();
  }
}
