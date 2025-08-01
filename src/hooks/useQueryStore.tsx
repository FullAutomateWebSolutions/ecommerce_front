import api from '@/axios/axios';
import { useMutation, UseMutationOptions, useQuery, useQueryClient } from '@tanstack/react-query';

interface IPropUseGenericGet {
  endpoint: string;
  queryKey: string;
  options?: object;
}

interface IPropUseGenericPost<TData = any, TVariables = any, TError = any, TContext = unknown> {
  endpoint: string;
  queryKey: string;
  options?: UseMutationOptions<TData, TError, TVariables, TContext>;
  onSuccessCallback?: (data: TData) => void;
}

export const useGenericGet = ({ endpoint, queryKey, options = {} }: IPropUseGenericGet) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => api.get(endpoint).then((res) => res.data),
    ...options,
  });
};

export const useGenericPost = <TData = any, TVariables = any, TError = any, TContext = unknown>({
  endpoint,
  queryKey,
  options = {},
  onSuccessCallback,
}: IPropUseGenericPost<TData, TVariables, TError, TContext>) => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: async (body: TVariables) => {
      const res = await api.post(endpoint, body);
    
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    ...options,
  });
};
