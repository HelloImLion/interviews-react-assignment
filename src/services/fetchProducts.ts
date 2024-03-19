import axios from "axios";
import { Product } from "../types/Product";

export async function fetchProducts(): Promise<Product[]> {
	const { data: products } = await axios.get("/products?limit=200");
	return products.products;
}
