export default class ChangeDTO {
  id;
  name;
  model;
  color
  year;
  customid;
  constructor(newData, tableData) {
    this.id = tableData.id
    this.name = newData.name || tableData.name
    this.model = newData.model || tableData.model
    this.color = newData.color || tableData.color
    this.year = newData.year || tableData.year
    this.customid = tableData.customid
  }
}
