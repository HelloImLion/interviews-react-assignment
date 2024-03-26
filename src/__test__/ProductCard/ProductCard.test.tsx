import { render } from "@testing-library/react";
import { ProductCard } from "../../views/App/components/ProductCard/ProductCard";
import { Product } from "../../types/Product";
import { CartProvider } from "../../context/useCart";
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

describe("ProductCard", () => {
	it("should display product name properly", () => {
		const mockAddToCart = jest.fn();

		const component = render(
			<SnackbarProvider>
				<CartProvider>
					<ProductCard
						addToCart={mockAddToCart}
						product={baseMockProduct}
					/>
				</CartProvider>
			</SnackbarProvider>
		);

		const productNameElement = component.getByText(baseMockProduct.name);

		expect(productNameElement.innerHTML).toBe(baseMockProduct.name);
	});
});
