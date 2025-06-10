export interface Produto {
  id?:string;
  description: string;
  gtin: number;
  thumbnail: string;
  width: number | null;
  height: number | null;
  length: number | null;
  net_weight: number | null;
  gross_weight: number | null;
  created_at: string; // formato ISO (string)
  updated_at: string;
  release_date: string | null;
  price: string; // Ex: "R$ 7,12 a R$ 27,90"
  avg_price: number;
  max_price: number;
  min_price: number;
  gtins: Gtin[];
  origin: string;
  barcode_image: string;
  brand: Brand;
  ncm: Ncm;
  category: Category;
}

export interface Gtin {
  gtin: number;
  commercial_unit: CommercialUnit;
}

export interface CommercialUnit {
  type_packaging: string;
  quantity_packaging: number;
  ballast: number | null;
  layer: number | null;
}

export interface Brand {
  name: string;
  picture: string;
}

export interface Ncm {
  code: string;
  description: string;
  full_description: string;
  ex: string | null;
}

export interface Category {
  id: number;
  description: string;
  parent_id: number;
}
