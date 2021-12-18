import { ActionType } from 'typesafe-actions';
import * as action from './action';

// 댓글 초기값
export interface CommentState {
  commentInfo: CommentData | {};
  commentList: CommentData[];
  commentAdded: boolean;
  isAddingComment: boolean;
  commentError: Error | '';
  commentEditedError: boolean;
}

// 댓글 추가
export interface AddCommentPayload {
  contentid: number;
  commentText: string;
}
export interface AddCommentResult {
  data: CommentData;
}

// 댓글 로드
export interface LoadCommentPayload {
  contentId: number;
}
export interface LoadCommentResponse {
  data: CommentData[];
}

export interface CommentData {
  User: { id: number; nickname: string };
  UserId: number;
  content: string;
  contentId: number;
  createdAt: string;
  id: number;
  updatedAt: string;
}

//  댓글 삭제
export interface DeleteCommentPayload {
  id: number;
}

//  댓글 수정
export interface ModifyCommentPayload {
  id: number;
  editComment: string;
}
export type ModifyCommentResponse = {
  data: ModifyCommentPayload;
};

export type CommentAction = ActionType<typeof action>;
