import { Cart } from "../types/Cart";

export function getBaseCart(): Cart {
	return {
		items: [],
		totalPrice: 0,
		totalItems: 0,
	};
}
