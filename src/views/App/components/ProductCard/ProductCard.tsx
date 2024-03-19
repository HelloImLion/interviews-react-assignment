import { CardWrapper } from "../../../../components/CardWrapper/CardWrapper";
import { Product } from "../../../../types/Product";
import { ProductCardAction } from "./ProductCardAction";

export interface ProductCardProps {
	addToCart: (productId: number, amount: number) => void;
	product: Product;
}

export function ProductCard({ product, addToCart }: ProductCardProps) {
	return (
		<CardWrapper
			key={product.id.toString()}
			imageUrl={product.imageUrl}
			title={product.name}
			actionDescription={"$" + product.price}
			description="Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
			renderAction={() => (
				<ProductCardAction
					product={product}
					addToCart={addToCart}
				/>
			)}
		/>
	);
}
