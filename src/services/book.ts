// import {request} from "umi";
import { extend } from 'umi-request';
import { message } from 'antd';
import { FormValues } from '@/pages/data';
import { errorHandler } from '@/config';

//箭头函数写异步函数
// const name = async (params) => {
// }
// 普通函数
// async function function_name(params){
// }

const extendRequest = extend({ errorHandler });

const doRequest = (url: string, options?: object) => {
  return extendRequest(url, {
    method: 'get',
    ...options,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export const getBooks = async ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}) => {
  console.log('getBooks = ', page, page_size);
  const url = `/api/book/fetch_books?page=${page}&page_size=${page_size}`;
  return doRequest(url);
};
//管理员
//添加
export const admin_addBookRecord = async ({
  values,
}: {
  values: FormValues;
}) => {
  console.log('service_addBookRecord_values = ', values);
  const url = `/api/book/add`;
  const options = {
    method: 'post',
    data: values,
  };
  return doRequest(url, options);
};
//编辑
export const admin_editBookRecord = async ({
  book_id,
  values,
}: {
  book_id: number;
  values: FormValues;
}) => {
  console.log('service_editBookRecord_id&values = ', book_id, values);
};
//删除
export const admin_deleteBookRecord = async ({
  book_id,
}: {
  book_id: number;
}) => {
  console.log('deleteBookRecord_id= ', book_id);
};

//用户
//获取高分/热门书列表
export const user_getHighRateOrHotBooks = async ({
  page,
  page_size,
  orderTypes,
}: {
  page: number;
  page_size: number;
  orderTypes: string;
}) => {
  console.log('getBooks = ', orderTypes);
  const url = `/api/book/fetch_books?page=${page}&page_size=${page_size}&order_by=${orderTypes}`;
  return doRequest(url);
};
//获取单个书的信息
export const user_getOneBook = async ({
  book_id,
  page,
  page_size,
  orderTypes,
}: {
  book_id: number;
  page: number;
  page_size: number;
  orderTypes: string;
}) => {
  const url = `/api/comment/fetchByBookId?book_id=${book_id}&page=${page}&page_size=${page_size}&order_by=${orderTypes}`;
  console.log(url);
  return doRequest(url);
};
