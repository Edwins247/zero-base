## toggle-nav 수정사항

## DOMContentLoaded와 onload의 차이
`DOMContentLoaded`와 `window.onload`의 차이는 주로 **이벤트 발생 시점**과 **사용 사례**에 따라 나뉨.

---

## **차이점 요약**

| **특징**                 | **DOMContentLoaded**                                                                                 | **window.onload**                                                                                   |
|--------------------------|------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| **발생 시점**             | DOM 트리가 완전히 로드되고 파싱된 직후 발생 (스타일시트, 이미지 등 외부 리소스는 로드되지 않아도 됨) | 페이지의 모든 리소스(이미지, 스타일시트, 서브프레임 등)가 완전히 로드된 후 발생                     |
| **속도**                 | 더 빠르게 실행됨                                                                                   | DOMContentLoaded보다 느리게 실행됨                                                                |
| **사용 사례**             | DOM 조작이나 초기화 작업이 필요할 때 사용                                                          | 외부 리소스가 모두 로드된 후 작업이 필요할 때 사용                                                |
| **코드 예시**             | ```document.addEventListener('DOMContentLoaded', () => { ... });``````window.onload = () => { ... };```
| **브라우저 지원 및 제한** | 대부분의 브라우저에서 지원                                                                          | 브라우저마다 약간의 차이가 있지만 거의 모든 환경에서 지원                                          |

---

## **세부 설명**

### 1. **DOMContentLoaded**
- 이 이벤트는 브라우저가 HTML 문서를 완전히 로드하고 DOM 트리를 생성한 직후 발생
- 스타일시트, 이미지, 서브프레임과 같은 외부 리소스는 로드되지 않아도 이벤트가 발생
- 주요 사용 사례:
  - DOM 요소를 조작하거나 초기화 작업을 수행해야 할 때.
  - 외부 리소스 로드 여부와 상관없이 빠르게 동작해야 하는 스크립트를 실행할 때.
- 예시:
  ```javascript
  document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM is fully loaded and parsed');
    // DOM 조작 코드
  });
  ```

### 2. **window.onload**
- 이 이벤트는 페이지의 모든 리소스(이미지, 스타일시트, 서브프레임 등)가 완전히 로드된 후에 발생
- DOMContentLoaded보다 느리게 실행되며, 모든 외부 자원이 필요할 때 유용합니다.
- 주요 사용 사례:
  - 이미지 크기 계산이나 레이아웃 관련 작업처럼 외부 리소스가 모두 준비된 후에 실행해야 할 작업.
  - 페이지의 모든 콘텐츠가 로드된 상태에서 특정 작업을 수행해야 할 때.
- 예시:
  ```javascript
  window.onload = () => {
    console.log('Page is fully loaded');
    // 외부 리소스를 포함한 작업
  };
  ```

---

## **적합한 사용 시점**

### 언제 `DOMContentLoaded`를 사용할까?
- DOM 요소를 즉시 조작하거나 초기화해야 하는 경우.
- 외부 리소스(이미지, CSS 등)가 필요하지 않은 작업.

### 언제 `window.onload`를 사용할까?
- 이미지나 스타일시트와 같은 외부 리소스가 모두 준비된 후에 작업해야 하는 경우.
- 예를 들어, 이미지 슬라이더나 레이아웃 계산 작업.

---

## **결론**
대부분의 경우에는 `DOMContentLoaded`를 사용하는 것이 더 적합함. 이는 DOM이 준비되는 즉시 JavaScript를 실행할 수 있어 사용자 경험을 개선하고 페이지 로드를 빠르게 느끼게 하기 때문임. 그러나 모든 외부 리소스를 기다려야 하는 특정 상황에서는 `window.onload`를 사용하는 것이 적합함. 


---

## localStorage vs sessionStorage vs Cookies

`localStorage`, `sessionStorage`, 그리고 `Cookies`는 모두 브라우저에서 데이터를 저장하는 데 사용되지만, 각각의 특성과 사용 사례가 다름

---

## **비교표: localStorage vs sessionStorage vs Cookies**

