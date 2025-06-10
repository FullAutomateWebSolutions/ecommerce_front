// src/services/produtoService.ts
import axios from "axios";
import { Produto } from "@/types/Produto";

const API_URL = 'locahost:3000' + "/produtos";

export const produtoService = {
  listar: () => axios.get<Produto[]>(API_URL).then(res => res.data),

  buscarPorId: (id: string) =>
    axios.get<Produto>(`${API_URL}/${id}`).then(res => res.data),

  criar: (produto: Produto) =>
    axios.post<Produto>(API_URL, produto).then(res => res.data),

  atualizar: (produto: Produto) =>
    axios.put<Produto>(`${API_URL}/${produto.id}`, produto).then(res => res.data),

  deletar: (id: string) =>
    axios.delete(`${API_URL}/${id}`).then(res => res.data),
};
