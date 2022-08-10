"use strict";
(() => {
var exports = {};
exports.id = 459;
exports.ids = [459];
exports.modules = {

/***/ 2642:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ login)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 1 modules
var user = __webpack_require__(4297);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
// EXTERNAL MODULE: ./src/containers/LoginForm/style.ts
var style = __webpack_require__(6817);
// EXTERNAL MODULE: ./utils/useInput.ts
var useInput = __webpack_require__(2554);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/containers/LoginForm/index.tsx











const LoginForm = () => {
  const [id, onChangeId] = (0,useInput/* default */.Z)('');
  const [password, setPassword] = external_react_.useState('');
  const [validate, setValidate] = external_react_.useState(false);
  const passwordRef = external_react_.useRef(null);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    loginError
  } = (0,external_react_redux_.useSelector)(state => state.user);

  const onChangePassword = e => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/g;
    regex.test(e.target.value) ? setValidate(true) : setValidate(false);
    setPassword(e.target.value);
  };

  const onSubmit = external_react_.useCallback(() => {
    validate ? dispatch(user/* loginAsync.request */.Jz.request({
      userId: id,
      password
    })) : passwordRef.current && passwordRef.current.focus();
  }, [id, password, validate, dispatch]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(style/* Wrapper */.im, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(style/* Title */.Dx, {
      children: "\uB85C\uADF8\uC778"
    }), loginError && /*#__PURE__*/jsx_runtime_.jsx(style/* LoginError */.Wj, {
      children: loginError
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
      autoComplete: "off",
      onFinish: onSubmit,
      children: [/*#__PURE__*/jsx_runtime_.jsx(style/* LoginLabel */.eG, {
        name: "id",
        rules: [{
          required: true,
          message: '아이디를 입력해주세요.'
        }],
        children: /*#__PURE__*/jsx_runtime_.jsx(style/* LoginInput */.vJ, {
          prefix: /*#__PURE__*/jsx_runtime_.jsx(icons_.UserOutlined, {}),
          value: id,
          onChange: onChangeId,
          id: "id",
          placeholder: "\uC544\uC774\uB514",
          maxLength: 30
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style/* LoginLabel */.eG, {
        name: "password",
        rules: [{
          required: true,
          message: '비밀번호를 입력해주세요.'
        }, {
          pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/g,
          message: '비밀번호는 8~20글자이고, 숫자,문자,특수문자 모두 포함해야합니다.'
        }],
        children: /*#__PURE__*/jsx_runtime_.jsx(style/* LoginPassword */.EK, {
          prefix: /*#__PURE__*/jsx_runtime_.jsx(icons_.LockOutlined, {}),
          id: "password",
          value: password,
          onChange: onChangePassword,
          placeholder: "\uBE44\uBC00\uBC88\uD638",
          maxLength: 20,
          ref: passwordRef
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style/* SNSForm */.zE, {}), /*#__PURE__*/jsx_runtime_.jsx(style/* ButtonWrapper */.W4, {
        children: /*#__PURE__*/jsx_runtime_.jsx(style/* LoginButton */.TX, {
          htmlType: "submit",
          children: "\uB85C\uADF8\uC778 "
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style/* SubWrapper */.VK, {
        children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
          href: "/signup",
          children: "\uD68C\uC6D0\uAC00\uC785"
        })
      })]
    })]
  });
};

/* harmony default export */ const containers_LoginForm = (LoginForm);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./styles/common.ts
var common = __webpack_require__(7674);
// EXTERNAL MODULE: ./src/components/Footer/index.tsx + 1 modules
var Footer = __webpack_require__(6542);
;// CONCATENATED MODULE: ./src/pages/login.tsx












const Login = () => {
  const router = (0,router_.useRouter)();
  const {
    me,
    isLoggingin
  } = (0,external_react_redux_.useSelector)(state => state.user);
  external_react_.useEffect(() => {
    if (me) {
      router.replace('/');
    }
  }, [me, router]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(common/* FormTitle */.vw, {
      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: "/",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          children: /*#__PURE__*/jsx_runtime_.jsx(next_image.default, {
            src: "/sign.png",
            alt: "\uC5B4\uB514\uAC08\uB798",
            width: 305,
            height: 96
          })
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(common/* LoadingBar */.Ff, {
      size: "large",
      spinning: isLoggingin,
      children: /*#__PURE__*/jsx_runtime_.jsx(containers_LoginForm, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer/* default */.Z, {})]
  });
};

/* harmony default export */ const login = (Login);

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

/***/ 5060:
/***/ ((module) => {

module.exports = require("redux-saga/effects");

/***/ }),

/***/ 9914:
/***/ ((module) => {

module.exports = require("styled-components");

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
var __webpack_exports__ = __webpack_require__.X(0, [61,297,525,674,817], () => (__webpack_exec__(2642)));
module.exports = __webpack_exports__;

})();