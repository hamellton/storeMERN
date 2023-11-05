export interface IApiResponseError {
  message: string;
  status: number;
}

export interface IProduct {
  id: string;
  sku: string;
  description: string;
  cpt: number;
  jhb: number;
  dbn: number;
  totalStock: number;
  dealerPrice: number | null;
  retailPrice: number | null;
  manufacturer: string;
  imageURL: string;
}
