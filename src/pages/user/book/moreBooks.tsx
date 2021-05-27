import React from 'react';
import { connect } from 'umi';
import BookList from '@/components/admin/BookList';
import AdminBookList from '@/pages/admin/book/list';
import userStyles from '@/asset/css/user.css';

const MoreBooks = () => {
  return (
    <React.Fragment>
      <div className={userStyles.moreBooks_middle}>
        <AdminBookList />
      </div>
    </React.Fragment>
  );
};

export default connect()(MoreBooks);
