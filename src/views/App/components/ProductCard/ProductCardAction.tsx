import { Box, IconButton, Typography, CircularProgress } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { ProductCardProps } from "./ProductCard.tsx";
import { useDebounce } from "../../../../hooks/useDebounce.tsx";
import { useEffect, useState } from "react";
import { useCart } from "../../../../context/useCart.tsx";

export function ProductCardAction({ addToCart, product }: ProductCardProps) {
	const { debounce } = useDebounce({ msDelay: 500 });
	const { productQuantityMap } = useCart();
	const [productQuantity, setProductQuantity] = useState<number>(0);

	useEffect(() => {
		if (product.loading === false) {
			setProductQuantity(0);
		}
	}, [product.loading]);

	function requestAddToCart(quantity: number) {
		setProductQuantity((pq) => pq + quantity);
		debounce(() => addToCart(product.id, productQuantity + quantity));
	}

	const productAmountInCart = (productQuantityMap.get(product.id) || 0) + productQuantity;

	return (
		<Box
			position="relative"
			display="flex"
			flexDirection="row"
			alignItems="center"
		>
			<Box
				position="absolute"
				left={0}
				right={0}
				top={0}
				bottom={0}
				textAlign="center"
			>
				{product.loading && <CircularProgress size={20} />}
			</Box>
			<IconButton
				disabled={product.loading || productAmountInCart === 0}
				aria-label="delete"
				size="small"
				onClick={() => requestAddToCart(-1)}
			>
				<RemoveIcon fontSize="small" />
			</IconButton>

			<Typography
				variant="body1"
				component="div"
				mx={1}
			>
				{productAmountInCart}
			</Typography>

			<IconButton
				disabled={product.loading}
				aria-label="add"
				size="small"
				onClick={() => requestAddToCart(1)}
			>
				<AddIcon fontSize="small" />
			</IconButton>
		</Box>
	);
}
