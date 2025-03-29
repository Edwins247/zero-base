// do something!
// 페이지 로드가 완료된 후 실행하기 위해 DOMContentLoaded 사용
document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const nav = document.querySelector("nav");
  const toggle = document.querySelector(".toggle");

  // 초기 상태 설정
  init(nav);
  activeBody(body);

  // 토글 버튼 이벤트 등록
  registerToggleEvent(nav, toggle);

  // beforeunload 이벤트 등록
  registerBeforeUnloadEvent(nav);
});

const init = (nav) => {
  // 로컬 스토리지에서 사이드 내비게이션 상태 확인
  const isNavActive = localStorage.getItem("navActive") === "true";

  // 초기 랜더링 시 상태 설정
  nav.classList.toggle("active", isNavActive);
}


const activeBody = (body) => {
  body.style.visibility = "visible";
}

const registerToggleEvent = (nav, toggle) => {
  // 토클 버튼 클릭 이벤트
  toggle.addEventListener("click", () => {
    const isCurrentlyActive = nav.classList.contains("active");

    // 상태 변경 및 클래스 토글
    nav.classList.toggle("active", !isCurrentlyActive);

    // preload 클래스 제거 (초기 렌더링 이후 트랜지션 활성화)
    document.body.classList.remove("preload");
  });
}

const registerBeforeUnloadEvent = (nav) => {
  window.addEventListener("beforeunload", () => {
    const isCurrentlyActive = nav.classList.contains("active");
    localStorage.setItem("navActive", isCurrentlyActive);
  })
}


