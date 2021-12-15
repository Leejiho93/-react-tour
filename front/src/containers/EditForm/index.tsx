import React, { useEffect, useState } from 'react';
import { Form } from 'antd';
import {
  FormWrapper,
  SubmitButton,
  TextArea,
  TextAreaWrapper,
} from '../CommentForm/style';
import { CancelButton, ButtonWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCommentAsync } from '../../modules/comment';
import { RootState } from '../../modules';
import Swal from 'sweetalert2';

interface EditFormProps {
  text: string;
  id: number;
  onCancel: () => void;
  onModify: () => void;
}

const EditForm = ({ text, id, onCancel, onModify }: EditFormProps) => {
  const [input, setInput] = useState(text);

  const dispatch = useDispatch();

  const { commentEditedError } = useSelector(
    (state: RootState) => state.comment
  );

  useEffect(() => {
    if (commentEditedError) {
      onModify();
    }
  }, [commentEditedError, onModify]);
  const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const onSubmit = () => {
    if (!input.trim()) {
      return Swal.fire({
        title: '댓글을 입력하세요',
        icon: 'warning',
      });
    }
    dispatch(modifyCommentAsync.request({ id: id, editComment: input }));
    onCancel();
  };
  return (
    <FormWrapper>
      <Form onFinish={onSubmit}>
        <TextAreaWrapper>
          <TextArea
            rows={3}
            onChange={onChangeInput}
            value={input}
            placeholder="댓글을 입력하세요."
          />
          <ButtonWrapper>
            <SubmitButton htmlType="submit" type="primary">
              수정
            </SubmitButton>
            <CancelButton onClick={onCancel}>취소</CancelButton>
          </ButtonWrapper>
        </TextAreaWrapper>
      </Form>
    </FormWrapper>
  );
};

export default EditForm;
