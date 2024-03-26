import { Grid } from "@mui/material";
import { HeavyComponent } from "../../components/HeavyComponent/HeavyComponent.tsx";
import { ProductCard } from "./components/ProductCard/ProductCard.tsx";
import { useProduct } from "../../hooks/useProduct.tsx";
import { useCart } from "../../context/useCart.tsx";
import { fetchProducts } from "../../services/fetchProducts.ts";
import { useState, useEffect } from "react";
import { ProductsRequestDTO } from "../../types/dto/ProductsRequestDTO.ts";
import { PaginatedResult } from "../../types/PaginatedResult.ts";
import { Product } from "../../types/Product.tsx";
import { ProductSearchRequestParams } from "../../types/ProductSearchRequestParams.tsx";
import { BoxWrapper } from "../../components/BoxWrapper/BoxWrapper.tsx";

type ProductsProps = {
	fetchProducts: (
		params: ProductsRequestDTO,
		searchParams?: ProductSearchRequestParams
	) => Promise<PaginatedResult<Product>>;
	productSearchParams: ProductSearchRequestParams;
};

function withProductConnection(
	Child: React.ComponentType<ProductsProps>,
	productSearchParams: ProductSearchRequestParams
) {
	const propsToPass: ProductsProps = { fetchProducts, productSearchParams };

	return <Child {...propsToPass} />;
}

export const Products = ({ fetchProducts, productSearchParams }: ProductsProps) => {
	const { addProductToCart } = useCart();
	const { products, addToCart, fetchNewProducts } = useProduct({
		addProductToCart,
		fetchProducts,
		chunkSize: 12,
		productSearchParams,
	});
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
			setIsAtEnd(false);
		}
	}, [isAtEnd, fetchNewProducts]);

	return (
		<BoxWrapper
			style={{
				height: "100%",
				overflow: "scroll",
			}}
		>
			<Grid
				container
				spacing={2}
				p={2}
			>
				{products.map((product, i) => (
					<Grid
						key={"products_" + i}
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
		</BoxWrapper>
	);
};

export function ConnectedProducts(productSearchParams: ProductSearchRequestParams) {
	return withProductConnection(Products, productSearchParams);
}
