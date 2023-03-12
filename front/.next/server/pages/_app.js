(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./src/modules/comment/action.ts":
/*!***************************************!*\
  !*** ./src/modules/comment/action.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ADD_COMMENT_REQUEST": () => (/* binding */ ADD_COMMENT_REQUEST),
/* harmony export */   "ADD_COMMENT_SUCCESS": () => (/* binding */ ADD_COMMENT_SUCCESS),
/* harmony export */   "ADD_COMMENT_FAILURE": () => (/* binding */ ADD_COMMENT_FAILURE),
/* harmony export */   "LOAD_COMMENT_REQUEST": () => (/* binding */ LOAD_COMMENT_REQUEST),
/* harmony export */   "LOAD_COMMENT_SUCCESS": () => (/* binding */ LOAD_COMMENT_SUCCESS),
/* harmony export */   "LOAD_COMMENT_FAILURE": () => (/* binding */ LOAD_COMMENT_FAILURE),
/* harmony export */   "DELETE_COMMENT_REQUEST": () => (/* binding */ DELETE_COMMENT_REQUEST),
/* harmony export */   "DELETE_COMMENT_SUCCESS": () => (/* binding */ DELETE_COMMENT_SUCCESS),
/* harmony export */   "DELETE_COMMENT_FAILURE": () => (/* binding */ DELETE_COMMENT_FAILURE),
/* harmony export */   "MODIFY_COMMENT_REQUEST": () => (/* binding */ MODIFY_COMMENT_REQUEST),
/* harmony export */   "MODIFY_COMMENT_SUCCESS": () => (/* binding */ MODIFY_COMMENT_SUCCESS),
/* harmony export */   "MODIFY_COMMENT_FAILURE": () => (/* binding */ MODIFY_COMMENT_FAILURE),
/* harmony export */   "addCommentAsync": () => (/* binding */ addCommentAsync),
/* harmony export */   "loadCommentAsync": () => (/* binding */ loadCommentAsync),
/* harmony export */   "deleteCommentAsync": () => (/* binding */ deleteCommentAsync),
/* harmony export */   "modifyCommentAsync": () => (/* binding */ modifyCommentAsync)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typesafe-actions */ "typesafe-actions");
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

/***/ "./src/modules/comment/index.ts":
/*!**************************************!*\
  !*** ./src/modules/comment/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _reducer__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ "./src/modules/comment/reducer.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./src/modules/comment/type.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _type__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _type__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action */ "./src/modules/comment/action.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _action__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _action__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./saga */ "./src/modules/comment/saga.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _saga__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _saga__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);





/***/ }),

/***/ "./src/modules/comment/reducer.ts":
/*!****************************************!*\
  !*** ./src/modules/comment/reducer.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action */ "./src/modules/comment/action.ts");
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! typesafe-actions */ "typesafe-actions");
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(typesafe_actions__WEBPACK_IMPORTED_MODULE_2__);



const initialState = {
  commentList: [],
  commentAdded: false,
  isAddingComment: false,
  commentError: '',
  commentEditedError: false
};
const comment = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_2__.createReducer)(initialState, {
  [_action__WEBPACK_IMPORTED_MODULE_1__.ADD_COMMENT_REQUEST]: state => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.isAddingComment = true;
    draft.commentError = '';
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.ADD_COMMENT_SUCCESS]: (state, action) => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.isAddingComment = false;
    draft.commentList = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.ADD_COMMENT_FAILURE]: (state, action) => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.isAddingComment = false;
    draft.commentError = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.LOAD_COMMENT_REQUEST]: state => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentList = [];
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.LOAD_COMMENT_SUCCESS]: (state, action) => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentList = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.LOAD_COMMENT_FAILURE]: state => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentList = [];
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.DELETE_COMMENT_REQUEST]: state => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentError = '';
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.DELETE_COMMENT_SUCCESS]: (state, action) => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentList = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.DELETE_COMMENT_FAILURE]: (state, action) => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentError = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.MODIFY_COMMENT_REQUEST]: state => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentEditedError = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.MODIFY_COMMENT_SUCCESS]: (state, action) => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentList = action.payload;
    draft.commentEditedError = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.MODIFY_COMMENT_FAILURE]: state => (0,immer__WEBPACK_IMPORTED_MODULE_0__.produce)(state, draft => {
    draft.commentEditedError = true;
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (comment);

/***/ }),

/***/ "./src/modules/comment/saga.ts":
/*!*************************************!*\
  !*** ./src/modules/comment/saga.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "watchAddComment": () => (/* binding */ watchAddComment),
/* harmony export */   "watchLoadComments": () => (/* binding */ watchLoadComments),
/* harmony export */   "watchRemoveComment": () => (/* binding */ watchRemoveComment),
/* harmony export */   "watchModifyComment": () => (/* binding */ watchModifyComment),
/* harmony export */   "default": () => (/* binding */ commentSaga)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action */ "./src/modules/comment/action.ts");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
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
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.addCommentAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.addCommentAsync.failure(e.response.data));
  }
}

function* watchAddComment() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__.addCommentAsync.request, addCommentSaga);
} // 댓글 로드

function loadCommentsAPI({
  contentId
}) {
  return axios__WEBPACK_IMPORTED_MODULE_0___default().get(`/comment/${contentId}`);
}

function* loadCommentsSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.call)(loadCommentsAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.loadCommentAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.loadCommentAsync.failure(e.response.data));
  }
}

function* watchLoadComments() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__.loadCommentAsync.request, loadCommentsSaga);
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
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.deleteCommentAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.deleteCommentAsync.failure(e.response.data));
  }
}

function* watchRemoveComment() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__.deleteCommentAsync.request, deleteCommentSaga);
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
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.modifyCommentAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.put)(_action__WEBPACK_IMPORTED_MODULE_1__.modifyCommentAsync.failure(e.response.data));
  }
}

function* watchModifyComment() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_1__.modifyCommentAsync.request, modifyCommentSaga);
}
function* commentSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchAddComment), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchLoadComments), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchRemoveComment), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_2__.fork)(watchModifyComment)]);
}

/***/ }),

/***/ "./src/modules/comment/type.ts":
/*!*************************************!*\
  !*** ./src/modules/comment/type.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/modules/detail/action.ts":
/*!**************************************!*\
  !*** ./src/modules/detail/action.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REGION_TOUR_REQUEST": () => (/* binding */ REGION_TOUR_REQUEST),
/* harmony export */   "REGION_TOUR_SUCCESS": () => (/* binding */ REGION_TOUR_SUCCESS),
/* harmony export */   "REGION_TOUR_FAILURE": () => (/* binding */ REGION_TOUR_FAILURE),
/* harmony export */   "SEARCH_TOUR_REQUEST": () => (/* binding */ SEARCH_TOUR_REQUEST),
/* harmony export */   "SEARCH_TOUR_SUCCESS": () => (/* binding */ SEARCH_TOUR_SUCCESS),
/* harmony export */   "SEARCH_TOUR_FAILURE": () => (/* binding */ SEARCH_TOUR_FAILURE),
/* harmony export */   "DETAIL_TOUR_REQUEST": () => (/* binding */ DETAIL_TOUR_REQUEST),
/* harmony export */   "DETAIL_TOUR_SUCCESS": () => (/* binding */ DETAIL_TOUR_SUCCESS),
/* harmony export */   "DETAIL_TOUR_FAILURE": () => (/* binding */ DETAIL_TOUR_FAILURE),
/* harmony export */   "ALL_TOUR_REQUEST": () => (/* binding */ ALL_TOUR_REQUEST),
/* harmony export */   "ALL_TOUR_SUCCESS": () => (/* binding */ ALL_TOUR_SUCCESS),
/* harmony export */   "ALL_TOUR_FAILURE": () => (/* binding */ ALL_TOUR_FAILURE),
/* harmony export */   "allAsync": () => (/* binding */ allAsync),
/* harmony export */   "searchAsync": () => (/* binding */ searchAsync),
/* harmony export */   "regionAsync": () => (/* binding */ regionAsync),
/* harmony export */   "detailAsync": () => (/* binding */ detailAsync)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typesafe-actions */ "typesafe-actions");
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

/***/ "./src/modules/detail/index.ts":
/*!*************************************!*\
  !*** ./src/modules/detail/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _reducer__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ "./src/modules/detail/reducer.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./src/modules/detail/type.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _type__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _type__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action */ "./src/modules/detail/action.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _action__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _action__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./saga */ "./src/modules/detail/saga.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _saga__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _saga__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);





/***/ }),

/***/ "./src/modules/detail/reducer.ts":
/*!***************************************!*\
  !*** ./src/modules/detail/reducer.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typesafe-actions */ "typesafe-actions");
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typesafe_actions__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./action */ "./src/modules/detail/action.ts");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_2__);



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
const detail = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createReducer)(initialState, {
  [_action__WEBPACK_IMPORTED_MODULE_1__.SEARCH_TOUR_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.searchResult.loading = true;
    draft.searchResult.error = null;
    draft.searchResult.data.items = '';
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.SEARCH_TOUR_SUCCESS]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.searchResult.data.items = action.payload.items;
    draft.searchResult.data.numOfRows = action.payload.numOfRows;
    draft.searchResult.data.pageNo = action.payload.pageNo;
    draft.searchResult.data.totalCount = action.payload.totalCount;
    draft.searchResult.data.search = action.payload.search;
    draft.searchResult.error = null;
    draft.searchResult.loading = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.SEARCH_TOUR_FAILURE]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.searchResult.error = action.payload;
    draft.searchResult.loading = false;
    draft.searchResult.data.items = '';
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.DETAIL_TOUR_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.detailResult.loading = true;
    draft.detailResult.error = null;
    draft.detailResult.data.items.item = null;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.DETAIL_TOUR_SUCCESS]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.detailResult.data.items = action.payload.items;
    draft.detailResult.data.totalCount = action.payload.totalCount;
    draft.detailResult.error = null;
    draft.detailResult.loading = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.DETAIL_TOUR_FAILURE]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.detailResult.error = action.payload;
    draft.detailResult.loading = false;
    draft.detailResult.data.items.item = null;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.REGION_TOUR_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.regionResult.loading = true;
    draft.regionResult.error = null;
    draft.regionResult.data.items.item = [];
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.REGION_TOUR_SUCCESS]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.regionResult.data.items = action.payload.items;
    draft.regionResult.data.totalCount = action.payload.totalCount;
    draft.regionResult.error = null;
    draft.regionResult.loading = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.REGION_TOUR_FAILURE]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.regionResult.error = action.payload;
    draft.regionResult.loading = false;
    draft.regionResult.data.items.item = [];
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.ALL_TOUR_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.allData.loading = true;
    draft.allData.error = null;
    draft.allData.data.items.item = [];
    draft.allData.data.items.festival = [];
    draft.allData.data.items.sleep = [];
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.ALL_TOUR_SUCCESS]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.allData.data = action.payload;
    draft.allData.error = null;
    draft.allData.loading = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_1__.ALL_TOUR_FAILURE]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_2___default()(state, draft => {
    draft.allData.error = action.payload;
    draft.allData.loading = false;
    draft.allData.data.items.item = [];
    draft.allData.data.items.festival = [];
    draft.allData.data.items.sleep = [];
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (detail);

/***/ }),

