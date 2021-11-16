import { ActionType } from 'typesafe-actions';
import * as action from './action';

export type DetailState = {
  searchResult: SearchResult;
};

export type SearchPayload = {
  search: string;
  pageNo: number;
};

export type SearchResult = {
  loading: boolean;
  error: Error | null;
  data: SearchData;
};

export type SearchResponse = {
  data: SearchData;
};
export type SearchProps = {
  list: SearchItem[];
};
export type SearchPropsItem = {
  item: SearchItem;
};

export type SearchData = {
  items: SearchItem[] | string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  search: string;
};

export interface SearchItem {
  addr1?: string;
  areacode: number;
  booktour: number;
  cat1: string;
  cat2: string;
  cat3?: string;
  contentid: number;
  contenttypeid: number;
  createdtime: number;
  firstimage?: string;
  firstimage2?: string;
  mapx: number;
  mapy: string;
  mlevel: number;
  modifiedtime: number;
  readcount: number;
  sigungucode: number;
  title: string;
}
export type DetailAction = ActionType<typeof action>;
