import { Sequelize } from "sequelize";

const creditDb = new Sequelize(process.env.DB_NAME!, process.env.DB_USERNAME!, process.env.DB_PASSWORD!, {
	host: process.env.DB_HOST,
	port: parseInt(process.env.DATABASE_PORT!),
	dialect: "mysql",
});

export default creditDb;

