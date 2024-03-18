import { Product } from "./Product.tsx";

export type Cart = {
	items: Product[];
	totalPrice: number;
	totalItems: number;
};
