import ChangeDto from "../dto/change-DTO.js";
import db from "../postgresDB/S-connect-DB.js";
import Product from "../postgresDB/Smodels.js";
import serach from "../Middlewares/serach-middelware.js";
class ProductService {
  async createProduct(productDto) {
    const product = new Product({ 
      name: productDto.name,
      model: productDto.model, 
      color: productDto.color,
      year: productDto.year, 
      customid: productDto.customid
    })
    await product.save()
    return await Product.findOne({ 
      where: {
        customid: product.customid
      }, 
      row: true
    })
  }

  async getProduct(info) {
    const { limit, page } = info
    const offset = Number(page * limit - limit)
    const params = {
      group: [],
      where: {},
      limit: limit,
      offset: offset,
    }
    const { count, rows }  = await Product.findAndCountAll({ ...serach(info, params) })
    return { count, rows }
  }
 
  async changeProduct(data) {
    const product = await Product.findOne({
      where: {
        customid: data.customid
      },
      rows: true
    })
    const change = new ChangeDto(data, product)
    const newProduct = await Product.upsert({ ...change })
    return newProduct
  }
  async deleteProduct(customid) {
    const product = await Product.findOne({ where: { customid } }) 
    if (product) {
      await product.destroy()
      return true
    }  
  }
}

export default new ProductService()

