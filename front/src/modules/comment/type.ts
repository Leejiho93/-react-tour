export type CommentState = {
  //   commentList: [] | undefined;
  commentInfo: any;
  commentList: CommentData[] | CommentData | undefined;
  commentAdded: boolean;
  isAddingComment: boolean;
  commentError: Error | undefined;
  commentEditedError: boolean;
};

export type CommentPayload = {
  contentid: number;
  commentText: string;
};

export type AddComment = {
  data: CommentData;
};

// 댓글 로드
export type LoadCommentPayload = {
  contentId: number;
};

export type LoadComments = {
  data: CommentData[] | CommentData | undefined;
};

export type CommentDataProps = {
  data: CommentData;
};
export type CommentData = {
  User: { id: number; nickname: string };
  UserId: number;
  content: string;
  contentId: number;
  createdAt: string;
  id: number;
  updatedAt: string;
};

//  댓글 삭제
export type DeleteCommentPayload = {
  id: number;
};

//  댓글 수정

export type ModifyCommentPayload = {
  id: number;
  editComment: string;
};

export type ModifyCommentResponse = {
  data: ModifyCommentPayload;
};
