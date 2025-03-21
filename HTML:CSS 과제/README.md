## 수정사항

### a 태그, button 태그와 tabIndex 속성처리
- 수정전
```html
        <div class="card-link">
          <div class="card-link-column">
            <a href="/">
              <div class="card-content" tabindex="0">
                <img
                  src="./assets/discovery/honeytea.jpg"
                  alt="오뚜기 따뜻한 차 향기"
                  class="product-card-image"
                />
                <div class="arrow-icon-container" tabindex="0">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    class="arrow-icon"
                    alt="화살표 아이콘"
                  />
                </div>
              </div>
            </a>
          </div>
          <div class="card-link-column">
            <a href="/">
              <div class="card-content" tabindex="0">
                <img
                  src="./assets/discovery/vaseline.jpg"
                  alt="바세린 런칭 기념"
                  class="product-card-image"
                />
                <div class="arrow-icon-container" tabindex="0">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    class="arrow-icon"
                    alt="화살표 아이콘"
                  />
                </div>
              </div>
            </a>
          </div>
```
- 위의 태그에 문제점은 먼저 시맨틱 태그 즉, 리스트임에도 불구하고 div태그로만 피그마 시안 구성에 포커싱을 맞춘 것(과도한 div 태그 남발)
- 그리고 focus를 위해서 tabindex 속성을 넣었는데, 탭을 할 경우 자연스럽게 넘어가기 위한 것은 a태그 하나만으로 처리해야함, 이를 위한 태그가 너무 많았음(그래서 정상적으로 탭을 했을 때 처리가 안된 것)
- 2차 수정
```html
          <li class="card-link-item big">
            <a href="/" class="card-content">
                <img
                  src="./assets/discovery/honeytea.jpg"
                  alt="오뚜기 따뜻한 차 향기"
                  class="product-card-image"
                />
                <button class="purchase-icon-container" aria-label="구매하기">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    alt="구매하기 아이콘"
                  />
                </button>
            </a>
          </li>
```
- 여전히 위 태그에서 button 태그 사용으로 인해 a태그 인식 및 처리가 원할하게 진행되지 않았음
- **핵심**은 디자인 시안에 맞는 태그를 우선적으로 고려하고 구조를 먼저 짜고 작업을 할 것
- 여태까지 안 좋았던 습관이 표면으로 드러남
- 수정 후
```html
        <ul class="card-link">
          <li class="card-link-item big">
            <a href="/" class="card-content">
                <img
                  src="./assets/discovery/honeytea.jpg"
                  alt="오뚜기 따뜻한 차 향기"
                  class="product-card-image"
                />
                <span class="purchase-icon-container" aria-label="구매하기">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    alt="구매하기 아이콘"
                  />
                </span>
            </a>
          </li>
          <li class="card-link-item big">
            <a href="/" class="card-content">
                <img
                  src="./assets/discovery/vaseline.jpg"
                  alt="바세린 런칭 기념"
                  class="product-card-image"
                />
                <span class="purchase-icon-container" aria-label="구매하기">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    alt="구매하기 아이콘"
                  />
                </span>
            </a>
          </li>
```
- 카드 목록 & 리스트이기에 순서가 없는 리스트를 활용해서 내부 태그 구성, a 태그를 부모 태그로 하위에 상품 이미지 그리고 버튼이 아닌 span 태그를 통해서 해당 구매하기 안내를 구성 그리고 class명도 적절하게 수정함
- 그리고 계속 놓친 부분이
1. a 태그 속성에 자식요소로 tabindex 가질 수 있는 인터랙티브한 요소를 삽입한 것(tabindex 사용 포함)
2. img 태그로 변경 후에도 span 태그가 아닌 button 태그로 또 자식 요소로 삽입해서 오류가 뜬 것
- 이 부분을 유의할 것

### h1 수정 및 의미에 맞는 alt 역할
- 수정전
```html
      <header class="header">
        <h1 class="logo">
          <a href="https://www.coupang.com/">
            <img src="./assets/logo/logo.png" alt="쿠팡 로고 이미지" />
          </a>
        </h1>
      </header>
      <section class="section">
        <div class="today-discovery-headline">
          <h2 class="title-medium-24">오늘의 발견</h2>
          <h6 class="title-medium-16 subtitle">
            <span role="separator" aria-orientation="vertical">|</span>
            오늘 쿠팡이 엄선한 가장 핫한 제품
          </h6>
        </div>
```
- 수정후
```html
      <header class="header">
        <h1 class="logo">
          <a href="https://www.coupang.com/">
            <img src="./assets/logo/logo.png" alt="쿠팡" />
          </a>
        </h1>
      </header>
      <section class="section">
        <div class="today-discovery-headline">
          <h2 class="title-medium-24">오늘의 발견</h2>
          <h3 class="title-medium-16 subtitle">
            <span role="separator" aria-orientation="vertical">|</span>
            오늘 쿠팡이 엄선한 가장 핫한 제품
          </h3>
        </div>
```
- alt에 그 의미에 맞게 네이밍을 하고 또 h2 태그 이후로 h6을 스타일을 위해서 쓰면 안되고 CSS로 스타일링을 해야함, 그래서 h3태그로 연속성 있게 네이밍 필요

