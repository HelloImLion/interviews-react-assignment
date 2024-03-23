import { useEffect, useState } from "react";
import { PaginatedRequestDTO } from "../types/dto/PaginatedRequestDTO";
import { PaginatedResult } from "../types/PaginatedResult";

interface UsePaginationProps<T, K> {
	fetchDataFunction: (paginationParams: PaginatedRequestDTO, requestParams?: K) => Promise<PaginatedResult<T>>;
	requestParams?: K;
	chunkSize: number;
}

export function usePagination<T, K>({ fetchDataFunction, chunkSize, requestParams }: UsePaginationProps<T, K>) {
	const [data, setData] = useState<T[] | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);

	useEffect(() => {
		if (data === null) {
			if (hasMore === true) {
				fetchData();
			} else {
				setHasMore(true);
			}
		}
	}, [data, hasMore]);

	async function fetchData(): Promise<T[]> {
		if (hasMore === false) {
			return data ?? [];
		}
		const { items, hasMore: hasMoreResult } = await fetchDataFunction(
			{
				page: (data?.length ?? 0) / chunkSize,
				limit: chunkSize,
			},
			requestParams
		);
		setHasMore(hasMoreResult);
		const newData = [...(data ?? []), ...items];
		setData(newData);
		return newData;
	}

	return {
		data,
		setData,
		fetchData,
	};
}
