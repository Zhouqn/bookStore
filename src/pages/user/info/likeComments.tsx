import React, { useEffect, useState } from 'react';
import { history } from 'umi';
import {
  List,
  Avatar,
  Space,
  Image,
  Rate,
  message,
  Spin,
  Popconfirm,
} from 'antd';
import { LoadingOutlined, StarFilled, LikeOutlined } from '@ant-design/icons';
import userStyles from '@/asset/css/user.css';
import noBookCoverImg from '@/asset/imgs/noBookCover.png';
import avatarImg from '@/asset/imgs/avatar.png';
import { getLikeComments } from '@/services/user';
import { myCommentsType } from '@/pages/data';
import { likeComment } from '@/services/book';

const LikeComments = () => {
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [likeComments, setLikeComments] = useState<myCommentsType[] | []>([]);
  const [likeCommentsLoading, setLikeCommentsLoading] = useState(false);
  const antIcon = <LoadingOutlined style={{ fontSize: 45 }} spin />;
  const rateIcons = <StarFilled style={{ fontSize: 16 }} />;

  useEffect(() => {
    goGetLikeComments();
  }, []);

  //获取我的点赞
  const goGetLikeComments = (newPage?: number) => {
    setLikeCommentsLoading(true);
    const payload = {
      page: newPage ? newPage : page,
      page_size: 3,
    };
    getLikeComments(payload).then((value) => {
      setLikeCommentsLoading(false);
      if (value.code === 0) {
        setLikeComments(value.data.comments);
        setTotalCount(value.data.total_count);
      }
    });
  };

  //页码变化
  const pageOnChange = (page: number) => {
    setPage(page);
    goGetLikeComments(page);
  };

  //跳转书籍信息
  const goToThisBook = (book_id: number) => {
    history.push(`/user/book/${book_id}`);
  };

  //点赞和取消点赞
  const isLikeComment = (comment_id: number, is_like: boolean) => {
    likeComment({ comment_id, is_like }).then((value) => {
      if (value.code === 0) {
        if (is_like) {
          message.success('取消点赞');
        } else {
          message.success('点赞成功');
        }
        goGetLikeComments();
      }
    });
  };

  return likeCommentsLoading ? (
    <Spin
      indicator={antIcon}
      style={{ position: 'absolute', top: '40%', left: '50%' }}
    />
  ) : (
    <div className={userStyles.comments_list}>
      <div className={userStyles.comments_list_title}>
        当前有{totalCount}个喜欢
        <LikeOutlined style={{ color: 'lightpink', marginLeft: '5px' }} />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            pageOnChange(page);
          },
          current: page,
          pageSize: 3,
          total: totalCount,
          showSizeChanger: false,
          hideOnSinglePage: true,
          showTotal: (total) => {
            return `共 ${total} 条`;
          },
        }}
        dataSource={likeComments}
        /*item是评论类型，后面再设具体类型格式*/
        renderItem={(item: any) => (
          <List.Item
            key={item.id}
            actions={[
              <span style={{ marginLeft: '50px' }}>
                <Space>
                  <Popconfirm
                    title="确认取消点赞吗?"
                    onConfirm={() => isLikeComment(item.id, item.is_like)}
                    // onCancel={isLikeCancel}
                    okText="确定"
                    cancelText="取消"
                  >
                    <LikeOutlined
                      style={{ color: item.is_like ? 'red' : '' }}
                      // onClick={() => isLikeComment(item.id, item.is_like)}
                    />
                  </Popconfirm>
                  {item.like_count}
                </Space>
              </span>,
            ]}
            extra={
              <div style={{ width: '100px' }}>
                <div
                  style={{
                    marginBottom: '5px',
                    color: 'cornflowerblue',
                    cursor: 'pointer',
                  }}
                  onClick={() => goToThisBook(item.book_info.book_id)}
                >
                  {item.book_info.title}
                </div>
                <div>
                  <Image
                    width={89}
                    height={130}
                    alt="book"
                    src={
                      item.book_info.cover_url
                        ? item.book_info.cover_url
                        : noBookCoverImg
                    }
                    style={{ border: '1px solid lightgrey' }}
                    fallback={noBookCoverImg}
                    // onClick={() => goToThisBook(item.book_info.book_id)}
                  />
                </div>
              </div>
            }
          >
            <List.Item.Meta
              avatar={
                <Avatar
                  src={item.avatar ? item.avatar : avatarImg}
                  style={{ border: '1px solid whitesmoke' }}
                />
              }
              title={
                <span>
                  <span style={{ color: 'grey' }}>{item.user_name}</span>
                  <span
                    style={{
                      marginLeft: '15px',
                      color: 'lightgrey',
                      fontSize: '15px',
                    }}
                  >
                    {item.create_time}
                  </span>
                </span>
              }
              description={
                <Rate value={item.rate} character={rateIcons} disabled />
              }
            />
            <div style={{ marginLeft: '50px' }}>{item.content}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default LikeComments;
