import { DataTypes } from 'sequelize';
import Sequelize from '../config/database.js';

const Author = Sequelize.define('Author', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull:false
    },
    nationality: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    dateBirth: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'authors',
    timestamps: false
});

export default Author;