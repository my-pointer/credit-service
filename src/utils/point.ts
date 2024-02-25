import { POINT_MINIMUM_RATE, POINT_RETURN_PER_MINIMUM_RATE } from "../constants/credit";

const pointCalculate = (price: number) => {
	if (price < POINT_MINIMUM_RATE) {
		return 0;
	}
	const calculatePoint = Math.floor(price / POINT_RETURN_PER_MINIMUM_RATE);
	return calculatePoint;
};

export { pointCalculate };

