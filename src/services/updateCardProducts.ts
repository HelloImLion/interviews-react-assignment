import axios from "axios";
import { Cart } from "../types/Cart";
import { AddToCartRequestDTO } from "../types/dto/AddToCartRequestDTO";

export async function updateCartProducts(requestBody: AddToCartRequestDTO): Promise<Cart> {
	const { data: cart } = await axios.post<Cart>("/cart", requestBody);
	return cart;
}
