"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405,888];
exports.modules = {

/***/ 442:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
// EXTERNAL MODULE: ./src/modules/detail/index.ts + 1 modules
var detail = __webpack_require__(3044);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./src/components/HotItem/style.ts


const HotImage = external_styled_components_default()(next_image.default).withConfig({
  displayName: "style__HotImage",
  componentId: "sc-mezyc8-0"
})(["width:400px;height:250px;transition:transform 1s ease;transform:scale(1.5);"]);
const HotTitle = external_styled_components_default().div.withConfig({
  displayName: "style__HotTitle",
  componentId: "sc-mezyc8-1"
})(["display:flex;font-family:BMHANNA,sans-serif;justify-content:center;flex-wrap:wrap;position:absolute;width:400px;z-index:10;color:#fff;font-size:30px;font-weight:bold;top:50%;left:50%;transform:translate(-50%,-50%);text-shadow:-1px -1px 0 #000,1px -1px 0 #000,-1px 1px 0 #000,1px 1px 0 #000;", "{font-size:27px;}", "{font-size:25px;}", "{font-size:23px;}", "{font-size:27px;}", "{font-size:25px;}", "{font-size:23px;}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL, ({
  theme
}) => theme.window.mobileM, ({
  theme
}) => theme.window.mobileS);
const Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-mezyc8-2"
})(["position:relative;width:400px;overflow:hidden;margin:5px;&:hover img{transform:scale(1.2);}", "{width:100%;margin:0px;}"], ({
  theme
}) => theme.window.pc);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/components/HotItem/index.tsx







const HotItem = ({
  list
}) => {
  const filter = list.title.match(/\[.*\]/);
  const {
    contenttypeid,
    contentid,
    firstimage,
    title
  } = list;
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
      href: `/detail/${contenttypeid}/${contentid}`,
      passHref: true,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Wrapper, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(HotTitle, {
            children: filter ? title.replace(filter[0], '') : title
          }), firstimage ? /*#__PURE__*/jsx_runtime_.jsx(HotImage, {
            src: firstimage,
            alt: title,
            width: 150,
            height: 100,
            layout: "responsive",
            priority: true
          }) : null]
        })
      })
    })
  });
};

/* harmony default export */ const components_HotItem = (HotItem);
;// CONCATENATED MODULE: ./src/components/MainSkeleton/style.ts

const style_Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-9cx875-0"
})(["display:flex;flex-wrap:wrap;justify-content:center;margin-bottom:100px;", "{width:100%;}"], ({
  theme
}) => theme.window.tablet);
const SkeletonBox = external_styled_components_default().div.withConfig({
  displayName: "style__SkeletonBox",
  componentId: "sc-9cx875-1"
})(["width:400px;height:250px;margin:5px;", "{width:360px;height:220px;}", "{width:100%;}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.tablet);
const ImageSkeleton = external_styled_components_default().div.withConfig({
  displayName: "style__ImageSkeleton",
  componentId: "sc-9cx875-2"
})(["@-webkit-keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}@keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}width:400px;height:250px;-webkit-animation:loading 1.5s infinite ease-in-out;animation:loading 1.5s infinite ease-in-out;", "{width:100%;height:220px;}"], ({
  theme
}) => theme.window.pc);
;// CONCATENATED MODULE: ./src/components/MainSkeleton/index.tsx





const MainSkelton = () => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(style_Wrapper, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    })]
  });
};

/* harmony default export */ const MainSkeleton = (MainSkelton);
;// CONCATENATED MODULE: ./src/components/HotList/style.ts

const HotList_style_Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-mbn1h7-0"
})(["display:flex;flex-wrap:wrap;justify-content:center;margin-bottom:100px;", "{width:100%;& a{width:31%;margin:5px;}}", "{width:100%;& a{width:45%;}}", "{width:100%;margin-bottom:60px;& a{width:90%;}}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.mobileL);
;// CONCATENATED MODULE: ./src/components/HotList/index.tsx






const HotList = ({
  list
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(HotList_style_Wrapper, {
    children: list.length === 0 ? /*#__PURE__*/jsx_runtime_.jsx(MainSkeleton, {}) : list.map(item => /*#__PURE__*/jsx_runtime_.jsx(components_HotItem, {
      list: item
    }, item.contentid))
  });
};

/* harmony default export */ const components_HotList = (HotList);
// EXTERNAL MODULE: ./styles/common.ts
var common = __webpack_require__(7674);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
;// CONCATENATED MODULE: ./src/components/HotTitle/index.tsx







const HotTitle_HotTitle = ({
  title,
  contentTypeId
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(common/* HotMenu */.VQ, {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
        children: ["\uC778\uAE30 ", title]
      }), /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: {
          pathname: '/tour',
          query: {
            title: title,
            contentTypeId: contentTypeId
          }
        },
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("a", {
          children: [/*#__PURE__*/jsx_runtime_.jsx("span", {
            children: "\uB354\uBCF4\uAE30"
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: /*#__PURE__*/jsx_runtime_.jsx(icons_.ArrowRightOutlined, {})
          })]
        })
      })]
    })
  });
};

/* harmony default export */ const components_HotTitle = (HotTitle_HotTitle);
// EXTERNAL MODULE: ./src/pages/_app.tsx + 13 modules
var _app = __webpack_require__(6961);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 1 modules
var user = __webpack_require__(4297);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__(7765);
;// CONCATENATED MODULE: ./src/pages/index.tsx












const Home = () => {
  const {
    data
  } = (0,external_react_redux_.useSelector)(state => state.detail.allData);
  const region = data.items.item;
  const festival = data.items.festival;
  const sleep = data.items.sleep;
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_HotTitle, {
        title: "\uAD00\uAD11\uC9C0",
        contentTypeId: 12
      }), /*#__PURE__*/jsx_runtime_.jsx(components_HotList, {
        list: region
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_HotTitle, {
        title: "\uCD95\uC81C",
        contentTypeId: 15
      }), /*#__PURE__*/jsx_runtime_.jsx(components_HotList, {
        list: festival
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)("div", {
      children: [/*#__PURE__*/jsx_runtime_.jsx(components_HotTitle, {
        title: "\uC219\uC18C",
        contentTypeId: 32
      }), /*#__PURE__*/jsx_runtime_.jsx(components_HotList, {
        list: sleep
      })]
    })]
  });
};

const getServerSideProps = _app.wrapper.getServerSideProps(store => async ({
  req
}) => {
  const cookie = req ? req.headers.cookie : '';

  if ((external_axios_default()).defaults.headers) {
    req && cookie ? (external_axios_default()).defaults.headers.Cookie = cookie : (external_axios_default()).defaults.headers.Cookie = '';
  }

  store.dispatch(user/* loadUserAsync.request */.C_.request());
  store.dispatch(detail/* allAsync.request */.cU.request());
  store.dispatch(external_redux_saga_.END);
  await store.sagaTask.toPromise();
  return {
    props: {}
  };
});
/* harmony default export */ const pages = (Home);

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

/***/ 6481:
/***/ ((module) => {

module.exports = require("react-helmet");

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
var __webpack_exports__ = __webpack_require__.X(0, [664,591,381,961,674], () => (__webpack_exec__(442)));
module.exports = __webpack_exports__;

})();