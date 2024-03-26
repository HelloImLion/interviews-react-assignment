/*
    paginationData: state T
    isDone: state boolean 
*/

import { act, renderHook, waitFor } from "@testing-library/react";
import { usePagination } from "../../hooks/usePagination";
import { SnackbarProvider } from "../../context/useSnackbar";
import { PropsWithChildren } from "react";

describe("Use Pagination Test", () => {
	it("Should not call fetchData if hasMore state is equal to false", async () => {
		const mockFetchDataFunction = jest.fn().mockReturnValue({ items: [], hasMore: false });
		const wrapper = ({ children }: PropsWithChildren) => <SnackbarProvider>{children}</SnackbarProvider>;
		const { result } = renderHook(
			() => usePagination({ fetchDataFunction: mockFetchDataFunction, chunkSize: 12, requestParams: null }),
			{ wrapper }
		);

		act(() => {
			result.current.fetchData();
		});
		await waitFor(() => {});
		act(() => {
			result.current.fetchData();
		});

		expect(mockFetchDataFunction).toHaveBeenCalledTimes(2);
	});
	it("Should merge both data and items array when hasMode is not false", async () => {
		const mockFetchDataFunction = jest.fn().mockReturnValue({ items: ["Hello"], hasMore: true });
		const wrapper = ({ children }: PropsWithChildren) => <SnackbarProvider>{children}</SnackbarProvider>;
		const { result } = renderHook(
			() =>
				usePagination<string, null>({
					fetchDataFunction: mockFetchDataFunction,
					chunkSize: 12,
					requestParams: null,
				}),
			{ wrapper }
		);

		let firstIterationResult: string[];
		let secondIterationResult: string[];

		await act(async () => {
			firstIterationResult = await result.current.fetchData();
		});
		await waitFor(() => {});
		await act(async () => {
			secondIterationResult = await result.current.fetchData();
		});
		await waitFor(() => {
			expect(firstIterationResult.length).toBeLessThan(secondIterationResult.length);
		});
	});
});
