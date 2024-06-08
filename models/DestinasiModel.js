import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const Destinasi = db.define('destinasi', {
    nama_tempat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    alamat:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    kabupaten:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    link_cover:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    nama_cover:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    link_foto: {
        type: DataTypes.JSON(DataTypes.STRING),
        allowNull: true,
      },
    nama_foto: {
        type: DataTypes.JSON(DataTypes.STRING),
        allowNull: true,
      },
    deskripsi: {
        type: DataTypes.JSON(DataTypes.TEXT),
        allowNull: true,
    },
    latitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      
},{
    freezeTableName: true
});

export default Destinasi;