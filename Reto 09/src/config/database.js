import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL conectado");
    await sequelize.sync(); // Crear tablas
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export default sequelize;