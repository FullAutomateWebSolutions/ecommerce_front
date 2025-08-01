import api from "@/axios/axios";
import { Movimentacao, ProductInventory } from "@/types/inventory";




export class EstoqueService {
  async getAll(): Promise<ProductInventory[]> {
    const response = await api.get("/get_est_product");
    return response.data;
  }

  async create(data: { nome: string; preco: number }) {
    const response = await api.post("/add_inventory", data);
    return response.data;
  }
}

export class MovimentacaoService {


  async create(data: {  produtoId: string,
      tipo?: string,
      origem?: string,
      de?: string,
      ate?: string}): Promise<Movimentacao[]> {
    const response = await api.post("/get_movimento", data);
    return response.data;
  }
}
