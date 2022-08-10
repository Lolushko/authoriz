import productService from "../Services/product-service.js"
import productDto from "../dto/product-DTO.js"

class ProductController {
  async createProduct(req, res, next) {
    try {
      const data = new productDto(req.query)
      const newProduct = await productService.createProduct({ ...data })
      res.status(201).json({ message:'ok', newProduct })
    } catch (err) {
      next(err)
    }
  }

  async getProduct(req, res, next) { 
    try {
      const data = new productDto(req.query)
      const answer = await productService.getProduct({ ...data })
      if (!answer[0]) {
        res.status(200).json({ message: 'product not found'})
        return
      }
      res.status(200).json(answer)
    } catch (err) {
      next(err)
    }
  }

  async changeProduct(req, res, next) {
    try {
      const data = new productDto(req.query)
      const answer = await productService.changeProduct({...data})
      if (!answer) {
        res.status(204)
      }
      res.status(200).json({ answer })
    } catch (err) {
      next(err)
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { customid } = req.query
      const product = await productService.deleteProduct(customid)
      if (!product) {
        res.status(400).json({ message: 'product not found' })
        return
      }
      res.status(200).json({ message: 'product removed' })
    } catch (err) {
      next(err)
    }
  }
}


export default new ProductController()