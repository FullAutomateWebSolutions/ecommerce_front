import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CStoreService } from "@/services/storeService";

const storesService = new CStoreService();

export function useLoja() {
  const queryClient = useQueryClient();

  const list = useQuery({
    queryKey: ["loja"],
    queryFn: () => storesService.getByData(),
  });

  const create = useMutation({
    mutationFn: storesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loja"] });
    },
  });
    const delete_ = useMutation({
    mutationFn: storesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loja"] });
    },
  });

  const update = useMutation({
    mutationFn: storesService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["loja"] });
    },
  });

  return { list, create, update ,delete_};
}
