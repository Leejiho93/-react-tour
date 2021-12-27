"use strict";
(() => {
var exports = {};
exports.id = 373;
exports.ids = [373,888];
exports.modules = {

/***/ 2924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _id_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./src/components/DetailItem/style.ts


const DetailItemWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__DetailItemWrapper",
  componentId: "sc-eqcalu-0"
})(["display:flex;flex-direction:column;align-items:center;"]);
const DetailItemTitle = external_styled_components_default().h2.withConfig({
  displayName: "style__DetailItemTitle",
  componentId: "sc-eqcalu-1"
})(["font-family:BMJUA;font-size:50px;font-weight:600;padding:50px 0;", "{padding:100px 0 50px;}", "{font-size:45px;width:90%;text-align:center;}", "{font-size:40px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const DetailItemImage = external_styled_components_default()(next_image.default).withConfig({
  displayName: "style__DetailItemImage",
  componentId: "sc-eqcalu-2"
})(["width:980px;padding:0 0 50px 0;", "{width:100%;}", "{padding:0;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const ImageWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__ImageWrapper",
  componentId: "sc-eqcalu-3"
})(["width:100%;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);
const DetailItemInfo = external_styled_components_default().h3.withConfig({
  displayName: "style__DetailItemInfo",
  componentId: "sc-eqcalu-4"
})(["border-bottom:2px solid black;width:100%;font-family:BMJUA;font-size:30px;font-weight:600;margin:30px 0;padding:20px 10px 15px;& span{font-size:18px;font-family:BMHANNAAir;}", "{width:90%;}", "{font-size:27px;& span{font-size:16px;}}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const DetailItemOverview = external_styled_components_default().div.withConfig({
  displayName: "style__DetailItemOverview",
  componentId: "sc-eqcalu-5"
})(["line-height:1.5;font-weight:600;font-size:17px;font-family:'Gowun Batang',serif;height:", "  overflow:hidden;", "{width:90%;line-height:1.3;}"], props => props.more ? '100%;' : '155px;', ({
  theme
}) => theme.window.laptop);
const ButtonWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-eqcalu-6"
})(["width:100%;text-align:center;border:1px solid #000;cursor:pointer;padding:10px;font-weight:600;& span{padding:0 3px;font-size:15px;}margin:15px 0;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);
;// CONCATENATED MODULE: ./src/components/SubItem/style.ts

const Li = external_styled_components_default().li.withConfig({
  displayName: "style__Li",
  componentId: "sc-11zb43j-0"
})(["width:50%;padding:0 10px;float:left;font-family:'Gowun Batang',serif;font-weight:500;font-size:18px;margin-bottom:10px;& p{font-size:17px;padding:5px 0;a{word-break:break-all;color:#000;}}& b{font-weight:bold;}", "{width:100%;float:none;padding:0;}"], ({
  theme
}) => theme.window.tablet);
const IntroWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__IntroWrapper",
  componentId: "sc-11zb43j-1"
})(["margin-top:50px;width:100%;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/components/SubItem/index.tsx





const SubItem = ({
  name,
  html
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Li, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("b", {
        children: name
      }), /*#__PURE__*/jsx_runtime_.jsx("p", {
        dangerouslySetInnerHTML: {
          __html: html
        }
      })]
    })
  });
};

/* harmony default export */ const components_SubItem = (SubItem);
;// CONCATENATED MODULE: ./src/components/TourSpot/index.tsx






const TourSpot = ({
  item
}) => {
  const {
    addr1,
    homepage
  } = item;
  const {
    infocenter,
    usetime
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, infocenter ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: infocenter
      }) : null, usetime ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: usetime
      }) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourSpot = (TourSpot);
;// CONCATENATED MODULE: ./src/components/TourCulture/index.tsx






const TourCulture = ({
  item
}) => {
  const {
    addr1,
    homepage
  } = item;
  const {
    infocenterculture,
    parkingculture,
    parkingfee,
    usetimeculture
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, infocenterculture ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: infocenterculture
      }) : null, parkingculture ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uCC28",
        html: parkingculture
      }) : null, parkingfee ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC694\uAE08",
        html: parkingfee
      }) : null, usetimeculture ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: usetimeculture
      }) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourCulture = (TourCulture);
