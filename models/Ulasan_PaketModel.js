import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';
import PaketWisata from './Paket_WisataModel.js';

const Ulasan_Paket = db.define('ulasan_paket', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    paket_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: PaketWisata,
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

Users.hasMany(Ulasan_Paket, { foreignKey: 'user_id' });
PaketWisata.hasMany(Ulasan_Paket, { foreignKey: 'paket_id' });
Ulasan_Paket.belongsTo(PaketWisata, { foreignKey: 'paket_id', allowNull: false });
Ulasan_Paket.belongsTo(Users, { foreignKey: 'user_id', allowNull: false });

export default Ulasan_Paket;