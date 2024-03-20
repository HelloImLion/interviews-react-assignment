import { Box, Grid } from "@mui/material";
import { HeavyComponent } from "../../components/HeavyComponent/HeavyComponent.tsx";
import { ProductCard } from "./components/ProductCard/ProductCard.tsx";
import { useProduct } from "../../hooks/useProduct.tsx";
import { useCart } from "../../context/useCart.tsx";
import { fetchProducts } from "../../services/fetchProducts.ts";
import { useState, useEffect } from "react";
import { ProductsRequestDTO } from "../../types/dto/ProductsRequestDTO.ts";
import { PaginatedResult } from "../../types/PaginatedResult.ts";
import { Product } from "../../types/Product.tsx";

type ProductsProps = {
	fetchProducts: (params: ProductsRequestDTO) => Promise<PaginatedResult<Product>>;
};
function withProductConnection(Child: React.ComponentType<ProductsProps>) {
	const propsToPass: ProductsProps = { fetchProducts };

	return <Child {...propsToPass} />;
}

export const Products = ({ fetchProducts }: ProductsProps) => {
	const { addProductToCart } = useCart();
	const { products, addToCart, fetchNewProducts } = useProduct({ addProductToCart, fetchProducts, chunkSize: 12 });
	const [isAtEnd, setIsAtEnd] = useState<boolean>(false);

	function handleScroll() {
		const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

		const isBottom = scrollTop + clientHeight >= scrollHeight;
		setIsAtEnd(isBottom);
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	useEffect(() => {
		if (isAtEnd) {
			fetchNewProducts();
		}
	}, [isAtEnd, fetchNewProducts]);

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

export function ConnectedProducts() {
	return withProductConnection(Products);
}
