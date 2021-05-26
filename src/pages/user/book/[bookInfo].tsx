import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, useParams } from 'umi';
import {
  Image,
  message,
  Rate,
  List,
  Comment,
  Divider,
  Empty,
  Spin,
  Pagination,
} from 'antd';
import {
  FormOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartFilled,
  LoadingOutlined,
} from '@ant-design/icons';
import { appName } from '@/config';
import noBookCover from '@/asset/imgs/noBookCover.png';
import userStyles from '@/asset/css/user.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import LoginModal from '@/components/user/loginModal';
import { bookRecordValue, FormValues, commentType } from '@/pages/data';
import { Loading } from '@@/plugin-dva/connect';
import { user_getOneBook } from '@/services/book';
// @ts-ignore
import md5 from 'md5';

interface BookMsgProps {
  dispatch: Dispatch;
  bookModelLoading: boolean;
  userModelLoading: boolean;
  isLogin: boolean;
  bookRecord: bookRecordValue | undefined;
  // comments: commentType[];
  // page: number;
  // page_size: number;
  // total_count: number;
}

const desc = ['差', '较差', '一般', '好', '很好'];

const BookInfo: FC<BookMsgProps> = (props) => {
  const {
    dispatch,
    userModelLoading,
    bookModelLoading,
    isLogin,
    bookRecord,
  } = props;
  const [bookId, setBookId] = useState(0);
  const [orderTypes, setOrderTypes] = useState('create_time');
  const [rateValue, setRateValue] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  // const [loginModalLoading, setLoginModalLoading] = useState(false);
  const bookListLoadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

  //获取评论 【直接从后台获取，不用model里面的数据，自己定义】  (防止整个页面刷新， 只想评论刷新)
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
  const [total_count, setTotal_count] = useState(0);
  const [comments, setComments] = useState<commentType[]>([]);

  //获取动态url的参数
  const { bookInfo }: { bookInfo: string } = useParams();

  //后台直接获取评论
  const getComments = (payload: any) => {
    user_getOneBook(payload).then((value) => {
      console.log('value = ', value);
      if (value.code === 0) {
        const { page, page_size, total_count, comments } = value.data;
        setPage(page);
        setPage_size(page_size);
        setTotal_count(total_count);
        setComments(comments);
      }
    });
  };

  useEffect(() => {
    dispatch({
      type: 'book/getBook_byId',
      payload: {
        book_id: bookInfo,
      },
    });
    const payload = {
      book_id: parseInt(bookInfo),
      page,
      page_size,
      orderTypes,
    };
    getComments(payload);
  }, [bookId]);

  //评分
  const rateHandleChange = (rateValue: number) => {
    // console.log(rateValue)
    if (isLogin) {
      setRateValue(rateValue);
    } else {
      setLoginModalVisible(true);
    }
  };

  //提交登录
  const submitLoginModal = (formValues: FormValues) => {
    console.log('submitLoginModal_formValues = ', formValues);
    dispatch({
      type: 'user/goLogin',
      payload: {
        username: formValues.username,
        password: md5(formValues.password),
        flag: 2, //代表从modal出登录
      },
    });
    setLoginModalVisible(false);
    // message.success("登陆成功")
  };
  //Modal 取消登录
  const LoginModalHandleCancel = () => {
    setLoginModalVisible(false);
    message.error('已取消');
  };

  const onPageChange = (page: number, pageSize?: number) => {
    const payload = {
      book_id: parseInt(bookInfo),
      page,
      page_size: pageSize ? pageSize : page_size,
      orderTypes,
    };
    getComments(payload);
  };

  //获取评论
  const onClickHotComment = () => {
    setOrderTypes('like_count');
    const payload = {
      book_id: parseInt(bookInfo),
      page: 1,
      page_size: page_size,
      orderTypes: 'like_count',
    };
    getComments(payload);
  };
  const onClickNewComment = () => {
    setOrderTypes('create_time');
    const payload = {
      book_id: parseInt(bookInfo),
      page: 1,
      page_size: page_size,
      orderTypes: 'create_time',
    };
    getComments(payload);
  };

  //点赞评论
  const isLikeComment = () => {};

  return (
    <React.Fragment>
      <Header isLogin={isLogin} />
      {/*上半部分*/}

      <div className={userStyles.bookMsg_middle}>
        {bookModelLoading ? (
          <Spin
            indicator={bookListLoadingIcon}
            style={{ position: 'relative', left: '47% ', top: '40%' }}
          />
        ) : bookRecord ? (
          <div>
            <div className={userStyles.bookMsg}>
              <div className={userStyles.bookMsg_bookTitle}>
                {bookRecord.title}
              </div>
              <div className={userStyles.bookMsg_BookInfos}>
                <Image
                  style={{ width: '130px', height: '185px' }}
                  className={userStyles.bookMsg_bookCover}
                  alt="暂无图片"
                  src={bookRecord.cover_url}
                  fallback={noBookCover}
                />
                <div className={userStyles.bookMsg_partBookInfo}>
                  <div>作者： {bookRecord.authors}</div>
                  <div>出版社： {bookRecord.pub}</div>
                  <div>出版时间： {bookRecord.pub_date}</div>
                  <div>
                    原价：
                    <span
                      style={{
                        textDecoration: 'line-through',
                        marginRight: '5px',
                        color: 'red',
                      }}
                    >
                      {bookRecord.price}
                    </span>
                  </div>
                  <div>现价：{bookRecord.retail_price}</div>
                </div>
                <div className={userStyles.bookMsg_bookRate}>
                  <div style={{ fontSize: '15px' }}>
                    {appName}评分：
                    {bookRecord.rate ? null : (
                      <span style={{ color: 'grey' }}>暂无评分</span>
                    )}
                  </div>
                  {bookRecord.rate ? (
                    <span
                      style={{
                        fontSize: '25px',
                        position: 'relative',
                        top: '3px',
                      }}
                    >
                      {bookRecord.rate}
                    </span>
                  ) : null}
                  <Rate
                    style={{ marginLeft: '15px' }}
                    value={bookRecord.rate}
                    allowHalf
                    disabled
                  />
                </div>
              </div>
              <div className={userStyles.bookMsg_doRate}>
                <FormOutlined style={{ marginRight: '5px' }} />
                <span>评价：</span>
                <span>
                  <Rate
                    tooltips={desc}
                    onChange={rateHandleChange}
                    value={rateValue}
                    disabled={!!rateValue}
                  />
                  {rateValue ? (
                    <span style={{ marginLeft: '10px' }}>
                      {desc[rateValue - 1]}
                    </span>
                  ) : (
                    ''
                  )}
                </span>
              </div>
              <div style={{ marginTop: '10px' }}>
                <EditOutlined style={{ marginRight: '5px' }} />
                <span>写评论</span>
              </div>

              <div style={{ marginTop: '30px' }}>
                <Divider />
                <span style={{ fontSize: '17px', color: '#6969d4' }}>
                  <FileTextOutlined style={{ marginRight: '5px' }} />
                  描述：
                </span>
                <div style={{ margin: '5px 60px' }}>
                  {bookRecord.describe === ''
                    ? '暂无描述'
                    : bookRecord.describe}
                </div>
              </div>
            </div>
            <div style={{ width: '1000px', margin: 'auto' }}>
              <Divider />
            </div>
            {/*下半部分 书评*/}
            <div className={userStyles.bookMsg_comment}>
              <div>
                <span style={{ fontSize: '20px', color: '#6969d4' }}>
                  书评：
                </span>
                <span className={userStyles.bookMsg_chooseOrderType}>
                  <a
                    onClick={() => {
                      onClickNewComment();
                    }}
                    className={userStyles.bookMsg_orderType}
                    style={
                      orderTypes === 'create_time'
                        ? { color: 'dodgerblue', textDecoration: 'underline' }
                        : {}
                    }
                  >
                    最新评论
                  </a>
                  /
                  <a
                    onClick={() => {
                      onClickHotComment();
                    }}
                    className={userStyles.bookMsg_orderType}
                    style={
                      orderTypes === 'like_count'
                        ? { color: 'dodgerblue', textDecoration: 'underline' }
                        : {}
                    }
                  >
                    热门评论
                  </a>
                </span>
              </div>
              <List
                className="comment_list"
                header={`${total_count} 条评论`}
                itemLayout="horizontal"
                dataSource={comments}
                renderItem={(item) => (
                  <li>
                    <Comment
                      author={item.user_name}
                      avatar={item.avatar}
                      content={item.content}
                      datetime={item.create_time}
                    />
                    <div className={userStyles.bookMsg_like_delete}>
                      <span className={userStyles.bookMsg_comment_delete}>
                        删除
                      </span>{' '}
                      {/*判断是不是当前用户，再显示删除*/}
                      <div className={userStyles.bookMsg_comment_like}>
                        <HeartFilled
                          style={{
                            color: item.is_like ? 'red' : 'lightgrey',
                            marginRight: '7px',
                          }}
                          onClick={isLikeComment}
                        />
                        {item.like_count
                          ? `${
                              item.like_count > 999 ? '999+' : item.like_count
                            }`
                          : ''}
                      </div>
                    </div>
                    <Divider />
                  </li>
                )}
              />
              <Pagination
                className={userStyles.bookMsg_comment_pagination}
                current={page}
                pageSize={page_size}
                total={total_count}
                showTotal={(total) => `共 ${total} 条`}
                onChange={onPageChange}
                pageSizeOptions={['4', '6', '8', '10', '20', '50']}
                showSizeChanger
                hideOnSinglePage
              />
            </div>
          </div>
        ) : (
          <Empty
            description="暂无信息"
            style={{ position: 'relative', top: '35%' }}
          />
        )}
      </div>
      <Footer />
      <LoginModal
        submitLoginModal={submitLoginModal}
        LoginModalHandleCancel={LoginModalHandleCancel}
        loginModalVisible={loginModalVisible}
        loginModalLoading={userModelLoading}
      />
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
      isLogin: user.isLogin,
      userModelLoading: loading.models.user,
      bookModelLoading: loading.models.book,
      bookRecord: book.bookRecord,
      // comments: book.comments,
      // page: book.page,
      // page_size: book.page_size,
      // total_count: book.total_count,
    };
  },
)(BookInfo);
