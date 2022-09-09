'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail_barang extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail_barang.init({
    id_detailbarang: DataTypes.STRING,
    id_barang: DataTypes.STRING,
    id_ruangan: DataTypes.STRING,
    qrcode: DataTypes.STRING,
    kondisi: DataTypes.STRING,
    createdby: DataTypes.STRING,
    updatedby: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'detail_barang',
  });
  return detail_barang;
};