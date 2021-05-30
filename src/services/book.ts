import { FormValues } from '@/pages/data';
import doRequest from '@/request';

//箭头函数写异步函数
// const name = async (params) => {
// }
// 普通函数
// async function function_name(params){
// }

//获取书信息 最新/高分/热门书列表
export const getBooks = async ({
  page,
  page_size,
  orderTypes,
}: {
  page: number;
  page_size: number;
  orderTypes: string;
}) => {
  console.log('getBooks = ', page, page_size);
  const url = `/api/book/fetch_books?page=${page}&page_size=${page_size}&order_by=${orderTypes}`;
  return doRequest(url);
};
//通过id查找书
export const getBookById = async ({ book_id }: { book_id: number }) => {
  console.log('getBookById = ', book_id);
  const url = `/api/book/fetch_books?id=${book_id}`;
  return doRequest(url);
};

export const getBookByAuthorOrTitle = async ({
  page,
  page_size,
  orderTypes,
  author,
  title,
}: {
  page: number;
  page_size: number;
  orderTypes: string;
  author: string;
  title: string;
}) => {
  console.log('getBookByAuthor_service = ', author);
  const url = `/api/book/fetch_books?page=${page}&page_size=${page_size}&order_by=${orderTypes}&author=${author}&title=${title}`;
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
  const url = `/api/book/update`;
  const options = {
    method: 'post',
    data: {
      id: book_id,
      ...values,
    },
  };
  return doRequest(url, options);
};
//删除
export const admin_deleteBookRecord = async ({
  book_id,
}: {
  book_id: number;
}) => {
  console.log('deleteBookRecord_id= ', book_id);
  const url = `/api/book/delete`;
  const options = {
    method: 'post',
    data: {
      book_id,
    },
  };
  return doRequest(url, options);
};

//用户
//获取高分/热门书列表
// export const user_getHighRateOrHotBooks = async ({
//   page,
//   page_size,
//   orderTypes,
// }: {
//   page: number;
//   page_size: number;
//   orderTypes: string;
// }) => {
//   console.log('getBooks = ', orderTypes);
//   const url = `/api/book/fetch_books?page=${page}&page_size=${page_size}&order_by=${orderTypes}`;
//   return doRequest(url);
// };
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
//评论
export const publishComment = async ({
  book_id,
  rate,
  content,
}: {
  book_id: number;
  rate: number;
  content: string;
}) => {
  const url = `/api/comment/publish`;
  console.log(url);
  const options = {
    method: 'post',
    data: {
      book_id,
      rate,
      content,
    },
  };
  return doRequest(url, options);
};
export const updateComment = async ({
  book_id,
  rate,
  content,
}: {
  book_id: number;
  rate: number;
  content: string;
}) => {
  const url = `/api/comment/update`;
  console.log(url);
  const options = {
    method: 'post',
    data: {
      book_id,
      rate,
      content,
    },
  };
  return doRequest(url, options);
};
export const deleteComment = async ({ comment_id }: { comment_id: number }) => {
  const url = `/api/comment/delete`;
  console.log(url);
  const options = {
    method: 'post',
    data: {
      comment_id,
    },
  };
  return doRequest(url, options);
};
//点赞/取消点赞
export const likeComment = async ({
  comment_id,
  is_like,
}: {
  comment_id: number;
  is_like: boolean;
}) => {
  const url = `/api/comment/like`;
  console.log(url);
  const options = {
    method: 'post',
    data: {
      comment_id: comment_id,
      is_like: !is_like,
    },
  };
  return doRequest(url, options);
};
