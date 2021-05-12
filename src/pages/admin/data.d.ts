export interface bookRecordValue {
  id: number;
  cover_uri: string;
  cover_url: string;
  title: string;
  authors: string;
  pub: string;
  pub_date: string;
  price: number;
  retail_price: number;
  describe: string;
  rate: number;
  comment_count: number;
}

export interface FormValues {
  [name: string]: any;
}
