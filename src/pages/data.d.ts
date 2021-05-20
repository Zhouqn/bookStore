export interface FormValues {
  [name: string]: any;
}

//admin
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

//user
export interface userLoginType {
  username: string;
  password: string;
}

export interface singleUserType {
  id: number;
  avatar: string;
  username: string;
  password: string;
  gender: number;
  role: boolean;
  status: number;
  extendInfo: string;
}

export interface commentType {
  avatar: string | null;
  content: string;
  create_time: string;
  id: number;
  is_like: boolean;
  like_count: number;
  rate: number;
  user_id: number;
  user_name: string;
}
