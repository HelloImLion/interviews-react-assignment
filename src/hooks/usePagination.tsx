import { useEffect, useState } from "react";
import { PaginatedRequest } from "../types/PaginatedRequest";
import { PaginatedResult } from "../types/PaginatedResult";
import { useSnackbar } from "../context/useSnackbar";

interface UsePaginationProps<T, K> {
	fetchDataFunction: (paginationParams: PaginatedRequest, requestParams?: K) => Promise<PaginatedResult<T>>;
	requestParams?: K;
	chunkSize: number;
}

export function usePagination<T, K>({ fetchDataFunction, chunkSize, requestParams }: UsePaginationProps<T, K>) {
	const [data, setData] = useState<T[] | null>(null);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const { sendMessage } = useSnackbar();

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
		try {
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
		} catch {
			sendMessage({ message: "Error while trying to fetch new products", variant: "error" });
			setData(data ?? []);
			return data ?? [];
		}
	}

	return {
		data,
		setData,
		fetchData,
	};
}
