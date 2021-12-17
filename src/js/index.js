// Main js file
import { Component } from "./classes/Component";

const mainElement = document.getElementById('app');

const component1 = new Component('component1');

mainElement.append(component1.getElement());
component1.render();

const print = () => {
  setInterval(() =>{
    console.log('Click');
  }, 1000);
};

component1.on('click', print);

setTimeout(() => {
  component1.setData({color: 'green'});
}, 3000);

setTimeout(() => {
  component1.setData({color: 'blue'});
}, 5000);

setTimeout(() => {
  component1.off('click', print);
}, 5000);

const comp2 = new Component('comp2');

comp2.render();
comp2.on('click', print);

mainElement.append(comp2.getElement());


// debounce js - посмотреть в гугуле

import { cards } from "./cards";
import { filter } from "./classes/Filter";

class Card {
  constructor(options) {
    this.element = document.createElement('div');
    this.element.className = 'card';
    this.data = options.data;
    this.id = options.index;
    this.onClick = options.onClick;
    this.isFavotire = options.isFavotire;
  }

  render() {
    const { name, color, form, size } = this.data;
    this.isFavotire && this.element.classList.add('favorite');
    this.element.innerHTML = `
      <div class="name">${name}</div>
      <div class="props"><span>Цвет:</span> ${color}</div>
      <div class="props"><span>Форма:</span> ${form}</div>
      <div class="props"><span>Размер:</span> ${size}</div>
  `;
    this.events();
    return this.element;
  }

  events() {
    const colorShadow = this.isFavotire ? 'red' : 'black';
    this.element.addEventListener('mouseover', () => {
      this.element.style.boxShadow = `4px 4px 10px ${colorShadow}`;
    });

    this.element.addEventListener('mouseout', () => {
      this.element.style.boxShadow = `2px 2px 5px ${colorShadow}`;
    });

    this.element.addEventListener('click', () => {
      console.log(`Клипк по ${this.data.name}, ID = ${this.id}`);
      this.onClick(this.id);
    });
  }
}

const buttons = {
  add: {
    color: document.getElementById('add-color'),
    form: document.getElementById('add-form'),
    size: document.getElementById('add-size'),
  },
  remove: {
    color: document.getElementById('delete-color'),
    form: document.getElementById('delete-form'),
    size: document.getElementById('delete-size'),
  },
  filter: {
    filter: document.getElementById('filter'),
    clear: document.getElementById('clearFilter'),
  },
};
const input = document.getElementById('input');

const cardsWrapper = document.querySelector('.cards');

let data = [ ...cards ];
const favorites = [];

function getvalue(){
  return input.value;
}
function clearInput() {
  input.value = '';
}

const setColor = () => {
  console.log(filter.addColor(getvalue()).getAllFilters());
  clearInput();
  input.focus();
  renderTable();
};

const removeColor = () => {
  console.log(filter.removeColor(getvalue()).getAllFilters());
  clearInput();
  input.focus();
  renderTable();
};

const setForm = () => {
  console.log(filter.addForm(getvalue()).getAllFilters())
  clearInput();
  input.focus();
  renderTable();
};

const removeForm = () => {
  console.log(filter.removeForm(getvalue()).getAllFilters());
  clearInput();
  input.focus();
  renderTable();
};

buttons.add.color.addEventListener('click', setColor);
buttons.remove.color.addEventListener('click', removeColor);
buttons.add.form.addEventListener('click', setForm);
buttons.remove.form.addEventListener('click', removeForm);

function filtration() {
  if (filter.isFilterClear()) {
      data = [ ...cards ];
    return;
  }

  data = cards.filter(card => {
    return filter.hasColor(card.color) && filter.hasForm(card.form);
  });
}

const renderTable = () => {
  filtration();
  cardsWrapper.innerHTML = '';

  data.forEach((card, index) => {
    const options = {
      data: card,
      index,
      onClick: addToFavorite,
      isFavotire: !!favorites.find((value) => value === card),
    };
    const cardEl = new Card(options);
    cardsWrapper.append(cardEl.render());
  });
};

renderTable();

buttons.filter.filter.addEventListener('click', renderTable);
buttons.filter.clear.addEventListener('click', () => {
  filter.clear();
  renderTable();
});

function addToFavorite(index) {
  if (favorites.find((value) => value === data[index])) {
    return;
  }

  favorites.push(data[index]);
  console.log(favorites);
  renderTable();
}

