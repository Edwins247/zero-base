/**
 * 클래스형으로 바꿀 경우 코드
 */
export default class StarRating {
  constructor(container) {
    this.container = container;
    this.stars = [];
    this.selectedRating = 0;

    this.loadCSS("star-rating/theme.css"); // CSS 파일 로드
    this.init(); // 별점 컴포넌트 초기화
    this.addEventListeners(); // 이벤트 리스너 추가
  }

  loadCSS(path) {
    if (!document.querySelector(`link[href="${path}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = path;
      document.head.appendChild(link);
    }
  }

  init() {
    this.container.classList.add("star-rating-container"); // 컨테이너 클래스 추가

    const maxRating = parseInt(this.container.dataset.maxRating, 10);
    for (let i = 1; i <= maxRating; i++) {
      const star = document.createElement("i");
      star.className = "bx bxs-star"; // Boxicons 클래스
      star.dataset.ratingValue = i;
      this.container.appendChild(star);
      this.stars.push(star);
    }
  }

  addEventListeners() {
    // 부모 컨테이너에서 이벤트 위임 처리
    this.container.addEventListener("mouseover", (event) => {
      if (event.target.tagName === "I") {
        const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
        this.stars.forEach((star, index) => {
          star.classList.toggle("hovered", index < ratingValue); // 호버 상태 적용
        });
      }
    });

    this.container.addEventListener("mouseout", () => {
      this.stars.forEach((star) => star.classList.remove("hovered")); // 호버 상태 초기화
    });

    this.container.addEventListener("click", (event) => {
      if (event.target.tagName === "I") {
        const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
        this.selectedRating = ratingValue;

        this.stars.forEach((star, index) => {
          star.classList.toggle("selected", index < ratingValue); // 선택 상태 적용
        });

        const ratingChangeEvent = new CustomEvent("rating-change", {
          detail: this.selectedRating,
        });
        this.container.dispatchEvent(ratingChangeEvent);
      }
    });
  }
}
