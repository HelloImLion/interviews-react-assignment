import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Cart } from "../types/Cart";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO";
import { updateCartProducts } from "../services/updateCardProducts";
import { getBaseCart } from "../utils/getBaseCart";
import { fetchCart } from "../services/fetchCart";
import { useSnackbar } from "./useSnackbar";
import { performOrderRequest } from "../services/performOrderRequest";

type CartContextState = {
	cart: Cart;
	addProductToCart: (requestBody: AddToCartRequestDTO) => Promise<void>;
	productQuantityMap: Map<number, number>;
	finishOrder: () => Promise<void>;
};

const CartContext = createContext<CartContextState | undefined>(undefined);

const baseCartInstance: Cart = getBaseCart();

export function CartProvider({ children }: React.PropsWithChildren) {
	const [cart, setCart] = useState<Cart>(baseCartInstance);
	const { sendMessage } = useSnackbar();

	const productQuantityMap: Map<number, number> = useMemo(() => getProductQuantityMapFromCart(cart), [cart.items]);

	async function addProductToCart(requestBody: AddToCartRequestDTO) {
		const cart = await updateCartProducts(requestBody);
		setCart(cart);
	}

	async function initCart() {
		try {
			const cart = await fetchCart();
			setCart(cart);
		} catch {
			setCart(getBaseCart());
		}
	}

	async function finishOrder() {
		try {
			await performOrderRequest();
			setCart(getBaseCart());
		} catch (err) {
			initCart();
			sendMessage({
				message: "An error has occurred while trying to finish the order. Please try again.",
				variant: "error",
			});
			throw new Error();
		}
	}

	useEffect(() => {
		if (cart === baseCartInstance) {
			initCart();
		}
	}, [cart]);

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
				finishOrder,
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
