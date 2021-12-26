(() => {
var exports = {};
exports.id = "pages/detail/[...id]";
exports.ids = ["pages/detail/[...id]"];
exports.modules = {

/***/ "./node_modules/next/dist/client/image.js":
/*!************************************************!*\
  !*** ./node_modules/next/dist/client/image.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = Image1;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _head = _interopRequireDefault(__webpack_require__(/*! ../shared/lib/head */ "../shared/lib/head"));

var _toBase64 = __webpack_require__(/*! ../shared/lib/to-base-64 */ "../shared/lib/to-base-64");

var _imageConfig = __webpack_require__(/*! ../server/image-config */ "../server/image-config");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

const loadedImageURLs = new Set();

if (true) {
  global.__NEXT_IMAGE_IMPORTED = true;
}

const VALID_LOADING_VALUES = ['lazy', 'eager', undefined];
const loaders = new Map([['default', defaultLoader], ['imgix', imgixLoader], ['cloudinary', cloudinaryLoader], ['akamai', akamaiLoader], ['custom', customLoader]]);
const VALID_LAYOUT_VALUES = ['fill', 'fixed', 'intrinsic', 'responsive', undefined];

function isStaticRequire(src) {
  return src.default !== undefined;
}

function isStaticImageData(src) {
  return src.src !== undefined;
}

function isStaticImport(src) {
  return typeof src === 'object' && (isStaticRequire(src) || isStaticImageData(src));
}

const {
  deviceSizes: configDeviceSizes,
  imageSizes: configImageSizes,
  loader: configLoader,
  path: configPath,
  domains: configDomains
} = {"deviceSizes":[640,750,828,1080,1200,1920,2048,3840],"imageSizes":[16,32,48,64,96,128,256,384],"path":"/_next/image","loader":"default","domains":["tong.visitkorea.or.kr"]} || _imageConfig.imageConfigDefault; // sort smallest to largest

const allSizes = [...configDeviceSizes, ...configImageSizes];
configDeviceSizes.sort((a, b) => a - b);
allSizes.sort((a, b) => a - b);

function getWidths(width, layout, sizes) {
  if (sizes && (layout === 'fill' || layout === 'responsive')) {
    // Find all the "vw" percent sizes used in the sizes prop
    const viewportWidthRe = /(^|\s)(1?\d?\d)vw/g;
    const percentSizes = [];

    for (let match; match = viewportWidthRe.exec(sizes); match) {
      percentSizes.push(parseInt(match[2]));
    }

    if (percentSizes.length) {
      const smallestRatio = Math.min(...percentSizes) * 0.01;
      return {
        widths: allSizes.filter(s => s >= configDeviceSizes[0] * smallestRatio),
        kind: 'w'
      };
    }

    return {
      widths: allSizes,
      kind: 'w'
    };
  }

  if (typeof width !== 'number' || layout === 'fill' || layout === 'responsive') {
    return {
      widths: configDeviceSizes,
      kind: 'w'
    };
  }

  const widths = [...new Set( // > This means that most OLED screens that say they are 3x resolution,
  // > are actually 3x in the green color, but only 1.5x in the red and
  // > blue colors. Showing a 3x resolution image in the app vs a 2x
  // > resolution image will be visually the same, though the 3x image
  // > takes significantly more data. Even true 3x resolution screens are
  // > wasteful as the human eye cannot see that level of detail without
  // > something like a magnifying glass.
  // https://blog.twitter.com/engineering/en_us/topics/infrastructure/2019/capping-image-fidelity-on-ultra-high-resolution-devices.html
  [width, width * 2
  /*, width * 3*/
  ].map(w => allSizes.find(p => p >= w) || allSizes[allSizes.length - 1]))];
  return {
    widths,
    kind: 'x'
  };
}

function generateImgAttrs({
  src,
  unoptimized,
  layout,
  width,
  quality,
  sizes,
  loader
}) {
  if (unoptimized) {
    return {
      src,
      srcSet: undefined,
      sizes: undefined
    };
  }

  const {
    widths,
    kind
  } = getWidths(width, layout, sizes);
  const last = widths.length - 1;
  return {
    sizes: !sizes && kind === 'w' ? '100vw' : sizes,
    srcSet: widths.map((w, i) => `${loader({
      src,
      quality,
      width: w
    })} ${kind === 'w' ? w : i + 1}${kind}`).join(', '),
    // It's intended to keep `src` the last attribute because React updates
    // attributes in order. If we keep `src` the first one, Safari will
    // immediately start to fetch `src`, before `sizes` and `srcSet` are even
    // updated by React. That causes multiple unnecessary requests if `srcSet`
    // and `sizes` are defined.
    // This bug cannot be reproduced in Chrome or Firefox.
    src: loader({
      src,
      quality,
      width: widths[last]
    })
  };
}

function getInt(x) {
  if (typeof x === 'number') {
    return x;
  }

  if (typeof x === 'string') {
    return parseInt(x, 10);
  }

  return undefined;
}

function defaultImageLoader(loaderProps) {
  const load = loaders.get(configLoader);

  if (load) {
    return load(_objectSpread({
      root: configPath
    }, loaderProps));
  }

  throw new Error(`Unknown "loader" found in "next.config.js". Expected: ${_imageConfig.VALID_LOADERS.join(', ')}. Received: ${configLoader}`);
} // See https://stackoverflow.com/q/39777833/266535 for why we use this ref
// handler instead of the img's onLoad attribute.


function handleLoading(img, src, layout, placeholder, onLoadingComplete) {
  if (!img) {
    return;
  }

  const handleLoad = () => {
    if (!img.src.startsWith('data:')) {
      const p = 'decode' in img ? img.decode() : Promise.resolve();
      p.catch(() => {}).then(() => {
        if (placeholder === 'blur') {
          img.style.filter = 'none';
          img.style.backgroundSize = 'none';
          img.style.backgroundImage = 'none';
        }

        loadedImageURLs.add(src);

        if (onLoadingComplete) {
          const {
            naturalWidth,
            naturalHeight
          } = img; // Pass back read-only primitive values but not the
          // underlying DOM element because it could be misused.

          onLoadingComplete({
            naturalWidth,
            naturalHeight
          });
        }

        if (true) {
          var ref;

          if ((ref = img.parentElement) === null || ref === void 0 ? void 0 : ref.parentElement) {
            const parent = getComputedStyle(img.parentElement.parentElement);

            if (layout === 'responsive' && parent.display === 'flex') {
              console.warn(`Image with src "${src}" may not render properly as a child of a flex container. Consider wrapping the image with a div to configure the width.`);
            } else if (layout === 'fill' && parent.position !== 'relative') {
              console.warn(`Image with src "${src}" may not render properly with a parent using position:"${parent.position}". Consider changing the parent style to position:"relative" with a width and height.`);
            }
          }
        }
      });
    }
  };

  if (img.complete) {
    // If the real image fails to load, this will still remove the placeholder.
    // This is the desired behavior for now, and will be revisited when error
    // handling is worked on for the image component itself.
    handleLoad();
  } else {
    img.onload = handleLoad;
  }
}

function Image1(_param) {
  var {
    src,
    sizes,
    unoptimized = false,
    priority = false,
    loading,
    lazyBoundary = '200px',
    className,
    quality,
    width,
    height,
    objectFit,
    objectPosition,
    onLoadingComplete,
    loader = defaultImageLoader,
    placeholder = 'empty',
    blurDataURL
  } = _param,
      all = _objectWithoutProperties(_param, ["src", "sizes", "unoptimized", "priority", "loading", "lazyBoundary", "className", "quality", "width", "height", "objectFit", "objectPosition", "onLoadingComplete", "loader", "placeholder", "blurDataURL"]);

  let rest = all;
  let layout = sizes ? 'responsive' : 'intrinsic';

  if ('layout' in rest) {
    // Override default layout if the user specified one:
    if (rest.layout) layout = rest.layout; // Remove property so it's not spread into image:

    delete rest['layout'];
  }

  let staticSrc = '';

  if (isStaticImport(src)) {
    const staticImageData = isStaticRequire(src) ? src.default : src;

    if (!staticImageData.src) {
      throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(staticImageData)}`);
    }

    blurDataURL = blurDataURL || staticImageData.blurDataURL;
    staticSrc = staticImageData.src;

    if (!layout || layout !== 'fill') {
      height = height || staticImageData.height;
      width = width || staticImageData.width;

      if (!staticImageData.height || !staticImageData.width) {
        throw new Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(staticImageData)}`);
      }
    }
  }

  src = typeof src === 'string' ? src : staticSrc;
  const widthInt = getInt(width);
  const heightInt = getInt(height);
  const qualityInt = getInt(quality);
  let isLazy = !priority && (loading === 'lazy' || typeof loading === 'undefined');

  if (src.startsWith('data:') || src.startsWith('blob:')) {
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
    unoptimized = true;
    isLazy = false;
  }

  if (false) {}

  if (true) {
    if (!src) {
      throw new Error(`Image is missing required "src" property. Make sure you pass "src" in props to the \`next/image\` component. Received: ${JSON.stringify({
        width,
        height,
        quality
      })}`);
    }

    if (!VALID_LAYOUT_VALUES.includes(layout)) {
      throw new Error(`Image with src "${src}" has invalid "layout" property. Provided "${layout}" should be one of ${VALID_LAYOUT_VALUES.map(String).join(',')}.`);
    }

    if (typeof widthInt !== 'undefined' && isNaN(widthInt) || typeof heightInt !== 'undefined' && isNaN(heightInt)) {
      throw new Error(`Image with src "${src}" has invalid "width" or "height" property. These should be numeric values.`);
    }

    if (layout === 'fill' && (width || height)) {
      console.warn(`Image with src "${src}" and "layout='fill'" has unused properties assigned. Please remove "width" and "height".`);
    }

    if (!VALID_LOADING_VALUES.includes(loading)) {
      throw new Error(`Image with src "${src}" has invalid "loading" property. Provided "${loading}" should be one of ${VALID_LOADING_VALUES.map(String).join(',')}.`);
    }

    if (priority && loading === 'lazy') {
      throw new Error(`Image with src "${src}" has both "priority" and "loading='lazy'" properties. Only one should be used.`);
    }

    if (placeholder === 'blur') {
      if (layout !== 'fill' && (widthInt || 0) * (heightInt || 0) < 1600) {
        console.warn(`Image with src "${src}" is smaller than 40x40. Consider removing the "placeholder='blur'" property to improve performance.`);
      }

      if (!blurDataURL) {
        const VALID_BLUR_EXT = ['jpeg', 'png', 'webp'] // should match next-image-loader
        ;
        throw new Error(`Image with src "${src}" has "placeholder='blur'" property but is missing the "blurDataURL" property.
          Possible solutions:
            - Add a "blurDataURL" property, the contents should be a small Data URL to represent the image
            - Change the "src" property to a static import with one of the supported file types: ${VALID_BLUR_EXT.join(',')}
            - Remove the "placeholder" property, effectively no blur effect
          Read more: https://nextjs.org/docs/messages/placeholder-blur-data-url`);
      }
    }

    if ('ref' in rest) {
      console.warn(`Image with src "${src}" is using unsupported "ref" property. Consider using the "onLoadingComplete" property instead.`);
    }

    if ('style' in rest) {
      console.warn(`Image with src "${src}" is using unsupported "style" property. Please use the "className" property instead.`);
    }

    const rand = Math.floor(Math.random() * 1000) + 100;

    if (!unoptimized && !loader({
      src,
      width: rand,
      quality: 75
    }).includes(rand.toString())) {
      console.warn(`Image with src "${src}" has a "loader" property that does not implement width. Please implement it or use the "unoptimized" property instead.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader-width`);
    }
  }

  const [setRef, isIntersected] = (0, _useIntersection).useIntersection({
    rootMargin: lazyBoundary,
    disabled: !isLazy
  });
  const isVisible = !isLazy || isIntersected;
  let wrapperStyle;
  let sizerStyle;
  let sizerSvg;
  let imgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    boxSizing: 'border-box',
    padding: 0,
    border: 'none',
    margin: 'auto',
    display: 'block',
    width: 0,
    height: 0,
    minWidth: '100%',
    maxWidth: '100%',
    minHeight: '100%',
    maxHeight: '100%',
    objectFit,
    objectPosition
  };
  const blurStyle = placeholder === 'blur' ? {
    filter: 'blur(20px)',
    backgroundSize: objectFit || 'cover',
    backgroundImage: `url("${blurDataURL}")`,
    backgroundPosition: objectPosition || '0% 0%'
  } : {};

  if (layout === 'fill') {
    // <Image src="i.png" layout="fill" />
    wrapperStyle = {
      display: 'block',
      overflow: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      boxSizing: 'border-box',
      margin: 0
    };
  } else if (typeof widthInt !== 'undefined' && typeof heightInt !== 'undefined') {
    // <Image src="i.png" width="100" height="100" />
    const quotient = heightInt / widthInt;
    const paddingTop = isNaN(quotient) ? '100%' : `${quotient * 100}%`;

    if (layout === 'responsive') {
      // <Image src="i.png" width="100" height="100" layout="responsive" />
      wrapperStyle = {
        display: 'block',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        display: 'block',
        boxSizing: 'border-box',
        paddingTop
      };
    } else if (layout === 'intrinsic') {
      // <Image src="i.png" width="100" height="100" layout="intrinsic" />
      wrapperStyle = {
        display: 'inline-block',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        margin: 0
      };
      sizerStyle = {
        boxSizing: 'border-box',
        display: 'block',
        maxWidth: '100%'
      };
      sizerSvg = `<svg width="${widthInt}" height="${heightInt}" xmlns="http://www.w3.org/2000/svg" version="1.1"/>`;
    } else if (layout === 'fixed') {
      // <Image src="i.png" width="100" height="100" layout="fixed" />
      wrapperStyle = {
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'inline-block',
        position: 'relative',
        width: widthInt,
        height: heightInt
      };
    }
  } else {
    // <Image src="i.png" />
    if (true) {
      throw new Error(`Image with src "${src}" must use "width" and "height" properties or "layout='fill'" property.`);
    }
  }

  let imgAttributes = {
    src: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
    srcSet: undefined,
    sizes: undefined
  };

  if (isVisible) {
    imgAttributes = generateImgAttrs({
      src,
      unoptimized,
      layout,
      width: widthInt,
      quality: qualityInt,
      sizes,
      loader
    });
  }

  let srcString = src;
  return /*#__PURE__*/_react.default.createElement("div", {
    style: wrapperStyle
  }, sizerStyle ? /*#__PURE__*/_react.default.createElement("div", {
    style: sizerStyle
  }, sizerSvg ? /*#__PURE__*/_react.default.createElement("img", {
    style: {
      maxWidth: '100%',
      display: 'block',
      margin: 0,
      border: 'none',
      padding: 0
    },
    alt: "",
    "aria-hidden": true,
    src: `data:image/svg+xml;base64,${(0, _toBase64).toBase64(sizerSvg)}`
  }) : null) : null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, imgAttributes, {
    decoding: "async",
    "data-nimg": layout,
    className: className,
    ref: img => {
      setRef(img);
      handleLoading(img, srcString, layout, placeholder, onLoadingComplete);
    },
    style: _objectSpread({}, imgStyle, blurStyle)
  })), /*#__PURE__*/_react.default.createElement("noscript", null, /*#__PURE__*/_react.default.createElement("img", Object.assign({}, rest, generateImgAttrs({
    src,
    unoptimized,
    layout,
    width: widthInt,
    quality: qualityInt,
    sizes,
    loader
  }), {
    decoding: "async",
    "data-nimg": layout,
    style: imgStyle,
    className: className,
    loading: loading || 'lazy'
  }))), priority ? // Note how we omit the `href` attribute, as it would only be relevant
  // for browsers that do not support `imagesrcset`, and in those cases
  // it would likely cause the incorrect image to be preloaded.
  //
  // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset

  /*#__PURE__*/
  _react.default.createElement(_head.default, null, /*#__PURE__*/_react.default.createElement("link", {
    key: '__nimg-' + imgAttributes.src + imgAttributes.srcSet + imgAttributes.sizes,
    rel: "preload",
    as: "image",
    href: imgAttributes.srcSet ? undefined : imgAttributes.src,
    // @ts-ignore: imagesrcset is not yet in the link element type.
    imagesrcset: imgAttributes.srcSet,
    // @ts-ignore: imagesizes is not yet in the link element type.
    imagesizes: imgAttributes.sizes
  })) : null);
}

function normalizeSrc(src) {
  return src[0] === '/' ? src.slice(1) : src;
}

function imgixLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://static.imgix.net/daisy.png?auto=format&fit=max&w=300
  const url = new URL(`${root}${normalizeSrc(src)}`);
  const params = url.searchParams;
  params.set('auto', params.get('auto') || 'format');
  params.set('fit', params.get('fit') || 'max');
  params.set('w', params.get('w') || width.toString());

  if (quality) {
    params.set('q', quality.toString());
  }

  return url.href;
}

function akamaiLoader({
  root,
  src,
  width
}) {
  return `${root}${normalizeSrc(src)}?imwidth=${width}`;
}

function cloudinaryLoader({
  root,
  src,
  width,
  quality
}) {
  // Demo: https://res.cloudinary.com/demo/image/upload/w_300,c_limit,q_auto/turtles.jpg
  const params = ['f_auto', 'c_limit', 'w_' + width, 'q_' + (quality || 'auto')];
  let paramsString = params.join(',') + '/';
  return `${root}${paramsString}${normalizeSrc(src)}`;
}

function customLoader({
  src
}) {
  throw new Error(`Image with src "${src}" is missing "loader" prop.` + `\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader`);
}

function defaultLoader({
  root,
  src,
  width,
  quality
}) {
  if (true) {
    const missingValues = []; // these should always be provided but make sure they are

    if (!src) missingValues.push('src');
    if (!width) missingValues.push('width');

    if (missingValues.length > 0) {
      throw new Error(`Next Image Optimization requires ${missingValues.join(', ')} to be provided. Make sure you pass them as props to the \`next/image\` component. Received: ${JSON.stringify({
        src,
        width,
        quality
      })}`);
    }

    if (src.startsWith('//')) {
      throw new Error(`Failed to parse src "${src}" on \`next/image\`, protocol-relative URL (//) must be changed to an absolute URL (http:// or https://)`);
    }

    if (!src.startsWith('/') && configDomains) {
      let parsedSrc;

      try {
        parsedSrc = new URL(src);
      } catch (err) {
        console.error(err);
        throw new Error(`Failed to parse src "${src}" on \`next/image\`, if using relative image it must start with a leading slash "/" or be an absolute URL (http:// or https://)`);
      }

      if ( true && !configDomains.includes(parsedSrc.hostname)) {
        throw new Error(`Invalid src prop (${src}) on \`next/image\`, hostname "${parsedSrc.hostname}" is not configured under images in your \`next.config.js\`\n` + `See more info: https://nextjs.org/docs/messages/next-image-unconfigured-host`);
      }
    }
  }

  return `${root}?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}

/***/ }),

/***/ "./node_modules/next/dist/client/link.js":
/*!***********************************************!*\
  !*** ./node_modules/next/dist/client/link.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ../shared/lib/router/router */ "./node_modules/next/dist/shared/lib/router/router.js");

var _router1 = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

var _useIntersection = __webpack_require__(/*! ./use-intersection */ "./node_modules/next/dist/client/use-intersection.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const prefetched = {};

function prefetch(router, href, as, options) {
  if (true) return;
  if (!(0, _router).isLocalURL(href)) return; // Prefetch the JSON page if asked (only in the client)
  // We need to handle a prefetch error here since we may be
  // loading with priority which can reject but we don't
  // want to force navigation since this is only a prefetch

  router.prefetch(href, as, options).catch(err => {
    if (true) {
      // rethrow to show invalid URL errors
      throw err;
    }
  });
  const curLocale = options && typeof options.locale !== 'undefined' ? options.locale : router && router.locale; // Join on an invalid URI character

  prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')] = true;
}

function isModifiedEvent(event) {
  const {
    target
  } = event.currentTarget;
  return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
}

function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
  const {
    nodeName
  } = e.currentTarget;

  if (nodeName === 'A' && (isModifiedEvent(e) || !(0, _router).isLocalURL(href))) {
    // ignore click for browser’s default behavior
    return;
  }

  e.preventDefault(); //  avoid scroll for urls with anchor refs

  if (scroll == null && as.indexOf('#') >= 0) {
    scroll = false;
  } // replace state instead of push if prop is present


  router[replace ? 'replace' : 'push'](href, as, {
    shallow,
    locale,
    scroll
  });
}

function Link(props) {
  if (true) {
    function createPropError(args) {
      return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + ( false ? 0 : ''));
    } // TypeScript trick for type-guarding:


    const requiredPropsGuard = {
      href: true
    };
    const requiredProps = Object.keys(requiredPropsGuard);
    requiredProps.forEach(key => {
      if (key === 'href') {
        if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: props[key] === null ? 'null' : typeof props[key]
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // TypeScript trick for type-guarding:

    const optionalPropsGuard = {
      as: true,
      replace: true,
      scroll: true,
      shallow: true,
      passHref: true,
      prefetch: true,
      locale: true
    };
    const optionalProps = Object.keys(optionalPropsGuard);
    optionalProps.forEach(key => {
      const valType = typeof props[key];

      if (key === 'as') {
        if (props[key] && valType !== 'string' && valType !== 'object') {
          throw createPropError({
            key,
            expected: '`string` or `object`',
            actual: valType
          });
        }
      } else if (key === 'locale') {
        if (props[key] && valType !== 'string') {
          throw createPropError({
            key,
            expected: '`string`',
            actual: valType
          });
        }
      } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch') {
        if (props[key] != null && valType !== 'boolean') {
          throw createPropError({
            key,
            expected: '`boolean`',
            actual: valType
          });
        }
      } else {
        // TypeScript trick for type-guarding:
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _ = key;
      }
    }); // This hook is in a conditional but that is ok because `process.env.NODE_ENV` never changes
    // eslint-disable-next-line react-hooks/rules-of-hooks

    const hasWarned = _react.default.useRef(false);

    if (props.prefetch && !hasWarned.current) {
      hasWarned.current = true;
      console.warn('Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://nextjs.org/docs/messages/prefetch-true-deprecated');
    }
  }

  const p = props.prefetch !== false;
  const router = (0, _router1).useRouter();

  const {
    href,
    as
  } = _react.default.useMemo(() => {
    const [resolvedHref, resolvedAs] = (0, _router).resolveHref(router, props.href, true);
    return {
      href: resolvedHref,
      as: props.as ? (0, _router).resolveHref(router, props.as) : resolvedAs || resolvedHref
    };
  }, [router, props.href, props.as]);

  let {
    children,
    replace,
    shallow,
    scroll,
    locale
  } = props; // Deprecated. Warning shown by propType check. If the children provided is a string (<Link>example</Link>) we wrap it in an <a> tag

  if (typeof children === 'string') {
    children = /*#__PURE__*/_react.default.createElement("a", null, children);
  } // This will return the first child, if multiple are provided it will throw an error


  let child;

  if (true) {
    try {
      child = _react.default.Children.only(children);
    } catch (err) {
      throw new Error(`Multiple children were passed to <Link> with \`href\` of \`${props.href}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + ( false ? 0 : ''));
    }
  } else {}

  const childRef = child && typeof child === 'object' && child.ref;
  const [setIntersectionRef, isVisible] = (0, _useIntersection).useIntersection({
    rootMargin: '200px'
  });

  const setRef = _react.default.useCallback(el => {
    setIntersectionRef(el);

    if (childRef) {
      if (typeof childRef === 'function') childRef(el);else if (typeof childRef === 'object') {
        childRef.current = el;
      }
    }
  }, [childRef, setIntersectionRef]);

  _react.default.useEffect(() => {
    const shouldPrefetch = isVisible && p && (0, _router).isLocalURL(href);
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale;
    const isPrefetched = prefetched[href + '%' + as + (curLocale ? '%' + curLocale : '')];

    if (shouldPrefetch && !isPrefetched) {
      prefetch(router, href, as, {
        locale: curLocale
      });
    }
  }, [as, href, isVisible, locale, p, router]);

  const childProps = {
    ref: setRef,
    onClick: e => {
      if (child.props && typeof child.props.onClick === 'function') {
        child.props.onClick(e);
      }

      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }
  };

  childProps.onMouseEnter = e => {
    if (!(0, _router).isLocalURL(href)) return;

    if (child.props && typeof child.props.onMouseEnter === 'function') {
      child.props.onMouseEnter(e);
    }

    prefetch(router, href, as, {
      priority: true
    });
  }; // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
  // defined, we specify the current 'href', so that repetition is not needed by the user


  if (props.passHref || child.type === 'a' && !('href' in child.props)) {
    const curLocale = typeof locale !== 'undefined' ? locale : router && router.locale; // we only render domain locales if we are currently on a domain locale
    // so that locale links are still visitable in development/preview envs

    const localeDomain = router && router.isLocaleDomain && (0, _router).getDomainLocale(as, curLocale, router && router.locales, router && router.domainLocales);
    childProps.href = localeDomain || (0, _router).addBasePath((0, _router).addLocale(as, curLocale, router && router.defaultLocale));
  }

  return /*#__PURE__*/_react.default.cloneElement(child, childProps);
}

var _default = Link;
exports.default = _default;

/***/ }),

/***/ "./node_modules/next/dist/client/normalize-trailing-slash.js":
/*!*******************************************************************!*\
  !*** ./node_modules/next/dist/client/normalize-trailing-slash.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.removePathTrailingSlash = removePathTrailingSlash;
exports.normalizePathTrailingSlash = void 0;

function removePathTrailingSlash(path) {
  return path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
}

const normalizePathTrailingSlash =  false ? 0 : removePathTrailingSlash;
exports.normalizePathTrailingSlash = normalizePathTrailingSlash;

/***/ }),

/***/ "./node_modules/next/dist/client/request-idle-callback.js":
/*!****************************************************************!*\
  !*** ./node_modules/next/dist/client/request-idle-callback.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.requestIdleCallback = exports.cancelIdleCallback = void 0;

const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function (cb) {
  let start = Date.now();
  return setTimeout(function () {
    cb({
      didTimeout: false,
      timeRemaining: function () {
        return Math.max(0, 50 - (Date.now() - start));
      }
    });
  }, 1);
};

exports.requestIdleCallback = requestIdleCallback;

const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function (id) {
  return clearTimeout(id);
};

exports.cancelIdleCallback = cancelIdleCallback;

/***/ }),

/***/ "./node_modules/next/dist/client/route-loader.js":
/*!*******************************************************!*\
  !*** ./node_modules/next/dist/client/route-loader.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.markAssetError = markAssetError;
exports.isAssetError = isAssetError;
exports.getClientBuildManifest = getClientBuildManifest;
exports.createRouteLoader = createRouteLoader;

var _getAssetPathFromRoute = _interopRequireDefault(__webpack_require__(/*! ../shared/lib/router/utils/get-asset-path-from-route */ "../shared/lib/router/utils/get-asset-path-from-route"));

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
} // 3.8s was arbitrarily chosen as it's what https://web.dev/interactive
// considers as "Good" time-to-interactive. We must assume something went
// wrong beyond this point, and then fall-back to a full page transition to
// show the user something of value.


const MS_MAX_IDLE_DELAY = 3800;

function withFuture(key, map, generator) {
  let entry = map.get(key);

  if (entry) {
    if ('future' in entry) {
      return entry.future;
    }

    return Promise.resolve(entry);
  }

  let resolver;
  const prom = new Promise(resolve => {
    resolver = resolve;
  });
  map.set(key, entry = {
    resolve: resolver,
    future: prom
  });
  return generator ? generator().then(value => (resolver(value), value)) : prom;
}

function hasPrefetch(link) {
  try {
    link = document.createElement('link');
    return (// detect IE11 since it supports prefetch but isn't detected
      // with relList.support
      !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports('prefetch')
    );
  } catch (e) {
    return false;
  }
}

const canPrefetch = hasPrefetch();

function prefetchViaDom(href, as, link) {
  return new Promise((res, rej) => {
    if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
      return res();
    }

    link = document.createElement('link'); // The order of property assignment here is intentional:

    if (as) link.as = as;
    link.rel = `prefetch`;
    link.crossOrigin = undefined;
    link.onload = res;
    link.onerror = rej; // `href` should always be last:

    link.href = href;
    document.head.appendChild(link);
  });
}

const ASSET_LOAD_ERROR = Symbol('ASSET_LOAD_ERROR');

function markAssetError(err) {
  return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
}

function isAssetError(err) {
  return err && ASSET_LOAD_ERROR in err;
}

function appendScript(src, script) {
  return new Promise((resolve, reject) => {
    script = document.createElement('script'); // The order of property assignment here is intentional.
    // 1. Setup success/failure hooks in case the browser synchronously
    //    executes when `src` is set.

    script.onload = resolve;

    script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`))); // 2. Configure the cross-origin attribute before setting `src` in case the
    //    browser begins to fetch.


    script.crossOrigin = undefined; // 3. Finally, set the source and inject into the DOM in case the child
    //    must be appended for fetching to start.

    script.src = src;
    document.body.appendChild(script);
  });
} // We wait for pages to be built in dev before we start the route transition
// timeout to prevent an un-necessary hard navigation in development.


let devBuildPromise; // Resolve a promise that times out after given amount of milliseconds.

function resolvePromiseWithTimeout(p, ms, err) {
  return new Promise((resolve, reject) => {
    let cancelled = false;
    p.then(r => {
      // Resolved, cancel the timeout
      cancelled = true;
      resolve(r);
    }).catch(reject); // We wrap these checks separately for better dead-code elimination in
    // production bundles.

    if (true) {
      (devBuildPromise || Promise.resolve()).then(() => {
        (0, _requestIdleCallback).requestIdleCallback(() => setTimeout(() => {
          if (!cancelled) {
            reject(err);
          }
        }, ms));
      });
    }

    if (false) {}
  });
}

function getClientBuildManifest() {
  if (self.__BUILD_MANIFEST) {
    return Promise.resolve(self.__BUILD_MANIFEST);
  }

  const onBuildManifest = new Promise(resolve => {
    // Mandatory because this is not concurrent safe:
    const cb = self.__BUILD_MANIFEST_CB;

    self.__BUILD_MANIFEST_CB = () => {
      resolve(self.__BUILD_MANIFEST);
      cb && cb();
    };
  });
  return resolvePromiseWithTimeout(onBuildManifest, MS_MAX_IDLE_DELAY, markAssetError(new Error('Failed to load client build manifest')));
}

function getFilesForRoute(assetPrefix, route) {
  if (true) {
    return Promise.resolve({
      scripts: [assetPrefix + '/_next/static/chunks/pages' + encodeURI((0, _getAssetPathFromRoute).default(route, '.js'))],
      // Styles are handled by `style-loader` in development:
      css: []
    });
  }

  return getClientBuildManifest().then(manifest => {
    if (!(route in manifest)) {
      throw markAssetError(new Error(`Failed to lookup route: ${route}`));
    }

    const allFiles = manifest[route].map(entry => assetPrefix + '/_next/' + encodeURI(entry));
    return {
      scripts: allFiles.filter(v => v.endsWith('.js')),
      css: allFiles.filter(v => v.endsWith('.css'))
    };
  });
}

function createRouteLoader(assetPrefix) {
  const entrypoints = new Map();
  const loadedScripts = new Map();
  const styleSheets = new Map();
  const routes = new Map();

  function maybeExecuteScript(src) {
    let prom = loadedScripts.get(src);

    if (prom) {
      return prom;
    } // Skip executing script if it's already in the DOM:


    if (document.querySelector(`script[src^="${src}"]`)) {
      return Promise.resolve();
    }

    loadedScripts.set(src, prom = appendScript(src));
    return prom;
  }

  function fetchStyleSheet(href) {
    let prom = styleSheets.get(href);

    if (prom) {
      return prom;
    }

    styleSheets.set(href, prom = fetch(href).then(res => {
      if (!res.ok) {
        throw new Error(`Failed to load stylesheet: ${href}`);
      }

      return res.text().then(text => ({
        href: href,
        content: text
      }));
    }).catch(err => {
      throw markAssetError(err);
    }));
    return prom;
  }

  return {
    whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    },

    onEntrypoint(route, execute) {
      Promise.resolve(execute).then(fn => fn()).then(exports => ({
        component: exports && exports.default || exports,
        exports: exports
      }), err => ({
        error: err
      })).then(input => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && 'resolve' in old) old.resolve(input);
      });
    },

    loadRoute(route, prefetch) {
      return withFuture(route, routes, () => {
        const routeFilesPromise = getFilesForRoute(assetPrefix, route).then(({
          scripts,
          css
        }) => {
          return Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
        }).then(res => {
          return this.whenEntrypoint(route).then(entrypoint => ({
            entrypoint,
            styles: res[1]
          }));
        });

        if (true) {
          devBuildPromise = new Promise(resolve => {
            if (routeFilesPromise) {
              return routeFilesPromise.finally(() => {
                resolve();
              });
            }
          });
        }

        return resolvePromiseWithTimeout(routeFilesPromise, MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`))).then(({
          entrypoint,
          styles
        }) => {
          const res = Object.assign({
            styles: styles
          }, entrypoint);
          return 'error' in entrypoint ? entrypoint : res;
        }).catch(err => {
          if (prefetch) {
            // we don't want to cache errors during prefetch
            throw err;
          }

          return {
            error: err
          };
        });
      });
    },

    prefetch(route) {
      // https://github.com/GoogleChromeLabs/quicklink/blob/453a661fa1fa940e2d2e044452398e38c67a98fb/src/index.mjs#L115-L118
      // License: Apache 2.0
      let cn;

      if (cn = navigator.connection) {
        // Don't prefetch if using 2G or if Save-Data is enabled.
        if (cn.saveData || /2g/.test(cn.effectiveType)) return Promise.resolve();
      }

      return getFilesForRoute(assetPrefix, route).then(output => Promise.all(canPrefetch ? output.scripts.map(script => prefetchViaDom(script, 'script')) : [])).then(() => {
        (0, _requestIdleCallback).requestIdleCallback(() => this.loadRoute(route, true).catch(() => {}));
      }).catch( // swallow prefetch errors
      () => {});
    }

  };
}

/***/ }),

/***/ "./node_modules/next/dist/client/router.js":
/*!*************************************************!*\
  !*** ./node_modules/next/dist/client/router.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "Router", ({
  enumerable: true,
  get: function () {
    return _router.default;
  }
}));
Object.defineProperty(exports, "withRouter", ({
  enumerable: true,
  get: function () {
    return _withRouter.default;
  }
}));
exports.useRouter = useRouter;
exports.createRouter = createRouter;
exports.makePublicRouterInstance = makePublicRouterInstance;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = _interopRequireDefault(__webpack_require__(/*! ../shared/lib/router/router */ "./node_modules/next/dist/shared/lib/router/router.js"));

var _routerContext = __webpack_require__(/*! ../shared/lib/router-context */ "../shared/lib/router-context");

var _withRouter = _interopRequireDefault(__webpack_require__(/*! ./with-router */ "./node_modules/next/dist/client/with-router.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

const singletonRouter = {
  router: null,
  readyCallbacks: [],

  ready(cb) {
    if (this.router) return cb();

    if (false) {}
  }

}; // Create public properties and methods of the router in the singletonRouter

const urlPropertyFields = ['pathname', 'route', 'query', 'asPath', 'components', 'isFallback', 'basePath', 'locale', 'locales', 'defaultLocale', 'isReady', 'isPreview', 'isLocaleDomain', 'domainLocales'];
const routerEvents = ['routeChangeStart', 'beforeHistoryChange', 'routeChangeComplete', 'routeChangeError', 'hashChangeStart', 'hashChangeComplete'];
const coreMethodFields = ['push', 'replace', 'reload', 'back', 'prefetch', 'beforePopState']; // Events is a static property on the router, the router doesn't have to be initialized to use it

Object.defineProperty(singletonRouter, 'events', {
  get() {
    return _router.default.events;
  }

});
urlPropertyFields.forEach(field => {
  // Here we need to use Object.defineProperty because we need to return
  // the property assigned to the actual router
  // The value might get changed as we change routes and this is the
  // proper way to access it
  Object.defineProperty(singletonRouter, field, {
    get() {
      const router = getRouter();
      return router[field];
    }

  });
});
coreMethodFields.forEach(field => {
  singletonRouter[field] = (...args) => {
    const router = getRouter();
    return router[field](...args);
  };
});
routerEvents.forEach(event => {
  singletonRouter.ready(() => {
    _router.default.events.on(event, (...args) => {
      const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
      const _singletonRouter = singletonRouter;

      if (_singletonRouter[eventField]) {
        try {
          _singletonRouter[eventField](...args);
        } catch (err) {
          console.error(`Error when running the Router event: ${eventField}`);
          console.error(`${err.message}\n${err.stack}`);
        }
      }
    });
  });
});

function getRouter() {
  if (!singletonRouter.router) {
    const message = 'No router instance found.\n' + 'You should only use "next/router" on the client side of your app.\n';
    throw new Error(message);
  }

  return singletonRouter.router;
}

var _default = singletonRouter;
exports.default = _default;

function useRouter() {
  return _react.default.useContext(_routerContext.RouterContext);
}

function createRouter(...args) {
  singletonRouter.router = new _router.default(...args);
  singletonRouter.readyCallbacks.forEach(cb => cb());
  singletonRouter.readyCallbacks = [];
  return singletonRouter.router;
}

function makePublicRouterInstance(router) {
  const _router1 = router;
  const instance = {};

  for (const property of urlPropertyFields) {
    if (typeof _router1[property] === 'object') {
      instance[property] = Object.assign(Array.isArray(_router1[property]) ? [] : {}, _router1[property]) // makes sure query is not stateful
      ;
      continue;
    }

    instance[property] = _router1[property];
  } // Events is a static property on the router, the router doesn't have to be initialized to use it


  instance.events = _router.default.events;
  coreMethodFields.forEach(field => {
    instance[field] = (...args) => {
      return _router1[field](...args);
    };
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/use-intersection.js":
/*!***********************************************************!*\
  !*** ./node_modules/next/dist/client/use-intersection.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.useIntersection = useIntersection;

var _react = __webpack_require__(/*! react */ "react");

var _requestIdleCallback = __webpack_require__(/*! ./request-idle-callback */ "./node_modules/next/dist/client/request-idle-callback.js");

const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';

function useIntersection({
  rootMargin,
  disabled
}) {
  const isDisabled = disabled || !hasIntersectionObserver;
  const unobserve = (0, _react).useRef();
  const [visible, setVisible] = (0, _react).useState(false);
  const setRef = (0, _react).useCallback(el => {
    if (unobserve.current) {
      unobserve.current();
      unobserve.current = undefined;
    }

    if (isDisabled || visible) return;

    if (el && el.tagName) {
      unobserve.current = observe(el, isVisible => isVisible && setVisible(isVisible), {
        rootMargin
      });
    }
  }, [isDisabled, rootMargin, visible]);
  (0, _react).useEffect(() => {
    if (!hasIntersectionObserver) {
      if (!visible) {
        const idleCallback = (0, _requestIdleCallback).requestIdleCallback(() => setVisible(true));
        return () => (0, _requestIdleCallback).cancelIdleCallback(idleCallback);
      }
    }
  }, [visible]);
  return [setRef, visible];
}

function observe(element, callback, options) {
  const {
    id,
    observer,
    elements
  } = createObserver(options);
  elements.set(element, callback);
  observer.observe(element);
  return function unobserve() {
    elements.delete(element);
    observer.unobserve(element); // Destroy observer when there's nothing left to watch:

    if (elements.size === 0) {
      observer.disconnect();
      observers.delete(id);
    }
  };
}

const observers = new Map();

function createObserver(options) {
  const id = options.rootMargin || '';
  let instance = observers.get(id);

  if (instance) {
    return instance;
  }

  const elements = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const callback = elements.get(entry.target);
      const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;

      if (callback && isVisible) {
        callback(isVisible);
      }
    });
  }, options);
  observers.set(id, instance = {
    id,
    observer,
    elements
  });
  return instance;
}

/***/ }),

/***/ "./node_modules/next/dist/client/with-router.js":
/*!******************************************************!*\
  !*** ./node_modules/next/dist/client/with-router.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = withRouter;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _router = __webpack_require__(/*! ./router */ "./node_modules/next/dist/client/router.js");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function withRouter(ComposedComponent) {
  function WithRouterWrapper(props) {
    return /*#__PURE__*/_react.default.createElement(ComposedComponent, Object.assign({
      router: (0, _router).useRouter()
    }, props));
  }

  WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
  WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;

  if (true) {
    const name = ComposedComponent.displayName || ComposedComponent.name || 'Unknown';
    WithRouterWrapper.displayName = `withRouter(${name})`;
  }

  return WithRouterWrapper;
}

/***/ }),

/***/ "./node_modules/next/dist/shared/lib/router/router.js":
/*!************************************************************!*\
  !*** ./node_modules/next/dist/shared/lib/router/router.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getDomainLocale = getDomainLocale;
exports.addLocale = addLocale;
exports.delLocale = delLocale;
exports.hasBasePath = hasBasePath;
exports.addBasePath = addBasePath;
exports.delBasePath = delBasePath;
exports.isLocalURL = isLocalURL;
exports.interpolateAs = interpolateAs;
exports.resolveHref = resolveHref;
exports.default = void 0;

var _normalizeTrailingSlash = __webpack_require__(/*! ../../../client/normalize-trailing-slash */ "./node_modules/next/dist/client/normalize-trailing-slash.js");

var _routeLoader = __webpack_require__(/*! ../../../client/route-loader */ "./node_modules/next/dist/client/route-loader.js");

var _denormalizePagePath = __webpack_require__(/*! ../../../server/denormalize-page-path */ "../../../server/denormalize-page-path");

var _normalizeLocalePath = __webpack_require__(/*! ../i18n/normalize-locale-path */ "../i18n/normalize-locale-path");

var _mitt = _interopRequireDefault(__webpack_require__(/*! ../mitt */ "../mitt"));

var _utils = __webpack_require__(/*! ../utils */ "../shared/lib/utils");

var _isDynamic = __webpack_require__(/*! ./utils/is-dynamic */ "./utils/is-dynamic");

var _parseRelativeUrl = __webpack_require__(/*! ./utils/parse-relative-url */ "./utils/parse-relative-url");

var _querystring = __webpack_require__(/*! ./utils/querystring */ "./utils/querystring");

var _resolveRewrites = _interopRequireDefault(__webpack_require__(/*! ./utils/resolve-rewrites */ "?5c99"));

var _routeMatcher = __webpack_require__(/*! ./utils/route-matcher */ "./utils/route-matcher");

var _routeRegex = __webpack_require__(/*! ./utils/route-regex */ "./utils/route-regex");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

let detectDomainLocale;

if (false) {}

const basePath =  false || '';

function buildCancellationError() {
  return Object.assign(new Error('Route Cancelled'), {
    cancelled: true
  });
}

function addPathPrefix(path, prefix) {
  return prefix && path.startsWith('/') ? path === '/' ? (0, _normalizeTrailingSlash).normalizePathTrailingSlash(prefix) : `${prefix}${pathNoQueryHash(path) === '/' ? path.substring(1) : path}` : path;
}

function getDomainLocale(path, locale, locales, domainLocales) {
  if (false) {} else {
    return false;
  }
}

function addLocale(path, locale, defaultLocale) {
  if (false) {}

  return path;
}

function delLocale(path, locale) {
  if (false) {}

  return path;
}

function pathNoQueryHash(path) {
  const queryIndex = path.indexOf('?');
  const hashIndex = path.indexOf('#');

  if (queryIndex > -1 || hashIndex > -1) {
    path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
  }

  return path;
}

function hasBasePath(path) {
  path = pathNoQueryHash(path);
  return path === basePath || path.startsWith(basePath + '/');
}

function addBasePath(path) {
  // we only add the basepath on relative urls
  return addPathPrefix(path, basePath);
}

function delBasePath(path) {
  path = path.slice(basePath.length);
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}

function isLocalURL(url) {
  // prevent a hydration mismatch on href for url with anchor refs
  if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) return true;

  try {
    // absolute urls can be local if they are on the same origin
    const locationOrigin = (0, _utils).getLocationOrigin();
    const resolved = new URL(url, locationOrigin);
    return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
  } catch (_) {
    return false;
  }
}

function interpolateAs(route, asPathname, query) {
  let interpolatedRoute = '';
  const dynamicRegex = (0, _routeRegex).getRouteRegex(route);
  const dynamicGroups = dynamicRegex.groups;
  const dynamicMatches = // Try to match the dynamic route against the asPath
  (asPathname !== route ? (0, _routeMatcher).getRouteMatcher(dynamicRegex)(asPathname) : '') || // Fall back to reading the values from the href
  // TODO: should this take priority; also need to change in the router.
  query;
  interpolatedRoute = route;
  const params = Object.keys(dynamicGroups);

  if (!params.every(param => {
    let value = dynamicMatches[param] || '';
    const {
      repeat,
      optional
    } = dynamicGroups[param]; // support single-level catch-all
    // TODO: more robust handling for user-error (passing `/`)

    let replaced = `[${repeat ? '...' : ''}${param}]`;

    if (optional) {
      replaced = `${!value ? '/' : ''}[${replaced}]`;
    }

    if (repeat && !Array.isArray(value)) value = [value];
    return (optional || param in dynamicMatches) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map( // these values should be fully encoded instead of just
    // path delimiter escaped since they are being inserted
    // into the URL and we expect URL encoded segments
    // when parsing dynamic route params
    segment => encodeURIComponent(segment)).join('/') : encodeURIComponent(value)) || '/');
  })) {
    interpolatedRoute = '' // did not satisfy all requirements
    ; // n.b. We ignore this error because we handle warning for this case in
    // development in the `<Link>` component directly.
  }

  return {
    params,
    result: interpolatedRoute
  };
}

function omitParmsFromQuery(query, params) {
  const filteredQuery = {};
  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}

function resolveHref(router, href, resolveAs) {
  // we use a dummy base url for relative urls
  let base;
  let urlAsString = typeof href === 'string' ? href : (0, _utils).formatWithValidation(href); // repeated slashes and backslashes in the URL are considered
  // invalid and will never match a Next.js page/file

  const urlProtoMatch = urlAsString.match(/^[a-zA-Z]{1,}:\/\//);
  const urlAsStringNoProto = urlProtoMatch ? urlAsString.substr(urlProtoMatch[0].length) : urlAsString;
  const urlParts = urlAsStringNoProto.split('?');

  if ((urlParts[0] || '').match(/(\/\/|\\)/)) {
    console.error(`Invalid href passed to next/router: ${urlAsString}, repeated forward-slashes (//) or backslashes \\ are not valid in the href`);
    const normalizedUrl = (0, _utils).normalizeRepeatedSlashes(urlAsStringNoProto);
    urlAsString = (urlProtoMatch ? urlProtoMatch[0] : '') + normalizedUrl;
  } // Return because it cannot be routed by the Next.js router


  if (!isLocalURL(urlAsString)) {
    return resolveAs ? [urlAsString] : urlAsString;
  }

  try {
    base = new URL(urlAsString.startsWith('#') ? router.asPath : router.pathname, 'http://n');
  } catch (_) {
    // fallback to / for invalid asPath values e.g. //
    base = new URL('/', 'http://n');
  }

  try {
    const finalUrl = new URL(urlAsString, base);
    finalUrl.pathname = (0, _normalizeTrailingSlash).normalizePathTrailingSlash(finalUrl.pathname);
    let interpolatedAs = '';

    if ((0, _isDynamic).isDynamicRoute(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
      const query = (0, _querystring).searchParamsToUrlQuery(finalUrl.searchParams);
      const {
        result,
        params
      } = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);

      if (result) {
        interpolatedAs = (0, _utils).formatWithValidation({
          pathname: result,
          hash: finalUrl.hash,
          query: omitParmsFromQuery(query, params)
        });
      }
    } // if the origin didn't change, it means we received a relative href


    const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
    return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
  } catch (_) {
    return resolveAs ? [urlAsString] : urlAsString;
  }
}

function stripOrigin(url) {
  const origin = (0, _utils).getLocationOrigin();
  return url.startsWith(origin) ? url.substring(origin.length) : url;
}

function prepareUrlAs(router, url, as) {
  // If url and as provided as an object representation,
  // we'll format them into the string version here.
  let [resolvedHref, resolvedAs] = resolveHref(router, url, true);
  const origin = (0, _utils).getLocationOrigin();
  const hrefHadOrigin = resolvedHref.startsWith(origin);
  const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
  resolvedHref = stripOrigin(resolvedHref);
  resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
  const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
  const preparedAs = as ? stripOrigin(resolveHref(router, as)) : resolvedAs || resolvedHref;
  return {
    url: preparedUrl,
    as: asHadOrigin ? preparedAs : addBasePath(preparedAs)
  };
}

function resolveDynamicRoute(pathname, pages) {
  const cleanPathname = (0, _normalizeTrailingSlash).removePathTrailingSlash((0, _denormalizePagePath).denormalizePagePath(pathname));

  if (cleanPathname === '/404' || cleanPathname === '/_error') {
    return pathname;
  } // handle resolving href for dynamic routes


  if (!pages.includes(cleanPathname)) {
    // eslint-disable-next-line array-callback-return
    pages.some(page => {
      if ((0, _isDynamic).isDynamicRoute(page) && (0, _routeRegex).getRouteRegex(page).re.test(cleanPathname)) {
        pathname = page;
        return true;
      }
    });
  }

  return (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname);
}

const manualScrollRestoration =  false && 0;
const SSG_DATA_NOT_FOUND = Symbol('SSG_DATA_NOT_FOUND');

function fetchRetry(url, attempts) {
  return fetch(url, {
    // Cookies are required to be present for Next.js' SSG "Preview Mode".
    // Cookies may also be required for `getServerSideProps`.
    //
    // > `fetch` won’t send cookies, unless you set the credentials init
    // > option.
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //
    // > For maximum browser compatibility when it comes to sending &
    // > receiving cookies, always supply the `credentials: 'same-origin'`
    // > option instead of relying on the default.
    // https://github.com/github/fetch#caveats
    credentials: 'same-origin'
  }).then(res => {
    if (!res.ok) {
      if (attempts > 1 && res.status >= 500) {
        return fetchRetry(url, attempts - 1);
      }

      if (res.status === 404) {
        return res.json().then(data => {
          if (data.notFound) {
            return {
              notFound: SSG_DATA_NOT_FOUND
            };
          }

          throw new Error(`Failed to load static props`);
        });
      }

      throw new Error(`Failed to load static props`);
    }

    return res.json();
  });
}

function fetchNextData(dataHref, isServerRender) {
  return fetchRetry(dataHref, isServerRender ? 3 : 1).catch(err => {
    // We should only trigger a server-side transition if this was caused
    // on a client-side transition. Otherwise, we'd get into an infinite
    // loop.
    if (!isServerRender) {
      (0, _routeLoader).markAssetError(err);
    }

    throw err;
  });
}

class Router {
  constructor(pathname1, query1, as1, {
    initialProps,
    pageLoader,
    App,
    wrapApp,
    Component: Component1,
    err: err1,
    subscription,
    isFallback,
    locale,
    locales,
    defaultLocale,
    domainLocales,
    isPreview
  }) {
    // Static Data Cache
    this.sdc = {}; // In-flight Server Data Requests, for deduping

    this.sdr = {};
    this._idx = 0;

    this.onPopState = e => {
      const state = e.state;

      if (!state) {
        // We get state as undefined for two reasons.
        //  1. With older safari (< 8) and older chrome (< 34)
        //  2. When the URL changed with #
        //
        // In the both cases, we don't need to proceed and change the route.
        // (as it's already changed)
        // But we can simply replace the state with the new changes.
        // Actually, for (1) we don't need to nothing. But it's hard to detect that event.
        // So, doing the following for (1) does no harm.
        const {
          pathname: pathname1,
          query: query1
        } = this;
        this.changeState('replaceState', (0, _utils).formatWithValidation({
          pathname: addBasePath(pathname1),
          query: query1
        }), (0, _utils).getURL());
        return;
      }

      if (!state.__N) {
        return;
      }

      let forcedScroll;
      const {
        url,
        as: as1,
        options,
        idx
      } = state;

      if (false) {}

      this._idx = idx;
      const {
        pathname: pathname1
      } = (0, _parseRelativeUrl).parseRelativeUrl(url); // Make sure we don't re-render on initial load,
      // can be caused by navigating back from an external site

      if (this.isSsr && as1 === this.asPath && pathname1 === this.pathname) {
        return;
      } // If the downstream application returns falsy, return.
      // They will then be responsible for handling the event.


      if (this._bps && !this._bps(state)) {
        return;
      }

      this.change('replaceState', url, as1, Object.assign({}, options, {
        shallow: options.shallow && this._shallow,
        locale: options.locale || this.defaultLocale
      }), forcedScroll);
    }; // represents the current component key


    this.route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1); // set up the component cache (by route keys)

    this.components = {}; // We should not keep the cache, if there's an error
    // Otherwise, this cause issues when when going back and
    // come again to the errored page.

    if (pathname1 !== '/_error') {
      this.components[this.route] = {
        Component: Component1,
        initial: true,
        props: initialProps,
        err: err1,
        __N_SSG: initialProps && initialProps.__N_SSG,
        __N_SSP: initialProps && initialProps.__N_SSP
      };
    }

    this.components['/_app'] = {
      Component: App,
      styleSheets: []
    }; // Backwards compat for Router.router.events
    // TODO: Should be remove the following major version as it was never documented

    this.events = Router.events;
    this.pageLoader = pageLoader;
    this.pathname = pathname1;
    this.query = query1; // if auto prerendered and dynamic route wait to update asPath
    // until after mount to prevent hydration mismatch

    const autoExportDynamic = (0, _isDynamic).isDynamicRoute(pathname1) && self.__NEXT_DATA__.autoExport;

    this.asPath = autoExportDynamic ? pathname1 : as1;
    this.basePath = basePath;
    this.sub = subscription;
    this.clc = null;
    this._wrapApp = wrapApp; // make sure to ignore extra popState in safari on navigating
    // back from external site

    this.isSsr = true;
    this.isFallback = isFallback;
    this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || self.__NEXT_DATA__.appGip && !self.__NEXT_DATA__.gsp || !autoExportDynamic && !self.location.search && !false);
    this.isPreview = !!isPreview;
    this.isLocaleDomain = false;

    if (false) {}

    if (false) {}
  }

  reload() {
    window.location.reload();
  }
  /**
  * Go back in history
  */


  back() {
    window.history.back();
  }
  /**
  * Performs a `pushState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  push(url, as, options = {}) {
    if (false) {}

    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('pushState', url, as, options);
  }
  /**
  * Performs a `replaceState` with arguments
  * @param url of the route
  * @param as masks `url` for the browser
  * @param options object you can define `shallow` and other options
  */


  replace(url, as, options = {}) {
    ({
      url,
      as
    } = prepareUrlAs(this, url, as));
    return this.change('replaceState', url, as, options);
  }

  async change(method, url, as, options, forcedScroll) {
    if (!isLocalURL(url)) {
      window.location.href = url;
      return false;
    }

    const shouldResolveHref = url === as || options._h || options._shouldResolveHref; // for static pages with query params in the URL we delay
    // marking the router ready until after the query is updated

    if (options._h) {
      this.isReady = true;
    }

    const prevLocale = this.locale;

    if (false) { var ref; }

    if (!options._h) {
      this.isSsr = false;
    } // marking route changes as a navigation start entry


    if (_utils.ST) {
      performance.mark('routeChange');
    }

    const {
      shallow = false
    } = options;
    const routeProps = {
      shallow
    };

    if (this._inFlightRoute) {
      this.abortComponentLoad(this._inFlightRoute, routeProps);
    }

    as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
    const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
    this._inFlightRoute = as;
    let localeChange = prevLocale !== this.locale; // If the url change is only related to a hash change
    // We should not proceed. We should only change the state.
    // WARNING: `_h` is an internal option for handing Next.js client-side
    // hydration. Your app should _never_ use this property. It may change at
    // any time without notice.

    if (!options._h && this.onlyAHashChange(cleanedAs) && !localeChange) {
      this.asPath = cleanedAs;
      Router.events.emit('hashChangeStart', as, routeProps); // TODO: do we need the resolved href when only a hash change?

      this.changeState(method, url, as, options);
      this.scrollToHash(cleanedAs);
      this.notify(this.components[this.route], null);
      Router.events.emit('hashChangeComplete', as, routeProps);
      return true;
    }

    let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
    let {
      pathname: pathname1,
      query: query1
    } = parsed; // The build manifest needs to be loaded before auto-static dynamic pages
    // get their query parameters to allow ensuring they can be parsed properly
    // when rewritten to

    let pages, rewrites;

    try {
      pages = await this.pageLoader.getPageList();
      ({
        __rewrites: rewrites
      } = await (0, _routeLoader).getClientBuildManifest());
    } catch (err1) {
      // If we fail to resolve the page list or client-build manifest, we must
      // do a server-side transition:
      window.location.href = as;
      return false;
    } // If asked to change the current URL we should reload the current page
    // (not location.reload() but reload getInitialProps and other Next.js stuffs)
    // We also need to set the method = replaceState always
    // as this should not go into the history (That's how browsers work)
    // We should compare the new asPath to the current asPath, not the url


    if (!this.urlIsNew(cleanedAs) && !localeChange) {
      method = 'replaceState';
    } // we need to resolve the as value using rewrites for dynamic SSG
    // pages to allow building the data URL correctly


    let resolvedAs = as; // url and as should always be prefixed with basePath by this
    // point by either next/link or router.push/replace so strip the
    // basePath from the pathname to match the pages dir 1-to-1

    pathname1 = pathname1 ? (0, _normalizeTrailingSlash).removePathTrailingSlash(delBasePath(pathname1)) : pathname1;

    if (shouldResolveHref && pathname1 !== '/_error') {
      options._shouldResolveHref = true;

      if (false) {} else {
        parsed.pathname = resolveDynamicRoute(pathname1, pages);

        if (parsed.pathname !== pathname1) {
          pathname1 = parsed.pathname;
          parsed.pathname = addBasePath(pathname1);
          url = (0, _utils).formatWithValidation(parsed);
        }
      }
    }

    const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname1);

    if (!isLocalURL(as)) {
      if (true) {
        throw new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as` + `\nSee more info: https://nextjs.org/docs/messages/invalid-relative-url-external-as`);
      }

      window.location.href = as;
      return false;
    }

    resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);

    if ((0, _isDynamic).isDynamicRoute(route)) {
      const parsedAs = (0, _parseRelativeUrl).parseRelativeUrl(resolvedAs);
      const asPathname = parsedAs.pathname;
      const routeRegex = (0, _routeRegex).getRouteRegex(route);
      const routeMatch = (0, _routeMatcher).getRouteMatcher(routeRegex)(asPathname);
      const shouldInterpolate = route === asPathname;
      const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query1) : {};

      if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
        const missingParams = Object.keys(routeRegex.groups).filter(param => !query1[param]);

        if (missingParams.length > 0) {
          if (true) {
            console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide ` + `the params: ${missingParams.join(', ')} in the \`href\`'s \`query\``);
          }

          throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(', ')}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://nextjs.org/docs/messages/${shouldInterpolate ? 'href-interpolation-failed' : 'incompatible-href-as'}`);
        }
      } else if (shouldInterpolate) {
        as = (0, _utils).formatWithValidation(Object.assign({}, parsedAs, {
          pathname: interpolatedAs.result,
          query: omitParmsFromQuery(query1, interpolatedAs.params)
        }));
      } else {
        // Merge params into `query`, overwriting any specified in search
        Object.assign(query1, routeMatch);
      }
    }

    Router.events.emit('routeChangeStart', as, routeProps);

    try {
      var ref, ref1;
      let routeInfo = await this.getRouteInfo(route, pathname1, query1, as, resolvedAs, routeProps);
      let {
        error,
        props,
        __N_SSG,
        __N_SSP
      } = routeInfo; // handle redirect on client-transition

      if ((__N_SSG || __N_SSP) && props) {
        if (props.pageProps && props.pageProps.__N_REDIRECT) {
          const destination = props.pageProps.__N_REDIRECT; // check if destination is internal (resolves to a page) and attempt
          // client-navigation if it is falling back to hard navigation if
          // it's not

          if (destination.startsWith('/')) {
            const parsedHref = (0, _parseRelativeUrl).parseRelativeUrl(destination);
            parsedHref.pathname = resolveDynamicRoute(parsedHref.pathname, pages);
            const {
              url: newUrl,
              as: newAs
            } = prepareUrlAs(this, destination, destination);
            return this.change(method, newUrl, newAs, options);
          }

          window.location.href = destination;
          return new Promise(() => {});
        }

        this.isPreview = !!props.__N_PREVIEW; // handle SSG data 404

        if (props.notFound === SSG_DATA_NOT_FOUND) {
          let notFoundRoute;

          try {
            await this.fetchComponent('/404');
            notFoundRoute = '/404';
          } catch (_) {
            notFoundRoute = '/_error';
          }

          routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query1, as, resolvedAs, {
            shallow: false
          });
        }
      }

      Router.events.emit('beforeHistoryChange', as, routeProps);
      this.changeState(method, url, as, options);

      if (true) {
        const appComp = this.components['/_app'].Component;
        window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
      }

      if (options._h && pathname1 === '/_error' && ((ref = self.__NEXT_DATA__.props) === null || ref === void 0 ? void 0 : (ref1 = ref.pageProps) === null || ref1 === void 0 ? void 0 : ref1.statusCode) === 500 && (props === null || props === void 0 ? void 0 : props.pageProps)) {
        // ensure statusCode is still correct for static 500 page
        // when updating query information
        props.pageProps.statusCode = 500;
      } // shallow routing is only allowed for same page URL changes.


      const isValidShallowRoute = options.shallow && this.route === route;

      var _scroll;

      const shouldScroll = (_scroll = options.scroll) !== null && _scroll !== void 0 ? _scroll : !isValidShallowRoute;
      const resetScroll = shouldScroll ? {
        x: 0,
        y: 0
      } : null;
      await this.set(route, pathname1, query1, cleanedAs, routeInfo, forcedScroll !== null && forcedScroll !== void 0 ? forcedScroll : resetScroll).catch(e => {
        if (e.cancelled) error = error || e;else throw e;
      });

      if (error) {
        Router.events.emit('routeChangeError', error, cleanedAs, routeProps);
        throw error;
      }

      if (false) {}

      Router.events.emit('routeChangeComplete', as, routeProps);
      return true;
    } catch (err1) {
      if (err1.cancelled) {
        return false;
      }

      throw err1;
    }
  }

  changeState(method, url, as, options = {}) {
    if (true) {
      if (typeof window.history === 'undefined') {
        console.error(`Warning: window.history is not available.`);
        return;
      }

      if (typeof window.history[method] === 'undefined') {
        console.error(`Warning: window.history.${method} is not available`);
        return;
      }
    }

    if (method !== 'pushState' || (0, _utils).getURL() !== as) {
      this._shallow = options.shallow;
      window.history[method]({
        url,
        as,
        options,
        __N: true,
        idx: this._idx = method !== 'pushState' ? this._idx : this._idx + 1
      }, // Most browsers currently ignores this parameter, although they may use it in the future.
      // Passing the empty string here should be safe against future changes to the method.
      // https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState
      '', as);
    }
  }

  async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
    if (err.cancelled) {
      // bubble up cancellation errors
      throw err;
    }

    if ((0, _routeLoader).isAssetError(err) || loadErrorFail) {
      Router.events.emit('routeChangeError', err, as, routeProps); // If we can't load the page it could be one of following reasons
      //  1. Page doesn't exists
      //  2. Page does exist in a different zone
      //  3. Internal error while loading the page
      // So, doing a hard reload is the proper way to deal with this.

      window.location.href = as; // Changing the URL doesn't block executing the current code path.
      // So let's throw a cancellation error stop the routing logic.

      throw buildCancellationError();
    }

    try {
      let Component1;
      let styleSheets;
      let props;

      if (typeof Component1 === 'undefined' || typeof styleSheets === 'undefined') {
        ({
          page: Component1,
          styleSheets
        } = await this.fetchComponent('/_error'));
      }

      const routeInfo = {
        props,
        Component: Component1,
        styleSheets,
        err,
        error: err
      };

      if (!routeInfo.props) {
        try {
          routeInfo.props = await this.getInitialProps(Component1, {
            err,
            pathname,
            query
          });
        } catch (gipErr) {
          console.error('Error in error page `getInitialProps`: ', gipErr);
          routeInfo.props = {};
        }
      }

      return routeInfo;
    } catch (routeInfoErr) {
      return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
    }
  }

  async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
    try {
      const existingRouteInfo = this.components[route];

      if (routeProps.shallow && existingRouteInfo && this.route === route) {
        return existingRouteInfo;
      }

      const cachedRouteInfo = existingRouteInfo && 'initial' in existingRouteInfo ? undefined : existingRouteInfo;
      const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then(res => ({
        Component: res.page,
        styleSheets: res.styleSheets,
        __N_SSG: res.mod.__N_SSG,
        __N_SSP: res.mod.__N_SSP
      }));
      const {
        Component: Component1,
        __N_SSG,
        __N_SSP
      } = routeInfo;

      if (true) {
        const {
          isValidElementType
        } = __webpack_require__(/*! react-is */ "react-is");

        if (!isValidElementType(Component1)) {
          throw new Error(`The default export is not a React Component in page: "${pathname}"`);
        }
      }

      let dataHref;

      if (__N_SSG || __N_SSP) {
        dataHref = this.pageLoader.getDataHref((0, _utils).formatWithValidation({
          pathname,
          query
        }), resolvedAs, __N_SSG, this.locale);
      }

      const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component1, // we provide AppTree later so this needs to be `any`
      {
        pathname,
        query,
        asPath: as,
        locale: this.locale,
        locales: this.locales,
        defaultLocale: this.defaultLocale
      }));
      routeInfo.props = props;
      this.components[route] = routeInfo;
      return routeInfo;
    } catch (err2) {
      return this.handleRouteInfoError(err2, pathname, query, as, routeProps);
    }
  }

  set(route, pathname, query, as, data, resetScroll) {
    this.isFallback = false;
    this.route = route;
    this.pathname = pathname;
    this.query = query;
    this.asPath = as;
    return this.notify(data, resetScroll);
  }
  /**
  * Callback to execute before replacing router state
  * @param cb callback to be executed
  */


  beforePopState(cb) {
    this._bps = cb;
  }

  onlyAHashChange(as) {
    if (!this.asPath) return false;
    const [oldUrlNoHash, oldHash] = this.asPath.split('#');
    const [newUrlNoHash, newHash] = as.split('#'); // Makes sure we scroll to the provided hash if the url/hash are the same

    if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
      return true;
    } // If the urls are change, there's more than a hash change


    if (oldUrlNoHash !== newUrlNoHash) {
      return false;
    } // If the hash has changed, then it's a hash only change.
    // This check is necessary to handle both the enter and
    // leave hash === '' cases. The identity case falls through
    // and is treated as a next reload.


    return oldHash !== newHash;
  }

  scrollToHash(as) {
    const [, hash] = as.split('#'); // Scroll to top if the hash is just `#` with no value or `#top`
    // To mirror browsers

    if (hash === '' || hash === 'top') {
      window.scrollTo(0, 0);
      return;
    } // First we check if the element by id is found


    const idEl = document.getElementById(hash);

    if (idEl) {
      idEl.scrollIntoView();
      return;
    } // If there's no element with the id, we check the `name` property
    // To mirror browsers


    const nameEl = document.getElementsByName(hash)[0];

    if (nameEl) {
      nameEl.scrollIntoView();
    }
  }

  urlIsNew(asPath) {
    return this.asPath !== asPath;
  }
  /**
  * Prefetch page code, you may wait for the data during page rendering.
  * This feature only works in production!
  * @param url the href of prefetched page
  * @param asPath the as path of the prefetched page
  */


  async prefetch(url, asPath = url, options = {}) {
    let parsed = (0, _parseRelativeUrl).parseRelativeUrl(url);
    let {
      pathname: pathname2
    } = parsed;

    if (false) {}

    const pages = await this.pageLoader.getPageList();
    let resolvedAs = asPath;

    if (false) {} else {
      parsed.pathname = resolveDynamicRoute(parsed.pathname, pages);

      if (parsed.pathname !== pathname2) {
        pathname2 = parsed.pathname;
        parsed.pathname = pathname2;
        url = (0, _utils).formatWithValidation(parsed);
      }
    }

    const route = (0, _normalizeTrailingSlash).removePathTrailingSlash(pathname2); // Prefetch is not supported in development mode because it would trigger on-demand-entries

    if (true) {
      return;
    }

    await Promise.all([this.pageLoader._isSsg(route).then(isSsg => {
      return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, resolvedAs, true, typeof options.locale !== 'undefined' ? options.locale : this.locale)) : false;
    }), this.pageLoader[options.priority ? 'loadPage' : 'prefetch'](route)]);
  }

  async fetchComponent(route) {
    let cancelled = false;

    const cancel = this.clc = () => {
      cancelled = true;
    };

    const componentResult = await this.pageLoader.loadPage(route);

    if (cancelled) {
      const error = new Error(`Abort fetching component for route: "${route}"`);
      error.cancelled = true;
      throw error;
    }

    if (cancel === this.clc) {
      this.clc = null;
    }

    return componentResult;
  }

  _getData(fn) {
    let cancelled = false;

    const cancel = () => {
      cancelled = true;
    };

    this.clc = cancel;
    return fn().then(data => {
      if (cancel === this.clc) {
        this.clc = null;
      }

      if (cancelled) {
        const err2 = new Error('Loading initial props cancelled');
        err2.cancelled = true;
        throw err2;
      }

      return data;
    });
  }

  _getStaticData(dataHref) {
    const {
      href: cacheKey
    } = new URL(dataHref, window.location.href);

    if (false) {}

    return fetchNextData(dataHref, this.isSsr).then(data => {
      this.sdc[cacheKey] = data;
      return data;
    });
  }

  _getServerData(dataHref) {
    const {
      href: resourceKey
    } = new URL(dataHref, window.location.href);

    if (this.sdr[resourceKey]) {
      return this.sdr[resourceKey];
    }

    return this.sdr[resourceKey] = fetchNextData(dataHref, this.isSsr).then(data => {
      delete this.sdr[resourceKey];
      return data;
    }).catch(err2 => {
      delete this.sdr[resourceKey];
      throw err2;
    });
  }

  getInitialProps(Component, ctx) {
    const {
      Component: App1
    } = this.components['/_app'];

    const AppTree = this._wrapApp(App1);

    ctx.AppTree = AppTree;
    return (0, _utils).loadGetInitialProps(App1, {
      AppTree,
      Component,
      router: this,
      ctx
    });
  }

  abortComponentLoad(as, routeProps) {
    if (this.clc) {
      Router.events.emit('routeChangeError', buildCancellationError(), as, routeProps);
      this.clc();
      this.clc = null;
    }
  }

  notify(data, resetScroll) {
    return this.sub(data, this.components['/_app'].Component, resetScroll);
  }

}

Router.events = (0, _mitt).default();
exports.default = Router;

/***/ }),

/***/ "./src/components/CommentList/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/CommentList/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _containers_CommentItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../containers/CommentItem */ "./src/containers/CommentItem/index.tsx");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/components/CommentList/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\CommentList\\index.tsx";





const CommentList = ({
  data
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.CommentTitle, {
      children: ["\uB313\uAE00", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)("span", {
        children: `${data.length}개`
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 8,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.Wrapper, {
      children: data && data.map(item => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_containers_CommentItem__WEBPACK_IMPORTED_MODULE_0__.default, {
        data: item
      }, item.createdAt, false, {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 13
      }, undefined))
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentList);

/***/ }),

/***/ "./src/components/CommentList/style.ts":
/*!*********************************************!*\
  !*** ./src/components/CommentList/style.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "CommentTitle": () => (/* binding */ CommentTitle)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-ecs3lj-0"
})(["border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;margin-bottom:30px;", "{width:95%;margin:0 auto 30px;}"], ({
  theme
}) => theme.window.laptop);
const CommentTitle = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__CommentTitle",
  componentId: "sc-ecs3lj-1"
})(["padding:10px 20px;font-family:BMeuljiro;font-size:25px;margin-top:50px;& span{font-family:BMJUA;font-size:16px;padding:0 10px;}", "{padding:10px 30px;}"], ({
  theme
}) => theme.window.laptop);

/***/ }),

/***/ "./src/components/DetailItem/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/DetailItem/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/components/DetailItem/style.ts");
/* harmony import */ var _TourSpot__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../TourSpot */ "./src/components/TourSpot/index.tsx");
/* harmony import */ var _TourCulture__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../TourCulture */ "./src/components/TourCulture/index.tsx");
/* harmony import */ var _TourEvent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../TourEvent */ "./src/components/TourEvent/index.tsx");
/* harmony import */ var _TourCourse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../TourCourse */ "./src/components/TourCourse/index.tsx");
/* harmony import */ var _TourSports__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../TourSports */ "./src/components/TourSports/index.tsx");
/* harmony import */ var _TourSleep__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../TourSleep */ "./src/components/TourSleep/index.tsx");
/* harmony import */ var _TourMall__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../TourMall */ "./src/components/TourMall/index.tsx");
/* harmony import */ var _TourFood__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../TourFood */ "./src/components/TourFood/index.tsx");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _Kakaomap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../Kakaomap */ "./src/components/Kakaomap/index.tsx");
/* harmony import */ var _utils_useToggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../utils/useToggle */ "./utils/useToggle.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\DetailItem\\index.tsx";
















const DetailItem = ({
  item
}) => {
  const {
    title,
    firstimage,
    overview,
    contenttypeid
  } = item;
  const [more, onToggleMore] = (0,_utils_useToggle__WEBPACK_IMPORTED_MODULE_12__.default)(true);
  const [minHeight, onToggleMinHeight] = (0,_utils_useToggle__WEBPACK_IMPORTED_MODULE_12__.default)(false);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const moreHeight = document.getElementById('moreDiv').clientHeight;

    if (moreHeight < 155) {
      onToggleMinHeight();
    } else {
      onToggleMore();
    }
  }, [onToggleMore, onToggleMinHeight]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.DetailItemWrapper, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.DetailItemTitle, {
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 42,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.ImageWrapper, {
        children: firstimage && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.DetailItemImage, {
          src: firstimage,
          alt: title,
          width: 980,
          height: 800,
          layout: "responsive",
          priority: true
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 45,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.DetailItemInfo, {
        children: "\uC0C1\uC138\uC815\uBCF4"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.DetailItemOverview, {
        id: "moreDiv",
        more: more,
        dangerouslySetInnerHTML: {
          __html: overview.replaceAll(/\s[*]/g, '<br/><br/>*')
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 9
      }, undefined), minHeight ? null : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.ButtonWrapper, {
        onClick: onToggleMore,
        children: !more ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("b", {
            children: "\uB354\uBCF4\uAE30"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 68,
            columnNumber: 17
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__.CaretDownOutlined, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 70,
              columnNumber: 19
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 69,
            columnNumber: 17
          }, undefined)]
        }, void 0, true) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("b", {
            children: "\uB2EB\uAE30"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 75,
            columnNumber: 17
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("span", {
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_10__.CaretUpOutlined, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 77,
              columnNumber: 19
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 76,
            columnNumber: 17
          }, undefined)]
        }, void 0, true)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 65,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_Kakaomap__WEBPACK_IMPORTED_MODULE_11__.default, {
        item: item
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 84,
        columnNumber: 10
      }, undefined), (() => {
        switch (contenttypeid) {
          case 12:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourSpot__WEBPACK_IMPORTED_MODULE_2__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 89,
              columnNumber: 22
            }, undefined);

          case 14:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourCulture__WEBPACK_IMPORTED_MODULE_3__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 91,
              columnNumber: 22
            }, undefined);

          case 15:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourEvent__WEBPACK_IMPORTED_MODULE_4__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 93,
              columnNumber: 22
            }, undefined);

          case 25:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourCourse__WEBPACK_IMPORTED_MODULE_5__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 95,
              columnNumber: 22
            }, undefined);

          case 28:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourSports__WEBPACK_IMPORTED_MODULE_6__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 97,
              columnNumber: 22
            }, undefined);

          case 32:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourSleep__WEBPACK_IMPORTED_MODULE_7__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 99,
              columnNumber: 22
            }, undefined);

          case 38:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourMall__WEBPACK_IMPORTED_MODULE_8__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 101,
              columnNumber: 22
            }, undefined);

          case 39:
            return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_TourFood__WEBPACK_IMPORTED_MODULE_9__.default, {
              item: item
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 103,
              columnNumber: 22
            }, undefined);

          default:
            null;
        }
      })()]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 7
    }, undefined)
  }, void 0, false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailItem);

/***/ }),

/***/ "./src/components/DetailItem/style.ts":
/*!********************************************!*\
  !*** ./src/components/DetailItem/style.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DetailItemWrapper": () => (/* binding */ DetailItemWrapper),
/* harmony export */   "DetailItemTitle": () => (/* binding */ DetailItemTitle),
/* harmony export */   "DetailItemImage": () => (/* binding */ DetailItemImage),
/* harmony export */   "ImageWrapper": () => (/* binding */ ImageWrapper),
/* harmony export */   "DetailItemInfo": () => (/* binding */ DetailItemInfo),
/* harmony export */   "DetailItemOverview": () => (/* binding */ DetailItemOverview),
/* harmony export */   "ButtonWrapper": () => (/* binding */ ButtonWrapper)
/* harmony export */ });
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


const DetailItemWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__DetailItemWrapper",
  componentId: "sc-eqcalu-0"
})(["display:flex;flex-direction:column;align-items:center;"]);
const DetailItemTitle = styled_components__WEBPACK_IMPORTED_MODULE_1___default().h2.withConfig({
  displayName: "style__DetailItemTitle",
  componentId: "sc-eqcalu-1"
})(["font-family:BMJUA;font-size:50px;font-weight:600;padding:50px 0;", "{padding:100px 0 50px;}", "{font-size:45px;width:90%;text-align:center;}", "{font-size:40px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const DetailItemImage = styled_components__WEBPACK_IMPORTED_MODULE_1___default()((next_image__WEBPACK_IMPORTED_MODULE_0___default())).withConfig({
  displayName: "style__DetailItemImage",
  componentId: "sc-eqcalu-2"
})(["width:980px;padding:0 0 50px 0;", "{width:100%;}", "{padding:0;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const ImageWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__ImageWrapper",
  componentId: "sc-eqcalu-3"
})(["width:100%;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);
const DetailItemInfo = styled_components__WEBPACK_IMPORTED_MODULE_1___default().h3.withConfig({
  displayName: "style__DetailItemInfo",
  componentId: "sc-eqcalu-4"
})(["border-bottom:2px solid black;width:100%;font-family:BMJUA;font-size:30px;font-weight:600;margin:30px 0;padding:20px 10px 15px;& span{font-size:18px;font-family:BMHANNAAir;}", "{width:90%;}", "{font-size:27px;& span{font-size:16px;}}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const DetailItemOverview = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__DetailItemOverview",
  componentId: "sc-eqcalu-5"
})(["line-height:1.5;font-weight:600;font-size:17px;font-family:'Gowun Batang',serif;height:", "  overflow:hidden;", "{width:90%;line-height:1.3;}"], props => props.more ? '100%;' : '155px;', ({
  theme
}) => theme.window.laptop);
const ButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-eqcalu-6"
})(["width:100%;text-align:center;border:1px solid #000;cursor:pointer;padding:10px;font-weight:600;& span{padding:0 3px;font-size:15px;}margin:15px 0;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);

/***/ }),

/***/ "./src/components/DetailSkeleton/index.tsx":
/*!*************************************************!*\
  !*** ./src/components/DetailSkeleton/index.tsx ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/components/DetailSkeleton/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\DetailSkeleton\\index.tsx";




const DetailSkeleton = () => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.Wrapper, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.TitleBox, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.TitleSkeleton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.SkeletonBox, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.ImageSkeleton, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 16,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DetailSkeleton);

/***/ }),

/***/ "./src/components/DetailSkeleton/style.ts":
/*!************************************************!*\
  !*** ./src/components/DetailSkeleton/style.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "TitleBox": () => (/* binding */ TitleBox),
/* harmony export */   "TitleSkeleton": () => (/* binding */ TitleSkeleton),
/* harmony export */   "SkeletonBox": () => (/* binding */ SkeletonBox),
/* harmony export */   "ImageSkeleton": () => (/* binding */ ImageSkeleton)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-xw5rja-0"
})(["display:flex;flex-direction:column;align-items:center;"]);
const TitleBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__TitleBox",
  componentId: "sc-xw5rja-1"
})(["width:100%;height:150px;padding:50px 0;", "{padding:100px 0 50px;height:200px;width:90%;}", "{height:195px;}", "{height:190px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const TitleSkeleton = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__TitleSkeleton",
  componentId: "sc-xw5rja-2"
})(["@-webkit-keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}@keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}width:100%;height:50px;-webkit-animation:loading 1.5s infinite ease-in-out;animation:loading 1.5s infinite ease-in-out;", "{width:100%;}", "{height:45px;width:100%;}", "{height:40px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const SkeletonBox = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__SkeletonBox",
  componentId: "sc-xw5rja-3"
})(["width:980px;height:654px;margin:5px;", "{}", "{width:90%;text-align:center;}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.laptop);
const ImageSkeleton = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__ImageSkeleton",
  componentId: "sc-xw5rja-4"
})(["@-webkit-keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}@keyframes loading{0%{background-color:rgba(165,165,165,0.1);}50%{background-color:rgba(165,165,165,0.3);}100%{background-color:rgba(165,165,165,0.1);}}width:980px;height:654px;-webkit-animation:loading 1.5s infinite ease-in-out;animation:loading 1.5s infinite ease-in-out;", "{width:100%;}", "{width:100%;}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);

/***/ }),

/***/ "./src/components/Footer/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Footer/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/components/Footer/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\Footer\\index.tsx";




const Footer = () => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.FooterWrapper, {}, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 5,
    columnNumber: 10
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Footer);

/***/ }),

/***/ "./src/components/Footer/style.ts":
/*!****************************************!*\
  !*** ./src/components/Footer/style.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FooterWrapper": () => (/* binding */ FooterWrapper)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const FooterWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__FooterWrapper",
  componentId: "sc-1ynwupz-0"
})(["height:100px;background-color:#eeeeee;"]);

/***/ }),

/***/ "./src/components/HeaderItem/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/HeaderItem/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ "./src/components/HeaderItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\HeaderItem\\index.tsx";





const HeadItem = ({
  title,
  contentTypeId
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Li, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
      href: {
        pathname: '/tour',
        query: {
          title,
          contentTypeId
        }
      },
      as: `/tour?title=${title}&contentTypeId=${contentTypeId}`,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("a", {
        children: title
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 13,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 12,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeadItem);

/***/ }),

/***/ "./src/components/HeaderItem/style.ts":
/*!********************************************!*\
  !*** ./src/components/HeaderItem/style.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Li": () => (/* binding */ Li)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Li = styled_components__WEBPACK_IMPORTED_MODULE_0___default().li.withConfig({
  displayName: "style__Li",
  componentId: "sc-1idsbgj-0"
})(["", "{& a{display:block;width:100;}}"], ({
  theme
}) => theme.window.tablet);

/***/ }),

/***/ "./src/components/Kakaomap/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/Kakaomap/index.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ "./src/components/Kakaomap/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\Kakaomap\\index.tsx";






const Kakaomap = ({
  item
}) => {
  const {
    mapx,
    mapy,
    title
  } = item;
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.Fragment, {
    children: mapx ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.MapWrapper, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Infowindow, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("div", {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("span", {
            children: title
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 52,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 51,
          columnNumber: 13
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("a", {
          href: `https://map.kakao.com/link/to/${title},${mapy},${mapx}`,
          target: "_blank",
          rel: "noreferrer",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("b", {
            children: ["\uAE38\uCC3E\uAE30 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_0__.ArrowRightOutlined, {}, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 60,
              columnNumber: 21
            }, undefined)]
          }, void 0, true, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 13
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Map, {
        id: "map"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 49,
      columnNumber: 9
    }, undefined) : null
  }, void 0, false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Kakaomap);

/***/ }),

/***/ "./src/components/Kakaomap/style.ts":
/*!******************************************!*\
  !*** ./src/components/Kakaomap/style.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MapWrapper": () => (/* binding */ MapWrapper),
/* harmony export */   "Map": () => (/* binding */ Map),
/* harmony export */   "IwContentWrapper": () => (/* binding */ IwContentWrapper),
/* harmony export */   "Infowindow": () => (/* binding */ Infowindow)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const MapWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__MapWrapper",
  componentId: "sc-ta93rz-0"
})(["display:flex;justify-content:center;padding:70px 0 0;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);
const Map = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Map",
  componentId: "sc-ta93rz-1"
})(["width:980px;height:400px;position:relative;", "{}", "{height:350px;}", "{height:250px;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileL);
const IwContentWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__IwContentWrapper",
  componentId: "sc-ta93rz-2"
})(["width:360px;height:200px;"]);
const Infowindow = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Infowindow",
  componentId: "sc-ta93rz-3"
})(["position:absolute;text-align:center;z-index:99;width:240px;height:120px;background-color:#fff;margin:10px;border-radius:10px;box-shadow:3px 3px 5px 0px rgb(0 0 0 / 20%);padding:20px;& div{margin-bottom:20px;}& span{font-size:20px;font-family:BMJUA;}& b{background-color:#5b5b5b;padding:5px 10px;margin-top:10px;border-radius:10px;color:#fff;&:hover{font-weight:bold;}& span{font-size:18px;}}", "{width:200px;height:100px;& div{margin-bottom:10px;}& span{font-size:18px;}& b{padding:2px 5px;font-size:15px;}}"], ({
  theme
}) => theme.window.mobileL);

/***/ }),

/***/ "./src/components/Layout/index.tsx":
/*!*****************************************!*\
  !*** ./src/components/Layout/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Footer */ "./src/components/Footer/index.tsx");
/* harmony import */ var _containers_Navbar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../containers/Navbar */ "./src/containers/Navbar/index.tsx");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style */ "./src/components/Layout/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\Layout\\index.tsx";







const Layout = ({
  children
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_containers_Navbar__WEBPACK_IMPORTED_MODULE_2__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 9,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.MainWrapper, {
      children: children
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_Footer__WEBPACK_IMPORTED_MODULE_1__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);

/***/ }),

/***/ "./src/components/Layout/style.ts":
/*!****************************************!*\
  !*** ./src/components/Layout/style.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainWrapper": () => (/* binding */ MainWrapper)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const MainWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__MainWrapper",
  componentId: "sc-1bhphfu-0"
})(["width:1300px;margin:0 auto;", "{width:100%;}", "{}"], ({
  theme
}) => theme.window.pc, ({
  theme
}) => theme.window.laptop);

/***/ }),

/***/ "./src/components/SubItem/index.tsx":
/*!******************************************!*\
  !*** ./src/components/SubItem/index.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\SubItem\\index.tsx";




const SubItem = ({
  name,
  html
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_0__.Li, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("b", {
        children: name
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 11,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxDEV)("p", {
        dangerouslySetInnerHTML: {
          __html: html
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 10,
      columnNumber: 7
    }, undefined)
  }, void 0, false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SubItem);

/***/ }),

/***/ "./src/components/SubItem/style.ts":
/*!*****************************************!*\
  !*** ./src/components/SubItem/style.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Li": () => (/* binding */ Li),
/* harmony export */   "IntroWrapper": () => (/* binding */ IntroWrapper)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Li = styled_components__WEBPACK_IMPORTED_MODULE_0___default().li.withConfig({
  displayName: "style__Li",
  componentId: "sc-11zb43j-0"
})(["width:50%;padding:0 10px;float:left;font-family:'Gowun Batang',serif;font-weight:500;font-size:18px;margin-bottom:10px;& p{font-size:17px;padding:5px 0;a{word-break:break-all;color:#000;}}& b{font-weight:bold;}", "{width:100%;float:none;padding:0;}"], ({
  theme
}) => theme.window.tablet);
const IntroWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__IntroWrapper",
  componentId: "sc-11zb43j-1"
})(["margin-top:50px;width:100%;", "{width:90%;}"], ({
  theme
}) => theme.window.laptop);

/***/ }),

/***/ "./src/components/TourCourse/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/TourCourse/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style */ "./src/components/TourCourse/style.ts");
/* harmony import */ var _DetailItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DetailItem/style */ "./src/components/DetailItem/style.ts");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourCourse\\index.tsx";







const TourCourse = ({
  item
}) => {
  const {
    0: imageSrc,
    1: setImageSrc
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Array.isArray(item.info) ? item.info[0].subdetailimg : item.info.subdetailimg);
  const {
    0: imageTitle,
    1: setImageTitle
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Array.isArray(item.info) ? item.info[0].subname : item.info.subname);
  const {
    0: subOverview,
    1: setSubOverview
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(Array.isArray(item.info) ? item.info[0].subdetailoverview : item.info.subdetailoverview);
  const changeImageSrc = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(src => () => {
    setImageSrc(src.subdetailimg);
    setImageTitle(src.subname);
    setSubOverview(src.subdetailoverview);
  }, []);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_DetailItem_style__WEBPACK_IMPORTED_MODULE_2__.DetailItemInfo, {
      children: ["\uCF54\uC2A4 ", /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("span", {
        children: ["(", item.intro.distance, ")"]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 12
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 39,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.Wrapper, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.CourseList, {
        children: item.info && Array.isArray(item.info) ? item.info.map(course => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.Item, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
            className: imageTitle == course.subname ? 'active' : '',
            onClick: changeImageSrc(course),
            children: course.subname
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 47,
            columnNumber: 17
          }, undefined)
        }, course.subcontentid, false, {
          fileName: _jsxFileName,
          lineNumber: 46,
          columnNumber: 15
        }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.Item, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
            className: imageTitle == item.info.subname ? 'active' : '',
            onClick: changeImageSrc(item.info),
            children: item.info.subname
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 57,
            columnNumber: 15
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 43,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.CourseImage, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.CardWrapper, {
          hoverable: true,
          cover: imageSrc ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.CardImage, {
            src: imageSrc,
            alt: "\uCF54\uC2A4\uC774\uBBF8\uC9C0",
            width: 300,
            height: 200,
            priority: true
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 71,
            columnNumber: 17
          }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_3__.Image, {
            alt: "\uC900\uBE44\uC911",
            src: "error",
            fallback: "data:image/png;base64,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",
            width: 300,
            height: 200
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 79,
            columnNumber: 17
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_1__.SubDetail, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("div", {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("span", {
          children: [`- `, imageTitle]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 93,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 92,
        columnNumber: 9
      }, undefined), subOverview ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxDEV)("p", {
        dangerouslySetInnerHTML: {
          __html: subOverview
        }
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 99,
        columnNumber: 11
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 91,
      columnNumber: 7
    }, undefined)]
  }, void 0, true);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourCourse);

/***/ }),

/***/ "./src/components/TourCourse/style.ts":
/*!********************************************!*\
  !*** ./src/components/TourCourse/style.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "Item": () => (/* binding */ Item),
/* harmony export */   "CourseImage": () => (/* binding */ CourseImage),
/* harmony export */   "CourseList": () => (/* binding */ CourseList),
/* harmony export */   "CardWrapper": () => (/* binding */ CardWrapper),
/* harmony export */   "CardImage": () => (/* binding */ CardImage),
/* harmony export */   "SubDetail": () => (/* binding */ SubDetail)
/* harmony export */ });
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);



const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-1bc9gpk-0"
})(["width:100%;display:flex;font-family:BMHANNAAir;justify-content:space-between;", "{width:90%;}", "{flex-direction:column;}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const Item = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_2__.Timeline.Item).withConfig({
  displayName: "style__Item",
  componentId: "sc-1bc9gpk-1"
})(["font-size:18px;& div{display:inline-block;cursor:pointer;&.active{font-weight:bold;}}"]);
const CourseImage = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__CourseImage",
  componentId: "sc-1bc9gpk-2"
})([""]);
const CourseList = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_2__.Timeline).withConfig({
  displayName: "style__CourseList",
  componentId: "sc-1bc9gpk-3"
})(["margin-top:10px;"]);
const CardWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_2__.Card).withConfig({
  displayName: "style__CardWrapper",
  componentId: "sc-1bc9gpk-4"
})(["width:300px;height:200px;margin:0 auto;& div{text-align:center;font-size:20px;font-family:BMJUA;}", "{width:250px;height:200px;}"], ({
  theme
}) => theme.window.mobileS);
const CardImage = styled_components__WEBPACK_IMPORTED_MODULE_1___default()((next_image__WEBPACK_IMPORTED_MODULE_0___default())).withConfig({
  displayName: "style__CardImage",
  componentId: "sc-1bc9gpk-5"
})(["width:300px;height:250px;", "{width:100%;}", "{}"], ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileS);
const SubDetail = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__SubDetail",
  componentId: "sc-1bc9gpk-6"
})(["flex:2;padding:10px;font-family:none;font-size:15px;line-height:18px;& span{font-weight:bold;font-size:22px;padding:5px;line-height:25px;font-family:BMJUA;}& div{margin-bottom:10px;}& p{line-height:20px;}"]);

/***/ }),

/***/ "./src/components/TourCulture/index.tsx":
/*!**********************************************!*\
  !*** ./src/components/TourCulture/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourCulture\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 21
      }, undefined) : null, infocenterculture ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: infocenterculture
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 11
      }, undefined) : null, parkingculture ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uCC28",
        html: parkingculture
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 27
      }, undefined) : null, parkingfee ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC694\uAE08",
        html: parkingfee
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 23
      }, undefined) : null, usetimeculture ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: usetimeculture
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 11
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 15
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourCulture);

/***/ }),

/***/ "./src/components/TourEvent/index.tsx":
/*!********************************************!*\
  !*** ./src/components/TourEvent/index.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourEvent\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 21
      }, undefined) : null, tel ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: tel
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 16
      }, undefined) : null, usetimefestival ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC694\uAE08",
        html: usetimefestival
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 11
      }, undefined) : null, playtime ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC77C\uC815",
        html: playtime
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 21
      }, undefined) : null, discountinfofestival ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD560\uC778",
        html: discountinfofestival
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 11
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 15
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 29,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourEvent);

/***/ }),

/***/ "./src/components/TourFood/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/TourFood/index.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourFood\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 21
      }, undefined) : null, infocenterfood ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: infocenterfood
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 27
      }, undefined) : null, treatmenu ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBA54\uB274",
        html: treatmenu
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 21,
        columnNumber: 22
      }, undefined) : null, reservationfood ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC5D0\uC57D",
        html: reservationfood
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 11
      }, undefined) : null, restdatefood ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD734\uC77C",
        html: restdatefood
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 25
      }, undefined) : null, opentimefood ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: opentimefood
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 25
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 31,
        columnNumber: 15
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 34,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 16,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourFood);

/***/ }),

/***/ "./src/components/TourMall/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/TourMall/index.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourMall\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 21
      }, undefined) : null, infocentershopping ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: infocentershopping
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 11
      }, undefined) : null, shopguide ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC548\uB0B4",
        html: shopguide
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 22
      }, undefined) : null, restdateshopping ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD734\uC77C",
        html: restdateshopping
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 11
      }, undefined) : null, opentime ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: opentime
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 21
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 15
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 12,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 11,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourMall);

/***/ }),

/***/ "./src/components/TourSleep/index.tsx":
/*!********************************************!*\
  !*** ./src/components/TourSleep/index.tsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourSleep\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 21
      }, undefined) : null, reservationlodging ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: reservationlodging
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 22,
        columnNumber: 11
      }, undefined) : null, reservationurl ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC608\uC57D",
        html: reservationurl
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 27
      }, undefined) : null, checkintime ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uCCB4\uD06C\uC778",
        html: checkintime
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 24
      }, undefined) : null, checkouttime ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uCCB4\uD06C\uC544\uC6C3",
        html: checkouttime
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 25
      }, undefined) : null, refundregulation ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD658\uBD88",
        html: refundregulation
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 11
      }, undefined) : null, scalelodging ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uADDC\uBAA8",
        html: scalelodging
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 25
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.filter(v => v.infoname).map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 37,
        columnNumber: 17
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 18,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 17,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourSleep);

/***/ }),

/***/ "./src/components/TourSports/index.tsx":
/*!*********************************************!*\
  !*** ./src/components/TourSports/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourSports\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 21
      }, undefined) : null, reservation ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC608\uC57D",
        html: reservation
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 24
      }, undefined) : null, infocenterleports ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: infocenterleports
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 16,
        columnNumber: 11
      }, undefined) : null, usetimeleports ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: usetimeleports
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 11
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 15
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 28,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourSports);

/***/ }),

/***/ "./src/components/TourSpot/index.tsx":
/*!*******************************************!*\
  !*** ./src/components/TourSpot/index.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _SubItem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../SubItem */ "./src/components/SubItem/index.tsx");
/* harmony import */ var _SubItem_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SubItem/style */ "./src/components/SubItem/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "C:\\tour\\front\\src\\components\\TourSpot\\index.tsx";





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
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem_style__WEBPACK_IMPORTED_MODULE_2__.IntroWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)("ul", {
      children: [addr1 ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC8FC\uC18C",
        html: addr1
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 18
      }, undefined) : null, homepage ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uD648\uD398\uC774\uC9C0",
        html: homepage
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 13,
        columnNumber: 21
      }, undefined) : null, infocenter ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uBB38\uC758",
        html: infocenter
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 14,
        columnNumber: 23
      }, undefined) : null, usetime ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: "\uC774\uC6A9\uC2DC\uAC04",
        html: usetime
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 20
      }, undefined) : null, item.info ? Array.isArray(item.info) ? item.info.map(v => /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: v.infoname,
        html: v.infotext
      }, v.infoname, false, {
        fileName: _jsxFileName,
        lineNumber: 20,
        columnNumber: 15
      }, undefined)) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__.jsxDEV)(_SubItem__WEBPACK_IMPORTED_MODULE_1__.default, {
        name: item.info.infoname,
        html: item.info.infotext
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 23,
        columnNumber: 13
      }, undefined) : null]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 11,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 10,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TourSpot);

/***/ }),

/***/ "./src/containers/CommentForm/index.tsx":
/*!**********************************************!*\
  !*** ./src/containers/CommentForm/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "sweetalert2");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils_useInput__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../utils/useInput */ "./utils/useInput.ts");
/* harmony import */ var _modules_comment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/comment */ "./src/modules/comment/index.ts");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./style */ "./src/containers/CommentForm/style.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "C:\\tour\\front\\src\\containers\\CommentForm\\index.tsx";










const CommentForm = ({
  item
}) => {
  const [commentText, onChangeCommentText, setCommentText] = (0,_utils_useInput__WEBPACK_IMPORTED_MODULE_5__.default)('');
  const {
    me
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(state => state.user);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const showModal = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(() => {
    return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default().fire({
      title: '로그인 화면 이동',
      text: '댓글을 작성하려면 로그인 하세요.',
      showCancelButton: true,
      confirmButtonText: '이동',
      cancelButtonText: '취소',
      icon: 'warning'
    }).then(result => {
      if (result.isConfirmed) {
        next_router__WEBPACK_IMPORTED_MODULE_1___default().push('/login');
      }
    });
  }, []);
  const onSubmit = react__WEBPACK_IMPORTED_MODULE_2__.useCallback(() => {
    if (!commentText.trim()) {
      return sweetalert2__WEBPACK_IMPORTED_MODULE_4___default().fire({
        title: '댓글을 입력하세요',
        icon: 'warning'
      });
    }

    dispatch(_modules_comment__WEBPACK_IMPORTED_MODULE_6__.addCommentAsync.request({
      contentid: item.contentid,
      commentText
    }));
    setCommentText('');
  }, [commentText, dispatch, item.contentid, setCommentText]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.FormWrapper, {
    children: me ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_0__.Form, {
      onFinish: onSubmit,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.TextAreaWrapper, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.TextArea, {
          rows: 3,
          onChange: onChangeCommentText,
          value: commentText,
          placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 56,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.ButtonWrapper, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_0__.Button, {
          htmlType: "submit",
          type: "primary",
          children: "\uB4F1\uB85D"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 64,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 54,
      columnNumber: 9
    }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_0__.Form, {
      onClick: showModal,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.TextAreaWrapper, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.TextArea, {
          rows: 3,
          placeholder: "\uB313\uAE00\uC744 \uC791\uC131\uD558\uB824\uBA74 \uB85C\uADF8\uC778 \uD558\uC138\uC694."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 11
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_7__.ButtonWrapper, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_0__.Button, {
          htmlType: "submit",
          type: "primary",
          children: "\uB4F1\uB85D"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 75,
          columnNumber: 13
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 74,
        columnNumber: 11
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 70,
      columnNumber: 9
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 52,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentForm);

/***/ }),

/***/ "./src/containers/CommentForm/style.ts":
/*!*********************************************!*\
  !*** ./src/containers/CommentForm/style.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FormWrapper": () => (/* binding */ FormWrapper),
/* harmony export */   "ButtonWrapper": () => (/* binding */ ButtonWrapper),
/* harmony export */   "TextAreaWrapper": () => (/* binding */ TextAreaWrapper),
/* harmony export */   "TextArea": () => (/* binding */ TextArea)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


const FormWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default().div.withConfig({
  displayName: "style__FormWrapper",
  componentId: "sc-1ih6e1f-0"
})(["padding:10px;", "{width:95%;margin:0 auto;}"], ({
  theme
}) => theme.window.laptop);
const ButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Form.Item).withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-1ih6e1f-1"
})(["text-align:end;.ant-btn-primary{background-color:#ffae59;border:#1a73e8;border-radius:5px;&:hover{background-color:#ffb86e;}}"]);
const TextAreaWrapper = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Form.Item).withConfig({
  displayName: "style__TextAreaWrapper",
  componentId: "sc-1ih6e1f-2"
})(["margin-bottom:10px;"]);
const TextArea = styled_components__WEBPACK_IMPORTED_MODULE_1___default().textarea.withConfig({
  displayName: "style__TextArea",
  componentId: "sc-1ih6e1f-3"
})(["width:100%;border-radius:5px;padding:10px;"]);

/***/ }),

/***/ "./src/containers/CommentItem/index.tsx":
/*!**********************************************!*\
  !*** ./src/containers/CommentItem/index.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_comment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../modules/comment */ "./src/modules/comment/index.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./style */ "./src/containers/CommentItem/style.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! sweetalert2 */ "sweetalert2");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _EditForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../EditForm */ "./src/containers/EditForm/index.tsx");
/* harmony import */ var _utils_useToggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/useToggle */ "./utils/useToggle.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "C:\\tour\\front\\src\\containers\\CommentItem\\index.tsx";











const CommentItem = ({
  data
}) => {
  const [editable, onToggleEdit] = (0,_utils_useToggle__WEBPACK_IMPORTED_MODULE_7__.default)(false);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const id = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(state => state.user.me && state.user.me.id);
  const removeComment = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    sweetalert2__WEBPACK_IMPORTED_MODULE_5___default().fire({
      title: '댓글을 정말 삭제하시겠습니까?',
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(_modules_comment__WEBPACK_IMPORTED_MODULE_2__.deleteCommentAsync.request({
          id: data.id,
          contentid: data.contentId
        }));
      }
    });
  }, [dispatch, data.id, data.contentId]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: !editable ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_4__.CommentStyle, {
      mine: id === data.UserId ? 1 : 0,
      actions: [id === data.UserId ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)("span", {
        onClick: onToggleEdit,
        children: "\uC218\uC815"
      }, "comment-modify", false, {
        fileName: _jsxFileName,
        lineNumber: 45,
        columnNumber: 15
      }, undefined) : null, id === data.UserId ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)("span", {
        onClick: removeComment,
        children: "\uC0AD\uC81C"
      }, "comment-delete", false, {
        fileName: _jsxFileName,
        lineNumber: 50,
        columnNumber: 15
      }, undefined) : null],
      author: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)("a", {
        children: data.User.nickname
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 55,
        columnNumber: 19
      }, undefined),
      avatar: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Avatar, {
        children: data.User.nickname.slice(0, 2)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 56,
        columnNumber: 19
      }, undefined),
      content: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)("p", {
        children: data.content
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 57,
        columnNumber: 20
      }, undefined),
      datetime: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)("span", {
        children: new Date(data.createdAt).toLocaleString('ko-KR', {
          timeZone: 'Asia/Seoul'
        })
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 59,
        columnNumber: 13
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 9
    }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_EditForm__WEBPACK_IMPORTED_MODULE_6__.default, {
        text: data.content,
        id: data.id,
        toggleEdit: onToggleEdit,
        contentid: data.contentId
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 68,
        columnNumber: 11
      }, undefined)
    }, void 0, false)
  }, void 0, false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CommentItem);

/***/ }),

/***/ "./src/containers/CommentItem/style.ts":
/*!*********************************************!*\
  !*** ./src/containers/CommentItem/style.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommentStyle": () => (/* binding */ CommentStyle)
/* harmony export */ });
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_1__);


const CommentStyle = styled_components__WEBPACK_IMPORTED_MODULE_1___default()(antd__WEBPACK_IMPORTED_MODULE_0__.Comment).withConfig({
  displayName: "style__CommentStyle",
  componentId: "sc-sxylx3-0"
})(["border-bottom:1px solid #e5e5e5;background-color:", ";padding:0px 20px;"], props => props.mine ? '#f0f0f0' : '#fff');

/***/ }),

/***/ "./src/containers/EditForm/index.tsx":
/*!*******************************************!*\
  !*** ./src/containers/EditForm/index.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CommentForm_style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../CommentForm/style */ "./src/containers/CommentForm/style.ts");
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style */ "./src/containers/EditForm/style.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _modules_comment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../modules/comment */ "./src/modules/comment/index.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! sweetalert2 */ "sweetalert2");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _utils_useInput__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../utils/useInput */ "./utils/useInput.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__);
var _jsxFileName = "C:\\tour\\front\\src\\containers\\EditForm\\index.tsx";










const EditForm = ({
  text,
  id,
  toggleEdit,
  contentid
}) => {
  const [input, onChangeInput] = (0,_utils_useInput__WEBPACK_IMPORTED_MODULE_7__.default)(text);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
  const {
    commentEditedError
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)(state => state.comment);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (commentEditedError) {
      toggleEdit();
    }
  }, [commentEditedError, toggleEdit]);
  const onSubmit = react__WEBPACK_IMPORTED_MODULE_0___default().useCallback(() => {
    if (!input.trim()) {
      return sweetalert2__WEBPACK_IMPORTED_MODULE_6___default().fire({
        title: '댓글을 입력하세요',
        icon: 'warning'
      });
    }

    dispatch(_modules_comment__WEBPACK_IMPORTED_MODULE_5__.modifyCommentAsync.request({
      id,
      editComment: input,
      contentid
    }));
    toggleEdit();
  }, [input, id, dispatch, toggleEdit, contentid]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_CommentForm_style__WEBPACK_IMPORTED_MODULE_2__.FormWrapper, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Form, {
      onFinish: onSubmit,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_CommentForm_style__WEBPACK_IMPORTED_MODULE_2__.TextAreaWrapper, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_CommentForm_style__WEBPACK_IMPORTED_MODULE_2__.TextArea, {
          rows: 3,
          onChange: onChangeInput,
          value: input,
          placeholder: "\uB313\uAE00\uC744 \uC785\uB825\uD558\uC138\uC694."
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 52,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.ButtonWrapper, {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
            htmlType: "submit",
            type: "primary",
            children: "\uC218\uC815"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_3__.CancelButton, {
            onClick: toggleEdit,
            children: "\uCDE8\uC18C"
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 62,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 58,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 51,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 50,
      columnNumber: 7
    }, undefined)
  }, void 0, false, {
    fileName: _jsxFileName,
    lineNumber: 49,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditForm);

/***/ }),

/***/ "./src/containers/EditForm/style.ts":
/*!******************************************!*\
  !*** ./src/containers/EditForm/style.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancelButton": () => (/* binding */ CancelButton),
/* harmony export */   "ButtonWrapper": () => (/* binding */ ButtonWrapper)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);


const CancelButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(antd__WEBPACK_IMPORTED_MODULE_1__.Button).withConfig({
  displayName: "style__CancelButton",
  componentId: "sc-ckebax-0"
})(["background-color:#999999;border:#999999;margin-left:5px;border-radius:5px;color:#fff;&:hover{background-color:#a2a2a2;color:#fff;s}"]);
const ButtonWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__ButtonWrapper",
  componentId: "sc-ckebax-1"
})(["text-align:end;margin-bottom:0px;.ant-btn-primary{background-color:#ffae59;border:#1a73e8;border-radius:5px;&:hover{background-color:#ffb86e;}"]);

/***/ }),

/***/ "./src/containers/Navbar/index.tsx":
/*!*****************************************!*\
  !*** ./src/containers/Navbar/index.tsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ "./node_modules/next/link.js");
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ "./src/containers/Navbar/style.ts");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _modules_user__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/user */ "./src/modules/user/index.ts");
/* harmony import */ var _SearchForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../SearchForm */ "./src/containers/SearchForm/index.tsx");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/HeaderItem */ "./src/components/HeaderItem/index.tsx");
/* harmony import */ var _utils_useToggle__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../utils/useToggle */ "./utils/useToggle.ts");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! next/image */ "./node_modules/next/image.js");
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__);
var _jsxFileName = "C:\\tour\\front\\src\\containers\\Navbar\\index.tsx";













const Navbar = () => {
  const [toggle, toggleHanburger, setToggle] = (0,_utils_useToggle__WEBPACK_IMPORTED_MODULE_8__.default)(false);
  const {
    me
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)(state => state.user);
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
  const onClickLogout = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    dispatch(_modules_user__WEBPACK_IMPORTED_MODULE_4__.logoutAsync.request());
    setToggle(false);
  }, [dispatch, setToggle]);
  const closeHamburger = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    setToggle(false);
  }, [setToggle]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Wrapper, {
    children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.NavbarWrapper, {
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Logo, {
        onClick: closeHamburger,
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
          href: "/",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("a", {
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)((next_image__WEBPACK_IMPORTED_MODULE_9___default()), {
              src: "/logo.png",
              width: 130,
              height: 60,
              alt: "\uC5B4\uB514\uAC08\uB798",
              priority: true
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 42,
              columnNumber: 15
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 41,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 40,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Category, {
        toggle: toggle,
        onClick: toggleHanburger,
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("ul", {
          children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uAD00\uAD11\uC9C0",
            contentTypeId: 12
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 55,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uBB38\uD654\uC2DC\uC124",
            contentTypeId: 14
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 56,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uCD95\uC81C",
            contentTypeId: 15
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 57,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uCF54\uC2A4",
            contentTypeId: 25
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 58,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uB808\uD3EC\uCE20",
            contentTypeId: 28
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 59,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uC219\uBC15",
            contentTypeId: 32
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 60,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uC1FC\uD551",
            contentTypeId: 38
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 61,
            columnNumber: 13
          }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_components_HeaderItem__WEBPACK_IMPORTED_MODULE_7__.default, {
            title: "\uC2DD\uB2F9",
            contentTypeId: 39
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 62,
            columnNumber: 13
          }, undefined)]
        }, void 0, true, {
          fileName: _jsxFileName,
          lineNumber: 54,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 53,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Search, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_SearchForm__WEBPACK_IMPORTED_MODULE_5__.default, {
          label: "pc"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 67,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 66,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Account, {
        toggle: toggle,
        children: me ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.LogoutButton, {
            onClick: onClickLogout,
            children: "\uB85C\uADF8\uC544\uC6C3 "
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 73,
            columnNumber: 15
          }, undefined)
        }, void 0, false) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
            href: "/login",
            children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("a", {
              onClick: closeHamburger,
              children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)("span", {
                children: "\uB85C\uADF8\uC778"
              }, void 0, false, {
                fileName: _jsxFileName,
                lineNumber: 79,
                columnNumber: 19
              }, undefined)
            }, void 0, false, {
              fileName: _jsxFileName,
              lineNumber: 78,
              columnNumber: 17
            }, undefined)
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 77,
            columnNumber: 15
          }, undefined)
        }, void 0, false)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.HamburgerMenu, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.MenuOutlined, {
          onClick: toggleHanburger
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 86,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 85,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 38,
      columnNumber: 7
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.MobileSearch, {
      onClick: closeHamburger,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_10__.jsxDEV)(_SearchForm__WEBPACK_IMPORTED_MODULE_5__.default, {
        label: "mobile"
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 7
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 37,
    columnNumber: 5
  }, undefined);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Navbar);

/***/ }),

/***/ "./src/containers/Navbar/style.ts":
/*!****************************************!*\
  !*** ./src/containers/Navbar/style.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "NavbarWrapper": () => (/* binding */ NavbarWrapper),
/* harmony export */   "MobileSearch": () => (/* binding */ MobileSearch),
/* harmony export */   "Logo": () => (/* binding */ Logo),
/* harmony export */   "Category": () => (/* binding */ Category),
/* harmony export */   "Search": () => (/* binding */ Search),
/* harmony export */   "Account": () => (/* binding */ Account),
/* harmony export */   "HamburgerMenu": () => (/* binding */ HamburgerMenu),
/* harmony export */   "LogoutButton": () => (/* binding */ LogoutButton)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Wrapper",
  componentId: "sc-xf9b14-0"
})(["position:sticky;top:0;z-index:999;height:80px;"]);
const NavbarWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__NavbarWrapper",
  componentId: "sc-xf9b14-1"
})(["display:flex;padding:10px 0;justify-content:center;align-items:center;border-bottom:3px solid #eeeeee;background-color:#fff;", "{flex-direction:column;align-items:flex-start;}"], ({
  theme
}) => theme.window.tablet);
const MobileSearch = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__MobileSearch",
  componentId: "sc-xf9b14-2"
})(["display:none;height:50px;", "{display:flex;width:100%;justify-content:center;align-items:center;height:60px;background-color:#fff;box-shadow:0 1px 3px 0 rgb(0 0 0 / 12%);& form{width:100%;margin:0 5%;}& form input{width:100%;}}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.mobileS);
const Logo = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Logo",
  componentId: "sc-xf9b14-3"
})(["display:flex;justify-content:flex-start;align-items:center;margin-left:30px;flex:1.5;", "{flex:1;}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet);
const Category = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Category",
  componentId: "sc-xf9b14-4"
})(["display:flex;flex:3;justify-content:center;& ul{display:flex;}& a{font-size:18px;font-family:BMJUA;color:#000;margin-left:10px;}", "{display:", ";width:100%;& ul{width:100%;flex-direction:column;}& ul li{margin-left:0;width:100%;text-align:center;&:hover{background-color:#e2e2e2;}}& a{padding:12px 5px;margin-left:0;font-size:22px;}}"], ({
  theme
}) => theme.window.tablet, props => props.toggle ? 'block' : 'none');
const Search = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Search",
  componentId: "sc-xf9b14-5"
})(["display:flex;justify-content:center;flex:2;", "{display:none;}"], ({
  theme
}) => theme.window.laptop);
const Account = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__Account",
  componentId: "sc-xf9b14-6"
})(["display:flex;flex:1;justify-content:flex-end;& a{font-size:15px;color:#fff;background-color:#1a73e8;padding:10px 12px;border-radius:20px;margin-right:30px;&:hover{background-color:#2b7de9;}}", "{display:", ";width:100%;justify-content:center;& a{width:100%;border-radius:0;text-align:center;color:#000;background-color:#fff;padding:12px 5px;font-family:BMJUA;font-size:22px;margin-right:0px;&:hover{background-color:#e2e2e2;}}}"], ({
  theme
}) => theme.window.tablet, props => props.toggle ? 'flex' : 'none');
const HamburgerMenu = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__HamburgerMenu",
  componentId: "sc-xf9b14-7"
})(["display:none;", "{display:block;position:absolute;top:25px;right:20px;font-size:30px;}"], ({
  theme
}) => theme.window.tablet);
const LogoutButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default().button.withConfig({
  displayName: "style__LogoutButton",
  componentId: "sc-xf9b14-8"
})(["padding:6px 10px;border:1px solid #5f6368;border-radius:4px;background-color:#e8eaed;color:#3c3d40;margin-right:30px;cursor:pointer;font-family:'Gowun Batang',serif;font-weight:600;", "{border:none;color:#000;background-color:#fff;padding:12px 5px;font-family:BMJUA;font-size:22px;margin-right:0px;width:100%;&:hover{background-color:#e2e2e2;}}"], ({
  theme
}) => theme.window.tablet);

/***/ }),

/***/ "./src/containers/SearchForm/index.tsx":
/*!*********************************************!*\
  !*** ./src/containers/SearchForm/index.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style */ "./src/containers/SearchForm/style.ts");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ant-design/icons */ "@ant-design/icons");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils_useInput__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/useInput */ "./utils/useInput.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__);
var _jsxFileName = "C:\\tour\\front\\src\\containers\\SearchForm\\index.tsx";








const SearchForm = ({
  label
}) => {
  const [search, onChangeSearch] = (0,_utils_useInput__WEBPACK_IMPORTED_MODULE_4__.default)('');
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
  const onSearch = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(e => {
    e.preventDefault();
    router.push({
      pathname: '/search',
      query: {
        search: search,
        pageNo: 1
      }
    }, `/search?search=${search}`);
  }, [router, search]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("form", {
      onSubmit: onSearch,
      children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.SearchWrapper, {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)("label", {
          htmlFor: `${label}-search`
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 31,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.Input, {
          type: "text",
          id: `${label}-search`,
          value: search,
          onChange: onChangeSearch
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 32,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_style__WEBPACK_IMPORTED_MODULE_2__.SearchButton, {
          type: "submit",
          children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxDEV)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.SearchOutlined, {
            style: {
              color: 'white'
            }
          }, void 0, false, {
            fileName: _jsxFileName,
            lineNumber: 39,
            columnNumber: 13
          }, undefined)
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 38,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 30,
        columnNumber: 9
      }, undefined)
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 7
    }, undefined)
  }, void 0, false);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchForm);

/***/ }),

/***/ "./src/containers/SearchForm/style.ts":
/*!********************************************!*\
  !*** ./src/containers/SearchForm/style.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Input": () => (/* binding */ Input),
/* harmony export */   "SearchButton": () => (/* binding */ SearchButton),
/* harmony export */   "SearchWrapper": () => (/* binding */ SearchWrapper)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);

const Input = styled_components__WEBPACK_IMPORTED_MODULE_0___default().input.withConfig({
  displayName: "style__Input",
  componentId: "sc-qyu68w-0"
})(["border-radius:15px 0 0 15px;color:#fff;border:2px solid #333333;background-color:#333333;border-right:none;padding:15px;width:200px;height:45px;outline:none;font-weight:bold;font-family:BMHANNAAir;font-size:18px;letter-spacing:1px;", "{}", "{}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileS);
const SearchButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default().button.withConfig({
  displayName: "style__SearchButton",
  componentId: "sc-qyu68w-1"
})(["width:45px;height:45px;background:#333333;text-align:center;cursor:pointer;border:none;border-radius:0 15px 15px 0;"]);
const SearchWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "style__SearchWrapper",
  componentId: "sc-qyu68w-2"
})(["width:100%;display:flex;position:relative;& label{position:absolute;top:-1000px;left:-1000px;}", "{justify-content:center;}", "{}", "{}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.tablet, ({
  theme
}) => theme.window.mobileS);

/***/ }),

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











(axios__WEBPACK_IMPORTED_MODULE_0___default().defaults.baseURL) = `http://localhost:8081/api`;
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
/* harmony import */ var _styles_GlobalStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/GlobalStyle */ "./styles/GlobalStyle.ts");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Layout */ "./src/components/Layout/index.tsx");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-helmet */ "react-helmet");
/* harmony import */ var react_helmet__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_helmet__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! antd/dist/antd.css */ "./node_modules/antd/dist/antd.css");
/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__);
var _jsxFileName = "C:\\tour\\front\\src\\pages\\_app.tsx";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















const Tour = ({
  Component,
  pageProps
}) => {
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.Fragment, {
    children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(styled_components__WEBPACK_IMPORTED_MODULE_7__.ThemeProvider, {
      theme: _styles_theme__WEBPACK_IMPORTED_MODULE_8__.default,
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(react_helmet__WEBPACK_IMPORTED_MODULE_11__.Helmet, {
        title: "\uC5B4\uB514\uAC08\uB798",
        htmlAttributes: {
          lang: 'ko'
        },
        meta: [{
          charSet: 'UTF-8'
        }, {
          name: 'viewport',
          content: 'content="width=device-width, initial-scale=0.86, maximum-scale=5.0, minimum-scale=0.86"'
        }, {
          httpEquiv: 'X-UA-Compatible',
          content: 'IE=edge'
        }, {
          name: 'description',
          content: '대한민국 관광지 소개'
        }, {
          name: 'og:title',
          content: '어디갈래?'
        }, {
          name: 'og:description',
          content: '대한민국 관광지 소개'
        }, {
          property: 'og:type',
          content: 'website'
        }, {
          property: 'og:image',
          content: 'https://wdywg.site/favicon.ico'
        }],
        link: [{
          rel: 'shortcut icon',
          href: '/favicon.ico'
        }, {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Gowun+Batang&display=swap'
        }]
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_styles_GlobalStyle__WEBPACK_IMPORTED_MODULE_9__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 70,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_10__.default, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 72,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 71,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 23,
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

/***/ "./src/pages/detail/[...id].tsx":
/*!**************************************!*\
  !*** ./src/pages/detail/[...id].tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_DetailItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/DetailItem */ "./src/components/DetailItem/index.tsx");
/* harmony import */ var _modules_detail__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../modules/detail */ "./src/modules/detail/index.ts");
/* harmony import */ var _containers_CommentForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../containers/CommentForm */ "./src/containers/CommentForm/index.tsx");
/* harmony import */ var _modules_comment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../modules/comment */ "./src/modules/comment/index.ts");
/* harmony import */ var _components_CommentList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/CommentList */ "./src/components/CommentList/index.tsx");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_app */ "./src/pages/_app.tsx");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _modules_user__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../modules/user */ "./src/modules/user/index.ts");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! redux-saga */ "redux-saga");
/* harmony import */ var redux_saga__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(redux_saga__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _components_DetailSkeleton__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../components/DetailSkeleton */ "./src/components/DetailSkeleton/index.tsx");
/* harmony import */ var _styles_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../styles/common */ "./styles/common.ts");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react/jsx-dev-runtime */ "react/jsx-dev-runtime");
/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__);
var _jsxFileName = "C:\\tour\\front\\src\\pages\\detail\\[...id].tsx";
















const Detail = ({
  detail
}) => {
  const router = (0,next_router__WEBPACK_IMPORTED_MODULE_0__.useRouter)();
  const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();
  const {
    item
  } = detail.detailResult.data.items;
  const {
    commentList
  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)(state => state.comment);
  const contentId = router.query.id && router.query.id[1];
  const contentTypeId = router.query.id && router.query.id[0];
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch(_modules_detail__WEBPACK_IMPORTED_MODULE_4__.detailAsync.request({
      contentTypeId: Number(contentTypeId),
      contentId: Number(contentId)
    }));
  }, [contentId, contentTypeId, dispatch]);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    dispatch(_modules_comment__WEBPACK_IMPORTED_MODULE_6__.loadCommentAsync.request({
      contentId: Number(contentId)
    }));
  }, [contentId, dispatch]);
  return /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxDEV)(_styles_common__WEBPACK_IMPORTED_MODULE_13__.DtailWrapper, {
    children: [item ? /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxDEV)(_components_DetailItem__WEBPACK_IMPORTED_MODULE_3__.default, {
      item: item
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 15
    }, undefined) : /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxDEV)(_components_DetailSkeleton__WEBPACK_IMPORTED_MODULE_12__.default, {}, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 41,
      columnNumber: 44
    }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxDEV)(_components_CommentList__WEBPACK_IMPORTED_MODULE_7__.default, {
      data: commentList
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 42,
      columnNumber: 8
    }, undefined), item && /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_14__.jsxDEV)(_containers_CommentForm__WEBPACK_IMPORTED_MODULE_5__.default, {
      item: item
    }, void 0, false, {
      fileName: _jsxFileName,
      lineNumber: 43,
      columnNumber: 16
    }, undefined)]
  }, void 0, true, {
    fileName: _jsxFileName,
    lineNumber: 40,
    columnNumber: 5
  }, undefined);
};

const getServerSideProps = _app__WEBPACK_IMPORTED_MODULE_8__.wrapper.getServerSideProps(store => async ({
  req
}) => {
  const cookie = req ? req.headers.cookie : '';

  if ((axios__WEBPACK_IMPORTED_MODULE_9___default().defaults.headers)) {
    req && cookie ? (axios__WEBPACK_IMPORTED_MODULE_9___default().defaults.headers.Cookie) = cookie : (axios__WEBPACK_IMPORTED_MODULE_9___default().defaults.headers.Cookie) = '';
  }

  store.dispatch(_modules_user__WEBPACK_IMPORTED_MODULE_10__.loadUserAsync.request());
  store.dispatch(redux_saga__WEBPACK_IMPORTED_MODULE_11__.END);
  await store.sagaTask.toPromise();
  return {
    props: {}
  };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_2__.connect)(state => state)(Detail));

/***/ }),

/***/ "./styles/GlobalStyle.ts":
/*!*******************************!*\
  !*** ./styles/GlobalStyle.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_reset__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-reset */ "styled-reset");
/* harmony import */ var styled_reset__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(styled_reset__WEBPACK_IMPORTED_MODULE_1__);


const GlobalStyle = (0,styled_components__WEBPACK_IMPORTED_MODULE_0__.createGlobalStyle)(["", " @font-face{font-display:swap;font-family:\"BMeuljiro\";font-weight:900;src:url(\"/fonts/BMEULJIRO.woff\") format(\"woff\");}@font-face{font-display:swap;font-family:\"BMJUA\";font-weight:600;src:url(\"/fonts/BMJUA.woff\") format(\"woff\");}@font-face{font-display:swap;font-family:\"BMHANNA\";font-weight:600;src:url(\"/fonts/BMHANNA_11yrs.woff\") format(\"woff\");}@font-face{font-display:swap;font-family:\"BMHANNAAir\";src:url(\"/fonts/BMHANNAAir.woff\") format(\"woff\");}"], (styled_reset__WEBPACK_IMPORTED_MODULE_1___default()));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GlobalStyle);

/***/ }),

/***/ "./styles/common.ts":
/*!**************************!*\
  !*** ./styles/common.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bar": () => (/* binding */ Bar),
/* harmony export */   "Li": () => (/* binding */ Li),
/* harmony export */   "Ul": () => (/* binding */ Ul),
/* harmony export */   "Wrapper": () => (/* binding */ Wrapper),
/* harmony export */   "Select": () => (/* binding */ Select),
/* harmony export */   "Title": () => (/* binding */ Title),
/* harmony export */   "NullPage": () => (/* binding */ NullPage),
/* harmony export */   "SortWrapper": () => (/* binding */ SortWrapper),
/* harmony export */   "SortButton": () => (/* binding */ SortButton),
/* harmony export */   "PaginationCustom": () => (/* binding */ PaginationCustom),
/* harmony export */   "TitleWrapper": () => (/* binding */ TitleWrapper),
/* harmony export */   "HotMenu": () => (/* binding */ HotMenu),
/* harmony export */   "DtailWrapper": () => (/* binding */ DtailWrapper)
/* harmony export */ });
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! styled-components */ "styled-components");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(styled_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd */ "antd");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);


const Bar = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__Bar",
  componentId: "sc-1jo7hp9-0"
})(["width:940px;height:30px;background-color:#f89d3d;"]);
const Li = styled_components__WEBPACK_IMPORTED_MODULE_0___default().li.withConfig({
  displayName: "common__Li",
  componentId: "sc-1jo7hp9-1"
})(["margin-left:5px;width:45px;height:40px;border-radius:10px;display:flex;justify-content:center;align-items:center;cursor:pointer;background:#e2e2e2;&.active{background:#6b6969;font-weight:bold;color:#fff;}&:hover{font-weight:bold;}"]);
const Ul = styled_components__WEBPACK_IMPORTED_MODULE_0___default().ul.withConfig({
  displayName: "common__Ul",
  componentId: "sc-1jo7hp9-2"
})(["margin-bottom:30px;display:flex;flex-wrap:wrap;width:100%;"]); // 투어 페이지

const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__Wrapper",
  componentId: "sc-1jo7hp9-3"
})(["display:flex;flex-direction:column;align-items:center;width:980px;margin:0 auto;", "{width:100%;}"], ({
  theme
}) => theme.window.laptop);
const Select = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__Select",
  componentId: "sc-1jo7hp9-4"
})(["display:flex;width:910px;height:42px;", "{width:480px;height:84px;& ul{justify-content:center;}& li{margin-bottom:5px;}}", "{width:300px;height:126px;& li{margin:0 4px 5px;height:35px;width:40px;}}"], ({
  theme
}) => theme.window.laptop, ({
  theme
}) => theme.window.mobileL);
const Title = styled_components__WEBPACK_IMPORTED_MODULE_0___default().h2.withConfig({
  displayName: "common__Title",
  componentId: "sc-1jo7hp9-5"
})(["font-size:40px;font-weight:700;pargin:50px 0;text-align:center;font-family:BMJUA;"]);
const NullPage = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__NullPage",
  componentId: "sc-1jo7hp9-6"
})(["height:100vh;"]); // 공통

const SortWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__SortWrapper",
  componentId: "sc-1jo7hp9-7"
})(["text-align:end;width:100%;margin:30px 50px 10px 0;", "{margin:30px 0px 10px 0;text-align:center;}"], ({
  theme
}) => theme.window.laptop);
const SortButton = styled_components__WEBPACK_IMPORTED_MODULE_0___default().button.withConfig({
  displayName: "common__SortButton",
  componentId: "sc-1jo7hp9-8"
})(["border-radius:10px;border:none;padding:7px 10px;margin-right:5px;cursor:pointer;background:none;&:hover{font-weight:bold;}&.active{font-weight:bold;background:#e2e2e2;}"]);
const PaginationCustom = styled_components__WEBPACK_IMPORTED_MODULE_0___default()(antd__WEBPACK_IMPORTED_MODULE_1__.Pagination).withConfig({
  displayName: "common__PaginationCustom",
  componentId: "sc-1jo7hp9-9"
})(["text-align:center;margin:70px 0;"]); // 메인 화면

const TitleWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__TitleWrapper",
  componentId: "sc-1jo7hp9-10"
})(["margin:50px 0;", "{margin:110px 0 50px;}"], ({
  theme
}) => theme.window.laptop);
const HotMenu = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__HotMenu",
  componentId: "sc-1jo7hp9-11"
})(["display:flex;justify-content:space-between;height:60px;border-radius:30px 30px 0 0;align-items:flex-end;margin:100px 50px 20px 50px;& a{color:#000;& span{font-size:20px;font-family:BMJUA,sans-serif;}& span:last-child{font-size:17px;}}> span:first-child{font-size:40px;font-family:BMHANNA,sans-serif;font-weight:bold;", "{font-size:35px;}}", "{margin:100px 30px 20px 30px;}"], ({
  theme
}) => theme.window.mobileL, ({
  theme
}) => theme.window.mobileL); // 상세 페이지

const DtailWrapper = styled_components__WEBPACK_IMPORTED_MODULE_0___default().div.withConfig({
  displayName: "common__DtailWrapper",
  componentId: "sc-1jo7hp9-12"
})(["width:980px;margin:0 auto;", "{width:100%;}"], ({
  theme
}) => theme.window.laptop);

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

/***/ "./utils/useInput.ts":
/*!***************************!*\
  !*** ./utils/useInput.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
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

/***/ "./utils/useToggle.ts":
/*!****************************!*\
  !*** ./utils/useToggle.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
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

/***/ }),

/***/ "./node_modules/antd/dist/antd.css":
/*!*****************************************!*\
  !*** ./node_modules/antd/dist/antd.css ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/next/image.js":
/*!************************************!*\
  !*** ./node_modules/next/image.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/client/image */ "./node_modules/next/dist/client/image.js")


/***/ }),

/***/ "./node_modules/next/link.js":
/*!***********************************!*\
  !*** ./node_modules/next/link.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./dist/client/link */ "./node_modules/next/dist/client/link.js")


/***/ }),

/***/ "@ant-design/icons":
/*!************************************!*\
  !*** external "@ant-design/icons" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("@ant-design/icons");

/***/ }),

/***/ "antd":
/*!***********************!*\
  !*** external "antd" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("antd");

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

/***/ "../../../server/denormalize-page-path":
/*!************************************************************!*\
  !*** external "next/dist/server/denormalize-page-path.js" ***!
  \************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ "../server/image-config":
/*!***************************************************!*\
  !*** external "next/dist/server/image-config.js" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/image-config.js");

/***/ }),

/***/ "../shared/lib/head":
/*!***********************************************!*\
  !*** external "next/dist/shared/lib/head.js" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ "../i18n/normalize-locale-path":
/*!*********************************************************************!*\
  !*** external "next/dist/shared/lib/i18n/normalize-locale-path.js" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ "../mitt":
/*!***********************************************!*\
  !*** external "next/dist/shared/lib/mitt.js" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ "../shared/lib/router-context":
/*!*********************************************************!*\
  !*** external "next/dist/shared/lib/router-context.js" ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ "../shared/lib/router/utils/get-asset-path-from-route":
/*!*********************************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/get-asset-path-from-route.js" ***!
  \*********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ "./utils/is-dynamic":
/*!******************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/is-dynamic.js" ***!
  \******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ "./utils/parse-relative-url":
/*!**************************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/parse-relative-url.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ "./utils/querystring":
/*!*******************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/querystring.js" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ "./utils/route-matcher":
/*!*********************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/route-matcher.js" ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ "./utils/route-regex":
/*!*******************************************************************!*\
  !*** external "next/dist/shared/lib/router/utils/route-regex.js" ***!
  \*******************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ "../shared/lib/to-base-64":
/*!*****************************************************!*\
  !*** external "next/dist/shared/lib/to-base-64.js" ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/to-base-64.js");

/***/ }),

/***/ "../shared/lib/utils":
/*!************************************************!*\
  !*** external "next/dist/shared/lib/utils.js" ***!
  \************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-helmet":
/*!*******************************!*\
  !*** external "react-helmet" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-helmet");

/***/ }),

/***/ "react-is":
/*!***************************!*\
  !*** external "react-is" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-is");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

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

/***/ "sweetalert2":
/*!******************************!*\
  !*** external "sweetalert2" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("sweetalert2");

/***/ }),

/***/ "typesafe-actions":
/*!***********************************!*\
  !*** external "typesafe-actions" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("typesafe-actions");

/***/ }),

/***/ "?5c99":
/*!******************************************!*\
  !*** ./utils/resolve-rewrites (ignored) ***!
  \******************************************/
/***/ (() => {

/* (ignored) */

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/detail/[...id].tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9pbWFnZS5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2xpbmsuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2guanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2suanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yb3V0ZS1sb2FkZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC91c2UtaW50ZXJzZWN0aW9uLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvd2l0aC1yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3JvdXRlci5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0NvbW1lbnRMaXN0L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0NvbW1lbnRMaXN0L3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvRGV0YWlsSXRlbS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9EZXRhaWxJdGVtL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvRGV0YWlsU2tlbGV0b24vaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvRGV0YWlsU2tlbGV0b24vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Gb290ZXIvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvRm9vdGVyL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvSGVhZGVySXRlbS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9IZWFkZXJJdGVtL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvS2FrYW9tYXAvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvS2FrYW9tYXAvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9MYXlvdXQvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvTGF5b3V0L3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvU3ViSXRlbS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9TdWJJdGVtL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91ckNvdXJzZS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Ub3VyQ291cnNlL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91ckN1bHR1cmUvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91ckV2ZW50L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1RvdXJGb29kL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1RvdXJNYWxsL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1RvdXJTbGVlcC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Ub3VyU3BvcnRzL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1RvdXJTcG90L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL0NvbW1lbnRGb3JtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL0NvbW1lbnRGb3JtL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbnRhaW5lcnMvQ29tbWVudEl0ZW0vaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbnRhaW5lcnMvQ29tbWVudEl0ZW0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9FZGl0Rm9ybS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9FZGl0Rm9ybS9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL05hdmJhci9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9OYXZiYXIvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9TZWFyY2hGb3JtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL1NlYXJjaEZvcm0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L2FjdGlvbi50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2NvbW1lbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L3NhZ2EudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvYWN0aW9uLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvZGV0YWlsL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvZGV0YWlsL3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvc2FnYS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy91c2VyL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9yZWR1Y2VyLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9zYWdhLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL3BhZ2VzL2RldGFpbC9bLi4uaWRdLnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3N0eWxlcy9HbG9iYWxTdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3N0eWxlcy9jb21tb24udHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zdHlsZXMvdGhlbWUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi91dGlscy91c2VJbnB1dC50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3V0aWxzL3VzZVRvZ2dsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2ltYWdlLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvbGluay5qcyIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIkBhbnQtZGVzaWduL2ljb25zXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJhbnRkXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJheGlvc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwiaW1tZXJcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQtcmVkdXgtc2FnYVwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC1yZWR1eC13cmFwcGVyXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9pbWFnZS1jb25maWcuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL2hlYWQuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9taXR0LmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9pcy1keW5hbWljLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcXVlcnlzdHJpbmcuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9yb3V0ZS1tYXRjaGVyLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXguanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3RvLWJhc2UtNjQuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3V0aWxzLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlYWN0LWhlbG1ldFwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVhY3QtaXNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlYWN0LXJlZHV4XCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4XCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4LXNhZ2FcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4LXNhZ2EvZWZmZWN0c1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwic3R5bGVkLWNvbXBvbmVudHNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInN0eWxlZC1yZXNldFwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwic3dlZXRhbGVydDJcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInR5cGVzYWZlLWFjdGlvbnNcIiIsIndlYnBhY2s6Ly9mcm9udC9pZ25vcmVkfEM6XFx0b3VyXFxmcm9udFxcbm9kZV9tb2R1bGVzXFxuZXh0XFxkaXN0XFxzaGFyZWRcXGxpYlxccm91dGVyfC4vdXRpbHMvcmVzb2x2ZS1yZXdyaXRlcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IEltYWdlMTtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX2hlYWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL2hlYWRcIikpO1xudmFyIF90b0Jhc2U2NCA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3RvLWJhc2UtNjRcIik7XG52YXIgX2ltYWdlQ29uZmlnID0gcmVxdWlyZShcIi4uL3NlcnZlci9pbWFnZS1jb25maWdcIik7XG52YXIgX3VzZUludGVyc2VjdGlvbiA9IHJlcXVpcmUoXCIuL3VzZS1pbnRlcnNlY3Rpb25cIik7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gICAgZm9yKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICAgICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24oc3ltKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7XG4gICAgfTtcbiAgICB2YXIgdGFyZ2V0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gICAgdmFyIGtleSwgaTtcbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xuICAgIH07XG4gICAgdmFyIHRhcmdldCA9IHtcbiAgICB9O1xuICAgIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICB2YXIga2V5LCBpO1xuICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspe1xuICAgICAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuY29uc3QgbG9hZGVkSW1hZ2VVUkxzID0gbmV3IFNldCgpO1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZ2xvYmFsLl9fTkVYVF9JTUFHRV9JTVBPUlRFRCA9IHRydWU7XG59XG5jb25zdCBWQUxJRF9MT0FESU5HX1ZBTFVFUyA9IFtcbiAgICAnbGF6eScsXG4gICAgJ2VhZ2VyJyxcbiAgICB1bmRlZmluZWRcbl07XG5jb25zdCBsb2FkZXJzID0gbmV3IE1hcChbXG4gICAgW1xuICAgICAgICAnZGVmYXVsdCcsXG4gICAgICAgIGRlZmF1bHRMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2ltZ2l4JyxcbiAgICAgICAgaW1naXhMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2Nsb3VkaW5hcnknLFxuICAgICAgICBjbG91ZGluYXJ5TG9hZGVyXG4gICAgXSxcbiAgICBbXG4gICAgICAgICdha2FtYWknLFxuICAgICAgICBha2FtYWlMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2N1c3RvbScsXG4gICAgICAgIGN1c3RvbUxvYWRlclxuICAgIF0sIFxuXSk7XG5jb25zdCBWQUxJRF9MQVlPVVRfVkFMVUVTID0gW1xuICAgICdmaWxsJyxcbiAgICAnZml4ZWQnLFxuICAgICdpbnRyaW5zaWMnLFxuICAgICdyZXNwb25zaXZlJyxcbiAgICB1bmRlZmluZWQsIFxuXTtcbmZ1bmN0aW9uIGlzU3RhdGljUmVxdWlyZShzcmMpIHtcbiAgICByZXR1cm4gc3JjLmRlZmF1bHQgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGlzU3RhdGljSW1hZ2VEYXRhKHNyYykge1xuICAgIHJldHVybiBzcmMuc3JjICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc1N0YXRpY0ltcG9ydChzcmMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNyYyA9PT0gJ29iamVjdCcgJiYgKGlzU3RhdGljUmVxdWlyZShzcmMpIHx8IGlzU3RhdGljSW1hZ2VEYXRhKHNyYykpO1xufVxuY29uc3QgeyBkZXZpY2VTaXplczogY29uZmlnRGV2aWNlU2l6ZXMgLCBpbWFnZVNpemVzOiBjb25maWdJbWFnZVNpemVzICwgbG9hZGVyOiBjb25maWdMb2FkZXIgLCBwYXRoOiBjb25maWdQYXRoICwgZG9tYWluczogY29uZmlnRG9tYWlucyAsICB9ID0gcHJvY2Vzcy5lbnYuX19ORVhUX0lNQUdFX09QVFMgfHwgX2ltYWdlQ29uZmlnLmltYWdlQ29uZmlnRGVmYXVsdDtcbi8vIHNvcnQgc21hbGxlc3QgdG8gbGFyZ2VzdFxuY29uc3QgYWxsU2l6ZXMgPSBbXG4gICAgLi4uY29uZmlnRGV2aWNlU2l6ZXMsXG4gICAgLi4uY29uZmlnSW1hZ2VTaXplc1xuXTtcbmNvbmZpZ0RldmljZVNpemVzLnNvcnQoKGEsIGIpPT5hIC0gYlxuKTtcbmFsbFNpemVzLnNvcnQoKGEsIGIpPT5hIC0gYlxuKTtcbmZ1bmN0aW9uIGdldFdpZHRocyh3aWR0aCwgbGF5b3V0LCBzaXplcykge1xuICAgIGlmIChzaXplcyAmJiAobGF5b3V0ID09PSAnZmlsbCcgfHwgbGF5b3V0ID09PSAncmVzcG9uc2l2ZScpKSB7XG4gICAgICAgIC8vIEZpbmQgYWxsIHRoZSBcInZ3XCIgcGVyY2VudCBzaXplcyB1c2VkIGluIHRoZSBzaXplcyBwcm9wXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGhSZSA9IC8oXnxcXHMpKDE/XFxkP1xcZCl2dy9nO1xuICAgICAgICBjb25zdCBwZXJjZW50U2l6ZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBtYXRjaDsgbWF0Y2ggPSB2aWV3cG9ydFdpZHRoUmUuZXhlYyhzaXplcyk7IG1hdGNoKXtcbiAgICAgICAgICAgIHBlcmNlbnRTaXplcy5wdXNoKHBhcnNlSW50KG1hdGNoWzJdKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcmNlbnRTaXplcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHNtYWxsZXN0UmF0aW8gPSBNYXRoLm1pbiguLi5wZXJjZW50U2l6ZXMpICogMC4wMTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBhbGxTaXplcy5maWx0ZXIoKHMpPT5zID49IGNvbmZpZ0RldmljZVNpemVzWzBdICogc21hbGxlc3RSYXRpb1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAga2luZDogJ3cnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aHM6IGFsbFNpemVzLFxuICAgICAgICAgICAga2luZDogJ3cnXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2lkdGggIT09ICdudW1iZXInIHx8IGxheW91dCA9PT0gJ2ZpbGwnIHx8IGxheW91dCA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aHM6IGNvbmZpZ0RldmljZVNpemVzLFxuICAgICAgICAgICAga2luZDogJ3cnXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHdpZHRocyA9IFtcbiAgICAgICAgLi4ubmV3IFNldCgvLyA+IFRoaXMgbWVhbnMgdGhhdCBtb3N0IE9MRUQgc2NyZWVucyB0aGF0IHNheSB0aGV5IGFyZSAzeCByZXNvbHV0aW9uLFxuICAgICAgICAvLyA+IGFyZSBhY3R1YWxseSAzeCBpbiB0aGUgZ3JlZW4gY29sb3IsIGJ1dCBvbmx5IDEuNXggaW4gdGhlIHJlZCBhbmRcbiAgICAgICAgLy8gPiBibHVlIGNvbG9ycy4gU2hvd2luZyBhIDN4IHJlc29sdXRpb24gaW1hZ2UgaW4gdGhlIGFwcCB2cyBhIDJ4XG4gICAgICAgIC8vID4gcmVzb2x1dGlvbiBpbWFnZSB3aWxsIGJlIHZpc3VhbGx5IHRoZSBzYW1lLCB0aG91Z2ggdGhlIDN4IGltYWdlXG4gICAgICAgIC8vID4gdGFrZXMgc2lnbmlmaWNhbnRseSBtb3JlIGRhdGEuIEV2ZW4gdHJ1ZSAzeCByZXNvbHV0aW9uIHNjcmVlbnMgYXJlXG4gICAgICAgIC8vID4gd2FzdGVmdWwgYXMgdGhlIGh1bWFuIGV5ZSBjYW5ub3Qgc2VlIHRoYXQgbGV2ZWwgb2YgZGV0YWlsIHdpdGhvdXRcbiAgICAgICAgLy8gPiBzb21ldGhpbmcgbGlrZSBhIG1hZ25pZnlpbmcgZ2xhc3MuXG4gICAgICAgIC8vIGh0dHBzOi8vYmxvZy50d2l0dGVyLmNvbS9lbmdpbmVlcmluZy9lbl91cy90b3BpY3MvaW5mcmFzdHJ1Y3R1cmUvMjAxOS9jYXBwaW5nLWltYWdlLWZpZGVsaXR5LW9uLXVsdHJhLWhpZ2gtcmVzb2x1dGlvbi1kZXZpY2VzLmh0bWxcbiAgICAgICAgW1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICB3aWR0aCAqIDIgLyosIHdpZHRoICogMyovIFxuICAgICAgICBdLm1hcCgodyk9PmFsbFNpemVzLmZpbmQoKHApPT5wID49IHdcbiAgICAgICAgICAgICkgfHwgYWxsU2l6ZXNbYWxsU2l6ZXMubGVuZ3RoIC0gMV1cbiAgICAgICAgKSksIFxuICAgIF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGhzLFxuICAgICAgICBraW5kOiAneCdcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVJbWdBdHRycyh7IHNyYyAsIHVub3B0aW1pemVkICwgbGF5b3V0ICwgd2lkdGggLCBxdWFsaXR5ICwgc2l6ZXMgLCBsb2FkZXIgIH0pIHtcbiAgICBpZiAodW5vcHRpbWl6ZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgIHNyY1NldDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2l6ZXM6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB7IHdpZHRocyAsIGtpbmQgIH0gPSBnZXRXaWR0aHMod2lkdGgsIGxheW91dCwgc2l6ZXMpO1xuICAgIGNvbnN0IGxhc3QgPSB3aWR0aHMubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaXplczogIXNpemVzICYmIGtpbmQgPT09ICd3JyA/ICcxMDB2dycgOiBzaXplcyxcbiAgICAgICAgc3JjU2V0OiB3aWR0aHMubWFwKCh3LCBpKT0+YCR7bG9hZGVyKHtcbiAgICAgICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICAgICAgcXVhbGl0eSxcbiAgICAgICAgICAgICAgICB3aWR0aDogd1xuICAgICAgICAgICAgfSl9ICR7a2luZCA9PT0gJ3cnID8gdyA6IGkgKyAxfSR7a2luZH1gXG4gICAgICAgICkuam9pbignLCAnKSxcbiAgICAgICAgLy8gSXQncyBpbnRlbmRlZCB0byBrZWVwIGBzcmNgIHRoZSBsYXN0IGF0dHJpYnV0ZSBiZWNhdXNlIFJlYWN0IHVwZGF0ZXNcbiAgICAgICAgLy8gYXR0cmlidXRlcyBpbiBvcmRlci4gSWYgd2Uga2VlcCBgc3JjYCB0aGUgZmlyc3Qgb25lLCBTYWZhcmkgd2lsbFxuICAgICAgICAvLyBpbW1lZGlhdGVseSBzdGFydCB0byBmZXRjaCBgc3JjYCwgYmVmb3JlIGBzaXplc2AgYW5kIGBzcmNTZXRgIGFyZSBldmVuXG4gICAgICAgIC8vIHVwZGF0ZWQgYnkgUmVhY3QuIFRoYXQgY2F1c2VzIG11bHRpcGxlIHVubmVjZXNzYXJ5IHJlcXVlc3RzIGlmIGBzcmNTZXRgXG4gICAgICAgIC8vIGFuZCBgc2l6ZXNgIGFyZSBkZWZpbmVkLlxuICAgICAgICAvLyBUaGlzIGJ1ZyBjYW5ub3QgYmUgcmVwcm9kdWNlZCBpbiBDaHJvbWUgb3IgRmlyZWZveC5cbiAgICAgICAgc3JjOiBsb2FkZXIoe1xuICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgcXVhbGl0eSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aHNbbGFzdF1cbiAgICAgICAgfSlcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0SW50KHgpIHtcbiAgICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh4LCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBkZWZhdWx0SW1hZ2VMb2FkZXIobG9hZGVyUHJvcHMpIHtcbiAgICBjb25zdCBsb2FkID0gbG9hZGVycy5nZXQoY29uZmlnTG9hZGVyKTtcbiAgICBpZiAobG9hZCkge1xuICAgICAgICByZXR1cm4gbG9hZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICAgIHJvb3Q6IGNvbmZpZ1BhdGhcbiAgICAgICAgfSwgbG9hZGVyUHJvcHMpKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIFwibG9hZGVyXCIgZm91bmQgaW4gXCJuZXh0LmNvbmZpZy5qc1wiLiBFeHBlY3RlZDogJHtfaW1hZ2VDb25maWcuVkFMSURfTE9BREVSUy5qb2luKCcsICcpfS4gUmVjZWl2ZWQ6ICR7Y29uZmlnTG9hZGVyfWApO1xufVxuLy8gU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8zOTc3NzgzMy8yNjY1MzUgZm9yIHdoeSB3ZSB1c2UgdGhpcyByZWZcbi8vIGhhbmRsZXIgaW5zdGVhZCBvZiB0aGUgaW1nJ3Mgb25Mb2FkIGF0dHJpYnV0ZS5cbmZ1bmN0aW9uIGhhbmRsZUxvYWRpbmcoaW1nLCBzcmMsIGxheW91dCwgcGxhY2Vob2xkZXIsIG9uTG9hZGluZ0NvbXBsZXRlKSB7XG4gICAgaWYgKCFpbWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoYW5kbGVMb2FkID0gKCk9PntcbiAgICAgICAgaWYgKCFpbWcuc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSAnZGVjb2RlJyBpbiBpbWcgPyBpbWcuZGVjb2RlKCkgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIHAuY2F0Y2goKCk9PntcbiAgICAgICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIgPT09ICdibHVyJykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuZmlsdGVyID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvYWRlZEltYWdlVVJMcy5hZGQoc3JjKTtcbiAgICAgICAgICAgICAgICBpZiAob25Mb2FkaW5nQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBuYXR1cmFsV2lkdGggLCBuYXR1cmFsSGVpZ2h0ICB9ID0gaW1nO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIGJhY2sgcmVhZC1vbmx5IHByaW1pdGl2ZSB2YWx1ZXMgYnV0IG5vdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZXJseWluZyBET00gZWxlbWVudCBiZWNhdXNlIGl0IGNvdWxkIGJlIG1pc3VzZWQuXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZGluZ0NvbXBsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdHVyYWxXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdHVyYWxIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVmID0gaW1nLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGdldENvbXB1dGVkU3R5bGUoaW1nLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF5b3V0ID09PSAncmVzcG9uc2l2ZScgJiYgcGFyZW50LmRpc3BsYXkgPT09ICdmbGV4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBtYXkgbm90IHJlbmRlciBwcm9wZXJseSBhcyBhIGNoaWxkIG9mIGEgZmxleCBjb250YWluZXIuIENvbnNpZGVyIHdyYXBwaW5nIHRoZSBpbWFnZSB3aXRoIGEgZGl2IHRvIGNvbmZpZ3VyZSB0aGUgd2lkdGguYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ZpbGwnICYmIHBhcmVudC5wb3NpdGlvbiAhPT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBtYXkgbm90IHJlbmRlciBwcm9wZXJseSB3aXRoIGEgcGFyZW50IHVzaW5nIHBvc2l0aW9uOlwiJHtwYXJlbnQucG9zaXRpb259XCIuIENvbnNpZGVyIGNoYW5naW5nIHRoZSBwYXJlbnQgc3R5bGUgdG8gcG9zaXRpb246XCJyZWxhdGl2ZVwiIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChpbWcuY29tcGxldGUpIHtcbiAgICAgICAgLy8gSWYgdGhlIHJlYWwgaW1hZ2UgZmFpbHMgdG8gbG9hZCwgdGhpcyB3aWxsIHN0aWxsIHJlbW92ZSB0aGUgcGxhY2Vob2xkZXIuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGRlc2lyZWQgYmVoYXZpb3IgZm9yIG5vdywgYW5kIHdpbGwgYmUgcmV2aXNpdGVkIHdoZW4gZXJyb3JcbiAgICAgICAgLy8gaGFuZGxpbmcgaXMgd29ya2VkIG9uIGZvciB0aGUgaW1hZ2UgY29tcG9uZW50IGl0c2VsZi5cbiAgICAgICAgaGFuZGxlTG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGltZy5vbmxvYWQgPSBoYW5kbGVMb2FkO1xuICAgIH1cbn1cbmZ1bmN0aW9uIEltYWdlMShfcGFyYW0pIHtcbiAgICB2YXIgeyBzcmMgLCBzaXplcyAsIHVub3B0aW1pemVkID1mYWxzZSAsIHByaW9yaXR5ID1mYWxzZSAsIGxvYWRpbmcgLCBsYXp5Qm91bmRhcnkgPScyMDBweCcgLCBjbGFzc05hbWUgLCBxdWFsaXR5ICwgd2lkdGggLCBoZWlnaHQgLCBvYmplY3RGaXQgLCBvYmplY3RQb3NpdGlvbiAsIG9uTG9hZGluZ0NvbXBsZXRlICwgbG9hZGVyID1kZWZhdWx0SW1hZ2VMb2FkZXIgLCBwbGFjZWhvbGRlciA9J2VtcHR5JyAsIGJsdXJEYXRhVVJMICB9ID0gX3BhcmFtLCBhbGwgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3BhcmFtLCBbXCJzcmNcIiwgXCJzaXplc1wiLCBcInVub3B0aW1pemVkXCIsIFwicHJpb3JpdHlcIiwgXCJsb2FkaW5nXCIsIFwibGF6eUJvdW5kYXJ5XCIsIFwiY2xhc3NOYW1lXCIsIFwicXVhbGl0eVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwib2JqZWN0Rml0XCIsIFwib2JqZWN0UG9zaXRpb25cIiwgXCJvbkxvYWRpbmdDb21wbGV0ZVwiLCBcImxvYWRlclwiLCBcInBsYWNlaG9sZGVyXCIsIFwiYmx1ckRhdGFVUkxcIl0pO1xuICAgIGxldCByZXN0ID0gYWxsO1xuICAgIGxldCBsYXlvdXQgPSBzaXplcyA/ICdyZXNwb25zaXZlJyA6ICdpbnRyaW5zaWMnO1xuICAgIGlmICgnbGF5b3V0JyBpbiByZXN0KSB7XG4gICAgICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgbGF5b3V0IGlmIHRoZSB1c2VyIHNwZWNpZmllZCBvbmU6XG4gICAgICAgIGlmIChyZXN0LmxheW91dCkgbGF5b3V0ID0gcmVzdC5sYXlvdXQ7XG4gICAgICAgIC8vIFJlbW92ZSBwcm9wZXJ0eSBzbyBpdCdzIG5vdCBzcHJlYWQgaW50byBpbWFnZTpcbiAgICAgICAgZGVsZXRlIHJlc3RbJ2xheW91dCddO1xuICAgIH1cbiAgICBsZXQgc3RhdGljU3JjID0gJyc7XG4gICAgaWYgKGlzU3RhdGljSW1wb3J0KHNyYykpIHtcbiAgICAgICAgY29uc3Qgc3RhdGljSW1hZ2VEYXRhID0gaXNTdGF0aWNSZXF1aXJlKHNyYykgPyBzcmMuZGVmYXVsdCA6IHNyYztcbiAgICAgICAgaWYgKCFzdGF0aWNJbWFnZURhdGEuc3JjKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIG9iamVjdCBzaG91bGQgb25seSBiZSBwYXNzZWQgdG8gdGhlIGltYWdlIGNvbXBvbmVudCBzcmMgcGFyYW1ldGVyIGlmIGl0IGNvbWVzIGZyb20gYSBzdGF0aWMgaW1hZ2UgaW1wb3J0LiBJdCBtdXN0IGluY2x1ZGUgc3JjLiBSZWNlaXZlZCAke0pTT04uc3RyaW5naWZ5KHN0YXRpY0ltYWdlRGF0YSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYmx1ckRhdGFVUkwgPSBibHVyRGF0YVVSTCB8fCBzdGF0aWNJbWFnZURhdGEuYmx1ckRhdGFVUkw7XG4gICAgICAgIHN0YXRpY1NyYyA9IHN0YXRpY0ltYWdlRGF0YS5zcmM7XG4gICAgICAgIGlmICghbGF5b3V0IHx8IGxheW91dCAhPT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgfHwgc3RhdGljSW1hZ2VEYXRhLmhlaWdodDtcbiAgICAgICAgICAgIHdpZHRoID0gd2lkdGggfHwgc3RhdGljSW1hZ2VEYXRhLndpZHRoO1xuICAgICAgICAgICAgaWYgKCFzdGF0aWNJbWFnZURhdGEuaGVpZ2h0IHx8ICFzdGF0aWNJbWFnZURhdGEud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIG9iamVjdCBzaG91bGQgb25seSBiZSBwYXNzZWQgdG8gdGhlIGltYWdlIGNvbXBvbmVudCBzcmMgcGFyYW1ldGVyIGlmIGl0IGNvbWVzIGZyb20gYSBzdGF0aWMgaW1hZ2UgaW1wb3J0LiBJdCBtdXN0IGluY2x1ZGUgaGVpZ2h0IGFuZCB3aWR0aC4gUmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShzdGF0aWNJbWFnZURhdGEpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNyYyA9IHR5cGVvZiBzcmMgPT09ICdzdHJpbmcnID8gc3JjIDogc3RhdGljU3JjO1xuICAgIGNvbnN0IHdpZHRoSW50ID0gZ2V0SW50KHdpZHRoKTtcbiAgICBjb25zdCBoZWlnaHRJbnQgPSBnZXRJbnQoaGVpZ2h0KTtcbiAgICBjb25zdCBxdWFsaXR5SW50ID0gZ2V0SW50KHF1YWxpdHkpO1xuICAgIGxldCBpc0xhenkgPSAhcHJpb3JpdHkgJiYgKGxvYWRpbmcgPT09ICdsYXp5JyB8fCB0eXBlb2YgbG9hZGluZyA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIGlmIChzcmMuc3RhcnRzV2l0aCgnZGF0YTonKSB8fCBzcmMuc3RhcnRzV2l0aCgnYmxvYjonKSkge1xuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jhc2ljc19vZl9IVFRQL0RhdGFfVVJJc1xuICAgICAgICB1bm9wdGltaXplZCA9IHRydWU7XG4gICAgICAgIGlzTGF6eSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9hZGVkSW1hZ2VVUkxzLmhhcyhzcmMpKSB7XG4gICAgICAgIGlzTGF6eSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSBpcyBtaXNzaW5nIHJlcXVpcmVkIFwic3JjXCIgcHJvcGVydHkuIE1ha2Ugc3VyZSB5b3UgcGFzcyBcInNyY1wiIGluIHByb3BzIHRvIHRoZSBcXGBuZXh0L2ltYWdlXFxgIGNvbXBvbmVudC4gUmVjZWl2ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICBxdWFsaXR5XG4gICAgICAgICAgICB9KX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVZBTElEX0xBWU9VVF9WQUxVRVMuaW5jbHVkZXMobGF5b3V0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibGF5b3V0XCIgcHJvcGVydHkuIFByb3ZpZGVkIFwiJHtsYXlvdXR9XCIgc2hvdWxkIGJlIG9uZSBvZiAke1ZBTElEX0xBWU9VVF9WQUxVRVMubWFwKFN0cmluZykuam9pbignLCcpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHdpZHRoSW50ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hTih3aWR0aEludCkgfHwgdHlwZW9mIGhlaWdodEludCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYU4oaGVpZ2h0SW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwid2lkdGhcIiBvciBcImhlaWdodFwiIHByb3BlcnR5LiBUaGVzZSBzaG91bGQgYmUgbnVtZXJpYyB2YWx1ZXMuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheW91dCA9PT0gJ2ZpbGwnICYmICh3aWR0aCB8fCBoZWlnaHQpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgYW5kIFwibGF5b3V0PSdmaWxsJ1wiIGhhcyB1bnVzZWQgcHJvcGVydGllcyBhc3NpZ25lZC4gUGxlYXNlIHJlbW92ZSBcIndpZHRoXCIgYW5kIFwiaGVpZ2h0XCIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFWQUxJRF9MT0FESU5HX1ZBTFVFUy5pbmNsdWRlcyhsb2FkaW5nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibG9hZGluZ1wiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bG9hZGluZ31cIiBzaG91bGQgYmUgb25lIG9mICR7VkFMSURfTE9BRElOR19WQUxVRVMubWFwKFN0cmluZykuam9pbignLCcpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JpdHkgJiYgbG9hZGluZyA9PT0gJ2xhenknKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGJvdGggXCJwcmlvcml0eVwiIGFuZCBcImxvYWRpbmc9J2xhenknXCIgcHJvcGVydGllcy4gT25seSBvbmUgc2hvdWxkIGJlIHVzZWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09PSAnYmx1cicpIHtcbiAgICAgICAgICAgIGlmIChsYXlvdXQgIT09ICdmaWxsJyAmJiAod2lkdGhJbnQgfHwgMCkgKiAoaGVpZ2h0SW50IHx8IDApIDwgMTYwMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBpcyBzbWFsbGVyIHRoYW4gNDB4NDAuIENvbnNpZGVyIHJlbW92aW5nIHRoZSBcInBsYWNlaG9sZGVyPSdibHVyJ1wiIHByb3BlcnR5IHRvIGltcHJvdmUgcGVyZm9ybWFuY2UuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWJsdXJEYXRhVVJMKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgVkFMSURfQkxVUl9FWFQgPSBbXG4gICAgICAgICAgICAgICAgICAgICdqcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BuZycsXG4gICAgICAgICAgICAgICAgICAgICd3ZWJwJ1xuICAgICAgICAgICAgICAgIF0gLy8gc2hvdWxkIG1hdGNoIG5leHQtaW1hZ2UtbG9hZGVyXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgXCJwbGFjZWhvbGRlcj0nYmx1cidcIiBwcm9wZXJ0eSBidXQgaXMgbWlzc2luZyB0aGUgXCJibHVyRGF0YVVSTFwiIHByb3BlcnR5LlxuICAgICAgICAgIFBvc3NpYmxlIHNvbHV0aW9uczpcbiAgICAgICAgICAgIC0gQWRkIGEgXCJibHVyRGF0YVVSTFwiIHByb3BlcnR5LCB0aGUgY29udGVudHMgc2hvdWxkIGJlIGEgc21hbGwgRGF0YSBVUkwgdG8gcmVwcmVzZW50IHRoZSBpbWFnZVxuICAgICAgICAgICAgLSBDaGFuZ2UgdGhlIFwic3JjXCIgcHJvcGVydHkgdG8gYSBzdGF0aWMgaW1wb3J0IHdpdGggb25lIG9mIHRoZSBzdXBwb3J0ZWQgZmlsZSB0eXBlczogJHtWQUxJRF9CTFVSX0VYVC5qb2luKCcsJyl9XG4gICAgICAgICAgICAtIFJlbW92ZSB0aGUgXCJwbGFjZWhvbGRlclwiIHByb3BlcnR5LCBlZmZlY3RpdmVseSBubyBibHVyIGVmZmVjdFxuICAgICAgICAgIFJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvcGxhY2Vob2xkZXItYmx1ci1kYXRhLXVybGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgncmVmJyBpbiByZXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaXMgdXNpbmcgdW5zdXBwb3J0ZWQgXCJyZWZcIiBwcm9wZXJ0eS4gQ29uc2lkZXIgdXNpbmcgdGhlIFwib25Mb2FkaW5nQ29tcGxldGVcIiBwcm9wZXJ0eSBpbnN0ZWFkLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnc3R5bGUnIGluIHJlc3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBpcyB1c2luZyB1bnN1cHBvcnRlZCBcInN0eWxlXCIgcHJvcGVydHkuIFBsZWFzZSB1c2UgdGhlIFwiY2xhc3NOYW1lXCIgcHJvcGVydHkgaW5zdGVhZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCkgKyAxMDA7XG4gICAgICAgIGlmICghdW5vcHRpbWl6ZWQgJiYgIWxvYWRlcih7XG4gICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICB3aWR0aDogcmFuZCxcbiAgICAgICAgICAgIHF1YWxpdHk6IDc1XG4gICAgICAgIH0pLmluY2x1ZGVzKHJhbmQudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgYSBcImxvYWRlclwiIHByb3BlcnR5IHRoYXQgZG9lcyBub3QgaW1wbGVtZW50IHdpZHRoLiBQbGVhc2UgaW1wbGVtZW50IGl0IG9yIHVzZSB0aGUgXCJ1bm9wdGltaXplZFwiIHByb3BlcnR5IGluc3RlYWQuYCArIGBcXG5SZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaW1hZ2UtbWlzc2luZy1sb2FkZXItd2lkdGhgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBbc2V0UmVmLCBpc0ludGVyc2VjdGVkXSA9ICgwLCBfdXNlSW50ZXJzZWN0aW9uKS51c2VJbnRlcnNlY3Rpb24oe1xuICAgICAgICByb290TWFyZ2luOiBsYXp5Qm91bmRhcnksXG4gICAgICAgIGRpc2FibGVkOiAhaXNMYXp5XG4gICAgfSk7XG4gICAgY29uc3QgaXNWaXNpYmxlID0gIWlzTGF6eSB8fCBpc0ludGVyc2VjdGVkO1xuICAgIGxldCB3cmFwcGVyU3R5bGU7XG4gICAgbGV0IHNpemVyU3R5bGU7XG4gICAgbGV0IHNpemVyU3ZnO1xuICAgIGxldCBpbWdTdHlsZSA9IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICBtYXJnaW46ICdhdXRvJyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgbWluV2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWluSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgICAgICBvYmplY3RGaXQsXG4gICAgICAgIG9iamVjdFBvc2l0aW9uXG4gICAgfTtcbiAgICBjb25zdCBibHVyU3R5bGUgPSBwbGFjZWhvbGRlciA9PT0gJ2JsdXInID8ge1xuICAgICAgICBmaWx0ZXI6ICdibHVyKDIwcHgpJyxcbiAgICAgICAgYmFja2dyb3VuZFNpemU6IG9iamVjdEZpdCB8fCAnY292ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoXCIke2JsdXJEYXRhVVJMfVwiKWAsXG4gICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogb2JqZWN0UG9zaXRpb24gfHwgJzAlIDAlJ1xuICAgIH0gOiB7XG4gICAgfTtcbiAgICBpZiAobGF5b3V0ID09PSAnZmlsbCcpIHtcbiAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgbGF5b3V0PVwiZmlsbFwiIC8+XG4gICAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgbWFyZ2luOiAwXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2lkdGhJbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBoZWlnaHRJbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgLz5cbiAgICAgICAgY29uc3QgcXVvdGllbnQgPSBoZWlnaHRJbnQgLyB3aWR0aEludDtcbiAgICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IGlzTmFOKHF1b3RpZW50KSA/ICcxMDAlJyA6IGAke3F1b3RpZW50ICogMTAwfSVgO1xuICAgICAgICBpZiAobGF5b3V0ID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwicmVzcG9uc2l2ZVwiIC8+XG4gICAgICAgICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2l6ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnaW50cmluc2ljJykge1xuICAgICAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJpbnRyaW5zaWNcIiAvPlxuICAgICAgICAgICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNpemVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2l6ZXJTdmcgPSBgPHN2ZyB3aWR0aD1cIiR7d2lkdGhJbnR9XCIgaGVpZ2h0PVwiJHtoZWlnaHRJbnR9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIi8+YDtcbiAgICAgICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdmaXhlZCcpIHtcbiAgICAgICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiZml4ZWRcIiAvPlxuICAgICAgICAgICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhJbnQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRJbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiAvPlxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG11c3QgdXNlIFwid2lkdGhcIiBhbmQgXCJoZWlnaHRcIiBwcm9wZXJ0aWVzIG9yIFwibGF5b3V0PSdmaWxsJ1wiIHByb3BlcnR5LmApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBpbWdBdHRyaWJ1dGVzID0ge1xuICAgICAgICBzcmM6ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcnLFxuICAgICAgICBzcmNTZXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc2l6ZXM6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICBpbWdBdHRyaWJ1dGVzID0gZ2VuZXJhdGVJbWdBdHRycyh7XG4gICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICB1bm9wdGltaXplZCxcbiAgICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aEludCxcbiAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHlJbnQsXG4gICAgICAgICAgICBzaXplcyxcbiAgICAgICAgICAgIGxvYWRlclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHNyY1N0cmluZyA9IHNyYztcbiAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgc3R5bGU6IHdyYXBwZXJTdHlsZVxuICAgIH0sIHNpemVyU3R5bGUgPyAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBzdHlsZTogc2l6ZXJTdHlsZVxuICAgIH0sIHNpemVyU3ZnID8gLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBwYWRkaW5nOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGFsdDogXCJcIixcbiAgICAgICAgXCJhcmlhLWhpZGRlblwiOiB0cnVlLFxuICAgICAgICBzcmM6IGBkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCR7KDAsIF90b0Jhc2U2NCkudG9CYXNlNjQoc2l6ZXJTdmcpfWBcbiAgICB9KSA6IG51bGwpIDogbnVsbCwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgIH0sIHJlc3QsIGltZ0F0dHJpYnV0ZXMsIHtcbiAgICAgICAgZGVjb2Rpbmc6IFwiYXN5bmNcIixcbiAgICAgICAgXCJkYXRhLW5pbWdcIjogbGF5b3V0LFxuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgcmVmOiAoaW1nKT0+e1xuICAgICAgICAgICAgc2V0UmVmKGltZyk7XG4gICAgICAgICAgICBoYW5kbGVMb2FkaW5nKGltZywgc3JjU3RyaW5nLCBsYXlvdXQsIHBsYWNlaG9sZGVyLCBvbkxvYWRpbmdDb21wbGV0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgfSwgaW1nU3R5bGUsIGJsdXJTdHlsZSlcbiAgICB9KSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB9LCByZXN0LCBnZW5lcmF0ZUltZ0F0dHJzKHtcbiAgICAgICAgc3JjLFxuICAgICAgICB1bm9wdGltaXplZCxcbiAgICAgICAgbGF5b3V0LFxuICAgICAgICB3aWR0aDogd2lkdGhJbnQsXG4gICAgICAgIHF1YWxpdHk6IHF1YWxpdHlJbnQsXG4gICAgICAgIHNpemVzLFxuICAgICAgICBsb2FkZXJcbiAgICB9KSwge1xuICAgICAgICBkZWNvZGluZzogXCJhc3luY1wiLFxuICAgICAgICBcImRhdGEtbmltZ1wiOiBsYXlvdXQsXG4gICAgICAgIHN0eWxlOiBpbWdTdHlsZSxcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgIGxvYWRpbmc6IGxvYWRpbmcgfHwgJ2xhenknXG4gICAgfSkpKSwgcHJpb3JpdHkgPyAvLyBOb3RlIGhvdyB3ZSBvbWl0IHRoZSBgaHJlZmAgYXR0cmlidXRlLCBhcyBpdCB3b3VsZCBvbmx5IGJlIHJlbGV2YW50XG4gICAgLy8gZm9yIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgYGltYWdlc3Jjc2V0YCwgYW5kIGluIHRob3NlIGNhc2VzXG4gICAgLy8gaXQgd291bGQgbGlrZWx5IGNhdXNlIHRoZSBpbmNvcnJlY3QgaW1hZ2UgdG8gYmUgcHJlbG9hZGVkLlxuICAgIC8vXG4gICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2VtYW50aWNzLmh0bWwjYXR0ci1saW5rLWltYWdlc3Jjc2V0XG4gICAgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9oZWFkLmRlZmF1bHQsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xuICAgICAgICBrZXk6ICdfX25pbWctJyArIGltZ0F0dHJpYnV0ZXMuc3JjICsgaW1nQXR0cmlidXRlcy5zcmNTZXQgKyBpbWdBdHRyaWJ1dGVzLnNpemVzLFxuICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICBhczogXCJpbWFnZVwiLFxuICAgICAgICBocmVmOiBpbWdBdHRyaWJ1dGVzLnNyY1NldCA/IHVuZGVmaW5lZCA6IGltZ0F0dHJpYnV0ZXMuc3JjLFxuICAgICAgICAvLyBAdHMtaWdub3JlOiBpbWFnZXNyY3NldCBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZS5cbiAgICAgICAgaW1hZ2VzcmNzZXQ6IGltZ0F0dHJpYnV0ZXMuc3JjU2V0LFxuICAgICAgICAvLyBAdHMtaWdub3JlOiBpbWFnZXNpemVzIGlzIG5vdCB5ZXQgaW4gdGhlIGxpbmsgZWxlbWVudCB0eXBlLlxuICAgICAgICBpbWFnZXNpemVzOiBpbWdBdHRyaWJ1dGVzLnNpemVzXG4gICAgfSkpIDogbnVsbCkpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplU3JjKHNyYykge1xuICAgIHJldHVybiBzcmNbMF0gPT09ICcvJyA/IHNyYy5zbGljZSgxKSA6IHNyYztcbn1cbmZ1bmN0aW9uIGltZ2l4TG9hZGVyKHsgcm9vdCAsIHNyYyAsIHdpZHRoICwgcXVhbGl0eSAgfSkge1xuICAgIC8vIERlbW86IGh0dHBzOi8vc3RhdGljLmltZ2l4Lm5ldC9kYWlzeS5wbmc/YXV0bz1mb3JtYXQmZml0PW1heCZ3PTMwMFxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYCR7cm9vdH0ke25vcm1hbGl6ZVNyYyhzcmMpfWApO1xuICAgIGNvbnN0IHBhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXM7XG4gICAgcGFyYW1zLnNldCgnYXV0bycsIHBhcmFtcy5nZXQoJ2F1dG8nKSB8fCAnZm9ybWF0Jyk7XG4gICAgcGFyYW1zLnNldCgnZml0JywgcGFyYW1zLmdldCgnZml0JykgfHwgJ21heCcpO1xuICAgIHBhcmFtcy5zZXQoJ3cnLCBwYXJhbXMuZ2V0KCd3JykgfHwgd2lkdGgudG9TdHJpbmcoKSk7XG4gICAgaWYgKHF1YWxpdHkpIHtcbiAgICAgICAgcGFyYW1zLnNldCgncScsIHF1YWxpdHkudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIHJldHVybiB1cmwuaHJlZjtcbn1cbmZ1bmN0aW9uIGFrYW1haUxvYWRlcih7IHJvb3QgLCBzcmMgLCB3aWR0aCAgfSkge1xuICAgIHJldHVybiBgJHtyb290fSR7bm9ybWFsaXplU3JjKHNyYyl9P2ltd2lkdGg9JHt3aWR0aH1gO1xufVxuZnVuY3Rpb24gY2xvdWRpbmFyeUxvYWRlcih7IHJvb3QgLCBzcmMgLCB3aWR0aCAsIHF1YWxpdHkgIH0pIHtcbiAgICAvLyBEZW1vOiBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZW1vL2ltYWdlL3VwbG9hZC93XzMwMCxjX2xpbWl0LHFfYXV0by90dXJ0bGVzLmpwZ1xuICAgIGNvbnN0IHBhcmFtcyA9IFtcbiAgICAgICAgJ2ZfYXV0bycsXG4gICAgICAgICdjX2xpbWl0JyxcbiAgICAgICAgJ3dfJyArIHdpZHRoLFxuICAgICAgICAncV8nICsgKHF1YWxpdHkgfHwgJ2F1dG8nKVxuICAgIF07XG4gICAgbGV0IHBhcmFtc1N0cmluZyA9IHBhcmFtcy5qb2luKCcsJykgKyAnLyc7XG4gICAgcmV0dXJuIGAke3Jvb3R9JHtwYXJhbXNTdHJpbmd9JHtub3JtYWxpemVTcmMoc3JjKX1gO1xufVxuZnVuY3Rpb24gY3VzdG9tTG9hZGVyKHsgc3JjICB9KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGlzIG1pc3NpbmcgXCJsb2FkZXJcIiBwcm9wLmAgKyBgXFxuUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWltYWdlLW1pc3NpbmctbG9hZGVyYCk7XG59XG5mdW5jdGlvbiBkZWZhdWx0TG9hZGVyKHsgcm9vdCAsIHNyYyAsIHdpZHRoICwgcXVhbGl0eSAgfSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdWYWx1ZXMgPSBbXTtcbiAgICAgICAgLy8gdGhlc2Ugc2hvdWxkIGFsd2F5cyBiZSBwcm92aWRlZCBidXQgbWFrZSBzdXJlIHRoZXkgYXJlXG4gICAgICAgIGlmICghc3JjKSBtaXNzaW5nVmFsdWVzLnB1c2goJ3NyYycpO1xuICAgICAgICBpZiAoIXdpZHRoKSBtaXNzaW5nVmFsdWVzLnB1c2goJ3dpZHRoJyk7XG4gICAgICAgIGlmIChtaXNzaW5nVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV4dCBJbWFnZSBPcHRpbWl6YXRpb24gcmVxdWlyZXMgJHttaXNzaW5nVmFsdWVzLmpvaW4oJywgJyl9IHRvIGJlIHByb3ZpZGVkLiBNYWtlIHN1cmUgeW91IHBhc3MgdGhlbSBhcyBwcm9wcyB0byB0aGUgXFxgbmV4dC9pbWFnZVxcYCBjb21wb25lbnQuIFJlY2VpdmVkOiAke0pTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgcXVhbGl0eVxuICAgICAgICAgICAgfSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyYy5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBzcmMgXCIke3NyY31cIiBvbiBcXGBuZXh0L2ltYWdlXFxgLCBwcm90b2NvbC1yZWxhdGl2ZSBVUkwgKC8vKSBtdXN0IGJlIGNoYW5nZWQgdG8gYW4gYWJzb2x1dGUgVVJMIChodHRwOi8vIG9yIGh0dHBzOi8vKWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3JjLnN0YXJ0c1dpdGgoJy8nKSAmJiBjb25maWdEb21haW5zKSB7XG4gICAgICAgICAgICBsZXQgcGFyc2VkU3JjO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJzZWRTcmMgPSBuZXcgVVJMKHNyYyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gcGFyc2Ugc3JjIFwiJHtzcmN9XCIgb24gXFxgbmV4dC9pbWFnZVxcYCwgaWYgdXNpbmcgcmVsYXRpdmUgaW1hZ2UgaXQgbXVzdCBzdGFydCB3aXRoIGEgbGVhZGluZyBzbGFzaCBcIi9cIiBvciBiZSBhbiBhYnNvbHV0ZSBVUkwgKGh0dHA6Ly8gb3IgaHR0cHM6Ly8pYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJiAhY29uZmlnRG9tYWlucy5pbmNsdWRlcyhwYXJzZWRTcmMuaG9zdG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNyYyBwcm9wICgke3NyY30pIG9uIFxcYG5leHQvaW1hZ2VcXGAsIGhvc3RuYW1lIFwiJHtwYXJzZWRTcmMuaG9zdG5hbWV9XCIgaXMgbm90IGNvbmZpZ3VyZWQgdW5kZXIgaW1hZ2VzIGluIHlvdXIgXFxgbmV4dC5jb25maWcuanNcXGBcXG5gICsgYFNlZSBtb3JlIGluZm86IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaW1hZ2UtdW5jb25maWd1cmVkLWhvc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYCR7cm9vdH0/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNyYyl9Jnc9JHt3aWR0aH0mcT0ke3F1YWxpdHkgfHwgNzV9YDtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW1hZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF9yb3V0ZXIgPSByZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9yb3V0ZXIvcm91dGVyXCIpO1xudmFyIF9yb3V0ZXIxID0gcmVxdWlyZShcIi4vcm91dGVyXCIpO1xudmFyIF91c2VJbnRlcnNlY3Rpb24gPSByZXF1aXJlKFwiLi91c2UtaW50ZXJzZWN0aW9uXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuY29uc3QgcHJlZmV0Y2hlZCA9IHtcbn07XG5mdW5jdGlvbiBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFyb3V0ZXIpIHJldHVybjtcbiAgICBpZiAoISgwLCBfcm91dGVyKS5pc0xvY2FsVVJMKGhyZWYpKSByZXR1cm47XG4gICAgLy8gUHJlZmV0Y2ggdGhlIEpTT04gcGFnZSBpZiBhc2tlZCAob25seSBpbiB0aGUgY2xpZW50KVxuICAgIC8vIFdlIG5lZWQgdG8gaGFuZGxlIGEgcHJlZmV0Y2ggZXJyb3IgaGVyZSBzaW5jZSB3ZSBtYXkgYmVcbiAgICAvLyBsb2FkaW5nIHdpdGggcHJpb3JpdHkgd2hpY2ggY2FuIHJlamVjdCBidXQgd2UgZG9uJ3RcbiAgICAvLyB3YW50IHRvIGZvcmNlIG5hdmlnYXRpb24gc2luY2UgdGhpcyBpcyBvbmx5IGEgcHJlZmV0Y2hcbiAgICByb3V0ZXIucHJlZmV0Y2goaHJlZiwgYXMsIG9wdGlvbnMpLmNhdGNoKChlcnIpPT57XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyByZXRocm93IHRvIHNob3cgaW52YWxpZCBVUkwgZXJyb3JzXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjdXJMb2NhbGUgPSBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zLmxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlO1xuICAgIC8vIEpvaW4gb24gYW4gaW52YWxpZCBVUkkgY2hhcmFjdGVyXG4gICAgcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXSA9IHRydWU7XG59XG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgICBjb25zdCB7IHRhcmdldCAgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgcmV0dXJuIHRhcmdldCAmJiB0YXJnZXQgIT09ICdfc2VsZicgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5uYXRpdmVFdmVudCAmJiBldmVudC5uYXRpdmVFdmVudC53aGljaCA9PT0gMjtcbn1cbmZ1bmN0aW9uIGxpbmtDbGlja2VkKGUsIHJvdXRlciwgaHJlZiwgYXMsIHJlcGxhY2UsIHNoYWxsb3csIHNjcm9sbCwgbG9jYWxlKSB7XG4gICAgY29uc3QgeyBub2RlTmFtZSAgfSA9IGUuY3VycmVudFRhcmdldDtcbiAgICBpZiAobm9kZU5hbWUgPT09ICdBJyAmJiAoaXNNb2RpZmllZEV2ZW50KGUpIHx8ICEoMCwgX3JvdXRlcikuaXNMb2NhbFVSTChocmVmKSkpIHtcbiAgICAgICAgLy8gaWdub3JlIGNsaWNrIGZvciBicm93c2Vy4oCZcyBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICBhdm9pZCBzY3JvbGwgZm9yIHVybHMgd2l0aCBhbmNob3IgcmVmc1xuICAgIGlmIChzY3JvbGwgPT0gbnVsbCAmJiBhcy5pbmRleE9mKCcjJykgPj0gMCkge1xuICAgICAgICBzY3JvbGwgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gcmVwbGFjZSBzdGF0ZSBpbnN0ZWFkIG9mIHB1c2ggaWYgcHJvcCBpcyBwcmVzZW50XG4gICAgcm91dGVyW3JlcGxhY2UgPyAncmVwbGFjZScgOiAncHVzaCddKGhyZWYsIGFzLCB7XG4gICAgICAgIHNoYWxsb3csXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgc2Nyb2xsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBMaW5rKHByb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUHJvcEVycm9yKGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYEZhaWxlZCBwcm9wIHR5cGU6IFRoZSBwcm9wIFxcYCR7YXJncy5rZXl9XFxgIGV4cGVjdHMgYSAke2FyZ3MuZXhwZWN0ZWR9IGluIFxcYDxMaW5rPlxcYCwgYnV0IGdvdCBcXGAke2FyZ3MuYWN0dWFsfVxcYCBpbnN0ZWFkLmAgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBcIlxcbk9wZW4geW91ciBicm93c2VyJ3MgY29uc29sZSB0byB2aWV3IHRoZSBDb21wb25lbnQgc3RhY2sgdHJhY2UuXCIgOiAnJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkUHJvcHNHdWFyZCA9IHtcbiAgICAgICAgICAgIGhyZWY6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVxdWlyZWRQcm9wcyA9IE9iamVjdC5rZXlzKHJlcXVpcmVkUHJvcHNHdWFyZCk7XG4gICAgICAgIHJlcXVpcmVkUHJvcHMuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2hyZWYnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gPT0gbnVsbCB8fCB0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHByb3BzW2tleV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgIG9yIGBvYmplY3RgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogcHJvcHNba2V5XSA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBwcm9wc1trZXldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgICAgICAgICAgY29uc3QgXyA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgIGNvbnN0IG9wdGlvbmFsUHJvcHNHdWFyZCA9IHtcbiAgICAgICAgICAgIGFzOiB0cnVlLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIHNoYWxsb3c6IHRydWUsXG4gICAgICAgICAgICBwYXNzSHJlZjogdHJ1ZSxcbiAgICAgICAgICAgIHByZWZldGNoOiB0cnVlLFxuICAgICAgICAgICAgbG9jYWxlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbmFsUHJvcHMgPSBPYmplY3Qua2V5cyhvcHRpb25hbFByb3BzR3VhcmQpO1xuICAgICAgICBvcHRpb25hbFByb3BzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgcHJvcHNba2V5XTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhcycpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNba2V5XSAmJiB2YWxUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWxUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdsb2NhbGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gJiYgdmFsVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAncmVwbGFjZScgfHwga2V5ID09PSAnc2Nyb2xsJyB8fCBrZXkgPT09ICdzaGFsbG93JyB8fCBrZXkgPT09ICdwYXNzSHJlZicgfHwga2V5ID09PSAncHJlZmV0Y2gnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gIT0gbnVsbCAmJiB2YWxUeXBlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAnYGJvb2xlYW5gJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgIGNvbnN0IF8gPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUaGlzIGhvb2sgaXMgaW4gYSBjb25kaXRpb25hbCBidXQgdGhhdCBpcyBvayBiZWNhdXNlIGBwcm9jZXNzLmVudi5OT0RFX0VOVmAgbmV2ZXIgY2hhbmdlc1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvcnVsZXMtb2YtaG9va3NcbiAgICAgICAgY29uc3QgaGFzV2FybmVkID0gX3JlYWN0LmRlZmF1bHQudXNlUmVmKGZhbHNlKTtcbiAgICAgICAgaWYgKHByb3BzLnByZWZldGNoICYmICFoYXNXYXJuZWQuY3VycmVudCkge1xuICAgICAgICAgICAgaGFzV2FybmVkLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdOZXh0LmpzIGF1dG8tcHJlZmV0Y2hlcyBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIHZpZXdwb3J0LiBUaGUgcHJlZmV0Y2ggYXR0cmlidXRlIGlzIG5vIGxvbmdlciBuZWVkZWQuIE1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL3ByZWZldGNoLXRydWUtZGVwcmVjYXRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHAgPSBwcm9wcy5wcmVmZXRjaCAhPT0gZmFsc2U7XG4gICAgY29uc3Qgcm91dGVyID0gKDAsIF9yb3V0ZXIxKS51c2VSb3V0ZXIoKTtcbiAgICBjb25zdCB7IGhyZWYgLCBhcyAgfSA9IF9yZWFjdC5kZWZhdWx0LnVzZU1lbW8oKCk9PntcbiAgICAgICAgY29uc3QgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSAoMCwgX3JvdXRlcikucmVzb2x2ZUhyZWYocm91dGVyLCBwcm9wcy5ocmVmLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhyZWY6IHJlc29sdmVkSHJlZixcbiAgICAgICAgICAgIGFzOiBwcm9wcy5hcyA/ICgwLCBfcm91dGVyKS5yZXNvbHZlSHJlZihyb3V0ZXIsIHByb3BzLmFzKSA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmXG4gICAgICAgIH07XG4gICAgfSwgW1xuICAgICAgICByb3V0ZXIsXG4gICAgICAgIHByb3BzLmhyZWYsXG4gICAgICAgIHByb3BzLmFzXG4gICAgXSk7XG4gICAgbGV0IHsgY2hpbGRyZW4gLCByZXBsYWNlICwgc2hhbGxvdyAsIHNjcm9sbCAsIGxvY2FsZSAgfSA9IHByb3BzO1xuICAgIC8vIERlcHJlY2F0ZWQuIFdhcm5pbmcgc2hvd24gYnkgcHJvcFR5cGUgY2hlY2suIElmIHRoZSBjaGlsZHJlbiBwcm92aWRlZCBpcyBhIHN0cmluZyAoPExpbms+ZXhhbXBsZTwvTGluaz4pIHdlIHdyYXAgaXQgaW4gYW4gPGE+IHRhZ1xuICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNoaWxkcmVuID0gLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBjaGlsZHJlbik7XG4gICAgfVxuICAgIC8vIFRoaXMgd2lsbCByZXR1cm4gdGhlIGZpcnN0IGNoaWxkLCBpZiBtdWx0aXBsZSBhcmUgcHJvdmlkZWQgaXQgd2lsbCB0aHJvdyBhbiBlcnJvclxuICAgIGxldCBjaGlsZDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoaWxkID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdWx0aXBsZSBjaGlsZHJlbiB3ZXJlIHBhc3NlZCB0byA8TGluaz4gd2l0aCBcXGBocmVmXFxgIG9mIFxcYCR7cHJvcHMuaHJlZn1cXGAgYnV0IG9ubHkgb25lIGNoaWxkIGlzIHN1cHBvcnRlZCBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9saW5rLW11bHRpcGxlLWNoaWxkcmVuYCArICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IFwiIFxcbk9wZW4geW91ciBicm93c2VyJ3MgY29uc29sZSB0byB2aWV3IHRoZSBDb21wb25lbnQgc3RhY2sgdHJhY2UuXCIgOiAnJykpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcbiAgICB9XG4gICAgY29uc3QgY2hpbGRSZWYgPSBjaGlsZCAmJiB0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnICYmIGNoaWxkLnJlZjtcbiAgICBjb25zdCBbc2V0SW50ZXJzZWN0aW9uUmVmLCBpc1Zpc2libGVdID0gKDAsIF91c2VJbnRlcnNlY3Rpb24pLnVzZUludGVyc2VjdGlvbih7XG4gICAgICAgIHJvb3RNYXJnaW46ICcyMDBweCdcbiAgICB9KTtcbiAgICBjb25zdCBzZXRSZWYgPSBfcmVhY3QuZGVmYXVsdC51c2VDYWxsYmFjaygoZWwpPT57XG4gICAgICAgIHNldEludGVyc2VjdGlvblJlZihlbCk7XG4gICAgICAgIGlmIChjaGlsZFJlZikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZFJlZiA9PT0gJ2Z1bmN0aW9uJykgY2hpbGRSZWYoZWwpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNoaWxkUmVmLmN1cnJlbnQgPSBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgY2hpbGRSZWYsXG4gICAgICAgIHNldEludGVyc2VjdGlvblJlZlxuICAgIF0pO1xuICAgIF9yZWFjdC5kZWZhdWx0LnVzZUVmZmVjdCgoKT0+e1xuICAgICAgICBjb25zdCBzaG91bGRQcmVmZXRjaCA9IGlzVmlzaWJsZSAmJiBwICYmICgwLCBfcm91dGVyKS5pc0xvY2FsVVJMKGhyZWYpO1xuICAgICAgICBjb25zdCBjdXJMb2NhbGUgPSB0eXBlb2YgbG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlO1xuICAgICAgICBjb25zdCBpc1ByZWZldGNoZWQgPSBwcmVmZXRjaGVkW2hyZWYgKyAnJScgKyBhcyArIChjdXJMb2NhbGUgPyAnJScgKyBjdXJMb2NhbGUgOiAnJyldO1xuICAgICAgICBpZiAoc2hvdWxkUHJlZmV0Y2ggJiYgIWlzUHJlZmV0Y2hlZCkge1xuICAgICAgICAgICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywge1xuICAgICAgICAgICAgICAgIGxvY2FsZTogY3VyTG9jYWxlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgYXMsXG4gICAgICAgIGhyZWYsXG4gICAgICAgIGlzVmlzaWJsZSxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBwLFxuICAgICAgICByb3V0ZXJcbiAgICBdKTtcbiAgICBjb25zdCBjaGlsZFByb3BzID0ge1xuICAgICAgICByZWY6IHNldFJlZixcbiAgICAgICAgb25DbGljazogKGUpPT57XG4gICAgICAgICAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICBsaW5rQ2xpY2tlZChlLCByb3V0ZXIsIGhyZWYsIGFzLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNoaWxkUHJvcHMub25Nb3VzZUVudGVyID0gKGUpPT57XG4gICAgICAgIGlmICghKDAsIF9yb3V0ZXIpLmlzTG9jYWxVUkwoaHJlZikpIHJldHVybjtcbiAgICAgICAgaWYgKGNoaWxkLnByb3BzICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlcihlKTtcbiAgICAgICAgfVxuICAgICAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7XG4gICAgICAgICAgICBwcmlvcml0eTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIElmIGNoaWxkIGlzIGFuIDxhPiB0YWcgYW5kIGRvZXNuJ3QgaGF2ZSBhIGhyZWYgYXR0cmlidXRlLCBvciBpZiB0aGUgJ3Bhc3NIcmVmJyBwcm9wZXJ0eSBpc1xuICAgIC8vIGRlZmluZWQsIHdlIHNwZWNpZnkgdGhlIGN1cnJlbnQgJ2hyZWYnLCBzbyB0aGF0IHJlcGV0aXRpb24gaXMgbm90IG5lZWRlZCBieSB0aGUgdXNlclxuICAgIGlmIChwcm9wcy5wYXNzSHJlZiB8fCBjaGlsZC50eXBlID09PSAnYScgJiYgISgnaHJlZicgaW4gY2hpbGQucHJvcHMpKSB7XG4gICAgICAgIGNvbnN0IGN1ckxvY2FsZSA9IHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGU7XG4gICAgICAgIC8vIHdlIG9ubHkgcmVuZGVyIGRvbWFpbiBsb2NhbGVzIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gYSBkb21haW4gbG9jYWxlXG4gICAgICAgIC8vIHNvIHRoYXQgbG9jYWxlIGxpbmtzIGFyZSBzdGlsbCB2aXNpdGFibGUgaW4gZGV2ZWxvcG1lbnQvcHJldmlldyBlbnZzXG4gICAgICAgIGNvbnN0IGxvY2FsZURvbWFpbiA9IHJvdXRlciAmJiByb3V0ZXIuaXNMb2NhbGVEb21haW4gJiYgKDAsIF9yb3V0ZXIpLmdldERvbWFpbkxvY2FsZShhcywgY3VyTG9jYWxlLCByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZXMsIHJvdXRlciAmJiByb3V0ZXIuZG9tYWluTG9jYWxlcyk7XG4gICAgICAgIGNoaWxkUHJvcHMuaHJlZiA9IGxvY2FsZURvbWFpbiB8fCAoMCwgX3JvdXRlcikuYWRkQmFzZVBhdGgoKDAsIF9yb3V0ZXIpLmFkZExvY2FsZShhcywgY3VyTG9jYWxlLCByb3V0ZXIgJiYgcm91dGVyLmRlZmF1bHRMb2NhbGUpKTtcbiAgICB9XG4gICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY2xvbmVFbGVtZW50KGNoaWxkLCBjaGlsZFByb3BzKSk7XG59XG52YXIgX2RlZmF1bHQgPSBMaW5rO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmsuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2g7XG5leHBvcnRzLm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoID0gdm9pZCAwO1xuZnVuY3Rpb24gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICAgIHJldHVybiBwYXRoLmVuZHNXaXRoKCcvJykgJiYgcGF0aCAhPT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuY29uc3Qgbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSBwcm9jZXNzLmVudi5fX05FWFRfVFJBSUxJTkdfU0xBU0ggPyAocGF0aCk9PntcbiAgICBpZiAoL1xcLlteL10rXFwvPyQvLnRlc3QocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGgpO1xuICAgIH0gZWxzZSBpZiAocGF0aC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYXRoICsgJy8nO1xuICAgIH1cbn0gOiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaDtcbmV4cG9ydHMubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2sgPSB2b2lkIDA7XG5jb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYucmVxdWVzdElkbGVDYWxsYmFjayAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2suYmluZCh3aW5kb3cpIHx8IGZ1bmN0aW9uKGNiKSB7XG4gICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY2Ioe1xuICAgICAgICAgICAgZGlkVGltZW91dDogZmFsc2UsXG4gICAgICAgICAgICB0aW1lUmVtYWluaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgNTAgLSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIDEpO1xufTtcbmV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5jb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2sgPSB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2sgJiYgc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2suYmluZCh3aW5kb3cpIHx8IGZ1bmN0aW9uKGlkKSB7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG59O1xuZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2sgPSBjYW5jZWxJZGxlQ2FsbGJhY2s7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVlc3QtaWRsZS1jYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubWFya0Fzc2V0RXJyb3IgPSBtYXJrQXNzZXRFcnJvcjtcbmV4cG9ydHMuaXNBc3NldEVycm9yID0gaXNBc3NldEVycm9yO1xuZXhwb3J0cy5nZXRDbGllbnRCdWlsZE1hbmlmZXN0ID0gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdDtcbmV4cG9ydHMuY3JlYXRlUm91dGVMb2FkZXIgPSBjcmVhdGVSb3V0ZUxvYWRlcjtcbnZhciBfZ2V0QXNzZXRQYXRoRnJvbVJvdXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZVwiKSk7XG52YXIgX3JlcXVlc3RJZGxlQ2FsbGJhY2sgPSByZXF1aXJlKFwiLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2tcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG4vLyAzLjhzIHdhcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgaXQncyB3aGF0IGh0dHBzOi8vd2ViLmRldi9pbnRlcmFjdGl2ZVxuLy8gY29uc2lkZXJzIGFzIFwiR29vZFwiIHRpbWUtdG8taW50ZXJhY3RpdmUuIFdlIG11c3QgYXNzdW1lIHNvbWV0aGluZyB3ZW50XG4vLyB3cm9uZyBiZXlvbmQgdGhpcyBwb2ludCwgYW5kIHRoZW4gZmFsbC1iYWNrIHRvIGEgZnVsbCBwYWdlIHRyYW5zaXRpb24gdG9cbi8vIHNob3cgdGhlIHVzZXIgc29tZXRoaW5nIG9mIHZhbHVlLlxuY29uc3QgTVNfTUFYX0lETEVfREVMQVkgPSAzODAwO1xuZnVuY3Rpb24gd2l0aEZ1dHVyZShrZXksIG1hcCwgZ2VuZXJhdG9yKSB7XG4gICAgbGV0IGVudHJ5ID0gbWFwLmdldChrZXkpO1xuICAgIGlmIChlbnRyeSkge1xuICAgICAgICBpZiAoJ2Z1dHVyZScgaW4gZW50cnkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeS5mdXR1cmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlbnRyeSk7XG4gICAgfVxuICAgIGxldCByZXNvbHZlcjtcbiAgICBjb25zdCBwcm9tID0gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgIHJlc29sdmVyID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgICBtYXAuc2V0KGtleSwgZW50cnkgPSB7XG4gICAgICAgIHJlc29sdmU6IHJlc29sdmVyLFxuICAgICAgICBmdXR1cmU6IHByb21cbiAgICB9KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yID8gZ2VuZXJhdG9yKCkudGhlbigodmFsdWUpPT4ocmVzb2x2ZXIodmFsdWUpLCB2YWx1ZSlcbiAgICApIDogcHJvbTtcbn1cbmZ1bmN0aW9uIGhhc1ByZWZldGNoKGxpbmspIHtcbiAgICB0cnkge1xuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICByZXR1cm4oLy8gZGV0ZWN0IElFMTEgc2luY2UgaXQgc3VwcG9ydHMgcHJlZmV0Y2ggYnV0IGlzbid0IGRldGVjdGVkXG4gICAgICAgIC8vIHdpdGggcmVsTGlzdC5zdXBwb3J0XG4gICAgICAgICghIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSkgfHwgbGluay5yZWxMaXN0LnN1cHBvcnRzKCdwcmVmZXRjaCcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5jb25zdCBjYW5QcmVmZXRjaCA9IGhhc1ByZWZldGNoKCk7XG5mdW5jdGlvbiBwcmVmZXRjaFZpYURvbShocmVmLCBhcywgbGluaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW3JlbD1cInByZWZldGNoXCJdW2hyZWZePVwiJHtocmVmfVwiXWApKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbDpcbiAgICAgICAgaWYgKGFzKSBsaW5rLmFzID0gYXM7XG4gICAgICAgIGxpbmsucmVsID0gYHByZWZldGNoYDtcbiAgICAgICAgbGluay5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU47XG4gICAgICAgIGxpbmsub25sb2FkID0gcmVzO1xuICAgICAgICBsaW5rLm9uZXJyb3IgPSByZWo7XG4gICAgICAgIC8vIGBocmVmYCBzaG91bGQgYWx3YXlzIGJlIGxhc3Q6XG4gICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSk7XG59XG5jb25zdCBBU1NFVF9MT0FEX0VSUk9SID0gU3ltYm9sKCdBU1NFVF9MT0FEX0VSUk9SJyk7XG5mdW5jdGlvbiBtYXJrQXNzZXRFcnJvcihlcnIpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgQVNTRVRfTE9BRF9FUlJPUiwge1xuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNBc3NldEVycm9yKGVycikge1xuICAgIHJldHVybiBlcnIgJiYgQVNTRVRfTE9BRF9FUlJPUiBpbiBlcnI7XG59XG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoc3JjLCBzY3JpcHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWwuXG4gICAgICAgIC8vIDEuIFNldHVwIHN1Y2Nlc3MvZmFpbHVyZSBob29rcyBpbiBjYXNlIHRoZSBicm93c2VyIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gICAgZXhlY3V0ZXMgd2hlbiBgc3JjYCBpcyBzZXQuXG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpPT5yZWplY3QobWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzY3JpcHQ6ICR7c3JjfWApKSlcbiAgICAgICAgO1xuICAgICAgICAvLyAyLiBDb25maWd1cmUgdGhlIGNyb3NzLW9yaWdpbiBhdHRyaWJ1dGUgYmVmb3JlIHNldHRpbmcgYHNyY2AgaW4gY2FzZSB0aGVcbiAgICAgICAgLy8gICAgYnJvd3NlciBiZWdpbnMgdG8gZmV0Y2guXG4gICAgICAgIHNjcmlwdC5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU47XG4gICAgICAgIC8vIDMuIEZpbmFsbHksIHNldCB0aGUgc291cmNlIGFuZCBpbmplY3QgaW50byB0aGUgRE9NIGluIGNhc2UgdGhlIGNoaWxkXG4gICAgICAgIC8vICAgIG11c3QgYmUgYXBwZW5kZWQgZm9yIGZldGNoaW5nIHRvIHN0YXJ0LlxuICAgICAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG59XG4vLyBXZSB3YWl0IGZvciBwYWdlcyB0byBiZSBidWlsdCBpbiBkZXYgYmVmb3JlIHdlIHN0YXJ0IHRoZSByb3V0ZSB0cmFuc2l0aW9uXG4vLyB0aW1lb3V0IHRvIHByZXZlbnQgYW4gdW4tbmVjZXNzYXJ5IGhhcmQgbmF2aWdhdGlvbiBpbiBkZXZlbG9wbWVudC5cbmxldCBkZXZCdWlsZFByb21pc2U7XG4vLyBSZXNvbHZlIGEgcHJvbWlzZSB0aGF0IHRpbWVzIG91dCBhZnRlciBnaXZlbiBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuZnVuY3Rpb24gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChwLCBtcywgZXJyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgcC50aGVuKChyKT0+e1xuICAgICAgICAgICAgLy8gUmVzb2x2ZWQsIGNhbmNlbCB0aGUgdGltZW91dFxuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIC8vIFdlIHdyYXAgdGhlc2UgY2hlY2tzIHNlcGFyYXRlbHkgZm9yIGJldHRlciBkZWFkLWNvZGUgZWxpbWluYXRpb24gaW5cbiAgICAgICAgLy8gcHJvZHVjdGlvbiBidW5kbGVzLlxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgIChkZXZCdWlsZFByb21pc2UgfHwgUHJvbWlzZS5yZXNvbHZlKCkpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PnNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG1zKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+c2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBtcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSB7XG4gICAgaWYgKHNlbGYuX19CVUlMRF9NQU5JRkVTVCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVCk7XG4gICAgfVxuICAgIGNvbnN0IG9uQnVpbGRNYW5pZmVzdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xuICAgICAgICAvLyBNYW5kYXRvcnkgYmVjYXVzZSB0aGlzIGlzIG5vdCBjb25jdXJyZW50IHNhZmU6XG4gICAgICAgIGNvbnN0IGNiID0gc2VsZi5fX0JVSUxEX01BTklGRVNUX0NCO1xuICAgICAgICBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0IgPSAoKT0+e1xuICAgICAgICAgICAgcmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QpO1xuICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChvbkJ1aWxkTWFuaWZlc3QsIE1TX01BWF9JRExFX0RFTEFZLCBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNsaWVudCBidWlsZCBtYW5pZmVzdCcpKSk7XG59XG5mdW5jdGlvbiBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgIHNjcmlwdHM6IFtcbiAgICAgICAgICAgICAgICBhc3NldFByZWZpeCArICcvX25leHQvc3RhdGljL2NodW5rcy9wYWdlcycgKyBlbmNvZGVVUkkoKDAsIF9nZXRBc3NldFBhdGhGcm9tUm91dGUpLmRlZmF1bHQocm91dGUsICcuanMnKSksIFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIC8vIFN0eWxlcyBhcmUgaGFuZGxlZCBieSBgc3R5bGUtbG9hZGVyYCBpbiBkZXZlbG9wbWVudDpcbiAgICAgICAgICAgIGNzczogW11cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkudGhlbigobWFuaWZlc3QpPT57XG4gICAgICAgIGlmICghKHJvdXRlIGluIG1hbmlmZXN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9va3VwIHJvdXRlOiAke3JvdXRlfWApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxGaWxlcyA9IG1hbmlmZXN0W3JvdXRlXS5tYXAoKGVudHJ5KT0+YXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBlbmNvZGVVUkkoZW50cnkpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY3JpcHRzOiBhbGxGaWxlcy5maWx0ZXIoKHYpPT52LmVuZHNXaXRoKCcuanMnKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNzczogYWxsRmlsZXMuZmlsdGVyKCh2KT0+di5lbmRzV2l0aCgnLmNzcycpXG4gICAgICAgICAgICApXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVSb3V0ZUxvYWRlcihhc3NldFByZWZpeCkge1xuICAgIGNvbnN0IGVudHJ5cG9pbnRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGxvYWRlZFNjcmlwdHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgc3R5bGVTaGVldHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm91dGVzID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIG1heWJlRXhlY3V0ZVNjcmlwdChzcmMpIHtcbiAgICAgICAgbGV0IHByb20gPSBsb2FkZWRTY3JpcHRzLmdldChzcmMpO1xuICAgICAgICBpZiAocHJvbSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb207XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2tpcCBleGVjdXRpbmcgc2NyaXB0IGlmIGl0J3MgYWxyZWFkeSBpbiB0aGUgRE9NOlxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyY149XCIke3NyY31cIl1gKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRlZFNjcmlwdHMuc2V0KHNyYywgcHJvbSA9IGFwcGVuZFNjcmlwdChzcmMpKTtcbiAgICAgICAgcmV0dXJuIHByb207XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZldGNoU3R5bGVTaGVldChocmVmKSB7XG4gICAgICAgIGxldCBwcm9tID0gc3R5bGVTaGVldHMuZ2V0KGhyZWYpO1xuICAgICAgICBpZiAocHJvbSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb207XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVTaGVldHMuc2V0KGhyZWYsIHByb20gPSBmZXRjaChocmVmKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3R5bGVzaGVldDogJHtocmVmfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCkudGhlbigodGV4dCk9Pih7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgICAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKGVycik7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHByb207XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHdoZW5FbnRyeXBvaW50IChyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpdGhGdXR1cmUocm91dGUsIGVudHJ5cG9pbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FbnRyeXBvaW50IChyb3V0ZSwgZXhlY3V0ZSkge1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGV4ZWN1dGUpLnRoZW4oKGZuKT0+Zm4oKVxuICAgICAgICAgICAgKS50aGVuKChleHBvcnRzKT0+KHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBleHBvcnRzICYmIGV4cG9ydHMuZGVmYXVsdCB8fCBleHBvcnRzLFxuICAgICAgICAgICAgICAgICAgICBleHBvcnRzOiBleHBvcnRzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICwgKGVycik9Pih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS50aGVuKChpbnB1dCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBvbGQgPSBlbnRyeXBvaW50cy5nZXQocm91dGUpO1xuICAgICAgICAgICAgICAgIGVudHJ5cG9pbnRzLnNldChyb3V0ZSwgaW5wdXQpO1xuICAgICAgICAgICAgICAgIGlmIChvbGQgJiYgJ3Jlc29sdmUnIGluIG9sZCkgb2xkLnJlc29sdmUoaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRSb3V0ZSAocm91dGUsIHByZWZldGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gd2l0aEZ1dHVyZShyb3V0ZSwgcm91dGVzLCAoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlRmlsZXNQcm9taXNlID0gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpLnRoZW4oKHsgc2NyaXB0cyAsIGNzcyAgfSk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5cG9pbnRzLmhhcyhyb3V0ZSkgPyBbXSA6IFByb21pc2UuYWxsKHNjcmlwdHMubWFwKG1heWJlRXhlY3V0ZVNjcmlwdCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoY3NzLm1hcChmZXRjaFN0eWxlU2hlZXQpKSwgXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2hlbkVudHJ5cG9pbnQocm91dGUpLnRoZW4oKGVudHJ5cG9pbnQpPT4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5cG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiByZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldkJ1aWxkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdXRlRmlsZXNQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlRmlsZXNQcm9taXNlLmZpbmFsbHkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQocm91dGVGaWxlc1Byb21pc2UsIE1TX01BWF9JRExFX0RFTEFZLCBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYFJvdXRlIGRpZCBub3QgY29tcGxldGUgbG9hZGluZzogJHtyb3V0ZX1gKSkpLnRoZW4oKHsgZW50cnlwb2ludCAsIHN0eWxlcyAgfSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IHN0eWxlc1xuICAgICAgICAgICAgICAgICAgICB9LCBlbnRyeXBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcicgaW4gZW50cnlwb2ludCA/IGVudHJ5cG9pbnQgOiByZXM7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWZldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGNhY2hlIGVycm9ycyBkdXJpbmcgcHJlZmV0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZWZldGNoIChyb3V0ZSkge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZUxhYnMvcXVpY2tsaW5rL2Jsb2IvNDUzYTY2MWZhMWZhOTQwZTJkMmUwNDQ0NTIzOThlMzhjNjdhOThmYi9zcmMvaW5kZXgubWpzI0wxMTUtTDExOFxuICAgICAgICAgICAgLy8gTGljZW5zZTogQXBhY2hlIDIuMFxuICAgICAgICAgICAgbGV0IGNuO1xuICAgICAgICAgICAgaWYgKGNuID0gbmF2aWdhdG9yLmNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBwcmVmZXRjaCBpZiB1c2luZyAyRyBvciBpZiBTYXZlLURhdGEgaXMgZW5hYmxlZC5cbiAgICAgICAgICAgICAgICBpZiAoY24uc2F2ZURhdGEgfHwgLzJnLy50ZXN0KGNuLmVmZmVjdGl2ZVR5cGUpKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpLnRoZW4oKG91dHB1dCk9PlByb21pc2UuYWxsKGNhblByZWZldGNoID8gb3V0cHV0LnNjcmlwdHMubWFwKChzY3JpcHQpPT5wcmVmZXRjaFZpYURvbShzY3JpcHQsICdzY3JpcHQnKVxuICAgICAgICAgICAgICAgICkgOiBbXSlcbiAgICAgICAgICAgICkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+dGhpcy5sb2FkUm91dGUocm91dGUsIHRydWUpLmNhdGNoKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKC8vIHN3YWxsb3cgcHJlZmV0Y2ggZXJyb3JzXG4gICAgICAgICAgICAoKT0+e1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZS1sb2FkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSb3V0ZXJcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9yb3V0ZXIuZGVmYXVsdDtcbiAgICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpdGhSb3V0ZXJcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF93aXRoUm91dGVyLmRlZmF1bHQ7XG4gICAgfVxufSk7XG5leHBvcnRzLnVzZVJvdXRlciA9IHVzZVJvdXRlcjtcbmV4cG9ydHMuY3JlYXRlUm91dGVyID0gY3JlYXRlUm91dGVyO1xuZXhwb3J0cy5tYWtlUHVibGljUm91dGVySW5zdGFuY2UgPSBtYWtlUHVibGljUm91dGVySW5zdGFuY2U7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF9yb3V0ZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3JvdXRlci9yb3V0ZXJcIikpO1xudmFyIF9yb3V0ZXJDb250ZXh0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvcm91dGVyLWNvbnRleHRcIik7XG52YXIgX3dpdGhSb3V0ZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3dpdGgtcm91dGVyXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmNvbnN0IHNpbmdsZXRvblJvdXRlciA9IHtcbiAgICByb3V0ZXI6IG51bGwsXG4gICAgcmVhZHlDYWxsYmFja3M6IFtdLFxuICAgIHJlYWR5IChjYikge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIpIHJldHVybiBjYigpO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlDYWxsYmFja3MucHVzaChjYik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLy8gQ3JlYXRlIHB1YmxpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSByb3V0ZXIgaW4gdGhlIHNpbmdsZXRvblJvdXRlclxuY29uc3QgdXJsUHJvcGVydHlGaWVsZHMgPSBbXG4gICAgJ3BhdGhuYW1lJyxcbiAgICAncm91dGUnLFxuICAgICdxdWVyeScsXG4gICAgJ2FzUGF0aCcsXG4gICAgJ2NvbXBvbmVudHMnLFxuICAgICdpc0ZhbGxiYWNrJyxcbiAgICAnYmFzZVBhdGgnLFxuICAgICdsb2NhbGUnLFxuICAgICdsb2NhbGVzJyxcbiAgICAnZGVmYXVsdExvY2FsZScsXG4gICAgJ2lzUmVhZHknLFxuICAgICdpc1ByZXZpZXcnLFxuICAgICdpc0xvY2FsZURvbWFpbicsXG4gICAgJ2RvbWFpbkxvY2FsZXMnLCBcbl07XG5jb25zdCByb3V0ZXJFdmVudHMgPSBbXG4gICAgJ3JvdXRlQ2hhbmdlU3RhcnQnLFxuICAgICdiZWZvcmVIaXN0b3J5Q2hhbmdlJyxcbiAgICAncm91dGVDaGFuZ2VDb21wbGV0ZScsXG4gICAgJ3JvdXRlQ2hhbmdlRXJyb3InLFxuICAgICdoYXNoQ2hhbmdlU3RhcnQnLFxuICAgICdoYXNoQ2hhbmdlQ29tcGxldGUnLCBcbl07XG5jb25zdCBjb3JlTWV0aG9kRmllbGRzID0gW1xuICAgICdwdXNoJyxcbiAgICAncmVwbGFjZScsXG4gICAgJ3JlbG9hZCcsXG4gICAgJ2JhY2snLFxuICAgICdwcmVmZXRjaCcsXG4gICAgJ2JlZm9yZVBvcFN0YXRlJywgXG5dO1xuLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgJ2V2ZW50cycsIHtcbiAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gX3JvdXRlci5kZWZhdWx0LmV2ZW50cztcbiAgICB9XG59KTtcbnVybFByb3BlcnR5RmllbGRzLmZvckVhY2goKGZpZWxkKT0+e1xuICAgIC8vIEhlcmUgd2UgbmVlZCB0byB1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGJlY2F1c2Ugd2UgbmVlZCB0byByZXR1cm5cbiAgICAvLyB0aGUgcHJvcGVydHkgYXNzaWduZWQgdG8gdGhlIGFjdHVhbCByb3V0ZXJcbiAgICAvLyBUaGUgdmFsdWUgbWlnaHQgZ2V0IGNoYW5nZWQgYXMgd2UgY2hhbmdlIHJvdXRlcyBhbmQgdGhpcyBpcyB0aGVcbiAgICAvLyBwcm9wZXIgd2F5IHRvIGFjY2VzcyBpdFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsIGZpZWxkLCB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKTtcbiAgICAgICAgICAgIHJldHVybiByb3V0ZXJbZmllbGRdO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbmNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpPT57XG4gICAgc2luZ2xldG9uUm91dGVyW2ZpZWxkXSA9ICguLi5hcmdzKT0+e1xuICAgICAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKTtcbiAgICAgICAgcmV0dXJuIHJvdXRlcltmaWVsZF0oLi4uYXJncyk7XG4gICAgfTtcbn0pO1xucm91dGVyRXZlbnRzLmZvckVhY2goKGV2ZW50KT0+e1xuICAgIHNpbmdsZXRvblJvdXRlci5yZWFkeSgoKT0+e1xuICAgICAgICBfcm91dGVyLmRlZmF1bHQuZXZlbnRzLm9uKGV2ZW50LCAoLi4uYXJncyk9PntcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RmllbGQgPSBgb24ke2V2ZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7ZXZlbnQuc3Vic3RyaW5nKDEpfWA7XG4gICAgICAgICAgICBjb25zdCBfc2luZ2xldG9uUm91dGVyID0gc2luZ2xldG9uUm91dGVyO1xuICAgICAgICAgICAgaWYgKF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciB3aGVuIHJ1bm5pbmcgdGhlIFJvdXRlciBldmVudDogJHtldmVudEZpZWxkfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2Vyci5tZXNzYWdlfVxcbiR7ZXJyLnN0YWNrfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbmZ1bmN0aW9uIGdldFJvdXRlcigpIHtcbiAgICBpZiAoIXNpbmdsZXRvblJvdXRlci5yb3V0ZXIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9ICdObyByb3V0ZXIgaW5zdGFuY2UgZm91bmQuXFxuJyArICdZb3Ugc2hvdWxkIG9ubHkgdXNlIFwibmV4dC9yb3V0ZXJcIiBvbiB0aGUgY2xpZW50IHNpZGUgb2YgeW91ciBhcHAuXFxuJztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlcjtcbn1cbnZhciBfZGVmYXVsdCA9IHNpbmdsZXRvblJvdXRlcjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICAgIHJldHVybiBfcmVhY3QuZGVmYXVsdC51c2VDb250ZXh0KF9yb3V0ZXJDb250ZXh0LlJvdXRlckNvbnRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlUm91dGVyKC4uLmFyZ3MpIHtcbiAgICBzaW5nbGV0b25Sb3V0ZXIucm91dGVyID0gbmV3IF9yb3V0ZXIuZGVmYXVsdCguLi5hcmdzKTtcbiAgICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MuZm9yRWFjaCgoY2IpPT5jYigpXG4gICAgKTtcbiAgICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MgPSBbXTtcbiAgICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlcjtcbn1cbmZ1bmN0aW9uIG1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZShyb3V0ZXIpIHtcbiAgICBjb25zdCBfcm91dGVyMSA9IHJvdXRlcjtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICB9O1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgdXJsUHJvcGVydHlGaWVsZHMpe1xuICAgICAgICBpZiAodHlwZW9mIF9yb3V0ZXIxW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IE9iamVjdC5hc3NpZ24oQXJyYXkuaXNBcnJheShfcm91dGVyMVtwcm9wZXJ0eV0pID8gW10gOiB7XG4gICAgICAgICAgICB9LCBfcm91dGVyMVtwcm9wZXJ0eV0pIC8vIG1ha2VzIHN1cmUgcXVlcnkgaXMgbm90IHN0YXRlZnVsXG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBfcm91dGVyMVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbiAgICBpbnN0YW5jZS5ldmVudHMgPSBfcm91dGVyLmRlZmF1bHQuZXZlbnRzO1xuICAgIGNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpPT57XG4gICAgICAgIGluc3RhbmNlW2ZpZWxkXSA9ICguLi5hcmdzKT0+e1xuICAgICAgICAgICAgcmV0dXJuIF9yb3V0ZXIxW2ZpZWxkXSguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdXRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudXNlSW50ZXJzZWN0aW9uID0gdXNlSW50ZXJzZWN0aW9uO1xudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBfcmVxdWVzdElkbGVDYWxsYmFjayA9IHJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtcbmNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gdHlwZW9mIEludGVyc2VjdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcbmZ1bmN0aW9uIHVzZUludGVyc2VjdGlvbih7IHJvb3RNYXJnaW4gLCBkaXNhYmxlZCAgfSkge1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBkaXNhYmxlZCB8fCAhaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gICAgY29uc3QgdW5vYnNlcnZlID0gKDAsIF9yZWFjdCkudXNlUmVmKCk7XG4gICAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gKDAsIF9yZWFjdCkudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHNldFJlZiA9ICgwLCBfcmVhY3QpLnVzZUNhbGxiYWNrKChlbCk9PntcbiAgICAgICAgaWYgKHVub2JzZXJ2ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICB1bm9ic2VydmUuY3VycmVudCgpO1xuICAgICAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzYWJsZWQgfHwgdmlzaWJsZSkgcmV0dXJuO1xuICAgICAgICBpZiAoZWwgJiYgZWwudGFnTmFtZSkge1xuICAgICAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSBvYnNlcnZlKGVsLCAoaXNWaXNpYmxlKT0+aXNWaXNpYmxlICYmIHNldFZpc2libGUoaXNWaXNpYmxlKVxuICAgICAgICAgICAgLCB7XG4gICAgICAgICAgICAgICAgcm9vdE1hcmdpblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGlzRGlzYWJsZWQsXG4gICAgICAgIHJvb3RNYXJnaW4sXG4gICAgICAgIHZpc2libGVcbiAgICBdKTtcbiAgICAoMCwgX3JlYWN0KS51c2VFZmZlY3QoKCk9PntcbiAgICAgICAgaWYgKCFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRsZUNhbGxiYWNrID0gKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT5zZXRWaXNpYmxlKHRydWUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCk9PigwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykuY2FuY2VsSWRsZUNhbGxiYWNrKGlkbGVDYWxsYmFjaylcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIHZpc2libGVcbiAgICBdKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBzZXRSZWYsXG4gICAgICAgIHZpc2libGVcbiAgICBdO1xufVxuZnVuY3Rpb24gb2JzZXJ2ZShlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgaWQgLCBvYnNlcnZlciAsIGVsZW1lbnRzICB9ID0gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucyk7XG4gICAgZWxlbWVudHMuc2V0KGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1bm9ic2VydmUoKSB7XG4gICAgICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KTtcbiAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xuICAgICAgICAvLyBEZXN0cm95IG9ic2VydmVyIHdoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gd2F0Y2g6XG4gICAgICAgIGlmIChlbGVtZW50cy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBvYnNlcnZlcnMuZGVsZXRlKGlkKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5jb25zdCBvYnNlcnZlcnMgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihvcHRpb25zKSB7XG4gICAgY29uc3QgaWQgPSBvcHRpb25zLnJvb3RNYXJnaW4gfHwgJyc7XG4gICAgbGV0IGluc3RhbmNlID0gb2JzZXJ2ZXJzLmdldChpZCk7XG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpPT57XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpPT57XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGlzVmlzaWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIG9wdGlvbnMpO1xuICAgIG9ic2VydmVycy5zZXQoaWQsIGluc3RhbmNlID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgb2JzZXJ2ZXIsXG4gICAgICAgIGVsZW1lbnRzXG4gICAgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2UtaW50ZXJzZWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gd2l0aFJvdXRlcjtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3JvdXRlciA9IHJlcXVpcmUoXCIuL3JvdXRlclwiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHdpdGhSb3V0ZXIoQ29tcG9zZWRDb21wb25lbnQpIHtcbiAgICBmdW5jdGlvbiBXaXRoUm91dGVyV3JhcHBlcihwcm9wcykge1xuICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvbXBvc2VkQ29tcG9uZW50LCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHJvdXRlcjogKDAsIF9yb3V0ZXIpLnVzZVJvdXRlcigpXG4gICAgICAgIH0sIHByb3BzKSkpO1xuICAgIH1cbiAgICBXaXRoUm91dGVyV3JhcHBlci5nZXRJbml0aWFsUHJvcHMgPSBDb21wb3NlZENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHM7XG4gICAgV2l0aFJvdXRlcldyYXBwZXIub3JpZ0dldEluaXRpYWxQcm9wcyA9IENvbXBvc2VkQ29tcG9uZW50Lm9yaWdHZXRJbml0aWFsUHJvcHM7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IENvbXBvc2VkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvc2VkQ29tcG9uZW50Lm5hbWUgfHwgJ1Vua25vd24nO1xuICAgICAgICBXaXRoUm91dGVyV3JhcHBlci5kaXNwbGF5TmFtZSA9IGB3aXRoUm91dGVyKCR7bmFtZX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIFdpdGhSb3V0ZXJXcmFwcGVyO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD13aXRoLXJvdXRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2V0RG9tYWluTG9jYWxlID0gZ2V0RG9tYWluTG9jYWxlO1xuZXhwb3J0cy5hZGRMb2NhbGUgPSBhZGRMb2NhbGU7XG5leHBvcnRzLmRlbExvY2FsZSA9IGRlbExvY2FsZTtcbmV4cG9ydHMuaGFzQmFzZVBhdGggPSBoYXNCYXNlUGF0aDtcbmV4cG9ydHMuYWRkQmFzZVBhdGggPSBhZGRCYXNlUGF0aDtcbmV4cG9ydHMuZGVsQmFzZVBhdGggPSBkZWxCYXNlUGF0aDtcbmV4cG9ydHMuaXNMb2NhbFVSTCA9IGlzTG9jYWxVUkw7XG5leHBvcnRzLmludGVycG9sYXRlQXMgPSBpbnRlcnBvbGF0ZUFzO1xuZXhwb3J0cy5yZXNvbHZlSHJlZiA9IHJlc29sdmVIcmVmO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoID0gcmVxdWlyZShcIi4uLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2hcIik7XG52YXIgX3JvdXRlTG9hZGVyID0gcmVxdWlyZShcIi4uLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXJcIik7XG52YXIgX2Rlbm9ybWFsaXplUGFnZVBhdGggPSByZXF1aXJlKFwiLi4vLi4vLi4vc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aFwiKTtcbnZhciBfbm9ybWFsaXplTG9jYWxlUGF0aCA9IHJlcXVpcmUoXCIuLi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aFwiKTtcbnZhciBfbWl0dCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL21pdHRcIikpO1xudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciBfaXNEeW5hbWljID0gcmVxdWlyZShcIi4vdXRpbHMvaXMtZHluYW1pY1wiKTtcbnZhciBfcGFyc2VSZWxhdGl2ZVVybCA9IHJlcXVpcmUoXCIuL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybFwiKTtcbnZhciBfcXVlcnlzdHJpbmcgPSByZXF1aXJlKFwiLi91dGlscy9xdWVyeXN0cmluZ1wiKTtcbnZhciBfcmVzb2x2ZVJld3JpdGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9yZXNvbHZlLXJld3JpdGVzXCIpKTtcbnZhciBfcm91dGVNYXRjaGVyID0gcmVxdWlyZShcIi4vdXRpbHMvcm91dGUtbWF0Y2hlclwiKTtcbnZhciBfcm91dGVSZWdleCA9IHJlcXVpcmUoXCIuL3V0aWxzL3JvdXRlLXJlZ2V4XCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxubGV0IGRldGVjdERvbWFpbkxvY2FsZTtcbmlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgZGV0ZWN0RG9tYWluTG9jYWxlID0gcmVxdWlyZSgnLi4vaTE4bi9kZXRlY3QtZG9tYWluLWxvY2FsZScpLmRldGVjdERvbWFpbkxvY2FsZTtcbn1cbmNvbnN0IGJhc2VQYXRoID0gcHJvY2Vzcy5lbnYuX19ORVhUX1JPVVRFUl9CQVNFUEFUSCB8fCAnJztcbmZ1bmN0aW9uIGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdSb3V0ZSBDYW5jZWxsZWQnKSwge1xuICAgICAgICBjYW5jZWxsZWQ6IHRydWVcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFBhdGhQcmVmaXgocGF0aCwgcHJlZml4KSB7XG4gICAgcmV0dXJuIHByZWZpeCAmJiBwYXRoLnN0YXJ0c1dpdGgoJy8nKSA/IHBhdGggPT09ICcvJyA/ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2gocHJlZml4KSA6IGAke3ByZWZpeH0ke3BhdGhOb1F1ZXJ5SGFzaChwYXRoKSA9PT0gJy8nID8gcGF0aC5zdWJzdHJpbmcoMSkgOiBwYXRofWAgOiBwYXRoO1xufVxuZnVuY3Rpb24gZ2V0RG9tYWluTG9jYWxlKHBhdGgsIGxvY2FsZSwgbG9jYWxlcywgZG9tYWluTG9jYWxlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIGxvY2FsZSA9IGxvY2FsZSB8fCAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGF0aCwgbG9jYWxlcykuZGV0ZWN0ZWRMb2NhbGU7XG4gICAgICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKGRvbWFpbkxvY2FsZXMsIHVuZGVmaW5lZCwgbG9jYWxlKTtcbiAgICAgICAgaWYgKGRldGVjdGVkRG9tYWluKSB7XG4gICAgICAgICAgICByZXR1cm4gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke2RldGVjdGVkRG9tYWluLmRvbWFpbn0ke2Jhc2VQYXRoIHx8ICcnfSR7bG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlID8gJycgOiBgLyR7bG9jYWxlfWB9JHtwYXRofWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRMb2NhbGUocGF0aCwgbG9jYWxlLCBkZWZhdWx0TG9jYWxlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSBwYXRoTm9RdWVyeUhhc2gocGF0aCk7XG4gICAgICAgIGNvbnN0IHBhdGhMb3dlciA9IHBhdGhuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxvY2FsZUxvd2VyID0gbG9jYWxlICYmIGxvY2FsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG9jYWxlICYmIGxvY2FsZSAhPT0gZGVmYXVsdExvY2FsZSAmJiAhcGF0aExvd2VyLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlTG93ZXIgKyAnLycpICYmIHBhdGhMb3dlciAhPT0gJy8nICsgbG9jYWxlTG93ZXIgPyBhZGRQYXRoUHJlZml4KHBhdGgsICcvJyArIGxvY2FsZSkgOiBwYXRoO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbmZ1bmN0aW9uIGRlbExvY2FsZShwYXRoLCBsb2NhbGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICBjb25zdCBwYXRobmFtZSA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKTtcbiAgICAgICAgY29uc3QgcGF0aExvd2VyID0gcGF0aG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG9jYWxlTG93ZXIgPSBsb2NhbGUgJiYgbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsb2NhbGUgJiYgKHBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSB8fCBwYXRoTG93ZXIgPT09ICcvJyArIGxvY2FsZUxvd2VyKSA/IChwYXRobmFtZS5sZW5ndGggPT09IGxvY2FsZS5sZW5ndGggKyAxID8gJy8nIDogJycpICsgcGF0aC5zdWJzdHIobG9jYWxlLmxlbmd0aCArIDEpIDogcGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG5mdW5jdGlvbiBwYXRoTm9RdWVyeUhhc2gocGF0aCkge1xuICAgIGNvbnN0IHF1ZXJ5SW5kZXggPSBwYXRoLmluZGV4T2YoJz8nKTtcbiAgICBjb25zdCBoYXNoSW5kZXggPSBwYXRoLmluZGV4T2YoJyMnKTtcbiAgICBpZiAocXVlcnlJbmRleCA+IC0xIHx8IGhhc2hJbmRleCA+IC0xKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBxdWVyeUluZGV4ID4gLTEgPyBxdWVyeUluZGV4IDogaGFzaEluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlUGF0aChwYXRoKSB7XG4gICAgcGF0aCA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKTtcbiAgICByZXR1cm4gcGF0aCA9PT0gYmFzZVBhdGggfHwgcGF0aC5zdGFydHNXaXRoKGJhc2VQYXRoICsgJy8nKTtcbn1cbmZ1bmN0aW9uIGFkZEJhc2VQYXRoKHBhdGgpIHtcbiAgICAvLyB3ZSBvbmx5IGFkZCB0aGUgYmFzZXBhdGggb24gcmVsYXRpdmUgdXJsc1xuICAgIHJldHVybiBhZGRQYXRoUHJlZml4KHBhdGgsIGJhc2VQYXRoKTtcbn1cbmZ1bmN0aW9uIGRlbEJhc2VQYXRoKHBhdGgpIHtcbiAgICBwYXRoID0gcGF0aC5zbGljZShiYXNlUGF0aC5sZW5ndGgpO1xuICAgIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHBhdGggPSBgLyR7cGF0aH1gO1xuICAgIHJldHVybiBwYXRoO1xufVxuZnVuY3Rpb24gaXNMb2NhbFVSTCh1cmwpIHtcbiAgICAvLyBwcmV2ZW50IGEgaHlkcmF0aW9uIG1pc21hdGNoIG9uIGhyZWYgZm9yIHVybCB3aXRoIGFuY2hvciByZWZzXG4gICAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykgfHwgdXJsLnN0YXJ0c1dpdGgoJyMnKSB8fCB1cmwuc3RhcnRzV2l0aCgnPycpKSByZXR1cm4gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICAvLyBhYnNvbHV0ZSB1cmxzIGNhbiBiZSBsb2NhbCBpZiB0aGV5IGFyZSBvbiB0aGUgc2FtZSBvcmlnaW5cbiAgICAgICAgY29uc3QgbG9jYXRpb25PcmlnaW4gPSAoMCwgX3V0aWxzKS5nZXRMb2NhdGlvbk9yaWdpbigpO1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbk9yaWdpbik7XG4gICAgICAgIHJldHVybiByZXNvbHZlZC5vcmlnaW4gPT09IGxvY2F0aW9uT3JpZ2luICYmIGhhc0Jhc2VQYXRoKHJlc29sdmVkLnBhdGhuYW1lKTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFzKHJvdXRlLCBhc1BhdGhuYW1lLCBxdWVyeSkge1xuICAgIGxldCBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnO1xuICAgIGNvbnN0IGR5bmFtaWNSZWdleCA9ICgwLCBfcm91dGVSZWdleCkuZ2V0Um91dGVSZWdleChyb3V0ZSk7XG4gICAgY29uc3QgZHluYW1pY0dyb3VwcyA9IGR5bmFtaWNSZWdleC5ncm91cHM7XG4gICAgY29uc3QgZHluYW1pY01hdGNoZXMgPSAvLyBUcnkgdG8gbWF0Y2ggdGhlIGR5bmFtaWMgcm91dGUgYWdhaW5zdCB0aGUgYXNQYXRoXG4gICAgKGFzUGF0aG5hbWUgIT09IHJvdXRlID8gKDAsIF9yb3V0ZU1hdGNoZXIpLmdldFJvdXRlTWF0Y2hlcihkeW5hbWljUmVnZXgpKGFzUGF0aG5hbWUpIDogJycpIHx8IC8vIEZhbGwgYmFjayB0byByZWFkaW5nIHRoZSB2YWx1ZXMgZnJvbSB0aGUgaHJlZlxuICAgIC8vIFRPRE86IHNob3VsZCB0aGlzIHRha2UgcHJpb3JpdHk7IGFsc28gbmVlZCB0byBjaGFuZ2UgaW4gdGhlIHJvdXRlci5cbiAgICBxdWVyeTtcbiAgICBpbnRlcnBvbGF0ZWRSb3V0ZSA9IHJvdXRlO1xuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5rZXlzKGR5bmFtaWNHcm91cHMpO1xuICAgIGlmICghcGFyYW1zLmV2ZXJ5KChwYXJhbSk9PntcbiAgICAgICAgbGV0IHZhbHVlID0gZHluYW1pY01hdGNoZXNbcGFyYW1dIHx8ICcnO1xuICAgICAgICBjb25zdCB7IHJlcGVhdCAsIG9wdGlvbmFsICB9ID0gZHluYW1pY0dyb3Vwc1twYXJhbV07XG4gICAgICAgIC8vIHN1cHBvcnQgc2luZ2xlLWxldmVsIGNhdGNoLWFsbFxuICAgICAgICAvLyBUT0RPOiBtb3JlIHJvYnVzdCBoYW5kbGluZyBmb3IgdXNlci1lcnJvciAocGFzc2luZyBgL2ApXG4gICAgICAgIGxldCByZXBsYWNlZCA9IGBbJHtyZXBlYXQgPyAnLi4uJyA6ICcnfSR7cGFyYW19XWA7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmVwbGFjZWQgPSBgJHshdmFsdWUgPyAnLycgOiAnJ31bJHtyZXBsYWNlZH1dYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVwZWF0ICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSBbXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gKG9wdGlvbmFsIHx8IHBhcmFtIGluIGR5bmFtaWNNYXRjaGVzKSAmJiAvLyBJbnRlcnBvbGF0ZSBncm91cCBpbnRvIGRhdGEgVVJMIGlmIHByZXNlbnRcbiAgICAgICAgKGludGVycG9sYXRlZFJvdXRlID0gaW50ZXJwb2xhdGVkUm91dGUucmVwbGFjZShyZXBsYWNlZCwgcmVwZWF0ID8gdmFsdWUubWFwKC8vIHRoZXNlIHZhbHVlcyBzaG91bGQgYmUgZnVsbHkgZW5jb2RlZCBpbnN0ZWFkIG9mIGp1c3RcbiAgICAgICAgLy8gcGF0aCBkZWxpbWl0ZXIgZXNjYXBlZCBzaW5jZSB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZFxuICAgICAgICAvLyBpbnRvIHRoZSBVUkwgYW5kIHdlIGV4cGVjdCBVUkwgZW5jb2RlZCBzZWdtZW50c1xuICAgICAgICAvLyB3aGVuIHBhcnNpbmcgZHluYW1pYyByb3V0ZSBwYXJhbXNcbiAgICAgICAgKHNlZ21lbnQpPT5lbmNvZGVVUklDb21wb25lbnQoc2VnbWVudClcbiAgICAgICAgKS5qb2luKCcvJykgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKSB8fCAnLycpO1xuICAgIH0pKSB7XG4gICAgICAgIGludGVycG9sYXRlZFJvdXRlID0gJycgLy8gZGlkIG5vdCBzYXRpc2Z5IGFsbCByZXF1aXJlbWVudHNcbiAgICAgICAgO1xuICAgIC8vIG4uYi4gV2UgaWdub3JlIHRoaXMgZXJyb3IgYmVjYXVzZSB3ZSBoYW5kbGUgd2FybmluZyBmb3IgdGhpcyBjYXNlIGluXG4gICAgLy8gZGV2ZWxvcG1lbnQgaW4gdGhlIGA8TGluaz5gIGNvbXBvbmVudCBkaXJlY3RseS5cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICByZXN1bHQ6IGludGVycG9sYXRlZFJvdXRlXG4gICAgfTtcbn1cbmZ1bmN0aW9uIG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeSwgcGFyYW1zKSB7XG4gICAgY29uc3QgZmlsdGVyZWRRdWVyeSA9IHtcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgIGlmICghcGFyYW1zLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkUXVlcnlba2V5XSA9IHF1ZXJ5W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWRRdWVyeTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVIcmVmKHJvdXRlciwgaHJlZiwgcmVzb2x2ZUFzKSB7XG4gICAgLy8gd2UgdXNlIGEgZHVtbXkgYmFzZSB1cmwgZm9yIHJlbGF0aXZlIHVybHNcbiAgICBsZXQgYmFzZTtcbiAgICBsZXQgdXJsQXNTdHJpbmcgPSB0eXBlb2YgaHJlZiA9PT0gJ3N0cmluZycgPyBocmVmIDogKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oaHJlZik7XG4gICAgLy8gcmVwZWF0ZWQgc2xhc2hlcyBhbmQgYmFja3NsYXNoZXMgaW4gdGhlIFVSTCBhcmUgY29uc2lkZXJlZFxuICAgIC8vIGludmFsaWQgYW5kIHdpbGwgbmV2ZXIgbWF0Y2ggYSBOZXh0LmpzIHBhZ2UvZmlsZVxuICAgIGNvbnN0IHVybFByb3RvTWF0Y2ggPSB1cmxBc1N0cmluZy5tYXRjaCgvXlthLXpBLVpdezEsfTpcXC9cXC8vKTtcbiAgICBjb25zdCB1cmxBc1N0cmluZ05vUHJvdG8gPSB1cmxQcm90b01hdGNoID8gdXJsQXNTdHJpbmcuc3Vic3RyKHVybFByb3RvTWF0Y2hbMF0ubGVuZ3RoKSA6IHVybEFzU3RyaW5nO1xuICAgIGNvbnN0IHVybFBhcnRzID0gdXJsQXNTdHJpbmdOb1Byb3RvLnNwbGl0KCc/Jyk7XG4gICAgaWYgKCh1cmxQYXJ0c1swXSB8fCAnJykubWF0Y2goLyhcXC9cXC98XFxcXCkvKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIGhyZWYgcGFzc2VkIHRvIG5leHQvcm91dGVyOiAke3VybEFzU3RyaW5nfSwgcmVwZWF0ZWQgZm9yd2FyZC1zbGFzaGVzICgvLykgb3IgYmFja3NsYXNoZXMgXFxcXCBhcmUgbm90IHZhbGlkIGluIHRoZSBocmVmYCk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSAoMCwgX3V0aWxzKS5ub3JtYWxpemVSZXBlYXRlZFNsYXNoZXModXJsQXNTdHJpbmdOb1Byb3RvKTtcbiAgICAgICAgdXJsQXNTdHJpbmcgPSAodXJsUHJvdG9NYXRjaCA/IHVybFByb3RvTWF0Y2hbMF0gOiAnJykgKyBub3JtYWxpemVkVXJsO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gYmVjYXVzZSBpdCBjYW5ub3QgYmUgcm91dGVkIGJ5IHRoZSBOZXh0LmpzIHJvdXRlclxuICAgIGlmICghaXNMb2NhbFVSTCh1cmxBc1N0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVBcyA/IFtcbiAgICAgICAgICAgIHVybEFzU3RyaW5nXG4gICAgICAgIF0gOiB1cmxBc1N0cmluZztcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgYmFzZSA9IG5ldyBVUkwodXJsQXNTdHJpbmcuc3RhcnRzV2l0aCgnIycpID8gcm91dGVyLmFzUGF0aCA6IHJvdXRlci5wYXRobmFtZSwgJ2h0dHA6Ly9uJyk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgICAvLyBmYWxsYmFjayB0byAvIGZvciBpbnZhbGlkIGFzUGF0aCB2YWx1ZXMgZS5nLiAvL1xuICAgICAgICBiYXNlID0gbmV3IFVSTCgnLycsICdodHRwOi8vbicpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBmaW5hbFVybCA9IG5ldyBVUkwodXJsQXNTdHJpbmcsIGJhc2UpO1xuICAgICAgICBmaW5hbFVybC5wYXRobmFtZSA9ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2goZmluYWxVcmwucGF0aG5hbWUpO1xuICAgICAgICBsZXQgaW50ZXJwb2xhdGVkQXMgPSAnJztcbiAgICAgICAgaWYgKCgwLCBfaXNEeW5hbWljKS5pc0R5bmFtaWNSb3V0ZShmaW5hbFVybC5wYXRobmFtZSkgJiYgZmluYWxVcmwuc2VhcmNoUGFyYW1zICYmIHJlc29sdmVBcykge1xuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSAoMCwgX3F1ZXJ5c3RyaW5nKS5zZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KGZpbmFsVXJsLnNlYXJjaFBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCB7IHJlc3VsdCAsIHBhcmFtcyAgfSA9IGludGVycG9sYXRlQXMoZmluYWxVcmwucGF0aG5hbWUsIGZpbmFsVXJsLnBhdGhuYW1lLCBxdWVyeSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkQXMgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGhhc2g6IGZpbmFsVXJsLmhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnksIHBhcmFtcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGUgb3JpZ2luIGRpZG4ndCBjaGFuZ2UsIGl0IG1lYW5zIHdlIHJlY2VpdmVkIGEgcmVsYXRpdmUgaHJlZlxuICAgICAgICBjb25zdCByZXNvbHZlZEhyZWYgPSBmaW5hbFVybC5vcmlnaW4gPT09IGJhc2Uub3JpZ2luID8gZmluYWxVcmwuaHJlZi5zbGljZShmaW5hbFVybC5vcmlnaW4ubGVuZ3RoKSA6IGZpbmFsVXJsLmhyZWY7XG4gICAgICAgIHJldHVybiByZXNvbHZlQXMgPyBbXG4gICAgICAgICAgICByZXNvbHZlZEhyZWYsXG4gICAgICAgICAgICBpbnRlcnBvbGF0ZWRBcyB8fCByZXNvbHZlZEhyZWZcbiAgICAgICAgXSA6IHJlc29sdmVkSHJlZjtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlQXMgPyBbXG4gICAgICAgICAgICB1cmxBc1N0cmluZ1xuICAgICAgICBdIDogdXJsQXNTdHJpbmc7XG4gICAgfVxufVxuZnVuY3Rpb24gc3RyaXBPcmlnaW4odXJsKSB7XG4gICAgY29uc3Qgb3JpZ2luID0gKDAsIF91dGlscykuZ2V0TG9jYXRpb25PcmlnaW4oKTtcbiAgICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgob3JpZ2luKSA/IHVybC5zdWJzdHJpbmcob3JpZ2luLmxlbmd0aCkgOiB1cmw7XG59XG5mdW5jdGlvbiBwcmVwYXJlVXJsQXMocm91dGVyLCB1cmwsIGFzKSB7XG4gICAgLy8gSWYgdXJsIGFuZCBhcyBwcm92aWRlZCBhcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24sXG4gICAgLy8gd2UnbGwgZm9ybWF0IHRoZW0gaW50byB0aGUgc3RyaW5nIHZlcnNpb24gaGVyZS5cbiAgICBsZXQgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSByZXNvbHZlSHJlZihyb3V0ZXIsIHVybCwgdHJ1ZSk7XG4gICAgY29uc3Qgb3JpZ2luID0gKDAsIF91dGlscykuZ2V0TG9jYXRpb25PcmlnaW4oKTtcbiAgICBjb25zdCBocmVmSGFkT3JpZ2luID0gcmVzb2x2ZWRIcmVmLnN0YXJ0c1dpdGgob3JpZ2luKTtcbiAgICBjb25zdCBhc0hhZE9yaWdpbiA9IHJlc29sdmVkQXMgJiYgcmVzb2x2ZWRBcy5zdGFydHNXaXRoKG9yaWdpbik7XG4gICAgcmVzb2x2ZWRIcmVmID0gc3RyaXBPcmlnaW4ocmVzb2x2ZWRIcmVmKTtcbiAgICByZXNvbHZlZEFzID0gcmVzb2x2ZWRBcyA/IHN0cmlwT3JpZ2luKHJlc29sdmVkQXMpIDogcmVzb2x2ZWRBcztcbiAgICBjb25zdCBwcmVwYXJlZFVybCA9IGhyZWZIYWRPcmlnaW4gPyByZXNvbHZlZEhyZWYgOiBhZGRCYXNlUGF0aChyZXNvbHZlZEhyZWYpO1xuICAgIGNvbnN0IHByZXBhcmVkQXMgPSBhcyA/IHN0cmlwT3JpZ2luKHJlc29sdmVIcmVmKHJvdXRlciwgYXMpKSA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmO1xuICAgIHJldHVybiB7XG4gICAgICAgIHVybDogcHJlcGFyZWRVcmwsXG4gICAgICAgIGFzOiBhc0hhZE9yaWdpbiA/IHByZXBhcmVkQXMgOiBhZGRCYXNlUGF0aChwcmVwYXJlZEFzKVxuICAgIH07XG59XG5mdW5jdGlvbiByZXNvbHZlRHluYW1pY1JvdXRlKHBhdGhuYW1lLCBwYWdlcykge1xuICAgIGNvbnN0IGNsZWFuUGF0aG5hbWUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKCgwLCBfZGVub3JtYWxpemVQYWdlUGF0aCkuZGVub3JtYWxpemVQYWdlUGF0aChwYXRobmFtZSkpO1xuICAgIGlmIChjbGVhblBhdGhuYW1lID09PSAnLzQwNCcgfHwgY2xlYW5QYXRobmFtZSA9PT0gJy9fZXJyb3InKSB7XG4gICAgICAgIHJldHVybiBwYXRobmFtZTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHJlc29sdmluZyBocmVmIGZvciBkeW5hbWljIHJvdXRlc1xuICAgIGlmICghcGFnZXMuaW5jbHVkZXMoY2xlYW5QYXRobmFtZSkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICAgICAgICBwYWdlcy5zb21lKChwYWdlKT0+e1xuICAgICAgICAgICAgaWYgKCgwLCBfaXNEeW5hbWljKS5pc0R5bmFtaWNSb3V0ZShwYWdlKSAmJiAoMCwgX3JvdXRlUmVnZXgpLmdldFJvdXRlUmVnZXgocGFnZSkucmUudGVzdChjbGVhblBhdGhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHBhdGhuYW1lID0gcGFnZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKTtcbn1cbmNvbnN0IG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uID0gcHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTiAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAnc2Nyb2xsUmVzdG9yYXRpb24nIGluIHdpbmRvdy5oaXN0b3J5ICYmICEhZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IHYgPSAnX19uZXh0JztcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlcXVlbmNlc1xuICAgICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh2LCB2KSwgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh2KSwgdHJ1ZTtcbiAgICB9IGNhdGNoIChuKSB7XG4gICAgfVxufSgpO1xuY29uc3QgU1NHX0RBVEFfTk9UX0ZPVU5EID0gU3ltYm9sKCdTU0dfREFUQV9OT1RfRk9VTkQnKTtcbmZ1bmN0aW9uIGZldGNoUmV0cnkodXJsLCBhdHRlbXB0cykge1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgLy8gQ29va2llcyBhcmUgcmVxdWlyZWQgdG8gYmUgcHJlc2VudCBmb3IgTmV4dC5qcycgU1NHIFwiUHJldmlldyBNb2RlXCIuXG4gICAgICAgIC8vIENvb2tpZXMgbWF5IGFsc28gYmUgcmVxdWlyZWQgZm9yIGBnZXRTZXJ2ZXJTaWRlUHJvcHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyA+IGBmZXRjaGAgd29u4oCZdCBzZW5kIGNvb2tpZXMsIHVubGVzcyB5b3Ugc2V0IHRoZSBjcmVkZW50aWFscyBpbml0XG4gICAgICAgIC8vID4gb3B0aW9uLlxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmV0Y2hfQVBJL1VzaW5nX0ZldGNoXG4gICAgICAgIC8vXG4gICAgICAgIC8vID4gRm9yIG1heGltdW0gYnJvd3NlciBjb21wYXRpYmlsaXR5IHdoZW4gaXQgY29tZXMgdG8gc2VuZGluZyAmXG4gICAgICAgIC8vID4gcmVjZWl2aW5nIGNvb2tpZXMsIGFsd2F5cyBzdXBwbHkgdGhlIGBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ2BcbiAgICAgICAgLy8gPiBvcHRpb24gaW5zdGVhZCBvZiByZWx5aW5nIG9uIHRoZSBkZWZhdWx0LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoI2NhdmVhdHNcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidcbiAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxICYmIHJlcy5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoUmV0cnkodXJsLCBhdHRlbXB0cyAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdEZvdW5kOiBTU0dfREFUQV9OT1RfRk9VTkRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCBpc1NlcnZlclJlbmRlcikge1xuICAgIHJldHVybiBmZXRjaFJldHJ5KGRhdGFIcmVmLCBpc1NlcnZlclJlbmRlciA/IDMgOiAxKS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICAvLyBXZSBzaG91bGQgb25seSB0cmlnZ2VyIGEgc2VydmVyLXNpZGUgdHJhbnNpdGlvbiBpZiB0aGlzIHdhcyBjYXVzZWRcbiAgICAgICAgLy8gb24gYSBjbGllbnQtc2lkZSB0cmFuc2l0aW9uLiBPdGhlcndpc2UsIHdlJ2QgZ2V0IGludG8gYW4gaW5maW5pdGVcbiAgICAgICAgLy8gbG9vcC5cbiAgICAgICAgaWYgKCFpc1NlcnZlclJlbmRlcikge1xuICAgICAgICAgICAgKDAsIF9yb3V0ZUxvYWRlcikubWFya0Fzc2V0RXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG59XG5jbGFzcyBSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lMSwgcXVlcnkxLCBhczEsIHsgaW5pdGlhbFByb3BzICwgcGFnZUxvYWRlciAsIEFwcCAsIHdyYXBBcHAgLCBDb21wb25lbnQ6IENvbXBvbmVudDEgLCBlcnI6IGVycjEgLCBzdWJzY3JpcHRpb24gLCBpc0ZhbGxiYWNrICwgbG9jYWxlICwgbG9jYWxlcyAsIGRlZmF1bHRMb2NhbGUgLCBkb21haW5Mb2NhbGVzICwgaXNQcmV2aWV3ICB9KXtcbiAgICAgICAgLy8gU3RhdGljIERhdGEgQ2FjaGVcbiAgICAgICAgdGhpcy5zZGMgPSB7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEluLWZsaWdodCBTZXJ2ZXIgRGF0YSBSZXF1ZXN0cywgZm9yIGRlZHVwaW5nXG4gICAgICAgIHRoaXMuc2RyID0ge1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pZHggPSAwO1xuICAgICAgICB0aGlzLm9uUG9wU3RhdGUgPSAoZSk9PntcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gZS5zdGF0ZTtcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBnZXQgc3RhdGUgYXMgdW5kZWZpbmVkIGZvciB0d28gcmVhc29ucy5cbiAgICAgICAgICAgICAgICAvLyAgMS4gV2l0aCBvbGRlciBzYWZhcmkgKDwgOCkgYW5kIG9sZGVyIGNocm9tZSAoPCAzNClcbiAgICAgICAgICAgICAgICAvLyAgMi4gV2hlbiB0aGUgVVJMIGNoYW5nZWQgd2l0aCAjXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBJbiB0aGUgYm90aCBjYXNlcywgd2UgZG9uJ3QgbmVlZCB0byBwcm9jZWVkIGFuZCBjaGFuZ2UgdGhlIHJvdXRlLlxuICAgICAgICAgICAgICAgIC8vIChhcyBpdCdzIGFscmVhZHkgY2hhbmdlZClcbiAgICAgICAgICAgICAgICAvLyBCdXQgd2UgY2FuIHNpbXBseSByZXBsYWNlIHRoZSBzdGF0ZSB3aXRoIHRoZSBuZXcgY2hhbmdlcy5cbiAgICAgICAgICAgICAgICAvLyBBY3R1YWxseSwgZm9yICgxKSB3ZSBkb24ndCBuZWVkIHRvIG5vdGhpbmcuIEJ1dCBpdCdzIGhhcmQgdG8gZGV0ZWN0IHRoYXQgZXZlbnQuXG4gICAgICAgICAgICAgICAgLy8gU28sIGRvaW5nIHRoZSBmb2xsb3dpbmcgZm9yICgxKSBkb2VzIG5vIGhhcm0uXG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXRobmFtZTogcGF0aG5hbWUxICwgcXVlcnk6IHF1ZXJ5MSAgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZSgncmVwbGFjZVN0YXRlJywgKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUxKSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5MVxuICAgICAgICAgICAgICAgIH0pLCAoMCwgX3V0aWxzKS5nZXRVUkwoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5fX04pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZm9yY2VkU2Nyb2xsO1xuICAgICAgICAgICAgY29uc3QgeyB1cmwgLCBhczogYXMxICwgb3B0aW9ucyAsIGlkeCAgfSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgICAgICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lkeCAhPT0gaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTbmFwc2hvdCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHNlbGYucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHNlbGYucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIG9sZCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdfX25leHRfc2Nyb2xsXycgKyBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlZFNjcm9sbCA9IEpTT04ucGFyc2Uodik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VkU2Nyb2xsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2lkeCA9IGlkeDtcbiAgICAgICAgICAgIGNvbnN0IHsgcGF0aG5hbWU6IHBhdGhuYW1lMSAgfSA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybCh1cmwpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IHJlLXJlbmRlciBvbiBpbml0aWFsIGxvYWQsXG4gICAgICAgICAgICAvLyBjYW4gYmUgY2F1c2VkIGJ5IG5hdmlnYXRpbmcgYmFjayBmcm9tIGFuIGV4dGVybmFsIHNpdGVcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3NyICYmIGFzMSA9PT0gdGhpcy5hc1BhdGggJiYgcGF0aG5hbWUxID09PSB0aGlzLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlIGRvd25zdHJlYW0gYXBwbGljYXRpb24gcmV0dXJucyBmYWxzeSwgcmV0dXJuLlxuICAgICAgICAgICAgLy8gVGhleSB3aWxsIHRoZW4gYmUgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIHRoZSBldmVudC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9icHMgJiYgIXRoaXMuX2JwcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYW5nZSgncmVwbGFjZVN0YXRlJywgdXJsLCBhczEsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgfSwgb3B0aW9ucywge1xuICAgICAgICAgICAgICAgIHNoYWxsb3c6IG9wdGlvbnMuc2hhbGxvdyAmJiB0aGlzLl9zaGFsbG93LFxuICAgICAgICAgICAgICAgIGxvY2FsZTogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgICAgICB9KSwgZm9yY2VkU2Nyb2xsKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gcmVwcmVzZW50cyB0aGUgY3VycmVudCBjb21wb25lbnQga2V5XG4gICAgICAgIHRoaXMucm91dGUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lMSk7XG4gICAgICAgIC8vIHNldCB1cCB0aGUgY29tcG9uZW50IGNhY2hlIChieSByb3V0ZSBrZXlzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSB7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIHNob3VsZCBub3Qga2VlcCB0aGUgY2FjaGUsIGlmIHRoZXJlJ3MgYW4gZXJyb3JcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGlzIGNhdXNlIGlzc3VlcyB3aGVuIHdoZW4gZ29pbmcgYmFjayBhbmRcbiAgICAgICAgLy8gY29tZSBhZ2FpbiB0byB0aGUgZXJyb3JlZCBwYWdlLlxuICAgICAgICBpZiAocGF0aG5hbWUxICE9PSAnL19lcnJvcicpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1t0aGlzLnJvdXRlXSA9IHtcbiAgICAgICAgICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudDEsXG4gICAgICAgICAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcm9wczogaW5pdGlhbFByb3BzLFxuICAgICAgICAgICAgICAgIGVycjogZXJyMSxcbiAgICAgICAgICAgICAgICBfX05fU1NHOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU0csXG4gICAgICAgICAgICAgICAgX19OX1NTUDogaW5pdGlhbFByb3BzICYmIGluaXRpYWxQcm9wcy5fX05fU1NQXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50c1snL19hcHAnXSA9IHtcbiAgICAgICAgICAgIENvbXBvbmVudDogQXBwLFxuICAgICAgICAgICAgc3R5bGVTaGVldHM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIC8vIEJhY2t3YXJkcyBjb21wYXQgZm9yIFJvdXRlci5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC8vIFRPRE86IFNob3VsZCBiZSByZW1vdmUgdGhlIGZvbGxvd2luZyBtYWpvciB2ZXJzaW9uIGFzIGl0IHdhcyBuZXZlciBkb2N1bWVudGVkXG4gICAgICAgIHRoaXMuZXZlbnRzID0gUm91dGVyLmV2ZW50cztcbiAgICAgICAgdGhpcy5wYWdlTG9hZGVyID0gcGFnZUxvYWRlcjtcbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lMTtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5MTtcbiAgICAgICAgLy8gaWYgYXV0byBwcmVyZW5kZXJlZCBhbmQgZHluYW1pYyByb3V0ZSB3YWl0IHRvIHVwZGF0ZSBhc1BhdGhcbiAgICAgICAgLy8gdW50aWwgYWZ0ZXIgbW91bnQgdG8gcHJldmVudCBoeWRyYXRpb24gbWlzbWF0Y2hcbiAgICAgICAgY29uc3QgYXV0b0V4cG9ydER5bmFtaWMgPSAoMCwgX2lzRHluYW1pYykuaXNEeW5hbWljUm91dGUocGF0aG5hbWUxKSAmJiBzZWxmLl9fTkVYVF9EQVRBX18uYXV0b0V4cG9ydDtcbiAgICAgICAgdGhpcy5hc1BhdGggPSBhdXRvRXhwb3J0RHluYW1pYyA/IHBhdGhuYW1lMSA6IGFzMTtcbiAgICAgICAgdGhpcy5iYXNlUGF0aCA9IGJhc2VQYXRoO1xuICAgICAgICB0aGlzLnN1YiA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jbGMgPSBudWxsO1xuICAgICAgICB0aGlzLl93cmFwQXBwID0gd3JhcEFwcDtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGlnbm9yZSBleHRyYSBwb3BTdGF0ZSBpbiBzYWZhcmkgb24gbmF2aWdhdGluZ1xuICAgICAgICAvLyBiYWNrIGZyb20gZXh0ZXJuYWwgc2l0ZVxuICAgICAgICB0aGlzLmlzU3NyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0ZhbGxiYWNrID0gaXNGYWxsYmFjaztcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gISEoc2VsZi5fX05FWFRfREFUQV9fLmdzc3AgfHwgc2VsZi5fX05FWFRfREFUQV9fLmdpcCB8fCBzZWxmLl9fTkVYVF9EQVRBX18uYXBwR2lwICYmICFzZWxmLl9fTkVYVF9EQVRBX18uZ3NwIHx8ICFhdXRvRXhwb3J0RHluYW1pYyAmJiAhc2VsZi5sb2NhdGlvbi5zZWFyY2ggJiYgIXByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMpO1xuICAgICAgICB0aGlzLmlzUHJldmlldyA9ICEhaXNQcmV2aWV3O1xuICAgICAgICB0aGlzLmlzTG9jYWxlRG9tYWluID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlcyA9IGxvY2FsZXM7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGUgPSBkZWZhdWx0TG9jYWxlO1xuICAgICAgICAgICAgdGhpcy5kb21haW5Mb2NhbGVzID0gZG9tYWluTG9jYWxlcztcbiAgICAgICAgICAgIHRoaXMuaXNMb2NhbGVEb21haW4gPSAhIWRldGVjdERvbWFpbkxvY2FsZShkb21haW5Mb2NhbGVzLCBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBcImFzXCIgZG9lc24ndCBzdGFydCB3aXRoIGRvdWJsZSBzbGFzaGVzIG9yIGVsc2UgaXQgY2FuXG4gICAgICAgICAgICAvLyB0aHJvdyBhbiBlcnJvciBhcyBpdCdzIGNvbnNpZGVyZWQgaW52YWxpZFxuICAgICAgICAgICAgaWYgKGFzMS5zdWJzdHIoMCwgMikgIT09ICcvLycpIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBvcmRlciBmb3IgYGUuc3RhdGVgIHRvIHdvcmsgb24gdGhlIGBvbnBvcHN0YXRlYCBldmVudFxuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gcmVnaXN0ZXIgdGhlIGluaXRpYWwgcm91dGUgdXBvbiBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fc2hvdWxkUmVzb2x2ZUhyZWYgPSBhczEgIT09IHBhdGhuYW1lMTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKCdyZXBsYWNlU3RhdGUnLCAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBhZGRCYXNlUGF0aChwYXRobmFtZTEpLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkxXG4gICAgICAgICAgICAgICAgfSksICgwLCBfdXRpbHMpLmdldFVSTCgpLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XG4gICAgICAgICAgICAvLyBlbmFibGUgY3VzdG9tIHNjcm9sbCByZXN0b3JhdGlvbiBoYW5kbGluZyB3aGVuIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIGJyb3dzZXIncyBkZWZhdWx0IGhhbmRsaW5nXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgICAgICAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAqIEdvIGJhY2sgaW4gaGlzdG9yeVxuICAgKi8gYmFjaygpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICogUGVyZm9ybXMgYSBgcHVzaFN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovIHB1c2godXJsLCBhcywgb3B0aW9ucyA9IHtcbiAgICB9KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiByZW1vdmUgaW4gdGhlIGZ1dHVyZSB3aGVuIHdlIHVwZGF0ZSBoaXN0b3J5IGJlZm9yZSByb3V0ZSBjaGFuZ2VcbiAgICAgICAgICAgIC8vIGlzIGNvbXBsZXRlLCBhcyB0aGUgcG9wc3RhdGUgZXZlbnQgc2hvdWxkIGhhbmRsZSB0aGlzIGNhcHR1cmUuXG4gICAgICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTbmFwc2hvdCBzY3JvbGwgcG9zaXRpb24gcmlnaHQgYmVmb3JlIG5hdmlnYXRpbmcgdG8gYSBuZXcgcGFnZTpcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBzZWxmLnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogc2VsZi5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoeyB1cmwgLCBhcyAgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgncHVzaFN0YXRlJywgdXJsLCBhcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgKiBQZXJmb3JtcyBhIGByZXBsYWNlU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi8gcmVwbGFjZSh1cmwsIGFzLCBvcHRpb25zID0ge1xuICAgIH0pIHtcbiAgICAgICAgKHsgdXJsICwgYXMgIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3JlcGxhY2VTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBhc3luYyBjaGFuZ2UobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zLCBmb3JjZWRTY3JvbGwpIHtcbiAgICAgICAgaWYgKCFpc0xvY2FsVVJMKHVybCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNob3VsZFJlc29sdmVIcmVmID0gdXJsID09PSBhcyB8fCBvcHRpb25zLl9oIHx8IG9wdGlvbnMuX3Nob3VsZFJlc29sdmVIcmVmO1xuICAgICAgICAvLyBmb3Igc3RhdGljIHBhZ2VzIHdpdGggcXVlcnkgcGFyYW1zIGluIHRoZSBVUkwgd2UgZGVsYXlcbiAgICAgICAgLy8gbWFya2luZyB0aGUgcm91dGVyIHJlYWR5IHVudGlsIGFmdGVyIHRoZSBxdWVyeSBpcyB1cGRhdGVkXG4gICAgICAgIGlmIChvcHRpb25zLl9oKSB7XG4gICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZMb2NhbGUgPSB0aGlzLmxvY2FsZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgPT09IGZhbHNlID8gdGhpcy5kZWZhdWx0TG9jYWxlIDogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5sb2NhbGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gdGhpcy5sb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRBcyA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcyk7XG4gICAgICAgICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZXMpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGU7XG4gICAgICAgICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXJzZWRBcy5wYXRobmFtZSk7XG4gICAgICAgICAgICAgICAgYXMgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcyk7XG4gICAgICAgICAgICAgICAgdXJsID0gYWRkQmFzZVBhdGgoKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKGhhc0Jhc2VQYXRoKHVybCkgPyBkZWxCYXNlUGF0aCh1cmwpIDogdXJsLCB0aGlzLmxvY2FsZXMpLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkaWROYXZpZ2F0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB3cmFwIHRoaXMgaW4gdGhlIGVudiBjaGVjayBhZ2FpbiBzaW5jZSByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgICAvLyBtb3ZlcyB0aGlzIG9uIGl0cyBvd24gZHVlIHRvIHRoZSByZXR1cm5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbG9jYWxlIGlzbid0IGNvbmZpZ3VyZWQgaGFyZCBuYXZpZ2F0ZSB0byBzaG93IDQwNCBwYWdlXG4gICAgICAgICAgICAgICAgaWYgKCEoKHJlZiA9IHRoaXMubG9jYWxlcykgPT09IG51bGwgfHwgcmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZWYuaW5jbHVkZXModGhpcy5sb2NhbGUpKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGFkZExvY2FsZShwYXJzZWRBcy5wYXRobmFtZSwgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3YXMgcHJldmlvdXNseSBhIHJldHVybiBidXQgd2FzIHJlbW92ZWQgaW4gZmF2b3JcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICAgICAgICAgICAgZGlkTmF2aWdhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKHRoaXMuZG9tYWluTG9jYWxlcywgdW5kZWZpbmVkLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhcmUgbmF2aWdhdGluZyB0byBhIGRvbWFpbiBsb2NhbGUgZW5zdXJlIHdlIHJlZGlyZWN0IHRvIHRoZVxuICAgICAgICAgICAgICAgIC8vIGNvcnJlY3QgZG9tYWluXG4gICAgICAgICAgICAgICAgaWYgKCFkaWROYXZpZ2F0ZSAmJiBkZXRlY3RlZERvbWFpbiAmJiB0aGlzLmlzTG9jYWxlRG9tYWluICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgIT09IGRldGVjdGVkRG9tYWluLmRvbWFpbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhc05vQmFzZVBhdGggPSBkZWxCYXNlUGF0aChhcyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke2RldGVjdGVkRG9tYWluLmRvbWFpbn0ke2FkZEJhc2VQYXRoKGAke3RoaXMubG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlID8gJycgOiBgLyR7dGhpcy5sb2NhbGV9YH0ke2FzTm9CYXNlUGF0aCA9PT0gJy8nID8gJycgOiBhc05vQmFzZVBhdGh9YCB8fCAnLycpfWA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG9mIGJldHRlciBkZWFkIGNvZGUgZWxpbWluYXRpb24gd2l0aCByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgICAgICAgICAgIGRpZE5hdmlnYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlkTmF2aWdhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCk9PntcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuX2gpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTc3IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBtYXJraW5nIHJvdXRlIGNoYW5nZXMgYXMgYSBuYXZpZ2F0aW9uIHN0YXJ0IGVudHJ5XG4gICAgICAgIGlmIChfdXRpbHMuU1QpIHtcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ3JvdXRlQ2hhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzaGFsbG93ID1mYWxzZSAgfSA9IG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHJvdXRlUHJvcHMgPSB7XG4gICAgICAgICAgICBzaGFsbG93XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9pbkZsaWdodFJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFib3J0Q29tcG9uZW50TG9hZCh0aGlzLl9pbkZsaWdodFJvdXRlLCByb3V0ZVByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBhcyA9IGFkZEJhc2VQYXRoKGFkZExvY2FsZShoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcywgb3B0aW9ucy5sb2NhbGUsIHRoaXMuZGVmYXVsdExvY2FsZSkpO1xuICAgICAgICBjb25zdCBjbGVhbmVkQXMgPSBkZWxMb2NhbGUoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgdGhpcy5faW5GbGlnaHRSb3V0ZSA9IGFzO1xuICAgICAgICBsZXQgbG9jYWxlQ2hhbmdlID0gcHJldkxvY2FsZSAhPT0gdGhpcy5sb2NhbGU7XG4gICAgICAgIC8vIElmIHRoZSB1cmwgY2hhbmdlIGlzIG9ubHkgcmVsYXRlZCB0byBhIGhhc2ggY2hhbmdlXG4gICAgICAgIC8vIFdlIHNob3VsZCBub3QgcHJvY2VlZC4gV2Ugc2hvdWxkIG9ubHkgY2hhbmdlIHRoZSBzdGF0ZS5cbiAgICAgICAgLy8gV0FSTklORzogYF9oYCBpcyBhbiBpbnRlcm5hbCBvcHRpb24gZm9yIGhhbmRpbmcgTmV4dC5qcyBjbGllbnQtc2lkZVxuICAgICAgICAvLyBoeWRyYXRpb24uIFlvdXIgYXBwIHNob3VsZCBfbmV2ZXJfIHVzZSB0aGlzIHByb3BlcnR5LiBJdCBtYXkgY2hhbmdlIGF0XG4gICAgICAgIC8vIGFueSB0aW1lIHdpdGhvdXQgbm90aWNlLlxuICAgICAgICBpZiAoIW9wdGlvbnMuX2ggJiYgdGhpcy5vbmx5QUhhc2hDaGFuZ2UoY2xlYW5lZEFzKSAmJiAhbG9jYWxlQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmFzUGF0aCA9IGNsZWFuZWRBcztcbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgLy8gVE9ETzogZG8gd2UgbmVlZCB0aGUgcmVzb2x2ZWQgaHJlZiB3aGVuIG9ubHkgYSBoYXNoIGNoYW5nZT9cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9IYXNoKGNsZWFuZWRBcyk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSh0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0sIG51bGwpO1xuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdoYXNoQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyc2VkID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKHVybCk7XG4gICAgICAgIGxldCB7IHBhdGhuYW1lOiBwYXRobmFtZTEgLCBxdWVyeTogcXVlcnkxICB9ID0gcGFyc2VkO1xuICAgICAgICAvLyBUaGUgYnVpbGQgbWFuaWZlc3QgbmVlZHMgdG8gYmUgbG9hZGVkIGJlZm9yZSBhdXRvLXN0YXRpYyBkeW5hbWljIHBhZ2VzXG4gICAgICAgIC8vIGdldCB0aGVpciBxdWVyeSBwYXJhbWV0ZXJzIHRvIGFsbG93IGVuc3VyaW5nIHRoZXkgY2FuIGJlIHBhcnNlZCBwcm9wZXJseVxuICAgICAgICAvLyB3aGVuIHJld3JpdHRlbiB0b1xuICAgICAgICBsZXQgcGFnZXMsIHJld3JpdGVzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFnZXMgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIuZ2V0UGFnZUxpc3QoKTtcbiAgICAgICAgICAgICh7IF9fcmV3cml0ZXM6IHJld3JpdGVzICB9ID0gYXdhaXQgKDAsIF9yb3V0ZUxvYWRlcikuZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyMSkge1xuICAgICAgICAgICAgLy8gSWYgd2UgZmFpbCB0byByZXNvbHZlIHRoZSBwYWdlIGxpc3Qgb3IgY2xpZW50LWJ1aWxkIG1hbmlmZXN0LCB3ZSBtdXN0XG4gICAgICAgICAgICAvLyBkbyBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb246XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGFza2VkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBVUkwgd2Ugc2hvdWxkIHJlbG9hZCB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgIC8vIChub3QgbG9jYXRpb24ucmVsb2FkKCkgYnV0IHJlbG9hZCBnZXRJbml0aWFsUHJvcHMgYW5kIG90aGVyIE5leHQuanMgc3R1ZmZzKVxuICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gc2V0IHRoZSBtZXRob2QgPSByZXBsYWNlU3RhdGUgYWx3YXlzXG4gICAgICAgIC8vIGFzIHRoaXMgc2hvdWxkIG5vdCBnbyBpbnRvIHRoZSBoaXN0b3J5IChUaGF0J3MgaG93IGJyb3dzZXJzIHdvcmspXG4gICAgICAgIC8vIFdlIHNob3VsZCBjb21wYXJlIHRoZSBuZXcgYXNQYXRoIHRvIHRoZSBjdXJyZW50IGFzUGF0aCwgbm90IHRoZSB1cmxcbiAgICAgICAgaWYgKCF0aGlzLnVybElzTmV3KGNsZWFuZWRBcykgJiYgIWxvY2FsZUNoYW5nZSkge1xuICAgICAgICAgICAgbWV0aG9kID0gJ3JlcGxhY2VTdGF0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgbmVlZCB0byByZXNvbHZlIHRoZSBhcyB2YWx1ZSB1c2luZyByZXdyaXRlcyBmb3IgZHluYW1pYyBTU0dcbiAgICAgICAgLy8gcGFnZXMgdG8gYWxsb3cgYnVpbGRpbmcgdGhlIGRhdGEgVVJMIGNvcnJlY3RseVxuICAgICAgICBsZXQgcmVzb2x2ZWRBcyA9IGFzO1xuICAgICAgICAvLyB1cmwgYW5kIGFzIHNob3VsZCBhbHdheXMgYmUgcHJlZml4ZWQgd2l0aCBiYXNlUGF0aCBieSB0aGlzXG4gICAgICAgIC8vIHBvaW50IGJ5IGVpdGhlciBuZXh0L2xpbmsgb3Igcm91dGVyLnB1c2gvcmVwbGFjZSBzbyBzdHJpcCB0aGVcbiAgICAgICAgLy8gYmFzZVBhdGggZnJvbSB0aGUgcGF0aG5hbWUgdG8gbWF0Y2ggdGhlIHBhZ2VzIGRpciAxLXRvLTFcbiAgICAgICAgcGF0aG5hbWUxID0gcGF0aG5hbWUxID8gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChkZWxCYXNlUGF0aChwYXRobmFtZTEpKSA6IHBhdGhuYW1lMTtcbiAgICAgICAgaWYgKHNob3VsZFJlc29sdmVIcmVmICYmIHBhdGhuYW1lMSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICAgICAgICBvcHRpb25zLl9zaG91bGRSZXNvbHZlSHJlZiA9IHRydWU7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhcy5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9ICgwLCBfcmVzb2x2ZVJld3JpdGVzKS5kZWZhdWx0KGFkZEJhc2VQYXRoKGFkZExvY2FsZShjbGVhbmVkQXMsIHRoaXMubG9jYWxlKSksIHBhZ2VzLCByZXdyaXRlcywgcXVlcnkxLCAocCk9PnJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpXG4gICAgICAgICAgICAgICAgLCB0aGlzLmxvY2FsZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkQXMgPSByZXdyaXRlc1Jlc3VsdC5hc1BhdGg7XG4gICAgICAgICAgICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IHRoZSBjb3JyZWN0IHBhZ2UgY2h1bmsgdG8gYmUgbG9hZGVkXG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lMSA9IHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZjtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gYWRkQmFzZVBhdGgocGF0aG5hbWUxKTtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGF0aG5hbWUxLCBwYWdlcyk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lMSA9IHBhcnNlZC5wYXRobmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gYWRkQmFzZVBhdGgocGF0aG5hbWUxKTtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lMSk7XG4gICAgICAgIGlmICghaXNMb2NhbFVSTChhcykpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGhyZWY6IFwiJHt1cmx9XCIgYW5kIGFzOiBcIiR7YXN9XCIsIHJlY2VpdmVkIHJlbGF0aXZlIGhyZWYgYW5kIGV4dGVybmFsIGFzYCArIGBcXG5TZWUgbW9yZSBpbmZvOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9pbnZhbGlkLXJlbGF0aXZlLXVybC1leHRlcm5hbC1hc2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhcztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlZEFzID0gZGVsTG9jYWxlKGRlbEJhc2VQYXRoKHJlc29sdmVkQXMpLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIGlmICgoMCwgX2lzRHluYW1pYykuaXNEeW5hbWljUm91dGUocm91dGUpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRBcyA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChyZXNvbHZlZEFzKTtcbiAgICAgICAgICAgIGNvbnN0IGFzUGF0aG5hbWUgPSBwYXJzZWRBcy5wYXRobmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlUmVnZXggPSAoMCwgX3JvdXRlUmVnZXgpLmdldFJvdXRlUmVnZXgocm91dGUpO1xuICAgICAgICAgICAgY29uc3Qgcm91dGVNYXRjaCA9ICgwLCBfcm91dGVNYXRjaGVyKS5nZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleCkoYXNQYXRobmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRJbnRlcnBvbGF0ZSA9IHJvdXRlID09PSBhc1BhdGhuYW1lO1xuICAgICAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVkQXMgPSBzaG91bGRJbnRlcnBvbGF0ZSA/IGludGVycG9sYXRlQXMocm91dGUsIGFzUGF0aG5hbWUsIHF1ZXJ5MSkgOiB7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFyb3V0ZU1hdGNoIHx8IHNob3VsZEludGVycG9sYXRlICYmICFpbnRlcnBvbGF0ZWRBcy5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nUGFyYW1zID0gT2JqZWN0LmtleXMocm91dGVSZWdleC5ncm91cHMpLmZpbHRlcigocGFyYW0pPT4hcXVlcnkxW3BhcmFtXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKG1pc3NpbmdQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke3Nob3VsZEludGVycG9sYXRlID8gYEludGVycG9sYXRpbmcgaHJlZmAgOiBgTWlzbWF0Y2hpbmcgXFxgYXNcXGAgYW5kIFxcYGhyZWZcXGBgfSBmYWlsZWQgdG8gbWFudWFsbHkgcHJvdmlkZSBgICsgYHRoZSBwYXJhbXM6ICR7bWlzc2luZ1BhcmFtcy5qb2luKCcsICcpfSBpbiB0aGUgXFxgaHJlZlxcYCdzIFxcYHF1ZXJ5XFxgYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChzaG91bGRJbnRlcnBvbGF0ZSA/IGBUaGUgcHJvdmlkZWQgXFxgaHJlZlxcYCAoJHt1cmx9KSB2YWx1ZSBpcyBtaXNzaW5nIHF1ZXJ5IHZhbHVlcyAoJHttaXNzaW5nUGFyYW1zLmpvaW4oJywgJyl9KSB0byBiZSBpbnRlcnBvbGF0ZWQgcHJvcGVybHkuIGAgOiBgVGhlIHByb3ZpZGVkIFxcYGFzXFxgIHZhbHVlICgke2FzUGF0aG5hbWV9KSBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGUgXFxgaHJlZlxcYCB2YWx1ZSAoJHtyb3V0ZX0pLiBgKSArIGBSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzLyR7c2hvdWxkSW50ZXJwb2xhdGUgPyAnaHJlZi1pbnRlcnBvbGF0aW9uLWZhaWxlZCcgOiAnaW5jb21wYXRpYmxlLWhyZWYtYXMnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hvdWxkSW50ZXJwb2xhdGUpIHtcbiAgICAgICAgICAgICAgICBhcyA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgICAgIH0sIHBhcnNlZEFzLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBpbnRlcnBvbGF0ZWRBcy5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnkxLCBpbnRlcnBvbGF0ZWRBcy5wYXJhbXMpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNZXJnZSBwYXJhbXMgaW50byBgcXVlcnlgLCBvdmVyd3JpdGluZyBhbnkgc3BlY2lmaWVkIGluIHNlYXJjaFxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocXVlcnkxLCByb3V0ZU1hdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgICAgICAgbGV0IHJvdXRlSW5mbyA9IGF3YWl0IHRoaXMuZ2V0Um91dGVJbmZvKHJvdXRlLCBwYXRobmFtZTEsIHF1ZXJ5MSwgYXMsIHJlc29sdmVkQXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgbGV0IHsgZXJyb3IgLCBwcm9wcyAsIF9fTl9TU0cgLCBfX05fU1NQICB9ID0gcm91dGVJbmZvO1xuICAgICAgICAgICAgLy8gaGFuZGxlIHJlZGlyZWN0IG9uIGNsaWVudC10cmFuc2l0aW9uXG4gICAgICAgICAgICBpZiAoKF9fTl9TU0cgfHwgX19OX1NTUCkgJiYgcHJvcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMucGFnZVByb3BzICYmIHByb3BzLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm9wcy5wYWdlUHJvcHMuX19OX1JFRElSRUNUO1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBkZXN0aW5hdGlvbiBpcyBpbnRlcm5hbCAocmVzb2x2ZXMgdG8gYSBwYWdlKSBhbmQgYXR0ZW1wdFxuICAgICAgICAgICAgICAgICAgICAvLyBjbGllbnQtbmF2aWdhdGlvbiBpZiBpdCBpcyBmYWxsaW5nIGJhY2sgdG8gaGFyZCBuYXZpZ2F0aW9uIGlmXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0J3Mgbm90XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbi5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZEhyZWYgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwoZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkSHJlZi5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGFyc2VkSHJlZi5wYXRobmFtZSwgcGFnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB1cmw6IG5ld1VybCAsIGFzOiBuZXdBcyAgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCBkZXN0aW5hdGlvbiwgZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKG1ldGhvZCwgbmV3VXJsLCBuZXdBcywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJldmlldyA9ICEhcHJvcHMuX19OX1BSRVZJRVc7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIFNTRyBkYXRhIDQwNFxuICAgICAgICAgICAgICAgIGlmIChwcm9wcy5ub3RGb3VuZCA9PT0gU1NHX0RBVEFfTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub3RGb3VuZFJvdXRlO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudCgnLzQwNCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvNDA0JztcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvX2Vycm9yJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhub3RGb3VuZFJvdXRlLCBub3RGb3VuZFJvdXRlLCBxdWVyeTEsIGFzLCByZXNvbHZlZEFzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFsbG93OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFwcENvbXAgPSB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5uZXh0LmlzUHJlcmVuZGVyZWQgPSBhcHBDb21wLmdldEluaXRpYWxQcm9wcyA9PT0gYXBwQ29tcC5vcmlnR2V0SW5pdGlhbFByb3BzICYmICFyb3V0ZUluZm8uQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLl9oICYmIHBhdGhuYW1lMSA9PT0gJy9fZXJyb3InICYmICgocmVmID0gc2VsZi5fX05FWFRfREFUQV9fLnByb3BzKSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChyZWYxID0gcmVmLnBhZ2VQcm9wcykgPT09IG51bGwgfHwgcmVmMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmMS5zdGF0dXNDb2RlKSA9PT0gNTAwICYmIChwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMucGFnZVByb3BzKSkge1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBzdGF0dXNDb2RlIGlzIHN0aWxsIGNvcnJlY3QgZm9yIHN0YXRpYyA1MDAgcGFnZVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdXBkYXRpbmcgcXVlcnkgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICBwcm9wcy5wYWdlUHJvcHMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNoYWxsb3cgcm91dGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIHNhbWUgcGFnZSBVUkwgY2hhbmdlcy5cbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRTaGFsbG93Um91dGUgPSBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGU7XG4gICAgICAgICAgICB2YXIgX3Njcm9sbDtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZFNjcm9sbCA9IChfc2Nyb2xsID0gb3B0aW9ucy5zY3JvbGwpICE9PSBudWxsICYmIF9zY3JvbGwgIT09IHZvaWQgMCA/IF9zY3JvbGwgOiAhaXNWYWxpZFNoYWxsb3dSb3V0ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlc2V0U2Nyb2xsID0gc2hvdWxkU2Nyb2xsID8ge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgfSA6IG51bGw7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNldChyb3V0ZSwgcGF0aG5hbWUxLCBxdWVyeTEsIGNsZWFuZWRBcywgcm91dGVJbmZvLCBmb3JjZWRTY3JvbGwgIT09IG51bGwgJiYgZm9yY2VkU2Nyb2xsICE9PSB2b2lkIDAgPyBmb3JjZWRTY3JvbGwgOiByZXNldFNjcm9sbCkuY2F0Y2goKGUpPT57XG4gICAgICAgICAgICAgICAgaWYgKGUuY2FuY2VsbGVkKSBlcnJvciA9IGVycm9yIHx8IGU7XG4gICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnJvciwgY2xlYW5lZEFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nID0gdGhpcy5sb2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycjEpIHtcbiAgICAgICAgICAgIGlmIChlcnIxLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zID0ge1xuICAgIH0pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkgaXMgbm90IGF2YWlsYWJsZS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5oaXN0b3J5W21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkuJHttZXRob2R9IGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgfHwgKDAsIF91dGlscykuZ2V0VVJMKCkgIT09IGFzKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFsbG93ID0gb3B0aW9ucy5zaGFsbG93O1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnlbbWV0aG9kXSh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGFzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgX19OOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlkeDogdGhpcy5faWR4ID0gbWV0aG9kICE9PSAncHVzaFN0YXRlJyA/IHRoaXMuX2lkeCA6IHRoaXMuX2lkeCArIDFcbiAgICAgICAgICAgIH0sIC8vIE1vc3QgYnJvd3NlcnMgY3VycmVudGx5IGlnbm9yZXMgdGhpcyBwYXJhbWV0ZXIsIGFsdGhvdWdoIHRoZXkgbWF5IHVzZSBpdCBpbiB0aGUgZnV0dXJlLlxuICAgICAgICAgICAgLy8gUGFzc2luZyB0aGUgZW1wdHkgc3RyaW5nIGhlcmUgc2hvdWxkIGJlIHNhZmUgYWdhaW5zdCBmdXR1cmUgY2hhbmdlcyB0byB0aGUgbWV0aG9kLlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkvcmVwbGFjZVN0YXRlXG4gICAgICAgICAgICAnJywgYXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZVJvdXRlSW5mb0Vycm9yKGVyciwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcm91dGVQcm9wcywgbG9hZEVycm9yRmFpbCkge1xuICAgICAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgLy8gYnViYmxlIHVwIGNhbmNlbGxhdGlvbiBlcnJvcnNcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKDAsIF9yb3V0ZUxvYWRlcikuaXNBc3NldEVycm9yKGVycikgfHwgbG9hZEVycm9yRmFpbCkge1xuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICAvLyBJZiB3ZSBjYW4ndCBsb2FkIHRoZSBwYWdlIGl0IGNvdWxkIGJlIG9uZSBvZiBmb2xsb3dpbmcgcmVhc29uc1xuICAgICAgICAgICAgLy8gIDEuIFBhZ2UgZG9lc24ndCBleGlzdHNcbiAgICAgICAgICAgIC8vICAyLiBQYWdlIGRvZXMgZXhpc3QgaW4gYSBkaWZmZXJlbnQgem9uZVxuICAgICAgICAgICAgLy8gIDMuIEludGVybmFsIGVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHBhZ2VcbiAgICAgICAgICAgIC8vIFNvLCBkb2luZyBhIGhhcmQgcmVsb2FkIGlzIHRoZSBwcm9wZXIgd2F5IHRvIGRlYWwgd2l0aCB0aGlzLlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhcztcbiAgICAgICAgICAgIC8vIENoYW5naW5nIHRoZSBVUkwgZG9lc24ndCBibG9jayBleGVjdXRpbmcgdGhlIGN1cnJlbnQgY29kZSBwYXRoLlxuICAgICAgICAgICAgLy8gU28gbGV0J3MgdGhyb3cgYSBjYW5jZWxsYXRpb24gZXJyb3Igc3RvcCB0aGUgcm91dGluZyBsb2dpYy5cbiAgICAgICAgICAgIHRocm93IGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IENvbXBvbmVudDE7XG4gICAgICAgICAgICBsZXQgc3R5bGVTaGVldHM7XG4gICAgICAgICAgICBsZXQgcHJvcHM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIENvbXBvbmVudDEgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBzdHlsZVNoZWV0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAoeyBwYWdlOiBDb21wb25lbnQxICwgc3R5bGVTaGVldHMgIH0gPSBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KCcvX2Vycm9yJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgcm91dGVJbmZvID0ge1xuICAgICAgICAgICAgICAgIHByb3BzLFxuICAgICAgICAgICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50MSxcbiAgICAgICAgICAgICAgICBzdHlsZVNoZWV0cyxcbiAgICAgICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghcm91dGVJbmZvLnByb3BzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gYXdhaXQgdGhpcy5nZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50MSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChnaXBFcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZXJyb3IgcGFnZSBgZ2V0SW5pdGlhbFByb3BzYDogJywgZ2lwRXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3V0ZUluZm87XG4gICAgICAgIH0gY2F0Y2ggKHJvdXRlSW5mb0Vycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUm91dGVJbmZvRXJyb3Iocm91dGVJbmZvRXJyLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZVByb3BzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRSb3V0ZUluZm8ocm91dGUsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJlc29sdmVkQXMsIHJvdXRlUHJvcHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nUm91dGVJbmZvID0gdGhpcy5jb21wb25lbnRzW3JvdXRlXTtcbiAgICAgICAgICAgIGlmIChyb3V0ZVByb3BzLnNoYWxsb3cgJiYgZXhpc3RpbmdSb3V0ZUluZm8gJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdSb3V0ZUluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYWNoZWRSb3V0ZUluZm8gPSBleGlzdGluZ1JvdXRlSW5mbyAmJiAnaW5pdGlhbCcgaW4gZXhpc3RpbmdSb3V0ZUluZm8gPyB1bmRlZmluZWQgOiBleGlzdGluZ1JvdXRlSW5mbztcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5mbyA9IGNhY2hlZFJvdXRlSW5mbyA/IGNhY2hlZFJvdXRlSW5mbyA6IGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQocm91dGUpLnRoZW4oKHJlcyk9Pih7XG4gICAgICAgICAgICAgICAgICAgIENvbXBvbmVudDogcmVzLnBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlU2hlZXRzOiByZXMuc3R5bGVTaGVldHMsXG4gICAgICAgICAgICAgICAgICAgIF9fTl9TU0c6IHJlcy5tb2QuX19OX1NTRyxcbiAgICAgICAgICAgICAgICAgICAgX19OX1NTUDogcmVzLm1vZC5fX05fU1NQXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB7IENvbXBvbmVudDogQ29tcG9uZW50MSAsIF9fTl9TU0cgLCBfX05fU1NQICB9ID0gcm91dGVJbmZvO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSAgfSA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUoQ29tcG9uZW50MSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZGVmYXVsdCBleHBvcnQgaXMgbm90IGEgUmVhY3QgQ29tcG9uZW50IGluIHBhZ2U6IFwiJHtwYXRobmFtZX1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkYXRhSHJlZjtcbiAgICAgICAgICAgIGlmIChfX05fU1NHIHx8IF9fTl9TU1ApIHtcbiAgICAgICAgICAgICAgICBkYXRhSHJlZiA9IHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZigoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVxuICAgICAgICAgICAgICAgIH0pLCByZXNvbHZlZEFzLCBfX05fU1NHLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IGF3YWl0IHRoaXMuX2dldERhdGEoKCk9Pl9fTl9TU0cgPyB0aGlzLl9nZXRTdGF0aWNEYXRhKGRhdGFIcmVmKSA6IF9fTl9TU1AgPyB0aGlzLl9nZXRTZXJ2ZXJEYXRhKGRhdGFIcmVmKSA6IHRoaXMuZ2V0SW5pdGlhbFByb3BzKENvbXBvbmVudDEsIC8vIHdlIHByb3ZpZGUgQXBwVHJlZSBsYXRlciBzbyB0aGlzIG5lZWRzIHRvIGJlIGBhbnlgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGFzUGF0aDogYXMsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZXM6IHRoaXMubG9jYWxlcyxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdExvY2FsZTogdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByb3V0ZUluZm8ucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tyb3V0ZV0gPSByb3V0ZUluZm87XG4gICAgICAgICAgICByZXR1cm4gcm91dGVJbmZvO1xuICAgICAgICB9IGNhdGNoIChlcnIyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihlcnIyLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQocm91dGUsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIGRhdGEsIHJlc2V0U2Nyb2xsKSB7XG4gICAgICAgIHRoaXMuaXNGYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLmFzUGF0aCA9IGFzO1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RpZnkoZGF0YSwgcmVzZXRTY3JvbGwpO1xuICAgIH1cbiAgICAvKipcbiAgICogQ2FsbGJhY2sgdG8gZXhlY3V0ZSBiZWZvcmUgcmVwbGFjaW5nIHJvdXRlciBzdGF0ZVxuICAgKiBAcGFyYW0gY2IgY2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWRcbiAgICovIGJlZm9yZVBvcFN0YXRlKGNiKSB7XG4gICAgICAgIHRoaXMuX2JwcyA9IGNiO1xuICAgIH1cbiAgICBvbmx5QUhhc2hDaGFuZ2UoYXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFzUGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBbb2xkVXJsTm9IYXNoLCBvbGRIYXNoXSA9IHRoaXMuYXNQYXRoLnNwbGl0KCcjJyk7XG4gICAgICAgIGNvbnN0IFtuZXdVcmxOb0hhc2gsIG5ld0hhc2hdID0gYXMuc3BsaXQoJyMnKTtcbiAgICAgICAgLy8gTWFrZXMgc3VyZSB3ZSBzY3JvbGwgdG8gdGhlIHByb3ZpZGVkIGhhc2ggaWYgdGhlIHVybC9oYXNoIGFyZSB0aGUgc2FtZVxuICAgICAgICBpZiAobmV3SGFzaCAmJiBvbGRVcmxOb0hhc2ggPT09IG5ld1VybE5vSGFzaCAmJiBvbGRIYXNoID09PSBuZXdIYXNoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgdXJscyBhcmUgY2hhbmdlLCB0aGVyZSdzIG1vcmUgdGhhbiBhIGhhc2ggY2hhbmdlXG4gICAgICAgIGlmIChvbGRVcmxOb0hhc2ggIT09IG5ld1VybE5vSGFzaCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBoYXNoIGhhcyBjaGFuZ2VkLCB0aGVuIGl0J3MgYSBoYXNoIG9ubHkgY2hhbmdlLlxuICAgICAgICAvLyBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSB0byBoYW5kbGUgYm90aCB0aGUgZW50ZXIgYW5kXG4gICAgICAgIC8vIGxlYXZlIGhhc2ggPT09ICcnIGNhc2VzLiBUaGUgaWRlbnRpdHkgY2FzZSBmYWxscyB0aHJvdWdoXG4gICAgICAgIC8vIGFuZCBpcyB0cmVhdGVkIGFzIGEgbmV4dCByZWxvYWQuXG4gICAgICAgIHJldHVybiBvbGRIYXNoICE9PSBuZXdIYXNoO1xuICAgIH1cbiAgICBzY3JvbGxUb0hhc2goYXMpIHtcbiAgICAgICAgY29uc3QgWywgaGFzaF0gPSBhcy5zcGxpdCgnIycpO1xuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIGlmIHRoZSBoYXNoIGlzIGp1c3QgYCNgIHdpdGggbm8gdmFsdWUgb3IgYCN0b3BgXG4gICAgICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgICAgICBpZiAoaGFzaCA9PT0gJycgfHwgaGFzaCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaXJzdCB3ZSBjaGVjayBpZiB0aGUgZWxlbWVudCBieSBpZCBpcyBmb3VuZFxuICAgICAgICBjb25zdCBpZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCk7XG4gICAgICAgIGlmIChpZEVsKSB7XG4gICAgICAgICAgICBpZEVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUncyBubyBlbGVtZW50IHdpdGggdGhlIGlkLCB3ZSBjaGVjayB0aGUgYG5hbWVgIHByb3BlcnR5XG4gICAgICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgICAgICBjb25zdCBuYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShoYXNoKVswXTtcbiAgICAgICAgaWYgKG5hbWVFbCkge1xuICAgICAgICAgICAgbmFtZUVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXJsSXNOZXcoYXNQYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzUGF0aCAhPT0gYXNQYXRoO1xuICAgIH1cbiAgICAvKipcbiAgICogUHJlZmV0Y2ggcGFnZSBjb2RlLCB5b3UgbWF5IHdhaXQgZm9yIHRoZSBkYXRhIGR1cmluZyBwYWdlIHJlbmRlcmluZy5cbiAgICogVGhpcyBmZWF0dXJlIG9ubHkgd29ya3MgaW4gcHJvZHVjdGlvbiFcbiAgICogQHBhcmFtIHVybCB0aGUgaHJlZiBvZiBwcmVmZXRjaGVkIHBhZ2VcbiAgICogQHBhcmFtIGFzUGF0aCB0aGUgYXMgcGF0aCBvZiB0aGUgcHJlZmV0Y2hlZCBwYWdlXG4gICAqLyBhc3luYyBwcmVmZXRjaCh1cmwsIGFzUGF0aCA9IHVybCwgb3B0aW9ucyA9IHtcbiAgICB9KSB7XG4gICAgICAgIGxldCBwYXJzZWQgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwodXJsKTtcbiAgICAgICAgbGV0IHsgcGF0aG5hbWU6IHBhdGhuYW1lMiAgfSA9IHBhcnNlZDtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwYXRobmFtZTIgPSAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGF0aG5hbWUyLCB0aGlzLmxvY2FsZXMpLnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lMjtcbiAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgICAgIGxldCBwYXJzZWRBcyA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChhc1BhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsZVBhdGhSZXN1bHQgPSAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGFyc2VkQXMucGF0aG5hbWUsIHRoaXMubG9jYWxlcyk7XG4gICAgICAgICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBsb2NhbGVQYXRoUmVzdWx0LnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gbG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSB8fCB0aGlzLmRlZmF1bHRMb2NhbGU7XG4gICAgICAgICAgICAgICAgYXNQYXRoID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KCk7XG4gICAgICAgIGxldCByZXNvbHZlZEFzID0gYXNQYXRoO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhc1BhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICBsZXQgcmV3cml0ZXM7XG4gICAgICAgICAgICAoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyAgfSA9IGF3YWl0ICgwLCBfcm91dGVMb2FkZXIpLmdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSk7XG4gICAgICAgICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9ICgwLCBfcmVzb2x2ZVJld3JpdGVzKS5kZWZhdWx0KGFkZEJhc2VQYXRoKGFkZExvY2FsZShhc1BhdGgsIHRoaXMubG9jYWxlKSksIHBhZ2VzLCByZXdyaXRlcywgcGFyc2VkLnF1ZXJ5LCAocCk9PnJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpXG4gICAgICAgICAgICAsIHRoaXMubG9jYWxlcyk7XG4gICAgICAgICAgICByZXNvbHZlZEFzID0gZGVsTG9jYWxlKGRlbEJhc2VQYXRoKHJld3JpdGVzUmVzdWx0LmFzUGF0aCksIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGlmIChyZXdyaXRlc1Jlc3VsdC5tYXRjaGVkUGFnZSAmJiByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWYpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgdGhlIGNvcnJlY3QgcGFnZSBjaHVuayB0byBiZSBsb2FkZWRcbiAgICAgICAgICAgICAgICBwYXRobmFtZTIgPSByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWY7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWUyO1xuICAgICAgICAgICAgICAgIHVybCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKHBhcnNlZC5wYXRobmFtZSwgcGFnZXMpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUyID0gcGFyc2VkLnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lMjtcbiAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlID0gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZTIpO1xuICAgICAgICAvLyBQcmVmZXRjaCBpcyBub3Qgc3VwcG9ydGVkIGluIGRldmVsb3BtZW50IG1vZGUgYmVjYXVzZSBpdCB3b3VsZCB0cmlnZ2VyIG9uLWRlbWFuZC1lbnRyaWVzXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5wYWdlTG9hZGVyLl9pc1NzZyhyb3V0ZSkudGhlbigoaXNTc2cpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3NnID8gdGhpcy5fZ2V0U3RhdGljRGF0YSh0aGlzLnBhZ2VMb2FkZXIuZ2V0RGF0YUhyZWYodXJsLCByZXNvbHZlZEFzLCB0cnVlLCB0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgIT09ICd1bmRlZmluZWQnID8gb3B0aW9ucy5sb2NhbGUgOiB0aGlzLmxvY2FsZSkpIDogZmFsc2U7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRoaXMucGFnZUxvYWRlcltvcHRpb25zLnByaW9yaXR5ID8gJ2xvYWRQYWdlJyA6ICdwcmVmZXRjaCddKHJvdXRlKSwgXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBhc3luYyBmZXRjaENvbXBvbmVudChyb3V0ZSkge1xuICAgICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IHRoaXMuY2xjID0gKCk9PntcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlc3VsdCA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5sb2FkUGFnZShyb3V0ZSk7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBBYm9ydCBmZXRjaGluZyBjb21wb25lbnQgZm9yIHJvdXRlOiBcIiR7cm91dGV9XCJgKTtcbiAgICAgICAgICAgIGVycm9yLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgICAgICAgdGhpcy5jbGMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSZXN1bHQ7XG4gICAgfVxuICAgIF9nZXREYXRhKGZuKSB7XG4gICAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2FuY2VsID0gKCk9PntcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2xjID0gY2FuY2VsO1xuICAgICAgICByZXR1cm4gZm4oKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyMiA9IG5ldyBFcnJvcignTG9hZGluZyBpbml0aWFsIHByb3BzIGNhbmNlbGxlZCcpO1xuICAgICAgICAgICAgICAgIGVycjIuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnIyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U3RhdGljRGF0YShkYXRhSHJlZikge1xuICAgICAgICBjb25zdCB7IGhyZWY6IGNhY2hlS2V5ICB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJiAhdGhpcy5pc1ByZXZpZXcgJiYgdGhpcy5zZGNbY2FjaGVLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc2RjW2NhY2hlS2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLnNkY1tjYWNoZUtleV0gPSBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U2VydmVyRGF0YShkYXRhSHJlZikge1xuICAgICAgICBjb25zdCB7IGhyZWY6IHJlc291cmNlS2V5ICB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAodGhpcy5zZHJbcmVzb3VyY2VLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZHJbcmVzb3VyY2VLZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNkcltyZXNvdXJjZUtleV0gPSBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCB0aGlzLmlzU3NyKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2RyW3Jlc291cmNlS2V5XTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KS5jYXRjaCgoZXJyMik9PntcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNkcltyZXNvdXJjZUtleV07XG4gICAgICAgICAgICB0aHJvdyBlcnIyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SW5pdGlhbFByb3BzKENvbXBvbmVudCwgY3R4KSB7XG4gICAgICAgIGNvbnN0IHsgQ29tcG9uZW50OiBBcHAxICB9ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddO1xuICAgICAgICBjb25zdCBBcHBUcmVlID0gdGhpcy5fd3JhcEFwcChBcHAxKTtcbiAgICAgICAgY3R4LkFwcFRyZWUgPSBBcHBUcmVlO1xuICAgICAgICByZXR1cm4gKDAsIF91dGlscykubG9hZEdldEluaXRpYWxQcm9wcyhBcHAxLCB7XG4gICAgICAgICAgICBBcHBUcmVlLFxuICAgICAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICAgICAgcm91dGVyOiB0aGlzLFxuICAgICAgICAgICAgY3R4XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhYm9ydENvbXBvbmVudExvYWQoYXMsIHJvdXRlUHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xjKSB7XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBidWlsZENhbmNlbGxhdGlvbkVycm9yKCksIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuY2xjKCk7XG4gICAgICAgICAgICB0aGlzLmNsYyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbm90aWZ5KGRhdGEsIHJlc2V0U2Nyb2xsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YihkYXRhLCB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50LCByZXNldFNjcm9sbCk7XG4gICAgfVxufVxuUm91dGVyLmV2ZW50cyA9ICgwLCBfbWl0dCkuZGVmYXVsdCgpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZXIuanMubWFwIiwiaW1wb3J0IHsgQ29tbWVudERhdGEsIExvYWRDb21tZW50UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbW1lbnQnO1xyXG5pbXBvcnQgQ29tbWVudEl0ZW0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9Db21tZW50SXRlbSc7XHJcbmltcG9ydCB7IENvbW1lbnRUaXRsZSwgV3JhcHBlciB9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuY29uc3QgQ29tbWVudExpc3Q6IFJlYWN0LkZDPExvYWRDb21tZW50UmVzcG9uc2U+ID0gKHsgZGF0YSB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxDb21tZW50VGl0bGU+XHJcbiAgICAgICAg64yT6riAXHJcbiAgICAgICAgPHNwYW4+e2Ake2RhdGEubGVuZ3RofeqwnGB9PC9zcGFuPlxyXG4gICAgICA8L0NvbW1lbnRUaXRsZT5cclxuICAgICAgPFdyYXBwZXI+XHJcbiAgICAgICAge2RhdGEgJiZcclxuICAgICAgICAgIGRhdGEubWFwKChpdGVtOiBDb21tZW50RGF0YSkgPT4gKFxyXG4gICAgICAgICAgICA8Q29tbWVudEl0ZW0gZGF0YT17aXRlbX0ga2V5PXtpdGVtLmNyZWF0ZWRBdH0gLz5cclxuICAgICAgICAgICkpfVxyXG4gICAgICA8L1dyYXBwZXI+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudExpc3Q7XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTVlNWU1O1xyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlNWU1O1xyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcblxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDk1JTtcclxuICAgIG1hcmdpbjogMCBhdXRvIDMwcHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbW1lbnRUaXRsZSA9IHN0eWxlZC5kaXZgXHJcbiAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gIGZvbnQtZmFtaWx5OiBCTWV1bGppcm87XHJcbiAgZm9udC1zaXplOiAyNXB4O1xyXG4gIG1hcmdpbi10b3A6IDUwcHg7XHJcblxyXG4gICYgc3BhbiB7XHJcbiAgICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgcGFkZGluZzogMTBweCAzMHB4O1xyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQge1xyXG4gIEJ1dHRvbldyYXBwZXIsXHJcbiAgRGV0YWlsSXRlbUltYWdlLFxyXG4gIERldGFpbEl0ZW1JbmZvLFxyXG4gIERldGFpbEl0ZW1PdmVydmlldyxcclxuICBEZXRhaWxJdGVtVGl0bGUsXHJcbiAgRGV0YWlsSXRlbVdyYXBwZXIsXHJcbiAgSW1hZ2VXcmFwcGVyLFxyXG59IGZyb20gJy4vc3R5bGUnO1xyXG5pbXBvcnQgVG91clNwb3QgZnJvbSAnLi4vVG91clNwb3QnO1xyXG5pbXBvcnQgVG91ckN1bHR1cmUgZnJvbSAnLi4vVG91ckN1bHR1cmUnO1xyXG5pbXBvcnQgVG91ckV2ZW50IGZyb20gJy4uL1RvdXJFdmVudCc7XHJcbmltcG9ydCBUb3VyQ291cnNlIGZyb20gJy4uL1RvdXJDb3Vyc2UnO1xyXG5pbXBvcnQgVG91clNwb3J0cyBmcm9tICcuLi9Ub3VyU3BvcnRzJztcclxuaW1wb3J0IFRvdXJTbGVlcCBmcm9tICcuLi9Ub3VyU2xlZXAnO1xyXG5pbXBvcnQgVG91ck1hbGwgZnJvbSAnLi4vVG91ck1hbGwnO1xyXG5pbXBvcnQgVG91ckZvb2QgZnJvbSAnLi4vVG91ckZvb2QnO1xyXG5pbXBvcnQgeyBDYXJldERvd25PdXRsaW5lZCwgQ2FyZXRVcE91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgS2FrYW9tYXAgZnJvbSAnLi4vS2FrYW9tYXAnO1xyXG5pbXBvcnQgdXNlVG9nZ2xlIGZyb20gJy4uLy4uLy4uL3V0aWxzL3VzZVRvZ2dsZSc7XHJcblxyXG5jb25zdCBEZXRhaWxJdGVtOiBSZWFjdC5GQzxEZXRhaWxJdGVtcHJvcHM+ID0gKHsgaXRlbSB9KSA9PiB7XHJcbiAgY29uc3QgeyB0aXRsZSwgZmlyc3RpbWFnZSwgb3ZlcnZpZXcsIGNvbnRlbnR0eXBlaWQgfSA9IGl0ZW07XHJcbiAgY29uc3QgW21vcmUsIG9uVG9nZ2xlTW9yZV0gPSB1c2VUb2dnbGUodHJ1ZSk7XHJcbiAgY29uc3QgW21pbkhlaWdodCwgb25Ub2dnbGVNaW5IZWlnaHRdID0gdXNlVG9nZ2xlKGZhbHNlKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IG1vcmVIZWlnaHQgPSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vcmVEaXYnKSBhcyBIVE1MRGl2RWxlbWVudClcclxuICAgICAgLmNsaWVudEhlaWdodDtcclxuICAgIGlmIChtb3JlSGVpZ2h0IDwgMTU1KSB7XHJcbiAgICAgIG9uVG9nZ2xlTWluSGVpZ2h0KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvblRvZ2dsZU1vcmUoKTtcclxuICAgIH1cclxuICB9LCBbb25Ub2dnbGVNb3JlLCBvblRvZ2dsZU1pbkhlaWdodF0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPERldGFpbEl0ZW1XcmFwcGVyPlxyXG4gICAgICAgIDxEZXRhaWxJdGVtVGl0bGU+e3RpdGxlfTwvRGV0YWlsSXRlbVRpdGxlPlxyXG4gICAgICAgIDxJbWFnZVdyYXBwZXI+XHJcbiAgICAgICAgICB7Zmlyc3RpbWFnZSAmJiAoXHJcbiAgICAgICAgICAgIDxEZXRhaWxJdGVtSW1hZ2VcclxuICAgICAgICAgICAgICBzcmM9e2ZpcnN0aW1hZ2V9XHJcbiAgICAgICAgICAgICAgYWx0PXt0aXRsZX1cclxuICAgICAgICAgICAgICB3aWR0aD17OTgwfVxyXG4gICAgICAgICAgICAgIGhlaWdodD17ODAwfVxyXG4gICAgICAgICAgICAgIGxheW91dD1cInJlc3BvbnNpdmVcIlxyXG4gICAgICAgICAgICAgIHByaW9yaXR5PXt0cnVlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0ltYWdlV3JhcHBlcj5cclxuICAgICAgICA8RGV0YWlsSXRlbUluZm8+7IOB7IS47KCV67O0PC9EZXRhaWxJdGVtSW5mbz5cclxuICAgICAgICA8RGV0YWlsSXRlbU92ZXJ2aWV3XHJcbiAgICAgICAgICBpZD1cIm1vcmVEaXZcIlxyXG4gICAgICAgICAgbW9yZT17bW9yZX1cclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XHJcbiAgICAgICAgICAgIF9faHRtbDogb3ZlcnZpZXcucmVwbGFjZUFsbCgvXFxzWypdL2csICc8YnIvPjxici8+KicpLFxyXG4gICAgICAgICAgfX1cclxuICAgICAgICAvPlxyXG5cclxuICAgICAgICB7bWluSGVpZ2h0ID8gbnVsbCA6IChcclxuICAgICAgICAgIDxCdXR0b25XcmFwcGVyIG9uQ2xpY2s9e29uVG9nZ2xlTW9yZX0+XHJcbiAgICAgICAgICAgIHshbW9yZSA/IChcclxuICAgICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgICAgPGI+642U67O06riwPC9iPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxDYXJldERvd25PdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8Yj7ri6vquLA8L2I+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPENhcmV0VXBPdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgICApfVxyXG4gICAgICAgICAgPC9CdXR0b25XcmFwcGVyPlxyXG4gICAgICAgICl9XHJcblxyXG4gICAgICAgIHs8S2FrYW9tYXAgaXRlbT17aXRlbX0gLz59XHJcblxyXG4gICAgICAgIHsoKCkgPT4ge1xyXG4gICAgICAgICAgc3dpdGNoIChjb250ZW50dHlwZWlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIDxUb3VyU3BvdCBpdGVtPXtpdGVtfSAvPjtcclxuICAgICAgICAgICAgY2FzZSAxNDpcclxuICAgICAgICAgICAgICByZXR1cm4gPFRvdXJDdWx0dXJlIGl0ZW09e2l0ZW19IC8+O1xyXG4gICAgICAgICAgICBjYXNlIDE1OlxyXG4gICAgICAgICAgICAgIHJldHVybiA8VG91ckV2ZW50IGl0ZW09e2l0ZW19IC8+O1xyXG4gICAgICAgICAgICBjYXNlIDI1OlxyXG4gICAgICAgICAgICAgIHJldHVybiA8VG91ckNvdXJzZSBpdGVtPXtpdGVtfSAvPjtcclxuICAgICAgICAgICAgY2FzZSAyODpcclxuICAgICAgICAgICAgICByZXR1cm4gPFRvdXJTcG9ydHMgaXRlbT17aXRlbX0gLz47XHJcbiAgICAgICAgICAgIGNhc2UgMzI6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIDxUb3VyU2xlZXAgaXRlbT17aXRlbX0gLz47XHJcbiAgICAgICAgICAgIGNhc2UgMzg6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIDxUb3VyTWFsbCBpdGVtPXtpdGVtfSAvPjtcclxuICAgICAgICAgICAgY2FzZSAzOTpcclxuICAgICAgICAgICAgICByZXR1cm4gPFRvdXJGb29kIGl0ZW09e2l0ZW19IC8+O1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIG51bGw7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSkoKX1cclxuICAgICAgPC9EZXRhaWxJdGVtV3JhcHBlcj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxJdGVtO1xyXG4iLCJpbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERldGFpbEl0ZW1XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBEZXRhaWxJdGVtVGl0bGUgPSBzdHlsZWQuaDJgXHJcbiAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gIGZvbnQtc2l6ZTogNTBweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIHBhZGRpbmc6IDUwcHggMDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHBhZGRpbmc6IDEwMHB4IDAgNTBweDtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBmb250LXNpemU6IDQ1cHg7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVMfSB7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IERldGFpbEl0ZW1JbWFnZSA9IHN0eWxlZChJbWFnZSlgXHJcbiAgd2lkdGg6IDk4MHB4O1xyXG4gIHBhZGRpbmc6IDAgMCA1MHB4IDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBJbWFnZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgRGV0YWlsSXRlbUluZm8gPSBzdHlsZWQuaDNgXHJcbiAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkIGJsYWNrO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuICBmb250LXNpemU6IDMwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBtYXJnaW46IDMwcHggMDtcclxuICBwYWRkaW5nOiAyMHB4IDEwcHggMTVweDtcclxuICAvLyBmb250LWZhbWlseTogJ0dvd3VuIEJhdGFuZycsIHNlcmlmO1xyXG5cclxuICAmIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IEJNSEFOTkFBaXI7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBmb250LXNpemU6IDI3cHg7XHJcbiAgICAmIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDE2cHg7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IERldGFpbEl0ZW1PdmVydmlldyA9IHN0eWxlZC5kaXY8eyBtb3JlOiBib29sZWFuIH0+YFxyXG4gIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBmb250LXNpemU6IDE3cHg7XHJcbiAgZm9udC1mYW1pbHk6ICdHb3d1biBCYXRhbmcnLCBzZXJpZjtcclxuICBoZWlnaHQ6ICR7KHByb3BzKSA9PiAocHJvcHMubW9yZSA/ICcxMDAlOycgOiAnMTU1cHg7Jyl9IFxyXG4gIG92ZXJmbG93OiBoaWRkZW47XHJcblxyXG4gIFxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIGxpbmUtaGVpZ2h0OiAxLjM7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEJ1dHRvbldyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjMDAwO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgJiBzcGFuIHtcclxuICAgIHBhZGRpbmc6IDAgM3B4O1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gIH1cclxuICBtYXJnaW46IDE1cHggMDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIEltYWdlU2tlbGV0b24sXHJcbiAgU2tlbGV0b25Cb3gsXHJcbiAgVGl0bGVCb3gsXHJcbiAgVGl0bGVTa2VsZXRvbixcclxuICBXcmFwcGVyLFxyXG59IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuY29uc3QgRGV0YWlsU2tlbGV0b246IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8V3JhcHBlcj5cclxuICAgICAgPFRpdGxlQm94PlxyXG4gICAgICAgIDxUaXRsZVNrZWxldG9uIC8+XHJcbiAgICAgIDwvVGl0bGVCb3g+XHJcbiAgICAgIDxTa2VsZXRvbkJveD5cclxuICAgICAgICA8SW1hZ2VTa2VsZXRvbiAvPlxyXG4gICAgICA8L1NrZWxldG9uQm94PlxyXG4gICAgPC9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBEZXRhaWxTa2VsZXRvbjtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgVGl0bGVCb3ggPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGhlaWdodDogMTUwcHg7XHJcbiAgcGFkZGluZzogNTBweCAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgcGFkZGluZzogMTAwcHggMCA1MHB4O1xyXG4gICAgaGVpZ2h0OiAyMDBweDtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgaGVpZ2h0OiAxOTVweDtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgaGVpZ2h0OiAxOTBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgVGl0bGVTa2VsZXRvbiA9IHN0eWxlZC5kaXZgXHJcbiAgQC13ZWJraXQta2V5ZnJhbWVzIGxvYWRpbmcge1xyXG4gICAgMCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgNTAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjMpO1xyXG4gICAgfVxyXG5cclxuICAgIDEwMCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBrZXlmcmFtZXMgbG9hZGluZyB7XHJcbiAgICAwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICA1MCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMyk7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4xKTtcclxuICAgIH1cclxuICB9XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nIDEuNXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgYW5pbWF0aW9uOiBsb2FkaW5nIDEuNXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBoZWlnaHQ6IDQ1cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgaGVpZ2h0OiA0MHB4O1xyXG4gIH1cclxuYDtcclxuZXhwb3J0IGNvbnN0IFNrZWxldG9uQm94ID0gc3R5bGVkLmRpdmBcclxuICB3aWR0aDogOTgwcHg7XHJcbiAgaGVpZ2h0OiA2NTRweDtcclxuICBtYXJnaW46IDVweDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5wY30ge1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEltYWdlU2tlbGV0b24gPSBzdHlsZWQuZGl2YFxyXG4gIEAtd2Via2l0LWtleWZyYW1lcyBsb2FkaW5nIHtcclxuICAgIDAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjEpO1xyXG4gICAgfVxyXG5cclxuICAgIDUwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4zKTtcclxuICAgIH1cclxuXHJcbiAgICAxMDAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjEpO1xyXG4gICAgfVxyXG4gIH1cclxuICBAa2V5ZnJhbWVzIGxvYWRpbmcge1xyXG4gICAgMCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgNTAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjMpO1xyXG4gICAgfVxyXG5cclxuICAgIDEwMCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHdpZHRoOiA5ODBweDtcclxuICBoZWlnaHQ6IDY1NHB4O1xyXG4gIC13ZWJraXQtYW5pbWF0aW9uOiBsb2FkaW5nIDEuNXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgYW5pbWF0aW9uOiBsb2FkaW5nIDEuNXMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9vdGVyV3JhcHBlciB9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuY29uc3QgRm9vdGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcclxuICByZXR1cm4gPEZvb3RlcldyYXBwZXI+PC9Gb290ZXJXcmFwcGVyPjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgRm9vdGVyV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgaGVpZ2h0OiAxMDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG5gO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB7IExpIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5pbnRlcmZhY2UgSUhlYWRJdGVtIHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvbnRlbnRUeXBlSWQ6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgSGVhZEl0ZW06IFJlYWN0LkZDPElIZWFkSXRlbT4gPSAoeyB0aXRsZSwgY29udGVudFR5cGVJZCB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxMaT5cclxuICAgICAgPExpbmtcclxuICAgICAgICBocmVmPXt7XHJcbiAgICAgICAgICBwYXRobmFtZTogJy90b3VyJyxcclxuICAgICAgICAgIHF1ZXJ5OiB7IHRpdGxlLCBjb250ZW50VHlwZUlkIH0sXHJcbiAgICAgICAgfX1cclxuICAgICAgICBhcz17YC90b3VyP3RpdGxlPSR7dGl0bGV9JmNvbnRlbnRUeXBlSWQ9JHtjb250ZW50VHlwZUlkfWB9XHJcbiAgICAgID5cclxuICAgICAgICA8YT5cclxuICAgICAgICAgIHsvKiA8bGk+e3RpdGxlfTwvbGk+ICovfVxyXG4gICAgICAgICAge3RpdGxlfVxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9MaW5rPlxyXG4gICAgPC9MaT5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZEl0ZW07XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpID0gc3R5bGVkLmxpYFxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgJiBhIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAxMDA7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgeyBBcnJvd1JpZ2h0T3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IHsgSW5mb3dpbmRvdywgTWFwLCBNYXBXcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5kZWNsYXJlIGdsb2JhbCB7XHJcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XHJcbiAgICBrYWthbzogYW55O1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgS2FrYW9tYXA6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IG1hcHgsIG1hcHksIHRpdGxlIH0gPSBpdGVtO1xyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcclxuICAgIHNjcmlwdC5zcmMgPSBgLy9kYXBpLmtha2FvLmNvbS92Mi9tYXBzL3Nkay5qcz9hdXRvbG9hZD1mYWxzZSZhcHBrZXk9JHtwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19LQUtBT19NQVBTfWA7XHJcbiAgICBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XHJcblxyXG4gICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcCcpO1xyXG4gICAgc2NyaXB0Lm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgd2luZG93Lmtha2FvLm1hcHMubG9hZCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICAgIGNlbnRlcjogbmV3IHdpbmRvdy5rYWthby5tYXBzLkxhdExuZyhtYXB5LCBtYXB4KSxcclxuICAgICAgICAgIGxldmVsOiAzLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgbWFwID0gbmV3IHdpbmRvdy5rYWthby5tYXBzLk1hcChjb250YWluZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgICAgICAvLyDrp4jsu6Qg7ZGc7IucXHJcbiAgICAgICAgY29uc3QgbWFya2VyUG9zaXRpb24gPSBuZXcga2FrYW8ubWFwcy5MYXRMbmcobWFweSwgbWFweCk7XHJcbiAgICAgICAgY29uc3QgbWFya2VyID0gbmV3IGtha2FvLm1hcHMuTWFya2VyKHtcclxuICAgICAgICAgIHBvc2l0aW9uOiBtYXJrZXJQb3NpdGlvbixcclxuICAgICAgICB9KTtcclxuICAgICAgICBtYXJrZXIuc2V0TWFwKG1hcCk7XHJcblxyXG4gICAgICAgIC8vIOyngOuPhCDtmZXrjIAg66eJ6riwXHJcbiAgICAgICAgbWFwLnNldFpvb21hYmxlKGZhbHNlKTtcclxuXHJcbiAgICAgICAgLy8g7KSMIOy7qO2KuOuhpOufrFxyXG4gICAgICAgIC8vIGNvbnN0IHpvb21Db250cm9sID0gbmV3IGtha2FvLm1hcHMuWm9vbUNvbnRyb2woKTtcclxuICAgICAgICAvLyBtYXAuYWRkQ29udHJvbCh6b29tQ29udHJvbCwga2FrYW8ubWFwcy5Db250cm9sUG9zaXRpb24uUklHSFQpO1xyXG4gICAgICB9KTtcclxuICAgIH07XHJcbiAgICByZXR1cm4gKCkgPT4gc2NyaXB0LnJlbW92ZSgpO1xyXG4gIH0sIFtpdGVtLCBtYXB4LCBtYXB5XSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7bWFweCA/IChcclxuICAgICAgICA8TWFwV3JhcHBlcj5cclxuICAgICAgICAgIDxJbmZvd2luZG93PlxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgIDxzcGFuPnt0aXRsZX08L3NwYW4+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8YVxyXG4gICAgICAgICAgICAgIGhyZWY9e2BodHRwczovL21hcC5rYWthby5jb20vbGluay90by8ke3RpdGxlfSwke21hcHl9LCR7bWFweH1gfVxyXG4gICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICA8Yj5cclxuICAgICAgICAgICAgICAgIOq4uOywvuq4sCA8QXJyb3dSaWdodE91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgPC9iPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L0luZm93aW5kb3c+XHJcbiAgICAgICAgICA8TWFwIGlkPVwibWFwXCI+PC9NYXA+XHJcbiAgICAgICAgPC9NYXBXcmFwcGVyPlxyXG4gICAgICApIDogbnVsbH1cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcbmV4cG9ydCBkZWZhdWx0IEtha2FvbWFwO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBNYXBXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIHBhZGRpbmc6IDcwcHggMCAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgTWFwID0gc3R5bGVkLmRpdmBcclxuICB3aWR0aDogOTgwcHg7XHJcbiAgaGVpZ2h0OiA0MDBweDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcblxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGhlaWdodDogMzUwcHg7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZUx9IHtcclxuICAgIGhlaWdodDogMjUwcHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEl3Q29udGVudFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAzNjBweDtcclxuICBoZWlnaHQ6IDIwMHB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEluZm93aW5kb3cgPSBzdHlsZWQuZGl2YFxyXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgei1pbmRleDogOTk7XHJcbiAgd2lkdGg6IDI0MHB4O1xyXG4gIGhlaWdodDogMTIwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICBtYXJnaW46IDEwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3gtc2hhZG93OiAzcHggM3B4IDVweCAwcHggcmdiKDAgMCAwIC8gMjAlKTtcclxuICBwYWRkaW5nOiAyMHB4O1xyXG5cclxuICAmIGRpdiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG4gIH1cclxuICAmIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gIH1cclxuXHJcbiAgJiBiIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM1YjViNWI7XHJcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcblxyXG4gICAgJjogaG92ZXIge1xyXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIH1cclxuXHJcbiAgICAmIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZUx9IHtcclxuICAgIHdpZHRoOiAyMDBweDtcclxuICAgIGhlaWdodDogMTAwcHg7XHJcblxyXG4gICAgJiBkaXYge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgJiBzcGFuIHtcclxuICAgICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgfVxyXG4gICAgJiBiIHtcclxuICAgICAgcGFkZGluZzogMnB4IDVweDtcclxuICAgICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgRm9vdGVyIGZyb20gJy4uL0Zvb3Rlcic7XHJcbmltcG9ydCBOYXZiYXIgZnJvbSAnLi4vLi4vY29udGFpbmVycy9OYXZiYXInO1xyXG5pbXBvcnQgeyBNYWluV3JhcHBlciB9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuY29uc3QgTGF5b3V0OiBSZWFjdC5GQyA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPE5hdmJhciAvPlxyXG4gICAgICA8TWFpbldyYXBwZXI+e2NoaWxkcmVufTwvTWFpbldyYXBwZXI+XHJcbiAgICAgIDxGb290ZXIgLz5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBMYXlvdXQ7XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1haW5XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICB3aWR0aDogMTMwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnBjfSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgeyBMaSB9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuaW50ZXJmYWNlIElTdWJJdGVtIHtcclxuICBuYW1lOiBzdHJpbmc7XHJcbiAgaHRtbDogc3RyaW5nO1xyXG59XHJcbmNvbnN0IFN1Ykl0ZW06IFJlYWN0LkZDPElTdWJJdGVtPiA9ICh7IG5hbWUsIGh0bWwgfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8TGk+XHJcbiAgICAgICAgPGI+e25hbWV9PC9iPlxyXG4gICAgICAgIDxwXHJcbiAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17e1xyXG4gICAgICAgICAgICBfX2h0bWw6IGh0bWwsXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvTGk+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU3ViSXRlbTtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgTGkgPSBzdHlsZWQubGlgXHJcbiAgd2lkdGg6IDUwJTtcclxuICBwYWRkaW5nOiAwIDEwcHg7XHJcbiAgZmxvYXQ6IGxlZnQ7XHJcbiAgZm9udC1mYW1pbHk6ICdHb3d1biBCYXRhbmcnLCBzZXJpZjtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gICYgcCB7XHJcbiAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICBwYWRkaW5nOiA1cHggMDtcclxuICAgIGEge1xyXG4gICAgICB3b3JkLWJyZWFrOiBicmVhay1hbGw7XHJcbiAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgfVxyXG4gIH1cclxuICAmIGIge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBmbG9hdDogbm9uZTtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEludHJvV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxuICB3aWR0aDogMTAwJTtcclxuXHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1xyXG4gIENhcmRJbWFnZSxcclxuICBDYXJkV3JhcHBlcixcclxuICBDb3Vyc2VJbWFnZSxcclxuICBDb3Vyc2VMaXN0LFxyXG4gIEl0ZW0sXHJcbiAgU3ViRGV0YWlsLFxyXG4gIFdyYXBwZXIsXHJcbn0gZnJvbSAnLi9zdHlsZSc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1JbmZvIH0gZnJvbSAnLi4vRGV0YWlsSXRlbS9zdHlsZSc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcywgVG91ckluZm8gfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCB7IEltYWdlIH0gZnJvbSAnYW50ZCc7XHJcblxyXG5jb25zdCBUb3VyQ291cnNlOiBSZWFjdC5GQzxEZXRhaWxJdGVtcHJvcHM+ID0gKHsgaXRlbSB9KSA9PiB7XHJcbiAgY29uc3QgW2ltYWdlU3JjLCBzZXRJbWFnZVNyY10gPSB1c2VTdGF0ZShcclxuICAgIEFycmF5LmlzQXJyYXkoaXRlbS5pbmZvKVxyXG4gICAgICA/IGl0ZW0uaW5mb1swXS5zdWJkZXRhaWxpbWdcclxuICAgICAgOiBpdGVtLmluZm8uc3ViZGV0YWlsaW1nXHJcbiAgKTtcclxuICBjb25zdCBbaW1hZ2VUaXRsZSwgc2V0SW1hZ2VUaXRsZV0gPSB1c2VTdGF0ZShcclxuICAgIEFycmF5LmlzQXJyYXkoaXRlbS5pbmZvKSA/IGl0ZW0uaW5mb1swXS5zdWJuYW1lIDogaXRlbS5pbmZvLnN1Ym5hbWVcclxuICApO1xyXG4gIGNvbnN0IFtzdWJPdmVydmlldywgc2V0U3ViT3ZlcnZpZXddID0gdXNlU3RhdGUoXHJcbiAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbylcclxuICAgICAgPyBpdGVtLmluZm9bMF0uc3ViZGV0YWlsb3ZlcnZpZXdcclxuICAgICAgOiBpdGVtLmluZm8uc3ViZGV0YWlsb3ZlcnZpZXdcclxuICApO1xyXG4gIGNvbnN0IGNoYW5nZUltYWdlU3JjID0gUmVhY3QudXNlQ2FsbGJhY2soXHJcbiAgICAoc3JjOiBUb3VySW5mbykgPT4gKCkgPT4ge1xyXG4gICAgICBzZXRJbWFnZVNyYyhzcmMuc3ViZGV0YWlsaW1nKTtcclxuICAgICAgc2V0SW1hZ2VUaXRsZShzcmMuc3VibmFtZSk7XHJcbiAgICAgIHNldFN1Yk92ZXJ2aWV3KHNyYy5zdWJkZXRhaWxvdmVydmlldyk7XHJcbiAgICB9LFxyXG4gICAgW11cclxuICApO1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RGV0YWlsSXRlbUluZm8+XHJcbiAgICAgICAg7L2U7IqkIDxzcGFuPih7aXRlbS5pbnRyby5kaXN0YW5jZX0pPC9zcGFuPlxyXG4gICAgICA8L0RldGFpbEl0ZW1JbmZvPlxyXG4gICAgICA8V3JhcHBlcj5cclxuICAgICAgICA8Q291cnNlTGlzdD5cclxuICAgICAgICAgIHtpdGVtLmluZm8gJiYgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pID8gKFxyXG4gICAgICAgICAgICBpdGVtLmluZm8ubWFwKChjb3Vyc2UpID0+IChcclxuICAgICAgICAgICAgICA8SXRlbSBrZXk9e2NvdXJzZS5zdWJjb250ZW50aWR9PlxyXG4gICAgICAgICAgICAgICAgPGRpdlxyXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ltYWdlVGl0bGUgPT0gY291cnNlLnN1Ym5hbWUgPyAnYWN0aXZlJyA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXtjaGFuZ2VJbWFnZVNyYyhjb3Vyc2UpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICB7Y291cnNlLnN1Ym5hbWV9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICA8L0l0ZW0+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8SXRlbT5cclxuICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ltYWdlVGl0bGUgPT0gaXRlbS5pbmZvLnN1Ym5hbWUgPyAnYWN0aXZlJyA6ICcnfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2hhbmdlSW1hZ2VTcmMoaXRlbS5pbmZvKX1cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICB7aXRlbS5pbmZvLnN1Ym5hbWV9XHJcbiAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvSXRlbT5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9Db3Vyc2VMaXN0PlxyXG4gICAgICAgIDxDb3Vyc2VJbWFnZT5cclxuICAgICAgICAgIDxDYXJkV3JhcHBlclxyXG4gICAgICAgICAgICBob3ZlcmFibGVcclxuICAgICAgICAgICAgY292ZXI9e1xyXG4gICAgICAgICAgICAgIGltYWdlU3JjID8gKFxyXG4gICAgICAgICAgICAgICAgPENhcmRJbWFnZVxyXG4gICAgICAgICAgICAgICAgICBzcmM9e2ltYWdlU3JjfVxyXG4gICAgICAgICAgICAgICAgICBhbHQ9XCLsvZTsiqTsnbTrr7jsp4BcIlxyXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MzAwfVxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9ezIwMH1cclxuICAgICAgICAgICAgICAgICAgcHJpb3JpdHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICAgICAgYWx0PVwi7KSA67mE7KSRXCJcclxuICAgICAgICAgICAgICAgICAgc3JjPVwiZXJyb3JcIlxyXG4gICAgICAgICAgICAgICAgICBmYWxsYmFjaz1cImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTUlBQUFERENBWUFBQURRdmM2VUFBQUJSV2xEUTFCSlEwTWdVSEp2Wm1sc1pRQUFLSkZqWUdBU1NTd295R0ZoWUdESXpTc3BDbkozVW9pSWpGSmdmOExBd1NEQ0lNb2d3TUNjbUZ4YzRCZ1E0QU5Vd2dDalVjRzNhd3lNSVBxeUxzaXM3UFBPcTNRZERGY3ZqVjNqT0QxYm9RVlRQUXJnU2trdFRnYlNmNEE0TGJtZ3FJU0JnVEVGeUZZdUx5a0FzVHVBYkpFaW9LT0E3RGtnZGpxRXZRSEVUb0t3ajREVmhBUTVBOWszZ0d5QjVJeEVvQm1NTDRCc25TUWs4WFFrTnRSZUVPQnhjZlh4VVFnMU1qYzBkeUhnWE5KQlNXcEZDWWgyemkrb0xNcE16eWhSY0FTR1VxcUNaMTZ5bm82Q2tZR1JBUU1ES013aHFqL2ZBSWNsb3hnSFFxeEFqSUhCRXVndzVzVUlzU1FwQm9idFFQZExjaUxFVkpZek1QQkhNREJzYXloSUxFcUVPNER4RzB0eG1yRVJoTTI5bllHQmRkci8vNS9ER1JqWU5Sa1kvbDcvLy8vMzl2Ly8veTREbW4rTGdlSEFOd0Rya2wxQXVPK3BtZ0FBQURobFdFbG1UVTBBS2dBQUFBZ0FBWWRwQUFRQUFBQUJBQUFBR2dBQUFBQUFBcUFDQUFRQUFBQUJBQUFBd3FBREFBUUFBQUFCQUFBQXd3QUFBQUQ5Yi9IbkFBQUhsa2xFUVZSNEFlM2RQM1BUV0JTR2NiR3pNNkdDS3FsSUJSVjBkSFJKRmFyUTBlVVQ4TEg0Qm5SVTBOSFIwVUVGVmRJbEZSVjdUelJrc29tUFk4dXlrVGsvemV3UWZLdy85em52NHl2SnluTHY0dUxpVjJkQm9EaUJmNHFQMy9BUnVDUkFCRUZBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2cwQWo4aTBKTzRPenNyUHY2OVd2K2hpMnFQSHIwcU52ZjM5K2lJOTdzb1JJaDRmM3o1OC91N2R1M1NYWDdYdDdaMmVuZXZIbXpmUWUrb1NOMmFwU0FQajA5VFNyYitYS0kvZjM3OSswOCtBMGNOUkUyQU5rdXBrK0FDTlB2a1NQY0FBRWliQUN5WFV5ZkFCR20zeU5IdUFFQ1JOZ0FaTHVZUGdFaXJLbEh1N3U3WGR5eXRHd0hBZDhqak55bmc0T0Q3dm56NTFkYlBUOC83ejU4K05COSsvYnQ2alUvVEkrQUdXSEVucng0OGVKL0VzU21Ieng0MEwxOCtmTHl6eEYzWlZNakV5RENpRURqTVlaWlM1d2lQWG55WkZiSmF4TWhRSVFSR3pIdldSN1hDeU9DWHNPbWlEQWkxSG1QTU1RakRwYnBFaURDaUwzNThlTkh1clcvNVNuV2RJQmJYaURDaUEzOC9QbnpyY2UyWXlaNC8vNTlGM2VQTE5NbDRQYnBpTDJKMEw5NzkrN3lEdEhEaHc4dnR6enZkR25FWGR2VWlnU0lzQ0xBV2F2SHAvK3FNMEJjWE1kL3EyNW4xdkY1N1RZQnAwYTNtVXppbGVQajQrN2s1S1NMYjZndDZ5ZEFoUFV6WG5vUFIwZEhsNzlXR1ROQ2ZCbm4xdXZTQ0pkZWdRaExJMXZ2Q2srZlB1MmVQWHQydFpPWUVWNi9mbjMxZHorc2h3QVIxc1AxY3F2TG50YkVOOU14QTl4Y1lqc3hTMWpXUjRBSWEySWJ6eDB0YzQ0ZllYLzE2bFY2TkRGTFhIK1lMMzJqd2lBQ1JCaUViZjVLY1hvVElzUVNwelh4NE4yOEphNEJRb0s3cmdYaXlkYkhqeC9QMjVUYVFBSkVHQWd1V3kwKzJROFBENi9LaTRSOEVWbCtiekJPblpZOTVmcTlyajl6QWtUSTJTeGRpZEJIcUc5K3NrZHc0M2JvckNYTy9aY0pkcmFQV2R2MjJ1SUVpTEE0cTdudnZDdWc4V1RxelF2ZU9IMjZmb2RvN2c2dUZlL2ExN1czK25GQkFrUllFTlJkYjF2a2t6MUNIOWNQc1Z5L2pyaHIyN1BxTVl2RU5ZTmxIQUllc1JpQll3UnkwVis4aVhQOCsvZnZYMTFNcjdMN0VDdWViL3I0OGVNcW03RnVJMkJHV0RFRzhjbSs3RzNORU9mbWRjVFF3NGg5LzU1bGhtN0Rla1JZS1FQWkYyQXJiWFRBeXU0a0RZQjJZeFV6d2cwZ2kvNDF6dEhuZlFHMjZIYkdlbC9jclZybTd0TlkrLzFidGtPRUFaMk0wNXI0RkI3cjlHYkFJZHhhWllySGRPc2dKL3dDRVFZMEo3NFRtT0tuYnh4VDluM0ZnR0dXV3NWZG93SHRqdDlObnZmN3lRTTJhWlUvVElBSUF4cnc2ZE9uQVd0Wlpjb0VuQnBOdVR1T2JXTUVpTEF4MUhZMFpRSkVtSEozSE52R0NCQmhZNmp0YU1vRWlKQjBaMjl2TDZsczU4dnhQY084L3pmcmRvNXF2S08rZDNGeDhXdTh6ZjFkVzRwL2NQekxseS9kdHY5VHMvRWJjdkdBSGhIeWZCSWhaNk5TaUlCVG8wTE5OdFNjQUJGeU5pcUZDQkNoVUxNTk5TZEFoSnlOU2lFQ1JDalViRVBOQ1JBaFo2TlNpQUFSQ2pYYlVITUNSTWpacUJRaVFJUkN6VGJVbkFBUmNqWXFoUWdRb1ZDekRUVW5RSVNjalVvaEFrUW8xR3hEelFrUUlXZWpVb2dBRVFvMTIxQnpBa1RJMmFnVUlrQ0VRczAyMUp3QUVYSTJLb1VJRUtGUXN3MDFKMENFbkkxS0lRSkVLTlJzUTgwSkVDRm5vMUtJQUJFS05kdFFjd0pFeU5tb0ZDSkFoRUxOTnRTY0FCRnlOaXFGQ0JDaFVMTU5OU2RBaEp5TlNpRUNSQ2pVYkVQTkNSQWhaNk5TaUFBUkNqWGJVSE1DUk1qWnFCUWlRSVJDelRiVW5BQVJjallxaFFnUW9WQ3pEVFVuUUlTY2pVb2hBa1FvMUd4RHpRa1FJV2VqVW9nQUVRbzEyMUJ6QWtUSTJhZ1VJa0NFUXMwMjFKd0FFWEkyS29VSUVLRlFzdzAxSjBDRW5JMUtJUUpFS05Sc1E4MEpFQ0ZubzFLSUFCRUtOZHRRY3dKRXlObW9GQ0pBaEVMTk50U2NBQkZ5TmlxRkNCQ2hVTE1OTlNkQWhKeU5TaUVDUkNqVWJFUE5DUkFoWjZOU2lBQVJDalhiVUhNQ1JNalpxQlFpUUlSQ3pUYlVuQUFSY2pZcWhRZ1FvVkN6RFRVblFJU2NqVW9oQWtRbzFHeER6UWtRSVdlalVvZ0FFUW8xMjFCekFrVEkyYWdVSWtDRVFzMDIxSndBRVhJMktvVUlFS0ZRc3cwMUowQ0VuSTFLSVFKRUtOUnNRODBKRUNGbm8xS0lBQkVLTmR0UWN3SkV5Tm1vRkNKQWhFTE5OdFNjQUJGeU5pcUZDQkNoVUxNTk5TZEFoSnlOU2lFQy93R2dLS0M0WU1BNFRBQUFBQUJKUlU1RXJrSmdnZz09XCJcclxuICAgICAgICAgICAgICAgICAgd2lkdGg9ezMwMH1cclxuICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsyMDB9XHJcbiAgICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgPjwvQ2FyZFdyYXBwZXI+XHJcbiAgICAgICAgPC9Db3Vyc2VJbWFnZT5cclxuICAgICAgPC9XcmFwcGVyPlxyXG4gICAgICA8U3ViRGV0YWlsPlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAge2AtIGB9XHJcbiAgICAgICAgICAgIHtpbWFnZVRpdGxlfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIHtzdWJPdmVydmlldyA/IChcclxuICAgICAgICAgIDxwIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogc3ViT3ZlcnZpZXcgfX0gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC9TdWJEZXRhaWw+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG91ckNvdXJzZTtcclxuIiwiaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHsgVGltZWxpbmUsIENhcmQgfSBmcm9tICdhbnRkJztcclxuXHJcbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZvbnQtZmFtaWx5OiBCTUhBTk5BQWlyO1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBJdGVtID0gc3R5bGVkKFRpbWVsaW5lLkl0ZW0pYFxyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICAmIGRpdiB7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAmLmFjdGl2ZSB7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDb3Vyc2VJbWFnZSA9IHN0eWxlZC5kaXZgYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDb3Vyc2VMaXN0ID0gc3R5bGVkKFRpbWVsaW5lKWBcclxuICBtYXJnaW4tdG9wOiAxMHB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENhcmRXcmFwcGVyID0gc3R5bGVkKENhcmQpYFxyXG4gIHdpZHRoOiAzMDBweDtcclxuICBoZWlnaHQ6IDIwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gICYgZGl2IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlU30ge1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gICAgaGVpZ2h0OiAyMDBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQ2FyZEltYWdlID0gc3R5bGVkKEltYWdlKWBcclxuICB3aWR0aDogMzAwcHg7XHJcbiAgaGVpZ2h0OiAyNTBweDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVTfSB7XHJcbiAgICAvLyB3aWR0aDogMjUwcHg7XHJcbiAgICAvLyBoZWlnaHQ6IDIwMHB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBTdWJEZXRhaWwgPSBzdHlsZWQuZGl2YFxyXG4gIGZsZXg6IDI7XHJcbiAgcGFkZGluZzogMTBweDtcclxuXHJcbiAgZm9udC1mYW1pbHk6IG5vbmU7XHJcbiAgZm9udC1zaXplOiAxNXB4O1xyXG4gIGxpbmUtaGVpZ2h0OiAxOHB4O1xyXG4gICYgc3BhbiB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIHBhZGRpbmc6IDVweDtcclxuICAgIGxpbmUtaGVpZ2h0OiAyNXB4O1xyXG4gICAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gIH1cclxuICAmIGRpdiB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG4gIH1cclxuICAmIHAge1xyXG4gICAgbGluZS1oZWlnaHQ6IDIwcHg7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBEZXRhaWxJdGVtcHJvcHMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCBTdWJJdGVtIGZyb20gJy4uL1N1Ykl0ZW0nO1xyXG5pbXBvcnQgeyBJbnRyb1dyYXBwZXIgfSBmcm9tICcuLi9TdWJJdGVtL3N0eWxlJztcclxuXHJcbmNvbnN0IFRvdXJDdWx0dXJlOiBSZWFjdC5GQzxEZXRhaWxJdGVtcHJvcHM+ID0gKHsgaXRlbSB9KSA9PiB7XHJcbiAgY29uc3QgeyBhZGRyMSwgaG9tZXBhZ2UgfSA9IGl0ZW07XHJcbiAgY29uc3QgeyBpbmZvY2VudGVyY3VsdHVyZSwgcGFya2luZ2N1bHR1cmUsIHBhcmtpbmdmZWUsIHVzZXRpbWVjdWx0dXJlIH0gPVxyXG4gICAgaXRlbS5pbnRybztcclxuICByZXR1cm4gKFxyXG4gICAgPEludHJvV3JhcHBlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHthZGRyMSA/IDxTdWJJdGVtIG5hbWU9XCLso7zshoxcIiBodG1sPXthZGRyMX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtob21lcGFnZSA/IDxTdWJJdGVtIG5hbWU9XCLtmYjtjpjsnbTsp4BcIiBodG1sPXtob21lcGFnZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtpbmZvY2VudGVyY3VsdHVyZSA/IChcclxuICAgICAgICAgIDxTdWJJdGVtIG5hbWU9XCLrrLjsnZhcIiBodG1sPXtpbmZvY2VudGVyY3VsdHVyZX0gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7cGFya2luZ2N1bHR1cmUgPyA8U3ViSXRlbSBuYW1lPVwi7KO87LCoXCIgaHRtbD17cGFya2luZ2N1bHR1cmV9IC8+IDogbnVsbH1cclxuICAgICAgICB7cGFya2luZ2ZlZSA/IDxTdWJJdGVtIG5hbWU9XCLsmpTquIhcIiBodG1sPXtwYXJraW5nZmVlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3VzZXRpbWVjdWx0dXJlID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIuydtOyaqeyLnOqwhFwiIGh0bWw9e3VzZXRpbWVjdWx0dXJlfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXRlbS5pbmZvID8gKFxyXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pID8gKFxyXG4gICAgICAgICAgICBpdGVtLmluZm8ubWFwKCh2KSA9PiAoXHJcbiAgICAgICAgICAgICAgPFN1Ykl0ZW0ga2V5PXt2LmluZm9uYW1lfSBuYW1lPXt2LmluZm9uYW1lfSBodG1sPXt2LmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFN1Ykl0ZW0gbmFtZT17aXRlbS5pbmZvLmluZm9uYW1lfSBodG1sPXtpdGVtLmluZm8uaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L0ludHJvV3JhcHBlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG91ckN1bHR1cmU7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IFN1Ykl0ZW0gZnJvbSAnLi4vU3ViSXRlbSc7XHJcbmltcG9ydCB7IEludHJvV3JhcHBlciB9IGZyb20gJy4uL1N1Ykl0ZW0vc3R5bGUnO1xyXG5cclxuY29uc3QgVG91ckV2ZW50OiBSZWFjdC5GQzxEZXRhaWxJdGVtcHJvcHM+ID0gKHsgaXRlbSB9KSA9PiB7XHJcbiAgY29uc3QgeyBhZGRyMSwgaG9tZXBhZ2UsIHRlbCB9ID0gaXRlbTtcclxuICBjb25zdCB7IHVzZXRpbWVmZXN0aXZhbCwgcGxheXRpbWUsIGRpc2NvdW50aW5mb2Zlc3RpdmFsIH0gPSBpdGVtLmludHJvO1xyXG4gIHJldHVybiAoXHJcbiAgICA8SW50cm9XcmFwcGVyPlxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge2FkZHIxID8gPFN1Ykl0ZW0gbmFtZT1cIuyjvOyGjFwiIGh0bWw9e2FkZHIxfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2hvbWVwYWdlID8gPFN1Ykl0ZW0gbmFtZT1cIu2ZiO2OmOydtOyngFwiIGh0bWw9e2hvbWVwYWdlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3RlbCA/IDxTdWJJdGVtIG5hbWU9XCLrrLjsnZhcIiBodG1sPXt0ZWx9IC8+IDogbnVsbH1cclxuICAgICAgICB7dXNldGltZWZlc3RpdmFsID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIuyalOq4iFwiIGh0bWw9e3VzZXRpbWVmZXN0aXZhbH0gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7cGxheXRpbWUgPyA8U3ViSXRlbSBuYW1lPVwi7J287KCVXCIgaHRtbD17cGxheXRpbWV9IC8+IDogbnVsbH1cclxuICAgICAgICB7ZGlzY291bnRpbmZvZmVzdGl2YWwgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi7ZWg7J24XCIgaHRtbD17ZGlzY291bnRpbmZvZmVzdGl2YWx9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICA8U3ViSXRlbSBrZXk9e3YuaW5mb25hbWV9IG5hbWU9e3YuaW5mb25hbWV9IGh0bWw9e3YuaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyRXZlbnQ7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IFN1Ykl0ZW0gZnJvbSAnLi4vU3ViSXRlbSc7XHJcbmltcG9ydCB7IEludHJvV3JhcHBlciB9IGZyb20gJy4uL1N1Ykl0ZW0vc3R5bGUnO1xyXG5cclxuY29uc3QgVG91ckZvb2Q6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IGFkZHIxLCBob21lcGFnZSB9ID0gaXRlbTtcclxuICBjb25zdCB7XHJcbiAgICByZXN0ZGF0ZWZvb2QsXHJcbiAgICByZXNlcnZhdGlvbmZvb2QsXHJcbiAgICBvcGVudGltZWZvb2QsXHJcbiAgICB0cmVhdG1lbnUsXHJcbiAgICBpbmZvY2VudGVyZm9vZCxcclxuICB9ID0gaXRlbS5pbnRybztcclxuICByZXR1cm4gKFxyXG4gICAgPEludHJvV3JhcHBlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHthZGRyMSA/IDxTdWJJdGVtIG5hbWU9XCLso7zshoxcIiBodG1sPXthZGRyMX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtob21lcGFnZSA/IDxTdWJJdGVtIG5hbWU9XCLtmYjtjpjsnbTsp4BcIiBodG1sPXtob21lcGFnZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtpbmZvY2VudGVyZm9vZCA/IDxTdWJJdGVtIG5hbWU9XCLrrLjsnZhcIiBodG1sPXtpbmZvY2VudGVyZm9vZH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHt0cmVhdG1lbnUgPyA8U3ViSXRlbSBuYW1lPVwi66mU64m0XCIgaHRtbD17dHJlYXRtZW51fSAvPiA6IG51bGx9XHJcbiAgICAgICAge3Jlc2VydmF0aW9uZm9vZCA/IChcclxuICAgICAgICAgIDxTdWJJdGVtIG5hbWU9XCLsl5Dslb1cIiBodG1sPXtyZXNlcnZhdGlvbmZvb2R9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge3Jlc3RkYXRlZm9vZCA/IDxTdWJJdGVtIG5hbWU9XCLtnLTsnbxcIiBodG1sPXtyZXN0ZGF0ZWZvb2R9IC8+IDogbnVsbH1cclxuICAgICAgICB7b3BlbnRpbWVmb29kID8gPFN1Ykl0ZW0gbmFtZT1cIuydtOyaqeyLnOqwhFwiIGh0bWw9e29wZW50aW1lZm9vZH0gLz4gOiBudWxsfVxyXG5cclxuICAgICAgICB7aXRlbS5pbmZvID8gKFxyXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pID8gKFxyXG4gICAgICAgICAgICBpdGVtLmluZm8ubWFwKCh2KSA9PiAoXHJcbiAgICAgICAgICAgICAgPFN1Ykl0ZW0ga2V5PXt2LmluZm9uYW1lfSBuYW1lPXt2LmluZm9uYW1lfSBodG1sPXt2LmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFN1Ykl0ZW0gbmFtZT17aXRlbS5pbmZvLmluZm9uYW1lfSBodG1sPXtpdGVtLmluZm8uaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L0ludHJvV3JhcHBlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG91ckZvb2Q7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IFN1Ykl0ZW0gZnJvbSAnLi4vU3ViSXRlbSc7XHJcbmltcG9ydCB7IEludHJvV3JhcHBlciB9IGZyb20gJy4uL1N1Ykl0ZW0vc3R5bGUnO1xyXG5cclxuY29uc3QgVG91ck1hbGw6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IGFkZHIxLCBob21lcGFnZSB9ID0gaXRlbTtcclxuICBjb25zdCB7IGluZm9jZW50ZXJzaG9wcGluZywgc2hvcGd1aWRlLCBvcGVudGltZSwgcmVzdGRhdGVzaG9wcGluZyB9ID1cclxuICAgIGl0ZW0uaW50cm87XHJcbiAgcmV0dXJuIChcclxuICAgIDxJbnRyb1dyYXBwZXI+XHJcbiAgICAgIDx1bD5cclxuICAgICAgICB7YWRkcjEgPyA8U3ViSXRlbSBuYW1lPVwi7KO87IaMXCIgaHRtbD17YWRkcjF9IC8+IDogbnVsbH1cclxuICAgICAgICB7aG9tZXBhZ2UgPyA8U3ViSXRlbSBuYW1lPVwi7ZmI7Y6Y7J207KeAXCIgaHRtbD17aG9tZXBhZ2V9IC8+IDogbnVsbH1cclxuICAgICAgICB7aW5mb2NlbnRlcnNob3BwaW5nID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIuusuOydmFwiIGh0bWw9e2luZm9jZW50ZXJzaG9wcGluZ30gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7c2hvcGd1aWRlID8gPFN1Ykl0ZW0gbmFtZT1cIuyViOuCtFwiIGh0bWw9e3Nob3BndWlkZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtyZXN0ZGF0ZXNob3BwaW5nID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIu2ctOydvFwiIGh0bWw9e3Jlc3RkYXRlc2hvcHBpbmd9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge29wZW50aW1lID8gPFN1Ykl0ZW0gbmFtZT1cIuydtOyaqeyLnOqwhFwiIGh0bWw9e29wZW50aW1lfSAvPiA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICA8U3ViSXRlbSBrZXk9e3YuaW5mb25hbWV9IG5hbWU9e3YuaW5mb25hbWV9IGh0bWw9e3YuaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyTWFsbDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgU3ViSXRlbSBmcm9tICcuLi9TdWJJdGVtJztcclxuaW1wb3J0IHsgSW50cm9XcmFwcGVyIH0gZnJvbSAnLi4vU3ViSXRlbS9zdHlsZSc7XHJcblxyXG5jb25zdCBUb3VyU2xlZXA6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IGFkZHIxLCBob21lcGFnZSB9ID0gaXRlbTtcclxuICBjb25zdCB7XHJcbiAgICByZXNlcnZhdGlvbmxvZGdpbmcsXHJcbiAgICByZXNlcnZhdGlvbnVybCxcclxuICAgIGNoZWNraW50aW1lLFxyXG4gICAgY2hlY2tvdXR0aW1lLFxyXG4gICAgcmVmdW5kcmVndWxhdGlvbixcclxuICAgIHNjYWxlbG9kZ2luZyxcclxuICB9ID0gaXRlbS5pbnRybztcclxuICByZXR1cm4gKFxyXG4gICAgPEludHJvV3JhcHBlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHthZGRyMSA/IDxTdWJJdGVtIG5hbWU9XCLso7zshoxcIiBodG1sPXthZGRyMX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtob21lcGFnZSA/IDxTdWJJdGVtIG5hbWU9XCLtmYjtjpjsnbTsp4BcIiBodG1sPXtob21lcGFnZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtyZXNlcnZhdGlvbmxvZGdpbmcgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi66y47J2YXCIgaHRtbD17cmVzZXJ2YXRpb25sb2RnaW5nfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtyZXNlcnZhdGlvbnVybCA/IDxTdWJJdGVtIG5hbWU9XCLsmIjslb1cIiBodG1sPXtyZXNlcnZhdGlvbnVybH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtjaGVja2ludGltZSA/IDxTdWJJdGVtIG5hbWU9XCLssrTtgazsnbhcIiBodG1sPXtjaGVja2ludGltZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtjaGVja291dHRpbWUgPyA8U3ViSXRlbSBuYW1lPVwi7LK07YGs7JWE7JuDXCIgaHRtbD17Y2hlY2tvdXR0aW1lfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3JlZnVuZHJlZ3VsYXRpb24gPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi7ZmY67aIXCIgaHRtbD17cmVmdW5kcmVndWxhdGlvbn0gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7c2NhbGVsb2RnaW5nID8gPFN1Ykl0ZW0gbmFtZT1cIuq3nOuqqFwiIGh0bWw9e3NjYWxlbG9kZ2luZ30gLz4gOiBudWxsfVxyXG5cclxuICAgICAgICB7aXRlbS5pbmZvID8gKFxyXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pID8gKFxyXG4gICAgICAgICAgICBpdGVtLmluZm9cclxuICAgICAgICAgICAgICAuZmlsdGVyKCh2KSA9PiB2LmluZm9uYW1lKVxyXG4gICAgICAgICAgICAgIC5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICAgIDxTdWJJdGVtIGtleT17di5pbmZvbmFtZX0gbmFtZT17di5pbmZvbmFtZX0gaHRtbD17di5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFN1Ykl0ZW0gbmFtZT17aXRlbS5pbmZvLmluZm9uYW1lfSBodG1sPXtpdGVtLmluZm8uaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L0ludHJvV3JhcHBlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG91clNsZWVwO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBEZXRhaWxJdGVtcHJvcHMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCBTdWJJdGVtIGZyb20gJy4uL1N1Ykl0ZW0nO1xyXG5pbXBvcnQgeyBJbnRyb1dyYXBwZXIgfSBmcm9tICcuLi9TdWJJdGVtL3N0eWxlJztcclxuXHJcbmNvbnN0IFRvdXJTcG9ydHM6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IGFkZHIxLCBob21lcGFnZSB9ID0gaXRlbTtcclxuICBjb25zdCB7IGluZm9jZW50ZXJsZXBvcnRzLCByZXNlcnZhdGlvbiwgdXNldGltZWxlcG9ydHMgfSA9IGl0ZW0uaW50cm87XHJcbiAgcmV0dXJuIChcclxuICAgIDxJbnRyb1dyYXBwZXI+XHJcbiAgICAgIDx1bD5cclxuICAgICAgICB7YWRkcjEgPyA8U3ViSXRlbSBuYW1lPVwi7KO87IaMXCIgaHRtbD17YWRkcjF9IC8+IDogbnVsbH1cclxuICAgICAgICB7aG9tZXBhZ2UgPyA8U3ViSXRlbSBuYW1lPVwi7ZmI7Y6Y7J207KeAXCIgaHRtbD17aG9tZXBhZ2V9IC8+IDogbnVsbH1cclxuICAgICAgICB7cmVzZXJ2YXRpb24gPyA8U3ViSXRlbSBuYW1lPVwi7JiI7JW9XCIgaHRtbD17cmVzZXJ2YXRpb259IC8+IDogbnVsbH1cclxuICAgICAgICB7aW5mb2NlbnRlcmxlcG9ydHMgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi66y47J2YXCIgaHRtbD17aW5mb2NlbnRlcmxlcG9ydHN9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge3VzZXRpbWVsZXBvcnRzID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIuydtOyaqeyLnOqwhFwiIGh0bWw9e3VzZXRpbWVsZXBvcnRzfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG5cclxuICAgICAgICB7aXRlbS5pbmZvID8gKFxyXG4gICAgICAgICAgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pID8gKFxyXG4gICAgICAgICAgICBpdGVtLmluZm8ubWFwKCh2KSA9PiAoXHJcbiAgICAgICAgICAgICAgPFN1Ykl0ZW0ga2V5PXt2LmluZm9uYW1lfSBuYW1lPXt2LmluZm9uYW1lfSBodG1sPXt2LmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgICApKVxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPFN1Ykl0ZW0gbmFtZT17aXRlbS5pbmZvLmluZm9uYW1lfSBodG1sPXtpdGVtLmluZm8uaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICApXHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L0ludHJvV3JhcHBlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgVG91clNwb3J0cztcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgU3ViSXRlbSBmcm9tICcuLi9TdWJJdGVtJztcclxuaW1wb3J0IHsgSW50cm9XcmFwcGVyIH0gZnJvbSAnLi4vU3ViSXRlbS9zdHlsZSc7XHJcblxyXG5jb25zdCBUb3VyU3BvdDogUmVhY3QuRkM8RGV0YWlsSXRlbXByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIGNvbnN0IHsgYWRkcjEsIGhvbWVwYWdlIH0gPSBpdGVtO1xyXG4gIGNvbnN0IHsgaW5mb2NlbnRlciwgdXNldGltZSB9ID0gaXRlbS5pbnRybztcclxuICByZXR1cm4gKFxyXG4gICAgPEludHJvV3JhcHBlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHthZGRyMSA/IDxTdWJJdGVtIG5hbWU9XCLso7zshoxcIiBodG1sPXthZGRyMX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtob21lcGFnZSA/IDxTdWJJdGVtIG5hbWU9XCLtmYjtjpjsnbTsp4BcIiBodG1sPXtob21lcGFnZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtpbmZvY2VudGVyID8gPFN1Ykl0ZW0gbmFtZT1cIuusuOydmFwiIGh0bWw9e2luZm9jZW50ZXJ9IC8+IDogbnVsbH1cclxuICAgICAgICB7dXNldGltZSA/IDxTdWJJdGVtIG5hbWU9XCLsnbTsmqnsi5zqsIRcIiBodG1sPXt1c2V0aW1lfSAvPiA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICA8U3ViSXRlbSBrZXk9e3YuaW5mb25hbWV9IG5hbWU9e3YuaW5mb25hbWV9IGh0bWw9e3YuaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyU3BvdDtcclxuIiwiaW1wb3J0IHsgQnV0dG9uLCBGb3JtIH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IFN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xyXG5pbXBvcnQgdXNlSW5wdXQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXNlSW5wdXQnO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzJztcclxuaW1wb3J0IHsgYWRkQ29tbWVudEFzeW5jIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9jb21tZW50JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQge1xyXG4gIEJ1dHRvbldyYXBwZXIsXHJcbiAgRm9ybVdyYXBwZXIsXHJcbiAgLy8gU3VibWl0QnV0dG9uLFxyXG4gIFRleHRBcmVhLFxyXG4gIFRleHRBcmVhV3JhcHBlcixcclxufSBmcm9tICcuL3N0eWxlJztcclxuXHJcbmNvbnN0IENvbW1lbnRGb3JtOiBSZWFjdC5GQzxEZXRhaWxJdGVtcHJvcHM+ID0gKHsgaXRlbSB9KSA9PiB7XHJcbiAgY29uc3QgW2NvbW1lbnRUZXh0LCBvbkNoYW5nZUNvbW1lbnRUZXh0LCBzZXRDb21tZW50VGV4dF0gPSB1c2VJbnB1dCgnJyk7XHJcbiAgY29uc3QgeyBtZSB9ID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLnVzZXIpO1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuXHJcbiAgY29uc3Qgc2hvd01vZGFsID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgcmV0dXJuIFN3YWwuZmlyZSh7XHJcbiAgICAgIHRpdGxlOiAn66Gc6re47J24IO2ZlOuptCDsnbTrj5knLFxyXG4gICAgICB0ZXh0OiAn64yT6riA7J2EIOyekeyEse2VmOugpOuptCDroZzqt7jsnbgg7ZWY7IS47JqULicsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn7J2064+ZJyxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ+y3qOyGjCcsXHJcbiAgICAgIGljb246ICd3YXJuaW5nJyxcclxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICBpZiAocmVzdWx0LmlzQ29uZmlybWVkKSB7XHJcbiAgICAgICAgcm91dGVyLnB1c2goJy9sb2dpbicpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbXSk7XHJcblxyXG4gIGNvbnN0IG9uU3VibWl0ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgaWYgKCFjb21tZW50VGV4dC50cmltKCkpIHtcclxuICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XHJcbiAgICAgICAgdGl0bGU6ICfrjJPquIDsnYQg7J6F66Cl7ZWY7IS47JqUJyxcclxuICAgICAgICBpY29uOiAnd2FybmluZycsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZGlzcGF0Y2goXHJcbiAgICAgIGFkZENvbW1lbnRBc3luYy5yZXF1ZXN0KHsgY29udGVudGlkOiBpdGVtLmNvbnRlbnRpZCwgY29tbWVudFRleHQgfSlcclxuICAgICk7XHJcbiAgICBzZXRDb21tZW50VGV4dCgnJyk7XHJcbiAgfSwgW2NvbW1lbnRUZXh0LCBkaXNwYXRjaCwgaXRlbS5jb250ZW50aWQsIHNldENvbW1lbnRUZXh0XSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybVdyYXBwZXI+XHJcbiAgICAgIHttZSA/IChcclxuICAgICAgICA8Rm9ybSBvbkZpbmlzaD17b25TdWJtaXR9PlxyXG4gICAgICAgICAgPFRleHRBcmVhV3JhcHBlcj5cclxuICAgICAgICAgICAgPFRleHRBcmVhXHJcbiAgICAgICAgICAgICAgcm93cz17M31cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VDb21tZW50VGV4dH1cclxuICAgICAgICAgICAgICB2YWx1ZT17Y29tbWVudFRleHR9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLrjJPquIDsnYQg7J6F66Cl7ZWY7IS47JqULlwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L1RleHRBcmVhV3JhcHBlcj5cclxuICAgICAgICAgIDxCdXR0b25XcmFwcGVyPlxyXG4gICAgICAgICAgICA8QnV0dG9uIGh0bWxUeXBlPVwic3VibWl0XCIgdHlwZT1cInByaW1hcnlcIj5cclxuICAgICAgICAgICAgICDrk7HroZ1cclxuICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICA8L0J1dHRvbldyYXBwZXI+XHJcbiAgICAgICAgPC9Gb3JtPlxyXG4gICAgICApIDogKFxyXG4gICAgICAgIDxGb3JtIG9uQ2xpY2s9e3Nob3dNb2RhbH0+XHJcbiAgICAgICAgICA8VGV4dEFyZWFXcmFwcGVyPlxyXG4gICAgICAgICAgICA8VGV4dEFyZWEgcm93cz17M30gcGxhY2Vob2xkZXI9XCLrjJPquIDsnYQg7J6R7ISx7ZWY66Ck66m0IOuhnOq3uOyduCDtlZjshLjsmpQuXCIgLz5cclxuICAgICAgICAgIDwvVGV4dEFyZWFXcmFwcGVyPlxyXG4gICAgICAgICAgPEJ1dHRvbldyYXBwZXI+XHJcbiAgICAgICAgICAgIDxCdXR0b24gaHRtbFR5cGU9XCJzdWJtaXRcIiB0eXBlPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICAgIOuTseuhnVxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvQnV0dG9uV3JhcHBlcj5cclxuICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICl9XHJcbiAgICA8L0Zvcm1XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tZW50Rm9ybTtcclxuIiwiaW1wb3J0IHsgRm9ybSB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBGb3JtV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgcGFkZGluZzogMTBweDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiA5NSU7XHJcbiAgICBtYXJnaW46IDAgYXV0bztcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uV3JhcHBlciA9IHN0eWxlZChGb3JtLkl0ZW0pYFxyXG4gIHRleHQtYWxpZ246IGVuZDtcclxuICAuYW50LWJ0bi1wcmltYXJ5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmFlNTk7XHJcbiAgICBib3JkZXI6ICMxYTczZTg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYjg2ZTtcclxuICAgIH1cclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgVGV4dEFyZWFXcmFwcGVyID0gc3R5bGVkKEZvcm0uSXRlbSlgXHJcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcclxuYDtcclxuZXhwb3J0IGNvbnN0IFRleHRBcmVhID0gc3R5bGVkLnRleHRhcmVhYFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG5gO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEF2YXRhciB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgeyBDb21tZW50RGF0YSwgZGVsZXRlQ29tbWVudEFzeW5jIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9jb21tZW50JztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzJztcclxuaW1wb3J0IHsgQ29tbWVudFN0eWxlIH0gZnJvbSAnLi9zdHlsZSc7XHJcbmltcG9ydCBTd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJztcclxuaW1wb3J0IEVkaXRGb3JtIGZyb20gJy4uL0VkaXRGb3JtJztcclxuaW1wb3J0IHVzZVRvZ2dsZSBmcm9tICcuLi8uLi8uLi91dGlscy91c2VUb2dnbGUnO1xyXG5cclxuaW50ZXJmYWNlIENvbW1lbnRJdGVtUHJvcHMge1xyXG4gIGRhdGE6IENvbW1lbnREYXRhO1xyXG59XHJcblxyXG5jb25zdCBDb21tZW50SXRlbTogUmVhY3QuRkM8Q29tbWVudEl0ZW1Qcm9wcz4gPSAoeyBkYXRhIH0pID0+IHtcclxuICBjb25zdCBbZWRpdGFibGUsIG9uVG9nZ2xlRWRpdF0gPSB1c2VUb2dnbGUoZmFsc2UpO1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuXHJcbiAgY29uc3QgaWQgPSB1c2VTZWxlY3RvcihcclxuICAgIChzdGF0ZTogUm9vdFN0YXRlKSA9PiBzdGF0ZS51c2VyLm1lICYmIHN0YXRlLnVzZXIubWUuaWRcclxuICApO1xyXG5cclxuICBjb25zdCByZW1vdmVDb21tZW50ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgU3dhbC5maXJlKHtcclxuICAgICAgdGl0bGU6ICfrjJPquIDsnYQg7KCV66eQIOyCreygnO2VmOyLnOqyoOyKteuLiOq5jD8nLFxyXG4gICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICBjb25maXJtQnV0dG9uVGV4dDogJ+yCreygnCcsXHJcbiAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICfst6jshownLFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcclxuICAgICAgICBkaXNwYXRjaChcclxuICAgICAgICAgIGRlbGV0ZUNvbW1lbnRBc3luYy5yZXF1ZXN0KHsgaWQ6IGRhdGEuaWQsIGNvbnRlbnRpZDogZGF0YS5jb250ZW50SWQgfSlcclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBbZGlzcGF0Y2gsIGRhdGEuaWQsIGRhdGEuY29udGVudElkXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICB7IWVkaXRhYmxlID8gKFxyXG4gICAgICAgIDxDb21tZW50U3R5bGVcclxuICAgICAgICAgIG1pbmU9e2lkID09PSBkYXRhLlVzZXJJZCA/IDEgOiAwfVxyXG4gICAgICAgICAgYWN0aW9ucz17W1xyXG4gICAgICAgICAgICBpZCA9PT0gZGF0YS5Vc2VySWQgPyAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17b25Ub2dnbGVFZGl0fSBrZXk9XCJjb21tZW50LW1vZGlmeVwiPlxyXG4gICAgICAgICAgICAgICAg7IiY7KCVXHJcbiAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICApIDogbnVsbCxcclxuICAgICAgICAgICAgaWQgPT09IGRhdGEuVXNlcklkID8gKFxyXG4gICAgICAgICAgICAgIDxzcGFuIG9uQ2xpY2s9e3JlbW92ZUNvbW1lbnR9IGtleT1cImNvbW1lbnQtZGVsZXRlXCI+XHJcbiAgICAgICAgICAgICAgICDsgq3soJxcclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICkgOiBudWxsLFxyXG4gICAgICAgICAgXX1cclxuICAgICAgICAgIGF1dGhvcj17PGE+e2RhdGEuVXNlci5uaWNrbmFtZX08L2E+fVxyXG4gICAgICAgICAgYXZhdGFyPXs8QXZhdGFyPntkYXRhLlVzZXIubmlja25hbWUuc2xpY2UoMCwgMil9PC9BdmF0YXI+fVxyXG4gICAgICAgICAgY29udGVudD17PHA+e2RhdGEuY29udGVudH08L3A+fVxyXG4gICAgICAgICAgZGF0ZXRpbWU9e1xyXG4gICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICB7bmV3IERhdGUoZGF0YS5jcmVhdGVkQXQpLnRvTG9jYWxlU3RyaW5nKCdrby1LUicsIHtcclxuICAgICAgICAgICAgICAgIHRpbWVab25lOiAnQXNpYS9TZW91bCcsXHJcbiAgICAgICAgICAgICAgfSl9XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgIH1cclxuICAgICAgICA+PC9Db21tZW50U3R5bGU+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPD5cclxuICAgICAgICAgIDxFZGl0Rm9ybVxyXG4gICAgICAgICAgICB0ZXh0PXtkYXRhLmNvbnRlbnR9XHJcbiAgICAgICAgICAgIGlkPXtkYXRhLmlkfVxyXG4gICAgICAgICAgICB0b2dnbGVFZGl0PXtvblRvZ2dsZUVkaXR9XHJcbiAgICAgICAgICAgIGNvbnRlbnRpZD17ZGF0YS5jb250ZW50SWR9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgIDwvPlxyXG4gICAgICApfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1lbnRJdGVtO1xyXG4iLCJpbXBvcnQgeyBDb21tZW50IH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvbW1lbnRTdHlsZSA9IHN0eWxlZChDb21tZW50KTx7IG1pbmU6IDEgfCAwIH0+YFxyXG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlNWU1O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICR7KHByb3BzKSA9PiAocHJvcHMubWluZSA/ICcjZjBmMGYwJyA6ICcjZmZmJyl9O1xyXG4gIHBhZGRpbmc6IDBweCAyMHB4O1xyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBCdXR0b24sIEZvcm0gfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHsgRm9ybVdyYXBwZXIsIFRleHRBcmVhLCBUZXh0QXJlYVdyYXBwZXIgfSBmcm9tICcuLi9Db21tZW50Rm9ybS9zdHlsZSc7XHJcbmltcG9ydCB7IENhbmNlbEJ1dHRvbiwgQnV0dG9uV3JhcHBlciB9IGZyb20gJy4vc3R5bGUnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IG1vZGlmeUNvbW1lbnRBc3luYyB9IGZyb20gJy4uLy4uL21vZHVsZXMvY29tbWVudCc7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4uLy4uL21vZHVsZXMnO1xyXG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XHJcbmltcG9ydCB1c2VJbnB1dCBmcm9tICcuLi8uLi8uLi91dGlscy91c2VJbnB1dCc7XHJcblxyXG5pbnRlcmZhY2UgRWRpdEZvcm1Qcm9wcyB7XHJcbiAgdGV4dDogc3RyaW5nO1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgdG9nZ2xlRWRpdDogKCkgPT4gdm9pZDtcclxuICBjb250ZW50aWQ6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgRWRpdEZvcm06IFJlYWN0LkZDPEVkaXRGb3JtUHJvcHM+ID0gKHtcclxuICB0ZXh0LFxyXG4gIGlkLFxyXG4gIHRvZ2dsZUVkaXQsXHJcbiAgY29udGVudGlkLFxyXG59KSA9PiB7XHJcbiAgY29uc3QgW2lucHV0LCBvbkNoYW5nZUlucHV0XSA9IHVzZUlucHV0KHRleHQpO1xyXG5cclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gIGNvbnN0IHsgY29tbWVudEVkaXRlZEVycm9yIH0gPSB1c2VTZWxlY3RvcihcclxuICAgIChzdGF0ZTogUm9vdFN0YXRlKSA9PiBzdGF0ZS5jb21tZW50XHJcbiAgKTtcclxuXHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGlmIChjb21tZW50RWRpdGVkRXJyb3IpIHtcclxuICAgICAgdG9nZ2xlRWRpdCgpO1xyXG4gICAgfVxyXG4gIH0sIFtjb21tZW50RWRpdGVkRXJyb3IsIHRvZ2dsZUVkaXRdKTtcclxuXHJcbiAgY29uc3Qgb25TdWJtaXQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWlucHV0LnRyaW0oKSkge1xyXG4gICAgICByZXR1cm4gU3dhbC5maXJlKHtcclxuICAgICAgICB0aXRsZTogJ+uMk+q4gOydhCDsnoXroKXtlZjshLjsmpQnLFxyXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkaXNwYXRjaChtb2RpZnlDb21tZW50QXN5bmMucmVxdWVzdCh7IGlkLCBlZGl0Q29tbWVudDogaW5wdXQsIGNvbnRlbnRpZCB9KSk7XHJcbiAgICB0b2dnbGVFZGl0KCk7XHJcbiAgfSwgW2lucHV0LCBpZCwgZGlzcGF0Y2gsIHRvZ2dsZUVkaXQsIGNvbnRlbnRpZF0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8Rm9ybVdyYXBwZXI+XHJcbiAgICAgIDxGb3JtIG9uRmluaXNoPXtvblN1Ym1pdH0+XHJcbiAgICAgICAgPFRleHRBcmVhV3JhcHBlcj5cclxuICAgICAgICAgIDxUZXh0QXJlYVxyXG4gICAgICAgICAgICByb3dzPXszfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VJbnB1dH1cclxuICAgICAgICAgICAgdmFsdWU9e2lucHV0fVxyXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuuMk+q4gOydhCDsnoXroKXtlZjshLjsmpQuXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8QnV0dG9uV3JhcHBlcj5cclxuICAgICAgICAgICAgPEJ1dHRvbiBodG1sVHlwZT1cInN1Ym1pdFwiIHR5cGU9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAg7IiY7KCVXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgICA8Q2FuY2VsQnV0dG9uIG9uQ2xpY2s9e3RvZ2dsZUVkaXR9Puy3qOyGjDwvQ2FuY2VsQnV0dG9uPlxyXG4gICAgICAgICAgPC9CdXR0b25XcmFwcGVyPlxyXG4gICAgICAgIDwvVGV4dEFyZWFXcmFwcGVyPlxyXG4gICAgICA8L0Zvcm0+XHJcbiAgICA8L0Zvcm1XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFZGl0Rm9ybTtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJ2FudGQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IENhbmNlbEJ1dHRvbiA9IHN0eWxlZChCdXR0b24pYFxyXG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk5OTk7XHJcbiAgYm9yZGVyOiAjOTk5OTk5O1xyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gICY6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2EyYTJhMjtcclxuICAgIGNvbG9yOiAjZmZmO3NcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgdGV4dC1hbGlnbjogZW5kO1xyXG4gIG1hcmdpbi1ib3R0b206IDBweDtcclxuICAuYW50LWJ0bi1wcmltYXJ5IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmFlNTk7XHJcbiAgICBib3JkZXI6ICMxYTczZTg7XHJcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYjg2ZTtcclxuICAgIH1cclxuYDtcclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnO1xyXG5pbXBvcnQge1xyXG4gIE5hdmJhcldyYXBwZXIsXHJcbiAgTG9nbyxcclxuICBTZWFyY2gsXHJcbiAgQWNjb3VudCxcclxuICBDYXRlZ29yeSxcclxuICBNb2JpbGVTZWFyY2gsXHJcbiAgV3JhcHBlcixcclxuICBIYW1idXJnZXJNZW51LFxyXG4gIExvZ291dEJ1dHRvbixcclxufSBmcm9tICcuL3N0eWxlJztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBSb290U3RhdGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzJztcclxuaW1wb3J0IHsgbG9nb3V0QXN5bmMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3VzZXInO1xyXG5pbXBvcnQgU2VhcmNoRm9ybSBmcm9tICcuLi9TZWFyY2hGb3JtJztcclxuaW1wb3J0IHsgTWVudU91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgSGVhZEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9IZWFkZXJJdGVtJztcclxuaW1wb3J0IHVzZVRvZ2dsZSBmcm9tICcuLi8uLi8uLi91dGlscy91c2VUb2dnbGUnO1xyXG5pbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XHJcblxyXG5jb25zdCBOYXZiYXI6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFt0b2dnbGUsIHRvZ2dsZUhhbmJ1cmdlciwgc2V0VG9nZ2xlXSA9IHVzZVRvZ2dsZShmYWxzZSk7XHJcbiAgY29uc3QgeyBtZSB9ID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLnVzZXIpO1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICBjb25zdCBvbkNsaWNrTG9nb3V0ID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2gobG9nb3V0QXN5bmMucmVxdWVzdCgpKTtcclxuICAgIHNldFRvZ2dsZShmYWxzZSk7XHJcbiAgfSwgW2Rpc3BhdGNoLCBzZXRUb2dnbGVdKTtcclxuXHJcbiAgY29uc3QgY2xvc2VIYW1idXJnZXIgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBzZXRUb2dnbGUoZmFsc2UpO1xyXG4gIH0sIFtzZXRUb2dnbGVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxXcmFwcGVyPlxyXG4gICAgICA8TmF2YmFyV3JhcHBlcj5cclxuICAgICAgICA8TG9nbyBvbkNsaWNrPXtjbG9zZUhhbWJ1cmdlcn0+XHJcbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiPlxyXG4gICAgICAgICAgICA8YT5cclxuICAgICAgICAgICAgICA8SW1hZ2VcclxuICAgICAgICAgICAgICAgIHNyYz1cIi9sb2dvLnBuZ1wiXHJcbiAgICAgICAgICAgICAgICB3aWR0aD17MTMwfVxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0PXs2MH1cclxuICAgICAgICAgICAgICAgIGFsdD1cIuyWtOuUlOqwiOuemFwiXHJcbiAgICAgICAgICAgICAgICBwcmlvcml0eT17dHJ1ZX1cclxuICAgICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgPC9Mb2dvPlxyXG5cclxuICAgICAgICA8Q2F0ZWdvcnkgdG9nZ2xlPXt0b2dnbGV9IG9uQ2xpY2s9e3RvZ2dsZUhhbmJ1cmdlcn0+XHJcbiAgICAgICAgICA8dWw+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuq0gOq0keyngFwiIGNvbnRlbnRUeXBlSWQ9ezEyfSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLrrLjtmZTsi5zshKRcIiBjb250ZW50VHlwZUlkPXsxNH0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi7LaV7KCcXCIgY29udGVudFR5cGVJZD17MTV9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuy9lOyKpFwiIGNvbnRlbnRUeXBlSWQ9ezI1fSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLroIjtj6zsuKBcIiBjb250ZW50VHlwZUlkPXsyOH0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi7IiZ67CVXCIgY29udGVudFR5cGVJZD17MzJ9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuyHvO2VkVwiIGNvbnRlbnRUeXBlSWQ9ezM4fSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLsi53ri7lcIiBjb250ZW50VHlwZUlkPXszOX0gLz5cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9DYXRlZ29yeT5cclxuXHJcbiAgICAgICAgPFNlYXJjaD5cclxuICAgICAgICAgIDxTZWFyY2hGb3JtIGxhYmVsPVwicGNcIiAvPlxyXG4gICAgICAgIDwvU2VhcmNoPlxyXG5cclxuICAgICAgICA8QWNjb3VudCB0b2dnbGU9e3RvZ2dsZX0+XHJcbiAgICAgICAgICB7bWUgPyAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPExvZ291dEJ1dHRvbiBvbkNsaWNrPXtvbkNsaWNrTG9nb3V0fT7roZzqt7jslYTsm4MgPC9Mb2dvdXRCdXR0b24+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8TGluayBocmVmPVwiL2xvZ2luXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBvbkNsaWNrPXtjbG9zZUhhbWJ1cmdlcn0+XHJcbiAgICAgICAgICAgICAgICAgIDxzcGFuPuuhnOq3uOyduDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgIDwvPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0FjY291bnQ+XHJcbiAgICAgICAgPEhhbWJ1cmdlck1lbnU+XHJcbiAgICAgICAgICA8TWVudU91dGxpbmVkIG9uQ2xpY2s9e3RvZ2dsZUhhbmJ1cmdlcn0gLz5cclxuICAgICAgICA8L0hhbWJ1cmdlck1lbnU+XHJcbiAgICAgIDwvTmF2YmFyV3JhcHBlcj5cclxuICAgICAgPE1vYmlsZVNlYXJjaCBvbkNsaWNrPXtjbG9zZUhhbWJ1cmdlcn0+XHJcbiAgICAgICAgPFNlYXJjaEZvcm0gbGFiZWw9XCJtb2JpbGVcIiAvPlxyXG4gICAgICA8L01vYmlsZVNlYXJjaD5cclxuICAgIDwvV3JhcHBlcj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBwb3NpdGlvbjogc3RpY2t5O1xyXG4gIHRvcDogMDtcclxuICB6LWluZGV4OiA5OTk7XHJcbiAgaGVpZ2h0OiA4MHB4O1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5hdmJhcldyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcGFkZGluZzogMTBweCAwO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgYm9yZGVyLWJvdHRvbTogM3B4IHNvbGlkICNlZWVlZWU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcclxuICAgIC8vIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1vYmlsZVNlYXJjaCA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogbm9uZTtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgYm94LXNoYWRvdzogMCAxcHggM3B4IDAgcmdiKDAgMCAwIC8gMTIlKTtcclxuICAgICYgZm9ybSB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBtYXJnaW46IDAgNSU7XHJcbiAgICB9XHJcblxyXG4gICAgJiBmb3JtIGlucHV0IHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZVN9IHtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgTG9nbyA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtc3RhcnQ7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tbGVmdDogMzBweDtcclxuICBmbGV4OiAxLjU7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBmbGV4OiAxO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIC8vICYgYSB7XHJcbiAgICAvLyAgIHBhZGRpbmc6IDIwcHggMDtcclxuICAgIC8vIH1cclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQ2F0ZWdvcnkgPSBzdHlsZWQuZGl2PHsgdG9nZ2xlOiBib29sZWFuIH0+YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleDogMztcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAvLyBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgJiB1bCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gIH1cclxuICAmIGEge1xyXG4gICAgZm9udC1zaXplOiAxOHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBtYXJnaW4tbGVmdDogMTBweDtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBkaXNwbGF5OiAkeyhwcm9wcykgPT4gKHByb3BzLnRvZ2dsZSA/ICdibG9jaycgOiAnbm9uZScpfTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgJiB1bCB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgfVxyXG4gICAgJiB1bCBsaSB7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAmOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTJlMmUyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICAmIGEge1xyXG4gICAgICBwYWRkaW5nOiAxMnB4IDVweDtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIH1cclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgU2VhcmNoID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIGZsZXg6IDI7XHJcbiAgLy8gcGFkZGluZzogMjBweCAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQWNjb3VudCA9IHN0eWxlZC5kaXY8eyB0b2dnbGU6IGJvb2xlYW4gfT5gXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4OiAxO1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XHJcbiAgJiBhIHtcclxuICAgIGZvbnQtc2l6ZTogMTVweDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzFhNzNlODtcclxuICAgIHBhZGRpbmc6IDEwcHggMTJweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJiN2RlOTtcclxuICAgIH1cclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBkaXNwbGF5OiAkeyhwcm9wcykgPT4gKHByb3BzLnRvZ2dsZSA/ICdmbGV4JyA6ICdub25lJyl9O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgICYgYSB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBib3JkZXItcmFkaXVzOiAwO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgICBwYWRkaW5nOiAxMnB4IDVweDtcclxuICAgICAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMHB4O1xyXG4gICAgICAmOmhvdmVyIHtcclxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTJlMmUyO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEhhbWJ1cmdlck1lbnUgPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMjVweDtcclxuICAgIHJpZ2h0OiAyMHB4O1xyXG4gICAgZm9udC1zaXplOiAzMHB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBMb2dvdXRCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxyXG4gIHBhZGRpbmc6IDZweCAxMHB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICM1ZjYzNjg7XHJcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlOGVhZWQ7XHJcbiAgY29sb3I6ICMzYzNkNDA7XHJcbiAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBmb250LWZhbWlseTogJ0dvd3VuIEJhdGFuZycsIHNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBib3JkZXI6IG5vbmU7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBwYWRkaW5nOiAxMnB4IDVweDtcclxuICAgIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgIG1hcmdpbi1yaWdodDogMHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICAmOmhvdmVyIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UyZTJlMjtcclxuICAgIH1cclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjayB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInO1xyXG5pbXBvcnQgeyBJbnB1dCwgU2VhcmNoQnV0dG9uLCBTZWFyY2hXcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcbmltcG9ydCB7IFNlYXJjaE91dGxpbmVkIH0gZnJvbSAnQGFudC1kZXNpZ24vaWNvbnMnO1xyXG5pbXBvcnQgdXNlSW5wdXQgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXNlSW5wdXQnO1xyXG5cclxuaW50ZXJmYWNlIElTZWFyY2hGb3JtIHtcclxuICBsYWJlbDogc3RyaW5nO1xyXG59XHJcblxyXG5jb25zdCBTZWFyY2hGb3JtOiBSZWFjdC5GQzxJU2VhcmNoRm9ybT4gPSAoeyBsYWJlbCB9KSA9PiB7XHJcbiAgY29uc3QgW3NlYXJjaCwgb25DaGFuZ2VTZWFyY2hdID0gdXNlSW5wdXQoJycpO1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IG9uU2VhcmNoID0gdXNlQ2FsbGJhY2soXHJcbiAgICAoZTogUmVhY3QuRm9ybUV2ZW50KSA9PiB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgcm91dGVyLnB1c2goXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcGF0aG5hbWU6ICcvc2VhcmNoJyxcclxuICAgICAgICAgIHF1ZXJ5OiB7IHNlYXJjaDogc2VhcmNoLCBwYWdlTm86IDEgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIGAvc2VhcmNoP3NlYXJjaD0ke3NlYXJjaH1gXHJcbiAgICAgICk7XHJcbiAgICB9LFxyXG4gICAgW3JvdXRlciwgc2VhcmNoXVxyXG4gICk7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxmb3JtIG9uU3VibWl0PXtvblNlYXJjaH0+XHJcbiAgICAgICAgPFNlYXJjaFdyYXBwZXI+XHJcbiAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17YCR7bGFiZWx9LXNlYXJjaGB9PjwvbGFiZWw+XHJcbiAgICAgICAgICA8SW5wdXRcclxuICAgICAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgICAgICBpZD17YCR7bGFiZWx9LXNlYXJjaGB9XHJcbiAgICAgICAgICAgIHZhbHVlPXtzZWFyY2h9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZVNlYXJjaH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8U2VhcmNoQnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5cclxuICAgICAgICAgICAgPFNlYXJjaE91dGxpbmVkIHN0eWxlPXt7IGNvbG9yOiAnd2hpdGUnIH19IC8+XHJcbiAgICAgICAgICA8L1NlYXJjaEJ1dHRvbj5cclxuICAgICAgICA8L1NlYXJjaFdyYXBwZXI+XHJcbiAgICAgIDwvZm9ybT5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTZWFyY2hGb3JtO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBJbnB1dCA9IHN0eWxlZC5pbnB1dGBcclxuICBib3JkZXItcmFkaXVzOiAxNXB4IDAgMCAxNXB4O1xyXG4gIGNvbG9yOiAjZmZmO1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICMzMzMzMzM7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzMzMzMzMztcclxuICBib3JkZXItcmlnaHQ6IG5vbmU7XHJcbiAgcGFkZGluZzogMTVweDtcclxuICB3aWR0aDogMjAwcHg7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG4gIG91dGxpbmU6IG5vbmU7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgZm9udC1mYW1pbHk6IEJNSEFOTkFBaXI7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIGxldHRlci1zcGFjaW5nOiAxcHg7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVTfSB7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNlYXJjaEJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXHJcbiAgd2lkdGg6IDQ1cHg7XHJcbiAgaGVpZ2h0OiA0NXB4O1xyXG4gIGJhY2tncm91bmQ6ICMzMzMzMzM7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgYm9yZGVyLXJhZGl1czogMCAxNXB4IDE1cHggMDtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBTZWFyY2hXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICB3aWR0aDogMTAwJTtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICAmIGxhYmVsIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogLTEwMDBweDtcclxuICAgIGxlZnQ6IC0xMDAwcHg7XHJcbiAgfVxyXG5cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlU30ge1xyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IHtcclxuICBBZGRDb21tZW50UGF5bG9hZCxcclxuICBDb21tZW50RGF0YSxcclxuICBMb2FkQ29tbWVudFBheWxvYWQsXHJcbiAgTW9kaWZ5Q29tbWVudFBheWxvYWQsXHJcbn0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgY3JlYXRlQXN5bmNBY3Rpb24gfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuaW1wb3J0IHsgRGVsZXRlQ29tbWVudFBheWxvYWQgfSBmcm9tICcuJztcclxuZXhwb3J0IGNvbnN0IEFERF9DT01NRU5UX1JFUVVFU1QgPSAnQUREX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVF9TVUNDRVNTID0gJ0FERF9DT01NRU5UX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgQUREX0NPTU1FTlRfRkFJTFVSRSA9ICdBRERfQ09NTUVOVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTU1FTlRfUkVRVUVTVCA9ICdMT0FEX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTU1FTlRfU1VDQ0VTUyA9ICdMT0FEX0NPTU1FTlRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX0NPTU1FTlRfRkFJTFVSRSA9ICdMT0FEX0NPTU1FTlRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgREVMRVRFX0NPTU1FTlRfUkVRVUVTVCA9ICdERUxFVEVfQ09NTUVOVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IERFTEVURV9DT01NRU5UX1NVQ0NFU1MgPSAnREVMRVRFX0NPTU1FTlRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBERUxFVEVfQ09NTUVOVF9GQUlMVVJFID0gJ0RFTEVURV9DT01NRU5UX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1PRElGWV9DT01NRU5UX1JFUVVFU1QgPSAnTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBNT0RJRllfQ09NTUVOVF9TVUNDRVNTID0gJ01PRElGWV9DT01NRU5UX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTU9ESUZZX0NPTU1FTlRfRkFJTFVSRSA9ICdNT0RJRllfQ09NTUVOVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBhZGRDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBBRERfQ09NTUVOVF9SRVFVRVNULFxyXG4gIEFERF9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgQUREX0NPTU1FTlRfRkFJTFVSRVxyXG4pPEFkZENvbW1lbnRQYXlsb2FkLCBDb21tZW50RGF0YVtdLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvYWRDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBMT0FEX0NPTU1FTlRfUkVRVUVTVCxcclxuICBMT0FEX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBMT0FEX0NPTU1FTlRfRkFJTFVSRVxyXG4pPExvYWRDb21tZW50UGF5bG9hZCwgQ29tbWVudERhdGFbXSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZWxldGVDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBERUxFVEVfQ09NTUVOVF9SRVFVRVNULFxyXG4gIERFTEVURV9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgREVMRVRFX0NPTU1FTlRfRkFJTFVSRVxyXG4pPERlbGV0ZUNvbW1lbnRQYXlsb2FkLCBDb21tZW50RGF0YVtdLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IG1vZGlmeUNvbW1lbnRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIE1PRElGWV9DT01NRU5UX1JFUVVFU1QsXHJcbiAgTU9ESUZZX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBNT0RJRllfQ09NTUVOVF9GQUlMVVJFXHJcbik8TW9kaWZ5Q29tbWVudFBheWxvYWQsIENvbW1lbnREYXRhW10sIEF4aW9zRXJyb3I+KCk7XHJcbiIsImV4cG9ydCB7IGRlZmF1bHQgfSBmcm9tICcuL3JlZHVjZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3R5cGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FjdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FnYSc7XHJcbiIsImltcG9ydCB7IENvbW1lbnRTdGF0ZSB9IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IHByb2R1Y2UgfSBmcm9tICdpbW1lcic7XHJcbmltcG9ydCB7XHJcbiAgQUREX0NPTU1FTlRfUkVRVUVTVCxcclxuICBBRERfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIEFERF9DT01NRU5UX0ZBSUxVUkUsXHJcbiAgTE9BRF9DT01NRU5UX1JFUVVFU1QsXHJcbiAgTE9BRF9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgTE9BRF9DT01NRU5UX0ZBSUxVUkUsXHJcbiAgREVMRVRFX0NPTU1FTlRfUkVRVUVTVCxcclxuICBERUxFVEVfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIERFTEVURV9DT01NRU5UX0ZBSUxVUkUsXHJcbiAgTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCxcclxuICBNT0RJRllfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIE1PRElGWV9DT01NRU5UX0ZBSUxVUkUsXHJcbn0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmNvbnN0IGluaXRpYWxTdGF0ZTogQ29tbWVudFN0YXRlID0ge1xyXG4gIGNvbW1lbnRMaXN0OiBbXSxcclxuICBjb21tZW50QWRkZWQ6IGZhbHNlLFxyXG4gIGlzQWRkaW5nQ29tbWVudDogZmFsc2UsXHJcbiAgY29tbWVudEVycm9yOiAnJyxcclxuICBjb21tZW50RWRpdGVkRXJyb3I6IGZhbHNlLFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgSUNvbW1lbnRSZWR1Y2VyU3RhdGUgPSB0eXBlb2YgaW5pdGlhbFN0YXRlO1xyXG5cclxuY29uc3QgY29tbWVudCA9IGNyZWF0ZVJlZHVjZXIoaW5pdGlhbFN0YXRlLCB7XHJcbiAgW0FERF9DT01NRU5UX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNBZGRpbmdDb21tZW50ID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuY29tbWVudEVycm9yID0gJyc7XHJcbiAgICB9KSxcclxuICBbQUREX0NPTU1FTlRfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzQWRkaW5nQ29tbWVudCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0FERF9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0FkZGluZ0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuY29tbWVudEVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9BRF9DT01NRU5UX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBbXTtcclxuICAgIH0pLFxyXG4gIFtMT0FEX0NPTU1FTlRfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9BRF9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBbXTtcclxuICAgIH0pLFxyXG4gIFtERUxFVEVfQ09NTUVOVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFcnJvciA9ICcnO1xyXG4gICAgfSksXHJcbiAgW0RFTEVURV9DT01NRU5UX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0RFTEVURV9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50RXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtNT0RJRllfQ09NTUVOVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFZGl0ZWRFcnJvciA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW01PRElGWV9DT01NRU5UX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5jb21tZW50RWRpdGVkRXJyb3IgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtNT0RJRllfQ09NTUVOVF9GQUlMVVJFXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFZGl0ZWRFcnJvciA9IHRydWU7XHJcbiAgICB9KSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb21tZW50O1xyXG4iLCJpbXBvcnQge1xyXG4gIExvYWRDb21tZW50UGF5bG9hZCxcclxuICBMb2FkQ29tbWVudFJlc3BvbnNlLFxyXG4gIEFkZENvbW1lbnRQYXlsb2FkLFxyXG4gIERlbGV0ZUNvbW1lbnRQYXlsb2FkLFxyXG4gIE1vZGlmeUNvbW1lbnRQYXlsb2FkLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7XHJcbiAgYWRkQ29tbWVudEFzeW5jLFxyXG4gIGxvYWRDb21tZW50QXN5bmMsXHJcbiAgZGVsZXRlQ29tbWVudEFzeW5jLFxyXG4gIG1vZGlmeUNvbW1lbnRBc3luYyxcclxufSBmcm9tICcuL2FjdGlvbic7XHJcbmltcG9ydCB7IHRha2VMYXRlc3QsIHB1dCwgY2FsbCwgZm9yaywgYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuXHJcbi8vIOuMk+q4gCDstpTqsIBcclxuZnVuY3Rpb24gYWRkQ29tbWVudEFQSSh7IGNvbnRlbnRpZCwgY29tbWVudFRleHQgfTogQWRkQ29tbWVudFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MucG9zdChgL2NvbW1lbnQvJHtjb250ZW50aWR9YCwgeyBjb250ZW50OiBjb21tZW50VGV4dCB9KTtcclxufVxyXG5mdW5jdGlvbiogYWRkQ29tbWVudFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBhZGRDb21tZW50QXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2FkQ29tbWVudFJlc3BvbnNlID0geWllbGQgY2FsbChcclxuICAgICAgYWRkQ29tbWVudEFQSSxcclxuICAgICAgYWN0aW9uLnBheWxvYWRcclxuICAgICk7XHJcbiAgICB5aWVsZCBwdXQoYWRkQ29tbWVudEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChhZGRDb21tZW50QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaEFkZENvbW1lbnQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChhZGRDb21tZW50QXN5bmMucmVxdWVzdCwgYWRkQ29tbWVudFNhZ2EpO1xyXG59XHJcblxyXG4vLyDrjJPquIAg66Gc65OcXHJcbmZ1bmN0aW9uIGxvYWRDb21tZW50c0FQSSh7IGNvbnRlbnRJZCB9OiBMb2FkQ29tbWVudFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KGAvY29tbWVudC8ke2NvbnRlbnRJZH1gKTtcclxufVxyXG5mdW5jdGlvbiogbG9hZENvbW1lbnRzU2FnYShcclxuICBhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIGxvYWRDb21tZW50QXN5bmMucmVxdWVzdD5cclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9hZENvbW1lbnRSZXNwb25zZSA9IHlpZWxkIGNhbGwoXHJcbiAgICAgIGxvYWRDb21tZW50c0FQSSxcclxuICAgICAgYWN0aW9uLnBheWxvYWRcclxuICAgICk7XHJcbiAgICB5aWVsZCBwdXQobG9hZENvbW1lbnRBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobG9hZENvbW1lbnRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoTG9hZENvbW1lbnRzKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobG9hZENvbW1lbnRBc3luYy5yZXF1ZXN0LCBsb2FkQ29tbWVudHNTYWdhKTtcclxufVxyXG5cclxuLy8g64yT6riAIOyCreygnFxyXG5mdW5jdGlvbiBkZWxldGVDb21tZW50QVBJKHsgaWQsIGNvbnRlbnRpZCB9OiBEZWxldGVDb21tZW50UGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5kZWxldGUoYC9jb21tZW50LyR7aWR9LyR7Y29udGVudGlkfWApO1xyXG59XHJcblxyXG5mdW5jdGlvbiogZGVsZXRlQ29tbWVudFNhZ2EoXHJcbiAgYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBkZWxldGVDb21tZW50QXN5bmMucmVxdWVzdD5cclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9hZENvbW1lbnRSZXNwb25zZSA9IHlpZWxkIGNhbGwoXHJcbiAgICAgIGRlbGV0ZUNvbW1lbnRBUEksXHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkXHJcbiAgICApO1xyXG4gICAgeWllbGQgcHV0KGRlbGV0ZUNvbW1lbnRBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQoZGVsZXRlQ29tbWVudEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoUmVtb3ZlQ29tbWVudCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGRlbGV0ZUNvbW1lbnRBc3luYy5yZXF1ZXN0LCBkZWxldGVDb21tZW50U2FnYSk7XHJcbn1cclxuXHJcbi8vIOuMk+q4gOyImOyglVxyXG5mdW5jdGlvbiBtb2RpZnlDb21tZW50QVBJKHtcclxuICBpZCxcclxuICBlZGl0Q29tbWVudCxcclxuICBjb250ZW50aWQsXHJcbn06IE1vZGlmeUNvbW1lbnRQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLnB1dChgL2NvbW1lbnQvJHtpZH0vJHtjb250ZW50aWR9YCwgeyBjb250ZW50OiBlZGl0Q29tbWVudCB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24qIG1vZGlmeUNvbW1lbnRTYWdhKFxyXG4gIGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgbW9kaWZ5Q29tbWVudEFzeW5jLnJlcXVlc3Q+XHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvYWRDb21tZW50UmVzcG9uc2UgPSB5aWVsZCBjYWxsKFxyXG4gICAgICBtb2RpZnlDb21tZW50QVBJLFxyXG4gICAgICBhY3Rpb24ucGF5bG9hZFxyXG4gICAgKTtcclxuICAgIHlpZWxkIHB1dChtb2RpZnlDb21tZW50QXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KG1vZGlmeUNvbW1lbnRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaE1vZGlmeUNvbW1lbnQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChtb2RpZnlDb21tZW50QXN5bmMucmVxdWVzdCwgbW9kaWZ5Q29tbWVudFNhZ2EpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogY29tbWVudFNhZ2EoKSB7XHJcbiAgeWllbGQgYWxsKFtcclxuICAgIGZvcmsod2F0Y2hBZGRDb21tZW50KSxcclxuICAgIGZvcmsod2F0Y2hMb2FkQ29tbWVudHMpLFxyXG4gICAgZm9yayh3YXRjaFJlbW92ZUNvbW1lbnQpLFxyXG4gICAgZm9yayh3YXRjaE1vZGlmeUNvbW1lbnQpLFxyXG4gIF0pO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgRGV0YWlsRGF0YSxcclxuICBTZWFyY2hEYXRhLFxyXG4gIFJlZ2lvbkRhdGEsXHJcbiAgU2VhcmNoUGF5bG9hZCxcclxuICBEZXRhaWxQYXlsb2FkLFxyXG4gIFJlZ2lvblBheWxvYWQsXHJcbiAgQWxsRGF0YSxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBjcmVhdGVBc3luY0FjdGlvbiB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFJFR0lPTl9UT1VSX1JFUVVFU1QgPSAnUkVHSU9OX1RPVVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBSRUdJT05fVE9VUl9TVUNDRVNTID0gJ1JFR0lPTl9UT1VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgUkVHSU9OX1RPVVJfRkFJTFVSRSA9ICdSRUdJT05fVE9VUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBTRUFSQ0hfVE9VUl9SRVFVRVNUID0gJ1NFQVJDSF9UT1VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgU0VBUkNIX1RPVVJfU1VDQ0VTUyA9ICdTRUFSQ0hfVE9VUl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFNFQVJDSF9UT1VSX0ZBSUxVUkUgPSAnU0VBUkNIX1RPVVJfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgREVUQUlMX1RPVVJfUkVRVUVTVCA9ICdERVRBSUxfVE9VUl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IERFVEFJTF9UT1VSX1NVQ0NFU1MgPSAnREVUQUlMX1RPVVJfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBERVRBSUxfVE9VUl9GQUlMVVJFID0gJ0RFVEFJTF9UT1VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFMTF9UT1VSX1JFUVVFU1QgPSAnQUxMX1RPVVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBBTExfVE9VUl9TVUNDRVNTID0gJ0FMTF9UT1VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgQUxMX1RPVVJfRkFJTFVSRSA9ICdBTExfVE9VUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBhbGxBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIEFMTF9UT1VSX1JFUVVFU1QsXHJcbiAgQUxMX1RPVVJfU1VDQ0VTUyxcclxuICBBTExfVE9VUl9GQUlMVVJFXHJcbik8dW5kZWZpbmVkLCBBbGxEYXRhLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNlYXJjaEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgU0VBUkNIX1RPVVJfUkVRVUVTVCxcclxuICBTRUFSQ0hfVE9VUl9TVUNDRVNTLFxyXG4gIFNFQVJDSF9UT1VSX0ZBSUxVUkVcclxuKTxTZWFyY2hQYXlsb2FkLCBTZWFyY2hEYXRhLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHJlZ2lvbkFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgUkVHSU9OX1RPVVJfUkVRVUVTVCxcclxuICBSRUdJT05fVE9VUl9TVUNDRVNTLFxyXG4gIFJFR0lPTl9UT1VSX0ZBSUxVUkVcclxuKTxSZWdpb25QYXlsb2FkLCBSZWdpb25EYXRhLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRldGFpbEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgREVUQUlMX1RPVVJfUkVRVUVTVCxcclxuICBERVRBSUxfVE9VUl9TVUNDRVNTLFxyXG4gIERFVEFJTF9UT1VSX0ZBSUxVUkVcclxuKTxEZXRhaWxQYXlsb2FkLCBEZXRhaWxEYXRhLCBBeGlvc0Vycm9yPigpO1xyXG4iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi9yZWR1Y2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi90eXBlJztcclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3NhZ2EnO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmltcG9ydCB7XHJcbiAgUkVHSU9OX1RPVVJfUkVRVUVTVCxcclxuICBSRUdJT05fVE9VUl9TVUNDRVNTLFxyXG4gIFJFR0lPTl9UT1VSX0ZBSUxVUkUsXHJcbiAgU0VBUkNIX1RPVVJfUkVRVUVTVCxcclxuICBTRUFSQ0hfVE9VUl9TVUNDRVNTLFxyXG4gIFNFQVJDSF9UT1VSX0ZBSUxVUkUsXHJcbiAgREVUQUlMX1RPVVJfUkVRVUVTVCxcclxuICBERVRBSUxfVE9VUl9TVUNDRVNTLFxyXG4gIERFVEFJTF9UT1VSX0ZBSUxVUkUsXHJcbiAgQUxMX1RPVVJfUkVRVUVTVCxcclxuICBBTExfVE9VUl9TVUNDRVNTLFxyXG4gIEFMTF9UT1VSX0ZBSUxVUkUsXHJcbn0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgcHJvZHVjZSBmcm9tICdpbW1lcic7XHJcbmltcG9ydCB7IERldGFpbEFjdGlvbiwgRGV0YWlsU3RhdGUgfSBmcm9tICcuL3R5cGUnO1xyXG5cclxuY29uc3QgaW5pdGlhbFN0YXRlOiBEZXRhaWxTdGF0ZSA9IHtcclxuICBzZWFyY2hSZXN1bHQ6IHtcclxuICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBpdGVtczogJycsXHJcbiAgICAgIG51bU9mUm93czogMTAsXHJcbiAgICAgIHBhZ2VObzogMSxcclxuICAgICAgdG90YWxDb3VudDogMCxcclxuICAgICAgc2VhcmNoOiAnJyxcclxuICAgIH0sXHJcbiAgICBlcnJvcjogbnVsbCxcclxuICB9LFxyXG4gIGRldGFpbFJlc3VsdDoge1xyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGl0ZW1zOiB7IGl0ZW06IG51bGwgfSxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAxLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbiAgYWxsRGF0YToge1xyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGl0ZW1zOiB7XHJcbiAgICAgICAgaXRlbTogW10sXHJcbiAgICAgICAgZmVzdGl2YWw6IFtdLFxyXG4gICAgICAgIHNsZWVwOiBbXSxcclxuICAgICAgfSxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAxLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbiAgcmVnaW9uUmVzdWx0OiB7XHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXRlbXM6IHsgaXRlbTogW10gfSxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAxLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJRGV0YWlsUmVkdWNlclN0YXRlID0gdHlwZW9mIGluaXRpYWxTdGF0ZTtcclxuXHJcbmNvbnN0IGRldGFpbCA9IGNyZWF0ZVJlZHVjZXI8RGV0YWlsU3RhdGUsIERldGFpbEFjdGlvbj4oaW5pdGlhbFN0YXRlLCB7XHJcbiAgW1NFQVJDSF9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5pdGVtcyA9ICcnO1xyXG4gICAgfSksXHJcbiAgW1NFQVJDSF9UT1VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5pdGVtcyA9IGFjdGlvbi5wYXlsb2FkLml0ZW1zO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5udW1PZlJvd3MgPSBhY3Rpb24ucGF5bG9hZC5udW1PZlJvd3M7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLnBhZ2VObyA9IGFjdGlvbi5wYXlsb2FkLnBhZ2VObztcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEudG90YWxDb3VudCA9IGFjdGlvbi5wYXlsb2FkLnRvdGFsQ291bnQ7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLnNlYXJjaCA9IGFjdGlvbi5wYXlsb2FkLnNlYXJjaDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtTRUFSQ0hfVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLml0ZW1zID0gJyc7XHJcbiAgICB9KSxcclxuICBbREVUQUlMX1RPVVJfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5kYXRhLml0ZW1zLml0ZW0gPSBudWxsO1xyXG4gICAgfSksXHJcbiAgW0RFVEFJTF9UT1VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZGF0YS5pdGVtcyA9IGFjdGlvbi5wYXlsb2FkLml0ZW1zO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZGF0YS50b3RhbENvdW50ID0gYWN0aW9uLnBheWxvYWQudG90YWxDb3VudDtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtERVRBSUxfVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5kYXRhLml0ZW1zLml0ZW0gPSBudWxsO1xyXG4gICAgfSksXHJcbiAgW1JFR0lPTl9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZGF0YS5pdGVtcy5pdGVtID0gW107XHJcbiAgICB9KSxcclxuICBbUkVHSU9OX1RPVVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5kYXRhLml0ZW1zID0gYWN0aW9uLnBheWxvYWQuaXRlbXM7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5kYXRhLnRvdGFsQ291bnQgPSBhY3Rpb24ucGF5bG9hZC50b3RhbENvdW50O1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW1JFR0lPTl9UT1VSX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmRhdGEuaXRlbXMuaXRlbSA9IFtdO1xyXG4gICAgfSksXHJcbiAgW0FMTF9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5pdGVtID0gW107XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5mZXN0aXZhbCA9IFtdO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuc2xlZXAgPSBbXTtcclxuICAgIH0pLFxyXG4gIFtBTExfVE9VUl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtBTExfVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5lcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLml0ZW0gPSBbXTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLmZlc3RpdmFsID0gW107XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5zbGVlcCA9IFtdO1xyXG4gICAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGV0YWlsO1xyXG4iLCJpbXBvcnQge1xyXG4gIFNlYXJjaFJlc3BvbnNlLFxyXG4gIFNlYXJjaFBheWxvYWQsXHJcbiAgRGV0YWlsUmVzcG9uc2UsXHJcbiAgRGV0YWlsUGF5bG9hZCxcclxuICBSZWdpb25SZXNwb25zZSxcclxuICBSZWdpb25QYXlsb2FkLFxyXG4gIEFsbFJlc3BvbnNlLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IHNlYXJjaEFzeW5jLCBkZXRhaWxBc3luYywgcmVnaW9uQXN5bmMsIGFsbEFzeW5jIH0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyB0YWtlTGF0ZXN0LCBwdXQsIGNhbGwsIGFsbCwgZm9yayB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG4vLyDrqZTsnbgg7ZmU66m0XHJcbmZ1bmN0aW9uIGFsbEFQSSgpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KCcvZGV0YWlsL2FsbCcpO1xyXG59XHJcbmZ1bmN0aW9uKiBhbGxEYXRhU2FnYSgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBBbGxSZXNwb25zZSA9IHlpZWxkIGNhbGwoYWxsQVBJKTtcclxuICAgIHlpZWxkIHB1dChhbGxBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgeWllbGQgcHV0KGFsbEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hBbGxEYXRhKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QoYWxsQXN5bmMucmVxdWVzdCwgYWxsRGF0YVNhZ2EpO1xyXG59XHJcblxyXG4vLyDqsoDsg4nquLDriqVcclxuZnVuY3Rpb24gc2VhcmNoQVBJKHsgc2VhcmNoLCBwYWdlTm8sIGFycmFuZ2UgfTogU2VhcmNoUGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoYC9kZXRhaWwvc2VhcmNoYCwge1xyXG4gICAgcGFyYW1zOiB7XHJcbiAgICAgIHNlYXJjaCxcclxuICAgICAgcGFnZU5vLFxyXG4gICAgICBhcnJhbmdlLFxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiogc2VhcmNoRGV0YWlsU2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHNlYXJjaEFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogU2VhcmNoUmVzcG9uc2UgPSB5aWVsZCBjYWxsKHNlYXJjaEFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KHNlYXJjaEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB5aWVsZCBwdXQoc2VhcmNoQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaFNlYXJjaERldGFpbCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KHNlYXJjaEFzeW5jLnJlcXVlc3QsIHNlYXJjaERldGFpbFNhZ2EpO1xyXG59XHJcblxyXG4vLyDsp4Dsl63quLDrsJgg6rKA7IOJXHJcbmZ1bmN0aW9uIHJlZ2lvbkFQSSh7XHJcbiAgYXJyYW5nZSxcclxuICBhcmVhQ29kZSxcclxuICBjb250ZW50VHlwZUlkLFxyXG4gIHBhZ2VObyxcclxuICBudW1PZlJvd3MsXHJcbn06IFJlZ2lvblBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KCcvZGV0YWlsL3JlZ2lvbicsIHtcclxuICAgIHBhcmFtczoge1xyXG4gICAgICBhcnJhbmdlLFxyXG4gICAgICBhcmVhQ29kZSxcclxuICAgICAgY29udGVudFR5cGVJZCxcclxuICAgICAgcGFnZU5vLFxyXG4gICAgICBudW1PZlJvd3MsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uKiByZWdpb25EZXRhaWxTYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgcmVnaW9uQXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBSZWdpb25SZXNwb25zZSA9IHlpZWxkIGNhbGwocmVnaW9uQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQocmVnaW9uQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIHlpZWxkIHB1dChyZWdpb25Bc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoUmVnaW9uRGV0YWlsKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QocmVnaW9uQXN5bmMucmVxdWVzdCwgcmVnaW9uRGV0YWlsU2FnYSk7XHJcbn1cclxuXHJcbi8vIOyDgeyEuCDsoJXrs7RcclxuZnVuY3Rpb24gZGV0YWlsQVBJKHsgY29udGVudElkLCBjb250ZW50VHlwZUlkIH06IERldGFpbFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KGAvZGV0YWlsLyR7Y29udGVudFR5cGVJZH0vJHtjb250ZW50SWR9YCk7XHJcbn1cclxuZnVuY3Rpb24qIGRldGFpbFJlc3VsdFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBkZXRhaWxBc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IERldGFpbFJlc3BvbnNlID0geWllbGQgY2FsbChkZXRhaWxBUEksIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIHlpZWxkIHB1dChkZXRhaWxBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgeWllbGQgcHV0KGRldGFpbEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hEZXRhaWxSZXN1bHQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChkZXRhaWxBc3luYy5yZXF1ZXN0LCBkZXRhaWxSZXN1bHRTYWdhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIGRldGFpbFNhZ2EoKSB7XHJcbiAgeWllbGQgYWxsKFtcclxuICAgIGZvcmsod2F0Y2hTZWFyY2hEZXRhaWwpLFxyXG4gICAgZm9yayh3YXRjaERldGFpbFJlc3VsdCksXHJcbiAgICBmb3JrKHdhdGNoUmVnaW9uRGV0YWlsKSxcclxuICAgIGZvcmsod2F0Y2hBbGxEYXRhKSxcclxuICBdKTtcclxufVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBIWURSQVRFIH0gZnJvbSAnbmV4dC1yZWR1eC13cmFwcGVyJztcclxuaW1wb3J0IHsgQW55QWN0aW9uLCBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IGFsbCwgY2FsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcbmltcG9ydCB1c2VyIGZyb20gJy4vdXNlcic7XHJcbmltcG9ydCBkZXRhaWwgZnJvbSAnLi9kZXRhaWwnO1xyXG5pbXBvcnQgY29tbWVudCBmcm9tICcuL2NvbW1lbnQnO1xyXG5pbXBvcnQgdXNlclNhZ2EgZnJvbSAnLi91c2VyL3NhZ2EnO1xyXG5pbXBvcnQgZGV0YWlsU2FnYSBmcm9tICcuL2RldGFpbC9zYWdhJztcclxuaW1wb3J0IGNvbW1lbnRTYWdhIGZyb20gJy4vY29tbWVudC9zYWdhJztcclxuaW1wb3J0IHsgSVVzZXJSZWR1Y2VyU3RhdGUgfSBmcm9tICcuL3VzZXIvcmVkdWNlcic7XHJcbmltcG9ydCB7IElDb21tZW50UmVkdWNlclN0YXRlIH0gZnJvbSAnLi9jb21tZW50L3JlZHVjZXInO1xyXG5pbXBvcnQgeyBJRGV0YWlsUmVkdWNlclN0YXRlIH0gZnJvbSAnLi9kZXRhaWwvcmVkdWNlcic7XHJcblxyXG5heGlvcy5kZWZhdWx0cy5iYXNlVVJMID0gYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MS9hcGlgO1xyXG5heGlvcy5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlclN0YXRlIHtcclxuICB1c2VyOiBJVXNlclJlZHVjZXJTdGF0ZTtcclxuICBjb21tZW50OiBJQ29tbWVudFJlZHVjZXJTdGF0ZTtcclxuICBkZXRhaWw6IElEZXRhaWxSZWR1Y2VyU3RhdGU7XHJcbn1cclxuXHJcbmNvbnN0IHJvb3RSZWR1Y2VyID0gKFxyXG4gIHN0YXRlOiBJUmVkdWNlclN0YXRlIHwgdW5kZWZpbmVkLFxyXG4gIGFjdGlvbjogQW55QWN0aW9uXHJcbik6IElSZWR1Y2VyU3RhdGUgPT4ge1xyXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSFlEUkFURSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc3RhdGUsXHJcbiAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICAgIHVzZXIsXHJcbiAgICAgIGRldGFpbCxcclxuICAgICAgY29tbWVudCxcclxuICAgIH0pKHN0YXRlLCBhY3Rpb24pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IFJldHVyblR5cGU8dHlwZW9mIHJvb3RSZWR1Y2VyPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiByb290U2FnYSgpIHtcclxuICB5aWVsZCBhbGwoW2NhbGwodXNlclNhZ2EpLCBjYWxsKGRldGFpbFNhZ2EpLCBjYWxsKGNvbW1lbnRTYWdhKV0pO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgU2lnbnVwUGF5bG9hZCxcclxuICBTaWdudXBSZXNwb25zZSxcclxuICBMb2dpblJlc3BvbnNlLFxyXG4gIExvZ2luUGF5bG9hZCxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBjcmVhdGVBc3luY0FjdGlvbiB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmNvbnN0IHsgY3JlYXRlU3RhbmRhcmRBY3Rpb24gfSA9IGRlcHJlY2F0ZWQ7XHJcblxyXG5leHBvcnQgY29uc3QgU0lHTl9VUF9SRVFVRVNUID0gJ1NJR05fVVBfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBTSUdOX1VQX1NVQ0NFU1MgPSAnU0lHTl9VUF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFNJR05fVVBfRkFJTFVSRSA9ICdTSUdOX1VQX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPR19JTl9SRVFVRVNUID0gJ0xPR19JTl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IExPR19JTl9TVUNDRVNTID0gJ0xPR19JTl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IExPR19JTl9GQUlMVVJFID0gJ0xPR19JTl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0dfT1VUX1JFUVVFU1QgPSAnTE9HX09VVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IExPR19PVVRfU1VDQ0VTUyA9ICdMT0dfT1VUX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTE9HX09VVF9GQUlMVVJFID0gJ0xPR19PVVRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9BRF9VU0VSX1JFUVVFU1QgPSAnTE9BRF9VU0VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgTE9BRF9VU0VSX1NVQ0NFU1MgPSAnTE9BRF9VU0VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTE9BRF9VU0VSX0ZBSUxVUkUgPSAnTE9BRF9VU0VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNJR05fVVBfUkVTRVQgPSAnU0lHTl9VUF9SRVNFVCc7XHJcblxyXG5leHBvcnQgY29uc3Qgc2lnbnVwQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBTSUdOX1VQX1JFUVVFU1QsXHJcbiAgU0lHTl9VUF9TVUNDRVNTLFxyXG4gIFNJR05fVVBfRkFJTFVSRVxyXG4pPFNpZ251cFBheWxvYWQsIFNpZ251cFJlc3BvbnNlLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBMT0dfSU5fUkVRVUVTVCxcclxuICBMT0dfSU5fU1VDQ0VTUyxcclxuICBMT0dfSU5fRkFJTFVSRVxyXG4pPExvZ2luUGF5bG9hZCwgTG9naW5SZXNwb25zZSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIExPR19PVVRfUkVRVUVTVCxcclxuICBMT0dfT1VUX1NVQ0NFU1MsXHJcbiAgTE9HX09VVF9GQUlMVVJFXHJcbik8dW5kZWZpbmVkLCB1bmRlZmluZWQsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZFVzZXJBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIExPQURfVVNFUl9SRVFVRVNULFxyXG4gIExPQURfVVNFUl9TVUNDRVNTLFxyXG4gIExPQURfVVNFUl9GQUlMVVJFXHJcbik8dW5kZWZpbmVkLCBMb2dpblJlc3BvbnNlLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNpZ251cFJlc2V0ID0gY3JlYXRlU3RhbmRhcmRBY3Rpb24oU0lHTl9VUF9SRVNFVCkoKTtcclxuIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gJy4vcmVkdWNlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHlwZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWdhJztcclxuIiwiaW1wb3J0IHsgY3JlYXRlUmVkdWNlciB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5pbXBvcnQgeyBVc2VyU3RhdGUsIFVzZXJBY3Rpb24gfSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgcHJvZHVjZSBmcm9tICdpbW1lcic7XHJcbmltcG9ydCB7XHJcbiAgTE9HX0lOX1JFUVVFU1QsXHJcbiAgTE9HX0lOX1NVQ0NFU1MsXHJcbiAgTE9HX0lOX0ZBSUxVUkUsXHJcbiAgU0lHTl9VUF9SRVFVRVNULFxyXG4gIFNJR05fVVBfU1VDQ0VTUyxcclxuICBTSUdOX1VQX0ZBSUxVUkUsXHJcbiAgU0lHTl9VUF9SRVNFVCxcclxuICBMT0dfT1VUX1JFUVVFU1QsXHJcbiAgTE9HX09VVF9TVUNDRVNTLFxyXG4gIExPR19PVVRfRkFJTFVSRSxcclxuICBMT0FEX1VTRVJfUkVRVUVTVCxcclxuICBMT0FEX1VTRVJfU1VDQ0VTUyxcclxuICBMT0FEX1VTRVJfRkFJTFVSRSxcclxufSBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5leHBvcnQgdHlwZSBJVXNlclJlZHVjZXJTdGF0ZSA9IHR5cGVvZiBpbml0aWFsU3RhdGU7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGU6IFVzZXJTdGF0ZSA9IHtcclxuICBpc0xvZ2dpbmdpbjogZmFsc2UsXHJcbiAgaXNMb2dnaW5nb3V0OiBmYWxzZSxcclxuICBsb2dpbkVycm9yOiAnJyxcclxuICBpc1NpZ25lZHVwOiBmYWxzZSxcclxuICBpc1NpZ25pbmd1cDogZmFsc2UsXHJcbiAgc2lnbnVwRXJyb3I6ICcnLFxyXG4gIG1lOiBudWxsLFxyXG59O1xyXG5cclxuY29uc3QgdXNlciA9IGNyZWF0ZVJlZHVjZXI8VXNlclN0YXRlLCBVc2VyQWN0aW9uPihpbml0aWFsU3RhdGUsIHtcclxuICBbU0lHTl9VUF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmluZ3VwID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuaXNTaWduZWR1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5zaWdudXBFcnJvciA9ICcnO1xyXG4gICAgfSksXHJcbiAgW1NJR05fVVBfU1VDQ0VTU106IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25pbmd1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gdHJ1ZTtcclxuICAgIH0pLFxyXG4gIFtTSUdOX1VQX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25pbmd1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LnNpZ251cEVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbU0lHTl9VUF9SRVNFVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTE9HX0lOX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5naW4gPSB0cnVlO1xyXG4gICAgICBkcmFmdC5sb2dpbkVycm9yID0gJyc7XHJcbiAgICAgIGRyYWZ0Lm1lID0gbnVsbDtcclxuICAgIH0pLFxyXG4gIFtMT0dfSU5fU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ2luID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0Lm1lID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9HX0lOX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdpbiA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5tZSA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmxvZ2luRXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtMT0dfT1VUX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5nb3V0ID0gdHJ1ZTtcclxuICAgIH0pLFxyXG4gIFtMT0dfT1VUX1NVQ0NFU1NdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQubWUgPSBudWxsO1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdvdXQgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtMT0dfT1VUX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5nb3V0ID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTE9BRF9VU0VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgLy9cclxuICAgIH0pLFxyXG4gIFtMT0FEX1VTRVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0Lm1lID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9BRF9VU0VSX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgLy9cclxuICAgIH0pLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXI7XHJcbiIsImltcG9ydCB7IFNpZ251cFJlc3VsdCwgTG9naW5SZXN1bHQsIFNpZ251cFBheWxvYWQsIExvZ2luUGF5bG9hZCB9IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IHNpZ251cEFzeW5jLCBsb2dpbkFzeW5jLCBsb2dvdXRBc3luYywgbG9hZFVzZXJBc3luYyB9IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHsgcHV0LCB0YWtlTGF0ZXN0LCBjYWxsLCBhbGwsIGZvcmsgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuLy/tmozsm5DqsIDsnoVcclxuZnVuY3Rpb24gc2lnbnVwQVBJKHNpZ251cERhdGE6IFNpZ251cFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MucG9zdCgnL3VzZXIvc2lnbnVwJywgc2lnbnVwRGF0YSk7XHJcbn1cclxuZnVuY3Rpb24qIHNpZ251cFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBzaWdudXBBc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFNpZ251cFJlc3VsdCA9IHlpZWxkIGNhbGwoc2lnbnVwQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQoc2lnbnVwQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KHNpZ251cEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hTaWdudXAoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChzaWdudXBBc3luYy5yZXF1ZXN0LCBzaWdudXBTYWdhKTtcclxufVxyXG5cclxuLy8g66Gc6re47J24XHJcbmZ1bmN0aW9uIGxvZ2luQVBJKGxvZ2luRGF0YTogTG9naW5QYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLnBvc3QoJy91c2VyL2xvZ2luJywgbG9naW5EYXRhKTtcclxufVxyXG5mdW5jdGlvbiogbG9naW5TYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgbG9naW5Bc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvZ2luUmVzdWx0ID0geWllbGQgY2FsbChsb2dpbkFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KGxvZ2luQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGxvZ2luQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaExvZ2luKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobG9naW5Bc3luYy5yZXF1ZXN0LCBsb2dpblNhZ2EpO1xyXG59XHJcblxyXG4vLyDroZzqt7jslYTsm4NcclxuZnVuY3Rpb24gbG9nb3V0QVBJKCkge1xyXG4gIGF4aW9zLnBvc3QoJy91c2VyL2xvZ291dCcsIHt9KTtcclxufVxyXG5mdW5jdGlvbiogbG9nb3V0U2FnYSgpIHtcclxuICB0cnkge1xyXG4gICAgeWllbGQgY2FsbChsb2dvdXRBUEkpO1xyXG4gICAgeWllbGQgcHV0KGxvZ291dEFzeW5jLnN1Y2Nlc3MoKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobG9nb3V0QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaExvZ291dCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGxvZ291dEFzeW5jLnJlcXVlc3QsIGxvZ291dFNhZ2EpO1xyXG59XHJcblxyXG4vLyDroZzqt7jsnbgg7Jyg7KeAXHJcbmZ1bmN0aW9uIGxvYWRVc2VyQVBJKCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoYC91c2VyL2ApO1xyXG59XHJcbmZ1bmN0aW9uKiBsb2FkVXNlclNhZ2EoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9naW5SZXN1bHQgPSB5aWVsZCBjYWxsKGxvYWRVc2VyQVBJKTtcclxuICAgIHlpZWxkIHB1dChsb2FkVXNlckFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChsb2FkVXNlckFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hMb2FkVXNlcigpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGxvYWRVc2VyQXN5bmMucmVxdWVzdCwgbG9hZFVzZXJTYWdhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIHVzZXJTYWdhKCkge1xyXG4gIHlpZWxkIGFsbChbXHJcbiAgICBmb3JrKHdhdGNoU2lnbnVwKSxcclxuICAgIGZvcmsod2F0Y2hMb2dpbiksXHJcbiAgICBmb3JrKHdhdGNoTG9nb3V0KSxcclxuICAgIGZvcmsod2F0Y2hMb2FkVXNlciksXHJcbiAgXSk7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XG5pbXBvcnQgcmVkdWNlciwgeyByb290U2FnYSB9IGZyb20gJy4uL21vZHVsZXMnO1xuaW1wb3J0IHsgY3JlYXRlV3JhcHBlciB9IGZyb20gJ25leHQtcmVkdXgtd3JhcHBlcic7XG5pbXBvcnQgd2l0aFJlZHV4U2FnYSBmcm9tICduZXh0LXJlZHV4LXNhZ2EnO1xuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlLCB7IFRhc2sgfSBmcm9tICdyZWR1eC1zYWdhJztcbmltcG9ydCB7IGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY3JlYXRlU3RvcmUsIFN0b3JlIH0gZnJvbSAncmVkdXgnO1xuaW1wb3J0IHsgY29tcG9zZVdpdGhEZXZUb29scyB9IGZyb20gJ3JlZHV4LWRldnRvb2xzLWV4dGVuc2lvbic7XG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uL3N0eWxlcy90aGVtZSc7XG5pbXBvcnQgR2xvYmFsU3R5bGUgZnJvbSAnLi4vLi4vc3R5bGVzL0dsb2JhbFN0eWxlJztcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQnO1xuaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0JztcbmltcG9ydCAnYW50ZC9kaXN0L2FudGQuY3NzJztcblxuZXhwb3J0IGludGVyZmFjZSBTYWdhU3RvcmUgZXh0ZW5kcyBTdG9yZSB7XG4gIHNhZ2FUYXNrOiBUYXNrO1xufVxuXG5jb25zdCBUb3VyID0gKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfTogQXBwUHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFRoZW1lUHJvdmlkZXIgdGhlbWU9e3RoZW1lfT5cbiAgICAgICAgPEhlbG1ldFxuICAgICAgICAgIHRpdGxlPVwi7Ja065SU6rCI656YXCJcbiAgICAgICAgICBodG1sQXR0cmlidXRlcz17eyBsYW5nOiAna28nIH19XG4gICAgICAgICAgbWV0YT17W1xuICAgICAgICAgICAgeyBjaGFyU2V0OiAnVVRGLTgnIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICd2aWV3cG9ydCcsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MC44NiwgbWF4aW11bS1zY2FsZT01LjAsIG1pbmltdW0tc2NhbGU9MC44NlwiJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGh0dHBFcXVpdjogJ1gtVUEtQ29tcGF0aWJsZScsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICdJRT1lZGdlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdkZXNjcmlwdGlvbicsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICfrjIDtlZzrr7zqta0g6rSA6rSR7KeAIOyGjOqwnCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnb2c6dGl0bGUnLFxuICAgICAgICAgICAgICBjb250ZW50OiAn7Ja065SU6rCI656YPycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnb2c6ZGVzY3JpcHRpb24nLFxuICAgICAgICAgICAgICBjb250ZW50OiAn64yA7ZWc66+86rWtIOq0gOq0keyngCDshozqsJwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvcGVydHk6ICdvZzp0eXBlJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ3dlYnNpdGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcHJvcGVydHk6ICdvZzppbWFnZScsXG4gICAgICAgICAgICAgIGNvbnRlbnQ6ICdodHRwczovL3dkeXdnLnNpdGUvZmF2aWNvbi5pY28nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAgIGxpbms9e1tcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVsOiAnc2hvcnRjdXQgaWNvbicsXG4gICAgICAgICAgICAgIGhyZWY6ICcvZmF2aWNvbi5pY28nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcmVsOiAnc3R5bGVzaGVldCcsXG4gICAgICAgICAgICAgIGhyZWY6ICdodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUdvd3VuK0JhdGFuZyZkaXNwbGF5PXN3YXAnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgICA8R2xvYmFsU3R5bGUgLz5cbiAgICAgICAgPExheW91dD5cbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgICAgIDwvTGF5b3V0PlxuICAgICAgPC9UaGVtZVByb3ZpZGVyPlxuICAgIDwvPlxuICApO1xufTtcblxuY29uc3QgY29uZmlndXJlU3RvcmUgPSAoKSA9PiB7XG4gIGNvbnN0IHNhZ2FNaWRkbGV3YXJlID0gY3JlYXRlU2FnYU1pZGRsZXdhcmUoKTtcbiAgY29uc3QgbWlkZGxld2FyZXMgPSBbc2FnYU1pZGRsZXdhcmVdO1xuICBjb25zdCBlbmhhbmNlciA9XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xuICAgICAgPyBjb21wb3NlKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpXG4gICAgICA6IGNvbXBvc2UoY29tcG9zZVdpdGhEZXZUb29scyhhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpKSk7XG4gIGNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgZW5oYW5jZXIpO1xuICAoc3RvcmUgYXMgU2FnYVN0b3JlKS5zYWdhVGFzayA9IHNhZ2FNaWRkbGV3YXJlLnJ1bihyb290U2FnYSk7XG4gIHJldHVybiBzdG9yZTtcbn07XG5cbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3JlYXRlV3JhcHBlcihjb25maWd1cmVTdG9yZSk7XG5leHBvcnQgZGVmYXVsdCB3cmFwcGVyLndpdGhSZWR1eCh3aXRoUmVkdXhTYWdhKFRvdXIpKTtcbiIsImltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCwgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgRGV0YWlsSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0RldGFpbEl0ZW0nO1xyXG5pbXBvcnQgeyBJUmVkdWNlclN0YXRlLCBSb290U3RhdGUgfSBmcm9tICcuLi8uLi9tb2R1bGVzJztcclxuaW1wb3J0IHsgZGV0YWlsQXN5bmMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCBDb21tZW50Rm9ybSBmcm9tICcuLi8uLi9jb250YWluZXJzL0NvbW1lbnRGb3JtJztcclxuaW1wb3J0IHsgbG9hZENvbW1lbnRBc3luYyB9IGZyb20gJy4uLy4uL21vZHVsZXMvY29tbWVudCc7XHJcbmltcG9ydCBDb21tZW50TGlzdCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NvbW1lbnRMaXN0JztcclxuaW1wb3J0IHsgU2FnYVN0b3JlLCB3cmFwcGVyIH0gZnJvbSAnLi4vX2FwcCc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IGxvYWRVc2VyQXN5bmMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3VzZXInO1xyXG5pbXBvcnQgeyBFTkQgfSBmcm9tICdyZWR1eC1zYWdhJztcclxuaW1wb3J0IHsgTmV4dFBhZ2UgfSBmcm9tICduZXh0JztcclxuaW1wb3J0IERldGFpbFNrZWxldG9uIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGV0YWlsU2tlbGV0b24nO1xyXG5pbXBvcnQgeyBEdGFpbFdyYXBwZXIgfSBmcm9tICcuLi8uLi8uLi9zdHlsZXMvY29tbW9uJztcclxuXHJcbmNvbnN0IERldGFpbDogTmV4dFBhZ2U8SVJlZHVjZXJTdGF0ZT4gPSAoeyBkZXRhaWwgfSkgPT4ge1xyXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuXHJcbiAgY29uc3QgeyBpdGVtIH0gPSBkZXRhaWwuZGV0YWlsUmVzdWx0LmRhdGEuaXRlbXM7XHJcbiAgY29uc3QgeyBjb21tZW50TGlzdCB9ID0gdXNlU2VsZWN0b3IoKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLmNvbW1lbnQpO1xyXG4gIGNvbnN0IGNvbnRlbnRJZCA9IHJvdXRlci5xdWVyeS5pZCAmJiByb3V0ZXIucXVlcnkuaWRbMV07XHJcbiAgY29uc3QgY29udGVudFR5cGVJZCA9IHJvdXRlci5xdWVyeS5pZCAmJiByb3V0ZXIucXVlcnkuaWRbMF07XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChcclxuICAgICAgZGV0YWlsQXN5bmMucmVxdWVzdCh7XHJcbiAgICAgICAgY29udGVudFR5cGVJZDogTnVtYmVyKGNvbnRlbnRUeXBlSWQpLFxyXG4gICAgICAgIGNvbnRlbnRJZDogTnVtYmVyKGNvbnRlbnRJZCksXHJcbiAgICAgIH0pXHJcbiAgICApO1xyXG4gIH0sIFtjb250ZW50SWQsIGNvbnRlbnRUeXBlSWQsIGRpc3BhdGNoXSk7XHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChsb2FkQ29tbWVudEFzeW5jLnJlcXVlc3QoeyBjb250ZW50SWQ6IE51bWJlcihjb250ZW50SWQpIH0pKTtcclxuICB9LCBbY29udGVudElkLCBkaXNwYXRjaF0pO1xyXG4gIHJldHVybiAoXHJcbiAgICA8RHRhaWxXcmFwcGVyPlxyXG4gICAgICB7aXRlbSA/IDxEZXRhaWxJdGVtIGl0ZW09e2l0ZW19IC8+IDogPERldGFpbFNrZWxldG9uIC8+fVxyXG4gICAgICB7PENvbW1lbnRMaXN0IGRhdGE9e2NvbW1lbnRMaXN0fSAvPn1cclxuICAgICAge2l0ZW0gJiYgPENvbW1lbnRGb3JtIGl0ZW09e2l0ZW19IC8+fVxyXG4gICAgPC9EdGFpbFdyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRTZXJ2ZXJTaWRlUHJvcHMgPSB3cmFwcGVyLmdldFNlcnZlclNpZGVQcm9wcyhcclxuICAoc3RvcmUpID0+XHJcbiAgICBhc3luYyAoeyByZXEgfSkgPT4ge1xyXG4gICAgICBjb25zdCBjb29raWUgPSByZXEgPyByZXEuaGVhZGVycy5jb29raWUgOiAnJztcclxuICAgICAgaWYgKGF4aW9zLmRlZmF1bHRzLmhlYWRlcnMpIHtcclxuICAgICAgICByZXEgJiYgY29va2llXHJcbiAgICAgICAgICA/IChheGlvcy5kZWZhdWx0cy5oZWFkZXJzLkNvb2tpZSA9IGNvb2tpZSlcclxuICAgICAgICAgIDogKGF4aW9zLmRlZmF1bHRzLmhlYWRlcnMuQ29va2llID0gJycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBzdG9yZS5kaXNwYXRjaChsb2FkVXNlckFzeW5jLnJlcXVlc3QoKSk7XHJcblxyXG4gICAgICBzdG9yZS5kaXNwYXRjaChFTkQpO1xyXG4gICAgICBhd2FpdCAoc3RvcmUgYXMgU2FnYVN0b3JlKS5zYWdhVGFzay50b1Byb21pc2UoKTtcclxuICAgICAgcmV0dXJuIHsgcHJvcHM6IHt9IH07XHJcbiAgICB9XHJcbik7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KChzdGF0ZTogSVJlZHVjZXJTdGF0ZSkgPT4gc3RhdGUpKERldGFpbCk7XHJcbiIsImltcG9ydCB7IGNyZWF0ZUdsb2JhbFN0eWxlIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgcmVzZXQgZnJvbSAnc3R5bGVkLXJlc2V0JztcclxuXHJcbmNvbnN0IEdsb2JhbFN0eWxlID0gY3JlYXRlR2xvYmFsU3R5bGVgXHJcbiAgJHtyZXNldH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNZXVsamlyb1wiO1xyXG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICAgIHNyYzogdXJsKFwiL2ZvbnRzL0JNRVVMSklSTy53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XHJcbiAgfVxyXG4gIEBmb250LWZhY2Uge1xyXG4gICAgZm9udC1kaXNwbGF5OiBzd2FwO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiQk1KVUFcIjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUpVQS53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XHJcbiAgfVxyXG4gIEBmb250LWZhY2Uge1xyXG4gICAgZm9udC1kaXNwbGF5OiBzd2FwO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiQk1IQU5OQVwiO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIHNyYzogdXJsKFwiL2ZvbnRzL0JNSEFOTkFfMTF5cnMud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNSEFOTkFBaXJcIjtcclxuICAgIHNyYzogdXJsKFwiL2ZvbnRzL0JNSEFOTkFBaXIud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdsb2JhbFN0eWxlO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHsgUGFnaW5hdGlvbiB9IGZyb20gJ2FudGQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEJhciA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDk0MHB4O1xyXG4gIGhlaWdodDogMzBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjg5ZDNkO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpID0gc3R5bGVkLmxpYFxyXG4gIG1hcmdpbi1sZWZ0OiA1cHg7XHJcbiAgd2lkdGg6IDQ1cHg7XHJcbiAgaGVpZ2h0OiA0MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGN1cnNvcjogcG9pbnRlcjtcclxuICBiYWNrZ3JvdW5kOiAjZTJlMmUyO1xyXG4gICYuYWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQ6ICM2YjY5Njk7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gIH1cclxuICAmOmhvdmVyIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuYDtcclxuZXhwb3J0IGNvbnN0IFVsID0gc3R5bGVkLnVsYFxyXG4gIG1hcmdpbi1ib3R0b206IDMwcHg7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LXdyYXA6IHdyYXA7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbmA7XHJcblxyXG4vLyDtiKzslrQg7Y6Y7J207KeAXHJcbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICB3aWR0aDogOTgwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgU2VsZWN0ID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHdpZHRoOiA5MTBweDtcclxuICBoZWlnaHQ6IDQycHg7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogNDgwcHg7XHJcbiAgICBoZWlnaHQ6IDg0cHg7XHJcblxyXG4gICAgJiB1bCB7XHJcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgfVxyXG4gICAgJiBsaSB7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDVweDtcclxuICAgIH1cclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgd2lkdGg6IDMwMHB4O1xyXG4gICAgaGVpZ2h0OiAxMjZweDtcclxuICAgICYgbGkge1xyXG4gICAgICBtYXJnaW46IDAgNHB4IDVweDtcclxuICAgICAgaGVpZ2h0OiAzNXB4O1xyXG4gICAgICB3aWR0aDogNDBweDtcclxuICAgIH1cclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgVGl0bGUgPSBzdHlsZWQuaDJgXHJcbiAgZm9udC1zaXplOiA0MHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgcGFyZ2luOiA1MHB4IDA7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOdWxsUGFnZSA9IHN0eWxlZC5kaXZgXHJcbiAgaGVpZ2h0OiAxMDB2aDtcclxuYDtcclxuXHJcbi8vIOqzte2GtVxyXG5leHBvcnQgY29uc3QgU29ydFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHRleHQtYWxpZ246IGVuZDtcclxuICB3aWR0aDogMTAwJTtcclxuICBtYXJnaW46IDMwcHggNTBweCAxMHB4IDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBtYXJnaW46IDMwcHggMHB4IDEwcHggMDtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBTb3J0QnV0dG9uID0gc3R5bGVkLmJ1dHRvbmBcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBwYWRkaW5nOiA3cHggMTBweDtcclxuICBtYXJnaW4tcmlnaHQ6IDVweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYmFja2dyb3VuZDogbm9uZTtcclxuICAmOmhvdmVyIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIH1cclxuICAmLmFjdGl2ZSB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGJhY2tncm91bmQ6ICNlMmUyZTI7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFBhZ2luYXRpb25DdXN0b20gPSBzdHlsZWQoUGFnaW5hdGlvbilgXHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbjogNzBweCAwO1xyXG5gO1xyXG5cclxuLy8g66mU7J24IO2ZlOuptFxyXG5leHBvcnQgY29uc3QgVGl0bGVXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBtYXJnaW46IDUwcHggMDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIG1hcmdpbjogMTEwcHggMCA1MHB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBIb3RNZW51ID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBoZWlnaHQ6IDYwcHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMzBweCAzMHB4IDAgMDtcclxuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XHJcbiAgbWFyZ2luOiAxMDBweCA1MHB4IDIwcHggNTBweDtcclxuXHJcbiAgJiBhIHtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgJiBzcGFuIHtcclxuICAgICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgICBmb250LWZhbWlseTogQk1KVUEsIHNhbnMtc2VyaWY7XHJcbiAgICB9XHJcbiAgICAmIHNwYW46bGFzdC1jaGlsZCB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgIH1cclxuICB9XHJcbiAgPiBzcGFuOmZpcnN0LWNoaWxkIHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIGZvbnQtZmFtaWx5OiBCTUhBTk5BLCBzYW5zLXNlcmlmO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVMfSB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMzVweDtcclxuICAgIH1cclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgbWFyZ2luOiAxMDBweCAzMHB4IDIwcHggMzBweDtcclxuICB9XHJcbmA7XHJcblxyXG4vLyDsg4HshLgg7Y6Y7J207KeAXHJcblxyXG5leHBvcnQgY29uc3QgRHRhaWxXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICB3aWR0aDogOTgwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICB9XHJcbmA7XHJcbiIsImV4cG9ydCBjb25zdCBzaXplID0ge1xyXG4gICAgcGM6ICcxMzAwcHgnLFxyXG4gICAgbGFwdG9wOiAnMTAyNHB4JyxcclxuICAgIHRhYmxldDogJzc2OHB4JyxcclxuICAgIG1vYmlsZUw6ICc1MDBweCcsXHJcbiAgICBtb2JpbGVNOiAnNDI1cHgnLFxyXG4gICAgbW9iaWxlUzogJzM3NXB4JyxcclxufTtcclxuXHJcbmNvbnN0IHRoZW1lID0ge1xyXG4gICAgd2luZG93OiB7XHJcbiAgICAgICAgcGM6IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUucGN9KWAsXHJcbiAgICAgICAgbGFwdG9wOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLmxhcHRvcH0pYCxcclxuICAgICAgICB0YWJsZXQ6IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUudGFibGV0fSlgLFxyXG4gICAgICAgIG1vYmlsZUw6IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUubW9iaWxlTH0pYCxcclxuICAgICAgICBtb2JpbGVNOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLm1vYmlsZU19KWAsXHJcbiAgICAgICAgbW9iaWxlUzogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5tb2JpbGVTfSlgLFxyXG4gICAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRoZW1lO1xyXG4iLCJpbXBvcnQge1xyXG4gIHVzZUNhbGxiYWNrLFxyXG4gIHVzZVN0YXRlLFxyXG4gIENoYW5nZUV2ZW50LFxyXG4gIERpc3BhdGNoLFxyXG4gIFNldFN0YXRlQWN0aW9uLFxyXG59IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgdXNlSW5wdXRIb29rPFQ+ID0gW1xyXG4gIFQsXHJcbiAgKGU6IENoYW5nZUV2ZW50PEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50PikgPT4gdm9pZCxcclxuICBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxUPj5cclxuXTtcclxuXHJcbmZ1bmN0aW9uIHVzZUlucHV0PFQ+KGluaXRpYWxWYWx1ZTogVCk6IHVzZUlucHV0SG9vazxUPiB7XHJcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZTx0eXBlb2YgaW5pdGlhbFZhbHVlPihpbml0aWFsVmFsdWUpO1xyXG4gIGNvbnN0IG9uQ2hhbmdlID0gdXNlQ2FsbGJhY2soKGUpID0+IHtcclxuICAgIHNldFZhbHVlKGUudGFyZ2V0LnZhbHVlKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIFt2YWx1ZSwgb25DaGFuZ2UsIHNldFZhbHVlXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlSW5wdXQ7XHJcbiIsImltcG9ydCB7IHVzZVN0YXRlLCB1c2VDYWxsYmFjaywgRGlzcGF0Y2gsIFNldFN0YXRlQWN0aW9uIH0gZnJvbSAncmVhY3QnO1xyXG5cclxudHlwZSB1c2VUb2dnbGVIb29rID0gW2Jvb2xlYW4sICgpID0+IHZvaWQsIERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+Pl07XHJcblxyXG5mdW5jdGlvbiB1c2VUb2dnbGUoaW5pdGlhbFZhbHVlOiBib29sZWFuKTogdXNlVG9nZ2xlSG9vayB7XHJcbiAgY29uc3QgW3ZhbHVlLCBzZXRWYWx1ZV0gPSB1c2VTdGF0ZTx0eXBlb2YgaW5pdGlhbFZhbHVlPihpbml0aWFsVmFsdWUpO1xyXG4gIGNvbnN0IG9uVG9nZ2xlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0VmFsdWUoKHZhbHVlKSA9PiAhdmFsdWUpO1xyXG4gIH0sIFtdKTtcclxuICByZXR1cm4gW3ZhbHVlLCBvblRvZ2dsZSwgc2V0VmFsdWVdO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB1c2VUb2dnbGU7XHJcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2NsaWVudC9pbWFnZScpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvbGluaycpXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAYW50LWRlc2lnbi9pY29uc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJhbnRkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImF4aW9zXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImltbWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtcmVkdXgtc2FnYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0LXJlZHV4LXdyYXBwZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NlcnZlci9pbWFnZS1jb25maWcuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvaGVhZC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9taXR0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci1jb250ZXh0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9pcy1keW5hbWljLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9wYXJzZS1yZWxhdGl2ZS11cmwuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3F1ZXJ5c3RyaW5nLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9yb3V0ZS1tYXRjaGVyLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9yb3V0ZS1yZWdleC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi90by1iYXNlLTY0LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3V0aWxzLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWhlbG1ldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1pc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC1yZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2FcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYS9lZmZlY3RzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1jb21wb25lbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInN0eWxlZC1yZXNldFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzd2VldGFsZXJ0MlwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ0eXBlc2FmZS1hY3Rpb25zXCIpOyIsIi8qIChpZ25vcmVkKSAqLyJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsImRlZmF1bHQiLCJJbWFnZTEiLCJfcmVhY3QiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9oZWFkIiwiX3RvQmFzZTY0IiwiX2ltYWdlQ29uZmlnIiwiX3VzZUludGVyc2VjdGlvbiIsIl9kZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIl9fZXNNb2R1bGUiLCJfb2JqZWN0U3ByZWFkIiwidGFyZ2V0IiwiaSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInNvdXJjZSIsIm93bktleXMiLCJrZXlzIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwiY29uY2F0IiwiZmlsdGVyIiwic3ltIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwiZm9yRWFjaCIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsImV4Y2x1ZGVkIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UiLCJzb3VyY2VTeW1ib2xLZXlzIiwiaW5kZXhPZiIsInByb3RvdHlwZSIsInByb3BlcnR5SXNFbnVtZXJhYmxlIiwiY2FsbCIsInNvdXJjZUtleXMiLCJsb2FkZWRJbWFnZVVSTHMiLCJTZXQiLCJnbG9iYWwiLCJfX05FWFRfSU1BR0VfSU1QT1JURUQiLCJWQUxJRF9MT0FESU5HX1ZBTFVFUyIsInVuZGVmaW5lZCIsImxvYWRlcnMiLCJNYXAiLCJkZWZhdWx0TG9hZGVyIiwiaW1naXhMb2FkZXIiLCJjbG91ZGluYXJ5TG9hZGVyIiwiYWthbWFpTG9hZGVyIiwiY3VzdG9tTG9hZGVyIiwiVkFMSURfTEFZT1VUX1ZBTFVFUyIsImlzU3RhdGljUmVxdWlyZSIsInNyYyIsImlzU3RhdGljSW1hZ2VEYXRhIiwiaXNTdGF0aWNJbXBvcnQiLCJkZXZpY2VTaXplcyIsImNvbmZpZ0RldmljZVNpemVzIiwiaW1hZ2VTaXplcyIsImNvbmZpZ0ltYWdlU2l6ZXMiLCJsb2FkZXIiLCJjb25maWdMb2FkZXIiLCJwYXRoIiwiY29uZmlnUGF0aCIsImRvbWFpbnMiLCJjb25maWdEb21haW5zIiwicHJvY2VzcyIsImVudiIsIl9fTkVYVF9JTUFHRV9PUFRTIiwiaW1hZ2VDb25maWdEZWZhdWx0IiwiYWxsU2l6ZXMiLCJzb3J0IiwiYSIsImIiLCJnZXRXaWR0aHMiLCJ3aWR0aCIsImxheW91dCIsInNpemVzIiwidmlld3BvcnRXaWR0aFJlIiwicGVyY2VudFNpemVzIiwibWF0Y2giLCJleGVjIiwicHVzaCIsInBhcnNlSW50Iiwic21hbGxlc3RSYXRpbyIsIk1hdGgiLCJtaW4iLCJ3aWR0aHMiLCJzIiwia2luZCIsIm1hcCIsInciLCJmaW5kIiwicCIsImdlbmVyYXRlSW1nQXR0cnMiLCJ1bm9wdGltaXplZCIsInF1YWxpdHkiLCJzcmNTZXQiLCJsYXN0Iiwiam9pbiIsImdldEludCIsIngiLCJkZWZhdWx0SW1hZ2VMb2FkZXIiLCJsb2FkZXJQcm9wcyIsImxvYWQiLCJnZXQiLCJyb290IiwiRXJyb3IiLCJWQUxJRF9MT0FERVJTIiwiaGFuZGxlTG9hZGluZyIsImltZyIsInBsYWNlaG9sZGVyIiwib25Mb2FkaW5nQ29tcGxldGUiLCJoYW5kbGVMb2FkIiwic3RhcnRzV2l0aCIsImRlY29kZSIsIlByb21pc2UiLCJyZXNvbHZlIiwiY2F0Y2giLCJ0aGVuIiwic3R5bGUiLCJiYWNrZ3JvdW5kU2l6ZSIsImJhY2tncm91bmRJbWFnZSIsImFkZCIsIm5hdHVyYWxXaWR0aCIsIm5hdHVyYWxIZWlnaHQiLCJyZWYiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50IiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImRpc3BsYXkiLCJjb25zb2xlIiwid2FybiIsInBvc2l0aW9uIiwiY29tcGxldGUiLCJvbmxvYWQiLCJfcGFyYW0iLCJwcmlvcml0eSIsImxvYWRpbmciLCJsYXp5Qm91bmRhcnkiLCJjbGFzc05hbWUiLCJoZWlnaHQiLCJvYmplY3RGaXQiLCJvYmplY3RQb3NpdGlvbiIsImJsdXJEYXRhVVJMIiwiYWxsIiwicmVzdCIsInN0YXRpY1NyYyIsInN0YXRpY0ltYWdlRGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3aWR0aEludCIsImhlaWdodEludCIsInF1YWxpdHlJbnQiLCJpc0xhenkiLCJoYXMiLCJpbmNsdWRlcyIsIlN0cmluZyIsImlzTmFOIiwiVkFMSURfQkxVUl9FWFQiLCJyYW5kIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInNldFJlZiIsImlzSW50ZXJzZWN0ZWQiLCJ1c2VJbnRlcnNlY3Rpb24iLCJyb290TWFyZ2luIiwiZGlzYWJsZWQiLCJpc1Zpc2libGUiLCJ3cmFwcGVyU3R5bGUiLCJzaXplclN0eWxlIiwic2l6ZXJTdmciLCJpbWdTdHlsZSIsInRvcCIsImxlZnQiLCJib3R0b20iLCJyaWdodCIsImJveFNpemluZyIsInBhZGRpbmciLCJib3JkZXIiLCJtYXJnaW4iLCJtaW5XaWR0aCIsIm1heFdpZHRoIiwibWluSGVpZ2h0IiwibWF4SGVpZ2h0IiwiYmx1clN0eWxlIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwib3ZlcmZsb3ciLCJxdW90aWVudCIsInBhZGRpbmdUb3AiLCJpbWdBdHRyaWJ1dGVzIiwic3JjU3RyaW5nIiwiY3JlYXRlRWxlbWVudCIsImFsdCIsInRvQmFzZTY0IiwiYXNzaWduIiwiZGVjb2RpbmciLCJyZWwiLCJhcyIsImhyZWYiLCJpbWFnZXNyY3NldCIsImltYWdlc2l6ZXMiLCJub3JtYWxpemVTcmMiLCJzbGljZSIsInVybCIsIlVSTCIsInBhcmFtcyIsInNlYXJjaFBhcmFtcyIsInNldCIsInBhcmFtc1N0cmluZyIsIm1pc3NpbmdWYWx1ZXMiLCJwYXJzZWRTcmMiLCJlcnIiLCJlcnJvciIsImhvc3RuYW1lIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiX3JvdXRlciIsIl9yb3V0ZXIxIiwicHJlZmV0Y2hlZCIsInByZWZldGNoIiwicm91dGVyIiwib3B0aW9ucyIsImlzTG9jYWxVUkwiLCJjdXJMb2NhbGUiLCJsb2NhbGUiLCJpc01vZGlmaWVkRXZlbnQiLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCJtZXRhS2V5IiwiY3RybEtleSIsInNoaWZ0S2V5IiwiYWx0S2V5IiwibmF0aXZlRXZlbnQiLCJ3aGljaCIsImxpbmtDbGlja2VkIiwiZSIsInJlcGxhY2UiLCJzaGFsbG93Iiwic2Nyb2xsIiwibm9kZU5hbWUiLCJwcmV2ZW50RGVmYXVsdCIsIkxpbmsiLCJwcm9wcyIsImNyZWF0ZVByb3BFcnJvciIsImFyZ3MiLCJleHBlY3RlZCIsImFjdHVhbCIsInJlcXVpcmVkUHJvcHNHdWFyZCIsInJlcXVpcmVkUHJvcHMiLCJfIiwib3B0aW9uYWxQcm9wc0d1YXJkIiwicGFzc0hyZWYiLCJvcHRpb25hbFByb3BzIiwidmFsVHlwZSIsImhhc1dhcm5lZCIsInVzZVJlZiIsImN1cnJlbnQiLCJ1c2VSb3V0ZXIiLCJ1c2VNZW1vIiwicmVzb2x2ZWRIcmVmIiwicmVzb2x2ZWRBcyIsInJlc29sdmVIcmVmIiwiY2hpbGRyZW4iLCJjaGlsZCIsIkNoaWxkcmVuIiwib25seSIsImNoaWxkUmVmIiwic2V0SW50ZXJzZWN0aW9uUmVmIiwidXNlQ2FsbGJhY2siLCJlbCIsInVzZUVmZmVjdCIsInNob3VsZFByZWZldGNoIiwiaXNQcmVmZXRjaGVkIiwiY2hpbGRQcm9wcyIsIm9uQ2xpY2siLCJkZWZhdWx0UHJldmVudGVkIiwib25Nb3VzZUVudGVyIiwidHlwZSIsImxvY2FsZURvbWFpbiIsImlzTG9jYWxlRG9tYWluIiwiZ2V0RG9tYWluTG9jYWxlIiwibG9jYWxlcyIsImRvbWFpbkxvY2FsZXMiLCJhZGRCYXNlUGF0aCIsImFkZExvY2FsZSIsImRlZmF1bHRMb2NhbGUiLCJjbG9uZUVsZW1lbnQiLCJfZGVmYXVsdCIsInJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoIiwibm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2giLCJlbmRzV2l0aCIsIl9fTkVYVF9UUkFJTElOR19TTEFTSCIsInRlc3QiLCJyZXF1ZXN0SWRsZUNhbGxiYWNrIiwiY2FuY2VsSWRsZUNhbGxiYWNrIiwic2VsZiIsImJpbmQiLCJ3aW5kb3ciLCJjYiIsInN0YXJ0IiwiRGF0ZSIsIm5vdyIsInNldFRpbWVvdXQiLCJkaWRUaW1lb3V0IiwidGltZVJlbWFpbmluZyIsIm1heCIsImlkIiwiY2xlYXJUaW1lb3V0IiwibWFya0Fzc2V0RXJyb3IiLCJpc0Fzc2V0RXJyb3IiLCJnZXRDbGllbnRCdWlsZE1hbmlmZXN0IiwiY3JlYXRlUm91dGVMb2FkZXIiLCJfZ2V0QXNzZXRQYXRoRnJvbVJvdXRlIiwiX3JlcXVlc3RJZGxlQ2FsbGJhY2siLCJNU19NQVhfSURMRV9ERUxBWSIsIndpdGhGdXR1cmUiLCJnZW5lcmF0b3IiLCJlbnRyeSIsImZ1dHVyZSIsInJlc29sdmVyIiwicHJvbSIsImhhc1ByZWZldGNoIiwibGluayIsImRvY3VtZW50IiwiTVNJbnB1dE1ldGhvZENvbnRleHQiLCJkb2N1bWVudE1vZGUiLCJyZWxMaXN0Iiwic3VwcG9ydHMiLCJjYW5QcmVmZXRjaCIsInByZWZldGNoVmlhRG9tIiwicmVzIiwicmVqIiwicXVlcnlTZWxlY3RvciIsImNyb3NzT3JpZ2luIiwiX19ORVhUX0NST1NTX09SSUdJTiIsIm9uZXJyb3IiLCJoZWFkIiwiYXBwZW5kQ2hpbGQiLCJBU1NFVF9MT0FEX0VSUk9SIiwiU3ltYm9sIiwiYXBwZW5kU2NyaXB0Iiwic2NyaXB0IiwicmVqZWN0IiwiYm9keSIsImRldkJ1aWxkUHJvbWlzZSIsInJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQiLCJtcyIsImNhbmNlbGxlZCIsInIiLCJfX0JVSUxEX01BTklGRVNUIiwib25CdWlsZE1hbmlmZXN0IiwiX19CVUlMRF9NQU5JRkVTVF9DQiIsImdldEZpbGVzRm9yUm91dGUiLCJhc3NldFByZWZpeCIsInJvdXRlIiwic2NyaXB0cyIsImVuY29kZVVSSSIsImNzcyIsIm1hbmlmZXN0IiwiYWxsRmlsZXMiLCJ2IiwiZW50cnlwb2ludHMiLCJsb2FkZWRTY3JpcHRzIiwic3R5bGVTaGVldHMiLCJyb3V0ZXMiLCJtYXliZUV4ZWN1dGVTY3JpcHQiLCJmZXRjaFN0eWxlU2hlZXQiLCJmZXRjaCIsIm9rIiwidGV4dCIsImNvbnRlbnQiLCJ3aGVuRW50cnlwb2ludCIsIm9uRW50cnlwb2ludCIsImV4ZWN1dGUiLCJmbiIsImNvbXBvbmVudCIsImlucHV0Iiwib2xkIiwibG9hZFJvdXRlIiwicm91dGVGaWxlc1Byb21pc2UiLCJlbnRyeXBvaW50Iiwic3R5bGVzIiwiZmluYWxseSIsImNuIiwibmF2aWdhdG9yIiwiY29ubmVjdGlvbiIsInNhdmVEYXRhIiwiZWZmZWN0aXZlVHlwZSIsIm91dHB1dCIsIl93aXRoUm91dGVyIiwiY3JlYXRlUm91dGVyIiwibWFrZVB1YmxpY1JvdXRlckluc3RhbmNlIiwiX3JvdXRlckNvbnRleHQiLCJzaW5nbGV0b25Sb3V0ZXIiLCJyZWFkeUNhbGxiYWNrcyIsInJlYWR5IiwidXJsUHJvcGVydHlGaWVsZHMiLCJyb3V0ZXJFdmVudHMiLCJjb3JlTWV0aG9kRmllbGRzIiwiZXZlbnRzIiwiZmllbGQiLCJnZXRSb3V0ZXIiLCJvbiIsImV2ZW50RmllbGQiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInN1YnN0cmluZyIsIl9zaW5nbGV0b25Sb3V0ZXIiLCJtZXNzYWdlIiwic3RhY2siLCJ1c2VDb250ZXh0IiwiUm91dGVyQ29udGV4dCIsImluc3RhbmNlIiwicHJvcGVydHkiLCJBcnJheSIsImlzQXJyYXkiLCJoYXNJbnRlcnNlY3Rpb25PYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiaXNEaXNhYmxlZCIsInVub2JzZXJ2ZSIsInZpc2libGUiLCJzZXRWaXNpYmxlIiwidXNlU3RhdGUiLCJ0YWdOYW1lIiwib2JzZXJ2ZSIsImlkbGVDYWxsYmFjayIsImVsZW1lbnQiLCJjYWxsYmFjayIsIm9ic2VydmVyIiwiZWxlbWVudHMiLCJjcmVhdGVPYnNlcnZlciIsImRlbGV0ZSIsInNpemUiLCJkaXNjb25uZWN0Iiwib2JzZXJ2ZXJzIiwiZW50cmllcyIsImlzSW50ZXJzZWN0aW5nIiwiaW50ZXJzZWN0aW9uUmF0aW8iLCJ3aXRoUm91dGVyIiwiQ29tcG9zZWRDb21wb25lbnQiLCJXaXRoUm91dGVyV3JhcHBlciIsImdldEluaXRpYWxQcm9wcyIsIm9yaWdHZXRJbml0aWFsUHJvcHMiLCJuYW1lIiwiZGlzcGxheU5hbWUiLCJkZWxMb2NhbGUiLCJoYXNCYXNlUGF0aCIsImRlbEJhc2VQYXRoIiwiaW50ZXJwb2xhdGVBcyIsIl9ub3JtYWxpemVUcmFpbGluZ1NsYXNoIiwiX3JvdXRlTG9hZGVyIiwiX2Rlbm9ybWFsaXplUGFnZVBhdGgiLCJfbm9ybWFsaXplTG9jYWxlUGF0aCIsIl9taXR0IiwiX3V0aWxzIiwiX2lzRHluYW1pYyIsIl9wYXJzZVJlbGF0aXZlVXJsIiwiX3F1ZXJ5c3RyaW5nIiwiX3Jlc29sdmVSZXdyaXRlcyIsIl9yb3V0ZU1hdGNoZXIiLCJfcm91dGVSZWdleCIsImRldGVjdERvbWFpbkxvY2FsZSIsIl9fTkVYVF9JMThOX1NVUFBPUlQiLCJiYXNlUGF0aCIsIl9fTkVYVF9ST1VURVJfQkFTRVBBVEgiLCJidWlsZENhbmNlbGxhdGlvbkVycm9yIiwiYWRkUGF0aFByZWZpeCIsInByZWZpeCIsInBhdGhOb1F1ZXJ5SGFzaCIsIm5vcm1hbGl6ZUxvY2FsZVBhdGgiLCJkZXRlY3RlZExvY2FsZSIsImRldGVjdGVkRG9tYWluIiwiaHR0cCIsImRvbWFpbiIsInBhdGhuYW1lIiwicGF0aExvd2VyIiwidG9Mb3dlckNhc2UiLCJsb2NhbGVMb3dlciIsInN1YnN0ciIsInF1ZXJ5SW5kZXgiLCJoYXNoSW5kZXgiLCJsb2NhdGlvbk9yaWdpbiIsImdldExvY2F0aW9uT3JpZ2luIiwicmVzb2x2ZWQiLCJvcmlnaW4iLCJhc1BhdGhuYW1lIiwicXVlcnkiLCJpbnRlcnBvbGF0ZWRSb3V0ZSIsImR5bmFtaWNSZWdleCIsImdldFJvdXRlUmVnZXgiLCJkeW5hbWljR3JvdXBzIiwiZ3JvdXBzIiwiZHluYW1pY01hdGNoZXMiLCJnZXRSb3V0ZU1hdGNoZXIiLCJldmVyeSIsInBhcmFtIiwicmVwZWF0Iiwib3B0aW9uYWwiLCJyZXBsYWNlZCIsInNlZ21lbnQiLCJyZXN1bHQiLCJvbWl0UGFybXNGcm9tUXVlcnkiLCJmaWx0ZXJlZFF1ZXJ5IiwicmVzb2x2ZUFzIiwiYmFzZSIsInVybEFzU3RyaW5nIiwiZm9ybWF0V2l0aFZhbGlkYXRpb24iLCJ1cmxQcm90b01hdGNoIiwidXJsQXNTdHJpbmdOb1Byb3RvIiwidXJsUGFydHMiLCJzcGxpdCIsIm5vcm1hbGl6ZWRVcmwiLCJub3JtYWxpemVSZXBlYXRlZFNsYXNoZXMiLCJhc1BhdGgiLCJmaW5hbFVybCIsImludGVycG9sYXRlZEFzIiwiaXNEeW5hbWljUm91dGUiLCJzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5IiwiaGFzaCIsInN0cmlwT3JpZ2luIiwicHJlcGFyZVVybEFzIiwiaHJlZkhhZE9yaWdpbiIsImFzSGFkT3JpZ2luIiwicHJlcGFyZWRVcmwiLCJwcmVwYXJlZEFzIiwicmVzb2x2ZUR5bmFtaWNSb3V0ZSIsInBhZ2VzIiwiY2xlYW5QYXRobmFtZSIsImRlbm9ybWFsaXplUGFnZVBhdGgiLCJzb21lIiwicGFnZSIsInJlIiwibWFudWFsU2Nyb2xsUmVzdG9yYXRpb24iLCJfX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OIiwiaGlzdG9yeSIsInNlc3Npb25TdG9yYWdlIiwic2V0SXRlbSIsInJlbW92ZUl0ZW0iLCJuIiwiU1NHX0RBVEFfTk9UX0ZPVU5EIiwiZmV0Y2hSZXRyeSIsImF0dGVtcHRzIiwiY3JlZGVudGlhbHMiLCJzdGF0dXMiLCJqc29uIiwiZGF0YSIsIm5vdEZvdW5kIiwiZmV0Y2hOZXh0RGF0YSIsImRhdGFIcmVmIiwiaXNTZXJ2ZXJSZW5kZXIiLCJSb3V0ZXIiLCJjb25zdHJ1Y3RvciIsInBhdGhuYW1lMSIsInF1ZXJ5MSIsImFzMSIsImluaXRpYWxQcm9wcyIsInBhZ2VMb2FkZXIiLCJBcHAiLCJ3cmFwQXBwIiwiQ29tcG9uZW50IiwiQ29tcG9uZW50MSIsImVycjEiLCJzdWJzY3JpcHRpb24iLCJpc0ZhbGxiYWNrIiwiaXNQcmV2aWV3Iiwic2RjIiwic2RyIiwiX2lkeCIsIm9uUG9wU3RhdGUiLCJzdGF0ZSIsImNoYW5nZVN0YXRlIiwiZ2V0VVJMIiwiX19OIiwiZm9yY2VkU2Nyb2xsIiwiaWR4IiwicGFnZVhPZmZzZXQiLCJ5IiwicGFnZVlPZmZzZXQiLCJnZXRJdGVtIiwicGFyc2UiLCJwYXJzZVJlbGF0aXZlVXJsIiwiaXNTc3IiLCJfYnBzIiwiY2hhbmdlIiwiX3NoYWxsb3ciLCJjb21wb25lbnRzIiwiaW5pdGlhbCIsIl9fTl9TU0ciLCJfX05fU1NQIiwiYXV0b0V4cG9ydER5bmFtaWMiLCJfX05FWFRfREFUQV9fIiwiYXV0b0V4cG9ydCIsInN1YiIsImNsYyIsIl93cmFwQXBwIiwiaXNSZWFkeSIsImdzc3AiLCJnaXAiLCJhcHBHaXAiLCJnc3AiLCJsb2NhdGlvbiIsInNlYXJjaCIsIl9fTkVYVF9IQVNfUkVXUklURVMiLCJfc2hvdWxkUmVzb2x2ZUhyZWYiLCJhZGRFdmVudExpc3RlbmVyIiwic2Nyb2xsUmVzdG9yYXRpb24iLCJyZWxvYWQiLCJiYWNrIiwibWV0aG9kIiwic2hvdWxkUmVzb2x2ZUhyZWYiLCJfaCIsInByZXZMb2NhbGUiLCJwYXJzZWRBcyIsImxvY2FsZVBhdGhSZXN1bHQiLCJkaWROYXZpZ2F0ZSIsImFzTm9CYXNlUGF0aCIsIlNUIiwicGVyZm9ybWFuY2UiLCJtYXJrIiwicm91dGVQcm9wcyIsIl9pbkZsaWdodFJvdXRlIiwiYWJvcnRDb21wb25lbnRMb2FkIiwiY2xlYW5lZEFzIiwibG9jYWxlQ2hhbmdlIiwib25seUFIYXNoQ2hhbmdlIiwiZW1pdCIsInNjcm9sbFRvSGFzaCIsIm5vdGlmeSIsInBhcnNlZCIsInJld3JpdGVzIiwiZ2V0UGFnZUxpc3QiLCJfX3Jld3JpdGVzIiwidXJsSXNOZXciLCJyZXdyaXRlc1Jlc3VsdCIsIm1hdGNoZWRQYWdlIiwicm91dGVSZWdleCIsInJvdXRlTWF0Y2giLCJzaG91bGRJbnRlcnBvbGF0ZSIsIm1pc3NpbmdQYXJhbXMiLCJyZWYxIiwicm91dGVJbmZvIiwiZ2V0Um91dGVJbmZvIiwicGFnZVByb3BzIiwiX19OX1JFRElSRUNUIiwiZGVzdGluYXRpb24iLCJwYXJzZWRIcmVmIiwibmV3VXJsIiwibmV3QXMiLCJfX05fUFJFVklFVyIsIm5vdEZvdW5kUm91dGUiLCJmZXRjaENvbXBvbmVudCIsImFwcENvbXAiLCJuZXh0IiwiaXNQcmVyZW5kZXJlZCIsInN0YXR1c0NvZGUiLCJpc1ZhbGlkU2hhbGxvd1JvdXRlIiwiX3Njcm9sbCIsInNob3VsZFNjcm9sbCIsInJlc2V0U2Nyb2xsIiwiZG9jdW1lbnRFbGVtZW50IiwibGFuZyIsImhhbmRsZVJvdXRlSW5mb0Vycm9yIiwibG9hZEVycm9yRmFpbCIsImdpcEVyciIsInJvdXRlSW5mb0VyciIsImV4aXN0aW5nUm91dGVJbmZvIiwiY2FjaGVkUm91dGVJbmZvIiwibW9kIiwiaXNWYWxpZEVsZW1lbnRUeXBlIiwiZ2V0RGF0YUhyZWYiLCJfZ2V0RGF0YSIsIl9nZXRTdGF0aWNEYXRhIiwiX2dldFNlcnZlckRhdGEiLCJlcnIyIiwiYmVmb3JlUG9wU3RhdGUiLCJvbGRVcmxOb0hhc2giLCJvbGRIYXNoIiwibmV3VXJsTm9IYXNoIiwibmV3SGFzaCIsInNjcm9sbFRvIiwiaWRFbCIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsSW50b1ZpZXciLCJuYW1lRWwiLCJnZXRFbGVtZW50c0J5TmFtZSIsInBhdGhuYW1lMiIsIl9pc1NzZyIsImlzU3NnIiwiY2FuY2VsIiwiY29tcG9uZW50UmVzdWx0IiwibG9hZFBhZ2UiLCJjYWNoZUtleSIsInJlc291cmNlS2V5IiwiY3R4IiwiQXBwMSIsIkFwcFRyZWUiLCJsb2FkR2V0SW5pdGlhbFByb3BzIiwiQ29tbWVudEl0ZW0iLCJDb21tZW50VGl0bGUiLCJXcmFwcGVyIiwiQ29tbWVudExpc3QiLCJpdGVtIiwiY3JlYXRlZEF0Iiwic3R5bGVkIiwiZGl2IiwidGhlbWUiLCJsYXB0b3AiLCJSZWFjdCIsIkJ1dHRvbldyYXBwZXIiLCJEZXRhaWxJdGVtSW1hZ2UiLCJEZXRhaWxJdGVtSW5mbyIsIkRldGFpbEl0ZW1PdmVydmlldyIsIkRldGFpbEl0ZW1UaXRsZSIsIkRldGFpbEl0ZW1XcmFwcGVyIiwiSW1hZ2VXcmFwcGVyIiwiVG91clNwb3QiLCJUb3VyQ3VsdHVyZSIsIlRvdXJFdmVudCIsIlRvdXJDb3Vyc2UiLCJUb3VyU3BvcnRzIiwiVG91clNsZWVwIiwiVG91ck1hbGwiLCJUb3VyRm9vZCIsIkNhcmV0RG93bk91dGxpbmVkIiwiQ2FyZXRVcE91dGxpbmVkIiwiS2FrYW9tYXAiLCJ1c2VUb2dnbGUiLCJEZXRhaWxJdGVtIiwidGl0bGUiLCJmaXJzdGltYWdlIiwib3ZlcnZpZXciLCJjb250ZW50dHlwZWlkIiwibW9yZSIsIm9uVG9nZ2xlTW9yZSIsIm9uVG9nZ2xlTWluSGVpZ2h0IiwibW9yZUhlaWdodCIsImNsaWVudEhlaWdodCIsIl9faHRtbCIsInJlcGxhY2VBbGwiLCJJbWFnZSIsImgyIiwidGFibGV0IiwibW9iaWxlTCIsImgzIiwiSW1hZ2VTa2VsZXRvbiIsIlNrZWxldG9uQm94IiwiVGl0bGVCb3giLCJUaXRsZVNrZWxldG9uIiwiRGV0YWlsU2tlbGV0b24iLCJwYyIsIkZvb3RlcldyYXBwZXIiLCJGb290ZXIiLCJMaSIsIkhlYWRJdGVtIiwiY29udGVudFR5cGVJZCIsImxpIiwiQXJyb3dSaWdodE91dGxpbmVkIiwiSW5mb3dpbmRvdyIsIk1hcFdyYXBwZXIiLCJtYXB4IiwibWFweSIsIk5FWFRfUFVCTElDX0tBS0FPX01BUFMiLCJjb250YWluZXIiLCJrYWthbyIsIm1hcHMiLCJjZW50ZXIiLCJMYXRMbmciLCJsZXZlbCIsIm1hcmtlclBvc2l0aW9uIiwibWFya2VyIiwiTWFya2VyIiwic2V0TWFwIiwic2V0Wm9vbWFibGUiLCJyZW1vdmUiLCJJd0NvbnRlbnRXcmFwcGVyIiwiTmF2YmFyIiwiTWFpbldyYXBwZXIiLCJMYXlvdXQiLCJTdWJJdGVtIiwiaHRtbCIsIkludHJvV3JhcHBlciIsIkNhcmRJbWFnZSIsIkNhcmRXcmFwcGVyIiwiQ291cnNlSW1hZ2UiLCJDb3Vyc2VMaXN0IiwiSXRlbSIsIlN1YkRldGFpbCIsImltYWdlU3JjIiwic2V0SW1hZ2VTcmMiLCJpbmZvIiwic3ViZGV0YWlsaW1nIiwiaW1hZ2VUaXRsZSIsInNldEltYWdlVGl0bGUiLCJzdWJuYW1lIiwic3ViT3ZlcnZpZXciLCJzZXRTdWJPdmVydmlldyIsInN1YmRldGFpbG92ZXJ2aWV3IiwiY2hhbmdlSW1hZ2VTcmMiLCJpbnRybyIsImRpc3RhbmNlIiwiY291cnNlIiwic3ViY29udGVudGlkIiwiVGltZWxpbmUiLCJDYXJkIiwibW9iaWxlUyIsImFkZHIxIiwiaG9tZXBhZ2UiLCJpbmZvY2VudGVyY3VsdHVyZSIsInBhcmtpbmdjdWx0dXJlIiwicGFya2luZ2ZlZSIsInVzZXRpbWVjdWx0dXJlIiwiaW5mb25hbWUiLCJpbmZvdGV4dCIsInRlbCIsInVzZXRpbWVmZXN0aXZhbCIsInBsYXl0aW1lIiwiZGlzY291bnRpbmZvZmVzdGl2YWwiLCJyZXN0ZGF0ZWZvb2QiLCJyZXNlcnZhdGlvbmZvb2QiLCJvcGVudGltZWZvb2QiLCJ0cmVhdG1lbnUiLCJpbmZvY2VudGVyZm9vZCIsImluZm9jZW50ZXJzaG9wcGluZyIsInNob3BndWlkZSIsIm9wZW50aW1lIiwicmVzdGRhdGVzaG9wcGluZyIsInJlc2VydmF0aW9ubG9kZ2luZyIsInJlc2VydmF0aW9udXJsIiwiY2hlY2tpbnRpbWUiLCJjaGVja291dHRpbWUiLCJyZWZ1bmRyZWd1bGF0aW9uIiwic2NhbGVsb2RnaW5nIiwiaW5mb2NlbnRlcmxlcG9ydHMiLCJyZXNlcnZhdGlvbiIsInVzZXRpbWVsZXBvcnRzIiwiaW5mb2NlbnRlciIsInVzZXRpbWUiLCJCdXR0b24iLCJGb3JtIiwidXNlRGlzcGF0Y2giLCJ1c2VTZWxlY3RvciIsIlN3YWwiLCJ1c2VJbnB1dCIsImFkZENvbW1lbnRBc3luYyIsIkZvcm1XcmFwcGVyIiwiVGV4dEFyZWEiLCJUZXh0QXJlYVdyYXBwZXIiLCJDb21tZW50Rm9ybSIsImNvbW1lbnRUZXh0Iiwib25DaGFuZ2VDb21tZW50VGV4dCIsInNldENvbW1lbnRUZXh0IiwibWUiLCJ1c2VyIiwiZGlzcGF0Y2giLCJzaG93TW9kYWwiLCJmaXJlIiwic2hvd0NhbmNlbEJ1dHRvbiIsImNvbmZpcm1CdXR0b25UZXh0IiwiY2FuY2VsQnV0dG9uVGV4dCIsImljb24iLCJpc0NvbmZpcm1lZCIsIm9uU3VibWl0IiwidHJpbSIsInJlcXVlc3QiLCJjb250ZW50aWQiLCJ0ZXh0YXJlYSIsIkF2YXRhciIsImRlbGV0ZUNvbW1lbnRBc3luYyIsIkNvbW1lbnRTdHlsZSIsIkVkaXRGb3JtIiwiZWRpdGFibGUiLCJvblRvZ2dsZUVkaXQiLCJyZW1vdmVDb21tZW50IiwiY29udGVudElkIiwiVXNlcklkIiwiVXNlciIsIm5pY2tuYW1lIiwidG9Mb2NhbGVTdHJpbmciLCJ0aW1lWm9uZSIsIkNvbW1lbnQiLCJtaW5lIiwiQ2FuY2VsQnV0dG9uIiwibW9kaWZ5Q29tbWVudEFzeW5jIiwidG9nZ2xlRWRpdCIsIm9uQ2hhbmdlSW5wdXQiLCJjb21tZW50RWRpdGVkRXJyb3IiLCJjb21tZW50IiwiZWRpdENvbW1lbnQiLCJOYXZiYXJXcmFwcGVyIiwiTG9nbyIsIlNlYXJjaCIsIkFjY291bnQiLCJDYXRlZ29yeSIsIk1vYmlsZVNlYXJjaCIsIkhhbWJ1cmdlck1lbnUiLCJMb2dvdXRCdXR0b24iLCJsb2dvdXRBc3luYyIsIlNlYXJjaEZvcm0iLCJNZW51T3V0bGluZWQiLCJ0b2dnbGUiLCJ0b2dnbGVIYW5idXJnZXIiLCJzZXRUb2dnbGUiLCJvbkNsaWNrTG9nb3V0IiwiY2xvc2VIYW1idXJnZXIiLCJidXR0b24iLCJJbnB1dCIsIlNlYXJjaEJ1dHRvbiIsIlNlYXJjaFdyYXBwZXIiLCJTZWFyY2hPdXRsaW5lZCIsImxhYmVsIiwib25DaGFuZ2VTZWFyY2giLCJvblNlYXJjaCIsInBhZ2VObyIsImNvbG9yIiwiY3JlYXRlQXN5bmNBY3Rpb24iLCJBRERfQ09NTUVOVF9SRVFVRVNUIiwiQUREX0NPTU1FTlRfU1VDQ0VTUyIsIkFERF9DT01NRU5UX0ZBSUxVUkUiLCJMT0FEX0NPTU1FTlRfUkVRVUVTVCIsIkxPQURfQ09NTUVOVF9TVUNDRVNTIiwiTE9BRF9DT01NRU5UX0ZBSUxVUkUiLCJERUxFVEVfQ09NTUVOVF9SRVFVRVNUIiwiREVMRVRFX0NPTU1FTlRfU1VDQ0VTUyIsIkRFTEVURV9DT01NRU5UX0ZBSUxVUkUiLCJNT0RJRllfQ09NTUVOVF9SRVFVRVNUIiwiTU9ESUZZX0NPTU1FTlRfU1VDQ0VTUyIsIk1PRElGWV9DT01NRU5UX0ZBSUxVUkUiLCJsb2FkQ29tbWVudEFzeW5jIiwicHJvZHVjZSIsImNyZWF0ZVJlZHVjZXIiLCJpbml0aWFsU3RhdGUiLCJjb21tZW50TGlzdCIsImNvbW1lbnRBZGRlZCIsImlzQWRkaW5nQ29tbWVudCIsImNvbW1lbnRFcnJvciIsImRyYWZ0IiwiYWN0aW9uIiwicGF5bG9hZCIsImF4aW9zIiwidGFrZUxhdGVzdCIsInB1dCIsImZvcmsiLCJhZGRDb21tZW50QVBJIiwicG9zdCIsImFkZENvbW1lbnRTYWdhIiwic3VjY2VzcyIsImZhaWx1cmUiLCJyZXNwb25zZSIsIndhdGNoQWRkQ29tbWVudCIsImxvYWRDb21tZW50c0FQSSIsImxvYWRDb21tZW50c1NhZ2EiLCJ3YXRjaExvYWRDb21tZW50cyIsImRlbGV0ZUNvbW1lbnRBUEkiLCJkZWxldGVDb21tZW50U2FnYSIsIndhdGNoUmVtb3ZlQ29tbWVudCIsIm1vZGlmeUNvbW1lbnRBUEkiLCJtb2RpZnlDb21tZW50U2FnYSIsIndhdGNoTW9kaWZ5Q29tbWVudCIsImNvbW1lbnRTYWdhIiwiUkVHSU9OX1RPVVJfUkVRVUVTVCIsIlJFR0lPTl9UT1VSX1NVQ0NFU1MiLCJSRUdJT05fVE9VUl9GQUlMVVJFIiwiU0VBUkNIX1RPVVJfUkVRVUVTVCIsIlNFQVJDSF9UT1VSX1NVQ0NFU1MiLCJTRUFSQ0hfVE9VUl9GQUlMVVJFIiwiREVUQUlMX1RPVVJfUkVRVUVTVCIsIkRFVEFJTF9UT1VSX1NVQ0NFU1MiLCJERVRBSUxfVE9VUl9GQUlMVVJFIiwiQUxMX1RPVVJfUkVRVUVTVCIsIkFMTF9UT1VSX1NVQ0NFU1MiLCJBTExfVE9VUl9GQUlMVVJFIiwiYWxsQXN5bmMiLCJzZWFyY2hBc3luYyIsInJlZ2lvbkFzeW5jIiwiZGV0YWlsQXN5bmMiLCJzZWFyY2hSZXN1bHQiLCJpdGVtcyIsIm51bU9mUm93cyIsInRvdGFsQ291bnQiLCJkZXRhaWxSZXN1bHQiLCJhbGxEYXRhIiwiZmVzdGl2YWwiLCJzbGVlcCIsInJlZ2lvblJlc3VsdCIsImRldGFpbCIsImFsbEFQSSIsImFsbERhdGFTYWdhIiwid2F0Y2hBbGxEYXRhIiwic2VhcmNoQVBJIiwiYXJyYW5nZSIsInNlYXJjaERldGFpbFNhZ2EiLCJ3YXRjaFNlYXJjaERldGFpbCIsInJlZ2lvbkFQSSIsImFyZWFDb2RlIiwicmVnaW9uRGV0YWlsU2FnYSIsIndhdGNoUmVnaW9uRGV0YWlsIiwiZGV0YWlsQVBJIiwiZGV0YWlsUmVzdWx0U2FnYSIsIndhdGNoRGV0YWlsUmVzdWx0IiwiZGV0YWlsU2FnYSIsIkhZRFJBVEUiLCJjb21iaW5lUmVkdWNlcnMiLCJ1c2VyU2FnYSIsImRlZmF1bHRzIiwiYmFzZVVSTCIsIndpdGhDcmVkZW50aWFscyIsInJvb3RSZWR1Y2VyIiwicm9vdFNhZ2EiLCJkZXByZWNhdGVkIiwiY3JlYXRlU3RhbmRhcmRBY3Rpb24iLCJTSUdOX1VQX1JFUVVFU1QiLCJTSUdOX1VQX1NVQ0NFU1MiLCJTSUdOX1VQX0ZBSUxVUkUiLCJMT0dfSU5fUkVRVUVTVCIsIkxPR19JTl9TVUNDRVNTIiwiTE9HX0lOX0ZBSUxVUkUiLCJMT0dfT1VUX1JFUVVFU1QiLCJMT0dfT1VUX1NVQ0NFU1MiLCJMT0dfT1VUX0ZBSUxVUkUiLCJMT0FEX1VTRVJfUkVRVUVTVCIsIkxPQURfVVNFUl9TVUNDRVNTIiwiTE9BRF9VU0VSX0ZBSUxVUkUiLCJTSUdOX1VQX1JFU0VUIiwic2lnbnVwQXN5bmMiLCJsb2dpbkFzeW5jIiwibG9hZFVzZXJBc3luYyIsInNpZ251cFJlc2V0IiwiaXNMb2dnaW5naW4iLCJpc0xvZ2dpbmdvdXQiLCJsb2dpbkVycm9yIiwiaXNTaWduZWR1cCIsImlzU2lnbmluZ3VwIiwic2lnbnVwRXJyb3IiLCJzaWdudXBBUEkiLCJzaWdudXBEYXRhIiwic2lnbnVwU2FnYSIsIndhdGNoU2lnbnVwIiwibG9naW5BUEkiLCJsb2dpbkRhdGEiLCJsb2dpblNhZ2EiLCJ3YXRjaExvZ2luIiwibG9nb3V0QVBJIiwibG9nb3V0U2FnYSIsIndhdGNoTG9nb3V0IiwibG9hZFVzZXJBUEkiLCJsb2FkVXNlclNhZ2EiLCJ3YXRjaExvYWRVc2VyIiwicmVkdWNlciIsImNyZWF0ZVdyYXBwZXIiLCJ3aXRoUmVkdXhTYWdhIiwiY3JlYXRlU2FnYU1pZGRsZXdhcmUiLCJhcHBseU1pZGRsZXdhcmUiLCJjb21wb3NlIiwiY3JlYXRlU3RvcmUiLCJjb21wb3NlV2l0aERldlRvb2xzIiwiVGhlbWVQcm92aWRlciIsIkdsb2JhbFN0eWxlIiwiSGVsbWV0IiwiVG91ciIsImNoYXJTZXQiLCJodHRwRXF1aXYiLCJjb25maWd1cmVTdG9yZSIsInNhZ2FNaWRkbGV3YXJlIiwibWlkZGxld2FyZXMiLCJlbmhhbmNlciIsInN0b3JlIiwic2FnYVRhc2siLCJydW4iLCJ3cmFwcGVyIiwid2l0aFJlZHV4IiwiY29ubmVjdCIsIkVORCIsIkR0YWlsV3JhcHBlciIsIkRldGFpbCIsIk51bWJlciIsImdldFNlcnZlclNpZGVQcm9wcyIsInJlcSIsImNvb2tpZSIsImhlYWRlcnMiLCJDb29raWUiLCJ0b1Byb21pc2UiLCJjcmVhdGVHbG9iYWxTdHlsZSIsInJlc2V0IiwiUGFnaW5hdGlvbiIsIkJhciIsIlVsIiwidWwiLCJTZWxlY3QiLCJUaXRsZSIsIk51bGxQYWdlIiwiU29ydFdyYXBwZXIiLCJTb3J0QnV0dG9uIiwiUGFnaW5hdGlvbkN1c3RvbSIsIlRpdGxlV3JhcHBlciIsIkhvdE1lbnUiLCJtb2JpbGVNIiwiaW5pdGlhbFZhbHVlIiwic2V0VmFsdWUiLCJvbkNoYW5nZSIsIm9uVG9nZ2xlIl0sInNvdXJjZVJvb3QiOiIifQ==