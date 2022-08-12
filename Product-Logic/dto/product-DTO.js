export default class ProductDTO {
  name;
  model;
  color;
  year;
  customid;
  limit;
  page;
  constructor(model) {
    this.name = model.name
    this.model = model.model
    this.color = model.color
    this.year = model.year
    this.customid = model.customid
    this.limit = model.limit || 4
    this.page = model.page || 1
  }
}