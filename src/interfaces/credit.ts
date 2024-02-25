import { creditActionEnum } from "../enums/credit";

export type TCreditInfo = {
	point: number;
	cardNumber: string;
	cardHolderName: string;
	customerId: number;
	createdAt?: Date;
	updatedAt?: Date;
};

export type TCreditTransaction = {
	customerId: number;
	previousPoint: number;
	currentPoint: number;
	action: creditActionEnum;
	createdAt?: Date;
	updatedAt?: Date;
};

export type TBalance = {
	customerId: number;
	balance: number;
	createdAt?: Date;
	updatedAt?: Date;
};

export type TBalanceTransaction = {
	customerId: number;
	previousBalance: number;
	currentBalance: number;
	action: creditActionEnum;
	createdAt?: Date;
	updatedAt?: Date;
};

