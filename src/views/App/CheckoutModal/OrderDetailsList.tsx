import { useCart } from "../../../context/useCart";
import { CartItem } from "../../../types/CartItem";
import { CheckoutItem } from "./CheckoutItem";

export function OrderDetailsList() {
	const { cart } = useCart();

	function getDescriptionFromItem({ product, quantity }: CartItem) {
		return `x${quantity} ${(product.price * quantity).toFixed(2)}€`;
	}

	return (
		<div>
			{cart.items.map(({ product, quantity }) => (
				<CheckoutItem
					name={product.name}
					description={getDescriptionFromItem({ product, quantity })}
				/>
			))}
		</div>
	);
}
