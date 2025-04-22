import Component from "./Component.js";
import { store } from "../utils/store.js";

export default class Nav extends Component {
  constructor(element) {
    super(element);

    this.categories = [
      { name: "전체보기", value: "all" },
      { name: "비즈니스", value: "business" },
      { name: "엔터테인먼트", value: "entertainment" },
      { name: "건강", value: "health" },
      { name: "과학", value: "science" },
      { name: "스포츠", value: "sports" },
      { name: "기술", value: "technology" },
    ];

    store.subscribe(this);
  }

  bindEvents() {
    this.navElement = this.element.querySelector("nav");
    if (this.navElement) {
      this.navElement.addEventListener(
        "click",
        this.handleCategoryClick.bind(this)
      );
    }
  }

  handleCategoryClick(event) {
    const target = event.target;

    if (target.classList.contains("category-item")) {
      const category = target.id;
      console.log("카테고리 클릭: ", category);

      if (category === store.state.category) return;
      

      store.state.category = category;

      store.state.page = 1;
    }
  }

  render() {
    const { category } = store.state;
    
    const existingNav = this.element.querySelector("nav");
    if (existingNav) {
      existingNav.remove();
    }

    const navElement = document.createElement("nav");
    navElement.className = "category-list";

    navElement.innerHTML = `
      <ul>
        ${this.categories
          .map(
            (cat) => `
          <li id="${cat.value}" class="category-item ${
              cat.value === category ? "active" : ""
            }">
            ${cat.name}
          </li>
        `
          )
          .join("")}
      </ul>
    `;

    this.element.appendChild(navElement);

    this.navElement = navElement;
    this.bindEvents();
  }

  update(data) {
    if (data.property === "category" || data.property === undefined) {
      this.render();
    }
  }
}
