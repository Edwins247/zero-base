### 내가 구현하고 생각한 방식
1. DOMContentLoaded를 사용해서 쓰라고 했으니까 예시대로 이벤트 추가
2. body가 기본적으로 보이지 않았음, 그래서 querySelector로 불러야함
3. nav.active가 되어 있으므로 클릭시 active한 것에 대해서 클래스 추가해야함(DOM 조작으로)
4. 그러면 nav도 querySelector로 불러와야함
5. 그리고 toggle 클릭시 결국 네비게이션 상태를 저장해야 하니까 이에 대해서 querySelector로 불러오고 난 뒤, 해당 값을 저장해야함

### 그래서 구현된 코드
1. DOMContentLoaded로 document에 이벤트 추가(DOM 조작 유리하게 하기 위해서)
2. body, nav, toggle, querySelector로 불러와서 변수 저장
3. 네비게이션 상태 활성화 됐는지 localStorage로 아이템 값을 불러와서 상태 확인(이때 navActive로 키-값 저장)
4. 만약 true면 nav에 active class 추가, true든 false든 body visibility visible로
5. 토글 버튼 클릭 이벤트, active class가 있는지 확인 후, 있으면 active를 없애고 item false, 없으면 추가하고 item true 왜냐하면 토글 버튼에 따라서 상태가 계속 바뀌니까