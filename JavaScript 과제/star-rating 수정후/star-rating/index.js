export default function StarRating(container) {
  // 1. `theme.css`를 동적으로 로드
  const loadCSS = (path) => {
    if (!document.querySelector(`link[href="${path}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = path;
      document.head.appendChild(link);
    }
  };

  // theme.css 파일 로드
  loadCSS("star-rating/theme.css");

  // 2. 컨테이너 클래스 추가
  container.classList.add("star-rating-container"); // 컨테이너에 클래스 추가

  // 3. 별점 컴포넌트 생성
  const maxRating = parseInt(container.dataset.maxRating, 10);
  const stars = [];

  for (let i = 1; i <= maxRating; i++) {
    const star = document.createElement("i");
    star.className = "bx bxs-star"; // Boxicons 클래스
    star.dataset.ratingValue = i;
    container.appendChild(star);
    stars.push(star);
  }

  let selectedRating = 0;

  // 이벤트 위임을 사용하여 부모 컨테이너에서 이벤트 처리
  /**
   * 1안 코드 : 버블링이 되더라도 부모 컨테이너에서 이벤트 위임을 받아서 처리함
   * 이를 통해 좀 더 동적으로 이벤트를 처리하고 성능을 최적화함
   */
  container.addEventListener("mouseover", (event) => {
    if (event.target.tagName === "I") {
      // 별 요소인지 확인
      const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
      stars.forEach((star, index) => {
        star.classList.toggle("hovered", index < ratingValue); // 호버 상태 적용
      });
    }
  });

  container.addEventListener("mouseout", () => {
    stars.forEach((star) => star.classList.remove("hovered")); // 호버 상태 초기화
  });

  container.addEventListener("click", (event) => {
    if (event.target.tagName === "I") {
      // 별 요소인지 확인
      selectedRating = parseInt(event.target.dataset.ratingValue, 10);
      stars.forEach((star, index) => {
        star.classList.toggle("selected", index < selectedRating); // 선택 상태 적용
      });

      // 커스텀 이벤트 'rating-change' 발생
      const ratingChangeEvent = new CustomEvent("rating-change", {
        detail: selectedRating,
      });
      container.dispatchEvent(ratingChangeEvent);
    }
  });

  /**
   * 2안 코드 : 이전에 star에 개별 리스너로써 사용할 때 이벤트 버블링이 발생하지 않도록
   * 단일 별 요소에만 이벤트 처리하도록 수정하는 방법도 있음
   * // 마우스 Enter 핸들러
    const handleMouseEnter = (event) => {
      const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
      stars.forEach((star, index) => {
        star.classList.toggle('hovered', index < ratingValue);
      });
    };
  
    // 마우스 Leave 핸들러
    const handleMouseLeave = () => {
      stars.forEach((star) => star.classList.remove('hovered'));
    };
  
    // 클릭 핸들러
    const handleClick = (event) => {
      selectedRating = parseInt(event.target.dataset.ratingValue, 10);
      stars.forEach((star, index) => {
        star.classList.toggle('selected', index < selectedRating);
      });
  
      // 커스텀 이벤트 'rating-change' 발생
      const ratingChangeEvent = new CustomEvent('rating-change', {
        detail: selectedRating,
      });
      container.dispatchEvent(ratingChangeEvent);
    };
  
    // 이벤트 리스너 등록
    stars.forEach((star) => {
      star.addEventListener('mouseenter', handleMouseEnter);
      star.addEventListener('mouseleave', handleMouseLeave);
      star.addEventListener('click', handleClick);
    });
   */
}
