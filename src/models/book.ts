import { Reducer, Effect, Subscription, history } from 'umi';
import { bookRecordValue, commentType } from '@/pages/data';
import {
  getBooks,
  user_getOneBook,
  getBookById,
  getBookByAuthorOrTitle,
} from '@/services/book';
import { message } from 'antd';

export interface BookModelState {
  books: bookRecordValue[];
  bookRecord: bookRecordValue | undefined;
  comments: commentType[];
  newBooks: bookRecordValue[];
  highRateBooks: bookRecordValue[];
  hotBooks: bookRecordValue[];
  page: number;
  page_size: number;
  total_count: number;
  orderTypes: string;
}

interface BookModelType {
  namespace: string;
  state: BookModelState;
  reducers: {
    setBookList: Reducer<BookModelState>; //getList的类型是Reducer, 返回值是UserState类型
    //用户
    setCommentList: Reducer<BookModelState>;
  };
  effects: {
    getBookList: Effect;
    getBook_byId: Effect;
    goSearch_byAuthorOrTitle: Effect;
    //用户
    user_getBookList: Effect;
    user_getABookRecord: Effect;
  };
  subscriptions: {
    //管理员
    admin_showBookList: Subscription;
    //用户
    user_showBookList: Subscription;
    // user_showABookRecord: Subscription;
  };
}

const BookModel: BookModelType = {
  namespace: 'book',
  state: {
    books: [],
    bookRecord: undefined,
    comments: [],
    page: 1,
    page_size: 4,
    total_count: 0,
    //用户页面书列表
    newBooks: [],
    highRateBooks: [],
    hotBooks: [],
    orderTypes: 'pub_date',
  },
  reducers: {
    setBookList(state, { payload }) {
      return payload;
    },
    setCommentList(state, { payload }) {
      return payload;
    },
  },
  effects: {
    //获取书列表 / 【按最新时间顺序】
    *getBookList({ payload }, { put, call }) {
      const res = yield call(getBooks, {
        ...payload,
        orderTypes: payload.orderTypes ? payload.orderTypes : 'pub_date',
      });
      if (res.code === 0) {
        yield put({
          type: 'setBookList',
          payload: {
            ...res.data,
            orderTypes: payload.orderTypes,
          },
        });
      } else {
        message.error(res.message);
      }
    },
    //通过id获取书
    *getBook_byId({ payload }, { put, call }) {
      const res = yield call(getBookById, payload);
      if (res.code === 0) {
        yield put({
          type: 'setBookList',
          payload: {
            ...res.data,
            bookRecord: res.data.books[0],
          },
        });
      } else {
        message.error(res.message);
      }
    },
    //通过作者获取
    *goSearch_byAuthorOrTitle({ payload }, { put, call }) {
      const res = yield call(getBookByAuthorOrTitle, payload);
      if (res.code === 0) {
        yield put({
          type: 'setBookList',
          payload: res.data,
        });
      } else {
        message.error(res.message);
      }
    },

    //用户
    //获取书列表
    *user_getBookList({ payload }, { call, put }) {
      const res_newBooks = yield call(getBooks, {
        ...payload,
        orderTypes: 'pub_date',
      });
      const res_highRateBooks = yield call(getBooks, {
        ...payload,
        orderTypes: 'rate',
      });
      const res_hotBooks = yield call(getBooks, {
        ...payload,
        orderTypes: 'comment_count',
      });
      if (
        res_newBooks.code === 0 &&
        res_highRateBooks.code === 0 &&
        res_hotBooks.code === 0
      ) {
        yield put({
          type: 'setBookList',
          payload: {
            page: res_newBooks.data.page,
            page_size: res_newBooks.data.page_size,
            total_count: res_newBooks.data.total_count,
            newBooks: res_newBooks.data.books,
            highRateBooks: res_highRateBooks.data.books,
            hotBooks: res_hotBooks.data.books,
          },
        });
      } else {
        message.error(res_newBooks.message);
      }
    },
    //  获取单个书信息
    *user_getABookRecord({ payload }, { call, put }) {
      const { bookRecord, page, page_size, orderTypes } = payload;
      const res = yield call(user_getOneBook, {
        book_id: bookRecord.id,
        page,
        page_size,
        orderTypes,
      });
      if (res.code === 0) {
        const { comments, page, page_size, total_count } = res.data;
        yield put({
          type: 'setCommentList',
          payload: {
            bookRecord,
            comments,
            page,
            page_size,
            total_count,
          },
        });
        history.push(`/user/book/${bookRecord.id}`);
      } else {
        message.error(res.message);
      }
    },
  },
  subscriptions: {
    //管理员
    admin_showBookList({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/book/list') {
          dispatch({
            type: 'getBookList',
            payload: {
              page: 1,
              page_size: 4,
              orderTypes: 'pub_date',
            },
          });
        }
      });
    },
    //用户
    user_showBookList({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/book/list') {
          dispatch({
            type: 'user_getBookList',
            payload: {
              page: 1,
              page_size: 10,
            },
          });
        }
      });
    },
  },
};

export default BookModel;
