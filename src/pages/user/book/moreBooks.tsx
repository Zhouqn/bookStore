import React, { FC, useEffect } from 'react';
import { connect, Dispatch } from 'umi';
import BookList from '@/components/admin/BookList';
import AdminBookList from '@/pages/admin/book/list';
import userStyles from '@/asset/css/user.css';
import { UserModelState } from '@/models/user';
import { userAllType } from '@/pages/data';

interface MoreBooksProps {
  dispatch: Dispatch;
  userInfo: userAllType;
}

const MoreBooks: FC<MoreBooksProps> = (props) => {
  const { dispatch, userInfo } = props;

  useEffect(() => {
    dispatch({ type: 'user/getUserInfo', payload: {} });
  }, []);

  return (
    <React.Fragment>
      <div className={userStyles.moreBooks_middle}>
        <AdminBookList userInfo={userInfo} />
      </div>
    </React.Fragment>
  );
};

export default connect(({ user }: { user: UserModelState }) => {
  return {
    userInfo: user.userInfo,
  };
})(MoreBooks);