| **특징**               | **localStorage**                                                                                  | **sessionStorage**                                                                           | **Cookies**                                                                                      |
|------------------------|---------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **저장 용량**           | 약 5-10MB (브라우저마다 다름)                                                                     | 약 5-10MB (브라우저마다 다름)                                                               | 약 4KB (도메인당 제한)                                                                           |
| **수명**               | 명시적으로 삭제하지 않는 한 영구적으로 저장                                                        | 브라우저 탭이나 창을 닫으면 삭제됨                                                          | 설정된 만료 시간까지 유지 가능. 만료 시간이 없으면 브라우저 종료 시 삭제됨                        |
| **데이터 전송**         | HTTP 요청과 함께 전송되지 않음                                                                    | HTTP 요청과 함께 전송되지 않음                                                              | 모든 HTTP 요청에 포함되어 서버로 전송됨                                                          |
| **접근성**             | 클라이언트 측에서만 접근 가능                                                                      | 클라이언트 측에서만 접근 가능                                                               | 클라이언트와 서버 모두에서 접근 가능                                                             |
| **보안**               | XSS(크로스 사이트 스크립팅)에 취약. 민감한 데이터 저장에 부적합                                     | XSS에 취약. 민감한 데이터 저장에 부적합                                                     | HttpOnly, Secure 플래그를 설정하면 보안 강화 가능. 하지만 CSRF(크로스 사이트 요청 위조)에 취약     |
| **스코프**             | 동일한 도메인 및 프로토콜 내에서만 접근 가능                                                       | 동일한 도메인 및 프로토콜 내에서만 접근 가능                                                | 도메인 전체와 하위 도메인에서도 접근 가능                                                        |
| **사용 사례**           | 사용자 설정, 애플리케이션 상태, SPA(Single Page Application)의 데이터                              | 일회성 데이터, 현재 세션 동안만 필요한 데이터                                               | 인증 토큰, 세션 관리, 크로스 도메인/서브도메인 데이터 공유                                       |

---

## **상황별 사용 사례**

### 1. **localStorage**
- **특징**: 영구적으로 데이터를 저장하며, 브라우저를 닫아도 데이터가 유지.
- **사용 사례**:
  - 사용자 환경설정 저장 (예: 다크 모드, 언어 설정)
  - SPA(Single Page Application)에서 상태 관리
  - 페이지 간 데이터 공유 (동일 도메인 내)

### 2. **sessionStorage**
- **특징**: 현재 브라우저 탭이나 창이 열려 있는 동안만 데이터를 유지.
- **사용 사례**:
  - 일시적인 폼 데이터 저장
  - 탭 간 분리된 상태 관리
  - 페이지 이동 중 임시 데이터 저장

### 3. **Cookies**
- **특징**: 서버와 클라이언트 간 데이터를 주고받을 수 있으며, 만료 시간 설정이 가능.
- **사용 사례**:
  - 세션 관리 및 인증 토큰 저장
  - 크로스 도메인/서브도메인 데이터 공유
  - 자동 로그인 구현

---

## **보안 고려사항**

### localStorage와 sessionStorage
- XSS 공격에 취약하여 민감한 데이터를 저장하는 데 적합하지 않음.
- 데이터를 암호화하거나 민감한 정보는 서버 측으로 이동하는 것이 좋음.

### Cookies
- HttpOnly 및 Secure 플래그를 사용하면 보안을 강화할 수 있음
- CSRF 공격 방지를 위해 SameSite 플래그를 설정하는 것이 권장됨.

---

## **결론 및 선택 기준**
1. 민감한 데이터를 저장해야 한다면 Cookies를 사용하는 것이 가장 적합함
2. 사용자 환경설정이나 애플리케이션 상태처럼 클라이언트 측에서만 필요한 데이터를 저장하려면 localStorage가 적합함
3. 일회성 데이터나 세션 동안만 필요한 데이터를 저장하려면 sessionStorage를 선택

---

## **beforeunload 이벤트를 활용한 상태 저장**

### **1. beforeunload 이벤트란?**
- `beforeunload`는 사용자가 페이지를 떠나거나 새로고침하려고 할 때 발생하는 브라우저 이벤트.
- 이 이벤트를 활용하면 페이지를 벗어나는 시점에 특정 작업(예: 상태 저장)을 수행할 수 있음.
- 주로 다음과 같은 경우에 사용됨:
  - 세션 상태 저장
  - 사용자 데이터를 서버에 전송
  - 사용자에게 경고 메시지 표시 (예: "페이지를 떠나시겠습니까?")

---

### **2. 현재 코드에서의 활용**
현재 코드에서는 `beforeunload` 이벤트를 통해 사이드 내비게이션의 활성화 상태를 저장하고 있습니다. 이 과정은 다음과 같은 흐름으로 이루어짐:

#### **(1) 상태 확인**
- `nav` 요소의 `.active` 클래스가 존재하는지 확인하여 사이드 내비게이션이 열려 있는지 여부를 판단함

#### **(2) 로컬 스토리지에 상태 저장**
- `localStorage.setItem("navActive", isCurrentlyActive)`를 사용하여 사이드 내비게이션의 상태를 저장함.
- 키(`navActive`)와 값(`true` 또는 `false`)을 통해 상태를 기록함.

