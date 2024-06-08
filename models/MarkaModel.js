import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';
import Destinasi from './DestinasiModel.js';

const Marka = db.define('marka', {
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
    }
},{
    freezeTableName: true,
    timestamps: true
});

Users.hasMany(Marka, { foreignKey: 'user_id' });
Destinasi.hasMany(Marka, { foreignKey: 'destinasi_id' });
Marka.belongsTo(Destinasi, { foreignKey: 'destinasi_id', allowNull: false });
Marka.belongsTo(Users, { foreignKey: 'user_id', allowNull: false });

export default Marka;