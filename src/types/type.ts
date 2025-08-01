export interface MenuItem {
  key: string;
  icon: React.ReactNode;      
  label: string;
  BadgeNumber?: number | 0;       
  role?: string[]; 
}
export type IUser = {
  uid?: string;
  email?: string;
  user?: string;
  token: string;
  state?: boolean;
  name?: string;
  role?: string;
};

export interface FirebaseUserResponse {
  uid: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  disabled: boolean;
  metadata: FirebaseUserMetadata;
  providerData: FirebaseProviderData[];
  customClaims: FirebaseCustomClaims;
  tokensValidAfterTime: string;
}

export interface FirebaseUserMetadata {
  lastSignInTime: string;
  creationTime: string;
  lastRefreshTime: string;
}

export interface FirebaseProviderData {
  uid: string;
  email: string;
  photoURL: string;
  providerId: string;
}

export interface FirebaseCustomClaims {
  role: string[];
}

export interface Product {
  id? : string;
  description?: string;
  gtin?: number;
  thumbnail?: string;
  width?: number | null;
  height?: number | null;
  length?: number | null;
  net_weight?: number | null;
  gross_weight?: number | null;
  created_at?: string;
  updated_at?: string;
  release_date?: string | null;
  price?: number | null;
  avg_price?: number | null;
  max_price?: number;
  min_price?: number;
  gtins?: GtinInfo[];
  origin?: string;
  barcode_image?: string;
  brand?: Brand;
  ncm?: Ncm;
  gpc?:GCP;
  category?: Category;
}

export interface GCP {
  code?: string;
  description?: string;
}

export interface GtinInfo {
  gtin?: number;
  commercial_unit?: CommercialUnit;
}

export interface CommercialUnit {
  type_packaging?: string;
  quantity_packaging?: number;
  ballast?: number | null;
  layer?: number | null;
}

export interface Brand {
  name?: string;
  picture?: string;
}

export interface Ncm {
  code?: string;
  description?: string;
  full_description?: string;
  ex?: string | null;
}

export interface Category {
  id?: number;
  description?: string;
  parent_id?: number;
}
