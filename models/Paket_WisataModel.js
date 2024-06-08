import { DataTypes } from 'sequelize';
import db from '../config/Database.js';

const PaketWisata = db.define('paketWisata', {
    nama_paket:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    lama_kegiatan:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    rentang_harga:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    destinasi:{
        type: DataTypes.JSON(DataTypes.TEXT),
        allowNull: true,
    },
    rangkaian_kegiatan:{
        type: DataTypes.JSON(DataTypes.TEXT),
        allowNull: true,
    },
    fasilitas:{
        type: DataTypes.JSON(DataTypes.TEXT),
        allowNull: true,
    },
    biaya:{
        type: DataTypes.JSON(DataTypes.TEXT),
        allowNull: true,
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
    rating: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
},{
    freezeTableName: true
});

export default PaketWisata;