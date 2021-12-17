export class Component {
  constructor(name, config) {
    this.element = document.createElement('div');
    this.element.className = name || '';
      this.data = config && (config.data || null);
    this.name = name;
    this.listeners = [];
  }

  render() {
    this.deleteEvent();
    this.clearHTML();
    this.element.insertAdjacentHTML('afterbegin', this.HTML());
    this.events();
  }

  getElement() {
    return this.element;
  }

  HTML() {
    return `
      <div class="red">Меня зовут:${this.name || 'Хз что я такое'}</div>
      <div>Мой цвет: ${this.data ? this.data.color : 'Я бесцветный'}</div>
    `
  }

  clearHTML() {
    this.element.innerHTML = '';
  }

  on(event, callback) {
    this.listeners.push([event, callback]);
    this.element.addEventListener(event, callback);
  }

  off(event, callback) {
    this.listeners = this.listeners.filter(e => {
      console.log(e[0] === event, e[1] === callback);
      if (e[0] === event && e[1] === callback) {
        console.log('in');
        this.element.removeEventListener(event, callback);
        return false;
      }

      return true;
    })
  }

  events() {
    this.listeners.forEach(e => {
      this.element.addEventListener(e.event, e.callback)
    })
  }

  deleteEvent() {
    this.listeners.forEach(event => {
      this.element.removeEventListener(event.event, event.callback);
    })
  }

  setData(data) {
    this.data = data;
    this.render();
  }
}


