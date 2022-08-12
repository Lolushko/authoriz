import { Router } from "express";
import adminMiddleware from "../Middlewares/admin-middleware.js";
import productController from "../Controllers/product-controller.js";

const productRouter = Router()

productRouter.post('/create', adminMiddleware, productController.createProduct)
productRouter.get('/search', productController.getProduct)
productRouter.put('/change', adminMiddleware, productController.changeProduct)
productRouter.delete('/delete', adminMiddleware, productController.deleteProduct)

export default productRouter