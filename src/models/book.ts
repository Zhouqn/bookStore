import { Reducer, Effect, Subscription } from 'umi';
import { bookRecordValue } from '@/pages/data';
import {
  admin_deleteBookRecord,
  getBooks,
  user_getHighRateOrHotBooks,
} from '@/services/book';
import { message } from 'antd';

export interface BookModelState {
  books: bookRecordValue[];
  newBooks: bookRecordValue[];
  highRateBooks: bookRecordValue[];
  hotBooks: bookRecordValue[];
  page: number;
  page_size: number;
  total_count: number;
}

interface BookModelType {
  namespace: string;
  state: BookModelState;
  reducers: {
    setBookList: Reducer<BookModelState>; //getList的类型是Reducer, 返回值是UserState类型
    //用户
  };
  effects: {
    getBookList: Effect;
    //管理员
    admin_deleteBook: Effect;
    //用户
    user_getBookList: Effect;
  };
  subscriptions: {
    showBookList: Subscription;

    //用户
    user_showBookList: Subscription;
  };
}

const BookModel: BookModelType = {
  namespace: 'book',
  state: {
    books: [],
    page: 1,
    page_size: 4,
    total_count: 0,
    //用户页面书列表
    newBooks: [],
    highRateBooks: [],
    hotBooks: [],
  },
  reducers: {
    setBookList(state, { payload }) {
      console.log('getBookList_reducers', payload);
      return payload;
    },
  },
  effects: {
    *getBookList({ payload }, { put, call }) {
      console.log('getBookList_effects_payload', payload);
      const res = yield call(getBooks, payload);
      console.log('getBookList_res = ', res);
      if (res.code === 0) {
        yield put({
          type: 'setBookList',
          payload: res.data,
        });
      } else {
        message.error(res.message);
      }
    },
    //管理员
    *admin_deleteBook({ payload }, { call }) {
      console.log('deleteBook_payload', payload);
      // yield call( admin_deleteBookRecord, payload  );
    },
    //用户
    //获取书列表
    *user_getBookList({ payload }, { call, put }) {
      console.log('user_getBookList_payload', payload);
      const res_newBooks = yield call(getBooks, payload);
      const res_highRateBooks = yield call(user_getHighRateOrHotBooks, {
        ...payload,
        orderTypes: 'rate',
      });
      const res_hotBooks = yield call(user_getHighRateOrHotBooks, {
        ...payload,
        orderTypes: 'comment_count',
      });
      console.log('res_newBooks = ', res_newBooks);
      console.log('res_highRateBooks = ', res_highRateBooks);
      console.log('res_hotBooks = ', res_hotBooks);
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
  },
  subscriptions: {
    showBookList({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/book/list') {
          console.log('/admin/book/list_subscriptions');
          dispatch({
            type: 'getBookList',
            payload: {
              page: 1,
              page_size: 4,
            },
          });
        }
      });
    },

    user_showBookList({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/user/book/list') {
          console.log('/user/book/list_subscriptions');
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
