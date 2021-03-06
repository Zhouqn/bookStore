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
} from 'antd';
import {
  EditOutlined,
  FileTextOutlined,
  LoadingOutlined,
  RollbackOutlined,
  StarFilled,
  LikeOutlined,
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
import CommentModal from '@/components/user/commentModal';

interface BookMsgProps {
  dispatch: Dispatch;
  bookModelLoading: boolean;
  userModelLoading: boolean;
  isLogin: boolean;
  userInfo: userAllType;
  bookRecord: bookRecordValue | undefined;
}

const BookInfo: FC<BookMsgProps> = (props) => {
  const {
    dispatch,
    userModelLoading,
    bookModelLoading,
    isLogin,
    userInfo,
    bookRecord,
  } = props;
  const [bookId, setBookId] = useState(0);
  const [orderTypes, setOrderTypes] = useState('create_time');
  const [rateValue, setRateValue] = useState(0);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const bookListLoadingIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentModalLoading, setCommentModalLoading] = useState(false);
  const [writeCommentText, setWriteCommentText] = useState('');
  const [commentId, setCommentId] = useState(0);
  const [addComment, setAddComment] = useState(true); //???????????????????????????????????? ???????????????True?????????????????????false

  //???????????? ?????????????????????????????????model?????????????????????????????????  (??????????????????????????? ??????????????????)
  const [page, setPage] = useState(1);
  const [page_size, setPage_size] = useState(10);
  const [total_count, setTotal_count] = useState(0);
  const [comments, setComments] = useState<commentType[]>([]);

  //????????????url?????????
  const { bookInfo }: { bookInfo: string } = useParams();

  //????????????????????????
  const getComments = async (payload: any) => {
    user_getOneBook(payload).then((value) => {
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

  //??????
  const goBack = () => {
    history.goBack();
  };

  //??????/??????modal
  const onClickWriteOrUpdateComment = (payload?: any) => {
    if (isLogin) {
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
  //??????
  const rateHandleChange = (rateValue: number) => {
    setRateValue(rateValue);
  };
  //????????????
  const writeCommentTextChange = (value: string) => {
    setWriteCommentText(value);
  };
  //????????????/????????????
  const handleComment = () => {
    if (rateValue === 0 || writeCommentText === '') {
      message.error('??????????????????????????????');
    } else {
      setCommentModalLoading(true);
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
        if (value.code === 0) {
          setCommentModalVisible(false);
          const payload = {
            book_id: parseInt(bookInfo),
            page: addComment ? 1 : page,
            page_size: 4,
            orderTypes: addComment ? 'create_time' : orderTypes,
          };
          getComments(payload).then(() => {
            setOrderTypes(addComment ? 'create_time' : orderTypes); // ??????????????????????????????????????????????????????????????????????????????
            setCommentModalLoading(false);
            message.success(
              `${addComment ? '????????????' : '????????????'}????????????????????????`,
            );
          });
        }
      });
    }
  };
  //????????????
  const cancelComment = () => {
    setCommentModalVisible(false);
    // message.error('????????????');
  };
  //????????????
  const clickDeleteComment = (comment_id: number) => {
    deleteComment({ comment_id }).then((value) => {
      if (value.code === 0) {
        message.success('????????????');
        const payload = {
          book_id: parseInt(bookInfo),
          page: 1,
          page_size: 4,
          orderTypes: 'create_time',
        };
        getComments(payload);
      } else {
        message.error('????????????');
      }
    });
  };

  //????????????
  const submitLoginModal = (formValues: FormValues) => {
    dispatch({
      type: 'user/goLogin',
      payload: {
        username: formValues.username,
        password: md5(formValues.password),
        flag: bookRecord?.id, //?????????modal?????????
      },
    });
    setLoginModalVisible(false);
  };
  //Modal ????????????
  const LoginModalHandleCancel = () => {
    setLoginModalVisible(false);
  };

  //????????????
  const onPageChange = (page: number, pageSize?: number) => {
    const payload = {
      book_id: parseInt(bookInfo),
      page,
      page_size: pageSize ? pageSize : page_size,
      orderTypes,
    };
    getComments(payload);
  };

  //????????????
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

  //??????/??????????????????
  const isLikeComment = (comment_id: number, is_like: boolean) => {
    if (isLogin) {
      likeComment({ comment_id, is_like }).then((value) => {
        if (value.code === 0) {
          if (is_like) {
            message.success('????????????');
          } else {
            message.success('????????????');
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
      {/*????????????*/}
      <div className={userStyles.bookMsg_middle}>
        {bookModelLoading ? (
          <Spin
            indicator={bookListLoadingIcon}
            style={{ position: 'relative', left: '47% ', top: '40%' }}
          />
        ) : bookRecord ? (
          <div className={userStyles.bookMsg_content}>
            <div className={userStyles.bookMsg}>
              <div className={userStyles.bookMsg_goBack} onClick={goBack}>
                <RollbackOutlined style={{ marginRight: '5px' }} />
                ??????
              </div>
              <div className={userStyles.bookMsg_bookTitle}>
                {bookRecord.title}
              </div>
              <div className={userStyles.bookMsg_BookInfos}>
                <Image
                  style={{ width: '130px', height: '185px' }}
                  className={userStyles.bookMsg_bookCover}
                  alt="????????????"
                  src={bookRecord.cover_url}
                  fallback={noBookCover}
                />
                <div className={userStyles.bookMsg_partBookInfo}>
                  <div>????????? {bookRecord.authors}</div>
                  <div>???????????? {bookRecord.pub}</div>
                  <div>??????????????? {bookRecord.pub_date}</div>
                  <div>
                    ?????????
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
                  <div>?????????{bookRecord.retail_price}</div>
                </div>
                <div className={userStyles.bookMsg_bookRate}>
                  <div style={{ fontSize: '15px' }}>
                    {appName} ?????????
                    {bookRecord.rate ? null : (
                      <span style={{ color: 'grey' }}>????????????</span>
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
                  ??????&??????
                </span>
              </div>

              <div style={{ marginTop: '30px' }}>
                <Divider />
                <span style={{ fontSize: '17px', color: '#6969d4' }}>
                  <FileTextOutlined style={{ marginRight: '5px' }} />
                  ?????????
                </span>
                <div style={{ margin: '5px 60px' }}>
                  {bookRecord.describe === ''
                    ? '????????????'
                    : bookRecord.describe}
                </div>
              </div>
            </div>
            <div style={{ width: '1000px', margin: 'auto' }}>
              <Divider />
            </div>
            {/*???????????? ??????*/}
            <div className={userStyles.bookMsg_comment}>
              <div>
                <span style={{ fontSize: '20px', color: '#6969d4' }}>
                  ?????????
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
                    ????????????
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
                    ????????????
                  </a>
                </span>
              </div>
              <List
                className="comment_list"
                header={`${total_count} ?????????`}
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
                      {/*?????????????????????????????????????????????*/}
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
                              ??????
                            </span>
                            <span
                              className={userStyles.bookMsg_comment_delete}
                              onClick={() => clickDeleteComment(item.id)}
                            >
                              ??????
                            </span>
                          </div>
                        ) : null
                      ) : null}
                      <div className={userStyles.bookMsg_comment_like}>
                        <LikeOutlined
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
                showTotal={(total) => `??? ${total} ???`}
                onChange={onPageChange}
                pageSizeOptions={['4', '6', '8', '10', '20', '50']}
                showSizeChanger
                hideOnSinglePage
              />
            </div>
          </div>
        ) : (
          <Empty
            description="????????????"
            style={{ position: 'relative', top: '35%' }}
          />
        )}
      </div>
      {/*?????????Modal*/}
      <LoginModal
        submitLoginModal={submitLoginModal}
        LoginModalHandleCancel={LoginModalHandleCancel}
        loginModalVisible={loginModalVisible}
        loginModalLoading={userModelLoading}
      />
      {/*????????????Modal*/}
      {bookRecord ? (
        <CommentModal
          book_title={bookRecord.title}
          commentModalVisible={commentModalVisible}
          handleComment={handleComment}
          cancelComment={cancelComment}
          commentModalLoading={commentModalLoading}
          rateHandleChange={rateHandleChange}
          rateValue={rateValue}
          writeCommentText={writeCommentText}
          writeCommentTextChange={writeCommentTextChange}
        />
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
    };
  },
)(BookInfo);
