import { Box } from "@mui/material";
import { ListWrapper } from "../../components/ListWrapper/ListWrapper";

const drawerWidth = 180;

const categories = ["Fruit", "Vegetables", "Dairy", "Bakery", "Meat", "Seafood", "Snacks", "Beverages"];

export const Categories = () => {
	return (
		<Box
			minWidth={drawerWidth}
			sx={{
				borderRight: "1px solid grey",
			}}
		>
			<ListWrapper items={categories.map((s) => ({ label: s, onClick: () => {} }))} />
		</Box>
	);
};
