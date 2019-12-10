import Sequelize from 'sequelize'
import {sequelize} from '../database'
import {Item} from './item'


export const User = sequelize.define('user', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: Sequelize.STRING(128), allowNull: false, unique: true},
    email: {type: Sequelize.STRING(128), allowNull: false, unique: true},
    cnpj: {type: Sequelize.STRING(128), allowNull: false, unique: true},
    password: {type: Sequelize.STRING(128), allowNull: false},
    photo: Sequelize.STRING(128)

})

Item.belongsTo(User, {foreignKey: {allowNull: false, name: 'authorId'}})

User.sync()
Item.sync()

