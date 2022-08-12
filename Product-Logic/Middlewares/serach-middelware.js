export default (info, params) => {
  if (info.name) {
    params.where.name = info.name.toLowerCase()
  }
  if (info.model) {
    params.where.model = info.model.toLowerCase()
  }
  if (info.color) {
    params.where.color = info.color.toLowerCase()
  }
  if (info.year) {
    params.where.year = info.year
  }
  if (info.customid) {
    params.where.customid = info.customid.toLowerCase()
  }
  return params 
}