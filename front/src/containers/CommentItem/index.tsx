import * as React from 'react';
import { Avatar } from 'antd';
import { CommentData, deleteCommentAsync } from '../../modules/comment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../modules';
import { CommentStyle } from './style';
import Swal from 'sweetalert2';
import EditForm from '../EditForm';

interface CommentItemProps {
  data: CommentData;
}

const CommentItem = ({ data }: CommentItemProps) => {
  const [editable, setEditable] = React.useState(false);
  const dispatch = useDispatch();

  const id = useSelector(
    (state: RootState) => state.user.me && state.user.me.id
  );

  const removeComment = React.useCallback(() => {
    Swal.fire({
      title: '댓글을 정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCommentAsync.request({ id: data.id }));
      }
    });
  }, [dispatch, data.id]);
  const modifyComment = React.useCallback(() => {
    setEditable(true);
  }, []);
  const cancelComment = React.useCallback(() => {
    setEditable(!editable);
  }, [editable]);

  return (
    <>
      {!editable ? (
        <CommentStyle
          mine={id === data.UserId ? 1 : 0}
          actions={[
            // <span key="comment-nested-reply-to">답글</span>,
            id === data.UserId ? (
              <span onClick={modifyComment} key="comment-modify">
                수정
              </span>
            ) : null,
            id === data.UserId ? (
              <span onClick={removeComment} key="comment-delete">
                삭제
              </span>
            ) : null,
          ]}
          author={<a>{data.User.nickname}</a>}
          avatar={<Avatar>{data.User.nickname.slice(0, 2)}</Avatar>}
          content={<p>{data.content}</p>}
          datetime={
            <span>
              {new Date(data.createdAt).toLocaleString({
                timeZone: 'Asia/Seoul',
              })}
            </span>
          }
        ></CommentStyle>
      ) : (
        <>
          <EditForm
            text={data.content}
            id={data.id}
            onModify={modifyComment}
            onCancel={cancelComment}
          />
        </>
      )}
    </>
  );
};

export default CommentItem;
