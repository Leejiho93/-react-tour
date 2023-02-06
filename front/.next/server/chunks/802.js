exports.id = 802;
exports.ids = [802];
exports.modules = {

/***/ 61:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ot": () => (/* binding */ ADD_COMMENT_REQUEST),
/* harmony export */   "nv": () => (/* binding */ ADD_COMMENT_SUCCESS),
/* harmony export */   "rX": () => (/* binding */ ADD_COMMENT_FAILURE),
/* harmony export */   "wg": () => (/* binding */ LOAD_COMMENT_REQUEST),
/* harmony export */   "VC": () => (/* binding */ LOAD_COMMENT_SUCCESS),
/* harmony export */   "Yz": () => (/* binding */ LOAD_COMMENT_FAILURE),
/* harmony export */   "gc": () => (/* binding */ DELETE_COMMENT_REQUEST),
/* harmony export */   "B$": () => (/* binding */ DELETE_COMMENT_SUCCESS),
/* harmony export */   "uN": () => (/* binding */ DELETE_COMMENT_FAILURE),
/* harmony export */   "Q1": () => (/* binding */ MODIFY_COMMENT_REQUEST),
/* harmony export */   "gv": () => (/* binding */ MODIFY_COMMENT_SUCCESS),
/* harmony export */   "Fw": () => (/* binding */ MODIFY_COMMENT_FAILURE),
/* harmony export */   "nG": () => (/* binding */ addCommentAsync),
/* harmony export */   "Hc": () => (/* binding */ loadCommentAsync),
/* harmony export */   "E4": () => (/* binding */ deleteCommentAsync),
/* harmony export */   "ok": () => (/* binding */ modifyCommentAsync)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3802);
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typesafe_actions__WEBPACK_IMPORTED_MODULE_0__);

const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';
const LOAD_COMMENT_REQUEST = 'LOAD_COMMENT_REQUEST';
const LOAD_COMMENT_SUCCESS = 'LOAD_COMMENT_SUCCESS';
const LOAD_COMMENT_FAILURE = 'LOAD_COMMENT_FAILURE';
const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
const DELETE_COMMENT_FAILURE = 'DELETE_COMMENT_FAILURE';
const MODIFY_COMMENT_REQUEST = 'MODIFY_COMMENT_REQUEST';
const MODIFY_COMMENT_SUCCESS = 'MODIFY_COMMENT_SUCCESS';
const MODIFY_COMMENT_FAILURE = 'MODIFY_COMMENT_FAILURE';
const addCommentAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE)();
const loadCommentAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(LOAD_COMMENT_REQUEST, LOAD_COMMENT_SUCCESS, LOAD_COMMENT_FAILURE)();
const deleteCommentAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE)();
const modifyCommentAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(MODIFY_COMMENT_REQUEST, MODIFY_COMMENT_SUCCESS, MODIFY_COMMENT_FAILURE)();

/***/ }),

/***/ 2898:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "nG": () => (/* reexport */ action/* addCommentAsync */.nG),
  "ZP": () => (/* reexport */ reducer),
  "E4": () => (/* reexport */ action/* deleteCommentAsync */.E4),
  "Hc": () => (/* reexport */ action/* loadCommentAsync */.Hc),
  "ok": () => (/* reexport */ action/* modifyCommentAsync */.ok)
});

// UNUSED EXPORTS: ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE, DELETE_COMMENT_REQUEST, DELETE_COMMENT_SUCCESS, LOAD_COMMENT_FAILURE, LOAD_COMMENT_REQUEST, LOAD_COMMENT_SUCCESS, MODIFY_COMMENT_FAILURE, MODIFY_COMMENT_REQUEST, MODIFY_COMMENT_SUCCESS, watchAddComment, watchLoadComments, watchModifyComment, watchRemoveComment

// EXTERNAL MODULE: external "immer"
var external_immer_ = __webpack_require__(4584);
// EXTERNAL MODULE: ./src/modules/comment/action.ts
var action = __webpack_require__(61);
// EXTERNAL MODULE: external "typesafe-actions"
var external_typesafe_actions_ = __webpack_require__(3802);
;// CONCATENATED MODULE: ./src/modules/comment/reducer.ts



