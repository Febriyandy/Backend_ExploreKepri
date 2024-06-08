import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';
import Destinasi from './DestinasiModel.js';

const Ulasan_Destinasi = db.define('ulasan_destinasi', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    destinasi_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Destinasi,
            key: 'id'
        }
    },
    bintang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      ulasan: {
        type: DataTypes.STRING,
        allowNull: false,
      }
},{
    freezeTableName: true,
    timestamps: true
});

Users.hasMany(Ulasan_Destinasi, { foreignKey: 'user_id' });
Destinasi.hasMany(Ulasan_Destinasi, { foreignKey: 'destinasi_id' });
Ulasan_Destinasi.belongsTo(Destinasi, { foreignKey: 'destinasi_id', allowNull: false });
Ulasan_Destinasi.belongsTo(Users, { foreignKey: 'user_id', allowNull: false });

export default Ulasan_Destinasi;