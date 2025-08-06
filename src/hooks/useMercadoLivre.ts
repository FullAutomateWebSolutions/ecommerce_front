import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/ProductService";
import { CMercadoLivre } from "@/services/MercadoLivreService";
import { useState } from "react";

const mercadoLivre = new CMercadoLivre();

type ProductData = {
  id: string;
  keyword: string;
  data_inclusao: string;
  data_atualizacao: string;
  posts: number;
  url: string;
};

export function useMercadoLivre() {
  const queryClient = useQueryClient();
  const [loadingRequest, setLoadingRequest] = useState<boolean>(true);

  const listByDate = useMutation({
    mutationFn: mercadoLivre.getByData,
    onSuccess: () => {
      queryClient.isFetching({ queryKey: ["Trends"] });
    },
  });

  const AttributeForm = useMutation({
    mutationFn: mercadoLivre.fetchAttributesForm,
    onMutate:()=>{
      setLoadingRequest(true)
    },
     onSuccess: () => {
      queryClient.isFetching({ queryKey: ["Attributs"] });
    },
  });

  return { listByDate,AttributeForm,loadingRequest };
}
