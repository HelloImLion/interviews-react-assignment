import { createContext, useContext, useMemo, useState } from "react";
import { Cart } from "../types/Cart";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO";
import { updateCartProducts } from "../services/updateCardProducts";

type CartContextState = {
	cart: Cart;
	addProductToCart: (requestBody: AddToCartRequestDTO) => Promise<void>;
	productQuantityMap: Map<number, number>;
};

const CartContext = createContext<CartContextState | undefined>(undefined);

const baseCart: Cart = {
	items: [],
	totalPrice: 0,
	totalItems: 0,
};

export function CartProvider({ children }: React.PropsWithChildren) {
	const [cart, setCart] = useState<Cart>(baseCart);

	const productQuantityMap: Map<number, number> = useMemo(() => getProductQuantityMapFromCart(cart), [cart.items]);

	async function addProductToCart(requestBody: AddToCartRequestDTO) {
		const cart = await updateCartProducts(requestBody);
		setCart(cart);
	}

	function getProductQuantityMapFromCart({ items }: Cart) {
		const itemQuantityMap = new Map<number, number>();
		items.forEach(({ product, quantity }) => {
			itemQuantityMap.set(product.id, quantity);
		});
		return itemQuantityMap;
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addProductToCart,
				productQuantityMap,
			}}
		>
			{children}
		</CartContext.Provider>
	);
}

export function useCart() {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
}