;// CONCATENATED MODULE: ./src/components/TourEvent/index.tsx






const TourEvent = ({
  item
}) => {
  const {
    addr1,
    homepage,
    tel
  } = item;
  const {
    usetimefestival,
    playtime,
    discountinfofestival
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, tel ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: tel
      }) : null, usetimefestival ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC694\uAE08",
        html: usetimefestival
      }) : null, playtime ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC77C\uC815",
        html: playtime
      }) : null, discountinfofestival ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD560\uC778",
        html: discountinfofestival
      }) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourEvent = (TourEvent);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
;// CONCATENATED MODULE: ./src/components/TourCourse/style.ts



const Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-1bc9gpk-0"
})(["width:100%;display:flex;font-family:BMHANNAAir;justify-content:space-between;", "{width:90%;}", "{flex-direction:column;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const Item = external_styled_components_default()(external_antd_.Timeline.Item).withConfig({
  displayName: "style__Item",
  componentId: "sc-1bc9gpk-1"
})(["font-size:18px;& div{display:inline-block;cursor:pointer;&.active{font-weight:bold;}}"]);
const CourseImage = external_styled_components_default().div.withConfig({
  displayName: "style__CourseImage",
  componentId: "sc-1bc9gpk-2"
})([""]);
const CourseList = external_styled_components_default()(external_antd_.Timeline).withConfig({
  displayName: "style__CourseList",
  componentId: "sc-1bc9gpk-3"
})(["margin-top:10px;"]);
const CardWrapper = external_styled_components_default()(external_antd_.Card).withConfig({
  displayName: "style__CardWrapper",
  componentId: "sc-1bc9gpk-4"
})(["width:300px;height:200px;margin:0 auto;& div{text-align:center;font-size:20px;font-family:BMJUA;}", "{width:250px;height:200px;}"], ({
  theme
}) => theme.window.mobileS);
const CardImage = external_styled_components_default()(next_image.default).withConfig({
  displayName: "style__CardImage",
  componentId: "sc-1bc9gpk-5"
})(["width:300px;height:250px;", "{width:100%;}", "{}"], ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileS);
const SubDetail = external_styled_components_default().div.withConfig({
  displayName: "style__SubDetail",
  componentId: "sc-1bc9gpk-6"
})(["flex:2;padding:10px;font-family:none;font-size:15px;line-height:18px;& span{font-weight:bold;font-size:22px;padding:5px;line-height:25px;font-family:BMJUA;}& div{margin-bottom:10px;}& p{line-height:20px;}"]);
;// CONCATENATED MODULE: ./src/components/TourCourse/index.tsx








const TourCourse = ({
  item
}) => {
  const {
    0: imageSrc,
    1: setImageSrc
  } = (0,external_react_.useState)(Array.isArray(item.info) ? item.info[0].subdetailimg : item.info.subdetailimg);
  const {
    0: imageTitle,
    1: setImageTitle
  } = (0,external_react_.useState)(Array.isArray(item.info) ? item.info[0].subname : item.info.subname);
  const {
    0: subOverview,
    1: setSubOverview
  } = (0,external_react_.useState)(Array.isArray(item.info) ? item.info[0].subdetailoverview : item.info.subdetailoverview);
  const changeImageSrc = external_react_default().useCallback(src => () => {
    setImageSrc(src.subdetailimg);
    setImageTitle(src.subname);
    setSubOverview(src.subdetailoverview);
  }, []);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(DetailItemInfo, {
      children: ["\uCF54\uC2A4 ", /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
        children: ["(", item.intro.distance, ")"]
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(Wrapper, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(CourseList, {
        children: item.info && Array.isArray(item.info) ? item.info.map(course => /*#__PURE__*/jsx_runtime_.jsx(Item, {
          children: /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: imageTitle == course.subname ? 'active' : '',
            onClick: changeImageSrc(course),
            children: course.subname
          })
        }, course.subcontentid)) : /*#__PURE__*/jsx_runtime_.jsx(Item, {
          children: /*#__PURE__*/jsx_runtime_.jsx("div", {
            className: imageTitle == item.info.subname ? 'active' : '',
            onClick: changeImageSrc(item.info),
            children: item.info.subname
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(CourseImage, {
        children: /*#__PURE__*/jsx_runtime_.jsx(CardWrapper, {
          hoverable: true,
          cover: imageSrc ? /*#__PURE__*/jsx_runtime_.jsx(CardImage, {
            src: imageSrc,
            alt: "\uCF54\uC2A4\uC774\uBBF8\uC9C0",
            width: 300,
            height: 200,
            priority: true
          }) : /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Image, {
            alt: "\uC900\uBE44\uC911",
            src: "error",
            fallback: "data:image/png;base64,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",
            width: 300,
            height: 200
          })
        })
      })]
    }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(SubDetail, {
      children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("span", {
          children: [`- `, imageTitle]
        })
      }), subOverview ? /*#__PURE__*/jsx_runtime_.jsx("p", {
        dangerouslySetInnerHTML: {
          __html: subOverview
        }
      }) : null]
    })]
  });
};

