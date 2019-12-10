import Sequelize from 'sequelize'

export let sequelize = new Sequelize('softcom_challenge', process.env.DB_USER || 'postgres', process.env.DB_PASSWORD || '12345', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    operatorsAliases: false
});