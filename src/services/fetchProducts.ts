import axios from "axios";
import { ProductsResponseDTO } from "../types/dto/ProductsResponseDTO";
import { PaginatedResult } from "../types/PaginatedResult";
import { Product } from "../types/Product";
import { ProductSearchRequestParams } from "../types/ProductSearchRequestParams";
import { config } from "../config/config";
import { ProductsRequestDTO } from "../types/dto/ProductsRequestDTO";
import { PaginatedRequest } from "../types/PaginatedRequest";

export async function fetchProducts(
	params: PaginatedRequest,
	searchParams?: ProductSearchRequestParams
): Promise<PaginatedResult<Product>> {
	const requestParams: ProductsRequestDTO = {
		...params,
		q: searchParams?.searchValue,
		category: searchParams?.activeCategory,
	};

	const { data } = await axios.get<ProductsResponseDTO>(config.API.BASE_URL + config.API.PRODUCTS_ENDPOINT, {
		params: requestParams,
	});
	return {
		hasMore: data.hasMore,
		total: data.total,
		items: data.products,
	};
}
