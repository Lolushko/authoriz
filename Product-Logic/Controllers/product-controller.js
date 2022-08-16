import ProductDto from "../dto/product-DTO.js"
import productService from "../Services/product-service.js"
class ProductController {
  async createProduct(req, res, next) {
    try {
      const data = new ProductDto(req.query)
      const newProduct = await productService.createProduct({ ...data })
      res.status(201).json(newProduct)
    } catch (err) {
      next(err)
    }
  }

  async getProduct(req, res, next) { 
    try {
      const data = new ProductDto(req.query)
      const { count, rows } = await productService.getProduct({ ...data })
      if (count[0].count === 0 || !rows[0]) {
        res.status(204).json({ message: 'product not found' })
        return
      }
      res.status(200).json({ count, rows })
    } catch (err) {
      next(err)
    }
  }

  async changeProduct(req, res, next) {
    try {
      const data = new ProductDto(req.query)
      const answer = await productService.changeProduct({ ...data })
      if (!answer) {
        res.status(204).message({ message: 'product not found' })
      }
      res.status(200).json(answer[0])
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { customid } = req.query
      const product = await productService.deleteProduct(customid)
      if (!product) {
        res.status(204).json({ message: 'product not found' })
        return
      }
      res.status(200).json({ message: 'product removed' })
    } catch (err) {
      next(err)
    }
  }
}


export default new ProductController()