/***/ "./src/modules/detail/saga.ts":
/*!************************************!*\
  !*** ./src/modules/detail/saga.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "watchAllData": () => (/* binding */ watchAllData),
/* harmony export */   "watchSearchDetail": () => (/* binding */ watchSearchDetail),
/* harmony export */   "watchRegionDetail": () => (/* binding */ watchRegionDetail),
/* harmony export */   "watchDetailResult": () => (/* binding */ watchDetailResult),
/* harmony export */   "default": () => (/* binding */ detailSaga)
/* harmony export */ });
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ "./src/modules/detail/action.ts");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);


 // 메인 화면

function allAPI() {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get('/detail/all');
}

function* allDataSaga() {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(allAPI);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.allAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.allAsync.failure(e.response.data));
  }
}

function* watchAllData() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.allAsync.request, allDataSaga);
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
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.searchAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.searchAsync.failure(e.response.data));
  }
}

function* watchSearchDetail() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.searchAsync.request, searchDetailSaga);
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
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.regionAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.regionAsync.failure(e.response.data));
  }
}

function* watchRegionDetail() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.regionAsync.request, regionDetailSaga);
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
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.detailAsync.success(result.data));
  } catch (e) {
    console.error(e);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.detailAsync.failure(e.response.data));
  }
}

function* watchDetailResult() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.detailAsync.request, detailResultSaga);
}
function* detailSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchSearchDetail), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchDetailResult), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchRegionDetail), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchAllData)]);
}

/***/ }),

/***/ "./src/modules/detail/type.ts":
/*!************************************!*\
  !*** ./src/modules/detail/type.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/modules/index.ts":
/*!******************************!*\
  !*** ./src/modules/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "rootSaga": () => (/* binding */ rootSaga)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./user */ "./src/modules/user/index.ts");
/* harmony import */ var _detail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./detail */ "./src/modules/detail/index.ts");
/* harmony import */ var _comment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./comment */ "./src/modules/comment/index.ts");
/* harmony import */ var _user_saga__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user/saga */ "./src/modules/user/saga.ts");
/* harmony import */ var _detail_saga__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./detail/saga */ "./src/modules/detail/saga.ts");
/* harmony import */ var _comment_saga__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./comment/saga */ "./src/modules/comment/saga.ts");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











const backUrl =  false ? 0 : `http://localhost:8081`;
(axios__WEBPACK_IMPORTED_MODULE_0___default().defaults.baseURL) = `${backUrl}/api`;
(axios__WEBPACK_IMPORTED_MODULE_0___default().defaults.withCredentials) = true;

const rootReducer = (state, action) => {
  if (action.type === next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__.HYDRATE) {
    return _objectSpread(_objectSpread({}, state), action.payload);
  } else {
    return (0,redux__WEBPACK_IMPORTED_MODULE_2__.combineReducers)({
      user: _user__WEBPACK_IMPORTED_MODULE_4__.default,
      detail: _detail__WEBPACK_IMPORTED_MODULE_5__.default,
      comment: _comment__WEBPACK_IMPORTED_MODULE_6__.default
    })(state, action);
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rootReducer);
function* rootSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__.call)(_user_saga__WEBPACK_IMPORTED_MODULE_7__.default), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__.call)(_detail_saga__WEBPACK_IMPORTED_MODULE_8__.default), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_3__.call)(_comment_saga__WEBPACK_IMPORTED_MODULE_9__.default)]);
}

/***/ }),

/***/ "./src/modules/user/action.ts":
/*!************************************!*\
  !*** ./src/modules/user/action.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SIGN_UP_REQUEST": () => (/* binding */ SIGN_UP_REQUEST),
/* harmony export */   "SIGN_UP_SUCCESS": () => (/* binding */ SIGN_UP_SUCCESS),
/* harmony export */   "SIGN_UP_FAILURE": () => (/* binding */ SIGN_UP_FAILURE),
/* harmony export */   "LOG_IN_REQUEST": () => (/* binding */ LOG_IN_REQUEST),
/* harmony export */   "LOG_IN_SUCCESS": () => (/* binding */ LOG_IN_SUCCESS),
/* harmony export */   "LOG_IN_FAILURE": () => (/* binding */ LOG_IN_FAILURE),
/* harmony export */   "LOG_OUT_REQUEST": () => (/* binding */ LOG_OUT_REQUEST),
/* harmony export */   "LOG_OUT_SUCCESS": () => (/* binding */ LOG_OUT_SUCCESS),
/* harmony export */   "LOG_OUT_FAILURE": () => (/* binding */ LOG_OUT_FAILURE),
/* harmony export */   "LOAD_USER_REQUEST": () => (/* binding */ LOAD_USER_REQUEST),
/* harmony export */   "LOAD_USER_SUCCESS": () => (/* binding */ LOAD_USER_SUCCESS),
/* harmony export */   "LOAD_USER_FAILURE": () => (/* binding */ LOAD_USER_FAILURE),
/* harmony export */   "SIGN_UP_RESET": () => (/* binding */ SIGN_UP_RESET),
/* harmony export */   "signupAsync": () => (/* binding */ signupAsync),
/* harmony export */   "loginAsync": () => (/* binding */ loginAsync),
/* harmony export */   "logoutAsync": () => (/* binding */ logoutAsync),
/* harmony export */   "loadUserAsync": () => (/* binding */ loadUserAsync),
/* harmony export */   "signupReset": () => (/* binding */ signupReset)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typesafe-actions */ "typesafe-actions");
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typesafe_actions__WEBPACK_IMPORTED_MODULE_0__);


const {
  createStandardAction
} = typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.deprecated;
const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';
const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
const LOG_IN_FAILURE = 'LOG_IN_FAILURE';
const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';
const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';
const SIGN_UP_RESET = 'SIGN_UP_RESET';
const signupAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE)();
const loginAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE)();
const logoutAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE)();
const loadUserAsync = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createAsyncAction)(LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE)();
const signupReset = createStandardAction(SIGN_UP_RESET)();

/***/ }),

/***/ "./src/modules/user/index.ts":
/*!***********************************!*\
  !*** ./src/modules/user/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _reducer__WEBPACK_IMPORTED_MODULE_0__.default)
/* harmony export */ });
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducer */ "./src/modules/user/reducer.ts");
/* harmony import */ var _type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./type */ "./src/modules/user/type.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _type__WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _type__WEBPACK_IMPORTED_MODULE_1__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action */ "./src/modules/user/action.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _action__WEBPACK_IMPORTED_MODULE_2__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _action__WEBPACK_IMPORTED_MODULE_2__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);
/* harmony import */ var _saga__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./saga */ "./src/modules/user/saga.ts");
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in _saga__WEBPACK_IMPORTED_MODULE_3__) if(__WEBPACK_IMPORT_KEY__ !== "default") __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => _saga__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);





/***/ }),

/***/ "./src/modules/user/reducer.ts":
/*!*************************************!*\
  !*** ./src/modules/user/reducer.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! typesafe-actions */ "typesafe-actions");
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(typesafe_actions__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! immer */ "immer");
/* harmony import */ var immer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(immer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./action */ "./src/modules/user/action.ts");



const initialState = {
  isLoggingin: false,
  isLoggingout: false,
  loginError: '',
  isSignedup: false,
  isSigningup: false,
  signupError: '',
  me: null
};
const user = (0,typesafe_actions__WEBPACK_IMPORTED_MODULE_0__.createReducer)(initialState, {
  [_action__WEBPACK_IMPORTED_MODULE_2__.SIGN_UP_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isSigningup = true;
    draft.isSignedup = false;
    draft.signupError = '';
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.SIGN_UP_SUCCESS]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isSigningup = false;
    draft.isSignedup = true;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.SIGN_UP_FAILURE]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isSigningup = false;
    draft.isSignedup = false;
    draft.signupError = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.SIGN_UP_RESET]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isSignedup = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOG_IN_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isLoggingin = true;
    draft.loginError = '';
    draft.me = null;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOG_IN_SUCCESS]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isLoggingin = false;
    draft.me = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOG_IN_FAILURE]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isLoggingin = false;
    draft.me = null;
    draft.loginError = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOG_OUT_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isLoggingout = true;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOG_OUT_SUCCESS]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.me = null;
    draft.isLoggingout = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOG_OUT_FAILURE]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.isLoggingout = false;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOAD_USER_REQUEST]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {//
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOAD_USER_SUCCESS]: (state, action) => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {
    draft.me = action.payload;
  }),
  [_action__WEBPACK_IMPORTED_MODULE_2__.LOAD_USER_FAILURE]: state => immer__WEBPACK_IMPORTED_MODULE_1___default()(state, draft => {//
  })
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (user);

/***/ }),

/***/ "./src/modules/user/saga.ts":
/*!**********************************!*\
  !*** ./src/modules/user/saga.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "watchSignup": () => (/* binding */ watchSignup),
/* harmony export */   "watchLogin": () => (/* binding */ watchLogin),
/* harmony export */   "watchLogout": () => (/* binding */ watchLogout),
/* harmony export */   "watchLoadUser": () => (/* binding */ watchLoadUser),
/* harmony export */   "default": () => (/* binding */ userSaga)
/* harmony export */ });
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ "./src/modules/user/action.ts");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-saga/effects */ "redux-saga/effects");
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);


 //회원가입

