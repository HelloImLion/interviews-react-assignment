import { Box, Grid } from "@mui/material";
import { HeavyComponent } from "../../components/HeavyComponent/HeavyComponent.tsx";
import { ProductCard } from "./components/ProductCard/ProductCard.tsx";
import { useProduct } from "../../hooks/useProduct.tsx";
import { useCart } from "../../context/useCart.tsx";

export const Products = () => {
	const { addProductToCart } = useCart();
	const { products, addToCart } = useProduct({ addProductToCart });

	return (
		<Box
			overflow="scroll"
			height="100%"
		>
			<Grid
				container
				spacing={2}
				p={2}
			>
				{products.map((product) => (
					<Grid
						item
						xs={4}
					>
						{/* Do not remove this */}
						<HeavyComponent />
						<ProductCard
							product={product}
							addToCart={addToCart}
						/>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};
