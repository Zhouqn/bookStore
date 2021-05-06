// import {request} from "umi";
import request, { extend } from 'umi-request';
import { message } from 'antd';

//箭头函数写异步函数
// const name = async (params) => {
// }
// 普通函数
// async function function_name(params){
// }

const errorHandler = function (error: any) {
  const codeMap = {
    '021': 'An error has occurred',
    '022': 'It’s a big mistake,',
    // ....
  };
  if (error.response) {
    console.log(error.response.status);
    console.log(error.data);
    if (error.response.status) {
      message.error(error.data.message ? error.data.message : error.data);
    }
  } else {
    // The request was made but no response was received or error occurs when setting up the request.
    message.error('Network Error');
    console.log(error.message);
  }
  throw error; // If throw. The error will continue to be thrown.  //解开才抛出错误
  // return {some: 'data'}; If return, return the value as a return. If you don't write it is equivalent to return undefined, you can judge whether the response has a value when processing the result.
  // return {some: 'data'};
};

const extendRequest = extend({ errorHandler });

export const goLogin = async ({ username, password }) => {
  return extendRequest(`/api/user/login`, {
    method: 'post',
    data: {
      username,
      password,
    },
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};
