import { IBaseResponse } from "../interfaces/baseResponse";

function baseResponse(statusCode: number, message: string) {
	const response: IBaseResponse<null> = { status: statusCode, message: message ?? "" };
	return response;
}

function baseResponseWithData<T>(statusCode: number, message: string, data: T) {
	const response: IBaseResponse<T> = { status: statusCode, message: message ?? "", data: data ?? null };
	return response;
}

export { baseResponse, baseResponseWithData };
