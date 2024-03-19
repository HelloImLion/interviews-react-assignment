import { useEffect, useState } from "react";
import { Product } from "../types/Product.tsx";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO.ts";
import { fetchProducts } from "../services/fetchProducts.ts";

export type UseProductProps = {
	addProductToCart: (cart: AddToCartRequestDTO) => Promise<void>;
};

export type UseProductState = {
	products: Product[];
	addToCart: (productId: number, quantity: number) => void;
};

type ProductLoadingStateParams = {
	idToFind: number;
	quantity: number;
};

// TODO: Find a better function name
function startProductLoadingState(products: Product[], idToFind: number) {
	return products.map((product) => {
		if (product.id === idToFind) {
			return {
				...product,
				loading: true,
			};
		}
		return product;
	});
}

// TODO: Find a better function name
function endProductLoadingState(products: Product[], { idToFind, quantity }: ProductLoadingStateParams) {
	return products.map((product) => {
		if (product.id === idToFind) {
			return {
				...product,
				itemInCart: (product.itemInCart || 0) + quantity,
				loading: false,
			};
		}
		return product;
	});
}

export function useProduct({ addProductToCart }: UseProductProps): UseProductState {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		fetchProducts().then((products) => setProducts(products));
	}, []);

	async function addToCart(productId: number, quantity: number) {
		// TODO: Find a better name
		const productsWithActiveLoading = startProductLoadingState(products, productId);
		setProducts(productsWithActiveLoading);
		await addProductToCart({ productId, quantity });
		const productsWithLoadingOff = endProductLoadingState(products, { idToFind: productId, quantity });
		setProducts(productsWithLoadingOff);
	}

	return { products, addToCart };
}
