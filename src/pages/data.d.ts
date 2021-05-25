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
export interface userPartType {
  avatar: string;
  gender: string;
  nickname: string;
  signature: string;
}

export interface userAllType extends userPartType {
  id: number;
  username: string;
  password: string;
  role: string;
  register_time: string;
}

// export interface singleUserType {
//   id: number;
//   avatar: string;
//   username: string;
//   password: string;
//   gender: string;
//   role: string;
//   nickname: string;
//   signature: string;
//   register_time: string;
// }

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
