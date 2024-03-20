import { act, renderHook, waitFor } from "@testing-library/react";
import { useProduct } from "../../hooks/useProduct";

describe("useProducts", () => {
	const mockAddToCart = jest.fn();
	const mockFetchProducts = jest.fn();

	it("Should attempt to fetch a set amount of items on hook init", async () => {
		mockFetchProducts.mockResolvedValue({ items: [] });
		renderHook(() =>
			useProduct({ addProductToCart: mockAddToCart, fetchProducts: mockFetchProducts, chunkSize: 12 })
		);
		await waitFor(() => {});
		expect(mockFetchProducts).toHaveBeenCalledWith({ page: 0, limit: 12 });
	});
	it("Should call fetch data function once more if hook receives a request from the client component", async () => {
		mockFetchProducts.mockResolvedValue({ items: [{}], hasMore: false });
		const { result } = renderHook(() =>
			useProduct({ addProductToCart: mockAddToCart, fetchProducts: mockFetchProducts, chunkSize: 12 })
		);
		await waitFor(() => {});
		await act(async () => {
			result.current.fetchNewProducts();
		});
		await waitFor(() => {});
		expect(mockFetchProducts).toHaveBeenCalledTimes(2);
	});
});
