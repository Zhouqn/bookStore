import React, { FC, useEffect } from 'react';
import { connect, Dispatch, Loading } from 'umi';
import AdminBookList from '@/pages/admin/book/list';
import userStyles from '@/asset/css/user.css';
import { UserModelState } from '@/models/user';
import { FieldTimeOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { userAllType } from '@/pages/data';

interface MoreBooksProps {
  dispatch: Dispatch;
  // userInfo: userAllType;
  // userModelLoading: boolean
}

const MoreBooks_test: FC<MoreBooksProps> = (props) => {
  const { dispatch } = props;

  useEffect(() => {
    dispatch({
      type: 'book/getBookList',
      payload: {
        page: 1,
        page_size: 4,
        orderTypes: 'pub_date',
      },
    });
  }, []);

  return (
    <React.Fragment>
      <div className={userStyles.moreBooks_middle}>
        <div className={userStyles.moreBooks_top}>
          <span className={userStyles.moreBooks_title}>
            <FieldTimeOutlined style={{ marginRight: '5px' }} />
            按时间排序
          </span>
          <a>
            前往分类列表
            <ArrowRightOutlined style={{ marginLeft: '5px' }} />
          </a>
        </div>
        <AdminBookList orderTypes="pub_date" />
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
)(MoreBooks_test);
