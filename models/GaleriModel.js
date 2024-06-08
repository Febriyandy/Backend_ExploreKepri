import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import Users from './UserModel.js';

const Galeri = db.define('galeri', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    kabupaten:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    caption:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    link_foto:{
        type: DataTypes.STRING,
        allowNull: true,
    },
    nama_foto:{
        type: DataTypes.STRING,
        allowNull: true,
    }
},{
    freezeTableName: true,
    timestamps: true
});

Users.hasMany(Galeri, { foreignKey: 'user_id' });
Galeri.belongsTo(Users, { foreignKey: 'user_id', allowNull: false });

export default Galeri;