"use strict";
exports.id = 503;
exports.ids = [503];
exports.modules = {

/***/ 5503:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Layout)
});

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(9297);
// EXTERNAL MODULE: ./src/components/Footer/index.tsx + 1 modules
var Footer = __webpack_require__(6542);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(953);
// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(9914);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);
;// CONCATENATED MODULE: ./src/containers/Navbar/style.ts


const Wrapper = external_styled_components_default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-xf9b14-0"
})(["position:sticky;top:0;z-index:999;height:80px;"]);
const NavbarWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__NavbarWrapper",
  componentId: "sc-xf9b14-1"
})(["display:flex;padding:10px 0;justify-content:center;align-items:center;border-bottom:3px solid #eeeeee;background-color:#fff;", "{flex-direction:column;align-items:flex-start;padding:10px 0 0;}"], ({
  theme
}) => theme.window.tablet);
const MobileSearch = external_styled_components_default().div.withConfig({
  displayName: "style__MobileSearch",
  componentId: "sc-xf9b14-2"
})(["display:none;height:50px;", "{display:flex;width:100%;justify-content:center;align-items:center;height:60px;background-color:#fff;box-shadow:0 1px 3px 0 rgb(0 0 0 / 12%);& form{width:100%;margin:0 5%;}& form input{width:100%;}}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.mobileS);
const Logo = external_styled_components_default().div.withConfig({
  displayName: "style__Logo",
  componentId: "sc-xf9b14-3"
})(["display:flex;justify-content:center;align-items:center;flex:1.5;", "{}", "{& div{left:30px;}}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const Category = external_styled_components_default().div.withConfig({
  displayName: "style__Category",
  componentId: "sc-xf9b14-4"
})(["display:flex;flex:3;justify-content:center;& ul{display:flex;}& a{font-size:18px;font-family:BMJUA;color:#000;margin-left:10px;}", "{display:", ";width:100%;& ul{width:100%;flex-direction:column;}& ul li{margin-left:0;width:100%;text-align:center;&:hover{background-color:#e2e2e2;}}& a{padding:12px 5px;margin-left:0;font-size:22px;}}"], ({
  theme
}) => theme.window.tablet, props => props.toggle ? 'block' : 'none');
const Ul = external_styled_components_default().ul.withConfig({
  displayName: "style__Ul",
  componentId: "sc-xf9b14-5"
})(["margin-bottom:0;margin-top:15px;", "{margin-right:60px;}", "{margin-right:0px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const Search = external_styled_components_default().div.withConfig({
  displayName: "style__Search",
  componentId: "sc-xf9b14-6"
})(["display:flex;justify-content:center;flex:2;", "{display:none;}"], ({
  theme
}) => theme.window.laptop);
const Account = external_styled_components_default().div.withConfig({
  displayName: "style__Account",
  componentId: "sc-xf9b14-7"
})(["display:flex;flex:0.5;justify-content:center;font-size:28px;& a{color:#000;}", "{display:", ";width:100%;}"], ({
  theme
}) => theme.window.tablet, props => props.toggle ? 'flex' : 'none');
const HamburgerMenu = external_styled_components_default().div.withConfig({
  displayName: "style__HamburgerMenu",
  componentId: "sc-xf9b14-8"
})(["display:none;", "{display:block;position:absolute;top:25px;right:20px;font-size:30px;}"], ({
  theme
}) => theme.window.tablet);
const LogoutButton = external_styled_components_default().button.withConfig({
  displayName: "style__LogoutButton",
  componentId: "sc-xf9b14-9"
})(["padding:6px 10px;border:1px solid #5f6368;border-radius:4px;background-color:#e8eaed;color:#3c3d40;margin-right:30px;cursor:pointer;font-family:'Gowun Batang',serif;font-weight:600;", "{border:none;color:#000;background-color:#fff;padding:12px 5px;font-family:BMJUA;font-size:22px;margin-right:0px;width:100%;&:hover{background-color:#e2e2e2;}}"], ({
  theme
}) => theme.window.tablet);
const MyAvatar = external_styled_components_default()(external_antd_.Avatar).withConfig({
  displayName: "style__MyAvatar",
  componentId: "sc-xf9b14-10"
})(["cursor:pointer;"]);
// EXTERNAL MODULE: external "react-redux"
var external_react_redux_ = __webpack_require__(79);
// EXTERNAL MODULE: ./src/modules/user/index.ts + 1 modules
var user = __webpack_require__(4297);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(6731);
;// CONCATENATED MODULE: ./src/containers/SearchForm/style.ts

const Input = external_styled_components_default().input.withConfig({
  displayName: "style__Input",
  componentId: "sc-qyu68w-0"
})(["border-radius:15px 0 0 15px;color:#fff;border:2px solid #333333;background-color:#333333;border-right:none;padding:15px;width:200px;height:45px;outline:none;font-weight:bold;font-size:15px;letter-spacing:1px;", "{}", "{}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileS);
const SearchButton = external_styled_components_default().button.withConfig({
  displayName: "style__SearchButton",
  componentId: "sc-qyu68w-1"
})(["width:45px;height:45px;background:#333333;text-align:center;cursor:pointer;border:none;border-radius:0 15px 15px 0;& span{color:#fff;font-size:20px;margin-top:5px;}"]);
const SearchWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__SearchWrapper",
  componentId: "sc-qyu68w-2"
})(["width:100%;display:flex;position:relative;& label{position:absolute;top:-1000px;left:-1000px;}", "{justify-content:center;}", "{}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileS);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(2372);
// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(5282);
;// CONCATENATED MODULE: ./src/containers/SearchForm/index.tsx








const SearchForm = ({
  label,
  search,
  onChangeSearch
}) => {
  const router = (0,router_.useRouter)();
  const onSearch = (0,external_react_.useCallback)(e => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {
        search: search,
        pageNo: 1
      }
    }, `/search?search=${search}`);
  }, [router, search]);
  return /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
    children: /*#__PURE__*/jsx_runtime_.jsx("form", {
      onSubmit: onSearch,
      children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(SearchWrapper, {
        children: [/*#__PURE__*/jsx_runtime_.jsx("label", {
          htmlFor: `${label}-search`
        }), /*#__PURE__*/jsx_runtime_.jsx(Input, {
          type: "text",
          id: `${label}-search`,
          value: search,
          onChange: onChangeSearch,
          autoComplete: "off",
          maxLength: 20,
          required: true
        }), /*#__PURE__*/jsx_runtime_.jsx(SearchButton, {
          type: "submit",
          children: /*#__PURE__*/jsx_runtime_.jsx(icons_.SearchOutlined, {})
        })]
      })
    })
  });
};

