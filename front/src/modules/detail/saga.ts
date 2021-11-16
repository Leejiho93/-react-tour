import { SearchResponse, SearchPayload } from './type';
import { searchAsync } from './action';
import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

async function searchAPI({ search, pageNo }: SearchPayload) {
  return axios.get(`/detail/search`, {
    params: {
      search: search,
      pageNo: pageNo,
    },
  });
}

function* searchDetailSaga(action: ReturnType<typeof searchAsync.request>) {
  try {
    const result: SearchResponse = yield call(searchAPI, action.payload);
    console.log('success result', result.data);
    yield put(searchAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield put(searchAsync.failure(e as AxiosError));
  }
}

export function* watchSearchDetail() {
  yield takeLatest(searchAsync.request, searchDetailSaga);
}

export default function* detailSaga() {
  yield all([fork(watchSearchDetail)]);
}
