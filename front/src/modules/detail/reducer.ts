import { createReducer } from 'typesafe-actions';
import {
  REGION_TOUR_REQUEST,
  REGION_TOUR_SUCCESS,
  REGION_TOUR_FAILURE,
  SEARCH_TOUR_REQUEST,
  SEARCH_TOUR_SUCCESS,
  SEARCH_TOUR_FAILURE,
  DETAIL_TOUR_REQUEST,
  DETAIL_TOUR_SUCCESS,
  DETAIL_TOUR_FAILURE,
  ALL_TOUR_REQUEST,
  ALL_TOUR_SUCCESS,
  ALL_TOUR_FAILURE,
} from './action';
import produce from 'immer';
import { DetailAction, DetailState } from './type';

const initialState: DetailState = {
  searchResult: {
    loading: false,
    data: {
      items: '',
      numOfRows: 10,
      pageNo: 1,
      totalCount: 0,
      search: '',
    },
    error: null,
  },
  detailResult: {
    loading: false,
    data: {
      items: '',
      numOfRows: 10,
      pageNo: 1,
      totalCount: 1,
    },
    error: null,
  },
  allData: {
    loading: false,
    data: {
      items: {
        item: '',
        festival: '',
        sleep: '',
      },
      // festival: '',
      // sleep: '',
      numOfRows: 10,
      pageNo: 1,
      totalCount: 1,
    },
    error: null,
  },
  regionResult: {
    loading: false,
    data: {
      items: '',
      numOfRows: 10,
      pageNo: 1,
      totalCount: 1,
    },
    error: null,
  },
};

const detail = createReducer<DetailState, DetailAction>(initialState, {
  [SEARCH_TOUR_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.searchResult.loading = true;
      draft.searchResult.error = null;
      draft.searchResult.data.items = '';
    }),
  [SEARCH_TOUR_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.searchResult.data.items = action.payload.items;
      draft.searchResult.data.numOfRows = action.payload.numOfRows;
      draft.searchResult.data.pageNo = action.payload.pageNo;
      draft.searchResult.data.totalCount = action.payload.totalCount;
      draft.searchResult.data.search = action.payload.search;
      draft.searchResult.error = null;
      draft.searchResult.loading = false;
    }),
  [SEARCH_TOUR_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.searchResult.error = action.payload;
      draft.searchResult.loading = false;
      draft.searchResult.data.items = '';
    }),
  [DETAIL_TOUR_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.detailResult.loading = true;
      draft.detailResult.error = null;
      draft.detailResult.data.items = '';
    }),
  [DETAIL_TOUR_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.detailResult.data.items = action.payload.items;
      draft.detailResult.data.totalCount = action.payload.totalCount;
      draft.detailResult.error = null;
      draft.detailResult.loading = false;
    }),
  [DETAIL_TOUR_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.detailResult.error = action.payload;
      draft.detailResult.loading = false;
      draft.detailResult.data.items = '';
    }),
  [REGION_TOUR_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.regionResult.loading = true;
      draft.regionResult.error = null;
      draft.regionResult.data.items = '';
    }),
  [REGION_TOUR_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.regionResult.data.items = action.payload.items;
      draft.regionResult.data.totalCount = action.payload.totalCount;
      draft.regionResult.error = null;
      draft.regionResult.loading = false;
    }),
  [REGION_TOUR_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.regionResult.error = action.payload;
      draft.regionResult.loading = false;
      draft.regionResult.data.items = '';
    }),
  [ALL_TOUR_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.allData.loading = true;
      draft.allData.error = null;
      draft.allData.data.items.item = '';
      draft.allData.data.items.festival = '';
      draft.allData.data.items.sleep = '';
    }),
  [ALL_TOUR_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.allData.data.items = action.payload.items;
      draft.allData.error = null;
      draft.allData.loading = false;
    }),
  [ALL_TOUR_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.allData.error = action.payload;
      draft.allData.loading = false;
      draft.allData.data.items.item = '';
      draft.allData.data.items.festival = '';
      draft.allData.data.items.sleep = '';
    }),
});

export default detail;
