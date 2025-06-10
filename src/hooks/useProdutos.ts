// src/hooks/useProduto.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { produtoService } from "../service/produtoService";
import { Produto } from "@/types/Produto";

export const useProdutos = () => {
  //@ts-ignore
  return useQuery(["produtos"], produtoService.listar);
};

export const useProduto = (id: string) => {
  //@ts-ignore
  return useQuery(["produto", id], () => produtoService.buscarPorId(id), {
    enabled: !!id,
  });
};

export const useCriarProduto = () => {
  const queryClient = useQueryClient();
  //@ts-ignore
  return useMutation(produtoService.criar, {
    //@ts-ignore
    onSuccess: () => queryClient.invalidateQueries(["produtos"]),
  });
};

export const useAtualizarProduto = () => {
  const queryClient = useQueryClient();
  //@ts-ignore
  return useMutation(produtoService.atualizar, {
    //@ts-ignore
    onSuccess: () => queryClient.invalidateQueries(["produtos"]),
  });
};

export const useDeletarProduto = () => {
  const queryClient = useQueryClient();
  //@ts-ignore
  return useMutation(produtoService.deletar, {
    //@ts-ignore
    onSuccess: () => queryClient.invalidateQueries(["produtos"]),
  });
};
