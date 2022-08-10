"use strict";
(() => {
var exports = {};
exports.id = 616;
exports.ids = [616];
exports.modules = {

/***/ 4278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ signup)
});

// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./styles/common.ts
var common = __webpack_require__(7674);
// EXTERNAL MODULE: ./src/components/Footer/index.tsx + 1 modules
var Footer = __webpack_require__(6542);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 1 modules
var user = __webpack_require__(4297);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
;// CONCATENATED MODULE: ./src/containers/SignUpForm/style.ts


const Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-eg3v5-0"
})(["width:420px;padding:30px;margin:30px auto 66px;border:1px solid #d9d9d9;", "{width:100%;margin:0 auto;margin-top:50px;}"], ({
  theme
}) => theme.window.mobileL);
const Title = external_styled_components_default().div.withConfig({
  displayName: "style__Title",
  componentId: "sc-eg3v5-1"
})(["margin:20px 0 50px;text-align:center;font-size:40px;font-weight:bold;color:#000;"]);
const ErrorMessage = external_styled_components_default().div.withConfig({
  displayName: "style__ErrorMessage",
  componentId: "sc-eg3v5-2"
})(["text-align:center;margin-bottom:30px;color:red;"]);
const SignupLabel = external_styled_components_default()(external_antd_.Form.Item).withConfig({
  displayName: "style__SignupLabel",
  componentId: "sc-eg3v5-3"
})(["& label{font-size:16px;}"]);
const SignupInput = external_styled_components_default()(external_antd_.Input).withConfig({
  displayName: "style__SignupInput",
  componentId: "sc-eg3v5-4"
})(["height:50px;border-radius:5px;"]);
const SignupPassword = external_styled_components_default()(external_antd_.Input.Password).withConfig({
  displayName: "style__SignupPassword",
  componentId: "sc-eg3v5-5"
})(["height:50px;border-radius:5px;"]);
const ButtonWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-eg3v5-6"
})(["width:100%;text-align:end;margin:10px 0 20px;"]);
const SignupButton = external_styled_components_default()(external_antd_.Button).withConfig({
  displayName: "style__SignupButton",
  componentId: "sc-eg3v5-7"
})(["width:100%;height:45px;border-radius:20px;background-color:#fea939;border-radius:20px;color:#fff;outline:0;border:none;font-weight:bold;font-size:16px;&:hover{background-color:#feb139;color:#fff;}&:active{background-color:#feb139;color:#fff;}&:focus{background-color:#feb139;color:#fff;}"]);
const ValidationError = external_styled_components_default().div.withConfig({
  displayName: "style__ValidationError",
  componentId: "sc-eg3v5-8"
})(["color:red;margin-bottom:10px;margin-top:-5px;"]);
// EXTERNAL MODULE: ./src/containers/LoginForm/style.ts
var style = __webpack_require__(6817);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
// EXTERNAL MODULE: external "sweetalert2"
var external_sweetalert2_ = __webpack_require__(272);
var external_sweetalert2_default = /*#__PURE__*/__webpack_require__.n(external_sweetalert2_);
// EXTERNAL MODULE: ./utils/useInput.ts
var useInput = __webpack_require__(2554);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/containers/SignUpForm/index.tsx















