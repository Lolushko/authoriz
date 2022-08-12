import { DataTypes } from "sequelize";
import sequelize from "./S-connect-DB.js";

const Product = sequelize.define('Product', {
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
  tableName: 'product'
})

export default Product
