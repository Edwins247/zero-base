// do something!
// 페이지 로드가 완료된 후 실행하기 위해 DOMContentLoaded 사용
document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector("body");
    const nav = document.querySelector("nav");
    const toggle = document.querySelector(".toggle");
  
    // 로컬 스토리지에서 사이드 내비게이션 상태 확인
    const isNavActive = localStorage.getItem("navActive") === "true";
  
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
  });
  