/* harmony default export */ const components_TourCourse = (TourCourse);
;// CONCATENATED MODULE: ./src/components/TourSports/index.tsx






const TourSports = ({
  item
}) => {
  const {
    addr1,
    homepage
  } = item;
  const {
    infocenterleports,
    reservation,
    usetimeleports
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, reservation ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC608\uC57D",
        html: reservation
      }) : null, infocenterleports ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: infocenterleports
      }) : null, usetimeleports ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: usetimeleports
      }) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourSports = (TourSports);
;// CONCATENATED MODULE: ./src/components/TourSleep/index.tsx






const TourSleep = ({
  item
}) => {
  const {
    addr1,
    homepage
  } = item;
  const {
    reservationlodging,
    reservationurl,
    checkintime,
    checkouttime,
    refundregulation,
    scalelodging
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, reservationlodging ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: reservationlodging
      }) : null, reservationurl ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC608\uC57D",
        html: reservationurl
      }) : null, checkintime ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uCCB4\uD06C\uC778",
        html: checkintime
      }) : null, checkouttime ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uCCB4\uD06C\uC544\uC6C3",
        html: checkouttime
      }) : null, refundregulation ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD658\uBD88",
        html: refundregulation
      }) : null, scalelodging ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uADDC\uBAA8",
        html: scalelodging
      }) : null, item.info ? Array.isArray(item.info) ? item.info.filter(v => v.infoname).map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourSleep = (TourSleep);
;// CONCATENATED MODULE: ./src/components/TourMall/index.tsx






const TourMall = ({
  item
}) => {
  const {
    addr1,
    homepage
  } = item;
  const {
    infocentershopping,
    shopguide,
    opentime,
    restdateshopping
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, infocentershopping ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: infocentershopping
      }) : null, shopguide ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC548\uB0B4",
        html: shopguide
      }) : null, restdateshopping ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD734\uC77C",
        html: restdateshopping
      }) : null, opentime ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: opentime
      }) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourMall = (TourMall);
;// CONCATENATED MODULE: ./src/components/TourFood/index.tsx






const TourFood = ({
  item
}) => {
  const {
    addr1,
    homepage
  } = item;
  const {
    restdatefood,
    reservationfood,
    opentimefood,
    treatmenu,
    infocenterfood
  } = item.intro;
  return /*#__PURE__*/jsx_runtime_.jsx(IntroWrapper, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("ul", {
      children: [addr1 ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC8FC\uC18C",
        html: addr1
      }) : null, homepage ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }) : null, infocenterfood ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBB38\uC758",
        html: infocenterfood
      }) : null, treatmenu ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uBA54\uB274",
        html: treatmenu
      }) : null, reservationfood ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC5D0\uC57D",
        html: reservationfood
      }) : null, restdatefood ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uD734\uC77C",
        html: restdatefood
      }) : null, opentimefood ? /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: opentimefood
      }) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname)) : /*#__PURE__*/jsx_runtime_.jsx(components_SubItem, {
        name: item.info.infoname,
        html: item.info.infotext
      }) : null]
    })
  });
};

