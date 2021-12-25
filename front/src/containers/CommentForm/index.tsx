import { Button, Form } from 'antd';
import router from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import useInput from '../../../utils/useInput';
import { RootState } from '../../modules';
import { addCommentAsync } from '../../modules/comment';
import { DetailItemprops } from '../../modules/detail';
import {
  ButtonWrapper,
  FormWrapper,
  // SubmitButton,
  TextArea,
  TextAreaWrapper,
} from './style';

const CommentForm: React.FC<DetailItemprops> = ({ item }) => {
  const [commentText, onChangeCommentText, setCommentText] = useInput('');
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const showModal = React.useCallback(() => {
    return Swal.fire({
      title: '로그인 화면 이동',
      text: '댓글을 작성하려면 로그인 하세요.',
      showCancelButton: true,
      confirmButtonText: '이동',
      cancelButtonText: '취소',
      icon: 'warning',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login');
      }
    });
  }, []);

  const onSubmit = React.useCallback(() => {
    if (!commentText.trim()) {
      return Swal.fire({
        title: '댓글을 입력하세요',
        icon: 'warning',
      });
    }
    dispatch(
      addCommentAsync.request({ contentid: item.contentid, commentText })
    );
    setCommentText('');
  }, [commentText, dispatch, item.contentid, setCommentText]);

  return (
    <FormWrapper>
      {me ? (
        <Form onFinish={onSubmit}>
          <TextAreaWrapper>
            <TextArea
              rows={3}
              onChange={onChangeCommentText}
              value={commentText}
              placeholder="댓글을 입력하세요."
            />
          </TextAreaWrapper>
          <ButtonWrapper>
            <Button htmlType="submit" type="primary">
              등록
            </Button>
          </ButtonWrapper>
        </Form>
      ) : (
        <Form onClick={showModal}>
          <TextAreaWrapper>
            <TextArea rows={3} placeholder="댓글을 작성하려면 로그인 하세요." />
          </TextAreaWrapper>
          <ButtonWrapper>
            <Button htmlType="submit" type="primary">
              등록
            </Button>
          </ButtonWrapper>
        </Form>
      )}
    </FormWrapper>
  );
};

export default CommentForm;