function signupAPI(signupData) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().post('/user/signup', signupData);
}

function* signupSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(signupAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.signupAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.signupAsync.failure(e.response.data));
  }
}

function* watchSignup() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.signupAsync.request, signupSaga);
} // 로그인

function loginAPI(loginData) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().post('/user/login', loginData);
}

function* loginSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(loginAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.loginAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.loginAsync.failure(e.response.data));
  }
}

function* watchLogin() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.loginAsync.request, loginSaga);
} // 로그아웃

function logoutAPI() {
  axios__WEBPACK_IMPORTED_MODULE_2___default().post('/user/logout', {});
}

function* logoutSaga() {
  try {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(logoutAPI);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.logoutAsync.success());
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.logoutAsync.failure(e.response.data));
  }
}

function* watchLogout() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.logoutAsync.request, logoutSaga);
} // 로그인 유지

function loadUserAPI() {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get(`/user/`);
}

function* loadUserSaga() {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(loadUserAPI);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.loadUserAsync.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__.loadUserAsync.failure(e.response.data));
  }
}

function* watchLoadUser() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__.loadUserAsync.request, loadUserSaga);
}
function* userSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchSignup), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchLogin), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchLogout), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchLoadUser)]);
}

/***/ }),

/***/ "./src/modules/user/type.ts":
/*!**********************************!*\
  !*** ./src/modules/user/type.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);


/***/ }),

/***/ "./src/pages/_app.tsx":
/*!****************************!*\
  !*** ./src/pages/_app.tsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrapper": () => (/* binding */ wrapper),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules */ "./src/modules/index.ts");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next-redux-wrapper */ "next-redux-wrapper");
/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_redux_saga__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next-redux-saga */ "next-redux-saga");
/* harmony import */ var next_redux_saga__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_redux_saga__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux-saga */ "redux-saga");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "redux");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux-devtools-extension */ "redux-devtools-extension");
/* harmony import */ var redux_devtools_extension__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(redux_devtools_extension__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _styles_theme__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../styles/theme */ "./styles/theme.ts");
/* harmony import */ var _styles_fontFace__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/fontFace */ "./styles/fontFace.ts");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__);
var _jsxFileName = "C:\\tour\\front\\src\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















const Tour = ({
  Component,
  pageProps
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(styled_components__WEBPACK_IMPORTED_MODULE_7__.ThemeProvider, {
      theme: _styles_theme__WEBPACK_IMPORTED_MODULE_8__.default,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_10___default()), {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("style", {
          children: _styles_fontFace__WEBPACK_IMPORTED_MODULE_9__.default
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 24,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("title", {
          children: "\uC5B4\uB514\uAC08\uB798"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 25,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)("meta", {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0,user-scalable=yes,viewport-fit=cover"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 22,
      columnNumber: 7
    }, undefined)
  }, void 0, false);
};

const configureStore = () => {
  const sagaMiddleware = redux_saga__WEBPACK_IMPORTED_MODULE_4___default()();
  const middlewares = [sagaMiddleware];
  const enhancer =  false ? 0 : (0,redux__WEBPACK_IMPORTED_MODULE_5__.compose)((0,redux_devtools_extension__WEBPACK_IMPORTED_MODULE_6__.composeWithDevTools)((0,redux__WEBPACK_IMPORTED_MODULE_5__.applyMiddleware)(...middlewares)));
  const store = (0,redux__WEBPACK_IMPORTED_MODULE_5__.createStore)(_modules__WEBPACK_IMPORTED_MODULE_1__.default, enhancer);
  store.sagaTask = sagaMiddleware.run(_modules__WEBPACK_IMPORTED_MODULE_1__.rootSaga);
  return store;
};

const wrapper = (0,next_redux_wrapper__WEBPACK_IMPORTED_MODULE_2__.createWrapper)(configureStore);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (wrapper.withRedux(next_redux_saga__WEBPACK_IMPORTED_MODULE_3___default()(Tour)));

/***/ }),

/***/ "./styles/fontFace.ts":
/*!****************************!*\
  !*** ./styles/fontFace.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fontFace": () => (/* binding */ fontFace),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_reset__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-reset */ "styled-reset");
/* harmony import */ var styled_reset__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_reset__WEBPACK_IMPORTED_MODULE_0__);

