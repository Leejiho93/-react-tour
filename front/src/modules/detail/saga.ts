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
    // console.log('success result', result.data);
    yield put(searchAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield put(searchAsync.failure(e as AxiosError));
  }
}

export function* watchSearchDetail() {
  yield takeLatest(searchAsync.request, searchDetailSaga);
}

function detailAPI({ contentId, contentTypeId }: DetailPayload) {
  // console.log('detail API contentTypeId', contentTypeId);
  // console.log('detail API contentId', contentId);
  return axios.get(
    `/detail/${contentTypeId}/${contentId}`
    // `${
    //   contentId
    //     ? `/detail/${contentTypeId}/${contentId}`
    //     : `/detail/${contentTypeId}/solo`
    // }`
  );
}

function* detailResultSaga(action: ReturnType<typeof detailAsync.request>) {
  try {
    const result: DetailResponse = yield call(detailAPI, action.payload);
    // console.log('detail saga', result.data);
    yield put(detailAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield put(detailAsync.failure(e as AxiosError));
  }
}

export function* watchDetailResult() {
  yield takeLatest(detailAsync.request, detailResultSaga);
}

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
    console.log('all saga result ', result);
    yield put(regionAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield put(regionAsync.failure(e as AxiosError));
  }
}

export function* watchRegionDetail() {
  yield takeLatest(regionAsync.request, regionDetailSaga);
}

function allAPI() {
  return axios.get('/detail/all');
}

function* allDataSaga() {
  try {
    const result: AllResponse = yield call(allAPI);
    console.log('alldata saga result', result);
    yield put(allAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield put(allAsync.failure(e as AxiosError));
  }
}

export function* watchAllData() {
  yield takeLatest(allAsync.request, allDataSaga);
}

export default function* detailSaga() {
  yield all([
    fork(watchSearchDetail),
    fork(watchDetailResult),
    fork(watchRegionDetail),
    fork(watchAllData),
  ]);
}
