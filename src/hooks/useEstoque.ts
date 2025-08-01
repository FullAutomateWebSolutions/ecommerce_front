
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EstoqueService,MovimentacaoService } from "@/services/EstoqueService";

const estoqueService = new EstoqueService();
const movimentacaoService = new MovimentacaoService();

export function useEstoque() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["estoque"],
    queryFn: () => estoqueService.getAll(),
  });

  const create = useMutation({
    mutationFn: estoqueService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["estoque"] });
    },
  });
  
  return { list, create };
}

export function useMovimento() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["movimento"],
    queryFn: () => movimentacaoService.getAll(),
  });

  const create = useMutation({
    mutationFn: movimentacaoService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["movimento"] });
    },
  });
  
  return { list, create };
}