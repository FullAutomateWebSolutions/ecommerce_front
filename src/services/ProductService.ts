
import api from "@/api/axiosInstance";

export class ProductService {
  async getAll() {
    const response = await api.get("/search_all_product");
    return response.data;
  }

  async create(data: { nome: string; preco: number }) {
    const response = await api.post("/search_all_product", data);
    return response.data;
  }
}
