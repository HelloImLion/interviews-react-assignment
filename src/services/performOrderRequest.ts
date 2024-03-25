import axios from "axios";
import { config } from "../config/config";

export async function performOrderRequest() {
	await axios.post(config.API.BASE_URL + config.API.ORDER_ENDPOINT);
}
