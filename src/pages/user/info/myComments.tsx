import React, { FC, useEffect, useState } from 'react';
import { List, Avatar, Space, Divider, Rate, Spin, message } from 'antd';
import {
  CommentOutlined,
  HeartFilled,
  LoadingOutlined,
  StarFilled,
} from '@ant-design/icons';
import userStyles from '@/asset/css/user.css';
import noBookCoverImg from '@/asset/imgs/noBookCover.png';
import { connect, Dispatch, history } from 'umi';
import { getMyComments } from '@/services/user';
import { UserModelState } from '@/models/user';
import { userAllType, myCommentsType } from '@/pages/data';
import {
  deleteComment,
  likeComment,
  publishComment,
  updateComment,
} from '@/services/book';
import CommentModal from '@/components/user/commentModal';

interface MyCommentsProps {
  // userInfo: userAllType,
  dispatch: Dispatch;
}

const MyComments: FC<MyCommentsProps> = (props) => {
  const { dispatch } = props;

  const [myCommentsLoading, setMyCommentsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [myComments, setMyComments] = useState<myCommentsType[] | []>([]);
  const [orderBy, setOrderBy] = useState('create_time');
  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;
  const rateIcons = <StarFilled style={{ fontSize: 16 }} />;
  //编辑评论
  const [commentModalVisible, setCommentModalVisible] = useState(false);
  const [commentModalLoading, setCommentModalLoading] = useState(false);
  const [rateValue, setRateValue] = useState(0);
  const [writeCommentText, setWriteCommentText] = useState('');
  const [commentId, setCommentId] = useState(0);

  //获取我的评论
  const goGetMyComments = (newPage?: number, order_by?: string) => {
    setMyCommentsLoading(true);
    const value = {
      page: newPage ? newPage : page,
      page_size: 3,
      order_by: order_by ? order_by : orderBy,
    };
    getMyComments(value).then((value) => {
      setMyCommentsLoading(false);
      if (value.code === 0) {
        console.log('getMyComments_value = ', value);
        setMyComments(value.data.comments);
        setTotalCount(value.data.total_count);
      }
    });
  };

  useEffect(() => {
    goGetMyComments();
  }, []);

  //页码变化
  const pageChange = (page: number) => {
    console.log(page);
    setPage(page);
    goGetMyComments(page);
  };
  //是否点赞和取消赞
  const isLikeComment = (comment_id: number, is_like: boolean) => {
    console.log('isLikeComment_comment_id&is_like = ', comment_id, is_like);
    likeComment({ comment_id, is_like }).then((value) => {
      console.log('isLikeComment_value = ', value);
      if (value.code === 0) {
        if (is_like) {
          message.success('取消点赞');
        } else {
          message.success('点赞成功');
        }
        goGetMyComments();
      }
    });
  };

  //最新　最热评论
  //获取评论
  const onClickHotComment = () => {
    setOrderBy('like_count');
    setPage(1);
    goGetMyComments(1, 'like_count');
  };
  const onClickNewComment = () => {
    setOrderBy('create_time');
    setPage(1);
    goGetMyComments(1, 'create_time');
  };

  //查找书
  const goToThisBook = (book_id: number) => {
    history.push(`/user/book/${book_id}`);
  };

  const clickUpdateComment = (payload: any) => {
    setCommentModalVisible(true);
    setRateValue(payload.rate);
    setWriteCommentText(payload.content);
    setCommentId(payload.comment_id);
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
        comment_id: commentId,
        rate: rateValue,
        content: writeCommentText,
      };
      updateComment(payload).then((value) => {
        console.log('updateComment = ', value);
        if (value.code === 0) {
          goGetMyComments();
          setCommentModalVisible(false);
          setCommentModalLoading(false);
          message.success('修改成功，感谢您的评价！');
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
        goGetMyComments();
      } else {
        message.error('删除失败');
      }
    });
  };

  return myCommentsLoading ? (
    <Spin
      indicator={antIcon}
      style={{ position: 'absolute', top: '40%', left: '50%' }}
    />
  ) : (
    <div className={userStyles.comments_list}>
      <div className={userStyles.comments_list_title}>
        当前有{totalCount}个评论
        <CommentOutlined style={{ margin: '0 20px 0 5px' }} />
        <span className={userStyles.comments_list_action}>
          <a
            onClick={() => {
              orderBy === 'like_count' ? onClickNewComment() : {};
            }}
            style={
              orderBy === 'like_count'
                ? { color: 'dodgerblue', textDecoration: 'underline' }
                : { color: 'black', cursor: 'default' }
            }
          >
            最新评论
          </a>
          /
          <a
            onClick={() => {
              orderBy === 'create_time' ? onClickHotComment() : {};
            }}
            style={
              orderBy === 'create_time'
                ? { color: 'dodgerblue', textDecoration: 'underline' }
                : { color: 'black', cursor: 'default' }
            }
          >
            热门评论
          </a>
        </span>
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            pageChange(page);
          },
          current: page,
          pageSize: 3,
          total: totalCount,
          hideOnSinglePage: true,
          showTotal: (total) => {
            return `共 ${total} 条`;
          },
        }}
        dataSource={myComments}
        /*item是评论类型，后面再设具体类型格式*/
        renderItem={(item: any) => (
          <List.Item
            key={item.title}
            actions={[
              <span style={{ marginLeft: '50px' }}>
                <Space>
                  <HeartFilled
                    style={{ color: item.is_like ? 'red' : '' }}
                    onClick={() => isLikeComment(item.id, item.is_like)}
                  />
                  {item.like_count}
                </Space>
              </span>,
              <a
                onClick={() =>
                  clickUpdateComment({
                    comment_id: item.id,
                    rate: item.rate,
                    content: item.content,
                  })
                }
              >
                编辑
              </a>,
              <a onClick={() => clickDeleteComment(item.id)}>删除</a>,
            ]}
            extra={
              <img
                width={110}
                height={160}
                alt="logo"
                src={
                  item.book_info.cover_url
                    ? item.book_info.cover_url
                    : noBookCoverImg
                }
                style={{ border: '1px solid lightgrey', cursor: 'pointer' }}
                onClick={() => goToThisBook(item.book_info.book_id)}
              />
            }
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <a>
                  {item.title}
                  {item.create_time}
                </a>
              }
              description={
                <Rate value={item.rate} character={rateIcons} disabled />
              }
            />
            <div style={{ marginLeft: '50px' }}>{item.content}</div>
            <CommentModal
              book_title={item.book_info.title}
              commentModalVisible={commentModalVisible}
              handleComment={handleComment}
              cancelComment={cancelComment}
              commentModalLoading={commentModalLoading}
              rateHandleChange={rateHandleChange}
              rateValue={rateValue}
              writeCommentText={writeCommentText}
              writeCommentTextChange={writeCommentTextChange}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

// export default connect(({user}: {user: UserModelState}) => {
//   return{
//     userInfo: user.userInfo
//   }
// })(MyComments);
export default connect()(MyComments);
