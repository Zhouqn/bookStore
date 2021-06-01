import userStyles from '@/asset/css/user.css';
import { EditOutlined, FormOutlined } from '@ant-design/icons';
import { Input, Modal, Rate } from 'antd';
import React, { FC } from 'react';

interface CommentModalProps {
  book_title: string;
  commentModalVisible: boolean;
  handleComment: () => void;
  cancelComment: () => void;
  commentModalLoading: boolean;
  rateHandleChange: (rateValue: number) => void;
  rateValue: number;
  writeCommentText: string;
  writeCommentTextChange: (value: string) => void;
}

const CommentModal: FC<CommentModalProps> = (props) => {
  const {
    book_title,
    commentModalVisible,
    handleComment,
    cancelComment,
    commentModalLoading,
    rateHandleChange,
    rateValue,
    writeCommentText,
    writeCommentTextChange,
  } = props;

  const desc = ['差', '较差', '一般', '好', '很好'];

  return (
    <Modal
      title={`当前评价的书籍：${book_title}`}
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
          <Rate tooltips={desc} onChange={rateHandleChange} value={rateValue} />
          {rateValue ? (
            <span style={{ marginLeft: '10px' }}>{desc[rateValue - 1]}</span>
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
  );
};

export default CommentModal;