### nth-child가 아닌 Class로
- 수정전
```html
<div class="card-link-column">
            <a href="/">
              <div class="card-content" tabindex="0">
                <img
                  src="./assets/discovery/honeytea.jpg"
                  alt="오뚜기 따뜻한 차 향기"
                  class="product-card-image"
                />
                <div class="arrow-icon-container" tabindex="0">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    class="arrow-icon"
                    alt="화살표 아이콘"
                  />
                </div>
              </div>
            </a>
          </div>
```
```css
/* 첫 번째 줄 - 큰 카드 2개 */
.card-link-column:nth-child(-n + 2) {
  width: 50%;
  float: left;
  padding: 10px;
}

/* 두 번째 줄 - 작은 카드 4개 */
.card-link-column:nth-child(n + 3):nth-child(-n + 6) {
  width: 25%;
  float: left;
  padding: 10px;
}

/* 세 번째 줄 - 중간 카드 3개 */
.card-link-column:nth-child(7) {
  width: 50%;
  float: left;
  padding: 10px;
}

.card-link-column:nth-child(8),
.card-link-column:nth-child(9) {
  width: 25%;
  float: left;
  padding: 10px;
}
```
- 수정후
```html
        <ul class="card-link">
          <li class="card-link-item big">
            <a href="/" class="card-content">
                <img
                  src="./assets/discovery/honeytea.jpg"
                  alt="오뚜기 따뜻한 차 향기"
                  class="product-card-image"
                />
                <span class="purchase-icon-container" aria-label="구매하기">
                  <img
                    src="./assets/icon/angle-right-square.svg"
                    alt="구매하기 아이콘"
                  />
                </span>
            </a>
          </li>
```
```css
.card-link {
  list-style: none;
  padding-left: 0;
}

.card-link-item {
  float: left;
  padding: 10px;
}

.card-link-item.big {
  width: 50%;
}

.card-link-item.small {
  width: 25%;
}
```
- 공통의 클래스를 두고 nth-child로 처리하였지만, 이를 nth-child가 아닌, 가독성과 요소의 변경 우려로 인해 Class로 써야했음
- 그래서 기존의 비율을 생각하면 되기에 클래스 명을 추가로 작성 후, 크기 및 비율에 맞게 해당하는 class를 할당하여 동일하게 비율을 유지함
- Class를 통해 명확하게 처리할 것

### 마우스 오버나 포커스 처리
- 수정전
```css
.card-content {
  border: 1px solid var(--color-gray-500);
  position: relative;
  height: 310px;
}

.card-content:hover,
.card-content:focus {
  border: 1px solid var(--color-blue-500);

  outline: none;
}

.product-card-image {
  padding-top: 10px;
}

.arrow-icon-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-black-opacity-20);
  transition: all 0.3s ease;
}

.arrow-icon {
  width: 40px;
  height: 40px;
}

.arrow-icon-container:hover::before,
.arrow-icon-container:focus::before {
  content: "구매하기";
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
}

.arrow-icon-container:hover,
.arrow-icon-container:focus {
  background-color: var(--color-blue-500);

  outline: none;
}
```
- 수정후
```css
/* 카드 콘텐츠 스타일 */
.card-content {
  display: block;
  border: 1px solid var(--color-gray-500);
  position: relative;
  height: 310px;
  text-decoration: none;
  transition: border-color 0.3s ease-in; 
}

.card-content:hover,
.card-content:focus-within {
  border-color: var(--color-blue-500); 
}

.purchase-icon-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background-color: var(--color-black-opacity-20);
  border: none;
  transition: background-color 0.3s ease; 
}

.card-content:hover .purchase-icon-container::before,
.card-content:focus-within .purchase-icon-container::before {
  content: "구매하기"; 
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  margin-left: 8px;
}

.card-content:hover .purchase-icon-container,
.card-content:focus-within .purchase-icon-container {
  background-color: var(--color-blue-500); 
}
```
- 먼저 2가지 부분을 간과함
1. 호버나 포커스 시 단순히 이미지 배경 뿐 아니라 버튼도 같이 효과와 함께 변경되야 하는 점
2. focus를 각각 뒀음(앞서 tabIndex및 a & button 태그의 자식 요소 삽입 이슈로)
- 그래서 수정후를 보게 되면 조건을 동시에 걸었음, card-content가 호버랑 focus를 할 때, before요소와 transition이 변하도록 각각 조건을 거는 것이 아니라

