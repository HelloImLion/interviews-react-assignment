import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ProductCardAction } from "../../views/App/components/ProductCard/ProductCardAction";
import { Product } from "../../types/Product";

const baseMockProduct: Product = {
	id: 0,
	name: "",
	imageUrl: "",
	price: 0,
	category: "",
	itemInCart: 10,
	loading: false,
};

const mockAddToCart = jest.fn();

describe("ProductCardAction", () => {
	it("Should properly display the itemInCart to the user", () => {
		const expectedItemAmount = 10;
		const mockProduct: Product = { ...baseMockProduct, itemInCart: expectedItemAmount };

		const component = render(
			<ProductCardAction
				product={mockProduct}
				addToCart={mockAddToCart}
			/>
		);
		const element = component.getByText(expectedItemAmount);

		expect(element.innerHTML).toBe(expectedItemAmount.toString());
	});
	it("Should trigger addToCart function with amount parameter equal to 1 on AddIcon click", () => {
		const expectedIncrementValue = 1;
		const component = render(
			<ProductCardAction
				product={baseMockProduct}
				addToCart={mockAddToCart}
			/>
		);

		const element = component.getByLabelText("add");
		element.click();
		expect(mockAddToCart).toHaveBeenCalledWith(baseMockProduct.id, expectedIncrementValue);
	});
	it("Should trigger addToCart function with amount parameter equal to -1 on RemoveIcon click", () => {
		const expectedIncrementValue = -1;
		const component = render(
			<ProductCardAction
				product={baseMockProduct}
				addToCart={mockAddToCart}
			/>
		);

		const element = component.getByLabelText("delete");
		element.click();
		expect(mockAddToCart).toHaveBeenCalledWith(baseMockProduct.id, expectedIncrementValue);
	});
});
