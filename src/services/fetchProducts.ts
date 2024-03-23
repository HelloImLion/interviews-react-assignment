import axios from "axios";
import { ProductsRequestDTO } from "../types/dto/ProductsRequestDTO";
import { ProductsResponseDTO } from "../types/dto/ProductsResponseDTO";
import { PaginatedResult } from "../types/PaginatedResult";
import { Product } from "../types/Product";
import { ProductSearchRequestParams } from "../types/ProductSearchRequestParams";

export async function fetchProducts(
	params: ProductsRequestDTO,
	searchParams?: ProductSearchRequestParams
): Promise<PaginatedResult<Product>> {
	const { data } = await axios.get<ProductsResponseDTO>("/products", {
		params: {
			...params,
			q: searchParams?.searchValue,
			category: searchParams?.activeCategory,
		},
	});
	return {
		hasMore: data.hasMore,
		total: data.total,
		items: data.products,
	};
}
