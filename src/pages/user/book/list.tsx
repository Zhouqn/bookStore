import React, { useState, FC } from 'react';
import { connect, Dispatch } from 'umi';
import { Divider } from 'antd';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import userStyles from '@/asset/css/user.css';
import BookList from '@/components/user/BookList';
import { DoubleRightOutlined } from '@ant-design/icons';

import { newBooks, highRateBooks, hotBooks } from '@/config';

interface UserBookList {
  isLogin: boolean;
}

const booksType = [
  {
    type: '最新书籍',
    books: newBooks,
  },
  {
    type: '高分书籍',
    books: highRateBooks,
  },
  {
    type: '热门书籍',
    books: hotBooks,
  },
];

const UserBookList: FC<UserBookList> = (props) => {
  const { isLogin } = props;
  return (
    <React.Fragment>
      <Header isLogin={isLogin} />
      <div className={userStyles.userBookList}>
        <div className={userStyles.allTypesBookList}>
          {booksType.map((oneBooksType, i) => {
            return (
              <div className={userStyles.differentTypesBookList}>
                <p>
                  <span style={{ fontSize: '20px' }}>
                    {oneBooksType.type}：
                  </span>
                  <a>
                    查看更多书籍
                    <DoubleRightOutlined
                      style={{ fontSize: '10px', marginLeft: '5px' }}
                    />
                  </a>
                </p>
                <BookList books={oneBooksType.books} />
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default connect(
  ({ user, book }: { user: UserModelState; book: BookModelState }) => {
    return {
      //user
      isLogin: user.isLogin,
      //book
    };
  },
)(UserBookList);
