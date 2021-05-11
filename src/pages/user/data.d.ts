// 类型定义文件

export interface singleUserType {
  id: number;
  username: string;
  password: string;
  gender: number;
  role: boolean;
  status: number;
}

// export interface singleUserPartMsgType{
//   id: number,
//   username: string,
//   password: string,
//   gender: number,
//   status: number
// }

//不知道是不是可以这么用
// export interface singleUserAllMsgType extends singleUserPartMsgType{
//   extendInfo:string,
// }
