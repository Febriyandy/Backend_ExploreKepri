import { DataTypes } from 'sequelize';
import db from '../config/Database.js';
import PaketWisata from './Paket_WisataModel.js';
import Users from './UserModel.js';

const Transaksi = db.define('transaksi', {
    order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
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
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    total_biaya: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    tanggal_berwisata: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    jumlah_orang: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true,
            isInt: true,
            min: 1
        }
    },
    no_wa: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isNumeric: true
        }
    },
    status_pembayaran: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending'
    },
    snap_token: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    snap_redirect_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUrl: true
        }
    }
}, {
    freezeTableName: true,
    timestamps: true // Optionally include timestamps (createdAt, updatedAt)
});

// Definisi Relasi
Users.hasMany(Transaksi, { foreignKey: 'user_id' });
PaketWisata.hasMany(Transaksi, { foreignKey: 'paket_id' });
Transaksi.belongsTo(PaketWisata, { foreignKey: 'paket_id', allowNull: false });
Transaksi.belongsTo(Users, { foreignKey: 'user_id', allowNull: false });

export default Transaksi;
