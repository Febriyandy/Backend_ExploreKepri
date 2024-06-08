import {Sequelize} from "sequelize";

const db = new Sequelize('Explorekepri', 'root', 'Febriyandy23', {
    host: "localhost",
    dialect: "mysql"
});

export default db;