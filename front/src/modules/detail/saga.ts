import {
  SearchResponse,
  SearchPayload,
  DetailResponse,
  DetailPayload,
  RegionResponse,
  RegionPayload,
  AllResponse,
} from './type';
import { searchAsync, detailAsync, regionAsync, allAsync } from './action';
import { takeLatest, put, call, all, fork } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

// 메인 화면
function allAPI() {
  return axios.get('/detail/all');
}
function* allDataSaga() {
  try {
    const result: AllResponse = yield call(allAPI);
    yield put(allAsync.success(result.data));
  } catch (e: any) {
    console.error(e);
    yield put(allAsync.failure(e.response.data));
  }
}
export function* watchAllData() {
  yield takeLatest(allAsync.request, allDataSaga);
}

// 검색기능
function searchAPI({ search, pageNo, arrange }: SearchPayload) {
  return axios.get(`/detail/search`, {
    params: {
      search,
      pageNo,
      arrange,
    },
  });
}
function* searchDetailSaga(action: ReturnType<typeof searchAsync.request>) {
  try {
    const result: SearchResponse = yield call(searchAPI, action.payload);
    yield put(searchAsync.success(result.data));
  } catch (e: any) {
    console.error(e);
    yield put(searchAsync.failure(e.response.data));
  }
}
export function* watchSearchDetail() {
  yield takeLatest(searchAsync.request, searchDetailSaga);
}

// 지역기반 검색
function regionAPI({
  arrange,
  areaCode,
  contentTypeId,
  pageNo,
  numOfRows,
}: RegionPayload) {
  return axios.get('/detail/region', {
    params: {
      arrange,
      areaCode,
      contentTypeId,
      pageNo,
      numOfRows,
    },
  });
}
function* regionDetailSaga(action: ReturnType<typeof regionAsync.request>) {
  try {
    const result: RegionResponse = yield call(regionAPI, action.payload);
    yield put(regionAsync.success(result.data));
  } catch (e: any) {
    console.error(e);
    yield put(regionAsync.failure(e.response.data));
  }
}
export function* watchRegionDetail() {
  yield takeLatest(regionAsync.request, regionDetailSaga);
}

// 상세 정보
function detailAPI({ contentId, contentTypeId }: DetailPayload) {
  return axios.get(`/detail/${contentTypeId}/${contentId}`);
}
function* detailResultSaga(action: ReturnType<typeof detailAsync.request>) {
  try {
    const result: DetailResponse = yield call(detailAPI, action.payload);
    yield put(detailAsync.success(result.data));
  } catch (e: any) {
    console.error(e);
    yield put(detailAsync.failure(e.response.data));
  }
}
export function* watchDetailResult() {
  yield takeLatest(detailAsync.request, detailResultSaga);
}

export default function* detailSaga() {
  yield all([
    fork(watchSearchDetail),
    fork(watchDetailResult),
    fork(watchRegionDetail),
    fork(watchAllData),
  ]);
}
