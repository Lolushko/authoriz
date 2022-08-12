import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRouter from "./Auth-Logic/Routers/authRouter.js";
import postgres from "./Product-Logic/postgresDB/S-connect-DB.js";
import productRouter from "./Product-Logic/Routers/product-router.js";
import errorMiddlware from "./Api-error/Middlewares/error-middlware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use('/auth', authRouter);
app.use('/product', productRouter)
app.use(errorMiddlware)

postgres
  .authenticate()
  .then(() => console.log(`Connect to Postgres`))
  .catch(err => console.log(err))
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log(`Connect to MongoDB`))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


