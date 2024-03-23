import { act, renderHook, waitFor } from "@testing-library/react";
import { useProduct } from "../../hooks/useProduct";

describe("useProducts", () => {
	const mockAddToCart = jest.fn();
	const mockFetchProducts = jest.fn();

	it("Should attempt to fetch a set amount of items on hook init", async () => {
		mockFetchProducts.mockResolvedValue({ items: [] });
		renderHook(() =>
			useProduct({
				addProductToCart: mockAddToCart,
				fetchProducts: mockFetchProducts,
				chunkSize: 12,
				productSearchParams: { searchValue: "", activeCategory: "" },
			})
		);
		await waitFor(() => {});
		expect(mockFetchProducts).toHaveBeenCalledWith({ page: 0, limit: 12 }, { searchValue: "", activeCategory: "" });
	});
	// TODO: Rewrite this test
	it("Should call fetch data function once more if hook receives a request from the client component", async () => {
		mockFetchProducts.mockResolvedValue({ items: [{}], hasMore: false });
		const { result } = renderHook(() =>
			useProduct({
				addProductToCart: mockAddToCart,
				fetchProducts: mockFetchProducts,
				chunkSize: 12,
				productSearchParams: { searchValue: "", activeCategory: "" },
			})
		);
		await waitFor(() => {});
		await act(async () => {
			result.current.fetchNewProducts();
		});
		await waitFor(() => {});
		expect(mockFetchProducts).toHaveBeenCalledTimes(3);
	});
	it("Should reset items whenever a change on search params is detected", async () => {
		mockFetchProducts.mockResolvedValue({ items: [{ id: "1" }], hasMore: false });
		const component = renderHook(() =>
			useProduct({
				addProductToCart: mockAddToCart,
				fetchProducts: mockFetchProducts,
				chunkSize: 12,
				productSearchParams: { searchValue: "", activeCategory: "" },
			})
		);
		await waitFor(() => {});
		component.rerender({ productSearchParams: { searchValue: "A", activeCategory: "" } });
		await waitFor(() => {
			expect(mockFetchProducts).toHaveBeenCalledTimes(4);
		});
	});
});
