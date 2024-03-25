import { useEffect } from "react";
import { Product } from "../types/Product.tsx";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO.ts";
import { ProductsRequestDTO } from "../types/dto/ProductsRequestDTO.ts";
import { usePagination } from "./usePagination.tsx";
import { PaginatedResult } from "../types/PaginatedResult.ts";
import { ProductSearchRequestParams } from "../types/ProductSearchRequestParams.tsx";
import { useSnackbar } from "../context/useSnackbar.tsx";

export type UseProductProps = {
	addProductToCart: (cart: AddToCartRequestDTO) => Promise<void>;
	fetchProducts: (
		products: ProductsRequestDTO,
		searchParams?: ProductSearchRequestParams
	) => Promise<PaginatedResult<Product>>;
	chunkSize: number;
	productSearchParams: ProductSearchRequestParams;
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

export function useProduct({
	addProductToCart,
	fetchProducts,
	chunkSize,
	productSearchParams,
}: UseProductProps): UseProductState {
	const {
		data: products,
		setData: setProducts,
		fetchData,
	} = usePagination({ fetchDataFunction: fetchProducts, chunkSize, requestParams: productSearchParams });
	const { sendMessage } = useSnackbar();

	useEffect(() => {
		if (products === null) {
			fetchData();
		}
	}, [products]);

	useEffect(() => {
		console.debug(products);
		setProducts(null);
	}, [productSearchParams]);

	async function addToCart(productId: number, quantity: number) {
		try {
			setProducts((products) => startProductLoadingState(products ?? [], productId));
			await addProductToCart({ productId, quantity });
		} catch {
			sendMessage({ message: "Error while trying to add product to cart ", variant: "error" });
		} finally {
			setProducts((products) => endProductLoadingState(products ?? [], { idToFind: productId, quantity }));
		}
	}

	function fetchNewProducts() {
		fetchData();
	}

	return { products: products ?? [], addToCart, fetchNewProducts };
}
