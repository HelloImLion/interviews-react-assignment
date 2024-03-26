import { CartItem } from "./CartItem.ts";

export type Cart = {
	items: CartItem[];
	totalPrice: number;
	totalItems: number;
};
