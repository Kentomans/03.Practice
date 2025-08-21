import { DataTypes } from 'sequelize';
import Sequelize from '../config/database.js';

const Review = Sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    punctuation: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    },
    dateReview: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'reviews',
    timestamps: false
});

export default Review;