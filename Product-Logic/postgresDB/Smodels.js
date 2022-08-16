import { DataTypes } from "sequelize";
import db from "./S-connect-DB.js";

const Product = db.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  model: {
    type: DataTypes.STRING,
    allowNull: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true
  },
  year: {
    type: DataTypes.NUMBER,
    allowNull: true
  },
  customid: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true
  }
}, 
{
  tableName: 'products'
})

export default Product
