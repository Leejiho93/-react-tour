import { SearchResponse, SearchData, SearchPayload } from './type';
import { AxiosError } from 'axios';
import { createAsyncAction } from 'typesafe-actions';

export const REGION_TOUR_REQUEST = 'REGION_TOUR_REQUEST';
export const REGION_TOUR_SUCCESS = 'REGION_TOUR_SUCCESS';
export const REGION_TOUR_FAILURE = 'REGION_TOUR_FAILURE';

export const SEARCH_TOUR_REQUEST = 'SEARCH_TOUR_REQUEST';
export const SEARCH_TOUR_SUCCESS = 'SEARCH_TOUR_SUCCESS';
export const SEARCH_TOUR_FAILURE = 'SEARCH_TOUR_FAILURE';

export const DETAIL_TOUR_REQUEST = 'DETAIL_TOUR_REQUEST';
export const DETAIL_TOUR_SUCCESS = 'DETAIL_TOUR_SUCCESS';
export const DETAIL_TOUR_FAILURE = 'DETAIL_TOUR_FAILURE';

export const regionAsync = createAsyncAction(
  REGION_TOUR_REQUEST,
  REGION_TOUR_SUCCESS,
  REGION_TOUR_FAILURE
)<string, {}, AxiosError>();

export const searchAsync = createAsyncAction(
  SEARCH_TOUR_REQUEST,
  SEARCH_TOUR_SUCCESS,
  SEARCH_TOUR_FAILURE
)<SearchPayload, SearchData, AxiosError>();

export const detailAsync = createAsyncAction(
  DETAIL_TOUR_REQUEST,
  DETAIL_TOUR_SUCCESS,
  DETAIL_TOUR_FAILURE
)<string, SearchResponse, AxiosError>();
