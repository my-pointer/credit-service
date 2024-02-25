import { BALANCE_DEFAULT, POINT_DEFAULT } from "../constants/credit";
import { balanceModel, balanceTransactionModel, creditInfoModel, creditTransactionModel } from "../db/model";
import { TBalance, TBalanceTransaction, TCreditInfo, TCreditTransaction } from "../interfaces/credit";
import { baseResponse, baseResponseWithData } from "../utils/baseResponse";
import { LOCALIZE as l } from "../constants/localization";
import { creditActionEnum } from "../enums/credit";

const initialCredit = async (customerId: number, username: string) => {
	try {
		const creditCardNumber: string = Math.floor(Math.random() * 9999999999999999).toString();
		const creditInfo: TCreditInfo = {
			point: POINT_DEFAULT,
			cardHolderName: username,
			cardNumber: creditCardNumber,
			customerId,
		};
		await creditInfoModel.create(creditInfo);

		const creditTransaction: TCreditTransaction = {
			customerId,
			previousPoint: POINT_DEFAULT,
			currentPoint: POINT_DEFAULT,
			action: creditActionEnum.RECEIVED,
		};
		await creditTransactionModel.create(creditTransaction);

		const balanceInfo: TBalance = {
			balance: BALANCE_DEFAULT,
			customerId,
		};
		await balanceModel.create(balanceInfo);

		const balanceTransaction: TBalanceTransaction = {
			customerId,
			previousBalance: BALANCE_DEFAULT,
			currentBalance: BALANCE_DEFAULT,
			action: creditActionEnum.RECEIVED,
		};
		await balanceTransactionModel.create(balanceTransaction);

		return baseResponse(200, l.SUCCESS);
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
};

const getCreditByCustomerId = async (customerId: number) => {
	try {
		const userCredit = await creditInfoModel.findOne({ where: { customerId } });
		const response = baseResponseWithData(userCredit !== null ? 200 : 404, l.SUCCESS, userCredit);
		return response;
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
};

const getBalanceByCustomerId = async (customerId: number) => {
	try {
		const userBalance = await balanceModel.findOne({ where: { customerId } });
		const response = baseResponseWithData(userBalance !== null ? 200 : 404, l.SUCCESS, userBalance);
		return response;
	} catch (error) {
		return baseResponse(500, (error as Error).message);
	}
};

export { initialCredit, getCreditByCustomerId, getBalanceByCustomerId };

