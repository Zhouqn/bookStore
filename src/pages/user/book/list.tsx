import React, { FC, useState } from 'react';
import { connect, Dispatch, history } from 'umi';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import { bookRecordValue } from '@/pages/data';
import userStyles from '@/asset/css/user.css';
import BookList from '@/components/user/BookList';
import { DoubleRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { Empty, Spin } from 'antd';
import { Loading } from '@@/plugin-dva/connect';

interface UserBookListProps {
  dispatch: Dispatch;
  isLogin: boolean;
  bookModelLoading: boolean;
  total_count: number;
  newBooks: bookRecordValue[];
  highRateBooks: bookRecordValue[];
  hotBooks: bookRecordValue[];
}

const UserBookList: FC<UserBookListProps> = (props) => {
  const {
    dispatch,
    isLogin,
    total_count,
    newBooks,
    highRateBooks,
    hotBooks,
    bookModelLoading,
  } = props;
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
  const bookListLoadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  const clickBookCover_orTitle = (bookRecord: bookRecordValue) => {
    history.push(`/user/book/${bookRecord.id}`);
  };

  // const getOrderBooks = (orderTypes: string) => {
  //   dispatch({type:"book/getBookList", payload:{
  //       page:1,
  //       page_size: 4,
  //       orderTypes,
  //     }})
  //   history.push('/user/book/moreBooks')
  // }
  const [order, setOrder] = useState('byPubDate');
  const getOrderBooks = (type: string) => {
    console.log('getOrderBooks_type = ', type);
    if (type === '最新书籍') {
      // setOrder('byPubDate')
      history.push(`/user/book/moreBooks/${order}`);
    } else if (type === '高分书籍') {
      // setOrder('byRate')
      history.push(`/user/book/moreBooks/${order}`);
    } else {
      // setOrder('byHot')
      history.push(`/user/book/moreBooks/${order}`);
    }
  };

  return (
    <React.Fragment>
      <div className={userStyles.userBookList}>
        {bookModelLoading ? (
          <Spin
            indicator={bookListLoadingIcon}
            style={{ position: 'relative', left: '47% ', top: '40%' }}
          />
        ) : total_count ? (
          <div className={userStyles.allTypesBookList}>
            {booksType.map((oneBooksType, i) => {
              return (
                <div key={i} className={userStyles.differentTypesBookList}>
                  <p>
                    <span style={{ fontSize: '20px' }}>
                      {oneBooksType.type}：
                    </span>
                    <a onClick={() => getOrderBooks(oneBooksType.type)}>
                      查看更多书籍
                      <DoubleRightOutlined
                        style={{ fontSize: '10px', marginLeft: '5px' }}
                      />
                    </a>
                  </p>
                  <BookList
                    books={oneBooksType.books}
                    clickBookCover_orTitle={clickBookCover_orTitle}
                  />
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
    </React.Fragment>
  );
};

export default connect(
  ({
    user,
    book,
    loading,
  }: {
    user: UserModelState;
    book: BookModelState;
    loading: Loading;
  }) => {
    return {
      //user
      isLogin: user.isLogin,
      //book
      bookModelLoading: loading.models.book,
      total_count: book.total_count,
      newBooks: book.newBooks,
      highRateBooks: book.highRateBooks,
      hotBooks: book.hotBooks,
    };
  },
)(UserBookList);