const initialState = {
  commentList: [],
  commentAdded: false,
  isAddingComment: false,
  commentError: '',
  commentEditedError: false
};
const comment = (0,external_typesafe_actions_.createReducer)(initialState, {
  [action/* ADD_COMMENT_REQUEST */.Ot]: state => (0,external_immer_.produce)(state, draft => {
    draft.isAddingComment = true;
    draft.commentError = '';
  }),
  [action/* ADD_COMMENT_SUCCESS */.nv]: (state, action) => (0,external_immer_.produce)(state, draft => {
    draft.isAddingComment = false;
    draft.commentList = action.payload;
  }),
  [action/* ADD_COMMENT_FAILURE */.rX]: (state, action) => (0,external_immer_.produce)(state, draft => {
    draft.isAddingComment = false;
    draft.commentError = action.payload;
  }),
  [action/* LOAD_COMMENT_REQUEST */.wg]: state => (0,external_immer_.produce)(state, draft => {
    draft.commentList = [];
  }),
  [action/* LOAD_COMMENT_SUCCESS */.VC]: (state, action) => (0,external_immer_.produce)(state, draft => {
    draft.commentList = action.payload;
  }),
  [action/* LOAD_COMMENT_FAILURE */.Yz]: state => (0,external_immer_.produce)(state, draft => {
    draft.commentList = [];
  }),
  [action/* DELETE_COMMENT_REQUEST */.gc]: state => (0,external_immer_.produce)(state, draft => {
    draft.commentError = '';
  }),
  [action/* DELETE_COMMENT_SUCCESS */.B$]: (state, action) => (0,external_immer_.produce)(state, draft => {
    draft.commentList = action.payload;
  }),
  [action/* DELETE_COMMENT_FAILURE */.uN]: (state, action) => (0,external_immer_.produce)(state, draft => {
    draft.commentError = action.payload;
  }),
  [action/* MODIFY_COMMENT_REQUEST */.Q1]: state => (0,external_immer_.produce)(state, draft => {
    draft.commentEditedError = false;
  }),
  [action/* MODIFY_COMMENT_SUCCESS */.gv]: (state, action) => (0,external_immer_.produce)(state, draft => {
    draft.commentList = action.payload;
    draft.commentEditedError = false;
  }),
  [action/* MODIFY_COMMENT_FAILURE */.Fw]: state => (0,external_immer_.produce)(state, draft => {
    draft.commentEditedError = true;
  })
});
/* harmony default export */ const reducer = (comment);
// EXTERNAL MODULE: ./src/modules/comment/saga.ts
var saga = __webpack_require__(6979);
;// CONCATENATED MODULE: ./src/modules/comment/index.ts





/***/ }),

/***/ 6979:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ commentSaga)
/* harmony export */ });
/* unused harmony exports watchAddComment, watchLoadComments, watchRemoveComment, watchModifyComment */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(61);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5060);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__);


 // 댓글 추가

function addCommentAPI({
  contentid,
  commentText
}) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().post(`/comment/${contentid}`, {
    content: commentText
  });
}

function* addCommentSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.call)(addCommentAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .addCommentAsync.success */ .nG.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .addCommentAsync.failure */ .nG.failure(e.response.data));
  }
}

function* watchAddComment() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__/* .addCommentAsync.request */ .nG.request, addCommentSaga);
} // 댓글 로드