/* harmony default export */ const components_TourFood = (TourFood);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
;// CONCATENATED MODULE: ./src/components/Kakaomap/style.ts

const MapWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__MapWrapper",
  componentId: "sc-ta93rz-0"
})(["display:flex;justify-content:center;padding:70px 0 0;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);
const Map = external_styled_components_default().div.withConfig({
  displayName: "style__Map",
  componentId: "sc-ta93rz-1"
})(["width:980px;height:400px;position:relative;", "{}", "{height:350px;}", "{height:250px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const IwContentWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__IwContentWrapper",
  componentId: "sc-ta93rz-2"
})(["width:360px;height:200px;"]);
const Infowindow = external_styled_components_default().div.withConfig({
  displayName: "style__Infowindow",
  componentId: "sc-ta93rz-3"
})(["position:absolute;text-align:center;z-index:99;width:240px;height:120px;background-color:#fff;margin:10px;border-radius:10px;box-shadow:3px 3px 5px 0px rgb(0 0 0 / 20%);padding:20px;& div{margin-bottom:20px;}& span{font-size:20px;font-family:BMJUA;}& b{background-color:#5b5b5b;padding:5px 10px;margin-top:10px;border-radius:10px;color:#fff;&:hover{font-weight:bold;}& span{font-size:18px;}}", "{width:200px;height:100px;& div{margin-bottom:10px;}& span{font-size:18px;}& b{padding:2px 5px;font-size:15px;}}"], ({
  theme
}) => theme.window.mobileL);
;// CONCATENATED MODULE: ./src/components/Kakaomap/index.tsx







const Kakaomap = ({
  item
}) => {
  const {
    mapx,
    mapy,
    title
  } = item;
  (0,external_react_.useEffect)(() => {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${"11836019b216ac11afae93dfe5ad3f0d"}`;
    document.head.appendChild(script);
    const container = document.getElementById('map');

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(mapy, mapx),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options); // 마커 표시

        const markerPosition = new kakao.maps.LatLng(mapy, mapx);
        const marker = new kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map); // 지도 확대 막기

        map.setZoomable(false); // 줌 컨트롤러
        // const zoomControl = new kakao.maps.ZoomControl();
        // map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
      });
    };

    return () => script.remove();
  }, [item, mapx, mapy]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: mapx ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(MapWrapper, {
      children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(Infowindow, {
        children: [/*#__PURE__*/jsx_runtime_.jsx("div", {
          children: /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: title
          })
        }), /*#__PURE__*/jsx_runtime_.jsx("a", {
          href: `https://map.kakao.com/link/to/${title},${mapy},${mapx}`,
          target: "_blank",
          rel: "noreferrer",
          children: /*#__PURE__*/(0,jsx_runtime_.jsxs)("b", {
            children: ["\uAE38\uCC3E\uAE30 ", /*#__PURE__*/jsx_runtime_.jsx(icons_.ArrowRightOutlined, {})]
          })
        })]
      }), /*#__PURE__*/jsx_runtime_.jsx(Map, {
        id: "map"
      })]
    }) : null
  });
};

/* harmony default export */ const components_Kakaomap = (Kakaomap);
// EXTERNAL MODULE: ./utils/useToggle.ts
var useToggle = __webpack_require__(605);
;// CONCATENATED MODULE: ./src/components/DetailItem/index.tsx

















