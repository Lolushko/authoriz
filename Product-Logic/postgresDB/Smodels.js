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
    type: DataTypes.INTEGER,
    allowNull: true
  },
  customid: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: true
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, 
{
  tableName: 'products'
})

db.sync()
  .then(() => console.log('Create Table'))
  .catch((err) => console.log(err))

export default Product
