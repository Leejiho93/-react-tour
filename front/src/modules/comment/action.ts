import {
  AddCommentPayload,
  CommentData,
  LoadCommentPayload,
  ModifyCommentPayload,
} from './type';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';
import { DeleteCommentPayload } from '.';
export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';
export const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS';
export const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE';

export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';

export const MODIFY_COMMENT_REQUEST = 'MODIFY_COMMENT_REQUEST';
export const MODIFY_COMMENT_SUCCESS = 'MODIFY_COMMENT_SUCCESS';
export const MODIFY_COMMENT_FAILURE = 'MODIFY_COMMENT_FAILURE';

export const addCommentAsync = createAsyncAction(
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE
)<AddCommentPayload, CommentData, AxiosError>();

export const loadCommentAsync = createAsyncAction(
  LOAD_COMMENT_REQUEST,
  LOAD_COMMENT_SUCCESS,
  LOAD_COMMENT_FAILURE
)<LoadCommentPayload, CommentData[], AxiosError>();

export const deleteCommentAsync = createAsyncAction(
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
)<DeleteCommentPayload, DeleteCommentPayload, AxiosError>();

export const modifyCommentAsync = createAsyncAction(
  MODIFY_COMMENT_REQUEST,
  MODIFY_COMMENT_SUCCESS,
  MODIFY_COMMENT_FAILURE
)<ModifyCommentPayload, ModifyCommentPayload, AxiosError>();
