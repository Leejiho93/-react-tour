exports.id = 381;
exports.ids = [381];
exports.modules = {

/***/ 7188:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pK": () => (/* binding */ SIGN_UP_REQUEST),
/* harmony export */   "I": () => (/* binding */ SIGN_UP_SUCCESS),
/* harmony export */   "bP": () => (/* binding */ SIGN_UP_FAILURE),
/* harmony export */   "uF": () => (/* binding */ LOG_IN_REQUEST),
/* harmony export */   "RZ": () => (/* binding */ LOG_IN_SUCCESS),
/* harmony export */   "yK": () => (/* binding */ LOG_IN_FAILURE),
/* harmony export */   "Xd": () => (/* binding */ LOG_OUT_REQUEST),
/* harmony export */   "kV": () => (/* binding */ LOG_OUT_SUCCESS),
/* harmony export */   "mD": () => (/* binding */ LOG_OUT_FAILURE),
/* harmony export */   "dQ": () => (/* binding */ LOAD_USER_REQUEST),
/* harmony export */   "DU": () => (/* binding */ LOAD_USER_SUCCESS),
/* harmony export */   "Ls": () => (/* binding */ LOAD_USER_FAILURE),
/* harmony export */   "uh": () => (/* binding */ SIGN_UP_RESET),
/* harmony export */   "pc": () => (/* binding */ signupAsync),
/* harmony export */   "Jz": () => (/* binding */ loginAsync),
/* harmony export */   "jB": () => (/* binding */ logoutAsync),
/* harmony export */   "C_": () => (/* binding */ loadUserAsync),
/* harmony export */   "UG": () => (/* binding */ signupReset)
/* harmony export */ });
/* harmony import */ var typesafe_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3802);
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

/***/ 4297:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "ZP": () => (/* reexport */ reducer),
  "C_": () => (/* reexport */ action/* loadUserAsync */.C_),
  "Jz": () => (/* reexport */ action/* loginAsync */.Jz),
  "jB": () => (/* reexport */ action/* logoutAsync */.jB),
  "pc": () => (/* reexport */ action/* signupAsync */.pc),
  "UG": () => (/* reexport */ action/* signupReset */.UG)
});

// UNUSED EXPORTS: LOAD_USER_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_RESET, SIGN_UP_SUCCESS, watchLoadUser, watchLogin, watchLogout, watchSignup

// EXTERNAL MODULE: external "typesafe-actions"
var external_typesafe_actions_ = __webpack_require__(3802);
// EXTERNAL MODULE: external "immer"
var external_immer_ = __webpack_require__(4584);
var external_immer_default = /*#__PURE__*/__webpack_require__.n(external_immer_);
// EXTERNAL MODULE: ./src/modules/user/action.ts
var action = __webpack_require__(7188);
;// CONCATENATED MODULE: ./src/modules/user/reducer.ts



