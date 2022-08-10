import db from "../postgresDB/db.js"
import searchDb from "../postgresDB/search-db.js"
import ChangeDTO from "../dto/change-DTO.js"

class ProductService {
  async createProduct(product) {
    const { name, model, color, year, customid } = product
    const newProduct = await db.query(`
    INSERT INTO product(name, model, color, year, customid)
    values ($1, $2, $3, $4, $5) RETURNING *`, 
    [name, model, color, year, customid])

    return newProduct.rows[0]
  }

  async getProduct(info) {
    const data = {
      table: {},
      limit: info.limit || 4,
      page: Number(info.page) || 1
    }
    const offset = data.page * data.limit - data.limit

    if (info.name && !info.model && !info.color && !info.year) {
      data.table = await searchDb.searchN(info.name, data.limit, offset)
    }
    if (info.name && info.color && !info.year && !info.model ) {
      data.table = await searchDb.searchNC(info.name, info.color, data.limit, offset)
    }
    if (info.name && info.year && !info.color && !info.model) {
      data.table = await searchDb.searchNY(info.name, info.year, data.limit, offset)
    }
    if (info.name && info.model && !info.color && !info.year) {
      data.table = await searchDb.searchNM(info.name, info.model, data.limit, offset)
    }
    if (info.name && info.model && info.year && !info.color) {
      data.table = await searchDb.searchNMY(info.name, info.model, info.year, data.limit, offset)
    }
    if (info.name && info.model && info.color && !info.year) {
      data.table = await searchDb.searchNMC(info.name, info.model, info.color, data.limit, offset)
    }
    if (info.name && info.model && info.color && info.year) {
      data.table = await searchDb.searchNMCY(info.name, info.model, info.color, info.year, data.limit, offset)
    }
    if (!info.name && !info.model && !info.color && !info.year || !data.table.rows[0]) {
      data.table = await searchDb.search(data.limit, offset)
    }
    return data.table.rows
  }

  async changeProduct(data) {
    const product = (await db.query(`SELECT * FROM product WHERE customid = '${data.customid}'`)).rows[0]
    const newData = new ChangeDTO(data, { ...product })
    await db.query(`
    UPDATE product
    SET name='${newData.name}',
    model='${newData.model}',
    color='${newData.color}',
    year=${newData.year}
    WHERE id = ${newData.id}`)
    return (await db.query(`SELECT * FROM product WHERE customid = '${data.customid}'`)).rows[0]
  }
  async deleteProduct(customid) {
    const product = (await db.query(`SELECT * FROM product WHERE customid = '${customid}'`)).rows[0]
    if (product) {
      await db.query(`DELETE FROM product WHERE customid = '${customid}'`)
      return true
    } 
    return product
  }
}

export default new ProductService()

