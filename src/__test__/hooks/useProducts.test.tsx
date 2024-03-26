import { renderHook, waitFor } from "@testing-library/react";
import { useProduct } from "../../hooks/useProduct";
import { SnackbarProvider } from "../../context/useSnackbar";
import { PropsWithChildren } from "react";

describe("useProducts", () => {
	const mockAddToCart = jest.fn();
	const mockFetchProducts = jest.fn();
	const wrapper = ({ children }: PropsWithChildren) => <SnackbarProvider>{children}</SnackbarProvider>;

	it("Should attempt to fetch a set amount of items on hook init", async () => {
		mockFetchProducts.mockResolvedValue({ items: [] });
		renderHook(
			() =>
				useProduct({
					addProductToCart: mockAddToCart,
					fetchProducts: mockFetchProducts,
					chunkSize: 12,
					productSearchParams: { searchValue: "", activeCategory: "" },
				}),
			{ wrapper }
		);
		await waitFor(() => {});
		expect(mockFetchProducts).toHaveBeenCalledWith({ page: 0, limit: 12 }, { searchValue: "", activeCategory: "" });
	});
	it("Should reset items whenever a change on search params is detected", async () => {
		mockFetchProducts.mockResolvedValue({ items: [{ id: "1" }], hasMore: false });
		const component = renderHook(
			() =>
				useProduct({
					addProductToCart: mockAddToCart,
					fetchProducts: mockFetchProducts,
					chunkSize: 12,
					productSearchParams: { searchValue: "", activeCategory: "" },
				}),
			{ wrapper }
		);
		// Here the mock function is called 5 Times already; I expect next value to be 6
		component.rerender({ productSearchParams: { searchValue: "A", activeCategory: "" } });
		expect(mockFetchProducts).toHaveBeenCalledTimes(6);
	});
});
