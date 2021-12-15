import {
  LoadCommentPayload,
  LoadComments,
  CommentPayload,
  AddComment,
  DeleteCommentPayload,
  ModifyCommentPayload,
  ModifyCommentResponse,
} from './type';
import axios, { AxiosError } from 'axios';
import {
  addCommentAsync,
  loadCommentAsync,
  deleteCommentAsync,
  modifyCommentAsync,
} from './action';
import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { ConsoleSqlOutlined } from '@ant-design/icons';

function addCommentAPI({ contentid, commentText }: CommentPayload) {
  return axios.post(`/comment/${contentid}`, { content: commentText });
}

function* addCommentSaga(action: ReturnType<typeof addCommentAsync.request>) {
  try {
    const result: AddComment = yield call(addCommentAPI, action.payload);
    console.log('addComment saga result.data', result.data);
    yield put(addCommentAsync.success(result.data));
  } catch (e) {
    yield put(addCommentAsync.failure(e as AxiosError));
  }
}

export function* watchAddComment() {
  //   console.log('watch add comment');
  yield takeLatest(addCommentAsync.request, addCommentSaga);
}

function loadCommentsAPI({ contentId }: LoadCommentPayload) {
  return axios.get(`/comment/${contentId}`);
}

function* loadCommentsSaga(
  action: ReturnType<typeof loadCommentAsync.request>
) {
  try {
    const result: LoadComments = yield call(loadCommentsAPI, action.payload);
    yield put(loadCommentAsync.success(result));
  } catch (e) {
    yield put(loadCommentAsync.failure(e as AxiosError));
  }
}

export function* watchLoadComments() {
  yield takeLatest(loadCommentAsync.request, loadCommentsSaga);
}

function deleteCommentAPI({ id }: DeleteCommentPayload) {
  console.log('delete comment id', id);
  return axios.delete(`/comment/${id}`);
}

function* deleteCommentSaga(
  action: ReturnType<typeof deleteCommentAsync.request>
) {
  try {
    const result: DeleteCommentPayload = yield call(
      deleteCommentAPI,
      action.payload
    );
    console.log('delete comment saga result', result);
    yield put(deleteCommentAsync.success(result));
  } catch (e) {
    console.log('delete comment error', e);
    yield put(deleteCommentAsync.failure(e as AxiosError));
  }
}

export function* watchRemoveComment() {
  yield takeLatest(deleteCommentAsync.request, deleteCommentSaga);
}

function modifyCommentAPI({ id, editComment }: ModifyCommentPayload) {
  return axios.put(`/comment/${id}`, { content: editComment });
}

function* modifyCommentSaga(
  action: ReturnType<typeof modifyCommentAsync.request>
) {
  try {
    const result: ModifyCommentResponse = yield call(
      modifyCommentAPI,
      action.payload
    );
    console.log('modify comment saga result', result.data);
    yield put(modifyCommentAsync.success(result.data));
  } catch (e) {
    yield put(modifyCommentAsync.failure(e as AxiosError));
  }
}

export function* watchModifyComment() {
  yield takeLatest(modifyCommentAsync.request, modifyCommentSaga);
}

export default function* commentSaga() {
  yield all([
    fork(watchAddComment),
    fork(watchLoadComments),
    fork(watchRemoveComment),
    fork(watchModifyComment),
  ]);
}
