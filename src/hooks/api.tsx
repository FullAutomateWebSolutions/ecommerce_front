import { UseMutationOptions } from "@tanstack/react-query";
import { useGenericDelete, useGenericGet, useGenericPost } from "./useQuery";
import { IFinalizadora } from "../types/IFinalizadora";

type UseGenericPostOptions<TData, TVariables> = UseMutationOptions<
  TData,
  unknown,
  TVariables
>;

type CreateVariables = Partial<IFinalizadora[]>;
type DeleteSettingDetail = { id: number };

export const useDeleteSetting = (
  options?: UseGenericPostOptions<DeleteSettingDetail, number>
) => {
  return useGenericDelete("/finalizadora", "finalizadora", options);
};

export const useGetSettings = () => {
  return useGenericGet("/finalizadora/all", "finalizadora", {
    retry: 2,
    refetchOnWindowFocus: true,
  });
};

export const usePostSettings = (
  options?: UseGenericPostOptions<IFinalizadora[], CreateVariables>
) => {
  return useGenericPost<IFinalizadora[], CreateVariables>("/finalizadora","finalizadora",options);
};
