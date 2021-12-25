import React, { useEffect } from 'react';
import { Button, Form } from 'antd';
import { FormWrapper, TextArea, TextAreaWrapper } from '../CommentForm/style';
import { CancelButton, ButtonWrapper } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { modifyCommentAsync } from '../../modules/comment';
import { RootState } from '../../modules';
import Swal from 'sweetalert2';
import useInput from '../../../utils/useInput';

interface EditFormProps {
  text: string;
  id: number;
  toggleEdit: () => void;
  contentid: number;
}

const EditForm: React.FC<EditFormProps> = ({
  text,
  id,
  toggleEdit,
  contentid,
}) => {
  const [input, onChangeInput] = useInput(text);

  const dispatch = useDispatch();

  const { commentEditedError } = useSelector(
    (state: RootState) => state.comment
  );

  useEffect(() => {
    if (commentEditedError) {
      toggleEdit();
    }
  }, [commentEditedError, toggleEdit]);

  const onSubmit = React.useCallback(() => {
    if (!input.trim()) {
      return Swal.fire({
        title: '댓글을 입력하세요',
        icon: 'warning',
      });
    }
    dispatch(modifyCommentAsync.request({ id, editComment: input, contentid }));
    toggleEdit();
  }, [input, id, dispatch, toggleEdit, contentid]);
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
            <Button htmlType="submit" type="primary">
              수정
            </Button>
            <CancelButton onClick={toggleEdit}>취소</CancelButton>
          </ButtonWrapper>
        </TextAreaWrapper>
      </Form>
    </FormWrapper>
  );
};

export default EditForm;
