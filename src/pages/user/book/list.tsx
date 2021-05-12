import React, { useState, FC } from 'react';
import { connect, Dispatch } from 'umi';
import {} from 'antd';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import userStyles from '@/asset/css/user.css';
import NewBookList from '@/components/user/NewBookList';
import HotBookList from '@/components/user/HotBookList';

interface UserBookList {
  isLogin: boolean;
}

const UserBookList: FC<UserBookList> = (props) => {
  const { isLogin } = props;
  return (
    <React.Fragment>
      <Header isLogin={isLogin} />
      <div className={userStyles.userBookList}>
        <div className={userStyles.newBookList}>
          {/*<NewBookList newBooks={newBooks}/>*/}
          <NewBookList />
        </div>
        <div className={userStyles.hotBookList}>
          <HotBookList />
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
