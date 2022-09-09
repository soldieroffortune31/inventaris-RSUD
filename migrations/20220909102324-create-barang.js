'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('barangs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_barang: {
        type: Sequelize.STRING
      },
      kode_barang: {
        type: Sequelize.STRING
      },
      nama_barang: {
        type: Sequelize.STRING
      },
      merk: {
        type: Sequelize.STRING
      },
      tipe: {
        type: Sequelize.STRING
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      harga: {
        type: Sequelize.INTEGER
      },
      tahun: {
        type: Sequelize.INTEGER
      },
      sumber_dana: {
        type: Sequelize.INTEGER
      },
      foto: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      deleted: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('barangs');
  }
};