import { useEffect } from "react";
import { Product } from "../types/Product.tsx";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO.ts";
import { ProductsRequestDTO } from "../types/dto/ProductsRequestDTO.ts";
import { usePagination } from "./usePagination.tsx";
import { PaginatedResult } from "../types/PaginatedResult.ts";

export type UseProductProps = {
	addProductToCart: (cart: AddToCartRequestDTO) => Promise<void>;
	fetchProducts: (products: ProductsRequestDTO) => Promise<PaginatedResult<Product>>;
	chunkSize: number;
};

export type UseProductState = {
	products: Product[];
	addToCart: (productId: number, quantity: number) => void;
	fetchNewProducts: () => void;
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

export function useProduct({ addProductToCart, fetchProducts, chunkSize }: UseProductProps): UseProductState {
	const {
		data: products,
		setData: setProducts,
		fetchData,
	} = usePagination({ fetchDataFunction: fetchProducts, chunkSize });

	useEffect(() => {
		fetchData();
	}, []);

	async function addToCart(productId: number, quantity: number) {
		// TODO: Find a better name
		const productsWithActiveLoading = startProductLoadingState(products, productId);
		setProducts(productsWithActiveLoading);
		await addProductToCart({ productId, quantity });
		const productsWithLoadingOff = endProductLoadingState(products, { idToFind: productId, quantity });
		setProducts(productsWithLoadingOff);
	}

	function fetchNewProducts() {
		fetchData();
	}

	return { products, addToCart, fetchNewProducts };
}
