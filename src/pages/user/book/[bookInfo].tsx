import React, { FC, useEffect, useState } from 'react';
import { connect, Dispatch, useParams, history } from 'umi';
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
  Modal,
  Input,
} from 'antd';
import {
  FormOutlined,
  EditOutlined,
  FileTextOutlined,
  HeartFilled,
  LoadingOutlined,
  RollbackOutlined,
  StarFilled,
} from '@ant-design/icons';
import { appName } from '@/config';
import noBookCover from '@/asset/imgs/noBookCover.png';
import userStyles from '@/asset/css/user.css';
import { UserModelState } from '@/models/user';
import { BookModelState } from '@/models/book';
import LoginModal from '@/components/user/loginModal';
import {
  bookRecordValue,
  FormValues,
  commentType,
  userAllType,
} from '@/pages/data';
import { Loading } from '@@/plugin-dva/connect';
import {
  user_getOneBook,
  publishComment,
  updateComment,
  deleteComment,
  likeComment,
} from '@/services/book';
// @ts-ignore
import md5 from 'md5';
import noAvatar from '@/asset/imgs/avatar.png';
import { render } from 'react-dom';

interface BookMsgProps {
  dispatch: Dispatch;
  bookModelLoading: boolean;
  userModelLoading: boolean;
  isLogin: boolean;
  userInfo: userAllType;
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
    userInfo,
    bookRecord,
  } = props;
  console.log('BookInfo_isLogin_userInfo = ', isLogin, userInfo);
  const [bookId, setBookId] = useState(0);
  const [orderTypes, setOrderTypes] = useState('create_time');
  const [rateValue, setRateValue] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  // const [loginModalLoading, setLoginModalLoading] = useState(false);
  const bookListLoadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentModalLoading, setCommentModalLoading] = useState(false);
  const [writeCommentText, setWriteCommentText] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [addComment, setAddComment] = useState(true); //判断是添加还是修改评论， 添加评论为True，如果是修改为false

  //获取评论 【直接从后台获取，不用model里面的数据，自己定义】  (防止整个页面刷新， 只想评论刷新)
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
  const [total_count, setTotal_count] = useState(0);
  const [comments, setComments] = useState<commentType[]>([]);

  //获取动态url的参数
  const { bookInfo }: { bookInfo: string } = useParams();

  //后台直接获取评论
  const getComments = async (payload: any) => {
    user_getOneBook(payload).then((value) => {
      console.log('value = ', value);
      if (value.code === 0) {
        const { page, page_size, total_count, comments } = value.data;
        setPage(page);
        setPage_size(page_size);
        setTotal_count(total_count);
        setComments(comments);
      } else {
        message.error(value.message);
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

  //返回
  const goBack = () => {
    history.goBack();
  };

  //评分/评论modal
  const onClickWriteOrUpdateComment = (payload?: any) => {
    if (isLogin) {
      console.log('onClickWriteOrUpdateComment_payload = ', payload);
      if (payload.rate && payload.content && payload.comment_id) {
        setRateValue(payload.rate);
        setWriteCommentText(payload.content);
        setAddComment(false);
        setCommentId(payload.comment_id);
      } else {
        rateHandleChange(0);
        setWriteCommentText('');
        setAddComment(true);
      }
      setCommentModalVisible(true);
    } else {
      setLoginModalVisible(true);
    }
  };
  //评分
  const rateHandleChange = (rateValue: number) => {
    // console.log(rateValue)
    setRateValue(rateValue);
  };
  //评论内容
  const writeCommentTextChange = (value: string) => {
    setWriteCommentText(value);
  };
  //提交评论/编辑评论
  const handleComment = () => {
    if (rateValue === 0 || writeCommentText === '') {
      message.error('评分为空或者评论为空');
    } else {
      setCommentModalLoading(true);
      console.log('handleComment = ', rateValue, writeCommentText);
      const payload = {
        book_id: bookRecord ? bookRecord.id : 0,
        comment_id: commentId,
        rate: rateValue,
        content: writeCommentText,
      };
      let serviceComment;
      if (addComment) {
        serviceComment = publishComment;
      } else {
        serviceComment = updateComment;
      }
      serviceComment(payload).then((value) => {
        console.log('serviceComment_value = ', value);
        if (value.code === 0) {
          setCommentModalVisible(false);
          const payload = {
            book_id: parseInt(bookInfo),
            page: addComment ? 1 : page,
            page_size: 4,
            orderTypes: addComment ? 'create_time' : orderTypes,
          };
          getComments(payload).then(() => {
            setOrderTypes(addComment ? 'create_time' : orderTypes); // 如果是新评论就是要转到最新评论，如果是编辑，则不需要
            setCommentModalLoading(false);
            message.success('发表成功，感谢您的评价！');
          });
        }
      });
    }
  };
  //取消评论
  const cancelComment = () => {
    setCommentModalVisible(false);
    message.error('取消评论');
  };
  //删除评论
  const clickDeleteComment = (comment_id: number) => {
    deleteComment({ comment_id }).then((value) => {
      if (value.code === 0) {
        message.success('删除成功');
        const payload = {
          book_id: parseInt(bookInfo),
          page: 1,
          page_size: 4,
          orderTypes: 'create_time',
        };
        getComments(payload);
      } else {
        message.error('删除失败');
      }
    });
  };

  //提交登录
  const submitLoginModal = (formValues: FormValues) => {
    console.log('submitLoginModal_formValues = ', formValues);
    dispatch({
      type: 'user/goLogin',
      payload: {
        username: formValues.username,
        password: md5(formValues.password),
        flag: bookRecord?.id, //代表从modal出登录
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

  //页码变换
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
  const isLikeComment = (comment_id: number, is_like: boolean) => {
    console.log('isLikeComment_comment_id&is_like = ', comment_id, is_like);
    if (isLogin) {
      likeComment({ comment_id, is_like }).then((value) => {
        console.log('isLikeComment_value = ', value);
        if (value.code === 0) {
          if (is_like) {
            message.success('取消点赞');
          } else {
            message.success('点赞成功');
          }
          const payload = {
            book_id: parseInt(bookInfo),
            page,
            page_size,
            orderTypes,
          };
          getComments(payload);
        }
      });
    } else {
      setLoginModalVisible(true);
    }
  };

  const customIcons = <StarFilled style={{ fontSize: 15 }} />;

  return (
    <React.Fragment>
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
              <div className={userStyles.bookMsg_goBack} onClick={goBack}>
                <RollbackOutlined style={{ marginRight: '5px' }} />
                返回
              </div>
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
                      {bookRecord.rate.toFixed(1)}
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
              <div style={{ marginTop: '50px' }}>
                <EditOutlined style={{ marginRight: '5px' }} />
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={onClickWriteOrUpdateComment}
                >
                  评分&评论
                </span>
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
                    style={
                      orderTypes === 'like_count'
                        ? { color: 'dodgerblue', textDecoration: 'underline' }
                        : { color: 'black', cursor: 'default' }
                    }
                  >
                    最新评论
                  </a>
                  /
                  <a
                    onClick={() => {
                      onClickHotComment();
                    }}
                    style={
                      orderTypes === 'create_time'
                        ? { color: 'dodgerblue', textDecoration: 'underline' }
                        : { color: 'black', cursor: 'default' }
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
                      author={
                        <div style={{ fontSize: '15px' }}>{item.user_name}</div>
                      }
                      avatar={item.avatar ? item.avatar : noAvatar}
                      content={
                        <div>
                          <div style={{ marginBottom: '15px' }}>
                            <Rate
                              value={item.rate}
                              disabled
                              character={customIcons}
                            />
                          </div>
                          <div>{item.content}</div>
                        </div>
                      }
                      datetime={item.create_time}
                    />
                    <div className={userStyles.bookMsg_like_comment}>
                      {/*判断是不是当前用户，再显示删除*/}
                      {userInfo ? (
                        item.user_id === userInfo.user_id ? (
                          <div>
                            <span
                              className={userStyles.bookMsg_comment_update}
                              onClick={() =>
                                onClickWriteOrUpdateComment({
                                  comment_id: item.id,
                                  rate: item.rate,
                                  content: item.content,
                                })
                              }
                            >
                              编辑
                            </span>
                            <span
                              className={userStyles.bookMsg_comment_delete}
                              onClick={() => clickDeleteComment(item.id)}
                            >
                              删除
                            </span>
                          </div>
                        ) : null
                      ) : null}
                      <div className={userStyles.bookMsg_comment_like}>
                        <HeartFilled
                          style={{
                            color: item.is_like ? 'red' : 'lightgrey',
                            marginRight: '7px',
                          }}
                          onClick={() => isLikeComment(item.id, item.is_like)}
                        />
                        <span style={{ color: 'grey' }}>
                          {item.like_count
                            ? `${
                                item.like_count > 999 ? '999+' : item.like_count
                              }`
                            : 0}
                        </span>
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
      {/*登录的Modal*/}
      <LoginModal
        submitLoginModal={submitLoginModal}
        LoginModalHandleCancel={LoginModalHandleCancel}
        loginModalVisible={loginModalVisible}
        loginModalLoading={userModelLoading}
      />
      {/*写评论的Modal*/}
      {bookRecord ? (
        <Modal
          title={`当前评价的书籍：${bookRecord.title}`}
          visible={commentModalVisible}
          onOk={handleComment}
          onCancel={cancelComment}
          okText="发表"
          cancelText="取消"
          confirmLoading={commentModalLoading}
        >
          <div className={userStyles.bookMsg_doRate}>
            <FormOutlined style={{ marginRight: '5px' }} />
            <span>评价：</span>
            <span>
              <Rate
                tooltips={desc}
                onChange={rateHandleChange}
                value={rateValue}
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
          <div className={userStyles.bookMsg_writeComment}>
            <div>
              <EditOutlined style={{ marginRight: '5px' }} />
              写评价：
            </div>
            <div>
              <Input.TextArea
                style={{ width: '390px' }}
                rows={4}
                maxLength={300}
                showCount
                value={writeCommentText}
                onChange={(e) => writeCommentTextChange(e.target.value)}
              />
            </div>
          </div>
        </Modal>
      ) : null}
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
      userInfo: user.userInfo,
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
