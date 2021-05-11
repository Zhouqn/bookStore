import { Reducer, Effect, Subscription } from 'umi';
import { bookRecordValue } from '@/pages/admin/data';
import { deleteBookRecord } from '@/services/book';

export interface BookState {
  books: bookRecordValue[];
}

interface BookModelType {
  namespace: string;
  state: BookState;
  reducers: {
    // getBookList: Reducer  //getList的类型是Reducer, 返回值是UserState类型
  };
  effects: {
    getBookList: Effect;
    deleteBook: Effect;
  };
  subscriptions: {
    // setup: Subscription;
  };
}

const BookModel: BookModelType = {
  namespace: 'book',
  state: {
    books: [],
  },
  reducers: {},
  effects: {
    *getBookList({ payload }, { call }) {
      console.log('getBookList_payload', payload);
    },
    *deleteBook({ payload }, { call }) {
      console.log('deleteBook_payload', payload);
      yield call({ type: deleteBookRecord, payload: { payload } });
    },
  },
  subscriptions: {},
};

export default BookModel;
