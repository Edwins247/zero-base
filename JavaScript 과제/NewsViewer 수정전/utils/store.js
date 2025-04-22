class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify(data) {
    console.log("데이터 변화 감지", data);
    this.observers.forEach((observer) => observer.update(data));
  }
}

class Store {
  constructor() {
    this.observable = new Observable();

    this._state = {
      category: "all",
      page: 1,
    };

    this.state = new Proxy(this._state, {
      set: (target, property, value) => {

        const isChanged = target[property] !== value;

        target[property] = value;

        if (isChanged) {
          this.observable.notify({
            property,
            value,
            state: { ...this._state },
          });
        }

        return true;
      },
    });
  }

  subscribe(observer) {
    this.observable.subscribe(observer);
    observer.update({ state: { ...this._state } });
  }

  unsubscribe(observer) {
    this.observable.unsubscribe(observer);
  }
}

export const store = new Store();
