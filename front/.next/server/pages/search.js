"use strict";
(() => {
var exports = {};
exports.id = 603;
exports.ids = [603,888];
exports.modules = {

/***/ 3690:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(953);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6731);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(79);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7765);
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7674);
/* harmony import */ var _components_SortBox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7228);
/* harmony import */ var _components_TourList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(44);
/* harmony import */ var _modules_detail__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(3044);
/* harmony import */ var _modules_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4297);
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6961);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5282);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__);















const Search = () => {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
  const {
    data,
    loading
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(state => state.detail.searchResult);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  const {
    0: pageNo,
    1: setPageNo
  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(1);
  const {
    0: arrange,
    1: setArrange
  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)('Q');
  const search = String(router.query.search);
  const {
    items,
    totalCount
  } = data;
  const item = items && items.item;
  const onChange = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(page => {
    setPageNo(page);
  }, []);
  const sortHot = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    setArrange('P');
  }, []);
  const sortRecent = (0,react__WEBPACK_IMPORTED_MODULE_3__.useCallback)(() => {
    setArrange('Q');
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(() => {
    dispatch(_modules_detail__WEBPACK_IMPORTED_MODULE_9__/* .searchAsync.request */ .eE.request({
      search: search,
      pageNo: pageNo,
      arrange: arrange
    }));
  }, [search, pageNo, arrange, dispatch]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)(_styles_common__WEBPACK_IMPORTED_MODULE_6__/* .Wrapper */ .im, {
    children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_styles_common__WEBPACK_IMPORTED_MODULE_6__/* .TitleWrapper */ .$t, {
      children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_styles_common__WEBPACK_IMPORTED_MODULE_6__/* .Title */ .Dx, {
        children: search
      })
    }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_components_SortBox__WEBPACK_IMPORTED_MODULE_7__/* .default */ .Z, {
      arrange: arrange,
      sortHot: sortHot,
      sortRecent: sortRecent
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsxs)("div", {
      children: [/*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(antd__WEBPACK_IMPORTED_MODULE_0__.Spin, {
        spinning: loading,
        children: /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_components_TourList__WEBPACK_IMPORTED_MODULE_8__/* .default */ .Z, {
          list: item
        })
      }), /*#__PURE__*/react_jsx_runtime__WEBPACK_IMPORTED_MODULE_12__.jsx(_styles_common__WEBPACK_IMPORTED_MODULE_6__/* .PaginationCustom */ .Ge, {
        total: totalCount,
        showSizeChanger: false,
        defaultPageSize: 12,
        onChange: onChange,
        current: pageNo
      })]
    })]
  });
};

const getServerSideProps = _app__WEBPACK_IMPORTED_MODULE_11__.wrapper.getServerSideProps(store => async ({
  req,
  query
}) => {
  const cookie = req ? req.headers.cookie : '';

  if ((axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers)) {
    req && cookie ? (axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers.Cookie) = cookie : (axios__WEBPACK_IMPORTED_MODULE_1___default().defaults.headers.Cookie) = '';
  }

  store.dispatch(_modules_user__WEBPACK_IMPORTED_MODULE_10__/* .loadUserAsync.request */ .C_.request());
  store.dispatch(_modules_detail__WEBPACK_IMPORTED_MODULE_9__/* .searchAsync.request */ .eE.request({
    search: String(query.search),
    pageNo: 1,
    arrange: 'Q'
  }));
  store.dispatch(redux_saga__WEBPACK_IMPORTED_MODULE_5__.END);
  await store.sagaTask.toPromise();
  return {
    props: {}
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search);

/***/ }),

/***/ 2372:
/***/ ((module) => {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ 953:
/***/ ((module) => {

module.exports = require("antd");

/***/ }),

/***/ 2376:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 4584:
/***/ ((module) => {

module.exports = require("immer");

/***/ }),

/***/ 8887:
/***/ ((module) => {

module.exports = require("next-redux-saga");

/***/ }),

/***/ 2744:
/***/ ((module) => {

module.exports = require("next-redux-wrapper");

/***/ }),

/***/ 9325:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 822:
/***/ ((module) => {

module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ 6695:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 5378:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 7162:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 8773:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 2248:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 9372:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 665:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 2747:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 333:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 3456:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 556:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ 7620:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6731:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 9297:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 79:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 5282:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7561:
/***/ ((module) => {

module.exports = require("redux");

/***/ }),

/***/ 5176:
/***/ ((module) => {

module.exports = require("redux-devtools-extension");

/***/ }),

/***/ 7765:
/***/ ((module) => {

module.exports = require("redux-saga");

/***/ }),

/***/ 5060:
/***/ ((module) => {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ 9914:
/***/ ((module) => {

module.exports = require("styled-components");

/***/ }),

/***/ 9367:
/***/ ((module) => {

module.exports = require("styled-reset");

/***/ }),

/***/ 3802:
/***/ ((module) => {

module.exports = require("typesafe-actions");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,591,381,961,674,693], () => (__webpack_exec__(3690)));
module.exports = __webpack_exports__;

})();