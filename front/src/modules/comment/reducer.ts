import { CommentState } from './type';
import { produce } from 'immer';
import {
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  MODIFY_COMMENT_REQUEST,
  MODIFY_COMMENT_SUCCESS,
  MODIFY_COMMENT_FAILURE,
} from './action';
import { createReducer } from 'typesafe-actions';
const initialState: CommentState = {
  commentInfo: {},
  commentList: [],
  commentAdded: false,
  isAddingComment: false,
  commentError: '',
  commentEditedError: false,
};

export type ICommentReducerState = typeof initialState;

const comment = createReducer(initialState, {
  [ADD_COMMENT_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.isAddingComment = true;
      draft.commentError = '';
    }),
  [ADD_COMMENT_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.isAddingComment = false;
      draft.commentInfo = action.payload;
      Array.isArray(draft.commentList)
        ? draft.commentList.push(action.payload)
        : (draft.commentList = [action.payload]);
    }),
  [ADD_COMMENT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.isAddingComment = false;
      draft.commentError = action.payload;
    }),
  [LOAD_COMMENT_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.commentList = [];
    }),
  [LOAD_COMMENT_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.commentList = action.payload.data;
      //
    }),
  [LOAD_COMMENT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.commentList = [];
    }),
  [DELETE_COMMENT_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.commentError = '';
    }),
  [DELETE_COMMENT_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      const index =
        Array.isArray(draft.commentList) &&
        draft.commentList.findIndex((v) => v.id === action.payload.data);
      if (index) {
        Array.isArray(draft.commentList) && draft.commentList.splice(index, 1);
      }
    }),
  [DELETE_COMMENT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.commentError = action.payload;
    }),
  [MODIFY_COMMENT_REQUEST]: (state, action) =>
    produce(state, (draft) => {
      draft.commentEditedError = false;
    }),
  [MODIFY_COMMENT_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      const index =
        Array.isArray(draft.commentList) &&
        draft.commentList.findIndex((v) => v.id === Number(action.payload.id));
      if (index) {
        Array.isArray(draft.commentList) &&
          draft.commentList.map((c, i) => {
            i === index ? (c.content = action.payload.editComment) : c.content;
          });
      }
      draft.commentEditedError = false;
    }),
  [MODIFY_COMMENT_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.commentEditedError = true;
    }),
});

export default comment;
