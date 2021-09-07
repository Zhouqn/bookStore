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
  const url = `/api/book/fetch_books?page=${page}&page_size=${page_size}&order_by=${orderTypes}`;
  return doRequest(url);
};
//通过id查找书
export const getBookById = async ({ book_id }: { book_id: number }) => {
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
  return doRequest(url);
};
//评论
//发表评论
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
//更新评论
export const updateComment = async ({
  comment_id,
  rate,
  content,
}: {
  comment_id: number;
  rate: number;
  content: string;
}) => {
  const url = `/api/comment/update`;
  const options = {
    method: 'post',
    data: {
      comment_id,
      rate,
      content,
    },
  };
  return doRequest(url, options);
};
//删除评论
export const deleteComment = async ({ comment_id }: { comment_id: number }) => {
  const url = `/api/comment/delete`;
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
  const options = {
    method: 'post',
    data: {
      comment_id: comment_id,
      is_like: !is_like,
    },
  };
  return doRequest(url, options);
};
