import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, Loading, useParams, Link } from 'umi';
import AdminBookList from '@/pages/admin/book/list';
import userStyles from '@/asset/css/user.css';
import { UserModelState } from '@/models/user';
import {
  FieldTimeOutlined,
  ArrowRightOutlined,
  StarOutlined,
  CommentOutlined,
} from '@ant-design/icons';

interface MoreBooksProps {
  dispatch: Dispatch;
  bookModelLoading: boolean;
}

const MoreBooks: FC<MoreBooksProps> = (props) => {
  const { dispatch, bookModelLoading } = props;
  const [order, setOrder] = useState('');
  const { orderType }: { orderType: string } = useParams();
  const [orderTypes, setOrderTypes] = useState(''); //后端请求orderTypes
  const [loadingFlag, setLoadingFlag] = useState(false);

  const getMoreBookParams = async () => {
    if (orderType === 'byPubDate') {
      setOrderTypes('pub_date');
      setOrder('时间');
    } else if (orderType === 'byRate') {
      setOrderTypes('rate');
      setOrder('评分');
    } else if (orderType === 'byHot') {
      setOrderTypes('comment_count');
      setOrder('热度');
    }
  };

  useEffect(() => {
    getMoreBookParams().then(() => {
      if (orderTypes !== '') {
        dispatch({
          type: 'book/getBookList',
          payload: {
            page: 1,
            page_size: 4,
            orderTypes: orderTypes,
          },
        });
        setLoadingFlag(true);
      }
    });
  }, [orderType, orderTypes]);

  return (
    <React.Fragment>
      <div className={userStyles.moreBooks_middle}>
        {loadingFlag ? (
          <div className={userStyles.moreBooks_Info}>
            <div className={userStyles.moreBooks_top}>
              <span className={userStyles.moreBooks_title}>
                {order === '时间' ? (
                  <FieldTimeOutlined style={{ marginRight: '5px' }} />
                ) : order === '热度' ? (
                  <StarOutlined style={{ marginRight: '5px' }} />
                ) : (
                  <CommentOutlined style={{ marginRight: '5px' }} />
                )}
                按{order}排序
              </span>
              <Link to="/user/book/list">
                前往分类列表
                <ArrowRightOutlined style={{ marginLeft: '5px' }} />
              </Link>
            </div>
            <AdminBookList orderTypes={orderTypes} />
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default connect(
  ({ user, loading }: { user: UserModelState; loading: Loading }) => {
    return {
      bookModelLoading: loading.models.book,
    };
  },
)(MoreBooks);
