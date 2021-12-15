import { MessageOutlined } from '@ant-design/icons';
import { CommentData, LoadComments } from '../../modules/comment';
import CommentItem from '../CommentItem';
import { CommentTitle, Wrapper } from './style';

const CommentList = ({ data }: LoadComments) => {
  return (
    <>
      <CommentTitle>
        댓글
        <span>{Array.isArray(data) && `${data.length}개`}</span>
      </CommentTitle>
      <Wrapper>
        {data ? (
          Array.isArray(data) ? (
            data.map((item: CommentData) => (
              <CommentItem data={item} key={item.createdAt} />
            ))
          ) : (
            <CommentItem data={data} />
          )
        ) : (
          <div>댓글이 없습니다</div>
        )}
      </Wrapper>
    </>
  );
};

export default CommentList;
