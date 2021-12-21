import { CommentData, LoadCommentResponse } from '../../modules/comment';
import CommentItem from '../../containers/CommentItem';
import { CommentTitle, Wrapper } from './style';

const CommentList: React.FC<LoadCommentResponse> = ({ data }) => {
  return (
    <>
      <CommentTitle>
        댓글
        <span>{`${data.length}개`}</span>
      </CommentTitle>
      <Wrapper>
        {data &&
          data.map((item: CommentData) => (
            <CommentItem data={item} key={item.createdAt} />
          ))}
      </Wrapper>
    </>
  );
};

export default CommentList;
