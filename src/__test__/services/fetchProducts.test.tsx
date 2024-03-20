import axios from "axios";
import { fetchProducts } from "../../services/fetchProducts";
import { ProductsRequestDTO } from "../../types/dto/ProductsRequestDTO";

jest.mock("axios");
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("FetchProducts", () => {
	it("Should execute an api call with correct parameters passed", async () => {
		const requestParams: ProductsRequestDTO = { page: 10, limit: 10 };
		mockAxios.get.mockResolvedValueOnce({ data: { products: [] } });
		await fetchProducts(requestParams);
		expect(axios.get).toHaveBeenCalledWith("/products", { params: requestParams });
	});
});