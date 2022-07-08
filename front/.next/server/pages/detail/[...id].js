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
/* harmony import */ var _styles_GlobalStyle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../styles/GlobalStyle */ "./styles/GlobalStyle.ts");
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Layout */ "./src/components/Layout/index.tsx");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! next/head */ "next/head");
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_11__);
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
      children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)((next_head__WEBPACK_IMPORTED_MODULE_11___default()), {
        children: [/*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          charSet: "UTF-8"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 26,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("title", {
          children: "\uC5B4\uB514\uAC08\uB798"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 27,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          name: "description",
          content: "\uB300\uD55C\uBBFC\uAD6D \uAD00\uAD11\uC9C0 \uC18C\uAC1C"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 28,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          name: "viewport",
          content: "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=5.0,user-scalable=yes,viewport-fit=cover"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 29,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          property: "og:title",
          content: "\uC5B4\uB514\uAC08\uB798"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          property: "og:description",
          content: "\uB300\uD55C\uBBFC\uAD6D \uAD00\uAD11\uC9C0 \uC18C\uAC1C"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          property: "og:type",
          content: "website"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 35,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("meta", {
          property: "og:image",
          content: "http://wdywg.site/og.png"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 36,
          columnNumber: 11
        }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)("link", {
          rel: "shortcut icon"
        }, void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 37,
          columnNumber: 11
        }, undefined)]
      }, void 0, true, {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_styles_GlobalStyle__WEBPACK_IMPORTED_MODULE_9__.default, {}, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 39,
        columnNumber: 9
      }, undefined), /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_10__.default, {
        children: /*#__PURE__*/(0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_13__.jsxDEV)(Component, _objectSpread({}, pageProps), void 0, false, {
          fileName: _jsxFileName,
          lineNumber: 41,
          columnNumber: 11
        }, undefined)
      }, void 0, false, {
        fileName: _jsxFileName,
        lineNumber: 40,
        columnNumber: 9
      }, undefined)]
    }, void 0, true, {
      fileName: _jsxFileName,
      lineNumber: 24,
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

/***/ "next/head":
/*!****************************!*\
  !*** external "next/head" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvZGV0YWlsL1suLi5pZF0uanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFhOztBQUNiQSw4Q0FBNkM7QUFDekNHLEVBQUFBLEtBQUssRUFBRTtBQURrQyxDQUE3QztBQUdBRCxlQUFBLEdBQWtCRyxNQUFsQjs7QUFDQSxJQUFJQyxNQUFNLEdBQUdDLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLG9CQUFELENBQVIsQ0FBbkM7O0FBQ0EsSUFBSUMsS0FBSyxHQUFHRixzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQyw4Q0FBRCxDQUFSLENBQWxDOztBQUNBLElBQUlFLFNBQVMsR0FBR0YsbUJBQU8sQ0FBQywwREFBRCxDQUF2Qjs7QUFDQSxJQUFJRyxZQUFZLEdBQUdILG1CQUFPLENBQUMsc0RBQUQsQ0FBMUI7O0FBQ0EsSUFBSUksZ0JBQWdCLEdBQUdKLG1CQUFPLENBQUMsK0VBQUQsQ0FBOUI7O0FBQ0EsU0FBU0ssZUFBVCxDQUF5QkMsR0FBekIsRUFBOEJDLEdBQTlCLEVBQW1DWixLQUFuQyxFQUEwQztBQUN0QyxNQUFJWSxHQUFHLElBQUlELEdBQVgsRUFBZ0I7QUFDWmQsSUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCYSxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUJaLE1BQUFBLEtBQUssRUFBRUEsS0FEcUI7QUFFNUJhLE1BQUFBLFVBQVUsRUFBRSxJQUZnQjtBQUc1QkMsTUFBQUEsWUFBWSxFQUFFLElBSGM7QUFJNUJDLE1BQUFBLFFBQVEsRUFBRTtBQUprQixLQUFoQztBQU1ILEdBUEQsTUFPTztBQUNISixJQUFBQSxHQUFHLENBQUNDLEdBQUQsQ0FBSCxHQUFXWixLQUFYO0FBQ0g7O0FBQ0QsU0FBT1csR0FBUDtBQUNIOztBQUNELFNBQVNQLHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUNqQyxTQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0ssVUFBWCxHQUF3QkwsR0FBeEIsR0FBOEI7QUFDakNWLElBQUFBLE9BQU8sRUFBRVU7QUFEd0IsR0FBckM7QUFHSDs7QUFDRCxTQUFTTSxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUMzQixPQUFJLElBQUlDLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR0MsU0FBUyxDQUFDQyxNQUE3QixFQUFxQ0YsQ0FBQyxFQUF0QyxFQUF5QztBQUNyQyxRQUFJRyxNQUFNLEdBQUdGLFNBQVMsQ0FBQ0QsQ0FBRCxDQUFULElBQWdCLElBQWhCLEdBQXVCQyxTQUFTLENBQUNELENBQUQsQ0FBaEMsR0FBc0MsRUFBbkQ7QUFFQSxRQUFJSSxPQUFPLEdBQUcxQixNQUFNLENBQUMyQixJQUFQLENBQVlGLE1BQVosQ0FBZDs7QUFDQSxRQUFJLE9BQU96QixNQUFNLENBQUM0QixxQkFBZCxLQUF3QyxVQUE1QyxFQUF3RDtBQUNwREYsTUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNHLE1BQVIsQ0FBZTdCLE1BQU0sQ0FBQzRCLHFCQUFQLENBQTZCSCxNQUE3QixFQUFxQ0ssTUFBckMsQ0FBNEMsVUFBU0MsR0FBVCxFQUFjO0FBQy9FLGVBQU8vQixNQUFNLENBQUNnQyx3QkFBUCxDQUFnQ1AsTUFBaEMsRUFBd0NNLEdBQXhDLEVBQTZDZixVQUFwRDtBQUNILE9BRndCLENBQWYsQ0FBVjtBQUdIOztBQUNEVSxJQUFBQSxPQUFPLENBQUNPLE9BQVIsQ0FBZ0IsVUFBU2xCLEdBQVQsRUFBYztBQUMxQkYsTUFBQUEsZUFBZSxDQUFDUSxNQUFELEVBQVNOLEdBQVQsRUFBY1UsTUFBTSxDQUFDVixHQUFELENBQXBCLENBQWY7QUFDSCxLQUZEO0FBR0g7O0FBQ0QsU0FBT00sTUFBUDtBQUNIOztBQUNELFNBQVNhLHdCQUFULENBQWtDVCxNQUFsQyxFQUEwQ1UsUUFBMUMsRUFBb0Q7QUFDaEQsTUFBSVYsTUFBTSxJQUFJLElBQWQsRUFBb0IsT0FBTyxFQUFQOztBQUVwQixNQUFJSixNQUFNLEdBQUdlLDZCQUE2QixDQUFDWCxNQUFELEVBQVNVLFFBQVQsQ0FBMUM7O0FBQ0EsTUFBSXBCLEdBQUosRUFBU08sQ0FBVDs7QUFDQSxNQUFJdEIsTUFBTSxDQUFDNEIscUJBQVgsRUFBa0M7QUFDOUIsUUFBSVMsZ0JBQWdCLEdBQUdyQyxNQUFNLENBQUM0QixxQkFBUCxDQUE2QkgsTUFBN0IsQ0FBdkI7O0FBQ0EsU0FBSUgsQ0FBQyxHQUFHLENBQVIsRUFBV0EsQ0FBQyxHQUFHZSxnQkFBZ0IsQ0FBQ2IsTUFBaEMsRUFBd0NGLENBQUMsRUFBekMsRUFBNEM7QUFDeENQLE1BQUFBLEdBQUcsR0FBR3NCLGdCQUFnQixDQUFDZixDQUFELENBQXRCO0FBQ0EsVUFBSWEsUUFBUSxDQUFDRyxPQUFULENBQWlCdkIsR0FBakIsS0FBeUIsQ0FBN0IsRUFBZ0M7QUFDaEMsVUFBSSxDQUFDZixNQUFNLENBQUN1QyxTQUFQLENBQWlCQyxvQkFBakIsQ0FBc0NDLElBQXRDLENBQTJDaEIsTUFBM0MsRUFBbURWLEdBQW5ELENBQUwsRUFBOEQ7QUFDOURNLE1BQUFBLE1BQU0sQ0FBQ04sR0FBRCxDQUFOLEdBQWNVLE1BQU0sQ0FBQ1YsR0FBRCxDQUFwQjtBQUNIO0FBQ0o7O0FBQ0QsU0FBT00sTUFBUDtBQUNIOztBQUNELFNBQVNlLDZCQUFULENBQXVDWCxNQUF2QyxFQUErQ1UsUUFBL0MsRUFBeUQ7QUFDckQsTUFBSVYsTUFBTSxJQUFJLElBQWQsRUFBb0IsT0FBTyxFQUFQO0FBRXBCLE1BQUlKLE1BQU0sR0FBRyxFQUFiO0FBRUEsTUFBSXFCLFVBQVUsR0FBRzFDLE1BQU0sQ0FBQzJCLElBQVAsQ0FBWUYsTUFBWixDQUFqQjtBQUNBLE1BQUlWLEdBQUosRUFBU08sQ0FBVDs7QUFDQSxPQUFJQSxDQUFDLEdBQUcsQ0FBUixFQUFXQSxDQUFDLEdBQUdvQixVQUFVLENBQUNsQixNQUExQixFQUFrQ0YsQ0FBQyxFQUFuQyxFQUFzQztBQUNsQ1AsSUFBQUEsR0FBRyxHQUFHMkIsVUFBVSxDQUFDcEIsQ0FBRCxDQUFoQjtBQUNBLFFBQUlhLFFBQVEsQ0FBQ0csT0FBVCxDQUFpQnZCLEdBQWpCLEtBQXlCLENBQTdCLEVBQWdDO0FBQ2hDTSxJQUFBQSxNQUFNLENBQUNOLEdBQUQsQ0FBTixHQUFjVSxNQUFNLENBQUNWLEdBQUQsQ0FBcEI7QUFDSDs7QUFDRCxTQUFPTSxNQUFQO0FBQ0g7O0FBQ0QsTUFBTXNCLGVBQWUsR0FBRyxJQUFJQyxHQUFKLEVBQXhCOztBQUNBLElBQUksTUFBK0I7QUFDL0JDLEVBQUFBLE1BQU0sQ0FBQ0MscUJBQVAsR0FBK0IsSUFBL0I7QUFDSDs7QUFDRCxNQUFNQyxvQkFBb0IsR0FBRyxDQUN6QixNQUR5QixFQUV6QixPQUZ5QixFQUd6QkMsU0FIeUIsQ0FBN0I7QUFLQSxNQUFNQyxPQUFPLEdBQUcsSUFBSUMsR0FBSixDQUFRLENBQ3BCLENBQ0ksU0FESixFQUVJQyxhQUZKLENBRG9CLEVBS3BCLENBQ0ksT0FESixFQUVJQyxXQUZKLENBTG9CLEVBU3BCLENBQ0ksWUFESixFQUVJQyxnQkFGSixDQVRvQixFQWFwQixDQUNJLFFBREosRUFFSUMsWUFGSixDQWJvQixFQWlCcEIsQ0FDSSxRQURKLEVBRUlDLFlBRkosQ0FqQm9CLENBQVIsQ0FBaEI7QUFzQkEsTUFBTUMsbUJBQW1CLEdBQUcsQ0FDeEIsTUFEd0IsRUFFeEIsT0FGd0IsRUFHeEIsV0FId0IsRUFJeEIsWUFKd0IsRUFLeEJSLFNBTHdCLENBQTVCOztBQU9BLFNBQVNTLGVBQVQsQ0FBeUJDLEdBQXpCLEVBQThCO0FBQzFCLFNBQU9BLEdBQUcsQ0FBQ3RELE9BQUosS0FBZ0I0QyxTQUF2QjtBQUNIOztBQUNELFNBQVNXLGlCQUFULENBQTJCRCxHQUEzQixFQUFnQztBQUM1QixTQUFPQSxHQUFHLENBQUNBLEdBQUosS0FBWVYsU0FBbkI7QUFDSDs7QUFDRCxTQUFTWSxjQUFULENBQXdCRixHQUF4QixFQUE2QjtBQUN6QixTQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUFmLEtBQTRCRCxlQUFlLENBQUNDLEdBQUQsQ0FBZixJQUF3QkMsaUJBQWlCLENBQUNELEdBQUQsQ0FBckUsQ0FBUDtBQUNIOztBQUNELE1BQU07QUFBRUcsRUFBQUEsV0FBVyxFQUFFQyxpQkFBZjtBQUFtQ0MsRUFBQUEsVUFBVSxFQUFFQyxnQkFBL0M7QUFBa0VDLEVBQUFBLE1BQU0sRUFBRUMsWUFBMUU7QUFBeUZDLEVBQUFBLElBQUksRUFBRUMsVUFBL0Y7QUFBNEdDLEVBQUFBLE9BQU8sRUFBRUM7QUFBckgsSUFBMElDLDZLQUFBLElBQWlDNUQsWUFBWSxDQUFDK0Qsa0JBQTlMLEVBQ0E7O0FBQ0EsTUFBTUMsUUFBUSxHQUFHLENBQ2IsR0FBR2IsaUJBRFUsRUFFYixHQUFHRSxnQkFGVSxDQUFqQjtBQUlBRixpQkFBaUIsQ0FBQ2MsSUFBbEIsQ0FBdUIsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEtBQVFELENBQUMsR0FBR0MsQ0FBbkM7QUFFQUgsUUFBUSxDQUFDQyxJQUFULENBQWMsQ0FBQ0MsQ0FBRCxFQUFJQyxDQUFKLEtBQVFELENBQUMsR0FBR0MsQ0FBMUI7O0FBRUEsU0FBU0MsU0FBVCxDQUFtQkMsS0FBbkIsRUFBMEJDLE1BQTFCLEVBQWtDQyxLQUFsQyxFQUF5QztBQUNyQyxNQUFJQSxLQUFLLEtBQUtELE1BQU0sS0FBSyxNQUFYLElBQXFCQSxNQUFNLEtBQUssWUFBckMsQ0FBVCxFQUE2RDtBQUN6RDtBQUNBLFVBQU1FLGVBQWUsR0FBRyxvQkFBeEI7QUFDQSxVQUFNQyxZQUFZLEdBQUcsRUFBckI7O0FBQ0EsU0FBSSxJQUFJQyxLQUFSLEVBQWVBLEtBQUssR0FBR0YsZUFBZSxDQUFDRyxJQUFoQixDQUFxQkosS0FBckIsQ0FBdkIsRUFBb0RHLEtBQXBELEVBQTBEO0FBQ3RERCxNQUFBQSxZQUFZLENBQUNHLElBQWIsQ0FBa0JDLFFBQVEsQ0FBQ0gsS0FBSyxDQUFDLENBQUQsQ0FBTixDQUExQjtBQUNIOztBQUNELFFBQUlELFlBQVksQ0FBQzVELE1BQWpCLEVBQXlCO0FBQ3JCLFlBQU1pRSxhQUFhLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxDQUFTLEdBQUdQLFlBQVosSUFBNEIsSUFBbEQ7QUFDQSxhQUFPO0FBQ0hRLFFBQUFBLE1BQU0sRUFBRWpCLFFBQVEsQ0FBQzdDLE1BQVQsQ0FBaUIrRCxDQUFELElBQUtBLENBQUMsSUFBSS9CLGlCQUFpQixDQUFDLENBQUQsQ0FBakIsR0FBdUIyQixhQUFqRCxDQURMO0FBR0hLLFFBQUFBLElBQUksRUFBRTtBQUhILE9BQVA7QUFLSDs7QUFDRCxXQUFPO0FBQ0hGLE1BQUFBLE1BQU0sRUFBRWpCLFFBREw7QUFFSG1CLE1BQUFBLElBQUksRUFBRTtBQUZILEtBQVA7QUFJSDs7QUFDRCxNQUFJLE9BQU9kLEtBQVAsS0FBaUIsUUFBakIsSUFBNkJDLE1BQU0sS0FBSyxNQUF4QyxJQUFrREEsTUFBTSxLQUFLLFlBQWpFLEVBQStFO0FBQzNFLFdBQU87QUFDSFcsTUFBQUEsTUFBTSxFQUFFOUIsaUJBREw7QUFFSGdDLE1BQUFBLElBQUksRUFBRTtBQUZILEtBQVA7QUFJSDs7QUFDRCxRQUFNRixNQUFNLEdBQUcsQ0FDWCxHQUFHLElBQUloRCxHQUFKLEVBQVE7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQ0lvQyxLQURKLEVBRUlBLEtBQUssR0FBRztBQUFFO0FBRmQsSUFHRWUsR0FIRixDQUdPQyxDQUFELElBQUtyQixRQUFRLENBQUNzQixJQUFULENBQWVDLENBQUQsSUFBS0EsQ0FBQyxJQUFJRixDQUF4QixLQUNGckIsUUFBUSxDQUFDQSxRQUFRLENBQUNuRCxNQUFULEdBQWtCLENBQW5CLENBSmpCLENBUkcsQ0FEUSxDQUFmO0FBZ0JBLFNBQU87QUFDSG9FLElBQUFBLE1BREc7QUFFSEUsSUFBQUEsSUFBSSxFQUFFO0FBRkgsR0FBUDtBQUlIOztBQUNELFNBQVNLLGdCQUFULENBQTBCO0FBQUV6QyxFQUFBQSxHQUFGO0FBQVEwQyxFQUFBQSxXQUFSO0FBQXNCbkIsRUFBQUEsTUFBdEI7QUFBK0JELEVBQUFBLEtBQS9CO0FBQXVDcUIsRUFBQUEsT0FBdkM7QUFBaURuQixFQUFBQSxLQUFqRDtBQUF5RGpCLEVBQUFBO0FBQXpELENBQTFCLEVBQThGO0FBQzFGLE1BQUltQyxXQUFKLEVBQWlCO0FBQ2IsV0FBTztBQUNIMUMsTUFBQUEsR0FERztBQUVINEMsTUFBQUEsTUFBTSxFQUFFdEQsU0FGTDtBQUdIa0MsTUFBQUEsS0FBSyxFQUFFbEM7QUFISixLQUFQO0FBS0g7O0FBQ0QsUUFBTTtBQUFFNEMsSUFBQUEsTUFBRjtBQUFXRSxJQUFBQTtBQUFYLE1BQXFCZixTQUFTLENBQUNDLEtBQUQsRUFBUUMsTUFBUixFQUFnQkMsS0FBaEIsQ0FBcEM7QUFDQSxRQUFNcUIsSUFBSSxHQUFHWCxNQUFNLENBQUNwRSxNQUFQLEdBQWdCLENBQTdCO0FBQ0EsU0FBTztBQUNIMEQsSUFBQUEsS0FBSyxFQUFFLENBQUNBLEtBQUQsSUFBVVksSUFBSSxLQUFLLEdBQW5CLEdBQXlCLE9BQXpCLEdBQW1DWixLQUR2QztBQUVIb0IsSUFBQUEsTUFBTSxFQUFFVixNQUFNLENBQUNHLEdBQVAsQ0FBVyxDQUFDQyxDQUFELEVBQUkxRSxDQUFKLEtBQVMsR0FBRTJDLE1BQU0sQ0FBQztBQUM3QlAsTUFBQUEsR0FENkI7QUFFN0IyQyxNQUFBQSxPQUY2QjtBQUc3QnJCLE1BQUFBLEtBQUssRUFBRWdCO0FBSHNCLEtBQUQsQ0FJN0IsSUFBR0YsSUFBSSxLQUFLLEdBQVQsR0FBZUUsQ0FBZixHQUFtQjFFLENBQUMsR0FBRyxDQUFFLEdBQUV3RSxJQUFLLEVBSmxDLEVBS05VLElBTE0sQ0FLRCxJQUxDLENBRkw7QUFRSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTlDLElBQUFBLEdBQUcsRUFBRU8sTUFBTSxDQUFDO0FBQ1JQLE1BQUFBLEdBRFE7QUFFUjJDLE1BQUFBLE9BRlE7QUFHUnJCLE1BQUFBLEtBQUssRUFBRVksTUFBTSxDQUFDVyxJQUFEO0FBSEwsS0FBRDtBQWRSLEdBQVA7QUFvQkg7O0FBQ0QsU0FBU0UsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUI7QUFDZixNQUFJLE9BQU9BLENBQVAsS0FBYSxRQUFqQixFQUEyQjtBQUN2QixXQUFPQSxDQUFQO0FBQ0g7O0FBQ0QsTUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBakIsRUFBMkI7QUFDdkIsV0FBT2xCLFFBQVEsQ0FBQ2tCLENBQUQsRUFBSSxFQUFKLENBQWY7QUFDSDs7QUFDRCxTQUFPMUQsU0FBUDtBQUNIOztBQUNELFNBQVMyRCxrQkFBVCxDQUE0QkMsV0FBNUIsRUFBeUM7QUFDckMsUUFBTUMsSUFBSSxHQUFHNUQsT0FBTyxDQUFDNkQsR0FBUixDQUFZNUMsWUFBWixDQUFiOztBQUNBLE1BQUkyQyxJQUFKLEVBQVU7QUFDTixXQUFPQSxJQUFJLENBQUN6RixhQUFhLENBQUM7QUFDdEIyRixNQUFBQSxJQUFJLEVBQUUzQztBQURnQixLQUFELEVBRXRCd0MsV0FGc0IsQ0FBZCxDQUFYO0FBR0g7O0FBQ0QsUUFBTSxJQUFJSSxLQUFKLENBQVcseURBQXdEckcsWUFBWSxDQUFDc0csYUFBYixDQUEyQlQsSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FBc0MsZUFBY3RDLFlBQWEsRUFBcEksQ0FBTjtBQUNILEVBQ0Q7QUFDQTs7O0FBQ0EsU0FBU2dELGFBQVQsQ0FBdUJDLEdBQXZCLEVBQTRCekQsR0FBNUIsRUFBaUN1QixNQUFqQyxFQUF5Q21DLFdBQXpDLEVBQXNEQyxpQkFBdEQsRUFBeUU7QUFDckUsTUFBSSxDQUFDRixHQUFMLEVBQVU7QUFDTjtBQUNIOztBQUNELFFBQU1HLFVBQVUsR0FBRyxNQUFJO0FBQ25CLFFBQUksQ0FBQ0gsR0FBRyxDQUFDekQsR0FBSixDQUFRNkQsVUFBUixDQUFtQixPQUFuQixDQUFMLEVBQWtDO0FBQzlCLFlBQU1yQixDQUFDLEdBQUcsWUFBWWlCLEdBQVosR0FBa0JBLEdBQUcsQ0FBQ0ssTUFBSixFQUFsQixHQUFpQ0MsT0FBTyxDQUFDQyxPQUFSLEVBQTNDO0FBQ0F4QixNQUFBQSxDQUFDLENBQUN5QixLQUFGLENBQVEsTUFBSSxDQUNYLENBREQsRUFDR0MsSUFESCxDQUNRLE1BQUk7QUFDUixZQUFJUixXQUFXLEtBQUssTUFBcEIsRUFBNEI7QUFDeEJELFVBQUFBLEdBQUcsQ0FBQ1UsS0FBSixDQUFVL0YsTUFBVixHQUFtQixNQUFuQjtBQUNBcUYsVUFBQUEsR0FBRyxDQUFDVSxLQUFKLENBQVVDLGNBQVYsR0FBMkIsTUFBM0I7QUFDQVgsVUFBQUEsR0FBRyxDQUFDVSxLQUFKLENBQVVFLGVBQVYsR0FBNEIsTUFBNUI7QUFDSDs7QUFDRHBGLFFBQUFBLGVBQWUsQ0FBQ3FGLEdBQWhCLENBQW9CdEUsR0FBcEI7O0FBQ0EsWUFBSTJELGlCQUFKLEVBQXVCO0FBQ25CLGdCQUFNO0FBQUVZLFlBQUFBLFlBQUY7QUFBaUJDLFlBQUFBO0FBQWpCLGNBQW9DZixHQUExQyxDQURtQixDQUVuQjtBQUNBOztBQUNBRSxVQUFBQSxpQkFBaUIsQ0FBQztBQUNkWSxZQUFBQSxZQURjO0FBRWRDLFlBQUFBO0FBRmMsV0FBRCxDQUFqQjtBQUlIOztBQUNELGtCQUEyQztBQUN2QyxjQUFJQyxHQUFKOztBQUNBLGNBQUksQ0FBQ0EsR0FBRyxHQUFHaEIsR0FBRyxDQUFDaUIsYUFBWCxNQUE4QixJQUE5QixJQUFzQ0QsR0FBRyxLQUFLLEtBQUssQ0FBbkQsR0FBdUQsS0FBSyxDQUE1RCxHQUFnRUEsR0FBRyxDQUFDQyxhQUF4RSxFQUF1RjtBQUNuRixrQkFBTUMsTUFBTSxHQUFHQyxnQkFBZ0IsQ0FBQ25CLEdBQUcsQ0FBQ2lCLGFBQUosQ0FBa0JBLGFBQW5CLENBQS9COztBQUNBLGdCQUFJbkQsTUFBTSxLQUFLLFlBQVgsSUFBMkJvRCxNQUFNLENBQUNFLE9BQVAsS0FBbUIsTUFBbEQsRUFBMEQ7QUFDdERDLGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLG1CQUFrQi9FLEdBQUksMEhBQXBDO0FBQ0gsYUFGRCxNQUVPLElBQUl1QixNQUFNLEtBQUssTUFBWCxJQUFxQm9ELE1BQU0sQ0FBQ0ssUUFBUCxLQUFvQixVQUE3QyxFQUF5RDtBQUM1REYsY0FBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMsbUJBQWtCL0UsR0FBSSwyREFBMEQyRSxNQUFNLENBQUNLLFFBQVMsdUZBQTlHO0FBQ0g7QUFDSjtBQUNKO0FBQ0osT0E1QkQ7QUE2Qkg7QUFDSixHQWpDRDs7QUFrQ0EsTUFBSXZCLEdBQUcsQ0FBQ3dCLFFBQVIsRUFBa0I7QUFDZDtBQUNBO0FBQ0E7QUFDQXJCLElBQUFBLFVBQVU7QUFDYixHQUxELE1BS087QUFDSEgsSUFBQUEsR0FBRyxDQUFDeUIsTUFBSixHQUFhdEIsVUFBYjtBQUNIO0FBQ0o7O0FBQ0QsU0FBU2pILE1BQVQsQ0FBZ0J3SSxNQUFoQixFQUF3QjtBQUNwQixNQUFJO0FBQUVuRixJQUFBQSxHQUFGO0FBQVF3QixJQUFBQSxLQUFSO0FBQWdCa0IsSUFBQUEsV0FBVyxHQUFFLEtBQTdCO0FBQXFDMEMsSUFBQUEsUUFBUSxHQUFFLEtBQS9DO0FBQXVEQyxJQUFBQSxPQUF2RDtBQUFpRUMsSUFBQUEsWUFBWSxHQUFFLE9BQS9FO0FBQXlGQyxJQUFBQSxTQUF6RjtBQUFxRzVDLElBQUFBLE9BQXJHO0FBQStHckIsSUFBQUEsS0FBL0c7QUFBdUhrRSxJQUFBQSxNQUF2SDtBQUFnSUMsSUFBQUEsU0FBaEk7QUFBNElDLElBQUFBLGNBQTVJO0FBQTZKL0IsSUFBQUEsaUJBQTdKO0FBQWlMcEQsSUFBQUEsTUFBTSxHQUFFMEMsa0JBQXpMO0FBQThNUyxJQUFBQSxXQUFXLEdBQUUsT0FBM047QUFBcU9pQyxJQUFBQTtBQUFyTyxNQUFzUFIsTUFBMVA7QUFBQSxNQUFrUVMsR0FBRyxHQUFHcEgsd0JBQXdCLENBQUMyRyxNQUFELEVBQVMsQ0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixhQUFqQixFQUFnQyxVQUFoQyxFQUE0QyxTQUE1QyxFQUF1RCxjQUF2RCxFQUF1RSxXQUF2RSxFQUFvRixTQUFwRixFQUErRixPQUEvRixFQUF3RyxRQUF4RyxFQUFrSCxXQUFsSCxFQUErSCxnQkFBL0gsRUFBaUosbUJBQWpKLEVBQXNLLFFBQXRLLEVBQWdMLGFBQWhMLEVBQStMLGFBQS9MLENBQVQsQ0FBaFM7O0FBQ0EsTUFBSVUsSUFBSSxHQUFHRCxHQUFYO0FBQ0EsTUFBSXJFLE1BQU0sR0FBR0MsS0FBSyxHQUFHLFlBQUgsR0FBa0IsV0FBcEM7O0FBQ0EsTUFBSSxZQUFZcUUsSUFBaEIsRUFBc0I7QUFDbEI7QUFDQSxRQUFJQSxJQUFJLENBQUN0RSxNQUFULEVBQWlCQSxNQUFNLEdBQUdzRSxJQUFJLENBQUN0RSxNQUFkLENBRkMsQ0FHbEI7O0FBQ0EsV0FBT3NFLElBQUksQ0FBQyxRQUFELENBQVg7QUFDSDs7QUFDRCxNQUFJQyxTQUFTLEdBQUcsRUFBaEI7O0FBQ0EsTUFBSTVGLGNBQWMsQ0FBQ0YsR0FBRCxDQUFsQixFQUF5QjtBQUNyQixVQUFNK0YsZUFBZSxHQUFHaEcsZUFBZSxDQUFDQyxHQUFELENBQWYsR0FBdUJBLEdBQUcsQ0FBQ3RELE9BQTNCLEdBQXFDc0QsR0FBN0Q7O0FBQ0EsUUFBSSxDQUFDK0YsZUFBZSxDQUFDL0YsR0FBckIsRUFBMEI7QUFDdEIsWUFBTSxJQUFJc0QsS0FBSixDQUFXLDhJQUE2STBDLElBQUksQ0FBQ0MsU0FBTCxDQUFlRixlQUFmLENBQWdDLEVBQXhMLENBQU47QUFDSDs7QUFDREosSUFBQUEsV0FBVyxHQUFHQSxXQUFXLElBQUlJLGVBQWUsQ0FBQ0osV0FBN0M7QUFDQUcsSUFBQUEsU0FBUyxHQUFHQyxlQUFlLENBQUMvRixHQUE1Qjs7QUFDQSxRQUFJLENBQUN1QixNQUFELElBQVdBLE1BQU0sS0FBSyxNQUExQixFQUFrQztBQUM5QmlFLE1BQUFBLE1BQU0sR0FBR0EsTUFBTSxJQUFJTyxlQUFlLENBQUNQLE1BQW5DO0FBQ0FsRSxNQUFBQSxLQUFLLEdBQUdBLEtBQUssSUFBSXlFLGVBQWUsQ0FBQ3pFLEtBQWpDOztBQUNBLFVBQUksQ0FBQ3lFLGVBQWUsQ0FBQ1AsTUFBakIsSUFBMkIsQ0FBQ08sZUFBZSxDQUFDekUsS0FBaEQsRUFBdUQ7QUFDbkQsY0FBTSxJQUFJZ0MsS0FBSixDQUFXLDJKQUEwSjBDLElBQUksQ0FBQ0MsU0FBTCxDQUFlRixlQUFmLENBQWdDLEVBQXJNLENBQU47QUFDSDtBQUNKO0FBQ0o7O0FBQ0QvRixFQUFBQSxHQUFHLEdBQUcsT0FBT0EsR0FBUCxLQUFlLFFBQWYsR0FBMEJBLEdBQTFCLEdBQWdDOEYsU0FBdEM7QUFDQSxRQUFNSSxRQUFRLEdBQUduRCxNQUFNLENBQUN6QixLQUFELENBQXZCO0FBQ0EsUUFBTTZFLFNBQVMsR0FBR3BELE1BQU0sQ0FBQ3lDLE1BQUQsQ0FBeEI7QUFDQSxRQUFNWSxVQUFVLEdBQUdyRCxNQUFNLENBQUNKLE9BQUQsQ0FBekI7QUFDQSxNQUFJMEQsTUFBTSxHQUFHLENBQUNqQixRQUFELEtBQWNDLE9BQU8sS0FBSyxNQUFaLElBQXNCLE9BQU9BLE9BQVAsS0FBbUIsV0FBdkQsQ0FBYjs7QUFDQSxNQUFJckYsR0FBRyxDQUFDNkQsVUFBSixDQUFlLE9BQWYsS0FBMkI3RCxHQUFHLENBQUM2RCxVQUFKLENBQWUsT0FBZixDQUEvQixFQUF3RDtBQUNwRDtBQUNBbkIsSUFBQUEsV0FBVyxHQUFHLElBQWQ7QUFDQTJELElBQUFBLE1BQU0sR0FBRyxLQUFUO0FBQ0g7O0FBQ0QsTUFBSSxLQUFKLEVBQStELEVBRTlEOztBQUNELFlBQTJDO0FBQ3ZDLFFBQUksQ0FBQ3JHLEdBQUwsRUFBVTtBQUNOLFlBQU0sSUFBSXNELEtBQUosQ0FBVywwSEFBeUgwQyxJQUFJLENBQUNDLFNBQUwsQ0FBZTtBQUNySjNFLFFBQUFBLEtBRHFKO0FBRXJKa0UsUUFBQUEsTUFGcUo7QUFHcko3QyxRQUFBQTtBQUhxSixPQUFmLENBSXZJLEVBSkcsQ0FBTjtBQUtIOztBQUNELFFBQUksQ0FBQzdDLG1CQUFtQixDQUFDeUcsUUFBcEIsQ0FBNkJoRixNQUE3QixDQUFMLEVBQTJDO0FBQ3ZDLFlBQU0sSUFBSStCLEtBQUosQ0FBVyxtQkFBa0J0RCxHQUFJLDhDQUE2Q3VCLE1BQU8sc0JBQXFCekIsbUJBQW1CLENBQUN1QyxHQUFwQixDQUF3Qm1FLE1BQXhCLEVBQWdDMUQsSUFBaEMsQ0FBcUMsR0FBckMsQ0FBMEMsR0FBcEosQ0FBTjtBQUNIOztBQUNELFFBQUksT0FBT29ELFFBQVAsS0FBb0IsV0FBcEIsSUFBbUNPLEtBQUssQ0FBQ1AsUUFBRCxDQUF4QyxJQUFzRCxPQUFPQyxTQUFQLEtBQXFCLFdBQXJCLElBQW9DTSxLQUFLLENBQUNOLFNBQUQsQ0FBbkcsRUFBZ0g7QUFDNUcsWUFBTSxJQUFJN0MsS0FBSixDQUFXLG1CQUFrQnRELEdBQUksNkVBQWpDLENBQU47QUFDSDs7QUFDRCxRQUFJdUIsTUFBTSxLQUFLLE1BQVgsS0FBc0JELEtBQUssSUFBSWtFLE1BQS9CLENBQUosRUFBNEM7QUFDeENWLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLG1CQUFrQi9FLEdBQUksMkZBQXBDO0FBQ0g7O0FBQ0QsUUFBSSxDQUFDWCxvQkFBb0IsQ0FBQ2tILFFBQXJCLENBQThCbEIsT0FBOUIsQ0FBTCxFQUE2QztBQUN6QyxZQUFNLElBQUkvQixLQUFKLENBQVcsbUJBQWtCdEQsR0FBSSwrQ0FBOENxRixPQUFRLHNCQUFxQmhHLG9CQUFvQixDQUFDZ0QsR0FBckIsQ0FBeUJtRSxNQUF6QixFQUFpQzFELElBQWpDLENBQXNDLEdBQXRDLENBQTJDLEdBQXZKLENBQU47QUFDSDs7QUFDRCxRQUFJc0MsUUFBUSxJQUFJQyxPQUFPLEtBQUssTUFBNUIsRUFBb0M7QUFDaEMsWUFBTSxJQUFJL0IsS0FBSixDQUFXLG1CQUFrQnRELEdBQUksaUZBQWpDLENBQU47QUFDSDs7QUFDRCxRQUFJMEQsV0FBVyxLQUFLLE1BQXBCLEVBQTRCO0FBQ3hCLFVBQUluQyxNQUFNLEtBQUssTUFBWCxJQUFxQixDQUFDMkUsUUFBUSxJQUFJLENBQWIsS0FBbUJDLFNBQVMsSUFBSSxDQUFoQyxJQUFxQyxJQUE5RCxFQUFvRTtBQUNoRXJCLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLG1CQUFrQi9FLEdBQUksc0dBQXBDO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDMkYsV0FBTCxFQUFrQjtBQUNkLGNBQU1lLGNBQWMsR0FBRyxDQUNuQixNQURtQixFQUVuQixLQUZtQixFQUduQixNQUhtQixDQUF2QixDQUlFO0FBSkY7QUFNQSxjQUFNLElBQUlwRCxLQUFKLENBQVcsbUJBQWtCdEQsR0FBSTtBQUN2RDtBQUNBO0FBQ0EsbUdBQW1HMEcsY0FBYyxDQUFDNUQsSUFBZixDQUFvQixHQUFwQixDQUF5QjtBQUM1SDtBQUNBLGdGQUxzQixDQUFOO0FBTUg7QUFDSjs7QUFDRCxRQUFJLFNBQVMrQyxJQUFiLEVBQW1CO0FBQ2ZmLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLG1CQUFrQi9FLEdBQUksaUdBQXBDO0FBQ0g7O0FBQ0QsUUFBSSxXQUFXNkYsSUFBZixFQUFxQjtBQUNqQmYsTUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWMsbUJBQWtCL0UsR0FBSSx1RkFBcEM7QUFDSDs7QUFDRCxVQUFNMkcsSUFBSSxHQUFHM0UsSUFBSSxDQUFDNEUsS0FBTCxDQUFXNUUsSUFBSSxDQUFDNkUsTUFBTCxLQUFnQixJQUEzQixJQUFtQyxHQUFoRDs7QUFDQSxRQUFJLENBQUNuRSxXQUFELElBQWdCLENBQUNuQyxNQUFNLENBQUM7QUFDeEJQLE1BQUFBLEdBRHdCO0FBRXhCc0IsTUFBQUEsS0FBSyxFQUFFcUYsSUFGaUI7QUFHeEJoRSxNQUFBQSxPQUFPLEVBQUU7QUFIZSxLQUFELENBQU4sQ0FJbEI0RCxRQUprQixDQUlUSSxJQUFJLENBQUNHLFFBQUwsRUFKUyxDQUFyQixFQUk4QjtBQUMxQmhDLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLG1CQUFrQi9FLEdBQUkseUhBQXZCLEdBQW1KLCtFQUFoSztBQUNIO0FBQ0o7O0FBQ0QsUUFBTSxDQUFDK0csTUFBRCxFQUFTQyxhQUFULElBQTBCLENBQUMsR0FBRzlKLGdCQUFKLEVBQXNCK0osZUFBdEIsQ0FBc0M7QUFDbEVDLElBQUFBLFVBQVUsRUFBRTVCLFlBRHNEO0FBRWxFNkIsSUFBQUEsUUFBUSxFQUFFLENBQUNkO0FBRnVELEdBQXRDLENBQWhDO0FBSUEsUUFBTWUsU0FBUyxHQUFHLENBQUNmLE1BQUQsSUFBV1csYUFBN0I7QUFDQSxNQUFJSyxZQUFKO0FBQ0EsTUFBSUMsVUFBSjtBQUNBLE1BQUlDLFFBQUo7QUFDQSxNQUFJQyxRQUFRLEdBQUc7QUFDWHhDLElBQUFBLFFBQVEsRUFBRSxVQURDO0FBRVh5QyxJQUFBQSxHQUFHLEVBQUUsQ0FGTTtBQUdYQyxJQUFBQSxJQUFJLEVBQUUsQ0FISztBQUlYQyxJQUFBQSxNQUFNLEVBQUUsQ0FKRztBQUtYQyxJQUFBQSxLQUFLLEVBQUUsQ0FMSTtBQU1YQyxJQUFBQSxTQUFTLEVBQUUsWUFOQTtBQU9YQyxJQUFBQSxPQUFPLEVBQUUsQ0FQRTtBQVFYQyxJQUFBQSxNQUFNLEVBQUUsTUFSRztBQVNYQyxJQUFBQSxNQUFNLEVBQUUsTUFURztBQVVYbkQsSUFBQUEsT0FBTyxFQUFFLE9BVkU7QUFXWHZELElBQUFBLEtBQUssRUFBRSxDQVhJO0FBWVhrRSxJQUFBQSxNQUFNLEVBQUUsQ0FaRztBQWFYeUMsSUFBQUEsUUFBUSxFQUFFLE1BYkM7QUFjWEMsSUFBQUEsUUFBUSxFQUFFLE1BZEM7QUFlWEMsSUFBQUEsU0FBUyxFQUFFLE1BZkE7QUFnQlhDLElBQUFBLFNBQVMsRUFBRSxNQWhCQTtBQWlCWDNDLElBQUFBLFNBakJXO0FBa0JYQyxJQUFBQTtBQWxCVyxHQUFmO0FBb0JBLFFBQU0yQyxTQUFTLEdBQUczRSxXQUFXLEtBQUssTUFBaEIsR0FBeUI7QUFDdkN0RixJQUFBQSxNQUFNLEVBQUUsWUFEK0I7QUFFdkNnRyxJQUFBQSxjQUFjLEVBQUVxQixTQUFTLElBQUksT0FGVTtBQUd2Q3BCLElBQUFBLGVBQWUsRUFBRyxRQUFPc0IsV0FBWSxJQUhFO0FBSXZDMkMsSUFBQUEsa0JBQWtCLEVBQUU1QyxjQUFjLElBQUk7QUFKQyxHQUF6QixHQUtkLEVBTEo7O0FBT0EsTUFBSW5FLE1BQU0sS0FBSyxNQUFmLEVBQXVCO0FBQ25CO0FBQ0E4RixJQUFBQSxZQUFZLEdBQUc7QUFDWHhDLE1BQUFBLE9BQU8sRUFBRSxPQURFO0FBRVgwRCxNQUFBQSxRQUFRLEVBQUUsUUFGQztBQUdYdkQsTUFBQUEsUUFBUSxFQUFFLFVBSEM7QUFJWHlDLE1BQUFBLEdBQUcsRUFBRSxDQUpNO0FBS1hDLE1BQUFBLElBQUksRUFBRSxDQUxLO0FBTVhDLE1BQUFBLE1BQU0sRUFBRSxDQU5HO0FBT1hDLE1BQUFBLEtBQUssRUFBRSxDQVBJO0FBUVhDLE1BQUFBLFNBQVMsRUFBRSxZQVJBO0FBU1hHLE1BQUFBLE1BQU0sRUFBRTtBQVRHLEtBQWY7QUFXSCxHQWJELE1BYU8sSUFBSSxPQUFPOUIsUUFBUCxLQUFvQixXQUFwQixJQUFtQyxPQUFPQyxTQUFQLEtBQXFCLFdBQTVELEVBQXlFO0FBQzVFO0FBQ0EsVUFBTXFDLFFBQVEsR0FBR3JDLFNBQVMsR0FBR0QsUUFBN0I7QUFDQSxVQUFNdUMsVUFBVSxHQUFHaEMsS0FBSyxDQUFDK0IsUUFBRCxDQUFMLEdBQWtCLE1BQWxCLEdBQTRCLEdBQUVBLFFBQVEsR0FBRyxHQUFJLEdBQWhFOztBQUNBLFFBQUlqSCxNQUFNLEtBQUssWUFBZixFQUE2QjtBQUN6QjtBQUNBOEYsTUFBQUEsWUFBWSxHQUFHO0FBQ1h4QyxRQUFBQSxPQUFPLEVBQUUsT0FERTtBQUVYMEQsUUFBQUEsUUFBUSxFQUFFLFFBRkM7QUFHWHZELFFBQUFBLFFBQVEsRUFBRSxVQUhDO0FBSVg2QyxRQUFBQSxTQUFTLEVBQUUsWUFKQTtBQUtYRyxRQUFBQSxNQUFNLEVBQUU7QUFMRyxPQUFmO0FBT0FWLE1BQUFBLFVBQVUsR0FBRztBQUNUekMsUUFBQUEsT0FBTyxFQUFFLE9BREE7QUFFVGdELFFBQUFBLFNBQVMsRUFBRSxZQUZGO0FBR1RZLFFBQUFBO0FBSFMsT0FBYjtBQUtILEtBZEQsTUFjTyxJQUFJbEgsTUFBTSxLQUFLLFdBQWYsRUFBNEI7QUFDL0I7QUFDQThGLE1BQUFBLFlBQVksR0FBRztBQUNYeEMsUUFBQUEsT0FBTyxFQUFFLGNBREU7QUFFWHFELFFBQUFBLFFBQVEsRUFBRSxNQUZDO0FBR1hLLFFBQUFBLFFBQVEsRUFBRSxRQUhDO0FBSVh2RCxRQUFBQSxRQUFRLEVBQUUsVUFKQztBQUtYNkMsUUFBQUEsU0FBUyxFQUFFLFlBTEE7QUFNWEcsUUFBQUEsTUFBTSxFQUFFO0FBTkcsT0FBZjtBQVFBVixNQUFBQSxVQUFVLEdBQUc7QUFDVE8sUUFBQUEsU0FBUyxFQUFFLFlBREY7QUFFVGhELFFBQUFBLE9BQU8sRUFBRSxPQUZBO0FBR1RxRCxRQUFBQSxRQUFRLEVBQUU7QUFIRCxPQUFiO0FBS0FYLE1BQUFBLFFBQVEsR0FBSSxlQUFjckIsUUFBUyxhQUFZQyxTQUFVLHNEQUF6RDtBQUNILEtBaEJNLE1BZ0JBLElBQUk1RSxNQUFNLEtBQUssT0FBZixFQUF3QjtBQUMzQjtBQUNBOEYsTUFBQUEsWUFBWSxHQUFHO0FBQ1hrQixRQUFBQSxRQUFRLEVBQUUsUUFEQztBQUVYVixRQUFBQSxTQUFTLEVBQUUsWUFGQTtBQUdYaEQsUUFBQUEsT0FBTyxFQUFFLGNBSEU7QUFJWEcsUUFBQUEsUUFBUSxFQUFFLFVBSkM7QUFLWDFELFFBQUFBLEtBQUssRUFBRTRFLFFBTEk7QUFNWFYsUUFBQUEsTUFBTSxFQUFFVztBQU5HLE9BQWY7QUFRSDtBQUNKLEdBN0NNLE1BNkNBO0FBQ0g7QUFDQSxjQUEyQztBQUN2QyxZQUFNLElBQUk3QyxLQUFKLENBQVcsbUJBQWtCdEQsR0FBSSx5RUFBakMsQ0FBTjtBQUNIO0FBQ0o7O0FBQ0QsTUFBSTBJLGFBQWEsR0FBRztBQUNoQjFJLElBQUFBLEdBQUcsRUFBRSxnRkFEVztBQUVoQjRDLElBQUFBLE1BQU0sRUFBRXRELFNBRlE7QUFHaEJrQyxJQUFBQSxLQUFLLEVBQUVsQztBQUhTLEdBQXBCOztBQUtBLE1BQUk4SCxTQUFKLEVBQWU7QUFDWHNCLElBQUFBLGFBQWEsR0FBR2pHLGdCQUFnQixDQUFDO0FBQzdCekMsTUFBQUEsR0FENkI7QUFFN0IwQyxNQUFBQSxXQUY2QjtBQUc3Qm5CLE1BQUFBLE1BSDZCO0FBSTdCRCxNQUFBQSxLQUFLLEVBQUU0RSxRQUpzQjtBQUs3QnZELE1BQUFBLE9BQU8sRUFBRXlELFVBTG9CO0FBTTdCNUUsTUFBQUEsS0FONkI7QUFPN0JqQixNQUFBQTtBQVA2QixLQUFELENBQWhDO0FBU0g7O0FBQ0QsTUFBSW9JLFNBQVMsR0FBRzNJLEdBQWhCO0FBQ0EsU0FBTyxhQUFjcEQsTUFBTSxDQUFDRixPQUFQLENBQWVrTSxhQUFmLENBQTZCLEtBQTdCLEVBQW9DO0FBQ3JEekUsSUFBQUEsS0FBSyxFQUFFa0Q7QUFEOEMsR0FBcEMsRUFFbEJDLFVBQVUsR0FBRyxhQUFjMUssTUFBTSxDQUFDRixPQUFQLENBQWVrTSxhQUFmLENBQTZCLEtBQTdCLEVBQW9DO0FBQzlEekUsSUFBQUEsS0FBSyxFQUFFbUQ7QUFEdUQsR0FBcEMsRUFFM0JDLFFBQVEsR0FBRyxhQUFjM0ssTUFBTSxDQUFDRixPQUFQLENBQWVrTSxhQUFmLENBQTZCLEtBQTdCLEVBQW9DO0FBQzVEekUsSUFBQUEsS0FBSyxFQUFFO0FBQ0grRCxNQUFBQSxRQUFRLEVBQUUsTUFEUDtBQUVIckQsTUFBQUEsT0FBTyxFQUFFLE9BRk47QUFHSG1ELE1BQUFBLE1BQU0sRUFBRSxDQUhMO0FBSUhELE1BQUFBLE1BQU0sRUFBRSxNQUpMO0FBS0hELE1BQUFBLE9BQU8sRUFBRTtBQUxOLEtBRHFEO0FBUTVEZSxJQUFBQSxHQUFHLEVBQUUsRUFSdUQ7QUFTNUQsbUJBQWUsSUFUNkM7QUFVNUQ3SSxJQUFBQSxHQUFHLEVBQUcsNkJBQTRCLENBQUMsR0FBR2hELFNBQUosRUFBZThMLFFBQWYsQ0FBd0J2QixRQUF4QixDQUFrQztBQVZSLEdBQXBDLENBQWpCLEdBV04sSUFieUIsQ0FBakIsR0FhQSxJQWZRLEVBZUYsYUFBYzNLLE1BQU0sQ0FBQ0YsT0FBUCxDQUFla00sYUFBZixDQUE2QixLQUE3QixFQUFvQ3RNLE1BQU0sQ0FBQ3lNLE1BQVAsQ0FBYyxFQUFkLEVBQ2xFbEQsSUFEa0UsRUFDNUQ2QyxhQUQ0RCxFQUM3QztBQUNwQk0sSUFBQUEsUUFBUSxFQUFFLE9BRFU7QUFFcEIsaUJBQWF6SCxNQUZPO0FBR3BCZ0UsSUFBQUEsU0FBUyxFQUFFQSxTQUhTO0FBSXBCZCxJQUFBQSxHQUFHLEVBQUdoQixHQUFELElBQU87QUFDUnNELE1BQUFBLE1BQU0sQ0FBQ3RELEdBQUQsQ0FBTjtBQUNBRCxNQUFBQSxhQUFhLENBQUNDLEdBQUQsRUFBTWtGLFNBQU4sRUFBaUJwSCxNQUFqQixFQUF5Qm1DLFdBQXpCLEVBQXNDQyxpQkFBdEMsQ0FBYjtBQUNILEtBUG1CO0FBUXBCUSxJQUFBQSxLQUFLLEVBQUV6RyxhQUFhLENBQUMsRUFBRCxFQUNqQjhKLFFBRGlCLEVBQ1BhLFNBRE87QUFSQSxHQUQ2QyxDQUFwQyxDQWZaLEVBMEJoQixhQUFjekwsTUFBTSxDQUFDRixPQUFQLENBQWVrTSxhQUFmLENBQTZCLFVBQTdCLEVBQXlDLElBQXpDLEVBQStDLGFBQWNoTSxNQUFNLENBQUNGLE9BQVAsQ0FBZWtNLGFBQWYsQ0FBNkIsS0FBN0IsRUFBb0N0TSxNQUFNLENBQUN5TSxNQUFQLENBQWMsRUFBZCxFQUNqSGxELElBRGlILEVBQzNHcEQsZ0JBQWdCLENBQUM7QUFDdEJ6QyxJQUFBQSxHQURzQjtBQUV0QjBDLElBQUFBLFdBRnNCO0FBR3RCbkIsSUFBQUEsTUFIc0I7QUFJdEJELElBQUFBLEtBQUssRUFBRTRFLFFBSmU7QUFLdEJ2RCxJQUFBQSxPQUFPLEVBQUV5RCxVQUxhO0FBTXRCNUUsSUFBQUEsS0FOc0I7QUFPdEJqQixJQUFBQTtBQVBzQixHQUFELENBRDJGLEVBU2hIO0FBQ0F5SSxJQUFBQSxRQUFRLEVBQUUsT0FEVjtBQUVBLGlCQUFhekgsTUFGYjtBQUdBNEMsSUFBQUEsS0FBSyxFQUFFcUQsUUFIUDtBQUlBakMsSUFBQUEsU0FBUyxFQUFFQSxTQUpYO0FBS0FGLElBQUFBLE9BQU8sRUFBRUEsT0FBTyxJQUFJO0FBTHBCLEdBVGdILENBQXBDLENBQTdELENBMUJFLEVBeUNmRCxRQUFRLEdBQUc7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFBY3hJLEVBQUFBLE1BQU0sQ0FBQ0YsT0FBUCxDQUFla00sYUFBZixDQUE2QjdMLEtBQUssQ0FBQ0wsT0FBbkMsRUFBNEMsSUFBNUMsRUFBa0QsYUFBY0UsTUFBTSxDQUFDRixPQUFQLENBQWVrTSxhQUFmLENBQTZCLE1BQTdCLEVBQXFDO0FBQy9HdkwsSUFBQUEsR0FBRyxFQUFFLFlBQVlxTCxhQUFhLENBQUMxSSxHQUExQixHQUFnQzBJLGFBQWEsQ0FBQzlGLE1BQTlDLEdBQXVEOEYsYUFBYSxDQUFDbEgsS0FEcUM7QUFFL0d5SCxJQUFBQSxHQUFHLEVBQUUsU0FGMEc7QUFHL0dDLElBQUFBLEVBQUUsRUFBRSxPQUgyRztBQUkvR0MsSUFBQUEsSUFBSSxFQUFFVCxhQUFhLENBQUM5RixNQUFkLEdBQXVCdEQsU0FBdkIsR0FBbUNvSixhQUFhLENBQUMxSSxHQUp3RDtBQUsvRztBQUNBb0osSUFBQUEsV0FBVyxFQUFFVixhQUFhLENBQUM5RixNQU5vRjtBQU8vRztBQUNBeUcsSUFBQUEsVUFBVSxFQUFFWCxhQUFhLENBQUNsSDtBQVJxRixHQUFyQyxDQUFoRSxDQUxBLEdBY1IsSUF2RGUsQ0FBckI7QUF3REg7O0FBQ0QsU0FBUzhILFlBQVQsQ0FBc0J0SixHQUF0QixFQUEyQjtBQUN2QixTQUFPQSxHQUFHLENBQUMsQ0FBRCxDQUFILEtBQVcsR0FBWCxHQUFpQkEsR0FBRyxDQUFDdUosS0FBSixDQUFVLENBQVYsQ0FBakIsR0FBZ0N2SixHQUF2QztBQUNIOztBQUNELFNBQVNOLFdBQVQsQ0FBcUI7QUFBRTJELEVBQUFBLElBQUY7QUFBU3JELEVBQUFBLEdBQVQ7QUFBZXNCLEVBQUFBLEtBQWY7QUFBdUJxQixFQUFBQTtBQUF2QixDQUFyQixFQUF3RDtBQUNwRDtBQUNBLFFBQU02RyxHQUFHLEdBQUcsSUFBSUMsR0FBSixDQUFTLEdBQUVwRyxJQUFLLEdBQUVpRyxZQUFZLENBQUN0SixHQUFELENBQU0sRUFBcEMsQ0FBWjtBQUNBLFFBQU0wSixNQUFNLEdBQUdGLEdBQUcsQ0FBQ0csWUFBbkI7QUFDQUQsRUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsTUFBWCxFQUFtQkYsTUFBTSxDQUFDdEcsR0FBUCxDQUFXLE1BQVgsS0FBc0IsUUFBekM7QUFDQXNHLEVBQUFBLE1BQU0sQ0FBQ0UsR0FBUCxDQUFXLEtBQVgsRUFBa0JGLE1BQU0sQ0FBQ3RHLEdBQVAsQ0FBVyxLQUFYLEtBQXFCLEtBQXZDO0FBQ0FzRyxFQUFBQSxNQUFNLENBQUNFLEdBQVAsQ0FBVyxHQUFYLEVBQWdCRixNQUFNLENBQUN0RyxHQUFQLENBQVcsR0FBWCxLQUFtQjlCLEtBQUssQ0FBQ3dGLFFBQU4sRUFBbkM7O0FBQ0EsTUFBSW5FLE9BQUosRUFBYTtBQUNUK0csSUFBQUEsTUFBTSxDQUFDRSxHQUFQLENBQVcsR0FBWCxFQUFnQmpILE9BQU8sQ0FBQ21FLFFBQVIsRUFBaEI7QUFDSDs7QUFDRCxTQUFPMEMsR0FBRyxDQUFDTCxJQUFYO0FBQ0g7O0FBQ0QsU0FBU3ZKLFlBQVQsQ0FBc0I7QUFBRXlELEVBQUFBLElBQUY7QUFBU3JELEVBQUFBLEdBQVQ7QUFBZXNCLEVBQUFBO0FBQWYsQ0FBdEIsRUFBK0M7QUFDM0MsU0FBUSxHQUFFK0IsSUFBSyxHQUFFaUcsWUFBWSxDQUFDdEosR0FBRCxDQUFNLFlBQVdzQixLQUFNLEVBQXBEO0FBQ0g7O0FBQ0QsU0FBUzNCLGdCQUFULENBQTBCO0FBQUUwRCxFQUFBQSxJQUFGO0FBQVNyRCxFQUFBQSxHQUFUO0FBQWVzQixFQUFBQSxLQUFmO0FBQXVCcUIsRUFBQUE7QUFBdkIsQ0FBMUIsRUFBNkQ7QUFDekQ7QUFDQSxRQUFNK0csTUFBTSxHQUFHLENBQ1gsUUFEVyxFQUVYLFNBRlcsRUFHWCxPQUFPcEksS0FISSxFQUlYLFFBQVFxQixPQUFPLElBQUksTUFBbkIsQ0FKVyxDQUFmO0FBTUEsTUFBSWtILFlBQVksR0FBR0gsTUFBTSxDQUFDNUcsSUFBUCxDQUFZLEdBQVosSUFBbUIsR0FBdEM7QUFDQSxTQUFRLEdBQUVPLElBQUssR0FBRXdHLFlBQWEsR0FBRVAsWUFBWSxDQUFDdEosR0FBRCxDQUFNLEVBQWxEO0FBQ0g7O0FBQ0QsU0FBU0gsWUFBVCxDQUFzQjtBQUFFRyxFQUFBQTtBQUFGLENBQXRCLEVBQWdDO0FBQzVCLFFBQU0sSUFBSXNELEtBQUosQ0FBVyxtQkFBa0J0RCxHQUFJLDZCQUF2QixHQUF1RCx5RUFBakUsQ0FBTjtBQUNIOztBQUNELFNBQVNQLGFBQVQsQ0FBdUI7QUFBRTRELEVBQUFBLElBQUY7QUFBU3JELEVBQUFBLEdBQVQ7QUFBZXNCLEVBQUFBLEtBQWY7QUFBdUJxQixFQUFBQTtBQUF2QixDQUF2QixFQUEwRDtBQUN0RCxZQUEyQztBQUN2QyxVQUFNbUgsYUFBYSxHQUFHLEVBQXRCLENBRHVDLENBRXZDOztBQUNBLFFBQUksQ0FBQzlKLEdBQUwsRUFBVThKLGFBQWEsQ0FBQ2pJLElBQWQsQ0FBbUIsS0FBbkI7QUFDVixRQUFJLENBQUNQLEtBQUwsRUFBWXdJLGFBQWEsQ0FBQ2pJLElBQWQsQ0FBbUIsT0FBbkI7O0FBQ1osUUFBSWlJLGFBQWEsQ0FBQ2hNLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDMUIsWUFBTSxJQUFJd0YsS0FBSixDQUFXLG9DQUFtQ3dHLGFBQWEsQ0FBQ2hILElBQWQsQ0FBbUIsSUFBbkIsQ0FBeUIsZ0dBQStGa0QsSUFBSSxDQUFDQyxTQUFMLENBQWU7QUFDdkxqRyxRQUFBQSxHQUR1TDtBQUV2THNCLFFBQUFBLEtBRnVMO0FBR3ZMcUIsUUFBQUE7QUFIdUwsT0FBZixDQUl6SyxFQUpHLENBQU47QUFLSDs7QUFDRCxRQUFJM0MsR0FBRyxDQUFDNkQsVUFBSixDQUFlLElBQWYsQ0FBSixFQUEwQjtBQUN0QixZQUFNLElBQUlQLEtBQUosQ0FBVyx3QkFBdUJ0RCxHQUFJLDBHQUF0QyxDQUFOO0FBQ0g7O0FBQ0QsUUFBSSxDQUFDQSxHQUFHLENBQUM2RCxVQUFKLENBQWUsR0FBZixDQUFELElBQXdCakQsYUFBNUIsRUFBMkM7QUFDdkMsVUFBSW1KLFNBQUo7O0FBQ0EsVUFBSTtBQUNBQSxRQUFBQSxTQUFTLEdBQUcsSUFBSU4sR0FBSixDQUFRekosR0FBUixDQUFaO0FBQ0gsT0FGRCxDQUVFLE9BQU9nSyxHQUFQLEVBQVk7QUFDVmxGLFFBQUFBLE9BQU8sQ0FBQ21GLEtBQVIsQ0FBY0QsR0FBZDtBQUNBLGNBQU0sSUFBSTFHLEtBQUosQ0FBVyx3QkFBdUJ0RCxHQUFJLGlJQUF0QyxDQUFOO0FBQ0g7O0FBQ0QsVUFBSSxTQUFtQyxDQUFDWSxhQUFhLENBQUMyRixRQUFkLENBQXVCd0QsU0FBUyxDQUFDRyxRQUFqQyxDQUF4QyxFQUFvRjtBQUNoRixjQUFNLElBQUk1RyxLQUFKLENBQVcscUJBQW9CdEQsR0FBSSxrQ0FBaUMrSixTQUFTLENBQUNHLFFBQVMsK0RBQTdFLEdBQStJLDhFQUF6SixDQUFOO0FBQ0g7QUFDSjtBQUNKOztBQUNELFNBQVEsR0FBRTdHLElBQUssUUFBTzhHLGtCQUFrQixDQUFDbkssR0FBRCxDQUFNLE1BQUtzQixLQUFNLE1BQUtxQixPQUFPLElBQUksRUFBRyxFQUE1RTtBQUNIOzs7Ozs7Ozs7OztBQ2htQlk7O0FBQ2JyRyw4Q0FBNkM7QUFDekNHLEVBQUFBLEtBQUssRUFBRTtBQURrQyxDQUE3QztBQUdBRCxlQUFBLEdBQWtCLEtBQUssQ0FBdkI7O0FBQ0EsSUFBSUksTUFBTSxHQUFHQyxzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQyxvQkFBRCxDQUFSLENBQW5DOztBQUNBLElBQUlzTixPQUFPLEdBQUd0TixtQkFBTyxDQUFDLHlGQUFELENBQXJCOztBQUNBLElBQUl1TixRQUFRLEdBQUd2TixtQkFBTyxDQUFDLDJEQUFELENBQXRCOztBQUNBLElBQUlJLGdCQUFnQixHQUFHSixtQkFBTyxDQUFDLCtFQUFELENBQTlCOztBQUNBLFNBQVNELHNCQUFULENBQWdDTyxHQUFoQyxFQUFxQztBQUNqQyxTQUFPQSxHQUFHLElBQUlBLEdBQUcsQ0FBQ0ssVUFBWCxHQUF3QkwsR0FBeEIsR0FBOEI7QUFDakNWLElBQUFBLE9BQU8sRUFBRVU7QUFEd0IsR0FBckM7QUFHSDs7QUFDRCxNQUFNa04sVUFBVSxHQUFHLEVBQW5COztBQUVBLFNBQVNDLFFBQVQsQ0FBa0JDLE1BQWxCLEVBQTBCckIsSUFBMUIsRUFBZ0NELEVBQWhDLEVBQW9DdUIsT0FBcEMsRUFBNkM7QUFDekMsTUFBSSxJQUFKLEVBQThDO0FBQzlDLE1BQUksQ0FBQyxDQUFDLEdBQUdMLE9BQUosRUFBYU0sVUFBYixDQUF3QnZCLElBQXhCLENBQUwsRUFBb0MsT0FGSyxDQUd6QztBQUNBO0FBQ0E7QUFDQTs7QUFDQXFCLEVBQUFBLE1BQU0sQ0FBQ0QsUUFBUCxDQUFnQnBCLElBQWhCLEVBQXNCRCxFQUF0QixFQUEwQnVCLE9BQTFCLEVBQW1DeEcsS0FBbkMsQ0FBMEMrRixHQUFELElBQU87QUFDNUMsY0FBMkM7QUFDdkM7QUFDQSxZQUFNQSxHQUFOO0FBQ0g7QUFDSixHQUxEO0FBTUEsUUFBTVcsU0FBUyxHQUFHRixPQUFPLElBQUksT0FBT0EsT0FBTyxDQUFDRyxNQUFmLEtBQTBCLFdBQXJDLEdBQW1ESCxPQUFPLENBQUNHLE1BQTNELEdBQW9FSixNQUFNLElBQUlBLE1BQU0sQ0FBQ0ksTUFBdkcsQ0FieUMsQ0FjekM7O0FBQ0FOLEVBQUFBLFVBQVUsQ0FBQ25CLElBQUksR0FBRyxHQUFQLEdBQWFELEVBQWIsSUFBbUJ5QixTQUFTLEdBQUcsTUFBTUEsU0FBVCxHQUFxQixFQUFqRCxDQUFELENBQVYsR0FBbUUsSUFBbkU7QUFDSDs7QUFDRCxTQUFTRSxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUM1QixRQUFNO0FBQUVuTixJQUFBQTtBQUFGLE1BQWNtTixLQUFLLENBQUNDLGFBQTFCO0FBQ0EsU0FBT3BOLE1BQU0sSUFBSUEsTUFBTSxLQUFLLE9BQXJCLElBQWdDbU4sS0FBSyxDQUFDRSxPQUF0QyxJQUFpREYsS0FBSyxDQUFDRyxPQUF2RCxJQUFrRUgsS0FBSyxDQUFDSSxRQUF4RSxJQUFvRkosS0FBSyxDQUFDSyxNQUExRixJQUFvR0wsS0FBSyxDQUFDTSxXQUFOLElBQXFCTixLQUFLLENBQUNNLFdBQU4sQ0FBa0JDLEtBQWxCLEtBQTRCLENBQTVKO0FBQ0g7O0FBQ0QsU0FBU0MsV0FBVCxDQUFxQkMsQ0FBckIsRUFBd0JmLE1BQXhCLEVBQWdDckIsSUFBaEMsRUFBc0NELEVBQXRDLEVBQTBDc0MsT0FBMUMsRUFBbURDLE9BQW5ELEVBQTREQyxNQUE1RCxFQUFvRWQsTUFBcEUsRUFBNEU7QUFDeEUsUUFBTTtBQUFFZSxJQUFBQTtBQUFGLE1BQWdCSixDQUFDLENBQUNSLGFBQXhCOztBQUNBLE1BQUlZLFFBQVEsS0FBSyxHQUFiLEtBQXFCZCxlQUFlLENBQUNVLENBQUQsQ0FBZixJQUFzQixDQUFDLENBQUMsR0FBR25CLE9BQUosRUFBYU0sVUFBYixDQUF3QnZCLElBQXhCLENBQTVDLENBQUosRUFBZ0Y7QUFDNUU7QUFDQTtBQUNIOztBQUNEb0MsRUFBQUEsQ0FBQyxDQUFDSyxjQUFGLEdBTndFLENBT3hFOztBQUNBLE1BQUlGLE1BQU0sSUFBSSxJQUFWLElBQWtCeEMsRUFBRSxDQUFDdEssT0FBSCxDQUFXLEdBQVgsS0FBbUIsQ0FBekMsRUFBNEM7QUFDeEM4TSxJQUFBQSxNQUFNLEdBQUcsS0FBVDtBQUNILEdBVnVFLENBV3hFOzs7QUFDQWxCLEVBQUFBLE1BQU0sQ0FBQ2dCLE9BQU8sR0FBRyxTQUFILEdBQWUsTUFBdkIsQ0FBTixDQUFxQ3JDLElBQXJDLEVBQTJDRCxFQUEzQyxFQUErQztBQUMzQ3VDLElBQUFBLE9BRDJDO0FBRTNDYixJQUFBQSxNQUYyQztBQUczQ2MsSUFBQUE7QUFIMkMsR0FBL0M7QUFLSDs7QUFDRCxTQUFTRyxJQUFULENBQWNDLEtBQWQsRUFBcUI7QUFDakIsWUFBMkM7QUFDdkMsYUFBU0MsZUFBVCxDQUF5QkMsSUFBekIsRUFBK0I7QUFDM0IsYUFBTyxJQUFJMUksS0FBSixDQUFXLGdDQUErQjBJLElBQUksQ0FBQzNPLEdBQUksZ0JBQWUyTyxJQUFJLENBQUNDLFFBQVMsNkJBQTRCRCxJQUFJLENBQUNFLE1BQU8sYUFBOUcsSUFBOEgsU0FBZ0MsQ0FBaEMsR0FBcUcsRUFBbk8sQ0FBVixDQUFQO0FBQ0gsS0FIc0MsQ0FJdkM7OztBQUNBLFVBQU1DLGtCQUFrQixHQUFHO0FBQ3ZCaEQsTUFBQUEsSUFBSSxFQUFFO0FBRGlCLEtBQTNCO0FBR0EsVUFBTWlELGFBQWEsR0FBRzlQLE1BQU0sQ0FBQzJCLElBQVAsQ0FBWWtPLGtCQUFaLENBQXRCO0FBQ0FDLElBQUFBLGFBQWEsQ0FBQzdOLE9BQWQsQ0FBdUJsQixHQUFELElBQU87QUFDekIsVUFBSUEsR0FBRyxLQUFLLE1BQVosRUFBb0I7QUFDaEIsWUFBSXlPLEtBQUssQ0FBQ3pPLEdBQUQsQ0FBTCxJQUFjLElBQWQsSUFBc0IsT0FBT3lPLEtBQUssQ0FBQ3pPLEdBQUQsQ0FBWixLQUFzQixRQUF0QixJQUFrQyxPQUFPeU8sS0FBSyxDQUFDek8sR0FBRCxDQUFaLEtBQXNCLFFBQWxGLEVBQTRGO0FBQ3hGLGdCQUFNME8sZUFBZSxDQUFDO0FBQ2xCMU8sWUFBQUEsR0FEa0I7QUFFbEI0TyxZQUFBQSxRQUFRLEVBQUUsc0JBRlE7QUFHbEJDLFlBQUFBLE1BQU0sRUFBRUosS0FBSyxDQUFDek8sR0FBRCxDQUFMLEtBQWUsSUFBZixHQUFzQixNQUF0QixHQUErQixPQUFPeU8sS0FBSyxDQUFDek8sR0FBRDtBQUhqQyxXQUFELENBQXJCO0FBS0g7QUFDSixPQVJELE1BUU87QUFDSDtBQUNBO0FBQ0EsY0FBTWdQLENBQUMsR0FBR2hQLEdBQVY7QUFDSDtBQUNKLEtBZEQsRUFUdUMsQ0F3QnZDOztBQUNBLFVBQU1pUCxrQkFBa0IsR0FBRztBQUN2QnBELE1BQUFBLEVBQUUsRUFBRSxJQURtQjtBQUV2QnNDLE1BQUFBLE9BQU8sRUFBRSxJQUZjO0FBR3ZCRSxNQUFBQSxNQUFNLEVBQUUsSUFIZTtBQUl2QkQsTUFBQUEsT0FBTyxFQUFFLElBSmM7QUFLdkJjLE1BQUFBLFFBQVEsRUFBRSxJQUxhO0FBTXZCaEMsTUFBQUEsUUFBUSxFQUFFLElBTmE7QUFPdkJLLE1BQUFBLE1BQU0sRUFBRTtBQVBlLEtBQTNCO0FBU0EsVUFBTTRCLGFBQWEsR0FBR2xRLE1BQU0sQ0FBQzJCLElBQVAsQ0FBWXFPLGtCQUFaLENBQXRCO0FBQ0FFLElBQUFBLGFBQWEsQ0FBQ2pPLE9BQWQsQ0FBdUJsQixHQUFELElBQU87QUFDekIsWUFBTW9QLE9BQU8sR0FBRyxPQUFPWCxLQUFLLENBQUN6TyxHQUFELENBQTVCOztBQUNBLFVBQUlBLEdBQUcsS0FBSyxJQUFaLEVBQWtCO0FBQ2QsWUFBSXlPLEtBQUssQ0FBQ3pPLEdBQUQsQ0FBTCxJQUFjb1AsT0FBTyxLQUFLLFFBQTFCLElBQXNDQSxPQUFPLEtBQUssUUFBdEQsRUFBZ0U7QUFDNUQsZ0JBQU1WLGVBQWUsQ0FBQztBQUNsQjFPLFlBQUFBLEdBRGtCO0FBRWxCNE8sWUFBQUEsUUFBUSxFQUFFLHNCQUZRO0FBR2xCQyxZQUFBQSxNQUFNLEVBQUVPO0FBSFUsV0FBRCxDQUFyQjtBQUtIO0FBQ0osT0FSRCxNQVFPLElBQUlwUCxHQUFHLEtBQUssUUFBWixFQUFzQjtBQUN6QixZQUFJeU8sS0FBSyxDQUFDek8sR0FBRCxDQUFMLElBQWNvUCxPQUFPLEtBQUssUUFBOUIsRUFBd0M7QUFDcEMsZ0JBQU1WLGVBQWUsQ0FBQztBQUNsQjFPLFlBQUFBLEdBRGtCO0FBRWxCNE8sWUFBQUEsUUFBUSxFQUFFLFVBRlE7QUFHbEJDLFlBQUFBLE1BQU0sRUFBRU87QUFIVSxXQUFELENBQXJCO0FBS0g7QUFDSixPQVJNLE1BUUEsSUFBSXBQLEdBQUcsS0FBSyxTQUFSLElBQXFCQSxHQUFHLEtBQUssUUFBN0IsSUFBeUNBLEdBQUcsS0FBSyxTQUFqRCxJQUE4REEsR0FBRyxLQUFLLFVBQXRFLElBQW9GQSxHQUFHLEtBQUssVUFBaEcsRUFBNEc7QUFDL0csWUFBSXlPLEtBQUssQ0FBQ3pPLEdBQUQsQ0FBTCxJQUFjLElBQWQsSUFBc0JvUCxPQUFPLEtBQUssU0FBdEMsRUFBaUQ7QUFDN0MsZ0JBQU1WLGVBQWUsQ0FBQztBQUNsQjFPLFlBQUFBLEdBRGtCO0FBRWxCNE8sWUFBQUEsUUFBUSxFQUFFLFdBRlE7QUFHbEJDLFlBQUFBLE1BQU0sRUFBRU87QUFIVSxXQUFELENBQXJCO0FBS0g7QUFDSixPQVJNLE1BUUE7QUFDSDtBQUNBO0FBQ0EsY0FBTUosQ0FBQyxHQUFHaFAsR0FBVjtBQUNIO0FBQ0osS0EvQkQsRUFuQ3VDLENBbUV2QztBQUNBOztBQUNBLFVBQU1xUCxTQUFTLEdBQUc5UCxNQUFNLENBQUNGLE9BQVAsQ0FBZWlRLE1BQWYsQ0FBc0IsS0FBdEIsQ0FBbEI7O0FBQ0EsUUFBSWIsS0FBSyxDQUFDdkIsUUFBTixJQUFrQixDQUFDbUMsU0FBUyxDQUFDRSxPQUFqQyxFQUEwQztBQUN0Q0YsTUFBQUEsU0FBUyxDQUFDRSxPQUFWLEdBQW9CLElBQXBCO0FBQ0E5SCxNQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxzS0FBYjtBQUNIO0FBQ0o7O0FBQ0QsUUFBTXZDLENBQUMsR0FBR3NKLEtBQUssQ0FBQ3ZCLFFBQU4sS0FBbUIsS0FBN0I7QUFDQSxRQUFNQyxNQUFNLEdBQUcsQ0FBQyxHQUFHSCxRQUFKLEVBQWN3QyxTQUFkLEVBQWY7O0FBQ0EsUUFBTTtBQUFFMUQsSUFBQUEsSUFBRjtBQUFTRCxJQUFBQTtBQUFULE1BQWlCdE0sTUFBTSxDQUFDRixPQUFQLENBQWVvUSxPQUFmLENBQXVCLE1BQUk7QUFDOUMsVUFBTSxDQUFDQyxZQUFELEVBQWVDLFVBQWYsSUFBNkIsQ0FBQyxHQUFHNUMsT0FBSixFQUFhNkMsV0FBYixDQUF5QnpDLE1BQXpCLEVBQWlDc0IsS0FBSyxDQUFDM0MsSUFBdkMsRUFBNkMsSUFBN0MsQ0FBbkM7QUFDQSxXQUFPO0FBQ0hBLE1BQUFBLElBQUksRUFBRTRELFlBREg7QUFFSDdELE1BQUFBLEVBQUUsRUFBRTRDLEtBQUssQ0FBQzVDLEVBQU4sR0FBVyxDQUFDLEdBQUdrQixPQUFKLEVBQWE2QyxXQUFiLENBQXlCekMsTUFBekIsRUFBaUNzQixLQUFLLENBQUM1QyxFQUF2QyxDQUFYLEdBQXdEOEQsVUFBVSxJQUFJRDtBQUZ2RSxLQUFQO0FBSUgsR0FOc0IsRUFNcEIsQ0FDQ3ZDLE1BREQsRUFFQ3NCLEtBQUssQ0FBQzNDLElBRlAsRUFHQzJDLEtBQUssQ0FBQzVDLEVBSFAsQ0FOb0IsQ0FBdkI7O0FBV0EsTUFBSTtBQUFFZ0UsSUFBQUEsUUFBRjtBQUFhMUIsSUFBQUEsT0FBYjtBQUF1QkMsSUFBQUEsT0FBdkI7QUFBaUNDLElBQUFBLE1BQWpDO0FBQTBDZCxJQUFBQTtBQUExQyxNQUFzRGtCLEtBQTFELENBekZpQixDQTBGakI7O0FBQ0EsTUFBSSxPQUFPb0IsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUM5QkEsSUFBQUEsUUFBUSxHQUFHLGFBQWN0USxNQUFNLENBQUNGLE9BQVAsQ0FBZWtNLGFBQWYsQ0FBNkIsR0FBN0IsRUFBa0MsSUFBbEMsRUFBd0NzRSxRQUF4QyxDQUF6QjtBQUNILEdBN0ZnQixDQThGakI7OztBQUNBLE1BQUlDLEtBQUo7O0FBQ0EsWUFBNEM7QUFDeEMsUUFBSTtBQUNBQSxNQUFBQSxLQUFLLEdBQUd2USxNQUFNLENBQUNGLE9BQVAsQ0FBZTBRLFFBQWYsQ0FBd0JDLElBQXhCLENBQTZCSCxRQUE3QixDQUFSO0FBQ0gsS0FGRCxDQUVFLE9BQU9sRCxHQUFQLEVBQVk7QUFDVixZQUFNLElBQUkxRyxLQUFKLENBQVcsOERBQTZEd0ksS0FBSyxDQUFDM0MsSUFBSyw0RkFBekUsSUFBd0ssU0FBZ0MsQ0FBaEMsR0FBc0csRUFBOVEsQ0FBVixDQUFOO0FBQ0g7QUFDSixHQU5ELE1BTU8sRUFFTjs7QUFDRCxRQUFNbUUsUUFBUSxHQUFHSCxLQUFLLElBQUksT0FBT0EsS0FBUCxLQUFpQixRQUExQixJQUFzQ0EsS0FBSyxDQUFDMUksR0FBN0Q7QUFDQSxRQUFNLENBQUM4SSxrQkFBRCxFQUFxQm5HLFNBQXJCLElBQWtDLENBQUMsR0FBR2xLLGdCQUFKLEVBQXNCK0osZUFBdEIsQ0FBc0M7QUFDMUVDLElBQUFBLFVBQVUsRUFBRTtBQUQ4RCxHQUF0QyxDQUF4Qzs7QUFHQSxRQUFNSCxNQUFNLEdBQUduSyxNQUFNLENBQUNGLE9BQVAsQ0FBZThRLFdBQWYsQ0FBNEJDLEVBQUQsSUFBTTtBQUM1Q0YsSUFBQUEsa0JBQWtCLENBQUNFLEVBQUQsQ0FBbEI7O0FBQ0EsUUFBSUgsUUFBSixFQUFjO0FBQ1YsVUFBSSxPQUFPQSxRQUFQLEtBQW9CLFVBQXhCLEVBQW9DQSxRQUFRLENBQUNHLEVBQUQsQ0FBUixDQUFwQyxLQUNLLElBQUksT0FBT0gsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUNuQ0EsUUFBQUEsUUFBUSxDQUFDVixPQUFULEdBQW1CYSxFQUFuQjtBQUNIO0FBQ0o7QUFDSixHQVJjLEVBUVosQ0FDQ0gsUUFERCxFQUVDQyxrQkFGRCxDQVJZLENBQWY7O0FBWUEzUSxFQUFBQSxNQUFNLENBQUNGLE9BQVAsQ0FBZWdSLFNBQWYsQ0FBeUIsTUFBSTtBQUN6QixVQUFNQyxjQUFjLEdBQUd2RyxTQUFTLElBQUk1RSxDQUFiLElBQWtCLENBQUMsR0FBRzRILE9BQUosRUFBYU0sVUFBYixDQUF3QnZCLElBQXhCLENBQXpDO0FBQ0EsVUFBTXdCLFNBQVMsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxHQUF5Q0osTUFBTSxJQUFJQSxNQUFNLENBQUNJLE1BQTVFO0FBQ0EsVUFBTWdELFlBQVksR0FBR3RELFVBQVUsQ0FBQ25CLElBQUksR0FBRyxHQUFQLEdBQWFELEVBQWIsSUFBbUJ5QixTQUFTLEdBQUcsTUFBTUEsU0FBVCxHQUFxQixFQUFqRCxDQUFELENBQS9COztBQUNBLFFBQUlnRCxjQUFjLElBQUksQ0FBQ0MsWUFBdkIsRUFBcUM7QUFDakNyRCxNQUFBQSxRQUFRLENBQUNDLE1BQUQsRUFBU3JCLElBQVQsRUFBZUQsRUFBZixFQUFtQjtBQUN2QjBCLFFBQUFBLE1BQU0sRUFBRUQ7QUFEZSxPQUFuQixDQUFSO0FBR0g7QUFDSixHQVRELEVBU0csQ0FDQ3pCLEVBREQsRUFFQ0MsSUFGRCxFQUdDL0IsU0FIRCxFQUlDd0QsTUFKRCxFQUtDcEksQ0FMRCxFQU1DZ0ksTUFORCxDQVRIOztBQWlCQSxRQUFNcUQsVUFBVSxHQUFHO0FBQ2ZwSixJQUFBQSxHQUFHLEVBQUVzQyxNQURVO0FBRWYrRyxJQUFBQSxPQUFPLEVBQUd2QyxDQUFELElBQUs7QUFDVixVQUFJNEIsS0FBSyxDQUFDckIsS0FBTixJQUFlLE9BQU9xQixLQUFLLENBQUNyQixLQUFOLENBQVlnQyxPQUFuQixLQUErQixVQUFsRCxFQUE4RDtBQUMxRFgsUUFBQUEsS0FBSyxDQUFDckIsS0FBTixDQUFZZ0MsT0FBWixDQUFvQnZDLENBQXBCO0FBQ0g7O0FBQ0QsVUFBSSxDQUFDQSxDQUFDLENBQUN3QyxnQkFBUCxFQUF5QjtBQUNyQnpDLFFBQUFBLFdBQVcsQ0FBQ0MsQ0FBRCxFQUFJZixNQUFKLEVBQVlyQixJQUFaLEVBQWtCRCxFQUFsQixFQUFzQnNDLE9BQXRCLEVBQStCQyxPQUEvQixFQUF3Q0MsTUFBeEMsRUFBZ0RkLE1BQWhELENBQVg7QUFDSDtBQUNKO0FBVGMsR0FBbkI7O0FBV0FpRCxFQUFBQSxVQUFVLENBQUNHLFlBQVgsR0FBMkJ6QyxDQUFELElBQUs7QUFDM0IsUUFBSSxDQUFDLENBQUMsR0FBR25CLE9BQUosRUFBYU0sVUFBYixDQUF3QnZCLElBQXhCLENBQUwsRUFBb0M7O0FBQ3BDLFFBQUlnRSxLQUFLLENBQUNyQixLQUFOLElBQWUsT0FBT3FCLEtBQUssQ0FBQ3JCLEtBQU4sQ0FBWWtDLFlBQW5CLEtBQW9DLFVBQXZELEVBQW1FO0FBQy9EYixNQUFBQSxLQUFLLENBQUNyQixLQUFOLENBQVlrQyxZQUFaLENBQXlCekMsQ0FBekI7QUFDSDs7QUFDRGhCLElBQUFBLFFBQVEsQ0FBQ0MsTUFBRCxFQUFTckIsSUFBVCxFQUFlRCxFQUFmLEVBQW1CO0FBQ3ZCOUQsTUFBQUEsUUFBUSxFQUFFO0FBRGEsS0FBbkIsQ0FBUjtBQUdILEdBUkQsQ0FySmlCLENBOEpqQjtBQUNBOzs7QUFDQSxNQUFJMEcsS0FBSyxDQUFDUyxRQUFOLElBQWtCWSxLQUFLLENBQUNjLElBQU4sS0FBZSxHQUFmLElBQXNCLEVBQUUsVUFBVWQsS0FBSyxDQUFDckIsS0FBbEIsQ0FBNUMsRUFBc0U7QUFDbEUsVUFBTW5CLFNBQVMsR0FBRyxPQUFPQyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDQSxNQUFoQyxHQUF5Q0osTUFBTSxJQUFJQSxNQUFNLENBQUNJLE1BQTVFLENBRGtFLENBRWxFO0FBQ0E7O0FBQ0EsVUFBTXNELFlBQVksR0FBRzFELE1BQU0sSUFBSUEsTUFBTSxDQUFDMkQsY0FBakIsSUFBbUMsQ0FBQyxHQUFHL0QsT0FBSixFQUFhZ0UsZUFBYixDQUE2QmxGLEVBQTdCLEVBQWlDeUIsU0FBakMsRUFBNENILE1BQU0sSUFBSUEsTUFBTSxDQUFDNkQsT0FBN0QsRUFBc0U3RCxNQUFNLElBQUlBLE1BQU0sQ0FBQzhELGFBQXZGLENBQXhEO0FBQ0FULElBQUFBLFVBQVUsQ0FBQzFFLElBQVgsR0FBa0IrRSxZQUFZLElBQUksQ0FBQyxHQUFHOUQsT0FBSixFQUFhbUUsV0FBYixDQUF5QixDQUFDLEdBQUduRSxPQUFKLEVBQWFvRSxTQUFiLENBQXVCdEYsRUFBdkIsRUFBMkJ5QixTQUEzQixFQUFzQ0gsTUFBTSxJQUFJQSxNQUFNLENBQUNpRSxhQUF2RCxDQUF6QixDQUFsQztBQUNIOztBQUNELFNBQU8sYUFBYzdSLE1BQU0sQ0FBQ0YsT0FBUCxDQUFlZ1MsWUFBZixDQUE0QnZCLEtBQTVCLEVBQW1DVSxVQUFuQyxDQUFyQjtBQUNIOztBQUNELElBQUljLFFBQVEsR0FBRzlDLElBQWY7QUFDQXJQLGVBQUEsR0FBa0JtUyxRQUFsQjs7Ozs7Ozs7Ozs7QUNqT2E7O0FBQ2JyUyw4Q0FBNkM7QUFDekNHLEVBQUFBLEtBQUssRUFBRTtBQURrQyxDQUE3QztBQUdBRCwrQkFBQSxHQUFrQ29TLHVCQUFsQztBQUNBcFMsa0NBQUEsR0FBcUMsS0FBSyxDQUExQzs7QUFDQSxTQUFTb1MsdUJBQVQsQ0FBaUNuTyxJQUFqQyxFQUF1QztBQUNuQyxTQUFPQSxJQUFJLENBQUNxTyxRQUFMLENBQWMsR0FBZCxLQUFzQnJPLElBQUksS0FBSyxHQUEvQixHQUFxQ0EsSUFBSSxDQUFDOEksS0FBTCxDQUFXLENBQVgsRUFBYyxDQUFDLENBQWYsQ0FBckMsR0FBeUQ5SSxJQUFoRTtBQUNIOztBQUNELE1BQU1vTywwQkFBMEIsR0FBR2hPLE1BQUEsR0FBcUNKLENBQXJDLEdBUS9CbU8sdUJBUko7QUFTQXBTLGtDQUFBLEdBQXFDcVMsMEJBQXJDOzs7Ozs7Ozs7OztBQ2xCYTs7QUFDYnZTLDhDQUE2QztBQUN6Q0csRUFBQUEsS0FBSyxFQUFFO0FBRGtDLENBQTdDO0FBR0FELDJCQUFBLEdBQThCQSwwQkFBQSxHQUE2QixLQUFLLENBQWhFOztBQUNBLE1BQU15UyxtQkFBbUIsR0FBRyxPQUFPRSxJQUFQLEtBQWdCLFdBQWhCLElBQStCQSxJQUFJLENBQUNGLG1CQUFwQyxJQUEyREUsSUFBSSxDQUFDRixtQkFBTCxDQUF5QkcsSUFBekIsQ0FBOEJDLE1BQTlCLENBQTNELElBQW9HLFVBQVNDLEVBQVQsRUFBYTtBQUN6SSxNQUFJQyxLQUFLLEdBQUdDLElBQUksQ0FBQ0MsR0FBTCxFQUFaO0FBQ0EsU0FBT0MsVUFBVSxDQUFDLFlBQVc7QUFDekJKLElBQUFBLEVBQUUsQ0FBQztBQUNDSyxNQUFBQSxVQUFVLEVBQUUsS0FEYjtBQUVDQyxNQUFBQSxhQUFhLEVBQUUsWUFBVztBQUN0QixlQUFPNU4sSUFBSSxDQUFDNk4sR0FBTCxDQUFTLENBQVQsRUFBWSxNQUFNTCxJQUFJLENBQUNDLEdBQUwsS0FBYUYsS0FBbkIsQ0FBWixDQUFQO0FBQ0g7QUFKRixLQUFELENBQUY7QUFNSCxHQVBnQixFQU9kLENBUGMsQ0FBakI7QUFRSCxDQVZEOztBQVdBL1MsMkJBQUEsR0FBOEJ5UyxtQkFBOUI7O0FBQ0EsTUFBTUMsa0JBQWtCLEdBQUcsT0FBT0MsSUFBUCxLQUFnQixXQUFoQixJQUErQkEsSUFBSSxDQUFDRCxrQkFBcEMsSUFBMERDLElBQUksQ0FBQ0Qsa0JBQUwsQ0FBd0JFLElBQXhCLENBQTZCQyxNQUE3QixDQUExRCxJQUFrRyxVQUFTUyxFQUFULEVBQWE7QUFDdEksU0FBT0MsWUFBWSxDQUFDRCxFQUFELENBQW5CO0FBQ0gsQ0FGRDs7QUFHQXRULDBCQUFBLEdBQTZCMFMsa0JBQTdCOzs7Ozs7Ozs7OztBQ3BCYTs7QUFDYjVTLDhDQUE2QztBQUN6Q0csRUFBQUEsS0FBSyxFQUFFO0FBRGtDLENBQTdDO0FBR0FELHNCQUFBLEdBQXlCd1QsY0FBekI7QUFDQXhULG9CQUFBLEdBQXVCeVQsWUFBdkI7QUFDQXpULDhCQUFBLEdBQWlDMFQsc0JBQWpDO0FBQ0ExVCx5QkFBQSxHQUE0QjJULGlCQUE1Qjs7QUFDQSxJQUFJQyxzQkFBc0IsR0FBR3ZULHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLGtIQUFELENBQVIsQ0FBbkQ7O0FBQ0EsSUFBSXVULG9CQUFvQixHQUFHdlQsbUJBQU8sQ0FBQyx5RkFBRCxDQUFsQzs7QUFDQSxTQUFTRCxzQkFBVCxDQUFnQ08sR0FBaEMsRUFBcUM7QUFDakMsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNLLFVBQVgsR0FBd0JMLEdBQXhCLEdBQThCO0FBQ2pDVixJQUFBQSxPQUFPLEVBQUVVO0FBRHdCLEdBQXJDO0FBR0gsRUFDRDtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsTUFBTWtULGlCQUFpQixHQUFHLElBQTFCOztBQUNBLFNBQVNDLFVBQVQsQ0FBb0JsVCxHQUFwQixFQUF5QmdGLEdBQXpCLEVBQThCbU8sU0FBOUIsRUFBeUM7QUFDckMsTUFBSUMsS0FBSyxHQUFHcE8sR0FBRyxDQUFDZSxHQUFKLENBQVEvRixHQUFSLENBQVo7O0FBQ0EsTUFBSW9ULEtBQUosRUFBVztBQUNQLFFBQUksWUFBWUEsS0FBaEIsRUFBdUI7QUFDbkIsYUFBT0EsS0FBSyxDQUFDQyxNQUFiO0FBQ0g7O0FBQ0QsV0FBTzNNLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQnlNLEtBQWhCLENBQVA7QUFDSDs7QUFDRCxNQUFJRSxRQUFKO0FBQ0EsUUFBTUMsSUFBSSxHQUFHLElBQUk3TSxPQUFKLENBQWFDLE9BQUQsSUFBVztBQUNoQzJNLElBQUFBLFFBQVEsR0FBRzNNLE9BQVg7QUFDSCxHQUZZLENBQWI7QUFHQTNCLEVBQUFBLEdBQUcsQ0FBQ3VILEdBQUosQ0FBUXZNLEdBQVIsRUFBYW9ULEtBQUssR0FBRztBQUNqQnpNLElBQUFBLE9BQU8sRUFBRTJNLFFBRFE7QUFFakJELElBQUFBLE1BQU0sRUFBRUU7QUFGUyxHQUFyQjtBQUlBLFNBQU9KLFNBQVMsR0FBR0EsU0FBUyxHQUFHdE0sSUFBWixDQUFrQnpILEtBQUQsS0FBVWtVLFFBQVEsQ0FBQ2xVLEtBQUQsQ0FBUixFQUFpQkEsS0FBM0IsQ0FBakIsQ0FBSCxHQUNabVUsSUFESjtBQUVIOztBQUNELFNBQVNDLFdBQVQsQ0FBcUJDLElBQXJCLEVBQTJCO0FBQ3ZCLE1BQUk7QUFDQUEsSUFBQUEsSUFBSSxHQUFHQyxRQUFRLENBQUNuSSxhQUFULENBQXVCLE1BQXZCLENBQVA7QUFDQSxXQUFPO0FBQ1A7QUFDQyxPQUFDLENBQUN5RyxNQUFNLENBQUMyQixvQkFBVCxJQUFpQyxDQUFDLENBQUNELFFBQVEsQ0FBQ0UsWUFBN0MsSUFBOERILElBQUksQ0FBQ0ksT0FBTCxDQUFhQyxRQUFiLENBQXNCLFVBQXRCO0FBRjlEO0FBR0gsR0FMRCxDQUtFLE9BQU81RixDQUFQLEVBQVU7QUFDUixXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELE1BQU02RixXQUFXLEdBQUdQLFdBQVcsRUFBL0I7O0FBQ0EsU0FBU1EsY0FBVCxDQUF3QmxJLElBQXhCLEVBQThCRCxFQUE5QixFQUFrQzRILElBQWxDLEVBQXdDO0FBQ3BDLFNBQU8sSUFBSS9NLE9BQUosQ0FBWSxDQUFDdU4sR0FBRCxFQUFNQyxHQUFOLEtBQVk7QUFDM0IsUUFBSVIsUUFBUSxDQUFDUyxhQUFULENBQXdCLCtCQUE4QnJJLElBQUssSUFBM0QsQ0FBSixFQUFxRTtBQUNqRSxhQUFPbUksR0FBRyxFQUFWO0FBQ0g7O0FBQ0RSLElBQUFBLElBQUksR0FBR0MsUUFBUSxDQUFDbkksYUFBVCxDQUF1QixNQUF2QixDQUFQLENBSjJCLENBSzNCOztBQUNBLFFBQUlNLEVBQUosRUFBUTRILElBQUksQ0FBQzVILEVBQUwsR0FBVUEsRUFBVjtBQUNSNEgsSUFBQUEsSUFBSSxDQUFDN0gsR0FBTCxHQUFZLFVBQVo7QUFDQTZILElBQUFBLElBQUksQ0FBQ1csV0FBTCxHQUFtQjVRLFNBQW5CO0FBQ0FpUSxJQUFBQSxJQUFJLENBQUM1TCxNQUFMLEdBQWNvTSxHQUFkO0FBQ0FSLElBQUFBLElBQUksQ0FBQ2EsT0FBTCxHQUFlSixHQUFmLENBVjJCLENBVzNCOztBQUNBVCxJQUFBQSxJQUFJLENBQUMzSCxJQUFMLEdBQVlBLElBQVo7QUFDQTRILElBQUFBLFFBQVEsQ0FBQ2EsSUFBVCxDQUFjQyxXQUFkLENBQTBCZixJQUExQjtBQUNILEdBZE0sQ0FBUDtBQWVIOztBQUNELE1BQU1nQixnQkFBZ0IsR0FBR0MsTUFBTSxDQUFDLGtCQUFELENBQS9COztBQUNBLFNBQVMvQixjQUFULENBQXdCaEcsR0FBeEIsRUFBNkI7QUFDekIsU0FBTzFOLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQnlOLEdBQXRCLEVBQTJCOEgsZ0JBQTNCLEVBQTZDLEVBQTdDLENBQVA7QUFFSDs7QUFDRCxTQUFTN0IsWUFBVCxDQUFzQmpHLEdBQXRCLEVBQTJCO0FBQ3ZCLFNBQU9BLEdBQUcsSUFBSThILGdCQUFnQixJQUFJOUgsR0FBbEM7QUFDSDs7QUFDRCxTQUFTZ0ksWUFBVCxDQUFzQmhTLEdBQXRCLEVBQTJCaVMsTUFBM0IsRUFBbUM7QUFDL0IsU0FBTyxJQUFJbE8sT0FBSixDQUFZLENBQUNDLE9BQUQsRUFBVWtPLE1BQVYsS0FBbUI7QUFDbENELElBQUFBLE1BQU0sR0FBR2xCLFFBQVEsQ0FBQ25JLGFBQVQsQ0FBdUIsUUFBdkIsQ0FBVCxDQURrQyxDQUVsQztBQUNBO0FBQ0E7O0FBQ0FxSixJQUFBQSxNQUFNLENBQUMvTSxNQUFQLEdBQWdCbEIsT0FBaEI7O0FBQ0FpTyxJQUFBQSxNQUFNLENBQUNOLE9BQVAsR0FBaUIsTUFBSU8sTUFBTSxDQUFDbEMsY0FBYyxDQUFDLElBQUkxTSxLQUFKLENBQVcsMEJBQXlCdEQsR0FBSSxFQUF4QyxDQUFELENBQWYsQ0FBM0IsQ0FOa0MsQ0FRbEM7QUFDQTs7O0FBQ0FpUyxJQUFBQSxNQUFNLENBQUNSLFdBQVAsR0FBcUI1USxTQUFyQixDQVZrQyxDQVdsQztBQUNBOztBQUNBb1IsSUFBQUEsTUFBTSxDQUFDalMsR0FBUCxHQUFhQSxHQUFiO0FBQ0ErUSxJQUFBQSxRQUFRLENBQUNvQixJQUFULENBQWNOLFdBQWQsQ0FBMEJJLE1BQTFCO0FBQ0gsR0FmTSxDQUFQO0FBZ0JILEVBQ0Q7QUFDQTs7O0FBQ0EsSUFBSUcsZUFBSixFQUNBOztBQUNBLFNBQVNDLHlCQUFULENBQW1DN1AsQ0FBbkMsRUFBc0M4UCxFQUF0QyxFQUEwQ3RJLEdBQTFDLEVBQStDO0FBQzNDLFNBQU8sSUFBSWpHLE9BQUosQ0FBWSxDQUFDQyxPQUFELEVBQVVrTyxNQUFWLEtBQW1CO0FBQ2xDLFFBQUlLLFNBQVMsR0FBRyxLQUFoQjtBQUNBL1AsSUFBQUEsQ0FBQyxDQUFDMEIsSUFBRixDQUFRc08sQ0FBRCxJQUFLO0FBQ1I7QUFDQUQsTUFBQUEsU0FBUyxHQUFHLElBQVo7QUFDQXZPLE1BQUFBLE9BQU8sQ0FBQ3dPLENBQUQsQ0FBUDtBQUNILEtBSkQsRUFJR3ZPLEtBSkgsQ0FJU2lPLE1BSlQsRUFGa0MsQ0FPbEM7QUFDQTs7QUFDQSxjQUE0QztBQUN4QyxPQUFDRSxlQUFlLElBQUlyTyxPQUFPLENBQUNDLE9BQVIsRUFBcEIsRUFBdUNFLElBQXZDLENBQTRDLE1BQUk7QUFDNUMsU0FBQyxHQUFHbU0sb0JBQUosRUFBMEJwQixtQkFBMUIsQ0FBOEMsTUFBSVMsVUFBVSxDQUFDLE1BQUk7QUFDekQsY0FBSSxDQUFDNkMsU0FBTCxFQUFnQjtBQUNaTCxZQUFBQSxNQUFNLENBQUNsSSxHQUFELENBQU47QUFDSDtBQUNKLFNBSnVELEVBSXJEc0ksRUFKcUQsQ0FBNUQ7QUFNSCxPQVBEO0FBUUg7O0FBQ0QsZUFBNEMsRUFPM0M7QUFDSixHQTNCTSxDQUFQO0FBNEJIOztBQUNELFNBQVNwQyxzQkFBVCxHQUFrQztBQUM5QixNQUFJZixJQUFJLENBQUNzRCxnQkFBVCxFQUEyQjtBQUN2QixXQUFPMU8sT0FBTyxDQUFDQyxPQUFSLENBQWdCbUwsSUFBSSxDQUFDc0QsZ0JBQXJCLENBQVA7QUFDSDs7QUFDRCxRQUFNQyxlQUFlLEdBQUcsSUFBSTNPLE9BQUosQ0FBYUMsT0FBRCxJQUFXO0FBQzNDO0FBQ0EsVUFBTXNMLEVBQUUsR0FBR0gsSUFBSSxDQUFDd0QsbUJBQWhCOztBQUNBeEQsSUFBQUEsSUFBSSxDQUFDd0QsbUJBQUwsR0FBMkIsTUFBSTtBQUMzQjNPLE1BQUFBLE9BQU8sQ0FBQ21MLElBQUksQ0FBQ3NELGdCQUFOLENBQVA7QUFDQW5ELE1BQUFBLEVBQUUsSUFBSUEsRUFBRSxFQUFSO0FBQ0gsS0FIRDtBQUlILEdBUHVCLENBQXhCO0FBUUEsU0FBTytDLHlCQUF5QixDQUFDSyxlQUFELEVBQWtCcEMsaUJBQWxCLEVBQXFDTixjQUFjLENBQUMsSUFBSTFNLEtBQUosQ0FBVSxzQ0FBVixDQUFELENBQW5ELENBQWhDO0FBQ0g7O0FBQ0QsU0FBU3NQLGdCQUFULENBQTBCQyxXQUExQixFQUF1Q0MsS0FBdkMsRUFBOEM7QUFDMUMsWUFBNEM7QUFDeEMsV0FBTy9PLE9BQU8sQ0FBQ0MsT0FBUixDQUFnQjtBQUNuQitPLE1BQUFBLE9BQU8sRUFBRSxDQUNMRixXQUFXLEdBQUcsNEJBQWQsR0FBNkNHLFNBQVMsQ0FBQyxDQUFDLEdBQUc1QyxzQkFBSixFQUE0QjFULE9BQTVCLENBQW9Db1csS0FBcEMsRUFBMkMsS0FBM0MsQ0FBRCxDQURqRCxDQURVO0FBSW5CO0FBQ0FHLE1BQUFBLEdBQUcsRUFBRTtBQUxjLEtBQWhCLENBQVA7QUFPSDs7QUFDRCxTQUFPL0Msc0JBQXNCLEdBQUdoTSxJQUF6QixDQUErQmdQLFFBQUQsSUFBWTtBQUM3QyxRQUFJLEVBQUVKLEtBQUssSUFBSUksUUFBWCxDQUFKLEVBQTBCO0FBQ3RCLFlBQU1sRCxjQUFjLENBQUMsSUFBSTFNLEtBQUosQ0FBVywyQkFBMEJ3UCxLQUFNLEVBQTNDLENBQUQsQ0FBcEI7QUFDSDs7QUFDRCxVQUFNSyxRQUFRLEdBQUdELFFBQVEsQ0FBQ0osS0FBRCxDQUFSLENBQWdCelEsR0FBaEIsQ0FBcUJvTyxLQUFELElBQVNvQyxXQUFXLEdBQUcsU0FBZCxHQUEwQkcsU0FBUyxDQUFDdkMsS0FBRCxDQUFoRSxDQUFqQjtBQUVBLFdBQU87QUFDSHNDLE1BQUFBLE9BQU8sRUFBRUksUUFBUSxDQUFDL1UsTUFBVCxDQUFpQmdWLENBQUQsSUFBS0EsQ0FBQyxDQUFDdEUsUUFBRixDQUFXLEtBQVgsQ0FBckIsQ0FETjtBQUdIbUUsTUFBQUEsR0FBRyxFQUFFRSxRQUFRLENBQUMvVSxNQUFULENBQWlCZ1YsQ0FBRCxJQUFLQSxDQUFDLENBQUN0RSxRQUFGLENBQVcsTUFBWCxDQUFyQjtBQUhGLEtBQVA7QUFNSCxHQVpNLENBQVA7QUFhSDs7QUFDRCxTQUFTcUIsaUJBQVQsQ0FBMkIwQyxXQUEzQixFQUF3QztBQUNwQyxRQUFNUSxXQUFXLEdBQUcsSUFBSTdULEdBQUosRUFBcEI7QUFDQSxRQUFNOFQsYUFBYSxHQUFHLElBQUk5VCxHQUFKLEVBQXRCO0FBQ0EsUUFBTStULFdBQVcsR0FBRyxJQUFJL1QsR0FBSixFQUFwQjtBQUNBLFFBQU1nVSxNQUFNLEdBQUcsSUFBSWhVLEdBQUosRUFBZjs7QUFDQSxXQUFTaVUsa0JBQVQsQ0FBNEJ6VCxHQUE1QixFQUFpQztBQUM3QixRQUFJNFEsSUFBSSxHQUFHMEMsYUFBYSxDQUFDbFEsR0FBZCxDQUFrQnBELEdBQWxCLENBQVg7O0FBQ0EsUUFBSTRRLElBQUosRUFBVTtBQUNOLGFBQU9BLElBQVA7QUFDSCxLQUo0QixDQUs3Qjs7O0FBQ0EsUUFBSUcsUUFBUSxDQUFDUyxhQUFULENBQXdCLGdCQUFleFIsR0FBSSxJQUEzQyxDQUFKLEVBQXFEO0FBQ2pELGFBQU8rRCxPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNIOztBQUNEc1AsSUFBQUEsYUFBYSxDQUFDMUosR0FBZCxDQUFrQjVKLEdBQWxCLEVBQXVCNFEsSUFBSSxHQUFHb0IsWUFBWSxDQUFDaFMsR0FBRCxDQUExQztBQUNBLFdBQU80USxJQUFQO0FBQ0g7O0FBQ0QsV0FBUzhDLGVBQVQsQ0FBeUJ2SyxJQUF6QixFQUErQjtBQUMzQixRQUFJeUgsSUFBSSxHQUFHMkMsV0FBVyxDQUFDblEsR0FBWixDQUFnQitGLElBQWhCLENBQVg7O0FBQ0EsUUFBSXlILElBQUosRUFBVTtBQUNOLGFBQU9BLElBQVA7QUFDSDs7QUFDRDJDLElBQUFBLFdBQVcsQ0FBQzNKLEdBQVosQ0FBZ0JULElBQWhCLEVBQXNCeUgsSUFBSSxHQUFHK0MsS0FBSyxDQUFDeEssSUFBRCxDQUFMLENBQVlqRixJQUFaLENBQWtCb04sR0FBRCxJQUFPO0FBQ2pELFVBQUksQ0FBQ0EsR0FBRyxDQUFDc0MsRUFBVCxFQUFhO0FBQ1QsY0FBTSxJQUFJdFEsS0FBSixDQUFXLDhCQUE2QjZGLElBQUssRUFBN0MsQ0FBTjtBQUNIOztBQUNELGFBQU9tSSxHQUFHLENBQUN1QyxJQUFKLEdBQVczUCxJQUFYLENBQWlCMlAsSUFBRCxLQUFTO0FBQ3hCMUssUUFBQUEsSUFBSSxFQUFFQSxJQURrQjtBQUV4QjJLLFFBQUFBLE9BQU8sRUFBRUQ7QUFGZSxPQUFULENBQWhCLENBQVA7QUFLSCxLQVQ0QixFQVMxQjVQLEtBVDBCLENBU25CK0YsR0FBRCxJQUFPO0FBQ1osWUFBTWdHLGNBQWMsQ0FBQ2hHLEdBQUQsQ0FBcEI7QUFDSCxLQVg0QixDQUE3QjtBQVlBLFdBQU80RyxJQUFQO0FBQ0g7O0FBQ0QsU0FBTztBQUNIbUQsSUFBQUEsY0FBYyxDQUFFakIsS0FBRixFQUFTO0FBQ25CLGFBQU92QyxVQUFVLENBQUN1QyxLQUFELEVBQVFPLFdBQVIsQ0FBakI7QUFDSCxLQUhFOztBQUlIVyxJQUFBQSxZQUFZLENBQUVsQixLQUFGLEVBQVNtQixPQUFULEVBQWtCO0FBQzFCbFEsTUFBQUEsT0FBTyxDQUFDQyxPQUFSLENBQWdCaVEsT0FBaEIsRUFBeUIvUCxJQUF6QixDQUErQmdRLEVBQUQsSUFBTUEsRUFBRSxFQUF0QyxFQUNFaFEsSUFERixDQUNRMUgsT0FBRCxLQUFZO0FBQ1gyWCxRQUFBQSxTQUFTLEVBQUUzWCxPQUFPLElBQUlBLE9BQU8sQ0FBQ0UsT0FBbkIsSUFBOEJGLE9BRDlCO0FBRVhBLFFBQUFBLE9BQU8sRUFBRUE7QUFGRSxPQUFaLENBRFAsRUFLR3dOLEdBQUQsS0FBUTtBQUNGQyxRQUFBQSxLQUFLLEVBQUVEO0FBREwsT0FBUixDQUxGLEVBUUU5RixJQVJGLENBUVFrUSxLQUFELElBQVM7QUFDWixjQUFNQyxHQUFHLEdBQUdoQixXQUFXLENBQUNqUSxHQUFaLENBQWdCMFAsS0FBaEIsQ0FBWjtBQUNBTyxRQUFBQSxXQUFXLENBQUN6SixHQUFaLENBQWdCa0osS0FBaEIsRUFBdUJzQixLQUF2QjtBQUNBLFlBQUlDLEdBQUcsSUFBSSxhQUFhQSxHQUF4QixFQUE2QkEsR0FBRyxDQUFDclEsT0FBSixDQUFZb1EsS0FBWjtBQUNoQyxPQVpEO0FBYUgsS0FsQkU7O0FBbUJIRSxJQUFBQSxTQUFTLENBQUV4QixLQUFGLEVBQVN2SSxRQUFULEVBQW1CO0FBQ3hCLGFBQU9nRyxVQUFVLENBQUN1QyxLQUFELEVBQVFVLE1BQVIsRUFBZ0IsTUFBSTtBQUNqQyxjQUFNZSxpQkFBaUIsR0FBRzNCLGdCQUFnQixDQUFDQyxXQUFELEVBQWNDLEtBQWQsQ0FBaEIsQ0FBcUM1TyxJQUFyQyxDQUEwQyxDQUFDO0FBQUU2TyxVQUFBQSxPQUFGO0FBQVlFLFVBQUFBO0FBQVosU0FBRCxLQUFzQjtBQUN0RixpQkFBT2xQLE9BQU8sQ0FBQzZCLEdBQVIsQ0FBWSxDQUNmeU4sV0FBVyxDQUFDL00sR0FBWixDQUFnQndNLEtBQWhCLElBQXlCLEVBQXpCLEdBQThCL08sT0FBTyxDQUFDNkIsR0FBUixDQUFZbU4sT0FBTyxDQUFDMVEsR0FBUixDQUFZb1Isa0JBQVosQ0FBWixDQURmLEVBRWYxUCxPQUFPLENBQUM2QixHQUFSLENBQVlxTixHQUFHLENBQUM1USxHQUFKLENBQVFxUixlQUFSLENBQVosQ0FGZSxDQUFaLENBQVA7QUFJSCxTQUx5QixFQUt2QnhQLElBTHVCLENBS2pCb04sR0FBRCxJQUFPO0FBQ1gsaUJBQU8sS0FBS3lDLGNBQUwsQ0FBb0JqQixLQUFwQixFQUEyQjVPLElBQTNCLENBQWlDc1EsVUFBRCxLQUFlO0FBQzlDQSxZQUFBQSxVQUQ4QztBQUU5Q0MsWUFBQUEsTUFBTSxFQUFFbkQsR0FBRyxDQUFDLENBQUQ7QUFGbUMsV0FBZixDQUFoQyxDQUFQO0FBS0gsU0FYeUIsQ0FBMUI7O0FBWUEsa0JBQTRDO0FBQ3hDYyxVQUFBQSxlQUFlLEdBQUcsSUFBSXJPLE9BQUosQ0FBYUMsT0FBRCxJQUFXO0FBQ3JDLGdCQUFJdVEsaUJBQUosRUFBdUI7QUFDbkIscUJBQU9BLGlCQUFpQixDQUFDRyxPQUFsQixDQUEwQixNQUFJO0FBQ2pDMVEsZ0JBQUFBLE9BQU87QUFDVixlQUZNLENBQVA7QUFHSDtBQUNKLFdBTmlCLENBQWxCO0FBT0g7O0FBQ0QsZUFBT3FPLHlCQUF5QixDQUFDa0MsaUJBQUQsRUFBb0JqRSxpQkFBcEIsRUFBdUNOLGNBQWMsQ0FBQyxJQUFJMU0sS0FBSixDQUFXLG1DQUFrQ3dQLEtBQU0sRUFBbkQsQ0FBRCxDQUFyRCxDQUF6QixDQUF1STVPLElBQXZJLENBQTRJLENBQUM7QUFBRXNRLFVBQUFBLFVBQUY7QUFBZUMsVUFBQUE7QUFBZixTQUFELEtBQTRCO0FBQzNLLGdCQUFNbkQsR0FBRyxHQUFHaFYsTUFBTSxDQUFDeU0sTUFBUCxDQUFjO0FBQ3RCMEwsWUFBQUEsTUFBTSxFQUFFQTtBQURjLFdBQWQsRUFFVEQsVUFGUyxDQUFaO0FBR0EsaUJBQU8sV0FBV0EsVUFBWCxHQUF3QkEsVUFBeEIsR0FBcUNsRCxHQUE1QztBQUNILFNBTE0sRUFLSnJOLEtBTEksQ0FLRytGLEdBQUQsSUFBTztBQUNaLGNBQUlPLFFBQUosRUFBYztBQUNWO0FBQ0Esa0JBQU1QLEdBQU47QUFDSDs7QUFDRCxpQkFBTztBQUNIQyxZQUFBQSxLQUFLLEVBQUVEO0FBREosV0FBUDtBQUdILFNBYk0sQ0FBUDtBQWNILE9BcENnQixDQUFqQjtBQXFDSCxLQXpERTs7QUEwREhPLElBQUFBLFFBQVEsQ0FBRXVJLEtBQUYsRUFBUztBQUNiO0FBQ0E7QUFDQSxVQUFJNkIsRUFBSjs7QUFDQSxVQUFJQSxFQUFFLEdBQUdDLFNBQVMsQ0FBQ0MsVUFBbkIsRUFBK0I7QUFDM0I7QUFDQSxZQUFJRixFQUFFLENBQUNHLFFBQUgsSUFBZSxLQUFLOUYsSUFBTCxDQUFVMkYsRUFBRSxDQUFDSSxhQUFiLENBQW5CLEVBQWdELE9BQU9oUixPQUFPLENBQUNDLE9BQVIsRUFBUDtBQUNuRDs7QUFDRCxhQUFPNE8sZ0JBQWdCLENBQUNDLFdBQUQsRUFBY0MsS0FBZCxDQUFoQixDQUFxQzVPLElBQXJDLENBQTJDOFEsTUFBRCxJQUFValIsT0FBTyxDQUFDNkIsR0FBUixDQUFZd0wsV0FBVyxHQUFHNEQsTUFBTSxDQUFDakMsT0FBUCxDQUFlMVEsR0FBZixDQUFvQjRQLE1BQUQsSUFBVVosY0FBYyxDQUFDWSxNQUFELEVBQVMsUUFBVCxDQUEzQyxDQUFILEdBQzFFLEVBRG1ELENBQXBELEVBRUwvTixJQUZLLENBRUEsTUFBSTtBQUNQLFNBQUMsR0FBR21NLG9CQUFKLEVBQTBCcEIsbUJBQTFCLENBQThDLE1BQUksS0FBS3FGLFNBQUwsQ0FBZXhCLEtBQWYsRUFBc0IsSUFBdEIsRUFBNEI3TyxLQUE1QixDQUFrQyxNQUFJLENBQ25GLENBRDZDLENBQWxEO0FBR0gsT0FOTSxFQU1KQSxLQU5JLEVBTUU7QUFDVCxZQUFJLENBQ0gsQ0FSTSxDQUFQO0FBU0g7O0FBM0VFLEdBQVA7QUE2RUg7Ozs7Ozs7Ozs7O0FDdFJZOztBQUNiM0gsOENBQTZDO0FBQ3pDRyxFQUFBQSxLQUFLLEVBQUU7QUFEa0MsQ0FBN0M7QUFHQUgsMENBQXlDO0FBQ3JDZ0IsRUFBQUEsVUFBVSxFQUFFLElBRHlCO0FBRXJDOEYsRUFBQUEsR0FBRyxFQUFFLFlBQVc7QUFDWixXQUFPZ0gsT0FBTyxDQUFDMU4sT0FBZjtBQUNIO0FBSm9DLENBQXpDO0FBTUFKLDhDQUE2QztBQUN6Q2dCLEVBQUFBLFVBQVUsRUFBRSxJQUQ2QjtBQUV6QzhGLEVBQUFBLEdBQUcsRUFBRSxZQUFXO0FBQ1osV0FBTzZSLFdBQVcsQ0FBQ3ZZLE9BQW5CO0FBQ0g7QUFKd0MsQ0FBN0M7QUFNQUYsaUJBQUEsR0FBb0JxUSxTQUFwQjtBQUNBclEsb0JBQUEsR0FBdUIwWSxZQUF2QjtBQUNBMVksZ0NBQUEsR0FBbUMyWSx3QkFBbkM7QUFDQTNZLGVBQUEsR0FBa0IsS0FBSyxDQUF2Qjs7QUFDQSxJQUFJSSxNQUFNLEdBQUdDLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLG9CQUFELENBQVIsQ0FBbkM7O0FBQ0EsSUFBSXNOLE9BQU8sR0FBR3ZOLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLHlGQUFELENBQVIsQ0FBcEM7O0FBQ0EsSUFBSXNZLGNBQWMsR0FBR3RZLG1CQUFPLENBQUMsa0VBQUQsQ0FBNUI7O0FBQ0EsSUFBSW1ZLFdBQVcsR0FBR3BZLHNCQUFzQixDQUFDQyxtQkFBTyxDQUFDLHFFQUFELENBQVIsQ0FBeEM7O0FBQ0EsU0FBU0Qsc0JBQVQsQ0FBZ0NPLEdBQWhDLEVBQXFDO0FBQ2pDLFNBQU9BLEdBQUcsSUFBSUEsR0FBRyxDQUFDSyxVQUFYLEdBQXdCTCxHQUF4QixHQUE4QjtBQUNqQ1YsSUFBQUEsT0FBTyxFQUFFVTtBQUR3QixHQUFyQztBQUdIOztBQUNELE1BQU1pWSxlQUFlLEdBQUc7QUFDcEI3SyxFQUFBQSxNQUFNLEVBQUUsSUFEWTtBQUVwQjhLLEVBQUFBLGNBQWMsRUFBRSxFQUZJOztBQUdwQkMsRUFBQUEsS0FBSyxDQUFFakcsRUFBRixFQUFNO0FBQ1AsUUFBSSxLQUFLOUUsTUFBVCxFQUFpQixPQUFPOEUsRUFBRSxFQUFUOztBQUNqQixlQUFtQyxFQUVsQztBQUNKOztBQVJtQixDQUF4QixFQVVBOztBQUNBLE1BQU1rRyxpQkFBaUIsR0FBRyxDQUN0QixVQURzQixFQUV0QixPQUZzQixFQUd0QixPQUhzQixFQUl0QixRQUpzQixFQUt0QixZQUxzQixFQU10QixZQU5zQixFQU90QixVQVBzQixFQVF0QixRQVJzQixFQVN0QixTQVRzQixFQVV0QixlQVZzQixFQVd0QixTQVhzQixFQVl0QixXQVpzQixFQWF0QixnQkFic0IsRUFjdEIsZUFkc0IsQ0FBMUI7QUFnQkEsTUFBTUMsWUFBWSxHQUFHLENBQ2pCLGtCQURpQixFQUVqQixxQkFGaUIsRUFHakIscUJBSGlCLEVBSWpCLGtCQUppQixFQUtqQixpQkFMaUIsRUFNakIsb0JBTmlCLENBQXJCO0FBUUEsTUFBTUMsZ0JBQWdCLEdBQUcsQ0FDckIsTUFEcUIsRUFFckIsU0FGcUIsRUFHckIsUUFIcUIsRUFJckIsTUFKcUIsRUFLckIsVUFMcUIsRUFNckIsZ0JBTnFCLENBQXpCLEVBUUE7O0FBQ0FwWixNQUFNLENBQUNDLGNBQVAsQ0FBc0I4WSxlQUF0QixFQUF1QyxRQUF2QyxFQUFpRDtBQUM3Q2pTLEVBQUFBLEdBQUcsR0FBSTtBQUNILFdBQU9nSCxPQUFPLENBQUMxTixPQUFSLENBQWdCaVosTUFBdkI7QUFDSDs7QUFINEMsQ0FBakQ7QUFLQUgsaUJBQWlCLENBQUNqWCxPQUFsQixDQUEyQnFYLEtBQUQsSUFBUztBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBdFosRUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCOFksZUFBdEIsRUFBdUNPLEtBQXZDLEVBQThDO0FBQzFDeFMsSUFBQUEsR0FBRyxHQUFJO0FBQ0gsWUFBTW9ILE1BQU0sR0FBR3FMLFNBQVMsRUFBeEI7QUFDQSxhQUFPckwsTUFBTSxDQUFDb0wsS0FBRCxDQUFiO0FBQ0g7O0FBSnlDLEdBQTlDO0FBTUgsQ0FYRDtBQVlBRixnQkFBZ0IsQ0FBQ25YLE9BQWpCLENBQTBCcVgsS0FBRCxJQUFTO0FBQzlCUCxFQUFBQSxlQUFlLENBQUNPLEtBQUQsQ0FBZixHQUF5QixDQUFDLEdBQUc1SixJQUFKLEtBQVc7QUFDaEMsVUFBTXhCLE1BQU0sR0FBR3FMLFNBQVMsRUFBeEI7QUFDQSxXQUFPckwsTUFBTSxDQUFDb0wsS0FBRCxDQUFOLENBQWMsR0FBRzVKLElBQWpCLENBQVA7QUFDSCxHQUhEO0FBSUgsQ0FMRDtBQU1BeUosWUFBWSxDQUFDbFgsT0FBYixDQUFzQnVNLEtBQUQsSUFBUztBQUMxQnVLLEVBQUFBLGVBQWUsQ0FBQ0UsS0FBaEIsQ0FBc0IsTUFBSTtBQUN0Qm5MLElBQUFBLE9BQU8sQ0FBQzFOLE9BQVIsQ0FBZ0JpWixNQUFoQixDQUF1QkcsRUFBdkIsQ0FBMEJoTCxLQUExQixFQUFpQyxDQUFDLEdBQUdrQixJQUFKLEtBQVc7QUFDeEMsWUFBTStKLFVBQVUsR0FBSSxLQUFJakwsS0FBSyxDQUFDa0wsTUFBTixDQUFhLENBQWIsRUFBZ0JDLFdBQWhCLEVBQThCLEdBQUVuTCxLQUFLLENBQUNvTCxTQUFOLENBQWdCLENBQWhCLENBQW1CLEVBQTNFO0FBQ0EsWUFBTUMsZ0JBQWdCLEdBQUdkLGVBQXpCOztBQUNBLFVBQUljLGdCQUFnQixDQUFDSixVQUFELENBQXBCLEVBQWtDO0FBQzlCLFlBQUk7QUFDQUksVUFBQUEsZ0JBQWdCLENBQUNKLFVBQUQsQ0FBaEIsQ0FBNkIsR0FBRy9KLElBQWhDO0FBQ0gsU0FGRCxDQUVFLE9BQU9oQyxHQUFQLEVBQVk7QUFDVmxGLFVBQUFBLE9BQU8sQ0FBQ21GLEtBQVIsQ0FBZSx3Q0FBdUM4TCxVQUFXLEVBQWpFO0FBQ0FqUixVQUFBQSxPQUFPLENBQUNtRixLQUFSLENBQWUsR0FBRUQsR0FBRyxDQUFDb00sT0FBUSxLQUFJcE0sR0FBRyxDQUFDcU0sS0FBTSxFQUEzQztBQUNIO0FBQ0o7QUFDSixLQVhEO0FBWUgsR0FiRDtBQWNILENBZkQ7O0FBZ0JBLFNBQVNSLFNBQVQsR0FBcUI7QUFDakIsTUFBSSxDQUFDUixlQUFlLENBQUM3SyxNQUFyQixFQUE2QjtBQUN6QixVQUFNNEwsT0FBTyxHQUFHLGdDQUFnQyxxRUFBaEQ7QUFDQSxVQUFNLElBQUk5UyxLQUFKLENBQVU4UyxPQUFWLENBQU47QUFDSDs7QUFDRCxTQUFPZixlQUFlLENBQUM3SyxNQUF2QjtBQUNIOztBQUNELElBQUltRSxRQUFRLEdBQUcwRyxlQUFmO0FBQ0E3WSxlQUFBLEdBQWtCbVMsUUFBbEI7O0FBQ0EsU0FBUzlCLFNBQVQsR0FBcUI7QUFDakIsU0FBT2pRLE1BQU0sQ0FBQ0YsT0FBUCxDQUFlNFosVUFBZixDQUEwQmxCLGNBQWMsQ0FBQ21CLGFBQXpDLENBQVA7QUFDSDs7QUFDRCxTQUFTckIsWUFBVCxDQUFzQixHQUFHbEosSUFBekIsRUFBK0I7QUFDM0JxSixFQUFBQSxlQUFlLENBQUM3SyxNQUFoQixHQUF5QixJQUFJSixPQUFPLENBQUMxTixPQUFaLENBQW9CLEdBQUdzUCxJQUF2QixDQUF6QjtBQUNBcUosRUFBQUEsZUFBZSxDQUFDQyxjQUFoQixDQUErQi9XLE9BQS9CLENBQXdDK1EsRUFBRCxJQUFNQSxFQUFFLEVBQS9DO0FBRUErRixFQUFBQSxlQUFlLENBQUNDLGNBQWhCLEdBQWlDLEVBQWpDO0FBQ0EsU0FBT0QsZUFBZSxDQUFDN0ssTUFBdkI7QUFDSDs7QUFDRCxTQUFTMkssd0JBQVQsQ0FBa0MzSyxNQUFsQyxFQUEwQztBQUN0QyxRQUFNSCxRQUFRLEdBQUdHLE1BQWpCO0FBQ0EsUUFBTWdNLFFBQVEsR0FBRyxFQUFqQjs7QUFFQSxPQUFLLE1BQU1DLFFBQVgsSUFBdUJqQixpQkFBdkIsRUFBeUM7QUFDckMsUUFBSSxPQUFPbkwsUUFBUSxDQUFDb00sUUFBRCxDQUFmLEtBQThCLFFBQWxDLEVBQTRDO0FBQ3hDRCxNQUFBQSxRQUFRLENBQUNDLFFBQUQsQ0FBUixHQUFxQm5hLE1BQU0sQ0FBQ3lNLE1BQVAsQ0FBYzJOLEtBQUssQ0FBQ0MsT0FBTixDQUFjdE0sUUFBUSxDQUFDb00sUUFBRCxDQUF0QixJQUFvQyxFQUFwQyxHQUF5QyxFQUF2RCxFQUNsQnBNLFFBQVEsQ0FBQ29NLFFBQUQsQ0FEVSxDQUFyQixDQUN1QjtBQUR2QjtBQUdBO0FBQ0g7O0FBQ0RELElBQUFBLFFBQVEsQ0FBQ0MsUUFBRCxDQUFSLEdBQXFCcE0sUUFBUSxDQUFDb00sUUFBRCxDQUE3QjtBQUNILEdBWnFDLENBYXRDOzs7QUFDQUQsRUFBQUEsUUFBUSxDQUFDYixNQUFULEdBQWtCdkwsT0FBTyxDQUFDMU4sT0FBUixDQUFnQmlaLE1BQWxDO0FBQ0FELEVBQUFBLGdCQUFnQixDQUFDblgsT0FBakIsQ0FBMEJxWCxLQUFELElBQVM7QUFDOUJZLElBQUFBLFFBQVEsQ0FBQ1osS0FBRCxDQUFSLEdBQWtCLENBQUMsR0FBRzVKLElBQUosS0FBVztBQUN6QixhQUFPM0IsUUFBUSxDQUFDdUwsS0FBRCxDQUFSLENBQWdCLEdBQUc1SixJQUFuQixDQUFQO0FBQ0gsS0FGRDtBQUdILEdBSkQ7QUFLQSxTQUFPd0ssUUFBUDtBQUNIOzs7Ozs7Ozs7OztBQ3hKWTs7QUFDYmxhLDhDQUE2QztBQUN6Q0csRUFBQUEsS0FBSyxFQUFFO0FBRGtDLENBQTdDO0FBR0FELHVCQUFBLEdBQTBCeUssZUFBMUI7O0FBQ0EsSUFBSXJLLE1BQU0sR0FBR0UsbUJBQU8sQ0FBQyxvQkFBRCxDQUFwQjs7QUFDQSxJQUFJdVQsb0JBQW9CLEdBQUd2VCxtQkFBTyxDQUFDLHlGQUFELENBQWxDOztBQUNBLE1BQU04Wix1QkFBdUIsR0FBRyxPQUFPQyxvQkFBUCxLQUFnQyxXQUFoRTs7QUFDQSxTQUFTNVAsZUFBVCxDQUF5QjtBQUFFQyxFQUFBQSxVQUFGO0FBQWVDLEVBQUFBO0FBQWYsQ0FBekIsRUFBcUQ7QUFDakQsUUFBTTJQLFVBQVUsR0FBRzNQLFFBQVEsSUFBSSxDQUFDeVAsdUJBQWhDO0FBQ0EsUUFBTUcsU0FBUyxHQUFHLENBQUMsR0FBR25hLE1BQUosRUFBWStQLE1BQVosRUFBbEI7QUFDQSxRQUFNLENBQUNxSyxPQUFELEVBQVVDLFVBQVYsSUFBd0IsQ0FBQyxHQUFHcmEsTUFBSixFQUFZc2EsUUFBWixDQUFxQixLQUFyQixDQUE5QjtBQUNBLFFBQU1uUSxNQUFNLEdBQUcsQ0FBQyxHQUFHbkssTUFBSixFQUFZNFEsV0FBWixDQUF5QkMsRUFBRCxJQUFNO0FBQ3pDLFFBQUlzSixTQUFTLENBQUNuSyxPQUFkLEVBQXVCO0FBQ25CbUssTUFBQUEsU0FBUyxDQUFDbkssT0FBVjtBQUNBbUssTUFBQUEsU0FBUyxDQUFDbkssT0FBVixHQUFvQnROLFNBQXBCO0FBQ0g7O0FBQ0QsUUFBSXdYLFVBQVUsSUFBSUUsT0FBbEIsRUFBMkI7O0FBQzNCLFFBQUl2SixFQUFFLElBQUlBLEVBQUUsQ0FBQzBKLE9BQWIsRUFBc0I7QUFDbEJKLE1BQUFBLFNBQVMsQ0FBQ25LLE9BQVYsR0FBb0J3SyxPQUFPLENBQUMzSixFQUFELEVBQU1yRyxTQUFELElBQWFBLFNBQVMsSUFBSTZQLFVBQVUsQ0FBQzdQLFNBQUQsQ0FBekMsRUFDekI7QUFDRUYsUUFBQUE7QUFERixPQUR5QixDQUEzQjtBQUlIO0FBQ0osR0FaYyxFQVlaLENBQ0M0UCxVQURELEVBRUM1UCxVQUZELEVBR0M4UCxPQUhELENBWlksQ0FBZjtBQWlCQSxHQUFDLEdBQUdwYSxNQUFKLEVBQVk4USxTQUFaLENBQXNCLE1BQUk7QUFDdEIsUUFBSSxDQUFDa0osdUJBQUwsRUFBOEI7QUFDMUIsVUFBSSxDQUFDSSxPQUFMLEVBQWM7QUFDVixjQUFNSyxZQUFZLEdBQUcsQ0FBQyxHQUFHaEgsb0JBQUosRUFBMEJwQixtQkFBMUIsQ0FBOEMsTUFBSWdJLFVBQVUsQ0FBQyxJQUFELENBQTVELENBQXJCO0FBRUEsZUFBTyxNQUFJLENBQUMsR0FBRzVHLG9CQUFKLEVBQTBCbkIsa0JBQTFCLENBQTZDbUksWUFBN0MsQ0FBWDtBQUVIO0FBQ0o7QUFDSixHQVRELEVBU0csQ0FDQ0wsT0FERCxDQVRIO0FBWUEsU0FBTyxDQUNIalEsTUFERyxFQUVIaVEsT0FGRyxDQUFQO0FBSUg7O0FBQ0QsU0FBU0ksT0FBVCxDQUFpQkUsT0FBakIsRUFBMEJDLFFBQTFCLEVBQW9DOU0sT0FBcEMsRUFBNkM7QUFDekMsUUFBTTtBQUFFcUYsSUFBQUEsRUFBRjtBQUFPMEgsSUFBQUEsUUFBUDtBQUFrQkMsSUFBQUE7QUFBbEIsTUFBZ0NDLGNBQWMsQ0FBQ2pOLE9BQUQsQ0FBcEQ7QUFDQWdOLEVBQUFBLFFBQVEsQ0FBQzdOLEdBQVQsQ0FBYTBOLE9BQWIsRUFBc0JDLFFBQXRCO0FBQ0FDLEVBQUFBLFFBQVEsQ0FBQ0osT0FBVCxDQUFpQkUsT0FBakI7QUFDQSxTQUFPLFNBQVNQLFNBQVQsR0FBcUI7QUFDeEJVLElBQUFBLFFBQVEsQ0FBQ0UsTUFBVCxDQUFnQkwsT0FBaEI7QUFDQUUsSUFBQUEsUUFBUSxDQUFDVCxTQUFULENBQW1CTyxPQUFuQixFQUZ3QixDQUd4Qjs7QUFDQSxRQUFJRyxRQUFRLENBQUNHLElBQVQsS0FBa0IsQ0FBdEIsRUFBeUI7QUFDckJKLE1BQUFBLFFBQVEsQ0FBQ0ssVUFBVDtBQUNBQyxNQUFBQSxTQUFTLENBQUNILE1BQVYsQ0FBaUI3SCxFQUFqQjtBQUNIO0FBQ0osR0FSRDtBQVNIOztBQUNELE1BQU1nSSxTQUFTLEdBQUcsSUFBSXRZLEdBQUosRUFBbEI7O0FBQ0EsU0FBU2tZLGNBQVQsQ0FBd0JqTixPQUF4QixFQUFpQztBQUM3QixRQUFNcUYsRUFBRSxHQUFHckYsT0FBTyxDQUFDdkQsVUFBUixJQUFzQixFQUFqQztBQUNBLE1BQUlzUCxRQUFRLEdBQUdzQixTQUFTLENBQUMxVSxHQUFWLENBQWMwTSxFQUFkLENBQWY7O0FBQ0EsTUFBSTBHLFFBQUosRUFBYztBQUNWLFdBQU9BLFFBQVA7QUFDSDs7QUFDRCxRQUFNaUIsUUFBUSxHQUFHLElBQUlqWSxHQUFKLEVBQWpCO0FBQ0EsUUFBTWdZLFFBQVEsR0FBRyxJQUFJWCxvQkFBSixDQUEwQmtCLE9BQUQsSUFBVztBQUNqREEsSUFBQUEsT0FBTyxDQUFDeFosT0FBUixDQUFpQmtTLEtBQUQsSUFBUztBQUNyQixZQUFNOEcsUUFBUSxHQUFHRSxRQUFRLENBQUNyVSxHQUFULENBQWFxTixLQUFLLENBQUM5UyxNQUFuQixDQUFqQjtBQUNBLFlBQU15SixTQUFTLEdBQUdxSixLQUFLLENBQUN1SCxjQUFOLElBQXdCdkgsS0FBSyxDQUFDd0gsaUJBQU4sR0FBMEIsQ0FBcEU7O0FBQ0EsVUFBSVYsUUFBUSxJQUFJblEsU0FBaEIsRUFBMkI7QUFDdkJtUSxRQUFBQSxRQUFRLENBQUNuUSxTQUFELENBQVI7QUFDSDtBQUNKLEtBTkQ7QUFPSCxHQVJnQixFQVFkcUQsT0FSYyxDQUFqQjtBQVNBcU4sRUFBQUEsU0FBUyxDQUFDbE8sR0FBVixDQUFja0csRUFBZCxFQUFrQjBHLFFBQVEsR0FBRztBQUN6QjFHLElBQUFBLEVBRHlCO0FBRXpCMEgsSUFBQUEsUUFGeUI7QUFHekJDLElBQUFBO0FBSHlCLEdBQTdCO0FBS0EsU0FBT2pCLFFBQVA7QUFDSDs7Ozs7Ozs7Ozs7QUNuRlk7O0FBQ2JsYSw4Q0FBNkM7QUFDekNHLEVBQUFBLEtBQUssRUFBRTtBQURrQyxDQUE3QztBQUdBRCxlQUFBLEdBQWtCMGIsVUFBbEI7O0FBQ0EsSUFBSXRiLE1BQU0sR0FBR0Msc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsb0JBQUQsQ0FBUixDQUFuQzs7QUFDQSxJQUFJc04sT0FBTyxHQUFHdE4sbUJBQU8sQ0FBQywyREFBRCxDQUFyQjs7QUFDQSxTQUFTRCxzQkFBVCxDQUFnQ08sR0FBaEMsRUFBcUM7QUFDakMsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNLLFVBQVgsR0FBd0JMLEdBQXhCLEdBQThCO0FBQ2pDVixJQUFBQSxPQUFPLEVBQUVVO0FBRHdCLEdBQXJDO0FBR0g7O0FBQ0QsU0FBUzhhLFVBQVQsQ0FBb0JDLGlCQUFwQixFQUF1QztBQUNuQyxXQUFTQyxpQkFBVCxDQUEyQnRNLEtBQTNCLEVBQWtDO0FBQzlCLFdBQU8sYUFBY2xQLE1BQU0sQ0FBQ0YsT0FBUCxDQUFla00sYUFBZixDQUE2QnVQLGlCQUE3QixFQUFnRDdiLE1BQU0sQ0FBQ3lNLE1BQVAsQ0FBYztBQUMvRXlCLE1BQUFBLE1BQU0sRUFBRSxDQUFDLEdBQUdKLE9BQUosRUFBYXlDLFNBQWI7QUFEdUUsS0FBZCxFQUVsRWYsS0FGa0UsQ0FBaEQsQ0FBckI7QUFHSDs7QUFDRHNNLEVBQUFBLGlCQUFpQixDQUFDQyxlQUFsQixHQUFvQ0YsaUJBQWlCLENBQUNFLGVBQXREO0FBQ0FELEVBQUFBLGlCQUFpQixDQUFDRSxtQkFBbEIsR0FBd0NILGlCQUFpQixDQUFDRyxtQkFBMUQ7O0FBQ0EsWUFBMkM7QUFDdkMsVUFBTUMsSUFBSSxHQUFHSixpQkFBaUIsQ0FBQ0ssV0FBbEIsSUFBaUNMLGlCQUFpQixDQUFDSSxJQUFuRCxJQUEyRCxTQUF4RTtBQUNBSCxJQUFBQSxpQkFBaUIsQ0FBQ0ksV0FBbEIsR0FBaUMsY0FBYUQsSUFBSyxHQUFuRDtBQUNIOztBQUNELFNBQU9ILGlCQUFQO0FBQ0g7Ozs7Ozs7Ozs7O0FDekJZOztBQUNiOWIsOENBQTZDO0FBQ3pDRyxFQUFBQSxLQUFLLEVBQUU7QUFEa0MsQ0FBN0M7QUFHQUQsdUJBQUEsR0FBMEI0UixlQUExQjtBQUNBNVIsaUJBQUEsR0FBb0JnUyxTQUFwQjtBQUNBaFMsaUJBQUEsR0FBb0JpYyxTQUFwQjtBQUNBamMsbUJBQUEsR0FBc0JrYyxXQUF0QjtBQUNBbGMsbUJBQUEsR0FBc0IrUixXQUF0QjtBQUNBL1IsbUJBQUEsR0FBc0JtYyxXQUF0QjtBQUNBbmMsa0JBQUEsR0FBcUJrTyxVQUFyQjtBQUNBbE8scUJBQUEsR0FBd0JvYyxhQUF4QjtBQUNBcGMsbUJBQUEsR0FBc0J5USxXQUF0QjtBQUNBelEsZUFBQSxHQUFrQixLQUFLLENBQXZCOztBQUNBLElBQUlxYyx1QkFBdUIsR0FBRy9iLG1CQUFPLENBQUMsNkdBQUQsQ0FBckM7O0FBQ0EsSUFBSWdjLFlBQVksR0FBR2hjLG1CQUFPLENBQUMscUZBQUQsQ0FBMUI7O0FBQ0EsSUFBSWljLG9CQUFvQixHQUFHamMsbUJBQU8sQ0FBQyxvRkFBRCxDQUFsQzs7QUFDQSxJQUFJa2Msb0JBQW9CLEdBQUdsYyxtQkFBTyxDQUFDLG9FQUFELENBQWxDOztBQUNBLElBQUltYyxLQUFLLEdBQUdwYyxzQkFBc0IsQ0FBQ0MsbUJBQU8sQ0FBQyx3QkFBRCxDQUFSLENBQWxDOztBQUNBLElBQUlvYyxNQUFNLEdBQUdwYyxtQkFBTyxDQUFDLHFDQUFELENBQXBCOztBQUNBLElBQUlxYyxVQUFVLEdBQUdyYyxtQkFBTyxDQUFDLDhDQUFELENBQXhCOztBQUNBLElBQUlzYyxpQkFBaUIsR0FBR3RjLG1CQUFPLENBQUMsOERBQUQsQ0FBL0I7O0FBQ0EsSUFBSXVjLFlBQVksR0FBR3ZjLG1CQUFPLENBQUMsZ0RBQUQsQ0FBMUI7O0FBQ0EsSUFBSXdjLGdCQUFnQixHQUFHemMsc0JBQXNCLENBQUNDLG1CQUFPLENBQUMsdUNBQUQsQ0FBUixDQUE3Qzs7QUFDQSxJQUFJeWMsYUFBYSxHQUFHemMsbUJBQU8sQ0FBQyxvREFBRCxDQUEzQjs7QUFDQSxJQUFJMGMsV0FBVyxHQUFHMWMsbUJBQU8sQ0FBQyxnREFBRCxDQUF6Qjs7QUFDQSxTQUFTRCxzQkFBVCxDQUFnQ08sR0FBaEMsRUFBcUM7QUFDakMsU0FBT0EsR0FBRyxJQUFJQSxHQUFHLENBQUNLLFVBQVgsR0FBd0JMLEdBQXhCLEdBQThCO0FBQ2pDVixJQUFBQSxPQUFPLEVBQUVVO0FBRHdCLEdBQXJDO0FBR0g7O0FBQ0QsSUFBSXFjLGtCQUFKOztBQUNBLElBQUk1WSxLQUFKLEVBQXFDLEVBRXBDOztBQUNELE1BQU04WSxRQUFRLEdBQUc5WSxNQUFBLElBQXNDLEVBQXZEOztBQUNBLFNBQVNnWixzQkFBVCxHQUFrQztBQUM5QixTQUFPdmQsTUFBTSxDQUFDeU0sTUFBUCxDQUFjLElBQUl6RixLQUFKLENBQVUsaUJBQVYsQ0FBZCxFQUE0QztBQUMvQ2lQLElBQUFBLFNBQVMsRUFBRTtBQURvQyxHQUE1QyxDQUFQO0FBR0g7O0FBQ0QsU0FBU3VILGFBQVQsQ0FBdUJyWixJQUF2QixFQUE2QnNaLE1BQTdCLEVBQXFDO0FBQ2pDLFNBQU9BLE1BQU0sSUFBSXRaLElBQUksQ0FBQ29ELFVBQUwsQ0FBZ0IsR0FBaEIsQ0FBVixHQUFpQ3BELElBQUksS0FBSyxHQUFULEdBQWUsQ0FBQyxHQUFHb1ksdUJBQUosRUFBNkJoSywwQkFBN0IsQ0FBd0RrTCxNQUF4RCxDQUFmLEdBQWtGLEdBQUVBLE1BQU8sR0FBRUMsZUFBZSxDQUFDdlosSUFBRCxDQUFmLEtBQTBCLEdBQTFCLEdBQWdDQSxJQUFJLENBQUN5VixTQUFMLENBQWUsQ0FBZixDQUFoQyxHQUFvRHpWLElBQUssRUFBdkwsR0FBMkxBLElBQWxNO0FBQ0g7O0FBQ0QsU0FBUzJOLGVBQVQsQ0FBeUIzTixJQUF6QixFQUErQm1LLE1BQS9CLEVBQXVDeUQsT0FBdkMsRUFBZ0RDLGFBQWhELEVBQStEO0FBQzNELE1BQUl6TixLQUFKLEVBQXFDLEVBQXJDLE1BT087QUFDSCxXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFNBQVMyTixTQUFULENBQW1CL04sSUFBbkIsRUFBeUJtSyxNQUF6QixFQUFpQzZELGFBQWpDLEVBQWdEO0FBQzVDLE1BQUk1TixLQUFKLEVBQXFDLEVBS3BDOztBQUNELFNBQU9KLElBQVA7QUFDSDs7QUFDRCxTQUFTZ1ksU0FBVCxDQUFtQmhZLElBQW5CLEVBQXlCbUssTUFBekIsRUFBaUM7QUFDN0IsTUFBSS9KLEtBQUosRUFBcUMsRUFLcEM7O0FBQ0QsU0FBT0osSUFBUDtBQUNIOztBQUNELFNBQVN1WixlQUFULENBQXlCdlosSUFBekIsRUFBK0I7QUFDM0IsUUFBTWthLFVBQVUsR0FBR2xhLElBQUksQ0FBQzdCLE9BQUwsQ0FBYSxHQUFiLENBQW5CO0FBQ0EsUUFBTWdjLFNBQVMsR0FBR25hLElBQUksQ0FBQzdCLE9BQUwsQ0FBYSxHQUFiLENBQWxCOztBQUNBLE1BQUkrYixVQUFVLEdBQUcsQ0FBQyxDQUFkLElBQW1CQyxTQUFTLEdBQUcsQ0FBQyxDQUFwQyxFQUF1QztBQUNuQ25hLElBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDeVYsU0FBTCxDQUFlLENBQWYsRUFBa0J5RSxVQUFVLEdBQUcsQ0FBQyxDQUFkLEdBQWtCQSxVQUFsQixHQUErQkMsU0FBakQsQ0FBUDtBQUNIOztBQUNELFNBQU9uYSxJQUFQO0FBQ0g7O0FBQ0QsU0FBU2lZLFdBQVQsQ0FBcUJqWSxJQUFyQixFQUEyQjtBQUN2QkEsRUFBQUEsSUFBSSxHQUFHdVosZUFBZSxDQUFDdlosSUFBRCxDQUF0QjtBQUNBLFNBQU9BLElBQUksS0FBS2taLFFBQVQsSUFBcUJsWixJQUFJLENBQUNvRCxVQUFMLENBQWdCOFYsUUFBUSxHQUFHLEdBQTNCLENBQTVCO0FBQ0g7O0FBQ0QsU0FBU3BMLFdBQVQsQ0FBcUI5TixJQUFyQixFQUEyQjtBQUN2QjtBQUNBLFNBQU9xWixhQUFhLENBQUNyWixJQUFELEVBQU9rWixRQUFQLENBQXBCO0FBQ0g7O0FBQ0QsU0FBU2hCLFdBQVQsQ0FBcUJsWSxJQUFyQixFQUEyQjtBQUN2QkEsRUFBQUEsSUFBSSxHQUFHQSxJQUFJLENBQUM4SSxLQUFMLENBQVdvUSxRQUFRLENBQUM3YixNQUFwQixDQUFQO0FBQ0EsTUFBSSxDQUFDMkMsSUFBSSxDQUFDb0QsVUFBTCxDQUFnQixHQUFoQixDQUFMLEVBQTJCcEQsSUFBSSxHQUFJLElBQUdBLElBQUssRUFBaEI7QUFDM0IsU0FBT0EsSUFBUDtBQUNIOztBQUNELFNBQVNpSyxVQUFULENBQW9CbEIsR0FBcEIsRUFBeUI7QUFDckI7QUFDQSxNQUFJQSxHQUFHLENBQUMzRixVQUFKLENBQWUsR0FBZixLQUF1QjJGLEdBQUcsQ0FBQzNGLFVBQUosQ0FBZSxHQUFmLENBQXZCLElBQThDMkYsR0FBRyxDQUFDM0YsVUFBSixDQUFlLEdBQWYsQ0FBbEQsRUFBdUUsT0FBTyxJQUFQOztBQUN2RSxNQUFJO0FBQ0E7QUFDQSxVQUFNZ1gsY0FBYyxHQUFHLENBQUMsR0FBRzNCLE1BQUosRUFBWTRCLGlCQUFaLEVBQXZCO0FBQ0EsVUFBTUMsUUFBUSxHQUFHLElBQUl0UixHQUFKLENBQVFELEdBQVIsRUFBYXFSLGNBQWIsQ0FBakI7QUFDQSxXQUFPRSxRQUFRLENBQUNDLE1BQVQsS0FBb0JILGNBQXBCLElBQXNDbkMsV0FBVyxDQUFDcUMsUUFBUSxDQUFDVCxRQUFWLENBQXhEO0FBQ0gsR0FMRCxDQUtFLE9BQU9qTyxDQUFQLEVBQVU7QUFDUixXQUFPLEtBQVA7QUFDSDtBQUNKOztBQUNELFNBQVN1TSxhQUFULENBQXVCOUYsS0FBdkIsRUFBOEJtSSxVQUE5QixFQUEwQ0MsS0FBMUMsRUFBaUQ7QUFDN0MsTUFBSUMsaUJBQWlCLEdBQUcsRUFBeEI7QUFDQSxRQUFNQyxZQUFZLEdBQUcsQ0FBQyxHQUFHNUIsV0FBSixFQUFpQjZCLGFBQWpCLENBQStCdkksS0FBL0IsQ0FBckI7QUFDQSxRQUFNd0ksYUFBYSxHQUFHRixZQUFZLENBQUNHLE1BQW5DO0FBQ0EsUUFBTUMsY0FBYyxHQUFHO0FBQ3ZCLEdBQUNQLFVBQVUsS0FBS25JLEtBQWYsR0FBdUIsQ0FBQyxHQUFHeUcsYUFBSixFQUFtQmtDLGVBQW5CLENBQW1DTCxZQUFuQyxFQUFpREgsVUFBakQsQ0FBdkIsR0FBc0YsRUFBdkYsS0FBOEY7QUFDOUY7QUFDQUMsRUFBQUEsS0FIQTtBQUlBQyxFQUFBQSxpQkFBaUIsR0FBR3JJLEtBQXBCO0FBQ0EsUUFBTXBKLE1BQU0sR0FBR3BOLE1BQU0sQ0FBQzJCLElBQVAsQ0FBWXFkLGFBQVosQ0FBZjs7QUFDQSxNQUFJLENBQUM1UixNQUFNLENBQUNnUyxLQUFQLENBQWNDLEtBQUQsSUFBUztBQUN2QixRQUFJbGYsS0FBSyxHQUFHK2UsY0FBYyxDQUFDRyxLQUFELENBQWQsSUFBeUIsRUFBckM7QUFDQSxVQUFNO0FBQUVDLE1BQUFBLE1BQUY7QUFBV0MsTUFBQUE7QUFBWCxRQUF5QlAsYUFBYSxDQUFDSyxLQUFELENBQTVDLENBRnVCLENBR3ZCO0FBQ0E7O0FBQ0EsUUFBSUcsUUFBUSxHQUFJLElBQUdGLE1BQU0sR0FBRyxLQUFILEdBQVcsRUFBRyxHQUFFRCxLQUFNLEdBQS9DOztBQUNBLFFBQUlFLFFBQUosRUFBYztBQUNWQyxNQUFBQSxRQUFRLEdBQUksR0FBRSxDQUFDcmYsS0FBRCxHQUFTLEdBQVQsR0FBZSxFQUFHLElBQUdxZixRQUFTLEdBQTVDO0FBQ0g7O0FBQ0QsUUFBSUYsTUFBTSxJQUFJLENBQUNsRixLQUFLLENBQUNDLE9BQU4sQ0FBY2xhLEtBQWQsQ0FBZixFQUFxQ0EsS0FBSyxHQUFHLENBQ3pDQSxLQUR5QyxDQUFSO0FBR3JDLFdBQU8sQ0FBQ29mLFFBQVEsSUFBSUYsS0FBSyxJQUFJSCxjQUF0QixNQUNOTCxpQkFBaUIsR0FBR0EsaUJBQWlCLENBQUMzUCxPQUFsQixDQUEwQnNRLFFBQTFCLEVBQW9DRixNQUFNLEdBQUduZixLQUFLLENBQUM0RixHQUFOLEVBQVU7QUFDNUU7QUFDQTtBQUNBO0FBQ0MwWixJQUFBQSxPQUFELElBQVc1UixrQkFBa0IsQ0FBQzRSLE9BQUQsQ0FKcUMsRUFLaEVqWixJQUxnRSxDQUszRCxHQUwyRCxDQUFILEdBS2pEcUgsa0JBQWtCLENBQUMxTixLQUFELENBTFgsS0FLdUIsR0FOckMsQ0FBUDtBQU9ILEdBbkJJLENBQUwsRUFtQkk7QUFDQTBlLElBQUFBLGlCQUFpQixHQUFHLEVBQXBCLENBQXVCO0FBQXZCLEtBREEsQ0FHSjtBQUNBO0FBQ0M7O0FBQ0QsU0FBTztBQUNIelIsSUFBQUEsTUFERztBQUVIc1MsSUFBQUEsTUFBTSxFQUFFYjtBQUZMLEdBQVA7QUFJSDs7QUFDRCxTQUFTYyxrQkFBVCxDQUE0QmYsS0FBNUIsRUFBbUN4UixNQUFuQyxFQUEyQztBQUN2QyxRQUFNd1MsYUFBYSxHQUFHLEVBQXRCO0FBRUE1ZixFQUFBQSxNQUFNLENBQUMyQixJQUFQLENBQVlpZCxLQUFaLEVBQW1CM2MsT0FBbkIsQ0FBNEJsQixHQUFELElBQU87QUFDOUIsUUFBSSxDQUFDcU0sTUFBTSxDQUFDbkQsUUFBUCxDQUFnQmxKLEdBQWhCLENBQUwsRUFBMkI7QUFDdkI2ZSxNQUFBQSxhQUFhLENBQUM3ZSxHQUFELENBQWIsR0FBcUI2ZCxLQUFLLENBQUM3ZCxHQUFELENBQTFCO0FBQ0g7QUFDSixHQUpEO0FBS0EsU0FBTzZlLGFBQVA7QUFDSDs7QUFDRCxTQUFTalAsV0FBVCxDQUFxQnpDLE1BQXJCLEVBQTZCckIsSUFBN0IsRUFBbUNnVCxTQUFuQyxFQUE4QztBQUMxQztBQUNBLE1BQUlDLElBQUo7QUFDQSxNQUFJQyxXQUFXLEdBQUcsT0FBT2xULElBQVAsS0FBZ0IsUUFBaEIsR0FBMkJBLElBQTNCLEdBQWtDLENBQUMsR0FBRytQLE1BQUosRUFBWW9ELG9CQUFaLENBQWlDblQsSUFBakMsQ0FBcEQsQ0FIMEMsQ0FJMUM7QUFDQTs7QUFDQSxRQUFNb1QsYUFBYSxHQUFHRixXQUFXLENBQUMxYSxLQUFaLENBQWtCLG9CQUFsQixDQUF0QjtBQUNBLFFBQU02YSxrQkFBa0IsR0FBR0QsYUFBYSxHQUFHRixXQUFXLENBQUMzQixNQUFaLENBQW1CNkIsYUFBYSxDQUFDLENBQUQsQ0FBYixDQUFpQnplLE1BQXBDLENBQUgsR0FBaUR1ZSxXQUF6RjtBQUNBLFFBQU1JLFFBQVEsR0FBR0Qsa0JBQWtCLENBQUNFLEtBQW5CLENBQXlCLEdBQXpCLENBQWpCOztBQUNBLE1BQUksQ0FBQ0QsUUFBUSxDQUFDLENBQUQsQ0FBUixJQUFlLEVBQWhCLEVBQW9COWEsS0FBcEIsQ0FBMEIsV0FBMUIsQ0FBSixFQUE0QztBQUN4Q21ELElBQUFBLE9BQU8sQ0FBQ21GLEtBQVIsQ0FBZSx1Q0FBc0NvUyxXQUFZLDZFQUFqRTtBQUNBLFVBQU1NLGFBQWEsR0FBRyxDQUFDLEdBQUd6RCxNQUFKLEVBQVkwRCx3QkFBWixDQUFxQ0osa0JBQXJDLENBQXRCO0FBQ0FILElBQUFBLFdBQVcsR0FBRyxDQUFDRSxhQUFhLEdBQUdBLGFBQWEsQ0FBQyxDQUFELENBQWhCLEdBQXNCLEVBQXBDLElBQTBDSSxhQUF4RDtBQUNILEdBYnlDLENBYzFDOzs7QUFDQSxNQUFJLENBQUNqUyxVQUFVLENBQUMyUixXQUFELENBQWYsRUFBOEI7QUFDMUIsV0FBT0YsU0FBUyxHQUFHLENBQ2ZFLFdBRGUsQ0FBSCxHQUVaQSxXQUZKO0FBR0g7O0FBQ0QsTUFBSTtBQUNBRCxJQUFBQSxJQUFJLEdBQUcsSUFBSTNTLEdBQUosQ0FBUTRTLFdBQVcsQ0FBQ3hZLFVBQVosQ0FBdUIsR0FBdkIsSUFBOEIyRyxNQUFNLENBQUNxUyxNQUFyQyxHQUE4Q3JTLE1BQU0sQ0FBQzhQLFFBQTdELEVBQXVFLFVBQXZFLENBQVA7QUFDSCxHQUZELENBRUUsT0FBT2pPLENBQVAsRUFBVTtBQUNSO0FBQ0ErUCxJQUFBQSxJQUFJLEdBQUcsSUFBSTNTLEdBQUosQ0FBUSxHQUFSLEVBQWEsVUFBYixDQUFQO0FBQ0g7O0FBQ0QsTUFBSTtBQUNBLFVBQU1xVCxRQUFRLEdBQUcsSUFBSXJULEdBQUosQ0FBUTRTLFdBQVIsRUFBcUJELElBQXJCLENBQWpCO0FBQ0FVLElBQUFBLFFBQVEsQ0FBQ3hDLFFBQVQsR0FBb0IsQ0FBQyxHQUFHekIsdUJBQUosRUFBNkJoSywwQkFBN0IsQ0FBd0RpTyxRQUFRLENBQUN4QyxRQUFqRSxDQUFwQjtBQUNBLFFBQUl5QyxjQUFjLEdBQUcsRUFBckI7O0FBQ0EsUUFBSSxDQUFDLEdBQUc1RCxVQUFKLEVBQWdCNkQsY0FBaEIsQ0FBK0JGLFFBQVEsQ0FBQ3hDLFFBQXhDLEtBQXFEd0MsUUFBUSxDQUFDblQsWUFBOUQsSUFBOEV3UyxTQUFsRixFQUE2RjtBQUN6RixZQUFNakIsS0FBSyxHQUFHLENBQUMsR0FBRzdCLFlBQUosRUFBa0I0RCxzQkFBbEIsQ0FBeUNILFFBQVEsQ0FBQ25ULFlBQWxELENBQWQ7QUFDQSxZQUFNO0FBQUVxUyxRQUFBQSxNQUFGO0FBQVd0UyxRQUFBQTtBQUFYLFVBQXVCa1AsYUFBYSxDQUFDa0UsUUFBUSxDQUFDeEMsUUFBVixFQUFvQndDLFFBQVEsQ0FBQ3hDLFFBQTdCLEVBQXVDWSxLQUF2QyxDQUExQzs7QUFDQSxVQUFJYyxNQUFKLEVBQVk7QUFDUmUsUUFBQUEsY0FBYyxHQUFHLENBQUMsR0FBRzdELE1BQUosRUFBWW9ELG9CQUFaLENBQWlDO0FBQzlDaEMsVUFBQUEsUUFBUSxFQUFFMEIsTUFEb0M7QUFFOUNrQixVQUFBQSxJQUFJLEVBQUVKLFFBQVEsQ0FBQ0ksSUFGK0I7QUFHOUNoQyxVQUFBQSxLQUFLLEVBQUVlLGtCQUFrQixDQUFDZixLQUFELEVBQVF4UixNQUFSO0FBSHFCLFNBQWpDLENBQWpCO0FBS0g7QUFDSixLQWRELENBZUE7OztBQUNBLFVBQU1xRCxZQUFZLEdBQUcrUCxRQUFRLENBQUM5QixNQUFULEtBQW9Cb0IsSUFBSSxDQUFDcEIsTUFBekIsR0FBa0M4QixRQUFRLENBQUMzVCxJQUFULENBQWNJLEtBQWQsQ0FBb0J1VCxRQUFRLENBQUM5QixNQUFULENBQWdCbGQsTUFBcEMsQ0FBbEMsR0FBZ0ZnZixRQUFRLENBQUMzVCxJQUE5RztBQUNBLFdBQU9nVCxTQUFTLEdBQUcsQ0FDZnBQLFlBRGUsRUFFZmdRLGNBQWMsSUFBSWhRLFlBRkgsQ0FBSCxHQUdaQSxZQUhKO0FBSUgsR0FyQkQsQ0FxQkUsT0FBT1YsQ0FBUCxFQUFVO0FBQ1IsV0FBTzhQLFNBQVMsR0FBRyxDQUNmRSxXQURlLENBQUgsR0FFWkEsV0FGSjtBQUdIO0FBQ0o7O0FBQ0QsU0FBU2MsV0FBVCxDQUFxQjNULEdBQXJCLEVBQTBCO0FBQ3RCLFFBQU13UixNQUFNLEdBQUcsQ0FBQyxHQUFHOUIsTUFBSixFQUFZNEIsaUJBQVosRUFBZjtBQUNBLFNBQU90UixHQUFHLENBQUMzRixVQUFKLENBQWVtWCxNQUFmLElBQXlCeFIsR0FBRyxDQUFDME0sU0FBSixDQUFjOEUsTUFBTSxDQUFDbGQsTUFBckIsQ0FBekIsR0FBd0QwTCxHQUEvRDtBQUNIOztBQUNELFNBQVM0VCxZQUFULENBQXNCNVMsTUFBdEIsRUFBOEJoQixHQUE5QixFQUFtQ04sRUFBbkMsRUFBdUM7QUFDbkM7QUFDQTtBQUNBLE1BQUksQ0FBQzZELFlBQUQsRUFBZUMsVUFBZixJQUE2QkMsV0FBVyxDQUFDekMsTUFBRCxFQUFTaEIsR0FBVCxFQUFjLElBQWQsQ0FBNUM7QUFDQSxRQUFNd1IsTUFBTSxHQUFHLENBQUMsR0FBRzlCLE1BQUosRUFBWTRCLGlCQUFaLEVBQWY7QUFDQSxRQUFNdUMsYUFBYSxHQUFHdFEsWUFBWSxDQUFDbEosVUFBYixDQUF3Qm1YLE1BQXhCLENBQXRCO0FBQ0EsUUFBTXNDLFdBQVcsR0FBR3RRLFVBQVUsSUFBSUEsVUFBVSxDQUFDbkosVUFBWCxDQUFzQm1YLE1BQXRCLENBQWxDO0FBQ0FqTyxFQUFBQSxZQUFZLEdBQUdvUSxXQUFXLENBQUNwUSxZQUFELENBQTFCO0FBQ0FDLEVBQUFBLFVBQVUsR0FBR0EsVUFBVSxHQUFHbVEsV0FBVyxDQUFDblEsVUFBRCxDQUFkLEdBQTZCQSxVQUFwRDtBQUNBLFFBQU11USxXQUFXLEdBQUdGLGFBQWEsR0FBR3RRLFlBQUgsR0FBa0J3QixXQUFXLENBQUN4QixZQUFELENBQTlEO0FBQ0EsUUFBTXlRLFVBQVUsR0FBR3RVLEVBQUUsR0FBR2lVLFdBQVcsQ0FBQ2xRLFdBQVcsQ0FBQ3pDLE1BQUQsRUFBU3RCLEVBQVQsQ0FBWixDQUFkLEdBQTBDOEQsVUFBVSxJQUFJRCxZQUE3RTtBQUNBLFNBQU87QUFDSHZELElBQUFBLEdBQUcsRUFBRStULFdBREY7QUFFSHJVLElBQUFBLEVBQUUsRUFBRW9VLFdBQVcsR0FBR0UsVUFBSCxHQUFnQmpQLFdBQVcsQ0FBQ2lQLFVBQUQ7QUFGdkMsR0FBUDtBQUlIOztBQUNELFNBQVNDLG1CQUFULENBQTZCbkQsUUFBN0IsRUFBdUNvRCxLQUF2QyxFQUE4QztBQUMxQyxRQUFNQyxhQUFhLEdBQUcsQ0FBQyxHQUFHOUUsdUJBQUosRUFBNkJqSyx1QkFBN0IsQ0FBcUQsQ0FBQyxHQUFHbUssb0JBQUosRUFBMEI2RSxtQkFBMUIsQ0FBOEN0RCxRQUE5QyxDQUFyRCxDQUF0Qjs7QUFDQSxNQUFJcUQsYUFBYSxLQUFLLE1BQWxCLElBQTRCQSxhQUFhLEtBQUssU0FBbEQsRUFBNkQ7QUFDekQsV0FBT3JELFFBQVA7QUFDSCxHQUp5QyxDQUsxQzs7O0FBQ0EsTUFBSSxDQUFDb0QsS0FBSyxDQUFDblgsUUFBTixDQUFlb1gsYUFBZixDQUFMLEVBQW9DO0FBQ2hDO0FBQ0FELElBQUFBLEtBQUssQ0FBQ0csSUFBTixDQUFZQyxJQUFELElBQVE7QUFDZixVQUFJLENBQUMsR0FBRzNFLFVBQUosRUFBZ0I2RCxjQUFoQixDQUErQmMsSUFBL0IsS0FBd0MsQ0FBQyxHQUFHdEUsV0FBSixFQUFpQjZCLGFBQWpCLENBQStCeUMsSUFBL0IsRUFBcUNDLEVBQXJDLENBQXdDL08sSUFBeEMsQ0FBNkMyTyxhQUE3QyxDQUE1QyxFQUF5RztBQUNyR3JELFFBQUFBLFFBQVEsR0FBR3dELElBQVg7QUFDQSxlQUFPLElBQVA7QUFDSDtBQUNKLEtBTEQ7QUFNSDs7QUFDRCxTQUFPLENBQUMsR0FBR2pGLHVCQUFKLEVBQTZCakssdUJBQTdCLENBQXFEMEwsUUFBckQsQ0FBUDtBQUNIOztBQUNELE1BQU0wRCx1QkFBdUIsR0FBR25kLE1BQUEsSUFBbUgsQ0FBbko7QUFRQSxNQUFNMGQsa0JBQWtCLEdBQUd4TSxNQUFNLENBQUMsb0JBQUQsQ0FBakM7O0FBQ0EsU0FBU3lNLFVBQVQsQ0FBb0JoVixHQUFwQixFQUF5QmlWLFFBQXpCLEVBQW1DO0FBQy9CLFNBQU85SyxLQUFLLENBQUNuSyxHQUFELEVBQU07QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0FrVixJQUFBQSxXQUFXLEVBQUU7QUFaQyxHQUFOLENBQUwsQ0FhSnhhLElBYkksQ0FhRW9OLEdBQUQsSUFBTztBQUNYLFFBQUksQ0FBQ0EsR0FBRyxDQUFDc0MsRUFBVCxFQUFhO0FBQ1QsVUFBSTZLLFFBQVEsR0FBRyxDQUFYLElBQWdCbk4sR0FBRyxDQUFDcU4sTUFBSixJQUFjLEdBQWxDLEVBQXVDO0FBQ25DLGVBQU9ILFVBQVUsQ0FBQ2hWLEdBQUQsRUFBTWlWLFFBQVEsR0FBRyxDQUFqQixDQUFqQjtBQUNIOztBQUNELFVBQUluTixHQUFHLENBQUNxTixNQUFKLEtBQWUsR0FBbkIsRUFBd0I7QUFDcEIsZUFBT3JOLEdBQUcsQ0FBQ3NOLElBQUosR0FBVzFhLElBQVgsQ0FBaUIyYSxJQUFELElBQVE7QUFDM0IsY0FBSUEsSUFBSSxDQUFDQyxRQUFULEVBQW1CO0FBQ2YsbUJBQU87QUFDSEEsY0FBQUEsUUFBUSxFQUFFUDtBQURQLGFBQVA7QUFHSDs7QUFDRCxnQkFBTSxJQUFJamIsS0FBSixDQUFXLDZCQUFYLENBQU47QUFDSCxTQVBNLENBQVA7QUFRSDs7QUFDRCxZQUFNLElBQUlBLEtBQUosQ0FBVyw2QkFBWCxDQUFOO0FBQ0g7O0FBQ0QsV0FBT2dPLEdBQUcsQ0FBQ3NOLElBQUosRUFBUDtBQUNILEdBL0JNLENBQVA7QUFnQ0g7O0FBQ0QsU0FBU0csYUFBVCxDQUF1QkMsUUFBdkIsRUFBaUNDLGNBQWpDLEVBQWlEO0FBQzdDLFNBQU9ULFVBQVUsQ0FBQ1EsUUFBRCxFQUFXQyxjQUFjLEdBQUcsQ0FBSCxHQUFPLENBQWhDLENBQVYsQ0FBNkNoYixLQUE3QyxDQUFvRCtGLEdBQUQsSUFBTztBQUM3RDtBQUNBO0FBQ0E7QUFDQSxRQUFJLENBQUNpVixjQUFMLEVBQXFCO0FBQ2pCLE9BQUMsR0FBR25HLFlBQUosRUFBa0I5SSxjQUFsQixDQUFpQ2hHLEdBQWpDO0FBQ0g7O0FBQ0QsVUFBTUEsR0FBTjtBQUNILEdBUk0sQ0FBUDtBQVNIOztBQUNELE1BQU1rVixNQUFOLENBQWE7QUFDVEMsRUFBQUEsV0FBVyxDQUFDQyxTQUFELEVBQVlDLE1BQVosRUFBb0JDLEdBQXBCLEVBQXlCO0FBQUVDLElBQUFBLFlBQUY7QUFBaUJDLElBQUFBLFVBQWpCO0FBQThCQyxJQUFBQSxHQUE5QjtBQUFvQ0MsSUFBQUEsT0FBcEM7QUFBOENDLElBQUFBLFNBQVMsRUFBRUMsVUFBekQ7QUFBc0U1VixJQUFBQSxHQUFHLEVBQUU2VixJQUEzRTtBQUFrRkMsSUFBQUEsWUFBbEY7QUFBaUdDLElBQUFBLFVBQWpHO0FBQThHblYsSUFBQUEsTUFBOUc7QUFBdUh5RCxJQUFBQSxPQUF2SDtBQUFpSUksSUFBQUEsYUFBakk7QUFBaUpILElBQUFBLGFBQWpKO0FBQWlLMFIsSUFBQUE7QUFBakssR0FBekIsRUFBdU07QUFDOU07QUFDQSxTQUFLQyxHQUFMLEdBQVcsRUFBWCxDQUY4TSxDQUk5TTs7QUFDQSxTQUFLQyxHQUFMLEdBQVcsRUFBWDtBQUVBLFNBQUtDLElBQUwsR0FBWSxDQUFaOztBQUNBLFNBQUtDLFVBQUwsR0FBbUI3VSxDQUFELElBQUs7QUFDbkIsWUFBTThVLEtBQUssR0FBRzlVLENBQUMsQ0FBQzhVLEtBQWhCOztBQUNBLFVBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBTTtBQUFFL0YsVUFBQUEsUUFBUSxFQUFFOEUsU0FBWjtBQUF3QmxFLFVBQUFBLEtBQUssRUFBRW1FO0FBQS9CLFlBQTJDLElBQWpEO0FBQ0EsYUFBS2lCLFdBQUwsQ0FBaUIsY0FBakIsRUFBaUMsQ0FBQyxHQUFHcEgsTUFBSixFQUFZb0Qsb0JBQVosQ0FBaUM7QUFDOURoQyxVQUFBQSxRQUFRLEVBQUUvTCxXQUFXLENBQUM2USxTQUFELENBRHlDO0FBRTlEbEUsVUFBQUEsS0FBSyxFQUFFbUU7QUFGdUQsU0FBakMsQ0FBakMsRUFHSSxDQUFDLEdBQUduRyxNQUFKLEVBQVlxSCxNQUFaLEVBSEo7QUFJQTtBQUNIOztBQUNELFVBQUksQ0FBQ0YsS0FBSyxDQUFDRyxHQUFYLEVBQWdCO0FBQ1o7QUFDSDs7QUFDRCxVQUFJQyxZQUFKO0FBQ0EsWUFBTTtBQUFFalgsUUFBQUEsR0FBRjtBQUFRTixRQUFBQSxFQUFFLEVBQUVvVyxHQUFaO0FBQWtCN1UsUUFBQUEsT0FBbEI7QUFBNEJpVyxRQUFBQTtBQUE1QixVQUFxQ0wsS0FBM0M7O0FBQ0EsVUFBSXhmLEtBQUosRUFBMkMsRUF1QjFDOztBQUNELFdBQUtzZixJQUFMLEdBQVlPLEdBQVo7QUFDQSxZQUFNO0FBQUVwRyxRQUFBQSxRQUFRLEVBQUU4RTtBQUFaLFVBQTJCLENBQUMsR0FBR2hHLGlCQUFKLEVBQXVCNEgsZ0JBQXZCLENBQXdDeFgsR0FBeEMsQ0FBakMsQ0FqRG1CLENBa0RuQjtBQUNBOztBQUNBLFVBQUksS0FBS3lYLEtBQUwsSUFBYzNCLEdBQUcsS0FBSyxLQUFLekMsTUFBM0IsSUFBcUN1QyxTQUFTLEtBQUssS0FBSzlFLFFBQTVELEVBQXNFO0FBQ2xFO0FBQ0gsT0F0RGtCLENBdURuQjtBQUNBOzs7QUFDQSxVQUFJLEtBQUs0RyxJQUFMLElBQWEsQ0FBQyxLQUFLQSxJQUFMLENBQVViLEtBQVYsQ0FBbEIsRUFBb0M7QUFDaEM7QUFDSDs7QUFDRCxXQUFLYyxNQUFMLENBQVksY0FBWixFQUE0QjNYLEdBQTVCLEVBQWlDOFYsR0FBakMsRUFBc0NoakIsTUFBTSxDQUFDeU0sTUFBUCxDQUFjLEVBQWQsRUFDbkMwQixPQURtQyxFQUMxQjtBQUNSZ0IsUUFBQUEsT0FBTyxFQUFFaEIsT0FBTyxDQUFDZ0IsT0FBUixJQUFtQixLQUFLMlYsUUFEekI7QUFFUnhXLFFBQUFBLE1BQU0sRUFBRUgsT0FBTyxDQUFDRyxNQUFSLElBQWtCLEtBQUs2RDtBQUZ2QixPQUQwQixDQUF0QyxFQUlJZ1MsWUFKSjtBQUtILEtBakVELENBUjhNLENBMEU5TTs7O0FBQ0EsU0FBSzNOLEtBQUwsR0FBYSxDQUFDLEdBQUcrRix1QkFBSixFQUE2QmpLLHVCQUE3QixDQUFxRHdRLFNBQXJELENBQWIsQ0EzRThNLENBNEU5TTs7QUFDQSxTQUFLaUMsVUFBTCxHQUFrQixFQUFsQixDQTdFOE0sQ0ErRTlNO0FBQ0E7QUFDQTs7QUFDQSxRQUFJakMsU0FBUyxLQUFLLFNBQWxCLEVBQTZCO0FBQ3pCLFdBQUtpQyxVQUFMLENBQWdCLEtBQUt2TyxLQUFyQixJQUE4QjtBQUMxQjZNLFFBQUFBLFNBQVMsRUFBRUMsVUFEZTtBQUUxQjBCLFFBQUFBLE9BQU8sRUFBRSxJQUZpQjtBQUcxQnhWLFFBQUFBLEtBQUssRUFBRXlULFlBSG1CO0FBSTFCdlYsUUFBQUEsR0FBRyxFQUFFNlYsSUFKcUI7QUFLMUIwQixRQUFBQSxPQUFPLEVBQUVoQyxZQUFZLElBQUlBLFlBQVksQ0FBQ2dDLE9BTFo7QUFNMUJDLFFBQUFBLE9BQU8sRUFBRWpDLFlBQVksSUFBSUEsWUFBWSxDQUFDaUM7QUFOWixPQUE5QjtBQVFIOztBQUNELFNBQUtILFVBQUwsQ0FBZ0IsT0FBaEIsSUFBMkI7QUFDdkIxQixNQUFBQSxTQUFTLEVBQUVGLEdBRFk7QUFFdkJsTSxNQUFBQSxXQUFXLEVBQUU7QUFGVSxLQUEzQixDQTVGOE0sQ0FnRzlNO0FBQ0E7O0FBQ0EsU0FBS29DLE1BQUwsR0FBY3VKLE1BQU0sQ0FBQ3ZKLE1BQXJCO0FBQ0EsU0FBSzZKLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS2xGLFFBQUwsR0FBZ0I4RSxTQUFoQjtBQUNBLFNBQUtsRSxLQUFMLEdBQWFtRSxNQUFiLENBckc4TSxDQXNHOU07QUFDQTs7QUFDQSxVQUFNb0MsaUJBQWlCLEdBQUcsQ0FBQyxHQUFHdEksVUFBSixFQUFnQjZELGNBQWhCLENBQStCb0MsU0FBL0IsS0FBNkNqUSxJQUFJLENBQUN1UyxhQUFMLENBQW1CQyxVQUExRjs7QUFDQSxTQUFLOUUsTUFBTCxHQUFjNEUsaUJBQWlCLEdBQUdyQyxTQUFILEdBQWVFLEdBQTlDO0FBQ0EsU0FBSzNGLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS2lJLEdBQUwsR0FBVzlCLFlBQVg7QUFDQSxTQUFLK0IsR0FBTCxHQUFXLElBQVg7QUFDQSxTQUFLQyxRQUFMLEdBQWdCcEMsT0FBaEIsQ0E3RzhNLENBOEc5TTtBQUNBOztBQUNBLFNBQUt1QixLQUFMLEdBQWEsSUFBYjtBQUNBLFNBQUtsQixVQUFMLEdBQWtCQSxVQUFsQjtBQUNBLFNBQUtnQyxPQUFMLEdBQWUsQ0FBQyxFQUFFNVMsSUFBSSxDQUFDdVMsYUFBTCxDQUFtQk0sSUFBbkIsSUFBMkI3UyxJQUFJLENBQUN1UyxhQUFMLENBQW1CTyxHQUE5QyxJQUFxRDlTLElBQUksQ0FBQ3VTLGFBQUwsQ0FBbUJRLE1BQW5CLElBQTZCLENBQUMvUyxJQUFJLENBQUN1UyxhQUFMLENBQW1CUyxHQUF0RyxJQUE2RyxDQUFDVixpQkFBRCxJQUFzQixDQUFDdFMsSUFBSSxDQUFDaVQsUUFBTCxDQUFjQyxNQUFyQyxJQUErQyxDQUFDeGhCLEtBQS9KLENBQWhCO0FBQ0EsU0FBS21mLFNBQUwsR0FBaUIsQ0FBQyxDQUFDQSxTQUFuQjtBQUNBLFNBQUs3UixjQUFMLEdBQXNCLEtBQXRCOztBQUNBLFFBQUl0TixLQUFKLEVBQXFDLEVBTXBDOztBQUNELGVBQW1DLEVBdUJsQztBQUNKOztBQUNENmhCLEVBQUFBLE1BQU0sR0FBRztBQUNMclQsSUFBQUEsTUFBTSxDQUFDK1MsUUFBUCxDQUFnQk0sTUFBaEI7QUFDSDtBQUNEO0FBQ0o7QUFDQTs7O0FBQU1DLEVBQUFBLElBQUksR0FBRztBQUNMdFQsSUFBQUEsTUFBTSxDQUFDNk8sT0FBUCxDQUFleUUsSUFBZjtBQUNIO0FBQ0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBTTlnQixFQUFBQSxJQUFJLENBQUMySCxHQUFELEVBQU1OLEVBQU4sRUFBVXVCLE9BQU8sR0FBRyxFQUFwQixFQUNIO0FBQ0MsUUFBSTVKLEtBQUosRUFBMkMsRUFhMUM7O0FBQ0QsS0FBQztBQUFFMkksTUFBQUEsR0FBRjtBQUFRTixNQUFBQTtBQUFSLFFBQWdCa1UsWUFBWSxDQUFDLElBQUQsRUFBTzVULEdBQVAsRUFBWU4sRUFBWixDQUE3QjtBQUNBLFdBQU8sS0FBS2lZLE1BQUwsQ0FBWSxXQUFaLEVBQXlCM1gsR0FBekIsRUFBOEJOLEVBQTlCLEVBQWtDdUIsT0FBbEMsQ0FBUDtBQUNIO0FBQ0Q7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFBTWUsRUFBQUEsT0FBTyxDQUFDaEMsR0FBRCxFQUFNTixFQUFOLEVBQVV1QixPQUFPLEdBQUcsRUFBcEIsRUFDTjtBQUNDLEtBQUM7QUFBRWpCLE1BQUFBLEdBQUY7QUFBUU4sTUFBQUE7QUFBUixRQUFnQmtVLFlBQVksQ0FBQyxJQUFELEVBQU81VCxHQUFQLEVBQVlOLEVBQVosQ0FBN0I7QUFDQSxXQUFPLEtBQUtpWSxNQUFMLENBQVksY0FBWixFQUE0QjNYLEdBQTVCLEVBQWlDTixFQUFqQyxFQUFxQ3VCLE9BQXJDLENBQVA7QUFDSDs7QUFDVyxRQUFOMFcsTUFBTSxDQUFDeUIsTUFBRCxFQUFTcFosR0FBVCxFQUFjTixFQUFkLEVBQWtCdUIsT0FBbEIsRUFBMkJnVyxZQUEzQixFQUF5QztBQUNqRCxRQUFJLENBQUMvVixVQUFVLENBQUNsQixHQUFELENBQWYsRUFBc0I7QUFDbEI2RixNQUFBQSxNQUFNLENBQUMrUyxRQUFQLENBQWdCalosSUFBaEIsR0FBdUJLLEdBQXZCO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0QsVUFBTXFaLGlCQUFpQixHQUFHclosR0FBRyxLQUFLTixFQUFSLElBQWN1QixPQUFPLENBQUNxWSxFQUF0QixJQUE0QnJZLE9BQU8sQ0FBQzhYLGtCQUE5RCxDQUxpRCxDQU1qRDtBQUNBOztBQUNBLFFBQUk5WCxPQUFPLENBQUNxWSxFQUFaLEVBQWdCO0FBQ1osV0FBS2YsT0FBTCxHQUFlLElBQWY7QUFDSDs7QUFDRCxVQUFNZ0IsVUFBVSxHQUFHLEtBQUtuWSxNQUF4Qjs7QUFDQSxRQUFJL0osS0FBSixFQUFxQyxZQTZDcEM7O0FBQ0QsUUFBSSxDQUFDNEosT0FBTyxDQUFDcVksRUFBYixFQUFpQjtBQUNiLFdBQUs3QixLQUFMLEdBQWEsS0FBYjtBQUNILEtBNURnRCxDQTZEakQ7OztBQUNBLFFBQUkvSCxNQUFNLENBQUNrSyxFQUFYLEVBQWU7QUFDWEMsTUFBQUEsV0FBVyxDQUFDQyxJQUFaLENBQWlCLGFBQWpCO0FBQ0g7O0FBQ0QsVUFBTTtBQUFFN1gsTUFBQUEsT0FBTyxHQUFFO0FBQVgsUUFBc0JoQixPQUE1QjtBQUNBLFVBQU04WSxVQUFVLEdBQUc7QUFDZjlYLE1BQUFBO0FBRGUsS0FBbkI7O0FBR0EsUUFBSSxLQUFLK1gsY0FBVCxFQUF5QjtBQUNyQixXQUFLQyxrQkFBTCxDQUF3QixLQUFLRCxjQUE3QixFQUE2Q0QsVUFBN0M7QUFDSDs7QUFDRHJhLElBQUFBLEVBQUUsR0FBR3FGLFdBQVcsQ0FBQ0MsU0FBUyxDQUFDa0ssV0FBVyxDQUFDeFAsRUFBRCxDQUFYLEdBQWtCeVAsV0FBVyxDQUFDelAsRUFBRCxDQUE3QixHQUFvQ0EsRUFBckMsRUFBeUN1QixPQUFPLENBQUNHLE1BQWpELEVBQXlELEtBQUs2RCxhQUE5RCxDQUFWLENBQWhCO0FBQ0EsVUFBTWlWLFNBQVMsR0FBR2pMLFNBQVMsQ0FBQ0MsV0FBVyxDQUFDeFAsRUFBRCxDQUFYLEdBQWtCeVAsV0FBVyxDQUFDelAsRUFBRCxDQUE3QixHQUFvQ0EsRUFBckMsRUFBeUMsS0FBSzBCLE1BQTlDLENBQTNCO0FBQ0EsU0FBSzRZLGNBQUwsR0FBc0J0YSxFQUF0QjtBQUNBLFFBQUl5YSxZQUFZLEdBQUdaLFVBQVUsS0FBSyxLQUFLblksTUFBdkMsQ0EzRWlELENBNEVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBLFFBQUksQ0FBQ0gsT0FBTyxDQUFDcVksRUFBVCxJQUFlLEtBQUtjLGVBQUwsQ0FBcUJGLFNBQXJCLENBQWYsSUFBa0QsQ0FBQ0MsWUFBdkQsRUFBcUU7QUFDakUsV0FBSzlHLE1BQUwsR0FBYzZHLFNBQWQ7QUFDQXhFLE1BQUFBLE1BQU0sQ0FBQ3ZKLE1BQVAsQ0FBY2tPLElBQWQsQ0FBbUIsaUJBQW5CLEVBQXNDM2EsRUFBdEMsRUFBMENxYSxVQUExQyxFQUZpRSxDQUdqRTs7QUFDQSxXQUFLakQsV0FBTCxDQUFpQnNDLE1BQWpCLEVBQXlCcFosR0FBekIsRUFBOEJOLEVBQTlCLEVBQWtDdUIsT0FBbEM7QUFDQSxXQUFLcVosWUFBTCxDQUFrQkosU0FBbEI7QUFDQSxXQUFLSyxNQUFMLENBQVksS0FBSzFDLFVBQUwsQ0FBZ0IsS0FBS3ZPLEtBQXJCLENBQVosRUFBeUMsSUFBekM7QUFDQW9NLE1BQUFBLE1BQU0sQ0FBQ3ZKLE1BQVAsQ0FBY2tPLElBQWQsQ0FBbUIsb0JBQW5CLEVBQXlDM2EsRUFBekMsRUFBNkNxYSxVQUE3QztBQUNBLGFBQU8sSUFBUDtBQUNIOztBQUNELFFBQUlTLE1BQU0sR0FBRyxDQUFDLEdBQUc1SyxpQkFBSixFQUF1QjRILGdCQUF2QixDQUF3Q3hYLEdBQXhDLENBQWI7QUFDQSxRQUFJO0FBQUU4USxNQUFBQSxRQUFRLEVBQUU4RSxTQUFaO0FBQXdCbEUsTUFBQUEsS0FBSyxFQUFFbUU7QUFBL0IsUUFBMkMyRSxNQUEvQyxDQTVGaUQsQ0E2RmpEO0FBQ0E7QUFDQTs7QUFDQSxRQUFJdEcsS0FBSixFQUFXdUcsUUFBWDs7QUFDQSxRQUFJO0FBQ0F2RyxNQUFBQSxLQUFLLEdBQUcsTUFBTSxLQUFLOEIsVUFBTCxDQUFnQjBFLFdBQWhCLEVBQWQ7QUFDQSxPQUFDO0FBQUVDLFFBQUFBLFVBQVUsRUFBRUY7QUFBZCxVQUE0QixNQUFNLENBQUMsR0FBR25MLFlBQUosRUFBa0I1SSxzQkFBbEIsRUFBbkM7QUFDSCxLQUhELENBR0UsT0FBTzJQLElBQVAsRUFBYTtBQUNYO0FBQ0E7QUFDQXhRLE1BQUFBLE1BQU0sQ0FBQytTLFFBQVAsQ0FBZ0JqWixJQUFoQixHQUF1QkQsRUFBdkI7QUFDQSxhQUFPLEtBQVA7QUFDSCxLQXpHZ0QsQ0EwR2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBLFFBQUksQ0FBQyxLQUFLa2IsUUFBTCxDQUFjVixTQUFkLENBQUQsSUFBNkIsQ0FBQ0MsWUFBbEMsRUFBZ0Q7QUFDNUNmLE1BQUFBLE1BQU0sR0FBRyxjQUFUO0FBQ0gsS0FqSGdELENBa0hqRDtBQUNBOzs7QUFDQSxRQUFJNVYsVUFBVSxHQUFHOUQsRUFBakIsQ0FwSGlELENBcUhqRDtBQUNBO0FBQ0E7O0FBQ0FrVyxJQUFBQSxTQUFTLEdBQUdBLFNBQVMsR0FBRyxDQUFDLEdBQUd2Ryx1QkFBSixFQUE2QmpLLHVCQUE3QixDQUFxRCtKLFdBQVcsQ0FBQ3lHLFNBQUQsQ0FBaEUsQ0FBSCxHQUFrRkEsU0FBdkc7O0FBQ0EsUUFBSXlELGlCQUFpQixJQUFJekQsU0FBUyxLQUFLLFNBQXZDLEVBQWtEO0FBQzlDM1UsTUFBQUEsT0FBTyxDQUFDOFgsa0JBQVIsR0FBNkIsSUFBN0I7O0FBQ0EsVUFBSTFoQixLQUFKLEVBQTJELEVBQTNELE1BV087QUFDSG1qQixRQUFBQSxNQUFNLENBQUMxSixRQUFQLEdBQWtCbUQsbUJBQW1CLENBQUMyQixTQUFELEVBQVkxQixLQUFaLENBQXJDOztBQUNBLFlBQUlzRyxNQUFNLENBQUMxSixRQUFQLEtBQW9COEUsU0FBeEIsRUFBbUM7QUFDL0JBLFVBQUFBLFNBQVMsR0FBRzRFLE1BQU0sQ0FBQzFKLFFBQW5CO0FBQ0EwSixVQUFBQSxNQUFNLENBQUMxSixRQUFQLEdBQWtCL0wsV0FBVyxDQUFDNlEsU0FBRCxDQUE3QjtBQUNBNVYsVUFBQUEsR0FBRyxHQUFHLENBQUMsR0FBRzBQLE1BQUosRUFBWW9ELG9CQUFaLENBQWlDMEgsTUFBakMsQ0FBTjtBQUNIO0FBQ0o7QUFDSjs7QUFDRCxVQUFNbFIsS0FBSyxHQUFHLENBQUMsR0FBRytGLHVCQUFKLEVBQTZCakssdUJBQTdCLENBQXFEd1EsU0FBckQsQ0FBZDs7QUFDQSxRQUFJLENBQUMxVSxVQUFVLENBQUN4QixFQUFELENBQWYsRUFBcUI7QUFDakIsZ0JBQTJDO0FBQ3ZDLGNBQU0sSUFBSTVGLEtBQUosQ0FBVyxrQkFBaUJrRyxHQUFJLGNBQWFOLEVBQUcsMkNBQXRDLEdBQW9GLG9GQUE5RixDQUFOO0FBQ0g7O0FBQ0RtRyxNQUFBQSxNQUFNLENBQUMrUyxRQUFQLENBQWdCalosSUFBaEIsR0FBdUJELEVBQXZCO0FBQ0EsYUFBTyxLQUFQO0FBQ0g7O0FBQ0Q4RCxJQUFBQSxVQUFVLEdBQUd5TCxTQUFTLENBQUNFLFdBQVcsQ0FBQzNMLFVBQUQsQ0FBWixFQUEwQixLQUFLcEMsTUFBL0IsQ0FBdEI7O0FBQ0EsUUFBSSxDQUFDLEdBQUd1TyxVQUFKLEVBQWdCNkQsY0FBaEIsQ0FBK0JsSyxLQUEvQixDQUFKLEVBQTJDO0FBQ3ZDLFlBQU1rUSxRQUFRLEdBQUcsQ0FBQyxHQUFHNUosaUJBQUosRUFBdUI0SCxnQkFBdkIsQ0FBd0NoVSxVQUF4QyxDQUFqQjtBQUNBLFlBQU1pTyxVQUFVLEdBQUcrSCxRQUFRLENBQUMxSSxRQUE1QjtBQUNBLFlBQU1pSyxVQUFVLEdBQUcsQ0FBQyxHQUFHL0ssV0FBSixFQUFpQjZCLGFBQWpCLENBQStCdkksS0FBL0IsQ0FBbkI7QUFDQSxZQUFNMFIsVUFBVSxHQUFHLENBQUMsR0FBR2pMLGFBQUosRUFBbUJrQyxlQUFuQixDQUFtQzhJLFVBQW5DLEVBQStDdEosVUFBL0MsQ0FBbkI7QUFDQSxZQUFNd0osaUJBQWlCLEdBQUczUixLQUFLLEtBQUttSSxVQUFwQztBQUNBLFlBQU04QixjQUFjLEdBQUcwSCxpQkFBaUIsR0FBRzdMLGFBQWEsQ0FBQzlGLEtBQUQsRUFBUW1JLFVBQVIsRUFBb0JvRSxNQUFwQixDQUFoQixHQUE4QyxFQUF0Rjs7QUFFQSxVQUFJLENBQUNtRixVQUFELElBQWVDLGlCQUFpQixJQUFJLENBQUMxSCxjQUFjLENBQUNmLE1BQXhELEVBQWdFO0FBQzVELGNBQU0wSSxhQUFhLEdBQUdwb0IsTUFBTSxDQUFDMkIsSUFBUCxDQUFZc21CLFVBQVUsQ0FBQ2hKLE1BQXZCLEVBQStCbmQsTUFBL0IsQ0FBdUN1ZCxLQUFELElBQVMsQ0FBQzBELE1BQU0sQ0FBQzFELEtBQUQsQ0FBdEQsQ0FBdEI7O0FBRUEsWUFBSStJLGFBQWEsQ0FBQzVtQixNQUFkLEdBQXVCLENBQTNCLEVBQThCO0FBQzFCLG9CQUEyQztBQUN2Q2dILFlBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFjLEdBQUUwZixpQkFBaUIsR0FBSSxvQkFBSixHQUEyQixpQ0FBaUMsOEJBQWhGLEdBQWlILGVBQWNDLGFBQWEsQ0FBQzVoQixJQUFkLENBQW1CLElBQW5CLENBQXlCLDhCQUFySztBQUNIOztBQUNELGdCQUFNLElBQUlRLEtBQUosQ0FBVSxDQUFDbWhCLGlCQUFpQixHQUFJLDBCQUF5QmpiLEdBQUksb0NBQW1Da2IsYUFBYSxDQUFDNWhCLElBQWQsQ0FBbUIsSUFBbkIsQ0FBeUIsaUNBQTdGLEdBQWlJLDhCQUE2Qm1ZLFVBQVcsOENBQTZDbkksS0FBTSxLQUE5TyxJQUF1UCwrQ0FBOEMyUixpQkFBaUIsR0FBRywyQkFBSCxHQUFpQyxzQkFBdUIsRUFBeFgsQ0FBTjtBQUNIO0FBQ0osT0FURCxNQVNPLElBQUlBLGlCQUFKLEVBQXVCO0FBQzFCdmIsUUFBQUEsRUFBRSxHQUFHLENBQUMsR0FBR2dRLE1BQUosRUFBWW9ELG9CQUFaLENBQWlDaGdCLE1BQU0sQ0FBQ3lNLE1BQVAsQ0FBYyxFQUFkLEVBQ25DaWEsUUFEbUMsRUFDekI7QUFDVDFJLFVBQUFBLFFBQVEsRUFBRXlDLGNBQWMsQ0FBQ2YsTUFEaEI7QUFFVGQsVUFBQUEsS0FBSyxFQUFFZSxrQkFBa0IsQ0FBQ29ELE1BQUQsRUFBU3RDLGNBQWMsQ0FBQ3JULE1BQXhCO0FBRmhCLFNBRHlCLENBQWpDLENBQUw7QUFLSCxPQU5NLE1BTUE7QUFDSDtBQUNBcE4sUUFBQUEsTUFBTSxDQUFDeU0sTUFBUCxDQUFjc1csTUFBZCxFQUFzQm1GLFVBQXRCO0FBQ0g7QUFDSjs7QUFDRHRGLElBQUFBLE1BQU0sQ0FBQ3ZKLE1BQVAsQ0FBY2tPLElBQWQsQ0FBbUIsa0JBQW5CLEVBQXVDM2EsRUFBdkMsRUFBMkNxYSxVQUEzQzs7QUFDQSxRQUFJO0FBQ0EsVUFBSTllLEdBQUosRUFBU2tnQixJQUFUO0FBQ0EsVUFBSUMsU0FBUyxHQUFHLE1BQU0sS0FBS0MsWUFBTCxDQUFrQi9SLEtBQWxCLEVBQXlCc00sU0FBekIsRUFBb0NDLE1BQXBDLEVBQTRDblcsRUFBNUMsRUFBZ0Q4RCxVQUFoRCxFQUE0RHVXLFVBQTVELENBQXRCO0FBQ0EsVUFBSTtBQUFFdFosUUFBQUEsS0FBRjtBQUFVNkIsUUFBQUEsS0FBVjtBQUFrQnlWLFFBQUFBLE9BQWxCO0FBQTRCQyxRQUFBQTtBQUE1QixVQUF5Q29ELFNBQTdDLENBSEEsQ0FJQTs7QUFDQSxVQUFJLENBQUNyRCxPQUFPLElBQUlDLE9BQVosS0FBd0IxVixLQUE1QixFQUFtQztBQUMvQixZQUFJQSxLQUFLLENBQUNnWixTQUFOLElBQW1CaFosS0FBSyxDQUFDZ1osU0FBTixDQUFnQkMsWUFBdkMsRUFBcUQ7QUFDakQsZ0JBQU1DLFdBQVcsR0FBR2xaLEtBQUssQ0FBQ2daLFNBQU4sQ0FBZ0JDLFlBQXBDLENBRGlELENBRWpEO0FBQ0E7QUFDQTs7QUFDQSxjQUFJQyxXQUFXLENBQUNuaEIsVUFBWixDQUF1QixHQUF2QixDQUFKLEVBQWlDO0FBQzdCLGtCQUFNb2hCLFVBQVUsR0FBRyxDQUFDLEdBQUc3TCxpQkFBSixFQUF1QjRILGdCQUF2QixDQUF3Q2dFLFdBQXhDLENBQW5CO0FBQ0FDLFlBQUFBLFVBQVUsQ0FBQzNLLFFBQVgsR0FBc0JtRCxtQkFBbUIsQ0FBQ3dILFVBQVUsQ0FBQzNLLFFBQVosRUFBc0JvRCxLQUF0QixDQUF6QztBQUNBLGtCQUFNO0FBQUVsVSxjQUFBQSxHQUFHLEVBQUUwYixNQUFQO0FBQWdCaGMsY0FBQUEsRUFBRSxFQUFFaWM7QUFBcEIsZ0JBQStCL0gsWUFBWSxDQUFDLElBQUQsRUFBTzRILFdBQVAsRUFBb0JBLFdBQXBCLENBQWpEO0FBQ0EsbUJBQU8sS0FBSzdELE1BQUwsQ0FBWXlCLE1BQVosRUFBb0JzQyxNQUFwQixFQUE0QkMsS0FBNUIsRUFBbUMxYSxPQUFuQyxDQUFQO0FBQ0g7O0FBQ0Q0RSxVQUFBQSxNQUFNLENBQUMrUyxRQUFQLENBQWdCalosSUFBaEIsR0FBdUI2YixXQUF2QjtBQUNBLGlCQUFPLElBQUlqaEIsT0FBSixDQUFZLE1BQUksQ0FDdEIsQ0FETSxDQUFQO0FBRUg7O0FBQ0QsYUFBS2ljLFNBQUwsR0FBaUIsQ0FBQyxDQUFDbFUsS0FBSyxDQUFDc1osV0FBekIsQ0FoQitCLENBaUIvQjs7QUFDQSxZQUFJdFosS0FBSyxDQUFDZ1QsUUFBTixLQUFtQlAsa0JBQXZCLEVBQTJDO0FBQ3ZDLGNBQUk4RyxhQUFKOztBQUNBLGNBQUk7QUFDQSxrQkFBTSxLQUFLQyxjQUFMLENBQW9CLE1BQXBCLENBQU47QUFDQUQsWUFBQUEsYUFBYSxHQUFHLE1BQWhCO0FBQ0gsV0FIRCxDQUdFLE9BQU9oWixDQUFQLEVBQVU7QUFDUmdaLFlBQUFBLGFBQWEsR0FBRyxTQUFoQjtBQUNIOztBQUNEVCxVQUFBQSxTQUFTLEdBQUcsTUFBTSxLQUFLQyxZQUFMLENBQWtCUSxhQUFsQixFQUFpQ0EsYUFBakMsRUFBZ0RoRyxNQUFoRCxFQUF3RG5XLEVBQXhELEVBQTREOEQsVUFBNUQsRUFBd0U7QUFDdEZ2QixZQUFBQSxPQUFPLEVBQUU7QUFENkUsV0FBeEUsQ0FBbEI7QUFHSDtBQUNKOztBQUNEeVQsTUFBQUEsTUFBTSxDQUFDdkosTUFBUCxDQUFja08sSUFBZCxDQUFtQixxQkFBbkIsRUFBMEMzYSxFQUExQyxFQUE4Q3FhLFVBQTlDO0FBQ0EsV0FBS2pELFdBQUwsQ0FBaUJzQyxNQUFqQixFQUF5QnBaLEdBQXpCLEVBQThCTixFQUE5QixFQUFrQ3VCLE9BQWxDOztBQUNBLGdCQUEyQztBQUN2QyxjQUFNOGEsT0FBTyxHQUFHLEtBQUtsRSxVQUFMLENBQWdCLE9BQWhCLEVBQXlCMUIsU0FBekM7QUFDQXRRLFFBQUFBLE1BQU0sQ0FBQ21XLElBQVAsQ0FBWUMsYUFBWixHQUE0QkYsT0FBTyxDQUFDbE4sZUFBUixLQUE0QmtOLE9BQU8sQ0FBQ2pOLG1CQUFwQyxJQUEyRCxDQUFDc00sU0FBUyxDQUFDakYsU0FBVixDQUFvQnRILGVBQTVHO0FBQ0g7O0FBQ0QsVUFBSTVOLE9BQU8sQ0FBQ3FZLEVBQVIsSUFBYzFELFNBQVMsS0FBSyxTQUE1QixJQUF5QyxDQUFDLENBQUMzYSxHQUFHLEdBQUcwSyxJQUFJLENBQUN1UyxhQUFMLENBQW1CNVYsS0FBMUIsTUFBcUMsSUFBckMsSUFBNkNySCxHQUFHLEtBQUssS0FBSyxDQUExRCxHQUE4RCxLQUFLLENBQW5FLEdBQXVFLENBQUNrZ0IsSUFBSSxHQUFHbGdCLEdBQUcsQ0FBQ3FnQixTQUFaLE1BQTJCLElBQTNCLElBQW1DSCxJQUFJLEtBQUssS0FBSyxDQUFqRCxHQUFxRCxLQUFLLENBQTFELEdBQThEQSxJQUFJLENBQUNlLFVBQTNJLE1BQTJKLEdBQXBNLEtBQTRNNVosS0FBSyxLQUFLLElBQVYsSUFBa0JBLEtBQUssS0FBSyxLQUFLLENBQWpDLEdBQXFDLEtBQUssQ0FBMUMsR0FBOENBLEtBQUssQ0FBQ2daLFNBQWhRLENBQUosRUFBZ1I7QUFDNVE7QUFDQTtBQUNBaFosUUFBQUEsS0FBSyxDQUFDZ1osU0FBTixDQUFnQlksVUFBaEIsR0FBNkIsR0FBN0I7QUFDSCxPQTlDRCxDQStDQTs7O0FBQ0EsWUFBTUMsbUJBQW1CLEdBQUdsYixPQUFPLENBQUNnQixPQUFSLElBQW1CLEtBQUtxSCxLQUFMLEtBQWVBLEtBQTlEOztBQUNBLFVBQUk4UyxPQUFKOztBQUNBLFlBQU1DLFlBQVksR0FBRyxDQUFDRCxPQUFPLEdBQUduYixPQUFPLENBQUNpQixNQUFuQixNQUErQixJQUEvQixJQUF1Q2thLE9BQU8sS0FBSyxLQUFLLENBQXhELEdBQTREQSxPQUE1RCxHQUFzRSxDQUFDRCxtQkFBNUY7QUFDQSxZQUFNRyxXQUFXLEdBQUdELFlBQVksR0FBRztBQUMvQjdpQixRQUFBQSxDQUFDLEVBQUUsQ0FENEI7QUFFL0I0ZCxRQUFBQSxDQUFDLEVBQUU7QUFGNEIsT0FBSCxHQUc1QixJQUhKO0FBSUEsWUFBTSxLQUFLaFgsR0FBTCxDQUFTa0osS0FBVCxFQUFnQnNNLFNBQWhCLEVBQTJCQyxNQUEzQixFQUFtQ3FFLFNBQW5DLEVBQThDa0IsU0FBOUMsRUFBeURuRSxZQUFZLEtBQUssSUFBakIsSUFBeUJBLFlBQVksS0FBSyxLQUFLLENBQS9DLEdBQW1EQSxZQUFuRCxHQUFrRXFGLFdBQTNILEVBQXdJN2hCLEtBQXhJLENBQStJc0gsQ0FBRCxJQUFLO0FBQ3JKLFlBQUlBLENBQUMsQ0FBQ2dILFNBQU4sRUFBaUJ0SSxLQUFLLEdBQUdBLEtBQUssSUFBSXNCLENBQWpCLENBQWpCLEtBQ0ssTUFBTUEsQ0FBTjtBQUNSLE9BSEssQ0FBTjs7QUFJQSxVQUFJdEIsS0FBSixFQUFXO0FBQ1BpVixRQUFBQSxNQUFNLENBQUN2SixNQUFQLENBQWNrTyxJQUFkLENBQW1CLGtCQUFuQixFQUF1QzVaLEtBQXZDLEVBQThDeVosU0FBOUMsRUFBeURILFVBQXpEO0FBQ0EsY0FBTXRaLEtBQU47QUFDSDs7QUFDRCxVQUFJcEosS0FBSixFQUFxQyxFQUlwQzs7QUFDRHFlLE1BQUFBLE1BQU0sQ0FBQ3ZKLE1BQVAsQ0FBY2tPLElBQWQsQ0FBbUIscUJBQW5CLEVBQTBDM2EsRUFBMUMsRUFBOENxYSxVQUE5QztBQUNBLGFBQU8sSUFBUDtBQUNILEtBdEVELENBc0VFLE9BQU8xRCxJQUFQLEVBQWE7QUFDWCxVQUFJQSxJQUFJLENBQUN0TixTQUFULEVBQW9CO0FBQ2hCLGVBQU8sS0FBUDtBQUNIOztBQUNELFlBQU1zTixJQUFOO0FBQ0g7QUFDSjs7QUFDRFMsRUFBQUEsV0FBVyxDQUFDc0MsTUFBRCxFQUFTcFosR0FBVCxFQUFjTixFQUFkLEVBQWtCdUIsT0FBTyxHQUFHLEVBQTVCLEVBQ1I7QUFDQyxjQUEyQztBQUN2QyxVQUFJLE9BQU80RSxNQUFNLENBQUM2TyxPQUFkLEtBQTBCLFdBQTlCLEVBQTJDO0FBQ3ZDcFosUUFBQUEsT0FBTyxDQUFDbUYsS0FBUixDQUFlLDJDQUFmO0FBQ0E7QUFDSDs7QUFDRCxVQUFJLE9BQU9vRixNQUFNLENBQUM2TyxPQUFQLENBQWUwRSxNQUFmLENBQVAsS0FBa0MsV0FBdEMsRUFBbUQ7QUFDL0M5ZCxRQUFBQSxPQUFPLENBQUNtRixLQUFSLENBQWUsMkJBQTBCMlksTUFBTyxtQkFBaEQ7QUFDQTtBQUNIO0FBQ0o7O0FBQ0QsUUFBSUEsTUFBTSxLQUFLLFdBQVgsSUFBMEIsQ0FBQyxHQUFHMUosTUFBSixFQUFZcUgsTUFBWixPQUF5QnJYLEVBQXZELEVBQTJEO0FBQ3ZELFdBQUtrWSxRQUFMLEdBQWdCM1csT0FBTyxDQUFDZ0IsT0FBeEI7QUFDQTRELE1BQUFBLE1BQU0sQ0FBQzZPLE9BQVAsQ0FBZTBFLE1BQWYsRUFBdUI7QUFDbkJwWixRQUFBQSxHQURtQjtBQUVuQk4sUUFBQUEsRUFGbUI7QUFHbkJ1QixRQUFBQSxPQUhtQjtBQUluQitWLFFBQUFBLEdBQUcsRUFBRSxJQUpjO0FBS25CRSxRQUFBQSxHQUFHLEVBQUUsS0FBS1AsSUFBTCxHQUFZeUMsTUFBTSxLQUFLLFdBQVgsR0FBeUIsS0FBS3pDLElBQTlCLEdBQXFDLEtBQUtBLElBQUwsR0FBWTtBQUwvQyxPQUF2QixFQU1HO0FBQ0g7QUFDQTtBQUNBLFFBVEEsRUFTSWpYLEVBVEo7QUFVSDtBQUNKOztBQUN5QixRQUFwQitjLG9CQUFvQixDQUFDamMsR0FBRCxFQUFNc1EsUUFBTixFQUFnQlksS0FBaEIsRUFBdUJoUyxFQUF2QixFQUEyQnFhLFVBQTNCLEVBQXVDMkMsYUFBdkMsRUFBc0Q7QUFDNUUsUUFBSWxjLEdBQUcsQ0FBQ3VJLFNBQVIsRUFBbUI7QUFDZjtBQUNBLFlBQU12SSxHQUFOO0FBQ0g7O0FBQ0QsUUFBSSxDQUFDLEdBQUc4TyxZQUFKLEVBQWtCN0ksWUFBbEIsQ0FBK0JqRyxHQUEvQixLQUF1Q2tjLGFBQTNDLEVBQTBEO0FBQ3REaEgsTUFBQUEsTUFBTSxDQUFDdkosTUFBUCxDQUFja08sSUFBZCxDQUFtQixrQkFBbkIsRUFBdUM3WixHQUF2QyxFQUE0Q2QsRUFBNUMsRUFBZ0RxYSxVQUFoRCxFQURzRCxDQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUNBbFUsTUFBQUEsTUFBTSxDQUFDK1MsUUFBUCxDQUFnQmpaLElBQWhCLEdBQXVCRCxFQUF2QixDQVBzRCxDQVF0RDtBQUNBOztBQUNBLFlBQU0yUSxzQkFBc0IsRUFBNUI7QUFDSDs7QUFDRCxRQUFJO0FBQ0EsVUFBSStGLFVBQUo7QUFDQSxVQUFJck0sV0FBSjtBQUNBLFVBQUl6SCxLQUFKOztBQUNBLFVBQUksT0FBTzhULFVBQVAsS0FBc0IsV0FBdEIsSUFBcUMsT0FBT3JNLFdBQVAsS0FBdUIsV0FBaEUsRUFBNkU7QUFDekUsU0FBQztBQUFFdUssVUFBQUEsSUFBSSxFQUFFOEIsVUFBUjtBQUFxQnJNLFVBQUFBO0FBQXJCLFlBQXNDLE1BQU0sS0FBSytSLGNBQUwsQ0FBb0IsU0FBcEIsQ0FBN0M7QUFDSDs7QUFDRCxZQUFNVixTQUFTLEdBQUc7QUFDZDlZLFFBQUFBLEtBRGM7QUFFZDZULFFBQUFBLFNBQVMsRUFBRUMsVUFGRztBQUdkck0sUUFBQUEsV0FIYztBQUlkdkosUUFBQUEsR0FKYztBQUtkQyxRQUFBQSxLQUFLLEVBQUVEO0FBTE8sT0FBbEI7O0FBT0EsVUFBSSxDQUFDNGEsU0FBUyxDQUFDOVksS0FBZixFQUFzQjtBQUNsQixZQUFJO0FBQ0E4WSxVQUFBQSxTQUFTLENBQUM5WSxLQUFWLEdBQWtCLE1BQU0sS0FBS3VNLGVBQUwsQ0FBcUJ1SCxVQUFyQixFQUFpQztBQUNyRDVWLFlBQUFBLEdBRHFEO0FBRXJEc1EsWUFBQUEsUUFGcUQ7QUFHckRZLFlBQUFBO0FBSHFELFdBQWpDLENBQXhCO0FBS0gsU0FORCxDQU1FLE9BQU9pTCxNQUFQLEVBQWU7QUFDYnJoQixVQUFBQSxPQUFPLENBQUNtRixLQUFSLENBQWMseUNBQWQsRUFBeURrYyxNQUF6RDtBQUNBdkIsVUFBQUEsU0FBUyxDQUFDOVksS0FBVixHQUFrQixFQUFsQjtBQUVIO0FBQ0o7O0FBQ0QsYUFBTzhZLFNBQVA7QUFDSCxLQTVCRCxDQTRCRSxPQUFPd0IsWUFBUCxFQUFxQjtBQUNuQixhQUFPLEtBQUtILG9CQUFMLENBQTBCRyxZQUExQixFQUF3QzlMLFFBQXhDLEVBQWtEWSxLQUFsRCxFQUF5RGhTLEVBQXpELEVBQTZEcWEsVUFBN0QsRUFBeUUsSUFBekUsQ0FBUDtBQUNIO0FBQ0o7O0FBQ2lCLFFBQVpzQixZQUFZLENBQUMvUixLQUFELEVBQVF3SCxRQUFSLEVBQWtCWSxLQUFsQixFQUF5QmhTLEVBQXpCLEVBQTZCOEQsVUFBN0IsRUFBeUN1VyxVQUF6QyxFQUFxRDtBQUNuRSxRQUFJO0FBQ0EsWUFBTThDLGlCQUFpQixHQUFHLEtBQUtoRixVQUFMLENBQWdCdk8sS0FBaEIsQ0FBMUI7O0FBQ0EsVUFBSXlRLFVBQVUsQ0FBQzlYLE9BQVgsSUFBc0I0YSxpQkFBdEIsSUFBMkMsS0FBS3ZULEtBQUwsS0FBZUEsS0FBOUQsRUFBcUU7QUFDakUsZUFBT3VULGlCQUFQO0FBQ0g7O0FBQ0QsWUFBTUMsZUFBZSxHQUFHRCxpQkFBaUIsSUFBSSxhQUFhQSxpQkFBbEMsR0FBc0QvbUIsU0FBdEQsR0FBa0UrbUIsaUJBQTFGO0FBQ0EsWUFBTXpCLFNBQVMsR0FBRzBCLGVBQWUsR0FBR0EsZUFBSCxHQUFxQixNQUFNLEtBQUtoQixjQUFMLENBQW9CeFMsS0FBcEIsRUFBMkI1TyxJQUEzQixDQUFpQ29OLEdBQUQsS0FBUTtBQUM1RnFPLFFBQUFBLFNBQVMsRUFBRXJPLEdBQUcsQ0FBQ3dNLElBRDZFO0FBRTVGdkssUUFBQUEsV0FBVyxFQUFFakMsR0FBRyxDQUFDaUMsV0FGMkU7QUFHNUZnTyxRQUFBQSxPQUFPLEVBQUVqUSxHQUFHLENBQUNpVixHQUFKLENBQVFoRixPQUgyRTtBQUk1RkMsUUFBQUEsT0FBTyxFQUFFbFEsR0FBRyxDQUFDaVYsR0FBSixDQUFRL0U7QUFKMkUsT0FBUixDQUFoQyxDQUE1RDtBQU9BLFlBQU07QUFBRTdCLFFBQUFBLFNBQVMsRUFBRUMsVUFBYjtBQUEwQjJCLFFBQUFBLE9BQTFCO0FBQW9DQyxRQUFBQTtBQUFwQyxVQUFpRG9ELFNBQXZEOztBQUNBLGdCQUEyQztBQUN2QyxjQUFNO0FBQUU0QixVQUFBQTtBQUFGLFlBQTBCMXBCLG1CQUFPLENBQUMsMEJBQUQsQ0FBdkM7O0FBQ0EsWUFBSSxDQUFDMHBCLGtCQUFrQixDQUFDNUcsVUFBRCxDQUF2QixFQUFxQztBQUNqQyxnQkFBTSxJQUFJdGMsS0FBSixDQUFXLHlEQUF3RGdYLFFBQVMsR0FBNUUsQ0FBTjtBQUNIO0FBQ0o7O0FBQ0QsVUFBSTBFLFFBQUo7O0FBQ0EsVUFBSXVDLE9BQU8sSUFBSUMsT0FBZixFQUF3QjtBQUNwQnhDLFFBQUFBLFFBQVEsR0FBRyxLQUFLUSxVQUFMLENBQWdCaUgsV0FBaEIsQ0FBNEIsQ0FBQyxHQUFHdk4sTUFBSixFQUFZb0Qsb0JBQVosQ0FBaUM7QUFDcEVoQyxVQUFBQSxRQURvRTtBQUVwRVksVUFBQUE7QUFGb0UsU0FBakMsQ0FBNUIsRUFHUGxPLFVBSE8sRUFHS3VVLE9BSEwsRUFHYyxLQUFLM1csTUFIbkIsQ0FBWDtBQUlIOztBQUNELFlBQU1rQixLQUFLLEdBQUcsTUFBTSxLQUFLNGEsUUFBTCxDQUFjLE1BQUluRixPQUFPLEdBQUcsS0FBS29GLGNBQUwsQ0FBb0IzSCxRQUFwQixDQUFILEdBQW1Dd0MsT0FBTyxHQUFHLEtBQUtvRixjQUFMLENBQW9CNUgsUUFBcEIsQ0FBSCxHQUFtQyxLQUFLM0csZUFBTCxDQUFxQnVILFVBQXJCLEVBQWlDO0FBQ3ZKO0FBQ0l0RixRQUFBQSxRQURKO0FBRUlZLFFBQUFBLEtBRko7QUFHSTJCLFFBQUFBLE1BQU0sRUFBRTNULEVBSFo7QUFJSTBCLFFBQUFBLE1BQU0sRUFBRSxLQUFLQSxNQUpqQjtBQUtJeUQsUUFBQUEsT0FBTyxFQUFFLEtBQUtBLE9BTGxCO0FBTUlJLFFBQUFBLGFBQWEsRUFBRSxLQUFLQTtBQU54QixPQURzSCxDQUF0RyxDQUFwQjtBQVVBbVcsTUFBQUEsU0FBUyxDQUFDOVksS0FBVixHQUFrQkEsS0FBbEI7QUFDQSxXQUFLdVYsVUFBTCxDQUFnQnZPLEtBQWhCLElBQXlCOFIsU0FBekI7QUFDQSxhQUFPQSxTQUFQO0FBQ0gsS0F4Q0QsQ0F3Q0UsT0FBT2lDLElBQVAsRUFBYTtBQUNYLGFBQU8sS0FBS1osb0JBQUwsQ0FBMEJZLElBQTFCLEVBQWdDdk0sUUFBaEMsRUFBMENZLEtBQTFDLEVBQWlEaFMsRUFBakQsRUFBcURxYSxVQUFyRCxDQUFQO0FBQ0g7QUFDSjs7QUFDRDNaLEVBQUFBLEdBQUcsQ0FBQ2tKLEtBQUQsRUFBUXdILFFBQVIsRUFBa0JZLEtBQWxCLEVBQXlCaFMsRUFBekIsRUFBNkIyVixJQUE3QixFQUFtQ2lILFdBQW5DLEVBQWdEO0FBQy9DLFNBQUsvRixVQUFMLEdBQWtCLEtBQWxCO0FBQ0EsU0FBS2pOLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUt3SCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtZLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUsyQixNQUFMLEdBQWMzVCxFQUFkO0FBQ0EsV0FBTyxLQUFLNmEsTUFBTCxDQUFZbEYsSUFBWixFQUFrQmlILFdBQWxCLENBQVA7QUFDSDtBQUNEO0FBQ0o7QUFDQTtBQUNBOzs7QUFBTWdCLEVBQUFBLGNBQWMsQ0FBQ3hYLEVBQUQsRUFBSztBQUNqQixTQUFLNFIsSUFBTCxHQUFZNVIsRUFBWjtBQUNIOztBQUNEc1UsRUFBQUEsZUFBZSxDQUFDMWEsRUFBRCxFQUFLO0FBQ2hCLFFBQUksQ0FBQyxLQUFLMlQsTUFBVixFQUFrQixPQUFPLEtBQVA7QUFDbEIsVUFBTSxDQUFDa0ssWUFBRCxFQUFlQyxPQUFmLElBQTBCLEtBQUtuSyxNQUFMLENBQVlILEtBQVosQ0FBa0IsR0FBbEIsQ0FBaEM7QUFDQSxVQUFNLENBQUN1SyxZQUFELEVBQWVDLE9BQWYsSUFBMEJoZSxFQUFFLENBQUN3VCxLQUFILENBQVMsR0FBVCxDQUFoQyxDQUhnQixDQUloQjs7QUFDQSxRQUFJd0ssT0FBTyxJQUFJSCxZQUFZLEtBQUtFLFlBQTVCLElBQTRDRCxPQUFPLEtBQUtFLE9BQTVELEVBQXFFO0FBQ2pFLGFBQU8sSUFBUDtBQUNILEtBUGUsQ0FRaEI7OztBQUNBLFFBQUlILFlBQVksS0FBS0UsWUFBckIsRUFBbUM7QUFDL0IsYUFBTyxLQUFQO0FBQ0gsS0FYZSxDQVloQjtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0EsV0FBT0QsT0FBTyxLQUFLRSxPQUFuQjtBQUNIOztBQUNEcEQsRUFBQUEsWUFBWSxDQUFDNWEsRUFBRCxFQUFLO0FBQ2IsVUFBTSxHQUFHZ1UsSUFBSCxJQUFXaFUsRUFBRSxDQUFDd1QsS0FBSCxDQUFTLEdBQVQsQ0FBakIsQ0FEYSxDQUViO0FBQ0E7O0FBQ0EsUUFBSVEsSUFBSSxLQUFLLEVBQVQsSUFBZUEsSUFBSSxLQUFLLEtBQTVCLEVBQW1DO0FBQy9CN04sTUFBQUEsTUFBTSxDQUFDOFgsUUFBUCxDQUFnQixDQUFoQixFQUFtQixDQUFuQjtBQUNBO0FBQ0gsS0FQWSxDQVFiOzs7QUFDQSxVQUFNQyxJQUFJLEdBQUdyVyxRQUFRLENBQUNzVyxjQUFULENBQXdCbkssSUFBeEIsQ0FBYjs7QUFDQSxRQUFJa0ssSUFBSixFQUFVO0FBQ05BLE1BQUFBLElBQUksQ0FBQ0UsY0FBTDtBQUNBO0FBQ0gsS0FiWSxDQWNiO0FBQ0E7OztBQUNBLFVBQU1DLE1BQU0sR0FBR3hXLFFBQVEsQ0FBQ3lXLGlCQUFULENBQTJCdEssSUFBM0IsRUFBaUMsQ0FBakMsQ0FBZjs7QUFDQSxRQUFJcUssTUFBSixFQUFZO0FBQ1JBLE1BQUFBLE1BQU0sQ0FBQ0QsY0FBUDtBQUNIO0FBQ0o7O0FBQ0RsRCxFQUFBQSxRQUFRLENBQUN2SCxNQUFELEVBQVM7QUFDYixXQUFPLEtBQUtBLE1BQUwsS0FBZ0JBLE1BQXZCO0FBQ0g7QUFDRDtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUFvQixRQUFSdFMsUUFBUSxDQUFDZixHQUFELEVBQU1xVCxNQUFNLEdBQUdyVCxHQUFmLEVBQW9CaUIsT0FBTyxHQUFHLEVBQTlCLEVBQ2I7QUFDQyxRQUFJdVosTUFBTSxHQUFHLENBQUMsR0FBRzVLLGlCQUFKLEVBQXVCNEgsZ0JBQXZCLENBQXdDeFgsR0FBeEMsQ0FBYjtBQUNBLFFBQUk7QUFBRThRLE1BQUFBLFFBQVEsRUFBRW1OO0FBQVosUUFBMkJ6RCxNQUEvQjs7QUFDQSxRQUFJbmpCLEtBQUosRUFBcUMsRUFXcEM7O0FBQ0QsVUFBTTZjLEtBQUssR0FBRyxNQUFNLEtBQUs4QixVQUFMLENBQWdCMEUsV0FBaEIsRUFBcEI7QUFDQSxRQUFJbFgsVUFBVSxHQUFHNlAsTUFBakI7O0FBQ0EsUUFBSWhjLEtBQUosRUFBK0QsRUFBL0QsTUFhTztBQUNIbWpCLE1BQUFBLE1BQU0sQ0FBQzFKLFFBQVAsR0FBa0JtRCxtQkFBbUIsQ0FBQ3VHLE1BQU0sQ0FBQzFKLFFBQVIsRUFBa0JvRCxLQUFsQixDQUFyQzs7QUFDQSxVQUFJc0csTUFBTSxDQUFDMUosUUFBUCxLQUFvQm1OLFNBQXhCLEVBQW1DO0FBQy9CQSxRQUFBQSxTQUFTLEdBQUd6RCxNQUFNLENBQUMxSixRQUFuQjtBQUNBMEosUUFBQUEsTUFBTSxDQUFDMUosUUFBUCxHQUFrQm1OLFNBQWxCO0FBQ0FqZSxRQUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFHMFAsTUFBSixFQUFZb0Qsb0JBQVosQ0FBaUMwSCxNQUFqQyxDQUFOO0FBQ0g7QUFDSjs7QUFDRCxVQUFNbFIsS0FBSyxHQUFHLENBQUMsR0FBRytGLHVCQUFKLEVBQTZCakssdUJBQTdCLENBQXFENlksU0FBckQsQ0FBZCxDQXRDRCxDQXVDQzs7QUFDQSxjQUEyQztBQUN2QztBQUNIOztBQUNELFVBQU0xakIsT0FBTyxDQUFDNkIsR0FBUixDQUFZLENBQ2QsS0FBSzRaLFVBQUwsQ0FBZ0JrSSxNQUFoQixDQUF1QjVVLEtBQXZCLEVBQThCNU8sSUFBOUIsQ0FBb0N5akIsS0FBRCxJQUFTO0FBQ3hDLGFBQU9BLEtBQUssR0FBRyxLQUFLaEIsY0FBTCxDQUFvQixLQUFLbkgsVUFBTCxDQUFnQmlILFdBQWhCLENBQTRCamQsR0FBNUIsRUFBaUN3RCxVQUFqQyxFQUE2QyxJQUE3QyxFQUFtRCxPQUFPdkMsT0FBTyxDQUFDRyxNQUFmLEtBQTBCLFdBQTFCLEdBQXdDSCxPQUFPLENBQUNHLE1BQWhELEdBQXlELEtBQUtBLE1BQWpILENBQXBCLENBQUgsR0FBbUosS0FBL0o7QUFDSCxLQUZELENBRGMsRUFJZCxLQUFLNFUsVUFBTCxDQUFnQi9VLE9BQU8sQ0FBQ3JGLFFBQVIsR0FBbUIsVUFBbkIsR0FBZ0MsVUFBaEQsRUFBNEQwTixLQUE1RCxDQUpjLENBQVosQ0FBTjtBQU1IOztBQUNtQixRQUFkd1MsY0FBYyxDQUFDeFMsS0FBRCxFQUFRO0FBQ3hCLFFBQUlQLFNBQVMsR0FBRyxLQUFoQjs7QUFDQSxVQUFNcVYsTUFBTSxHQUFHLEtBQUsvRixHQUFMLEdBQVcsTUFBSTtBQUMxQnRQLE1BQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0gsS0FGRDs7QUFHQSxVQUFNc1YsZUFBZSxHQUFHLE1BQU0sS0FBS3JJLFVBQUwsQ0FBZ0JzSSxRQUFoQixDQUF5QmhWLEtBQXpCLENBQTlCOztBQUNBLFFBQUlQLFNBQUosRUFBZTtBQUNYLFlBQU10SSxLQUFLLEdBQUcsSUFBSTNHLEtBQUosQ0FBVyx3Q0FBdUN3UCxLQUFNLEdBQXhELENBQWQ7QUFDQTdJLE1BQUFBLEtBQUssQ0FBQ3NJLFNBQU4sR0FBa0IsSUFBbEI7QUFDQSxZQUFNdEksS0FBTjtBQUNIOztBQUNELFFBQUkyZCxNQUFNLEtBQUssS0FBSy9GLEdBQXBCLEVBQXlCO0FBQ3JCLFdBQUtBLEdBQUwsR0FBVyxJQUFYO0FBQ0g7O0FBQ0QsV0FBT2dHLGVBQVA7QUFDSDs7QUFDRG5CLEVBQUFBLFFBQVEsQ0FBQ3hTLEVBQUQsRUFBSztBQUNULFFBQUkzQixTQUFTLEdBQUcsS0FBaEI7O0FBQ0EsVUFBTXFWLE1BQU0sR0FBRyxNQUFJO0FBQ2ZyVixNQUFBQSxTQUFTLEdBQUcsSUFBWjtBQUNILEtBRkQ7O0FBR0EsU0FBS3NQLEdBQUwsR0FBVytGLE1BQVg7QUFDQSxXQUFPMVQsRUFBRSxHQUFHaFEsSUFBTCxDQUFXMmEsSUFBRCxJQUFRO0FBQ3JCLFVBQUkrSSxNQUFNLEtBQUssS0FBSy9GLEdBQXBCLEVBQXlCO0FBQ3JCLGFBQUtBLEdBQUwsR0FBVyxJQUFYO0FBQ0g7O0FBQ0QsVUFBSXRQLFNBQUosRUFBZTtBQUNYLGNBQU1zVSxJQUFJLEdBQUcsSUFBSXZqQixLQUFKLENBQVUsaUNBQVYsQ0FBYjtBQUNBdWpCLFFBQUFBLElBQUksQ0FBQ3RVLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxjQUFNc1UsSUFBTjtBQUNIOztBQUNELGFBQU9oSSxJQUFQO0FBQ0gsS0FWTSxDQUFQO0FBV0g7O0FBQ0Q4SCxFQUFBQSxjQUFjLENBQUMzSCxRQUFELEVBQVc7QUFDckIsVUFBTTtBQUFFN1YsTUFBQUEsSUFBSSxFQUFFNGU7QUFBUixRQUFzQixJQUFJdGUsR0FBSixDQUFRdVYsUUFBUixFQUFrQjNQLE1BQU0sQ0FBQytTLFFBQVAsQ0FBZ0JqWixJQUFsQyxDQUE1Qjs7QUFDQSxRQUFJLEtBQUosRUFBb0YsRUFFbkY7O0FBQ0QsV0FBTzRWLGFBQWEsQ0FBQ0MsUUFBRCxFQUFXLEtBQUtpQyxLQUFoQixDQUFiLENBQW9DL2MsSUFBcEMsQ0FBMEMyYSxJQUFELElBQVE7QUFDcEQsV0FBS29CLEdBQUwsQ0FBUzhILFFBQVQsSUFBcUJsSixJQUFyQjtBQUNBLGFBQU9BLElBQVA7QUFDSCxLQUhNLENBQVA7QUFJSDs7QUFDRCtILEVBQUFBLGNBQWMsQ0FBQzVILFFBQUQsRUFBVztBQUNyQixVQUFNO0FBQUU3VixNQUFBQSxJQUFJLEVBQUU2ZTtBQUFSLFFBQXlCLElBQUl2ZSxHQUFKLENBQVF1VixRQUFSLEVBQWtCM1AsTUFBTSxDQUFDK1MsUUFBUCxDQUFnQmpaLElBQWxDLENBQS9COztBQUNBLFFBQUksS0FBSytXLEdBQUwsQ0FBUzhILFdBQVQsQ0FBSixFQUEyQjtBQUN2QixhQUFPLEtBQUs5SCxHQUFMLENBQVM4SCxXQUFULENBQVA7QUFDSDs7QUFDRCxXQUFPLEtBQUs5SCxHQUFMLENBQVM4SCxXQUFULElBQXdCakosYUFBYSxDQUFDQyxRQUFELEVBQVcsS0FBS2lDLEtBQWhCLENBQWIsQ0FBb0MvYyxJQUFwQyxDQUEwQzJhLElBQUQsSUFBUTtBQUM1RSxhQUFPLEtBQUtxQixHQUFMLENBQVM4SCxXQUFULENBQVA7QUFDQSxhQUFPbkosSUFBUDtBQUNILEtBSDhCLEVBRzVCNWEsS0FINEIsQ0FHckI0aUIsSUFBRCxJQUFRO0FBQ2IsYUFBTyxLQUFLM0csR0FBTCxDQUFTOEgsV0FBVCxDQUFQO0FBQ0EsWUFBTW5CLElBQU47QUFDSCxLQU44QixDQUEvQjtBQU9IOztBQUNEeE8sRUFBQUEsZUFBZSxDQUFDc0gsU0FBRCxFQUFZc0ksR0FBWixFQUFpQjtBQUM1QixVQUFNO0FBQUV0SSxNQUFBQSxTQUFTLEVBQUV1STtBQUFiLFFBQXVCLEtBQUs3RyxVQUFMLENBQWdCLE9BQWhCLENBQTdCOztBQUNBLFVBQU04RyxPQUFPLEdBQUcsS0FBS3JHLFFBQUwsQ0FBY29HLElBQWQsQ0FBaEI7O0FBQ0FELElBQUFBLEdBQUcsQ0FBQ0UsT0FBSixHQUFjQSxPQUFkO0FBQ0EsV0FBTyxDQUFDLEdBQUdqUCxNQUFKLEVBQVlrUCxtQkFBWixDQUFnQ0YsSUFBaEMsRUFBc0M7QUFDekNDLE1BQUFBLE9BRHlDO0FBRXpDeEksTUFBQUEsU0FGeUM7QUFHekNuVixNQUFBQSxNQUFNLEVBQUUsSUFIaUM7QUFJekN5ZCxNQUFBQTtBQUp5QyxLQUF0QyxDQUFQO0FBTUg7O0FBQ0R4RSxFQUFBQSxrQkFBa0IsQ0FBQ3ZhLEVBQUQsRUFBS3FhLFVBQUwsRUFBaUI7QUFDL0IsUUFBSSxLQUFLMUIsR0FBVCxFQUFjO0FBQ1YzQyxNQUFBQSxNQUFNLENBQUN2SixNQUFQLENBQWNrTyxJQUFkLENBQW1CLGtCQUFuQixFQUF1Q2hLLHNCQUFzQixFQUE3RCxFQUFpRTNRLEVBQWpFLEVBQXFFcWEsVUFBckU7QUFDQSxXQUFLMUIsR0FBTDtBQUNBLFdBQUtBLEdBQUwsR0FBVyxJQUFYO0FBQ0g7QUFDSjs7QUFDRGtDLEVBQUFBLE1BQU0sQ0FBQ2xGLElBQUQsRUFBT2lILFdBQVAsRUFBb0I7QUFDdEIsV0FBTyxLQUFLbEUsR0FBTCxDQUFTL0MsSUFBVCxFQUFlLEtBQUt3QyxVQUFMLENBQWdCLE9BQWhCLEVBQXlCMUIsU0FBeEMsRUFBbURtRyxXQUFuRCxDQUFQO0FBQ0g7O0FBdnZCUTs7QUF5dkJiNUcsTUFBTSxDQUFDdkosTUFBUCxHQUFnQixDQUFDLEdBQUdzRCxLQUFKLEVBQVd2YyxPQUFYLEVBQWhCO0FBQ0FGLGVBQUEsR0FBa0IwaUIsTUFBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdGlDQTtBQUNBOzs7O0FBRUEsTUFBTXNKLFdBQTBDLEdBQUcsQ0FBQztBQUFFM0osRUFBQUE7QUFBRixDQUFELEtBQWM7QUFDL0Qsc0JBQ0U7QUFBQSw0QkFDRSw4REFBQyxnREFBRDtBQUFBLDhDQUVFO0FBQUEsa0JBQVEsR0FBRUEsSUFBSSxDQUFDL2dCLE1BQU87QUFBdEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFGRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREYsZUFLRSw4REFBQywyQ0FBRDtBQUFBLGdCQUNHK2dCLElBQUksSUFDSEEsSUFBSSxDQUFDeGMsR0FBTCxDQUFVb21CLElBQUQsaUJBQ1AsOERBQUMsNERBQUQ7QUFBYSxZQUFJLEVBQUVBO0FBQW5CLFNBQThCQSxJQUFJLENBQUNDLFNBQW5DO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREY7QUFGSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUxGO0FBQUEsa0JBREY7QUFjRCxDQWZEOztBQWlCQSxpRUFBZUYsV0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckJBO0FBRU8sTUFBTUQsT0FBTyxHQUFHSSx1RUFBSDtBQUFBO0FBQUE7QUFBQSw0SEFLaEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFMWixDQUFiO0FBV0EsTUFBTVIsWUFBWSxHQUFHSyx1RUFBSDtBQUFBO0FBQUE7QUFBQSxnS0FXckIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFYUCxDQUFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDYlA7QUFFQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFFQSxNQUFNcUIsVUFBcUMsR0FBRyxDQUFDO0FBQUUxQixFQUFBQTtBQUFGLENBQUQsS0FBYztBQUMxRCxRQUFNO0FBQUUyQixJQUFBQSxLQUFGO0FBQVNDLElBQUFBLFVBQVQ7QUFBcUJDLElBQUFBLFFBQXJCO0FBQStCQyxJQUFBQTtBQUEvQixNQUFpRDlCLElBQXZEO0FBQ0EsUUFBTSxDQUFDK0IsSUFBRCxFQUFPQyxZQUFQLElBQXVCUCwwREFBUyxDQUFDLElBQUQsQ0FBdEM7QUFDQSxRQUFNLENBQUMvaEIsU0FBRCxFQUFZdWlCLGlCQUFaLElBQWlDUiwwREFBUyxDQUFDLEtBQUQsQ0FBaEQ7QUFFQXhjLEVBQUFBLGdEQUFTLENBQUMsTUFBTTtBQUNkLFVBQU1pZCxVQUFVLEdBQUk1WixRQUFRLENBQUNzVyxjQUFULENBQXdCLFNBQXhCLENBQUQsQ0FDaEJ1RCxZQURIOztBQUVBLFFBQUlELFVBQVUsR0FBRyxHQUFqQixFQUFzQjtBQUNwQkQsTUFBQUEsaUJBQWlCO0FBQ2xCLEtBRkQsTUFFTztBQUNMRCxNQUFBQSxZQUFZO0FBQ2I7QUFDRixHQVJRLEVBUU4sQ0FBQ0EsWUFBRCxFQUFlQyxpQkFBZixDQVJNLENBQVQ7QUFVQSxzQkFDRTtBQUFBLDJCQUNFLCtEQUFDLHFEQUFEO0FBQUEsOEJBQ0UsK0RBQUMsbURBQUQ7QUFBQSxrQkFBa0JOO0FBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsZUFFRSwrREFBQyxnREFBRDtBQUFBLGtCQUNHQyxVQUFVLGlCQUNULCtEQUFDLG1EQUFEO0FBQ0UsYUFBRyxFQUFFQSxVQURQO0FBRUUsYUFBRyxFQUFFRCxLQUZQO0FBR0UsZUFBSyxFQUFFLEdBSFQ7QUFJRSxnQkFBTSxFQUFFLEdBSlY7QUFLRSxnQkFBTSxFQUFDLFlBTFQ7QUFNRSxrQkFBUSxFQUFFO0FBTlo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUZKO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRkYsZUFjRSwrREFBQyxrREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFkRixlQWVFLCtEQUFDLHNEQUFEO0FBQ0UsVUFBRSxFQUFDLFNBREw7QUFFRSxZQUFJLEVBQUVJLElBRlI7QUFHRSwrQkFBdUIsRUFBRTtBQUN2QkssVUFBQUEsTUFBTSxFQUFFUCxRQUFRLENBQUNRLFVBQVQsQ0FBb0IsUUFBcEIsRUFBOEIsYUFBOUI7QUFEZTtBQUgzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWZGLEVBdUJHM2lCLFNBQVMsR0FBRyxJQUFILGdCQUNSLCtEQUFDLGlEQUFEO0FBQWUsZUFBTyxFQUFFc2lCLFlBQXhCO0FBQUEsa0JBQ0csQ0FBQ0QsSUFBRCxnQkFDQztBQUFBLGtDQUNFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLGVBRUU7QUFBQSxtQ0FDRSwrREFBQyxpRUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFGRjtBQUFBLHdCQURELGdCQVFDO0FBQUEsa0NBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBREYsZUFFRTtBQUFBLG1DQUNFLCtEQUFDLCtEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUZGO0FBQUE7QUFUSjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQXhCSixlQTJDRywrREFBQywrQ0FBRDtBQUFVLFlBQUksRUFBRS9CO0FBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBM0NILEVBNkNHLENBQUMsTUFBTTtBQUNOLGdCQUFROEIsYUFBUjtBQUNFLGVBQUssRUFBTDtBQUNFLGdDQUFPLCtEQUFDLDhDQUFEO0FBQVUsa0JBQUksRUFBRTlCO0FBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQVA7O0FBQ0YsZUFBSyxFQUFMO0FBQ0UsZ0NBQU8sK0RBQUMsaURBQUQ7QUFBYSxrQkFBSSxFQUFFQTtBQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFQOztBQUNGLGVBQUssRUFBTDtBQUNFLGdDQUFPLCtEQUFDLCtDQUFEO0FBQVcsa0JBQUksRUFBRUE7QUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBUDs7QUFDRixlQUFLLEVBQUw7QUFDRSxnQ0FBTywrREFBQyxnREFBRDtBQUFZLGtCQUFJLEVBQUVBO0FBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQVA7O0FBQ0YsZUFBSyxFQUFMO0FBQ0UsZ0NBQU8sK0RBQUMsZ0RBQUQ7QUFBWSxrQkFBSSxFQUFFQTtBQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFQOztBQUNGLGVBQUssRUFBTDtBQUNFLGdDQUFPLCtEQUFDLCtDQUFEO0FBQVcsa0JBQUksRUFBRUE7QUFBakI7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFBUDs7QUFDRixlQUFLLEVBQUw7QUFDRSxnQ0FBTywrREFBQyw4Q0FBRDtBQUFVLGtCQUFJLEVBQUVBO0FBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBQVA7O0FBQ0YsZUFBSyxFQUFMO0FBQ0UsZ0NBQU8sK0RBQUMsOENBQUQ7QUFBVSxrQkFBSSxFQUFFQTtBQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUFQOztBQUNGO0FBQ0U7QUFsQko7QUFvQkQsT0FyQkEsR0E3Q0g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsbUJBREY7QUF3RUQsQ0F2RkQ7O0FBeUZBLGlFQUFlMEIsVUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hIQTtBQUNBO0FBRU8sTUFBTWQsaUJBQWlCLEdBQUdWLHVFQUFIO0FBQUE7QUFBQTtBQUFBLDhEQUF2QjtBQU1BLE1BQU1TLGVBQWUsR0FBR1Qsc0VBQUg7QUFBQTtBQUFBO0FBQUEsMEtBS3hCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BTEosRUFReEIsQ0FBQztBQUFFRCxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNGIsTUFSSixFQWF4QixDQUFDO0FBQUVwQyxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNmIsT0FiSixDQUFyQjtBQWtCQSxNQUFNakMsZUFBZSxHQUFHTix3REFBTSxDQUFDb0MsbURBQUQsQ0FBVDtBQUFBO0FBQUE7QUFBQSx5RUFHeEIsQ0FBQztBQUFFbEMsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BSEosRUFNeEIsQ0FBQztBQUFFRCxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNGIsTUFOSixDQUFyQjtBQVdBLE1BQU0zQixZQUFZLEdBQUdYLHVFQUFIO0FBQUE7QUFBQTtBQUFBLG9DQUVyQixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQUZQLENBQWxCO0FBT0EsTUFBTUksY0FBYyxHQUFHUCxzRUFBSDtBQUFBO0FBQUE7QUFBQSxrUEFjdkIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFkTCxFQWlCdkIsQ0FBQztBQUFFRCxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNGIsTUFqQkwsQ0FBcEI7QUF5QkEsTUFBTTlCLGtCQUFrQixHQUFHUix1RUFBSDtBQUFBO0FBQUE7QUFBQSxzSkFLbEI3YyxLQUFELElBQVlBLEtBQUssQ0FBQzBlLElBQU4sR0FBYSxPQUFiLEdBQXVCLFFBTGhCLEVBUzNCLENBQUM7QUFBRTNCLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQVRELENBQXhCO0FBZUEsTUFBTUUsYUFBYSxHQUFHTCx1RUFBSDtBQUFBO0FBQUE7QUFBQSwyS0FZdEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFaTixDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckZQO0FBQ0E7OztBQVFBLE1BQU0wQyxjQUF3QixHQUFHLE1BQU07QUFDckMsc0JBQ0UsOERBQUMsMkNBQUQ7QUFBQSw0QkFDRSw4REFBQyw0Q0FBRDtBQUFBLDZCQUNFLDhEQUFDLGlEQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURGLGVBSUUsOERBQUMsK0NBQUQ7QUFBQSw2QkFDRSw4REFBQyxpREFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERjtBQVVELENBWEQ7O0FBYUEsaUVBQWVBLGNBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RCQTtBQUVPLE1BQU1qRCxPQUFPLEdBQUdJLHVFQUFIO0FBQUE7QUFBQTtBQUFBLDhEQUFiO0FBTUEsTUFBTTJDLFFBQVEsR0FBRzNDLHVFQUFIO0FBQUE7QUFBQTtBQUFBLHdJQUlqQixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQUpYLEVBU2pCLENBQUM7QUFBRUQsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTRiLE1BVFgsRUFZakIsQ0FBQztBQUFFcEMsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTZiLE9BWlgsQ0FBZDtBQWlCQSxNQUFNSyxhQUFhLEdBQUc1Qyx1RUFBSDtBQUFBO0FBQUE7QUFBQSx3ZkErQnRCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BL0JOLEVBa0N0QixDQUFDO0FBQUVELEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQWxDTixFQXNDdEIsQ0FBQztBQUFFcEMsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTZiLE9BdENOLENBQW5CO0FBMENBLE1BQU1HLFdBQVcsR0FBRzFDLHVFQUFIO0FBQUE7QUFBQTtBQUFBLHFGQUlwQixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWFvYyxFQUpSLEVBTXBCLENBQUM7QUFBRTVDLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQU5SLENBQWpCO0FBWUEsTUFBTXNDLGFBQWEsR0FBR3pDLHVFQUFIO0FBQUE7QUFBQTtBQUFBLGtlQStCdEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUEvQk4sRUFrQ3RCLENBQUM7QUFBRUQsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTRiLE1BbENOLEVBcUN0QixDQUFDO0FBQUVwQyxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNmIsT0FyQ04sQ0FBbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9FUDtBQUNBOzs7QUFFQSxNQUFNUyxNQUFnQixHQUFHLE1BQU07QUFDN0Isc0JBQU8sOERBQUMsaURBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFQO0FBQ0QsQ0FGRDs7QUFJQSxpRUFBZUEsTUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQTtBQUVPLE1BQU1ELGFBQWEsR0FBRy9DLHVFQUFIO0FBQUE7QUFBQTtBQUFBLDhDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGUDtBQUNBO0FBQ0E7OztBQU9BLE1BQU1rRCxRQUE2QixHQUFHLENBQUM7QUFBRXpCLEVBQUFBLEtBQUY7QUFBUzBCLEVBQUFBO0FBQVQsQ0FBRCxLQUE4QjtBQUNsRSxzQkFDRSw4REFBQyxzQ0FBRDtBQUFBLDJCQUNFLDhEQUFDLGtEQUFEO0FBQ0UsVUFBSSxFQUFFO0FBQ0p4UixRQUFBQSxRQUFRLEVBQUUsT0FETjtBQUVKWSxRQUFBQSxLQUFLLEVBQUU7QUFBRWtQLFVBQUFBLEtBQUY7QUFBUzBCLFVBQUFBO0FBQVQ7QUFGSCxPQURSO0FBS0UsUUFBRSxFQUFHLGVBQWMxQixLQUFNLGtCQUFpQjBCLGFBQWMsRUFMMUQ7QUFBQSw2QkFPRTtBQUFBLGtCQUVHMUI7QUFGSDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBUEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERjtBQWdCRCxDQWpCRDs7QUFtQkEsaUVBQWV5QixRQUFmOzs7Ozs7Ozs7Ozs7Ozs7OztBQzVCQTtBQUVPLE1BQU1ELEVBQUUsR0FBR2pELHNFQUFIO0FBQUE7QUFBQTtBQUFBLDRDQUNYLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTRiLE1BRGpCLENBQVI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRlA7QUFDQTtBQUVBOzs7O0FBUUEsTUFBTWhCLFFBQW1DLEdBQUcsQ0FBQztBQUFFeEIsRUFBQUE7QUFBRixDQUFELEtBQWM7QUFDeEQsUUFBTTtBQUFFMEQsSUFBQUEsSUFBRjtBQUFRQyxJQUFBQSxJQUFSO0FBQWNoQyxJQUFBQTtBQUFkLE1BQXdCM0IsSUFBOUI7QUFDQS9hLEVBQUFBLGdEQUFTLENBQUMsTUFBTTtBQUNkLFVBQU11RSxNQUFNLEdBQUdsQixRQUFRLENBQUNuSSxhQUFULENBQXVCLFFBQXZCLENBQWY7QUFDQXFKLElBQUFBLE1BQU0sQ0FBQ2pTLEdBQVAsR0FBYyx5REFBd0RhLGtDQUFtQyxFQUF6RztBQUNBa1EsSUFBQUEsUUFBUSxDQUFDYSxJQUFULENBQWNDLFdBQWQsQ0FBMEJJLE1BQTFCO0FBRUEsVUFBTXFhLFNBQVMsR0FBR3ZiLFFBQVEsQ0FBQ3NXLGNBQVQsQ0FBd0IsS0FBeEIsQ0FBbEI7O0FBQ0FwVixJQUFBQSxNQUFNLENBQUMvTSxNQUFQLEdBQWdCLE1BQU07QUFDcEJtSyxNQUFBQSxNQUFNLENBQUNrZCxLQUFQLENBQWFDLElBQWIsQ0FBa0JycEIsSUFBbEIsQ0FBdUIsTUFBTTtBQUMzQixjQUFNc0gsT0FBTyxHQUFHO0FBQ2RnaUIsVUFBQUEsTUFBTSxFQUFFLElBQUlwZCxNQUFNLENBQUNrZCxLQUFQLENBQWFDLElBQWIsQ0FBa0JFLE1BQXRCLENBQTZCTixJQUE3QixFQUFtQ0QsSUFBbkMsQ0FETTtBQUVkUSxVQUFBQSxLQUFLLEVBQUU7QUFGTyxTQUFoQjtBQUlBLGNBQU10cUIsR0FBRyxHQUFHLElBQUlnTixNQUFNLENBQUNrZCxLQUFQLENBQWFDLElBQWIsQ0FBa0JodEIsR0FBdEIsQ0FBMEI4c0IsU0FBMUIsRUFBcUM3aEIsT0FBckMsQ0FBWixDQUwyQixDQU8zQjs7QUFDQSxjQUFNbWlCLGNBQWMsR0FBRyxJQUFJTCxLQUFLLENBQUNDLElBQU4sQ0FBV0UsTUFBZixDQUFzQk4sSUFBdEIsRUFBNEJELElBQTVCLENBQXZCO0FBQ0EsY0FBTVUsTUFBTSxHQUFHLElBQUlOLEtBQUssQ0FBQ0MsSUFBTixDQUFXTSxNQUFmLENBQXNCO0FBQ25DOW5CLFVBQUFBLFFBQVEsRUFBRTRuQjtBQUR5QixTQUF0QixDQUFmO0FBR0FDLFFBQUFBLE1BQU0sQ0FBQ0UsTUFBUCxDQUFjMXFCLEdBQWQsRUFaMkIsQ0FjM0I7O0FBQ0FBLFFBQUFBLEdBQUcsQ0FBQzJxQixXQUFKLENBQWdCLEtBQWhCLEVBZjJCLENBaUIzQjtBQUNBO0FBQ0E7QUFDRCxPQXBCRDtBQXFCRCxLQXRCRDs7QUF1QkEsV0FBTyxNQUFNL2EsTUFBTSxDQUFDZ2IsTUFBUCxFQUFiO0FBQ0QsR0E5QlEsRUE4Qk4sQ0FBQ3hFLElBQUQsRUFBTzBELElBQVAsRUFBYUMsSUFBYixDQTlCTSxDQUFUO0FBZ0NBLHNCQUNFO0FBQUEsY0FDR0QsSUFBSSxnQkFDSCw4REFBQyw4Q0FBRDtBQUFBLDhCQUNFLDhEQUFDLDhDQUFEO0FBQUEsZ0NBQ0U7QUFBQSxpQ0FDRTtBQUFBLHNCQUFPL0I7QUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERixlQUlFO0FBQ0UsY0FBSSxFQUFHLGlDQUFnQ0EsS0FBTSxJQUFHZ0MsSUFBSyxJQUFHRCxJQUFLLEVBRC9EO0FBRUUsZ0JBQU0sRUFBQyxRQUZUO0FBR0UsYUFBRyxFQUFDLFlBSE47QUFBQSxpQ0FLRTtBQUFBLDJEQUNNLDhEQUFDLGlFQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEseUJBRE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTEY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsZUFlRSw4REFBQyx1Q0FBRDtBQUFLLFVBQUUsRUFBQztBQUFSO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURHLEdBa0JEO0FBbkJOLG1CQURGO0FBdUJELENBekREOztBQTBEQSxpRUFBZWxDLFFBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckVBO0FBRU8sTUFBTWlDLFVBQVUsR0FBR3ZELHVFQUFIO0FBQUE7QUFBQTtBQUFBLDhFQUluQixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQUpULENBQWhCO0FBU0EsTUFBTXRwQixHQUFHLEdBQUdtcEIsdUVBQUg7QUFBQTtBQUFBO0FBQUEsZ0dBS1osQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFMaEIsRUFPWixDQUFDO0FBQUVELEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQVBoQixFQVVaLENBQUM7QUFBRXBDLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE2YixPQVZoQixDQUFUO0FBZUEsTUFBTWdDLGdCQUFnQixHQUFHdkUsdUVBQUg7QUFBQTtBQUFBO0FBQUEsaUNBQXRCO0FBS0EsTUFBTXNELFVBQVUsR0FBR3RELHVFQUFIO0FBQUE7QUFBQTtBQUFBLG9nQkFtQ25CLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTZiLE9BbkNULENBQWhCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQy9CUDtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBLE1BQU1tQyxNQUFnQixHQUFHLENBQUM7QUFBRW5nQixFQUFBQTtBQUFGLENBQUQsS0FBa0I7QUFDekMsc0JBQ0U7QUFBQSw0QkFDRSw4REFBQyx1REFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURGLGVBRUUsOERBQUMsK0NBQUQ7QUFBQSxnQkFBY0E7QUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUZGLGVBR0UsOERBQUMsNENBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFIRjtBQUFBLGtCQURGO0FBT0QsQ0FSRDs7QUFVQSxpRUFBZW1nQixNQUFmOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZBO0FBRU8sTUFBTUQsV0FBVyxHQUFHekUsdUVBQUg7QUFBQTtBQUFBO0FBQUEsMkRBR3BCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYW9jLEVBSFIsRUFNcEIsQ0FBQztBQUFFNUMsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BTlIsQ0FBakI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGUDs7OztBQU1BLE1BQU13RSxPQUEyQixHQUFHLENBQUM7QUFBRS9VLEVBQUFBLElBQUY7QUFBUWdWLEVBQUFBO0FBQVIsQ0FBRCxLQUFvQjtBQUN0RCxzQkFDRTtBQUFBLDJCQUNFLDhEQUFDLHNDQUFEO0FBQUEsOEJBQ0U7QUFBQSxrQkFBSWhWO0FBQUo7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixlQUVFO0FBQ0UsK0JBQXVCLEVBQUU7QUFDdkJzUyxVQUFBQSxNQUFNLEVBQUUwQztBQURlO0FBRDNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREYsbUJBREY7QUFZRCxDQWJEOztBQWVBLGlFQUFlRCxPQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFFTyxNQUFNMUIsRUFBRSxHQUFHakQsc0VBQUg7QUFBQTtBQUFBO0FBQUEsaVFBbUJYLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTRiLE1BbkJqQixDQUFSO0FBMEJBLE1BQU11QyxZQUFZLEdBQUc3RSx1RUFBSDtBQUFBO0FBQUE7QUFBQSxvREFJckIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFKUCxDQUFsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUJQO0FBQ0E7QUFTQTtBQUVBOzs7O0FBRUEsTUFBTVksVUFBcUMsR0FBRyxDQUFDO0FBQUVqQixFQUFBQTtBQUFGLENBQUQsS0FBYztBQUMxRCxRQUFNO0FBQUEsT0FBQ3NGLFFBQUQ7QUFBQSxPQUFXQztBQUFYLE1BQTBCOVcsK0NBQVEsQ0FDdENSLEtBQUssQ0FBQ0MsT0FBTixDQUFjOFIsSUFBSSxDQUFDd0YsSUFBbkIsSUFDSXhGLElBQUksQ0FBQ3dGLElBQUwsQ0FBVSxDQUFWLEVBQWFDLFlBRGpCLEdBRUl6RixJQUFJLENBQUN3RixJQUFMLENBQVVDLFlBSHdCLENBQXhDO0FBS0EsUUFBTTtBQUFBLE9BQUNDLFVBQUQ7QUFBQSxPQUFhQztBQUFiLE1BQThCbFgsK0NBQVEsQ0FDMUNSLEtBQUssQ0FBQ0MsT0FBTixDQUFjOFIsSUFBSSxDQUFDd0YsSUFBbkIsSUFBMkJ4RixJQUFJLENBQUN3RixJQUFMLENBQVUsQ0FBVixFQUFhSSxPQUF4QyxHQUFrRDVGLElBQUksQ0FBQ3dGLElBQUwsQ0FBVUksT0FEbEIsQ0FBNUM7QUFHQSxRQUFNO0FBQUEsT0FBQ0MsV0FBRDtBQUFBLE9BQWNDO0FBQWQsTUFBZ0NyWCwrQ0FBUSxDQUM1Q1IsS0FBSyxDQUFDQyxPQUFOLENBQWM4UixJQUFJLENBQUN3RixJQUFuQixJQUNJeEYsSUFBSSxDQUFDd0YsSUFBTCxDQUFVLENBQVYsRUFBYU8saUJBRGpCLEdBRUkvRixJQUFJLENBQUN3RixJQUFMLENBQVVPLGlCQUg4QixDQUE5QztBQUtBLFFBQU1DLGNBQWMsR0FBRzFGLHdEQUFBLENBQ3BCL29CLEdBQUQsSUFBbUIsTUFBTTtBQUN2Qmd1QixJQUFBQSxXQUFXLENBQUNodUIsR0FBRyxDQUFDa3VCLFlBQUwsQ0FBWDtBQUNBRSxJQUFBQSxhQUFhLENBQUNwdUIsR0FBRyxDQUFDcXVCLE9BQUwsQ0FBYjtBQUNBRSxJQUFBQSxjQUFjLENBQUN2dUIsR0FBRyxDQUFDd3VCLGlCQUFMLENBQWQ7QUFDRCxHQUxvQixFQU1yQixFQU5xQixDQUF2QjtBQVFBLHNCQUNFO0FBQUEsNEJBQ0UsOERBQUMsNkRBQUQ7QUFBQSwrQ0FDSztBQUFBLHdCQUFRL0YsSUFBSSxDQUFDaUcsS0FBTCxDQUFXQyxRQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREw7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQURGLGVBSUUsOERBQUMsMkNBQUQ7QUFBQSw4QkFDRSw4REFBQyw4Q0FBRDtBQUFBLGtCQUNHbEcsSUFBSSxDQUFDd0YsSUFBTCxJQUFhdlgsS0FBSyxDQUFDQyxPQUFOLENBQWM4UixJQUFJLENBQUN3RixJQUFuQixDQUFiLEdBQ0N4RixJQUFJLENBQUN3RixJQUFMLENBQVU1ckIsR0FBVixDQUFldXNCLE1BQUQsaUJBQ1osOERBQUMsd0NBQUQ7QUFBQSxpQ0FDRTtBQUNFLHFCQUFTLEVBQUVULFVBQVUsSUFBSVMsTUFBTSxDQUFDUCxPQUFyQixHQUErQixRQUEvQixHQUEwQyxFQUR2RDtBQUVFLG1CQUFPLEVBQUVJLGNBQWMsQ0FBQ0csTUFBRCxDQUZ6QjtBQUFBLHNCQUlHQSxNQUFNLENBQUNQO0FBSlY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLFdBQVdPLE1BQU0sQ0FBQ0MsWUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERixDQURELGdCQVlDLDhEQUFDLHdDQUFEO0FBQUEsaUNBQ0U7QUFDRSxxQkFBUyxFQUFFVixVQUFVLElBQUkxRixJQUFJLENBQUN3RixJQUFMLENBQVVJLE9BQXhCLEdBQWtDLFFBQWxDLEdBQTZDLEVBRDFEO0FBRUUsbUJBQU8sRUFBRUksY0FBYyxDQUFDaEcsSUFBSSxDQUFDd0YsSUFBTixDQUZ6QjtBQUFBLHNCQUlHeEYsSUFBSSxDQUFDd0YsSUFBTCxDQUFVSTtBQUpiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBYko7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixlQXdCRSw4REFBQywrQ0FBRDtBQUFBLCtCQUNFLDhEQUFDLCtDQUFEO0FBQ0UsbUJBQVMsTUFEWDtBQUVFLGVBQUssRUFDSE4sUUFBUSxnQkFDTiw4REFBQyw2Q0FBRDtBQUNFLGVBQUcsRUFBRUEsUUFEUDtBQUVFLGVBQUcsRUFBQyxnQ0FGTjtBQUdFLGlCQUFLLEVBQUUsR0FIVDtBQUlFLGtCQUFNLEVBQUUsR0FKVjtBQUtFLG9CQUFRLEVBQUU7QUFMWjtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURNLGdCQVNOLDhEQUFDLHVDQUFEO0FBQ0UsZUFBRyxFQUFDLG9CQUROO0FBRUUsZUFBRyxFQUFDLE9BRk47QUFHRSxvQkFBUSxFQUFDLGdxR0FIWDtBQUlFLGlCQUFLLEVBQUUsR0FKVDtBQUtFLGtCQUFNLEVBQUU7QUFMVjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBWk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBeEJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFKRixlQXFERSw4REFBQyw2Q0FBRDtBQUFBLDhCQUNFO0FBQUEsK0JBQ0U7QUFBQSxxQkFDSSxJQURKLEVBRUdJLFVBRkg7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixFQU9HRyxXQUFXLGdCQUNWO0FBQUcsK0JBQXVCLEVBQUU7QUFBRXpELFVBQUFBLE1BQU0sRUFBRXlEO0FBQVY7QUFBNUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFEVSxHQUVSLElBVE47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQXJERjtBQUFBLGtCQURGO0FBbUVELENBekZEOztBQTJGQSxpRUFBZTVFLFVBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFFTyxNQUFNbkIsT0FBTyxHQUFHSSx1RUFBSDtBQUFBO0FBQUE7QUFBQSxrSUFLaEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFMWixFQVFoQixDQUFDO0FBQUVELEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQVJaLENBQWI7QUFZQSxNQUFNNEMsSUFBSSxHQUFHbEYsd0RBQU0sQ0FBQ21HLCtDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEsNkZBQVY7QUFXQSxNQUFNbkIsV0FBVyxHQUFHaEYsdUVBQUg7QUFBQTtBQUFBO0FBQUEsUUFBakI7QUFFQSxNQUFNaUYsVUFBVSxHQUFHakYsd0RBQU0sQ0FBQ21HLDBDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEsd0JBQWhCO0FBSUEsTUFBTXBCLFdBQVcsR0FBRy9FLHdEQUFNLENBQUNvRyxzQ0FBRCxDQUFUO0FBQUE7QUFBQTtBQUFBLHlJQVNwQixDQUFDO0FBQUVsRyxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhMmYsT0FUUixDQUFqQjtBQWVBLE1BQU12QixTQUFTLEdBQUc5RSx3REFBTSxDQUFDb0MsbURBQUQsQ0FBVDtBQUFBO0FBQUE7QUFBQSx5REFHbEIsQ0FBQztBQUFFbEMsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTRiLE1BSFYsRUFNbEIsQ0FBQztBQUFFcEMsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTJmLE9BTlYsQ0FBZjtBQVlBLE1BQU1sQixTQUFTLEdBQUduRix1RUFBSDtBQUFBO0FBQUE7QUFBQSxvTkFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzVEUDtBQUVBO0FBQ0E7OztBQUVBLE1BQU1hLFdBQXNDLEdBQUcsQ0FBQztBQUFFZixFQUFBQTtBQUFGLENBQUQsS0FBYztBQUMzRCxRQUFNO0FBQUV3RyxJQUFBQSxLQUFGO0FBQVNDLElBQUFBO0FBQVQsTUFBc0J6RyxJQUE1QjtBQUNBLFFBQU07QUFBRTBHLElBQUFBLGlCQUFGO0FBQXFCQyxJQUFBQSxjQUFyQjtBQUFxQ0MsSUFBQUEsVUFBckM7QUFBaURDLElBQUFBO0FBQWpELE1BQ0o3RyxJQUFJLENBQUNpRyxLQURQO0FBRUEsc0JBQ0UsOERBQUMsd0RBQUQ7QUFBQSwyQkFDRTtBQUFBLGlCQUNHTyxLQUFLLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQXdDLElBRGhELEVBRUdDLFFBQVEsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBRnhELEVBR0dDLGlCQUFpQixnQkFDaEIsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRGdCLEdBRWQsSUFMTixFQU1HQyxjQUFjLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQWlELElBTmxFLEVBT0dDLFVBQVUsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBNkMsSUFQMUQsRUFRR0MsY0FBYyxnQkFDYiw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQywwQkFBZDtBQUFxQixZQUFJLEVBQUVBO0FBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRGEsR0FFWCxJQVZOLEVBWUc3RyxJQUFJLENBQUN3RixJQUFMLEdBQ0N2WCxLQUFLLENBQUNDLE9BQU4sQ0FBYzhSLElBQUksQ0FBQ3dGLElBQW5CLElBQ0V4RixJQUFJLENBQUN3RixJQUFMLENBQVU1ckIsR0FBVixDQUFlK1EsQ0FBRCxpQkFDWiw4REFBQyw2Q0FBRDtBQUEwQixZQUFJLEVBQUVBLENBQUMsQ0FBQ21jLFFBQWxDO0FBQTRDLFlBQUksRUFBRW5jLENBQUMsQ0FBQ29jO0FBQXBELFNBQWNwYyxDQUFDLENBQUNtYyxRQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLENBREYsZ0JBS0UsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVVzQixRQUF6QjtBQUFtQyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVV1QjtBQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU5ILEdBUUcsSUFwQk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURGO0FBMEJELENBOUJEOztBQWdDQSxpRUFBZWhHLFdBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQ0E7QUFFQTtBQUNBOzs7QUFFQSxNQUFNQyxTQUFvQyxHQUFHLENBQUM7QUFBRWhCLEVBQUFBO0FBQUYsQ0FBRCxLQUFjO0FBQ3pELFFBQU07QUFBRXdHLElBQUFBLEtBQUY7QUFBU0MsSUFBQUEsUUFBVDtBQUFtQk8sSUFBQUE7QUFBbkIsTUFBMkJoSCxJQUFqQztBQUNBLFFBQU07QUFBRWlILElBQUFBLGVBQUY7QUFBbUJDLElBQUFBLFFBQW5CO0FBQTZCQyxJQUFBQTtBQUE3QixNQUFzRG5ILElBQUksQ0FBQ2lHLEtBQWpFO0FBQ0Esc0JBQ0UsOERBQUMsd0RBQUQ7QUFBQSwyQkFDRTtBQUFBLGlCQUNHTyxLQUFLLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQXdDLElBRGhELEVBRUdDLFFBQVEsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBRnhELEVBR0dPLEdBQUcsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBc0MsSUFINUMsRUFJR0MsZUFBZSxnQkFDZCw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQyxjQUFkO0FBQW1CLFlBQUksRUFBRUE7QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFEYyxHQUVaLElBTk4sRUFPR0MsUUFBUSxnQkFBRyw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQyxjQUFkO0FBQW1CLFlBQUksRUFBRUE7QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBSCxHQUEyQyxJQVB0RCxFQVFHQyxvQkFBb0IsZ0JBQ25CLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURtQixHQUVqQixJQVZOLEVBWUduSCxJQUFJLENBQUN3RixJQUFMLEdBQ0N2WCxLQUFLLENBQUNDLE9BQU4sQ0FBYzhSLElBQUksQ0FBQ3dGLElBQW5CLElBQ0V4RixJQUFJLENBQUN3RixJQUFMLENBQVU1ckIsR0FBVixDQUFlK1EsQ0FBRCxpQkFDWiw4REFBQyw2Q0FBRDtBQUEwQixZQUFJLEVBQUVBLENBQUMsQ0FBQ21jLFFBQWxDO0FBQTRDLFlBQUksRUFBRW5jLENBQUMsQ0FBQ29jO0FBQXBELFNBQWNwYyxDQUFDLENBQUNtYyxRQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLENBREYsZ0JBS0UsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVVzQixRQUF6QjtBQUFtQyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVV1QjtBQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU5ILEdBUUcsSUFwQk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURGO0FBMEJELENBN0JEOztBQStCQSxpRUFBZS9GLFNBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ0E7QUFFQTtBQUNBOzs7QUFFQSxNQUFNSyxRQUFtQyxHQUFHLENBQUM7QUFBRXJCLEVBQUFBO0FBQUYsQ0FBRCxLQUFjO0FBQ3hELFFBQU07QUFBRXdHLElBQUFBLEtBQUY7QUFBU0MsSUFBQUE7QUFBVCxNQUFzQnpHLElBQTVCO0FBQ0EsUUFBTTtBQUNKb0gsSUFBQUEsWUFESTtBQUVKQyxJQUFBQSxlQUZJO0FBR0pDLElBQUFBLFlBSEk7QUFJSkMsSUFBQUEsU0FKSTtBQUtKQyxJQUFBQTtBQUxJLE1BTUZ4SCxJQUFJLENBQUNpRyxLQU5UO0FBT0Esc0JBQ0UsOERBQUMsd0RBQUQ7QUFBQSwyQkFDRTtBQUFBLGlCQUNHTyxLQUFLLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQXdDLElBRGhELEVBRUdDLFFBQVEsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBRnhELEVBR0dlLGNBQWMsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBaUQsSUFIbEUsRUFJR0QsU0FBUyxnQkFBRyw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQyxjQUFkO0FBQW1CLFlBQUksRUFBRUE7QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBSCxHQUE0QyxJQUp4RCxFQUtHRixlQUFlLGdCQUNkLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURjLEdBRVosSUFQTixFQVFHRCxZQUFZLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQStDLElBUjlELEVBU0dFLFlBQVksZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQWlELElBVGhFLEVBV0d0SCxJQUFJLENBQUN3RixJQUFMLEdBQ0N2WCxLQUFLLENBQUNDLE9BQU4sQ0FBYzhSLElBQUksQ0FBQ3dGLElBQW5CLElBQ0V4RixJQUFJLENBQUN3RixJQUFMLENBQVU1ckIsR0FBVixDQUFlK1EsQ0FBRCxpQkFDWiw4REFBQyw2Q0FBRDtBQUEwQixZQUFJLEVBQUVBLENBQUMsQ0FBQ21jLFFBQWxDO0FBQTRDLFlBQUksRUFBRW5jLENBQUMsQ0FBQ29jO0FBQXBELFNBQWNwYyxDQUFDLENBQUNtYyxRQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLENBREYsZ0JBS0UsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVVzQixRQUF6QjtBQUFtQyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVV1QjtBQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU5ILEdBUUcsSUFuQk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURGO0FBeUJELENBbENEOztBQW9DQSxpRUFBZTFGLFFBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6Q0E7QUFFQTtBQUNBOzs7QUFFQSxNQUFNRCxRQUFtQyxHQUFHLENBQUM7QUFBRXBCLEVBQUFBO0FBQUYsQ0FBRCxLQUFjO0FBQ3hELFFBQU07QUFBRXdHLElBQUFBLEtBQUY7QUFBU0MsSUFBQUE7QUFBVCxNQUFzQnpHLElBQTVCO0FBQ0EsUUFBTTtBQUFFeUgsSUFBQUEsa0JBQUY7QUFBc0JDLElBQUFBLFNBQXRCO0FBQWlDQyxJQUFBQSxRQUFqQztBQUEyQ0MsSUFBQUE7QUFBM0MsTUFDSjVILElBQUksQ0FBQ2lHLEtBRFA7QUFFQSxzQkFDRSw4REFBQyx3REFBRDtBQUFBLDJCQUNFO0FBQUEsaUJBQ0dPLEtBQUssZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBd0MsSUFEaEQsRUFFR0MsUUFBUSxnQkFBRyw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQywwQkFBZDtBQUFxQixZQUFJLEVBQUVBO0FBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBNkMsSUFGeEQsRUFHR2dCLGtCQUFrQixnQkFDakIsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRGlCLEdBRWYsSUFMTixFQU1HQyxTQUFTLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTRDLElBTnhELEVBT0dFLGdCQUFnQixnQkFDZiw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQyxjQUFkO0FBQW1CLFlBQUksRUFBRUE7QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFEZSxHQUViLElBVE4sRUFVR0QsUUFBUSxnQkFBRyw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQywwQkFBZDtBQUFxQixZQUFJLEVBQUVBO0FBQTNCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBNkMsSUFWeEQsRUFZRzNILElBQUksQ0FBQ3dGLElBQUwsR0FDQ3ZYLEtBQUssQ0FBQ0MsT0FBTixDQUFjOFIsSUFBSSxDQUFDd0YsSUFBbkIsSUFDRXhGLElBQUksQ0FBQ3dGLElBQUwsQ0FBVTVyQixHQUFWLENBQWUrUSxDQUFELGlCQUNaLDhEQUFDLDZDQUFEO0FBQTBCLFlBQUksRUFBRUEsQ0FBQyxDQUFDbWMsUUFBbEM7QUFBNEMsWUFBSSxFQUFFbmMsQ0FBQyxDQUFDb2M7QUFBcEQsU0FBY3BjLENBQUMsQ0FBQ21jLFFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsQ0FERixnQkFLRSw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBRTlHLElBQUksQ0FBQ3dGLElBQUwsQ0FBVXNCLFFBQXpCO0FBQW1DLFlBQUksRUFBRTlHLElBQUksQ0FBQ3dGLElBQUwsQ0FBVXVCO0FBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBTkgsR0FRRyxJQXBCTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUEwQkQsQ0E5QkQ7O0FBZ0NBLGlFQUFlM0YsUUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JDQTtBQUVBO0FBQ0E7OztBQUVBLE1BQU1ELFNBQW9DLEdBQUcsQ0FBQztBQUFFbkIsRUFBQUE7QUFBRixDQUFELEtBQWM7QUFDekQsUUFBTTtBQUFFd0csSUFBQUEsS0FBRjtBQUFTQyxJQUFBQTtBQUFULE1BQXNCekcsSUFBNUI7QUFDQSxRQUFNO0FBQ0o2SCxJQUFBQSxrQkFESTtBQUVKQyxJQUFBQSxjQUZJO0FBR0pDLElBQUFBLFdBSEk7QUFJSkMsSUFBQUEsWUFKSTtBQUtKQyxJQUFBQSxnQkFMSTtBQU1KQyxJQUFBQTtBQU5JLE1BT0ZsSSxJQUFJLENBQUNpRyxLQVBUO0FBUUEsc0JBQ0UsOERBQUMsd0RBQUQ7QUFBQSwyQkFDRTtBQUFBLGlCQUNHTyxLQUFLLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQXdDLElBRGhELEVBRUdDLFFBQVEsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBRnhELEVBR0dvQixrQkFBa0IsZ0JBQ2pCLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURpQixHQUVmLElBTE4sRUFNR0MsY0FBYyxnQkFBRyw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBQyxjQUFkO0FBQW1CLFlBQUksRUFBRUE7QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBSCxHQUFpRCxJQU5sRSxFQU9HQyxXQUFXLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLG9CQUFkO0FBQW9CLFlBQUksRUFBRUE7QUFBMUI7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBSCxHQUErQyxJQVA3RCxFQVFHQyxZQUFZLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLDBCQUFkO0FBQXFCLFlBQUksRUFBRUE7QUFBM0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFBSCxHQUFpRCxJQVJoRSxFQVNHQyxnQkFBZ0IsZ0JBQ2YsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRGUsR0FFYixJQVhOLEVBWUdDLFlBQVksZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQUgsR0FBK0MsSUFaOUQsRUFjR2xJLElBQUksQ0FBQ3dGLElBQUwsR0FDQ3ZYLEtBQUssQ0FBQ0MsT0FBTixDQUFjOFIsSUFBSSxDQUFDd0YsSUFBbkIsSUFDRXhGLElBQUksQ0FBQ3dGLElBQUwsQ0FDRzd2QixNQURILENBQ1dnVixDQUFELElBQU9BLENBQUMsQ0FBQ21jLFFBRG5CLEVBRUdsdEIsR0FGSCxDQUVRK1EsQ0FBRCxpQkFDSCw4REFBQyw2Q0FBRDtBQUEwQixZQUFJLEVBQUVBLENBQUMsQ0FBQ21jLFFBQWxDO0FBQTRDLFlBQUksRUFBRW5jLENBQUMsQ0FBQ29jO0FBQXBELFNBQWNwYyxDQUFDLENBQUNtYyxRQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUhKLENBREYsZ0JBT0UsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVVzQixRQUF6QjtBQUFtQyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVV1QjtBQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVJILEdBVUcsSUF4Qk47QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURGO0FBOEJELENBeENEOztBQTBDQSxpRUFBZTVGLFNBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQ0E7QUFFQTtBQUNBOzs7QUFFQSxNQUFNRCxVQUFxQyxHQUFHLENBQUM7QUFBRWxCLEVBQUFBO0FBQUYsQ0FBRCxLQUFjO0FBQzFELFFBQU07QUFBRXdHLElBQUFBLEtBQUY7QUFBU0MsSUFBQUE7QUFBVCxNQUFzQnpHLElBQTVCO0FBQ0EsUUFBTTtBQUFFbUksSUFBQUEsaUJBQUY7QUFBcUJDLElBQUFBLFdBQXJCO0FBQWtDQyxJQUFBQTtBQUFsQyxNQUFxRHJJLElBQUksQ0FBQ2lHLEtBQWhFO0FBQ0Esc0JBQ0UsOERBQUMsd0RBQUQ7QUFBQSwyQkFDRTtBQUFBLGlCQUNHTyxLQUFLLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQXdDLElBRGhELEVBRUdDLFFBQVEsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBRnhELEVBR0cyQixXQUFXLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQThDLElBSDVELEVBSUdELGlCQUFpQixnQkFDaEIsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsY0FBZDtBQUFtQixZQUFJLEVBQUVBO0FBQXpCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRGdCLEdBRWQsSUFOTixFQU9HRSxjQUFjLGdCQUNiLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLDBCQUFkO0FBQXFCLFlBQUksRUFBRUE7QUFBM0I7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFEYSxHQUVYLElBVE4sRUFXR3JJLElBQUksQ0FBQ3dGLElBQUwsR0FDQ3ZYLEtBQUssQ0FBQ0MsT0FBTixDQUFjOFIsSUFBSSxDQUFDd0YsSUFBbkIsSUFDRXhGLElBQUksQ0FBQ3dGLElBQUwsQ0FBVTVyQixHQUFWLENBQWUrUSxDQUFELGlCQUNaLDhEQUFDLDZDQUFEO0FBQTBCLFlBQUksRUFBRUEsQ0FBQyxDQUFDbWMsUUFBbEM7QUFBNEMsWUFBSSxFQUFFbmMsQ0FBQyxDQUFDb2M7QUFBcEQsU0FBY3BjLENBQUMsQ0FBQ21jLFFBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsQ0FERixnQkFLRSw4REFBQyw2Q0FBRDtBQUFTLFlBQUksRUFBRTlHLElBQUksQ0FBQ3dGLElBQUwsQ0FBVXNCLFFBQXpCO0FBQW1DLFlBQUksRUFBRTlHLElBQUksQ0FBQ3dGLElBQUwsQ0FBVXVCO0FBQW5EO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBTkgsR0FRRyxJQW5CTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUF5QkQsQ0E1QkQ7O0FBOEJBLGlFQUFlN0YsVUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25DQTtBQUVBO0FBQ0E7OztBQUVBLE1BQU1KLFFBQW1DLEdBQUcsQ0FBQztBQUFFZCxFQUFBQTtBQUFGLENBQUQsS0FBYztBQUN4RCxRQUFNO0FBQUV3RyxJQUFBQSxLQUFGO0FBQVNDLElBQUFBO0FBQVQsTUFBc0J6RyxJQUE1QjtBQUNBLFFBQU07QUFBRXNJLElBQUFBLFVBQUY7QUFBY0MsSUFBQUE7QUFBZCxNQUEwQnZJLElBQUksQ0FBQ2lHLEtBQXJDO0FBQ0Esc0JBQ0UsOERBQUMsd0RBQUQ7QUFBQSwyQkFDRTtBQUFBLGlCQUNHTyxLQUFLLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQXdDLElBRGhELEVBRUdDLFFBQVEsZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBRnhELEVBR0c2QixVQUFVLGdCQUFHLDhEQUFDLDZDQUFEO0FBQVMsWUFBSSxFQUFDLGNBQWQ7QUFBbUIsWUFBSSxFQUFFQTtBQUF6QjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTZDLElBSDFELEVBSUdDLE9BQU8sZ0JBQUcsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUMsMEJBQWQ7QUFBcUIsWUFBSSxFQUFFQTtBQUEzQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUFILEdBQTRDLElBSnRELEVBTUd2SSxJQUFJLENBQUN3RixJQUFMLEdBQ0N2WCxLQUFLLENBQUNDLE9BQU4sQ0FBYzhSLElBQUksQ0FBQ3dGLElBQW5CLElBQ0V4RixJQUFJLENBQUN3RixJQUFMLENBQVU1ckIsR0FBVixDQUFlK1EsQ0FBRCxpQkFDWiw4REFBQyw2Q0FBRDtBQUEwQixZQUFJLEVBQUVBLENBQUMsQ0FBQ21jLFFBQWxDO0FBQTRDLFlBQUksRUFBRW5jLENBQUMsQ0FBQ29jO0FBQXBELFNBQWNwYyxDQUFDLENBQUNtYyxRQUFoQjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLENBREYsZ0JBS0UsOERBQUMsNkNBQUQ7QUFBUyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVVzQixRQUF6QjtBQUFtQyxZQUFJLEVBQUU5RyxJQUFJLENBQUN3RixJQUFMLENBQVV1QjtBQUFuRDtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQU5ILEdBUUcsSUFkTjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUFvQkQsQ0F2QkQ7O0FBeUJBLGlFQUFlakcsUUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBOzs7QUFRQSxNQUFNb0ksV0FBc0MsR0FBRyxDQUFDO0FBQUVsSixFQUFBQTtBQUFGLENBQUQsS0FBYztBQUMzRCxRQUFNLENBQUNtSixXQUFELEVBQWNDLG1CQUFkLEVBQW1DQyxjQUFuQyxJQUFxRFIsd0RBQVEsQ0FBQyxFQUFELENBQW5FO0FBQ0EsUUFBTTtBQUFFUyxJQUFBQTtBQUFGLE1BQVNYLHdEQUFXLENBQUUvUSxLQUFELElBQXNCQSxLQUFLLENBQUMyUixJQUE3QixDQUExQjtBQUNBLFFBQU1DLFFBQVEsR0FBR2Qsd0RBQVcsRUFBNUI7QUFFQSxRQUFNZSxTQUFTLEdBQUduSiw4Q0FBQSxDQUFrQixNQUFNO0FBQ3hDLFdBQU9zSSx1REFBQSxDQUFVO0FBQ2ZqSCxNQUFBQSxLQUFLLEVBQUUsV0FEUTtBQUVmdlcsTUFBQUEsSUFBSSxFQUFFLG9CQUZTO0FBR2Z1ZSxNQUFBQSxnQkFBZ0IsRUFBRSxJQUhIO0FBSWZDLE1BQUFBLGlCQUFpQixFQUFFLElBSko7QUFLZkMsTUFBQUEsZ0JBQWdCLEVBQUUsSUFMSDtBQU1mQyxNQUFBQSxJQUFJLEVBQUU7QUFOUyxLQUFWLEVBT0pydUIsSUFQSSxDQU9FOFgsTUFBRCxJQUFZO0FBQ2xCLFVBQUlBLE1BQU0sQ0FBQ3dXLFdBQVgsRUFBd0I7QUFDdEJob0IsUUFBQUEsdURBQUEsQ0FBWSxRQUFaO0FBQ0Q7QUFDRixLQVhNLENBQVA7QUFZRCxHQWJpQixFQWFmLEVBYmUsQ0FBbEI7QUFlQSxRQUFNaW9CLFFBQVEsR0FBRzFKLDhDQUFBLENBQWtCLE1BQU07QUFDdkMsUUFBSSxDQUFDNkksV0FBVyxDQUFDYyxJQUFaLEVBQUwsRUFBeUI7QUFDdkIsYUFBT3JCLHVEQUFBLENBQVU7QUFDZmpILFFBQUFBLEtBQUssRUFBRSxXQURRO0FBRWZtSSxRQUFBQSxJQUFJLEVBQUU7QUFGUyxPQUFWLENBQVA7QUFJRDs7QUFDRE4sSUFBQUEsUUFBUSxDQUNOVixxRUFBQSxDQUF3QjtBQUFFcUIsTUFBQUEsU0FBUyxFQUFFbkssSUFBSSxDQUFDbUssU0FBbEI7QUFBNkJoQixNQUFBQTtBQUE3QixLQUF4QixDQURNLENBQVI7QUFHQUUsSUFBQUEsY0FBYyxDQUFDLEVBQUQsQ0FBZDtBQUNELEdBWGdCLEVBV2QsQ0FBQ0YsV0FBRCxFQUFjSyxRQUFkLEVBQXdCeEosSUFBSSxDQUFDbUssU0FBN0IsRUFBd0NkLGNBQXhDLENBWGMsQ0FBakI7QUFhQSxzQkFDRSw4REFBQywrQ0FBRDtBQUFBLGNBQ0dDLEVBQUUsZ0JBQ0QsOERBQUMsc0NBQUQ7QUFBTSxjQUFRLEVBQUVVLFFBQWhCO0FBQUEsOEJBQ0UsOERBQUMsbURBQUQ7QUFBQSwrQkFDRSw4REFBQyw0Q0FBRDtBQUNFLGNBQUksRUFBRSxDQURSO0FBRUUsa0JBQVEsRUFBRVosbUJBRlo7QUFHRSxlQUFLLEVBQUVELFdBSFQ7QUFJRSxxQkFBVyxFQUFDO0FBSmQ7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsZUFTRSw4REFBQyxpREFBRDtBQUFBLCtCQUNFLDhEQUFDLHdDQUFEO0FBQVEsa0JBQVEsRUFBQyxRQUFqQjtBQUEwQixjQUFJLEVBQUMsU0FBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQVRGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFEQyxnQkFpQkQsOERBQUMsc0NBQUQ7QUFBTSxhQUFPLEVBQUVNLFNBQWY7QUFBQSw4QkFDRSw4REFBQyxtREFBRDtBQUFBLCtCQUNFLDhEQUFDLDRDQUFEO0FBQVUsY0FBSSxFQUFFLENBQWhCO0FBQW1CLHFCQUFXLEVBQUM7QUFBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBREYsZUFJRSw4REFBQyxpREFBRDtBQUFBLCtCQUNFLDhEQUFDLHdDQUFEO0FBQVEsa0JBQVEsRUFBQyxRQUFqQjtBQUEwQixjQUFJLEVBQUMsU0FBL0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUpGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQWxCSjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUFnQ0QsQ0FqRUQ7O0FBbUVBLGlFQUFlUCxXQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcEZBO0FBQ0E7QUFFTyxNQUFNSCxXQUFXLEdBQUc3SSx1RUFBSDtBQUFBO0FBQUE7QUFBQSxvREFFcEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFGUixDQUFqQjtBQVFBLE1BQU1FLGFBQWEsR0FBR0wsd0RBQU0sQ0FBQ3VJLDJDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEscUlBQW5CO0FBWUEsTUFBTVEsZUFBZSxHQUFHL0ksd0RBQU0sQ0FBQ3VJLDJDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEsMkJBQXJCO0FBR0EsTUFBTU8sUUFBUSxHQUFHOUksNEVBQUg7QUFBQTtBQUFBO0FBQUEsa0RBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFCUDtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBTUEsTUFBTU4sV0FBdUMsR0FBRyxDQUFDO0FBQUV4SixFQUFBQTtBQUFGLENBQUQsS0FBYztBQUM1RCxRQUFNLENBQUNxVSxRQUFELEVBQVdDLFlBQVgsSUFBMkJqSix5REFBUyxDQUFDLEtBQUQsQ0FBMUM7QUFDQSxRQUFNK0gsUUFBUSxHQUFHZCx3REFBVyxFQUE1QjtBQUVBLFFBQU1yaEIsRUFBRSxHQUFHc2hCLHdEQUFXLENBQ25CL1EsS0FBRCxJQUFzQkEsS0FBSyxDQUFDMlIsSUFBTixDQUFXRCxFQUFYLElBQWlCMVIsS0FBSyxDQUFDMlIsSUFBTixDQUFXRCxFQUFYLENBQWNqaUIsRUFEakMsQ0FBdEI7QUFJQSxRQUFNc2pCLGFBQWEsR0FBR3JLLDhDQUFBLENBQWtCLE1BQU07QUFDNUNzSSxJQUFBQSx1REFBQSxDQUFVO0FBQ1JqSCxNQUFBQSxLQUFLLEVBQUUsa0JBREM7QUFFUmdJLE1BQUFBLGdCQUFnQixFQUFFLElBRlY7QUFHUkMsTUFBQUEsaUJBQWlCLEVBQUUsSUFIWDtBQUlSQyxNQUFBQSxnQkFBZ0IsRUFBRTtBQUpWLEtBQVYsRUFLR3B1QixJQUxILENBS1M4WCxNQUFELElBQVk7QUFDbEIsVUFBSUEsTUFBTSxDQUFDd1csV0FBWCxFQUF3QjtBQUN0QlAsUUFBQUEsUUFBUSxDQUNOYyx3RUFBQSxDQUEyQjtBQUFFampCLFVBQUFBLEVBQUUsRUFBRStPLElBQUksQ0FBQy9PLEVBQVg7QUFBZThpQixVQUFBQSxTQUFTLEVBQUUvVCxJQUFJLENBQUN3VTtBQUEvQixTQUEzQixDQURNLENBQVI7QUFHRDtBQUNGLEtBWEQ7QUFZRCxHQWJxQixFQWFuQixDQUFDcEIsUUFBRCxFQUFXcFQsSUFBSSxDQUFDL08sRUFBaEIsRUFBb0IrTyxJQUFJLENBQUN3VSxTQUF6QixDQWJtQixDQUF0QjtBQWVBLHNCQUNFO0FBQUEsY0FDRyxDQUFDSCxRQUFELGdCQUNDLDhEQUFDLGdEQUFEO0FBQ0UsVUFBSSxFQUFFcGpCLEVBQUUsS0FBSytPLElBQUksQ0FBQ3lVLE1BQVosR0FBcUIsQ0FBckIsR0FBeUIsQ0FEakM7QUFFRSxhQUFPLEVBQUUsQ0FDUHhqQixFQUFFLEtBQUsrTyxJQUFJLENBQUN5VSxNQUFaLGdCQUNFO0FBQU0sZUFBTyxFQUFFSCxZQUFmO0FBQUE7QUFBQSxTQUFpQyxnQkFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixHQUlJLElBTEcsRUFNUHJqQixFQUFFLEtBQUsrTyxJQUFJLENBQUN5VSxNQUFaLGdCQUNFO0FBQU0sZUFBTyxFQUFFRixhQUFmO0FBQUE7QUFBQSxTQUFrQyxnQkFBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFERixHQUlJLElBVkcsQ0FGWDtBQWNFLFlBQU0sZUFBRTtBQUFBLGtCQUFJdlUsSUFBSSxDQUFDMFUsSUFBTCxDQUFVQztBQUFkO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZFY7QUFlRSxZQUFNLGVBQUUsOERBQUMsd0NBQUQ7QUFBQSxrQkFBUzNVLElBQUksQ0FBQzBVLElBQUwsQ0FBVUMsUUFBVixDQUFtQmpxQixLQUFuQixDQUF5QixDQUF6QixFQUE0QixDQUE1QjtBQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZlY7QUFnQkUsYUFBTyxlQUFFO0FBQUEsa0JBQUlzVixJQUFJLENBQUMvSztBQUFUO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBaEJYO0FBaUJFLGNBQVEsZUFDTjtBQUFBLGtCQUNHLElBQUl0RSxJQUFKLENBQVNxUCxJQUFJLENBQUM2SixTQUFkLEVBQXlCK0ssY0FBekIsQ0FBd0MsT0FBeEMsRUFBaUQ7QUFDaERDLFVBQUFBLFFBQVEsRUFBRTtBQURzQyxTQUFqRDtBQURIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFsQko7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFERCxnQkEyQkM7QUFBQSw2QkFDRSw4REFBQyw4Q0FBRDtBQUNFLFlBQUksRUFBRTdVLElBQUksQ0FBQy9LLE9BRGI7QUFFRSxVQUFFLEVBQUUrSyxJQUFJLENBQUMvTyxFQUZYO0FBR0Usa0JBQVUsRUFBRXFqQixZQUhkO0FBSUUsaUJBQVMsRUFBRXRVLElBQUksQ0FBQ3dVO0FBSmxCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQTVCSixtQkFERjtBQXdDRCxDQS9ERDs7QUFpRUEsaUVBQWVoTCxXQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDL0VBO0FBQ0E7QUFFTyxNQUFNMkssWUFBWSxHQUFHckssd0RBQU0sQ0FBQ2dMLHlDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEsZ0ZBRUY3bkIsS0FBRCxJQUFZQSxLQUFLLENBQUM4bkIsSUFBTixHQUFhLFNBQWIsR0FBeUIsTUFGbEMsQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7OztBQVNBLE1BQU1YLFFBQWlDLEdBQUcsQ0FBQztBQUN6Q3BmLEVBQUFBLElBRHlDO0FBRXpDL0QsRUFBQUEsRUFGeUM7QUFHekNpa0IsRUFBQUEsVUFIeUM7QUFJekNuQixFQUFBQTtBQUp5QyxDQUFELEtBS3BDO0FBQ0osUUFBTSxDQUFDeGUsS0FBRCxFQUFRNGYsYUFBUixJQUF5QjFDLHdEQUFRLENBQUN6ZCxJQUFELENBQXZDO0FBRUEsUUFBTW9lLFFBQVEsR0FBR2Qsd0RBQVcsRUFBNUI7QUFFQSxRQUFNO0FBQUU4QyxJQUFBQTtBQUFGLE1BQXlCN0Msd0RBQVcsQ0FDdkMvUSxLQUFELElBQXNCQSxLQUFLLENBQUM2VCxPQURZLENBQTFDO0FBSUF4bUIsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ2QsUUFBSXVtQixrQkFBSixFQUF3QjtBQUN0QkYsTUFBQUEsVUFBVTtBQUNYO0FBQ0YsR0FKUSxFQUlOLENBQUNFLGtCQUFELEVBQXFCRixVQUFyQixDQUpNLENBQVQ7QUFNQSxRQUFNdEIsUUFBUSxHQUFHMUosd0RBQUEsQ0FBa0IsTUFBTTtBQUN2QyxRQUFJLENBQUMzVSxLQUFLLENBQUNzZSxJQUFOLEVBQUwsRUFBbUI7QUFDakIsYUFBT3JCLHVEQUFBLENBQVU7QUFDZmpILFFBQUFBLEtBQUssRUFBRSxXQURRO0FBRWZtSSxRQUFBQSxJQUFJLEVBQUU7QUFGUyxPQUFWLENBQVA7QUFJRDs7QUFDRE4sSUFBQUEsUUFBUSxDQUFDNkIsd0VBQUEsQ0FBMkI7QUFBRWhrQixNQUFBQSxFQUFGO0FBQU1xa0IsTUFBQUEsV0FBVyxFQUFFL2YsS0FBbkI7QUFBMEJ3ZSxNQUFBQTtBQUExQixLQUEzQixDQUFELENBQVI7QUFDQW1CLElBQUFBLFVBQVU7QUFDWCxHQVRnQixFQVNkLENBQUMzZixLQUFELEVBQVF0RSxFQUFSLEVBQVltaUIsUUFBWixFQUFzQjhCLFVBQXRCLEVBQWtDbkIsU0FBbEMsQ0FUYyxDQUFqQjtBQVVBLHNCQUNFLDhEQUFDLDJEQUFEO0FBQUEsMkJBQ0UsOERBQUMsc0NBQUQ7QUFBTSxjQUFRLEVBQUVILFFBQWhCO0FBQUEsNkJBQ0UsOERBQUMsK0RBQUQ7QUFBQSxnQ0FDRSw4REFBQyx3REFBRDtBQUNFLGNBQUksRUFBRSxDQURSO0FBRUUsa0JBQVEsRUFBRXVCLGFBRlo7QUFHRSxlQUFLLEVBQUU1ZixLQUhUO0FBSUUscUJBQVcsRUFBQztBQUpkO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBREYsZUFPRSw4REFBQyxpREFBRDtBQUFBLGtDQUNFLDhEQUFDLHdDQUFEO0FBQVEsb0JBQVEsRUFBQyxRQUFqQjtBQUEwQixnQkFBSSxFQUFDLFNBQS9CO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLGVBSUUsOERBQUMsZ0RBQUQ7QUFBYyxtQkFBTyxFQUFFMmYsVUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBSkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQVBGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBREY7QUFvQkQsQ0FsREQ7O0FBb0RBLGlFQUFlZCxRQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JFQTtBQUNBO0FBRU8sTUFBTVksWUFBWSxHQUFHbEwsd0RBQU0sQ0FBQ3NJLHdDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEsMklBQWxCO0FBWUEsTUFBTWpJLGFBQWEsR0FBR0wsdUVBQUg7QUFBQTtBQUFBO0FBQUEsc0pBQW5COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNmUDtBQUNBO0FBQ0E7QUFXQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUVBLE1BQU13RSxNQUFnQixHQUFHLE1BQU07QUFDN0IsUUFBTSxDQUFDNEgsTUFBRCxFQUFTQyxlQUFULEVBQTBCQyxTQUExQixJQUF1Qy9LLHlEQUFTLENBQUMsS0FBRCxDQUF0RDtBQUNBLFFBQU07QUFBRTZILElBQUFBO0FBQUYsTUFBU1gsd0RBQVcsQ0FBRS9RLEtBQUQsSUFBc0JBLEtBQUssQ0FBQzJSLElBQTdCLENBQTFCO0FBQ0EsUUFBTUMsUUFBUSxHQUFHZCx3REFBVyxFQUE1QjtBQUNBLFFBQU0rRCxhQUFhLEdBQUduTSw4Q0FBQSxDQUFrQixNQUFNO0FBQzVDa0osSUFBQUEsUUFBUSxDQUFDMkMsOERBQUEsRUFBRCxDQUFSO0FBQ0FLLElBQUFBLFNBQVMsQ0FBQyxLQUFELENBQVQ7QUFDRCxHQUhxQixFQUduQixDQUFDaEQsUUFBRCxFQUFXZ0QsU0FBWCxDQUhtQixDQUF0QjtBQUtBLFFBQU1FLGNBQWMsR0FBR3BNLDhDQUFBLENBQWtCLE1BQU07QUFDN0NrTSxJQUFBQSxTQUFTLENBQUMsS0FBRCxDQUFUO0FBQ0QsR0FGc0IsRUFFcEIsQ0FBQ0EsU0FBRCxDQUZvQixDQUF2QjtBQUlBLHNCQUNFLCtEQUFDLDJDQUFEO0FBQUEsNEJBQ0UsK0RBQUMsaURBQUQ7QUFBQSw4QkFDRSwrREFBQyx3Q0FBRDtBQUFNLGVBQU8sRUFBRUUsY0FBZjtBQUFBLCtCQUNFLCtEQUFDLGtEQUFEO0FBQU0sY0FBSSxFQUFDLEdBQVg7QUFBQSxpQ0FDRTtBQUFBLG1DQUNFLCtEQUFDLG1EQUFEO0FBQ0UsaUJBQUcsRUFBQyxXQUROO0FBRUUsbUJBQUssRUFBRSxHQUZUO0FBR0Usb0JBQU0sRUFBRSxFQUhWO0FBSUUsaUJBQUcsRUFBQywwQkFKTjtBQUtFLHNCQUFRLEVBQUU7QUFMWjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLGVBZUUsK0RBQUMsNENBQUQ7QUFBVSxjQUFNLEVBQUVKLE1BQWxCO0FBQTBCLGVBQU8sRUFBRUMsZUFBbkM7QUFBQSwrQkFDRTtBQUFBLGtDQUNFLCtEQUFDLDJEQUFEO0FBQVUsaUJBQUssRUFBQyxvQkFBaEI7QUFBc0IseUJBQWEsRUFBRTtBQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQURGLGVBRUUsK0RBQUMsMkRBQUQ7QUFBVSxpQkFBSyxFQUFDLDBCQUFoQjtBQUF1Qix5QkFBYSxFQUFFO0FBQXRDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBRkYsZUFHRSwrREFBQywyREFBRDtBQUFVLGlCQUFLLEVBQUMsY0FBaEI7QUFBcUIseUJBQWEsRUFBRTtBQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUhGLGVBSUUsK0RBQUMsMkRBQUQ7QUFBVSxpQkFBSyxFQUFDLGNBQWhCO0FBQXFCLHlCQUFhLEVBQUU7QUFBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFKRixlQUtFLCtEQUFDLDJEQUFEO0FBQVUsaUJBQUssRUFBQyxvQkFBaEI7QUFBc0IseUJBQWEsRUFBRTtBQUFyQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQUxGLGVBTUUsK0RBQUMsMkRBQUQ7QUFBVSxpQkFBSyxFQUFDLGNBQWhCO0FBQXFCLHlCQUFhLEVBQUU7QUFBcEM7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFORixlQU9FLCtEQUFDLDJEQUFEO0FBQVUsaUJBQUssRUFBQyxjQUFoQjtBQUFxQix5QkFBYSxFQUFFO0FBQXBDO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBUEYsZUFRRSwrREFBQywyREFBRDtBQUFVLGlCQUFLLEVBQUMsY0FBaEI7QUFBcUIseUJBQWEsRUFBRTtBQUFwQztBQUFBO0FBQUE7QUFBQTtBQUFBLHVCQVJGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBZkYsZUE0QkUsK0RBQUMsMENBQUQ7QUFBQSwrQkFDRSwrREFBQyxnREFBRDtBQUFZLGVBQUssRUFBQztBQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkE1QkYsZUFnQ0UsK0RBQUMsMkNBQUQ7QUFBUyxjQUFNLEVBQUVELE1BQWpCO0FBQUEsa0JBQ0doRCxFQUFFLGdCQUNEO0FBQUEsaUNBQ0UsK0RBQUMsZ0RBQUQ7QUFBYyxtQkFBTyxFQUFFbUQsYUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERix5QkFEQyxnQkFLRDtBQUFBLGlDQUNFLCtEQUFDLGtEQUFEO0FBQU0sZ0JBQUksRUFBQyxRQUFYO0FBQUEsbUNBQ0U7QUFBRyxxQkFBTyxFQUFFQyxjQUFaO0FBQUEscUNBQ0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBTko7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFoQ0YsZUErQ0UsK0RBQUMsaURBQUQ7QUFBQSwrQkFDRSwrREFBQywyREFBRDtBQUFjLGlCQUFPLEVBQUVIO0FBQXZCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQS9DRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBREYsZUFvREUsK0RBQUMsZ0RBQUQ7QUFBYyxhQUFPLEVBQUVHLGNBQXZCO0FBQUEsNkJBQ0UsK0RBQUMsZ0RBQUQ7QUFBWSxhQUFLLEVBQUM7QUFBbEI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEsaUJBcERGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQURGO0FBMERELENBdkVEOztBQXlFQSxpRUFBZWhJLE1BQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkE7QUFFTyxNQUFNNUUsT0FBTyxHQUFHSSx1RUFBSDtBQUFBO0FBQUE7QUFBQSxzREFBYjtBQU9BLE1BQU15TCxhQUFhLEdBQUd6TCx1RUFBSDtBQUFBO0FBQUE7QUFBQSx3TEFPdEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNGIsTUFQTixDQUFuQjtBQWNBLE1BQU13SixZQUFZLEdBQUc5TCx1RUFBSDtBQUFBO0FBQUE7QUFBQSxrUEFHckIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFIUCxFQW9CckIsQ0FBQztBQUFFRCxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhMmYsT0FwQlAsQ0FBbEI7QUF3QkEsTUFBTXFGLElBQUksR0FBRzFMLHVFQUFIO0FBQUE7QUFBQTtBQUFBLGlIQU1iLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BTmYsRUFTYixDQUFDO0FBQUVELEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQVRmLENBQVY7QUFnQkEsTUFBTXVKLFFBQVEsR0FBRzdMLHVFQUFIO0FBQUE7QUFBQTtBQUFBLHVWQWNqQixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQWRYLEVBZUxuZixLQUFELElBQVlBLEtBQUssQ0FBQ2lwQixNQUFOLEdBQWUsT0FBZixHQUF5QixNQWYvQixDQUFkO0FBcUNBLE1BQU1ULE1BQU0sR0FBRzNMLHVFQUFIO0FBQUE7QUFBQTtBQUFBLHVFQUtmLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BTGIsQ0FBWjtBQVVBLE1BQU15TCxPQUFPLEdBQUc1TCx1RUFBSDtBQUFBO0FBQUE7QUFBQSxvYkFlaEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNGIsTUFmWixFQWdCSm5mLEtBQUQsSUFBWUEsS0FBSyxDQUFDaXBCLE1BQU4sR0FBZSxNQUFmLEdBQXdCLE1BaEIvQixDQUFiO0FBb0NBLE1BQU1MLGFBQWEsR0FBRy9MLHVFQUFIO0FBQUE7QUFBQTtBQUFBLCtGQUV0QixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQUZOLENBQW5CO0FBV0EsTUFBTTBKLFlBQVksR0FBR2hNLDBFQUFIO0FBQUE7QUFBQTtBQUFBLGlXQVVyQixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWE0YixNQVZQLENBQWxCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdKUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBTUEsTUFBTTRKLFVBQWlDLEdBQUcsQ0FBQztBQUFFWSxFQUFBQTtBQUFGLENBQUQsS0FBZTtBQUN2RCxRQUFNLENBQUNwVCxNQUFELEVBQVNxVCxjQUFULElBQTJCcEUsd0RBQVEsQ0FBQyxFQUFELENBQXpDO0FBQ0EsUUFBTTltQixNQUFNLEdBQUdxQyxzREFBUyxFQUF4QjtBQUNBLFFBQU04b0IsUUFBUSxHQUFHbm9CLGtEQUFXLENBQ3pCakMsQ0FBRCxJQUF3QjtBQUN0QkEsSUFBQUEsQ0FBQyxDQUFDSyxjQUFGO0FBQ0FwQixJQUFBQSxNQUFNLENBQUMzSSxJQUFQLENBQ0U7QUFDRXlZLE1BQUFBLFFBQVEsRUFBRSxTQURaO0FBRUVZLE1BQUFBLEtBQUssRUFBRTtBQUFFbUgsUUFBQUEsTUFBTSxFQUFFQSxNQUFWO0FBQWtCdVQsUUFBQUEsTUFBTSxFQUFFO0FBQTFCO0FBRlQsS0FERixFQUtHLGtCQUFpQnZULE1BQU8sRUFMM0I7QUFPRCxHQVZ5QixFQVcxQixDQUFDN1gsTUFBRCxFQUFTNlgsTUFBVCxDQVgwQixDQUE1QjtBQWFBLHNCQUNFO0FBQUEsMkJBQ0U7QUFBTSxjQUFRLEVBQUVzVCxRQUFoQjtBQUFBLDZCQUNFLDhEQUFDLGlEQUFEO0FBQUEsZ0NBQ0U7QUFBTyxpQkFBTyxFQUFHLEdBQUVGLEtBQU07QUFBekI7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFERixlQUVFLDhEQUFDLHlDQUFEO0FBQ0UsY0FBSSxFQUFDLE1BRFA7QUFFRSxZQUFFLEVBQUcsR0FBRUEsS0FBTSxTQUZmO0FBR0UsZUFBSyxFQUFFcFQsTUFIVDtBQUlFLGtCQUFRLEVBQUVxVDtBQUpaO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRkYsZUFRRSw4REFBQyxnREFBRDtBQUFjLGNBQUksRUFBQyxRQUFuQjtBQUFBLGlDQUNFLDhEQUFDLDZEQUFEO0FBQWdCLGlCQUFLLEVBQUU7QUFBRUcsY0FBQUEsS0FBSyxFQUFFO0FBQVQ7QUFBdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBUkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQURGLG1CQURGO0FBa0JELENBbENEOztBQW9DQSxpRUFBZWhCLFVBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5Q0E7QUFFTyxNQUFNUSxLQUFLLEdBQUcxTSx5RUFBSDtBQUFBO0FBQUE7QUFBQSxrUUFjZCxDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQWRkLEVBZ0JkLENBQUM7QUFBRUQsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTRiLE1BaEJkLEVBa0JkLENBQUM7QUFBRXBDLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWEyZixPQWxCZCxDQUFYO0FBc0JBLE1BQU1zRyxZQUFZLEdBQUczTSwwRUFBSDtBQUFBO0FBQUE7QUFBQSwySEFBbEI7QUFVQSxNQUFNNE0sYUFBYSxHQUFHNU0sdUVBQUg7QUFBQTtBQUFBO0FBQUEsZ0pBVXRCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BVk4sRUFhdEIsQ0FBQztBQUFFRCxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNGIsTUFiTixFQWV0QixDQUFDO0FBQUVwQyxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhMmYsT0FmTixDQUFuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQlA7QUFFTyxNQUFNK0csbUJBQW1CLEdBQUcscUJBQTVCO0FBQ0EsTUFBTUMsbUJBQW1CLEdBQUcscUJBQTVCO0FBQ0EsTUFBTUMsbUJBQW1CLEdBQUcscUJBQTVCO0FBRUEsTUFBTUMsb0JBQW9CLEdBQUcsc0JBQTdCO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUcsc0JBQTdCO0FBQ0EsTUFBTUMsb0JBQW9CLEdBQUcsc0JBQTdCO0FBRUEsTUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9CO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9CO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9CO0FBRUEsTUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9CO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9CO0FBQ0EsTUFBTUMsc0JBQXNCLEdBQUcsd0JBQS9CO0FBRUEsTUFBTW5GLGVBQWUsR0FBR3VFLG1FQUFpQixDQUM5Q0MsbUJBRDhDLEVBRTlDQyxtQkFGOEMsRUFHOUNDLG1CQUg4QyxDQUFqQixFQUF4QjtBQU1BLE1BQU1VLGdCQUFnQixHQUFHYixtRUFBaUIsQ0FDL0NJLG9CQUQrQyxFQUUvQ0Msb0JBRitDLEVBRy9DQyxvQkFIK0MsQ0FBakIsRUFBekI7QUFNQSxNQUFNckQsa0JBQWtCLEdBQUcrQyxtRUFBaUIsQ0FDakRPLHNCQURpRCxFQUVqREMsc0JBRmlELEVBR2pEQyxzQkFIaUQsQ0FBakIsRUFBM0I7QUFNQSxNQUFNekMsa0JBQWtCLEdBQUdnQyxtRUFBaUIsQ0FDakRVLHNCQURpRCxFQUVqREMsc0JBRmlELEVBR2pEQyxzQkFIaUQsQ0FBakIsRUFBM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNEQTtBQUNBO0FBY0E7QUFDQSxNQUFNSSxZQUEwQixHQUFHO0FBQ2pDQyxFQUFBQSxXQUFXLEVBQUUsRUFEb0I7QUFFakNDLEVBQUFBLFlBQVksRUFBRSxLQUZtQjtBQUdqQ0MsRUFBQUEsZUFBZSxFQUFFLEtBSGdCO0FBSWpDQyxFQUFBQSxZQUFZLEVBQUUsRUFKbUI7QUFLakNqRCxFQUFBQSxrQkFBa0IsRUFBRTtBQUxhLENBQW5DO0FBVUEsTUFBTUMsT0FBTyxHQUFHMkMsK0RBQWEsQ0FBQ0MsWUFBRCxFQUFlO0FBQzFDLEdBQUNmLHdEQUFELEdBQXdCMVYsS0FBRCxJQUNyQnVXLDhDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ0YsZUFBTixHQUF3QixJQUF4QjtBQUNBRSxJQUFBQSxLQUFLLENBQUNELFlBQU4sR0FBcUIsRUFBckI7QUFDRCxHQUhNLENBRmlDO0FBTTFDLEdBQUNsQix3REFBRCxHQUF1QixDQUFDM1YsS0FBRCxFQUFRK1csTUFBUixLQUNyQlIsOENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDRixlQUFOLEdBQXdCLEtBQXhCO0FBQ0FFLElBQUFBLEtBQUssQ0FBQ0osV0FBTixHQUFvQkssTUFBTSxDQUFDQyxPQUEzQjtBQUNELEdBSE0sQ0FQaUM7QUFXMUMsR0FBQ3BCLHdEQUFELEdBQXVCLENBQUM1VixLQUFELEVBQVErVyxNQUFSLEtBQ3JCUiw4Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUNGLGVBQU4sR0FBd0IsS0FBeEI7QUFDQUUsSUFBQUEsS0FBSyxDQUFDRCxZQUFOLEdBQXFCRSxNQUFNLENBQUNDLE9BQTVCO0FBQ0QsR0FITSxDQVppQztBQWdCMUMsR0FBQ25CLHlEQUFELEdBQXlCN1YsS0FBRCxJQUN0QnVXLDhDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ0osV0FBTixHQUFvQixFQUFwQjtBQUNELEdBRk0sQ0FqQmlDO0FBb0IxQyxHQUFDWix5REFBRCxHQUF3QixDQUFDOVYsS0FBRCxFQUFRK1csTUFBUixLQUN0QlIsOENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDSixXQUFOLEdBQW9CSyxNQUFNLENBQUNDLE9BQTNCO0FBQ0QsR0FGTSxDQXJCaUM7QUF3QjFDLEdBQUNqQix5REFBRCxHQUF5Qi9WLEtBQUQsSUFDdEJ1Vyw4Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUNKLFdBQU4sR0FBb0IsRUFBcEI7QUFDRCxHQUZNLENBekJpQztBQTRCMUMsR0FBQ1YsMkRBQUQsR0FBMkJoVyxLQUFELElBQ3hCdVcsOENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDRCxZQUFOLEdBQXFCLEVBQXJCO0FBQ0QsR0FGTSxDQTdCaUM7QUFnQzFDLEdBQUNaLDJEQUFELEdBQTBCLENBQUNqVyxLQUFELEVBQVErVyxNQUFSLEtBQ3hCUiw4Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUNKLFdBQU4sR0FBb0JLLE1BQU0sQ0FBQ0MsT0FBM0I7QUFDRCxHQUZNLENBakNpQztBQW9DMUMsR0FBQ2QsMkRBQUQsR0FBMEIsQ0FBQ2xXLEtBQUQsRUFBUStXLE1BQVIsS0FDeEJSLDhDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ0QsWUFBTixHQUFxQkUsTUFBTSxDQUFDQyxPQUE1QjtBQUNELEdBRk0sQ0FyQ2lDO0FBd0MxQyxHQUFDYiwyREFBRCxHQUEyQm5XLEtBQUQsSUFDeEJ1Vyw4Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUNsRCxrQkFBTixHQUEyQixLQUEzQjtBQUNELEdBRk0sQ0F6Q2lDO0FBNEMxQyxHQUFDd0MsMkRBQUQsR0FBMEIsQ0FBQ3BXLEtBQUQsRUFBUStXLE1BQVIsS0FDeEJSLDhDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ0osV0FBTixHQUFvQkssTUFBTSxDQUFDQyxPQUEzQjtBQUNBRixJQUFBQSxLQUFLLENBQUNsRCxrQkFBTixHQUEyQixLQUEzQjtBQUNELEdBSE0sQ0E3Q2lDO0FBaUQxQyxHQUFDeUMsMkRBQUQsR0FBMkJyVyxLQUFELElBQ3hCdVcsOENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDbEQsa0JBQU4sR0FBMkIsSUFBM0I7QUFDRCxHQUZNO0FBbERpQyxDQUFmLENBQTdCO0FBdURBLGlFQUFlQyxPQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzRUE7QUFDQTtDQVFBOztBQUNBLFNBQVN3RCxhQUFULENBQXVCO0FBQUU5RSxFQUFBQSxTQUFGO0FBQWFoQixFQUFBQTtBQUFiLENBQXZCLEVBQXNFO0FBQ3BFLFNBQU8wRixpREFBQSxDQUFZLFlBQVcxRSxTQUFVLEVBQWpDLEVBQW9DO0FBQUU5ZSxJQUFBQSxPQUFPLEVBQUU4ZDtBQUFYLEdBQXBDLENBQVA7QUFDRDs7QUFDRCxVQUFVZ0csY0FBVixDQUF5QlIsTUFBekIsRUFBNkU7QUFDM0UsTUFBSTtBQUNGLFVBQU1wYixNQUEyQixHQUFHLE1BQU1qZCx3REFBSSxDQUM1QzI0QixhQUQ0QyxFQUU1Q04sTUFBTSxDQUFDQyxPQUZxQyxDQUE5QztBQUlBLFVBQU1HLHVEQUFHLENBQUNqRyw0REFBQSxDQUF3QnZWLE1BQU0sQ0FBQzZDLElBQS9CLENBQUQsQ0FBVDtBQUNELEdBTkQsQ0FNRSxPQUFPdFQsQ0FBUCxFQUFlO0FBQ2YsVUFBTWlzQix1REFBRyxDQUFDakcsNERBQUEsQ0FBd0JobUIsQ0FBQyxDQUFDd3NCLFFBQUYsQ0FBV2xaLElBQW5DLENBQUQsQ0FBVDtBQUNEO0FBQ0Y7O0FBQ00sVUFBVW1aLGVBQVYsR0FBNEI7QUFDakMsUUFBTVQsOERBQVUsQ0FBQ2hHLDREQUFELEVBQTBCcUcsY0FBMUIsQ0FBaEI7QUFDRCxFQUVEOztBQUNBLFNBQVNLLGVBQVQsQ0FBeUI7QUFBRTVFLEVBQUFBO0FBQUYsQ0FBekIsRUFBNEQ7QUFDMUQsU0FBT2lFLGdEQUFBLENBQVcsWUFBV2pFLFNBQVUsRUFBaEMsQ0FBUDtBQUNEOztBQUNELFVBQVU2RSxnQkFBVixDQUNFZCxNQURGLEVBRUU7QUFDQSxNQUFJO0FBQ0YsVUFBTXBiLE1BQTJCLEdBQUcsTUFBTWpkLHdEQUFJLENBQzVDazVCLGVBRDRDLEVBRTVDYixNQUFNLENBQUNDLE9BRnFDLENBQTlDO0FBSUEsVUFBTUcsdURBQUcsQ0FBQ2IsNkRBQUEsQ0FBeUIzYSxNQUFNLENBQUM2QyxJQUFoQyxDQUFELENBQVQ7QUFDRCxHQU5ELENBTUUsT0FBT3RULENBQVAsRUFBZTtBQUNmLFVBQU1pc0IsdURBQUcsQ0FBQ2IsNkRBQUEsQ0FBeUJwckIsQ0FBQyxDQUFDd3NCLFFBQUYsQ0FBV2xaLElBQXBDLENBQUQsQ0FBVDtBQUNEO0FBQ0Y7O0FBQ00sVUFBVXNaLGlCQUFWLEdBQThCO0FBQ25DLFFBQU1aLDhEQUFVLENBQUNaLDZEQUFELEVBQTJCdUIsZ0JBQTNCLENBQWhCO0FBQ0QsRUFFRDs7QUFDQSxTQUFTRSxnQkFBVCxDQUEwQjtBQUFFdG9CLEVBQUFBLEVBQUY7QUFBTThpQixFQUFBQTtBQUFOLENBQTFCLEVBQW1FO0FBQ2pFLFNBQU8wRSxtREFBQSxDQUFjLFlBQVd4bkIsRUFBRyxJQUFHOGlCLFNBQVUsRUFBekMsQ0FBUDtBQUNEOztBQUVELFVBQVV5RixpQkFBVixDQUNFakIsTUFERixFQUVFO0FBQ0EsTUFBSTtBQUNGLFVBQU1wYixNQUEyQixHQUFHLE1BQU1qZCx3REFBSSxDQUM1Q3E1QixnQkFENEMsRUFFNUNoQixNQUFNLENBQUNDLE9BRnFDLENBQTlDO0FBSUEsVUFBTUcsdURBQUcsQ0FBQ3pFLCtEQUFBLENBQTJCL1csTUFBTSxDQUFDNkMsSUFBbEMsQ0FBRCxDQUFUO0FBQ0QsR0FORCxDQU1FLE9BQU90VCxDQUFQLEVBQWU7QUFDZixVQUFNaXNCLHVEQUFHLENBQUN6RSwrREFBQSxDQUEyQnhuQixDQUFDLENBQUN3c0IsUUFBRixDQUFXbFosSUFBdEMsQ0FBRCxDQUFUO0FBQ0Q7QUFDRjs7QUFFTSxVQUFVeVosa0JBQVYsR0FBK0I7QUFDcEMsUUFBTWYsOERBQVUsQ0FBQ3hFLCtEQUFELEVBQTZCc0YsaUJBQTdCLENBQWhCO0FBQ0QsRUFFRDs7QUFDQSxTQUFTRSxnQkFBVCxDQUEwQjtBQUN4QnpvQixFQUFBQSxFQUR3QjtBQUV4QnFrQixFQUFBQSxXQUZ3QjtBQUd4QnZCLEVBQUFBO0FBSHdCLENBQTFCLEVBSXlCO0FBQ3ZCLFNBQU8wRSxnREFBQSxDQUFXLFlBQVd4bkIsRUFBRyxJQUFHOGlCLFNBQVUsRUFBdEMsRUFBeUM7QUFBRTllLElBQUFBLE9BQU8sRUFBRXFnQjtBQUFYLEdBQXpDLENBQVA7QUFDRDs7QUFFRCxVQUFVcUUsaUJBQVYsQ0FDRXBCLE1BREYsRUFFRTtBQUNBLE1BQUk7QUFDRixVQUFNcGIsTUFBMkIsR0FBRyxNQUFNamQsd0RBQUksQ0FDNUN3NUIsZ0JBRDRDLEVBRTVDbkIsTUFBTSxDQUFDQyxPQUZxQyxDQUE5QztBQUlBLFVBQU1HLHVEQUFHLENBQUMxRCwrREFBQSxDQUEyQjlYLE1BQU0sQ0FBQzZDLElBQWxDLENBQUQsQ0FBVDtBQUNELEdBTkQsQ0FNRSxPQUFPdFQsQ0FBUCxFQUFlO0FBQ2YsVUFBTWlzQix1REFBRyxDQUFDMUQsK0RBQUEsQ0FBMkJ2b0IsQ0FBQyxDQUFDd3NCLFFBQUYsQ0FBV2xaLElBQXRDLENBQUQsQ0FBVDtBQUNEO0FBQ0Y7O0FBRU0sVUFBVTRaLGtCQUFWLEdBQStCO0FBQ3BDLFFBQU1sQiw4REFBVSxDQUFDekQsK0RBQUQsRUFBNkIwRSxpQkFBN0IsQ0FBaEI7QUFDRDtBQUVjLFVBQVVFLFdBQVYsR0FBd0I7QUFDckMsUUFBTTl5Qix1REFBRyxDQUFDLENBQ1I2eEIsd0RBQUksQ0FBQ08sZUFBRCxDQURJLEVBRVJQLHdEQUFJLENBQUNVLGlCQUFELENBRkksRUFHUlYsd0RBQUksQ0FBQ2Esa0JBQUQsQ0FISSxFQUlSYix3REFBSSxDQUFDZ0Isa0JBQUQsQ0FKSSxDQUFELENBQVQ7QUFNRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2R0Q7QUFFTyxNQUFNRSxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFFQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFFQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFDQSxNQUFNQyxtQkFBbUIsR0FBRyxxQkFBNUI7QUFFQSxNQUFNQyxnQkFBZ0IsR0FBRyxrQkFBekI7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBRyxrQkFBekI7QUFDQSxNQUFNQyxnQkFBZ0IsR0FBRyxrQkFBekI7QUFFQSxNQUFNQyxRQUFRLEdBQUd6RCxtRUFBaUIsQ0FDdkNzRCxnQkFEdUMsRUFFdkNDLGdCQUZ1QyxFQUd2Q0MsZ0JBSHVDLENBQWpCLEVBQWpCO0FBTUEsTUFBTUUsV0FBVyxHQUFHMUQsbUVBQWlCLENBQzFDZ0QsbUJBRDBDLEVBRTFDQyxtQkFGMEMsRUFHMUNDLG1CQUgwQyxDQUFqQixFQUFwQjtBQU1BLE1BQU1TLFdBQVcsR0FBRzNELG1FQUFpQixDQUMxQzZDLG1CQUQwQyxFQUUxQ0MsbUJBRjBDLEVBRzFDQyxtQkFIMEMsQ0FBakIsRUFBcEI7QUFNQSxNQUFNYSxXQUFXLEdBQUc1RCxtRUFBaUIsQ0FDMUNtRCxtQkFEMEMsRUFFMUNDLG1CQUYwQyxFQUcxQ0MsbUJBSDBDLENBQWpCLEVBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFDQTtBQWNBO0FBR0EsTUFBTXJDLFlBQXlCLEdBQUc7QUFDaEM2QyxFQUFBQSxZQUFZLEVBQUU7QUFDWnQwQixJQUFBQSxPQUFPLEVBQUUsS0FERztBQUVad1osSUFBQUEsSUFBSSxFQUFFO0FBQ0orYSxNQUFBQSxLQUFLLEVBQUUsRUFESDtBQUVKQyxNQUFBQSxTQUFTLEVBQUUsRUFGUDtBQUdKakUsTUFBQUEsTUFBTSxFQUFFLENBSEo7QUFJSmtFLE1BQUFBLFVBQVUsRUFBRSxDQUpSO0FBS0p6WCxNQUFBQSxNQUFNLEVBQUU7QUFMSixLQUZNO0FBU1pwWSxJQUFBQSxLQUFLLEVBQUU7QUFUSyxHQURrQjtBQVloQzh2QixFQUFBQSxZQUFZLEVBQUU7QUFDWjEwQixJQUFBQSxPQUFPLEVBQUUsS0FERztBQUVad1osSUFBQUEsSUFBSSxFQUFFO0FBQ0orYSxNQUFBQSxLQUFLLEVBQUU7QUFBRW5SLFFBQUFBLElBQUksRUFBRTtBQUFSLE9BREg7QUFFSm9SLE1BQUFBLFNBQVMsRUFBRSxFQUZQO0FBR0pqRSxNQUFBQSxNQUFNLEVBQUUsQ0FISjtBQUlKa0UsTUFBQUEsVUFBVSxFQUFFO0FBSlIsS0FGTTtBQVFaN3ZCLElBQUFBLEtBQUssRUFBRTtBQVJLLEdBWmtCO0FBc0JoQyt2QixFQUFBQSxPQUFPLEVBQUU7QUFDUDMwQixJQUFBQSxPQUFPLEVBQUUsS0FERjtBQUVQd1osSUFBQUEsSUFBSSxFQUFFO0FBQ0orYSxNQUFBQSxLQUFLLEVBQUU7QUFDTG5SLFFBQUFBLElBQUksRUFBRSxFQUREO0FBRUx3UixRQUFBQSxRQUFRLEVBQUUsRUFGTDtBQUdMQyxRQUFBQSxLQUFLLEVBQUU7QUFIRixPQURIO0FBTUpMLE1BQUFBLFNBQVMsRUFBRSxFQU5QO0FBT0pqRSxNQUFBQSxNQUFNLEVBQUUsQ0FQSjtBQVFKa0UsTUFBQUEsVUFBVSxFQUFFO0FBUlIsS0FGQztBQVlQN3ZCLElBQUFBLEtBQUssRUFBRTtBQVpBLEdBdEJ1QjtBQW9DaENrd0IsRUFBQUEsWUFBWSxFQUFFO0FBQ1o5MEIsSUFBQUEsT0FBTyxFQUFFLEtBREc7QUFFWndaLElBQUFBLElBQUksRUFBRTtBQUNKK2EsTUFBQUEsS0FBSyxFQUFFO0FBQUVuUixRQUFBQSxJQUFJLEVBQUU7QUFBUixPQURIO0FBRUpvUixNQUFBQSxTQUFTLEVBQUUsRUFGUDtBQUdKakUsTUFBQUEsTUFBTSxFQUFFLENBSEo7QUFJSmtFLE1BQUFBLFVBQVUsRUFBRTtBQUpSLEtBRk07QUFRWjd2QixJQUFBQSxLQUFLLEVBQUU7QUFSSztBQXBDa0IsQ0FBbEM7QUFrREEsTUFBTW13QixNQUFNLEdBQUd2RCwrREFBYSxDQUE0QkMsWUFBNUIsRUFBMEM7QUFDcEUsR0FBQ2dDLHdEQUFELEdBQXdCelksS0FBRCxJQUNyQnVXLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ3dDLFlBQU4sQ0FBbUJ0MEIsT0FBbkIsR0FBNkIsSUFBN0I7QUFDQTh4QixJQUFBQSxLQUFLLENBQUN3QyxZQUFOLENBQW1CMXZCLEtBQW5CLEdBQTJCLElBQTNCO0FBQ0FrdEIsSUFBQUEsS0FBSyxDQUFDd0MsWUFBTixDQUFtQjlhLElBQW5CLENBQXdCK2EsS0FBeEIsR0FBZ0MsRUFBaEM7QUFDRCxHQUpNLENBRjJEO0FBT3BFLEdBQUNiLHdEQUFELEdBQXVCLENBQUMxWSxLQUFELEVBQVErVyxNQUFSLEtBQ3JCUiw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUN3QyxZQUFOLENBQW1COWEsSUFBbkIsQ0FBd0IrYSxLQUF4QixHQUFnQ3hDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFldUMsS0FBL0M7QUFDQXpDLElBQUFBLEtBQUssQ0FBQ3dDLFlBQU4sQ0FBbUI5YSxJQUFuQixDQUF3QmdiLFNBQXhCLEdBQW9DekMsTUFBTSxDQUFDQyxPQUFQLENBQWV3QyxTQUFuRDtBQUNBMUMsSUFBQUEsS0FBSyxDQUFDd0MsWUFBTixDQUFtQjlhLElBQW5CLENBQXdCK1csTUFBeEIsR0FBaUN3QixNQUFNLENBQUNDLE9BQVAsQ0FBZXpCLE1BQWhEO0FBQ0F1QixJQUFBQSxLQUFLLENBQUN3QyxZQUFOLENBQW1COWEsSUFBbkIsQ0FBd0JpYixVQUF4QixHQUFxQzFDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFleUMsVUFBcEQ7QUFDQTNDLElBQUFBLEtBQUssQ0FBQ3dDLFlBQU4sQ0FBbUI5YSxJQUFuQixDQUF3QndELE1BQXhCLEdBQWlDK1UsTUFBTSxDQUFDQyxPQUFQLENBQWVoVixNQUFoRDtBQUNBOFUsSUFBQUEsS0FBSyxDQUFDd0MsWUFBTixDQUFtQjF2QixLQUFuQixHQUEyQixJQUEzQjtBQUNBa3RCLElBQUFBLEtBQUssQ0FBQ3dDLFlBQU4sQ0FBbUJ0MEIsT0FBbkIsR0FBNkIsS0FBN0I7QUFDRCxHQVJNLENBUjJEO0FBaUJwRSxHQUFDMnpCLHdEQUFELEdBQXVCLENBQUMzWSxLQUFELEVBQVErVyxNQUFSLEtBQ3JCUiw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUN3QyxZQUFOLENBQW1CMXZCLEtBQW5CLEdBQTJCbXRCLE1BQU0sQ0FBQ0MsT0FBbEM7QUFDQUYsSUFBQUEsS0FBSyxDQUFDd0MsWUFBTixDQUFtQnQwQixPQUFuQixHQUE2QixLQUE3QjtBQUNBOHhCLElBQUFBLEtBQUssQ0FBQ3dDLFlBQU4sQ0FBbUI5YSxJQUFuQixDQUF3QithLEtBQXhCLEdBQWdDLEVBQWhDO0FBQ0QsR0FKTSxDQWxCMkQ7QUF1QnBFLEdBQUNYLHdEQUFELEdBQXdCNVksS0FBRCxJQUNyQnVXLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQzRDLFlBQU4sQ0FBbUIxMEIsT0FBbkIsR0FBNkIsSUFBN0I7QUFDQTh4QixJQUFBQSxLQUFLLENBQUM0QyxZQUFOLENBQW1COXZCLEtBQW5CLEdBQTJCLElBQTNCO0FBQ0FrdEIsSUFBQUEsS0FBSyxDQUFDNEMsWUFBTixDQUFtQmxiLElBQW5CLENBQXdCK2EsS0FBeEIsQ0FBOEJuUixJQUE5QixHQUFxQyxJQUFyQztBQUNELEdBSk0sQ0F4QjJEO0FBNkJwRSxHQUFDeVEsd0RBQUQsR0FBdUIsQ0FBQzdZLEtBQUQsRUFBUStXLE1BQVIsS0FDckJSLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQzRDLFlBQU4sQ0FBbUJsYixJQUFuQixDQUF3QithLEtBQXhCLEdBQWdDeEMsTUFBTSxDQUFDQyxPQUFQLENBQWV1QyxLQUEvQztBQUNBekMsSUFBQUEsS0FBSyxDQUFDNEMsWUFBTixDQUFtQmxiLElBQW5CLENBQXdCaWIsVUFBeEIsR0FBcUMxQyxNQUFNLENBQUNDLE9BQVAsQ0FBZXlDLFVBQXBEO0FBQ0EzQyxJQUFBQSxLQUFLLENBQUM0QyxZQUFOLENBQW1COXZCLEtBQW5CLEdBQTJCLElBQTNCO0FBQ0FrdEIsSUFBQUEsS0FBSyxDQUFDNEMsWUFBTixDQUFtQjEwQixPQUFuQixHQUE2QixLQUE3QjtBQUNELEdBTE0sQ0E5QjJEO0FBb0NwRSxHQUFDOHpCLHdEQUFELEdBQXVCLENBQUM5WSxLQUFELEVBQVErVyxNQUFSLEtBQ3JCUiw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUM0QyxZQUFOLENBQW1COXZCLEtBQW5CLEdBQTJCbXRCLE1BQU0sQ0FBQ0MsT0FBbEM7QUFDQUYsSUFBQUEsS0FBSyxDQUFDNEMsWUFBTixDQUFtQjEwQixPQUFuQixHQUE2QixLQUE3QjtBQUNBOHhCLElBQUFBLEtBQUssQ0FBQzRDLFlBQU4sQ0FBbUJsYixJQUFuQixDQUF3QithLEtBQXhCLENBQThCblIsSUFBOUIsR0FBcUMsSUFBckM7QUFDRCxHQUpNLENBckMyRDtBQTBDcEUsR0FBQ2tRLHdEQUFELEdBQXdCdFksS0FBRCxJQUNyQnVXLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ2dELFlBQU4sQ0FBbUI5MEIsT0FBbkIsR0FBNkIsSUFBN0I7QUFDQTh4QixJQUFBQSxLQUFLLENBQUNnRCxZQUFOLENBQW1CbHdCLEtBQW5CLEdBQTJCLElBQTNCO0FBQ0FrdEIsSUFBQUEsS0FBSyxDQUFDZ0QsWUFBTixDQUFtQnRiLElBQW5CLENBQXdCK2EsS0FBeEIsQ0FBOEJuUixJQUE5QixHQUFxQyxFQUFyQztBQUNELEdBSk0sQ0EzQzJEO0FBZ0RwRSxHQUFDbVEsd0RBQUQsR0FBdUIsQ0FBQ3ZZLEtBQUQsRUFBUStXLE1BQVIsS0FDckJSLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ2dELFlBQU4sQ0FBbUJ0YixJQUFuQixDQUF3QithLEtBQXhCLEdBQWdDeEMsTUFBTSxDQUFDQyxPQUFQLENBQWV1QyxLQUEvQztBQUNBekMsSUFBQUEsS0FBSyxDQUFDZ0QsWUFBTixDQUFtQnRiLElBQW5CLENBQXdCaWIsVUFBeEIsR0FBcUMxQyxNQUFNLENBQUNDLE9BQVAsQ0FBZXlDLFVBQXBEO0FBQ0EzQyxJQUFBQSxLQUFLLENBQUNnRCxZQUFOLENBQW1CbHdCLEtBQW5CLEdBQTJCLElBQTNCO0FBQ0FrdEIsSUFBQUEsS0FBSyxDQUFDZ0QsWUFBTixDQUFtQjkwQixPQUFuQixHQUE2QixLQUE3QjtBQUNELEdBTE0sQ0FqRDJEO0FBdURwRSxHQUFDd3pCLHdEQUFELEdBQXVCLENBQUN4WSxLQUFELEVBQVErVyxNQUFSLEtBQ3JCUiw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUNnRCxZQUFOLENBQW1CbHdCLEtBQW5CLEdBQTJCbXRCLE1BQU0sQ0FBQ0MsT0FBbEM7QUFDQUYsSUFBQUEsS0FBSyxDQUFDZ0QsWUFBTixDQUFtQjkwQixPQUFuQixHQUE2QixLQUE3QjtBQUNBOHhCLElBQUFBLEtBQUssQ0FBQ2dELFlBQU4sQ0FBbUJ0YixJQUFuQixDQUF3QithLEtBQXhCLENBQThCblIsSUFBOUIsR0FBcUMsRUFBckM7QUFDRCxHQUpNLENBeEQyRDtBQTZEcEUsR0FBQzJRLHFEQUFELEdBQXFCL1ksS0FBRCxJQUNsQnVXLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQzZDLE9BQU4sQ0FBYzMwQixPQUFkLEdBQXdCLElBQXhCO0FBQ0E4eEIsSUFBQUEsS0FBSyxDQUFDNkMsT0FBTixDQUFjL3ZCLEtBQWQsR0FBc0IsSUFBdEI7QUFDQWt0QixJQUFBQSxLQUFLLENBQUM2QyxPQUFOLENBQWNuYixJQUFkLENBQW1CK2EsS0FBbkIsQ0FBeUJuUixJQUF6QixHQUFnQyxFQUFoQztBQUNBME8sSUFBQUEsS0FBSyxDQUFDNkMsT0FBTixDQUFjbmIsSUFBZCxDQUFtQithLEtBQW5CLENBQXlCSyxRQUF6QixHQUFvQyxFQUFwQztBQUNBOUMsSUFBQUEsS0FBSyxDQUFDNkMsT0FBTixDQUFjbmIsSUFBZCxDQUFtQithLEtBQW5CLENBQXlCTSxLQUF6QixHQUFpQyxFQUFqQztBQUNELEdBTk0sQ0E5RDJEO0FBcUVwRSxHQUFDYixxREFBRCxHQUFvQixDQUFDaFosS0FBRCxFQUFRK1csTUFBUixLQUNsQlIsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDNkMsT0FBTixDQUFjbmIsSUFBZCxHQUFxQnVZLE1BQU0sQ0FBQ0MsT0FBNUI7QUFDQUYsSUFBQUEsS0FBSyxDQUFDNkMsT0FBTixDQUFjL3ZCLEtBQWQsR0FBc0IsSUFBdEI7QUFDQWt0QixJQUFBQSxLQUFLLENBQUM2QyxPQUFOLENBQWMzMEIsT0FBZCxHQUF3QixLQUF4QjtBQUNELEdBSk0sQ0F0RTJEO0FBMkVwRSxHQUFDaTBCLHFEQUFELEdBQW9CLENBQUNqWixLQUFELEVBQVErVyxNQUFSLEtBQ2xCUiw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUM2QyxPQUFOLENBQWMvdkIsS0FBZCxHQUFzQm10QixNQUFNLENBQUNDLE9BQTdCO0FBQ0FGLElBQUFBLEtBQUssQ0FBQzZDLE9BQU4sQ0FBYzMwQixPQUFkLEdBQXdCLEtBQXhCO0FBQ0E4eEIsSUFBQUEsS0FBSyxDQUFDNkMsT0FBTixDQUFjbmIsSUFBZCxDQUFtQithLEtBQW5CLENBQXlCblIsSUFBekIsR0FBZ0MsRUFBaEM7QUFDQTBPLElBQUFBLEtBQUssQ0FBQzZDLE9BQU4sQ0FBY25iLElBQWQsQ0FBbUIrYSxLQUFuQixDQUF5QkssUUFBekIsR0FBb0MsRUFBcEM7QUFDQTlDLElBQUFBLEtBQUssQ0FBQzZDLE9BQU4sQ0FBY25iLElBQWQsQ0FBbUIrYSxLQUFuQixDQUF5Qk0sS0FBekIsR0FBaUMsRUFBakM7QUFDRCxHQU5NO0FBNUUyRCxDQUExQyxDQUE1QjtBQXFGQSxpRUFBZUUsTUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEpBO0FBQ0E7Q0FHQTs7QUFDQSxTQUFTQyxNQUFULEdBQWtCO0FBQ2hCLFNBQU8vQyxnREFBQSxDQUFVLGFBQVYsQ0FBUDtBQUNEOztBQUNELFVBQVVnRCxXQUFWLEdBQXdCO0FBQ3RCLE1BQUk7QUFDRixVQUFNdGUsTUFBbUIsR0FBRyxNQUFNamQsd0RBQUksQ0FBQ3M3QixNQUFELENBQXRDO0FBQ0EsVUFBTTdDLHVEQUFHLENBQUMrQixxREFBQSxDQUFpQnZkLE1BQU0sQ0FBQzZDLElBQXhCLENBQUQsQ0FBVDtBQUNELEdBSEQsQ0FHRSxPQUFPdFQsQ0FBUCxFQUFlO0FBQ2Z6RyxJQUFBQSxPQUFPLENBQUNtRixLQUFSLENBQWNzQixDQUFkO0FBQ0EsVUFBTWlzQix1REFBRyxDQUFDK0IscURBQUEsQ0FBaUJodUIsQ0FBQyxDQUFDd3NCLFFBQUYsQ0FBV2xaLElBQTVCLENBQUQsQ0FBVDtBQUNEO0FBQ0Y7O0FBQ00sVUFBVTBiLFlBQVYsR0FBeUI7QUFDOUIsUUFBTWhELDhEQUFVLENBQUNnQyxxREFBRCxFQUFtQmUsV0FBbkIsQ0FBaEI7QUFDRCxFQUVEOztBQUNBLFNBQVNFLFNBQVQsQ0FBbUI7QUFBRW5ZLEVBQUFBLE1BQUY7QUFBVXVULEVBQUFBLE1BQVY7QUFBa0I2RSxFQUFBQTtBQUFsQixDQUFuQixFQUErRDtBQUM3RCxTQUFPbkQsZ0RBQUEsQ0FBVyxnQkFBWCxFQUE0QjtBQUNqQzV0QixJQUFBQSxNQUFNLEVBQUU7QUFDTjJZLE1BQUFBLE1BRE07QUFFTnVULE1BQUFBLE1BRk07QUFHTjZFLE1BQUFBO0FBSE07QUFEeUIsR0FBNUIsQ0FBUDtBQU9EOztBQUNELFVBQVVDLGdCQUFWLENBQTJCdEQsTUFBM0IsRUFBMkU7QUFDekUsTUFBSTtBQUNGLFVBQU1wYixNQUFzQixHQUFHLE1BQU1qZCx3REFBSSxDQUFDeTdCLFNBQUQsRUFBWXBELE1BQU0sQ0FBQ0MsT0FBbkIsQ0FBekM7QUFDQSxVQUFNRyx1REFBRyxDQUFDZ0Msd0RBQUEsQ0FBb0J4ZCxNQUFNLENBQUM2QyxJQUEzQixDQUFELENBQVQ7QUFDRCxHQUhELENBR0UsT0FBT3RULENBQVAsRUFBZTtBQUNmekcsSUFBQUEsT0FBTyxDQUFDbUYsS0FBUixDQUFjc0IsQ0FBZDtBQUNBLFVBQU1pc0IsdURBQUcsQ0FBQ2dDLHdEQUFBLENBQW9CanVCLENBQUMsQ0FBQ3dzQixRQUFGLENBQVdsWixJQUEvQixDQUFELENBQVQ7QUFDRDtBQUNGOztBQUNNLFVBQVU4YixpQkFBVixHQUE4QjtBQUNuQyxRQUFNcEQsOERBQVUsQ0FBQ2lDLHdEQUFELEVBQXNCa0IsZ0JBQXRCLENBQWhCO0FBQ0QsRUFFRDs7QUFDQSxTQUFTRSxTQUFULENBQW1CO0FBQ2pCSCxFQUFBQSxPQURpQjtBQUVqQkksRUFBQUEsUUFGaUI7QUFHakIvTyxFQUFBQSxhQUhpQjtBQUlqQjhKLEVBQUFBLE1BSmlCO0FBS2pCaUUsRUFBQUE7QUFMaUIsQ0FBbkIsRUFNa0I7QUFDaEIsU0FBT3ZDLGdEQUFBLENBQVUsZ0JBQVYsRUFBNEI7QUFDakM1dEIsSUFBQUEsTUFBTSxFQUFFO0FBQ04rd0IsTUFBQUEsT0FETTtBQUVOSSxNQUFBQSxRQUZNO0FBR04vTyxNQUFBQSxhQUhNO0FBSU44SixNQUFBQSxNQUpNO0FBS05pRSxNQUFBQTtBQUxNO0FBRHlCLEdBQTVCLENBQVA7QUFTRDs7QUFDRCxVQUFVaUIsZ0JBQVYsQ0FBMkIxRCxNQUEzQixFQUEyRTtBQUN6RSxNQUFJO0FBQ0YsVUFBTXBiLE1BQXNCLEdBQUcsTUFBTWpkLHdEQUFJLENBQUM2N0IsU0FBRCxFQUFZeEQsTUFBTSxDQUFDQyxPQUFuQixDQUF6QztBQUNBLFVBQU1HLHVEQUFHLENBQUNpQyx3REFBQSxDQUFvQnpkLE1BQU0sQ0FBQzZDLElBQTNCLENBQUQsQ0FBVDtBQUNELEdBSEQsQ0FHRSxPQUFPdFQsQ0FBUCxFQUFlO0FBQ2Z6RyxJQUFBQSxPQUFPLENBQUNtRixLQUFSLENBQWNzQixDQUFkO0FBQ0EsVUFBTWlzQix1REFBRyxDQUFDaUMsd0RBQUEsQ0FBb0JsdUIsQ0FBQyxDQUFDd3NCLFFBQUYsQ0FBV2xaLElBQS9CLENBQUQsQ0FBVDtBQUNEO0FBQ0Y7O0FBQ00sVUFBVWtjLGlCQUFWLEdBQThCO0FBQ25DLFFBQU14RCw4REFBVSxDQUFDa0Msd0RBQUQsRUFBc0JxQixnQkFBdEIsQ0FBaEI7QUFDRCxFQUVEOztBQUNBLFNBQVNFLFNBQVQsQ0FBbUI7QUFBRTNILEVBQUFBLFNBQUY7QUFBYXZILEVBQUFBO0FBQWIsQ0FBbkIsRUFBZ0U7QUFDOUQsU0FBT3dMLGdEQUFBLENBQVcsV0FBVXhMLGFBQWMsSUFBR3VILFNBQVUsRUFBaEQsQ0FBUDtBQUNEOztBQUNELFVBQVU0SCxnQkFBVixDQUEyQjdELE1BQTNCLEVBQTJFO0FBQ3pFLE1BQUk7QUFDRixVQUFNcGIsTUFBc0IsR0FBRyxNQUFNamQsd0RBQUksQ0FBQ2k4QixTQUFELEVBQVk1RCxNQUFNLENBQUNDLE9BQW5CLENBQXpDO0FBQ0EsVUFBTUcsdURBQUcsQ0FBQ2tDLHdEQUFBLENBQW9CMWQsTUFBTSxDQUFDNkMsSUFBM0IsQ0FBRCxDQUFUO0FBQ0QsR0FIRCxDQUdFLE9BQU90VCxDQUFQLEVBQWU7QUFDZnpHLElBQUFBLE9BQU8sQ0FBQ21GLEtBQVIsQ0FBY3NCLENBQWQ7QUFDQSxVQUFNaXNCLHVEQUFHLENBQUNrQyx3REFBQSxDQUFvQm51QixDQUFDLENBQUN3c0IsUUFBRixDQUFXbFosSUFBL0IsQ0FBRCxDQUFUO0FBQ0Q7QUFDRjs7QUFDTSxVQUFVcWMsaUJBQVYsR0FBOEI7QUFDbkMsUUFBTTNELDhEQUFVLENBQUNtQyx3REFBRCxFQUFzQnVCLGdCQUF0QixDQUFoQjtBQUNEO0FBRWMsVUFBVUUsVUFBVixHQUF1QjtBQUNwQyxRQUFNdjFCLHVEQUFHLENBQUMsQ0FDUjZ4Qix3REFBSSxDQUFDa0QsaUJBQUQsQ0FESSxFQUVSbEQsd0RBQUksQ0FBQ3lELGlCQUFELENBRkksRUFHUnpELHdEQUFJLENBQUNzRCxpQkFBRCxDQUhJLEVBSVJ0RCx3REFBSSxDQUFDOEMsWUFBRCxDQUpJLENBQUQsQ0FBVDtBQU1EOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQSxNQUFNZ0IsT0FBTyxHQUNYLFNBQ0ksQ0FESixHQUVLLHVCQUhQO0FBSUFqRSwrREFBQSxHQUEwQixHQUFFaUUsT0FBUSxNQUFwQztBQUNBakUsdUVBQUEsR0FBaUMsSUFBakM7O0FBUUEsTUFBTXFFLFdBQVcsR0FBRyxDQUNsQnRiLEtBRGtCLEVBRWxCK1csTUFGa0IsS0FHQTtBQUNsQixNQUFJQSxNQUFNLENBQUNucEIsSUFBUCxLQUFnQm10Qix1REFBcEIsRUFBNkI7QUFDM0IsMkNBQ0svYSxLQURMLEdBRUsrVyxNQUFNLENBQUNDLE9BRlo7QUFJRCxHQUxELE1BS087QUFDTCxXQUFPZ0Usc0RBQWUsQ0FBQztBQUNyQnJKLE1BQUFBLElBRHFCO0FBRXJCb0ksTUFBQUEsTUFGcUI7QUFHckJsRyxNQUFBQSxPQUFPQSwrQ0FBQUE7QUFIYyxLQUFELENBQWYsQ0FJSjdULEtBSkksRUFJRytXLE1BSkgsQ0FBUDtBQUtEO0FBQ0YsQ0FoQkQ7O0FBb0JBLGlFQUFldUUsV0FBZjtBQUVPLFVBQVVDLFFBQVYsR0FBcUI7QUFDMUIsUUFBTWgyQix1REFBRyxDQUFDLENBQUM3Ryx3REFBSSxDQUFDdThCLCtDQUFELENBQUwsRUFBaUJ2OEIsd0RBQUksQ0FBQ284QixpREFBRCxDQUFyQixFQUFtQ3A4Qix3REFBSSxDQUFDMjVCLGtEQUFELENBQXZDLENBQUQsQ0FBVDtBQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNEO0FBQ0E7QUFDQSxNQUFNO0FBQUVvRCxFQUFBQTtBQUFGLElBQTJCRCx3REFBakM7QUFFTyxNQUFNRSxlQUFlLEdBQUcsaUJBQXhCO0FBQ0EsTUFBTUMsZUFBZSxHQUFHLGlCQUF4QjtBQUNBLE1BQU1DLGVBQWUsR0FBRyxpQkFBeEI7QUFFQSxNQUFNQyxjQUFjLEdBQUcsZ0JBQXZCO0FBQ0EsTUFBTUMsY0FBYyxHQUFHLGdCQUF2QjtBQUNBLE1BQU1DLGNBQWMsR0FBRyxnQkFBdkI7QUFFQSxNQUFNQyxlQUFlLEdBQUcsaUJBQXhCO0FBQ0EsTUFBTUMsZUFBZSxHQUFHLGlCQUF4QjtBQUNBLE1BQU1DLGVBQWUsR0FBRyxpQkFBeEI7QUFFQSxNQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUI7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUI7QUFDQSxNQUFNQyxpQkFBaUIsR0FBRyxtQkFBMUI7QUFFQSxNQUFNQyxhQUFhLEdBQUcsZUFBdEI7QUFFQSxNQUFNQyxXQUFXLEdBQUc5RyxtRUFBaUIsQ0FDMUNpRyxlQUQwQyxFQUUxQ0MsZUFGMEMsRUFHMUNDLGVBSDBDLENBQWpCLEVBQXBCO0FBTUEsTUFBTVksVUFBVSxHQUFHL0csbUVBQWlCLENBQ3pDb0csY0FEeUMsRUFFekNDLGNBRnlDLEVBR3pDQyxjQUh5QyxDQUFqQixFQUFuQjtBQU1BLE1BQU14SCxXQUFXLEdBQUdrQixtRUFBaUIsQ0FDMUN1RyxlQUQwQyxFQUUxQ0MsZUFGMEMsRUFHMUNDLGVBSDBDLENBQWpCLEVBQXBCO0FBTUEsTUFBTU8sYUFBYSxHQUFHaEgsbUVBQWlCLENBQzVDMEcsaUJBRDRDLEVBRTVDQyxpQkFGNEMsRUFHNUNDLGlCQUg0QyxDQUFqQixFQUF0QjtBQU1BLE1BQU1LLFdBQVcsR0FBR2pCLG9CQUFvQixDQUFDYSxhQUFELENBQXBCLEVBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckRQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRkE7QUFFQTtBQUNBO0FBa0JBLE1BQU03RixZQUF1QixHQUFHO0FBQzlCa0csRUFBQUEsV0FBVyxFQUFFLEtBRGlCO0FBRTlCQyxFQUFBQSxZQUFZLEVBQUUsS0FGZ0I7QUFHOUJDLEVBQUFBLFVBQVUsRUFBRSxFQUhrQjtBQUk5QkMsRUFBQUEsVUFBVSxFQUFFLEtBSmtCO0FBSzlCQyxFQUFBQSxXQUFXLEVBQUUsS0FMaUI7QUFNOUJDLEVBQUFBLFdBQVcsRUFBRSxFQU5pQjtBQU85QnRMLEVBQUFBLEVBQUUsRUFBRTtBQVAwQixDQUFoQztBQVVBLE1BQU1DLElBQUksR0FBRzZFLCtEQUFhLENBQXdCQyxZQUF4QixFQUFzQztBQUM5RCxHQUFDaUYsb0RBQUQsR0FBb0IxYixLQUFELElBQ2pCdVcsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDaUcsV0FBTixHQUFvQixJQUFwQjtBQUNBakcsSUFBQUEsS0FBSyxDQUFDZ0csVUFBTixHQUFtQixLQUFuQjtBQUNBaEcsSUFBQUEsS0FBSyxDQUFDa0csV0FBTixHQUFvQixFQUFwQjtBQUNELEdBSk0sQ0FGcUQ7QUFPOUQsR0FBQ3JCLG9EQUFELEdBQW9CM2IsS0FBRCxJQUNqQnVXLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQ2lHLFdBQU4sR0FBb0IsS0FBcEI7QUFDQWpHLElBQUFBLEtBQUssQ0FBQ2dHLFVBQU4sR0FBbUIsSUFBbkI7QUFDRCxHQUhNLENBUnFEO0FBWTlELEdBQUNsQixvREFBRCxHQUFtQixDQUFDNWIsS0FBRCxFQUFRK1csTUFBUixLQUNqQlIsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDaUcsV0FBTixHQUFvQixLQUFwQjtBQUNBakcsSUFBQUEsS0FBSyxDQUFDZ0csVUFBTixHQUFtQixLQUFuQjtBQUNBaEcsSUFBQUEsS0FBSyxDQUFDa0csV0FBTixHQUFvQmpHLE1BQU0sQ0FBQ0MsT0FBM0I7QUFDRCxHQUpNLENBYnFEO0FBa0I5RCxHQUFDc0Ysa0RBQUQsR0FBa0J0YyxLQUFELElBQ2Z1Vyw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUNnRyxVQUFOLEdBQW1CLEtBQW5CO0FBQ0QsR0FGTSxDQW5CcUQ7QUFzQjlELEdBQUNqQixtREFBRCxHQUFtQjdiLEtBQUQsSUFDaEJ1Vyw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUM2RixXQUFOLEdBQW9CLElBQXBCO0FBQ0E3RixJQUFBQSxLQUFLLENBQUMrRixVQUFOLEdBQW1CLEVBQW5CO0FBQ0EvRixJQUFBQSxLQUFLLENBQUNwRixFQUFOLEdBQVcsSUFBWDtBQUNELEdBSk0sQ0F2QnFEO0FBNEI5RCxHQUFDb0ssbURBQUQsR0FBa0IsQ0FBQzliLEtBQUQsRUFBUStXLE1BQVIsS0FDaEJSLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQzZGLFdBQU4sR0FBb0IsS0FBcEI7QUFDQTdGLElBQUFBLEtBQUssQ0FBQ3BGLEVBQU4sR0FBV3FGLE1BQU0sQ0FBQ0MsT0FBbEI7QUFDRCxHQUhNLENBN0JxRDtBQWlDOUQsR0FBQytFLG1EQUFELEdBQWtCLENBQUMvYixLQUFELEVBQVErVyxNQUFSLEtBQ2hCUiw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXO0FBQ3hCQSxJQUFBQSxLQUFLLENBQUM2RixXQUFOLEdBQW9CLEtBQXBCO0FBQ0E3RixJQUFBQSxLQUFLLENBQUNwRixFQUFOLEdBQVcsSUFBWDtBQUNBb0YsSUFBQUEsS0FBSyxDQUFDK0YsVUFBTixHQUFtQjlGLE1BQU0sQ0FBQ0MsT0FBMUI7QUFDRCxHQUpNLENBbENxRDtBQXVDOUQsR0FBQ2dGLG9EQUFELEdBQW9CaGMsS0FBRCxJQUNqQnVXLDRDQUFPLENBQUN2VyxLQUFELEVBQVM4VyxLQUFELElBQVc7QUFDeEJBLElBQUFBLEtBQUssQ0FBQzhGLFlBQU4sR0FBcUIsSUFBckI7QUFDRCxHQUZNLENBeENxRDtBQTJDOUQsR0FBQ1gsb0RBQUQsR0FBb0JqYyxLQUFELElBQ2pCdVcsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDcEYsRUFBTixHQUFXLElBQVg7QUFDQW9GLElBQUFBLEtBQUssQ0FBQzhGLFlBQU4sR0FBcUIsS0FBckI7QUFDRCxHQUhNLENBNUNxRDtBQWdEOUQsR0FBQ1Ysb0RBQUQsR0FBb0JsYyxLQUFELElBQ2pCdVcsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDOEYsWUFBTixHQUFxQixLQUFyQjtBQUNELEdBRk0sQ0FqRHFEO0FBb0Q5RCxHQUFDVCxzREFBRCxHQUFzQm5jLEtBQUQsSUFDbkJ1Vyw0Q0FBTyxDQUFDdlcsS0FBRCxFQUFTOFcsS0FBRCxJQUFXLENBQ3hCO0FBQ0QsR0FGTSxDQXJEcUQ7QUF3RDlELEdBQUNzRixzREFBRCxHQUFxQixDQUFDcGMsS0FBRCxFQUFRK1csTUFBUixLQUNuQlIsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVztBQUN4QkEsSUFBQUEsS0FBSyxDQUFDcEYsRUFBTixHQUFXcUYsTUFBTSxDQUFDQyxPQUFsQjtBQUNELEdBRk0sQ0F6RHFEO0FBNEQ5RCxHQUFDcUYsc0RBQUQsR0FBc0JyYyxLQUFELElBQ25CdVcsNENBQU8sQ0FBQ3ZXLEtBQUQsRUFBUzhXLEtBQUQsSUFBVyxDQUN4QjtBQUNELEdBRk07QUE3RHFELENBQXRDLENBQTFCO0FBa0VBLGlFQUFlbkYsSUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEdBO0FBQ0E7Q0FHQTs7QUFDQSxTQUFTc0wsU0FBVCxDQUFtQkMsVUFBbkIsRUFBOEM7QUFDNUMsU0FBT2pHLGlEQUFBLENBQVcsY0FBWCxFQUEyQmlHLFVBQTNCLENBQVA7QUFDRDs7QUFDRCxVQUFVQyxVQUFWLENBQXFCcEcsTUFBckIsRUFBcUU7QUFDbkUsTUFBSTtBQUNGLFVBQU1wYixNQUFvQixHQUFHLE1BQU1qZCx3REFBSSxDQUFDdStCLFNBQUQsRUFBWWxHLE1BQU0sQ0FBQ0MsT0FBbkIsQ0FBdkM7QUFDQSxVQUFNRyx1REFBRyxDQUFDb0Ysd0RBQUEsQ0FBb0I1Z0IsTUFBTSxDQUFDNkMsSUFBM0IsQ0FBRCxDQUFUO0FBQ0QsR0FIRCxDQUdFLE9BQU90VCxDQUFQLEVBQWU7QUFDZixVQUFNaXNCLHVEQUFHLENBQUNvRix3REFBQSxDQUFvQnJ4QixDQUFDLENBQUN3c0IsUUFBRixDQUFXbFosSUFBL0IsQ0FBRCxDQUFUO0FBQ0Q7QUFDRjs7QUFDTSxVQUFVNGUsV0FBVixHQUF3QjtBQUM3QixRQUFNbEcsOERBQVUsQ0FBQ3FGLHdEQUFELEVBQXNCWSxVQUF0QixDQUFoQjtBQUNELEVBRUQ7O0FBQ0EsU0FBU0UsUUFBVCxDQUFrQkMsU0FBbEIsRUFBMkM7QUFDekMsU0FBT3JHLGlEQUFBLENBQVcsYUFBWCxFQUEwQnFHLFNBQTFCLENBQVA7QUFDRDs7QUFDRCxVQUFVQyxTQUFWLENBQW9CeEcsTUFBcEIsRUFBbUU7QUFDakUsTUFBSTtBQUNGLFVBQU1wYixNQUFtQixHQUFHLE1BQU1qZCx3REFBSSxDQUFDMitCLFFBQUQsRUFBV3RHLE1BQU0sQ0FBQ0MsT0FBbEIsQ0FBdEM7QUFDQSxVQUFNRyx1REFBRyxDQUFDcUYsdURBQUEsQ0FBbUI3Z0IsTUFBTSxDQUFDNkMsSUFBMUIsQ0FBRCxDQUFUO0FBQ0QsR0FIRCxDQUdFLE9BQU90VCxDQUFQLEVBQWU7QUFDZixVQUFNaXNCLHVEQUFHLENBQUNxRix1REFBQSxDQUFtQnR4QixDQUFDLENBQUN3c0IsUUFBRixDQUFXbFosSUFBOUIsQ0FBRCxDQUFUO0FBQ0Q7QUFDRjs7QUFDTSxVQUFVZ2YsVUFBVixHQUF1QjtBQUM1QixRQUFNdEcsOERBQVUsQ0FBQ3NGLHVEQUFELEVBQXFCZSxTQUFyQixDQUFoQjtBQUNELEVBRUQ7O0FBQ0EsU0FBU0UsU0FBVCxHQUFxQjtBQUNuQnhHLEVBQUFBLGlEQUFBLENBQVcsY0FBWCxFQUEyQixFQUEzQjtBQUNEOztBQUNELFVBQVV5RyxVQUFWLEdBQXVCO0FBQ3JCLE1BQUk7QUFDRixVQUFNaC9CLHdEQUFJLENBQUMrK0IsU0FBRCxDQUFWO0FBQ0EsVUFBTXRHLHVEQUFHLENBQUM1Qyx3REFBQSxFQUFELENBQVQ7QUFDRCxHQUhELENBR0UsT0FBT3JwQixDQUFQLEVBQWU7QUFDZixVQUFNaXNCLHVEQUFHLENBQUM1Qyx3REFBQSxDQUFvQnJwQixDQUFDLENBQUN3c0IsUUFBRixDQUFXbFosSUFBL0IsQ0FBRCxDQUFUO0FBQ0Q7QUFDRjs7QUFDTSxVQUFVbWYsV0FBVixHQUF3QjtBQUM3QixRQUFNekcsOERBQVUsQ0FBQzNDLHdEQUFELEVBQXNCbUosVUFBdEIsQ0FBaEI7QUFDRCxFQUVEOztBQUNBLFNBQVNFLFdBQVQsR0FBdUI7QUFDckIsU0FBTzNHLGdEQUFBLENBQVcsUUFBWCxDQUFQO0FBQ0Q7O0FBQ0QsVUFBVTRHLFlBQVYsR0FBeUI7QUFDdkIsTUFBSTtBQUNGLFVBQU1saUIsTUFBbUIsR0FBRyxNQUFNamQsd0RBQUksQ0FBQ2svQixXQUFELENBQXRDO0FBQ0EsVUFBTXpHLHVEQUFHLENBQUNzRiwwREFBQSxDQUFzQjlnQixNQUFNLENBQUM2QyxJQUE3QixDQUFELENBQVQ7QUFDRCxHQUhELENBR0UsT0FBT3RULENBQVAsRUFBZTtBQUNmLFVBQU1pc0IsdURBQUcsQ0FBQ3NGLDBEQUFBLENBQXNCdnhCLENBQUMsQ0FBQ3dzQixRQUFGLENBQVdsWixJQUFqQyxDQUFELENBQVQ7QUFDRDtBQUNGOztBQUNNLFVBQVVzZixhQUFWLEdBQTBCO0FBQy9CLFFBQU01Ryw4REFBVSxDQUFDdUYsMERBQUQsRUFBd0JvQixZQUF4QixDQUFoQjtBQUNEO0FBRWMsVUFBVTVDLFFBQVYsR0FBcUI7QUFDbEMsUUFBTTExQix1REFBRyxDQUFDLENBQ1I2eEIsd0RBQUksQ0FBQ2dHLFdBQUQsQ0FESSxFQUVSaEcsd0RBQUksQ0FBQ29HLFVBQUQsQ0FGSSxFQUdScEcsd0RBQUksQ0FBQ3VHLFdBQUQsQ0FISSxFQUlSdkcsd0RBQUksQ0FBQzBHLGFBQUQsQ0FKSSxDQUFELENBQVQ7QUFNRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUVEO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOzs7O0FBTUEsTUFBTVksSUFBSSxHQUFHLENBQUM7QUFBRXBmLEVBQUFBLFNBQUY7QUFBYW1GLEVBQUFBO0FBQWIsQ0FBRCxLQUF3QztBQUNuRCxzQkFDRTtBQUFBLDJCQUNFLCtEQUFDLDREQUFEO0FBQWUsV0FBSyxFQUFFK0Qsa0RBQXRCO0FBQUEsOEJBQ0UsK0RBQUMsbURBQUQ7QUFBQSxnQ0FDRTtBQUFNLGlCQUFPLEVBQUM7QUFBZDtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQURGLGVBRUU7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBRkYsZUFHRTtBQUFNLGNBQUksRUFBQyxhQUFYO0FBQXlCLGlCQUFPLEVBQUM7QUFBakM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFIRixlQUlFO0FBQ0UsY0FBSSxFQUFDLFVBRFA7QUFFRSxpQkFBTyxFQUFDO0FBRlY7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFKRixlQVFFO0FBQU0sa0JBQVEsRUFBQyxVQUFmO0FBQTBCLGlCQUFPLEVBQUM7QUFBbEM7QUFBQTtBQUFBO0FBQUE7QUFBQSxxQkFSRixlQVNFO0FBQU0sa0JBQVEsRUFBQyxnQkFBZjtBQUFnQyxpQkFBTyxFQUFDO0FBQXhDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBVEYsZUFVRTtBQUFNLGtCQUFRLEVBQUMsU0FBZjtBQUF5QixpQkFBTyxFQUFDO0FBQWpDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBVkYsZUFXRTtBQUFNLGtCQUFRLEVBQUMsVUFBZjtBQUEwQixpQkFBTyxFQUFDO0FBQWxDO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBWEYsZUFZRTtBQUFNLGFBQUcsRUFBQztBQUFWO0FBQUE7QUFBQTtBQUFBO0FBQUEscUJBWkY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQURGLGVBZUUsK0RBQUMsd0RBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxtQkFmRixlQWdCRSwrREFBQyx3REFBRDtBQUFBLCtCQUNFLCtEQUFDLFNBQUQsb0JBQWUvRCxTQUFmO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQWhCRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERixtQkFERjtBQXdCRCxDQXpCRDs7QUEyQkEsTUFBTWthLGNBQWMsR0FBRyxNQUFNO0FBQzNCLFFBQU1DLGNBQWMsR0FBR1YsaURBQW9CLEVBQTNDO0FBQ0EsUUFBTVcsV0FBVyxHQUFHLENBQUNELGNBQUQsQ0FBcEI7QUFDQSxRQUFNRSxRQUFRLEdBQ1osU0FDSVYsQ0FESixHQUVJQSw4Q0FBTyxDQUFDRSw2RUFBbUIsQ0FBQ0gsc0RBQWUsQ0FBQyxHQUFHVSxXQUFKLENBQWhCLENBQXBCLENBSGI7QUFJQSxRQUFNRSxLQUFLLEdBQUdWLGtEQUFXLENBQUNOLDZDQUFELEVBQVVlLFFBQVYsQ0FBekI7QUFDQ0MsRUFBQUEsS0FBRCxDQUFxQkMsUUFBckIsR0FBZ0NKLGNBQWMsQ0FBQ0ssR0FBZixDQUFtQjFELDhDQUFuQixDQUFoQztBQUNBLFNBQU93RCxLQUFQO0FBQ0QsQ0FWRDs7QUFZTyxNQUFNRyxPQUFPLEdBQUdsQixpRUFBYSxDQUFDVyxjQUFELENBQTdCO0FBQ1AsaUVBQWVPLE9BQU8sQ0FBQ0MsU0FBUixDQUFrQmxCLHNEQUFhLENBQUNTLElBQUQsQ0FBL0IsQ0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTs7O0FBRUEsTUFBTWEsTUFBK0IsR0FBRyxDQUFDO0FBQUV4RixFQUFBQTtBQUFGLENBQUQsS0FBZ0I7QUFDdEQsUUFBTTV2QixNQUFNLEdBQUdxQyxzREFBUyxFQUF4QjtBQUNBLFFBQU1vbEIsUUFBUSxHQUFHZCx3REFBVyxFQUE1QjtBQUVBLFFBQU07QUFBRTFJLElBQUFBO0FBQUYsTUFBVzJSLE1BQU0sQ0FBQ0wsWUFBUCxDQUFvQmxiLElBQXBCLENBQXlCK2EsS0FBMUM7QUFDQSxRQUFNO0FBQUU3QyxJQUFBQTtBQUFGLE1BQWtCM0Ysd0RBQVcsQ0FBRS9RLEtBQUQsSUFBc0JBLEtBQUssQ0FBQzZULE9BQTdCLENBQW5DO0FBQ0EsUUFBTWIsU0FBUyxHQUFHN29CLE1BQU0sQ0FBQzBRLEtBQVAsQ0FBYXBMLEVBQWIsSUFBbUJ0RixNQUFNLENBQUMwUSxLQUFQLENBQWFwTCxFQUFiLENBQWdCLENBQWhCLENBQXJDO0FBQ0EsUUFBTWdjLGFBQWEsR0FBR3RoQixNQUFNLENBQUMwUSxLQUFQLENBQWFwTCxFQUFiLElBQW1CdEYsTUFBTSxDQUFDMFEsS0FBUCxDQUFhcEwsRUFBYixDQUFnQixDQUFoQixDQUF6QztBQUVBcEMsRUFBQUEsZ0RBQVMsQ0FBQyxNQUFNO0FBQ2R1a0IsSUFBQUEsUUFBUSxDQUNOeUgsZ0VBQUEsQ0FBb0I7QUFDbEI1TixNQUFBQSxhQUFhLEVBQUUrVCxNQUFNLENBQUMvVCxhQUFELENBREg7QUFFbEJ1SCxNQUFBQSxTQUFTLEVBQUV3TSxNQUFNLENBQUN4TSxTQUFEO0FBRkMsS0FBcEIsQ0FETSxDQUFSO0FBTUQsR0FQUSxFQU9OLENBQUNBLFNBQUQsRUFBWXZILGFBQVosRUFBMkJtRyxRQUEzQixDQVBNLENBQVQ7QUFTQXZrQixFQUFBQSxnREFBUyxDQUFDLE1BQU07QUFDZHVrQixJQUFBQSxRQUFRLENBQUMwRSxzRUFBQSxDQUF5QjtBQUFFdEQsTUFBQUEsU0FBUyxFQUFFd00sTUFBTSxDQUFDeE0sU0FBRDtBQUFuQixLQUF6QixDQUFELENBQVI7QUFDRCxHQUZRLEVBRU4sQ0FBQ0EsU0FBRCxFQUFZcEIsUUFBWixDQUZNLENBQVQ7QUFHQSxzQkFDRSwrREFBQyx5REFBRDtBQUFBLGVBQ0d4SixJQUFJLGdCQUFHLCtEQUFDLDJEQUFEO0FBQVksVUFBSSxFQUFFQTtBQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUFILGdCQUFnQywrREFBQyxnRUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGlCQUR2QyxlQUVHLCtEQUFDLDREQUFEO0FBQWEsVUFBSSxFQUFFc087QUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFGSCxFQUdHdE8sSUFBSSxpQkFBSSwrREFBQyw0REFBRDtBQUFhLFVBQUksRUFBRUE7QUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQSxpQkFIWDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFERjtBQU9ELENBNUJEOztBQThCTyxNQUFNcVgsa0JBQWtCLEdBQUdQLDREQUFBLENBQy9CSCxLQUFELElBQ0UsT0FBTztBQUFFVyxFQUFBQTtBQUFGLENBQVAsS0FBbUI7QUFDakIsUUFBTUMsTUFBTSxHQUFHRCxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0UsT0FBSixDQUFZRCxNQUFmLEdBQXdCLEVBQTFDOztBQUNBLE1BQUkxSSwrREFBSixFQUE0QjtBQUMxQnlJLElBQUFBLEdBQUcsSUFBSUMsTUFBUCxHQUNLMUksc0VBQUEsR0FBZ0MwSSxNQURyQyxHQUVLMUksc0VBQUEsR0FBZ0MsRUFGckM7QUFHRDs7QUFFRDhILEVBQUFBLEtBQUssQ0FBQ25OLFFBQU4sQ0FBZTZLLGlFQUFBLEVBQWY7QUFFQXNDLEVBQUFBLEtBQUssQ0FBQ25OLFFBQU4sQ0FBZXlOLDRDQUFmO0FBQ0EsUUFBT04sS0FBRCxDQUFxQkMsUUFBckIsQ0FBOEJjLFNBQTlCLEVBQU47QUFDQSxTQUFPO0FBQUVyMEIsSUFBQUEsS0FBSyxFQUFFO0FBQVQsR0FBUDtBQUNELENBZjZCLENBQTNCO0FBa0JQLGlFQUFlMnpCLG9EQUFPLENBQUVwZixLQUFELElBQTBCQSxLQUEzQixDQUFQLENBQXlDdWYsTUFBekMsQ0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2pFQTtBQUNBO0FBRUEsTUFBTWYsV0FBVyxHQUFHdUIsb0VBQUgsd2VBQ2JDLHFEQURhLENBQWpCO0FBMkJBLGlFQUFleEIsV0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzlCQTtBQUNBO0FBRU8sTUFBTTBCLEdBQUcsR0FBRzVYLHVFQUFIO0FBQUE7QUFBQTtBQUFBLHlEQUFUO0FBTUEsTUFBTWlELEVBQUUsR0FBR2pELHNFQUFIO0FBQUE7QUFBQTtBQUFBLDhPQUFSO0FBbUJBLE1BQU02WCxFQUFFLEdBQUc3WCxzRUFBSDtBQUFBO0FBQUE7QUFBQSxrRUFBUixFQU9QOztBQUNPLE1BQU1KLE9BQU8sR0FBR0ksdUVBQUg7QUFBQTtBQUFBO0FBQUEsMEdBTWhCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BTlosQ0FBYjtBQVdBLE1BQU00WCxNQUFNLEdBQUcvWCx1RUFBSDtBQUFBO0FBQUE7QUFBQSw4TUFJZixDQUFDO0FBQUVFLEVBQUFBO0FBQUYsQ0FBRCxLQUFlQSxLQUFLLENBQUN4WixNQUFOLENBQWF5WixNQUpiLEVBZWYsQ0FBQztBQUFFRCxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNmIsT0FmYixDQUFaO0FBMEJBLE1BQU15VixLQUFLLEdBQUdoWSxzRUFBSDtBQUFBO0FBQUE7QUFBQSx5RkFBWDtBQVFBLE1BQU1pWSxRQUFRLEdBQUdqWSx1RUFBSDtBQUFBO0FBQUE7QUFBQSxxQkFBZCxFQUlQOztBQUNPLE1BQU1rWSxXQUFXLEdBQUdsWSx1RUFBSDtBQUFBO0FBQUE7QUFBQSwwR0FJcEIsQ0FBQztBQUFFRSxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFheVosTUFKUixDQUFqQjtBQVNBLE1BQU1nWSxVQUFVLEdBQUduWSwwRUFBSDtBQUFBO0FBQUE7QUFBQSxnTEFBaEI7QUFnQkEsTUFBTW9ZLGdCQUFnQixHQUFHcFksd0RBQU0sQ0FBQzJYLDRDQUFELENBQVQ7QUFBQTtBQUFBO0FBQUEsd0NBQXRCLEVBS1A7O0FBQ08sTUFBTVUsWUFBWSxHQUFHclksdUVBQUg7QUFBQTtBQUFBO0FBQUEsaURBRXJCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BRlAsQ0FBbEI7QUFPQSxNQUFNbVksT0FBTyxHQUFHdFksdUVBQUg7QUFBQTtBQUFBO0FBQUEsNlhBc0JkLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYTZiLE9BdEJkLEVBMEJoQixDQUFDO0FBQUVyQyxFQUFBQTtBQUFGLENBQUQsS0FBZUEsS0FBSyxDQUFDeFosTUFBTixDQUFhNmIsT0ExQlosQ0FBYixFQStCUDs7QUFFTyxNQUFNeVUsWUFBWSxHQUFHaFgsdUVBQUg7QUFBQTtBQUFBO0FBQUEsb0RBR3JCLENBQUM7QUFBRUUsRUFBQUE7QUFBRixDQUFELEtBQWVBLEtBQUssQ0FBQ3haLE1BQU4sQ0FBYXlaLE1BSFAsQ0FBbEI7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3SkEsTUFBTWxSLElBQUksR0FBRztBQUNoQjZULEVBQUFBLEVBQUUsRUFBRSxRQURZO0FBRWhCM0MsRUFBQUEsTUFBTSxFQUFFLFFBRlE7QUFHaEJtQyxFQUFBQSxNQUFNLEVBQUUsT0FIUTtBQUloQkMsRUFBQUEsT0FBTyxFQUFFLE9BSk87QUFLaEJnVyxFQUFBQSxPQUFPLEVBQUUsT0FMTztBQU1oQmxTLEVBQUFBLE9BQU8sRUFBRTtBQU5PLENBQWI7QUFTUCxNQUFNbkcsS0FBSyxHQUFHO0FBQ1Z4WixFQUFBQSxNQUFNLEVBQUU7QUFDSm9jLElBQUFBLEVBQUUsRUFBRyxpQ0FBZ0M3VCxJQUFJLENBQUM2VCxFQUFHLEdBRHpDO0FBRUozQyxJQUFBQSxNQUFNLEVBQUcsaUNBQWdDbFIsSUFBSSxDQUFDa1IsTUFBTyxHQUZqRDtBQUdKbUMsSUFBQUEsTUFBTSxFQUFHLGlDQUFnQ3JULElBQUksQ0FBQ3FULE1BQU8sR0FIakQ7QUFJSkMsSUFBQUEsT0FBTyxFQUFHLGlDQUFnQ3RULElBQUksQ0FBQ3NULE9BQVEsR0FKbkQ7QUFLSmdXLElBQUFBLE9BQU8sRUFBRyxpQ0FBZ0N0cEIsSUFBSSxDQUFDc3BCLE9BQVEsR0FMbkQ7QUFNSmxTLElBQUFBLE9BQU8sRUFBRyxpQ0FBZ0NwWCxJQUFJLENBQUNvWCxPQUFRO0FBTm5EO0FBREUsQ0FBZDtBQVdBLGlFQUFlbkcsS0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQkE7O0FBY0EsU0FBU3lJLFFBQVQsQ0FBcUI2UCxZQUFyQixFQUF1RDtBQUNyRCxRQUFNO0FBQUEsT0FBQzFrQyxLQUFEO0FBQUEsT0FBUTJrQztBQUFSLE1BQW9CbHFCLCtDQUFRLENBQXNCaXFCLFlBQXRCLENBQWxDO0FBQ0EsUUFBTUUsUUFBUSxHQUFHN3pCLGtEQUFXLENBQUVqQyxDQUFELElBQU87QUFDbEM2MUIsSUFBQUEsUUFBUSxDQUFDNzFCLENBQUMsQ0FBQzVOLE1BQUYsQ0FBU2xCLEtBQVYsQ0FBUjtBQUNELEdBRjJCLEVBRXpCLEVBRnlCLENBQTVCO0FBR0EsU0FBTyxDQUFDQSxLQUFELEVBQVE0a0MsUUFBUixFQUFrQkQsUUFBbEIsQ0FBUDtBQUNEOztBQUVELGlFQUFlOVAsUUFBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QkE7O0FBSUEsU0FBU3BILFNBQVQsQ0FBbUJpWCxZQUFuQixFQUF5RDtBQUN2RCxRQUFNO0FBQUEsT0FBQzFrQyxLQUFEO0FBQUEsT0FBUTJrQztBQUFSLE1BQW9CbHFCLCtDQUFRLENBQXNCaXFCLFlBQXRCLENBQWxDO0FBQ0EsUUFBTUcsUUFBUSxHQUFHOXpCLGtEQUFXLENBQUMsTUFBTTtBQUNqQzR6QixJQUFBQSxRQUFRLENBQUUza0MsS0FBRCxJQUFXLENBQUNBLEtBQWIsQ0FBUjtBQUNELEdBRjJCLEVBRXpCLEVBRnlCLENBQTVCO0FBR0EsU0FBTyxDQUFDQSxLQUFELEVBQVE2a0MsUUFBUixFQUFrQkYsUUFBbEIsQ0FBUDtBQUNEOztBQUVELGlFQUFlbFgsU0FBZjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQSwyR0FBK0M7Ozs7Ozs7Ozs7O0FDQS9DLHlHQUE4Qzs7Ozs7Ozs7Ozs7O0FDQTlDOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7OztBQ0FBOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L2ltYWdlLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvbGluay5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaC5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3JlcXVlc3QtaWRsZS1jYWxsYmFjay5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3JvdXRlLWxvYWRlci5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3JvdXRlci5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3VzZS1pbnRlcnNlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC93aXRoLXJvdXRlci5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvcm91dGVyLmpzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvQ29tbWVudExpc3QvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvQ29tbWVudExpc3Qvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9EZXRhaWxJdGVtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0RldGFpbEl0ZW0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9EZXRhaWxTa2VsZXRvbi9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9EZXRhaWxTa2VsZXRvbi9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0Zvb3Rlci9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Gb290ZXIvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9IZWFkZXJJdGVtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0hlYWRlckl0ZW0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9LYWthb21hcC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9LYWthb21hcC9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0xheW91dC9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9MYXlvdXQvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9TdWJJdGVtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1N1Ykl0ZW0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Ub3VyQ291cnNlL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1RvdXJDb3Vyc2Uvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Ub3VyQ3VsdHVyZS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Ub3VyRXZlbnQvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91ckZvb2QvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91ck1hbGwvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91clNsZWVwL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL1RvdXJTcG9ydHMvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvVG91clNwb3QvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbnRhaW5lcnMvQ29tbWVudEZvcm0vaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbnRhaW5lcnMvQ29tbWVudEZvcm0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9Db21tZW50SXRlbS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9Db21tZW50SXRlbS9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL0VkaXRGb3JtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL0VkaXRGb3JtL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbnRhaW5lcnMvTmF2YmFyL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL05hdmJhci9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL1NlYXJjaEZvcm0vaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbnRhaW5lcnMvU2VhcmNoRm9ybS9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2NvbW1lbnQvYWN0aW9uLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvY29tbWVudC9pbmRleC50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2NvbW1lbnQvcmVkdWNlci50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2NvbW1lbnQvc2FnYS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2RldGFpbC9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvcmVkdWNlci50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2RldGFpbC9zYWdhLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy91c2VyL2FjdGlvbi50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL3VzZXIvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy91c2VyL3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy91c2VyL3NhZ2EudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvcGFnZXMvX2FwcC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvcGFnZXMvZGV0YWlsL1suLi5pZF0udHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3R5bGVzL0dsb2JhbFN0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3R5bGVzL2NvbW1vbi50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3N0eWxlcy90aGVtZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3V0aWxzL3VzZUlucHV0LnRzIiwid2VicGFjazovL2Zyb250Ly4vdXRpbHMvdXNlVG9nZ2xlLnRzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9saW5rLmpzIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwiQGFudC1kZXNpZ24vaWNvbnNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcImFudGRcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcImF4aW9zXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJpbW1lclwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC1yZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0LXJlZHV4LXdyYXBwZXJcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zZXJ2ZXIvZGVub3JtYWxpemUtcGFnZS1wYXRoLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2VydmVyL2ltYWdlLWNvbmZpZy5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvaGVhZC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGguanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL21pdHQuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci1jb250ZXh0LmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9wYXJzZS1yZWxhdGl2ZS11cmwuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZy5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9yb3V0ZS1yZWdleC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdG8tYmFzZS02NC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdXRpbHMuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvaGVhZFwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9yb3V0ZXJcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlYWN0XCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWFjdC1pc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVhY3QtcmVkdXhcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXhcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXgtc2FnYVwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXgtc2FnYS9lZmZlY3RzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJzdHlsZWQtY29tcG9uZW50c1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwic3R5bGVkLXJlc2V0XCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJzd2VldGFsZXJ0MlwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwidHlwZXNhZmUtYWN0aW9uc1wiIiwid2VicGFjazovL2Zyb250L2lnbm9yZWR8QzpcXHRvdXJcXGZyb250XFxub2RlX21vZHVsZXNcXG5leHRcXGRpc3RcXHNoYXJlZFxcbGliXFxyb3V0ZXJ8Li91dGlscy9yZXNvbHZlLXJld3JpdGVzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gSW1hZ2UxO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfaGVhZCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3NoYXJlZC9saWIvaGVhZFwiKSk7XG52YXIgX3RvQmFzZTY0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvdG8tYmFzZS02NFwiKTtcbnZhciBfaW1hZ2VDb25maWcgPSByZXF1aXJlKFwiLi4vc2VydmVyL2ltYWdlLWNvbmZpZ1wiKTtcbnZhciBfdXNlSW50ZXJzZWN0aW9uID0gcmVxdWlyZShcIi4vdXNlLWludGVyc2VjdGlvblwiKTtcbmZ1bmN0aW9uIF9kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoa2V5IGluIG9iaikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuZnVuY3Rpb24gX29iamVjdFNwcmVhZCh0YXJnZXQpIHtcbiAgICBmb3IodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXSAhPSBudWxsID8gYXJndW1lbnRzW2ldIDoge1xuICAgICAgICB9O1xuICAgICAgICB2YXIgb3duS2V5cyA9IE9iamVjdC5rZXlzKHNvdXJjZSk7XG4gICAgICAgIGlmICh0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBvd25LZXlzID0gb3duS2V5cy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpLmZpbHRlcihmdW5jdGlvbihzeW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHN5bSkuZW51bWVyYWJsZTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBvd25LZXlzLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICBfZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHNvdXJjZVtrZXldKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoc291cmNlLCBleGNsdWRlZCkge1xuICAgIGlmIChzb3VyY2UgPT0gbnVsbCkgcmV0dXJuIHtcbiAgICB9O1xuICAgIHZhciB0YXJnZXQgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKTtcbiAgICB2YXIga2V5LCBpO1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgICAgIHZhciBzb3VyY2VTeW1ib2xLZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhzb3VyY2UpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBzb3VyY2VTeW1ib2xLZXlzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGtleSA9IHNvdXJjZVN5bWJvbEtleXNbaV07XG4gICAgICAgICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoc291cmNlLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIF9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7XG4gICAgfTtcbiAgICB2YXIgdGFyZ2V0ID0ge1xuICAgIH07XG4gICAgdmFyIHNvdXJjZUtleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICAgIHZhciBrZXksIGk7XG4gICAgZm9yKGkgPSAwOyBpIDwgc291cmNlS2V5cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGtleSA9IHNvdXJjZUtleXNbaV07XG4gICAgICAgIGlmIChleGNsdWRlZC5pbmRleE9mKGtleSkgPj0gMCkgY29udGludWU7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5jb25zdCBsb2FkZWRJbWFnZVVSTHMgPSBuZXcgU2V0KCk7XG5pZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBnbG9iYWwuX19ORVhUX0lNQUdFX0lNUE9SVEVEID0gdHJ1ZTtcbn1cbmNvbnN0IFZBTElEX0xPQURJTkdfVkFMVUVTID0gW1xuICAgICdsYXp5JyxcbiAgICAnZWFnZXInLFxuICAgIHVuZGVmaW5lZFxuXTtcbmNvbnN0IGxvYWRlcnMgPSBuZXcgTWFwKFtcbiAgICBbXG4gICAgICAgICdkZWZhdWx0JyxcbiAgICAgICAgZGVmYXVsdExvYWRlclxuICAgIF0sXG4gICAgW1xuICAgICAgICAnaW1naXgnLFxuICAgICAgICBpbWdpeExvYWRlclxuICAgIF0sXG4gICAgW1xuICAgICAgICAnY2xvdWRpbmFyeScsXG4gICAgICAgIGNsb3VkaW5hcnlMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2FrYW1haScsXG4gICAgICAgIGFrYW1haUxvYWRlclxuICAgIF0sXG4gICAgW1xuICAgICAgICAnY3VzdG9tJyxcbiAgICAgICAgY3VzdG9tTG9hZGVyXG4gICAgXSwgXG5dKTtcbmNvbnN0IFZBTElEX0xBWU9VVF9WQUxVRVMgPSBbXG4gICAgJ2ZpbGwnLFxuICAgICdmaXhlZCcsXG4gICAgJ2ludHJpbnNpYycsXG4gICAgJ3Jlc3BvbnNpdmUnLFxuICAgIHVuZGVmaW5lZCwgXG5dO1xuZnVuY3Rpb24gaXNTdGF0aWNSZXF1aXJlKHNyYykge1xuICAgIHJldHVybiBzcmMuZGVmYXVsdCAhPT0gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gaXNTdGF0aWNJbWFnZURhdGEoc3JjKSB7XG4gICAgcmV0dXJuIHNyYy5zcmMgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGlzU3RhdGljSW1wb3J0KHNyYykge1xuICAgIHJldHVybiB0eXBlb2Ygc3JjID09PSAnb2JqZWN0JyAmJiAoaXNTdGF0aWNSZXF1aXJlKHNyYykgfHwgaXNTdGF0aWNJbWFnZURhdGEoc3JjKSk7XG59XG5jb25zdCB7IGRldmljZVNpemVzOiBjb25maWdEZXZpY2VTaXplcyAsIGltYWdlU2l6ZXM6IGNvbmZpZ0ltYWdlU2l6ZXMgLCBsb2FkZXI6IGNvbmZpZ0xvYWRlciAsIHBhdGg6IGNvbmZpZ1BhdGggLCBkb21haW5zOiBjb25maWdEb21haW5zICwgIH0gPSBwcm9jZXNzLmVudi5fX05FWFRfSU1BR0VfT1BUUyB8fCBfaW1hZ2VDb25maWcuaW1hZ2VDb25maWdEZWZhdWx0O1xuLy8gc29ydCBzbWFsbGVzdCB0byBsYXJnZXN0XG5jb25zdCBhbGxTaXplcyA9IFtcbiAgICAuLi5jb25maWdEZXZpY2VTaXplcyxcbiAgICAuLi5jb25maWdJbWFnZVNpemVzXG5dO1xuY29uZmlnRGV2aWNlU2l6ZXMuc29ydCgoYSwgYik9PmEgLSBiXG4pO1xuYWxsU2l6ZXMuc29ydCgoYSwgYik9PmEgLSBiXG4pO1xuZnVuY3Rpb24gZ2V0V2lkdGhzKHdpZHRoLCBsYXlvdXQsIHNpemVzKSB7XG4gICAgaWYgKHNpemVzICYmIChsYXlvdXQgPT09ICdmaWxsJyB8fCBsYXlvdXQgPT09ICdyZXNwb25zaXZlJykpIHtcbiAgICAgICAgLy8gRmluZCBhbGwgdGhlIFwidndcIiBwZXJjZW50IHNpemVzIHVzZWQgaW4gdGhlIHNpemVzIHByb3BcbiAgICAgICAgY29uc3Qgdmlld3BvcnRXaWR0aFJlID0gLyhefFxccykoMT9cXGQ/XFxkKXZ3L2c7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRTaXplcyA9IFtdO1xuICAgICAgICBmb3IobGV0IG1hdGNoOyBtYXRjaCA9IHZpZXdwb3J0V2lkdGhSZS5leGVjKHNpemVzKTsgbWF0Y2gpe1xuICAgICAgICAgICAgcGVyY2VudFNpemVzLnB1c2gocGFyc2VJbnQobWF0Y2hbMl0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGVyY2VudFNpemVzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgc21hbGxlc3RSYXRpbyA9IE1hdGgubWluKC4uLnBlcmNlbnRTaXplcykgKiAwLjAxO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB3aWR0aHM6IGFsbFNpemVzLmZpbHRlcigocyk9PnMgPj0gY29uZmlnRGV2aWNlU2l6ZXNbMF0gKiBzbWFsbGVzdFJhdGlvXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICBraW5kOiAndydcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoczogYWxsU2l6ZXMsXG4gICAgICAgICAgICBraW5kOiAndydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aWR0aCAhPT0gJ251bWJlcicgfHwgbGF5b3V0ID09PSAnZmlsbCcgfHwgbGF5b3V0ID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoczogY29uZmlnRGV2aWNlU2l6ZXMsXG4gICAgICAgICAgICBraW5kOiAndydcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3Qgd2lkdGhzID0gW1xuICAgICAgICAuLi5uZXcgU2V0KC8vID4gVGhpcyBtZWFucyB0aGF0IG1vc3QgT0xFRCBzY3JlZW5zIHRoYXQgc2F5IHRoZXkgYXJlIDN4IHJlc29sdXRpb24sXG4gICAgICAgIC8vID4gYXJlIGFjdHVhbGx5IDN4IGluIHRoZSBncmVlbiBjb2xvciwgYnV0IG9ubHkgMS41eCBpbiB0aGUgcmVkIGFuZFxuICAgICAgICAvLyA+IGJsdWUgY29sb3JzLiBTaG93aW5nIGEgM3ggcmVzb2x1dGlvbiBpbWFnZSBpbiB0aGUgYXBwIHZzIGEgMnhcbiAgICAgICAgLy8gPiByZXNvbHV0aW9uIGltYWdlIHdpbGwgYmUgdmlzdWFsbHkgdGhlIHNhbWUsIHRob3VnaCB0aGUgM3ggaW1hZ2VcbiAgICAgICAgLy8gPiB0YWtlcyBzaWduaWZpY2FudGx5IG1vcmUgZGF0YS4gRXZlbiB0cnVlIDN4IHJlc29sdXRpb24gc2NyZWVucyBhcmVcbiAgICAgICAgLy8gPiB3YXN0ZWZ1bCBhcyB0aGUgaHVtYW4gZXllIGNhbm5vdCBzZWUgdGhhdCBsZXZlbCBvZiBkZXRhaWwgd2l0aG91dFxuICAgICAgICAvLyA+IHNvbWV0aGluZyBsaWtlIGEgbWFnbmlmeWluZyBnbGFzcy5cbiAgICAgICAgLy8gaHR0cHM6Ly9ibG9nLnR3aXR0ZXIuY29tL2VuZ2luZWVyaW5nL2VuX3VzL3RvcGljcy9pbmZyYXN0cnVjdHVyZS8yMDE5L2NhcHBpbmctaW1hZ2UtZmlkZWxpdHktb24tdWx0cmEtaGlnaC1yZXNvbHV0aW9uLWRldmljZXMuaHRtbFxuICAgICAgICBbXG4gICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgIHdpZHRoICogMiAvKiwgd2lkdGggKiAzKi8gXG4gICAgICAgIF0ubWFwKCh3KT0+YWxsU2l6ZXMuZmluZCgocCk9PnAgPj0gd1xuICAgICAgICAgICAgKSB8fCBhbGxTaXplc1thbGxTaXplcy5sZW5ndGggLSAxXVxuICAgICAgICApKSwgXG4gICAgXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aHMsXG4gICAgICAgIGtpbmQ6ICd4J1xuICAgIH07XG59XG5mdW5jdGlvbiBnZW5lcmF0ZUltZ0F0dHJzKHsgc3JjICwgdW5vcHRpbWl6ZWQgLCBsYXlvdXQgLCB3aWR0aCAsIHF1YWxpdHkgLCBzaXplcyAsIGxvYWRlciAgfSkge1xuICAgIGlmICh1bm9wdGltaXplZCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgc3JjU2V0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzaXplczogdW5kZWZpbmVkXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHsgd2lkdGhzICwga2luZCAgfSA9IGdldFdpZHRocyh3aWR0aCwgbGF5b3V0LCBzaXplcyk7XG4gICAgY29uc3QgbGFzdCA9IHdpZHRocy5sZW5ndGggLSAxO1xuICAgIHJldHVybiB7XG4gICAgICAgIHNpemVzOiAhc2l6ZXMgJiYga2luZCA9PT0gJ3cnID8gJzEwMHZ3JyA6IHNpemVzLFxuICAgICAgICBzcmNTZXQ6IHdpZHRocy5tYXAoKHcsIGkpPT5gJHtsb2FkZXIoe1xuICAgICAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgICAgICBxdWFsaXR5LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3XG4gICAgICAgICAgICB9KX0gJHtraW5kID09PSAndycgPyB3IDogaSArIDF9JHtraW5kfWBcbiAgICAgICAgKS5qb2luKCcsICcpLFxuICAgICAgICAvLyBJdCdzIGludGVuZGVkIHRvIGtlZXAgYHNyY2AgdGhlIGxhc3QgYXR0cmlidXRlIGJlY2F1c2UgUmVhY3QgdXBkYXRlc1xuICAgICAgICAvLyBhdHRyaWJ1dGVzIGluIG9yZGVyLiBJZiB3ZSBrZWVwIGBzcmNgIHRoZSBmaXJzdCBvbmUsIFNhZmFyaSB3aWxsXG4gICAgICAgIC8vIGltbWVkaWF0ZWx5IHN0YXJ0IHRvIGZldGNoIGBzcmNgLCBiZWZvcmUgYHNpemVzYCBhbmQgYHNyY1NldGAgYXJlIGV2ZW5cbiAgICAgICAgLy8gdXBkYXRlZCBieSBSZWFjdC4gVGhhdCBjYXVzZXMgbXVsdGlwbGUgdW5uZWNlc3NhcnkgcmVxdWVzdHMgaWYgYHNyY1NldGBcbiAgICAgICAgLy8gYW5kIGBzaXplc2AgYXJlIGRlZmluZWQuXG4gICAgICAgIC8vIFRoaXMgYnVnIGNhbm5vdCBiZSByZXByb2R1Y2VkIGluIENocm9tZSBvciBGaXJlZm94LlxuICAgICAgICBzcmM6IGxvYWRlcih7XG4gICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICBxdWFsaXR5LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoc1tsYXN0XVxuICAgICAgICB9KVxuICAgIH07XG59XG5mdW5jdGlvbiBnZXRJbnQoeCkge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHgsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRJbWFnZUxvYWRlcihsb2FkZXJQcm9wcykge1xuICAgIGNvbnN0IGxvYWQgPSBsb2FkZXJzLmdldChjb25maWdMb2FkZXIpO1xuICAgIGlmIChsb2FkKSB7XG4gICAgICAgIHJldHVybiBsb2FkKF9vYmplY3RTcHJlYWQoe1xuICAgICAgICAgICAgcm9vdDogY29uZmlnUGF0aFxuICAgICAgICB9LCBsb2FkZXJQcm9wcykpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoYFVua25vd24gXCJsb2FkZXJcIiBmb3VuZCBpbiBcIm5leHQuY29uZmlnLmpzXCIuIEV4cGVjdGVkOiAke19pbWFnZUNvbmZpZy5WQUxJRF9MT0FERVJTLmpvaW4oJywgJyl9LiBSZWNlaXZlZDogJHtjb25maWdMb2FkZXJ9YCk7XG59XG4vLyBTZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xLzM5Nzc3ODMzLzI2NjUzNSBmb3Igd2h5IHdlIHVzZSB0aGlzIHJlZlxuLy8gaGFuZGxlciBpbnN0ZWFkIG9mIHRoZSBpbWcncyBvbkxvYWQgYXR0cmlidXRlLlxuZnVuY3Rpb24gaGFuZGxlTG9hZGluZyhpbWcsIHNyYywgbGF5b3V0LCBwbGFjZWhvbGRlciwgb25Mb2FkaW5nQ29tcGxldGUpIHtcbiAgICBpZiAoIWltZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGhhbmRsZUxvYWQgPSAoKT0+e1xuICAgICAgICBpZiAoIWltZy5zcmMuc3RhcnRzV2l0aCgnZGF0YTonKSkge1xuICAgICAgICAgICAgY29uc3QgcCA9ICdkZWNvZGUnIGluIGltZyA/IGltZy5kZWNvZGUoKSA6IFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgcC5jYXRjaCgoKT0+e1xuICAgICAgICAgICAgfSkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlciA9PT0gJ2JsdXInKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5maWx0ZXIgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdub25lJztcbiAgICAgICAgICAgICAgICAgICAgaW1nLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9hZGVkSW1hZ2VVUkxzLmFkZChzcmMpO1xuICAgICAgICAgICAgICAgIGlmIChvbkxvYWRpbmdDb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IG5hdHVyYWxXaWR0aCAsIG5hdHVyYWxIZWlnaHQgIH0gPSBpbWc7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBhc3MgYmFjayByZWFkLW9ubHkgcHJpbWl0aXZlIHZhbHVlcyBidXQgbm90IHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB1bmRlcmx5aW5nIERPTSBlbGVtZW50IGJlY2F1c2UgaXQgY291bGQgYmUgbWlzdXNlZC5cbiAgICAgICAgICAgICAgICAgICAgb25Mb2FkaW5nQ29tcGxldGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbmF0dXJhbFdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmF0dXJhbEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChyZWYgPSBpbWcucGFyZW50RWxlbWVudCkgPT09IG51bGwgfHwgcmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZWYucGFyZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50ID0gZ2V0Q29tcHV0ZWRTdHlsZShpbWcucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYXlvdXQgPT09ICdyZXNwb25zaXZlJyAmJiBwYXJlbnQuZGlzcGxheSA9PT0gJ2ZsZXgnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG1heSBub3QgcmVuZGVyIHByb3Blcmx5IGFzIGEgY2hpbGQgb2YgYSBmbGV4IGNvbnRhaW5lci4gQ29uc2lkZXIgd3JhcHBpbmcgdGhlIGltYWdlIHdpdGggYSBkaXYgdG8gY29uZmlndXJlIHRoZSB3aWR0aC5gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnZmlsbCcgJiYgcGFyZW50LnBvc2l0aW9uICE9PSAncmVsYXRpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG1heSBub3QgcmVuZGVyIHByb3Blcmx5IHdpdGggYSBwYXJlbnQgdXNpbmcgcG9zaXRpb246XCIke3BhcmVudC5wb3NpdGlvbn1cIi4gQ29uc2lkZXIgY2hhbmdpbmcgdGhlIHBhcmVudCBzdHlsZSB0byBwb3NpdGlvbjpcInJlbGF0aXZlXCIgd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKGltZy5jb21wbGV0ZSkge1xuICAgICAgICAvLyBJZiB0aGUgcmVhbCBpbWFnZSBmYWlscyB0byBsb2FkLCB0aGlzIHdpbGwgc3RpbGwgcmVtb3ZlIHRoZSBwbGFjZWhvbGRlci5cbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgZGVzaXJlZCBiZWhhdmlvciBmb3Igbm93LCBhbmQgd2lsbCBiZSByZXZpc2l0ZWQgd2hlbiBlcnJvclxuICAgICAgICAvLyBoYW5kbGluZyBpcyB3b3JrZWQgb24gZm9yIHRoZSBpbWFnZSBjb21wb25lbnQgaXRzZWxmLlxuICAgICAgICBoYW5kbGVMb2FkKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaW1nLm9ubG9hZCA9IGhhbmRsZUxvYWQ7XG4gICAgfVxufVxuZnVuY3Rpb24gSW1hZ2UxKF9wYXJhbSkge1xuICAgIHZhciB7IHNyYyAsIHNpemVzICwgdW5vcHRpbWl6ZWQgPWZhbHNlICwgcHJpb3JpdHkgPWZhbHNlICwgbG9hZGluZyAsIGxhenlCb3VuZGFyeSA9JzIwMHB4JyAsIGNsYXNzTmFtZSAsIHF1YWxpdHkgLCB3aWR0aCAsIGhlaWdodCAsIG9iamVjdEZpdCAsIG9iamVjdFBvc2l0aW9uICwgb25Mb2FkaW5nQ29tcGxldGUgLCBsb2FkZXIgPWRlZmF1bHRJbWFnZUxvYWRlciAsIHBsYWNlaG9sZGVyID0nZW1wdHknICwgYmx1ckRhdGFVUkwgIH0gPSBfcGFyYW0sIGFsbCA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhfcGFyYW0sIFtcInNyY1wiLCBcInNpemVzXCIsIFwidW5vcHRpbWl6ZWRcIiwgXCJwcmlvcml0eVwiLCBcImxvYWRpbmdcIiwgXCJsYXp5Qm91bmRhcnlcIiwgXCJjbGFzc05hbWVcIiwgXCJxdWFsaXR5XCIsIFwid2lkdGhcIiwgXCJoZWlnaHRcIiwgXCJvYmplY3RGaXRcIiwgXCJvYmplY3RQb3NpdGlvblwiLCBcIm9uTG9hZGluZ0NvbXBsZXRlXCIsIFwibG9hZGVyXCIsIFwicGxhY2Vob2xkZXJcIiwgXCJibHVyRGF0YVVSTFwiXSk7XG4gICAgbGV0IHJlc3QgPSBhbGw7XG4gICAgbGV0IGxheW91dCA9IHNpemVzID8gJ3Jlc3BvbnNpdmUnIDogJ2ludHJpbnNpYyc7XG4gICAgaWYgKCdsYXlvdXQnIGluIHJlc3QpIHtcbiAgICAgICAgLy8gT3ZlcnJpZGUgZGVmYXVsdCBsYXlvdXQgaWYgdGhlIHVzZXIgc3BlY2lmaWVkIG9uZTpcbiAgICAgICAgaWYgKHJlc3QubGF5b3V0KSBsYXlvdXQgPSByZXN0LmxheW91dDtcbiAgICAgICAgLy8gUmVtb3ZlIHByb3BlcnR5IHNvIGl0J3Mgbm90IHNwcmVhZCBpbnRvIGltYWdlOlxuICAgICAgICBkZWxldGUgcmVzdFsnbGF5b3V0J107XG4gICAgfVxuICAgIGxldCBzdGF0aWNTcmMgPSAnJztcbiAgICBpZiAoaXNTdGF0aWNJbXBvcnQoc3JjKSkge1xuICAgICAgICBjb25zdCBzdGF0aWNJbWFnZURhdGEgPSBpc1N0YXRpY1JlcXVpcmUoc3JjKSA/IHNyYy5kZWZhdWx0IDogc3JjO1xuICAgICAgICBpZiAoIXN0YXRpY0ltYWdlRGF0YS5zcmMpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQW4gb2JqZWN0IHNob3VsZCBvbmx5IGJlIHBhc3NlZCB0byB0aGUgaW1hZ2UgY29tcG9uZW50IHNyYyBwYXJhbWV0ZXIgaWYgaXQgY29tZXMgZnJvbSBhIHN0YXRpYyBpbWFnZSBpbXBvcnQuIEl0IG11c3QgaW5jbHVkZSBzcmMuIFJlY2VpdmVkICR7SlNPTi5zdHJpbmdpZnkoc3RhdGljSW1hZ2VEYXRhKX1gKTtcbiAgICAgICAgfVxuICAgICAgICBibHVyRGF0YVVSTCA9IGJsdXJEYXRhVVJMIHx8IHN0YXRpY0ltYWdlRGF0YS5ibHVyRGF0YVVSTDtcbiAgICAgICAgc3RhdGljU3JjID0gc3RhdGljSW1hZ2VEYXRhLnNyYztcbiAgICAgICAgaWYgKCFsYXlvdXQgfHwgbGF5b3V0ICE9PSAnZmlsbCcpIHtcbiAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCB8fCBzdGF0aWNJbWFnZURhdGEuaGVpZ2h0O1xuICAgICAgICAgICAgd2lkdGggPSB3aWR0aCB8fCBzdGF0aWNJbWFnZURhdGEud2lkdGg7XG4gICAgICAgICAgICBpZiAoIXN0YXRpY0ltYWdlRGF0YS5oZWlnaHQgfHwgIXN0YXRpY0ltYWdlRGF0YS53aWR0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQW4gb2JqZWN0IHNob3VsZCBvbmx5IGJlIHBhc3NlZCB0byB0aGUgaW1hZ2UgY29tcG9uZW50IHNyYyBwYXJhbWV0ZXIgaWYgaXQgY29tZXMgZnJvbSBhIHN0YXRpYyBpbWFnZSBpbXBvcnQuIEl0IG11c3QgaW5jbHVkZSBoZWlnaHQgYW5kIHdpZHRoLiBSZWNlaXZlZCAke0pTT04uc3RyaW5naWZ5KHN0YXRpY0ltYWdlRGF0YSl9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3JjID0gdHlwZW9mIHNyYyA9PT0gJ3N0cmluZycgPyBzcmMgOiBzdGF0aWNTcmM7XG4gICAgY29uc3Qgd2lkdGhJbnQgPSBnZXRJbnQod2lkdGgpO1xuICAgIGNvbnN0IGhlaWdodEludCA9IGdldEludChoZWlnaHQpO1xuICAgIGNvbnN0IHF1YWxpdHlJbnQgPSBnZXRJbnQocXVhbGl0eSk7XG4gICAgbGV0IGlzTGF6eSA9ICFwcmlvcml0eSAmJiAobG9hZGluZyA9PT0gJ2xhenknIHx8IHR5cGVvZiBsb2FkaW5nID09PSAndW5kZWZpbmVkJyk7XG4gICAgaWYgKHNyYy5zdGFydHNXaXRoKCdkYXRhOicpIHx8IHNyYy5zdGFydHNXaXRoKCdibG9iOicpKSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0hUVFAvQmFzaWNzX29mX0hUVFAvRGF0YV9VUklzXG4gICAgICAgIHVub3B0aW1pemVkID0gdHJ1ZTtcbiAgICAgICAgaXNMYXp5ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiBsb2FkZWRJbWFnZVVSTHMuaGFzKHNyYykpIHtcbiAgICAgICAgaXNMYXp5ID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGlmICghc3JjKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIGlzIG1pc3NpbmcgcmVxdWlyZWQgXCJzcmNcIiBwcm9wZXJ0eS4gTWFrZSBzdXJlIHlvdSBwYXNzIFwic3JjXCIgaW4gcHJvcHMgdG8gdGhlIFxcYG5leHQvaW1hZ2VcXGAgY29tcG9uZW50LiBSZWNlaXZlZDogJHtKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHF1YWxpdHlcbiAgICAgICAgICAgIH0pfWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghVkFMSURfTEFZT1VUX1ZBTFVFUy5pbmNsdWRlcyhsYXlvdXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGludmFsaWQgXCJsYXlvdXRcIiBwcm9wZXJ0eS4gUHJvdmlkZWQgXCIke2xheW91dH1cIiBzaG91bGQgYmUgb25lIG9mICR7VkFMSURfTEFZT1VUX1ZBTFVFUy5tYXAoU3RyaW5nKS5qb2luKCcsJyl9LmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygd2lkdGhJbnQgIT09ICd1bmRlZmluZWQnICYmIGlzTmFOKHdpZHRoSW50KSB8fCB0eXBlb2YgaGVpZ2h0SW50ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hTihoZWlnaHRJbnQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGludmFsaWQgXCJ3aWR0aFwiIG9yIFwiaGVpZ2h0XCIgcHJvcGVydHkuIFRoZXNlIHNob3VsZCBiZSBudW1lcmljIHZhbHVlcy5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGF5b3V0ID09PSAnZmlsbCcgJiYgKHdpZHRoIHx8IGhlaWdodCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBhbmQgXCJsYXlvdXQ9J2ZpbGwnXCIgaGFzIHVudXNlZCBwcm9wZXJ0aWVzIGFzc2lnbmVkLiBQbGVhc2UgcmVtb3ZlIFwid2lkdGhcIiBhbmQgXCJoZWlnaHRcIi5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVZBTElEX0xPQURJTkdfVkFMVUVTLmluY2x1ZGVzKGxvYWRpbmcpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGludmFsaWQgXCJsb2FkaW5nXCIgcHJvcGVydHkuIFByb3ZpZGVkIFwiJHtsb2FkaW5nfVwiIHNob3VsZCBiZSBvbmUgb2YgJHtWQUxJRF9MT0FESU5HX1ZBTFVFUy5tYXAoU3RyaW5nKS5qb2luKCcsJyl9LmApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmlvcml0eSAmJiBsb2FkaW5nID09PSAnbGF6eScpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgYm90aCBcInByaW9yaXR5XCIgYW5kIFwibG9hZGluZz0nbGF6eSdcIiBwcm9wZXJ0aWVzLiBPbmx5IG9uZSBzaG91bGQgYmUgdXNlZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGxhY2Vob2xkZXIgPT09ICdibHVyJykge1xuICAgICAgICAgICAgaWYgKGxheW91dCAhPT0gJ2ZpbGwnICYmICh3aWR0aEludCB8fCAwKSAqIChoZWlnaHRJbnQgfHwgMCkgPCAxNjAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGlzIHNtYWxsZXIgdGhhbiA0MHg0MC4gQ29uc2lkZXIgcmVtb3ZpbmcgdGhlIFwicGxhY2Vob2xkZXI9J2JsdXInXCIgcHJvcGVydHkgdG8gaW1wcm92ZSBwZXJmb3JtYW5jZS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghYmx1ckRhdGFVUkwpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBWQUxJRF9CTFVSX0VYVCA9IFtcbiAgICAgICAgICAgICAgICAgICAgJ2pwZWcnLFxuICAgICAgICAgICAgICAgICAgICAncG5nJyxcbiAgICAgICAgICAgICAgICAgICAgJ3dlYnAnXG4gICAgICAgICAgICAgICAgXSAvLyBzaG91bGQgbWF0Y2ggbmV4dC1pbWFnZS1sb2FkZXJcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBcInBsYWNlaG9sZGVyPSdibHVyJ1wiIHByb3BlcnR5IGJ1dCBpcyBtaXNzaW5nIHRoZSBcImJsdXJEYXRhVVJMXCIgcHJvcGVydHkuXG4gICAgICAgICAgUG9zc2libGUgc29sdXRpb25zOlxuICAgICAgICAgICAgLSBBZGQgYSBcImJsdXJEYXRhVVJMXCIgcHJvcGVydHksIHRoZSBjb250ZW50cyBzaG91bGQgYmUgYSBzbWFsbCBEYXRhIFVSTCB0byByZXByZXNlbnQgdGhlIGltYWdlXG4gICAgICAgICAgICAtIENoYW5nZSB0aGUgXCJzcmNcIiBwcm9wZXJ0eSB0byBhIHN0YXRpYyBpbXBvcnQgd2l0aCBvbmUgb2YgdGhlIHN1cHBvcnRlZCBmaWxlIHR5cGVzOiAke1ZBTElEX0JMVVJfRVhULmpvaW4oJywnKX1cbiAgICAgICAgICAgIC0gUmVtb3ZlIHRoZSBcInBsYWNlaG9sZGVyXCIgcHJvcGVydHksIGVmZmVjdGl2ZWx5IG5vIGJsdXIgZWZmZWN0XG4gICAgICAgICAgUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9wbGFjZWhvbGRlci1ibHVyLWRhdGEtdXJsYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdyZWYnIGluIHJlc3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBpcyB1c2luZyB1bnN1cHBvcnRlZCBcInJlZlwiIHByb3BlcnR5LiBDb25zaWRlciB1c2luZyB0aGUgXCJvbkxvYWRpbmdDb21wbGV0ZVwiIHByb3BlcnR5IGluc3RlYWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCdzdHlsZScgaW4gcmVzdCkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGlzIHVzaW5nIHVuc3VwcG9ydGVkIFwic3R5bGVcIiBwcm9wZXJ0eS4gUGxlYXNlIHVzZSB0aGUgXCJjbGFzc05hbWVcIiBwcm9wZXJ0eSBpbnN0ZWFkLmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKSArIDEwMDtcbiAgICAgICAgaWYgKCF1bm9wdGltaXplZCAmJiAhbG9hZGVyKHtcbiAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgIHdpZHRoOiByYW5kLFxuICAgICAgICAgICAgcXVhbGl0eTogNzVcbiAgICAgICAgfSkuaW5jbHVkZXMocmFuZC50b1N0cmluZygpKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBhIFwibG9hZGVyXCIgcHJvcGVydHkgdGhhdCBkb2VzIG5vdCBpbXBsZW1lbnQgd2lkdGguIFBsZWFzZSBpbXBsZW1lbnQgaXQgb3IgdXNlIHRoZSBcInVub3B0aW1pemVkXCIgcHJvcGVydHkgaW5zdGVhZC5gICsgYFxcblJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbmV4dC1pbWFnZS1taXNzaW5nLWxvYWRlci13aWR0aGApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IFtzZXRSZWYsIGlzSW50ZXJzZWN0ZWRdID0gKDAsIF91c2VJbnRlcnNlY3Rpb24pLnVzZUludGVyc2VjdGlvbih7XG4gICAgICAgIHJvb3RNYXJnaW46IGxhenlCb3VuZGFyeSxcbiAgICAgICAgZGlzYWJsZWQ6ICFpc0xhenlcbiAgICB9KTtcbiAgICBjb25zdCBpc1Zpc2libGUgPSAhaXNMYXp5IHx8IGlzSW50ZXJzZWN0ZWQ7XG4gICAgbGV0IHdyYXBwZXJTdHlsZTtcbiAgICBsZXQgc2l6ZXJTdHlsZTtcbiAgICBsZXQgc2l6ZXJTdmc7XG4gICAgbGV0IGltZ1N0eWxlID0ge1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgdG9wOiAwLFxuICAgICAgICBsZWZ0OiAwLFxuICAgICAgICBib3R0b206IDAsXG4gICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgcGFkZGluZzogMCxcbiAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgIG1hcmdpbjogJ2F1dG8nLFxuICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICBtaW5XaWR0aDogJzEwMCUnLFxuICAgICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgICBtaW5IZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgbWF4SGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIG9iamVjdEZpdCxcbiAgICAgICAgb2JqZWN0UG9zaXRpb25cbiAgICB9O1xuICAgIGNvbnN0IGJsdXJTdHlsZSA9IHBsYWNlaG9sZGVyID09PSAnYmx1cicgPyB7XG4gICAgICAgIGZpbHRlcjogJ2JsdXIoMjBweCknLFxuICAgICAgICBiYWNrZ3JvdW5kU2l6ZTogb2JqZWN0Rml0IHx8ICdjb3ZlcicsXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybChcIiR7Ymx1ckRhdGFVUkx9XCIpYCxcbiAgICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiBvYmplY3RQb3NpdGlvbiB8fCAnMCUgMCUnXG4gICAgfSA6IHtcbiAgICB9O1xuICAgIGlmIChsYXlvdXQgPT09ICdmaWxsJykge1xuICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiBsYXlvdXQ9XCJmaWxsXCIgLz5cbiAgICAgICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIGJvdHRvbTogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB3aWR0aEludCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGhlaWdodEludCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiAvPlxuICAgICAgICBjb25zdCBxdW90aWVudCA9IGhlaWdodEludCAvIHdpZHRoSW50O1xuICAgICAgICBjb25zdCBwYWRkaW5nVG9wID0gaXNOYU4ocXVvdGllbnQpID8gJzEwMCUnIDogYCR7cXVvdGllbnQgKiAxMDB9JWA7XG4gICAgICAgIGlmIChsYXlvdXQgPT09ICdyZXNwb25zaXZlJykge1xuICAgICAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJyZXNwb25zaXZlXCIgLz5cbiAgICAgICAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBtYXJnaW46IDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzaXplclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgcGFkZGluZ1RvcFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdpbnRyaW5zaWMnKSB7XG4gICAgICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIGxheW91dD1cImludHJpbnNpY1wiIC8+XG4gICAgICAgICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2l6ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJSdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzaXplclN2ZyA9IGA8c3ZnIHdpZHRoPVwiJHt3aWR0aEludH1cIiBoZWlnaHQ9XCIke2hlaWdodEludH1cIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgdmVyc2lvbj1cIjEuMVwiLz5gO1xuICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJmaXhlZFwiIC8+XG4gICAgICAgICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aEludCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodEludFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIC8+XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgbXVzdCB1c2UgXCJ3aWR0aFwiIGFuZCBcImhlaWdodFwiIHByb3BlcnRpZXMgb3IgXCJsYXlvdXQ9J2ZpbGwnXCIgcHJvcGVydHkuYCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGltZ0F0dHJpYnV0ZXMgPSB7XG4gICAgICAgIHNyYzogJ2RhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFBQUFBQUFQLy8veUg1QkFFQUFBQUFMQUFBQUFBQkFBRUFBQUlCUkFBNycsXG4gICAgICAgIHNyY1NldDogdW5kZWZpbmVkLFxuICAgICAgICBzaXplczogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgIGltZ0F0dHJpYnV0ZXMgPSBnZW5lcmF0ZUltZ0F0dHJzKHtcbiAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgIHVub3B0aW1pemVkLFxuICAgICAgICAgICAgbGF5b3V0LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoSW50LFxuICAgICAgICAgICAgcXVhbGl0eTogcXVhbGl0eUludCxcbiAgICAgICAgICAgIHNpemVzLFxuICAgICAgICAgICAgbG9hZGVyXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsZXQgc3JjU3RyaW5nID0gc3JjO1xuICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBzdHlsZTogd3JhcHBlclN0eWxlXG4gICAgfSwgc2l6ZXJTdHlsZSA/IC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImRpdlwiLCB7XG4gICAgICAgIHN0eWxlOiBzaXplclN0eWxlXG4gICAgfSwgc2l6ZXJTdmcgPyAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwge1xuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICBtYXJnaW46IDAsXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IDBcbiAgICAgICAgfSxcbiAgICAgICAgYWx0OiBcIlwiLFxuICAgICAgICBcImFyaWEtaGlkZGVuXCI6IHRydWUsXG4gICAgICAgIHNyYzogYGRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJHsoMCwgX3RvQmFzZTY0KS50b0Jhc2U2NChzaXplclN2Zyl9YFxuICAgIH0pIDogbnVsbCkgOiBudWxsLCAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIiwgT2JqZWN0LmFzc2lnbih7XG4gICAgfSwgcmVzdCwgaW1nQXR0cmlidXRlcywge1xuICAgICAgICBkZWNvZGluZzogXCJhc3luY1wiLFxuICAgICAgICBcImRhdGEtbmltZ1wiOiBsYXlvdXQsXG4gICAgICAgIGNsYXNzTmFtZTogY2xhc3NOYW1lLFxuICAgICAgICByZWY6IChpbWcpPT57XG4gICAgICAgICAgICBzZXRSZWYoaW1nKTtcbiAgICAgICAgICAgIGhhbmRsZUxvYWRpbmcoaW1nLCBzcmNTdHJpbmcsIGxheW91dCwgcGxhY2Vob2xkZXIsIG9uTG9hZGluZ0NvbXBsZXRlKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IF9vYmplY3RTcHJlYWQoe1xuICAgICAgICB9LCBpbWdTdHlsZSwgYmx1clN0eWxlKVxuICAgIH0pKSwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibm9zY3JpcHRcIiwgbnVsbCwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgIH0sIHJlc3QsIGdlbmVyYXRlSW1nQXR0cnMoe1xuICAgICAgICBzcmMsXG4gICAgICAgIHVub3B0aW1pemVkLFxuICAgICAgICBsYXlvdXQsXG4gICAgICAgIHdpZHRoOiB3aWR0aEludCxcbiAgICAgICAgcXVhbGl0eTogcXVhbGl0eUludCxcbiAgICAgICAgc2l6ZXMsXG4gICAgICAgIGxvYWRlclxuICAgIH0pLCB7XG4gICAgICAgIGRlY29kaW5nOiBcImFzeW5jXCIsXG4gICAgICAgIFwiZGF0YS1uaW1nXCI6IGxheW91dCxcbiAgICAgICAgc3R5bGU6IGltZ1N0eWxlLFxuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgbG9hZGluZzogbG9hZGluZyB8fCAnbGF6eSdcbiAgICB9KSkpLCBwcmlvcml0eSA/IC8vIE5vdGUgaG93IHdlIG9taXQgdGhlIGBocmVmYCBhdHRyaWJ1dGUsIGFzIGl0IHdvdWxkIG9ubHkgYmUgcmVsZXZhbnRcbiAgICAvLyBmb3IgYnJvd3NlcnMgdGhhdCBkbyBub3Qgc3VwcG9ydCBgaW1hZ2VzcmNzZXRgLCBhbmQgaW4gdGhvc2UgY2FzZXNcbiAgICAvLyBpdCB3b3VsZCBsaWtlbHkgY2F1c2UgdGhlIGluY29ycmVjdCBpbWFnZSB0byBiZSBwcmVsb2FkZWQuXG4gICAgLy9cbiAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zZW1hbnRpY3MuaHRtbCNhdHRyLWxpbmstaW1hZ2VzcmNzZXRcbiAgICAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoX2hlYWQuZGVmYXVsdCwgbnVsbCwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwibGlua1wiLCB7XG4gICAgICAgIGtleTogJ19fbmltZy0nICsgaW1nQXR0cmlidXRlcy5zcmMgKyBpbWdBdHRyaWJ1dGVzLnNyY1NldCArIGltZ0F0dHJpYnV0ZXMuc2l6ZXMsXG4gICAgICAgIHJlbDogXCJwcmVsb2FkXCIsXG4gICAgICAgIGFzOiBcImltYWdlXCIsXG4gICAgICAgIGhyZWY6IGltZ0F0dHJpYnV0ZXMuc3JjU2V0ID8gdW5kZWZpbmVkIDogaW1nQXR0cmlidXRlcy5zcmMsXG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IGltYWdlc3Jjc2V0IGlzIG5vdCB5ZXQgaW4gdGhlIGxpbmsgZWxlbWVudCB0eXBlLlxuICAgICAgICBpbWFnZXNyY3NldDogaW1nQXR0cmlidXRlcy5zcmNTZXQsXG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IGltYWdlc2l6ZXMgaXMgbm90IHlldCBpbiB0aGUgbGluayBlbGVtZW50IHR5cGUuXG4gICAgICAgIGltYWdlc2l6ZXM6IGltZ0F0dHJpYnV0ZXMuc2l6ZXNcbiAgICB9KSkgOiBudWxsKSk7XG59XG5mdW5jdGlvbiBub3JtYWxpemVTcmMoc3JjKSB7XG4gICAgcmV0dXJuIHNyY1swXSA9PT0gJy8nID8gc3JjLnNsaWNlKDEpIDogc3JjO1xufVxuZnVuY3Rpb24gaW1naXhMb2FkZXIoeyByb290ICwgc3JjICwgd2lkdGggLCBxdWFsaXR5ICB9KSB7XG4gICAgLy8gRGVtbzogaHR0cHM6Ly9zdGF0aWMuaW1naXgubmV0L2RhaXN5LnBuZz9hdXRvPWZvcm1hdCZmaXQ9bWF4Jnc9MzAwXG4gICAgY29uc3QgdXJsID0gbmV3IFVSTChgJHtyb290fSR7bm9ybWFsaXplU3JjKHNyYyl9YCk7XG4gICAgY29uc3QgcGFyYW1zID0gdXJsLnNlYXJjaFBhcmFtcztcbiAgICBwYXJhbXMuc2V0KCdhdXRvJywgcGFyYW1zLmdldCgnYXV0bycpIHx8ICdmb3JtYXQnKTtcbiAgICBwYXJhbXMuc2V0KCdmaXQnLCBwYXJhbXMuZ2V0KCdmaXQnKSB8fCAnbWF4Jyk7XG4gICAgcGFyYW1zLnNldCgndycsIHBhcmFtcy5nZXQoJ3cnKSB8fCB3aWR0aC50b1N0cmluZygpKTtcbiAgICBpZiAocXVhbGl0eSkge1xuICAgICAgICBwYXJhbXMuc2V0KCdxJywgcXVhbGl0eS50b1N0cmluZygpKTtcbiAgICB9XG4gICAgcmV0dXJuIHVybC5ocmVmO1xufVxuZnVuY3Rpb24gYWthbWFpTG9hZGVyKHsgcm9vdCAsIHNyYyAsIHdpZHRoICB9KSB7XG4gICAgcmV0dXJuIGAke3Jvb3R9JHtub3JtYWxpemVTcmMoc3JjKX0/aW13aWR0aD0ke3dpZHRofWA7XG59XG5mdW5jdGlvbiBjbG91ZGluYXJ5TG9hZGVyKHsgcm9vdCAsIHNyYyAsIHdpZHRoICwgcXVhbGl0eSAgfSkge1xuICAgIC8vIERlbW86IGh0dHBzOi8vcmVzLmNsb3VkaW5hcnkuY29tL2RlbW8vaW1hZ2UvdXBsb2FkL3dfMzAwLGNfbGltaXQscV9hdXRvL3R1cnRsZXMuanBnXG4gICAgY29uc3QgcGFyYW1zID0gW1xuICAgICAgICAnZl9hdXRvJyxcbiAgICAgICAgJ2NfbGltaXQnLFxuICAgICAgICAnd18nICsgd2lkdGgsXG4gICAgICAgICdxXycgKyAocXVhbGl0eSB8fCAnYXV0bycpXG4gICAgXTtcbiAgICBsZXQgcGFyYW1zU3RyaW5nID0gcGFyYW1zLmpvaW4oJywnKSArICcvJztcbiAgICByZXR1cm4gYCR7cm9vdH0ke3BhcmFtc1N0cmluZ30ke25vcm1hbGl6ZVNyYyhzcmMpfWA7XG59XG5mdW5jdGlvbiBjdXN0b21Mb2FkZXIoeyBzcmMgIH0pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaXMgbWlzc2luZyBcImxvYWRlclwiIHByb3AuYCArIGBcXG5SZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaW1hZ2UtbWlzc2luZy1sb2FkZXJgKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRMb2FkZXIoeyByb290ICwgc3JjICwgd2lkdGggLCBxdWFsaXR5ICB9KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc3QgbWlzc2luZ1ZhbHVlcyA9IFtdO1xuICAgICAgICAvLyB0aGVzZSBzaG91bGQgYWx3YXlzIGJlIHByb3ZpZGVkIGJ1dCBtYWtlIHN1cmUgdGhleSBhcmVcbiAgICAgICAgaWYgKCFzcmMpIG1pc3NpbmdWYWx1ZXMucHVzaCgnc3JjJyk7XG4gICAgICAgIGlmICghd2lkdGgpIG1pc3NpbmdWYWx1ZXMucHVzaCgnd2lkdGgnKTtcbiAgICAgICAgaWYgKG1pc3NpbmdWYWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBOZXh0IEltYWdlIE9wdGltaXphdGlvbiByZXF1aXJlcyAke21pc3NpbmdWYWx1ZXMuam9pbignLCAnKX0gdG8gYmUgcHJvdmlkZWQuIE1ha2Ugc3VyZSB5b3UgcGFzcyB0aGVtIGFzIHByb3BzIHRvIHRoZSBcXGBuZXh0L2ltYWdlXFxgIGNvbXBvbmVudC4gUmVjZWl2ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICBxdWFsaXR5XG4gICAgICAgICAgICB9KX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjLnN0YXJ0c1dpdGgoJy8vJykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIHBhcnNlIHNyYyBcIiR7c3JjfVwiIG9uIFxcYG5leHQvaW1hZ2VcXGAsIHByb3RvY29sLXJlbGF0aXZlIFVSTCAoLy8pIG11c3QgYmUgY2hhbmdlZCB0byBhbiBhYnNvbHV0ZSBVUkwgKGh0dHA6Ly8gb3IgaHR0cHM6Ly8pYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFzcmMuc3RhcnRzV2l0aCgnLycpICYmIGNvbmZpZ0RvbWFpbnMpIHtcbiAgICAgICAgICAgIGxldCBwYXJzZWRTcmM7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBhcnNlZFNyYyA9IG5ldyBVUkwoc3JjKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBzcmMgXCIke3NyY31cIiBvbiBcXGBuZXh0L2ltYWdlXFxgLCBpZiB1c2luZyByZWxhdGl2ZSBpbWFnZSBpdCBtdXN0IHN0YXJ0IHdpdGggYSBsZWFkaW5nIHNsYXNoIFwiL1wiIG9yIGJlIGFuIGFic29sdXRlIFVSTCAoaHR0cDovLyBvciBodHRwczovLylgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmICFjb25maWdEb21haW5zLmluY2x1ZGVzKHBhcnNlZFNyYy5ob3N0bmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgc3JjIHByb3AgKCR7c3JjfSkgb24gXFxgbmV4dC9pbWFnZVxcYCwgaG9zdG5hbWUgXCIke3BhcnNlZFNyYy5ob3N0bmFtZX1cIiBpcyBub3QgY29uZmlndXJlZCB1bmRlciBpbWFnZXMgaW4geW91ciBcXGBuZXh0LmNvbmZpZy5qc1xcYFxcbmAgKyBgU2VlIG1vcmUgaW5mbzogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvbmV4dC1pbWFnZS11bmNvbmZpZ3VyZWQtaG9zdGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBgJHtyb290fT91cmw9JHtlbmNvZGVVUklDb21wb25lbnQoc3JjKX0mdz0ke3dpZHRofSZxPSR7cXVhbGl0eSB8fCA3NX1gO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbWFnZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3JvdXRlciA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3JvdXRlci9yb3V0ZXJcIik7XG52YXIgX3JvdXRlcjEgPSByZXF1aXJlKFwiLi9yb3V0ZXJcIik7XG52YXIgX3VzZUludGVyc2VjdGlvbiA9IHJlcXVpcmUoXCIuL3VzZS1pbnRlcnNlY3Rpb25cIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5jb25zdCBwcmVmZXRjaGVkID0ge1xufTtcbmZ1bmN0aW9uIHByZWZldGNoKHJvdXRlciwgaHJlZiwgYXMsIG9wdGlvbnMpIHtcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXJvdXRlcikgcmV0dXJuO1xuICAgIGlmICghKDAsIF9yb3V0ZXIpLmlzTG9jYWxVUkwoaHJlZikpIHJldHVybjtcbiAgICAvLyBQcmVmZXRjaCB0aGUgSlNPTiBwYWdlIGlmIGFza2VkIChvbmx5IGluIHRoZSBjbGllbnQpXG4gICAgLy8gV2UgbmVlZCB0byBoYW5kbGUgYSBwcmVmZXRjaCBlcnJvciBoZXJlIHNpbmNlIHdlIG1heSBiZVxuICAgIC8vIGxvYWRpbmcgd2l0aCBwcmlvcml0eSB3aGljaCBjYW4gcmVqZWN0IGJ1dCB3ZSBkb24ndFxuICAgIC8vIHdhbnQgdG8gZm9yY2UgbmF2aWdhdGlvbiBzaW5jZSB0aGlzIGlzIG9ubHkgYSBwcmVmZXRjaFxuICAgIHJvdXRlci5wcmVmZXRjaChocmVmLCBhcywgb3B0aW9ucykuY2F0Y2goKGVycik9PntcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIC8vIHJldGhyb3cgdG8gc2hvdyBpbnZhbGlkIFVSTCBlcnJvcnNcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnN0IGN1ckxvY2FsZSA9IG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnMubG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGU7XG4gICAgLy8gSm9pbiBvbiBhbiBpbnZhbGlkIFVSSSBjaGFyYWN0ZXJcbiAgICBwcmVmZXRjaGVkW2hyZWYgKyAnJScgKyBhcyArIChjdXJMb2NhbGUgPyAnJScgKyBjdXJMb2NhbGUgOiAnJyldID0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGlzTW9kaWZpZWRFdmVudChldmVudCkge1xuICAgIGNvbnN0IHsgdGFyZ2V0ICB9ID0gZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICByZXR1cm4gdGFyZ2V0ICYmIHRhcmdldCAhPT0gJ19zZWxmJyB8fCBldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkgfHwgZXZlbnQuc2hpZnRLZXkgfHwgZXZlbnQuYWx0S2V5IHx8IGV2ZW50Lm5hdGl2ZUV2ZW50ICYmIGV2ZW50Lm5hdGl2ZUV2ZW50LndoaWNoID09PSAyO1xufVxuZnVuY3Rpb24gbGlua0NsaWNrZWQoZSwgcm91dGVyLCBocmVmLCBhcywgcmVwbGFjZSwgc2hhbGxvdywgc2Nyb2xsLCBsb2NhbGUpIHtcbiAgICBjb25zdCB7IG5vZGVOYW1lICB9ID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgIGlmIChub2RlTmFtZSA9PT0gJ0EnICYmIChpc01vZGlmaWVkRXZlbnQoZSkgfHwgISgwLCBfcm91dGVyKS5pc0xvY2FsVVJMKGhyZWYpKSkge1xuICAgICAgICAvLyBpZ25vcmUgY2xpY2sgZm9yIGJyb3dzZXLigJlzIGRlZmF1bHQgYmVoYXZpb3JcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgLy8gIGF2b2lkIHNjcm9sbCBmb3IgdXJscyB3aXRoIGFuY2hvciByZWZzXG4gICAgaWYgKHNjcm9sbCA9PSBudWxsICYmIGFzLmluZGV4T2YoJyMnKSA+PSAwKSB7XG4gICAgICAgIHNjcm9sbCA9IGZhbHNlO1xuICAgIH1cbiAgICAvLyByZXBsYWNlIHN0YXRlIGluc3RlYWQgb2YgcHVzaCBpZiBwcm9wIGlzIHByZXNlbnRcbiAgICByb3V0ZXJbcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdwdXNoJ10oaHJlZiwgYXMsIHtcbiAgICAgICAgc2hhbGxvdyxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBzY3JvbGxcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIExpbmsocHJvcHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVQcm9wRXJyb3IoYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihgRmFpbGVkIHByb3AgdHlwZTogVGhlIHByb3AgXFxgJHthcmdzLmtleX1cXGAgZXhwZWN0cyBhICR7YXJncy5leHBlY3RlZH0gaW4gXFxgPExpbms+XFxgLCBidXQgZ290IFxcYCR7YXJncy5hY3R1YWx9XFxgIGluc3RlYWQuYCArICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IFwiXFxuT3BlbiB5b3VyIGJyb3dzZXIncyBjb25zb2xlIHRvIHZpZXcgdGhlIENvbXBvbmVudCBzdGFjayB0cmFjZS5cIiA6ICcnKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgY29uc3QgcmVxdWlyZWRQcm9wc0d1YXJkID0ge1xuICAgICAgICAgICAgaHJlZjogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXF1aXJlZFByb3BzID0gT2JqZWN0LmtleXMocmVxdWlyZWRQcm9wc0d1YXJkKTtcbiAgICAgICAgcmVxdWlyZWRQcm9wcy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnaHJlZicpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNba2V5XSA9PSBudWxsIHx8IHR5cGVvZiBwcm9wc1trZXldICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2Agb3IgYG9iamVjdGAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiBwcm9wc1trZXldID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHByb3BzW2tleV1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICAgICAgICAgICAgICBjb25zdCBfID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgY29uc3Qgb3B0aW9uYWxQcm9wc0d1YXJkID0ge1xuICAgICAgICAgICAgYXM6IHRydWUsXG4gICAgICAgICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgICAgICAgc2hhbGxvdzogdHJ1ZSxcbiAgICAgICAgICAgIHBhc3NIcmVmOiB0cnVlLFxuICAgICAgICAgICAgcHJlZmV0Y2g6IHRydWUsXG4gICAgICAgICAgICBsb2NhbGU6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb3B0aW9uYWxQcm9wcyA9IE9iamVjdC5rZXlzKG9wdGlvbmFsUHJvcHNHdWFyZCk7XG4gICAgICAgIG9wdGlvbmFsUHJvcHMuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICAgICAgY29uc3QgdmFsVHlwZSA9IHR5cGVvZiBwcm9wc1trZXldO1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2FzJykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1trZXldICYmIHZhbFR5cGUgIT09ICdzdHJpbmcnICYmIHZhbFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgIG9yIGBvYmplY3RgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2xvY2FsZScpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNba2V5XSAmJiB2YWxUeXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdyZXBsYWNlJyB8fCBrZXkgPT09ICdzY3JvbGwnIHx8IGtleSA9PT0gJ3NoYWxsb3cnIHx8IGtleSA9PT0gJ3Bhc3NIcmVmJyB8fCBrZXkgPT09ICdwcmVmZXRjaCcpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNba2V5XSAhPSBudWxsICYmIHZhbFR5cGUgIT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgYm9vbGVhbmAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgICAgICAgICAgY29uc3QgXyA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFRoaXMgaG9vayBpcyBpbiBhIGNvbmRpdGlvbmFsIGJ1dCB0aGF0IGlzIG9rIGJlY2F1c2UgYHByb2Nlc3MuZW52Lk5PREVfRU5WYCBuZXZlciBjaGFuZ2VzXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC1ob29rcy9ydWxlcy1vZi1ob29rc1xuICAgICAgICBjb25zdCBoYXNXYXJuZWQgPSBfcmVhY3QuZGVmYXVsdC51c2VSZWYoZmFsc2UpO1xuICAgICAgICBpZiAocHJvcHMucHJlZmV0Y2ggJiYgIWhhc1dhcm5lZC5jdXJyZW50KSB7XG4gICAgICAgICAgICBoYXNXYXJuZWQuY3VycmVudCA9IHRydWU7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ05leHQuanMgYXV0by1wcmVmZXRjaGVzIGF1dG9tYXRpY2FsbHkgYmFzZWQgb24gdmlld3BvcnQuIFRoZSBwcmVmZXRjaCBhdHRyaWJ1dGUgaXMgbm8gbG9uZ2VyIG5lZWRlZC4gTW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvcHJlZmV0Y2gtdHJ1ZS1kZXByZWNhdGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgcCA9IHByb3BzLnByZWZldGNoICE9PSBmYWxzZTtcbiAgICBjb25zdCByb3V0ZXIgPSAoMCwgX3JvdXRlcjEpLnVzZVJvdXRlcigpO1xuICAgIGNvbnN0IHsgaHJlZiAsIGFzICB9ID0gX3JlYWN0LmRlZmF1bHQudXNlTWVtbygoKT0+e1xuICAgICAgICBjb25zdCBbcmVzb2x2ZWRIcmVmLCByZXNvbHZlZEFzXSA9ICgwLCBfcm91dGVyKS5yZXNvbHZlSHJlZihyb3V0ZXIsIHByb3BzLmhyZWYsIHRydWUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaHJlZjogcmVzb2x2ZWRIcmVmLFxuICAgICAgICAgICAgYXM6IHByb3BzLmFzID8gKDAsIF9yb3V0ZXIpLnJlc29sdmVIcmVmKHJvdXRlciwgcHJvcHMuYXMpIDogcmVzb2x2ZWRBcyB8fCByZXNvbHZlZEhyZWZcbiAgICAgICAgfTtcbiAgICB9LCBbXG4gICAgICAgIHJvdXRlcixcbiAgICAgICAgcHJvcHMuaHJlZixcbiAgICAgICAgcHJvcHMuYXNcbiAgICBdKTtcbiAgICBsZXQgeyBjaGlsZHJlbiAsIHJlcGxhY2UgLCBzaGFsbG93ICwgc2Nyb2xsICwgbG9jYWxlICB9ID0gcHJvcHM7XG4gICAgLy8gRGVwcmVjYXRlZC4gV2FybmluZyBzaG93biBieSBwcm9wVHlwZSBjaGVjay4gSWYgdGhlIGNoaWxkcmVuIHByb3ZpZGVkIGlzIGEgc3RyaW5nICg8TGluaz5leGFtcGxlPC9MaW5rPikgd2Ugd3JhcCBpdCBpbiBhbiA8YT4gdGFnXG4gICAgaWYgKHR5cGVvZiBjaGlsZHJlbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY2hpbGRyZW4gPSAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJhXCIsIG51bGwsIGNoaWxkcmVuKTtcbiAgICB9XG4gICAgLy8gVGhpcyB3aWxsIHJldHVybiB0aGUgZmlyc3QgY2hpbGQsIGlmIG11bHRpcGxlIGFyZSBwcm92aWRlZCBpdCB3aWxsIHRocm93IGFuIGVycm9yXG4gICAgbGV0IGNoaWxkO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY2hpbGQgPSBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE11bHRpcGxlIGNoaWxkcmVuIHdlcmUgcGFzc2VkIHRvIDxMaW5rPiB3aXRoIFxcYGhyZWZcXGAgb2YgXFxgJHtwcm9wcy5ocmVmfVxcYCBidXQgb25seSBvbmUgY2hpbGQgaXMgc3VwcG9ydGVkIGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2xpbmstbXVsdGlwbGUtY2hpbGRyZW5gICsgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gXCIgXFxuT3BlbiB5b3VyIGJyb3dzZXIncyBjb25zb2xlIHRvIHZpZXcgdGhlIENvbXBvbmVudCBzdGFjayB0cmFjZS5cIiA6ICcnKSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBjaGlsZCA9IF9yZWFjdC5kZWZhdWx0LkNoaWxkcmVuLm9ubHkoY2hpbGRyZW4pO1xuICAgIH1cbiAgICBjb25zdCBjaGlsZFJlZiA9IGNoaWxkICYmIHR5cGVvZiBjaGlsZCA9PT0gJ29iamVjdCcgJiYgY2hpbGQucmVmO1xuICAgIGNvbnN0IFtzZXRJbnRlcnNlY3Rpb25SZWYsIGlzVmlzaWJsZV0gPSAoMCwgX3VzZUludGVyc2VjdGlvbikudXNlSW50ZXJzZWN0aW9uKHtcbiAgICAgICAgcm9vdE1hcmdpbjogJzIwMHB4J1xuICAgIH0pO1xuICAgIGNvbnN0IHNldFJlZiA9IF9yZWFjdC5kZWZhdWx0LnVzZUNhbGxiYWNrKChlbCk9PntcbiAgICAgICAgc2V0SW50ZXJzZWN0aW9uUmVmKGVsKTtcbiAgICAgICAgaWYgKGNoaWxkUmVmKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnZnVuY3Rpb24nKSBjaGlsZFJlZihlbCk7XG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgY2hpbGRSZWYgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgY2hpbGRSZWYuY3VycmVudCA9IGVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBjaGlsZFJlZixcbiAgICAgICAgc2V0SW50ZXJzZWN0aW9uUmVmXG4gICAgXSk7XG4gICAgX3JlYWN0LmRlZmF1bHQudXNlRWZmZWN0KCgpPT57XG4gICAgICAgIGNvbnN0IHNob3VsZFByZWZldGNoID0gaXNWaXNpYmxlICYmIHAgJiYgKDAsIF9yb3V0ZXIpLmlzTG9jYWxVUkwoaHJlZik7XG4gICAgICAgIGNvbnN0IGN1ckxvY2FsZSA9IHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGU7XG4gICAgICAgIGNvbnN0IGlzUHJlZmV0Y2hlZCA9IHByZWZldGNoZWRbaHJlZiArICclJyArIGFzICsgKGN1ckxvY2FsZSA/ICclJyArIGN1ckxvY2FsZSA6ICcnKV07XG4gICAgICAgIGlmIChzaG91bGRQcmVmZXRjaCAmJiAhaXNQcmVmZXRjaGVkKSB7XG4gICAgICAgICAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7XG4gICAgICAgICAgICAgICAgbG9jYWxlOiBjdXJMb2NhbGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSwgW1xuICAgICAgICBhcyxcbiAgICAgICAgaHJlZixcbiAgICAgICAgaXNWaXNpYmxlLFxuICAgICAgICBsb2NhbGUsXG4gICAgICAgIHAsXG4gICAgICAgIHJvdXRlclxuICAgIF0pO1xuICAgIGNvbnN0IGNoaWxkUHJvcHMgPSB7XG4gICAgICAgIHJlZjogc2V0UmVmLFxuICAgICAgICBvbkNsaWNrOiAoZSk9PntcbiAgICAgICAgICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25DbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uQ2xpY2soZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWUuZGVmYXVsdFByZXZlbnRlZCkge1xuICAgICAgICAgICAgICAgIGxpbmtDbGlja2VkKGUsIHJvdXRlciwgaHJlZiwgYXMsIHJlcGxhY2UsIHNoYWxsb3csIHNjcm9sbCwgbG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgY2hpbGRQcm9wcy5vbk1vdXNlRW50ZXIgPSAoZSk9PntcbiAgICAgICAgaWYgKCEoMCwgX3JvdXRlcikuaXNMb2NhbFVSTChocmVmKSkgcmV0dXJuO1xuICAgICAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2hpbGQucHJvcHMub25Nb3VzZUVudGVyKGUpO1xuICAgICAgICB9XG4gICAgICAgIHByZWZldGNoKHJvdXRlciwgaHJlZiwgYXMsIHtcbiAgICAgICAgICAgIHByaW9yaXR5OiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgLy8gSWYgY2hpbGQgaXMgYW4gPGE+IHRhZyBhbmQgZG9lc24ndCBoYXZlIGEgaHJlZiBhdHRyaWJ1dGUsIG9yIGlmIHRoZSAncGFzc0hyZWYnIHByb3BlcnR5IGlzXG4gICAgLy8gZGVmaW5lZCwgd2Ugc3BlY2lmeSB0aGUgY3VycmVudCAnaHJlZicsIHNvIHRoYXQgcmVwZXRpdGlvbiBpcyBub3QgbmVlZGVkIGJ5IHRoZSB1c2VyXG4gICAgaWYgKHByb3BzLnBhc3NIcmVmIHx8IGNoaWxkLnR5cGUgPT09ICdhJyAmJiAhKCdocmVmJyBpbiBjaGlsZC5wcm9wcykpIHtcbiAgICAgICAgY29uc3QgY3VyTG9jYWxlID0gdHlwZW9mIGxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBsb2NhbGUgOiByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZTtcbiAgICAgICAgLy8gd2Ugb25seSByZW5kZXIgZG9tYWluIGxvY2FsZXMgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiBhIGRvbWFpbiBsb2NhbGVcbiAgICAgICAgLy8gc28gdGhhdCBsb2NhbGUgbGlua3MgYXJlIHN0aWxsIHZpc2l0YWJsZSBpbiBkZXZlbG9wbWVudC9wcmV2aWV3IGVudnNcbiAgICAgICAgY29uc3QgbG9jYWxlRG9tYWluID0gcm91dGVyICYmIHJvdXRlci5pc0xvY2FsZURvbWFpbiAmJiAoMCwgX3JvdXRlcikuZ2V0RG9tYWluTG9jYWxlKGFzLCBjdXJMb2NhbGUsIHJvdXRlciAmJiByb3V0ZXIubG9jYWxlcywgcm91dGVyICYmIHJvdXRlci5kb21haW5Mb2NhbGVzKTtcbiAgICAgICAgY2hpbGRQcm9wcy5ocmVmID0gbG9jYWxlRG9tYWluIHx8ICgwLCBfcm91dGVyKS5hZGRCYXNlUGF0aCgoMCwgX3JvdXRlcikuYWRkTG9jYWxlKGFzLCBjdXJMb2NhbGUsIHJvdXRlciAmJiByb3V0ZXIuZGVmYXVsdExvY2FsZSkpO1xuICAgIH1cbiAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jbG9uZUVsZW1lbnQoY2hpbGQsIGNoaWxkUHJvcHMpKTtcbn1cbnZhciBfZGVmYXVsdCA9IExpbms7XG5leHBvcnRzLmRlZmF1bHQgPSBfZGVmYXVsdDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGluay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2ggPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaDtcbmV4cG9ydHMubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSB2b2lkIDA7XG5mdW5jdGlvbiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRoKSB7XG4gICAgcmV0dXJuIHBhdGguZW5kc1dpdGgoJy8nKSAmJiBwYXRoICE9PSAnLycgPyBwYXRoLnNsaWNlKDAsIC0xKSA6IHBhdGg7XG59XG5jb25zdCBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCA9IHByb2Nlc3MuZW52Ll9fTkVYVF9UUkFJTElOR19TTEFTSCA/IChwYXRoKT0+e1xuICAgIGlmICgvXFwuW14vXStcXC8/JC8udGVzdChwYXRoKSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aCk7XG4gICAgfSBlbHNlIGlmIChwYXRoLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHBhdGggKyAnLyc7XG4gICAgfVxufSA6IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoO1xuZXhwb3J0cy5ub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCA9IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1ub3JtYWxpemUtdHJhaWxpbmctc2xhc2guanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlcXVlc3RJZGxlQ2FsbGJhY2sgPSBleHBvcnRzLmNhbmNlbElkbGVDYWxsYmFjayA9IHZvaWQgMDtcbmNvbnN0IHJlcXVlc3RJZGxlQ2FsbGJhY2sgPSB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrICYmIHNlbGYucmVxdWVzdElkbGVDYWxsYmFjay5iaW5kKHdpbmRvdykgfHwgZnVuY3Rpb24oY2IpIHtcbiAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBjYih7XG4gICAgICAgICAgICBkaWRUaW1lb3V0OiBmYWxzZSxcbiAgICAgICAgICAgIHRpbWVSZW1haW5pbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCA1MCAtIChEYXRlLm5vdygpIC0gc3RhcnQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgMSk7XG59O1xuZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjaztcbmNvbnN0IGNhbmNlbElkbGVDYWxsYmFjayA9IHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyAmJiBzZWxmLmNhbmNlbElkbGVDYWxsYmFjayAmJiBzZWxmLmNhbmNlbElkbGVDYWxsYmFjay5iaW5kKHdpbmRvdykgfHwgZnVuY3Rpb24oaWQpIHtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKTtcbn07XG5leHBvcnRzLmNhbmNlbElkbGVDYWxsYmFjayA9IGNhbmNlbElkbGVDYWxsYmFjaztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5tYXJrQXNzZXRFcnJvciA9IG1hcmtBc3NldEVycm9yO1xuZXhwb3J0cy5pc0Fzc2V0RXJyb3IgPSBpc0Fzc2V0RXJyb3I7XG5leHBvcnRzLmdldENsaWVudEJ1aWxkTWFuaWZlc3QgPSBnZXRDbGllbnRCdWlsZE1hbmlmZXN0O1xuZXhwb3J0cy5jcmVhdGVSb3V0ZUxvYWRlciA9IGNyZWF0ZVJvdXRlTG9hZGVyO1xudmFyIF9nZXRBc3NldFBhdGhGcm9tUm91dGUgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlXCIpKTtcbnZhciBfcmVxdWVzdElkbGVDYWxsYmFjayA9IHJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbi8vIDMuOHMgd2FzIGFyYml0cmFyaWx5IGNob3NlbiBhcyBpdCdzIHdoYXQgaHR0cHM6Ly93ZWIuZGV2L2ludGVyYWN0aXZlXG4vLyBjb25zaWRlcnMgYXMgXCJHb29kXCIgdGltZS10by1pbnRlcmFjdGl2ZS4gV2UgbXVzdCBhc3N1bWUgc29tZXRoaW5nIHdlbnRcbi8vIHdyb25nIGJleW9uZCB0aGlzIHBvaW50LCBhbmQgdGhlbiBmYWxsLWJhY2sgdG8gYSBmdWxsIHBhZ2UgdHJhbnNpdGlvbiB0b1xuLy8gc2hvdyB0aGUgdXNlciBzb21ldGhpbmcgb2YgdmFsdWUuXG5jb25zdCBNU19NQVhfSURMRV9ERUxBWSA9IDM4MDA7XG5mdW5jdGlvbiB3aXRoRnV0dXJlKGtleSwgbWFwLCBnZW5lcmF0b3IpIHtcbiAgICBsZXQgZW50cnkgPSBtYXAuZ2V0KGtleSk7XG4gICAgaWYgKGVudHJ5KSB7XG4gICAgICAgIGlmICgnZnV0dXJlJyBpbiBlbnRyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmZ1dHVyZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVudHJ5KTtcbiAgICB9XG4gICAgbGV0IHJlc29sdmVyO1xuICAgIGNvbnN0IHByb20gPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSk9PntcbiAgICAgICAgcmVzb2x2ZXIgPSByZXNvbHZlO1xuICAgIH0pO1xuICAgIG1hcC5zZXQoa2V5LCBlbnRyeSA9IHtcbiAgICAgICAgcmVzb2x2ZTogcmVzb2x2ZXIsXG4gICAgICAgIGZ1dHVyZTogcHJvbVxuICAgIH0pO1xuICAgIHJldHVybiBnZW5lcmF0b3IgPyBnZW5lcmF0b3IoKS50aGVuKCh2YWx1ZSk9PihyZXNvbHZlcih2YWx1ZSksIHZhbHVlKVxuICAgICkgOiBwcm9tO1xufVxuZnVuY3Rpb24gaGFzUHJlZmV0Y2gobGluaykge1xuICAgIHRyeSB7XG4gICAgICAgIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaW5rJyk7XG4gICAgICAgIHJldHVybigvLyBkZXRlY3QgSUUxMSBzaW5jZSBpdCBzdXBwb3J0cyBwcmVmZXRjaCBidXQgaXNuJ3QgZGV0ZWN0ZWRcbiAgICAgICAgLy8gd2l0aCByZWxMaXN0LnN1cHBvcnRcbiAgICAgICAgKCEhd2luZG93Lk1TSW5wdXRNZXRob2RDb250ZXh0ICYmICEhZG9jdW1lbnQuZG9jdW1lbnRNb2RlKSB8fCBsaW5rLnJlbExpc3Quc3VwcG9ydHMoJ3ByZWZldGNoJykpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmNvbnN0IGNhblByZWZldGNoID0gaGFzUHJlZmV0Y2goKTtcbmZ1bmN0aW9uIHByZWZldGNoVmlhRG9tKGhyZWYsIGFzLCBsaW5rKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpbmtbcmVsPVwicHJlZmV0Y2hcIl1baHJlZl49XCIke2hyZWZ9XCJdYCkpIHtcbiAgICAgICAgICAgIHJldHVybiByZXMoKTtcbiAgICAgICAgfVxuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICAvLyBUaGUgb3JkZXIgb2YgcHJvcGVydHkgYXNzaWdubWVudCBoZXJlIGlzIGludGVudGlvbmFsOlxuICAgICAgICBpZiAoYXMpIGxpbmsuYXMgPSBhcztcbiAgICAgICAgbGluay5yZWwgPSBgcHJlZmV0Y2hgO1xuICAgICAgICBsaW5rLmNyb3NzT3JpZ2luID0gcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTjtcbiAgICAgICAgbGluay5vbmxvYWQgPSByZXM7XG4gICAgICAgIGxpbmsub25lcnJvciA9IHJlajtcbiAgICAgICAgLy8gYGhyZWZgIHNob3VsZCBhbHdheXMgYmUgbGFzdDpcbiAgICAgICAgbGluay5ocmVmID0gaHJlZjtcbiAgICAgICAgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rKTtcbiAgICB9KTtcbn1cbmNvbnN0IEFTU0VUX0xPQURfRVJST1IgPSBTeW1ib2woJ0FTU0VUX0xPQURfRVJST1InKTtcbmZ1bmN0aW9uIG1hcmtBc3NldEVycm9yKGVycikge1xuICAgIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCBBU1NFVF9MT0FEX0VSUk9SLCB7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpc0Fzc2V0RXJyb3IoZXJyKSB7XG4gICAgcmV0dXJuIGVyciAmJiBBU1NFVF9MT0FEX0VSUk9SIGluIGVycjtcbn1cbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdChzcmMsIHNjcmlwdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KT0+e1xuICAgICAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbC5cbiAgICAgICAgLy8gMS4gU2V0dXAgc3VjY2Vzcy9mYWlsdXJlIGhvb2tzIGluIGNhc2UgdGhlIGJyb3dzZXIgc3luY2hyb25vdXNseVxuICAgICAgICAvLyAgICBleGVjdXRlcyB3aGVuIGBzcmNgIGlzIHNldC5cbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgIHNjcmlwdC5vbmVycm9yID0gKCk9PnJlamVjdChtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHNjcmlwdDogJHtzcmN9YCkpKVxuICAgICAgICA7XG4gICAgICAgIC8vIDIuIENvbmZpZ3VyZSB0aGUgY3Jvc3Mtb3JpZ2luIGF0dHJpYnV0ZSBiZWZvcmUgc2V0dGluZyBgc3JjYCBpbiBjYXNlIHRoZVxuICAgICAgICAvLyAgICBicm93c2VyIGJlZ2lucyB0byBmZXRjaC5cbiAgICAgICAgc2NyaXB0LmNyb3NzT3JpZ2luID0gcHJvY2Vzcy5lbnYuX19ORVhUX0NST1NTX09SSUdJTjtcbiAgICAgICAgLy8gMy4gRmluYWxseSwgc2V0IHRoZSBzb3VyY2UgYW5kIGluamVjdCBpbnRvIHRoZSBET00gaW4gY2FzZSB0aGUgY2hpbGRcbiAgICAgICAgLy8gICAgbXVzdCBiZSBhcHBlbmRlZCBmb3IgZmV0Y2hpbmcgdG8gc3RhcnQuXG4gICAgICAgIHNjcmlwdC5zcmMgPSBzcmM7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcbiAgICB9KTtcbn1cbi8vIFdlIHdhaXQgZm9yIHBhZ2VzIHRvIGJlIGJ1aWx0IGluIGRldiBiZWZvcmUgd2Ugc3RhcnQgdGhlIHJvdXRlIHRyYW5zaXRpb25cbi8vIHRpbWVvdXQgdG8gcHJldmVudCBhbiB1bi1uZWNlc3NhcnkgaGFyZCBuYXZpZ2F0aW9uIGluIGRldmVsb3BtZW50LlxubGV0IGRldkJ1aWxkUHJvbWlzZTtcbi8vIFJlc29sdmUgYSBwcm9taXNlIHRoYXQgdGltZXMgb3V0IGFmdGVyIGdpdmVuIGFtb3VudCBvZiBtaWxsaXNlY29uZHMuXG5mdW5jdGlvbiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0KHAsIG1zLCBlcnIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICBwLnRoZW4oKHIpPT57XG4gICAgICAgICAgICAvLyBSZXNvbHZlZCwgY2FuY2VsIHRoZSB0aW1lb3V0XG4gICAgICAgICAgICBjYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVzb2x2ZShyKTtcbiAgICAgICAgfSkuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgLy8gV2Ugd3JhcCB0aGVzZSBjaGVja3Mgc2VwYXJhdGVseSBmb3IgYmV0dGVyIGRlYWQtY29kZSBlbGltaW5hdGlvbiBpblxuICAgICAgICAvLyBwcm9kdWN0aW9uIGJ1bmRsZXMuXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICAgICAgKGRldkJ1aWxkUHJvbWlzZSB8fCBQcm9taXNlLnJlc29sdmUoKSkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+c2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwgbXMpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICAgICAgKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT5zZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIG1zKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZnVuY3Rpb24gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpIHtcbiAgICBpZiAoc2VsZi5fX0JVSUxEX01BTklGRVNUKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc2VsZi5fX0JVSUxEX01BTklGRVNUKTtcbiAgICB9XG4gICAgY29uc3Qgb25CdWlsZE1hbmlmZXN0ID0gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgIC8vIE1hbmRhdG9yeSBiZWNhdXNlIHRoaXMgaXMgbm90IGNvbmN1cnJlbnQgc2FmZTpcbiAgICAgICAgY29uc3QgY2IgPSBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0I7XG4gICAgICAgIHNlbGYuX19CVUlMRF9NQU5JRkVTVF9DQiA9ICgpPT57XG4gICAgICAgICAgICByZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVCk7XG4gICAgICAgICAgICBjYiAmJiBjYigpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiByZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0KG9uQnVpbGRNYW5pZmVzdCwgTVNfTUFYX0lETEVfREVMQVksIG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgY2xpZW50IGJ1aWxkIG1hbmlmZXN0JykpKTtcbn1cbmZ1bmN0aW9uIGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoe1xuICAgICAgICAgICAgc2NyaXB0czogW1xuICAgICAgICAgICAgICAgIGFzc2V0UHJlZml4ICsgJy9fbmV4dC9zdGF0aWMvY2h1bmtzL3BhZ2VzJyArIGVuY29kZVVSSSgoMCwgX2dldEFzc2V0UGF0aEZyb21Sb3V0ZSkuZGVmYXVsdChyb3V0ZSwgJy5qcycpKSwgXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgLy8gU3R5bGVzIGFyZSBoYW5kbGVkIGJ5IGBzdHlsZS1sb2FkZXJgIGluIGRldmVsb3BtZW50OlxuICAgICAgICAgICAgY3NzOiBbXVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKS50aGVuKChtYW5pZmVzdCk9PntcbiAgICAgICAgaWYgKCEocm91dGUgaW4gbWFuaWZlc3QpKSB7XG4gICAgICAgICAgICB0aHJvdyBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYEZhaWxlZCB0byBsb29rdXAgcm91dGU6ICR7cm91dGV9YCkpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGFsbEZpbGVzID0gbWFuaWZlc3Rbcm91dGVdLm1hcCgoZW50cnkpPT5hc3NldFByZWZpeCArICcvX25leHQvJyArIGVuY29kZVVSSShlbnRyeSlcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjcmlwdHM6IGFsbEZpbGVzLmZpbHRlcigodik9PnYuZW5kc1dpdGgoJy5qcycpXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgY3NzOiBhbGxGaWxlcy5maWx0ZXIoKHYpPT52LmVuZHNXaXRoKCcuY3NzJylcbiAgICAgICAgICAgIClcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVJvdXRlTG9hZGVyKGFzc2V0UHJlZml4KSB7XG4gICAgY29uc3QgZW50cnlwb2ludHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3QgbG9hZGVkU2NyaXB0cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBzdHlsZVNoZWV0cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCByb3V0ZXMgPSBuZXcgTWFwKCk7XG4gICAgZnVuY3Rpb24gbWF5YmVFeGVjdXRlU2NyaXB0KHNyYykge1xuICAgICAgICBsZXQgcHJvbSA9IGxvYWRlZFNjcmlwdHMuZ2V0KHNyYyk7XG4gICAgICAgIGlmIChwcm9tKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTa2lwIGV4ZWN1dGluZyBzY3JpcHQgaWYgaXQncyBhbHJlYWR5IGluIHRoZSBET006XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzY3JpcHRbc3JjXj1cIiR7c3JjfVwiXWApKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZGVkU2NyaXB0cy5zZXQoc3JjLCBwcm9tID0gYXBwZW5kU2NyaXB0KHNyYykpO1xuICAgICAgICByZXR1cm4gcHJvbTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmV0Y2hTdHlsZVNoZWV0KGhyZWYpIHtcbiAgICAgICAgbGV0IHByb20gPSBzdHlsZVNoZWV0cy5nZXQoaHJlZik7XG4gICAgICAgIGlmIChwcm9tKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbTtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZVNoZWV0cy5zZXQoaHJlZiwgcHJvbSA9IGZldGNoKGhyZWYpLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdHlsZXNoZWV0OiAke2hyZWZ9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzLnRleHQoKS50aGVuKCh0ZXh0KT0+KHtcbiAgICAgICAgICAgICAgICAgICAgaHJlZjogaHJlZixcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogdGV4dFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IoZXJyKTtcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gcHJvbTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2hlbkVudHJ5cG9pbnQgKHJvdXRlKSB7XG4gICAgICAgICAgICByZXR1cm4gd2l0aEZ1dHVyZShyb3V0ZSwgZW50cnlwb2ludHMpO1xuICAgICAgICB9LFxuICAgICAgICBvbkVudHJ5cG9pbnQgKHJvdXRlLCBleGVjdXRlKSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUoZXhlY3V0ZSkudGhlbigoZm4pPT5mbigpXG4gICAgICAgICAgICApLnRoZW4oKGV4cG9ydHMpPT4oe1xuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnQ6IGV4cG9ydHMgJiYgZXhwb3J0cy5kZWZhdWx0IHx8IGV4cG9ydHMsXG4gICAgICAgICAgICAgICAgICAgIGV4cG9ydHM6IGV4cG9ydHNcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLCAoZXJyKT0+KHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLnRoZW4oKGlucHV0KT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IG9sZCA9IGVudHJ5cG9pbnRzLmdldChyb3V0ZSk7XG4gICAgICAgICAgICAgICAgZW50cnlwb2ludHMuc2V0KHJvdXRlLCBpbnB1dCk7XG4gICAgICAgICAgICAgICAgaWYgKG9sZCAmJiAncmVzb2x2ZScgaW4gb2xkKSBvbGQucmVzb2x2ZShpbnB1dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZFJvdXRlIChyb3V0ZSwgcHJlZmV0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiB3aXRoRnV0dXJlKHJvdXRlLCByb3V0ZXMsICgpPT57XG4gICAgICAgICAgICAgICAgY29uc3Qgcm91dGVGaWxlc1Byb21pc2UgPSBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSkudGhlbigoeyBzY3JpcHRzICwgY3NzICB9KT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlwb2ludHMuaGFzKHJvdXRlKSA/IFtdIDogUHJvbWlzZS5hbGwoc2NyaXB0cy5tYXAobWF5YmVFeGVjdXRlU2NyaXB0KSksXG4gICAgICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChjc3MubWFwKGZldGNoU3R5bGVTaGVldCkpLCBcbiAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53aGVuRW50cnlwb2ludChyb3V0ZSkudGhlbigoZW50cnlwb2ludCk9Pih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZW50cnlwb2ludCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IHJlc1sxXVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgZGV2QnVpbGRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocm91dGVGaWxlc1Byb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm91dGVGaWxlc1Byb21pc2UuZmluYWxseSgoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChyb3V0ZUZpbGVzUHJvbWlzZSwgTVNfTUFYX0lETEVfREVMQVksIG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgUm91dGUgZGlkIG5vdCBjb21wbGV0ZSBsb2FkaW5nOiAke3JvdXRlfWApKSkudGhlbigoeyBlbnRyeXBvaW50ICwgc3R5bGVzICB9KT0+e1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlczogc3R5bGVzXG4gICAgICAgICAgICAgICAgICAgIH0sIGVudHJ5cG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2Vycm9yJyBpbiBlbnRyeXBvaW50ID8gZW50cnlwb2ludCA6IHJlcztcbiAgICAgICAgICAgICAgICB9KS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJlZmV0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gY2FjaGUgZXJyb3JzIGR1cmluZyBwcmVmZXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcHJlZmV0Y2ggKHJvdXRlKSB7XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vR29vZ2xlQ2hyb21lTGFicy9xdWlja2xpbmsvYmxvYi80NTNhNjYxZmExZmE5NDBlMmQyZTA0NDQ1MjM5OGUzOGM2N2E5OGZiL3NyYy9pbmRleC5tanMjTDExNS1MMTE4XG4gICAgICAgICAgICAvLyBMaWNlbnNlOiBBcGFjaGUgMi4wXG4gICAgICAgICAgICBsZXQgY247XG4gICAgICAgICAgICBpZiAoY24gPSBuYXZpZ2F0b3IuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIERvbid0IHByZWZldGNoIGlmIHVzaW5nIDJHIG9yIGlmIFNhdmUtRGF0YSBpcyBlbmFibGVkLlxuICAgICAgICAgICAgICAgIGlmIChjbi5zYXZlRGF0YSB8fCAvMmcvLnRlc3QoY24uZWZmZWN0aXZlVHlwZSkpIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSkudGhlbigob3V0cHV0KT0+UHJvbWlzZS5hbGwoY2FuUHJlZmV0Y2ggPyBvdXRwdXQuc2NyaXB0cy5tYXAoKHNjcmlwdCk9PnByZWZldGNoVmlhRG9tKHNjcmlwdCwgJ3NjcmlwdCcpXG4gICAgICAgICAgICAgICAgKSA6IFtdKVxuICAgICAgICAgICAgKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT50aGlzLmxvYWRSb3V0ZShyb3V0ZSwgdHJ1ZSkuY2F0Y2goKCk9PntcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSkuY2F0Y2goLy8gc3dhbGxvdyBwcmVmZXRjaCBlcnJvcnNcbiAgICAgICAgICAgICgpPT57XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdXRlLWxvYWRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlJvdXRlclwiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3JvdXRlci5kZWZhdWx0O1xuICAgIH1cbn0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwid2l0aFJvdXRlclwiLCB7XG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gX3dpdGhSb3V0ZXIuZGVmYXVsdDtcbiAgICB9XG59KTtcbmV4cG9ydHMudXNlUm91dGVyID0gdXNlUm91dGVyO1xuZXhwb3J0cy5jcmVhdGVSb3V0ZXIgPSBjcmVhdGVSb3V0ZXI7XG5leHBvcnRzLm1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZSA9IG1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZTtcbmV4cG9ydHMuZGVmYXVsdCA9IHZvaWQgMDtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3JvdXRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL3NoYXJlZC9saWIvcm91dGVyL3JvdXRlclwiKSk7XG52YXIgX3JvdXRlckNvbnRleHQgPSByZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9yb3V0ZXItY29udGV4dFwiKTtcbnZhciBfd2l0aFJvdXRlciA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4vd2l0aC1yb3V0ZXJcIikpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuY29uc3Qgc2luZ2xldG9uUm91dGVyID0ge1xuICAgIHJvdXRlcjogbnVsbCxcbiAgICByZWFkeUNhbGxiYWNrczogW10sXG4gICAgcmVhZHkgKGNiKSB7XG4gICAgICAgIGlmICh0aGlzLnJvdXRlcikgcmV0dXJuIGNiKCk7XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpcy5yZWFkeUNhbGxiYWNrcy5wdXNoKGNiKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG4vLyBDcmVhdGUgcHVibGljIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgb2YgdGhlIHJvdXRlciBpbiB0aGUgc2luZ2xldG9uUm91dGVyXG5jb25zdCB1cmxQcm9wZXJ0eUZpZWxkcyA9IFtcbiAgICAncGF0aG5hbWUnLFxuICAgICdyb3V0ZScsXG4gICAgJ3F1ZXJ5JyxcbiAgICAnYXNQYXRoJyxcbiAgICAnY29tcG9uZW50cycsXG4gICAgJ2lzRmFsbGJhY2snLFxuICAgICdiYXNlUGF0aCcsXG4gICAgJ2xvY2FsZScsXG4gICAgJ2xvY2FsZXMnLFxuICAgICdkZWZhdWx0TG9jYWxlJyxcbiAgICAnaXNSZWFkeScsXG4gICAgJ2lzUHJldmlldycsXG4gICAgJ2lzTG9jYWxlRG9tYWluJyxcbiAgICAnZG9tYWluTG9jYWxlcycsIFxuXTtcbmNvbnN0IHJvdXRlckV2ZW50cyA9IFtcbiAgICAncm91dGVDaGFuZ2VTdGFydCcsXG4gICAgJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLFxuICAgICdyb3V0ZUNoYW5nZUNvbXBsZXRlJyxcbiAgICAncm91dGVDaGFuZ2VFcnJvcicsXG4gICAgJ2hhc2hDaGFuZ2VTdGFydCcsXG4gICAgJ2hhc2hDaGFuZ2VDb21wbGV0ZScsIFxuXTtcbmNvbnN0IGNvcmVNZXRob2RGaWVsZHMgPSBbXG4gICAgJ3B1c2gnLFxuICAgICdyZXBsYWNlJyxcbiAgICAncmVsb2FkJyxcbiAgICAnYmFjaycsXG4gICAgJ3ByZWZldGNoJyxcbiAgICAnYmVmb3JlUG9wU3RhdGUnLCBcbl07XG4vLyBFdmVudHMgaXMgYSBzdGF0aWMgcHJvcGVydHkgb24gdGhlIHJvdXRlciwgdGhlIHJvdXRlciBkb2Vzbid0IGhhdmUgdG8gYmUgaW5pdGlhbGl6ZWQgdG8gdXNlIGl0XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoc2luZ2xldG9uUm91dGVyLCAnZXZlbnRzJywge1xuICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiBfcm91dGVyLmRlZmF1bHQuZXZlbnRzO1xuICAgIH1cbn0pO1xudXJsUHJvcGVydHlGaWVsZHMuZm9yRWFjaCgoZmllbGQpPT57XG4gICAgLy8gSGVyZSB3ZSBuZWVkIHRvIHVzZSBPYmplY3QuZGVmaW5lUHJvcGVydHkgYmVjYXVzZSB3ZSBuZWVkIHRvIHJldHVyblxuICAgIC8vIHRoZSBwcm9wZXJ0eSBhc3NpZ25lZCB0byB0aGUgYWN0dWFsIHJvdXRlclxuICAgIC8vIFRoZSB2YWx1ZSBtaWdodCBnZXQgY2hhbmdlZCBhcyB3ZSBjaGFuZ2Ugcm91dGVzIGFuZCB0aGlzIGlzIHRoZVxuICAgIC8vIHByb3BlciB3YXkgdG8gYWNjZXNzIGl0XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgZmllbGQsIHtcbiAgICAgICAgZ2V0ICgpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpO1xuICAgICAgICAgICAgcmV0dXJuIHJvdXRlcltmaWVsZF07XG4gICAgICAgIH1cbiAgICB9KTtcbn0pO1xuY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZCk9PntcbiAgICBzaW5nbGV0b25Sb3V0ZXJbZmllbGRdID0gKC4uLmFyZ3MpPT57XG4gICAgICAgIGNvbnN0IHJvdXRlciA9IGdldFJvdXRlcigpO1xuICAgICAgICByZXR1cm4gcm91dGVyW2ZpZWxkXSguLi5hcmdzKTtcbiAgICB9O1xufSk7XG5yb3V0ZXJFdmVudHMuZm9yRWFjaCgoZXZlbnQpPT57XG4gICAgc2luZ2xldG9uUm91dGVyLnJlYWR5KCgpPT57XG4gICAgICAgIF9yb3V0ZXIuZGVmYXVsdC5ldmVudHMub24oZXZlbnQsICguLi5hcmdzKT0+e1xuICAgICAgICAgICAgY29uc3QgZXZlbnRGaWVsZCA9IGBvbiR7ZXZlbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtldmVudC5zdWJzdHJpbmcoMSl9YDtcbiAgICAgICAgICAgIGNvbnN0IF9zaW5nbGV0b25Sb3V0ZXIgPSBzaW5nbGV0b25Sb3V0ZXI7XG4gICAgICAgICAgICBpZiAoX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0oLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYEVycm9yIHdoZW4gcnVubmluZyB0aGUgUm91dGVyIGV2ZW50OiAke2V2ZW50RmllbGR9YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoYCR7ZXJyLm1lc3NhZ2V9XFxuJHtlcnIuc3RhY2t9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuZnVuY3Rpb24gZ2V0Um91dGVyKCkge1xuICAgIGlmICghc2luZ2xldG9uUm91dGVyLnJvdXRlcikge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gJ05vIHJvdXRlciBpbnN0YW5jZSBmb3VuZC5cXG4nICsgJ1lvdSBzaG91bGQgb25seSB1c2UgXCJuZXh0L3JvdXRlclwiIG9uIHRoZSBjbGllbnQgc2lkZSBvZiB5b3VyIGFwcC5cXG4nO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyO1xufVxudmFyIF9kZWZhdWx0ID0gc2luZ2xldG9uUm91dGVyO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5mdW5jdGlvbiB1c2VSb3V0ZXIoKSB7XG4gICAgcmV0dXJuIF9yZWFjdC5kZWZhdWx0LnVzZUNvbnRleHQoX3JvdXRlckNvbnRleHQuUm91dGVyQ29udGV4dCk7XG59XG5mdW5jdGlvbiBjcmVhdGVSb3V0ZXIoLi4uYXJncykge1xuICAgIHNpbmdsZXRvblJvdXRlci5yb3V0ZXIgPSBuZXcgX3JvdXRlci5kZWZhdWx0KC4uLmFyZ3MpO1xuICAgIHNpbmdsZXRvblJvdXRlci5yZWFkeUNhbGxiYWNrcy5mb3JFYWNoKChjYik9PmNiKClcbiAgICApO1xuICAgIHNpbmdsZXRvblJvdXRlci5yZWFkeUNhbGxiYWNrcyA9IFtdO1xuICAgIHJldHVybiBzaW5nbGV0b25Sb3V0ZXIucm91dGVyO1xufVxuZnVuY3Rpb24gbWFrZVB1YmxpY1JvdXRlckluc3RhbmNlKHJvdXRlcikge1xuICAgIGNvbnN0IF9yb3V0ZXIxID0gcm91dGVyO1xuICAgIGNvbnN0IGluc3RhbmNlID0ge1xuICAgIH07XG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiB1cmxQcm9wZXJ0eUZpZWxkcyl7XG4gICAgICAgIGlmICh0eXBlb2YgX3JvdXRlcjFbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaW5zdGFuY2VbcHJvcGVydHldID0gT2JqZWN0LmFzc2lnbihBcnJheS5pc0FycmF5KF9yb3V0ZXIxW3Byb3BlcnR5XSkgPyBbXSA6IHtcbiAgICAgICAgICAgIH0sIF9yb3V0ZXIxW3Byb3BlcnR5XSkgLy8gbWFrZXMgc3VyZSBxdWVyeSBpcyBub3Qgc3RhdGVmdWxcbiAgICAgICAgICAgIDtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IF9yb3V0ZXIxW3Byb3BlcnR5XTtcbiAgICB9XG4gICAgLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuICAgIGluc3RhbmNlLmV2ZW50cyA9IF9yb3V0ZXIuZGVmYXVsdC5ldmVudHM7XG4gICAgY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZCk9PntcbiAgICAgICAgaW5zdGFuY2VbZmllbGRdID0gKC4uLmFyZ3MpPT57XG4gICAgICAgICAgICByZXR1cm4gX3JvdXRlcjFbZmllbGRdKC4uLmFyZ3MpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cm91dGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy51c2VJbnRlcnNlY3Rpb24gPSB1c2VJbnRlcnNlY3Rpb247XG52YXIgX3JlYWN0ID0gcmVxdWlyZShcInJlYWN0XCIpO1xudmFyIF9yZXF1ZXN0SWRsZUNhbGxiYWNrID0gcmVxdWlyZShcIi4vcmVxdWVzdC1pZGxlLWNhbGxiYWNrXCIpO1xuY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSB0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnO1xuZnVuY3Rpb24gdXNlSW50ZXJzZWN0aW9uKHsgcm9vdE1hcmdpbiAsIGRpc2FibGVkICB9KSB7XG4gICAgY29uc3QgaXNEaXNhYmxlZCA9IGRpc2FibGVkIHx8ICFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbiAgICBjb25zdCB1bm9ic2VydmUgPSAoMCwgX3JlYWN0KS51c2VSZWYoKTtcbiAgICBjb25zdCBbdmlzaWJsZSwgc2V0VmlzaWJsZV0gPSAoMCwgX3JlYWN0KS51c2VTdGF0ZShmYWxzZSk7XG4gICAgY29uc3Qgc2V0UmVmID0gKDAsIF9yZWFjdCkudXNlQ2FsbGJhY2soKGVsKT0+e1xuICAgICAgICBpZiAodW5vYnNlcnZlLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50KCk7XG4gICAgICAgICAgICB1bm9ic2VydmUuY3VycmVudCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNEaXNhYmxlZCB8fCB2aXNpYmxlKSByZXR1cm47XG4gICAgICAgIGlmIChlbCAmJiBlbC50YWdOYW1lKSB7XG4gICAgICAgICAgICB1bm9ic2VydmUuY3VycmVudCA9IG9ic2VydmUoZWwsIChpc1Zpc2libGUpPT5pc1Zpc2libGUgJiYgc2V0VmlzaWJsZShpc1Zpc2libGUpXG4gICAgICAgICAgICAsIHtcbiAgICAgICAgICAgICAgICByb290TWFyZ2luXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgaXNEaXNhYmxlZCxcbiAgICAgICAgcm9vdE1hcmdpbixcbiAgICAgICAgdmlzaWJsZVxuICAgIF0pO1xuICAgICgwLCBfcmVhY3QpLnVzZUVmZmVjdCgoKT0+e1xuICAgICAgICBpZiAoIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICAgICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBpZGxlQ2FsbGJhY2sgPSAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PnNldFZpc2libGUodHJ1ZSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybiAoKT0+KDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5jYW5jZWxJZGxlQ2FsbGJhY2soaWRsZUNhbGxiYWNrKVxuICAgICAgICAgICAgICAgIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgdmlzaWJsZVxuICAgIF0pO1xuICAgIHJldHVybiBbXG4gICAgICAgIHNldFJlZixcbiAgICAgICAgdmlzaWJsZVxuICAgIF07XG59XG5mdW5jdGlvbiBvYnNlcnZlKGVsZW1lbnQsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgY29uc3QgeyBpZCAsIG9ic2VydmVyICwgZWxlbWVudHMgIH0gPSBjcmVhdGVPYnNlcnZlcihvcHRpb25zKTtcbiAgICBlbGVtZW50cy5zZXQoZWxlbWVudCwgY2FsbGJhY2spO1xuICAgIG9ic2VydmVyLm9ic2VydmUoZWxlbWVudCk7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVub2JzZXJ2ZSgpIHtcbiAgICAgICAgZWxlbWVudHMuZGVsZXRlKGVsZW1lbnQpO1xuICAgICAgICBvYnNlcnZlci51bm9ic2VydmUoZWxlbWVudCk7XG4gICAgICAgIC8vIERlc3Ryb3kgb2JzZXJ2ZXIgd2hlbiB0aGVyZSdzIG5vdGhpbmcgbGVmdCB0byB3YXRjaDpcbiAgICAgICAgaWYgKGVsZW1lbnRzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIG9ic2VydmVycy5kZWxldGUoaWQpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmNvbnN0IG9ic2VydmVycyA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmVyKG9wdGlvbnMpIHtcbiAgICBjb25zdCBpZCA9IG9wdGlvbnMucm9vdE1hcmdpbiB8fCAnJztcbiAgICBsZXQgaW5zdGFuY2UgPSBvYnNlcnZlcnMuZ2V0KGlkKTtcbiAgICBpZiAoaW5zdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgIH1cbiAgICBjb25zdCBlbGVtZW50cyA9IG5ldyBNYXAoKTtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcyk9PntcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSk9PntcbiAgICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gZWxlbWVudHMuZ2V0KGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgICBjb25zdCBpc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZyB8fCBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDA7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sgJiYgaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaXNWaXNpYmxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSwgb3B0aW9ucyk7XG4gICAgb2JzZXJ2ZXJzLnNldChpZCwgaW5zdGFuY2UgPSB7XG4gICAgICAgIGlkLFxuICAgICAgICBvYnNlcnZlcixcbiAgICAgICAgZWxlbWVudHNcbiAgICB9KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVzZS1pbnRlcnNlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB3aXRoUm91dGVyO1xudmFyIF9yZWFjdCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcInJlYWN0XCIpKTtcbnZhciBfcm91dGVyID0gcmVxdWlyZShcIi4vcm91dGVyXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuZnVuY3Rpb24gd2l0aFJvdXRlcihDb21wb3NlZENvbXBvbmVudCkge1xuICAgIGZ1bmN0aW9uIFdpdGhSb3V0ZXJXcmFwcGVyKHByb3BzKSB7XG4gICAgICAgIHJldHVybigvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ29tcG9zZWRDb21wb25lbnQsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcm91dGVyOiAoMCwgX3JvdXRlcikudXNlUm91dGVyKClcbiAgICAgICAgfSwgcHJvcHMpKSk7XG4gICAgfVxuICAgIFdpdGhSb3V0ZXJXcmFwcGVyLmdldEluaXRpYWxQcm9wcyA9IENvbXBvc2VkQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcztcbiAgICBXaXRoUm91dGVyV3JhcHBlci5vcmlnR2V0SW5pdGlhbFByb3BzID0gQ29tcG9zZWRDb21wb25lbnQub3JpZ0dldEluaXRpYWxQcm9wcztcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCBuYW1lID0gQ29tcG9zZWRDb21wb25lbnQuZGlzcGxheU5hbWUgfHwgQ29tcG9zZWRDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bic7XG4gICAgICAgIFdpdGhSb3V0ZXJXcmFwcGVyLmRpc3BsYXlOYW1lID0gYHdpdGhSb3V0ZXIoJHtuYW1lfSlgO1xuICAgIH1cbiAgICByZXR1cm4gV2l0aFJvdXRlcldyYXBwZXI7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXdpdGgtcm91dGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5nZXREb21haW5Mb2NhbGUgPSBnZXREb21haW5Mb2NhbGU7XG5leHBvcnRzLmFkZExvY2FsZSA9IGFkZExvY2FsZTtcbmV4cG9ydHMuZGVsTG9jYWxlID0gZGVsTG9jYWxlO1xuZXhwb3J0cy5oYXNCYXNlUGF0aCA9IGhhc0Jhc2VQYXRoO1xuZXhwb3J0cy5hZGRCYXNlUGF0aCA9IGFkZEJhc2VQYXRoO1xuZXhwb3J0cy5kZWxCYXNlUGF0aCA9IGRlbEJhc2VQYXRoO1xuZXhwb3J0cy5pc0xvY2FsVVJMID0gaXNMb2NhbFVSTDtcbmV4cG9ydHMuaW50ZXJwb2xhdGVBcyA9IGludGVycG9sYXRlQXM7XG5leHBvcnRzLnJlc29sdmVIcmVmID0gcmVzb2x2ZUhyZWY7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2ggPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaFwiKTtcbnZhciBfcm91dGVMb2FkZXIgPSByZXF1aXJlKFwiLi4vLi4vLi4vY2xpZW50L3JvdXRlLWxvYWRlclwiKTtcbnZhciBfZGVub3JtYWxpemVQYWdlUGF0aCA9IHJlcXVpcmUoXCIuLi8uLi8uLi9zZXJ2ZXIvZGVub3JtYWxpemUtcGFnZS1wYXRoXCIpO1xudmFyIF9ub3JtYWxpemVMb2NhbGVQYXRoID0gcmVxdWlyZShcIi4uL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoXCIpO1xudmFyIF9taXR0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vbWl0dFwiKSk7XG52YXIgX3V0aWxzID0gcmVxdWlyZShcIi4uL3V0aWxzXCIpO1xudmFyIF9pc0R5bmFtaWMgPSByZXF1aXJlKFwiLi91dGlscy9pcy1keW5hbWljXCIpO1xudmFyIF9wYXJzZVJlbGF0aXZlVXJsID0gcmVxdWlyZShcIi4vdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsXCIpO1xudmFyIF9xdWVyeXN0cmluZyA9IHJlcXVpcmUoXCIuL3V0aWxzL3F1ZXJ5c3RyaW5nXCIpO1xudmFyIF9yZXNvbHZlUmV3cml0ZXMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3V0aWxzL3Jlc29sdmUtcmV3cml0ZXNcIikpO1xudmFyIF9yb3V0ZU1hdGNoZXIgPSByZXF1aXJlKFwiLi91dGlscy9yb3V0ZS1tYXRjaGVyXCIpO1xudmFyIF9yb3V0ZVJlZ2V4ID0gcmVxdWlyZShcIi4vdXRpbHMvcm91dGUtcmVnZXhcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG5sZXQgZGV0ZWN0RG9tYWluTG9jYWxlO1xuaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICBkZXRlY3REb21haW5Mb2NhbGUgPSByZXF1aXJlKCcuLi9pMThuL2RldGVjdC1kb21haW4tbG9jYWxlJykuZGV0ZWN0RG9tYWluTG9jYWxlO1xufVxuY29uc3QgYmFzZVBhdGggPSBwcm9jZXNzLmVudi5fX05FWFRfUk9VVEVSX0JBU0VQQVRIIHx8ICcnO1xuZnVuY3Rpb24gYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgRXJyb3IoJ1JvdXRlIENhbmNlbGxlZCcpLCB7XG4gICAgICAgIGNhbmNlbGxlZDogdHJ1ZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkUGF0aFByZWZpeChwYXRoLCBwcmVmaXgpIHtcbiAgICByZXR1cm4gcHJlZml4ICYmIHBhdGguc3RhcnRzV2l0aCgnLycpID8gcGF0aCA9PT0gJy8nID8gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5ub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaChwcmVmaXgpIDogYCR7cHJlZml4fSR7cGF0aE5vUXVlcnlIYXNoKHBhdGgpID09PSAnLycgPyBwYXRoLnN1YnN0cmluZygxKSA6IHBhdGh9YCA6IHBhdGg7XG59XG5mdW5jdGlvbiBnZXREb21haW5Mb2NhbGUocGF0aCwgbG9jYWxlLCBsb2NhbGVzLCBkb21haW5Mb2NhbGVzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgbG9jYWxlID0gbG9jYWxlIHx8ICgwLCBfbm9ybWFsaXplTG9jYWxlUGF0aCkubm9ybWFsaXplTG9jYWxlUGF0aChwYXRoLCBsb2NhbGVzKS5kZXRlY3RlZExvY2FsZTtcbiAgICAgICAgY29uc3QgZGV0ZWN0ZWREb21haW4gPSBkZXRlY3REb21haW5Mb2NhbGUoZG9tYWluTG9jYWxlcywgdW5kZWZpbmVkLCBsb2NhbGUpO1xuICAgICAgICBpZiAoZGV0ZWN0ZWREb21haW4pIHtcbiAgICAgICAgICAgIHJldHVybiBgaHR0cCR7ZGV0ZWN0ZWREb21haW4uaHR0cCA/ICcnIDogJ3MnfTovLyR7ZGV0ZWN0ZWREb21haW4uZG9tYWlufSR7YmFzZVBhdGggfHwgJyd9JHtsb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGUgPyAnJyA6IGAvJHtsb2NhbGV9YH0ke3BhdGh9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGFkZExvY2FsZShwYXRoLCBsb2NhbGUsIGRlZmF1bHRMb2NhbGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICBjb25zdCBwYXRobmFtZSA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKTtcbiAgICAgICAgY29uc3QgcGF0aExvd2VyID0gcGF0aG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG9jYWxlTG93ZXIgPSBsb2NhbGUgJiYgbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsb2NhbGUgJiYgbG9jYWxlICE9PSBkZWZhdWx0TG9jYWxlICYmICFwYXRoTG93ZXIuc3RhcnRzV2l0aCgnLycgKyBsb2NhbGVMb3dlciArICcvJykgJiYgcGF0aExvd2VyICE9PSAnLycgKyBsb2NhbGVMb3dlciA/IGFkZFBhdGhQcmVmaXgocGF0aCwgJy8nICsgbG9jYWxlKSA6IHBhdGg7XG4gICAgfVxuICAgIHJldHVybiBwYXRoO1xufVxuZnVuY3Rpb24gZGVsTG9jYWxlKHBhdGgsIGxvY2FsZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIGNvbnN0IHBhdGhuYW1lID0gcGF0aE5vUXVlcnlIYXNoKHBhdGgpO1xuICAgICAgICBjb25zdCBwYXRoTG93ZXIgPSBwYXRobmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjb25zdCBsb2NhbGVMb3dlciA9IGxvY2FsZSAmJiBsb2NhbGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgcmV0dXJuIGxvY2FsZSAmJiAocGF0aExvd2VyLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlTG93ZXIgKyAnLycpIHx8IHBhdGhMb3dlciA9PT0gJy8nICsgbG9jYWxlTG93ZXIpID8gKHBhdGhuYW1lLmxlbmd0aCA9PT0gbG9jYWxlLmxlbmd0aCArIDEgPyAnLycgOiAnJykgKyBwYXRoLnN1YnN0cihsb2NhbGUubGVuZ3RoICsgMSkgOiBwYXRoO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbmZ1bmN0aW9uIHBhdGhOb1F1ZXJ5SGFzaChwYXRoKSB7XG4gICAgY29uc3QgcXVlcnlJbmRleCA9IHBhdGguaW5kZXhPZignPycpO1xuICAgIGNvbnN0IGhhc2hJbmRleCA9IHBhdGguaW5kZXhPZignIycpO1xuICAgIGlmIChxdWVyeUluZGV4ID4gLTEgfHwgaGFzaEluZGV4ID4gLTEpIHtcbiAgICAgICAgcGF0aCA9IHBhdGguc3Vic3RyaW5nKDAsIHF1ZXJ5SW5kZXggPiAtMSA/IHF1ZXJ5SW5kZXggOiBoYXNoSW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbmZ1bmN0aW9uIGhhc0Jhc2VQYXRoKHBhdGgpIHtcbiAgICBwYXRoID0gcGF0aE5vUXVlcnlIYXNoKHBhdGgpO1xuICAgIHJldHVybiBwYXRoID09PSBiYXNlUGF0aCB8fCBwYXRoLnN0YXJ0c1dpdGgoYmFzZVBhdGggKyAnLycpO1xufVxuZnVuY3Rpb24gYWRkQmFzZVBhdGgocGF0aCkge1xuICAgIC8vIHdlIG9ubHkgYWRkIHRoZSBiYXNlcGF0aCBvbiByZWxhdGl2ZSB1cmxzXG4gICAgcmV0dXJuIGFkZFBhdGhQcmVmaXgocGF0aCwgYmFzZVBhdGgpO1xufVxuZnVuY3Rpb24gZGVsQmFzZVBhdGgocGF0aCkge1xuICAgIHBhdGggPSBwYXRoLnNsaWNlKGJhc2VQYXRoLmxlbmd0aCk7XG4gICAgaWYgKCFwYXRoLnN0YXJ0c1dpdGgoJy8nKSkgcGF0aCA9IGAvJHtwYXRofWA7XG4gICAgcmV0dXJuIHBhdGg7XG59XG5mdW5jdGlvbiBpc0xvY2FsVVJMKHVybCkge1xuICAgIC8vIHByZXZlbnQgYSBoeWRyYXRpb24gbWlzbWF0Y2ggb24gaHJlZiBmb3IgdXJsIHdpdGggYW5jaG9yIHJlZnNcbiAgICBpZiAodXJsLnN0YXJ0c1dpdGgoJy8nKSB8fCB1cmwuc3RhcnRzV2l0aCgnIycpIHx8IHVybC5zdGFydHNXaXRoKCc/JykpIHJldHVybiB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIC8vIGFic29sdXRlIHVybHMgY2FuIGJlIGxvY2FsIGlmIHRoZXkgYXJlIG9uIHRoZSBzYW1lIG9yaWdpblxuICAgICAgICBjb25zdCBsb2NhdGlvbk9yaWdpbiA9ICgwLCBfdXRpbHMpLmdldExvY2F0aW9uT3JpZ2luKCk7XG4gICAgICAgIGNvbnN0IHJlc29sdmVkID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uT3JpZ2luKTtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVkLm9yaWdpbiA9PT0gbG9jYXRpb25PcmlnaW4gJiYgaGFzQmFzZVBhdGgocmVzb2x2ZWQucGF0aG5hbWUpO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGludGVycG9sYXRlQXMocm91dGUsIGFzUGF0aG5hbWUsIHF1ZXJ5KSB7XG4gICAgbGV0IGludGVycG9sYXRlZFJvdXRlID0gJyc7XG4gICAgY29uc3QgZHluYW1pY1JlZ2V4ID0gKDAsIF9yb3V0ZVJlZ2V4KS5nZXRSb3V0ZVJlZ2V4KHJvdXRlKTtcbiAgICBjb25zdCBkeW5hbWljR3JvdXBzID0gZHluYW1pY1JlZ2V4Lmdyb3VwcztcbiAgICBjb25zdCBkeW5hbWljTWF0Y2hlcyA9IC8vIFRyeSB0byBtYXRjaCB0aGUgZHluYW1pYyByb3V0ZSBhZ2FpbnN0IHRoZSBhc1BhdGhcbiAgICAoYXNQYXRobmFtZSAhPT0gcm91dGUgPyAoMCwgX3JvdXRlTWF0Y2hlcikuZ2V0Um91dGVNYXRjaGVyKGR5bmFtaWNSZWdleCkoYXNQYXRobmFtZSkgOiAnJykgfHwgLy8gRmFsbCBiYWNrIHRvIHJlYWRpbmcgdGhlIHZhbHVlcyBmcm9tIHRoZSBocmVmXG4gICAgLy8gVE9ETzogc2hvdWxkIHRoaXMgdGFrZSBwcmlvcml0eTsgYWxzbyBuZWVkIHRvIGNoYW5nZSBpbiB0aGUgcm91dGVyLlxuICAgIHF1ZXJ5O1xuICAgIGludGVycG9sYXRlZFJvdXRlID0gcm91dGU7XG4gICAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmtleXMoZHluYW1pY0dyb3Vwcyk7XG4gICAgaWYgKCFwYXJhbXMuZXZlcnkoKHBhcmFtKT0+e1xuICAgICAgICBsZXQgdmFsdWUgPSBkeW5hbWljTWF0Y2hlc1twYXJhbV0gfHwgJyc7XG4gICAgICAgIGNvbnN0IHsgcmVwZWF0ICwgb3B0aW9uYWwgIH0gPSBkeW5hbWljR3JvdXBzW3BhcmFtXTtcbiAgICAgICAgLy8gc3VwcG9ydCBzaW5nbGUtbGV2ZWwgY2F0Y2gtYWxsXG4gICAgICAgIC8vIFRPRE86IG1vcmUgcm9idXN0IGhhbmRsaW5nIGZvciB1c2VyLWVycm9yIChwYXNzaW5nIGAvYClcbiAgICAgICAgbGV0IHJlcGxhY2VkID0gYFske3JlcGVhdCA/ICcuLi4nIDogJyd9JHtwYXJhbX1dYDtcbiAgICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgICAgICByZXBsYWNlZCA9IGAkeyF2YWx1ZSA/ICcvJyA6ICcnfVske3JlcGxhY2VkfV1gO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXBlYXQgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IFtcbiAgICAgICAgICAgIHZhbHVlXG4gICAgICAgIF07XG4gICAgICAgIHJldHVybiAob3B0aW9uYWwgfHwgcGFyYW0gaW4gZHluYW1pY01hdGNoZXMpICYmIC8vIEludGVycG9sYXRlIGdyb3VwIGludG8gZGF0YSBVUkwgaWYgcHJlc2VudFxuICAgICAgICAoaW50ZXJwb2xhdGVkUm91dGUgPSBpbnRlcnBvbGF0ZWRSb3V0ZS5yZXBsYWNlKHJlcGxhY2VkLCByZXBlYXQgPyB2YWx1ZS5tYXAoLy8gdGhlc2UgdmFsdWVzIHNob3VsZCBiZSBmdWxseSBlbmNvZGVkIGluc3RlYWQgb2YganVzdFxuICAgICAgICAvLyBwYXRoIGRlbGltaXRlciBlc2NhcGVkIHNpbmNlIHRoZXkgYXJlIGJlaW5nIGluc2VydGVkXG4gICAgICAgIC8vIGludG8gdGhlIFVSTCBhbmQgd2UgZXhwZWN0IFVSTCBlbmNvZGVkIHNlZ21lbnRzXG4gICAgICAgIC8vIHdoZW4gcGFyc2luZyBkeW5hbWljIHJvdXRlIHBhcmFtc1xuICAgICAgICAoc2VnbWVudCk9PmVuY29kZVVSSUNvbXBvbmVudChzZWdtZW50KVxuICAgICAgICApLmpvaW4oJy8nKSA6IGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpIHx8ICcvJyk7XG4gICAgfSkpIHtcbiAgICAgICAgaW50ZXJwb2xhdGVkUm91dGUgPSAnJyAvLyBkaWQgbm90IHNhdGlzZnkgYWxsIHJlcXVpcmVtZW50c1xuICAgICAgICA7XG4gICAgLy8gbi5iLiBXZSBpZ25vcmUgdGhpcyBlcnJvciBiZWNhdXNlIHdlIGhhbmRsZSB3YXJuaW5nIGZvciB0aGlzIGNhc2UgaW5cbiAgICAvLyBkZXZlbG9wbWVudCBpbiB0aGUgYDxMaW5rPmAgY29tcG9uZW50IGRpcmVjdGx5LlxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHJlc3VsdDogaW50ZXJwb2xhdGVkUm91dGVcbiAgICB9O1xufVxuZnVuY3Rpb24gb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpIHtcbiAgICBjb25zdCBmaWx0ZXJlZFF1ZXJ5ID0ge1xuICAgIH07XG4gICAgT2JqZWN0LmtleXMocXVlcnkpLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgaWYgKCFwYXJhbXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgZmlsdGVyZWRRdWVyeVtrZXldID0gcXVlcnlba2V5XTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBmaWx0ZXJlZFF1ZXJ5O1xufVxuZnVuY3Rpb24gcmVzb2x2ZUhyZWYocm91dGVyLCBocmVmLCByZXNvbHZlQXMpIHtcbiAgICAvLyB3ZSB1c2UgYSBkdW1teSBiYXNlIHVybCBmb3IgcmVsYXRpdmUgdXJsc1xuICAgIGxldCBiYXNlO1xuICAgIGxldCB1cmxBc1N0cmluZyA9IHR5cGVvZiBocmVmID09PSAnc3RyaW5nJyA/IGhyZWYgOiAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihocmVmKTtcbiAgICAvLyByZXBlYXRlZCBzbGFzaGVzIGFuZCBiYWNrc2xhc2hlcyBpbiB0aGUgVVJMIGFyZSBjb25zaWRlcmVkXG4gICAgLy8gaW52YWxpZCBhbmQgd2lsbCBuZXZlciBtYXRjaCBhIE5leHQuanMgcGFnZS9maWxlXG4gICAgY29uc3QgdXJsUHJvdG9NYXRjaCA9IHVybEFzU3RyaW5nLm1hdGNoKC9eW2EtekEtWl17MSx9OlxcL1xcLy8pO1xuICAgIGNvbnN0IHVybEFzU3RyaW5nTm9Qcm90byA9IHVybFByb3RvTWF0Y2ggPyB1cmxBc1N0cmluZy5zdWJzdHIodXJsUHJvdG9NYXRjaFswXS5sZW5ndGgpIDogdXJsQXNTdHJpbmc7XG4gICAgY29uc3QgdXJsUGFydHMgPSB1cmxBc1N0cmluZ05vUHJvdG8uc3BsaXQoJz8nKTtcbiAgICBpZiAoKHVybFBhcnRzWzBdIHx8ICcnKS5tYXRjaCgvKFxcL1xcL3xcXFxcKS8pKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgaHJlZiBwYXNzZWQgdG8gbmV4dC9yb3V0ZXI6ICR7dXJsQXNTdHJpbmd9LCByZXBlYXRlZCBmb3J3YXJkLXNsYXNoZXMgKC8vKSBvciBiYWNrc2xhc2hlcyBcXFxcIGFyZSBub3QgdmFsaWQgaW4gdGhlIGhyZWZgKTtcbiAgICAgICAgY29uc3Qgbm9ybWFsaXplZFVybCA9ICgwLCBfdXRpbHMpLm5vcm1hbGl6ZVJlcGVhdGVkU2xhc2hlcyh1cmxBc1N0cmluZ05vUHJvdG8pO1xuICAgICAgICB1cmxBc1N0cmluZyA9ICh1cmxQcm90b01hdGNoID8gdXJsUHJvdG9NYXRjaFswXSA6ICcnKSArIG5vcm1hbGl6ZWRVcmw7XG4gICAgfVxuICAgIC8vIFJldHVybiBiZWNhdXNlIGl0IGNhbm5vdCBiZSByb3V0ZWQgYnkgdGhlIE5leHQuanMgcm91dGVyXG4gICAgaWYgKCFpc0xvY2FsVVJMKHVybEFzU3RyaW5nKSkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZUFzID8gW1xuICAgICAgICAgICAgdXJsQXNTdHJpbmdcbiAgICAgICAgXSA6IHVybEFzU3RyaW5nO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBiYXNlID0gbmV3IFVSTCh1cmxBc1N0cmluZy5zdGFydHNXaXRoKCcjJykgPyByb3V0ZXIuYXNQYXRoIDogcm91dGVyLnBhdGhuYW1lLCAnaHR0cDovL24nKTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIC8vIGZhbGxiYWNrIHRvIC8gZm9yIGludmFsaWQgYXNQYXRoIHZhbHVlcyBlLmcuIC8vXG4gICAgICAgIGJhc2UgPSBuZXcgVVJMKCcvJywgJ2h0dHA6Ly9uJyk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGZpbmFsVXJsID0gbmV3IFVSTCh1cmxBc1N0cmluZywgYmFzZSk7XG4gICAgICAgIGZpbmFsVXJsLnBhdGhuYW1lID0gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5ub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaChmaW5hbFVybC5wYXRobmFtZSk7XG4gICAgICAgIGxldCBpbnRlcnBvbGF0ZWRBcyA9ICcnO1xuICAgICAgICBpZiAoKDAsIF9pc0R5bmFtaWMpLmlzRHluYW1pY1JvdXRlKGZpbmFsVXJsLnBhdGhuYW1lKSAmJiBmaW5hbFVybC5zZWFyY2hQYXJhbXMgJiYgcmVzb2x2ZUFzKSB7XG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9ICgwLCBfcXVlcnlzdHJpbmcpLnNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoZmluYWxVcmwuc2VhcmNoUGFyYW1zKTtcbiAgICAgICAgICAgIGNvbnN0IHsgcmVzdWx0ICwgcGFyYW1zICB9ID0gaW50ZXJwb2xhdGVBcyhmaW5hbFVybC5wYXRobmFtZSwgZmluYWxVcmwucGF0aG5hbWUsIHF1ZXJ5KTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZWRBcyA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgaGFzaDogZmluYWxVcmwuaGFzaCxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeSwgcGFyYW1zKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZSBvcmlnaW4gZGlkbid0IGNoYW5nZSwgaXQgbWVhbnMgd2UgcmVjZWl2ZWQgYSByZWxhdGl2ZSBocmVmXG4gICAgICAgIGNvbnN0IHJlc29sdmVkSHJlZiA9IGZpbmFsVXJsLm9yaWdpbiA9PT0gYmFzZS5vcmlnaW4gPyBmaW5hbFVybC5ocmVmLnNsaWNlKGZpbmFsVXJsLm9yaWdpbi5sZW5ndGgpIDogZmluYWxVcmwuaHJlZjtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVBcyA/IFtcbiAgICAgICAgICAgIHJlc29sdmVkSHJlZixcbiAgICAgICAgICAgIGludGVycG9sYXRlZEFzIHx8IHJlc29sdmVkSHJlZlxuICAgICAgICBdIDogcmVzb2x2ZWRIcmVmO1xuICAgIH0gY2F0Y2ggKF8pIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVBcyA/IFtcbiAgICAgICAgICAgIHVybEFzU3RyaW5nXG4gICAgICAgIF0gOiB1cmxBc1N0cmluZztcbiAgICB9XG59XG5mdW5jdGlvbiBzdHJpcE9yaWdpbih1cmwpIHtcbiAgICBjb25zdCBvcmlnaW4gPSAoMCwgX3V0aWxzKS5nZXRMb2NhdGlvbk9yaWdpbigpO1xuICAgIHJldHVybiB1cmwuc3RhcnRzV2l0aChvcmlnaW4pID8gdXJsLnN1YnN0cmluZyhvcmlnaW4ubGVuZ3RoKSA6IHVybDtcbn1cbmZ1bmN0aW9uIHByZXBhcmVVcmxBcyhyb3V0ZXIsIHVybCwgYXMpIHtcbiAgICAvLyBJZiB1cmwgYW5kIGFzIHByb3ZpZGVkIGFzIGFuIG9iamVjdCByZXByZXNlbnRhdGlvbixcbiAgICAvLyB3ZSdsbCBmb3JtYXQgdGhlbSBpbnRvIHRoZSBzdHJpbmcgdmVyc2lvbiBoZXJlLlxuICAgIGxldCBbcmVzb2x2ZWRIcmVmLCByZXNvbHZlZEFzXSA9IHJlc29sdmVIcmVmKHJvdXRlciwgdXJsLCB0cnVlKTtcbiAgICBjb25zdCBvcmlnaW4gPSAoMCwgX3V0aWxzKS5nZXRMb2NhdGlvbk9yaWdpbigpO1xuICAgIGNvbnN0IGhyZWZIYWRPcmlnaW4gPSByZXNvbHZlZEhyZWYuc3RhcnRzV2l0aChvcmlnaW4pO1xuICAgIGNvbnN0IGFzSGFkT3JpZ2luID0gcmVzb2x2ZWRBcyAmJiByZXNvbHZlZEFzLnN0YXJ0c1dpdGgob3JpZ2luKTtcbiAgICByZXNvbHZlZEhyZWYgPSBzdHJpcE9yaWdpbihyZXNvbHZlZEhyZWYpO1xuICAgIHJlc29sdmVkQXMgPSByZXNvbHZlZEFzID8gc3RyaXBPcmlnaW4ocmVzb2x2ZWRBcykgOiByZXNvbHZlZEFzO1xuICAgIGNvbnN0IHByZXBhcmVkVXJsID0gaHJlZkhhZE9yaWdpbiA/IHJlc29sdmVkSHJlZiA6IGFkZEJhc2VQYXRoKHJlc29sdmVkSHJlZik7XG4gICAgY29uc3QgcHJlcGFyZWRBcyA9IGFzID8gc3RyaXBPcmlnaW4ocmVzb2x2ZUhyZWYocm91dGVyLCBhcykpIDogcmVzb2x2ZWRBcyB8fCByZXNvbHZlZEhyZWY7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdXJsOiBwcmVwYXJlZFVybCxcbiAgICAgICAgYXM6IGFzSGFkT3JpZ2luID8gcHJlcGFyZWRBcyA6IGFkZEJhc2VQYXRoKHByZXBhcmVkQXMpXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVEeW5hbWljUm91dGUocGF0aG5hbWUsIHBhZ2VzKSB7XG4gICAgY29uc3QgY2xlYW5QYXRobmFtZSA9ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2goKDAsIF9kZW5vcm1hbGl6ZVBhZ2VQYXRoKS5kZW5vcm1hbGl6ZVBhZ2VQYXRoKHBhdGhuYW1lKSk7XG4gICAgaWYgKGNsZWFuUGF0aG5hbWUgPT09ICcvNDA0JyB8fCBjbGVhblBhdGhuYW1lID09PSAnL19lcnJvcicpIHtcbiAgICAgICAgcmV0dXJuIHBhdGhuYW1lO1xuICAgIH1cbiAgICAvLyBoYW5kbGUgcmVzb2x2aW5nIGhyZWYgZm9yIGR5bmFtaWMgcm91dGVzXG4gICAgaWYgKCFwYWdlcy5pbmNsdWRlcyhjbGVhblBhdGhuYW1lKSkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgYXJyYXktY2FsbGJhY2stcmV0dXJuXG4gICAgICAgIHBhZ2VzLnNvbWUoKHBhZ2UpPT57XG4gICAgICAgICAgICBpZiAoKDAsIF9pc0R5bmFtaWMpLmlzRHluYW1pY1JvdXRlKHBhZ2UpICYmICgwLCBfcm91dGVSZWdleCkuZ2V0Um91dGVSZWdleChwYWdlKS5yZS50ZXN0KGNsZWFuUGF0aG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUgPSBwYWdlO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUpO1xufVxuY29uc3QgbWFudWFsU2Nyb2xsUmVzdG9yYXRpb24gPSBwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OICYmIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmICdzY3JvbGxSZXN0b3JhdGlvbicgaW4gd2luZG93Lmhpc3RvcnkgJiYgISFmdW5jdGlvbigpIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgdiA9ICdfX25leHQnO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VxdWVuY2VzXG4gICAgICAgIHJldHVybiBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKHYsIHYpLCBzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKHYpLCB0cnVlO1xuICAgIH0gY2F0Y2ggKG4pIHtcbiAgICB9XG59KCk7XG5jb25zdCBTU0dfREFUQV9OT1RfRk9VTkQgPSBTeW1ib2woJ1NTR19EQVRBX05PVF9GT1VORCcpO1xuZnVuY3Rpb24gZmV0Y2hSZXRyeSh1cmwsIGF0dGVtcHRzKSB7XG4gICAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgICAgICAvLyBDb29raWVzIGFyZSByZXF1aXJlZCB0byBiZSBwcmVzZW50IGZvciBOZXh0LmpzJyBTU0cgXCJQcmV2aWV3IE1vZGVcIi5cbiAgICAgICAgLy8gQ29va2llcyBtYXkgYWxzbyBiZSByZXF1aXJlZCBmb3IgYGdldFNlcnZlclNpZGVQcm9wc2AuXG4gICAgICAgIC8vXG4gICAgICAgIC8vID4gYGZldGNoYCB3b27igJl0IHNlbmQgY29va2llcywgdW5sZXNzIHlvdSBzZXQgdGhlIGNyZWRlbnRpYWxzIGluaXRcbiAgICAgICAgLy8gPiBvcHRpb24uXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAgICAgICAgLy9cbiAgICAgICAgLy8gPiBGb3IgbWF4aW11bSBicm93c2VyIGNvbXBhdGliaWxpdHkgd2hlbiBpdCBjb21lcyB0byBzZW5kaW5nICZcbiAgICAgICAgLy8gPiByZWNlaXZpbmcgY29va2llcywgYWx3YXlzIHN1cHBseSB0aGUgYGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nYFxuICAgICAgICAvLyA+IG9wdGlvbiBpbnN0ZWFkIG9mIHJlbHlpbmcgb24gdGhlIGRlZmF1bHQuXG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9naXRodWIvZmV0Y2gjY2F2ZWF0c1xuICAgICAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ1xuICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgIGlmIChhdHRlbXB0cyA+IDEgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmV0Y2hSZXRyeSh1cmwsIGF0dGVtcHRzIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCkudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEubm90Rm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90Rm91bmQ6IFNTR19EQVRBX05PVF9GT1VORFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBsb2FkIHN0YXRpYyBwcm9wc2ApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIGlzU2VydmVyUmVuZGVyKSB7XG4gICAgcmV0dXJuIGZldGNoUmV0cnkoZGF0YUhyZWYsIGlzU2VydmVyUmVuZGVyID8gMyA6IDEpLmNhdGNoKChlcnIpPT57XG4gICAgICAgIC8vIFdlIHNob3VsZCBvbmx5IHRyaWdnZXIgYSBzZXJ2ZXItc2lkZSB0cmFuc2l0aW9uIGlmIHRoaXMgd2FzIGNhdXNlZFxuICAgICAgICAvLyBvbiBhIGNsaWVudC1zaWRlIHRyYW5zaXRpb24uIE90aGVyd2lzZSwgd2UnZCBnZXQgaW50byBhbiBpbmZpbml0ZVxuICAgICAgICAvLyBsb29wLlxuICAgICAgICBpZiAoIWlzU2VydmVyUmVuZGVyKSB7XG4gICAgICAgICAgICAoMCwgX3JvdXRlTG9hZGVyKS5tYXJrQXNzZXRFcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9KTtcbn1cbmNsYXNzIFJvdXRlciB7XG4gICAgY29uc3RydWN0b3IocGF0aG5hbWUxLCBxdWVyeTEsIGFzMSwgeyBpbml0aWFsUHJvcHMgLCBwYWdlTG9hZGVyICwgQXBwICwgd3JhcEFwcCAsIENvbXBvbmVudDogQ29tcG9uZW50MSAsIGVycjogZXJyMSAsIHN1YnNjcmlwdGlvbiAsIGlzRmFsbGJhY2sgLCBsb2NhbGUgLCBsb2NhbGVzICwgZGVmYXVsdExvY2FsZSAsIGRvbWFpbkxvY2FsZXMgLCBpc1ByZXZpZXcgIH0pe1xuICAgICAgICAvLyBTdGF0aWMgRGF0YSBDYWNoZVxuICAgICAgICB0aGlzLnNkYyA9IHtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gSW4tZmxpZ2h0IFNlcnZlciBEYXRhIFJlcXVlc3RzLCBmb3IgZGVkdXBpbmdcbiAgICAgICAgdGhpcy5zZHIgPSB7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2lkeCA9IDA7XG4gICAgICAgIHRoaXMub25Qb3BTdGF0ZSA9IChlKT0+e1xuICAgICAgICAgICAgY29uc3Qgc3RhdGUgPSBlLnN0YXRlO1xuICAgICAgICAgICAgaWYgKCFzdGF0ZSkge1xuICAgICAgICAgICAgICAgIC8vIFdlIGdldCBzdGF0ZSBhcyB1bmRlZmluZWQgZm9yIHR3byByZWFzb25zLlxuICAgICAgICAgICAgICAgIC8vICAxLiBXaXRoIG9sZGVyIHNhZmFyaSAoPCA4KSBhbmQgb2xkZXIgY2hyb21lICg8IDM0KVxuICAgICAgICAgICAgICAgIC8vICAyLiBXaGVuIHRoZSBVUkwgY2hhbmdlZCB3aXRoICNcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIEluIHRoZSBib3RoIGNhc2VzLCB3ZSBkb24ndCBuZWVkIHRvIHByb2NlZWQgYW5kIGNoYW5nZSB0aGUgcm91dGUuXG4gICAgICAgICAgICAgICAgLy8gKGFzIGl0J3MgYWxyZWFkeSBjaGFuZ2VkKVxuICAgICAgICAgICAgICAgIC8vIEJ1dCB3ZSBjYW4gc2ltcGx5IHJlcGxhY2UgdGhlIHN0YXRlIHdpdGggdGhlIG5ldyBjaGFuZ2VzLlxuICAgICAgICAgICAgICAgIC8vIEFjdHVhbGx5LCBmb3IgKDEpIHdlIGRvbid0IG5lZWQgdG8gbm90aGluZy4gQnV0IGl0J3MgaGFyZCB0byBkZXRlY3QgdGhhdCBldmVudC5cbiAgICAgICAgICAgICAgICAvLyBTbywgZG9pbmcgdGhlIGZvbGxvd2luZyBmb3IgKDEpIGRvZXMgbm8gaGFybS5cbiAgICAgICAgICAgICAgICBjb25zdCB7IHBhdGhuYW1lOiBwYXRobmFtZTEgLCBxdWVyeTogcXVlcnkxICB9ID0gdGhpcztcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKCdyZXBsYWNlU3RhdGUnLCAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBhZGRCYXNlUGF0aChwYXRobmFtZTEpLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkxXG4gICAgICAgICAgICAgICAgfSksICgwLCBfdXRpbHMpLmdldFVSTCgpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0YXRlLl9fTikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBmb3JjZWRTY3JvbGw7XG4gICAgICAgICAgICBjb25zdCB7IHVybCAsIGFzOiBhczEgLCBvcHRpb25zICwgaWR4ICB9ID0gc3RhdGU7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgICAgICAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faWR4ICE9PSBpZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNuYXBzaG90IGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdfX25leHRfc2Nyb2xsXycgKyB0aGlzLl9pZHgsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogc2VsZi5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogc2VsZi5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgb2xkIHNjcm9sbCBwb3NpdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ19fbmV4dF9zY3JvbGxfJyArIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VkU2Nyb2xsID0gSlNPTi5wYXJzZSh2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3JjZWRTY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5faWR4ID0gaWR4O1xuICAgICAgICAgICAgY29uc3QgeyBwYXRobmFtZTogcGF0aG5hbWUxICB9ID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKHVybCk7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2UgZG9uJ3QgcmUtcmVuZGVyIG9uIGluaXRpYWwgbG9hZCxcbiAgICAgICAgICAgIC8vIGNhbiBiZSBjYXVzZWQgYnkgbmF2aWdhdGluZyBiYWNrIGZyb20gYW4gZXh0ZXJuYWwgc2l0ZVxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTc3IgJiYgYXMxID09PSB0aGlzLmFzUGF0aCAmJiBwYXRobmFtZTEgPT09IHRoaXMucGF0aG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJZiB0aGUgZG93bnN0cmVhbSBhcHBsaWNhdGlvbiByZXR1cm5zIGZhbHN5LCByZXR1cm4uXG4gICAgICAgICAgICAvLyBUaGV5IHdpbGwgdGhlbiBiZSByZXNwb25zaWJsZSBmb3IgaGFuZGxpbmcgdGhlIGV2ZW50LlxuICAgICAgICAgICAgaWYgKHRoaXMuX2JwcyAmJiAhdGhpcy5fYnBzKHN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlKCdyZXBsYWNlU3RhdGUnLCB1cmwsIGFzMSwgT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICB9LCBvcHRpb25zLCB7XG4gICAgICAgICAgICAgICAgc2hhbGxvdzogb3B0aW9ucy5zaGFsbG93ICYmIHRoaXMuX3NoYWxsb3csXG4gICAgICAgICAgICAgICAgbG9jYWxlOiBvcHRpb25zLmxvY2FsZSB8fCB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgICAgIH0pLCBmb3JjZWRTY3JvbGwpO1xuICAgICAgICB9O1xuICAgICAgICAvLyByZXByZXNlbnRzIHRoZSBjdXJyZW50IGNvbXBvbmVudCBrZXlcbiAgICAgICAgdGhpcy5yb3V0ZSA9ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUxKTtcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBjb21wb25lbnQgY2FjaGUgKGJ5IHJvdXRlIGtleXMpXG4gICAgICAgIHRoaXMuY29tcG9uZW50cyA9IHtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gV2Ugc2hvdWxkIG5vdCBrZWVwIHRoZSBjYWNoZSwgaWYgdGhlcmUncyBhbiBlcnJvclxuICAgICAgICAvLyBPdGhlcndpc2UsIHRoaXMgY2F1c2UgaXNzdWVzIHdoZW4gd2hlbiBnb2luZyBiYWNrIGFuZFxuICAgICAgICAvLyBjb21lIGFnYWluIHRvIHRoZSBlcnJvcmVkIHBhZ2UuXG4gICAgICAgIGlmIChwYXRobmFtZTEgIT09ICcvX2Vycm9yJykge1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzW3RoaXMucm91dGVdID0ge1xuICAgICAgICAgICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50MSxcbiAgICAgICAgICAgICAgICBpbml0aWFsOiB0cnVlLFxuICAgICAgICAgICAgICAgIHByb3BzOiBpbml0aWFsUHJvcHMsXG4gICAgICAgICAgICAgICAgZXJyOiBlcnIxLFxuICAgICAgICAgICAgICAgIF9fTl9TU0c6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTRyxcbiAgICAgICAgICAgICAgICBfX05fU1NQOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU1BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jb21wb25lbnRzWycvX2FwcCddID0ge1xuICAgICAgICAgICAgQ29tcG9uZW50OiBBcHAsXG4gICAgICAgICAgICBzdHlsZVNoZWV0czogW11cbiAgICAgICAgfTtcbiAgICAgICAgLy8gQmFja3dhcmRzIGNvbXBhdCBmb3IgUm91dGVyLnJvdXRlci5ldmVudHNcbiAgICAgICAgLy8gVE9ETzogU2hvdWxkIGJlIHJlbW92ZSB0aGUgZm9sbG93aW5nIG1ham9yIHZlcnNpb24gYXMgaXQgd2FzIG5ldmVyIGRvY3VtZW50ZWRcbiAgICAgICAgdGhpcy5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzO1xuICAgICAgICB0aGlzLnBhZ2VMb2FkZXIgPSBwYWdlTG9hZGVyO1xuICAgICAgICB0aGlzLnBhdGhuYW1lID0gcGF0aG5hbWUxO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnkxO1xuICAgICAgICAvLyBpZiBhdXRvIHByZXJlbmRlcmVkIGFuZCBkeW5hbWljIHJvdXRlIHdhaXQgdG8gdXBkYXRlIGFzUGF0aFxuICAgICAgICAvLyB1bnRpbCBhZnRlciBtb3VudCB0byBwcmV2ZW50IGh5ZHJhdGlvbiBtaXNtYXRjaFxuICAgICAgICBjb25zdCBhdXRvRXhwb3J0RHluYW1pYyA9ICgwLCBfaXNEeW5hbWljKS5pc0R5bmFtaWNSb3V0ZShwYXRobmFtZTEpICYmIHNlbGYuX19ORVhUX0RBVEFfXy5hdXRvRXhwb3J0O1xuICAgICAgICB0aGlzLmFzUGF0aCA9IGF1dG9FeHBvcnREeW5hbWljID8gcGF0aG5hbWUxIDogYXMxO1xuICAgICAgICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGg7XG4gICAgICAgIHRoaXMuc3ViID0gc3Vic2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNsYyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3dyYXBBcHAgPSB3cmFwQXBwO1xuICAgICAgICAvLyBtYWtlIHN1cmUgdG8gaWdub3JlIGV4dHJhIHBvcFN0YXRlIGluIHNhZmFyaSBvbiBuYXZpZ2F0aW5nXG4gICAgICAgIC8vIGJhY2sgZnJvbSBleHRlcm5hbCBzaXRlXG4gICAgICAgIHRoaXMuaXNTc3IgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzRmFsbGJhY2sgPSBpc0ZhbGxiYWNrO1xuICAgICAgICB0aGlzLmlzUmVhZHkgPSAhIShzZWxmLl9fTkVYVF9EQVRBX18uZ3NzcCB8fCBzZWxmLl9fTkVYVF9EQVRBX18uZ2lwIHx8IHNlbGYuX19ORVhUX0RBVEFfXy5hcHBHaXAgJiYgIXNlbGYuX19ORVhUX0RBVEFfXy5nc3AgfHwgIWF1dG9FeHBvcnREeW5hbWljICYmICFzZWxmLmxvY2F0aW9uLnNlYXJjaCAmJiAhcHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyk7XG4gICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gISFpc1ByZXZpZXc7XG4gICAgICAgIHRoaXMuaXNMb2NhbGVEb21haW4gPSBmYWxzZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlO1xuICAgICAgICAgICAgdGhpcy5sb2NhbGVzID0gbG9jYWxlcztcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdExvY2FsZSA9IGRlZmF1bHRMb2NhbGU7XG4gICAgICAgICAgICB0aGlzLmRvbWFpbkxvY2FsZXMgPSBkb21haW5Mb2NhbGVzO1xuICAgICAgICAgICAgdGhpcy5pc0xvY2FsZURvbWFpbiA9ICEhZGV0ZWN0RG9tYWluTG9jYWxlKGRvbWFpbkxvY2FsZXMsIHNlbGYubG9jYXRpb24uaG9zdG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgLy8gbWFrZSBzdXJlIFwiYXNcIiBkb2Vzbid0IHN0YXJ0IHdpdGggZG91YmxlIHNsYXNoZXMgb3IgZWxzZSBpdCBjYW5cbiAgICAgICAgICAgIC8vIHRocm93IGFuIGVycm9yIGFzIGl0J3MgY29uc2lkZXJlZCBpbnZhbGlkXG4gICAgICAgICAgICBpZiAoYXMxLnN1YnN0cigwLCAyKSAhPT0gJy8vJykge1xuICAgICAgICAgICAgICAgIC8vIGluIG9yZGVyIGZvciBgZS5zdGF0ZWAgdG8gd29yayBvbiB0aGUgYG9ucG9wc3RhdGVgIGV2ZW50XG4gICAgICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byByZWdpc3RlciB0aGUgaW5pdGlhbCByb3V0ZSB1cG9uIGluaXRpYWxpemF0aW9uXG4gICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBvcHRpb25zLl9zaG91bGRSZXNvbHZlSHJlZiA9IGFzMSAhPT0gcGF0aG5hbWUxO1xuICAgICAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoJ3JlcGxhY2VTdGF0ZScsICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IGFkZEJhc2VQYXRoKHBhdGhuYW1lMSksXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBxdWVyeTFcbiAgICAgICAgICAgICAgICB9KSwgKDAsIF91dGlscykuZ2V0VVJMKCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKTtcbiAgICAgICAgICAgIC8vIGVuYWJsZSBjdXN0b20gc2Nyb2xsIHJlc3RvcmF0aW9uIGhhbmRsaW5nIHdoZW4gYXZhaWxhYmxlXG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgZmFsbGJhY2sgdG8gYnJvd3NlcidzIGRlZmF1bHQgaGFuZGxpbmdcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnNjcm9sbFJlc3RvcmF0aW9uID0gJ21hbnVhbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbG9hZCgpIHtcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgICAvKipcbiAgICogR28gYmFjayBpbiBoaXN0b3J5XG4gICAqLyBiYWNrKCkge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxuICAgIC8qKlxuICAgKiBQZXJmb3JtcyBhIGBwdXNoU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi8gcHVzaCh1cmwsIGFzLCBvcHRpb25zID0ge1xuICAgIH0pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgICAgICAgIC8vIFRPRE86IHJlbW92ZSBpbiB0aGUgZnV0dXJlIHdoZW4gd2UgdXBkYXRlIGhpc3RvcnkgYmVmb3JlIHJvdXRlIGNoYW5nZVxuICAgICAgICAgICAgLy8gaXMgY29tcGxldGUsIGFzIHRoZSBwb3BzdGF0ZSBldmVudCBzaG91bGQgaGFuZGxlIHRoaXMgY2FwdHVyZS5cbiAgICAgICAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNuYXBzaG90IHNjcm9sbCBwb3NpdGlvbiByaWdodCBiZWZvcmUgbmF2aWdhdGluZyB0byBhIG5ldyBwYWdlOlxuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCdfX25leHRfc2Nyb2xsXycgKyB0aGlzLl9pZHgsIEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHNlbGYucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiBzZWxmLnBhZ2VZT2Zmc2V0XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoICB7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICh7IHVybCAsIGFzICB9ID0gcHJlcGFyZVVybEFzKHRoaXMsIHVybCwgYXMpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKCdwdXNoU3RhdGUnLCB1cmwsIGFzLCBvcHRpb25zKTtcbiAgICB9XG4gICAgLyoqXG4gICAqIFBlcmZvcm1zIGEgYHJlcGxhY2VTdGF0ZWAgd2l0aCBhcmd1bWVudHNcbiAgICogQHBhcmFtIHVybCBvZiB0aGUgcm91dGVcbiAgICogQHBhcmFtIGFzIG1hc2tzIGB1cmxgIGZvciB0aGUgYnJvd3NlclxuICAgKiBAcGFyYW0gb3B0aW9ucyBvYmplY3QgeW91IGNhbiBkZWZpbmUgYHNoYWxsb3dgIGFuZCBvdGhlciBvcHRpb25zXG4gICAqLyByZXBsYWNlKHVybCwgYXMsIG9wdGlvbnMgPSB7XG4gICAgfSkge1xuICAgICAgICAoeyB1cmwgLCBhcyAgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgncmVwbGFjZVN0YXRlJywgdXJsLCBhcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIGFzeW5jIGNoYW5nZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMsIGZvcmNlZFNjcm9sbCkge1xuICAgICAgICBpZiAoIWlzTG9jYWxVUkwodXJsKSkge1xuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB1cmw7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2hvdWxkUmVzb2x2ZUhyZWYgPSB1cmwgPT09IGFzIHx8IG9wdGlvbnMuX2ggfHwgb3B0aW9ucy5fc2hvdWxkUmVzb2x2ZUhyZWY7XG4gICAgICAgIC8vIGZvciBzdGF0aWMgcGFnZXMgd2l0aCBxdWVyeSBwYXJhbXMgaW4gdGhlIFVSTCB3ZSBkZWxheVxuICAgICAgICAvLyBtYXJraW5nIHRoZSByb3V0ZXIgcmVhZHkgdW50aWwgYWZ0ZXIgdGhlIHF1ZXJ5IGlzIHVwZGF0ZWRcbiAgICAgICAgaWYgKG9wdGlvbnMuX2gpIHtcbiAgICAgICAgICAgIHRoaXMuaXNSZWFkeSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcHJldkxvY2FsZSA9IHRoaXMubG9jYWxlO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAgICAgdGhpcy5sb2NhbGUgPSBvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2UgPyB0aGlzLmRlZmF1bHRMb2NhbGUgOiBvcHRpb25zLmxvY2FsZSB8fCB0aGlzLmxvY2FsZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSB0aGlzLmxvY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZEFzID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKGhhc0Jhc2VQYXRoKGFzKSA/IGRlbEJhc2VQYXRoKGFzKSA6IGFzKTtcbiAgICAgICAgICAgIGNvbnN0IGxvY2FsZVBhdGhSZXN1bHQgPSAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGFyc2VkQXMucGF0aG5hbWUsIHRoaXMubG9jYWxlcyk7XG4gICAgICAgICAgICBpZiAobG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9jYWxlID0gbG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZTtcbiAgICAgICAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGFkZEJhc2VQYXRoKHBhcnNlZEFzLnBhdGhuYW1lKTtcbiAgICAgICAgICAgICAgICBhcyA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKTtcbiAgICAgICAgICAgICAgICB1cmwgPSBhZGRCYXNlUGF0aCgoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgoaGFzQmFzZVBhdGgodXJsKSA/IGRlbEJhc2VQYXRoKHVybCkgOiB1cmwsIHRoaXMubG9jYWxlcykucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRpZE5hdmlnYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVmO1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBsb2NhbGUgaXNuJ3QgY29uZmlndXJlZCBoYXJkIG5hdmlnYXRlIHRvIHNob3cgNDA0IHBhZ2VcbiAgICAgICAgICAgICAgICBpZiAoISgocmVmID0gdGhpcy5sb2NhbGVzKSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHJlZi5pbmNsdWRlcyh0aGlzLmxvY2FsZSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gYWRkTG9jYWxlKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpO1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdhcyBwcmV2aW91c2x5IGEgcmV0dXJuIGJ1dCB3YXMgcmVtb3ZlZCBpbiBmYXZvclxuICAgICAgICAgICAgICAgICAgICAvLyBvZiBiZXR0ZXIgZGVhZCBjb2RlIGVsaW1pbmF0aW9uIHdpdGggcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgICAgICAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZGV0ZWN0ZWREb21haW4gPSBkZXRlY3REb21haW5Mb2NhbGUodGhpcy5kb21haW5Mb2NhbGVzLCB1bmRlZmluZWQsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGluIHRoZSBlbnYgY2hlY2sgYWdhaW4gc2luY2UgcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgICAgICAgLy8gbW92ZXMgdGhpcyBvbiBpdHMgb3duIGR1ZSB0byB0aGUgcmV0dXJuXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAgICAgICAgIC8vIGlmIHdlIGFyZSBuYXZpZ2F0aW5nIHRvIGEgZG9tYWluIGxvY2FsZSBlbnN1cmUgd2UgcmVkaXJlY3QgdG8gdGhlXG4gICAgICAgICAgICAgICAgLy8gY29ycmVjdCBkb21haW5cbiAgICAgICAgICAgICAgICBpZiAoIWRpZE5hdmlnYXRlICYmIGRldGVjdGVkRG9tYWluICYmIHRoaXMuaXNMb2NhbGVEb21haW4gJiYgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAhPT0gZGV0ZWN0ZWREb21haW4uZG9tYWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFzTm9CYXNlUGF0aCA9IGRlbEJhc2VQYXRoKGFzKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBgaHR0cCR7ZGV0ZWN0ZWREb21haW4uaHR0cCA/ICcnIDogJ3MnfTovLyR7ZGV0ZWN0ZWREb21haW4uZG9tYWlufSR7YWRkQmFzZVBhdGgoYCR7dGhpcy5sb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGUgPyAnJyA6IGAvJHt0aGlzLmxvY2FsZX1gfSR7YXNOb0Jhc2VQYXRoID09PSAnLycgPyAnJyA6IGFzTm9CYXNlUGF0aH1gIHx8ICcvJyl9YDtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3YXMgcHJldmlvdXNseSBhIHJldHVybiBidXQgd2FzIHJlbW92ZWQgaW4gZmF2b3JcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICAgICAgICAgICAgZGlkTmF2aWdhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkaWROYXZpZ2F0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgoKT0+e1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghb3B0aW9ucy5faCkge1xuICAgICAgICAgICAgdGhpcy5pc1NzciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIG1hcmtpbmcgcm91dGUgY2hhbmdlcyBhcyBhIG5hdmlnYXRpb24gc3RhcnQgZW50cnlcbiAgICAgICAgaWYgKF91dGlscy5TVCkge1xuICAgICAgICAgICAgcGVyZm9ybWFuY2UubWFyaygncm91dGVDaGFuZ2UnKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHNoYWxsb3cgPWZhbHNlICB9ID0gb3B0aW9ucztcbiAgICAgICAgY29uc3Qgcm91dGVQcm9wcyA9IHtcbiAgICAgICAgICAgIHNoYWxsb3dcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuX2luRmxpZ2h0Um91dGUpIHtcbiAgICAgICAgICAgIHRoaXMuYWJvcnRDb21wb25lbnRMb2FkKHRoaXMuX2luRmxpZ2h0Um91dGUsIHJvdXRlUHJvcHMpO1xuICAgICAgICB9XG4gICAgICAgIGFzID0gYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGhhc0Jhc2VQYXRoKGFzKSA/IGRlbEJhc2VQYXRoKGFzKSA6IGFzLCBvcHRpb25zLmxvY2FsZSwgdGhpcy5kZWZhdWx0TG9jYWxlKSk7XG4gICAgICAgIGNvbnN0IGNsZWFuZWRBcyA9IGRlbExvY2FsZShoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcywgdGhpcy5sb2NhbGUpO1xuICAgICAgICB0aGlzLl9pbkZsaWdodFJvdXRlID0gYXM7XG4gICAgICAgIGxldCBsb2NhbGVDaGFuZ2UgPSBwcmV2TG9jYWxlICE9PSB0aGlzLmxvY2FsZTtcbiAgICAgICAgLy8gSWYgdGhlIHVybCBjaGFuZ2UgaXMgb25seSByZWxhdGVkIHRvIGEgaGFzaCBjaGFuZ2VcbiAgICAgICAgLy8gV2Ugc2hvdWxkIG5vdCBwcm9jZWVkLiBXZSBzaG91bGQgb25seSBjaGFuZ2UgdGhlIHN0YXRlLlxuICAgICAgICAvLyBXQVJOSU5HOiBgX2hgIGlzIGFuIGludGVybmFsIG9wdGlvbiBmb3IgaGFuZGluZyBOZXh0LmpzIGNsaWVudC1zaWRlXG4gICAgICAgIC8vIGh5ZHJhdGlvbi4gWW91ciBhcHAgc2hvdWxkIF9uZXZlcl8gdXNlIHRoaXMgcHJvcGVydHkuIEl0IG1heSBjaGFuZ2UgYXRcbiAgICAgICAgLy8gYW55IHRpbWUgd2l0aG91dCBub3RpY2UuXG4gICAgICAgIGlmICghb3B0aW9ucy5faCAmJiB0aGlzLm9ubHlBSGFzaENoYW5nZShjbGVhbmVkQXMpICYmICFsb2NhbGVDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuYXNQYXRoID0gY2xlYW5lZEFzO1xuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdoYXNoQ2hhbmdlU3RhcnQnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICAvLyBUT0RPOiBkbyB3ZSBuZWVkIHRoZSByZXNvbHZlZCBocmVmIHdoZW4gb25seSBhIGhhc2ggY2hhbmdlP1xuICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxUb0hhc2goY2xlYW5lZEFzKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KHRoaXMuY29tcG9uZW50c1t0aGlzLnJvdXRlXSwgbnVsbCk7XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VDb21wbGV0ZScsIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXJzZWQgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwodXJsKTtcbiAgICAgICAgbGV0IHsgcGF0aG5hbWU6IHBhdGhuYW1lMSAsIHF1ZXJ5OiBxdWVyeTEgIH0gPSBwYXJzZWQ7XG4gICAgICAgIC8vIFRoZSBidWlsZCBtYW5pZmVzdCBuZWVkcyB0byBiZSBsb2FkZWQgYmVmb3JlIGF1dG8tc3RhdGljIGR5bmFtaWMgcGFnZXNcbiAgICAgICAgLy8gZ2V0IHRoZWlyIHF1ZXJ5IHBhcmFtZXRlcnMgdG8gYWxsb3cgZW5zdXJpbmcgdGhleSBjYW4gYmUgcGFyc2VkIHByb3Blcmx5XG4gICAgICAgIC8vIHdoZW4gcmV3cml0dGVuIHRvXG4gICAgICAgIGxldCBwYWdlcywgcmV3cml0ZXM7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYWdlcyA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5nZXRQYWdlTGlzdCgpO1xuICAgICAgICAgICAgKHsgX19yZXdyaXRlczogcmV3cml0ZXMgIH0gPSBhd2FpdCAoMCwgX3JvdXRlTG9hZGVyKS5nZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkpO1xuICAgICAgICB9IGNhdGNoIChlcnIxKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBmYWlsIHRvIHJlc29sdmUgdGhlIHBhZ2UgbGlzdCBvciBjbGllbnQtYnVpbGQgbWFuaWZlc3QsIHdlIG11c3RcbiAgICAgICAgICAgIC8vIGRvIGEgc2VydmVyLXNpZGUgdHJhbnNpdGlvbjpcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXM7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgYXNrZWQgdG8gY2hhbmdlIHRoZSBjdXJyZW50IFVSTCB3ZSBzaG91bGQgcmVsb2FkIHRoZSBjdXJyZW50IHBhZ2VcbiAgICAgICAgLy8gKG5vdCBsb2NhdGlvbi5yZWxvYWQoKSBidXQgcmVsb2FkIGdldEluaXRpYWxQcm9wcyBhbmQgb3RoZXIgTmV4dC5qcyBzdHVmZnMpXG4gICAgICAgIC8vIFdlIGFsc28gbmVlZCB0byBzZXQgdGhlIG1ldGhvZCA9IHJlcGxhY2VTdGF0ZSBhbHdheXNcbiAgICAgICAgLy8gYXMgdGhpcyBzaG91bGQgbm90IGdvIGludG8gdGhlIGhpc3RvcnkgKFRoYXQncyBob3cgYnJvd3NlcnMgd29yaylcbiAgICAgICAgLy8gV2Ugc2hvdWxkIGNvbXBhcmUgdGhlIG5ldyBhc1BhdGggdG8gdGhlIGN1cnJlbnQgYXNQYXRoLCBub3QgdGhlIHVybFxuICAgICAgICBpZiAoIXRoaXMudXJsSXNOZXcoY2xlYW5lZEFzKSAmJiAhbG9jYWxlQ2hhbmdlKSB7XG4gICAgICAgICAgICBtZXRob2QgPSAncmVwbGFjZVN0YXRlJztcbiAgICAgICAgfVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHJlc29sdmUgdGhlIGFzIHZhbHVlIHVzaW5nIHJld3JpdGVzIGZvciBkeW5hbWljIFNTR1xuICAgICAgICAvLyBwYWdlcyB0byBhbGxvdyBidWlsZGluZyB0aGUgZGF0YSBVUkwgY29ycmVjdGx5XG4gICAgICAgIGxldCByZXNvbHZlZEFzID0gYXM7XG4gICAgICAgIC8vIHVybCBhbmQgYXMgc2hvdWxkIGFsd2F5cyBiZSBwcmVmaXhlZCB3aXRoIGJhc2VQYXRoIGJ5IHRoaXNcbiAgICAgICAgLy8gcG9pbnQgYnkgZWl0aGVyIG5leHQvbGluayBvciByb3V0ZXIucHVzaC9yZXBsYWNlIHNvIHN0cmlwIHRoZVxuICAgICAgICAvLyBiYXNlUGF0aCBmcm9tIHRoZSBwYXRobmFtZSB0byBtYXRjaCB0aGUgcGFnZXMgZGlyIDEtdG8tMVxuICAgICAgICBwYXRobmFtZTEgPSBwYXRobmFtZTEgPyAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKGRlbEJhc2VQYXRoKHBhdGhuYW1lMSkpIDogcGF0aG5hbWUxO1xuICAgICAgICBpZiAoc2hvdWxkUmVzb2x2ZUhyZWYgJiYgcGF0aG5hbWUxICE9PSAnL19lcnJvcicpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuX3Nob3VsZFJlc29sdmVIcmVmID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTICYmIGFzLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJld3JpdGVzUmVzdWx0ID0gKDAsIF9yZXNvbHZlUmV3cml0ZXMpLmRlZmF1bHQoYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGNsZWFuZWRBcywgdGhpcy5sb2NhbGUpKSwgcGFnZXMsIHJld3JpdGVzLCBxdWVyeTEsIChwKT0+cmVzb2x2ZUR5bmFtaWNSb3V0ZShwLCBwYWdlcylcbiAgICAgICAgICAgICAgICAsIHRoaXMubG9jYWxlcyk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZWRBcyA9IHJld3JpdGVzUmVzdWx0LmFzUGF0aDtcbiAgICAgICAgICAgICAgICBpZiAocmV3cml0ZXNSZXN1bHQubWF0Y2hlZFBhZ2UgJiYgcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgZGlyZWN0bHkgbWF0Y2hlcyBhIHBhZ2Ugd2UgbmVlZCB0byB1cGRhdGUgdGhlIGhyZWYgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gYWxsb3cgdGhlIGNvcnJlY3QgcGFnZSBjaHVuayB0byBiZSBsb2FkZWRcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUxID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmO1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXRobmFtZTEpO1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXRobmFtZTEsIHBhZ2VzKTtcbiAgICAgICAgICAgICAgICBpZiAocGFyc2VkLnBhdGhuYW1lICE9PSBwYXRobmFtZTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUxID0gcGFyc2VkLnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXRobmFtZTEpO1xuICAgICAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3V0ZSA9ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkucmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aG5hbWUxKTtcbiAgICAgICAgaWYgKCFpc0xvY2FsVVJMKGFzKSkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgaHJlZjogXCIke3VybH1cIiBhbmQgYXM6IFwiJHthc31cIiwgcmVjZWl2ZWQgcmVsYXRpdmUgaHJlZiBhbmQgZXh0ZXJuYWwgYXNgICsgYFxcblNlZSBtb3JlIGluZm86IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL2ludmFsaWQtcmVsYXRpdmUtdXJsLWV4dGVybmFsLWFzYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmVkQXMgPSBkZWxMb2NhbGUoZGVsQmFzZVBhdGgocmVzb2x2ZWRBcyksIHRoaXMubG9jYWxlKTtcbiAgICAgICAgaWYgKCgwLCBfaXNEeW5hbWljKS5pc0R5bmFtaWNSb3V0ZShyb3V0ZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhcnNlZEFzID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKHJlc29sdmVkQXMpO1xuICAgICAgICAgICAgY29uc3QgYXNQYXRobmFtZSA9IHBhcnNlZEFzLnBhdGhuYW1lO1xuICAgICAgICAgICAgY29uc3Qgcm91dGVSZWdleCA9ICgwLCBfcm91dGVSZWdleCkuZ2V0Um91dGVSZWdleChyb3V0ZSk7XG4gICAgICAgICAgICBjb25zdCByb3V0ZU1hdGNoID0gKDAsIF9yb3V0ZU1hdGNoZXIpLmdldFJvdXRlTWF0Y2hlcihyb3V0ZVJlZ2V4KShhc1BhdGhuYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZEludGVycG9sYXRlID0gcm91dGUgPT09IGFzUGF0aG5hbWU7XG4gICAgICAgICAgICBjb25zdCBpbnRlcnBvbGF0ZWRBcyA9IHNob3VsZEludGVycG9sYXRlID8gaW50ZXJwb2xhdGVBcyhyb3V0ZSwgYXNQYXRobmFtZSwgcXVlcnkxKSA6IHtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIXJvdXRlTWF0Y2ggfHwgc2hvdWxkSW50ZXJwb2xhdGUgJiYgIWludGVycG9sYXRlZEFzLnJlc3VsdCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1pc3NpbmdQYXJhbXMgPSBPYmplY3Qua2V5cyhyb3V0ZVJlZ2V4Lmdyb3VwcykuZmlsdGVyKChwYXJhbSk9PiFxdWVyeTFbcGFyYW1dXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBpZiAobWlzc2luZ1BhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYCR7c2hvdWxkSW50ZXJwb2xhdGUgPyBgSW50ZXJwb2xhdGluZyBocmVmYCA6IGBNaXNtYXRjaGluZyBcXGBhc1xcYCBhbmQgXFxgaHJlZlxcYGB9IGZhaWxlZCB0byBtYW51YWxseSBwcm92aWRlIGAgKyBgdGhlIHBhcmFtczogJHttaXNzaW5nUGFyYW1zLmpvaW4oJywgJyl9IGluIHRoZSBcXGBocmVmXFxgJ3MgXFxgcXVlcnlcXGBgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKHNob3VsZEludGVycG9sYXRlID8gYFRoZSBwcm92aWRlZCBcXGBocmVmXFxgICgke3VybH0pIHZhbHVlIGlzIG1pc3NpbmcgcXVlcnkgdmFsdWVzICgke21pc3NpbmdQYXJhbXMuam9pbignLCAnKX0pIHRvIGJlIGludGVycG9sYXRlZCBwcm9wZXJseS4gYCA6IGBUaGUgcHJvdmlkZWQgXFxgYXNcXGAgdmFsdWUgKCR7YXNQYXRobmFtZX0pIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoZSBcXGBocmVmXFxgIHZhbHVlICgke3JvdXRlfSkuIGApICsgYFJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvJHtzaG91bGRJbnRlcnBvbGF0ZSA/ICdocmVmLWludGVycG9sYXRpb24tZmFpbGVkJyA6ICdpbmNvbXBhdGlibGUtaHJlZi1hcyd9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChzaG91bGRJbnRlcnBvbGF0ZSkge1xuICAgICAgICAgICAgICAgIGFzID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICAgICAgfSwgcGFyc2VkQXMsIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWU6IGludGVycG9sYXRlZEFzLnJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeTEsIGludGVycG9sYXRlZEFzLnBhcmFtcylcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE1lcmdlIHBhcmFtcyBpbnRvIGBxdWVyeWAsIG92ZXJ3cml0aW5nIGFueSBzcGVjaWZpZWQgaW4gc2VhcmNoXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihxdWVyeTEsIHJvdXRlTWF0Y2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VTdGFydCcsIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICAgICAgICBsZXQgcm91dGVJbmZvID0gYXdhaXQgdGhpcy5nZXRSb3V0ZUluZm8ocm91dGUsIHBhdGhuYW1lMSwgcXVlcnkxLCBhcywgcmVzb2x2ZWRBcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICBsZXQgeyBlcnJvciAsIHByb3BzICwgX19OX1NTRyAsIF9fTl9TU1AgIH0gPSByb3V0ZUluZm87XG4gICAgICAgICAgICAvLyBoYW5kbGUgcmVkaXJlY3Qgb24gY2xpZW50LXRyYW5zaXRpb25cbiAgICAgICAgICAgIGlmICgoX19OX1NTRyB8fCBfX05fU1NQKSAmJiBwcm9wcykge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wcy5wYWdlUHJvcHMgJiYgcHJvcHMucGFnZVByb3BzLl9fTl9SRURJUkVDVCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IHByb3BzLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1Q7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNoZWNrIGlmIGRlc3RpbmF0aW9uIGlzIGludGVybmFsIChyZXNvbHZlcyB0byBhIHBhZ2UpIGFuZCBhdHRlbXB0XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsaWVudC1uYXZpZ2F0aW9uIGlmIGl0IGlzIGZhbGxpbmcgYmFjayB0byBoYXJkIG5hdmlnYXRpb24gaWZcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQncyBub3RcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlc3RpbmF0aW9uLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkSHJlZiA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRIcmVmLnBhdGhuYW1lID0gcmVzb2x2ZUR5bmFtaWNSb3V0ZShwYXJzZWRIcmVmLnBhdGhuYW1lLCBwYWdlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHVybDogbmV3VXJsICwgYXM6IG5ld0FzICB9ID0gcHJlcGFyZVVybEFzKHRoaXMsIGRlc3RpbmF0aW9uLCBkZXN0aW5hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UobWV0aG9kLCBuZXdVcmwsIG5ld0FzLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRlc3RpbmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuaXNQcmV2aWV3ID0gISFwcm9wcy5fX05fUFJFVklFVztcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgU1NHIGRhdGEgNDA0XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzLm5vdEZvdW5kID09PSBTU0dfREFUQV9OT1RfRk9VTkQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5vdEZvdW5kUm91dGU7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KCcvNDA0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RGb3VuZFJvdXRlID0gJy80MDQnO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub3RGb3VuZFJvdXRlID0gJy9fZXJyb3InO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJvdXRlSW5mbyA9IGF3YWl0IHRoaXMuZ2V0Um91dGVJbmZvKG5vdEZvdW5kUm91dGUsIG5vdEZvdW5kUm91dGUsIHF1ZXJ5MSwgYXMsIHJlc29sdmVkQXMsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYWxsb3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnYmVmb3JlSGlzdG9yeUNoYW5nZScsIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYXBwQ29tcCA9IHRoaXMuY29tcG9uZW50c1snL19hcHAnXS5Db21wb25lbnQ7XG4gICAgICAgICAgICAgICAgd2luZG93Lm5leHQuaXNQcmVyZW5kZXJlZCA9IGFwcENvbXAuZ2V0SW5pdGlhbFByb3BzID09PSBhcHBDb21wLm9yaWdHZXRJbml0aWFsUHJvcHMgJiYgIXJvdXRlSW5mby5Db21wb25lbnQuZ2V0SW5pdGlhbFByb3BzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuX2ggJiYgcGF0aG5hbWUxID09PSAnL19lcnJvcicgJiYgKChyZWYgPSBzZWxmLl9fTkVYVF9EQVRBX18ucHJvcHMpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogKHJlZjEgPSByZWYucGFnZVByb3BzKSA9PT0gbnVsbCB8fCByZWYxID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZWYxLnN0YXR1c0NvZGUpID09PSA1MDAgJiYgKHByb3BzID09PSBudWxsIHx8IHByb3BzID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwcm9wcy5wYWdlUHJvcHMpKSB7XG4gICAgICAgICAgICAgICAgLy8gZW5zdXJlIHN0YXR1c0NvZGUgaXMgc3RpbGwgY29ycmVjdCBmb3Igc3RhdGljIDUwMCBwYWdlXG4gICAgICAgICAgICAgICAgLy8gd2hlbiB1cGRhdGluZyBxdWVyeSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgIHByb3BzLnBhZ2VQcm9wcy5zdGF0dXNDb2RlID0gNTAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2hhbGxvdyByb3V0aW5nIGlzIG9ubHkgYWxsb3dlZCBmb3Igc2FtZSBwYWdlIFVSTCBjaGFuZ2VzLlxuICAgICAgICAgICAgY29uc3QgaXNWYWxpZFNoYWxsb3dSb3V0ZSA9IG9wdGlvbnMuc2hhbGxvdyAmJiB0aGlzLnJvdXRlID09PSByb3V0ZTtcbiAgICAgICAgICAgIHZhciBfc2Nyb2xsO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkU2Nyb2xsID0gKF9zY3JvbGwgPSBvcHRpb25zLnNjcm9sbCkgIT09IG51bGwgJiYgX3Njcm9sbCAhPT0gdm9pZCAwID8gX3Njcm9sbCA6ICFpc1ZhbGlkU2hhbGxvd1JvdXRlO1xuICAgICAgICAgICAgY29uc3QgcmVzZXRTY3JvbGwgPSBzaG91bGRTY3JvbGwgPyB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICB9IDogbnVsbDtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMuc2V0KHJvdXRlLCBwYXRobmFtZTEsIHF1ZXJ5MSwgY2xlYW5lZEFzLCByb3V0ZUluZm8sIGZvcmNlZFNjcm9sbCAhPT0gbnVsbCAmJiBmb3JjZWRTY3JvbGwgIT09IHZvaWQgMCA/IGZvcmNlZFNjcm9sbCA6IHJlc2V0U2Nyb2xsKS5jYXRjaCgoZSk9PntcbiAgICAgICAgICAgICAgICBpZiAoZS5jYW5jZWxsZWQpIGVycm9yID0gZXJyb3IgfHwgZTtcbiAgICAgICAgICAgICAgICBlbHNlIHRocm93IGU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VFcnJvcicsIGVycm9yLCBjbGVhbmVkQXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sb2NhbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgPSB0aGlzLmxvY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBjYXRjaCAoZXJyMSkge1xuICAgICAgICAgICAgaWYgKGVycjEuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgZXJyMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMgPSB7XG4gICAgfSkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBXYXJuaW5nOiB3aW5kb3cuaGlzdG9yeSBpcyBub3QgYXZhaWxhYmxlLmApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnlbbWV0aG9kXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBXYXJuaW5nOiB3aW5kb3cuaGlzdG9yeS4ke21ldGhvZH0gaXMgbm90IGF2YWlsYWJsZWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWV0aG9kICE9PSAncHVzaFN0YXRlJyB8fCAoMCwgX3V0aWxzKS5nZXRVUkwoKSAhPT0gYXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3NoYWxsb3cgPSBvcHRpb25zLnNoYWxsb3c7XG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeVttZXRob2RdKHtcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgYXMsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgICBfX046IHRydWUsXG4gICAgICAgICAgICAgICAgaWR4OiB0aGlzLl9pZHggPSBtZXRob2QgIT09ICdwdXNoU3RhdGUnID8gdGhpcy5faWR4IDogdGhpcy5faWR4ICsgMVxuICAgICAgICAgICAgfSwgLy8gTW9zdCBicm93c2VycyBjdXJyZW50bHkgaWdub3JlcyB0aGlzIHBhcmFtZXRlciwgYWx0aG91Z2ggdGhleSBtYXkgdXNlIGl0IGluIHRoZSBmdXR1cmUuXG4gICAgICAgICAgICAvLyBQYXNzaW5nIHRoZSBlbXB0eSBzdHJpbmcgaGVyZSBzaG91bGQgYmUgc2FmZSBhZ2FpbnN0IGZ1dHVyZSBjaGFuZ2VzIHRvIHRoZSBtZXRob2QuXG4gICAgICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvSGlzdG9yeS9yZXBsYWNlU3RhdGVcbiAgICAgICAgICAgICcnLCBhcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgaGFuZGxlUm91dGVJbmZvRXJyb3IoZXJyLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZVByb3BzLCBsb2FkRXJyb3JGYWlsKSB7XG4gICAgICAgIGlmIChlcnIuY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAvLyBidWJibGUgdXAgY2FuY2VsbGF0aW9uIGVycm9yc1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoMCwgX3JvdXRlTG9hZGVyKS5pc0Fzc2V0RXJyb3IoZXJyKSB8fCBsb2FkRXJyb3JGYWlsKSB7XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnIsIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIC8vIElmIHdlIGNhbid0IGxvYWQgdGhlIHBhZ2UgaXQgY291bGQgYmUgb25lIG9mIGZvbGxvd2luZyByZWFzb25zXG4gICAgICAgICAgICAvLyAgMS4gUGFnZSBkb2Vzbid0IGV4aXN0c1xuICAgICAgICAgICAgLy8gIDIuIFBhZ2UgZG9lcyBleGlzdCBpbiBhIGRpZmZlcmVudCB6b25lXG4gICAgICAgICAgICAvLyAgMy4gSW50ZXJuYWwgZXJyb3Igd2hpbGUgbG9hZGluZyB0aGUgcGFnZVxuICAgICAgICAgICAgLy8gU28sIGRvaW5nIGEgaGFyZCByZWxvYWQgaXMgdGhlIHByb3BlciB3YXkgdG8gZGVhbCB3aXRoIHRoaXMuXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzO1xuICAgICAgICAgICAgLy8gQ2hhbmdpbmcgdGhlIFVSTCBkb2Vzbid0IGJsb2NrIGV4ZWN1dGluZyB0aGUgY3VycmVudCBjb2RlIHBhdGguXG4gICAgICAgICAgICAvLyBTbyBsZXQncyB0aHJvdyBhIGNhbmNlbGxhdGlvbiBlcnJvciBzdG9wIHRoZSByb3V0aW5nIGxvZ2ljLlxuICAgICAgICAgICAgdGhyb3cgYnVpbGRDYW5jZWxsYXRpb25FcnJvcigpO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgQ29tcG9uZW50MTtcbiAgICAgICAgICAgIGxldCBzdHlsZVNoZWV0cztcbiAgICAgICAgICAgIGxldCBwcm9wcztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgQ29tcG9uZW50MSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHN0eWxlU2hlZXRzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICh7IHBhZ2U6IENvbXBvbmVudDEgLCBzdHlsZVNoZWV0cyAgfSA9IGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQoJy9fZXJyb3InKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCByb3V0ZUluZm8gPSB7XG4gICAgICAgICAgICAgICAgcHJvcHMsXG4gICAgICAgICAgICAgICAgQ29tcG9uZW50OiBDb21wb25lbnQxLFxuICAgICAgICAgICAgICAgIHN0eWxlU2hlZXRzLFxuICAgICAgICAgICAgICAgIGVycixcbiAgICAgICAgICAgICAgICBlcnJvcjogZXJyXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFyb3V0ZUluZm8ucHJvcHMpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByb3V0ZUluZm8ucHJvcHMgPSBhd2FpdCB0aGlzLmdldEluaXRpYWxQcm9wcyhDb21wb25lbnQxLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGdpcEVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBlcnJvciBwYWdlIGBnZXRJbml0aWFsUHJvcHNgOiAnLCBnaXBFcnIpO1xuICAgICAgICAgICAgICAgICAgICByb3V0ZUluZm8ucHJvcHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvdXRlSW5mbztcbiAgICAgICAgfSBjYXRjaCAocm91dGVJbmZvRXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihyb3V0ZUluZm9FcnIsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJvdXRlUHJvcHMsIHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGdldFJvdXRlSW5mbyhyb3V0ZSwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcmVzb2x2ZWRBcywgcm91dGVQcm9wcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdSb3V0ZUluZm8gPSB0aGlzLmNvbXBvbmVudHNbcm91dGVdO1xuICAgICAgICAgICAgaWYgKHJvdXRlUHJvcHMuc2hhbGxvdyAmJiBleGlzdGluZ1JvdXRlSW5mbyAmJiB0aGlzLnJvdXRlID09PSByb3V0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBleGlzdGluZ1JvdXRlSW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNhY2hlZFJvdXRlSW5mbyA9IGV4aXN0aW5nUm91dGVJbmZvICYmICdpbml0aWFsJyBpbiBleGlzdGluZ1JvdXRlSW5mbyA/IHVuZGVmaW5lZCA6IGV4aXN0aW5nUm91dGVJbmZvO1xuICAgICAgICAgICAgY29uc3Qgcm91dGVJbmZvID0gY2FjaGVkUm91dGVJbmZvID8gY2FjaGVkUm91dGVJbmZvIDogYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudChyb3V0ZSkudGhlbigocmVzKT0+KHtcbiAgICAgICAgICAgICAgICAgICAgQ29tcG9uZW50OiByZXMucGFnZSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGVTaGVldHM6IHJlcy5zdHlsZVNoZWV0cyxcbiAgICAgICAgICAgICAgICAgICAgX19OX1NTRzogcmVzLm1vZC5fX05fU1NHLFxuICAgICAgICAgICAgICAgICAgICBfX05fU1NQOiByZXMubW9kLl9fTl9TU1BcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IHsgQ29tcG9uZW50OiBDb21wb25lbnQxICwgX19OX1NTRyAsIF9fTl9TU1AgIH0gPSByb3V0ZUluZm87XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHsgaXNWYWxpZEVsZW1lbnRUeXBlICB9ID0gcmVxdWlyZSgncmVhY3QtaXMnKTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZShDb21wb25lbnQxKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBkZWZhdWx0IGV4cG9ydCBpcyBub3QgYSBSZWFjdCBDb21wb25lbnQgaW4gcGFnZTogXCIke3BhdGhuYW1lfVwiYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGRhdGFIcmVmO1xuICAgICAgICAgICAgaWYgKF9fTl9TU0cgfHwgX19OX1NTUCkge1xuICAgICAgICAgICAgICAgIGRhdGFIcmVmID0gdGhpcy5wYWdlTG9hZGVyLmdldERhdGFIcmVmKCgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5XG4gICAgICAgICAgICAgICAgfSksIHJlc29sdmVkQXMsIF9fTl9TU0csIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gYXdhaXQgdGhpcy5fZ2V0RGF0YSgoKT0+X19OX1NTRyA/IHRoaXMuX2dldFN0YXRpY0RhdGEoZGF0YUhyZWYpIDogX19OX1NTUCA/IHRoaXMuX2dldFNlcnZlckRhdGEoZGF0YUhyZWYpIDogdGhpcy5nZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50MSwgLy8gd2UgcHJvdmlkZSBBcHBUcmVlIGxhdGVyIHNvIHRoaXMgbmVlZHMgdG8gYmUgYGFueWBcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgICAgICAgICAgYXNQYXRoOiBhcyxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlOiB0aGlzLmxvY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlczogdGhpcy5sb2NhbGVzLFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0TG9jYWxlOiB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJvdXRlSW5mby5wcm9wcyA9IHByb3BzO1xuICAgICAgICAgICAgdGhpcy5jb21wb25lbnRzW3JvdXRlXSA9IHJvdXRlSW5mbztcbiAgICAgICAgICAgIHJldHVybiByb3V0ZUluZm87XG4gICAgICAgIH0gY2F0Y2ggKGVycjIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJvdXRlSW5mb0Vycm9yKGVycjIsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldChyb3V0ZSwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgZGF0YSwgcmVzZXRTY3JvbGwpIHtcbiAgICAgICAgdGhpcy5pc0ZhbGxiYWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMucm91dGUgPSByb3V0ZTtcbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuYXNQYXRoID0gYXM7XG4gICAgICAgIHJldHVybiB0aGlzLm5vdGlmeShkYXRhLCByZXNldFNjcm9sbCk7XG4gICAgfVxuICAgIC8qKlxuICAgKiBDYWxsYmFjayB0byBleGVjdXRlIGJlZm9yZSByZXBsYWNpbmcgcm91dGVyIHN0YXRlXG4gICAqIEBwYXJhbSBjYiBjYWxsYmFjayB0byBiZSBleGVjdXRlZFxuICAgKi8gYmVmb3JlUG9wU3RhdGUoY2IpIHtcbiAgICAgICAgdGhpcy5fYnBzID0gY2I7XG4gICAgfVxuICAgIG9ubHlBSGFzaENoYW5nZShhcykge1xuICAgICAgICBpZiAoIXRoaXMuYXNQYXRoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNvbnN0IFtvbGRVcmxOb0hhc2gsIG9sZEhhc2hdID0gdGhpcy5hc1BhdGguc3BsaXQoJyMnKTtcbiAgICAgICAgY29uc3QgW25ld1VybE5vSGFzaCwgbmV3SGFzaF0gPSBhcy5zcGxpdCgnIycpO1xuICAgICAgICAvLyBNYWtlcyBzdXJlIHdlIHNjcm9sbCB0byB0aGUgcHJvdmlkZWQgaGFzaCBpZiB0aGUgdXJsL2hhc2ggYXJlIHRoZSBzYW1lXG4gICAgICAgIGlmIChuZXdIYXNoICYmIG9sZFVybE5vSGFzaCA9PT0gbmV3VXJsTm9IYXNoICYmIG9sZEhhc2ggPT09IG5ld0hhc2gpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSB1cmxzIGFyZSBjaGFuZ2UsIHRoZXJlJ3MgbW9yZSB0aGFuIGEgaGFzaCBjaGFuZ2VcbiAgICAgICAgaWYgKG9sZFVybE5vSGFzaCAhPT0gbmV3VXJsTm9IYXNoKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGhhc2ggaGFzIGNoYW5nZWQsIHRoZW4gaXQncyBhIGhhc2ggb25seSBjaGFuZ2UuXG4gICAgICAgIC8vIFRoaXMgY2hlY2sgaXMgbmVjZXNzYXJ5IHRvIGhhbmRsZSBib3RoIHRoZSBlbnRlciBhbmRcbiAgICAgICAgLy8gbGVhdmUgaGFzaCA9PT0gJycgY2FzZXMuIFRoZSBpZGVudGl0eSBjYXNlIGZhbGxzIHRocm91Z2hcbiAgICAgICAgLy8gYW5kIGlzIHRyZWF0ZWQgYXMgYSBuZXh0IHJlbG9hZC5cbiAgICAgICAgcmV0dXJuIG9sZEhhc2ggIT09IG5ld0hhc2g7XG4gICAgfVxuICAgIHNjcm9sbFRvSGFzaChhcykge1xuICAgICAgICBjb25zdCBbLCBoYXNoXSA9IGFzLnNwbGl0KCcjJyk7XG4gICAgICAgIC8vIFNjcm9sbCB0byB0b3AgaWYgdGhlIGhhc2ggaXMganVzdCBgI2Agd2l0aCBubyB2YWx1ZSBvciBgI3RvcGBcbiAgICAgICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgICAgIGlmIChoYXNoID09PSAnJyB8fCBoYXNoID09PSAndG9wJykge1xuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIDApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZpcnN0IHdlIGNoZWNrIGlmIHRoZSBlbGVtZW50IGJ5IGlkIGlzIGZvdW5kXG4gICAgICAgIGNvbnN0IGlkRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKTtcbiAgICAgICAgaWYgKGlkRWwpIHtcbiAgICAgICAgICAgIGlkRWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGVyZSdzIG5vIGVsZW1lbnQgd2l0aCB0aGUgaWQsIHdlIGNoZWNrIHRoZSBgbmFtZWAgcHJvcGVydHlcbiAgICAgICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgICAgIGNvbnN0IG5hbWVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGhhc2gpWzBdO1xuICAgICAgICBpZiAobmFtZUVsKSB7XG4gICAgICAgICAgICBuYW1lRWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB1cmxJc05ldyhhc1BhdGgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXNQYXRoICE9PSBhc1BhdGg7XG4gICAgfVxuICAgIC8qKlxuICAgKiBQcmVmZXRjaCBwYWdlIGNvZGUsIHlvdSBtYXkgd2FpdCBmb3IgdGhlIGRhdGEgZHVyaW5nIHBhZ2UgcmVuZGVyaW5nLlxuICAgKiBUaGlzIGZlYXR1cmUgb25seSB3b3JrcyBpbiBwcm9kdWN0aW9uIVxuICAgKiBAcGFyYW0gdXJsIHRoZSBocmVmIG9mIHByZWZldGNoZWQgcGFnZVxuICAgKiBAcGFyYW0gYXNQYXRoIHRoZSBhcyBwYXRoIG9mIHRoZSBwcmVmZXRjaGVkIHBhZ2VcbiAgICovIGFzeW5jIHByZWZldGNoKHVybCwgYXNQYXRoID0gdXJsLCBvcHRpb25zID0ge1xuICAgIH0pIHtcbiAgICAgICAgbGV0IHBhcnNlZCA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybCh1cmwpO1xuICAgICAgICBsZXQgeyBwYXRobmFtZTogcGF0aG5hbWUyICB9ID0gcGFyc2VkO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMubG9jYWxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBhdGhuYW1lMiA9ICgwLCBfbm9ybWFsaXplTG9jYWxlUGF0aCkubm9ybWFsaXplTG9jYWxlUGF0aChwYXRobmFtZTIsIHRoaXMubG9jYWxlcykucGF0aG5hbWU7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWUyO1xuICAgICAgICAgICAgICAgIHVybCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZCk7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnNlZEFzID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKGFzUGF0aCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbG9jYWxlUGF0aFJlc3VsdCA9ICgwLCBfbm9ybWFsaXplTG9jYWxlUGF0aCkubm9ybWFsaXplTG9jYWxlUGF0aChwYXJzZWRBcy5wYXRobmFtZSwgdGhpcy5sb2NhbGVzKTtcbiAgICAgICAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGxvY2FsZVBhdGhSZXN1bHQucGF0aG5hbWU7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlIHx8IHRoaXMuZGVmYXVsdExvY2FsZTtcbiAgICAgICAgICAgICAgICBhc1BhdGggPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFnZXMgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIuZ2V0UGFnZUxpc3QoKTtcbiAgICAgICAgbGV0IHJlc29sdmVkQXMgPSBhc1BhdGg7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSEFTX1JFV1JJVEVTICYmIGFzUGF0aC5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIGxldCByZXdyaXRlcztcbiAgICAgICAgICAgICh7IF9fcmV3cml0ZXM6IHJld3JpdGVzICB9ID0gYXdhaXQgKDAsIF9yb3V0ZUxvYWRlcikuZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKTtcbiAgICAgICAgICAgIGNvbnN0IHJld3JpdGVzUmVzdWx0ID0gKDAsIF9yZXNvbHZlUmV3cml0ZXMpLmRlZmF1bHQoYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGFzUGF0aCwgdGhpcy5sb2NhbGUpKSwgcGFnZXMsIHJld3JpdGVzLCBwYXJzZWQucXVlcnksIChwKT0+cmVzb2x2ZUR5bmFtaWNSb3V0ZShwLCBwYWdlcylcbiAgICAgICAgICAgICwgdGhpcy5sb2NhbGVzKTtcbiAgICAgICAgICAgIHJlc29sdmVkQXMgPSBkZWxMb2NhbGUoZGVsQmFzZVBhdGgocmV3cml0ZXNSZXN1bHQuYXNQYXRoKSwgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgZGlyZWN0bHkgbWF0Y2hlcyBhIHBhZ2Ugd2UgbmVlZCB0byB1cGRhdGUgdGhlIGhyZWYgdG9cbiAgICAgICAgICAgICAgICAvLyBhbGxvdyB0aGUgY29ycmVjdCBwYWdlIGNodW5rIHRvIGJlIGxvYWRlZFxuICAgICAgICAgICAgICAgIHBhdGhuYW1lMiA9IHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZjtcbiAgICAgICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZTI7XG4gICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGFyc2VkLnBhdGhuYW1lLCBwYWdlcyk7XG4gICAgICAgICAgICBpZiAocGFyc2VkLnBhdGhuYW1lICE9PSBwYXRobmFtZTIpIHtcbiAgICAgICAgICAgICAgICBwYXRobmFtZTIgPSBwYXJzZWQucGF0aG5hbWU7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWUyO1xuICAgICAgICAgICAgICAgIHVybCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lMik7XG4gICAgICAgIC8vIFByZWZldGNoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gZGV2ZWxvcG1lbnQgbW9kZSBiZWNhdXNlIGl0IHdvdWxkIHRyaWdnZXIgb24tZGVtYW5kLWVudHJpZXNcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLnBhZ2VMb2FkZXIuX2lzU3NnKHJvdXRlKS50aGVuKChpc1NzZyk9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNTc2cgPyB0aGlzLl9nZXRTdGF0aWNEYXRhKHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZih1cmwsIHJlc29sdmVkQXMsIHRydWUsIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zLmxvY2FsZSA6IHRoaXMubG9jYWxlKSkgOiBmYWxzZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdGhpcy5wYWdlTG9hZGVyW29wdGlvbnMucHJpb3JpdHkgPyAnbG9hZFBhZ2UnIDogJ3ByZWZldGNoJ10ocm91dGUpLCBcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIGFzeW5jIGZldGNoQ29tcG9uZW50KHJvdXRlKSB7XG4gICAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2FuY2VsID0gdGhpcy5jbGMgPSAoKT0+e1xuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50UmVzdWx0ID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmxvYWRQYWdlKHJvdXRlKTtcbiAgICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoYEFib3J0IGZldGNoaW5nIGNvbXBvbmVudCBmb3Igcm91dGU6IFwiJHtyb3V0ZX1cImApO1xuICAgICAgICAgICAgZXJyb3IuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYW5jZWwgPT09IHRoaXMuY2xjKSB7XG4gICAgICAgICAgICB0aGlzLmNsYyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbXBvbmVudFJlc3VsdDtcbiAgICB9XG4gICAgX2dldERhdGEoZm4pIHtcbiAgICAgICAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjYW5jZWwgPSAoKT0+e1xuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jbGMgPSBjYW5jZWw7XG4gICAgICAgIHJldHVybiBmbigpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xjID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIyID0gbmV3IEVycm9yKCdMb2FkaW5nIGluaXRpYWwgcHJvcHMgY2FuY2VsbGVkJyk7XG4gICAgICAgICAgICAgICAgZXJyMi5jYW5jZWxsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRTdGF0aWNEYXRhKGRhdGFIcmVmKSB7XG4gICAgICAgIGNvbnN0IHsgaHJlZjogY2FjaGVLZXkgIH0gPSBuZXcgVVJMKGRhdGFIcmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nICYmICF0aGlzLmlzUHJldmlldyAmJiB0aGlzLnNkY1tjYWNoZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5zZGNbY2FjaGVLZXldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgdGhpcy5pc1NzcikudGhlbigoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuc2RjW2NhY2hlS2V5XSA9IGRhdGE7XG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIF9nZXRTZXJ2ZXJEYXRhKGRhdGFIcmVmKSB7XG4gICAgICAgIGNvbnN0IHsgaHJlZjogcmVzb3VyY2VLZXkgIH0gPSBuZXcgVVJMKGRhdGFIcmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgIGlmICh0aGlzLnNkcltyZXNvdXJjZUtleV0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNkcltyZXNvdXJjZUtleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2RyW3Jlc291cmNlS2V5XSA9IGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5zZHJbcmVzb3VyY2VLZXldO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pLmNhdGNoKChlcnIyKT0+e1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2RyW3Jlc291cmNlS2V5XTtcbiAgICAgICAgICAgIHRocm93IGVycjI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCBjdHgpIHtcbiAgICAgICAgY29uc3QgeyBDb21wb25lbnQ6IEFwcDEgIH0gPSB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ107XG4gICAgICAgIGNvbnN0IEFwcFRyZWUgPSB0aGlzLl93cmFwQXBwKEFwcDEpO1xuICAgICAgICBjdHguQXBwVHJlZSA9IEFwcFRyZWU7XG4gICAgICAgIHJldHVybiAoMCwgX3V0aWxzKS5sb2FkR2V0SW5pdGlhbFByb3BzKEFwcDEsIHtcbiAgICAgICAgICAgIEFwcFRyZWUsXG4gICAgICAgICAgICBDb21wb25lbnQsXG4gICAgICAgICAgICByb3V0ZXI6IHRoaXMsXG4gICAgICAgICAgICBjdHhcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFib3J0Q29tcG9uZW50TG9hZChhcywgcm91dGVQcm9wcykge1xuICAgICAgICBpZiAodGhpcy5jbGMpIHtcbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgncm91dGVDaGFuZ2VFcnJvcicsIGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKSwgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgdGhpcy5jbGMoKTtcbiAgICAgICAgICAgIHRoaXMuY2xjID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBub3RpZnkoZGF0YSwgcmVzZXRTY3JvbGwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViKGRhdGEsIHRoaXMuY29tcG9uZW50c1snL19hcHAnXS5Db21wb25lbnQsIHJlc2V0U2Nyb2xsKTtcbiAgICB9XG59XG5Sb3V0ZXIuZXZlbnRzID0gKDAsIF9taXR0KS5kZWZhdWx0KCk7XG5leHBvcnRzLmRlZmF1bHQgPSBSb3V0ZXI7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdXRlci5qcy5tYXAiLCJpbXBvcnQgeyBDb21tZW50RGF0YSwgTG9hZENvbW1lbnRSZXNwb25zZSB9IGZyb20gJy4uLy4uL21vZHVsZXMvY29tbWVudCc7XHJcbmltcG9ydCBDb21tZW50SXRlbSBmcm9tICcuLi8uLi9jb250YWluZXJzL0NvbW1lbnRJdGVtJztcclxuaW1wb3J0IHsgQ29tbWVudFRpdGxlLCBXcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5jb25zdCBDb21tZW50TGlzdDogUmVhY3QuRkM8TG9hZENvbW1lbnRSZXNwb25zZT4gPSAoeyBkYXRhIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPENvbW1lbnRUaXRsZT5cclxuICAgICAgICDrjJPquIBcclxuICAgICAgICA8c3Bhbj57YCR7ZGF0YS5sZW5ndGh96rCcYH08L3NwYW4+XHJcbiAgICAgIDwvQ29tbWVudFRpdGxlPlxyXG4gICAgICA8V3JhcHBlcj5cclxuICAgICAgICB7ZGF0YSAmJlxyXG4gICAgICAgICAgZGF0YS5tYXAoKGl0ZW06IENvbW1lbnREYXRhKSA9PiAoXHJcbiAgICAgICAgICAgIDxDb21tZW50SXRlbSBkYXRhPXtpdGVtfSBrZXk9e2l0ZW0uY3JlYXRlZEF0fSAvPlxyXG4gICAgICAgICAgKSl9XHJcbiAgICAgIDwvV3JhcHBlcj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21tZW50TGlzdDtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNWU1ZTU7XHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU1ZTU7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcclxuXHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogOTUlO1xyXG4gICAgbWFyZ2luOiAwIGF1dG8gMzBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQ29tbWVudFRpdGxlID0gc3R5bGVkLmRpdmBcclxuICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgZm9udC1mYW1pbHk6IEJNZXVsamlybztcclxuICBmb250LXNpemU6IDI1cHg7XHJcbiAgbWFyZ2luLXRvcDogNTBweDtcclxuXHJcbiAgJiBzcGFuIHtcclxuICAgIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIHBhZGRpbmc6IDAgMTBweDtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDMwcHg7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBEZXRhaWxJdGVtcHJvcHMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCB7XHJcbiAgQnV0dG9uV3JhcHBlcixcclxuICBEZXRhaWxJdGVtSW1hZ2UsXHJcbiAgRGV0YWlsSXRlbUluZm8sXHJcbiAgRGV0YWlsSXRlbU92ZXJ2aWV3LFxyXG4gIERldGFpbEl0ZW1UaXRsZSxcclxuICBEZXRhaWxJdGVtV3JhcHBlcixcclxuICBJbWFnZVdyYXBwZXIsXHJcbn0gZnJvbSAnLi9zdHlsZSc7XHJcbmltcG9ydCBUb3VyU3BvdCBmcm9tICcuLi9Ub3VyU3BvdCc7XHJcbmltcG9ydCBUb3VyQ3VsdHVyZSBmcm9tICcuLi9Ub3VyQ3VsdHVyZSc7XHJcbmltcG9ydCBUb3VyRXZlbnQgZnJvbSAnLi4vVG91ckV2ZW50JztcclxuaW1wb3J0IFRvdXJDb3Vyc2UgZnJvbSAnLi4vVG91ckNvdXJzZSc7XHJcbmltcG9ydCBUb3VyU3BvcnRzIGZyb20gJy4uL1RvdXJTcG9ydHMnO1xyXG5pbXBvcnQgVG91clNsZWVwIGZyb20gJy4uL1RvdXJTbGVlcCc7XHJcbmltcG9ydCBUb3VyTWFsbCBmcm9tICcuLi9Ub3VyTWFsbCc7XHJcbmltcG9ydCBUb3VyRm9vZCBmcm9tICcuLi9Ub3VyRm9vZCc7XHJcbmltcG9ydCB7IENhcmV0RG93bk91dGxpbmVkLCBDYXJldFVwT3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcbmltcG9ydCBLYWthb21hcCBmcm9tICcuLi9LYWthb21hcCc7XHJcbmltcG9ydCB1c2VUb2dnbGUgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXNlVG9nZ2xlJztcclxuXHJcbmNvbnN0IERldGFpbEl0ZW06IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IHRpdGxlLCBmaXJzdGltYWdlLCBvdmVydmlldywgY29udGVudHR5cGVpZCB9ID0gaXRlbTtcclxuICBjb25zdCBbbW9yZSwgb25Ub2dnbGVNb3JlXSA9IHVzZVRvZ2dsZSh0cnVlKTtcclxuICBjb25zdCBbbWluSGVpZ2h0LCBvblRvZ2dsZU1pbkhlaWdodF0gPSB1c2VUb2dnbGUoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgbW9yZUhlaWdodCA9IChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9yZURpdicpIGFzIEhUTUxEaXZFbGVtZW50KVxyXG4gICAgICAuY2xpZW50SGVpZ2h0O1xyXG4gICAgaWYgKG1vcmVIZWlnaHQgPCAxNTUpIHtcclxuICAgICAgb25Ub2dnbGVNaW5IZWlnaHQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9uVG9nZ2xlTW9yZSgpO1xyXG4gICAgfVxyXG4gIH0sIFtvblRvZ2dsZU1vcmUsIG9uVG9nZ2xlTWluSGVpZ2h0XSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8RGV0YWlsSXRlbVdyYXBwZXI+XHJcbiAgICAgICAgPERldGFpbEl0ZW1UaXRsZT57dGl0bGV9PC9EZXRhaWxJdGVtVGl0bGU+XHJcbiAgICAgICAgPEltYWdlV3JhcHBlcj5cclxuICAgICAgICAgIHtmaXJzdGltYWdlICYmIChcclxuICAgICAgICAgICAgPERldGFpbEl0ZW1JbWFnZVxyXG4gICAgICAgICAgICAgIHNyYz17Zmlyc3RpbWFnZX1cclxuICAgICAgICAgICAgICBhbHQ9e3RpdGxlfVxyXG4gICAgICAgICAgICAgIHdpZHRoPXs5ODB9XHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXs4MDB9XHJcbiAgICAgICAgICAgICAgbGF5b3V0PVwicmVzcG9uc2l2ZVwiXHJcbiAgICAgICAgICAgICAgcHJpb3JpdHk9e3RydWV9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvSW1hZ2VXcmFwcGVyPlxyXG4gICAgICAgIDxEZXRhaWxJdGVtSW5mbz7sg4HshLjsoJXrs7Q8L0RldGFpbEl0ZW1JbmZvPlxyXG4gICAgICAgIDxEZXRhaWxJdGVtT3ZlcnZpZXdcclxuICAgICAgICAgIGlkPVwibW9yZURpdlwiXHJcbiAgICAgICAgICBtb3JlPXttb3JlfVxyXG4gICAgICAgICAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3tcclxuICAgICAgICAgICAgX19odG1sOiBvdmVydmlldy5yZXBsYWNlQWxsKC9cXHNbKl0vZywgJzxici8+PGJyLz4qJyksXHJcbiAgICAgICAgICB9fVxyXG4gICAgICAgIC8+XHJcblxyXG4gICAgICAgIHttaW5IZWlnaHQgPyBudWxsIDogKFxyXG4gICAgICAgICAgPEJ1dHRvbldyYXBwZXIgb25DbGljaz17b25Ub2dnbGVNb3JlfT5cclxuICAgICAgICAgICAgeyFtb3JlID8gKFxyXG4gICAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgICA8Yj7rjZTrs7TquLA8L2I+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPENhcmV0RG93bk91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICAgIDxiPuuLq+q4sDwvYj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8Q2FyZXRVcE91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICAgICl9XHJcbiAgICAgICAgICA8L0J1dHRvbldyYXBwZXI+XHJcbiAgICAgICAgKX1cclxuXHJcbiAgICAgICAgezxLYWthb21hcCBpdGVtPXtpdGVtfSAvPn1cclxuXHJcbiAgICAgICAgeygoKSA9PiB7XHJcbiAgICAgICAgICBzd2l0Y2ggKGNvbnRlbnR0eXBlaWQpIHtcclxuICAgICAgICAgICAgY2FzZSAxMjpcclxuICAgICAgICAgICAgICByZXR1cm4gPFRvdXJTcG90IGl0ZW09e2l0ZW19IC8+O1xyXG4gICAgICAgICAgICBjYXNlIDE0OlxyXG4gICAgICAgICAgICAgIHJldHVybiA8VG91ckN1bHR1cmUgaXRlbT17aXRlbX0gLz47XHJcbiAgICAgICAgICAgIGNhc2UgMTU6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIDxUb3VyRXZlbnQgaXRlbT17aXRlbX0gLz47XHJcbiAgICAgICAgICAgIGNhc2UgMjU6XHJcbiAgICAgICAgICAgICAgcmV0dXJuIDxUb3VyQ291cnNlIGl0ZW09e2l0ZW19IC8+O1xyXG4gICAgICAgICAgICBjYXNlIDI4OlxyXG4gICAgICAgICAgICAgIHJldHVybiA8VG91clNwb3J0cyBpdGVtPXtpdGVtfSAvPjtcclxuICAgICAgICAgICAgY2FzZSAzMjpcclxuICAgICAgICAgICAgICByZXR1cm4gPFRvdXJTbGVlcCBpdGVtPXtpdGVtfSAvPjtcclxuICAgICAgICAgICAgY2FzZSAzODpcclxuICAgICAgICAgICAgICByZXR1cm4gPFRvdXJNYWxsIGl0ZW09e2l0ZW19IC8+O1xyXG4gICAgICAgICAgICBjYXNlIDM5OlxyXG4gICAgICAgICAgICAgIHJldHVybiA8VG91ckZvb2QgaXRlbT17aXRlbX0gLz47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgbnVsbDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KSgpfVxyXG4gICAgICA8L0RldGFpbEl0ZW1XcmFwcGVyPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERldGFpbEl0ZW07XHJcbiIsImltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgRGV0YWlsSXRlbVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IERldGFpbEl0ZW1UaXRsZSA9IHN0eWxlZC5oMmBcclxuICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgZm9udC1zaXplOiA1MHB4O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgcGFkZGluZzogNTBweCAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgcGFkZGluZzogMTAwcHggMCA1MHB4O1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGZvbnQtc2l6ZTogNDVweDtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZUx9IHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgRGV0YWlsSXRlbUltYWdlID0gc3R5bGVkKEltYWdlKWBcclxuICB3aWR0aDogOTgwcHg7XHJcbiAgcGFkZGluZzogMCAwIDUwcHggMDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEltYWdlV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBEZXRhaWxJdGVtSW5mbyA9IHN0eWxlZC5oM2BcclxuICBib3JkZXItYm90dG9tOiAycHggc29saWQgYmxhY2s7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gIGZvbnQtc2l6ZTogMzBweDtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIG1hcmdpbjogMzBweCAwO1xyXG4gIHBhZGRpbmc6IDIwcHggMTBweCAxNXB4O1xyXG4gIC8vIGZvbnQtZmFtaWx5OiAnR293dW4gQmF0YW5nJywgc2VyaWY7XHJcblxyXG4gICYgc3BhbiB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBmb250LWZhbWlseTogQk1IQU5OQUFpcjtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGZvbnQtc2l6ZTogMjdweDtcclxuICAgICYgc3BhbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgIH1cclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgRGV0YWlsSXRlbU92ZXJ2aWV3ID0gc3R5bGVkLmRpdjx7IG1vcmU6IGJvb2xlYW4gfT5gXHJcbiAgbGluZS1oZWlnaHQ6IDEuNTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIGZvbnQtc2l6ZTogMTdweDtcclxuICBmb250LWZhbWlseTogJ0dvd3VuIEJhdGFuZycsIHNlcmlmO1xyXG4gIGhlaWdodDogJHsocHJvcHMpID0+IChwcm9wcy5tb3JlID8gJzEwMCU7JyA6ICcxNTVweDsnKX0gXHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuXHJcbiAgXHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gICAgbGluZS1oZWlnaHQ6IDEuMztcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICMwMDA7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAmIHNwYW4ge1xyXG4gICAgcGFkZGluZzogMCAzcHg7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgfVxyXG4gIG1hcmdpbjogMTVweCAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcbiAgSW1hZ2VTa2VsZXRvbixcclxuICBTa2VsZXRvbkJveCxcclxuICBUaXRsZUJveCxcclxuICBUaXRsZVNrZWxldG9uLFxyXG4gIFdyYXBwZXIsXHJcbn0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5jb25zdCBEZXRhaWxTa2VsZXRvbjogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxXcmFwcGVyPlxyXG4gICAgICA8VGl0bGVCb3g+XHJcbiAgICAgICAgPFRpdGxlU2tlbGV0b24gLz5cclxuICAgICAgPC9UaXRsZUJveD5cclxuICAgICAgPFNrZWxldG9uQm94PlxyXG4gICAgICAgIDxJbWFnZVNrZWxldG9uIC8+XHJcbiAgICAgIDwvU2tlbGV0b25Cb3g+XHJcbiAgICA8L1dyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERldGFpbFNrZWxldG9uO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBUaXRsZUJveCA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgaGVpZ2h0OiAxNTBweDtcclxuICBwYWRkaW5nOiA1MHB4IDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBwYWRkaW5nOiAxMDBweCAwIDUwcHg7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBoZWlnaHQ6IDE5NXB4O1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVMfSB7XHJcbiAgICBoZWlnaHQ6IDE5MHB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBUaXRsZVNrZWxldG9uID0gc3R5bGVkLmRpdmBcclxuICBALXdlYmtpdC1rZXlmcmFtZXMgbG9hZGluZyB7XHJcbiAgICAwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICA1MCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMyk7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4xKTtcclxuICAgIH1cclxuICB9XHJcbiAgQGtleWZyYW1lcyBsb2FkaW5nIHtcclxuICAgIDAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjEpO1xyXG4gICAgfVxyXG5cclxuICAgIDUwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4zKTtcclxuICAgIH1cclxuXHJcbiAgICAxMDAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjEpO1xyXG4gICAgfVxyXG4gIH1cclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDUwcHg7XHJcbiAgLXdlYmtpdC1hbmltYXRpb246IGxvYWRpbmcgMS41cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICBhbmltYXRpb246IGxvYWRpbmcgMS41cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGhlaWdodDogNDVweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVMfSB7XHJcbiAgICBoZWlnaHQ6IDQwcHg7XHJcbiAgfVxyXG5gO1xyXG5leHBvcnQgY29uc3QgU2tlbGV0b25Cb3ggPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiA5ODBweDtcclxuICBoZWlnaHQ6IDY1NHB4O1xyXG4gIG1hcmdpbjogNXB4O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnBjfSB7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgSW1hZ2VTa2VsZXRvbiA9IHN0eWxlZC5kaXZgXHJcbiAgQC13ZWJraXQta2V5ZnJhbWVzIGxvYWRpbmcge1xyXG4gICAgMCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMSk7XHJcbiAgICB9XHJcblxyXG4gICAgNTAlIHtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxNjUsIDE2NSwgMTY1LCAwLjMpO1xyXG4gICAgfVxyXG5cclxuICAgIDEwMCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIEBrZXlmcmFtZXMgbG9hZGluZyB7XHJcbiAgICAwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4xKTtcclxuICAgIH1cclxuXHJcbiAgICA1MCUge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE2NSwgMTY1LCAxNjUsIDAuMyk7XHJcbiAgICB9XHJcblxyXG4gICAgMTAwJSB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTY1LCAxNjUsIDE2NSwgMC4xKTtcclxuICAgIH1cclxuICB9XHJcbiAgd2lkdGg6IDk4MHB4O1xyXG4gIGhlaWdodDogNjU0cHg7XHJcbiAgLXdlYmtpdC1hbmltYXRpb246IGxvYWRpbmcgMS41cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICBhbmltYXRpb246IGxvYWRpbmcgMS41cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVMfSB7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBGb290ZXJXcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5jb25zdCBGb290ZXI6IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIHJldHVybiA8Rm9vdGVyV3JhcHBlcj48L0Zvb3RlcldyYXBwZXI+O1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgRm9vdGVyO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBGb290ZXJXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBoZWlnaHQ6IDEwMHB4O1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWVlZWU7XHJcbmA7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IHsgTGkgfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbmludGVyZmFjZSBJSGVhZEl0ZW0ge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAgY29udGVudFR5cGVJZDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBIZWFkSXRlbTogUmVhY3QuRkM8SUhlYWRJdGVtPiA9ICh7IHRpdGxlLCBjb250ZW50VHlwZUlkIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPExpPlxyXG4gICAgICA8TGlua1xyXG4gICAgICAgIGhyZWY9e3tcclxuICAgICAgICAgIHBhdGhuYW1lOiAnL3RvdXInLFxyXG4gICAgICAgICAgcXVlcnk6IHsgdGl0bGUsIGNvbnRlbnRUeXBlSWQgfSxcclxuICAgICAgICB9fVxyXG4gICAgICAgIGFzPXtgL3RvdXI/dGl0bGU9JHt0aXRsZX0mY29udGVudFR5cGVJZD0ke2NvbnRlbnRUeXBlSWR9YH1cclxuICAgICAgPlxyXG4gICAgICAgIDxhPlxyXG4gICAgICAgICAgey8qIDxsaT57dGl0bGV9PC9saT4gKi99XHJcbiAgICAgICAgICB7dGl0bGV9XHJcbiAgICAgICAgPC9hPlxyXG4gICAgICA8L0xpbms+XHJcbiAgICA8L0xpPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkSXRlbTtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgTGkgPSBzdHlsZWQubGlgXHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICAmIGEge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgd2lkdGg6IDEwMDtcclxuICAgIH1cclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCB7IEFycm93UmlnaHRPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgeyBJbmZvd2luZG93LCBNYXAsIE1hcFdyYXBwZXIgfSBmcm9tICcuL3N0eWxlJztcclxuXHJcbmRlY2xhcmUgZ2xvYmFsIHtcclxuICBpbnRlcmZhY2UgV2luZG93IHtcclxuICAgIGtha2FvOiBhbnk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBLYWthb21hcDogUmVhY3QuRkM8RGV0YWlsSXRlbXByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIGNvbnN0IHsgbWFweCwgbWFweSwgdGl0bGUgfSA9IGl0ZW07XHJcbiAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgIGNvbnN0IHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xyXG4gICAgc2NyaXB0LnNyYyA9IGAvL2RhcGkua2FrYW8uY29tL3YyL21hcHMvc2RrLmpzP2F1dG9sb2FkPWZhbHNlJmFwcGtleT0ke3Byb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0tBS0FPX01BUFN9YDtcclxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcclxuXHJcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwJyk7XHJcbiAgICBzY3JpcHQub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB3aW5kb3cua2FrYW8ubWFwcy5sb2FkKCgpID0+IHtcclxuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgICAgY2VudGVyOiBuZXcgd2luZG93Lmtha2FvLm1hcHMuTGF0TG5nKG1hcHksIG1hcHgpLFxyXG4gICAgICAgICAgbGV2ZWw6IDMsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBtYXAgPSBuZXcgd2luZG93Lmtha2FvLm1hcHMuTWFwKGNvbnRhaW5lciwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIC8vIOuniOy7pCDtkZzsi5xcclxuICAgICAgICBjb25zdCBtYXJrZXJQb3NpdGlvbiA9IG5ldyBrYWthby5tYXBzLkxhdExuZyhtYXB5LCBtYXB4KTtcclxuICAgICAgICBjb25zdCBtYXJrZXIgPSBuZXcga2FrYW8ubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgcG9zaXRpb246IG1hcmtlclBvc2l0aW9uLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG1hcmtlci5zZXRNYXAobWFwKTtcclxuXHJcbiAgICAgICAgLy8g7KeA64+EIO2ZleuMgCDrp4nquLBcclxuICAgICAgICBtYXAuc2V0Wm9vbWFibGUoZmFsc2UpO1xyXG5cclxuICAgICAgICAvLyDspIwg7Luo7Yq466Gk65+sXHJcbiAgICAgICAgLy8gY29uc3Qgem9vbUNvbnRyb2wgPSBuZXcga2FrYW8ubWFwcy5ab29tQ29udHJvbCgpO1xyXG4gICAgICAgIC8vIG1hcC5hZGRDb250cm9sKHpvb21Db250cm9sLCBrYWthby5tYXBzLkNvbnRyb2xQb3NpdGlvbi5SSUdIVCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfTtcclxuICAgIHJldHVybiAoKSA9PiBzY3JpcHQucmVtb3ZlKCk7XHJcbiAgfSwgW2l0ZW0sIG1hcHgsIG1hcHldKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIHttYXB4ID8gKFxyXG4gICAgICAgIDxNYXBXcmFwcGVyPlxyXG4gICAgICAgICAgPEluZm93aW5kb3c+XHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgPHNwYW4+e3RpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgICAgaHJlZj17YGh0dHBzOi8vbWFwLmtha2FvLmNvbS9saW5rL3RvLyR7dGl0bGV9LCR7bWFweX0sJHttYXB4fWB9XHJcbiAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIDxiPlxyXG4gICAgICAgICAgICAgICAg6ri47LC+6riwIDxBcnJvd1JpZ2h0T3V0bGluZWQgLz5cclxuICAgICAgICAgICAgICA8L2I+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvSW5mb3dpbmRvdz5cclxuICAgICAgICAgIDxNYXAgaWQ9XCJtYXBcIj48L01hcD5cclxuICAgICAgICA8L01hcFdyYXBwZXI+XHJcbiAgICAgICkgOiBudWxsfVxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgS2FrYW9tYXA7XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IE1hcFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNzBweCAwIDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICB3aWR0aDogOTAlO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBNYXAgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiA5ODBweDtcclxuICBoZWlnaHQ6IDQwMHB4O1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuXHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgaGVpZ2h0OiAzNTBweDtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgaGVpZ2h0OiAyNTBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgSXdDb250ZW50V3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDM2MHB4O1xyXG4gIGhlaWdodDogMjAwcHg7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgSW5mb3dpbmRvdyA9IHN0eWxlZC5kaXZgXHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB6LWluZGV4OiA5OTtcclxuICB3aWR0aDogMjQwcHg7XHJcbiAgaGVpZ2h0OiAxMjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gIG1hcmdpbjogMTBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGJveC1zaGFkb3c6IDNweCAzcHggNXB4IDBweCByZ2IoMCAwIDAgLyAyMCUpO1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcblxyXG4gICYgZGl2IHtcclxuICAgIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbiAgfVxyXG4gICYgc3BhbiB7XHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbiAgICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgfVxyXG5cclxuICAmIGIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzViNWI1YjtcclxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuXHJcbiAgICAmOiBob3ZlciB7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgfVxyXG5cclxuICAgICYgc3BhbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIH1cclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgaGVpZ2h0OiAxMDBweDtcclxuXHJcbiAgICAmIGRpdiB7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgICB9XHJcbiAgICAmIHNwYW4ge1xyXG4gICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICB9XHJcbiAgICAmIGIge1xyXG4gICAgICBwYWRkaW5nOiAycHggNXB4O1xyXG4gICAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vRm9vdGVyJztcclxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi8uLi9jb250YWluZXJzL05hdmJhcic7XHJcbmltcG9ydCB7IE1haW5XcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5jb25zdCBMYXlvdXQ6IFJlYWN0LkZDID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8TmF2YmFyIC8+XHJcbiAgICAgIDxNYWluV3JhcHBlcj57Y2hpbGRyZW59PC9NYWluV3JhcHBlcj5cclxuICAgICAgPEZvb3RlciAvPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgTWFpbldyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMzAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cucGN9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCB7IExpIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5pbnRlcmZhY2UgSVN1Ykl0ZW0ge1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBodG1sOiBzdHJpbmc7XHJcbn1cclxuY29uc3QgU3ViSXRlbTogUmVhY3QuRkM8SVN1Ykl0ZW0+ID0gKHsgbmFtZSwgaHRtbCB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxMaT5cclxuICAgICAgICA8Yj57bmFtZX08L2I+XHJcbiAgICAgICAgPHBcclxuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7XHJcbiAgICAgICAgICAgIF9faHRtbDogaHRtbCxcclxuICAgICAgICAgIH19XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9MaT5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTdWJJdGVtO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuXHJcbmV4cG9ydCBjb25zdCBMaSA9IHN0eWxlZC5saWBcclxuICB3aWR0aDogNTAlO1xyXG4gIHBhZGRpbmc6IDAgMTBweDtcclxuICBmbG9hdDogbGVmdDtcclxuICBmb250LWZhbWlseTogJ0dvd3VuIEJhdGFuZycsIHNlcmlmO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgJiBwIHtcclxuICAgIGZvbnQtc2l6ZTogMTdweDtcclxuICAgIHBhZGRpbmc6IDVweCAwO1xyXG4gICAgYSB7XHJcbiAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcclxuICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICB9XHJcbiAgfVxyXG4gICYgYiB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGZsb2F0OiBub25lO1xyXG4gICAgcGFkZGluZzogMDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgSW50cm9XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBtYXJnaW4tdG9wOiA1MHB4O1xyXG4gIHdpZHRoOiAxMDAlO1xyXG5cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIHdpZHRoOiA5MCU7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcbiAgQ2FyZEltYWdlLFxyXG4gIENhcmRXcmFwcGVyLFxyXG4gIENvdXJzZUltYWdlLFxyXG4gIENvdXJzZUxpc3QsXHJcbiAgSXRlbSxcclxuICBTdWJEZXRhaWwsXHJcbiAgV3JhcHBlcixcclxufSBmcm9tICcuL3N0eWxlJztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbUluZm8gfSBmcm9tICcuLi9EZXRhaWxJdGVtL3N0eWxlJztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzLCBUb3VySW5mbyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICdhbnRkJztcclxuXHJcbmNvbnN0IFRvdXJDb3Vyc2U6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCBbaW1hZ2VTcmMsIHNldEltYWdlU3JjXSA9IHVzZVN0YXRlKFxyXG4gICAgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pXHJcbiAgICAgID8gaXRlbS5pbmZvWzBdLnN1YmRldGFpbGltZ1xyXG4gICAgICA6IGl0ZW0uaW5mby5zdWJkZXRhaWxpbWdcclxuICApO1xyXG4gIGNvbnN0IFtpbWFnZVRpdGxlLCBzZXRJbWFnZVRpdGxlXSA9IHVzZVN0YXRlKFxyXG4gICAgQXJyYXkuaXNBcnJheShpdGVtLmluZm8pID8gaXRlbS5pbmZvWzBdLnN1Ym5hbWUgOiBpdGVtLmluZm8uc3VibmFtZVxyXG4gICk7XHJcbiAgY29uc3QgW3N1Yk92ZXJ2aWV3LCBzZXRTdWJPdmVydmlld10gPSB1c2VTdGF0ZShcclxuICAgIEFycmF5LmlzQXJyYXkoaXRlbS5pbmZvKVxyXG4gICAgICA/IGl0ZW0uaW5mb1swXS5zdWJkZXRhaWxvdmVydmlld1xyXG4gICAgICA6IGl0ZW0uaW5mby5zdWJkZXRhaWxvdmVydmlld1xyXG4gICk7XHJcbiAgY29uc3QgY2hhbmdlSW1hZ2VTcmMgPSBSZWFjdC51c2VDYWxsYmFjayhcclxuICAgIChzcmM6IFRvdXJJbmZvKSA9PiAoKSA9PiB7XHJcbiAgICAgIHNldEltYWdlU3JjKHNyYy5zdWJkZXRhaWxpbWcpO1xyXG4gICAgICBzZXRJbWFnZVRpdGxlKHNyYy5zdWJuYW1lKTtcclxuICAgICAgc2V0U3ViT3ZlcnZpZXcoc3JjLnN1YmRldGFpbG92ZXJ2aWV3KTtcclxuICAgIH0sXHJcbiAgICBbXVxyXG4gICk7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxEZXRhaWxJdGVtSW5mbz5cclxuICAgICAgICDsvZTsiqQgPHNwYW4+KHtpdGVtLmludHJvLmRpc3RhbmNlfSk8L3NwYW4+XHJcbiAgICAgIDwvRGV0YWlsSXRlbUluZm8+XHJcbiAgICAgIDxXcmFwcGVyPlxyXG4gICAgICAgIDxDb3Vyc2VMaXN0PlxyXG4gICAgICAgICAge2l0ZW0uaW5mbyAmJiBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKGNvdXJzZSkgPT4gKFxyXG4gICAgICAgICAgICAgIDxJdGVtIGtleT17Y291cnNlLnN1YmNvbnRlbnRpZH0+XHJcbiAgICAgICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aW1hZ2VUaXRsZSA9PSBjb3Vyc2Uuc3VibmFtZSA/ICdhY3RpdmUnIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NoYW5nZUltYWdlU3JjKGNvdXJzZSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgIHtjb3Vyc2Uuc3VibmFtZX1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgIDwvSXRlbT5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxJdGVtPlxyXG4gICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17aW1hZ2VUaXRsZSA9PSBpdGVtLmluZm8uc3VibmFtZSA/ICdhY3RpdmUnIDogJyd9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXtjaGFuZ2VJbWFnZVNyYyhpdGVtLmluZm8pfVxyXG4gICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHtpdGVtLmluZm8uc3VibmFtZX1cclxuICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9JdGVtPlxyXG4gICAgICAgICAgKX1cclxuICAgICAgICA8L0NvdXJzZUxpc3Q+XHJcbiAgICAgICAgPENvdXJzZUltYWdlPlxyXG4gICAgICAgICAgPENhcmRXcmFwcGVyXHJcbiAgICAgICAgICAgIGhvdmVyYWJsZVxyXG4gICAgICAgICAgICBjb3Zlcj17XHJcbiAgICAgICAgICAgICAgaW1hZ2VTcmMgPyAoXHJcbiAgICAgICAgICAgICAgICA8Q2FyZEltYWdlXHJcbiAgICAgICAgICAgICAgICAgIHNyYz17aW1hZ2VTcmN9XHJcbiAgICAgICAgICAgICAgICAgIGFsdD1cIuy9lOyKpOydtOuvuOyngFwiXHJcbiAgICAgICAgICAgICAgICAgIHdpZHRoPXszMDB9XHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodD17MjAwfVxyXG4gICAgICAgICAgICAgICAgICBwcmlvcml0eT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgKSA6IChcclxuICAgICAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgICAgICBhbHQ9XCLspIDruYTspJFcIlxyXG4gICAgICAgICAgICAgICAgICBzcmM9XCJlcnJvclwiXHJcbiAgICAgICAgICAgICAgICAgIGZhbGxiYWNrPVwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFNSUFBQUREQ0FZQUFBRFF2YzZVQUFBQlJXbERRMUJKUTBNZ1VISnZabWxzWlFBQUtKRmpZR0FTU1N3b3lHRmhZR0RJelNzcENuSjNVb2lJakZKZ2Y4TEF3U0RDSU1vZ3dNQ2NtRnhjNEJnUTRBTlV3Z0NqVWNHM2F3eU1JUHF5THNpczdQUE9xM1FkREZjdmpWM2pPRDFib1FWVFBRcmdTa2t0VGdiU2Y0QTRMYm1ncUlTQmdURUZ5Rll1THlrQXNUdUFiSkVpb0tPQTdEa2dkanFFdlFIRVRvS3dqNERWaEFRNUE5azNnR3lCNUl4RW9CbU1MNEJzblNRazhYUWtOdFJlRU9CeGNmWHhVUWcxTWpjMGR5SGdYTkpCU1dwRkNZaDJ6aStvTE1wTXp5aFJjQVNHVXFxQ1oxNnlubzZDa1lHUkFRTURLTXdocWovZkFJY2xveGdIUXF4QWpJSEJFdWd3NXNVSXNTUXBCb2J0UVBkTGNpTEVWSll6TVBCSE1EQnNheWhJTEVxRU80RHhHMHR4bXJFUmhNMjluWUdCZGRyLy81L0RHUmpZTlJrWS9sNy8vLy8zOXYvLy95NERtbitMZ2VIQU53RHJrbDFBdU8rcG1nQUFBRGhsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUFxQUNBQVFBQUFBQkFBQUF3cUFEQUFRQUFBQUJBQUFBd3dBQUFBRDliL0huQUFBSGxrbEVRVlI0QWUzZFAzUFRXQlNHY2JHek02R0NLcWxJQlJWMGRIUkpGYXJRMGVVVDhMSDRCblJVME5IUjBVRUZWZElsRlJWN1R6Umtzb21QWTh1eWtUay96ZXdRZkt3Lzl6bnY0eXZKeW5MdjR1TGlWMmRCb0RpQmY0cVAzL0FSdUNSQUJFRkFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZ1FBUVpRS0FuWUVhUUJBUWFBU0tJQVFKRWtBRUVlZ0ptQkVsQW9CRWdnaGdnUUFRWlFLQW5ZRWFRQkFRYUFTS0lBUUpFa0FFRWVnSm1CRWxBb0JFZ2doZ2dRQVFaUUtBbllFYVFCQVFhQVNLSUFRSkVrQUVFZWdKbUJFbEFvQkVnZ2hnZzBBajhpMEpPNE96c3JQdjY5V3YraGkycVBIcjBxTnZmMzkraUk5N3NvUkloNGYzejU4L3U3ZHUzU1hYN1h0N1oyZW5ldkhtemZRZStvU04yYXBTQVBqMDlUU3JiK1hLSS9mMzc5KzA4K0EwY05SRTJBTmt1cGsrQUNOUHZrU1BjQUFFaWJBQ3lYVXlmQUJHbTN5Tkh1QUVDUk5nQVpMdVlQZ0VpcktsSHU3dTdYZHl5dEd3SEFkOGpqTnluZzRPRDd2bno1MWRiUFQ4Lzd6NTgrTkI5Ky9idDZqVS9USStBR1dIRW5yeDQ4ZUovRXNTbUh6eDQwTDE4K2ZMeXp4RjNaVk1qRXlEQ2lFRGpNWVpaUzV3aVBYbnlaRmJKYXhNaFFJUVJHekh2V1I3WEN5T0NYc09taURBaTFIbVBNTVFqRHBicEVpRENpTDM1OGVOSHVyVy81U25XZElCYlhpRENpQTM4L1BuenJjZTJZeVo0Ly81OUYzZVBMTk1sNFBicGlMMkowTDk3OSs3eUR0SERodzh2dHp6dmRHbkVYZHZVaWdTSXNDTEFXYXZIcC8rcU0wQmNYTWQvcTI1bjF2RjU3VFlCcDBhM21VemlsZVBqNCs3azVLU0xiNmd0NnlkQWhQVXpYbm9QUjBkSGw3OVdHVE5DZkJubjF1dlNDSmRlZ1FoTEkxdnZDaytmUHUyZVBYdDJ0Wk9ZRVY2L2ZuMzFkeitzaHdBUjFzUDFjcXZMbnRiRU45TXhBOXhjWWpzeFMxaldSNEFJYTJJYnp4MHRjNDRmWVgvMTZsVjZOREZMWEgrWUwzMmp3aUFDUkJpRWJmNUtjWG9USXNRU3B6WHg0TjI4SmE0QlFvSzdyZ1hpeWRiSGp4L1AyNVRhUUFKRUdBZ3VXeTArMlE4UEQ2L0tpNFI4RVZsK2J6Qk9uWlk5NWZxOXJqOXpBa1RJMlN4ZGlkQkhxRzkrc2tkdzQzYm9yQ1hPL1pjSmRyYVBXZHYyMnVJRWlMQTRxN252dkN1ZzhXVHF6UXZlT0gyNmZvZG83ZzZ1RmUvYTE3VzMrbkZCQWtSWUVOUmRiMXZra3oxQ0g5Y1BzVnkvanJocjI3UHFNWXZFTllObEhBSWVzUmlCWXdSeTBWKzhpWFA4Ky9mdlgxMU1yN0w3RUN1ZWIvcjQ4ZU1xbTdGdUkyQkdXREVHOGNtKzdHM05FT2ZtZGNUUXc0aDkvNTVsaG03RGVrUllLUVBaRjJBcmJYVEF5dTRrRFlCMll4VXp3ZzBnaS80MXp0SG5mUUcyNkhiR2VsL2NyVnJtN3ROWSsvMWJ0a09FQVoyTTA1cjRGQjdyOUdiQUlkeGFaWXJIZE9zZ0ovd0NFUVkwSjc0VG1PS25ieHhUOW4zRmdHR1dXc1Zkb3dIdGp0OU5udmY3eVFNMmFaVS9USUFJQXhydzZkT25BV3RaWmNvRW5CcE51VHVPYldNRWlMQXgxSFkwWlFKRW1ISjNITnZHQ0JCaFk2anRhTW9FaUpCMFoyOXZMNmxzNTh2eFBjTzgvemZyZG81cXZLTytkM0Z4OFd1OHpmMWRXNHAvY1B6TGx5L2R0djlUcy9FYmN2R0FIaEh5ZkJJaFo2TlNpSUJUbzBMTk50U2NBQkZ5TmlxRkNCQ2hVTE1OTlNkQWhKeU5TaUVDUkNqVWJFUE5DUkFoWjZOU2lBQVJDalhiVUhNQ1JNalpxQlFpUUlSQ3pUYlVuQUFSY2pZcWhRZ1FvVkN6RFRVblFJU2NqVW9oQWtRbzFHeER6UWtRSVdlalVvZ0FFUW8xMjFCekFrVEkyYWdVSWtDRVFzMDIxSndBRVhJMktvVUlFS0ZRc3cwMUowQ0VuSTFLSVFKRUtOUnNRODBKRUNGbm8xS0lBQkVLTmR0UWN3SkV5Tm1vRkNKQWhFTE5OdFNjQUJGeU5pcUZDQkNoVUxNTk5TZEFoSnlOU2lFQ1JDalViRVBOQ1JBaFo2TlNpQUFSQ2pYYlVITUNSTWpacUJRaVFJUkN6VGJVbkFBUmNqWXFoUWdRb1ZDekRUVW5RSVNjalVvaEFrUW8xR3hEelFrUUlXZWpVb2dBRVFvMTIxQnpBa1RJMmFnVUlrQ0VRczAyMUp3QUVYSTJLb1VJRUtGUXN3MDFKMENFbkkxS0lRSkVLTlJzUTgwSkVDRm5vMUtJQUJFS05kdFFjd0pFeU5tb0ZDSkFoRUxOTnRTY0FCRnlOaXFGQ0JDaFVMTU5OU2RBaEp5TlNpRUNSQ2pVYkVQTkNSQWhaNk5TaUFBUkNqWGJVSE1DUk1qWnFCUWlRSVJDelRiVW5BQVJjallxaFFnUW9WQ3pEVFVuUUlTY2pVb2hBa1FvMUd4RHpRa1FJV2VqVW9nQUVRbzEyMUJ6QWtUSTJhZ1VJa0NFUXMwMjFKd0FFWEkyS29VSUVLRlFzdzAxSjBDRW5JMUtJUUpFS05Sc1E4MEpFQ0ZubzFLSUFCRUtOZHRRY3dKRXlObW9GQ0pBaEVMTk50U2NBQkZ5TmlxRkNCQ2hVTE1OTlNkQWhKeU5TaUVDL3dHZ0tLQzRZTUE0VEFBQUFBQkpSVTVFcmtKZ2dnPT1cIlxyXG4gICAgICAgICAgICAgICAgICB3aWR0aD17MzAwfVxyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ9ezIwMH1cclxuICAgICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA+PC9DYXJkV3JhcHBlcj5cclxuICAgICAgICA8L0NvdXJzZUltYWdlPlxyXG4gICAgICA8L1dyYXBwZXI+XHJcbiAgICAgIDxTdWJEZXRhaWw+XHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICB7YC0gYH1cclxuICAgICAgICAgICAge2ltYWdlVGl0bGV9XHJcbiAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAge3N1Yk92ZXJ2aWV3ID8gKFxyXG4gICAgICAgICAgPHAgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiBzdWJPdmVydmlldyB9fSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L1N1YkRldGFpbD5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyQ291cnNlO1xyXG4iLCJpbXBvcnQgSW1hZ2UgZnJvbSAnbmV4dC9pbWFnZSc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgeyBUaW1lbGluZSwgQ2FyZCB9IGZyb20gJ2FudGQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZm9udC1mYW1pbHk6IEJNSEFOTkFBaXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDkwJTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIH1cclxuYDtcclxuZXhwb3J0IGNvbnN0IEl0ZW0gPSBzdHlsZWQoVGltZWxpbmUuSXRlbSlgXHJcbiAgZm9udC1zaXplOiAxOHB4O1xyXG4gICYgZGl2IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICYuYWN0aXZlIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvdXJzZUltYWdlID0gc3R5bGVkLmRpdmBgO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvdXJzZUxpc3QgPSBzdHlsZWQoVGltZWxpbmUpYFxyXG4gIG1hcmdpbi10b3A6IDEwcHg7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgQ2FyZFdyYXBwZXIgPSBzdHlsZWQoQ2FyZClgXHJcbiAgd2lkdGg6IDMwMHB4O1xyXG4gIGhlaWdodDogMjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgJiBkaXYge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG4gICAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVTfSB7XHJcbiAgICB3aWR0aDogMjUwcHg7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDYXJkSW1hZ2UgPSBzdHlsZWQoSW1hZ2UpYFxyXG4gIHdpZHRoOiAzMDBweDtcclxuICBoZWlnaHQ6IDI1MHB4O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZVN9IHtcclxuICAgIC8vIHdpZHRoOiAyNTBweDtcclxuICAgIC8vIGhlaWdodDogMjAwcHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFN1YkRldGFpbCA9IHN0eWxlZC5kaXZgXHJcbiAgZmxleDogMjtcclxuICBwYWRkaW5nOiAxMHB4O1xyXG5cclxuICBmb250LWZhbWlseTogbm9uZTtcclxuICBmb250LXNpemU6IDE1cHg7XHJcbiAgbGluZS1oZWlnaHQ6IDE4cHg7XHJcbiAgJiBzcGFuIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgcGFkZGluZzogNXB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDI1cHg7XHJcbiAgICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgfVxyXG4gICYgZGl2IHtcclxuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XHJcbiAgfVxyXG4gICYgcCB7XHJcbiAgICBsaW5lLWhlaWdodDogMjBweDtcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IFN1Ykl0ZW0gZnJvbSAnLi4vU3ViSXRlbSc7XHJcbmltcG9ydCB7IEludHJvV3JhcHBlciB9IGZyb20gJy4uL1N1Ykl0ZW0vc3R5bGUnO1xyXG5cclxuY29uc3QgVG91ckN1bHR1cmU6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IGFkZHIxLCBob21lcGFnZSB9ID0gaXRlbTtcclxuICBjb25zdCB7IGluZm9jZW50ZXJjdWx0dXJlLCBwYXJraW5nY3VsdHVyZSwgcGFya2luZ2ZlZSwgdXNldGltZWN1bHR1cmUgfSA9XHJcbiAgICBpdGVtLmludHJvO1xyXG4gIHJldHVybiAoXHJcbiAgICA8SW50cm9XcmFwcGVyPlxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge2FkZHIxID8gPFN1Ykl0ZW0gbmFtZT1cIuyjvOyGjFwiIGh0bWw9e2FkZHIxfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2hvbWVwYWdlID8gPFN1Ykl0ZW0gbmFtZT1cIu2ZiO2OmOydtOyngFwiIGh0bWw9e2hvbWVwYWdlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2luZm9jZW50ZXJjdWx0dXJlID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIuusuOydmFwiIGh0bWw9e2luZm9jZW50ZXJjdWx0dXJlfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtwYXJraW5nY3VsdHVyZSA/IDxTdWJJdGVtIG5hbWU9XCLso7zssKhcIiBodG1sPXtwYXJraW5nY3VsdHVyZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtwYXJraW5nZmVlID8gPFN1Ykl0ZW0gbmFtZT1cIuyalOq4iFwiIGh0bWw9e3BhcmtpbmdmZWV9IC8+IDogbnVsbH1cclxuICAgICAgICB7dXNldGltZWN1bHR1cmUgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi7J207Jqp7Iuc6rCEXCIgaHRtbD17dXNldGltZWN1bHR1cmV9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICA8U3ViSXRlbSBrZXk9e3YuaW5mb25hbWV9IG5hbWU9e3YuaW5mb25hbWV9IGh0bWw9e3YuaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyQ3VsdHVyZTtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgU3ViSXRlbSBmcm9tICcuLi9TdWJJdGVtJztcclxuaW1wb3J0IHsgSW50cm9XcmFwcGVyIH0gZnJvbSAnLi4vU3ViSXRlbS9zdHlsZSc7XHJcblxyXG5jb25zdCBUb3VyRXZlbnQ6IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCB7IGFkZHIxLCBob21lcGFnZSwgdGVsIH0gPSBpdGVtO1xyXG4gIGNvbnN0IHsgdXNldGltZWZlc3RpdmFsLCBwbGF5dGltZSwgZGlzY291bnRpbmZvZmVzdGl2YWwgfSA9IGl0ZW0uaW50cm87XHJcbiAgcmV0dXJuIChcclxuICAgIDxJbnRyb1dyYXBwZXI+XHJcbiAgICAgIDx1bD5cclxuICAgICAgICB7YWRkcjEgPyA8U3ViSXRlbSBuYW1lPVwi7KO87IaMXCIgaHRtbD17YWRkcjF9IC8+IDogbnVsbH1cclxuICAgICAgICB7aG9tZXBhZ2UgPyA8U3ViSXRlbSBuYW1lPVwi7ZmI7Y6Y7J207KeAXCIgaHRtbD17aG9tZXBhZ2V9IC8+IDogbnVsbH1cclxuICAgICAgICB7dGVsID8gPFN1Ykl0ZW0gbmFtZT1cIuusuOydmFwiIGh0bWw9e3RlbH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHt1c2V0aW1lZmVzdGl2YWwgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi7JqU6riIXCIgaHRtbD17dXNldGltZWZlc3RpdmFsfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtwbGF5dGltZSA/IDxTdWJJdGVtIG5hbWU9XCLsnbzsoJVcIiBodG1sPXtwbGF5dGltZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtkaXNjb3VudGluZm9mZXN0aXZhbCA/IChcclxuICAgICAgICAgIDxTdWJJdGVtIG5hbWU9XCLtlaDsnbhcIiBodG1sPXtkaXNjb3VudGluZm9mZXN0aXZhbH0gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuXHJcbiAgICAgICAge2l0ZW0uaW5mbyA/IChcclxuICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbS5pbmZvKSA/IChcclxuICAgICAgICAgICAgaXRlbS5pbmZvLm1hcCgodikgPT4gKFxyXG4gICAgICAgICAgICAgIDxTdWJJdGVtIGtleT17di5pbmZvbmFtZX0gbmFtZT17di5pbmZvbmFtZX0gaHRtbD17di5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxTdWJJdGVtIG5hbWU9e2l0ZW0uaW5mby5pbmZvbmFtZX0gaHRtbD17aXRlbS5pbmZvLmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9JbnRyb1dyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvdXJFdmVudDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgU3ViSXRlbSBmcm9tICcuLi9TdWJJdGVtJztcclxuaW1wb3J0IHsgSW50cm9XcmFwcGVyIH0gZnJvbSAnLi4vU3ViSXRlbS9zdHlsZSc7XHJcblxyXG5jb25zdCBUb3VyRm9vZDogUmVhY3QuRkM8RGV0YWlsSXRlbXByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIGNvbnN0IHsgYWRkcjEsIGhvbWVwYWdlIH0gPSBpdGVtO1xyXG4gIGNvbnN0IHtcclxuICAgIHJlc3RkYXRlZm9vZCxcclxuICAgIHJlc2VydmF0aW9uZm9vZCxcclxuICAgIG9wZW50aW1lZm9vZCxcclxuICAgIHRyZWF0bWVudSxcclxuICAgIGluZm9jZW50ZXJmb29kLFxyXG4gIH0gPSBpdGVtLmludHJvO1xyXG4gIHJldHVybiAoXHJcbiAgICA8SW50cm9XcmFwcGVyPlxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge2FkZHIxID8gPFN1Ykl0ZW0gbmFtZT1cIuyjvOyGjFwiIGh0bWw9e2FkZHIxfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2hvbWVwYWdlID8gPFN1Ykl0ZW0gbmFtZT1cIu2ZiO2OmOydtOyngFwiIGh0bWw9e2hvbWVwYWdlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2luZm9jZW50ZXJmb29kID8gPFN1Ykl0ZW0gbmFtZT1cIuusuOydmFwiIGh0bWw9e2luZm9jZW50ZXJmb29kfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3RyZWF0bWVudSA/IDxTdWJJdGVtIG5hbWU9XCLrqZTribRcIiBodG1sPXt0cmVhdG1lbnV9IC8+IDogbnVsbH1cclxuICAgICAgICB7cmVzZXJ2YXRpb25mb29kID8gKFxyXG4gICAgICAgICAgPFN1Ykl0ZW0gbmFtZT1cIuyXkOyVvVwiIGh0bWw9e3Jlc2VydmF0aW9uZm9vZH0gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7cmVzdGRhdGVmb29kID8gPFN1Ykl0ZW0gbmFtZT1cIu2ctOydvFwiIGh0bWw9e3Jlc3RkYXRlZm9vZH0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtvcGVudGltZWZvb2QgPyA8U3ViSXRlbSBuYW1lPVwi7J207Jqp7Iuc6rCEXCIgaHRtbD17b3BlbnRpbWVmb29kfSAvPiA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICA8U3ViSXRlbSBrZXk9e3YuaW5mb25hbWV9IG5hbWU9e3YuaW5mb25hbWV9IGh0bWw9e3YuaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyRm9vZDtcclxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRGV0YWlsSXRlbXByb3BzIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgU3ViSXRlbSBmcm9tICcuLi9TdWJJdGVtJztcclxuaW1wb3J0IHsgSW50cm9XcmFwcGVyIH0gZnJvbSAnLi4vU3ViSXRlbS9zdHlsZSc7XHJcblxyXG5jb25zdCBUb3VyTWFsbDogUmVhY3QuRkM8RGV0YWlsSXRlbXByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIGNvbnN0IHsgYWRkcjEsIGhvbWVwYWdlIH0gPSBpdGVtO1xyXG4gIGNvbnN0IHsgaW5mb2NlbnRlcnNob3BwaW5nLCBzaG9wZ3VpZGUsIG9wZW50aW1lLCByZXN0ZGF0ZXNob3BwaW5nIH0gPVxyXG4gICAgaXRlbS5pbnRybztcclxuICByZXR1cm4gKFxyXG4gICAgPEludHJvV3JhcHBlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHthZGRyMSA/IDxTdWJJdGVtIG5hbWU9XCLso7zshoxcIiBodG1sPXthZGRyMX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtob21lcGFnZSA/IDxTdWJJdGVtIG5hbWU9XCLtmYjtjpjsnbTsp4BcIiBodG1sPXtob21lcGFnZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtpbmZvY2VudGVyc2hvcHBpbmcgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi66y47J2YXCIgaHRtbD17aW5mb2NlbnRlcnNob3BwaW5nfSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtzaG9wZ3VpZGUgPyA8U3ViSXRlbSBuYW1lPVwi7JWI64K0XCIgaHRtbD17c2hvcGd1aWRlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3Jlc3RkYXRlc2hvcHBpbmcgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi7Zy07J28XCIgaHRtbD17cmVzdGRhdGVzaG9wcGluZ30gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7b3BlbnRpbWUgPyA8U3ViSXRlbSBuYW1lPVwi7J207Jqp7Iuc6rCEXCIgaHRtbD17b3BlbnRpbWV9IC8+IDogbnVsbH1cclxuXHJcbiAgICAgICAge2l0ZW0uaW5mbyA/IChcclxuICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbS5pbmZvKSA/IChcclxuICAgICAgICAgICAgaXRlbS5pbmZvLm1hcCgodikgPT4gKFxyXG4gICAgICAgICAgICAgIDxTdWJJdGVtIGtleT17di5pbmZvbmFtZX0gbmFtZT17di5pbmZvbmFtZX0gaHRtbD17di5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxTdWJJdGVtIG5hbWU9e2l0ZW0uaW5mby5pbmZvbmFtZX0gaHRtbD17aXRlbS5pbmZvLmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9JbnRyb1dyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvdXJNYWxsO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBEZXRhaWxJdGVtcHJvcHMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCBTdWJJdGVtIGZyb20gJy4uL1N1Ykl0ZW0nO1xyXG5pbXBvcnQgeyBJbnRyb1dyYXBwZXIgfSBmcm9tICcuLi9TdWJJdGVtL3N0eWxlJztcclxuXHJcbmNvbnN0IFRvdXJTbGVlcDogUmVhY3QuRkM8RGV0YWlsSXRlbXByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIGNvbnN0IHsgYWRkcjEsIGhvbWVwYWdlIH0gPSBpdGVtO1xyXG4gIGNvbnN0IHtcclxuICAgIHJlc2VydmF0aW9ubG9kZ2luZyxcclxuICAgIHJlc2VydmF0aW9udXJsLFxyXG4gICAgY2hlY2tpbnRpbWUsXHJcbiAgICBjaGVja291dHRpbWUsXHJcbiAgICByZWZ1bmRyZWd1bGF0aW9uLFxyXG4gICAgc2NhbGVsb2RnaW5nLFxyXG4gIH0gPSBpdGVtLmludHJvO1xyXG4gIHJldHVybiAoXHJcbiAgICA8SW50cm9XcmFwcGVyPlxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge2FkZHIxID8gPFN1Ykl0ZW0gbmFtZT1cIuyjvOyGjFwiIGh0bWw9e2FkZHIxfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2hvbWVwYWdlID8gPFN1Ykl0ZW0gbmFtZT1cIu2ZiO2OmOydtOyngFwiIGh0bWw9e2hvbWVwYWdlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge3Jlc2VydmF0aW9ubG9kZ2luZyA/IChcclxuICAgICAgICAgIDxTdWJJdGVtIG5hbWU9XCLrrLjsnZhcIiBodG1sPXtyZXNlcnZhdGlvbmxvZGdpbmd9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcbiAgICAgICAge3Jlc2VydmF0aW9udXJsID8gPFN1Ykl0ZW0gbmFtZT1cIuyYiOyVvVwiIGh0bWw9e3Jlc2VydmF0aW9udXJsfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2NoZWNraW50aW1lID8gPFN1Ykl0ZW0gbmFtZT1cIuyytO2BrOyduFwiIGh0bWw9e2NoZWNraW50aW1lfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2NoZWNrb3V0dGltZSA/IDxTdWJJdGVtIG5hbWU9XCLssrTtgazslYTsm4NcIiBodG1sPXtjaGVja291dHRpbWV9IC8+IDogbnVsbH1cclxuICAgICAgICB7cmVmdW5kcmVndWxhdGlvbiA/IChcclxuICAgICAgICAgIDxTdWJJdGVtIG5hbWU9XCLtmZjrtohcIiBodG1sPXtyZWZ1bmRyZWd1bGF0aW9ufSAvPlxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICAgIHtzY2FsZWxvZGdpbmcgPyA8U3ViSXRlbSBuYW1lPVwi6rec66qoXCIgaHRtbD17c2NhbGVsb2RnaW5nfSAvPiA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mb1xyXG4gICAgICAgICAgICAgIC5maWx0ZXIoKHYpID0+IHYuaW5mb25hbWUpXHJcbiAgICAgICAgICAgICAgLm1hcCgodikgPT4gKFxyXG4gICAgICAgICAgICAgICAgPFN1Ykl0ZW0ga2V5PXt2LmluZm9uYW1lfSBuYW1lPXt2LmluZm9uYW1lfSBodG1sPXt2LmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyU2xlZXA7XHJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IERldGFpbEl0ZW1wcm9wcyB9IGZyb20gJy4uLy4uL21vZHVsZXMvZGV0YWlsJztcclxuaW1wb3J0IFN1Ykl0ZW0gZnJvbSAnLi4vU3ViSXRlbSc7XHJcbmltcG9ydCB7IEludHJvV3JhcHBlciB9IGZyb20gJy4uL1N1Ykl0ZW0vc3R5bGUnO1xyXG5cclxuY29uc3QgVG91clNwb3J0czogUmVhY3QuRkM8RGV0YWlsSXRlbXByb3BzPiA9ICh7IGl0ZW0gfSkgPT4ge1xyXG4gIGNvbnN0IHsgYWRkcjEsIGhvbWVwYWdlIH0gPSBpdGVtO1xyXG4gIGNvbnN0IHsgaW5mb2NlbnRlcmxlcG9ydHMsIHJlc2VydmF0aW9uLCB1c2V0aW1lbGVwb3J0cyB9ID0gaXRlbS5pbnRybztcclxuICByZXR1cm4gKFxyXG4gICAgPEludHJvV3JhcHBlcj5cclxuICAgICAgPHVsPlxyXG4gICAgICAgIHthZGRyMSA/IDxTdWJJdGVtIG5hbWU9XCLso7zshoxcIiBodG1sPXthZGRyMX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtob21lcGFnZSA/IDxTdWJJdGVtIG5hbWU9XCLtmYjtjpjsnbTsp4BcIiBodG1sPXtob21lcGFnZX0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtyZXNlcnZhdGlvbiA/IDxTdWJJdGVtIG5hbWU9XCLsmIjslb1cIiBodG1sPXtyZXNlcnZhdGlvbn0gLz4gOiBudWxsfVxyXG4gICAgICAgIHtpbmZvY2VudGVybGVwb3J0cyA/IChcclxuICAgICAgICAgIDxTdWJJdGVtIG5hbWU9XCLrrLjsnZhcIiBodG1sPXtpbmZvY2VudGVybGVwb3J0c30gLz5cclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgICB7dXNldGltZWxlcG9ydHMgPyAoXHJcbiAgICAgICAgICA8U3ViSXRlbSBuYW1lPVwi7J207Jqp7Iuc6rCEXCIgaHRtbD17dXNldGltZWxlcG9ydHN9IC8+XHJcbiAgICAgICAgKSA6IG51bGx9XHJcblxyXG4gICAgICAgIHtpdGVtLmluZm8gPyAoXHJcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGl0ZW0uaW5mbykgPyAoXHJcbiAgICAgICAgICAgIGl0ZW0uaW5mby5tYXAoKHYpID0+IChcclxuICAgICAgICAgICAgICA8U3ViSXRlbSBrZXk9e3YuaW5mb25hbWV9IG5hbWU9e3YuaW5mb25hbWV9IGh0bWw9e3YuaW5mb3RleHR9IC8+XHJcbiAgICAgICAgICAgICkpXHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8U3ViSXRlbSBuYW1lPXtpdGVtLmluZm8uaW5mb25hbWV9IGh0bWw9e2l0ZW0uaW5mby5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgIClcclxuICAgICAgICApIDogbnVsbH1cclxuICAgICAgPC91bD5cclxuICAgIDwvSW50cm9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBUb3VyU3BvcnRzO1xyXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBEZXRhaWxJdGVtcHJvcHMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCBTdWJJdGVtIGZyb20gJy4uL1N1Ykl0ZW0nO1xyXG5pbXBvcnQgeyBJbnRyb1dyYXBwZXIgfSBmcm9tICcuLi9TdWJJdGVtL3N0eWxlJztcclxuXHJcbmNvbnN0IFRvdXJTcG90OiBSZWFjdC5GQzxEZXRhaWxJdGVtcHJvcHM+ID0gKHsgaXRlbSB9KSA9PiB7XHJcbiAgY29uc3QgeyBhZGRyMSwgaG9tZXBhZ2UgfSA9IGl0ZW07XHJcbiAgY29uc3QgeyBpbmZvY2VudGVyLCB1c2V0aW1lIH0gPSBpdGVtLmludHJvO1xyXG4gIHJldHVybiAoXHJcbiAgICA8SW50cm9XcmFwcGVyPlxyXG4gICAgICA8dWw+XHJcbiAgICAgICAge2FkZHIxID8gPFN1Ykl0ZW0gbmFtZT1cIuyjvOyGjFwiIGh0bWw9e2FkZHIxfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2hvbWVwYWdlID8gPFN1Ykl0ZW0gbmFtZT1cIu2ZiO2OmOydtOyngFwiIGh0bWw9e2hvbWVwYWdlfSAvPiA6IG51bGx9XHJcbiAgICAgICAge2luZm9jZW50ZXIgPyA8U3ViSXRlbSBuYW1lPVwi66y47J2YXCIgaHRtbD17aW5mb2NlbnRlcn0gLz4gOiBudWxsfVxyXG4gICAgICAgIHt1c2V0aW1lID8gPFN1Ykl0ZW0gbmFtZT1cIuydtOyaqeyLnOqwhFwiIGh0bWw9e3VzZXRpbWV9IC8+IDogbnVsbH1cclxuXHJcbiAgICAgICAge2l0ZW0uaW5mbyA/IChcclxuICAgICAgICAgIEFycmF5LmlzQXJyYXkoaXRlbS5pbmZvKSA/IChcclxuICAgICAgICAgICAgaXRlbS5pbmZvLm1hcCgodikgPT4gKFxyXG4gICAgICAgICAgICAgIDxTdWJJdGVtIGtleT17di5pbmZvbmFtZX0gbmFtZT17di5pbmZvbmFtZX0gaHRtbD17di5pbmZvdGV4dH0gLz5cclxuICAgICAgICAgICAgKSlcclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDxTdWJJdGVtIG5hbWU9e2l0ZW0uaW5mby5pbmZvbmFtZX0gaHRtbD17aXRlbS5pbmZvLmluZm90ZXh0fSAvPlxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICkgOiBudWxsfVxyXG4gICAgICA8L3VsPlxyXG4gICAgPC9JbnRyb1dyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFRvdXJTcG90O1xyXG4iLCJpbXBvcnQgeyBCdXR0b24sIEZvcm0gfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHJvdXRlciBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgdXNlRGlzcGF0Y2gsIHVzZVNlbGVjdG9yIH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgU3dhbCBmcm9tICdzd2VldGFsZXJ0Mic7XHJcbmltcG9ydCB1c2VJbnB1dCBmcm9tICcuLi8uLi8uLi91dGlscy91c2VJbnB1dCc7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4uLy4uL21vZHVsZXMnO1xyXG5pbXBvcnQgeyBhZGRDb21tZW50QXN5bmMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbW1lbnQnO1xyXG5pbXBvcnQgeyBEZXRhaWxJdGVtcHJvcHMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2RldGFpbCc7XHJcbmltcG9ydCB7XHJcbiAgQnV0dG9uV3JhcHBlcixcclxuICBGb3JtV3JhcHBlcixcclxuICAvLyBTdWJtaXRCdXR0b24sXHJcbiAgVGV4dEFyZWEsXHJcbiAgVGV4dEFyZWFXcmFwcGVyLFxyXG59IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuY29uc3QgQ29tbWVudEZvcm06IFJlYWN0LkZDPERldGFpbEl0ZW1wcm9wcz4gPSAoeyBpdGVtIH0pID0+IHtcclxuICBjb25zdCBbY29tbWVudFRleHQsIG9uQ2hhbmdlQ29tbWVudFRleHQsIHNldENvbW1lbnRUZXh0XSA9IHVzZUlucHV0KCcnKTtcclxuICBjb25zdCB7IG1lIH0gPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gc3RhdGUudXNlcik7XHJcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG5cclxuICBjb25zdCBzaG93TW9kYWwgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICByZXR1cm4gU3dhbC5maXJlKHtcclxuICAgICAgdGl0bGU6ICfroZzqt7jsnbgg7ZmU66m0IOydtOuPmScsXHJcbiAgICAgIHRleHQ6ICfrjJPquIDsnYQg7J6R7ISx7ZWY66Ck66m0IOuhnOq3uOyduCDtlZjshLjsmpQuJyxcclxuICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcclxuICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICfsnbTrj5knLFxyXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiAn7Leo7IaMJyxcclxuICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgfSkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgIGlmIChyZXN1bHQuaXNDb25maXJtZWQpIHtcclxuICAgICAgICByb3V0ZXIucHVzaCgnL2xvZ2luJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtdKTtcclxuXHJcbiAgY29uc3Qgb25TdWJtaXQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBpZiAoIWNvbW1lbnRUZXh0LnRyaW0oKSkge1xyXG4gICAgICByZXR1cm4gU3dhbC5maXJlKHtcclxuICAgICAgICB0aXRsZTogJ+uMk+q4gOydhCDsnoXroKXtlZjshLjsmpQnLFxyXG4gICAgICAgIGljb246ICd3YXJuaW5nJyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkaXNwYXRjaChcclxuICAgICAgYWRkQ29tbWVudEFzeW5jLnJlcXVlc3QoeyBjb250ZW50aWQ6IGl0ZW0uY29udGVudGlkLCBjb21tZW50VGV4dCB9KVxyXG4gICAgKTtcclxuICAgIHNldENvbW1lbnRUZXh0KCcnKTtcclxuICB9LCBbY29tbWVudFRleHQsIGRpc3BhdGNoLCBpdGVtLmNvbnRlbnRpZCwgc2V0Q29tbWVudFRleHRdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtV3JhcHBlcj5cclxuICAgICAge21lID8gKFxyXG4gICAgICAgIDxGb3JtIG9uRmluaXNoPXtvblN1Ym1pdH0+XHJcbiAgICAgICAgICA8VGV4dEFyZWFXcmFwcGVyPlxyXG4gICAgICAgICAgICA8VGV4dEFyZWFcclxuICAgICAgICAgICAgICByb3dzPXszfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUNvbW1lbnRUZXh0fVxyXG4gICAgICAgICAgICAgIHZhbHVlPXtjb21tZW50VGV4dH1cclxuICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cIuuMk+q4gOydhCDsnoXroKXtlZjshLjsmpQuXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvVGV4dEFyZWFXcmFwcGVyPlxyXG4gICAgICAgICAgPEJ1dHRvbldyYXBwZXI+XHJcbiAgICAgICAgICAgIDxCdXR0b24gaHRtbFR5cGU9XCJzdWJtaXRcIiB0eXBlPVwicHJpbWFyeVwiPlxyXG4gICAgICAgICAgICAgIOuTseuhnVxyXG4gICAgICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICAgIDwvQnV0dG9uV3JhcHBlcj5cclxuICAgICAgICA8L0Zvcm0+XHJcbiAgICAgICkgOiAoXHJcbiAgICAgICAgPEZvcm0gb25DbGljaz17c2hvd01vZGFsfT5cclxuICAgICAgICAgIDxUZXh0QXJlYVdyYXBwZXI+XHJcbiAgICAgICAgICAgIDxUZXh0QXJlYSByb3dzPXszfSBwbGFjZWhvbGRlcj1cIuuMk+q4gOydhCDsnpHshLHtlZjroKTrqbQg66Gc6re47J24IO2VmOyEuOyalC5cIiAvPlxyXG4gICAgICAgICAgPC9UZXh0QXJlYVdyYXBwZXI+XHJcbiAgICAgICAgICA8QnV0dG9uV3JhcHBlcj5cclxuICAgICAgICAgICAgPEJ1dHRvbiBodG1sVHlwZT1cInN1Ym1pdFwiIHR5cGU9XCJwcmltYXJ5XCI+XHJcbiAgICAgICAgICAgICAg65Ox66GdXHJcbiAgICAgICAgICAgIDwvQnV0dG9uPlxyXG4gICAgICAgICAgPC9CdXR0b25XcmFwcGVyPlxyXG4gICAgICAgIDwvRm9ybT5cclxuICAgICAgKX1cclxuICAgIDwvRm9ybVdyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbW1lbnRGb3JtO1xyXG4iLCJpbXBvcnQgeyBGb3JtIH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IEZvcm1XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBwYWRkaW5nOiAxMHB4O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDk1JTtcclxuICAgIG1hcmdpbjogMCBhdXRvO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBCdXR0b25XcmFwcGVyID0gc3R5bGVkKEZvcm0uSXRlbSlgXHJcbiAgdGV4dC1hbGlnbjogZW5kO1xyXG4gIC5hbnQtYnRuLXByaW1hcnkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWU1OTtcclxuICAgIGJvcmRlcjogIzFhNzNlODtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZiODZlO1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBUZXh0QXJlYVdyYXBwZXIgPSBzdHlsZWQoRm9ybS5JdGVtKWBcclxuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xyXG5gO1xyXG5leHBvcnQgY29uc3QgVGV4dEFyZWEgPSBzdHlsZWQudGV4dGFyZWFgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gIHBhZGRpbmc6IDEwcHg7XHJcbmA7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgQXZhdGFyIH0gZnJvbSAnYW50ZCc7XHJcbmltcG9ydCB7IENvbW1lbnREYXRhLCBkZWxldGVDb21tZW50QXN5bmMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbW1lbnQnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4uLy4uL21vZHVsZXMnO1xyXG5pbXBvcnQgeyBDb21tZW50U3R5bGUgfSBmcm9tICcuL3N0eWxlJztcclxuaW1wb3J0IFN3YWwgZnJvbSAnc3dlZXRhbGVydDInO1xyXG5pbXBvcnQgRWRpdEZvcm0gZnJvbSAnLi4vRWRpdEZvcm0nO1xyXG5pbXBvcnQgdXNlVG9nZ2xlIGZyb20gJy4uLy4uLy4uL3V0aWxzL3VzZVRvZ2dsZSc7XHJcblxyXG5pbnRlcmZhY2UgQ29tbWVudEl0ZW1Qcm9wcyB7XHJcbiAgZGF0YTogQ29tbWVudERhdGE7XHJcbn1cclxuXHJcbmNvbnN0IENvbW1lbnRJdGVtOiBSZWFjdC5GQzxDb21tZW50SXRlbVByb3BzPiA9ICh7IGRhdGEgfSkgPT4ge1xyXG4gIGNvbnN0IFtlZGl0YWJsZSwgb25Ub2dnbGVFZGl0XSA9IHVzZVRvZ2dsZShmYWxzZSk7XHJcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG5cclxuICBjb25zdCBpZCA9IHVzZVNlbGVjdG9yKFxyXG4gICAgKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLnVzZXIubWUgJiYgc3RhdGUudXNlci5tZS5pZFxyXG4gICk7XHJcblxyXG4gIGNvbnN0IHJlbW92ZUNvbW1lbnQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBTd2FsLmZpcmUoe1xyXG4gICAgICB0aXRsZTogJ+uMk+q4gOydhCDsoJXrp5Ag7IKt7KCc7ZWY7Iuc6rKg7Iq164uI6rmMPycsXHJcbiAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAn7IKt7KCcJyxcclxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogJ+y3qOyGjCcsXHJcbiAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgaWYgKHJlc3VsdC5pc0NvbmZpcm1lZCkge1xyXG4gICAgICAgIGRpc3BhdGNoKFxyXG4gICAgICAgICAgZGVsZXRlQ29tbWVudEFzeW5jLnJlcXVlc3QoeyBpZDogZGF0YS5pZCwgY29udGVudGlkOiBkYXRhLmNvbnRlbnRJZCB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIFtkaXNwYXRjaCwgZGF0YS5pZCwgZGF0YS5jb250ZW50SWRdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIHshZWRpdGFibGUgPyAoXHJcbiAgICAgICAgPENvbW1lbnRTdHlsZVxyXG4gICAgICAgICAgbWluZT17aWQgPT09IGRhdGEuVXNlcklkID8gMSA6IDB9XHJcbiAgICAgICAgICBhY3Rpb25zPXtbXHJcbiAgICAgICAgICAgIGlkID09PSBkYXRhLlVzZXJJZCA/IChcclxuICAgICAgICAgICAgICA8c3BhbiBvbkNsaWNrPXtvblRvZ2dsZUVkaXR9IGtleT1cImNvbW1lbnQtbW9kaWZ5XCI+XHJcbiAgICAgICAgICAgICAgICDsiJjsoJVcclxuICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICkgOiBudWxsLFxyXG4gICAgICAgICAgICBpZCA9PT0gZGF0YS5Vc2VySWQgPyAoXHJcbiAgICAgICAgICAgICAgPHNwYW4gb25DbGljaz17cmVtb3ZlQ29tbWVudH0ga2V5PVwiY29tbWVudC1kZWxldGVcIj5cclxuICAgICAgICAgICAgICAgIOyCreygnFxyXG4gICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgKSA6IG51bGwsXHJcbiAgICAgICAgICBdfVxyXG4gICAgICAgICAgYXV0aG9yPXs8YT57ZGF0YS5Vc2VyLm5pY2tuYW1lfTwvYT59XHJcbiAgICAgICAgICBhdmF0YXI9ezxBdmF0YXI+e2RhdGEuVXNlci5uaWNrbmFtZS5zbGljZSgwLCAyKX08L0F2YXRhcj59XHJcbiAgICAgICAgICBjb250ZW50PXs8cD57ZGF0YS5jb250ZW50fTwvcD59XHJcbiAgICAgICAgICBkYXRldGltZT17XHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgIHtuZXcgRGF0ZShkYXRhLmNyZWF0ZWRBdCkudG9Mb2NhbGVTdHJpbmcoJ2tvLUtSJywge1xyXG4gICAgICAgICAgICAgICAgdGltZVpvbmU6ICdBc2lhL1Nlb3VsJyxcclxuICAgICAgICAgICAgICB9KX1cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgfVxyXG4gICAgICAgID48L0NvbW1lbnRTdHlsZT5cclxuICAgICAgKSA6IChcclxuICAgICAgICA8PlxyXG4gICAgICAgICAgPEVkaXRGb3JtXHJcbiAgICAgICAgICAgIHRleHQ9e2RhdGEuY29udGVudH1cclxuICAgICAgICAgICAgaWQ9e2RhdGEuaWR9XHJcbiAgICAgICAgICAgIHRvZ2dsZUVkaXQ9e29uVG9nZ2xlRWRpdH1cclxuICAgICAgICAgICAgY29udGVudGlkPXtkYXRhLmNvbnRlbnRJZH1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC8+XHJcbiAgICAgICl9XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tbWVudEl0ZW07XHJcbiIsImltcG9ydCB7IENvbW1lbnQgfSBmcm9tICdhbnRkJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ29tbWVudFN0eWxlID0gc3R5bGVkKENvbW1lbnQpPHsgbWluZTogMSB8IDAgfT5gXHJcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU1ZTU7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogJHsocHJvcHMpID0+IChwcm9wcy5taW5lID8gJyNmMGYwZjAnIDogJyNmZmYnKX07XHJcbiAgcGFkZGluZzogMHB4IDIwcHg7XHJcbmA7XHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEJ1dHRvbiwgRm9ybSB9IGZyb20gJ2FudGQnO1xyXG5pbXBvcnQgeyBGb3JtV3JhcHBlciwgVGV4dEFyZWEsIFRleHRBcmVhV3JhcHBlciB9IGZyb20gJy4uL0NvbW1lbnRGb3JtL3N0eWxlJztcclxuaW1wb3J0IHsgQ2FuY2VsQnV0dG9uLCBCdXR0b25XcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgbW9kaWZ5Q29tbWVudEFzeW5jIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9jb21tZW50JztcclxuaW1wb3J0IHsgUm9vdFN0YXRlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcyc7XHJcbmltcG9ydCBTd2FsIGZyb20gJ3N3ZWV0YWxlcnQyJztcclxuaW1wb3J0IHVzZUlucHV0IGZyb20gJy4uLy4uLy4uL3V0aWxzL3VzZUlucHV0JztcclxuXHJcbmludGVyZmFjZSBFZGl0Rm9ybVByb3BzIHtcclxuICB0ZXh0OiBzdHJpbmc7XHJcbiAgaWQ6IG51bWJlcjtcclxuICB0b2dnbGVFZGl0OiAoKSA9PiB2b2lkO1xyXG4gIGNvbnRlbnRpZDogbnVtYmVyO1xyXG59XHJcblxyXG5jb25zdCBFZGl0Rm9ybTogUmVhY3QuRkM8RWRpdEZvcm1Qcm9wcz4gPSAoe1xyXG4gIHRleHQsXHJcbiAgaWQsXHJcbiAgdG9nZ2xlRWRpdCxcclxuICBjb250ZW50aWQsXHJcbn0pID0+IHtcclxuICBjb25zdCBbaW5wdXQsIG9uQ2hhbmdlSW5wdXRdID0gdXNlSW5wdXQodGV4dCk7XHJcblxyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuXHJcbiAgY29uc3QgeyBjb21tZW50RWRpdGVkRXJyb3IgfSA9IHVzZVNlbGVjdG9yKFxyXG4gICAgKHN0YXRlOiBSb290U3RhdGUpID0+IHN0YXRlLmNvbW1lbnRcclxuICApO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgaWYgKGNvbW1lbnRFZGl0ZWRFcnJvcikge1xyXG4gICAgICB0b2dnbGVFZGl0KCk7XHJcbiAgICB9XHJcbiAgfSwgW2NvbW1lbnRFZGl0ZWRFcnJvciwgdG9nZ2xlRWRpdF0pO1xyXG5cclxuICBjb25zdCBvblN1Ym1pdCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGlmICghaW5wdXQudHJpbSgpKSB7XHJcbiAgICAgIHJldHVybiBTd2FsLmZpcmUoe1xyXG4gICAgICAgIHRpdGxlOiAn64yT6riA7J2EIOyeheugpe2VmOyEuOyalCcsXHJcbiAgICAgICAgaWNvbjogJ3dhcm5pbmcnLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGRpc3BhdGNoKG1vZGlmeUNvbW1lbnRBc3luYy5yZXF1ZXN0KHsgaWQsIGVkaXRDb21tZW50OiBpbnB1dCwgY29udGVudGlkIH0pKTtcclxuICAgIHRvZ2dsZUVkaXQoKTtcclxuICB9LCBbaW5wdXQsIGlkLCBkaXNwYXRjaCwgdG9nZ2xlRWRpdCwgY29udGVudGlkXSk7XHJcbiAgcmV0dXJuIChcclxuICAgIDxGb3JtV3JhcHBlcj5cclxuICAgICAgPEZvcm0gb25GaW5pc2g9e29uU3VibWl0fT5cclxuICAgICAgICA8VGV4dEFyZWFXcmFwcGVyPlxyXG4gICAgICAgICAgPFRleHRBcmVhXHJcbiAgICAgICAgICAgIHJvd3M9ezN9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXtvbkNoYW5nZUlucHV0fVxyXG4gICAgICAgICAgICB2YWx1ZT17aW5wdXR9XHJcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwi64yT6riA7J2EIOyeheugpe2VmOyEuOyalC5cIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxCdXR0b25XcmFwcGVyPlxyXG4gICAgICAgICAgICA8QnV0dG9uIGh0bWxUeXBlPVwic3VibWl0XCIgdHlwZT1cInByaW1hcnlcIj5cclxuICAgICAgICAgICAgICDsiJjsoJVcclxuICAgICAgICAgICAgPC9CdXR0b24+XHJcbiAgICAgICAgICAgIDxDYW5jZWxCdXR0b24gb25DbGljaz17dG9nZ2xlRWRpdH0+7Leo7IaMPC9DYW5jZWxCdXR0b24+XHJcbiAgICAgICAgICA8L0J1dHRvbldyYXBwZXI+XHJcbiAgICAgICAgPC9UZXh0QXJlYVdyYXBwZXI+XHJcbiAgICAgIDwvRm9ybT5cclxuICAgIDwvRm9ybVdyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEVkaXRGb3JtO1xyXG4iLCJpbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHsgQnV0dG9uIH0gZnJvbSAnYW50ZCc7XHJcblxyXG5leHBvcnQgY29uc3QgQ2FuY2VsQnV0dG9uID0gc3R5bGVkKEJ1dHRvbilgXHJcbiAgYmFja2dyb3VuZC1jb2xvcjogIzk5OTk5OTtcclxuICBib3JkZXI6ICM5OTk5OTk7XHJcbiAgbWFyZ2luLWxlZnQ6IDVweDtcclxuICBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTJhMmEyO1xyXG4gICAgY29sb3I6ICNmZmY7c1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBCdXR0b25XcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICB0ZXh0LWFsaWduOiBlbmQ7XHJcbiAgbWFyZ2luLWJvdHRvbTogMHB4O1xyXG4gIC5hbnQtYnRuLXByaW1hcnkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYWU1OTtcclxuICAgIGJvcmRlcjogIzFhNzNlODtcclxuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZiODZlO1xyXG4gICAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB7XHJcbiAgTmF2YmFyV3JhcHBlcixcclxuICBMb2dvLFxyXG4gIFNlYXJjaCxcclxuICBBY2NvdW50LFxyXG4gIENhdGVnb3J5LFxyXG4gIE1vYmlsZVNlYXJjaCxcclxuICBXcmFwcGVyLFxyXG4gIEhhbWJ1cmdlck1lbnUsXHJcbiAgTG9nb3V0QnV0dG9uLFxyXG59IGZyb20gJy4vc3R5bGUnO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCwgdXNlU2VsZWN0b3IgfSBmcm9tICdyZWFjdC1yZWR1eCc7XHJcbmltcG9ydCB7IFJvb3RTdGF0ZSB9IGZyb20gJy4uLy4uL21vZHVsZXMnO1xyXG5pbXBvcnQgeyBsb2dvdXRBc3luYyB9IGZyb20gJy4uLy4uL21vZHVsZXMvdXNlcic7XHJcbmltcG9ydCBTZWFyY2hGb3JtIGZyb20gJy4uL1NlYXJjaEZvcm0nO1xyXG5pbXBvcnQgeyBNZW51T3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcbmltcG9ydCBIZWFkSXRlbSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0hlYWRlckl0ZW0nO1xyXG5pbXBvcnQgdXNlVG9nZ2xlIGZyb20gJy4uLy4uLy4uL3V0aWxzL3VzZVRvZ2dsZSc7XHJcbmltcG9ydCBJbWFnZSBmcm9tICduZXh0L2ltYWdlJztcclxuXHJcbmNvbnN0IE5hdmJhcjogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgY29uc3QgW3RvZ2dsZSwgdG9nZ2xlSGFuYnVyZ2VyLCBzZXRUb2dnbGVdID0gdXNlVG9nZ2xlKGZhbHNlKTtcclxuICBjb25zdCB7IG1lIH0gPSB1c2VTZWxlY3Rvcigoc3RhdGU6IFJvb3RTdGF0ZSkgPT4gc3RhdGUudXNlcik7XHJcbiAgY29uc3QgZGlzcGF0Y2ggPSB1c2VEaXNwYXRjaCgpO1xyXG4gIGNvbnN0IG9uQ2xpY2tMb2dvdXQgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XHJcbiAgICBkaXNwYXRjaChsb2dvdXRBc3luYy5yZXF1ZXN0KCkpO1xyXG4gICAgc2V0VG9nZ2xlKGZhbHNlKTtcclxuICB9LCBbZGlzcGF0Y2gsIHNldFRvZ2dsZV0pO1xyXG5cclxuICBjb25zdCBjbG9zZUhhbWJ1cmdlciA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFRvZ2dsZShmYWxzZSk7XHJcbiAgfSwgW3NldFRvZ2dsZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPFdyYXBwZXI+XHJcbiAgICAgIDxOYXZiYXJXcmFwcGVyPlxyXG4gICAgICAgIDxMb2dvIG9uQ2xpY2s9e2Nsb3NlSGFtYnVyZ2VyfT5cclxuICAgICAgICAgIDxMaW5rIGhyZWY9XCIvXCI+XHJcbiAgICAgICAgICAgIDxhPlxyXG4gICAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgICAgc3JjPVwiL2xvZ28ucG5nXCJcclxuICAgICAgICAgICAgICAgIHdpZHRoPXsxMzB9XHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezYwfVxyXG4gICAgICAgICAgICAgICAgYWx0PVwi7Ja065SU6rCI656YXCJcclxuICAgICAgICAgICAgICAgIHByaW9yaXR5PXt0cnVlfVxyXG4gICAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICA8L0xvZ28+XHJcblxyXG4gICAgICAgIDxDYXRlZ29yeSB0b2dnbGU9e3RvZ2dsZX0gb25DbGljaz17dG9nZ2xlSGFuYnVyZ2VyfT5cclxuICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi6rSA6rSR7KeAXCIgY29udGVudFR5cGVJZD17MTJ9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuusuO2ZlOyLnOyEpFwiIGNvbnRlbnRUeXBlSWQ9ezE0fSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLstpXsoJxcIiBjb250ZW50VHlwZUlkPXsxNX0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi7L2U7IqkXCIgY29udGVudFR5cGVJZD17MjV9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuugiO2PrOy4oFwiIGNvbnRlbnRUeXBlSWQ9ezI4fSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLsiJnrsJVcIiBjb250ZW50VHlwZUlkPXszMn0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi7Ie87ZWRXCIgY29udGVudFR5cGVJZD17Mzh9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuyLneuLuVwiIGNvbnRlbnRUeXBlSWQ9ezM5fSAvPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L0NhdGVnb3J5PlxyXG5cclxuICAgICAgICA8U2VhcmNoPlxyXG4gICAgICAgICAgPFNlYXJjaEZvcm0gbGFiZWw9XCJwY1wiIC8+XHJcbiAgICAgICAgPC9TZWFyY2g+XHJcblxyXG4gICAgICAgIDxBY2NvdW50IHRvZ2dsZT17dG9nZ2xlfT5cclxuICAgICAgICAgIHttZSA/IChcclxuICAgICAgICAgICAgPD5cclxuICAgICAgICAgICAgICA8TG9nb3V0QnV0dG9uIG9uQ2xpY2s9e29uQ2xpY2tMb2dvdXR9PuuhnOq3uOyVhOybgyA8L0xvZ291dEJ1dHRvbj5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApIDogKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxMaW5rIGhyZWY9XCIvbG9naW5cIj5cclxuICAgICAgICAgICAgICAgIDxhIG9uQ2xpY2s9e2Nsb3NlSGFtYnVyZ2VyfT5cclxuICAgICAgICAgICAgICAgICAgPHNwYW4+66Gc6re47J24PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgIDwvTGluaz5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvQWNjb3VudD5cclxuICAgICAgICA8SGFtYnVyZ2VyTWVudT5cclxuICAgICAgICAgIDxNZW51T3V0bGluZWQgb25DbGljaz17dG9nZ2xlSGFuYnVyZ2VyfSAvPlxyXG4gICAgICAgIDwvSGFtYnVyZ2VyTWVudT5cclxuICAgICAgPC9OYXZiYXJXcmFwcGVyPlxyXG4gICAgICA8TW9iaWxlU2VhcmNoIG9uQ2xpY2s9e2Nsb3NlSGFtYnVyZ2VyfT5cclxuICAgICAgICA8U2VhcmNoRm9ybSBsYWJlbD1cIm1vYmlsZVwiIC8+XHJcbiAgICAgIDwvTW9iaWxlU2VhcmNoPlxyXG4gICAgPC9XcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHBvc2l0aW9uOiBzdGlja3k7XHJcbiAgdG9wOiAwO1xyXG4gIHotaW5kZXg6IDk5OTtcclxuICBoZWlnaHQ6IDgwcHg7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgTmF2YmFyV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBib3JkZXItYm90dG9tOiAzcHggc29saWQgI2VlZWVlZTtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgLy8gcGFkZGluZzogMDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgTW9iaWxlU2VhcmNoID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBub25lO1xyXG4gIGhlaWdodDogNTBweDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICBib3gtc2hhZG93OiAwIDFweCAzcHggMCByZ2IoMCAwIDAgLyAxMiUpO1xyXG4gICAgJiBmb3JtIHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIG1hcmdpbjogMCA1JTtcclxuICAgIH1cclxuXHJcbiAgICAmIGZvcm0gaW5wdXQge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlU30ge1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBMb2dvID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIG1hcmdpbi1sZWZ0OiAzMHB4O1xyXG4gIGZsZXg6IDEuNTtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIGZsZXg6IDE7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgLy8gJiBhIHtcclxuICAgIC8vICAgcGFkZGluZzogMjBweCAwO1xyXG4gICAgLy8gfVxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBDYXRlZ29yeSA9IHN0eWxlZC5kaXY8eyB0b2dnbGU6IGJvb2xlYW4gfT5gXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4OiAzO1xyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gIC8vIHBhZGRpbmc6IDIwcHggMDtcclxuICAmIHVsIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgfVxyXG4gICYgYSB7XHJcbiAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICAgIG1hcmdpbi1sZWZ0OiAxMHB4O1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGRpc3BsYXk6ICR7KHByb3BzKSA9PiAocHJvcHMudG9nZ2xlID8gJ2Jsb2NrJyA6ICdub25lJyl9O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICAmIHVsIHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICB9XHJcbiAgICAmIHVsIGxpIHtcclxuICAgICAgbWFyZ2luLWxlZnQ6IDA7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICYgYSB7XHJcbiAgICAgIHBhZGRpbmc6IDEycHggNXB4O1xyXG4gICAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBTZWFyY2ggPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgZmxleDogMjtcclxuICAvLyBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBBY2NvdW50ID0gc3R5bGVkLmRpdjx7IHRvZ2dsZTogYm9vbGVhbiB9PmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXg6IDE7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcclxuICAmIGEge1xyXG4gICAgZm9udC1zaXplOiAxNXB4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWE3M2U4O1xyXG4gICAgcGFkZGluZzogMTBweCAxMnB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogMjBweDtcclxuICAgIG1hcmdpbi1yaWdodDogMzBweDtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMmI3ZGU5O1xyXG4gICAgfVxyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGRpc3BsYXk6ICR7KHByb3BzKSA9PiAocHJvcHMudG9nZ2xlID8gJ2ZsZXgnIDogJ25vbmUnKX07XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgJiBhIHtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDA7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgY29sb3I6ICMwMDA7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgICAgIHBhZGRpbmc6IDEycHggNXB4O1xyXG4gICAgICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcclxuICAgICAgbWFyZ2luLXJpZ2h0OiAwcHg7XHJcbiAgICAgICY6aG92ZXIge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgSGFtYnVyZ2VyTWVudSA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogbm9uZTtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAyNXB4O1xyXG4gICAgcmlnaHQ6IDIwcHg7XHJcbiAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IExvZ291dEJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXHJcbiAgcGFkZGluZzogNnB4IDEwcHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgIzVmNjM2ODtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZWFlZDtcclxuICBjb2xvcjogIzNjM2Q0MDtcclxuICBtYXJnaW4tcmlnaHQ6IDMwcHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGZvbnQtZmFtaWx5OiAnR293dW4gQmF0YW5nJywgc2VyaWY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIHBhZGRpbmc6IDEycHggNXB4O1xyXG4gICAgZm9udC1mYW1pbHk6IEJNSlVBO1xyXG4gICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAwcHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgICY6aG92ZXIge1xyXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTJlMmUyO1xyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuIiwiaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCB7IElucHV0LCBTZWFyY2hCdXR0b24sIFNlYXJjaFdyYXBwZXIgfSBmcm9tICcuL3N0eWxlJztcclxuaW1wb3J0IHsgU2VhcmNoT3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcbmltcG9ydCB1c2VJbnB1dCBmcm9tICcuLi8uLi8uLi91dGlscy91c2VJbnB1dCc7XHJcblxyXG5pbnRlcmZhY2UgSVNlYXJjaEZvcm0ge1xyXG4gIGxhYmVsOiBzdHJpbmc7XHJcbn1cclxuXHJcbmNvbnN0IFNlYXJjaEZvcm06IFJlYWN0LkZDPElTZWFyY2hGb3JtPiA9ICh7IGxhYmVsIH0pID0+IHtcclxuICBjb25zdCBbc2VhcmNoLCBvbkNoYW5nZVNlYXJjaF0gPSB1c2VJbnB1dCgnJyk7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3Qgb25TZWFyY2ggPSB1c2VDYWxsYmFjayhcclxuICAgIChlOiBSZWFjdC5Gb3JtRXZlbnQpID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICByb3V0ZXIucHVzaChcclxuICAgICAgICB7XHJcbiAgICAgICAgICBwYXRobmFtZTogJy9zZWFyY2gnLFxyXG4gICAgICAgICAgcXVlcnk6IHsgc2VhcmNoOiBzZWFyY2gsIHBhZ2VObzogMSB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYC9zZWFyY2g/c2VhcmNoPSR7c2VhcmNofWBcclxuICAgICAgKTtcclxuICAgIH0sXHJcbiAgICBbcm91dGVyLCBzZWFyY2hdXHJcbiAgKTtcclxuICByZXR1cm4gKFxyXG4gICAgPD5cclxuICAgICAgPGZvcm0gb25TdWJtaXQ9e29uU2VhcmNofT5cclxuICAgICAgICA8U2VhcmNoV3JhcHBlcj5cclxuICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtgJHtsYWJlbH0tc2VhcmNoYH0+PC9sYWJlbD5cclxuICAgICAgICAgIDxJbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgIGlkPXtgJHtsYWJlbH0tc2VhcmNoYH1cclxuICAgICAgICAgICAgdmFsdWU9e3NlYXJjaH1cclxuICAgICAgICAgICAgb25DaGFuZ2U9e29uQ2hhbmdlU2VhcmNofVxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxTZWFyY2hCdXR0b24gdHlwZT1cInN1Ym1pdFwiPlxyXG4gICAgICAgICAgICA8U2VhcmNoT3V0bGluZWQgc3R5bGU9e3sgY29sb3I6ICd3aGl0ZScgfX0gLz5cclxuICAgICAgICAgIDwvU2VhcmNoQnV0dG9uPlxyXG4gICAgICAgIDwvU2VhcmNoV3JhcHBlcj5cclxuICAgICAgPC9mb3JtPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNlYXJjaEZvcm07XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IElucHV0ID0gc3R5bGVkLmlucHV0YFxyXG4gIGJvcmRlci1yYWRpdXM6IDE1cHggMCAwIDE1cHg7XHJcbiAgY29sb3I6ICNmZmY7XHJcbiAgYm9yZGVyOiAycHggc29saWQgIzMzMzMzMztcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzMzMzMzO1xyXG4gIGJvcmRlci1yaWdodDogbm9uZTtcclxuICBwYWRkaW5nOiAxNXB4O1xyXG4gIHdpZHRoOiAyMDBweDtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbiAgb3V0bGluZTogbm9uZTtcclxuICBmb250LXdlaWdodDogYm9sZDtcclxuICBmb250LWZhbWlseTogQk1IQU5OQUFpcjtcclxuICBmb250LXNpemU6IDE4cHg7XHJcbiAgbGV0dGVyLXNwYWNpbmc6IDFweDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZVN9IHtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgU2VhcmNoQnV0dG9uID0gc3R5bGVkLmJ1dHRvbmBcclxuICB3aWR0aDogNDVweDtcclxuICBoZWlnaHQ6IDQ1cHg7XHJcbiAgYmFja2dyb3VuZDogIzMzMzMzMztcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3JkZXItcmFkaXVzOiAwIDE1cHggMTVweCAwO1xyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNlYXJjaFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICYgbGFiZWwge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiAtMTAwMHB4O1xyXG4gICAgbGVmdDogLTEwMDBweDtcclxuICB9XHJcblxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVTfSB7XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQge1xyXG4gIEFkZENvbW1lbnRQYXlsb2FkLFxyXG4gIENvbW1lbnREYXRhLFxyXG4gIExvYWRDb21tZW50UGF5bG9hZCxcclxuICBNb2RpZnlDb21tZW50UGF5bG9hZCxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBjcmVhdGVBc3luY0FjdGlvbiB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5pbXBvcnQgeyBEZWxldGVDb21tZW50UGF5bG9hZCB9IGZyb20gJy4nO1xyXG5leHBvcnQgY29uc3QgQUREX0NPTU1FTlRfUkVRVUVTVCA9ICdBRERfQ09NTUVOVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IEFERF9DT01NRU5UX1NVQ0NFU1MgPSAnQUREX0NPTU1FTlRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVF9GQUlMVVJFID0gJ0FERF9DT01NRU5UX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPQURfQ09NTUVOVF9SRVFVRVNUID0gJ0xPQURfQ09NTUVOVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IExPQURfQ09NTUVOVF9TVUNDRVNTID0gJ0xPQURfQ09NTUVOVF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IExPQURfQ09NTUVOVF9GQUlMVVJFID0gJ0xPQURfQ09NTUVOVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBERUxFVEVfQ09NTUVOVF9SRVFVRVNUID0gJ0RFTEVURV9DT01NRU5UX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgREVMRVRFX0NPTU1FTlRfU1VDQ0VTUyA9ICdERUxFVEVfQ09NTUVOVF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IERFTEVURV9DT01NRU5UX0ZBSUxVUkUgPSAnREVMRVRFX0NPTU1FTlRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCA9ICdNT0RJRllfQ09NTUVOVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IE1PRElGWV9DT01NRU5UX1NVQ0NFU1MgPSAnTU9ESUZZX0NPTU1FTlRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBNT0RJRllfQ09NTUVOVF9GQUlMVVJFID0gJ01PRElGWV9DT01NRU5UX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFkZENvbW1lbnRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIEFERF9DT01NRU5UX1JFUVVFU1QsXHJcbiAgQUREX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBBRERfQ09NTUVOVF9GQUlMVVJFXHJcbik8QWRkQ29tbWVudFBheWxvYWQsIENvbW1lbnREYXRhW10sIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZENvbW1lbnRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIExPQURfQ09NTUVOVF9SRVFVRVNULFxyXG4gIExPQURfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIExPQURfQ09NTUVOVF9GQUlMVVJFXHJcbik8TG9hZENvbW1lbnRQYXlsb2FkLCBDb21tZW50RGF0YVtdLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRlbGV0ZUNvbW1lbnRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIERFTEVURV9DT01NRU5UX1JFUVVFU1QsXHJcbiAgREVMRVRFX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBERUxFVEVfQ09NTUVOVF9GQUlMVVJFXHJcbik8RGVsZXRlQ29tbWVudFBheWxvYWQsIENvbW1lbnREYXRhW10sIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgbW9kaWZ5Q29tbWVudEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCxcclxuICBNT0RJRllfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIE1PRElGWV9DT01NRU5UX0ZBSUxVUkVcclxuKTxNb2RpZnlDb21tZW50UGF5bG9hZCwgQ29tbWVudERhdGFbXSwgQXhpb3NFcnJvcj4oKTtcclxuIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gJy4vcmVkdWNlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHlwZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWdhJztcclxuIiwiaW1wb3J0IHsgQ29tbWVudFN0YXRlIH0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgcHJvZHVjZSB9IGZyb20gJ2ltbWVyJztcclxuaW1wb3J0IHtcclxuICBBRERfQ09NTUVOVF9SRVFVRVNULFxyXG4gIEFERF9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgQUREX0NPTU1FTlRfRkFJTFVSRSxcclxuICBMT0FEX0NPTU1FTlRfUkVRVUVTVCxcclxuICBMT0FEX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBMT0FEX0NPTU1FTlRfRkFJTFVSRSxcclxuICBERUxFVEVfQ09NTUVOVF9SRVFVRVNULFxyXG4gIERFTEVURV9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgREVMRVRFX0NPTU1FTlRfRkFJTFVSRSxcclxuICBNT0RJRllfQ09NTUVOVF9SRVFVRVNULFxyXG4gIE1PRElGWV9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgTU9ESUZZX0NPTU1FTlRfRkFJTFVSRSxcclxufSBmcm9tICcuL2FjdGlvbic7XHJcbmltcG9ydCB7IGNyZWF0ZVJlZHVjZXIgfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuY29uc3QgaW5pdGlhbFN0YXRlOiBDb21tZW50U3RhdGUgPSB7XHJcbiAgY29tbWVudExpc3Q6IFtdLFxyXG4gIGNvbW1lbnRBZGRlZDogZmFsc2UsXHJcbiAgaXNBZGRpbmdDb21tZW50OiBmYWxzZSxcclxuICBjb21tZW50RXJyb3I6ICcnLFxyXG4gIGNvbW1lbnRFZGl0ZWRFcnJvcjogZmFsc2UsXHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJQ29tbWVudFJlZHVjZXJTdGF0ZSA9IHR5cGVvZiBpbml0aWFsU3RhdGU7XHJcblxyXG5jb25zdCBjb21tZW50ID0gY3JlYXRlUmVkdWNlcihpbml0aWFsU3RhdGUsIHtcclxuICBbQUREX0NPTU1FTlRfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0FkZGluZ0NvbW1lbnQgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5jb21tZW50RXJyb3IgPSAnJztcclxuICAgIH0pLFxyXG4gIFtBRERfQ09NTUVOVF9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNBZGRpbmdDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbQUREX0NPTU1FTlRfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzQWRkaW5nQ29tbWVudCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5jb21tZW50RXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtMT0FEX0NPTU1FTlRfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IFtdO1xyXG4gICAgfSksXHJcbiAgW0xPQURfQ09NTUVOVF9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtMT0FEX0NPTU1FTlRfRkFJTFVSRV06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IFtdO1xyXG4gICAgfSksXHJcbiAgW0RFTEVURV9DT01NRU5UX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudEVycm9yID0gJyc7XHJcbiAgICB9KSxcclxuICBbREVMRVRFX0NPTU1FTlRfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbREVMRVRFX0NPTU1FTlRfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW01PRElGWV9DT01NRU5UX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudEVkaXRlZEVycm9yID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTU9ESUZZX0NPTU1FTlRfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFZGl0ZWRFcnJvciA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW01PRElGWV9DT01NRU5UX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudEVkaXRlZEVycm9yID0gdHJ1ZTtcclxuICAgIH0pLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvbW1lbnQ7XHJcbiIsImltcG9ydCB7XHJcbiAgTG9hZENvbW1lbnRQYXlsb2FkLFxyXG4gIExvYWRDb21tZW50UmVzcG9uc2UsXHJcbiAgQWRkQ29tbWVudFBheWxvYWQsXHJcbiAgRGVsZXRlQ29tbWVudFBheWxvYWQsXHJcbiAgTW9kaWZ5Q29tbWVudFBheWxvYWQsXHJcbn0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHtcclxuICBhZGRDb21tZW50QXN5bmMsXHJcbiAgbG9hZENvbW1lbnRBc3luYyxcclxuICBkZWxldGVDb21tZW50QXN5bmMsXHJcbiAgbW9kaWZ5Q29tbWVudEFzeW5jLFxyXG59IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHsgdGFrZUxhdGVzdCwgcHV0LCBjYWxsLCBmb3JrLCBhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5cclxuLy8g64yT6riAIOy2lOqwgFxyXG5mdW5jdGlvbiBhZGRDb21tZW50QVBJKHsgY29udGVudGlkLCBjb21tZW50VGV4dCB9OiBBZGRDb21tZW50UGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5wb3N0KGAvY29tbWVudC8ke2NvbnRlbnRpZH1gLCB7IGNvbnRlbnQ6IGNvbW1lbnRUZXh0IH0pO1xyXG59XHJcbmZ1bmN0aW9uKiBhZGRDb21tZW50U2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIGFkZENvbW1lbnRBc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvYWRDb21tZW50UmVzcG9uc2UgPSB5aWVsZCBjYWxsKFxyXG4gICAgICBhZGRDb21tZW50QVBJLFxyXG4gICAgICBhY3Rpb24ucGF5bG9hZFxyXG4gICAgKTtcclxuICAgIHlpZWxkIHB1dChhZGRDb21tZW50QXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGFkZENvbW1lbnRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoQWRkQ29tbWVudCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGFkZENvbW1lbnRBc3luYy5yZXF1ZXN0LCBhZGRDb21tZW50U2FnYSk7XHJcbn1cclxuXHJcbi8vIOuMk+q4gCDroZzrk5xcclxuZnVuY3Rpb24gbG9hZENvbW1lbnRzQVBJKHsgY29udGVudElkIH06IExvYWRDb21tZW50UGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoYC9jb21tZW50LyR7Y29udGVudElkfWApO1xyXG59XHJcbmZ1bmN0aW9uKiBsb2FkQ29tbWVudHNTYWdhKFxyXG4gIGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgbG9hZENvbW1lbnRBc3luYy5yZXF1ZXN0PlxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2FkQ29tbWVudFJlc3BvbnNlID0geWllbGQgY2FsbChcclxuICAgICAgbG9hZENvbW1lbnRzQVBJLFxyXG4gICAgICBhY3Rpb24ucGF5bG9hZFxyXG4gICAgKTtcclxuICAgIHlpZWxkIHB1dChsb2FkQ29tbWVudEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChsb2FkQ29tbWVudEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hMb2FkQ29tbWVudHMoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChsb2FkQ29tbWVudEFzeW5jLnJlcXVlc3QsIGxvYWRDb21tZW50c1NhZ2EpO1xyXG59XHJcblxyXG4vLyDrjJPquIAg7IKt7KCcXHJcbmZ1bmN0aW9uIGRlbGV0ZUNvbW1lbnRBUEkoeyBpZCwgY29udGVudGlkIH06IERlbGV0ZUNvbW1lbnRQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmRlbGV0ZShgL2NvbW1lbnQvJHtpZH0vJHtjb250ZW50aWR9YCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uKiBkZWxldGVDb21tZW50U2FnYShcclxuICBhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIGRlbGV0ZUNvbW1lbnRBc3luYy5yZXF1ZXN0PlxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2FkQ29tbWVudFJlc3BvbnNlID0geWllbGQgY2FsbChcclxuICAgICAgZGVsZXRlQ29tbWVudEFQSSxcclxuICAgICAgYWN0aW9uLnBheWxvYWRcclxuICAgICk7XHJcbiAgICB5aWVsZCBwdXQoZGVsZXRlQ29tbWVudEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChkZWxldGVDb21tZW50QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hSZW1vdmVDb21tZW50KCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QoZGVsZXRlQ29tbWVudEFzeW5jLnJlcXVlc3QsIGRlbGV0ZUNvbW1lbnRTYWdhKTtcclxufVxyXG5cclxuLy8g64yT6riA7IiY7KCVXHJcbmZ1bmN0aW9uIG1vZGlmeUNvbW1lbnRBUEkoe1xyXG4gIGlkLFxyXG4gIGVkaXRDb21tZW50LFxyXG4gIGNvbnRlbnRpZCxcclxufTogTW9kaWZ5Q29tbWVudFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MucHV0KGAvY29tbWVudC8ke2lkfS8ke2NvbnRlbnRpZH1gLCB7IGNvbnRlbnQ6IGVkaXRDb21tZW50IH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiogbW9kaWZ5Q29tbWVudFNhZ2EoXHJcbiAgYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBtb2RpZnlDb21tZW50QXN5bmMucmVxdWVzdD5cclxuKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9hZENvbW1lbnRSZXNwb25zZSA9IHlpZWxkIGNhbGwoXHJcbiAgICAgIG1vZGlmeUNvbW1lbnRBUEksXHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkXHJcbiAgICApO1xyXG4gICAgeWllbGQgcHV0KG1vZGlmeUNvbW1lbnRBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobW9kaWZ5Q29tbWVudEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoTW9kaWZ5Q29tbWVudCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KG1vZGlmeUNvbW1lbnRBc3luYy5yZXF1ZXN0LCBtb2RpZnlDb21tZW50U2FnYSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiBjb21tZW50U2FnYSgpIHtcclxuICB5aWVsZCBhbGwoW1xyXG4gICAgZm9yayh3YXRjaEFkZENvbW1lbnQpLFxyXG4gICAgZm9yayh3YXRjaExvYWRDb21tZW50cyksXHJcbiAgICBmb3JrKHdhdGNoUmVtb3ZlQ29tbWVudCksXHJcbiAgICBmb3JrKHdhdGNoTW9kaWZ5Q29tbWVudCksXHJcbiAgXSk7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBEZXRhaWxEYXRhLFxyXG4gIFNlYXJjaERhdGEsXHJcbiAgUmVnaW9uRGF0YSxcclxuICBTZWFyY2hQYXlsb2FkLFxyXG4gIERldGFpbFBheWxvYWQsXHJcbiAgUmVnaW9uUGF5bG9hZCxcclxuICBBbGxEYXRhLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUFzeW5jQWN0aW9uIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcblxyXG5leHBvcnQgY29uc3QgUkVHSU9OX1RPVVJfUkVRVUVTVCA9ICdSRUdJT05fVE9VUl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IFJFR0lPTl9UT1VSX1NVQ0NFU1MgPSAnUkVHSU9OX1RPVVJfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBSRUdJT05fVE9VUl9GQUlMVVJFID0gJ1JFR0lPTl9UT1VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNFQVJDSF9UT1VSX1JFUVVFU1QgPSAnU0VBUkNIX1RPVVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBTRUFSQ0hfVE9VUl9TVUNDRVNTID0gJ1NFQVJDSF9UT1VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgU0VBUkNIX1RPVVJfRkFJTFVSRSA9ICdTRUFSQ0hfVE9VUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBERVRBSUxfVE9VUl9SRVFVRVNUID0gJ0RFVEFJTF9UT1VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgREVUQUlMX1RPVVJfU1VDQ0VTUyA9ICdERVRBSUxfVE9VUl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IERFVEFJTF9UT1VSX0ZBSUxVUkUgPSAnREVUQUlMX1RPVVJfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgQUxMX1RPVVJfUkVRVUVTVCA9ICdBTExfVE9VUl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IEFMTF9UT1VSX1NVQ0NFU1MgPSAnQUxMX1RPVVJfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBBTExfVE9VUl9GQUlMVVJFID0gJ0FMTF9UT1VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGFsbEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgQUxMX1RPVVJfUkVRVUVTVCxcclxuICBBTExfVE9VUl9TVUNDRVNTLFxyXG4gIEFMTF9UT1VSX0ZBSUxVUkVcclxuKTx1bmRlZmluZWQsIEFsbERhdGEsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3Qgc2VhcmNoQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBTRUFSQ0hfVE9VUl9SRVFVRVNULFxyXG4gIFNFQVJDSF9UT1VSX1NVQ0NFU1MsXHJcbiAgU0VBUkNIX1RPVVJfRkFJTFVSRVxyXG4pPFNlYXJjaFBheWxvYWQsIFNlYXJjaERhdGEsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgcmVnaW9uQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBSRUdJT05fVE9VUl9SRVFVRVNULFxyXG4gIFJFR0lPTl9UT1VSX1NVQ0NFU1MsXHJcbiAgUkVHSU9OX1RPVVJfRkFJTFVSRVxyXG4pPFJlZ2lvblBheWxvYWQsIFJlZ2lvbkRhdGEsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgZGV0YWlsQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBERVRBSUxfVE9VUl9SRVFVRVNULFxyXG4gIERFVEFJTF9UT1VSX1NVQ0NFU1MsXHJcbiAgREVUQUlMX1RPVVJfRkFJTFVSRVxyXG4pPERldGFpbFBheWxvYWQsIERldGFpbERhdGEsIEF4aW9zRXJyb3I+KCk7XHJcbiIsImV4cG9ydCB7IGRlZmF1bHQgfSBmcm9tICcuL3JlZHVjZXInO1xyXG5leHBvcnQgKiBmcm9tICcuL3R5cGUnO1xyXG5leHBvcnQgKiBmcm9tICcuL2FjdGlvbic7XHJcbmV4cG9ydCAqIGZyb20gJy4vc2FnYSc7XHJcbiIsImltcG9ydCB7IGNyZWF0ZVJlZHVjZXIgfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuaW1wb3J0IHtcclxuICBSRUdJT05fVE9VUl9SRVFVRVNULFxyXG4gIFJFR0lPTl9UT1VSX1NVQ0NFU1MsXHJcbiAgUkVHSU9OX1RPVVJfRkFJTFVSRSxcclxuICBTRUFSQ0hfVE9VUl9SRVFVRVNULFxyXG4gIFNFQVJDSF9UT1VSX1NVQ0NFU1MsXHJcbiAgU0VBUkNIX1RPVVJfRkFJTFVSRSxcclxuICBERVRBSUxfVE9VUl9SRVFVRVNULFxyXG4gIERFVEFJTF9UT1VSX1NVQ0NFU1MsXHJcbiAgREVUQUlMX1RPVVJfRkFJTFVSRSxcclxuICBBTExfVE9VUl9SRVFVRVNULFxyXG4gIEFMTF9UT1VSX1NVQ0NFU1MsXHJcbiAgQUxMX1RPVVJfRkFJTFVSRSxcclxufSBmcm9tICcuL2FjdGlvbic7XHJcbmltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJztcclxuaW1wb3J0IHsgRGV0YWlsQWN0aW9uLCBEZXRhaWxTdGF0ZSB9IGZyb20gJy4vdHlwZSc7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGU6IERldGFpbFN0YXRlID0ge1xyXG4gIHNlYXJjaFJlc3VsdDoge1xyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGl0ZW1zOiAnJyxcclxuICAgICAgbnVtT2ZSb3dzOiAxMCxcclxuICAgICAgcGFnZU5vOiAxLFxyXG4gICAgICB0b3RhbENvdW50OiAwLFxyXG4gICAgICBzZWFyY2g6ICcnLFxyXG4gICAgfSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbiAgZGV0YWlsUmVzdWx0OiB7XHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXRlbXM6IHsgaXRlbTogbnVsbCB9LFxyXG4gICAgICBudW1PZlJvd3M6IDEwLFxyXG4gICAgICBwYWdlTm86IDEsXHJcbiAgICAgIHRvdGFsQ291bnQ6IDEsXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IG51bGwsXHJcbiAgfSxcclxuICBhbGxEYXRhOiB7XHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXRlbXM6IHtcclxuICAgICAgICBpdGVtOiBbXSxcclxuICAgICAgICBmZXN0aXZhbDogW10sXHJcbiAgICAgICAgc2xlZXA6IFtdLFxyXG4gICAgICB9LFxyXG4gICAgICBudW1PZlJvd3M6IDEwLFxyXG4gICAgICBwYWdlTm86IDEsXHJcbiAgICAgIHRvdGFsQ291bnQ6IDEsXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IG51bGwsXHJcbiAgfSxcclxuICByZWdpb25SZXN1bHQ6IHtcclxuICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBpdGVtczogeyBpdGVtOiBbXSB9LFxyXG4gICAgICBudW1PZlJvd3M6IDEwLFxyXG4gICAgICBwYWdlTm86IDEsXHJcbiAgICAgIHRvdGFsQ291bnQ6IDEsXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IG51bGwsXHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIElEZXRhaWxSZWR1Y2VyU3RhdGUgPSB0eXBlb2YgaW5pdGlhbFN0YXRlO1xyXG5cclxuY29uc3QgZGV0YWlsID0gY3JlYXRlUmVkdWNlcjxEZXRhaWxTdGF0ZSwgRGV0YWlsQWN0aW9uPihpbml0aWFsU3RhdGUsIHtcclxuICBbU0VBUkNIX1RPVVJfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLml0ZW1zID0gJyc7XHJcbiAgICB9KSxcclxuICBbU0VBUkNIX1RPVVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLml0ZW1zID0gYWN0aW9uLnBheWxvYWQuaXRlbXM7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLm51bU9mUm93cyA9IGFjdGlvbi5wYXlsb2FkLm51bU9mUm93cztcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEucGFnZU5vID0gYWN0aW9uLnBheWxvYWQucGFnZU5vO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS50b3RhbENvdW50ID0gYWN0aW9uLnBheWxvYWQudG90YWxDb3VudDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEuc2VhcmNoID0gYWN0aW9uLnBheWxvYWQuc2VhcmNoO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW1NFQVJDSF9UT1VSX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEuaXRlbXMgPSAnJztcclxuICAgIH0pLFxyXG4gIFtERVRBSUxfVE9VUl9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmRhdGEuaXRlbXMuaXRlbSA9IG51bGw7XHJcbiAgICB9KSxcclxuICBbREVUQUlMX1RPVVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5kYXRhLml0ZW1zID0gYWN0aW9uLnBheWxvYWQuaXRlbXM7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5kYXRhLnRvdGFsQ291bnQgPSBhY3Rpb24ucGF5bG9hZC50b3RhbENvdW50O1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW0RFVEFJTF9UT1VSX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmRhdGEuaXRlbXMuaXRlbSA9IG51bGw7XHJcbiAgICB9KSxcclxuICBbUkVHSU9OX1RPVVJfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5kYXRhLml0ZW1zLml0ZW0gPSBbXTtcclxuICAgIH0pLFxyXG4gIFtSRUdJT05fVE9VUl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmRhdGEuaXRlbXMgPSBhY3Rpb24ucGF5bG9hZC5pdGVtcztcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmRhdGEudG90YWxDb3VudCA9IGFjdGlvbi5wYXlsb2FkLnRvdGFsQ291bnQ7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbUkVHSU9OX1RPVVJfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5lcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZGF0YS5pdGVtcy5pdGVtID0gW107XHJcbiAgICB9KSxcclxuICBbQUxMX1RPVVJfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLml0ZW0gPSBbXTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLmZlc3RpdmFsID0gW107XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5zbGVlcCA9IFtdO1xyXG4gICAgfSksXHJcbiAgW0FMTF9UT1VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW0FMTF9UT1VSX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuaXRlbSA9IFtdO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuZmVzdGl2YWwgPSBbXTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLnNsZWVwID0gW107XHJcbiAgICB9KSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZXRhaWw7XHJcbiIsImltcG9ydCB7XHJcbiAgU2VhcmNoUmVzcG9uc2UsXHJcbiAgU2VhcmNoUGF5bG9hZCxcclxuICBEZXRhaWxSZXNwb25zZSxcclxuICBEZXRhaWxQYXlsb2FkLFxyXG4gIFJlZ2lvblJlc3BvbnNlLFxyXG4gIFJlZ2lvblBheWxvYWQsXHJcbiAgQWxsUmVzcG9uc2UsXHJcbn0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgc2VhcmNoQXN5bmMsIGRldGFpbEFzeW5jLCByZWdpb25Bc3luYywgYWxsQXN5bmMgfSBmcm9tICcuL2FjdGlvbic7XHJcbmltcG9ydCB7IHRha2VMYXRlc3QsIHB1dCwgY2FsbCwgYWxsLCBmb3JrIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuXHJcbi8vIOuplOyduCDtmZTrqbRcclxuZnVuY3Rpb24gYWxsQVBJKCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoJy9kZXRhaWwvYWxsJyk7XHJcbn1cclxuZnVuY3Rpb24qIGFsbERhdGFTYWdhKCkge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IEFsbFJlc3BvbnNlID0geWllbGQgY2FsbChhbGxBUEkpO1xyXG4gICAgeWllbGQgcHV0KGFsbEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB5aWVsZCBwdXQoYWxsQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaEFsbERhdGEoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChhbGxBc3luYy5yZXF1ZXN0LCBhbGxEYXRhU2FnYSk7XHJcbn1cclxuXHJcbi8vIOqygOyDieq4sOuKpVxyXG5mdW5jdGlvbiBzZWFyY2hBUEkoeyBzZWFyY2gsIHBhZ2VObywgYXJyYW5nZSB9OiBTZWFyY2hQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmdldChgL2RldGFpbC9zZWFyY2hgLCB7XHJcbiAgICBwYXJhbXM6IHtcclxuICAgICAgc2VhcmNoLFxyXG4gICAgICBwYWdlTm8sXHJcbiAgICAgIGFycmFuZ2UsXHJcbiAgICB9LFxyXG4gIH0pO1xyXG59XHJcbmZ1bmN0aW9uKiBzZWFyY2hEZXRhaWxTYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2Ygc2VhcmNoQXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBTZWFyY2hSZXNwb25zZSA9IHlpZWxkIGNhbGwoc2VhcmNoQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQoc2VhcmNoQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIHlpZWxkIHB1dChzZWFyY2hBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoU2VhcmNoRGV0YWlsKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3Qoc2VhcmNoQXN5bmMucmVxdWVzdCwgc2VhcmNoRGV0YWlsU2FnYSk7XHJcbn1cclxuXHJcbi8vIOyngOyXreq4sOuwmCDqsoDsg4lcclxuZnVuY3Rpb24gcmVnaW9uQVBJKHtcclxuICBhcnJhbmdlLFxyXG4gIGFyZWFDb2RlLFxyXG4gIGNvbnRlbnRUeXBlSWQsXHJcbiAgcGFnZU5vLFxyXG4gIG51bU9mUm93cyxcclxufTogUmVnaW9uUGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoJy9kZXRhaWwvcmVnaW9uJywge1xyXG4gICAgcGFyYW1zOiB7XHJcbiAgICAgIGFycmFuZ2UsXHJcbiAgICAgIGFyZWFDb2RlLFxyXG4gICAgICBjb250ZW50VHlwZUlkLFxyXG4gICAgICBwYWdlTm8sXHJcbiAgICAgIG51bU9mUm93cyxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24qIHJlZ2lvbkRldGFpbFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiByZWdpb25Bc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFJlZ2lvblJlc3BvbnNlID0geWllbGQgY2FsbChyZWdpb25BUEksIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIHlpZWxkIHB1dChyZWdpb25Bc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgeWllbGQgcHV0KHJlZ2lvbkFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hSZWdpb25EZXRhaWwoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChyZWdpb25Bc3luYy5yZXF1ZXN0LCByZWdpb25EZXRhaWxTYWdhKTtcclxufVxyXG5cclxuLy8g7IOB7IS4IOygleuztFxyXG5mdW5jdGlvbiBkZXRhaWxBUEkoeyBjb250ZW50SWQsIGNvbnRlbnRUeXBlSWQgfTogRGV0YWlsUGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoYC9kZXRhaWwvJHtjb250ZW50VHlwZUlkfS8ke2NvbnRlbnRJZH1gKTtcclxufVxyXG5mdW5jdGlvbiogZGV0YWlsUmVzdWx0U2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIGRldGFpbEFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogRGV0YWlsUmVzcG9uc2UgPSB5aWVsZCBjYWxsKGRldGFpbEFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KGRldGFpbEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB5aWVsZCBwdXQoZGV0YWlsQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaERldGFpbFJlc3VsdCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGRldGFpbEFzeW5jLnJlcXVlc3QsIGRldGFpbFJlc3VsdFNhZ2EpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogZGV0YWlsU2FnYSgpIHtcclxuICB5aWVsZCBhbGwoW1xyXG4gICAgZm9yayh3YXRjaFNlYXJjaERldGFpbCksXHJcbiAgICBmb3JrKHdhdGNoRGV0YWlsUmVzdWx0KSxcclxuICAgIGZvcmsod2F0Y2hSZWdpb25EZXRhaWwpLFxyXG4gICAgZm9yayh3YXRjaEFsbERhdGEpLFxyXG4gIF0pO1xyXG59XHJcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IEhZRFJBVEUgfSBmcm9tICduZXh0LXJlZHV4LXdyYXBwZXInO1xyXG5pbXBvcnQgeyBBbnlBY3Rpb24sIGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4JztcclxuaW1wb3J0IHsgYWxsLCBjYWxsIH0gZnJvbSAncmVkdXgtc2FnYS9lZmZlY3RzJztcclxuaW1wb3J0IHVzZXIgZnJvbSAnLi91c2VyJztcclxuaW1wb3J0IGRldGFpbCBmcm9tICcuL2RldGFpbCc7XHJcbmltcG9ydCBjb21tZW50IGZyb20gJy4vY29tbWVudCc7XHJcbmltcG9ydCB1c2VyU2FnYSBmcm9tICcuL3VzZXIvc2FnYSc7XHJcbmltcG9ydCBkZXRhaWxTYWdhIGZyb20gJy4vZGV0YWlsL3NhZ2EnO1xyXG5pbXBvcnQgY29tbWVudFNhZ2EgZnJvbSAnLi9jb21tZW50L3NhZ2EnO1xyXG5pbXBvcnQgeyBJVXNlclJlZHVjZXJTdGF0ZSB9IGZyb20gJy4vdXNlci9yZWR1Y2VyJztcclxuaW1wb3J0IHsgSUNvbW1lbnRSZWR1Y2VyU3RhdGUgfSBmcm9tICcuL2NvbW1lbnQvcmVkdWNlcic7XHJcbmltcG9ydCB7IElEZXRhaWxSZWR1Y2VyU3RhdGUgfSBmcm9tICcuL2RldGFpbC9yZWR1Y2VyJztcclxuXHJcbmNvbnN0IGJhY2tVcmwgPVxyXG4gIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuICAgID8gJ2h0dHA6Ly9hcGkud2R5d2cuc2l0ZSdcclxuICAgIDogYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4MWA7XHJcbmF4aW9zLmRlZmF1bHRzLmJhc2VVUkwgPSBgJHtiYWNrVXJsfS9hcGlgO1xyXG5heGlvcy5kZWZhdWx0cy53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJUmVkdWNlclN0YXRlIHtcclxuICB1c2VyOiBJVXNlclJlZHVjZXJTdGF0ZTtcclxuICBjb21tZW50OiBJQ29tbWVudFJlZHVjZXJTdGF0ZTtcclxuICBkZXRhaWw6IElEZXRhaWxSZWR1Y2VyU3RhdGU7XHJcbn1cclxuXHJcbmNvbnN0IHJvb3RSZWR1Y2VyID0gKFxyXG4gIHN0YXRlOiBJUmVkdWNlclN0YXRlIHwgdW5kZWZpbmVkLFxyXG4gIGFjdGlvbjogQW55QWN0aW9uXHJcbik6IElSZWR1Y2VyU3RhdGUgPT4ge1xyXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSFlEUkFURSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc3RhdGUsXHJcbiAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGNvbWJpbmVSZWR1Y2Vycyh7XHJcbiAgICAgIHVzZXIsXHJcbiAgICAgIGRldGFpbCxcclxuICAgICAgY29tbWVudCxcclxuICAgIH0pKHN0YXRlLCBhY3Rpb24pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFJvb3RTdGF0ZSA9IFJldHVyblR5cGU8dHlwZW9mIHJvb3RSZWR1Y2VyPjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJvb3RSZWR1Y2VyO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiByb290U2FnYSgpIHtcclxuICB5aWVsZCBhbGwoW2NhbGwodXNlclNhZ2EpLCBjYWxsKGRldGFpbFNhZ2EpLCBjYWxsKGNvbW1lbnRTYWdhKV0pO1xyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgU2lnbnVwUGF5bG9hZCxcclxuICBTaWdudXBSZXNwb25zZSxcclxuICBMb2dpblJlc3BvbnNlLFxyXG4gIExvZ2luUGF5bG9hZCxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBBeGlvc0Vycm9yIH0gZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBjcmVhdGVBc3luY0FjdGlvbiB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5pbXBvcnQgeyBkZXByZWNhdGVkIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmNvbnN0IHsgY3JlYXRlU3RhbmRhcmRBY3Rpb24gfSA9IGRlcHJlY2F0ZWQ7XHJcblxyXG5leHBvcnQgY29uc3QgU0lHTl9VUF9SRVFVRVNUID0gJ1NJR05fVVBfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBTSUdOX1VQX1NVQ0NFU1MgPSAnU0lHTl9VUF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFNJR05fVVBfRkFJTFVSRSA9ICdTSUdOX1VQX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPR19JTl9SRVFVRVNUID0gJ0xPR19JTl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IExPR19JTl9TVUNDRVNTID0gJ0xPR19JTl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IExPR19JTl9GQUlMVVJFID0gJ0xPR19JTl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0dfT1VUX1JFUVVFU1QgPSAnTE9HX09VVF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IExPR19PVVRfU1VDQ0VTUyA9ICdMT0dfT1VUX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTE9HX09VVF9GQUlMVVJFID0gJ0xPR19PVVRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9BRF9VU0VSX1JFUVVFU1QgPSAnTE9BRF9VU0VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgTE9BRF9VU0VSX1NVQ0NFU1MgPSAnTE9BRF9VU0VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTE9BRF9VU0VSX0ZBSUxVUkUgPSAnTE9BRF9VU0VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNJR05fVVBfUkVTRVQgPSAnU0lHTl9VUF9SRVNFVCc7XHJcblxyXG5leHBvcnQgY29uc3Qgc2lnbnVwQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBTSUdOX1VQX1JFUVVFU1QsXHJcbiAgU0lHTl9VUF9TVUNDRVNTLFxyXG4gIFNJR05fVVBfRkFJTFVSRVxyXG4pPFNpZ251cFBheWxvYWQsIFNpZ251cFJlc3BvbnNlLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ2luQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBMT0dfSU5fUkVRVUVTVCxcclxuICBMT0dfSU5fU1VDQ0VTUyxcclxuICBMT0dfSU5fRkFJTFVSRVxyXG4pPExvZ2luUGF5bG9hZCwgTG9naW5SZXNwb25zZSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2dvdXRBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIExPR19PVVRfUkVRVUVTVCxcclxuICBMT0dfT1VUX1NVQ0NFU1MsXHJcbiAgTE9HX09VVF9GQUlMVVJFXHJcbik8dW5kZWZpbmVkLCB1bmRlZmluZWQsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgbG9hZFVzZXJBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIExPQURfVVNFUl9SRVFVRVNULFxyXG4gIExPQURfVVNFUl9TVUNDRVNTLFxyXG4gIExPQURfVVNFUl9GQUlMVVJFXHJcbik8dW5kZWZpbmVkLCBMb2dpblJlc3BvbnNlLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IHNpZ251cFJlc2V0ID0gY3JlYXRlU3RhbmRhcmRBY3Rpb24oU0lHTl9VUF9SRVNFVCkoKTtcclxuIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gJy4vcmVkdWNlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHlwZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWdhJztcclxuIiwiaW1wb3J0IHsgY3JlYXRlUmVkdWNlciB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5pbXBvcnQgeyBVc2VyU3RhdGUsIFVzZXJBY3Rpb24gfSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgcHJvZHVjZSBmcm9tICdpbW1lcic7XHJcbmltcG9ydCB7XHJcbiAgTE9HX0lOX1JFUVVFU1QsXHJcbiAgTE9HX0lOX1NVQ0NFU1MsXHJcbiAgTE9HX0lOX0ZBSUxVUkUsXHJcbiAgU0lHTl9VUF9SRVFVRVNULFxyXG4gIFNJR05fVVBfU1VDQ0VTUyxcclxuICBTSUdOX1VQX0ZBSUxVUkUsXHJcbiAgU0lHTl9VUF9SRVNFVCxcclxuICBMT0dfT1VUX1JFUVVFU1QsXHJcbiAgTE9HX09VVF9TVUNDRVNTLFxyXG4gIExPR19PVVRfRkFJTFVSRSxcclxuICBMT0FEX1VTRVJfUkVRVUVTVCxcclxuICBMT0FEX1VTRVJfU1VDQ0VTUyxcclxuICBMT0FEX1VTRVJfRkFJTFVSRSxcclxufSBmcm9tICcuL2FjdGlvbic7XHJcblxyXG5leHBvcnQgdHlwZSBJVXNlclJlZHVjZXJTdGF0ZSA9IHR5cGVvZiBpbml0aWFsU3RhdGU7XHJcblxyXG5jb25zdCBpbml0aWFsU3RhdGU6IFVzZXJTdGF0ZSA9IHtcclxuICBpc0xvZ2dpbmdpbjogZmFsc2UsXHJcbiAgaXNMb2dnaW5nb3V0OiBmYWxzZSxcclxuICBsb2dpbkVycm9yOiAnJyxcclxuICBpc1NpZ25lZHVwOiBmYWxzZSxcclxuICBpc1NpZ25pbmd1cDogZmFsc2UsXHJcbiAgc2lnbnVwRXJyb3I6ICcnLFxyXG4gIG1lOiBudWxsLFxyXG59O1xyXG5cclxuY29uc3QgdXNlciA9IGNyZWF0ZVJlZHVjZXI8VXNlclN0YXRlLCBVc2VyQWN0aW9uPihpbml0aWFsU3RhdGUsIHtcclxuICBbU0lHTl9VUF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmluZ3VwID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuaXNTaWduZWR1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5zaWdudXBFcnJvciA9ICcnO1xyXG4gICAgfSksXHJcbiAgW1NJR05fVVBfU1VDQ0VTU106IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25pbmd1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gdHJ1ZTtcclxuICAgIH0pLFxyXG4gIFtTSUdOX1VQX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25pbmd1cCA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LnNpZ251cEVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbU0lHTl9VUF9SRVNFVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTE9HX0lOX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5naW4gPSB0cnVlO1xyXG4gICAgICBkcmFmdC5sb2dpbkVycm9yID0gJyc7XHJcbiAgICAgIGRyYWZ0Lm1lID0gbnVsbDtcclxuICAgIH0pLFxyXG4gIFtMT0dfSU5fU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ2luID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0Lm1lID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9HX0lOX0ZBSUxVUkVdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdpbiA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5tZSA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmxvZ2luRXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtMT0dfT1VUX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5nb3V0ID0gdHJ1ZTtcclxuICAgIH0pLFxyXG4gIFtMT0dfT1VUX1NVQ0NFU1NdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQubWUgPSBudWxsO1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdvdXQgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtMT0dfT1VUX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5nb3V0ID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTE9BRF9VU0VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgLy9cclxuICAgIH0pLFxyXG4gIFtMT0FEX1VTRVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0Lm1lID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTE9BRF9VU0VSX0ZBSUxVUkVdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgLy9cclxuICAgIH0pLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZXI7XHJcbiIsImltcG9ydCB7IFNpZ251cFJlc3VsdCwgTG9naW5SZXN1bHQsIFNpZ251cFBheWxvYWQsIExvZ2luUGF5bG9hZCB9IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IHNpZ251cEFzeW5jLCBsb2dpbkFzeW5jLCBsb2dvdXRBc3luYywgbG9hZFVzZXJBc3luYyB9IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHsgcHV0LCB0YWtlTGF0ZXN0LCBjYWxsLCBhbGwsIGZvcmsgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuLy/tmozsm5DqsIDsnoVcclxuZnVuY3Rpb24gc2lnbnVwQVBJKHNpZ251cERhdGE6IFNpZ251cFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MucG9zdCgnL3VzZXIvc2lnbnVwJywgc2lnbnVwRGF0YSk7XHJcbn1cclxuZnVuY3Rpb24qIHNpZ251cFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBzaWdudXBBc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFNpZ251cFJlc3VsdCA9IHlpZWxkIGNhbGwoc2lnbnVwQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQoc2lnbnVwQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KHNpZ251cEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hTaWdudXAoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChzaWdudXBBc3luYy5yZXF1ZXN0LCBzaWdudXBTYWdhKTtcclxufVxyXG5cclxuLy8g66Gc6re47J24XHJcbmZ1bmN0aW9uIGxvZ2luQVBJKGxvZ2luRGF0YTogTG9naW5QYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLnBvc3QoJy91c2VyL2xvZ2luJywgbG9naW5EYXRhKTtcclxufVxyXG5mdW5jdGlvbiogbG9naW5TYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgbG9naW5Bc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvZ2luUmVzdWx0ID0geWllbGQgY2FsbChsb2dpbkFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KGxvZ2luQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGxvZ2luQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaExvZ2luKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobG9naW5Bc3luYy5yZXF1ZXN0LCBsb2dpblNhZ2EpO1xyXG59XHJcblxyXG4vLyDroZzqt7jslYTsm4NcclxuZnVuY3Rpb24gbG9nb3V0QVBJKCkge1xyXG4gIGF4aW9zLnBvc3QoJy91c2VyL2xvZ291dCcsIHt9KTtcclxufVxyXG5mdW5jdGlvbiogbG9nb3V0U2FnYSgpIHtcclxuICB0cnkge1xyXG4gICAgeWllbGQgY2FsbChsb2dvdXRBUEkpO1xyXG4gICAgeWllbGQgcHV0KGxvZ291dEFzeW5jLnN1Y2Nlc3MoKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobG9nb3V0QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaExvZ291dCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGxvZ291dEFzeW5jLnJlcXVlc3QsIGxvZ291dFNhZ2EpO1xyXG59XHJcblxyXG4vLyDroZzqt7jsnbgg7Jyg7KeAXHJcbmZ1bmN0aW9uIGxvYWRVc2VyQVBJKCkge1xyXG4gIHJldHVybiBheGlvcy5nZXQoYC91c2VyL2ApO1xyXG59XHJcbmZ1bmN0aW9uKiBsb2FkVXNlclNhZ2EoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9naW5SZXN1bHQgPSB5aWVsZCBjYWxsKGxvYWRVc2VyQVBJKTtcclxuICAgIHlpZWxkIHB1dChsb2FkVXNlckFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChsb2FkVXNlckFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hMb2FkVXNlcigpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGxvYWRVc2VyQXN5bmMucmVxdWVzdCwgbG9hZFVzZXJTYWdhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIHVzZXJTYWdhKCkge1xyXG4gIHlpZWxkIGFsbChbXHJcbiAgICBmb3JrKHdhdGNoU2lnbnVwKSxcclxuICAgIGZvcmsod2F0Y2hMb2dpbiksXHJcbiAgICBmb3JrKHdhdGNoTG9nb3V0KSxcclxuICAgIGZvcmsod2F0Y2hMb2FkVXNlciksXHJcbiAgXSk7XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBBcHBQcm9wcyB9IGZyb20gJ25leHQvYXBwJztcclxuaW1wb3J0IHJlZHVjZXIsIHsgcm9vdFNhZ2EgfSBmcm9tICcuLi9tb2R1bGVzJztcclxuaW1wb3J0IHsgY3JlYXRlV3JhcHBlciB9IGZyb20gJ25leHQtcmVkdXgtd3JhcHBlcic7XHJcbmltcG9ydCB3aXRoUmVkdXhTYWdhIGZyb20gJ25leHQtcmVkdXgtc2FnYSc7XHJcbmltcG9ydCBjcmVhdGVTYWdhTWlkZGxld2FyZSwgeyBUYXNrIH0gZnJvbSAncmVkdXgtc2FnYSc7XHJcbmltcG9ydCB7IGFwcGx5TWlkZGxld2FyZSwgY29tcG9zZSwgY3JlYXRlU3RvcmUsIFN0b3JlIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBjb21wb3NlV2l0aERldlRvb2xzIH0gZnJvbSAncmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4uLy4uL3N0eWxlcy90aGVtZSc7XHJcbmltcG9ydCBHbG9iYWxTdHlsZSBmcm9tICcuLi8uLi9zdHlsZXMvR2xvYmFsU3R5bGUnO1xyXG5pbXBvcnQgTGF5b3V0IGZyb20gJy4uL2NvbXBvbmVudHMvTGF5b3V0JztcclxuaW1wb3J0IHsgSGVsbWV0IH0gZnJvbSAncmVhY3QtaGVsbWV0JztcclxuaW1wb3J0IEhlYWQgZnJvbSAnbmV4dC9oZWFkJztcclxuaW1wb3J0ICdhbnRkL2Rpc3QvYW50ZC5jc3MnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTYWdhU3RvcmUgZXh0ZW5kcyBTdG9yZSB7XHJcbiAgc2FnYVRhc2s6IFRhc2s7XHJcbn1cclxuXHJcbmNvbnN0IFRvdXIgPSAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8VGhlbWVQcm92aWRlciB0aGVtZT17dGhlbWV9PlxyXG4gICAgICAgIDxIZWFkPlxyXG4gICAgICAgICAgPG1ldGEgY2hhclNldD1cIlVURi04XCIgLz5cclxuICAgICAgICAgIDx0aXRsZT7slrTrlJTqsIjrnpg8L3RpdGxlPlxyXG4gICAgICAgICAgPG1ldGEgbmFtZT1cImRlc2NyaXB0aW9uXCIgY29udGVudD1cIuuMgO2VnOuvvOq1rSDqtIDqtJHsp4Ag7IaM6rCcXCIgLz5cclxuICAgICAgICAgIDxtZXRhXHJcbiAgICAgICAgICAgIG5hbWU9XCJ2aWV3cG9ydFwiXHJcbiAgICAgICAgICAgIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsaW5pdGlhbC1zY2FsZT0xLjAsbWluaW11bS1zY2FsZT0xLjAsbWF4aW11bS1zY2FsZT01LjAsdXNlci1zY2FsYWJsZT15ZXMsdmlld3BvcnQtZml0PWNvdmVyXCJcclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIuyWtOuUlOqwiOuemFwiIC8+XHJcbiAgICAgICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOmRlc2NyaXB0aW9uXCIgY29udGVudD1cIuuMgO2VnOuvvOq1rSDqtIDqtJHsp4Ag7IaM6rCcXCIgLz5cclxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dHlwZVwiIGNvbnRlbnQ9XCJ3ZWJzaXRlXCIgLz5cclxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cDovL3dkeXdnLnNpdGUvb2cucG5nXCIgLz5cclxuICAgICAgICAgIDxsaW5rIHJlbD1cInNob3J0Y3V0IGljb25cIiAvPlxyXG4gICAgICAgIDwvSGVhZD5cclxuICAgICAgICA8R2xvYmFsU3R5bGUgLz5cclxuICAgICAgICA8TGF5b3V0PlxyXG4gICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgIDwvTGF5b3V0PlxyXG4gICAgICA8L1RoZW1lUHJvdmlkZXI+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuY29uc3QgY29uZmlndXJlU3RvcmUgPSAoKSA9PiB7XHJcbiAgY29uc3Qgc2FnYU1pZGRsZXdhcmUgPSBjcmVhdGVTYWdhTWlkZGxld2FyZSgpO1xyXG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW3NhZ2FNaWRkbGV3YXJlXTtcclxuICBjb25zdCBlbmhhbmNlciA9XHJcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXHJcbiAgICAgID8gY29tcG9zZShhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpKVxyXG4gICAgICA6IGNvbXBvc2UoY29tcG9zZVdpdGhEZXZUb29scyhhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpKSk7XHJcbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBlbmhhbmNlcik7XHJcbiAgKHN0b3JlIGFzIFNhZ2FTdG9yZSkuc2FnYVRhc2sgPSBzYWdhTWlkZGxld2FyZS5ydW4ocm9vdFNhZ2EpO1xyXG4gIHJldHVybiBzdG9yZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCB3cmFwcGVyID0gY3JlYXRlV3JhcHBlcihjb25maWd1cmVTdG9yZSk7XHJcbmV4cG9ydCBkZWZhdWx0IHdyYXBwZXIud2l0aFJlZHV4KHdpdGhSZWR1eFNhZ2EoVG91cikpO1xyXG4iLCJpbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IGNvbm5lY3QsIHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IERldGFpbEl0ZW0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9EZXRhaWxJdGVtJztcclxuaW1wb3J0IHsgSVJlZHVjZXJTdGF0ZSwgUm9vdFN0YXRlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcyc7XHJcbmltcG9ydCB7IGRldGFpbEFzeW5jIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy9kZXRhaWwnO1xyXG5pbXBvcnQgQ29tbWVudEZvcm0gZnJvbSAnLi4vLi4vY29udGFpbmVycy9Db21tZW50Rm9ybSc7XHJcbmltcG9ydCB7IGxvYWRDb21tZW50QXN5bmMgfSBmcm9tICcuLi8uLi9tb2R1bGVzL2NvbW1lbnQnO1xyXG5pbXBvcnQgQ29tbWVudExpc3QgZnJvbSAnLi4vLi4vY29tcG9uZW50cy9Db21tZW50TGlzdCc7XHJcbmltcG9ydCB7IFNhZ2FTdG9yZSwgd3JhcHBlciB9IGZyb20gJy4uL19hcHAnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQgeyBsb2FkVXNlckFzeW5jIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy91c2VyJztcclxuaW1wb3J0IHsgRU5EIH0gZnJvbSAncmVkdXgtc2FnYSc7XHJcbmltcG9ydCB7IE5leHRQYWdlIH0gZnJvbSAnbmV4dCc7XHJcbmltcG9ydCBEZXRhaWxTa2VsZXRvbiBmcm9tICcuLi8uLi9jb21wb25lbnRzL0RldGFpbFNrZWxldG9uJztcclxuaW1wb3J0IHsgRHRhaWxXcmFwcGVyIH0gZnJvbSAnLi4vLi4vLi4vc3R5bGVzL2NvbW1vbic7XHJcblxyXG5jb25zdCBEZXRhaWw6IE5leHRQYWdlPElSZWR1Y2VyU3RhdGU+ID0gKHsgZGV0YWlsIH0pID0+IHtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gIGNvbnN0IHsgaXRlbSB9ID0gZGV0YWlsLmRldGFpbFJlc3VsdC5kYXRhLml0ZW1zO1xyXG4gIGNvbnN0IHsgY29tbWVudExpc3QgfSA9IHVzZVNlbGVjdG9yKChzdGF0ZTogUm9vdFN0YXRlKSA9PiBzdGF0ZS5jb21tZW50KTtcclxuICBjb25zdCBjb250ZW50SWQgPSByb3V0ZXIucXVlcnkuaWQgJiYgcm91dGVyLnF1ZXJ5LmlkWzFdO1xyXG4gIGNvbnN0IGNvbnRlbnRUeXBlSWQgPSByb3V0ZXIucXVlcnkuaWQgJiYgcm91dGVyLnF1ZXJ5LmlkWzBdO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2goXHJcbiAgICAgIGRldGFpbEFzeW5jLnJlcXVlc3Qoe1xyXG4gICAgICAgIGNvbnRlbnRUeXBlSWQ6IE51bWJlcihjb250ZW50VHlwZUlkKSxcclxuICAgICAgICBjb250ZW50SWQ6IE51bWJlcihjb250ZW50SWQpLFxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICB9LCBbY29udGVudElkLCBjb250ZW50VHlwZUlkLCBkaXNwYXRjaF0pO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2gobG9hZENvbW1lbnRBc3luYy5yZXF1ZXN0KHsgY29udGVudElkOiBOdW1iZXIoY29udGVudElkKSB9KSk7XHJcbiAgfSwgW2NvbnRlbnRJZCwgZGlzcGF0Y2hdKTtcclxuICByZXR1cm4gKFxyXG4gICAgPER0YWlsV3JhcHBlcj5cclxuICAgICAge2l0ZW0gPyA8RGV0YWlsSXRlbSBpdGVtPXtpdGVtfSAvPiA6IDxEZXRhaWxTa2VsZXRvbiAvPn1cclxuICAgICAgezxDb21tZW50TGlzdCBkYXRhPXtjb21tZW50TGlzdH0gLz59XHJcbiAgICAgIHtpdGVtICYmIDxDb21tZW50Rm9ybSBpdGVtPXtpdGVtfSAvPn1cclxuICAgIDwvRHRhaWxXcmFwcGVyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0U2VydmVyU2lkZVByb3BzID0gd3JhcHBlci5nZXRTZXJ2ZXJTaWRlUHJvcHMoXHJcbiAgKHN0b3JlKSA9PlxyXG4gICAgYXN5bmMgKHsgcmVxIH0pID0+IHtcclxuICAgICAgY29uc3QgY29va2llID0gcmVxID8gcmVxLmhlYWRlcnMuY29va2llIDogJyc7XHJcbiAgICAgIGlmIChheGlvcy5kZWZhdWx0cy5oZWFkZXJzKSB7XHJcbiAgICAgICAgcmVxICYmIGNvb2tpZVxyXG4gICAgICAgICAgPyAoYXhpb3MuZGVmYXVsdHMuaGVhZGVycy5Db29raWUgPSBjb29raWUpXHJcbiAgICAgICAgICA6IChheGlvcy5kZWZhdWx0cy5oZWFkZXJzLkNvb2tpZSA9ICcnKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgc3RvcmUuZGlzcGF0Y2gobG9hZFVzZXJBc3luYy5yZXF1ZXN0KCkpO1xyXG5cclxuICAgICAgc3RvcmUuZGlzcGF0Y2goRU5EKTtcclxuICAgICAgYXdhaXQgKHN0b3JlIGFzIFNhZ2FTdG9yZSkuc2FnYVRhc2sudG9Qcm9taXNlKCk7XHJcbiAgICAgIHJldHVybiB7IHByb3BzOiB7fSB9O1xyXG4gICAgfVxyXG4pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdCgoc3RhdGU6IElSZWR1Y2VyU3RhdGUpID0+IHN0YXRlKShEZXRhaWwpO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVHbG9iYWxTdHlsZSB9IGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcclxuaW1wb3J0IHJlc2V0IGZyb20gJ3N0eWxlZC1yZXNldCc7XHJcblxyXG5jb25zdCBHbG9iYWxTdHlsZSA9IGNyZWF0ZUdsb2JhbFN0eWxlYFxyXG4gICR7cmVzZXR9XHJcbiAgQGZvbnQtZmFjZSB7XHJcbiAgICBmb250LWRpc3BsYXk6IHN3YXA7XHJcbiAgICBmb250LWZhbWlseTogXCJCTWV1bGppcm9cIjtcclxuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUVVTEpJUk8ud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNSlVBXCI7XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgc3JjOiB1cmwoXCIvZm9udHMvQk1KVUEud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNSEFOTkFcIjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUhBTk5BXzExeXJzLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcclxuICB9XHJcbiAgQGZvbnQtZmFjZSB7XHJcbiAgICBmb250LWRpc3BsYXk6IHN3YXA7XHJcbiAgICBmb250LWZhbWlseTogXCJCTUhBTk5BQWlyXCI7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUhBTk5BQWlyLndvZmZcIikgZm9ybWF0KFwid29mZlwiKTtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHbG9iYWxTdHlsZTtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IFBhZ2luYXRpb24gfSBmcm9tICdhbnRkJztcclxuXHJcbmV4cG9ydCBjb25zdCBCYXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiA5NDBweDtcclxuICBoZWlnaHQ6IDMwcHg7XHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y4OWQzZDtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBMaSA9IHN0eWxlZC5saWBcclxuICBtYXJnaW4tbGVmdDogNXB4O1xyXG4gIHdpZHRoOiA0NXB4O1xyXG4gIGhlaWdodDogNDBweDtcclxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYmFja2dyb3VuZDogI2UyZTJlMjtcclxuICAmLmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kOiAjNmI2OTY5O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICB9XHJcbiAgJjpob3ZlciB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcbmA7XHJcbmV4cG9ydCBjb25zdCBVbCA9IHN0eWxlZC51bGBcclxuICBtYXJnaW4tYm90dG9tOiAzMHB4O1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC13cmFwOiB3cmFwO1xyXG4gIHdpZHRoOiAxMDAlO1xyXG5gO1xyXG5cclxuLy8g7Yis7Ja0IO2OmOydtOyngFxyXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgd2lkdGg6IDk4MHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNlbGVjdCA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICB3aWR0aDogOTEwcHg7XHJcbiAgaGVpZ2h0OiA0MnB4O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDQ4MHB4O1xyXG4gICAgaGVpZ2h0OiA4NHB4O1xyXG5cclxuICAgICYgdWwge1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIH1cclxuICAgICYgbGkge1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZUx9IHtcclxuICAgIHdpZHRoOiAzMDBweDtcclxuICAgIGhlaWdodDogMTI2cHg7XHJcbiAgICAmIGxpIHtcclxuICAgICAgbWFyZ2luOiAwIDRweCA1cHg7XHJcbiAgICAgIGhlaWdodDogMzVweDtcclxuICAgICAgd2lkdGg6IDQwcHg7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRpdGxlID0gc3R5bGVkLmgyYFxyXG4gIGZvbnQtc2l6ZTogNDBweDtcclxuICBmb250LXdlaWdodDogNzAwO1xyXG4gIHBhcmdpbjogNTBweCAwO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBmb250LWZhbWlseTogQk1KVUE7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgTnVsbFBhZ2UgPSBzdHlsZWQuZGl2YFxyXG4gIGhlaWdodDogMTAwdmg7XHJcbmA7XHJcblxyXG4vLyDqs7XthrVcclxuZXhwb3J0IGNvbnN0IFNvcnRXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICB0ZXh0LWFsaWduOiBlbmQ7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgbWFyZ2luOiAzMHB4IDUwcHggMTBweCAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgbWFyZ2luOiAzMHB4IDBweCAxMHB4IDA7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgfVxyXG5gO1xyXG5leHBvcnQgY29uc3QgU29ydEJ1dHRvbiA9IHN0eWxlZC5idXR0b25gXHJcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICBib3JkZXI6IG5vbmU7XHJcbiAgcGFkZGluZzogN3B4IDEwcHg7XHJcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIGJhY2tncm91bmQ6IG5vbmU7XHJcbiAgJjpob3ZlciB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICB9XHJcbiAgJi5hY3RpdmUge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBiYWNrZ3JvdW5kOiAjZTJlMmUyO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBQYWdpbmF0aW9uQ3VzdG9tID0gc3R5bGVkKFBhZ2luYXRpb24pYFxyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBtYXJnaW46IDcwcHggMDtcclxuYDtcclxuXHJcbi8vIOuplOyduCDtmZTrqbRcclxuZXhwb3J0IGNvbnN0IFRpdGxlV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgbWFyZ2luOiA1MHB4IDA7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBtYXJnaW46IDExMHB4IDAgNTBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgSG90TWVudSA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgaGVpZ2h0OiA2MHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDMwcHggMzBweCAwIDA7XHJcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xyXG4gIG1hcmdpbjogMTAwcHggNTBweCAyMHB4IDUwcHg7XHJcblxyXG4gICYgYSB7XHJcbiAgICBjb2xvcjogIzAwMDtcclxuICAgICYgc3BhbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgICAgZm9udC1mYW1pbHk6IEJNSlVBLCBzYW5zLXNlcmlmO1xyXG4gICAgfVxyXG4gICAgJiBzcGFuOmxhc3QtY2hpbGQge1xyXG4gICAgICBmb250LXNpemU6IDE3cHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gID4gc3BhbjpmaXJzdC1jaGlsZCB7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBmb250LWZhbWlseTogQk1IQU5OQSwgc2Fucy1zZXJpZjtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlTH0ge1xyXG4gICAgICBmb250LXNpemU6IDM1cHg7XHJcbiAgICB9XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZUx9IHtcclxuICAgIG1hcmdpbjogMTAwcHggMzBweCAyMHB4IDMwcHg7XHJcbiAgfVxyXG5gO1xyXG5cclxuLy8g7IOB7IS4IO2OmOydtOyngFxyXG5cclxuZXhwb3J0IGNvbnN0IER0YWlsV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDk4MHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG5gO1xyXG4iLCJleHBvcnQgY29uc3Qgc2l6ZSA9IHtcclxuICAgIHBjOiAnMTMwMHB4JyxcclxuICAgIGxhcHRvcDogJzEwMjRweCcsXHJcbiAgICB0YWJsZXQ6ICc3NjhweCcsXHJcbiAgICBtb2JpbGVMOiAnNTAwcHgnLFxyXG4gICAgbW9iaWxlTTogJzQyNXB4JyxcclxuICAgIG1vYmlsZVM6ICczNzVweCcsXHJcbn07XHJcblxyXG5jb25zdCB0aGVtZSA9IHtcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICAgIHBjOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLnBjfSlgLFxyXG4gICAgICAgIGxhcHRvcDogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5sYXB0b3B9KWAsXHJcbiAgICAgICAgdGFibGV0OiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLnRhYmxldH0pYCxcclxuICAgICAgICBtb2JpbGVMOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLm1vYmlsZUx9KWAsXHJcbiAgICAgICAgbW9iaWxlTTogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5tb2JpbGVNfSlgLFxyXG4gICAgICAgIG1vYmlsZVM6IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUubW9iaWxlU30pYCxcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aGVtZTtcclxuIiwiaW1wb3J0IHtcclxuICB1c2VDYWxsYmFjayxcclxuICB1c2VTdGF0ZSxcclxuICBDaGFuZ2VFdmVudCxcclxuICBEaXNwYXRjaCxcclxuICBTZXRTdGF0ZUFjdGlvbixcclxufSBmcm9tICdyZWFjdCc7XHJcblxyXG50eXBlIHVzZUlucHV0SG9vazxUPiA9IFtcclxuICBULFxyXG4gIChlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudD4pID0+IHZvaWQsXHJcbiAgRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VD4+XHJcbl07XHJcblxyXG5mdW5jdGlvbiB1c2VJbnB1dDxUPihpbml0aWFsVmFsdWU6IFQpOiB1c2VJbnB1dEhvb2s8VD4ge1xyXG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGU8dHlwZW9mIGluaXRpYWxWYWx1ZT4oaW5pdGlhbFZhbHVlKTtcclxuICBjb25zdCBvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XHJcbiAgICBzZXRWYWx1ZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiBbdmFsdWUsIG9uQ2hhbmdlLCBzZXRWYWx1ZV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZUlucHV0O1xyXG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgdXNlVG9nZ2xlSG9vayA9IFtib29sZWFuLCAoKSA9PiB2b2lkLCBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj5dO1xyXG5cclxuZnVuY3Rpb24gdXNlVG9nZ2xlKGluaXRpYWxWYWx1ZTogYm9vbGVhbik6IHVzZVRvZ2dsZUhvb2sge1xyXG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGU8dHlwZW9mIGluaXRpYWxWYWx1ZT4oaW5pdGlhbFZhbHVlKTtcclxuICBjb25zdCBvblRvZ2dsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFZhbHVlKCh2YWx1ZSkgPT4gIXZhbHVlKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIFt2YWx1ZSwgb25Ub2dnbGUsIHNldFZhbHVlXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlVG9nZ2xlO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvaW1hZ2UnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2xpZW50L2xpbmsnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYW50ZFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJheGlvc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJpbW1lclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0LXJlZHV4LXNhZ2FcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1yZWR1eC13cmFwcGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zZXJ2ZXIvZGVub3JtYWxpemUtcGFnZS1wYXRoLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zZXJ2ZXIvaW1hZ2UtY29uZmlnLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL2hlYWQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvaTE4bi9ub3JtYWxpemUtbG9jYWxlLXBhdGguanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvbWl0dC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXItY29udGV4dC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZS5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvaXMtZHluYW1pYy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9xdWVyeXN0cmluZy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtbWF0Y2hlci5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXguanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdG8tYmFzZS02NC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2hlYWRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9yb3V0ZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3RcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtaXNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QtcmVkdXhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LXNhZ2EvZWZmZWN0c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtY29tcG9uZW50c1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzdHlsZWQtcmVzZXRcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3dlZXRhbGVydDJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidHlwZXNhZmUtYWN0aW9uc1wiKTsiLCIvKiAoaWdub3JlZCkgKi8iXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0IiwiSW1hZ2UxIiwiX3JlYWN0IiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfaGVhZCIsIl90b0Jhc2U2NCIsIl9pbWFnZUNvbmZpZyIsIl91c2VJbnRlcnNlY3Rpb24iLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJfX2VzTW9kdWxlIiwiX29iamVjdFNwcmVhZCIsInRhcmdldCIsImkiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJzb3VyY2UiLCJvd25LZXlzIiwia2V5cyIsImdldE93blByb3BlcnR5U3ltYm9scyIsImNvbmNhdCIsImZpbHRlciIsInN5bSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImZvckVhY2giLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMiLCJleGNsdWRlZCIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllc0xvb3NlIiwic291cmNlU3ltYm9sS2V5cyIsImluZGV4T2YiLCJwcm90b3R5cGUiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImNhbGwiLCJzb3VyY2VLZXlzIiwibG9hZGVkSW1hZ2VVUkxzIiwiU2V0IiwiZ2xvYmFsIiwiX19ORVhUX0lNQUdFX0lNUE9SVEVEIiwiVkFMSURfTE9BRElOR19WQUxVRVMiLCJ1bmRlZmluZWQiLCJsb2FkZXJzIiwiTWFwIiwiZGVmYXVsdExvYWRlciIsImltZ2l4TG9hZGVyIiwiY2xvdWRpbmFyeUxvYWRlciIsImFrYW1haUxvYWRlciIsImN1c3RvbUxvYWRlciIsIlZBTElEX0xBWU9VVF9WQUxVRVMiLCJpc1N0YXRpY1JlcXVpcmUiLCJzcmMiLCJpc1N0YXRpY0ltYWdlRGF0YSIsImlzU3RhdGljSW1wb3J0IiwiZGV2aWNlU2l6ZXMiLCJjb25maWdEZXZpY2VTaXplcyIsImltYWdlU2l6ZXMiLCJjb25maWdJbWFnZVNpemVzIiwibG9hZGVyIiwiY29uZmlnTG9hZGVyIiwicGF0aCIsImNvbmZpZ1BhdGgiLCJkb21haW5zIiwiY29uZmlnRG9tYWlucyIsInByb2Nlc3MiLCJlbnYiLCJfX05FWFRfSU1BR0VfT1BUUyIsImltYWdlQ29uZmlnRGVmYXVsdCIsImFsbFNpemVzIiwic29ydCIsImEiLCJiIiwiZ2V0V2lkdGhzIiwid2lkdGgiLCJsYXlvdXQiLCJzaXplcyIsInZpZXdwb3J0V2lkdGhSZSIsInBlcmNlbnRTaXplcyIsIm1hdGNoIiwiZXhlYyIsInB1c2giLCJwYXJzZUludCIsInNtYWxsZXN0UmF0aW8iLCJNYXRoIiwibWluIiwid2lkdGhzIiwicyIsImtpbmQiLCJtYXAiLCJ3IiwiZmluZCIsInAiLCJnZW5lcmF0ZUltZ0F0dHJzIiwidW5vcHRpbWl6ZWQiLCJxdWFsaXR5Iiwic3JjU2V0IiwibGFzdCIsImpvaW4iLCJnZXRJbnQiLCJ4IiwiZGVmYXVsdEltYWdlTG9hZGVyIiwibG9hZGVyUHJvcHMiLCJsb2FkIiwiZ2V0Iiwicm9vdCIsIkVycm9yIiwiVkFMSURfTE9BREVSUyIsImhhbmRsZUxvYWRpbmciLCJpbWciLCJwbGFjZWhvbGRlciIsIm9uTG9hZGluZ0NvbXBsZXRlIiwiaGFuZGxlTG9hZCIsInN0YXJ0c1dpdGgiLCJkZWNvZGUiLCJQcm9taXNlIiwicmVzb2x2ZSIsImNhdGNoIiwidGhlbiIsInN0eWxlIiwiYmFja2dyb3VuZFNpemUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJhZGQiLCJuYXR1cmFsV2lkdGgiLCJuYXR1cmFsSGVpZ2h0IiwicmVmIiwicGFyZW50RWxlbWVudCIsInBhcmVudCIsImdldENvbXB1dGVkU3R5bGUiLCJkaXNwbGF5IiwiY29uc29sZSIsIndhcm4iLCJwb3NpdGlvbiIsImNvbXBsZXRlIiwib25sb2FkIiwiX3BhcmFtIiwicHJpb3JpdHkiLCJsb2FkaW5nIiwibGF6eUJvdW5kYXJ5IiwiY2xhc3NOYW1lIiwiaGVpZ2h0Iiwib2JqZWN0Rml0Iiwib2JqZWN0UG9zaXRpb24iLCJibHVyRGF0YVVSTCIsImFsbCIsInJlc3QiLCJzdGF0aWNTcmMiLCJzdGF0aWNJbWFnZURhdGEiLCJKU09OIiwic3RyaW5naWZ5Iiwid2lkdGhJbnQiLCJoZWlnaHRJbnQiLCJxdWFsaXR5SW50IiwiaXNMYXp5IiwiaGFzIiwiaW5jbHVkZXMiLCJTdHJpbmciLCJpc05hTiIsIlZBTElEX0JMVVJfRVhUIiwicmFuZCIsImZsb29yIiwicmFuZG9tIiwidG9TdHJpbmciLCJzZXRSZWYiLCJpc0ludGVyc2VjdGVkIiwidXNlSW50ZXJzZWN0aW9uIiwicm9vdE1hcmdpbiIsImRpc2FibGVkIiwiaXNWaXNpYmxlIiwid3JhcHBlclN0eWxlIiwic2l6ZXJTdHlsZSIsInNpemVyU3ZnIiwiaW1nU3R5bGUiLCJ0b3AiLCJsZWZ0IiwiYm90dG9tIiwicmlnaHQiLCJib3hTaXppbmciLCJwYWRkaW5nIiwiYm9yZGVyIiwibWFyZ2luIiwibWluV2lkdGgiLCJtYXhXaWR0aCIsIm1pbkhlaWdodCIsIm1heEhlaWdodCIsImJsdXJTdHlsZSIsImJhY2tncm91bmRQb3NpdGlvbiIsIm92ZXJmbG93IiwicXVvdGllbnQiLCJwYWRkaW5nVG9wIiwiaW1nQXR0cmlidXRlcyIsInNyY1N0cmluZyIsImNyZWF0ZUVsZW1lbnQiLCJhbHQiLCJ0b0Jhc2U2NCIsImFzc2lnbiIsImRlY29kaW5nIiwicmVsIiwiYXMiLCJocmVmIiwiaW1hZ2VzcmNzZXQiLCJpbWFnZXNpemVzIiwibm9ybWFsaXplU3JjIiwic2xpY2UiLCJ1cmwiLCJVUkwiLCJwYXJhbXMiLCJzZWFyY2hQYXJhbXMiLCJzZXQiLCJwYXJhbXNTdHJpbmciLCJtaXNzaW5nVmFsdWVzIiwicGFyc2VkU3JjIiwiZXJyIiwiZXJyb3IiLCJob3N0bmFtZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIl9yb3V0ZXIiLCJfcm91dGVyMSIsInByZWZldGNoZWQiLCJwcmVmZXRjaCIsInJvdXRlciIsIm9wdGlvbnMiLCJpc0xvY2FsVVJMIiwiY3VyTG9jYWxlIiwibG9jYWxlIiwiaXNNb2RpZmllZEV2ZW50IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwibWV0YUtleSIsImN0cmxLZXkiLCJzaGlmdEtleSIsImFsdEtleSIsIm5hdGl2ZUV2ZW50Iiwid2hpY2giLCJsaW5rQ2xpY2tlZCIsImUiLCJyZXBsYWNlIiwic2hhbGxvdyIsInNjcm9sbCIsIm5vZGVOYW1lIiwicHJldmVudERlZmF1bHQiLCJMaW5rIiwicHJvcHMiLCJjcmVhdGVQcm9wRXJyb3IiLCJhcmdzIiwiZXhwZWN0ZWQiLCJhY3R1YWwiLCJyZXF1aXJlZFByb3BzR3VhcmQiLCJyZXF1aXJlZFByb3BzIiwiXyIsIm9wdGlvbmFsUHJvcHNHdWFyZCIsInBhc3NIcmVmIiwib3B0aW9uYWxQcm9wcyIsInZhbFR5cGUiLCJoYXNXYXJuZWQiLCJ1c2VSZWYiLCJjdXJyZW50IiwidXNlUm91dGVyIiwidXNlTWVtbyIsInJlc29sdmVkSHJlZiIsInJlc29sdmVkQXMiLCJyZXNvbHZlSHJlZiIsImNoaWxkcmVuIiwiY2hpbGQiLCJDaGlsZHJlbiIsIm9ubHkiLCJjaGlsZFJlZiIsInNldEludGVyc2VjdGlvblJlZiIsInVzZUNhbGxiYWNrIiwiZWwiLCJ1c2VFZmZlY3QiLCJzaG91bGRQcmVmZXRjaCIsImlzUHJlZmV0Y2hlZCIsImNoaWxkUHJvcHMiLCJvbkNsaWNrIiwiZGVmYXVsdFByZXZlbnRlZCIsIm9uTW91c2VFbnRlciIsInR5cGUiLCJsb2NhbGVEb21haW4iLCJpc0xvY2FsZURvbWFpbiIsImdldERvbWFpbkxvY2FsZSIsImxvY2FsZXMiLCJkb21haW5Mb2NhbGVzIiwiYWRkQmFzZVBhdGgiLCJhZGRMb2NhbGUiLCJkZWZhdWx0TG9jYWxlIiwiY2xvbmVFbGVtZW50IiwiX2RlZmF1bHQiLCJyZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCIsIm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoIiwiZW5kc1dpdGgiLCJfX05FWFRfVFJBSUxJTkdfU0xBU0giLCJ0ZXN0IiwicmVxdWVzdElkbGVDYWxsYmFjayIsImNhbmNlbElkbGVDYWxsYmFjayIsInNlbGYiLCJiaW5kIiwid2luZG93IiwiY2IiLCJzdGFydCIsIkRhdGUiLCJub3ciLCJzZXRUaW1lb3V0IiwiZGlkVGltZW91dCIsInRpbWVSZW1haW5pbmciLCJtYXgiLCJpZCIsImNsZWFyVGltZW91dCIsIm1hcmtBc3NldEVycm9yIiwiaXNBc3NldEVycm9yIiwiZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCIsImNyZWF0ZVJvdXRlTG9hZGVyIiwiX2dldEFzc2V0UGF0aEZyb21Sb3V0ZSIsIl9yZXF1ZXN0SWRsZUNhbGxiYWNrIiwiTVNfTUFYX0lETEVfREVMQVkiLCJ3aXRoRnV0dXJlIiwiZ2VuZXJhdG9yIiwiZW50cnkiLCJmdXR1cmUiLCJyZXNvbHZlciIsInByb20iLCJoYXNQcmVmZXRjaCIsImxpbmsiLCJkb2N1bWVudCIsIk1TSW5wdXRNZXRob2RDb250ZXh0IiwiZG9jdW1lbnRNb2RlIiwicmVsTGlzdCIsInN1cHBvcnRzIiwiY2FuUHJlZmV0Y2giLCJwcmVmZXRjaFZpYURvbSIsInJlcyIsInJlaiIsInF1ZXJ5U2VsZWN0b3IiLCJjcm9zc09yaWdpbiIsIl9fTkVYVF9DUk9TU19PUklHSU4iLCJvbmVycm9yIiwiaGVhZCIsImFwcGVuZENoaWxkIiwiQVNTRVRfTE9BRF9FUlJPUiIsIlN5bWJvbCIsImFwcGVuZFNjcmlwdCIsInNjcmlwdCIsInJlamVjdCIsImJvZHkiLCJkZXZCdWlsZFByb21pc2UiLCJyZXNvbHZlUHJvbWlzZVdpdGhUaW1lb3V0IiwibXMiLCJjYW5jZWxsZWQiLCJyIiwiX19CVUlMRF9NQU5JRkVTVCIsIm9uQnVpbGRNYW5pZmVzdCIsIl9fQlVJTERfTUFOSUZFU1RfQ0IiLCJnZXRGaWxlc0ZvclJvdXRlIiwiYXNzZXRQcmVmaXgiLCJyb3V0ZSIsInNjcmlwdHMiLCJlbmNvZGVVUkkiLCJjc3MiLCJtYW5pZmVzdCIsImFsbEZpbGVzIiwidiIsImVudHJ5cG9pbnRzIiwibG9hZGVkU2NyaXB0cyIsInN0eWxlU2hlZXRzIiwicm91dGVzIiwibWF5YmVFeGVjdXRlU2NyaXB0IiwiZmV0Y2hTdHlsZVNoZWV0IiwiZmV0Y2giLCJvayIsInRleHQiLCJjb250ZW50Iiwid2hlbkVudHJ5cG9pbnQiLCJvbkVudHJ5cG9pbnQiLCJleGVjdXRlIiwiZm4iLCJjb21wb25lbnQiLCJpbnB1dCIsIm9sZCIsImxvYWRSb3V0ZSIsInJvdXRlRmlsZXNQcm9taXNlIiwiZW50cnlwb2ludCIsInN0eWxlcyIsImZpbmFsbHkiLCJjbiIsIm5hdmlnYXRvciIsImNvbm5lY3Rpb24iLCJzYXZlRGF0YSIsImVmZmVjdGl2ZVR5cGUiLCJvdXRwdXQiLCJfd2l0aFJvdXRlciIsImNyZWF0ZVJvdXRlciIsIm1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZSIsIl9yb3V0ZXJDb250ZXh0Iiwic2luZ2xldG9uUm91dGVyIiwicmVhZHlDYWxsYmFja3MiLCJyZWFkeSIsInVybFByb3BlcnR5RmllbGRzIiwicm91dGVyRXZlbnRzIiwiY29yZU1ldGhvZEZpZWxkcyIsImV2ZW50cyIsImZpZWxkIiwiZ2V0Um91dGVyIiwib24iLCJldmVudEZpZWxkIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzdWJzdHJpbmciLCJfc2luZ2xldG9uUm91dGVyIiwibWVzc2FnZSIsInN0YWNrIiwidXNlQ29udGV4dCIsIlJvdXRlckNvbnRleHQiLCJpbnN0YW5jZSIsInByb3BlcnR5IiwiQXJyYXkiLCJpc0FycmF5IiwiaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImlzRGlzYWJsZWQiLCJ1bm9ic2VydmUiLCJ2aXNpYmxlIiwic2V0VmlzaWJsZSIsInVzZVN0YXRlIiwidGFnTmFtZSIsIm9ic2VydmUiLCJpZGxlQ2FsbGJhY2siLCJlbGVtZW50IiwiY2FsbGJhY2siLCJvYnNlcnZlciIsImVsZW1lbnRzIiwiY3JlYXRlT2JzZXJ2ZXIiLCJkZWxldGUiLCJzaXplIiwiZGlzY29ubmVjdCIsIm9ic2VydmVycyIsImVudHJpZXMiLCJpc0ludGVyc2VjdGluZyIsImludGVyc2VjdGlvblJhdGlvIiwid2l0aFJvdXRlciIsIkNvbXBvc2VkQ29tcG9uZW50IiwiV2l0aFJvdXRlcldyYXBwZXIiLCJnZXRJbml0aWFsUHJvcHMiLCJvcmlnR2V0SW5pdGlhbFByb3BzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwiZGVsTG9jYWxlIiwiaGFzQmFzZVBhdGgiLCJkZWxCYXNlUGF0aCIsImludGVycG9sYXRlQXMiLCJfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCIsIl9yb3V0ZUxvYWRlciIsIl9kZW5vcm1hbGl6ZVBhZ2VQYXRoIiwiX25vcm1hbGl6ZUxvY2FsZVBhdGgiLCJfbWl0dCIsIl91dGlscyIsIl9pc0R5bmFtaWMiLCJfcGFyc2VSZWxhdGl2ZVVybCIsIl9xdWVyeXN0cmluZyIsIl9yZXNvbHZlUmV3cml0ZXMiLCJfcm91dGVNYXRjaGVyIiwiX3JvdXRlUmVnZXgiLCJkZXRlY3REb21haW5Mb2NhbGUiLCJfX05FWFRfSTE4Tl9TVVBQT1JUIiwiYmFzZVBhdGgiLCJfX05FWFRfUk9VVEVSX0JBU0VQQVRIIiwiYnVpbGRDYW5jZWxsYXRpb25FcnJvciIsImFkZFBhdGhQcmVmaXgiLCJwcmVmaXgiLCJwYXRoTm9RdWVyeUhhc2giLCJub3JtYWxpemVMb2NhbGVQYXRoIiwiZGV0ZWN0ZWRMb2NhbGUiLCJkZXRlY3RlZERvbWFpbiIsImh0dHAiLCJkb21haW4iLCJwYXRobmFtZSIsInBhdGhMb3dlciIsInRvTG93ZXJDYXNlIiwibG9jYWxlTG93ZXIiLCJzdWJzdHIiLCJxdWVyeUluZGV4IiwiaGFzaEluZGV4IiwibG9jYXRpb25PcmlnaW4iLCJnZXRMb2NhdGlvbk9yaWdpbiIsInJlc29sdmVkIiwib3JpZ2luIiwiYXNQYXRobmFtZSIsInF1ZXJ5IiwiaW50ZXJwb2xhdGVkUm91dGUiLCJkeW5hbWljUmVnZXgiLCJnZXRSb3V0ZVJlZ2V4IiwiZHluYW1pY0dyb3VwcyIsImdyb3VwcyIsImR5bmFtaWNNYXRjaGVzIiwiZ2V0Um91dGVNYXRjaGVyIiwiZXZlcnkiLCJwYXJhbSIsInJlcGVhdCIsIm9wdGlvbmFsIiwicmVwbGFjZWQiLCJzZWdtZW50IiwicmVzdWx0Iiwib21pdFBhcm1zRnJvbVF1ZXJ5IiwiZmlsdGVyZWRRdWVyeSIsInJlc29sdmVBcyIsImJhc2UiLCJ1cmxBc1N0cmluZyIsImZvcm1hdFdpdGhWYWxpZGF0aW9uIiwidXJsUHJvdG9NYXRjaCIsInVybEFzU3RyaW5nTm9Qcm90byIsInVybFBhcnRzIiwic3BsaXQiLCJub3JtYWxpemVkVXJsIiwibm9ybWFsaXplUmVwZWF0ZWRTbGFzaGVzIiwiYXNQYXRoIiwiZmluYWxVcmwiLCJpbnRlcnBvbGF0ZWRBcyIsImlzRHluYW1pY1JvdXRlIiwic2VhcmNoUGFyYW1zVG9VcmxRdWVyeSIsImhhc2giLCJzdHJpcE9yaWdpbiIsInByZXBhcmVVcmxBcyIsImhyZWZIYWRPcmlnaW4iLCJhc0hhZE9yaWdpbiIsInByZXBhcmVkVXJsIiwicHJlcGFyZWRBcyIsInJlc29sdmVEeW5hbWljUm91dGUiLCJwYWdlcyIsImNsZWFuUGF0aG5hbWUiLCJkZW5vcm1hbGl6ZVBhZ2VQYXRoIiwic29tZSIsInBhZ2UiLCJyZSIsIm1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uIiwiX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTiIsImhpc3RvcnkiLCJzZXNzaW9uU3RvcmFnZSIsInNldEl0ZW0iLCJyZW1vdmVJdGVtIiwibiIsIlNTR19EQVRBX05PVF9GT1VORCIsImZldGNoUmV0cnkiLCJhdHRlbXB0cyIsImNyZWRlbnRpYWxzIiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJub3RGb3VuZCIsImZldGNoTmV4dERhdGEiLCJkYXRhSHJlZiIsImlzU2VydmVyUmVuZGVyIiwiUm91dGVyIiwiY29uc3RydWN0b3IiLCJwYXRobmFtZTEiLCJxdWVyeTEiLCJhczEiLCJpbml0aWFsUHJvcHMiLCJwYWdlTG9hZGVyIiwiQXBwIiwid3JhcEFwcCIsIkNvbXBvbmVudCIsIkNvbXBvbmVudDEiLCJlcnIxIiwic3Vic2NyaXB0aW9uIiwiaXNGYWxsYmFjayIsImlzUHJldmlldyIsInNkYyIsInNkciIsIl9pZHgiLCJvblBvcFN0YXRlIiwic3RhdGUiLCJjaGFuZ2VTdGF0ZSIsImdldFVSTCIsIl9fTiIsImZvcmNlZFNjcm9sbCIsImlkeCIsInBhZ2VYT2Zmc2V0IiwieSIsInBhZ2VZT2Zmc2V0IiwiZ2V0SXRlbSIsInBhcnNlIiwicGFyc2VSZWxhdGl2ZVVybCIsImlzU3NyIiwiX2JwcyIsImNoYW5nZSIsIl9zaGFsbG93IiwiY29tcG9uZW50cyIsImluaXRpYWwiLCJfX05fU1NHIiwiX19OX1NTUCIsImF1dG9FeHBvcnREeW5hbWljIiwiX19ORVhUX0RBVEFfXyIsImF1dG9FeHBvcnQiLCJzdWIiLCJjbGMiLCJfd3JhcEFwcCIsImlzUmVhZHkiLCJnc3NwIiwiZ2lwIiwiYXBwR2lwIiwiZ3NwIiwibG9jYXRpb24iLCJzZWFyY2giLCJfX05FWFRfSEFTX1JFV1JJVEVTIiwiX3Nob3VsZFJlc29sdmVIcmVmIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjcm9sbFJlc3RvcmF0aW9uIiwicmVsb2FkIiwiYmFjayIsIm1ldGhvZCIsInNob3VsZFJlc29sdmVIcmVmIiwiX2giLCJwcmV2TG9jYWxlIiwicGFyc2VkQXMiLCJsb2NhbGVQYXRoUmVzdWx0IiwiZGlkTmF2aWdhdGUiLCJhc05vQmFzZVBhdGgiLCJTVCIsInBlcmZvcm1hbmNlIiwibWFyayIsInJvdXRlUHJvcHMiLCJfaW5GbGlnaHRSb3V0ZSIsImFib3J0Q29tcG9uZW50TG9hZCIsImNsZWFuZWRBcyIsImxvY2FsZUNoYW5nZSIsIm9ubHlBSGFzaENoYW5nZSIsImVtaXQiLCJzY3JvbGxUb0hhc2giLCJub3RpZnkiLCJwYXJzZWQiLCJyZXdyaXRlcyIsImdldFBhZ2VMaXN0IiwiX19yZXdyaXRlcyIsInVybElzTmV3IiwicmV3cml0ZXNSZXN1bHQiLCJtYXRjaGVkUGFnZSIsInJvdXRlUmVnZXgiLCJyb3V0ZU1hdGNoIiwic2hvdWxkSW50ZXJwb2xhdGUiLCJtaXNzaW5nUGFyYW1zIiwicmVmMSIsInJvdXRlSW5mbyIsImdldFJvdXRlSW5mbyIsInBhZ2VQcm9wcyIsIl9fTl9SRURJUkVDVCIsImRlc3RpbmF0aW9uIiwicGFyc2VkSHJlZiIsIm5ld1VybCIsIm5ld0FzIiwiX19OX1BSRVZJRVciLCJub3RGb3VuZFJvdXRlIiwiZmV0Y2hDb21wb25lbnQiLCJhcHBDb21wIiwibmV4dCIsImlzUHJlcmVuZGVyZWQiLCJzdGF0dXNDb2RlIiwiaXNWYWxpZFNoYWxsb3dSb3V0ZSIsIl9zY3JvbGwiLCJzaG91bGRTY3JvbGwiLCJyZXNldFNjcm9sbCIsImRvY3VtZW50RWxlbWVudCIsImxhbmciLCJoYW5kbGVSb3V0ZUluZm9FcnJvciIsImxvYWRFcnJvckZhaWwiLCJnaXBFcnIiLCJyb3V0ZUluZm9FcnIiLCJleGlzdGluZ1JvdXRlSW5mbyIsImNhY2hlZFJvdXRlSW5mbyIsIm1vZCIsImlzVmFsaWRFbGVtZW50VHlwZSIsImdldERhdGFIcmVmIiwiX2dldERhdGEiLCJfZ2V0U3RhdGljRGF0YSIsIl9nZXRTZXJ2ZXJEYXRhIiwiZXJyMiIsImJlZm9yZVBvcFN0YXRlIiwib2xkVXJsTm9IYXNoIiwib2xkSGFzaCIsIm5ld1VybE5vSGFzaCIsIm5ld0hhc2giLCJzY3JvbGxUbyIsImlkRWwiLCJnZXRFbGVtZW50QnlJZCIsInNjcm9sbEludG9WaWV3IiwibmFtZUVsIiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJwYXRobmFtZTIiLCJfaXNTc2ciLCJpc1NzZyIsImNhbmNlbCIsImNvbXBvbmVudFJlc3VsdCIsImxvYWRQYWdlIiwiY2FjaGVLZXkiLCJyZXNvdXJjZUtleSIsImN0eCIsIkFwcDEiLCJBcHBUcmVlIiwibG9hZEdldEluaXRpYWxQcm9wcyIsIkNvbW1lbnRJdGVtIiwiQ29tbWVudFRpdGxlIiwiV3JhcHBlciIsIkNvbW1lbnRMaXN0IiwiaXRlbSIsImNyZWF0ZWRBdCIsInN0eWxlZCIsImRpdiIsInRoZW1lIiwibGFwdG9wIiwiUmVhY3QiLCJCdXR0b25XcmFwcGVyIiwiRGV0YWlsSXRlbUltYWdlIiwiRGV0YWlsSXRlbUluZm8iLCJEZXRhaWxJdGVtT3ZlcnZpZXciLCJEZXRhaWxJdGVtVGl0bGUiLCJEZXRhaWxJdGVtV3JhcHBlciIsIkltYWdlV3JhcHBlciIsIlRvdXJTcG90IiwiVG91ckN1bHR1cmUiLCJUb3VyRXZlbnQiLCJUb3VyQ291cnNlIiwiVG91clNwb3J0cyIsIlRvdXJTbGVlcCIsIlRvdXJNYWxsIiwiVG91ckZvb2QiLCJDYXJldERvd25PdXRsaW5lZCIsIkNhcmV0VXBPdXRsaW5lZCIsIktha2FvbWFwIiwidXNlVG9nZ2xlIiwiRGV0YWlsSXRlbSIsInRpdGxlIiwiZmlyc3RpbWFnZSIsIm92ZXJ2aWV3IiwiY29udGVudHR5cGVpZCIsIm1vcmUiLCJvblRvZ2dsZU1vcmUiLCJvblRvZ2dsZU1pbkhlaWdodCIsIm1vcmVIZWlnaHQiLCJjbGllbnRIZWlnaHQiLCJfX2h0bWwiLCJyZXBsYWNlQWxsIiwiSW1hZ2UiLCJoMiIsInRhYmxldCIsIm1vYmlsZUwiLCJoMyIsIkltYWdlU2tlbGV0b24iLCJTa2VsZXRvbkJveCIsIlRpdGxlQm94IiwiVGl0bGVTa2VsZXRvbiIsIkRldGFpbFNrZWxldG9uIiwicGMiLCJGb290ZXJXcmFwcGVyIiwiRm9vdGVyIiwiTGkiLCJIZWFkSXRlbSIsImNvbnRlbnRUeXBlSWQiLCJsaSIsIkFycm93UmlnaHRPdXRsaW5lZCIsIkluZm93aW5kb3ciLCJNYXBXcmFwcGVyIiwibWFweCIsIm1hcHkiLCJORVhUX1BVQkxJQ19LQUtBT19NQVBTIiwiY29udGFpbmVyIiwia2FrYW8iLCJtYXBzIiwiY2VudGVyIiwiTGF0TG5nIiwibGV2ZWwiLCJtYXJrZXJQb3NpdGlvbiIsIm1hcmtlciIsIk1hcmtlciIsInNldE1hcCIsInNldFpvb21hYmxlIiwicmVtb3ZlIiwiSXdDb250ZW50V3JhcHBlciIsIk5hdmJhciIsIk1haW5XcmFwcGVyIiwiTGF5b3V0IiwiU3ViSXRlbSIsImh0bWwiLCJJbnRyb1dyYXBwZXIiLCJDYXJkSW1hZ2UiLCJDYXJkV3JhcHBlciIsIkNvdXJzZUltYWdlIiwiQ291cnNlTGlzdCIsIkl0ZW0iLCJTdWJEZXRhaWwiLCJpbWFnZVNyYyIsInNldEltYWdlU3JjIiwiaW5mbyIsInN1YmRldGFpbGltZyIsImltYWdlVGl0bGUiLCJzZXRJbWFnZVRpdGxlIiwic3VibmFtZSIsInN1Yk92ZXJ2aWV3Iiwic2V0U3ViT3ZlcnZpZXciLCJzdWJkZXRhaWxvdmVydmlldyIsImNoYW5nZUltYWdlU3JjIiwiaW50cm8iLCJkaXN0YW5jZSIsImNvdXJzZSIsInN1YmNvbnRlbnRpZCIsIlRpbWVsaW5lIiwiQ2FyZCIsIm1vYmlsZVMiLCJhZGRyMSIsImhvbWVwYWdlIiwiaW5mb2NlbnRlcmN1bHR1cmUiLCJwYXJraW5nY3VsdHVyZSIsInBhcmtpbmdmZWUiLCJ1c2V0aW1lY3VsdHVyZSIsImluZm9uYW1lIiwiaW5mb3RleHQiLCJ0ZWwiLCJ1c2V0aW1lZmVzdGl2YWwiLCJwbGF5dGltZSIsImRpc2NvdW50aW5mb2Zlc3RpdmFsIiwicmVzdGRhdGVmb29kIiwicmVzZXJ2YXRpb25mb29kIiwib3BlbnRpbWVmb29kIiwidHJlYXRtZW51IiwiaW5mb2NlbnRlcmZvb2QiLCJpbmZvY2VudGVyc2hvcHBpbmciLCJzaG9wZ3VpZGUiLCJvcGVudGltZSIsInJlc3RkYXRlc2hvcHBpbmciLCJyZXNlcnZhdGlvbmxvZGdpbmciLCJyZXNlcnZhdGlvbnVybCIsImNoZWNraW50aW1lIiwiY2hlY2tvdXR0aW1lIiwicmVmdW5kcmVndWxhdGlvbiIsInNjYWxlbG9kZ2luZyIsImluZm9jZW50ZXJsZXBvcnRzIiwicmVzZXJ2YXRpb24iLCJ1c2V0aW1lbGVwb3J0cyIsImluZm9jZW50ZXIiLCJ1c2V0aW1lIiwiQnV0dG9uIiwiRm9ybSIsInVzZURpc3BhdGNoIiwidXNlU2VsZWN0b3IiLCJTd2FsIiwidXNlSW5wdXQiLCJhZGRDb21tZW50QXN5bmMiLCJGb3JtV3JhcHBlciIsIlRleHRBcmVhIiwiVGV4dEFyZWFXcmFwcGVyIiwiQ29tbWVudEZvcm0iLCJjb21tZW50VGV4dCIsIm9uQ2hhbmdlQ29tbWVudFRleHQiLCJzZXRDb21tZW50VGV4dCIsIm1lIiwidXNlciIsImRpc3BhdGNoIiwic2hvd01vZGFsIiwiZmlyZSIsInNob3dDYW5jZWxCdXR0b24iLCJjb25maXJtQnV0dG9uVGV4dCIsImNhbmNlbEJ1dHRvblRleHQiLCJpY29uIiwiaXNDb25maXJtZWQiLCJvblN1Ym1pdCIsInRyaW0iLCJyZXF1ZXN0IiwiY29udGVudGlkIiwidGV4dGFyZWEiLCJBdmF0YXIiLCJkZWxldGVDb21tZW50QXN5bmMiLCJDb21tZW50U3R5bGUiLCJFZGl0Rm9ybSIsImVkaXRhYmxlIiwib25Ub2dnbGVFZGl0IiwicmVtb3ZlQ29tbWVudCIsImNvbnRlbnRJZCIsIlVzZXJJZCIsIlVzZXIiLCJuaWNrbmFtZSIsInRvTG9jYWxlU3RyaW5nIiwidGltZVpvbmUiLCJDb21tZW50IiwibWluZSIsIkNhbmNlbEJ1dHRvbiIsIm1vZGlmeUNvbW1lbnRBc3luYyIsInRvZ2dsZUVkaXQiLCJvbkNoYW5nZUlucHV0IiwiY29tbWVudEVkaXRlZEVycm9yIiwiY29tbWVudCIsImVkaXRDb21tZW50IiwiTmF2YmFyV3JhcHBlciIsIkxvZ28iLCJTZWFyY2giLCJBY2NvdW50IiwiQ2F0ZWdvcnkiLCJNb2JpbGVTZWFyY2giLCJIYW1idXJnZXJNZW51IiwiTG9nb3V0QnV0dG9uIiwibG9nb3V0QXN5bmMiLCJTZWFyY2hGb3JtIiwiTWVudU91dGxpbmVkIiwidG9nZ2xlIiwidG9nZ2xlSGFuYnVyZ2VyIiwic2V0VG9nZ2xlIiwib25DbGlja0xvZ291dCIsImNsb3NlSGFtYnVyZ2VyIiwiYnV0dG9uIiwiSW5wdXQiLCJTZWFyY2hCdXR0b24iLCJTZWFyY2hXcmFwcGVyIiwiU2VhcmNoT3V0bGluZWQiLCJsYWJlbCIsIm9uQ2hhbmdlU2VhcmNoIiwib25TZWFyY2giLCJwYWdlTm8iLCJjb2xvciIsImNyZWF0ZUFzeW5jQWN0aW9uIiwiQUREX0NPTU1FTlRfUkVRVUVTVCIsIkFERF9DT01NRU5UX1NVQ0NFU1MiLCJBRERfQ09NTUVOVF9GQUlMVVJFIiwiTE9BRF9DT01NRU5UX1JFUVVFU1QiLCJMT0FEX0NPTU1FTlRfU1VDQ0VTUyIsIkxPQURfQ09NTUVOVF9GQUlMVVJFIiwiREVMRVRFX0NPTU1FTlRfUkVRVUVTVCIsIkRFTEVURV9DT01NRU5UX1NVQ0NFU1MiLCJERUxFVEVfQ09NTUVOVF9GQUlMVVJFIiwiTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCIsIk1PRElGWV9DT01NRU5UX1NVQ0NFU1MiLCJNT0RJRllfQ09NTUVOVF9GQUlMVVJFIiwibG9hZENvbW1lbnRBc3luYyIsInByb2R1Y2UiLCJjcmVhdGVSZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwiY29tbWVudExpc3QiLCJjb21tZW50QWRkZWQiLCJpc0FkZGluZ0NvbW1lbnQiLCJjb21tZW50RXJyb3IiLCJkcmFmdCIsImFjdGlvbiIsInBheWxvYWQiLCJheGlvcyIsInRha2VMYXRlc3QiLCJwdXQiLCJmb3JrIiwiYWRkQ29tbWVudEFQSSIsInBvc3QiLCJhZGRDb21tZW50U2FnYSIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwicmVzcG9uc2UiLCJ3YXRjaEFkZENvbW1lbnQiLCJsb2FkQ29tbWVudHNBUEkiLCJsb2FkQ29tbWVudHNTYWdhIiwid2F0Y2hMb2FkQ29tbWVudHMiLCJkZWxldGVDb21tZW50QVBJIiwiZGVsZXRlQ29tbWVudFNhZ2EiLCJ3YXRjaFJlbW92ZUNvbW1lbnQiLCJtb2RpZnlDb21tZW50QVBJIiwibW9kaWZ5Q29tbWVudFNhZ2EiLCJ3YXRjaE1vZGlmeUNvbW1lbnQiLCJjb21tZW50U2FnYSIsIlJFR0lPTl9UT1VSX1JFUVVFU1QiLCJSRUdJT05fVE9VUl9TVUNDRVNTIiwiUkVHSU9OX1RPVVJfRkFJTFVSRSIsIlNFQVJDSF9UT1VSX1JFUVVFU1QiLCJTRUFSQ0hfVE9VUl9TVUNDRVNTIiwiU0VBUkNIX1RPVVJfRkFJTFVSRSIsIkRFVEFJTF9UT1VSX1JFUVVFU1QiLCJERVRBSUxfVE9VUl9TVUNDRVNTIiwiREVUQUlMX1RPVVJfRkFJTFVSRSIsIkFMTF9UT1VSX1JFUVVFU1QiLCJBTExfVE9VUl9TVUNDRVNTIiwiQUxMX1RPVVJfRkFJTFVSRSIsImFsbEFzeW5jIiwic2VhcmNoQXN5bmMiLCJyZWdpb25Bc3luYyIsImRldGFpbEFzeW5jIiwic2VhcmNoUmVzdWx0IiwiaXRlbXMiLCJudW1PZlJvd3MiLCJ0b3RhbENvdW50IiwiZGV0YWlsUmVzdWx0IiwiYWxsRGF0YSIsImZlc3RpdmFsIiwic2xlZXAiLCJyZWdpb25SZXN1bHQiLCJkZXRhaWwiLCJhbGxBUEkiLCJhbGxEYXRhU2FnYSIsIndhdGNoQWxsRGF0YSIsInNlYXJjaEFQSSIsImFycmFuZ2UiLCJzZWFyY2hEZXRhaWxTYWdhIiwid2F0Y2hTZWFyY2hEZXRhaWwiLCJyZWdpb25BUEkiLCJhcmVhQ29kZSIsInJlZ2lvbkRldGFpbFNhZ2EiLCJ3YXRjaFJlZ2lvbkRldGFpbCIsImRldGFpbEFQSSIsImRldGFpbFJlc3VsdFNhZ2EiLCJ3YXRjaERldGFpbFJlc3VsdCIsImRldGFpbFNhZ2EiLCJIWURSQVRFIiwiY29tYmluZVJlZHVjZXJzIiwidXNlclNhZ2EiLCJiYWNrVXJsIiwiZGVmYXVsdHMiLCJiYXNlVVJMIiwid2l0aENyZWRlbnRpYWxzIiwicm9vdFJlZHVjZXIiLCJyb290U2FnYSIsImRlcHJlY2F0ZWQiLCJjcmVhdGVTdGFuZGFyZEFjdGlvbiIsIlNJR05fVVBfUkVRVUVTVCIsIlNJR05fVVBfU1VDQ0VTUyIsIlNJR05fVVBfRkFJTFVSRSIsIkxPR19JTl9SRVFVRVNUIiwiTE9HX0lOX1NVQ0NFU1MiLCJMT0dfSU5fRkFJTFVSRSIsIkxPR19PVVRfUkVRVUVTVCIsIkxPR19PVVRfU1VDQ0VTUyIsIkxPR19PVVRfRkFJTFVSRSIsIkxPQURfVVNFUl9SRVFVRVNUIiwiTE9BRF9VU0VSX1NVQ0NFU1MiLCJMT0FEX1VTRVJfRkFJTFVSRSIsIlNJR05fVVBfUkVTRVQiLCJzaWdudXBBc3luYyIsImxvZ2luQXN5bmMiLCJsb2FkVXNlckFzeW5jIiwic2lnbnVwUmVzZXQiLCJpc0xvZ2dpbmdpbiIsImlzTG9nZ2luZ291dCIsImxvZ2luRXJyb3IiLCJpc1NpZ25lZHVwIiwiaXNTaWduaW5ndXAiLCJzaWdudXBFcnJvciIsInNpZ251cEFQSSIsInNpZ251cERhdGEiLCJzaWdudXBTYWdhIiwid2F0Y2hTaWdudXAiLCJsb2dpbkFQSSIsImxvZ2luRGF0YSIsImxvZ2luU2FnYSIsIndhdGNoTG9naW4iLCJsb2dvdXRBUEkiLCJsb2dvdXRTYWdhIiwid2F0Y2hMb2dvdXQiLCJsb2FkVXNlckFQSSIsImxvYWRVc2VyU2FnYSIsIndhdGNoTG9hZFVzZXIiLCJyZWR1Y2VyIiwiY3JlYXRlV3JhcHBlciIsIndpdGhSZWR1eFNhZ2EiLCJjcmVhdGVTYWdhTWlkZGxld2FyZSIsImFwcGx5TWlkZGxld2FyZSIsImNvbXBvc2UiLCJjcmVhdGVTdG9yZSIsImNvbXBvc2VXaXRoRGV2VG9vbHMiLCJUaGVtZVByb3ZpZGVyIiwiR2xvYmFsU3R5bGUiLCJIZWFkIiwiVG91ciIsImNvbmZpZ3VyZVN0b3JlIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlcyIsImVuaGFuY2VyIiwic3RvcmUiLCJzYWdhVGFzayIsInJ1biIsIndyYXBwZXIiLCJ3aXRoUmVkdXgiLCJjb25uZWN0IiwiRU5EIiwiRHRhaWxXcmFwcGVyIiwiRGV0YWlsIiwiTnVtYmVyIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwicmVxIiwiY29va2llIiwiaGVhZGVycyIsIkNvb2tpZSIsInRvUHJvbWlzZSIsImNyZWF0ZUdsb2JhbFN0eWxlIiwicmVzZXQiLCJQYWdpbmF0aW9uIiwiQmFyIiwiVWwiLCJ1bCIsIlNlbGVjdCIsIlRpdGxlIiwiTnVsbFBhZ2UiLCJTb3J0V3JhcHBlciIsIlNvcnRCdXR0b24iLCJQYWdpbmF0aW9uQ3VzdG9tIiwiVGl0bGVXcmFwcGVyIiwiSG90TWVudSIsIm1vYmlsZU0iLCJpbml0aWFsVmFsdWUiLCJzZXRWYWx1ZSIsIm9uQ2hhbmdlIiwib25Ub2dnbGUiXSwic291cmNlUm9vdCI6IiJ9