const DetailItem = ({
  item
}) => {
  const {
    title,
    firstimage,
    overview,
    contenttypeid
  } = item;
  const [more, onToggleMore] = (0,useToggle/* default */.Z)(true);
  const [minHeight, onToggleMinHeight] = (0,useToggle/* default */.Z)(false);
  (0,external_react_.useEffect)(() => {
    const moreHeight = document.getElementById('moreDiv').clientHeight;

    if (moreHeight < 155) {
      onToggleMinHeight();
    } else {
      onToggleMore();
    }
  }, [onToggleMore, onToggleMinHeight]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(DetailItemWrapper, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(DetailItemTitle, {
        children: title
      }), /*#__PURE__*/jsx_runtime_.jsx(ImageWrapper, {
        children: firstimage && /*#__PURE__*/jsx_runtime_.jsx(DetailItemImage, {
          src: firstimage,
          alt: title,
          width: 980,
          height: 800,
          layout: "responsive",
          priority: true
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(DetailItemInfo, {
        children: "\uC0C1\uC138\uC815\uBCF4"
      }), /*#__PURE__*/jsx_runtime_.jsx(DetailItemOverview, {
        id: "moreDiv",
        more: more,
        dangerouslySetInnerHTML: {
          __html: overview.replaceAll(/\s[*]/g, '<br/><br/>*')
        }
      }), minHeight ? null : /*#__PURE__*/jsx_runtime_.jsx(ButtonWrapper, {
        onClick: onToggleMore,
        children: !more ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [/*#__PURE__*/jsx_runtime_.jsx("b", {
            children: "\uB354\uBCF4\uAE30"
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: /*#__PURE__*/jsx_runtime_.jsx(icons_.CaretDownOutlined, {})
          })]
        }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
          children: [/*#__PURE__*/jsx_runtime_.jsx("b", {
            children: "\uB2EB\uAE30"
          }), /*#__PURE__*/jsx_runtime_.jsx("span", {
            children: /*#__PURE__*/jsx_runtime_.jsx(icons_.CaretUpOutlined, {})
          })]
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(components_Kakaomap, {
        item: item
      }), (() => {
        switch (contenttypeid) {
          case 12:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourSpot, {
              item: item
            });

          case 14:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourCulture, {
              item: item
            });

          case 15:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourEvent, {
              item: item
            });

          case 25:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourCourse, {
              item: item
            });

          case 28:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourSports, {
              item: item
            });

          case 32:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourSleep, {
              item: item
            });

          case 38:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourMall, {
              item: item
            });

          case 39:
            return /*#__PURE__*/jsx_runtime_.jsx(components_TourFood, {
              item: item
            });

          default:
            null;
        }
      })()]
    })
  });
};

/* harmony default export */ const components_DetailItem = (DetailItem);
// EXTERNAL MODULE: ./src/modules/detail/index.ts + 1 modules
var modules_detail = __webpack_require__(3044);
// EXTERNAL MODULE: external "sweetalert2"
var external_sweetalert2_ = __webpack_require__(272);
var external_sweetalert2_default = /*#__PURE__*/__webpack_require__.n(external_sweetalert2_);
// EXTERNAL MODULE: ./utils/useInput.ts
var useInput = __webpack_require__(2554);
// EXTERNAL MODULE: ./src/modules/comment/index.ts + 1 modules
var comment = __webpack_require__(2898);
;// CONCATENATED MODULE: ./src/containers/CommentForm/style.ts


const FormWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__FormWrapper",
  componentId: "sc-1ih6e1f-0"
})(["padding:10px;", "{width:95%;margin:0 auto;}"], ({
  theme
}) => theme.window.laptop);
const style_ButtonWrapper = external_styled_components_default()(external_antd_.Form.Item).withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-1ih6e1f-1"
})(["text-align:end;.ant-btn-primary{background-color:#ffae59;border:#1a73e8;border-radius:5px;&:hover{background-color:#ffb86e;}}"]);
const TextAreaWrapper = external_styled_components_default()(external_antd_.Form.Item).withConfig({
  displayName: "style__TextAreaWrapper",
  componentId: "sc-1ih6e1f-2"
})(["margin-bottom:10px;"]);
const TextArea = external_styled_components_default().textarea.withConfig({
  displayName: "style__TextArea",
  componentId: "sc-1ih6e1f-3"
})(["width:100%;border-radius:5px;padding:10px;"]);
;// CONCATENATED MODULE: ./src/containers/CommentForm/index.tsx











