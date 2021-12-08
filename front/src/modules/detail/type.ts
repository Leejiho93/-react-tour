import { ActionType } from 'typesafe-actions';
import * as action from './action';

export type DetailState = {
  searchResult: SearchResult;
  detailResult: DetailResult;
  allData: AllData;
  regionResult: RegionResult;
};

export type AllResponse = {
  data: AllData;
};

export type AllData = {
  loading: boolean;
  data: {
    items: {
      item: RegionItem[] | string;
      festival: RegionItem[] | string;
      sleep: RegionItem[] | string;
    };
    // items: RegionItem | string;

    // festival: RegionItem | string;
    // sleep: RegionItem | string;
    numOfRows: number;
    pageNo: number;
    totalCount: number;
  };
  error: Error | null;
};

// 지역기반 검색
export type RegionPayload = {
  arrange?: string;
  areaCode?: number;
  contentTypeId?: number;
  pageNo?: number;
  numOfRows?: number;
};
export type RegionResult = {
  loading: boolean;
  error: Error | null;
  data: RegionData;
};
export type RegionResponse = {
  data: RegionData;
};
export type RegionData = {
  items: RegionItem[] | string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};

export type RegionProps = {
  list: RegionItem[];
};
export type RegionPropsItem = {
  list: RegionItem;
};

export type RegionItem = {
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
};

// 검색
export type SearchPayload = {
  search: string;
  pageNo: number;
  arrange: string;
};
export type SearchResult = {
  loading: boolean;
  error: Error | null;
  data: SearchData;
};
export type SearchResponse = {
  data: SearchData;
};
export type SearchData = {
  items: SearchItem[] | string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
  search: string;
};
export type SearchProps = {
  list: SearchItem[];
};
export type SearchPropsItem = {
  list: SearchItem;
};

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

// 상세정보
export type DetailPayload = {
  contentId: number;
  contentTypeId: number;
};
export type DetailResult = {
  loading: boolean;
  error: Error | null;
  data: DetailData;
};
export type DetailResponse = {
  data: DetailData;
};
export type DetailData = {
  items: DetailItem[] | string;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
};
export type DetailPropsItem = {
  item: DetailItem;
};
export type DetailItem = {
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
  info: TourInfo[];
};

export type TourInfo = {
  contentid: number;
  contenttypeid: number;
  fldgubun?: number;
  infoname?: string;
  infotext?: string;
  serialnum?: number;
  subcontentid?: number;
  subdetailalt?: string;
  subdetailimg?: string;
  subdetailoverview?: string;
  subname?: string;
  subnum?: number;
};

// 상세정보 sub
export type TourSpotProps = {
  intro: TourSpot;
};
export type TourSpot = {
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
};

export type TourCultureProps = {
  intro: TourCulture;
};
export type TourCulture = {
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
};

export type TourEventProps = {
  intro: TourEvent;
};
export type TourEvent = {
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
};

export type TourCourseProps = {
  intro: TourCourse;
};
export type TourCourse = {
  contentId: number;
  contentTypeId: number;
  distance?: string;
  infocentertourcourse?: string;
  schedule?: string;
  taketime?: string;
  theme?: string;
};

export type TourSportsProps = {
  intro: TourSports;
};
export type TourSports = {
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
};

export type TourSleepProps = {
  intro: TourSleep;
};
export type TourSleep = {
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
};

export type TourMallProps = {
  intro: TourMall;
};
export type TourMall = {
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
};

export type TourFoodProps = {
  intro: TourFood;
};
export type TourFood = {
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
};
export type DetailAction = ActionType<typeof action>;
