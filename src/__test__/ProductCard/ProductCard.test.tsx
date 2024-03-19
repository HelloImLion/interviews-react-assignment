import { render } from "@testing-library/react";
import { ProductCard } from "../../views/App/components/ProductCard/ProductCard";
import { Product } from "../../types/Product";

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
			<ProductCard
				addToCart={mockAddToCart}
				product={baseMockProduct}
			/>
		);

		const productNameElement = component.getByText(baseMockProduct.name);

		expect(productNameElement.innerHTML).toBe(baseMockProduct.name);
	});
});
