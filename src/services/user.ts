import doRequest from '@/request';
import { userRegisterType } from '@/pages/data';

//箭头函数写异步函数
// const name = async (params) => {
// }
// 普通函数
// async function function_name(params){
// }

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
  // if (username === 'zqn' && password === '202cb962ac59075b964b07152d234b70') {
  //   return {
  //     code: 0,
  //     message: '登录成功',
  //     data: {
  //       user_id: 1,
  //       avatar: '',
  //       username: 'zqn',
  //       gender: 2,
  //       role: 2,
  //       nickname: '',
  //       signature: '',
  //     },
  //   };
  // }
  return doRequest(url, options);
};

export const goRegister = async (values: userRegisterType) => {
  const url = `/api/user/register`;
  console.log('goRegister_service_values = ', values);
  const options = {
    method: 'post',
    data: values,
  };
  return doRequest(url, options);
};

export const getUserInfo = async () => {
  const url = `/api/user/getMyInfo`;
  return doRequest(url);
};
