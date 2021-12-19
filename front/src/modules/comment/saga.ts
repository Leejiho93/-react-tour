import {
  LoadCommentPayload,
  LoadCommentResponse,
  AddCommentPayload,
  AddCommentResult,
  DeleteCommentPayload,
  ModifyCommentPayload,
  ModifyCommentResponse,
} from './type';
import axios from 'axios';
import {
  addCommentAsync,
  loadCommentAsync,
  deleteCommentAsync,
  modifyCommentAsync,
} from './action';
import { takeLatest, put, call, fork, all } from 'redux-saga/effects';

// 댓글 추가
function addCommentAPI({ contentid, commentText }: AddCommentPayload) {
  return axios.post(`/comment/${contentid}`, { content: commentText });
}
function* addCommentSaga(action: ReturnType<typeof addCommentAsync.request>) {
  try {
    const result: AddCommentResult = yield call(addCommentAPI, action.payload);
    yield put(addCommentAsync.success(result.data));
  } catch (e: any) {
    yield put(addCommentAsync.failure(e.response.data));
  }
}
export function* watchAddComment() {
  yield takeLatest(addCommentAsync.request, addCommentSaga);
}

// 댓글 로드
function loadCommentsAPI({ contentId }: LoadCommentPayload) {
  return axios.get(`/comment/${contentId}`);
}
function* loadCommentsSaga(
  action: ReturnType<typeof loadCommentAsync.request>
) {
  try {
    const result: LoadCommentResponse = yield call(
      loadCommentsAPI,
      action.payload
    );
    yield put(loadCommentAsync.success(result.data));
  } catch (e: any) {
    yield put(loadCommentAsync.failure(e.response.data));
  }
}
export function* watchLoadComments() {
  yield takeLatest(loadCommentAsync.request, loadCommentsSaga);
}

// 댓글 삭제
function deleteCommentAPI({ id }: DeleteCommentPayload) {
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
    yield put(deleteCommentAsync.success(result));
  } catch (e: any) {
    yield put(deleteCommentAsync.failure(e.response.data));
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
    yield put(modifyCommentAsync.success(result.data));
  } catch (e: any) {
    yield put(modifyCommentAsync.failure(e.response.data));
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
