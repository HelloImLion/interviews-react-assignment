import { Product } from "../Product";
import { PaginatedResponse } from "../PaginatedResponse";

export type ProductsResponseDTO = {
	products: Product[];
} & PaginatedResponse;
