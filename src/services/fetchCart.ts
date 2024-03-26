import axios from "axios";
import { Cart } from "../types/Cart";
import { config } from "../config/config";
import { CartResponseDTO } from "../types/dto/CartResponseDTO";
import { getBaseCart } from "../utils/getBaseCart";

export async function fetchCart(): Promise<Cart> {
	const { data } = await axios.get<CartResponseDTO>(config.API.BASE_URL + config.API.CART_ENDPOINT);
	const dataIsEmptyObject = Object.keys(data).length === 0;
	const cart: Cart = dataIsEmptyObject ? getBaseCart() : (data as Cart);
	return cart;
}
