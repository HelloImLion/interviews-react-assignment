import { useState } from "react";
import { PaginatedRequestDTO } from "../types/dto/PaginatedRequestDTO";
import { PaginatedResult } from "../types/PaginatedResult";

interface UsePaginationProps<T> {
	fetchDataFunction: (paginationParams: PaginatedRequestDTO) => Promise<PaginatedResult<T>>;
	chunkSize: number;
}

export function usePagination<T>({ fetchDataFunction, chunkSize }: UsePaginationProps<T>) {
	const [data, setData] = useState<T[]>([]);
	const [hasMore, setHasMore] = useState<boolean>(true);

	async function fetchData(): Promise<T[]> {
		if (hasMore === false) {
			return data;
		}
		const { items, hasMore: hasMoreResult } = await fetchDataFunction({
			page: data.length / chunkSize,
			limit: chunkSize,
		});
		setHasMore(hasMoreResult);
		const newData = [...data, ...items];
		setData(newData);
		return newData;
	}

	return {
		data,
		setData,
		fetchData,
	};
}