/* harmony default export */ const containers_SearchForm = (SearchForm);
;// CONCATENATED MODULE: ./src/components/HeaderItem/style.ts

const Li = external_styled_components_default().li.withConfig({
  displayName: "style__Li",
  componentId: "sc-1idsbgj-0"
})(["", "{& a{display:block;width:100%;padding:5px 0 0;}}"], ({
  theme
}) => theme.window.tablet);
;// CONCATENATED MODULE: ./src/components/HeaderItem/index.tsx





const HeadItem = ({
  title,
  contentTypeId
}) => {
  return /*#__PURE__*/jsx_runtime_.jsx(Li, {
    children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
      href: {
        pathname: '/tour',
        query: {
          title,
          contentTypeId
        }
      },
      as: `/tour?title=${title}&contentTypeId=${contentTypeId}`,
      children: /*#__PURE__*/jsx_runtime_.jsx("a", {
        children: title
      })
    })
  });
};

/* harmony default export */ const HeaderItem = (HeadItem);
// EXTERNAL MODULE: ./utils/useToggle.ts
var useToggle = __webpack_require__(605);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
// EXTERNAL MODULE: ./utils/useInput.ts
var useInput = __webpack_require__(2554);
;// CONCATENATED MODULE: ./src/containers/Navbar/index.tsx
















