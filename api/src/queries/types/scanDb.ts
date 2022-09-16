export interface ScanDb {
  id: number;
  source_url: string;
  destination_url: string;
  snapshot: string;
  ip_address: string;
  ssl_info: string; //jsonb
  html_content: string;
  natural_language_content: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
}
