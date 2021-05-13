// import {request} from "umi";
import request, { extend } from 'umi-request';
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

export const getBooks = async ({
  page,
  page_size,
}: {
  page: number;
  page_size: number;
}) => {
  // console.log('getBooks = ', page, page_size);
  return extendRequest(
    `/api/book/fetch_books?page=${page}&page_size=${page_size}`,
    {
      method: 'get',
    },
  )
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export const addBookRecord = async ({ values }: { values: FormValues }) => {
  console.log('service_addBookRecord_values = ', values);
  return extendRequest(`/api/book/add`, {
    method: 'post',
    data: values,
  })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      return false;
    });
};

export const editBookRecord = async ({
  book_id,
  values,
}: {
  book_id: number;
  values: FormValues;
}) => {
  console.log('service_editBookRecord_id&values = ', book_id, values);

  // return extendRequest(``, {
  //   method: 'post',
  //   data: {
  //   },
  // })
  //   .then(function (response) {
  //     return response;
  //   })
  //   .catch(function (error) {
  //     return false;
  //   });
};

export const deleteBookRecord = async ({ book_id }: { book_id: number }) => {
  console.log('deleteBookRecord_id= ', book_id);

  // return extendRequest(``, {
  //   method: 'post',
  //   data: {
  //   },
  // })
  //   .then(function (response) {
  //     return response;
  //   })
  //   .catch(function (error) {
  //     return false;
  //   });
};
