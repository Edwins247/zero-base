export default class Component {
  constructor(element) {
    this.element = element;
    this.bindEvents();
  }

  update(data) {
    this.render();
  }

  bindEvents() {}

  render() {
    throw new Error("Component의 render 메서드를 구현해야 합니다.");
  }
}
