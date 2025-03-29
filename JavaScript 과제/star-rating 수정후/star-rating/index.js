export default function StarRating(container) {
  // 별점 컴포넌트 생성
  const stars = [];  
  const maxRating = parseInt(container.dataset.maxRating, 10);

  // `theme.css`를 동적으로 로드
  const loadCSS = (path) => {
    if (!document.querySelector(`link[href="${path}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = path;
      document.head.appendChild(link);
    }
  };

  // Star 초기화
  const initStars = () => {
    container.classList.add("star-rating-container");
    for (let i = 1; i <= maxRating; i++) {
      const star = document.createElement("i");
      star.className = "bx bxs-star";
      star.dataset.ratingValue = i;
      container.appendChild(star);
      stars.push(star);
    }
  };

  // stars의 상태 처리 및 이벤트 dispatch 하는 메소드
  const starsStateManager = () => {
    // 전역변수로 처리하는 것보다 선택된 star만 처리하게 지역변수로 처리
    let selectedRating = 0;

    const updateSelectedRating = (rating) => {
      selectedRating = rating;
      stars.forEach((star, index) => {
        star.classList.toggle("selected", index < selectedRating);
      });
      const ratingChangeEvent = new CustomEvent("rating-change", {
        detail: selectedRating,
      });
      container.dispatchEvent(ratingChangeEvent);
    };

    // 선택된 별 개수를 처리하는 메소드 리턴으로 돌려줌
    return { updateSelectedRating };
  }

  // mouseover, mouseout, click 이벤트 처리하는 메소드
  const addEventListeners = (starsState) => {
    container.addEventListener("mouseover", (event) => {
      if (event.target.tagName === "I") {
        const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
        stars.forEach((star, index) => {
          star.classList.toggle("hovered", index < ratingValue);
        });
      }
    });

    container.addEventListener("mouseout", () => {
      stars.forEach((star) => star.classList.remove("hovered"));
    })

    container.addEventListener("click", (event) => {
      if (event.target.tagName === "I") {
        const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
        starsState.updateSelectedRating(ratingValue);
      }
    });
  };

  // 메소드 호출
  loadCSS("star-rating/theme.css");
  initStars();
  // stars state처리하는 메소드를 이벤트에 넘겨서 click 이벤트에 활용하도록 넘김
  const starsManager = starsStateManager();
  addEventListeners(starsManager);

}