const CommentForm = ({
  item
}) => {
  const [commentText, onChangeCommentText, setCommentText] = (0,useInput/* default */.Z)('');
  const {
    me
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const showModal = external_react_.useCallback(() => {
    return external_sweetalert2_default().fire({
      title: '로그인 화면 이동',
      text: '댓글을 작성하려면 로그인 하세요.',
      showCancelButton: true,
      confirmButtonText: '이동',
      cancelButtonText: '취소',
      icon: 'warning'
    }).then(result => {
      if (result.isConfirmed) {
        router_default().push('/login');
      }
    });
  }, []);
  const onSubmit = external_react_.useCallback(() => {
    if (!commentText.trim()) {
      return external_sweetalert2_default().fire({
        title: '댓글을 입력하세요',
        icon: 'warning'
      });
    }

    dispatch(comment/* addCommentAsync.request */.nG.request({
      contentid: item.contentid,
      commentText
    }));
    setCommentText('');
  }, [commentText, dispatch, item.contentid, setCommentText]);
  return /*#__PURE__*/jsx_runtime_.jsx(FormWrapper, {
    children: me ? /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
      onFinish: onSubmit,
      children: [/*#__PURE__*/jsx_runtime_.jsx(TextAreaWrapper, {
        children: /*#__PURE__*/jsx_runtime_.jsx(TextArea, {
          rows: 3,
          onChange: onChangeCommentText,
          value: commentText,
          placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694."
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style_ButtonWrapper, {
        children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
          htmlType: "submit",
          type: "primary",
          children: "\uB4F1\uB85D"
        })
      })]
    }) : /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Form, {
      onClick: showModal,
      children: [/*#__PURE__*/jsx_runtime_.jsx(TextAreaWrapper, {
        children: /*#__PURE__*/jsx_runtime_.jsx(TextArea, {
          rows: 3,
          placeholder: "\uB313\uAE00\uC744 \uC791\uC131\uD558\uB824\uBA74 \uB85C\uADF8\uC778 \uD558\uC138\uC694."
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(style_ButtonWrapper, {
        children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
          htmlType: "submit",
          type: "primary",
          children: "\uB4F1\uB85D"
        })
      })]
    })
  });
};

/* harmony default export */ const containers_CommentForm = (CommentForm);
;// CONCATENATED MODULE: ./src/containers/CommentItem/style.ts


const CommentStyle = external_styled_components_default()(external_antd_.Comment).withConfig({
  displayName: "style__CommentStyle",
  componentId: "sc-sxylx3-0"
})(["border-bottom:1px solid #e5e5e5;background-color:", ";padding:0px 20px;"], props => props.mine ? '#f0f0f0' : '#fff');
;// CONCATENATED MODULE: ./src/containers/EditForm/style.ts


const CancelButton = external_styled_components_default()(external_antd_.Button).withConfig({
  displayName: "style__CancelButton",
  componentId: "sc-ckebax-0"
})(["background-color:#999999;border:#999999;margin-left:5px;border-radius:5px;color:#fff;&:hover{background-color:#a2a2a2;color:#fff;s}"]);
const EditForm_style_ButtonWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-ckebax-1"
})(["text-align:end;margin-bottom:0px;.ant-btn-primary{background-color:#ffae59;border:#1a73e8;border-radius:5px;&:hover{background-color:#ffb86e;}"]);
;// CONCATENATED MODULE: ./src/containers/EditForm/index.tsx











const EditForm = ({
  text,
  id,
  toggleEdit,
  contentid
}) => {
  const [input, onChangeInput] = (0,useInput/* default */.Z)(text);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    commentEditedError
  } = (0,external_react_redux_.useSelector)(state => state.comment);
  (0,external_react_.useEffect)(() => {
    if (commentEditedError) {
      toggleEdit();
    }
  }, [commentEditedError, toggleEdit]);
  const onSubmit = external_react_default().useCallback(() => {
    if (!input.trim()) {
      return external_sweetalert2_default().fire({
        title: '댓글을 입력하세요',
        icon: 'warning'
      });
    }

    dispatch(comment/* modifyCommentAsync.request */.ok.request({
      id,
      editComment: input,
      contentid
    }));
    toggleEdit();
  }, [input, id, dispatch, toggleEdit, contentid]);
  return /*#__PURE__*/jsx_runtime_.jsx(FormWrapper, {
    children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Form, {
      onFinish: onSubmit,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(TextAreaWrapper, {
        children: [/*#__PURE__*/jsx_runtime_.jsx(TextArea, {
          rows: 3,
          onChange: onChangeInput,
          value: input,
          placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694."
        }), /*#__PURE__*/(0,jsx_runtime_.jsxs)(EditForm_style_ButtonWrapper, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Button, {
            htmlType: "submit",
            type: "primary",
            children: "\uC218\uC815"
          }), /*#__PURE__*/jsx_runtime_.jsx(CancelButton, {
            onClick: toggleEdit,
            children: "\uCDE8\uC18C"
          })]
        })]
      })
    })
  });
};

