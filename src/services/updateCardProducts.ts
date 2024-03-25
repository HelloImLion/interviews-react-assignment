import axios from "axios";
import { Cart } from "../types/Cart";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO";
import { config } from "../config/config";

export async function updateCartProducts(requestBody: AddToCartRequestDTO): Promise<Cart> {
	const { data: cart } = await axios.post<Cart>(config.API.BASE_URL + config.API.CART_ENDPOINT, requestBody);
	return cart;
}