# 총평
1. 태그를 잘 생각하면서 HTML 문서를 만들자.(div 태그 남발하기전, 적절한 태그를 먼저 고민하고 그에 맞게 작성해서 채워나갈 것)
2. 조건이 동시에 있는 경우 잘 확인하고 진행하자.(호버와 포커스 부분 같이)
3. 태그를 스타일링으로 생각해서 쓰면 안된다. 스타일은 따로 처리해야한다.(그리고 alt, 네이밍 등 명확하게 하자)
4. https://validator.w3.org/nu/#textarea 잘 활용해서 HTML 태그 등 유효성 검사 습관화하자!

---- 
### 추가 피드백
- 박스모델에서 이미지가 중앙 정렬이 되어 있지 않고, 구매하기 버튼의 경우 실제 디자인 UI보다 큼
- 수정 전
```css
.product-card-image {
  padding-top: 10px;
}

/* 카드 콘텐츠 스타일 */
.card-content {
  display: block;
  border: 1px solid var(--color-gray-500);
  position: relative;
  height: 310px;
  text-decoration: none;
  transition: border-color 0.3s ease-in; 
}

.card-content:hover,
.card-content:focus-within {
  border-color: var(--color-blue-500); 
}

.purchase-icon-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background-color: var(--color-black-opacity-20);
  border: none;
  transition: background-color 0.3s ease; 
}
```
- 수정 후
- 먼저 중앙 정렬을 하기 위해서 card-content를 display: flex로 한 뒤, 아이템을 정렬했음, 사실 첫 시도는 margin으로 product-card-image를 직접 처리하려고 했으나, 일관적이지 않은 것 같아서 고민 후 수정함
- 그리고 디테일한 UI 경우도, 실제 피그마 시안과 다르게 구매하기 버튼을 과도하게 만들었음(너무 기능에만 집중했음)
- 이에 대해서도 불필요한 padding값을 지워서 원상복구 시키고 before content의 경우도, 디자인 시안에 맞게 수정함
```css
.card-content {
  display: flex;
  border: 1px solid var(--color-gray-500);
  position: relative;
  justify-content: center;
  align-items: center;
  height: 310px;
  text-decoration: none;
  transition: border-color 0.3s ease-in; 
}

.card-content:hover,
.card-content:focus-within {
  border-color: var(--color-blue-500); 
}

.purchase-icon-container {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-black-opacity-20);
  border: none;
  transition: background-color 0.3s ease; 
}

.card-content:hover .purchase-icon-container::before,
.card-content:focus-within .purchase-icon-container::before {
  content: "구매하기"; 
  color: var(--color-white);
  font-size: 14px;
  font-weight: 500;
  line-height: 1.2;
  margin-left: 20px;
}
```
### aria-label & aria-hidden
- aria-label의 경우, 실제 클릭 가능한 요소의 접근성 측면에서 써야하는데 span 태그에 붙이는 것은 적절치 않음
- aria-hidden의 경우도, 스크린 리더가 무시하도록 하는 것인데, 이 부분에 대해서 aria-orientation을 통해서 구분선을 명확히 나타나는게 맞음

### 추가 총평
1. 피그마 시안은 디자이너에게 넘어오는 것이기 때문에, 기능 구현 뿐 아니라 박스모델이나 padding & margin 외에도 디테일한 시안대로 만들어주는 것이 중요함, 그렇기에 이런 부분 대충 넘기지 말고 확실하게 디자인 확인하자!
2. 좀 더 생각하고 고민해서 태그를 만들도록 하자! 관성적으로 태그를 쓰다보면 div 태그를 남발하게 될 것이고, 의미론적인 태그를 고민하지 않으면 시안대로 구현은 할 지언정, 접근성 그리고 같은 동료가 볼 때, 명확하지 않고 클린하지 않은 코드가 될 수 있다.
3. 코드를 쓰는 시간보다, 이런 생각하고 고민해서 짜는 시간을 더 많이 둬야지 결과적으로 총 시간을 줄일 수 있음을 마음속에 새기자!