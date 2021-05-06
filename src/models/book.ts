import { Reducer, Effect, Subscription } from 'umi';

interface BookModelType {
  namespace: string;
  state: {
    list: [];
  };
  reducers: {
    // showList: Reducer  //getList的类型是Reducer, 返回值是UserState类型
  };
  effects: {
    showList: Effect;
  };
  subscriptions: {
    // setup: Subscription;
  };
}

const BookModel: BookModelType = {
  namespace: 'book',
  state: {
    list: [],
  },
  reducers: {},
  effects: {
    *showList({ payload }, { call }) {},
  },
  subscriptions: {},
};

export default BookModel;
