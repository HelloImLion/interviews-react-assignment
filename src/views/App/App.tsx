import { ConnectedProducts } from "./Products.tsx";
import { Box, CssBaseline } from "@mui/material";
import { Categories } from "./Categories.tsx";
import { CartProvider } from "../../context/useCart.tsx";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar.tsx";
import { useState } from "react";

function App() {
	const [activeCategory, setActiveCategory] = useState<string>("");
	const [searchValue, setSearchValue] = useState<string>("");

	return (
		<CartProvider>
			<Box
				height="100vh"
				display="flex"
				flexDirection="column"
			>
				<CssBaseline />
				<SearchAppBar setSearchValue={setSearchValue} />
				<Box
					flex={1}
					display="flex"
					flexDirection="row"
				>
					<Categories
						setActiveCategory={setActiveCategory}
						activeCategory={activeCategory}
					/>
					<Box flex={1}>
						<ConnectedProducts
							activeCategory={activeCategory}
							searchValue={searchValue}
						/>
					</Box>
				</Box>
			</Box>
		</CartProvider>
	);
}

export default App;
