import { ConnectedProducts } from "./Products.tsx";
import { Box, CssBaseline } from "@mui/material";
import { Categories } from "./Categories.tsx";
import { CartProvider } from "../../context/useCart.tsx";
import SearchAppBar from "./components/SearchAppBar/SearchAppBar.tsx";

function App() {
	return (
		<CartProvider>
			<Box
				height="100vh"
				display="flex"
				flexDirection="column"
			>
				<CssBaseline />
				<SearchAppBar />
				<Box
					flex={1}
					display="flex"
					flexDirection="row"
				>
					<Categories />
					<Box flex={1}>
						<ConnectedProducts />
					</Box>
				</Box>
			</Box>
		</CartProvider>
	);
}

export default App;