#### **(3) beforeunload 이벤트 등록**
- `window.addEventListener("beforeunload", ...)`를 통해 페이지가 떠나는 시점에 위의 상태 확인 및 저장 작업을 실행함.

---

### **3. 코드 흐름 설명**

```javascript
window.addEventListener("beforeunload", () => {
  const isCurrentlyActive = nav.classList.contains("active");
  localStorage.setItem("navActive", isCurrentlyActive);
});
```

#### **코드 실행 흐름**:
1. 사용자가 페이지를 떠나거나 새로고침하려고 할 때 `beforeunload` 이벤트가 발생함.
2. 현재 내비게이션의 활성화 상태(`nav.classList.contains("active")`)를 확인.
3. 로컬 스토리지에 해당 상태(`true` 또는 `false`)를 저장함.

---

### **4. beforeunload와 unmount의 차이점**
피드백에서 언급된 "상태 저장은 unmount 시점에서 한 번만 하면 될 것 같다"는 내용은 다음과 같은 차이를 고려해야 함:

#### **beforeunload**:
- 브라우저 이벤트로, 페이지가 떠나는 시점에 실행됨.
- 클라이언트 측에서만 동작하며, 서버와 연동되지 않음.

#### **Unmount**:
- React와 같은 프레임워크에서 컴포넌트가 DOM에서 제거될 때 발생하는 라이프사이클 메서드입니다 (`componentWillUnmount()`).
- 특정 컴포넌트 단위로 실행되며, 더 세부적인 제어가 가능.

---

### **5. beforeunload 사용 시 고려사항**
1. **다른 도메인 간 데이터 공유**:
   - `localStorage`는 동일한 도메인에서만 접근 가능하므로 다른 도메인에서는 사용할 수 없음.
   - 크로스 도메인 데이터 공유가 필요하다면 쿠키 또는 서버 측 API와 연동해야함.

2. **보안 문제**:
   - 민감한 데이터를 저장할 경우 XSS 공격에 취약할 수 있음.
   - 민감한 정보는 반드시 서버 측에서 관리.

3. **사용 사례 적합성**:
   - 현재 요구사항에서는 간단히 사이드 내비게이션 상태만 저장하므로 `localStorage`와 `beforeunload` 조합이 적합함.

---

### **6. 결론**
현재 구현된 코드에서 `beforeunload`는 사용자가 페이지를 떠날 때 사이드 내비게이션의 활성화 상태를 로컬 스토리지에 저장하는 데 적합합니다. 다만, 다른 도메인 간 데이터 공유가 필요하거나 보안이 중요한 경우에는 쿠키 또는 서버 측 API를 사용하는 것이 더 적합할 수 있음

---

### preload 클래스 제거 & 상태 저장 시점
- 수정전
```javascript
    // 초기 렌더링 시 상태 설정
    if (isNavActive) {
      nav.classList.add("active");
      body.style.visibility = "visible";
    } else {
      body.style.visibility = "visible";
    }
  
    // 토글 버튼 클릭 이벤트
    toggle.addEventListener("click", () => {
      const isCurrentlyActive = nav.classList.contains("active");
  
      // 상태 변경
      if (isCurrentlyActive) {
        nav.classList.remove("active");
        localStorage.setItem("navActive", "false");
      } else {
        nav.classList.add("active");
        localStorage.setItem("navActive", "true");
      }
    });
```
- 수정후
```javascript
  // 초기 렌더링 시 상태 설정
  if (isNavActive) {
    nav.classList.add("active");
  }
  
  // preload 클래스 제거 후 트랜지션 활성화
  body.classList.remove("preload");
  body.style.visibility = "visible";

  // 토글 버튼 클릭 이벤트
  toggle.addEventListener("click", () => {
    const isCurrentlyActive = nav.classList.contains("active");

    // 상태 변경
    if (isCurrentlyActive) {
      nav.classList.remove("active");
    } else {
      nav.classList.add("active");
    }
  });

  // beforeunload 이벤트로 상태 저장
  window.addEventListener("beforeunload", () => {
    const isCurrentlyActive = nav.classList.contains("active");
    localStorage.setItem("navActive", isCurrentlyActive);
  });
```
- preload 클래스가 초기 랜더링 시에 불필요한 트랜지션을 방지함
- 이에 대해서 초기 랜더링 시 상태 확인후 preload 클래스 제거 후 트랜지션을 활성화홤
- 그렇게 해서 토클 이벤트를 처리하고 그 다음 상태 저장 역시, 상태 변경할 때마다 저장하는 것이 아닌, 마지막 unmount 시에만 한 번, 사용자가 페이지를 떠나기 전, beforeunload 이벤트를 통해서 상태를 저장함

------