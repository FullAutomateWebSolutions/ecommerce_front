import api from "@/axios/axios";
import { Loja } from "@/components/form/LojaForm";

export class CStoreService {
  async getByData() {
    const response = await api.get<Loja[]>(`get_store`);
    return response.data;
  }

  async create(data: Loja) {
    const response = await api.post<Loja[]>(`/add_store`, data);
    return response.data;
  }

  async update(data: Loja) {
    const dados = { id: data.id, ...data };
    const response = await api.post<Loja[]>(`/add_store/att`, dados);
    return response.data;
  }
    async delete(id: string) {
    const dados = { id: id}
    const response = await api.post(`/delete_store`, dados);
    return response.data;
  }
}