const initialState = {
  isLoggingin: false,
  isLoggingout: false,
  loginError: '',
  isSignedup: false,
  isSigningup: false,
  signupError: '',
  me: null
};
const user = (0,external_typesafe_actions_.createReducer)(initialState, {
  [action/* SIGN_UP_REQUEST */.pK]: state => external_immer_default()(state, draft => {
    draft.isSigningup = true;
    draft.isSignedup = false;
    draft.signupError = '';
  }),
  [action/* SIGN_UP_SUCCESS */.I]: state => external_immer_default()(state, draft => {
    draft.isSigningup = false;
    draft.isSignedup = true;
  }),
  [action/* SIGN_UP_FAILURE */.bP]: (state, action) => external_immer_default()(state, draft => {
    draft.isSigningup = false;
    draft.isSignedup = false;
    draft.signupError = action.payload;
  }),
  [action/* SIGN_UP_RESET */.uh]: state => external_immer_default()(state, draft => {
    draft.isSignedup = false;
  }),
  [action/* LOG_IN_REQUEST */.uF]: state => external_immer_default()(state, draft => {
    draft.isLoggingin = true;
    draft.loginError = '';
    draft.me = null;
  }),
  [action/* LOG_IN_SUCCESS */.RZ]: (state, action) => external_immer_default()(state, draft => {
    draft.isLoggingin = false;
    draft.me = action.payload;
  }),
  [action/* LOG_IN_FAILURE */.yK]: (state, action) => external_immer_default()(state, draft => {
    draft.isLoggingin = false;
    draft.me = null;
    draft.loginError = action.payload;
  }),
  [action/* LOG_OUT_REQUEST */.Xd]: state => external_immer_default()(state, draft => {
    draft.isLoggingout = true;
  }),
  [action/* LOG_OUT_SUCCESS */.kV]: state => external_immer_default()(state, draft => {
    draft.me = null;
    draft.isLoggingout = false;
  }),
  [action/* LOG_OUT_FAILURE */.mD]: state => external_immer_default()(state, draft => {
    draft.isLoggingout = false;
  }),
  [action/* LOAD_USER_REQUEST */.dQ]: state => external_immer_default()(state, draft => {//
  }),
  [action/* LOAD_USER_SUCCESS */.DU]: (state, action) => external_immer_default()(state, draft => {
    draft.me = action.payload;
  }),
  [action/* LOAD_USER_FAILURE */.Ls]: state => external_immer_default()(state, draft => {//
  })
});
/* harmony default export */ const reducer = (user);
// EXTERNAL MODULE: ./src/modules/user/saga.ts
var saga = __webpack_require__(7792);
;// CONCATENATED MODULE: ./src/modules/user/index.ts





/***/ }),

/***/ 7792:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ZP": () => (/* binding */ userSaga)
/* harmony export */ });
/* unused harmony exports watchSignup, watchLogin, watchLogout, watchLoadUser */
/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7188);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5060);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);


 //회원가입

function signupAPI(signupData) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().post('/user/signup', signupData);
}

function* signupSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(signupAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .signupAsync.success */ .pc.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .signupAsync.failure */ .pc.failure(e.response.data));
  }
}

function* watchSignup() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .signupAsync.request */ .pc.request, signupSaga);
} // 로그인

function loginAPI(loginData) {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().post('/user/login', loginData);
}

function* loginSaga(action) {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(loginAPI, action.payload);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .loginAsync.success */ .Jz.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .loginAsync.failure */ .Jz.failure(e.response.data));
  }
}

function* watchLogin() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .loginAsync.request */ .Jz.request, loginSaga);
} // 로그아웃

function logoutAPI() {
  axios__WEBPACK_IMPORTED_MODULE_2___default().post('/user/logout', {});
}

function* logoutSaga() {
  try {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(logoutAPI);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .logoutAsync.success */ .jB.success());
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .logoutAsync.failure */ .jB.failure(e.response.data));
  }
}

function* watchLogout() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .logoutAsync.request */ .jB.request, logoutSaga);
} // 로그인 유지

function loadUserAPI() {
  return axios__WEBPACK_IMPORTED_MODULE_2___default().get(`/user/`);
}

function* loadUserSaga() {
  try {
    const result = yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.call)(loadUserAPI);
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .loadUserAsync.success */ .C_.success(result.data));
  } catch (e) {
    yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.put)(_action__WEBPACK_IMPORTED_MODULE_0__/* .loadUserAsync.failure */ .C_.failure(e.response.data));
  }
}

function* watchLoadUser() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.takeLatest)(_action__WEBPACK_IMPORTED_MODULE_0__/* .loadUserAsync.request */ .C_.request, loadUserSaga);
}
function* userSaga() {
  yield (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.all)([(0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchSignup), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchLogin), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchLogout), (0,redux_saga_effects__WEBPACK_IMPORTED_MODULE_1__.fork)(watchLoadUser)]);
}

/***/ }),

/***/ 2554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useInput(initialValue) {
  const {
    0: value,
    1: setValue
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  const onChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    setValue(e.target.value);
  }, []);
  return [value, onChange, setValue];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useInput);

/***/ }),

/***/ 2431:
/***/ (() => {

/* (ignored) */

/***/ })

};
;