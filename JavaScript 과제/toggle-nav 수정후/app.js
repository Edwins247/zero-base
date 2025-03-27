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
});

  