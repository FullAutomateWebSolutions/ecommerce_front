
export type IFinalizadora = {
  id: number;
  cod_int_sap_sim: string;
  cod_rede: string | number | null;
  desc_rede: string ;
  cod_bandeira: string | number | null;
  desc_bandeira: string ;
  data_cadastro?: string;
  data_ultima_modificacao?: string;
  user_id_mod?: string;
  desc_finalizadora: string ;
  cod_finalizadora: number ;
  tipo_crtl: string;
  ind_status: boolean;
};