const SignUpForm = () => {
  const [id, onChangeId] = (0,useInput/* default */.Z)('');
  const [password, setPassword] = external_react_.useState('');
  const [nickname, onChangeNickname] = (0,useInput/* default */.Z)('');
  const [validate, setValidate] = external_react_.useState(false);
  const passwordRef = external_react_.useRef(null);
  const nicknameRef = external_react_.useRef(null);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    me,
    isSignedup,
    isSigningup,
    signupError
  } = (0,external_react_redux_.useSelector)(state => state.user);
  external_react_.useEffect(() => {
    if (me) {
      external_sweetalert2_default().fire({
        title: '잘못된 접근',
        text: '홈 화면으로 이동합니다.',
        icon: 'warning'
      }).then(() => {
        router_default().push('/');
      });
    }
  }, [me]);
  external_react_.useEffect(() => {
    if (isSignedup) {
      external_sweetalert2_default().fire({
        title: '회원가입 성공',
        text: '로그인 화면으로 이동합니다.',
        icon: 'success'
      }).then(() => {
        dispatch((0,user/* signupReset */.UG)());
        router_default().push('/login');
      });
    }
  }, [isSignedup, dispatch]);
  external_react_.useEffect(() => {
    if (signupError === '이미 사용중인 닉네임입니다.') {
      nicknameRef.current && nicknameRef.current.focus();
    }
  }, [signupError]);

  const onChangePassword = e => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/g;
    regex.test(e.target.value) ? setValidate(true) : setValidate(false);
    setPassword(e.target.value);
  };

  const onSubmit = (0,external_react_.useCallback)(() => {
    validate ? dispatch(user/* signupAsync.request */.pc.request({
      userId: id,
      password,
      nickname
    })) : passwordRef.current && passwordRef.current.focus();
  }, [id, password, nickname, validate, dispatch]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Wrapper, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(Title, {
      children: "\uD68C\uC6D0\uAC00\uC785"
    }), /*#__PURE__*/jsx_runtime_.jsx(ErrorMessage, {
      children: signupError
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
      onFinish: onSubmit,
      children: [/*#__PURE__*/jsx_runtime_.jsx(SignupLabel, {
        name: "id",
        rules: [{
          required: true,
          message: '아이디를 입력해주세요.'
        }],
        children: /*#__PURE__*/jsx_runtime_.jsx(SignupInput, {
          prefix: /*#__PURE__*/jsx_runtime_.jsx(icons_.UserOutlined, {}),
          value: id,
          onChange: onChangeId,
          id: "id",
          placeholder: "\uC544\uC774\uB514"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(SignupLabel, {
        name: "password",
        rules: [{
          required: true,
          message: '비밀번호를 입력해주세요.'
        }, {
          pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/g,
          message: '비밀번호는 8~20글자이고, 숫자,문자,특수문자 모두 포함해야합니다.'
        }],
        children: /*#__PURE__*/jsx_runtime_.jsx(SignupPassword, {
          prefix: /*#__PURE__*/jsx_runtime_.jsx(icons_.LockOutlined, {}),
          id: "password",
          value: password,
          onChange: onChangePassword,
          placeholder: "\uBE44\uBC00\uBC88\uD638",
          maxLength: 20,
          ref: passwordRef
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(SignupLabel, {
        name: "nickname",
        rules: [{
          required: true,
          message: '닉네임를 입력해주세요.'
        }],
        children: /*#__PURE__*/jsx_runtime_.jsx(SignupInput, {
          prefix: /*#__PURE__*/jsx_runtime_.jsx(icons_.SmileOutlined, {}),
          value: nickname,
          onChange: onChangeNickname,
          id: "nickname",
          placeholder: "\uB2C9\uB124\uC784",
          ref: nicknameRef
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style/* ButtonWrapper */.W4, {
        children: /*#__PURE__*/jsx_runtime_.jsx(SignupButton, {
          htmlType: "submit",
          loading: isSigningup,
          children: "\uAC00\uC785\uD558\uAE30"
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style/* SubWrapper */.VK, {
        children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
          href: "/login",
          children: "\uB85C\uADF8\uC778"
        })
      })]
    })]
  });
};

/* harmony default export */ const containers_SignUpForm = (SignUpForm);
;// CONCATENATED MODULE: ./src/pages/signup.tsx










const Signup = () => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(common/* FormTitle */.vw, {
      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: "./",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          children: /*#__PURE__*/jsx_runtime_.jsx(next_image.default, {
            src: "/sign.png",
            alt: "\uC5B4\uB514\uAC08\uB798",
            width: 305,
            height: 96
          })
        })
      })
    }), /*#__PURE__*/jsx_runtime_.jsx(containers_SignUpForm, {}), /*#__PURE__*/jsx_runtime_.jsx(Footer/* default */.Z, {})]
  });
};

/* harmony default export */ const signup = (Signup);

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

/***/ 272:
/***/ ((module) => {

module.exports = require("sweetalert2");

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
var __webpack_exports__ = __webpack_require__.X(0, [61,297,525,674,817], () => (__webpack_exec__(4278)));
module.exports = __webpack_exports__;

})();