const Navbar = () => {
  const [toggle, toggleHanburger, setToggle] = (0,useToggle/* default */.Z)(false);
  const {
    me
  } = (0,external_react_redux_.useSelector)(state => state.user);
  const [search, onChangeSearch] = (0,useInput/* default */.Z)('');
  const dispatch = (0,external_react_redux_.useDispatch)();
  const onClickLogout = external_react_.useCallback(() => {
    dispatch(user/* logoutAsync.request */.jB.request());
    setToggle(false);
  }, [dispatch, setToggle]);
  const closeHamburger = external_react_.useCallback(() => {
    setToggle(false);
  }, [setToggle]);

  const menu = /*#__PURE__*/(0,jsx_runtime_.jsxs)(external_antd_.Menu, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(external_antd_.Menu.Item, {
      children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
        href: "/profile",
        children: /*#__PURE__*/jsx_runtime_.jsx("a", {
          children: "\uB0B4\uC815\uBCF4"
        })
      })
    }, "내정보"), /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Menu.Item, {
      onClick: onClickLogout,
      children: "\uB85C\uADF8\uC544\uC6C3"
    }, "로그아웃")]
  });

  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(Wrapper, {
    children: [/*#__PURE__*/(0,jsx_runtime_.jsxs)(NavbarWrapper, {
      children: [/*#__PURE__*/jsx_runtime_.jsx(Logo, {
        onClick: closeHamburger,
        children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
          href: "/",
          children: /*#__PURE__*/jsx_runtime_.jsx("a", {
            children: /*#__PURE__*/jsx_runtime_.jsx(next_image.default, {
              src: "/logo.png",
              width: 137,
              height: 60,
              alt: "\uC5B4\uB514\uAC08\uB798",
              priority: true
            })
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(Category, {
        toggle: toggle,
        onClick: toggleHanburger,
        children: /*#__PURE__*/(0,jsx_runtime_.jsxs)(Ul, {
          children: [/*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uAD00\uAD11\uC9C0",
            contentTypeId: 12
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uBB38\uD654\uC2DC\uC124",
            contentTypeId: 14
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uCD95\uC81C",
            contentTypeId: 15
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uCF54\uC2A4",
            contentTypeId: 25
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uB808\uD3EC\uCE20",
            contentTypeId: 28
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uC219\uBC15",
            contentTypeId: 32
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uC1FC\uD551",
            contentTypeId: 38
          }), /*#__PURE__*/jsx_runtime_.jsx(HeaderItem, {
            title: "\uC2DD\uB2F9",
            contentTypeId: 39
          })]
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(Search, {
        children: /*#__PURE__*/jsx_runtime_.jsx(containers_SearchForm, {
          label: "pc",
          search: search,
          onChangeSearch: onChangeSearch
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(Account, {
        toggle: toggle,
        children: me ? /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
          children: /*#__PURE__*/jsx_runtime_.jsx(external_antd_.Dropdown, {
            overlay: menu,
            children: /*#__PURE__*/jsx_runtime_.jsx(MyAvatar, {
              size: 40,
              children: me.nickname.slice(0, 2)
            })
          })
        }) : /*#__PURE__*/jsx_runtime_.jsx(jsx_runtime_.Fragment, {
          children: /*#__PURE__*/jsx_runtime_.jsx(next_link.default, {
            href: "/login",
            passHref: true,
            children: /*#__PURE__*/jsx_runtime_.jsx("a", {
              onClick: closeHamburger,
              children: /*#__PURE__*/jsx_runtime_.jsx(icons_.UserOutlined, {})
            })
          })
        })
      }), /*#__PURE__*/jsx_runtime_.jsx(HamburgerMenu, {
        children: /*#__PURE__*/jsx_runtime_.jsx(icons_.MenuOutlined, {
          onClick: toggleHanburger
        })
      })]
    }), /*#__PURE__*/jsx_runtime_.jsx(MobileSearch, {
      onClick: closeHamburger,
      children: /*#__PURE__*/jsx_runtime_.jsx(containers_SearchForm, {
        label: "mobile",
        search: search,
        onChangeSearch: onChangeSearch
      })
    })]
  });
};

/* harmony default export */ const containers_Navbar = (Navbar);
;// CONCATENATED MODULE: ./src/components/Layout/style.ts

const MainWrapper = external_styled_components_default().div.withConfig({
  displayName: "style__MainWrapper",
  componentId: "sc-1bhphfu-0"
})(["width:1300px;margin:0 auto;", "{width:100%;}", "{}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.laptop);
;// CONCATENATED MODULE: ./src/components/Layout/index.tsx








const Layout = ({
  children
}) => {
  return /*#__PURE__*/(0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
    children: [/*#__PURE__*/jsx_runtime_.jsx(containers_Navbar, {}), /*#__PURE__*/jsx_runtime_.jsx(MainWrapper, {
      children: children
    }), /*#__PURE__*/jsx_runtime_.jsx(Footer/* default */.Z, {})]
  });
};

/* harmony default export */ const components_Layout = (Layout);

/***/ }),

/***/ 605:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9297);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


function useToggle(initialValue) {
  const {
    0: value,
    1: setValue
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(initialValue);
  const onToggle = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(() => {
    setValue(value => !value);
  }, []);
  return [value, onToggle, setValue];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useToggle);

/***/ })

};
;