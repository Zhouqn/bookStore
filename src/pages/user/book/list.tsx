import React, { useState, FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import { bookRecordValue } from '@/pages/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import userStyles from '@/asset/css/user.css';
import BookList from '@/components/user/BookList';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Empty } from 'antd';

interface UserBookList {
  isLogin: boolean;
  total_count: number;
  newBooks: bookRecordValue[];
  highRateBooks: bookRecordValue[];
  hotBooks: bookRecordValue[];
}

const UserBookList: FC<UserBookList> = (props) => {
  const { isLogin, total_count, newBooks, highRateBooks, hotBooks } = props;
  console.log('book = ', newBooks, highRateBooks, hotBooks);
  console.log('total_count = ', total_count);
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
  return (
    <React.Fragment>
      <Header isLogin={isLogin} />
      <div className={userStyles.userBookList}>
        {total_count ? (
          <div className={userStyles.allTypesBookList}>
            {booksType.map((oneBooksType, i) => {
              return (
                <div key={i} className={userStyles.differentTypesBookList}>
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
        ) : (
          <Empty
            style={{ color: 'grey', position: 'relative', top: '40%' }}
            description="暂无数据"
          />
        )}
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
      total_count: book.total_count,
      newBooks: book.newBooks,
      highRateBooks: book.highRateBooks,
      hotBooks: book.hotBooks,
    };
  },
)(UserBookList);
