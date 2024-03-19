import { createContext, useContext, useState } from "react";
import { Cart } from "../types/Cart";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO";
import { updateCartProducts } from "../services/updateCardProducts";

type CartContextState = {
	cart: Cart;
	addProductToCart: (requestBody: AddToCartRequestDTO) => Promise<void>;
};

const CartContext = createContext<CartContextState | undefined>(undefined);

const baseCart: Cart = {
	items: [],
	totalPrice: 0,
	totalItems: 0,
};

export function CartProvider({ children }: React.PropsWithChildren) {
	const [cart, setCart] = useState<Cart>(baseCart);

	async function addProductToCart(requestBody: AddToCartRequestDTO) {
		const cart = await updateCartProducts(requestBody);
		setCart(cart);
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addProductToCart,
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