/* harmony default export */ const containers_EditForm = (EditForm);
;// CONCATENATED MODULE: ./src/containers/CommentItem/index.tsx











const CommentItem = ({
  data
}) => {
  const [editable, onToggleEdit] = (0,useToggle/* default */.Z)(false);
  const dispatch = (0,external_react_redux_.useDispatch)();
  const id = (0,external_react_redux_.useSelector)(state => state.user.me && state.user.me.id);
  const removeComment = external_react_.useCallback(() => {
    external_sweetalert2_default().fire({
      title: '댓글을 정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(comment/* deleteCommentAsync.request */.E4.request({
          id: data.id,
          contentid: data.contentId
        }));
      }
    });
  }, [dispatch, data.id, data.contentId]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: !editable ? /*#__PURE__*/jsx_runtime_.jsx(CommentStyle, {
      mine: id === data.UserId ? 1 : 0,
      actions: [id === data.UserId ? /*#__PURE__*/jsx_runtime_.jsx("span", {
        onClick: onToggleEdit,
        children: "\uC218\uC815"
      }, "comment-modify") : null, id === data.UserId ? /*#__PURE__*/jsx_runtime_.jsx("span", {
        onClick: removeComment,
        children: "\uC0AD\uC81C"
      }, "comment-delete") : null],
      author: /*#__PURE__*/jsx_runtime_.jsx("a", {
        children: data.User.nickname
      }),
      avatar: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Avatar, {
        children: data.User.nickname.slice(0, 2)
      }),
      content: /*#__PURE__*/jsx_runtime_.jsx("p", {
        children: data.content
      }),
      datetime: /*#__PURE__*/jsx_runtime_.jsx("span", {
        children: new Date(data.createdAt).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul'
        })
      })
    }) : /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
      children: /*#__PURE__*/jsx_runtime_.jsx(containers_EditForm, {
        text: data.content,
        id: data.id,
        toggleEdit: onToggleEdit,
        contentid: data.contentId
      })
    })
  });
};

/* harmony default export */ const containers_CommentItem = (CommentItem);
;// CONCATENATED MODULE: ./src/components/CommentList/style.ts

const style_Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-ecs3lj-0"
})(["border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;margin-bottom:30px;", "{width:95%;margin:0 auto 30px;}"], ({
  theme
}) => theme.window.laptop);
const CommentTitle = external_styled_components_default().div.withConfig({
  displayName: "style__CommentTitle",
  componentId: "sc-ecs3lj-1"
})(["padding:10px 20px;font-family:BMeuljiro;font-size:25px;margin-top:50px;& span{font-family:BMJUA;font-size:16px;padding:0 10px;}", "{padding:10px 30px;}"], ({
  theme
}) => theme.window.laptop);
;// CONCATENATED MODULE: ./src/components/CommentList/index.tsx






