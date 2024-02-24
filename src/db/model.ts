import { DataTypes } from "sequelize";
import creditDb from "./connection";
import { creditActionEnum } from "../enums/credit";

const creditInfoModel = creditDb.define(
	"credit",
	{
		point: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
		cardNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
		customerId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
	},
	{ tableName: "tbm_credit_info" }
);

const creditTransactionModel = creditDb.define(
	"credit_transaction",
	{
		customerId: { type: DataTypes.INTEGER, allowNull: false },
		previousPoint: { type: DataTypes.INTEGER, allowNull: false },
		currentPoint: { type: DataTypes.INTEGER, allowNull: false },
		action: { type: DataTypes.ENUM, values: [creditActionEnum.RECEIVED, creditActionEnum.EXCHANGED] },
	},
	{ tableName: "tbt_credit_transaction" }
);

const balanceModel = creditDb.define(
	"balance",
	{
		customerId: { type: DataTypes.INTEGER, allowNull: false, unique: true },
		balance: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
	},
	{ tableName: "tbm_balance" }
);

export { creditInfoModel, creditTransactionModel, balanceModel };

