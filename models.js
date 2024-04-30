const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  firstname: { type: DataTypes.STRING},
  lastname: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING, unique: true },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
}); 

module.exports = { User }

