import { Product } from "../Product";
import { PaginatedResponseDTO } from "./PaginatedResponseDTO";

export type ProductsResponseDTO = {
	products: Product[];
} & PaginatedResponseDTO;
