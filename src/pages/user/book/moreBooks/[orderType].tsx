import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, Loading, useParams } from 'umi';
import AdminBookList from '@/pages/admin/book/list';
import userStyles from '@/asset/css/user.css';
import { UserModelState } from '@/models/user';
import { FieldTimeOutlined, ArrowRightOutlined } from '@ant-design/icons';
// import { userAllType } from '@/pages/data';

interface MoreBooksProps {
  dispatch: Dispatch;
  // userInfo: userAllType;
  // userModelLoading: boolean
  bookModelLoading: boolean;
}

const MoreBooks: FC<MoreBooksProps> = (props) => {
  const { dispatch, bookModelLoading } = props;
  const [order, setOrder] = useState('');
  const { orderType }: { orderType: string } = useParams();
  const [orderTypes, setOrderTypes] = useState(''); //后端请求orderTypes

  const getMoreBookParams = async () => {
    console.log('MoreBooks_orderType = ', orderType);
    if (orderType === 'byPubDate') {
      console.log('MoreBooks = ', 'byPubDate');
      setOrderTypes('pub_date');
      setOrder('时间');
    } else if (orderType === 'byRate') {
      console.log('MoreBooks = ', 'byRate');
      setOrderTypes('rate');
      setOrder('评分');
    } else if (orderType === 'byHot') {
      console.log('MoreBooks = ', 'byHot');
      setOrderTypes('comment_count');
      setOrder('热度');
    }
  };

  useEffect(() => {
    console.log('useEffect');
    getMoreBookParams().then(() => {
      console.log('useEffect_orderTypes = ', orderTypes);
      dispatch({
        type: 'book/getBookList',
        payload: {
          page: 1,
          page_size: 4,
          orderTypes: orderTypes,
        },
      });
    });
  }, []);

  return (
    <React.Fragment>
      {bookModelLoading ? null : (
        <div className={userStyles.moreBooks_middle}>
          <div className={userStyles.moreBooks_top}>
            <span className={userStyles.moreBooks_title}>
              <FieldTimeOutlined style={{ marginRight: '5px' }} />按{order}排序
            </span>
            <a>
              前往分类列表
              <ArrowRightOutlined style={{ marginLeft: '5px' }} />
            </a>
          </div>
          <AdminBookList orderTypes={orderTypes} />
        </div>
      )}
    </React.Fragment>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => {
    return {
      // userInfo: user.userInfo,
      // userModelLoading: loading.models.user
      bookModelLoading: loading.models.book,
    };
  },
)(MoreBooks);
