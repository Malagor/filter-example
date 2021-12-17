class Filter {
  constructor(options = {}) {
    this.size = [];
    this.form = [];
    this.color = [];
  }

  isFilterClear() {
    return !this.color.length && !this.size.length && !this.form.length;
  }

  getSizes() {
    return this.size;
  }

  // FORM
  getForm() {
    return this.form;
  }

  hasForm(form) {
    return this.form.length
      ? this.form.includes(form)
      : true;
  }

  addForm(form) {
    form && this.form.push(form);
    return this;
  }

  removeForm(form) {
    this.form = this.form.filter(c => c !== form);
    return this;
  }

  // COLORS
  getAllFilters() {
    return {
      colors: this.color,
      forms: this.form,
      size: this.size,
    };
  }

  hasColor(color) {
    return this.color.length
      ? this.color.includes(color)
      : true;
  }

  addColor(color) {
    color && this.color.push(color);
    return this;
  }

  removeColor(color) {
    this.color = this.color.filter(c => c !== color);
    return this;
  }

  clear() {
    this.size = [];
    this.form = [];
    this.color = [];
    return this;
  }

  setData(options) {
    this.size = options.size || this.size;
    this.form = options.form || this.form;
    this.color = options.color || this.color;
  }
}

export const filter = new Filter();
