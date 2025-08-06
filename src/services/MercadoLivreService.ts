import api from "@/axios/axios";

type ProductData = {
  id: string;
  keyword: string;
  data_inclusao: string;
  data_atualizacao: string;
  posts: number;
  url: string;
};

type Attribute = {
  id: string;
  name: string;
  value_type: string;
  values?: { id: string; name: string }[];
  tags?: {
    required?: boolean;
  };
};
export class CMercadoLivre {

    async getByData(data: string) {
    const response = await api.get<ProductData[]>( `api/mercadolivre/histTrends/?data=${data}`);
    return response.data;
  }

  async create(data: { nome: string; preco: number }) {
    const response = await api.post( `api/mercadolivre/histTrends/?data=05/08/2025`, data);
    return response.data;
  }


  async  fetchAttributesForm(categoryId : string) {
      const res = await api.get(`/api/mercadolivre/categories/${categoryId}/attributes`);
      const required = res.data.filter((attr: Attribute) => attr.tags?.required);
      return required
    }
}
