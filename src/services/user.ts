import doRequest from '@/request';

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
  const url = ``;
  const options = {
    method: 'post',
    data: {
      username,
      password,
    },
  };
  if (username === 'zqn' && password === '202cb962ac59075b964b07152d234b70') {
    return {
      code: 0,
      message: '登录成功',
      data: {
        user_id: 1,
        avatar: '',
        username: 'zqn',
        gender: 2,
        role: 2,
        nickname: '',
        signature: '',
      },
    };
  }
  // await doRequest(url, options)
};