const CommentList = ({
  data
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(CommentTitle, {
      children: ["\uB313\uAE00", /*#__PURE__*/jsx_runtime_.jsx("span", {
        children: `${data.length}개`
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(style_Wrapper, {
      children: data && data.map(item => /*#__PURE__*/jsx_runtime_.jsx(containers_CommentItem, {
        data: item
      }, item.createdAt))
    })]
  });
};

/* harmony default export */ const components_CommentList = (CommentList);
// EXTERNAL MODULE: ./src/pages/_app.tsx + 13 modules
var _app = __webpack_require__(6961);
// EXTERNAL MODULE: external "axios"
var external_axios_ = __webpack_require__(2376);
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 1 modules
var user = __webpack_require__(4297);
// EXTERNAL MODULE: external "redux-saga"
var external_redux_saga_ = __webpack_require__(7765);
;// CONCATENATED MODULE: ./src/components/DetailSkeleton/style.ts

const DetailSkeleton_style_Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-xw5rja-0"
})(["display:flex;flex-direction:column;align-items:center;"]);
const TitleBox = external_styled_components_default().div.withConfig({
  displayName: "style__TitleBox",
  componentId: "sc-xw5rja-1"
})(["width:100%;height:150px;padding:50px 0;", "{padding:100px 0 50px;height:200px;width:90%;}", "{height:195px;}", "{height:190px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const TitleSkeleton = external_styled_components_default().div.withConfig({
  displayName: "style__TitleSkeleton",
  componentId: "sc-xw5rja-2"
})(["@-webkit-keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}@keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}width:100%;height:50px;-webkit-animation:loading 1.5s infinite ease-in-out;animation:loading 1.5s infinite ease-in-out;", "{width:100%;}", "{height:45px;width:100%;}", "{height:40px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const SkeletonBox = external_styled_components_default().div.withConfig({
  displayName: "style__SkeletonBox",
  componentId: "sc-xw5rja-3"
})(["width:980px;height:654px;margin:5px;", "{}", "{width:90%;text-align:center;}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.laptop);
const ImageSkeleton = external_styled_components_default().div.withConfig({
  displayName: "style__ImageSkeleton",
  componentId: "sc-xw5rja-4"
})(["@-webkit-keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}@keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}width:980px;height:654px;-webkit-animation:loading 1.5s infinite ease-in-out;animation:loading 1.5s infinite ease-in-out;", "{width:100%;}", "{width:100%;}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
;// CONCATENATED MODULE: ./src/components/DetailSkeleton/index.tsx





const DetailSkeleton = () => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(DetailSkeleton_style_Wrapper, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(TitleBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(TitleSkeleton, {})
    }), /*#__PURE__*/jsx_runtime_.jsx(SkeletonBox, {
      children: /*#__PURE__*/jsx_runtime_.jsx(ImageSkeleton, {})
    })]
  });
};

/* harmony default export */ const components_DetailSkeleton = (DetailSkeleton);
// EXTERNAL MODULE: ./styles/common.ts
var common = __webpack_require__(7674);
;// CONCATENATED MODULE: ./src/pages/detail/[...id].tsx

















const Detail = ({
  detail
}) => {
  const router = (0,router_.useRouter)();
  const dispatch = (0,external_react_redux_.useDispatch)();
  const {
    item
  } = detail.detailResult.data.items;
  const {
    commentList
  } = (0,external_react_redux_.useSelector)(state => state.comment);
  const contentId = router.query.id && router.query.id[1];
  const contentTypeId = router.query.id && router.query.id[0];
  (0,external_react_.useEffect)(() => {
    dispatch(modules_detail/* detailAsync.request */.Ec.request({
      contentTypeId: Number(contentTypeId),
      contentId: Number(contentId)
    }));
  }, [contentId, contentTypeId, dispatch]);
  (0,external_react_.useEffect)(() => {
    dispatch(comment/* loadCommentAsync.request */.Hc.request({
      contentId: Number(contentId)
    }));
  }, [contentId, dispatch]);
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(common/* DtailWrapper */.pv, {
    children: [item ? /*#__PURE__*/jsx_runtime_.jsx(components_DetailItem, {
      item: item
    }) : /*#__PURE__*/jsx_runtime_.jsx(components_DetailSkeleton, {}), /*#__PURE__*/jsx_runtime_.jsx(components_CommentList, {
      data: commentList
    }), item && /*#__PURE__*/jsx_runtime_.jsx(containers_CommentForm, {
      item: item
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
  store.dispatch(external_redux_saga_.END);
  await store.sagaTask.toPromise();
  return {
    props: {}
  };
});
/* harmony default export */ const _id_ = ((0,external_react_redux_.connect)(state => state)(Detail));

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,591,381,961,674], () => (__webpack_exec__(2924)));
module.exports = __webpack_exports__;

})();