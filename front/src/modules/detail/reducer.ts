import { createReducer } from 'typesafe-actions';
import {
  REGION_TOUR_REQUEST,
  REGION_TOUR_SUCCESS,
  REGION_TOUR_FAILURE,
  SEARCH_TOUR_REQUEST,
  SEARCH_TOUR_SUCCESS,
  SEARCH_TOUR_FAILURE,
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
};

const detail = createReducer<DetailState, DetailAction>(initialState, {
  // [REGION_TOUR_REQUEST]: (state) =>
  //   produce(state, (draft) => {
  //     draft.searchResult.error = null;
  //   }),
  // [REGION_TOUR_SUCCESS]: (state, action) =>
  //   produce(state, (draft) => {
  //     draft.searchResult.data = action.payload;
  //     draft.searchError = null;
  //   }),
  // [REGION_TOUR_FAILURE]: (state, action) =>
  //   produce(state, (draft) => {
  //     draft.searchError = action.payload;
  //   }),
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
});

export default detail;
