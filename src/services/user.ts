import doRequest from '@/request';
import { userPartType } from '@/pages/data';

//箭头函数写异步函数
// const name = async (params) => {
// }
// 普通函数
// async function function_name(params){
// }

//登录
export const goLogin = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  const url = `/api/user/login`;
  const options = {
    method: 'post',
    data: {
      username,
      password,
    },
  };
  return doRequest(url, options);
};

//注册
export const goRegister = async ({
  username,
  password,
  gender,
}: {
  username: string;
  password: string;
  gender: string;
}) => {
  const url = `/api/user/register`;
  const options = {
    method: 'post',
    data: {
      username,
      password,
      gender,
    },
  };
  return doRequest(url, options);
};

//获取用户信息
export const getUserInfo = async () => {
  const url = `/api/user/getMyInfo`;
  return doRequest(url);
};

//修改用户信息
export const goUpdate = async (info: userPartType) => {
  const url = `/api/user/updateMyInfo`;
  const options = {
    method: 'post',
    data: info,
  };
  return doRequest(url, options);
};

//退出登录
export const goLogoff = async () => {
  const url = `/api/user/logoff`;
  return doRequest(url);
};

//获取我的评论
export const getMyComments = async ({
  page,
  page_size,
  order_by,
}: {
  page: number;
  page_size: number;
  order_by: string;
}) => {
  const url = `/api/comment/fetchMyComments?page=${page}&page_size=${page_size}&order_by=${order_by}`;
  return doRequest(url);
};

//获取我的点赞
export const getLikeComments = async ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}) => {
  const url = `/api/comment/myLikes?page=${page}&page_size=${page_size}`;
  return doRequest(url);
};

//验证密码
export const verifyPassword = async ({ password }: { password: string }) => {
  const url = `/api/user/verifyPassword`;
  const options = {
    method: 'post',
    data: {
      password,
    },
  };
  return doRequest(url, options);
};

//修改密码
export const modifyPassword = async ({
  old_password,
  new_password,
}: {
  old_password: string;
  new_password: string;
}) => {
  const url = `/api/user/modifyPassword`;
  const options = {
    method: 'post',
    data: {
      old_password,
      new_password,
    },
  };
  return doRequest(url, options);
};
