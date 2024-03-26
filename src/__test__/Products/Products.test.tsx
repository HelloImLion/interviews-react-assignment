import { act, fireEvent, render } from "@testing-library/react";
import { Products } from "../../views/App/Products";
import { CartProvider } from "../../context/useCart";
import { Product } from "../../types/Product";
import { SnackbarProvider } from "../../context/useSnackbar";

const baseMockProduct: Product = {
	id: 0,
	name: "Banana",
	imageUrl: "",
	price: 0,
	category: "",
	itemInCart: 10,
	loading: false,
};

describe("Products component with infinite scroll", () => {
	it("should call fetchNewProducts twice when user scrolls to the end", async () => {
		const mockFetchProduct = jest.fn();
		mockFetchProduct.mockReturnValue({ items: [...Array(20).keys()].map(() => baseMockProduct), hasMore: true });

		jest.mock("../../context/useCart", () => ({
			useCart: jest.fn(() => ({ addProductToCart: jest.fn() })),
		}));

		await act(async () => {
			render(
				<SnackbarProvider>
					<CartProvider>
						<Products
							fetchProducts={mockFetchProduct}
							productSearchParams={{
								activeCategory: "",
								searchValue: "",
							}}
						/>
					</CartProvider>
				</SnackbarProvider>
			);
			Object.defineProperty(document.documentElement, "scrollHeight", { value: 100 });
			Object.defineProperty(document.documentElement, "clientHeight", { value: 100 });
		});
		fireEvent.scroll(window, { target: { scrollY: 200 } });
		expect(mockFetchProduct).toHaveBeenCalledTimes(3);
	});
});
