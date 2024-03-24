import { ListWrapper } from "../../components/ListWrapper/ListWrapper";
import { Dispatch, SetStateAction } from "react";
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper";

const drawerWidth = 180;

const categories = ["Fruit", "Vegetables", "Dairy", "Bakery", "Meat", "Seafood", "Snacks", "Beverages"];

type CategoriesProps = {
	activeCategory: string;
	setActiveCategory: Dispatch<SetStateAction<string>>;
};

export const Categories = ({ setActiveCategory, activeCategory }: CategoriesProps) => {
	return (
		<BoxWrapper
			style={{
				minWidth: drawerWidth,
				borderRight: "1px solid grey",
			}}
		>
			<ListWrapper
				items={categories.map((s) => ({
					label: s,
					onClick: () => setActiveCategory(s),
					isActive: s === activeCategory,
				}))}
			/>
		</BoxWrapper>
	);
};
