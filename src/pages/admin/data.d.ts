export interface bookRecordValue {
  book_id: number;
  cover_uri: string;
  title: string;
  authors: string;
  pub: string;
  pub_date: string;
  price: number;
  retail_price: number;
  describe: string;
  rate: number;
}

export interface FormValues {
  [name: string]: any;
}
