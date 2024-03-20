import axios from "axios";
import { ProductsRequestDTO } from "../types/dto/ProductsRequestDTO";
import { ProductsResponseDTO } from "../types/dto/ProductsResponseDTO";
import { PaginatedResult } from "../types/PaginatedResult";
import { Product } from "../types/Product";

export async function fetchProducts(params: ProductsRequestDTO): Promise<PaginatedResult<Product>> {
	const { data } = await axios.get<ProductsResponseDTO>("/products", { params });
	return {
		hasMore: data.hasMore,
		total: data.total,
		items: data.products,
	};
}
