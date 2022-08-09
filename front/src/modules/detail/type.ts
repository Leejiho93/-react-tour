import { ActionType } from 'typesafe-actions';
import * as action from './action';

export interface DetailState {
  searchResult: SearchResult;
  detailResult: DetailResult;
  allData: AllResult;
  regionResult: RegionResult;
}

// 메인
export interface AllResponse {
  data: AllData;
}
export interface AllData {
  items: {
    item: RegionItem[];
    festival: RegionItem[];
    sleep: RegionItem[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}
export interface AllResult {
  loading: boolean;
  data: {
    items: {
      item: RegionItem[];
      festival: RegionItem[];
      sleep: RegionItem[];
    };
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  error: Error | null;
}

// 검색
export interface SearchPayload {
  search: string;
  pageNo: number;
  arrange: string;
}
export interface SearchResult {
  loading: boolean;
  error: Error | null;
  data: SearchData;
}
export interface SearchResponse {
  data: SearchData;
}
export interface SearchData {
  items: { item: SearchItem[] } | '';
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  search: string;
}
export interface SearchItem {
  addr1?: string;
  addr2?: string;
  areacode?: number;
  booktour?: number;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  contentid: number;
  contenttypeid: number;
  createdtime: number;
  firstimage?: string;
  firstimage2?: string;
  mapx?: number;
  mapy?: string;
  mlevel?: number;
  modifiedtime: number;
  readcount?: number;
  sigungucode?: number;
  tel?: string;
  title: string;
}

// 지역기반
export interface RegionPayload {
  arrange?: string;
  areaCode?: number;
  contentTypeId?: number;
  pageNo?: number;
  numOfRows?: number;
}
export interface RegionResult {
  loading: boolean;
  error: Error | null;
  data: RegionData;
}
export interface RegionResponse {
  data: RegionData;
}
export interface RegionData {
  items: { item: RegionItem[] };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}
export interface RegionItem {
  contentid: number;
  contenttypeid: number;
  createdtime: number;
  modifiedtime: number;
  title: string;
  addr1?: string;
  addr2?: string;
  areacode?: number;
  booktour?: number;
  cat1?: string;
  cat2?: string;
  cat3?: string;
  firstimage?: string;
  firstimage2?: string;
  mapx?: number;
  mapy?: number;
  mlevel?: number;
  readcount?: number;
  sigungucode?: number;
  zipcode?: number;
  tel?: string;
}

// 상세정보
export interface DetailPayload {
  contentId: number;
  contentTypeId: number;
}
export interface DetailResult {
  loading: boolean;
  error: Error | null;
  data: DetailData;
}
export interface DetailResponse {
  data: DetailData;
}
export interface DetailData {
  items: { item: [IDetailItem] | null };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface DetailItemprops {
  item: IDetailItem;
}
export interface IDetailItem {
  contentid: number;
  contenttypeid: number;
  homepage: string;
  mapx: number;
  mapy: number;
  addr1: string;
  addr2: string;
  firstimage: string;
  firstimage2: string;
  overview: string;
  title: string;
  intro: TourSpot &
    TourCulture &
    TourEvent &
    TourCourse &
    TourFood &
    TourSports &
    TourSleep &
    TourMall;
  tel: string;
  info: TourInfo[] | TourInfo;
}

export interface TourInfo {
  contentid: number;
  contenttypeid: number;
  fldgubun?: number;
  infoname: string;
  infotext: string;
  serialnum?: number;
  subcontentid?: number;
  subdetailalt?: string;
  subdetailimg?: string;
  subdetailoverview?: string;
  subname?: string;
  subnum?: number;
}

// 상세정보 sub

export interface TourSpot {
  contentId: number;
  contentTypeId: number;
  accomcount?: string;
  chkbabycarriage?: string;
  chkcreditcard?: string;
  chkpet?: string;
  expagerange?: string;
  expguide?: string;
  infocenter?: string;
  opendate?: string;
  parking?: string;
  restdate?: string;
  useseason?: string;
  usetime?: string;
  heritage1?: number;
  heritage2?: number;
  heritage3?: number;
}

export interface TourCulture {
  contentId: number;
  contentTypeId: number;
  accomcountculture?: number;
  chkbabycarriageculture?: string;
  chkcreditcardculture?: string;
  chkpetculture?: string;
  discountinfo?: string;
  infocenterculture?: string;
  parkingculture?: string;
  parkingfee?: string;
  restdateculture?: string;
  usefee?: string;
  usetimeculture?: string;
  scale?: string;
  spendtime?: string;
}

export interface TourEvent {
  contentId: number;
  contentTypeId: number;
  agelimit?: string;
  bookingplace?: string;
  discountinfofestival?: string;
  eventenddate?: number;
  eventhomepage?: string;
  eventplace?: string;
  eventstartdate?: number;
  festivalgrade?: string;
  placeinfo?: string;
  playtime?: string;
  program?: string;
  spendtimefestival?: string;
  sponsor1?: string;
  sponsor1tel?: string;
  sponsor2?: string;
  sponsor2tel?: string;
  subevent?: string;
  usetimefestival?: string;
}

export interface TourCourse {
  contentId: number;
  contentTypeId: number;
  distance?: string;
  infocentertourcourse?: string;
  schedule?: string;
  taketime?: string;
  theme?: string;
}

export interface TourSports {
  contentId: number;
  contentTypeId: number;
  accomcountleports?: string;
  chkbabycarriageleports?: string;
  chkcreditcardleports?: string;
  chkpetleports?: string;
  expagerangeleports?: string;
  infocenterleports?: string;
  openperiod?: string;
  parkingfeeleports?: string;
  parkingleports?: string;
  reservation?: string;
  restdateleports?: string;
  scaleleports?: string;
  usefeeleports?: string;
  usetimeleports?: string;
}

export interface TourSleep {
  contentId: number;
  contentTypeId: number;
  accomcountlodging?: string;
  benikia?: string;
  checkintime?: string;
  checkouttime?: string;
  chkcooking?: string;
  foodplace?: string;
  goodstay?: string;
  hanok?: string;
  infocenterlodging?: string;
  parkinglodging?: string;
  pickup?: string;
  roomcount?: string;
  reservationlodging?: string;
  reservationurl?: string;
  roomtype?: string;
  scalelodging?: string;
  subfacility?: string;
  barbecue?: string;
  beauty?: number;
  beverage?: number;
  bicycle?: number;
  campfire?: number;
  fitness?: number;
  karaoke?: number;
  publicbath?: number;
  publicpc?: number;
  sauna?: number;
  seminar?: number;
  sports?: number;
  refundregulation?: string;
}

export interface TourMall {
  contentId: number;
  contentTypeId: number;
  chkbabycarriageshopping?: string;
  chkcreditcardshopping?: string;
  chkpetshopping?: string;
  culturecenter?: string;
  fairday?: string;
  infocentershopping?: string;
  opendateshopping?: string;
  opentime?: string;
  parkingshopping?: string;
  restdateshopping?: string;
  restroom?: string;
  saleitem?: string;
  saleitemcost?: string;
  scaleshopping?: string;
  shopguide?: string;
}

export interface TourFood {
  contentId: number;
  contentTypeId: number;
  chkcreditcardfood?: string;
  discountinfofood?: string;
  firstmenu?: string;
  infocenterfood?: string;
  kidsfacility?: string;
  opendatefood?: string;
  opentimefood?: string;
  packing?: string;
  parkingfood?: string;
  reservationfood?: string;
  restdatefood?: string;
  scalefood?: string;
  seat?: string;
  smoking?: string;
  treatmenu?: string;
  lcnsno?: string;
}
export type DetailAction = ActionType<typeof action>;
