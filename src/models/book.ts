import { Reducer, Effect, Subscription } from 'umi';
import { bookRecordValue } from '@/pages/admin/data';
import { deleteBookRecord, getBooks } from '@/services/book';

export interface BookModelState {
  books: bookRecordValue[];
  page: number;
  page_size: number;
  total_count: number;
}

interface BookModelType {
  namespace: string;
  state: BookModelState;
  reducers: {
    setBookList: Reducer<BookModelState>; //getList的类型是Reducer, 返回值是UserState类型
  };
  effects: {
    getBookList: Effect;
    deleteBook: Effect;
  };
  subscriptions: {
    showBookList: Subscription;
  };
}

const BookModel: BookModelType = {
  namespace: 'book',
  state: {
    books: [],
    page: 1,
    page_size: 4,
    total_count: 0,
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
      }
    },
    *deleteBook({ payload }, { call }) {
      console.log('deleteBook_payload', payload);
      yield call({ deleteBookRecord, payload: { payload } });
    },
  },
  subscriptions: {
    showBookList({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/admin/book/list') {
          console.log('subscriptions');
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
  },
};

export default BookModel;