function loadCommentsAPI({
  contentId
}) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/comment/${contentId}`);
}

function* loadCommentsSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.call)(loadCommentsAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .loadCommentAsync.success */ .Hc.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .loadCommentAsync.failure */ .Hc.failure(e.response.data));
  }
}

function* watchLoadComments() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__/* .loadCommentAsync.request */ .Hc.request, loadCommentsSaga);
} // 댓글 삭제

function deleteCommentAPI({
  id,
  contentid
}) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().delete(`/comment/${id}/${contentid}`);
}

function* deleteCommentSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.call)(deleteCommentAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .deleteCommentAsync.success */ .E4.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .deleteCommentAsync.failure */ .E4.failure(e.response.data));
  }
}

function* watchRemoveComment() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__/* .deleteCommentAsync.request */ .E4.request, deleteCommentSaga);
} // 댓글수정

function modifyCommentAPI({
  id,
  editComment,
  contentid
}) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().put(`/comment/${id}/${contentid}`, {
    content: editComment
  });
}

function* modifyCommentSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.call)(modifyCommentAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .modifyCommentAsync.success */ .ok.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__/* .modifyCommentAsync.failure */ .ok.failure(e.response.data));
  }
}

function* watchModifyComment() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__/* .modifyCommentAsync.request */ .ok.request, modifyCommentSaga);
}
function* commentSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchAddComment), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchLoadComments), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchRemoveComment), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchModifyComment)]);
}

/***/ }),

/***/ 8920:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zr": () => (/* binding */ REGION_TOUR_REQUEST),
/* harmony export */   "KI": () => (/* binding */ REGION_TOUR_SUCCESS),
/* harmony export */   "HD": () => (/* binding */ REGION_TOUR_FAILURE),
/* harmony export */   "r4": () => (/* binding */ SEARCH_TOUR_REQUEST),
/* harmony export */   "dS": () => (/* binding */ SEARCH_TOUR_SUCCESS),
/* harmony export */   "_b": () => (/* binding */ SEARCH_TOUR_FAILURE),
/* harmony export */   "w1": () => (/* binding */ DETAIL_TOUR_REQUEST),
/* harmony export */   "RB": () => (/* binding */ DETAIL_TOUR_SUCCESS),
/* harmony export */   "Rm": () => (/* binding */ DETAIL_TOUR_FAILURE),
/* harmony export */   "yX": () => (/* binding */ ALL_TOUR_REQUEST),
/* harmony export */   "RV": () => (/* binding */ ALL_TOUR_SUCCESS),
/* harmony export */   "yW": () => (/* binding */ ALL_TOUR_FAILURE),
/* harmony export */   "cU": () => (/* binding */ allAsync),
/* harmony export */   "eE": () => (/* binding */ searchAsync),
/* harmony export */   "TJ": () => (/* binding */ regionAsync),
/* harmony export */   "Ec": () => (/* binding */ detailAsync)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3802);
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typesafe_actions__WEBPACK_IMPORTED_MODULE_0__);

const REGION_TOUR_REQUEST = 'REGION_TOUR_REQUEST';
const REGION_TOUR_SUCCESS = 'REGION_TOUR_SUCCESS';
const REGION_TOUR_FAILURE = 'REGION_TOUR_FAILURE';
const SEARCH_TOUR_REQUEST = 'SEARCH_TOUR_REQUEST';
const SEARCH_TOUR_SUCCESS = 'SEARCH_TOUR_SUCCESS';
const SEARCH_TOUR_FAILURE = 'SEARCH_TOUR_FAILURE';
const DETAIL_TOUR_REQUEST = 'DETAIL_TOUR_REQUEST';
const DETAIL_TOUR_SUCCESS = 'DETAIL_TOUR_SUCCESS';
const DETAIL_TOUR_FAILURE = 'DETAIL_TOUR_FAILURE';
const ALL_TOUR_REQUEST = 'ALL_TOUR_REQUEST';
const ALL_TOUR_SUCCESS = 'ALL_TOUR_SUCCESS';
const ALL_TOUR_FAILURE = 'ALL_TOUR_FAILURE';
const allAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(ALL_TOUR_REQUEST, ALL_TOUR_SUCCESS, ALL_TOUR_FAILURE)();
const searchAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(SEARCH_TOUR_REQUEST, SEARCH_TOUR_SUCCESS, SEARCH_TOUR_FAILURE)();
const regionAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(REGION_TOUR_REQUEST, REGION_TOUR_SUCCESS, REGION_TOUR_FAILURE)();
const detailAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(DETAIL_TOUR_REQUEST, DETAIL_TOUR_SUCCESS, DETAIL_TOUR_FAILURE)();

/***/ }),

/***/ 3044:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "cU": () => (/* reexport */ action/* allAsync */.cU),
  "ZP": () => (/* reexport */ reducer),
  "Ec": () => (/* reexport */ action/* detailAsync */.Ec),
  "TJ": () => (/* reexport */ action/* regionAsync */.TJ),
  "eE": () => (/* reexport */ action/* searchAsync */.eE)
});

// UNUSED EXPORTS: ALL_TOUR_FAILURE, ALL_TOUR_REQUEST, ALL_TOUR_SUCCESS, DETAIL_TOUR_FAILURE, DETAIL_TOUR_REQUEST, DETAIL_TOUR_SUCCESS, REGION_TOUR_FAILURE, REGION_TOUR_REQUEST, REGION_TOUR_SUCCESS, SEARCH_TOUR_FAILURE, SEARCH_TOUR_REQUEST, SEARCH_TOUR_SUCCESS, watchAllData, watchDetailResult, watchRegionDetail, watchSearchDetail

// EXTERNAL MODULE: external "typesafe-actions"
var external_typesafe_actions_ = __webpack_require__(3802);
// EXTERNAL MODULE: ./src/modules/detail/action.ts
var action = __webpack_require__(8920);
// EXTERNAL MODULE: external "immer"
var external_immer_ = __webpack_require__(4584);
var external_immer_default = /*#__PURE__*/__webpack_require__.n(external_immer_);
;// CONCATENATED MODULE: ./src/modules/detail/reducer.ts



const initialState = {
  searchResult: {
    loading: false,
    data: {
      items: '',
      numOfRows: 10,
      pageNo: 1,
      totalCount: 0,
      search: ''
    },
    error: null
  },
  detailResult: {
    loading: false,
    data: {
      items: {
        item: null
      },
      numOfRows: 10,
      pageNo: 1,
      totalCount: 1
    },
    error: null
  },
  allData: {
    loading: false,
    data: {
      items: {
        item: [],
        festival: [],
        sleep: []
      },
      numOfRows: 10,
      pageNo: 1,
      totalCount: 1
    },
    error: null
  },
  regionResult: {
    loading: false,
    data: {
      items: {
        item: []
      },
      numOfRows: 10,
      pageNo: 1,
      totalCount: 1
    },
    error: null
  }
};
const detail = (0,external_typesafe_actions_.createReducer)(initialState, {
  [action/* SEARCH_TOUR_REQUEST */.r4]: state => external_immer_default()(state, draft => {
    draft.searchResult.loading = true;
    draft.searchResult.error = null;
    draft.searchResult.data.items = '';
  }),
  [action/* SEARCH_TOUR_SUCCESS */.dS]: (state, action) => external_immer_default()(state, draft => {
    draft.searchResult.data.items = action.payload.items;
    draft.searchResult.data.numOfRows = action.payload.numOfRows;
    draft.searchResult.data.pageNo = action.payload.pageNo;
    draft.searchResult.data.totalCount = action.payload.totalCount;
    draft.searchResult.data.search = action.payload.search;
    draft.searchResult.error = null;
    draft.searchResult.loading = false;
  }),
  [action/* SEARCH_TOUR_FAILURE */._b]: (state, action) => external_immer_default()(state, draft => {
    draft.searchResult.error = action.payload;
    draft.searchResult.loading = false;
    draft.searchResult.data.items = '';
  }),
  [action/* DETAIL_TOUR_REQUEST */.w1]: state => external_immer_default()(state, draft => {
    draft.detailResult.loading = true;
    draft.detailResult.error = null;
    draft.detailResult.data.items.item = null;
  }),
  [action/* DETAIL_TOUR_SUCCESS */.RB]: (state, action) => external_immer_default()(state, draft => {
    draft.detailResult.data.items = action.payload.items;
    draft.detailResult.data.totalCount = action.payload.totalCount;
    draft.detailResult.error = null;
    draft.detailResult.loading = false;
  }),
  [action/* DETAIL_TOUR_FAILURE */.Rm]: (state, action) => external_immer_default()(state, draft => {
    draft.detailResult.error = action.payload;
    draft.detailResult.loading = false;
    draft.detailResult.data.items.item = null;
  }),
  [action/* REGION_TOUR_REQUEST */.zr]: state => external_immer_default()(state, draft => {
    draft.regionResult.loading = true;
    draft.regionResult.error = null;
    draft.regionResult.data.items.item = [];
  }),
  [action/* REGION_TOUR_SUCCESS */.KI]: (state, action) => external_immer_default()(state, draft => {
    draft.regionResult.data.items = action.payload.items;
    draft.regionResult.data.totalCount = action.payload.totalCount;
    draft.regionResult.error = null;
    draft.regionResult.loading = false;
  }),
  [action/* REGION_TOUR_FAILURE */.HD]: (state, action) => external_immer_default()(state, draft => {
    draft.regionResult.error = action.payload;
    draft.regionResult.loading = false;
    draft.regionResult.data.items.item = [];
  }),
  [action/* ALL_TOUR_REQUEST */.yX]: state => external_immer_default()(state, draft => {
    draft.allData.loading = true;
    draft.allData.error = null;
    draft.allData.data.items.item = [];
    draft.allData.data.items.festival = [];
    draft.allData.data.items.sleep = [];
  }),
  [action/* ALL_TOUR_SUCCESS */.RV]: (state, action) => external_immer_default()(state, draft => {
    draft.allData.data = action.payload;
    draft.allData.error = null;
    draft.allData.loading = false;
  }),
  [action/* ALL_TOUR_FAILURE */.yW]: (state, action) => external_immer_default()(state, draft => {
    draft.allData.error = action.payload;
    draft.allData.loading = false;
    draft.allData.data.items.item = [];
    draft.allData.data.items.festival = [];
    draft.allData.data.items.sleep = [];
  })
});
/* harmony default export */ const reducer = (detail);
// EXTERNAL MODULE: ./src/modules/detail/saga.ts
var saga = __webpack_require__(9968);
;// CONCATENATED MODULE: ./src/modules/detail/index.ts





/***/ }),

/***/ 9968:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ detailSaga)
/* harmony export */ });
/* unused harmony exports watchAllData, watchSearchDetail, watchRegionDetail, watchDetailResult */
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8920);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5060);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);


 // 메인 화면

function allAPI() {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/detail/all');
}

function* allDataSaga() {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(allAPI);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .allAsync.success */ .cU.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .allAsync.failure */ .cU.failure(e.response.data));
  }
}

function* watchAllData() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .allAsync.request */ .cU.request, allDataSaga);
} // 검색기능

function searchAPI({
  search,
  pageNo,
  arrange
}) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get(`/detail/search`, {
    params: {
      search,
      pageNo,
      arrange
    }
  });
}

function* searchDetailSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(searchAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .searchAsync.success */ .eE.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .searchAsync.failure */ .eE.failure(e.response.data));
  }
}

function* watchSearchDetail() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .searchAsync.request */ .eE.request, searchDetailSaga);
} // 지역기반 검색

function regionAPI({
  arrange,
  areaCode,
  contentTypeId,
  pageNo,
  numOfRows
}) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/detail/region', {
    params: {
      arrange,
      areaCode,
      contentTypeId,
      pageNo,
      numOfRows
    }
  });
}

function* regionDetailSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(regionAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .regionAsync.success */ .TJ.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .regionAsync.failure */ .TJ.failure(e.response.data));
  }
}

function* watchRegionDetail() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .regionAsync.request */ .TJ.request, regionDetailSaga);
} // 상세 정보

function detailAPI({
  contentId,
  contentTypeId
}) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get(`/detail/${contentTypeId}/${contentId}`);
}

function* detailResultSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(detailAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .detailAsync.success */ .Ec.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .detailAsync.failure */ .Ec.failure(e.response.data));
  }
}

function* watchDetailResult() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .detailAsync.request */ .Ec.request, detailResultSaga);
}
function* detailSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchSearchDetail), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchDetailResult), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchRegionDetail), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchAllData)]);
}

/***/ }),

/***/ 6802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app),
  "wrapper": () => (/* binding */ wrapper)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "next-redux-wrapper"
var external_next_redux_wrapper_ = __webpack_require__(2744);
// EXTERNAL MODULE: external "redux"
var external_redux_ = __webpack_require__(7561);
// EXTERNAL MODULE: external "redux-saga/effects"
var effects_ = __webpack_require__(5060);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 1 modules
var user = __webpack_require__(4297);
// EXTERNAL MODULE: ./src/modules/detail/index.ts + 1 modules
var detail = __webpack_require__(3044);
// EXTERNAL MODULE: ./src/modules/comment/index.ts + 1 modules
var comment = __webpack_require__(2898);
// EXTERNAL MODULE: ./src/modules/user/saga.ts
var saga = __webpack_require__(7792);
// EXTERNAL MODULE: ./src/modules/detail/saga.ts
var detail_saga = __webpack_require__(9968);
// EXTERNAL MODULE: ./src/modules/comment/saga.ts
var comment_saga = __webpack_require__(6979);
;// CONCATENATED MODULE: ./src/modules/index.ts
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const backUrl =  true ? // ? 'http://api.nicetravel.kr'
'http://localhost:80' : 0;
(external_axios_default()).defaults.baseURL = `${backUrl}/api`;
(external_axios_default()).defaults.withCredentials = true;

const rootReducer = (state, action) => {
  if (action.type === external_next_redux_wrapper_.HYDRATE) {
    return _objectSpread(_objectSpread({}, state), action.payload);
  } else {
    return (0,external_redux_.combineReducers)({
      user: user/* default */.ZP,
      detail: detail/* default */.ZP,
      comment: comment/* default */.ZP
    })(state, action);
  }
};

/* harmony default export */ const modules = (rootReducer);
function* rootSaga() {
  yield (0,effects_.all)([(0,effects_.call)(saga/* default */.ZP), (0,effects_.call)(detail_saga/* default */.ZP), (0,effects_.call)(comment_saga/* default */.ZP)]);
}
// EXTERNAL MODULE: external "next-redux-saga"
var external_next_redux_saga_ = __webpack_require__(8887);
var external_next_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_next_redux_saga_);
// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__(7765);
var external_redux_saga_default = /*#__PURE__*/__webpack_require__.n(external_redux_saga_);
// EXTERNAL MODULE: external "redux-devtools-extension"
var external_redux_devtools_extension_ = __webpack_require__(5176);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
;// CONCATENATED MODULE: ./styles/theme.ts
const size = {
  pc: '1300px',
  laptop: '1024px',
  tablet: '768px',
  mobileL: '500px',
  mobileM: '425px',
  mobileS: '375px'
};
const theme = {
  window: {
    pc: `@media screen and (max-width: ${size.pc})`,
    laptop: `@media screen and (max-width: ${size.laptop})`,
    tablet: `@media screen and (max-width: ${size.tablet})`,
    mobileL: `@media screen and (max-width: ${size.mobileL})`,
    mobileM: `@media screen and (max-width: ${size.mobileM})`,
    mobileS: `@media screen and (max-width: ${size.mobileS})`
  }
};
/* harmony default export */ const styles_theme = (theme);
// EXTERNAL MODULE: external "styled-reset"
var external_styled_reset_ = __webpack_require__(9367);
var external_styled_reset_default = /*#__PURE__*/__webpack_require__.n(external_styled_reset_);
;// CONCATENATED MODULE: ./styles/fontFace.ts

const fontFace = `
  ${(external_styled_reset_default())}
  @font-face {
    font-display: swap;
    font-family: "BMeuljiro";
    font-weight: 900;
    src: url("/fonts/BMEULJIRO.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "BMJUA";
    font-weight: 600;
    src: url("/fonts/BMJUA.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "BMHANNA";
    font-weight: 600;
    src: url("/fonts/BMHANNA_11yrs.woff") format("woff");
  }
  @font-face {
    font-display: swap;
    font-family: "BMHANNAAir";
    src: url("/fonts/BMHANNAAir.woff") format("woff");
  }
`;
/* harmony default export */ const styles_fontFace = (fontFace);
// EXTERNAL MODULE: external "next/head"
var head_ = __webpack_require__(701);
var head_default = /*#__PURE__*/__webpack_require__.n(head_);
// EXTERNAL MODULE: ./node_modules/antd/dist/antd.css
var antd = __webpack_require__(4722);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/pages/_app.tsx
function _app_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _app_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { _app_ownKeys(Object(source), true).forEach(function (key) { _app_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { _app_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _app_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















const Tour = ({
  Component,
  pageProps
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_styled_components_.ThemeProvider, {
      theme: styles_theme,
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)((head_default()), {
        children: [/*#__PURE__*/jsx_runtime_.jsx("style", {
          children: styles_fontFace
        }), /*#__PURE__*/jsx_runtime_.jsx("title", {
          children: "\uC5B4\uB514\uAC08\uB798"
        }), /*#__PURE__*/jsx_runtime_.jsx("meta", {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0,user-scalable=yes,viewport-fit=cover"
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(Component, _app_objectSpread({}, pageProps))]
    })
  });
};

const configureStore = () => {
  const sagaMiddleware = external_redux_saga_default()();
  const middlewares = [sagaMiddleware];
  const enhancer =  true ? (0,external_redux_.compose)((0,external_redux_.applyMiddleware)(...middlewares)) : 0;
  const store = (0,external_redux_.createStore)(modules, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = (0,external_next_redux_wrapper_.createWrapper)(configureStore);
/* harmony default export */ const _app = (wrapper.withRedux(external_next_redux_saga_default()(Tour)));

/***/ }),

/***/ 4722:
/***/ (() => {



/***/ })

};
;