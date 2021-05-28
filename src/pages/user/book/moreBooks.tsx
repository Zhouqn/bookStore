import React, { FC, useEffect } from 'react';
import { connect, Dispatch, Loading } from 'umi';
import BookList from '@/components/admin/BookList';
import AdminBookList from '@/pages/admin/book/list';
import userStyles from '@/asset/css/user.css';
import { UserModelState } from '@/models/user';
import { userAllType } from '@/pages/data';

interface MoreBooksProps {
  // dispatch: Dispatch;
  // userInfo: userAllType;
  // userModelLoading: boolean
}

const MoreBooks: FC<MoreBooksProps> = (props) => {
  // const { dispatch } = props;

  // useEffect(() => {
  //   dispatch({ type: 'user/getUserInfo', payload: {} });
  // }, []);

  return (
    <React.Fragment>
      <div className={userStyles.moreBooks_middle}>
        <AdminBookList />
      </div>
    </React.Fragment>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => {
    return {
      // userInfo: user.userInfo,
      // userModelLoading: loading.models.user
    };
  },
)(MoreBooks);