const fontFace = `
  ${(styled_reset__WEBPACK_IMPORTED_MODULE_0___default())}
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (fontFace);

/***/ }),

/***/ "./styles/theme.ts":
/*!*************************!*\
  !*** ./styles/theme.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (theme);

/***/ }),

/***/ "./node_modules/antd/dist/antd.css":
/*!*****************************************!*\
  !*** ./node_modules/antd/dist/antd.css ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("axios");

/***/ }),

/***/ "immer":
/*!************************!*\
  !*** external "immer" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("immer");

/***/ }),

/***/ "next-redux-saga":
/*!**********************************!*\
  !*** external "next-redux-saga" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-redux-saga");

/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next-redux-wrapper");

/***/ }),

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-devtools-extension");

/***/ }),

/***/ "redux-saga":
/*!*****************************!*\
  !*** external "redux-saga" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-saga");

/***/ }),

/***/ "redux-saga/effects":
/*!*************************************!*\
  !*** external "redux-saga/effects" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("redux-saga/effects");

/***/ }),

/***/ "styled-components":
/*!************************************!*\
  !*** external "styled-components" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-components");

/***/ }),

/***/ "styled-reset":
/*!*******************************!*\
  !*** external "styled-reset" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("styled-reset");

/***/ }),

/***/ "typesafe-actions":
/*!***********************************!*\
  !*** external "typesafe-actions" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("typesafe-actions");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L2FjdGlvbi50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2NvbW1lbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L3NhZ2EudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvYWN0aW9uLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvZGV0YWlsL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvZGV0YWlsL3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvc2FnYS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy91c2VyL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9yZWR1Y2VyLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9zYWdhLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3R5bGVzL2ZvbnRGYWNlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3R5bGVzL3RoZW1lLnRzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL2FudGQvZGlzdC9hbnRkLmNzcyIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJpbW1lclwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC1yZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0LXJlZHV4LXdyYXBwZXJcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwic3R5bGVkLXJlc2V0XCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJ0eXBlc2FmZS1hY3Rpb25zXCIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBZGRDb21tZW50UGF5bG9hZCxcclxuICBDb21tZW50RGF0YSxcclxuICBMb2FkQ29tbWVudFBheWxvYWQsXHJcbiAgTW9kaWZ5Q29tbWVudFBheWxvYWQsXHJcbn0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgY3JlYXRlQXN5bmNBY3Rpb24gfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuaW1wb3J0IHsgRGVsZXRlQ29tbWVudFBheWxvYWQgfSBmcm9tICcuJztcclxuZXhwb3J0IGNvbnN0IEFERF9DT01NRU5UX1JFUVVFU1QgPSAnQUREX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVF9TVUNDRVNTID0gJ0FERF9DT01NRU5UX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgQUREX0NPTU1FTlRfRkFJTFVSRSA9ICdBRERfQ09NTUVOVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTU1FTlRfUkVRVUVTVCA9ICdMT0FEX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTU1FTlRfU1VDQ0VTUyA9ICdMT0FEX0NPTU1FTlRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTU1FTlRfRkFJTFVSRSA9ICdMT0FEX0NPTU1FTlRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgREVMRVRFX0NPTU1FTlRfUkVRVUVTVCA9ICdERUxFVEVfQ09NTUVOVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IERFTEVURV9DT01NRU5UX1NVQ0NFU1MgPSAnREVMRVRFX0NPTU1FTlRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBERUxFVEVfQ09NTUVOVF9GQUlMVVJFID0gJ0RFTEVURV9DT01NRU5UX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1PRElGWV9DT01NRU5UX1JFUVVFU1QgPSAnTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBNT0RJRllfQ09NTUVOVF9TVUNDRVNTID0gJ01PRElGWV9DT01NRU5UX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTU9ESUZZX0NPTU1FTlRfRkFJTFVSRSA9ICdNT0RJRllfQ09NTUVOVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBBRERfQ09NTUVOVF9SRVFVRVNULFxyXG4gIEFERF9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgQUREX0NPTU1FTlRfRkFJTFVSRVxyXG4pPEFkZENvbW1lbnRQYXlsb2FkLCBDb21tZW50RGF0YVtdLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBMT0FEX0NPTU1FTlRfUkVRVUVTVCxcclxuICBMT0FEX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBMT0FEX0NPTU1FTlRfRkFJTFVSRVxyXG4pPExvYWRDb21tZW50UGF5bG9hZCwgQ29tbWVudERhdGFbXSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBERUxFVEVfQ09NTUVOVF9SRVFVRVNULFxyXG4gIERFTEVURV9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgREVMRVRFX0NPTU1FTlRfRkFJTFVSRVxyXG4pPERlbGV0ZUNvbW1lbnRQYXlsb2FkLCBDb21tZW50RGF0YVtdLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGlmeUNvbW1lbnRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIE1PRElGWV9DT01NRU5UX1JFUVVFU1QsXHJcbiAgTU9ESUZZX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBNT0RJRllfQ09NTUVOVF9GQUlMVVJFXHJcbik8TW9kaWZ5Q29tbWVudFBheWxvYWQsIENvbW1lbnREYXRhW10sIEF4aW9zRXJyb3I+KCk7XHJcbiIsImV4cG9ydCB7IGRlZmF1bHQgfSBmcm9tICcuL3JlZHVjZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3R5cGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FjdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FnYSc7XHJcbiIsImltcG9ydCB7IENvbW1lbnRTdGF0ZSB9IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IHByb2R1Y2UgfSBmcm9tICdpbW1lcic7XHJcbmltcG9ydCB7XHJcbiAgQUREX0NPTU1FTlRfUkVRVUVTVCxcclxuICBBRERfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIEFERF9DT01NRU5UX0ZBSUxVUkUsXHJcbiAgTE9BRF9DT01NRU5UX1JFUVVFU1QsXHJcbiAgTE9BRF9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgTE9BRF9DT01NRU5UX0ZBSUxVUkUsXHJcbiAgREVMRVRFX0NPTU1FTlRfUkVRVUVTVCxcclxuICBERUxFVEVfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIERFTEVURV9DT01NRU5UX0ZBSUxVUkUsXHJcbiAgTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCxcclxuICBNT0RJRllfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIE1PRElGWV9DT01NRU5UX0ZBSUxVUkUsXHJcbn0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmNvbnN0IGluaXRpYWxTdGF0ZTogQ29tbWVudFN0YXRlID0ge1xyXG4gIGNvbW1lbnRMaXN0OiBbXSxcclxuICBjb21tZW50QWRkZWQ6IGZhbHNlLFxyXG4gIGlzQWRkaW5nQ29tbWVudDogZmFsc2UsXHJcbiAgY29tbWVudEVycm9yOiAnJyxcclxuICBjb21tZW50RWRpdGVkRXJyb3I6IGZhbHNlLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgSUNvbW1lbnRSZWR1Y2VyU3RhdGUgPSB0eXBlb2YgaW5pdGlhbFN0YXRlO1xyXG5cclxuY29uc3QgY29tbWVudCA9IGNyZWF0ZVJlZHVjZXIoaW5pdGlhbFN0YXRlLCB7XHJcbiAgW0FERF9DT01NRU5UX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNBZGRpbmdDb21tZW50ID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuY29tbWVudEVycm9yID0gJyc7XHJcbiAgICB9KSxcclxuICBbQUREX0NPTU1FTlRfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzQWRkaW5nQ29tbWVudCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0FERF9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0FkZGluZ0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuY29tbWVudEVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9BRF9DT01NRU5UX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBbXTtcclxuICAgIH0pLFxyXG4gIFtMT0FEX0NPTU1FTlRfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9BRF9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBbXTtcclxuICAgIH0pLFxyXG4gIFtERUxFVEVfQ09NTUVOVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFcnJvciA9ICcnO1xyXG4gICAgfSksXHJcbiAgW0RFTEVURV9DT01NRU5UX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0RFTEVURV9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50RXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtNT0RJRllfQ09NTUVOVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFZGl0ZWRFcnJvciA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW01PRElGWV9DT01NRU5UX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5jb21tZW50RWRpdGVkRXJyb3IgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtNT0RJRllfQ09NTUVOVF9GQUlMVVJFXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFZGl0ZWRFcnJvciA9IHRydWU7XHJcbiAgICB9KSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tZW50O1xyXG4iLCJpbXBvcnQge1xyXG4gIExvYWRDb21tZW50UGF5bG9hZCxcclxuICBMb2FkQ29tbWVudFJlc3BvbnNlLFxyXG4gIEFkZENvbW1lbnRQYXlsb2FkLFxyXG4gIERlbGV0ZUNvbW1lbnRQYXlsb2FkLFxyXG4gIE1vZGlmeUNvbW1lbnRQYXlsb2FkLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7XHJcbiAgYWRkQ29tbWVudEFzeW5jLFxyXG4gIGxvYWRDb21tZW50QXN5bmMsXHJcbiAgZGVsZXRlQ29tbWVudEFzeW5jLFxyXG4gIG1vZGlmeUNvbW1lbnRBc3luYyxcclxufSBmcm9tICcuL2FjdGlvbic7XHJcbmltcG9ydCB7IHRha2VMYXRlc3QsIHB1dCwgY2FsbCwgZm9yaywgYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuXHJcbi8vIOuMk+q4gCDstpTqsIBcclxuZnVuY3Rpb24gYWRkQ29tbWVudEFQSSh7IGNvbnRlbnRpZCwgY29tbWVudFRleHQgfTogQWRkQ29tbWVudFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MucG9zdChgL2NvbW1lbnQvJHtjb250ZW50aWR9YCwgeyBjb250ZW50OiBjb21tZW50VGV4dCB9KTtcclxufVxyXG5mdW5jdGlvbiogYWRkQ29tbWVudFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBhZGRDb21tZW50QXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2FkQ29tbWVudFJlc3BvbnNlID0geWllbGQgY2FsbChcclxuICAgICAgYWRkQ29tbWVudEFQSSxcclxuICAgICAgYWN0aW9uLnBheWxvYWRcclxuICAgICk7XHJcbiAgICB5aWVsZCBwdXQoYWRkQ29tbWVudEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChhZGRDb21tZW50QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaEFkZENvbW1lbnQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChhZGRDb21tZW50QXN5bmMucmVxdWVzdCwgYWRkQ29tbWVudFNhZ2EpO1xyXG59XHJcblxyXG4vLyDrjJPquIAg66Gc65OcXHJcbmZ1bmN0aW9uIGxvYWRDb21tZW50c0FQSSh7IGNvbnRlbnRJZCB9OiBMb2FkQ29tbWVudFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KGAvY29tbWVudC8ke2NvbnRlbnRJZH1gKTtcclxufVxyXG5mdW5jdGlvbiogbG9hZENvbW1lbnRzU2FnYShcclxuICBhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIGxvYWRDb21tZW50QXN5bmMucmVxdWVzdD5cclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9hZENvbW1lbnRSZXNwb25zZSA9IHlpZWxkIGNhbGwoXHJcbiAgICAgIGxvYWRDb21tZW50c0FQSSxcclxuICAgICAgYWN0aW9uLnBheWxvYWRcclxuICAgICk7XHJcbiAgICB5aWVsZCBwdXQobG9hZENvbW1lbnRBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobG9hZENvbW1lbnRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoTG9hZENvbW1lbnRzKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobG9hZENvbW1lbnRBc3luYy5yZXF1ZXN0LCBsb2FkQ29tbWVudHNTYWdhKTtcclxufVxyXG5cclxuLy8g64yT6riAIOyCreygnFxyXG5mdW5jdGlvbiBkZWxldGVDb21tZW50QVBJKHsgaWQsIGNvbnRlbnRpZCB9OiBEZWxldGVDb21tZW50UGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5kZWxldGUoYC9jb21tZW50LyR7aWR9LyR7Y29udGVudGlkfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiogZGVsZXRlQ29tbWVudFNhZ2EoXHJcbiAgYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBkZWxldGVDb21tZW50QXN5bmMucmVxdWVzdD5cclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9hZENvbW1lbnRSZXNwb25zZSA9IHlpZWxkIGNhbGwoXHJcbiAgICAgIGRlbGV0ZUNvbW1lbnRBUEksXHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkXHJcbiAgICApO1xyXG4gICAgeWllbGQgcHV0KGRlbGV0ZUNvbW1lbnRBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQoZGVsZXRlQ29tbWVudEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoUmVtb3ZlQ29tbWVudCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGRlbGV0ZUNvbW1lbnRBc3luYy5yZXF1ZXN0LCBkZWxldGVDb21tZW50U2FnYSk7XHJcbn1cclxuXHJcbi8vIOuMk+q4gOyImOyglVxyXG5mdW5jdGlvbiBtb2RpZnlDb21tZW50QVBJKHtcclxuICBpZCxcclxuICBlZGl0Q29tbWVudCxcclxuICBjb250ZW50aWQsXHJcbn06IE1vZGlmeUNvbW1lbnRQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLnB1dChgL2NvbW1lbnQvJHtpZH0vJHtjb250ZW50aWR9YCwgeyBjb250ZW50OiBlZGl0Q29tbWVudCB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24qIG1vZGlmeUNvbW1lbnRTYWdhKFxyXG4gIGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgbW9kaWZ5Q29tbWVudEFzeW5jLnJlcXVlc3Q+XHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvYWRDb21tZW50UmVzcG9uc2UgPSB5aWVsZCBjYWxsKFxyXG4gICAgICBtb2RpZnlDb21tZW50QVBJLFxyXG4gICAgICBhY3Rpb24ucGF5bG9hZFxyXG4gICAgKTtcclxuICAgIHlpZWxkIHB1dChtb2RpZnlDb21tZW50QXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KG1vZGlmeUNvbW1lbnRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaE1vZGlmeUNvbW1lbnQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChtb2RpZnlDb21tZW50QXN5bmMucmVxdWVzdCwgbW9kaWZ5Q29tbWVudFNhZ2EpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogY29tbWVudFNhZ2EoKSB7XHJcbiAgeWllbGQgYWxsKFtcclxuICAgIGZvcmsod2F0Y2hBZGRDb21tZW50KSxcclxuICAgIGZvcmsod2F0Y2hMb2FkQ29tbWVudHMpLFxyXG4gICAgZm9yayh3YXRjaFJlbW92ZUNvbW1lbnQpLFxyXG4gICAgZm9yayh3YXRjaE1vZGlmeUNvbW1lbnQpLFxyXG4gIF0pO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGV0YWlsRGF0YSxcclxuICBTZWFyY2hEYXRhLFxyXG4gIFJlZ2lvbkRhdGEsXHJcbiAgU2VhcmNoUGF5bG9hZCxcclxuICBEZXRhaWxQYXlsb2FkLFxyXG4gIFJlZ2lvblBheWxvYWQsXHJcbiAgQWxsRGF0YSxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBjcmVhdGVBc3luY0FjdGlvbiB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFR0lPTl9UT1VSX1JFUVVFU1QgPSAnUkVHSU9OX1RPVVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBSRUdJT05fVE9VUl9TVUNDRVNTID0gJ1JFR0lPTl9UT1VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgUkVHSU9OX1RPVVJfRkFJTFVSRSA9ICdSRUdJT05fVE9VUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBTRUFSQ0hfVE9VUl9SRVFVRVNUID0gJ1NFQVJDSF9UT1VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgU0VBUkNIX1RPVVJfU1VDQ0VTUyA9ICdTRUFSQ0hfVE9VUl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFNFQVJDSF9UT1VSX0ZBSUxVUkUgPSAnU0VBUkNIX1RPVVJfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgREVUQUlMX1RPVVJfUkVRVUVTVCA9ICdERVRBSUxfVE9VUl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IERFVEFJTF9UT1VSX1NVQ0NFU1MgPSAnREVUQUlMX1RPVVJfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBERVRBSUxfVE9VUl9GQUlMVVJFID0gJ0RFVEFJTF9UT1VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFMTF9UT1VSX1JFUVVFU1QgPSAnQUxMX1RPVVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBBTExfVE9VUl9TVUNDRVNTID0gJ0FMTF9UT1VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgQUxMX1RPVVJfRkFJTFVSRSA9ICdBTExfVE9VUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBhbGxBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIEFMTF9UT1VSX1JFUVVFU1QsXHJcbiAgQUxMX1RPVVJfU1VDQ0VTUyxcclxuICBBTExfVE9VUl9GQUlMVVJFXHJcbik8dW5kZWZpbmVkLCBBbGxEYXRhLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlYXJjaEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgU0VBUkNIX1RPVVJfUkVRVUVTVCxcclxuICBTRUFSQ0hfVE9VUl9TVUNDRVNTLFxyXG4gIFNFQVJDSF9UT1VSX0ZBSUxVUkVcclxuKTxTZWFyY2hQYXlsb2FkLCBTZWFyY2hEYXRhLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lvbkFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgUkVHSU9OX1RPVVJfUkVRVUVTVCxcclxuICBSRUdJT05fVE9VUl9TVUNDRVNTLFxyXG4gIFJFR0lPTl9UT1VSX0ZBSUxVUkVcclxuKTxSZWdpb25QYXlsb2FkLCBSZWdpb25EYXRhLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRldGFpbEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgREVUQUlMX1RPVVJfUkVRVUVTVCxcclxuICBERVRBSUxfVE9VUl9TVUNDRVNTLFxyXG4gIERFVEFJTF9UT1VSX0ZBSUxVUkVcclxuKTxEZXRhaWxQYXlsb2FkLCBEZXRhaWxEYXRhLCBBeGlvc0Vycm9yPigpO1xyXG4iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi9yZWR1Y2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi90eXBlJztcclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3NhZ2EnO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgUkVHSU9OX1RPVVJfUkVRVUVTVCxcclxuICBSRUdJT05fVE9VUl9TVUNDRVNTLFxyXG4gIFJFR0lPTl9UT1VSX0ZBSUxVUkUsXHJcbiAgU0VBUkNIX1RPVVJfUkVRVUVTVCxcclxuICBTRUFSQ0hfVE9VUl9TVUNDRVNTLFxyXG4gIFNFQVJDSF9UT1VSX0ZBSUxVUkUsXHJcbiAgREVUQUlMX1RPVVJfUkVRVUVTVCxcclxuICBERVRBSUxfVE9VUl9TVUNDRVNTLFxyXG4gIERFVEFJTF9UT1VSX0ZBSUxVUkUsXHJcbiAgQUxMX1RPVVJfUkVRVUVTVCxcclxuICBBTExfVE9VUl9TVUNDRVNTLFxyXG4gIEFMTF9UT1VSX0ZBSUxVUkUsXHJcbn0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgcHJvZHVjZSBmcm9tICdpbW1lcic7XHJcbmltcG9ydCB7IERldGFpbEFjdGlvbiwgRGV0YWlsU3RhdGUgfSBmcm9tICcuL3R5cGUnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlOiBEZXRhaWxTdGF0ZSA9IHtcclxuICBzZWFyY2hSZXN1bHQ6IHtcclxuICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBpdGVtczogJycsXHJcbiAgICAgIG51bU9mUm93czogMTAsXHJcbiAgICAgIHBhZ2VObzogMSxcclxuICAgICAgdG90YWxDb3VudDogMCxcclxuICAgICAgc2VhcmNoOiAnJyxcclxuICAgIH0sXHJcbiAgICBlcnJvcjogbnVsbCxcclxuICB9LFxyXG4gIGRldGFpbFJlc3VsdDoge1xyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGl0ZW1zOiB7IGl0ZW06IG51bGwgfSxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAxLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbiAgYWxsRGF0YToge1xyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgaXRlbTogW10sXHJcbiAgICAgICAgZmVzdGl2YWw6IFtdLFxyXG4gICAgICAgIHNsZWVwOiBbXSxcclxuICAgICAgfSxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAxLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbiAgcmVnaW9uUmVzdWx0OiB7XHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXRlbXM6IHsgaXRlbTogW10gfSxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAxLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJRGV0YWlsUmVkdWNlclN0YXRlID0gdHlwZW9mIGluaXRpYWxTdGF0ZTtcclxuXHJcbmNvbnN0IGRldGFpbCA9IGNyZWF0ZVJlZHVjZXI8RGV0YWlsU3RhdGUsIERldGFpbEFjdGlvbj4oaW5pdGlhbFN0YXRlLCB7XHJcbiAgW1NFQVJDSF9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5pdGVtcyA9ICcnO1xyXG4gICAgfSksXHJcbiAgW1NFQVJDSF9UT1VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5pdGVtcyA9IGFjdGlvbi5wYXlsb2FkLml0ZW1zO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5udW1PZlJvd3MgPSBhY3Rpb24ucGF5bG9hZC5udW1PZlJvd3M7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLnBhZ2VObyA9IGFjdGlvbi5wYXlsb2FkLnBhZ2VObztcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEudG90YWxDb3VudCA9IGFjdGlvbi5wYXlsb2FkLnRvdGFsQ291bnQ7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLnNlYXJjaCA9IGFjdGlvbi5wYXlsb2FkLnNlYXJjaDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtTRUFSQ0hfVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLml0ZW1zID0gJyc7XHJcbiAgICB9KSxcclxuICBbREVUQUlMX1RPVVJfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5kYXRhLml0ZW1zLml0ZW0gPSBudWxsO1xyXG4gICAgfSksXHJcbiAgW0RFVEFJTF9UT1VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZGF0YS5pdGVtcyA9IGFjdGlvbi5wYXlsb2FkLml0ZW1zO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZGF0YS50b3RhbENvdW50ID0gYWN0aW9uLnBheWxvYWQudG90YWxDb3VudDtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtERVRBSUxfVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5kYXRhLml0ZW1zLml0ZW0gPSBudWxsO1xyXG4gICAgfSksXHJcbiAgW1JFR0lPTl9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZGF0YS5pdGVtcy5pdGVtID0gW107XHJcbiAgICB9KSxcclxuICBbUkVHSU9OX1RPVVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5kYXRhLml0ZW1zID0gYWN0aW9uLnBheWxvYWQuaXRlbXM7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5kYXRhLnRvdGFsQ291bnQgPSBhY3Rpb24ucGF5bG9hZC50b3RhbENvdW50O1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW1JFR0lPTl9UT1VSX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmRhdGEuaXRlbXMuaXRlbSA9IFtdO1xyXG4gICAgfSksXHJcbiAgW0FMTF9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5pdGVtID0gW107XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5mZXN0aXZhbCA9IFtdO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuc2xlZXAgPSBbXTtcclxuICAgIH0pLFxyXG4gIFtBTExfVE9VUl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtBTExfVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5lcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLml0ZW0gPSBbXTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLmZlc3RpdmFsID0gW107XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5zbGVlcCA9IFtdO1xyXG4gICAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGV0YWlsO1xyXG4iLCJpbXBvcnQge1xyXG4gIFNlYXJjaFJlc3BvbnNlLFxyXG4gIFNlYXJjaFBheWxvYWQsXHJcbiAgRGV0YWlsUmVzcG9uc2UsXHJcbiAgRGV0YWlsUGF5bG9hZCxcclxuICBSZWdpb25SZXNwb25zZSxcclxuICBSZWdpb25QYXlsb2FkLFxyXG4gIEFsbFJlc3BvbnNlLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IHNlYXJjaEFzeW5jLCBkZXRhaWxBc3luYywgcmVnaW9uQXN5bmMsIGFsbEFzeW5jIH0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyB0YWtlTGF0ZXN0LCBwdXQsIGNhbGwsIGFsbCwgZm9yayB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG4vLyDrqZTsnbgg7ZmU66m0XHJcbmZ1bmN0aW9uIGFsbEFQSSgpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KCcvZGV0YWlsL2FsbCcpO1xyXG59XHJcbmZ1bmN0aW9uKiBhbGxEYXRhU2FnYSgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBBbGxSZXNwb25zZSA9IHlpZWxkIGNhbGwoYWxsQVBJKTtcclxuICAgIHlpZWxkIHB1dChhbGxBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgeWllbGQgcHV0KGFsbEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hBbGxEYXRhKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QoYWxsQXN5bmMucmVxdWVzdCwgYWxsRGF0YVNhZ2EpO1xyXG59XHJcblxyXG4vLyDqsoDsg4nquLDriqVcclxuZnVuY3Rpb24gc2VhcmNoQVBJKHsgc2VhcmNoLCBwYWdlTm8sIGFycmFuZ2UgfTogU2VhcmNoUGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoYC9kZXRhaWwvc2VhcmNoYCwge1xyXG4gICAgcGFyYW1zOiB7XHJcbiAgICAgIHNlYXJjaCxcclxuICAgICAgcGFnZU5vLFxyXG4gICAgICBhcnJhbmdlLFxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiogc2VhcmNoRGV0YWlsU2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHNlYXJjaEFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogU2VhcmNoUmVzcG9uc2UgPSB5aWVsZCBjYWxsKHNlYXJjaEFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KHNlYXJjaEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB5aWVsZCBwdXQoc2VhcmNoQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaFNlYXJjaERldGFpbCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KHNlYXJjaEFzeW5jLnJlcXVlc3QsIHNlYXJjaERldGFpbFNhZ2EpO1xyXG59XHJcblxyXG4vLyDsp4Dsl63quLDrsJgg6rKA7IOJXHJcbmZ1bmN0aW9uIHJlZ2lvbkFQSSh7XHJcbiAgYXJyYW5nZSxcclxuICBhcmVhQ29kZSxcclxuICBjb250ZW50VHlwZUlkLFxyXG4gIHBhZ2VObyxcclxuICBudW1PZlJvd3MsXHJcbn06IFJlZ2lvblBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KCcvZGV0YWlsL3JlZ2lvbicsIHtcclxuICAgIHBhcmFtczoge1xyXG4gICAgICBhcnJhbmdlLFxyXG4gICAgICBhcmVhQ29kZSxcclxuICAgICAgY29udGVudFR5cGVJZCxcclxuICAgICAgcGFnZU5vLFxyXG4gICAgICBudW1PZlJvd3MsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uKiByZWdpb25EZXRhaWxTYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgcmVnaW9uQXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWdpb25SZXNwb25zZSA9IHlpZWxkIGNhbGwocmVnaW9uQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQocmVnaW9uQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIHlpZWxkIHB1dChyZWdpb25Bc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoUmVnaW9uRGV0YWlsKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QocmVnaW9uQXN5bmMucmVxdWVzdCwgcmVnaW9uRGV0YWlsU2FnYSk7XHJcbn1cclxuXHJcbi8vIOyDgeyEuCDsoJXrs7RcclxuZnVuY3Rpb24gZGV0YWlsQVBJKHsgY29udGVudElkLCBjb250ZW50VHlwZUlkIH06IERldGFpbFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KGAvZGV0YWlsLyR7Y29udGVudFR5cGVJZH0vJHtjb250ZW50SWR9YCk7XHJcbn1cclxuZnVuY3Rpb24qIGRldGFpbFJlc3VsdFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBkZXRhaWxBc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IERldGFpbFJlc3BvbnNlID0geWllbGQgY2FsbChkZXRhaWxBUEksIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIHlpZWxkIHB1dChkZXRhaWxBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgeWllbGQgcHV0KGRldGFpbEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hEZXRhaWxSZXN1bHQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChkZXRhaWxBc3luYy5yZXF1ZXN0LCBkZXRhaWxSZXN1bHRTYWdhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIGRldGFpbFNhZ2EoKSB7XHJcbiAgeWllbGQgYWxsKFtcclxuICAgIGZvcmsod2F0Y2hTZWFyY2hEZXRhaWwpLFxyXG4gICAgZm9yayh3YXRjaERldGFpbFJlc3VsdCksXHJcbiAgICBmb3JrKHdhdGNoUmVnaW9uRGV0YWlsKSxcclxuICAgIGZvcmsod2F0Y2hBbGxEYXRhKSxcclxuICBdKTtcclxufVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBIWURSQVRFIH0gZnJvbSAnbmV4dC1yZWR1eC13cmFwcGVyJztcclxuaW1wb3J0IHsgQW55QWN0aW9uLCBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IGFsbCwgY2FsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XHJcbmltcG9ydCBkZXRhaWwgZnJvbSAnLi9kZXRhaWwnO1xyXG5pbXBvcnQgY29tbWVudCBmcm9tICcuL2NvbW1lbnQnO1xyXG5pbXBvcnQgdXNlclNhZ2EgZnJvbSAnLi91c2VyL3NhZ2EnO1xyXG5pbXBvcnQgZGV0YWlsU2FnYSBmcm9tICcuL2RldGFpbC9zYWdhJztcclxuaW1wb3J0IGNvbW1lbnRTYWdhIGZyb20gJy4vY29tbWVudC9zYWdhJztcclxuaW1wb3J0IHsgSVVzZXJSZWR1Y2VyU3RhdGUgfSBmcm9tICcuL3VzZXIvcmVkdWNlcic7XHJcbmltcG9ydCB7IElDb21tZW50UmVkdWNlclN0YXRlIH0gZnJvbSAnLi9jb21tZW50L3JlZHVjZXInO1xyXG5pbXBvcnQgeyBJRGV0YWlsUmVkdWNlclN0YXRlIH0gZnJvbSAnLi9kZXRhaWwvcmVkdWNlcic7XHJcblxyXG5jb25zdCBiYWNrVXJsID1cclxuICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICA/ICdodHRwOi8vYXBpLm5pY2V0cmF2ZWwua3InXHJcbiAgICA6IGBodHRwOi8vbG9jYWxob3N0OjgwODFgO1xyXG5heGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gYCR7YmFja1VybH0vYXBpYDtcclxuYXhpb3MuZGVmYXVsdHMud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVJlZHVjZXJTdGF0ZSB7XHJcbiAgdXNlcjogSVVzZXJSZWR1Y2VyU3RhdGU7XHJcbiAgY29tbWVudDogSUNvbW1lbnRSZWR1Y2VyU3RhdGU7XHJcbiAgZGV0YWlsOiBJRGV0YWlsUmVkdWNlclN0YXRlO1xyXG59XHJcblxyXG5jb25zdCByb290UmVkdWNlciA9IChcclxuICBzdGF0ZTogSVJlZHVjZXJTdGF0ZSB8IHVuZGVmaW5lZCxcclxuICBhY3Rpb246IEFueUFjdGlvblxyXG4pOiBJUmVkdWNlclN0YXRlID0+IHtcclxuICBpZiAoYWN0aW9uLnR5cGUgPT09IEhZRFJBVEUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLnN0YXRlLFxyXG4gICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBjb21iaW5lUmVkdWNlcnMoe1xyXG4gICAgICB1c2VyLFxyXG4gICAgICBkZXRhaWwsXHJcbiAgICAgIGNvbW1lbnQsXHJcbiAgICB9KShzdGF0ZSwgYWN0aW9uKTtcclxuICB9XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBSb290U3RhdGUgPSBSZXR1cm5UeXBlPHR5cGVvZiByb290UmVkdWNlcj47XHJcblxyXG5leHBvcnQgZGVmYXVsdCByb290UmVkdWNlcjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogcm9vdFNhZ2EoKSB7XHJcbiAgeWllbGQgYWxsKFtjYWxsKHVzZXJTYWdhKSwgY2FsbChkZXRhaWxTYWdhKSwgY2FsbChjb21tZW50U2FnYSldKTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIFNpZ251cFBheWxvYWQsXHJcbiAgU2lnbnVwUmVzcG9uc2UsXHJcbiAgTG9naW5SZXNwb25zZSxcclxuICBMb2dpblBheWxvYWQsXHJcbn0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgY3JlYXRlQXN5bmNBY3Rpb24gfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuaW1wb3J0IHsgZGVwcmVjYXRlZCB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5jb25zdCB7IGNyZWF0ZVN0YW5kYXJkQWN0aW9uIH0gPSBkZXByZWNhdGVkO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNJR05fVVBfUkVRVUVTVCA9ICdTSUdOX1VQX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgU0lHTl9VUF9TVUNDRVNTID0gJ1NJR05fVVBfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBTSUdOX1VQX0ZBSUxVUkUgPSAnU0lHTl9VUF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0dfSU5fUkVRVUVTVCA9ICdMT0dfSU5fUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBMT0dfSU5fU1VDQ0VTUyA9ICdMT0dfSU5fU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBMT0dfSU5fRkFJTFVSRSA9ICdMT0dfSU5fRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9HX09VVF9SRVFVRVNUID0gJ0xPR19PVVRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBMT0dfT1VUX1NVQ0NFU1MgPSAnTE9HX09VVF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IExPR19PVVRfRkFJTFVSRSA9ICdMT0dfT1VUX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPQURfVVNFUl9SRVFVRVNUID0gJ0xPQURfVVNFUl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IExPQURfVVNFUl9TVUNDRVNTID0gJ0xPQURfVVNFUl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IExPQURfVVNFUl9GQUlMVVJFID0gJ0xPQURfVVNFUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBTSUdOX1VQX1JFU0VUID0gJ1NJR05fVVBfUkVTRVQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNpZ251cEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgU0lHTl9VUF9SRVFVRVNULFxyXG4gIFNJR05fVVBfU1VDQ0VTUyxcclxuICBTSUdOX1VQX0ZBSUxVUkVcclxuKTxTaWdudXBQYXlsb2FkLCBTaWdudXBSZXNwb25zZSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dpbkFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgTE9HX0lOX1JFUVVFU1QsXHJcbiAgTE9HX0lOX1NVQ0NFU1MsXHJcbiAgTE9HX0lOX0ZBSUxVUkVcclxuKTxMb2dpblBheWxvYWQsIExvZ2luUmVzcG9uc2UsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgbG9nb3V0QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBMT0dfT1VUX1JFUVVFU1QsXHJcbiAgTE9HX09VVF9TVUNDRVNTLFxyXG4gIExPR19PVVRfRkFJTFVSRVxyXG4pPHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRVc2VyQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBMT0FEX1VTRVJfUkVRVUVTVCxcclxuICBMT0FEX1VTRVJfU1VDQ0VTUyxcclxuICBMT0FEX1VTRVJfRkFJTFVSRVxyXG4pPHVuZGVmaW5lZCwgTG9naW5SZXNwb25zZSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBzaWdudXBSZXNldCA9IGNyZWF0ZVN0YW5kYXJkQWN0aW9uKFNJR05fVVBfUkVTRVQpKCk7XHJcbiIsImV4cG9ydCB7IGRlZmF1bHQgfSBmcm9tICcuL3JlZHVjZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3R5cGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FjdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FnYSc7XHJcbiIsImltcG9ydCB7IGNyZWF0ZVJlZHVjZXIgfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuaW1wb3J0IHsgVXNlclN0YXRlLCBVc2VyQWN0aW9uIH0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHByb2R1Y2UgZnJvbSAnaW1tZXInO1xyXG5pbXBvcnQge1xyXG4gIExPR19JTl9SRVFVRVNULFxyXG4gIExPR19JTl9TVUNDRVNTLFxyXG4gIExPR19JTl9GQUlMVVJFLFxyXG4gIFNJR05fVVBfUkVRVUVTVCxcclxuICBTSUdOX1VQX1NVQ0NFU1MsXHJcbiAgU0lHTl9VUF9GQUlMVVJFLFxyXG4gIFNJR05fVVBfUkVTRVQsXHJcbiAgTE9HX09VVF9SRVFVRVNULFxyXG4gIExPR19PVVRfU1VDQ0VTUyxcclxuICBMT0dfT1VUX0ZBSUxVUkUsXHJcbiAgTE9BRF9VU0VSX1JFUVVFU1QsXHJcbiAgTE9BRF9VU0VSX1NVQ0NFU1MsXHJcbiAgTE9BRF9VU0VSX0ZBSUxVUkUsXHJcbn0gZnJvbSAnLi9hY3Rpb24nO1xyXG5cclxuZXhwb3J0IHR5cGUgSVVzZXJSZWR1Y2VyU3RhdGUgPSB0eXBlb2YgaW5pdGlhbFN0YXRlO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlOiBVc2VyU3RhdGUgPSB7XHJcbiAgaXNMb2dnaW5naW46IGZhbHNlLFxyXG4gIGlzTG9nZ2luZ291dDogZmFsc2UsXHJcbiAgbG9naW5FcnJvcjogJycsXHJcbiAgaXNTaWduZWR1cDogZmFsc2UsXHJcbiAgaXNTaWduaW5ndXA6IGZhbHNlLFxyXG4gIHNpZ251cEVycm9yOiAnJyxcclxuICBtZTogbnVsbCxcclxufTtcclxuXHJcbmNvbnN0IHVzZXIgPSBjcmVhdGVSZWR1Y2VyPFVzZXJTdGF0ZSwgVXNlckFjdGlvbj4oaW5pdGlhbFN0YXRlLCB7XHJcbiAgW1NJR05fVVBfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25pbmd1cCA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmVkdXAgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuc2lnbnVwRXJyb3IgPSAnJztcclxuICAgIH0pLFxyXG4gIFtTSUdOX1VQX1NVQ0NFU1NdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNTaWduaW5ndXAgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuaXNTaWduZWR1cCA9IHRydWU7XHJcbiAgICB9KSxcclxuICBbU0lHTl9VUF9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNTaWduaW5ndXAgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuaXNTaWduZWR1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5zaWdudXBFcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW1NJR05fVVBfUkVTRVRdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNTaWduZWR1cCA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW0xPR19JTl9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ2luID0gdHJ1ZTtcclxuICAgICAgZHJhZnQubG9naW5FcnJvciA9ICcnO1xyXG4gICAgICBkcmFmdC5tZSA9IG51bGw7XHJcbiAgICB9KSxcclxuICBbTE9HX0lOX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdpbiA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5tZSA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0xPR19JTl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5naW4gPSBmYWxzZTtcclxuICAgICAgZHJhZnQubWUgPSBudWxsO1xyXG4gICAgICBkcmFmdC5sb2dpbkVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9HX09VVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ291dCA9IHRydWU7XHJcbiAgICB9KSxcclxuICBbTE9HX09VVF9TVUNDRVNTXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0Lm1lID0gbnVsbDtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5nb3V0ID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTE9HX09VVF9GQUlMVVJFXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ291dCA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW0xPQURfVVNFUl9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIC8vXHJcbiAgICB9KSxcclxuICBbTE9BRF9VU0VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5tZSA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0xPQURfVVNFUl9GQUlMVVJFXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIC8vXHJcbiAgICB9KSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VyO1xyXG4iLCJpbXBvcnQgeyBTaWdudXBSZXN1bHQsIExvZ2luUmVzdWx0LCBTaWdudXBQYXlsb2FkLCBMb2dpblBheWxvYWQgfSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBzaWdudXBBc3luYywgbG9naW5Bc3luYywgbG9nb3V0QXN5bmMsIGxvYWRVc2VyQXN5bmMgfSBmcm9tICcuL2FjdGlvbic7XHJcbmltcG9ydCB7IHB1dCwgdGFrZUxhdGVzdCwgY2FsbCwgYWxsLCBmb3JrIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuXHJcbi8v7ZqM7JuQ6rCA7J6FXHJcbmZ1bmN0aW9uIHNpZ251cEFQSShzaWdudXBEYXRhOiBTaWdudXBQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLnBvc3QoJy91c2VyL3NpZ251cCcsIHNpZ251cERhdGEpO1xyXG59XHJcbmZ1bmN0aW9uKiBzaWdudXBTYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2Ygc2lnbnVwQXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBTaWdudXBSZXN1bHQgPSB5aWVsZCBjYWxsKHNpZ251cEFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KHNpZ251cEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChzaWdudXBBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoU2lnbnVwKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3Qoc2lnbnVwQXN5bmMucmVxdWVzdCwgc2lnbnVwU2FnYSk7XHJcbn1cclxuXHJcbi8vIOuhnOq3uOyduFxyXG5mdW5jdGlvbiBsb2dpbkFQSShsb2dpbkRhdGE6IExvZ2luUGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5wb3N0KCcvdXNlci9sb2dpbicsIGxvZ2luRGF0YSk7XHJcbn1cclxuZnVuY3Rpb24qIGxvZ2luU2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIGxvZ2luQXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2dpblJlc3VsdCA9IHlpZWxkIGNhbGwobG9naW5BUEksIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIHlpZWxkIHB1dChsb2dpbkFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChsb2dpbkFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hMb2dpbigpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGxvZ2luQXN5bmMucmVxdWVzdCwgbG9naW5TYWdhKTtcclxufVxyXG5cclxuLy8g66Gc6re47JWE7JuDXHJcbmZ1bmN0aW9uIGxvZ291dEFQSSgpIHtcclxuICBheGlvcy5wb3N0KCcvdXNlci9sb2dvdXQnLCB7fSk7XHJcbn1cclxuZnVuY3Rpb24qIGxvZ291dFNhZ2EoKSB7XHJcbiAgdHJ5IHtcclxuICAgIHlpZWxkIGNhbGwobG9nb3V0QVBJKTtcclxuICAgIHlpZWxkIHB1dChsb2dvdXRBc3luYy5zdWNjZXNzKCkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGxvZ291dEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hMb2dvdXQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChsb2dvdXRBc3luYy5yZXF1ZXN0LCBsb2dvdXRTYWdhKTtcclxufVxyXG5cclxuLy8g66Gc6re47J24IOycoOyngFxyXG5mdW5jdGlvbiBsb2FkVXNlckFQSSgpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KGAvdXNlci9gKTtcclxufVxyXG5mdW5jdGlvbiogbG9hZFVzZXJTYWdhKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvZ2luUmVzdWx0ID0geWllbGQgY2FsbChsb2FkVXNlckFQSSk7XHJcbiAgICB5aWVsZCBwdXQobG9hZFVzZXJBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobG9hZFVzZXJBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoTG9hZFVzZXIoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChsb2FkVXNlckFzeW5jLnJlcXVlc3QsIGxvYWRVc2VyU2FnYSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiB1c2VyU2FnYSgpIHtcclxuICB5aWVsZCBhbGwoW1xyXG4gICAgZm9yayh3YXRjaFNpZ251cCksXHJcbiAgICBmb3JrKHdhdGNoTG9naW4pLFxyXG4gICAgZm9yayh3YXRjaExvZ291dCksXHJcbiAgICBmb3JrKHdhdGNoTG9hZFVzZXIpLFxyXG4gIF0pO1xyXG59XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XHJcbmltcG9ydCByZWR1Y2VyLCB7IHJvb3RTYWdhIH0gZnJvbSAnLi4vbW9kdWxlcyc7XHJcbmltcG9ydCB7IGNyZWF0ZVdyYXBwZXIgfSBmcm9tICduZXh0LXJlZHV4LXdyYXBwZXInO1xyXG5pbXBvcnQgd2l0aFJlZHV4U2FnYSBmcm9tICduZXh0LXJlZHV4LXNhZ2EnO1xyXG5pbXBvcnQgY3JlYXRlU2FnYU1pZGRsZXdhcmUsIHsgVGFzayB9IGZyb20gJ3JlZHV4LXNhZ2EnO1xyXG5pbXBvcnQgeyBhcHBseU1pZGRsZXdhcmUsIGNvbXBvc2UsIGNyZWF0ZVN0b3JlLCBTdG9yZSB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbic7XHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcbmltcG9ydCB0aGVtZSBmcm9tICcuLi8uLi9zdHlsZXMvdGhlbWUnO1xyXG5pbXBvcnQgZm9udEZhY2UgZnJvbSAnLi4vLi4vc3R5bGVzL2ZvbnRGYWNlJztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0ICdhbnRkL2Rpc3QvYW50ZC5jc3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTYWdhU3RvcmUgZXh0ZW5kcyBTdG9yZSB7XHJcbiAgc2FnYVRhc2s6IFRhc2s7XHJcbn1cclxuXHJcbmNvbnN0IFRvdXIgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxyXG4gICAgICAgIDxIZWFkPlxyXG4gICAgICAgICAgPHN0eWxlPntmb250RmFjZX08L3N0eWxlPlxyXG4gICAgICAgICAgPHRpdGxlPuyWtOuUlOqwiOuemDwvdGl0bGU+XHJcbiAgICAgICAgICA8bWV0YVxyXG4gICAgICAgICAgICBuYW1lPVwidmlld3BvcnRcIlxyXG4gICAgICAgICAgICBjb250ZW50PVwid2lkdGg9ZGV2aWNlLXdpZHRoLGluaXRpYWwtc2NhbGU9MS4wLG1pbmltdW0tc2NhbGU9MS4wLG1heGltdW0tc2NhbGU9NS4wLHVzZXItc2NhbGFibGU9eWVzLHZpZXdwb3J0LWZpdD1jb3ZlclwiXHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvSGVhZD5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBjb25maWd1cmVTdG9yZSA9ICgpID0+IHtcclxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XHJcbiAgY29uc3QgbWlkZGxld2FyZXMgPSBbc2FnYU1pZGRsZXdhcmVdO1xyXG4gIGNvbnN0IGVuaGFuY2VyID1cclxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuICAgICAgPyBjb21wb3NlKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpXHJcbiAgICAgIDogY29tcG9zZShjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpKTtcclxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIGVuaGFuY2VyKTtcclxuICAoc3RvcmUgYXMgU2FnYVN0b3JlKS5zYWdhVGFzayA9IHNhZ2FNaWRkbGV3YXJlLnJ1bihyb290U2FnYSk7XHJcbiAgcmV0dXJuIHN0b3JlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSBjcmVhdGVXcmFwcGVyKGNvbmZpZ3VyZVN0b3JlKTtcclxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlci53aXRoUmVkdXgod2l0aFJlZHV4U2FnYShUb3VyKSk7XHJcbiIsImltcG9ydCByZXNldCBmcm9tICdzdHlsZWQtcmVzZXQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGZvbnRGYWNlID0gYFxyXG4gICR7cmVzZXR9XHJcbiAgQGZvbnQtZmFjZSB7XHJcbiAgICBmb250LWRpc3BsYXk6IHN3YXA7XHJcbiAgICBmb250LWZhbWlseTogXCJCTWV1bGppcm9cIjtcclxuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUVVTEpJUk8ud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNSlVBXCI7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgc3JjOiB1cmwoXCIvZm9udHMvQk1KVUEud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNSEFOTkFcIjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUhBTk5BXzExeXJzLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcclxuICB9XHJcbiAgQGZvbnQtZmFjZSB7XHJcbiAgICBmb250LWRpc3BsYXk6IHN3YXA7XHJcbiAgICBmb250LWZhbWlseTogXCJCTUhBTk5BQWlyXCI7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUhBTk5BQWlyLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmb250RmFjZTtcclxuIiwiZXhwb3J0IGNvbnN0IHNpemUgPSB7XHJcbiAgICBwYzogJzEzMDBweCcsXHJcbiAgICBsYXB0b3A6ICcxMDI0cHgnLFxyXG4gICAgdGFibGV0OiAnNzY4cHgnLFxyXG4gICAgbW9iaWxlTDogJzUwMHB4JyxcclxuICAgIG1vYmlsZU06ICc0MjVweCcsXHJcbiAgICBtb2JpbGVTOiAnMzc1cHgnLFxyXG59O1xyXG5cclxuY29uc3QgdGhlbWUgPSB7XHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgICBwYzogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5wY30pYCxcclxuICAgICAgICBsYXB0b3A6IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUubGFwdG9wfSlgLFxyXG4gICAgICAgIHRhYmxldDogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS50YWJsZXR9KWAsXHJcbiAgICAgICAgbW9iaWxlTDogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5tb2JpbGVMfSlgLFxyXG4gICAgICAgIG1vYmlsZU06IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUubW9iaWxlTX0pYCxcclxuICAgICAgICBtb2JpbGVTOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLm1vYmlsZVN9KWAsXHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGhlbWU7XHJcbiIsIiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltbWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtcmVkdXgtc2FnYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0LXJlZHV4LXdyYXBwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLXJlc2V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVzYWZlLWFjdGlvbnNcIik7Il0sIm5hbWVzIjpbImNyZWF0ZUFzeW5jQWN0aW9uIiwiQUREX0NPTU1FTlRfUkVRVUVTVCIsIkFERF9DT01NRU5UX1NVQ0NFU1MiLCJBRERfQ09NTUVOVF9GQUlMVVJFIiwiTE9BRF9DT01NRU5UX1JFUVVFU1QiLCJMT0FEX0NPTU1FTlRfU1VDQ0VTUyIsIkxPQURfQ09NTUVOVF9GQUlMVVJFIiwiREVMRVRFX0NPTU1FTlRfUkVRVUVTVCIsIkRFTEVURV9DT01NRU5UX1NVQ0NFU1MiLCJERUxFVEVfQ09NTUVOVF9GQUlMVVJFIiwiTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCIsIk1PRElGWV9DT01NRU5UX1NVQ0NFU1MiLCJNT0RJRllfQ09NTUVOVF9GQUlMVVJFIiwiYWRkQ29tbWVudEFzeW5jIiwibG9hZENvbW1lbnRBc3luYyIsImRlbGV0ZUNvbW1lbnRBc3luYyIsIm1vZGlmeUNvbW1lbnRBc3luYyIsImRlZmF1bHQiLCJwcm9kdWNlIiwiY3JlYXRlUmVkdWNlciIsImluaXRpYWxTdGF0ZSIsImNvbW1lbnRMaXN0IiwiY29tbWVudEFkZGVkIiwiaXNBZGRpbmdDb21tZW50IiwiY29tbWVudEVycm9yIiwiY29tbWVudEVkaXRlZEVycm9yIiwiY29tbWVudCIsInN0YXRlIiwiZHJhZnQiLCJhY3Rpb24iLCJwYXlsb2FkIiwiYXhpb3MiLCJ0YWtlTGF0ZXN0IiwicHV0IiwiY2FsbCIsImZvcmsiLCJhbGwiLCJhZGRDb21tZW50QVBJIiwiY29udGVudGlkIiwiY29tbWVudFRleHQiLCJwb3N0IiwiY29udGVudCIsImFkZENvbW1lbnRTYWdhIiwicmVzdWx0Iiwic3VjY2VzcyIsImRhdGEiLCJlIiwiZmFpbHVyZSIsInJlc3BvbnNlIiwid2F0Y2hBZGRDb21tZW50IiwicmVxdWVzdCIsImxvYWRDb21tZW50c0FQSSIsImNvbnRlbnRJZCIsImdldCIsImxvYWRDb21tZW50c1NhZ2EiLCJ3YXRjaExvYWRDb21tZW50cyIsImRlbGV0ZUNvbW1lbnRBUEkiLCJpZCIsImRlbGV0ZSIsImRlbGV0ZUNvbW1lbnRTYWdhIiwid2F0Y2hSZW1vdmVDb21tZW50IiwibW9kaWZ5Q29tbWVudEFQSSIsImVkaXRDb21tZW50IiwibW9kaWZ5Q29tbWVudFNhZ2EiLCJ3YXRjaE1vZGlmeUNvbW1lbnQiLCJjb21tZW50U2FnYSIsIlJFR0lPTl9UT1VSX1JFUVVFU1QiLCJSRUdJT05fVE9VUl9TVUNDRVNTIiwiUkVHSU9OX1RPVVJfRkFJTFVSRSIsIlNFQVJDSF9UT1VSX1JFUVVFU1QiLCJTRUFSQ0hfVE9VUl9TVUNDRVNTIiwiU0VBUkNIX1RPVVJfRkFJTFVSRSIsIkRFVEFJTF9UT1VSX1JFUVVFU1QiLCJERVRBSUxfVE9VUl9TVUNDRVNTIiwiREVUQUlMX1RPVVJfRkFJTFVSRSIsIkFMTF9UT1VSX1JFUVVFU1QiLCJBTExfVE9VUl9TVUNDRVNTIiwiQUxMX1RPVVJfRkFJTFVSRSIsImFsbEFzeW5jIiwic2VhcmNoQXN5bmMiLCJyZWdpb25Bc3luYyIsImRldGFpbEFzeW5jIiwic2VhcmNoUmVzdWx0IiwibG9hZGluZyIsIml0ZW1zIiwibnVtT2ZSb3dzIiwicGFnZU5vIiwidG90YWxDb3VudCIsInNlYXJjaCIsImVycm9yIiwiZGV0YWlsUmVzdWx0IiwiaXRlbSIsImFsbERhdGEiLCJmZXN0aXZhbCIsInNsZWVwIiwicmVnaW9uUmVzdWx0IiwiZGV0YWlsIiwiYWxsQVBJIiwiYWxsRGF0YVNhZ2EiLCJjb25zb2xlIiwid2F0Y2hBbGxEYXRhIiwic2VhcmNoQVBJIiwiYXJyYW5nZSIsInBhcmFtcyIsInNlYXJjaERldGFpbFNhZ2EiLCJ3YXRjaFNlYXJjaERldGFpbCIsInJlZ2lvbkFQSSIsImFyZWFDb2RlIiwiY29udGVudFR5cGVJZCIsInJlZ2lvbkRldGFpbFNhZ2EiLCJ3YXRjaFJlZ2lvbkRldGFpbCIsImRldGFpbEFQSSIsImRldGFpbFJlc3VsdFNhZ2EiLCJ3YXRjaERldGFpbFJlc3VsdCIsImRldGFpbFNhZ2EiLCJIWURSQVRFIiwiY29tYmluZVJlZHVjZXJzIiwidXNlciIsInVzZXJTYWdhIiwiYmFja1VybCIsImRlZmF1bHRzIiwiYmFzZVVSTCIsIndpdGhDcmVkZW50aWFscyIsInJvb3RSZWR1Y2VyIiwidHlwZSIsInJvb3RTYWdhIiwiZGVwcmVjYXRlZCIsImNyZWF0ZVN0YW5kYXJkQWN0aW9uIiwiU0lHTl9VUF9SRVFVRVNUIiwiU0lHTl9VUF9TVUNDRVNTIiwiU0lHTl9VUF9GQUlMVVJFIiwiTE9HX0lOX1JFUVVFU1QiLCJMT0dfSU5fU1VDQ0VTUyIsIkxPR19JTl9GQUlMVVJFIiwiTE9HX09VVF9SRVFVRVNUIiwiTE9HX09VVF9TVUNDRVNTIiwiTE9HX09VVF9GQUlMVVJFIiwiTE9BRF9VU0VSX1JFUVVFU1QiLCJMT0FEX1VTRVJfU1VDQ0VTUyIsIkxPQURfVVNFUl9GQUlMVVJFIiwiU0lHTl9VUF9SRVNFVCIsInNpZ251cEFzeW5jIiwibG9naW5Bc3luYyIsImxvZ291dEFzeW5jIiwibG9hZFVzZXJBc3luYyIsInNpZ251cFJlc2V0IiwiaXNMb2dnaW5naW4iLCJpc0xvZ2dpbmdvdXQiLCJsb2dpbkVycm9yIiwiaXNTaWduZWR1cCIsImlzU2lnbmluZ3VwIiwic2lnbnVwRXJyb3IiLCJtZSIsInNpZ251cEFQSSIsInNpZ251cERhdGEiLCJzaWdudXBTYWdhIiwid2F0Y2hTaWdudXAiLCJsb2dpbkFQSSIsImxvZ2luRGF0YSIsImxvZ2luU2FnYSIsIndhdGNoTG9naW4iLCJsb2dvdXRBUEkiLCJsb2dvdXRTYWdhIiwid2F0Y2hMb2dvdXQiLCJsb2FkVXNlckFQSSIsImxvYWRVc2VyU2FnYSIsIndhdGNoTG9hZFVzZXIiLCJSZWFjdCIsInJlZHVjZXIiLCJjcmVhdGVXcmFwcGVyIiwid2l0aFJlZHV4U2FnYSIsImNyZWF0ZVNhZ2FNaWRkbGV3YXJlIiwiYXBwbHlNaWRkbGV3YXJlIiwiY29tcG9zZSIsImNyZWF0ZVN0b3JlIiwiY29tcG9zZVdpdGhEZXZUb29scyIsIlRoZW1lUHJvdmlkZXIiLCJ0aGVtZSIsImZvbnRGYWNlIiwiSGVhZCIsIlRvdXIiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJjb25maWd1cmVTdG9yZSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZXMiLCJlbmhhbmNlciIsInN0b3JlIiwic2FnYVRhc2siLCJydW4iLCJ3cmFwcGVyIiwid2l0aFJlZHV4IiwicmVzZXQiLCJzaXplIiwicGMiLCJsYXB0b3AiLCJ0YWJsZXQiLCJtb2JpbGVMIiwibW9iaWxlTSIsIm1vYmlsZVMiLCJ3aW5kb3ciXSwic291cmNlUm9vdCI6IiJ9