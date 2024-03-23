import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ListWrapper, ListWrapperProps } from "../../components/ListWrapper/ListWrapper";

const mockOnClick = jest.fn();

const listItems: ListWrapperProps = {
	items: [
		{ label: "Item1", onClick: mockOnClick, isActive: false },
		{ label: "Item2", onClick: mockOnClick, isActive: false },
		{ label: "Item3", onClick: mockOnClick, isActive: false },
		{ label: "Item4", onClick: mockOnClick, isActive: false },
		{ label: "Item5", onClick: mockOnClick, isActive: false },
	],
};

describe("ListWrapper", () => {
	it("Should properly display the itemInCart to the user", () => {
		const component = render(<ListWrapper items={listItems.items} />);
		const lastIndex = listItems.items.length - 1;
		const lastItem = listItems.items[lastIndex].label;
		const childNodes = component.container.firstChild?.childNodes ?? [];
		expect(childNodes[lastIndex].textContent).toBe(lastItem);
	});
});
