// this route currently exists only to provide the type used by the higher-level API route
export interface ListItemAPIResponse {
  id: string;
  name: string;
  note?: string;
  price?: number;
  reserved: boolean;
  reservedBy?: string;
}
