export type PaginatedResult<T> = {
	items: T[];
	hasMore: boolean;
	total: number;
};
