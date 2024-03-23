import { Box } from "@mui/material";
import { ListWrapper } from "../../components/ListWrapper/ListWrapper";
import { Dispatch, SetStateAction } from "react";

const drawerWidth = 180;

const categories = ["Fruit", "Vegetables", "Dairy", "Bakery", "Meat", "Seafood", "Snacks", "Beverages"];

type CategoriesProps = {
	activeCategory: string;
	setActiveCategory: Dispatch<SetStateAction<string>>;
};

export const Categories = ({ setActiveCategory, activeCategory }: CategoriesProps) => {
	return (
		<Box
			minWidth={drawerWidth}
			sx={{
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
		</Box>
	);
};
