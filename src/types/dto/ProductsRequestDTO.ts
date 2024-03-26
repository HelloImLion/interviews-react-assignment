import { PaginatedRequest } from "../PaginatedRequest";

export type ProductsRequestDTO = {
	q?: string;
	category?: string;
} & PaginatedRequest;
