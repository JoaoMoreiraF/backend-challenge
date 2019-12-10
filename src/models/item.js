import Sequelize from 'sequelize'
import {sequelize} from '../database'

export const Item = sequelize.define('items', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true}, 
    name: { type: Sequelize.STRING(128), allowNull: false},
    description: { type: Sequelize.STRING(128), allowNull: false},
    price: { type: Sequelize.STRING(128), allowNull: false}
})
