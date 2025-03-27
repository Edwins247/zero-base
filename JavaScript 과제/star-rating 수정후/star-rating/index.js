export default function StarRating(container) {
    // 1. `theme.css`를 동적으로 로드
    const loadCSS = (path) => {
      if (!document.querySelector(`link[href="${path}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = path;
        document.head.appendChild(link);
      }
    };
  
    // theme.css 파일 로드
    loadCSS('star-rating/theme.css');
  
    // 2. 컨테이너 클래스 추가
    container.classList.add('star-rating-container'); // 컨테이너에 클래스 추가
  
    // 3. 별점 컴포넌트 생성
    const maxRating = parseInt(container.dataset.maxRating, 10);
    const stars = [];
  
    for (let i = 1; i <= maxRating; i++) {
      const star = document.createElement('i');
      star.className = 'bx bxs-star'; // Boxicons 클래스
      star.dataset.ratingValue = i;
      container.appendChild(star);
      stars.push(star);
    }
  
    let selectedRating = 0;
  
    // 마우스 오버 핸들러
    const handleMouseOver = (event) => {
      const ratingValue = parseInt(event.target.dataset.ratingValue, 10);
      stars.forEach((star, index) => {
        star.classList.toggle('hovered', index < ratingValue);
      });
    };
  
    // 마우스 아웃 핸들러
    const handleMouseOut = () => {
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
      star.addEventListener('mouseover', handleMouseOver);
      star.addEventListener('mouseout', handleMouseOut);
      star.addEventListener('click', handleClick);
    });
  }
  