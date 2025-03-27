## 구현 정리
1. theme.css를 동적으로 로드하기 위해서, document.querySelector에서 link path 탐색 후, 없는 경우 themes/css 로드함
2. theme.css를 적용하기 위해서, 컨테이너 클래스 추가
3. container에서 data-max-rating을 불러와 별점의 숫자를 체크하고, stars의 빈 배열을 만듬
4. 빈 배열에 i 태그를 생성하고 dataset만큼 별점 아이콘을 만듬
5. 마우스 오버(호버링시), 이전요소도 포함되게 호버링 되도록 ratingvalue에 맞게 이벤트 발생, hover class 추가(클래스 값 있으면 추가 & 제거)
6. 마우스 아웃시 클래스를 제거함
7. 마우스 클릭시, 해당하는 값을 selected 된 색깔로 만들고, CustomEvent로 클릭된 별 개수를 알림
8. 마지막으로 완성된 이벤트들을 stars에 등록함