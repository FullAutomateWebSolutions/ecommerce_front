
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/services/ProductService";

const productService = new ProductService();

export function useProducts() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["produtos"],
    queryFn: () => productService.getAll(),
  });

  const create = useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["produtos"] });
    },
  });
  
  return { list, create };
}
