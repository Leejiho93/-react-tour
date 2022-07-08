(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./src/pages/_app.tsx"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFQO0FBQ0Q7O0FBRUQsaUVBQWVqTSxTQUFmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1pBLDJHQUErQzs7Ozs7Ozs7Ozs7QUNBL0MseUdBQThDOzs7Ozs7Ozs7Ozs7QUNBOUM7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7O0FDQUE7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2NsaWVudC9saW5rLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvbm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvcmVxdWVzdC1pZGxlLWNhbGxiYWNrLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvcm91dGUtbG9hZGVyLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvcm91dGVyLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9jbGllbnQvdXNlLWludGVyc2VjdGlvbi5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY2xpZW50L3dpdGgtcm91dGVyLmpzIiwid2VicGFjazovL2Zyb250Ly4vbm9kZV9tb2R1bGVzL25leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci9yb3V0ZXIuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9Gb290ZXIvaW5kZXgudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvRm9vdGVyL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvSGVhZGVySXRlbS9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29tcG9uZW50cy9IZWFkZXJJdGVtL3N0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL2NvbXBvbmVudHMvTGF5b3V0L2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb21wb25lbnRzL0xheW91dC9zdHlsZS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL05hdmJhci9pbmRleC50c3giLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9OYXZiYXIvc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvY29udGFpbmVycy9TZWFyY2hGb3JtL2luZGV4LnRzeCIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9jb250YWluZXJzL1NlYXJjaEZvcm0vc3R5bGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L2FjdGlvbi50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2NvbW1lbnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9jb21tZW50L3NhZ2EudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvYWN0aW9uLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvZGV0YWlsL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvZGV0YWlsL3JlZHVjZXIudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy9kZXRhaWwvc2FnYS50cyIsIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9tb2R1bGVzL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9hY3Rpb24udHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9zcmMvbW9kdWxlcy91c2VyL2luZGV4LnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9yZWR1Y2VyLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL21vZHVsZXMvdXNlci9zYWdhLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3JjL3BhZ2VzL19hcHAudHN4Iiwid2VicGFjazovL2Zyb250Ly4vc3R5bGVzL0dsb2JhbFN0eWxlLnRzIiwid2VicGFjazovL2Zyb250Ly4vc3R5bGVzL3RoZW1lLnRzIiwid2VicGFjazovL2Zyb250Ly4vdXRpbHMvdXNlSW5wdXQudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi91dGlscy91c2VUb2dnbGUudHMiLCJ3ZWJwYWNrOi8vZnJvbnQvLi9ub2RlX21vZHVsZXMvbmV4dC9pbWFnZS5qcyIsIndlYnBhY2s6Ly9mcm9udC8uL25vZGVfbW9kdWxlcy9uZXh0L2xpbmsuanMiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJAYW50LWRlc2lnbi9pY29uc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwiYXhpb3NcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcImltbWVyXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0LXJlZHV4LXNhZ2FcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQtcmVkdXgtd3JhcHBlclwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NlcnZlci9kZW5vcm1hbGl6ZS1wYWdlLXBhdGguanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zZXJ2ZXIvaW1hZ2UtY29uZmlnLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvbWl0dC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyLWNvbnRleHQuanNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcIm5leHQvZGlzdC9zaGFyZWQvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvaXMtZHluYW1pYy5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybC5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3F1ZXJ5c3RyaW5nLmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtbWF0Y2hlci5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLXJlZ2V4LmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi90by1iYXNlLTY0LmpzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi91dGlscy5qc1wiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwibmV4dC9oZWFkXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJuZXh0L3JvdXRlclwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVhY3RcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInJlYWN0LWlzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWFjdC1yZWR1eFwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVhY3QvanN4LWRldi1ydW50aW1lXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWR1eFwiIiwid2VicGFjazovL2Zyb250L2V4dGVybmFsIFwicmVkdXgtZGV2dG9vbHMtZXh0ZW5zaW9uXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWR1eC1zYWdhXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJyZWR1eC1zYWdhL2VmZmVjdHNcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInN0eWxlZC1jb21wb25lbnRzXCIiLCJ3ZWJwYWNrOi8vZnJvbnQvZXh0ZXJuYWwgXCJzdHlsZWQtcmVzZXRcIiIsIndlYnBhY2s6Ly9mcm9udC9leHRlcm5hbCBcInR5cGVzYWZlLWFjdGlvbnNcIiIsIndlYnBhY2s6Ly9mcm9udC9pZ25vcmVkfEM6XFx0b3VyXFxmcm9udFxcbm9kZV9tb2R1bGVzXFxuZXh0XFxkaXN0XFxzaGFyZWRcXGxpYlxccm91dGVyfC4vdXRpbHMvcmVzb2x2ZS1yZXdyaXRlcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IEltYWdlMTtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX2hlYWQgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL2hlYWRcIikpO1xudmFyIF90b0Jhc2U2NCA9IHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3RvLWJhc2UtNjRcIik7XG52YXIgX2ltYWdlQ29uZmlnID0gcmVxdWlyZShcIi4uL3NlcnZlci9pbWFnZS1jb25maWdcIik7XG52YXIgX3VzZUludGVyc2VjdGlvbiA9IHJlcXVpcmUoXCIuL3VzZS1pbnRlcnNlY3Rpb25cIik7XG5mdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG4gICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIF9vYmplY3RTcHJlYWQodGFyZ2V0KSB7XG4gICAgZm9yKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV0gIT0gbnVsbCA/IGFyZ3VtZW50c1tpXSA6IHtcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG93bktleXMgPSBPYmplY3Qua2V5cyhzb3VyY2UpO1xuICAgICAgICBpZiAodHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgb3duS2V5cyA9IG93bktleXMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKS5maWx0ZXIoZnVuY3Rpb24oc3ltKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBzeW0pLmVudW1lcmFibGU7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cbiAgICAgICAgb3duS2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgX2RlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCBzb3VyY2Vba2V5XSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzKHNvdXJjZSwgZXhjbHVkZWQpIHtcbiAgICBpZiAoc291cmNlID09IG51bGwpIHJldHVybiB7XG4gICAgfTtcbiAgICB2YXIgdGFyZ2V0ID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2Uoc291cmNlLCBleGNsdWRlZCk7XG4gICAgdmFyIGtleSwgaTtcbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgICB2YXIgc291cmNlU3ltYm9sS2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoc291cmNlKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgc291cmNlU3ltYm9sS2V5cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBrZXkgPSBzb3VyY2VTeW1ib2xLZXlzW2ldO1xuICAgICAgICAgICAgaWYgKGV4Y2x1ZGVkLmluZGV4T2Yoa2V5KSA+PSAwKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHNvdXJjZSwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZShzb3VyY2UsIGV4Y2x1ZGVkKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsKSByZXR1cm4ge1xuICAgIH07XG4gICAgdmFyIHRhcmdldCA9IHtcbiAgICB9O1xuICAgIHZhciBzb3VyY2VLZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICB2YXIga2V5LCBpO1xuICAgIGZvcihpID0gMDsgaSA8IHNvdXJjZUtleXMubGVuZ3RoOyBpKyspe1xuICAgICAgICBrZXkgPSBzb3VyY2VLZXlzW2ldO1xuICAgICAgICBpZiAoZXhjbHVkZWQuaW5kZXhPZihrZXkpID49IDApIGNvbnRpbnVlO1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuY29uc3QgbG9hZGVkSW1hZ2VVUkxzID0gbmV3IFNldCgpO1xuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZ2xvYmFsLl9fTkVYVF9JTUFHRV9JTVBPUlRFRCA9IHRydWU7XG59XG5jb25zdCBWQUxJRF9MT0FESU5HX1ZBTFVFUyA9IFtcbiAgICAnbGF6eScsXG4gICAgJ2VhZ2VyJyxcbiAgICB1bmRlZmluZWRcbl07XG5jb25zdCBsb2FkZXJzID0gbmV3IE1hcChbXG4gICAgW1xuICAgICAgICAnZGVmYXVsdCcsXG4gICAgICAgIGRlZmF1bHRMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2ltZ2l4JyxcbiAgICAgICAgaW1naXhMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2Nsb3VkaW5hcnknLFxuICAgICAgICBjbG91ZGluYXJ5TG9hZGVyXG4gICAgXSxcbiAgICBbXG4gICAgICAgICdha2FtYWknLFxuICAgICAgICBha2FtYWlMb2FkZXJcbiAgICBdLFxuICAgIFtcbiAgICAgICAgJ2N1c3RvbScsXG4gICAgICAgIGN1c3RvbUxvYWRlclxuICAgIF0sIFxuXSk7XG5jb25zdCBWQUxJRF9MQVlPVVRfVkFMVUVTID0gW1xuICAgICdmaWxsJyxcbiAgICAnZml4ZWQnLFxuICAgICdpbnRyaW5zaWMnLFxuICAgICdyZXNwb25zaXZlJyxcbiAgICB1bmRlZmluZWQsIFxuXTtcbmZ1bmN0aW9uIGlzU3RhdGljUmVxdWlyZShzcmMpIHtcbiAgICByZXR1cm4gc3JjLmRlZmF1bHQgIT09IHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGlzU3RhdGljSW1hZ2VEYXRhKHNyYykge1xuICAgIHJldHVybiBzcmMuc3JjICE9PSB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBpc1N0YXRpY0ltcG9ydChzcmMpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNyYyA9PT0gJ29iamVjdCcgJiYgKGlzU3RhdGljUmVxdWlyZShzcmMpIHx8IGlzU3RhdGljSW1hZ2VEYXRhKHNyYykpO1xufVxuY29uc3QgeyBkZXZpY2VTaXplczogY29uZmlnRGV2aWNlU2l6ZXMgLCBpbWFnZVNpemVzOiBjb25maWdJbWFnZVNpemVzICwgbG9hZGVyOiBjb25maWdMb2FkZXIgLCBwYXRoOiBjb25maWdQYXRoICwgZG9tYWluczogY29uZmlnRG9tYWlucyAsICB9ID0gcHJvY2Vzcy5lbnYuX19ORVhUX0lNQUdFX09QVFMgfHwgX2ltYWdlQ29uZmlnLmltYWdlQ29uZmlnRGVmYXVsdDtcbi8vIHNvcnQgc21hbGxlc3QgdG8gbGFyZ2VzdFxuY29uc3QgYWxsU2l6ZXMgPSBbXG4gICAgLi4uY29uZmlnRGV2aWNlU2l6ZXMsXG4gICAgLi4uY29uZmlnSW1hZ2VTaXplc1xuXTtcbmNvbmZpZ0RldmljZVNpemVzLnNvcnQoKGEsIGIpPT5hIC0gYlxuKTtcbmFsbFNpemVzLnNvcnQoKGEsIGIpPT5hIC0gYlxuKTtcbmZ1bmN0aW9uIGdldFdpZHRocyh3aWR0aCwgbGF5b3V0LCBzaXplcykge1xuICAgIGlmIChzaXplcyAmJiAobGF5b3V0ID09PSAnZmlsbCcgfHwgbGF5b3V0ID09PSAncmVzcG9uc2l2ZScpKSB7XG4gICAgICAgIC8vIEZpbmQgYWxsIHRoZSBcInZ3XCIgcGVyY2VudCBzaXplcyB1c2VkIGluIHRoZSBzaXplcyBwcm9wXG4gICAgICAgIGNvbnN0IHZpZXdwb3J0V2lkdGhSZSA9IC8oXnxcXHMpKDE/XFxkP1xcZCl2dy9nO1xuICAgICAgICBjb25zdCBwZXJjZW50U2l6ZXMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBtYXRjaDsgbWF0Y2ggPSB2aWV3cG9ydFdpZHRoUmUuZXhlYyhzaXplcyk7IG1hdGNoKXtcbiAgICAgICAgICAgIHBlcmNlbnRTaXplcy5wdXNoKHBhcnNlSW50KG1hdGNoWzJdKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBlcmNlbnRTaXplcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHNtYWxsZXN0UmF0aW8gPSBNYXRoLm1pbiguLi5wZXJjZW50U2l6ZXMpICogMC4wMTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgd2lkdGhzOiBhbGxTaXplcy5maWx0ZXIoKHMpPT5zID49IGNvbmZpZ0RldmljZVNpemVzWzBdICogc21hbGxlc3RSYXRpb1xuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAga2luZDogJ3cnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aHM6IGFsbFNpemVzLFxuICAgICAgICAgICAga2luZDogJ3cnXG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2lkdGggIT09ICdudW1iZXInIHx8IGxheW91dCA9PT0gJ2ZpbGwnIHx8IGxheW91dCA9PT0gJ3Jlc3BvbnNpdmUnKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aHM6IGNvbmZpZ0RldmljZVNpemVzLFxuICAgICAgICAgICAga2luZDogJ3cnXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHdpZHRocyA9IFtcbiAgICAgICAgLi4ubmV3IFNldCgvLyA+IFRoaXMgbWVhbnMgdGhhdCBtb3N0IE9MRUQgc2NyZWVucyB0aGF0IHNheSB0aGV5IGFyZSAzeCByZXNvbHV0aW9uLFxuICAgICAgICAvLyA+IGFyZSBhY3R1YWxseSAzeCBpbiB0aGUgZ3JlZW4gY29sb3IsIGJ1dCBvbmx5IDEuNXggaW4gdGhlIHJlZCBhbmRcbiAgICAgICAgLy8gPiBibHVlIGNvbG9ycy4gU2hvd2luZyBhIDN4IHJlc29sdXRpb24gaW1hZ2UgaW4gdGhlIGFwcCB2cyBhIDJ4XG4gICAgICAgIC8vID4gcmVzb2x1dGlvbiBpbWFnZSB3aWxsIGJlIHZpc3VhbGx5IHRoZSBzYW1lLCB0aG91Z2ggdGhlIDN4IGltYWdlXG4gICAgICAgIC8vID4gdGFrZXMgc2lnbmlmaWNhbnRseSBtb3JlIGRhdGEuIEV2ZW4gdHJ1ZSAzeCByZXNvbHV0aW9uIHNjcmVlbnMgYXJlXG4gICAgICAgIC8vID4gd2FzdGVmdWwgYXMgdGhlIGh1bWFuIGV5ZSBjYW5ub3Qgc2VlIHRoYXQgbGV2ZWwgb2YgZGV0YWlsIHdpdGhvdXRcbiAgICAgICAgLy8gPiBzb21ldGhpbmcgbGlrZSBhIG1hZ25pZnlpbmcgZ2xhc3MuXG4gICAgICAgIC8vIGh0dHBzOi8vYmxvZy50d2l0dGVyLmNvbS9lbmdpbmVlcmluZy9lbl91cy90b3BpY3MvaW5mcmFzdHJ1Y3R1cmUvMjAxOS9jYXBwaW5nLWltYWdlLWZpZGVsaXR5LW9uLXVsdHJhLWhpZ2gtcmVzb2x1dGlvbi1kZXZpY2VzLmh0bWxcbiAgICAgICAgW1xuICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICB3aWR0aCAqIDIgLyosIHdpZHRoICogMyovIFxuICAgICAgICBdLm1hcCgodyk9PmFsbFNpemVzLmZpbmQoKHApPT5wID49IHdcbiAgICAgICAgICAgICkgfHwgYWxsU2l6ZXNbYWxsU2l6ZXMubGVuZ3RoIC0gMV1cbiAgICAgICAgKSksIFxuICAgIF07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGhzLFxuICAgICAgICBraW5kOiAneCdcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVJbWdBdHRycyh7IHNyYyAsIHVub3B0aW1pemVkICwgbGF5b3V0ICwgd2lkdGggLCBxdWFsaXR5ICwgc2l6ZXMgLCBsb2FkZXIgIH0pIHtcbiAgICBpZiAodW5vcHRpbWl6ZWQpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNyYyxcbiAgICAgICAgICAgIHNyY1NldDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgc2l6ZXM6IHVuZGVmaW5lZFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB7IHdpZHRocyAsIGtpbmQgIH0gPSBnZXRXaWR0aHMod2lkdGgsIGxheW91dCwgc2l6ZXMpO1xuICAgIGNvbnN0IGxhc3QgPSB3aWR0aHMubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaXplczogIXNpemVzICYmIGtpbmQgPT09ICd3JyA/ICcxMDB2dycgOiBzaXplcyxcbiAgICAgICAgc3JjU2V0OiB3aWR0aHMubWFwKCh3LCBpKT0+YCR7bG9hZGVyKHtcbiAgICAgICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICAgICAgcXVhbGl0eSxcbiAgICAgICAgICAgICAgICB3aWR0aDogd1xuICAgICAgICAgICAgfSl9ICR7a2luZCA9PT0gJ3cnID8gdyA6IGkgKyAxfSR7a2luZH1gXG4gICAgICAgICkuam9pbignLCAnKSxcbiAgICAgICAgLy8gSXQncyBpbnRlbmRlZCB0byBrZWVwIGBzcmNgIHRoZSBsYXN0IGF0dHJpYnV0ZSBiZWNhdXNlIFJlYWN0IHVwZGF0ZXNcbiAgICAgICAgLy8gYXR0cmlidXRlcyBpbiBvcmRlci4gSWYgd2Uga2VlcCBgc3JjYCB0aGUgZmlyc3Qgb25lLCBTYWZhcmkgd2lsbFxuICAgICAgICAvLyBpbW1lZGlhdGVseSBzdGFydCB0byBmZXRjaCBgc3JjYCwgYmVmb3JlIGBzaXplc2AgYW5kIGBzcmNTZXRgIGFyZSBldmVuXG4gICAgICAgIC8vIHVwZGF0ZWQgYnkgUmVhY3QuIFRoYXQgY2F1c2VzIG11bHRpcGxlIHVubmVjZXNzYXJ5IHJlcXVlc3RzIGlmIGBzcmNTZXRgXG4gICAgICAgIC8vIGFuZCBgc2l6ZXNgIGFyZSBkZWZpbmVkLlxuICAgICAgICAvLyBUaGlzIGJ1ZyBjYW5ub3QgYmUgcmVwcm9kdWNlZCBpbiBDaHJvbWUgb3IgRmlyZWZveC5cbiAgICAgICAgc3JjOiBsb2FkZXIoe1xuICAgICAgICAgICAgc3JjLFxuICAgICAgICAgICAgcXVhbGl0eSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aHNbbGFzdF1cbiAgICAgICAgfSlcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0SW50KHgpIHtcbiAgICBpZiAodHlwZW9mIHggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiB4O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh4LCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBkZWZhdWx0SW1hZ2VMb2FkZXIobG9hZGVyUHJvcHMpIHtcbiAgICBjb25zdCBsb2FkID0gbG9hZGVycy5nZXQoY29uZmlnTG9hZGVyKTtcbiAgICBpZiAobG9hZCkge1xuICAgICAgICByZXR1cm4gbG9hZChfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgICAgIHJvb3Q6IGNvbmZpZ1BhdGhcbiAgICAgICAgfSwgbG9hZGVyUHJvcHMpKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIFwibG9hZGVyXCIgZm91bmQgaW4gXCJuZXh0LmNvbmZpZy5qc1wiLiBFeHBlY3RlZDogJHtfaW1hZ2VDb25maWcuVkFMSURfTE9BREVSUy5qb2luKCcsICcpfS4gUmVjZWl2ZWQ6ICR7Y29uZmlnTG9hZGVyfWApO1xufVxuLy8gU2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8zOTc3NzgzMy8yNjY1MzUgZm9yIHdoeSB3ZSB1c2UgdGhpcyByZWZcbi8vIGhhbmRsZXIgaW5zdGVhZCBvZiB0aGUgaW1nJ3Mgb25Mb2FkIGF0dHJpYnV0ZS5cbmZ1bmN0aW9uIGhhbmRsZUxvYWRpbmcoaW1nLCBzcmMsIGxheW91dCwgcGxhY2Vob2xkZXIsIG9uTG9hZGluZ0NvbXBsZXRlKSB7XG4gICAgaWYgKCFpbWcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBoYW5kbGVMb2FkID0gKCk9PntcbiAgICAgICAgaWYgKCFpbWcuc3JjLnN0YXJ0c1dpdGgoJ2RhdGE6JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHAgPSAnZGVjb2RlJyBpbiBpbWcgPyBpbWcuZGVjb2RlKCkgOiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICAgIHAuY2F0Y2goKCk9PntcbiAgICAgICAgICAgIH0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIgPT09ICdibHVyJykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuZmlsdGVyID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgICAgIGltZy5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnbm9uZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxvYWRlZEltYWdlVVJMcy5hZGQoc3JjKTtcbiAgICAgICAgICAgICAgICBpZiAob25Mb2FkaW5nQ29tcGxldGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyBuYXR1cmFsV2lkdGggLCBuYXR1cmFsSGVpZ2h0ICB9ID0gaW1nO1xuICAgICAgICAgICAgICAgICAgICAvLyBQYXNzIGJhY2sgcmVhZC1vbmx5IHByaW1pdGl2ZSB2YWx1ZXMgYnV0IG5vdCB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kZXJseWluZyBET00gZWxlbWVudCBiZWNhdXNlIGl0IGNvdWxkIGJlIG1pc3VzZWQuXG4gICAgICAgICAgICAgICAgICAgIG9uTG9hZGluZ0NvbXBsZXRlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdHVyYWxXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdHVyYWxIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWY7XG4gICAgICAgICAgICAgICAgICAgIGlmICgocmVmID0gaW1nLnBhcmVudEVsZW1lbnQpID09PSBudWxsIHx8IHJlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmVudCA9IGdldENvbXB1dGVkU3R5bGUoaW1nLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGF5b3V0ID09PSAncmVzcG9uc2l2ZScgJiYgcGFyZW50LmRpc3BsYXkgPT09ICdmbGV4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBtYXkgbm90IHJlbmRlciBwcm9wZXJseSBhcyBhIGNoaWxkIG9mIGEgZmxleCBjb250YWluZXIuIENvbnNpZGVyIHdyYXBwaW5nIHRoZSBpbWFnZSB3aXRoIGEgZGl2IHRvIGNvbmZpZ3VyZSB0aGUgd2lkdGguYCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxheW91dCA9PT0gJ2ZpbGwnICYmIHBhcmVudC5wb3NpdGlvbiAhPT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBtYXkgbm90IHJlbmRlciBwcm9wZXJseSB3aXRoIGEgcGFyZW50IHVzaW5nIHBvc2l0aW9uOlwiJHtwYXJlbnQucG9zaXRpb259XCIuIENvbnNpZGVyIGNoYW5naW5nIHRoZSBwYXJlbnQgc3R5bGUgdG8gcG9zaXRpb246XCJyZWxhdGl2ZVwiIHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LmApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlmIChpbWcuY29tcGxldGUpIHtcbiAgICAgICAgLy8gSWYgdGhlIHJlYWwgaW1hZ2UgZmFpbHMgdG8gbG9hZCwgdGhpcyB3aWxsIHN0aWxsIHJlbW92ZSB0aGUgcGxhY2Vob2xkZXIuXG4gICAgICAgIC8vIFRoaXMgaXMgdGhlIGRlc2lyZWQgYmVoYXZpb3IgZm9yIG5vdywgYW5kIHdpbGwgYmUgcmV2aXNpdGVkIHdoZW4gZXJyb3JcbiAgICAgICAgLy8gaGFuZGxpbmcgaXMgd29ya2VkIG9uIGZvciB0aGUgaW1hZ2UgY29tcG9uZW50IGl0c2VsZi5cbiAgICAgICAgaGFuZGxlTG9hZCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGltZy5vbmxvYWQgPSBoYW5kbGVMb2FkO1xuICAgIH1cbn1cbmZ1bmN0aW9uIEltYWdlMShfcGFyYW0pIHtcbiAgICB2YXIgeyBzcmMgLCBzaXplcyAsIHVub3B0aW1pemVkID1mYWxzZSAsIHByaW9yaXR5ID1mYWxzZSAsIGxvYWRpbmcgLCBsYXp5Qm91bmRhcnkgPScyMDBweCcgLCBjbGFzc05hbWUgLCBxdWFsaXR5ICwgd2lkdGggLCBoZWlnaHQgLCBvYmplY3RGaXQgLCBvYmplY3RQb3NpdGlvbiAsIG9uTG9hZGluZ0NvbXBsZXRlICwgbG9hZGVyID1kZWZhdWx0SW1hZ2VMb2FkZXIgLCBwbGFjZWhvbGRlciA9J2VtcHR5JyAsIGJsdXJEYXRhVVJMICB9ID0gX3BhcmFtLCBhbGwgPSBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoX3BhcmFtLCBbXCJzcmNcIiwgXCJzaXplc1wiLCBcInVub3B0aW1pemVkXCIsIFwicHJpb3JpdHlcIiwgXCJsb2FkaW5nXCIsIFwibGF6eUJvdW5kYXJ5XCIsIFwiY2xhc3NOYW1lXCIsIFwicXVhbGl0eVwiLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCIsIFwib2JqZWN0Rml0XCIsIFwib2JqZWN0UG9zaXRpb25cIiwgXCJvbkxvYWRpbmdDb21wbGV0ZVwiLCBcImxvYWRlclwiLCBcInBsYWNlaG9sZGVyXCIsIFwiYmx1ckRhdGFVUkxcIl0pO1xuICAgIGxldCByZXN0ID0gYWxsO1xuICAgIGxldCBsYXlvdXQgPSBzaXplcyA/ICdyZXNwb25zaXZlJyA6ICdpbnRyaW5zaWMnO1xuICAgIGlmICgnbGF5b3V0JyBpbiByZXN0KSB7XG4gICAgICAgIC8vIE92ZXJyaWRlIGRlZmF1bHQgbGF5b3V0IGlmIHRoZSB1c2VyIHNwZWNpZmllZCBvbmU6XG4gICAgICAgIGlmIChyZXN0LmxheW91dCkgbGF5b3V0ID0gcmVzdC5sYXlvdXQ7XG4gICAgICAgIC8vIFJlbW92ZSBwcm9wZXJ0eSBzbyBpdCdzIG5vdCBzcHJlYWQgaW50byBpbWFnZTpcbiAgICAgICAgZGVsZXRlIHJlc3RbJ2xheW91dCddO1xuICAgIH1cbiAgICBsZXQgc3RhdGljU3JjID0gJyc7XG4gICAgaWYgKGlzU3RhdGljSW1wb3J0KHNyYykpIHtcbiAgICAgICAgY29uc3Qgc3RhdGljSW1hZ2VEYXRhID0gaXNTdGF0aWNSZXF1aXJlKHNyYykgPyBzcmMuZGVmYXVsdCA6IHNyYztcbiAgICAgICAgaWYgKCFzdGF0aWNJbWFnZURhdGEuc3JjKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIG9iamVjdCBzaG91bGQgb25seSBiZSBwYXNzZWQgdG8gdGhlIGltYWdlIGNvbXBvbmVudCBzcmMgcGFyYW1ldGVyIGlmIGl0IGNvbWVzIGZyb20gYSBzdGF0aWMgaW1hZ2UgaW1wb3J0LiBJdCBtdXN0IGluY2x1ZGUgc3JjLiBSZWNlaXZlZCAke0pTT04uc3RyaW5naWZ5KHN0YXRpY0ltYWdlRGF0YSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgYmx1ckRhdGFVUkwgPSBibHVyRGF0YVVSTCB8fCBzdGF0aWNJbWFnZURhdGEuYmx1ckRhdGFVUkw7XG4gICAgICAgIHN0YXRpY1NyYyA9IHN0YXRpY0ltYWdlRGF0YS5zcmM7XG4gICAgICAgIGlmICghbGF5b3V0IHx8IGxheW91dCAhPT0gJ2ZpbGwnKSB7XG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgfHwgc3RhdGljSW1hZ2VEYXRhLmhlaWdodDtcbiAgICAgICAgICAgIHdpZHRoID0gd2lkdGggfHwgc3RhdGljSW1hZ2VEYXRhLndpZHRoO1xuICAgICAgICAgICAgaWYgKCFzdGF0aWNJbWFnZURhdGEuaGVpZ2h0IHx8ICFzdGF0aWNJbWFnZURhdGEud2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEFuIG9iamVjdCBzaG91bGQgb25seSBiZSBwYXNzZWQgdG8gdGhlIGltYWdlIGNvbXBvbmVudCBzcmMgcGFyYW1ldGVyIGlmIGl0IGNvbWVzIGZyb20gYSBzdGF0aWMgaW1hZ2UgaW1wb3J0LiBJdCBtdXN0IGluY2x1ZGUgaGVpZ2h0IGFuZCB3aWR0aC4gUmVjZWl2ZWQgJHtKU09OLnN0cmluZ2lmeShzdGF0aWNJbWFnZURhdGEpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHNyYyA9IHR5cGVvZiBzcmMgPT09ICdzdHJpbmcnID8gc3JjIDogc3RhdGljU3JjO1xuICAgIGNvbnN0IHdpZHRoSW50ID0gZ2V0SW50KHdpZHRoKTtcbiAgICBjb25zdCBoZWlnaHRJbnQgPSBnZXRJbnQoaGVpZ2h0KTtcbiAgICBjb25zdCBxdWFsaXR5SW50ID0gZ2V0SW50KHF1YWxpdHkpO1xuICAgIGxldCBpc0xhenkgPSAhcHJpb3JpdHkgJiYgKGxvYWRpbmcgPT09ICdsYXp5JyB8fCB0eXBlb2YgbG9hZGluZyA9PT0gJ3VuZGVmaW5lZCcpO1xuICAgIGlmIChzcmMuc3RhcnRzV2l0aCgnZGF0YTonKSB8fCBzcmMuc3RhcnRzV2l0aCgnYmxvYjonKSkge1xuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9IVFRQL0Jhc2ljc19vZl9IVFRQL0RhdGFfVVJJc1xuICAgICAgICB1bm9wdGltaXplZCA9IHRydWU7XG4gICAgICAgIGlzTGF6eSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgbG9hZGVkSW1hZ2VVUkxzLmhhcyhzcmMpKSB7XG4gICAgICAgIGlzTGF6eSA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSBpcyBtaXNzaW5nIHJlcXVpcmVkIFwic3JjXCIgcHJvcGVydHkuIE1ha2Ugc3VyZSB5b3UgcGFzcyBcInNyY1wiIGluIHByb3BzIHRvIHRoZSBcXGBuZXh0L2ltYWdlXFxgIGNvbXBvbmVudC4gUmVjZWl2ZWQ6ICR7SlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICAgICAgICBxdWFsaXR5XG4gICAgICAgICAgICB9KX1gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIVZBTElEX0xBWU9VVF9WQUxVRVMuaW5jbHVkZXMobGF5b3V0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibGF5b3V0XCIgcHJvcGVydHkuIFByb3ZpZGVkIFwiJHtsYXlvdXR9XCIgc2hvdWxkIGJlIG9uZSBvZiAke1ZBTElEX0xBWU9VVF9WQUxVRVMubWFwKFN0cmluZykuam9pbignLCcpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHdpZHRoSW50ICE9PSAndW5kZWZpbmVkJyAmJiBpc05hTih3aWR0aEludCkgfHwgdHlwZW9mIGhlaWdodEludCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNOYU4oaGVpZ2h0SW50KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwid2lkdGhcIiBvciBcImhlaWdodFwiIHByb3BlcnR5LiBUaGVzZSBzaG91bGQgYmUgbnVtZXJpYyB2YWx1ZXMuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxheW91dCA9PT0gJ2ZpbGwnICYmICh3aWR0aCB8fCBoZWlnaHQpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgYW5kIFwibGF5b3V0PSdmaWxsJ1wiIGhhcyB1bnVzZWQgcHJvcGVydGllcyBhc3NpZ25lZC4gUGxlYXNlIHJlbW92ZSBcIndpZHRoXCIgYW5kIFwiaGVpZ2h0XCIuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFWQUxJRF9MT0FESU5HX1ZBTFVFUy5pbmNsdWRlcyhsb2FkaW5nKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGhhcyBpbnZhbGlkIFwibG9hZGluZ1wiIHByb3BlcnR5LiBQcm92aWRlZCBcIiR7bG9hZGluZ31cIiBzaG91bGQgYmUgb25lIG9mICR7VkFMSURfTE9BRElOR19WQUxVRVMubWFwKFN0cmluZykuam9pbignLCcpfS5gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJpb3JpdHkgJiYgbG9hZGluZyA9PT0gJ2xhenknKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaGFzIGJvdGggXCJwcmlvcml0eVwiIGFuZCBcImxvYWRpbmc9J2xhenknXCIgcHJvcGVydGllcy4gT25seSBvbmUgc2hvdWxkIGJlIHVzZWQuYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyID09PSAnYmx1cicpIHtcbiAgICAgICAgICAgIGlmIChsYXlvdXQgIT09ICdmaWxsJyAmJiAod2lkdGhJbnQgfHwgMCkgKiAoaGVpZ2h0SW50IHx8IDApIDwgMTYwMCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBpcyBzbWFsbGVyIHRoYW4gNDB4NDAuIENvbnNpZGVyIHJlbW92aW5nIHRoZSBcInBsYWNlaG9sZGVyPSdibHVyJ1wiIHByb3BlcnR5IHRvIGltcHJvdmUgcGVyZm9ybWFuY2UuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWJsdXJEYXRhVVJMKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgVkFMSURfQkxVUl9FWFQgPSBbXG4gICAgICAgICAgICAgICAgICAgICdqcGVnJyxcbiAgICAgICAgICAgICAgICAgICAgJ3BuZycsXG4gICAgICAgICAgICAgICAgICAgICd3ZWJwJ1xuICAgICAgICAgICAgICAgIF0gLy8gc2hvdWxkIG1hdGNoIG5leHQtaW1hZ2UtbG9hZGVyXG4gICAgICAgICAgICAgICAgO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgXCJwbGFjZWhvbGRlcj0nYmx1cidcIiBwcm9wZXJ0eSBidXQgaXMgbWlzc2luZyB0aGUgXCJibHVyRGF0YVVSTFwiIHByb3BlcnR5LlxuICAgICAgICAgIFBvc3NpYmxlIHNvbHV0aW9uczpcbiAgICAgICAgICAgIC0gQWRkIGEgXCJibHVyRGF0YVVSTFwiIHByb3BlcnR5LCB0aGUgY29udGVudHMgc2hvdWxkIGJlIGEgc21hbGwgRGF0YSBVUkwgdG8gcmVwcmVzZW50IHRoZSBpbWFnZVxuICAgICAgICAgICAgLSBDaGFuZ2UgdGhlIFwic3JjXCIgcHJvcGVydHkgdG8gYSBzdGF0aWMgaW1wb3J0IHdpdGggb25lIG9mIHRoZSBzdXBwb3J0ZWQgZmlsZSB0eXBlczogJHtWQUxJRF9CTFVSX0VYVC5qb2luKCcsJyl9XG4gICAgICAgICAgICAtIFJlbW92ZSB0aGUgXCJwbGFjZWhvbGRlclwiIHByb3BlcnR5LCBlZmZlY3RpdmVseSBubyBibHVyIGVmZmVjdFxuICAgICAgICAgIFJlYWQgbW9yZTogaHR0cHM6Ly9uZXh0anMub3JnL2RvY3MvbWVzc2FnZXMvcGxhY2Vob2xkZXItYmx1ci1kYXRhLXVybGApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICgncmVmJyBpbiByZXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oYEltYWdlIHdpdGggc3JjIFwiJHtzcmN9XCIgaXMgdXNpbmcgdW5zdXBwb3J0ZWQgXCJyZWZcIiBwcm9wZXJ0eS4gQ29uc2lkZXIgdXNpbmcgdGhlIFwib25Mb2FkaW5nQ29tcGxldGVcIiBwcm9wZXJ0eSBpbnN0ZWFkLmApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgnc3R5bGUnIGluIHJlc3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBpcyB1c2luZyB1bnN1cHBvcnRlZCBcInN0eWxlXCIgcHJvcGVydHkuIFBsZWFzZSB1c2UgdGhlIFwiY2xhc3NOYW1lXCIgcHJvcGVydHkgaW5zdGVhZC5gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMCkgKyAxMDA7XG4gICAgICAgIGlmICghdW5vcHRpbWl6ZWQgJiYgIWxvYWRlcih7XG4gICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICB3aWR0aDogcmFuZCxcbiAgICAgICAgICAgIHF1YWxpdHk6IDc1XG4gICAgICAgIH0pLmluY2x1ZGVzKHJhbmQudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihgSW1hZ2Ugd2l0aCBzcmMgXCIke3NyY31cIiBoYXMgYSBcImxvYWRlclwiIHByb3BlcnR5IHRoYXQgZG9lcyBub3QgaW1wbGVtZW50IHdpZHRoLiBQbGVhc2UgaW1wbGVtZW50IGl0IG9yIHVzZSB0aGUgXCJ1bm9wdGltaXplZFwiIHByb3BlcnR5IGluc3RlYWQuYCArIGBcXG5SZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaW1hZ2UtbWlzc2luZy1sb2FkZXItd2lkdGhgKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBbc2V0UmVmLCBpc0ludGVyc2VjdGVkXSA9ICgwLCBfdXNlSW50ZXJzZWN0aW9uKS51c2VJbnRlcnNlY3Rpb24oe1xuICAgICAgICByb290TWFyZ2luOiBsYXp5Qm91bmRhcnksXG4gICAgICAgIGRpc2FibGVkOiAhaXNMYXp5XG4gICAgfSk7XG4gICAgY29uc3QgaXNWaXNpYmxlID0gIWlzTGF6eSB8fCBpc0ludGVyc2VjdGVkO1xuICAgIGxldCB3cmFwcGVyU3R5bGU7XG4gICAgbGV0IHNpemVyU3R5bGU7XG4gICAgbGV0IHNpemVyU3ZnO1xuICAgIGxldCBpbWdTdHlsZSA9IHtcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIHRvcDogMCxcbiAgICAgICAgbGVmdDogMCxcbiAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICByaWdodDogMCxcbiAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICBtYXJnaW46ICdhdXRvJyxcbiAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgIGhlaWdodDogMCxcbiAgICAgICAgbWluV2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgICAgbWluSGVpZ2h0OiAnMTAwJScsXG4gICAgICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgICAgICBvYmplY3RGaXQsXG4gICAgICAgIG9iamVjdFBvc2l0aW9uXG4gICAgfTtcbiAgICBjb25zdCBibHVyU3R5bGUgPSBwbGFjZWhvbGRlciA9PT0gJ2JsdXInID8ge1xuICAgICAgICBmaWx0ZXI6ICdibHVyKDIwcHgpJyxcbiAgICAgICAgYmFja2dyb3VuZFNpemU6IG9iamVjdEZpdCB8fCAnY292ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoXCIke2JsdXJEYXRhVVJMfVwiKWAsXG4gICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogb2JqZWN0UG9zaXRpb24gfHwgJzAlIDAlJ1xuICAgIH0gOiB7XG4gICAgfTtcbiAgICBpZiAobGF5b3V0ID09PSAnZmlsbCcpIHtcbiAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgbGF5b3V0PVwiZmlsbFwiIC8+XG4gICAgICAgIHdyYXBwZXJTdHlsZSA9IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICBib3R0b206IDAsXG4gICAgICAgICAgICByaWdodDogMCxcbiAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgbWFyZ2luOiAwXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygd2lkdGhJbnQgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBoZWlnaHRJbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgLz5cbiAgICAgICAgY29uc3QgcXVvdGllbnQgPSBoZWlnaHRJbnQgLyB3aWR0aEludDtcbiAgICAgICAgY29uc3QgcGFkZGluZ1RvcCA9IGlzTmFOKHF1b3RpZW50KSA/ICcxMDAlJyA6IGAke3F1b3RpZW50ICogMTAwfSVgO1xuICAgICAgICBpZiAobGF5b3V0ID09PSAncmVzcG9uc2l2ZScpIHtcbiAgICAgICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwicmVzcG9uc2l2ZVwiIC8+XG4gICAgICAgICAgICB3cmFwcGVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgbWFyZ2luOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2l6ZXJTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIHBhZGRpbmdUb3BcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAobGF5b3V0ID09PSAnaW50cmluc2ljJykge1xuICAgICAgICAgICAgLy8gPEltYWdlIHNyYz1cImkucG5nXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiBsYXlvdXQ9XCJpbnRyaW5zaWNcIiAvPlxuICAgICAgICAgICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLFxuICAgICAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHNpemVyU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICAgICAgICAgICAgICBtYXhXaWR0aDogJzEwMCUnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgc2l6ZXJTdmcgPSBgPHN2ZyB3aWR0aD1cIiR7d2lkdGhJbnR9XCIgaGVpZ2h0PVwiJHtoZWlnaHRJbnR9XCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZlcnNpb249XCIxLjFcIi8+YDtcbiAgICAgICAgfSBlbHNlIGlmIChsYXlvdXQgPT09ICdmaXhlZCcpIHtcbiAgICAgICAgICAgIC8vIDxJbWFnZSBzcmM9XCJpLnBuZ1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgbGF5b3V0PVwiZml4ZWRcIiAvPlxuICAgICAgICAgICAgd3JhcHBlclN0eWxlID0ge1xuICAgICAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGhJbnQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRJbnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyA8SW1hZ2Ugc3JjPVwiaS5wbmdcIiAvPlxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIG11c3QgdXNlIFwid2lkdGhcIiBhbmQgXCJoZWlnaHRcIiBwcm9wZXJ0aWVzIG9yIFwibGF5b3V0PSdmaWxsJ1wiIHByb3BlcnR5LmApO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBpbWdBdHRyaWJ1dGVzID0ge1xuICAgICAgICBzcmM6ICdkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQUFBQUFBUC8vL3lINUJBRUFBQUFBTEFBQUFBQUJBQUVBQUFJQlJBQTcnLFxuICAgICAgICBzcmNTZXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc2l6ZXM6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgICBpbWdBdHRyaWJ1dGVzID0gZ2VuZXJhdGVJbWdBdHRycyh7XG4gICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICB1bm9wdGltaXplZCxcbiAgICAgICAgICAgIGxheW91dCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aEludCxcbiAgICAgICAgICAgIHF1YWxpdHk6IHF1YWxpdHlJbnQsXG4gICAgICAgICAgICBzaXplcyxcbiAgICAgICAgICAgIGxvYWRlclxuICAgICAgICB9KTtcbiAgICB9XG4gICAgbGV0IHNyY1N0cmluZyA9IHNyYztcbiAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiZGl2XCIsIHtcbiAgICAgICAgc3R5bGU6IHdyYXBwZXJTdHlsZVxuICAgIH0sIHNpemVyU3R5bGUgPyAvKiNfX1BVUkVfXyovIF9yZWFjdC5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwge1xuICAgICAgICBzdHlsZTogc2l6ZXJTdHlsZVxuICAgIH0sIHNpemVyU3ZnID8gLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHtcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIG1heFdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBwYWRkaW5nOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGFsdDogXCJcIixcbiAgICAgICAgXCJhcmlhLWhpZGRlblwiOiB0cnVlLFxuICAgICAgICBzcmM6IGBkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCR7KDAsIF90b0Jhc2U2NCkudG9CYXNlNjQoc2l6ZXJTdmcpfWBcbiAgICB9KSA6IG51bGwpIDogbnVsbCwgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIE9iamVjdC5hc3NpZ24oe1xuICAgIH0sIHJlc3QsIGltZ0F0dHJpYnV0ZXMsIHtcbiAgICAgICAgZGVjb2Rpbmc6IFwiYXN5bmNcIixcbiAgICAgICAgXCJkYXRhLW5pbWdcIjogbGF5b3V0LFxuICAgICAgICBjbGFzc05hbWU6IGNsYXNzTmFtZSxcbiAgICAgICAgcmVmOiAoaW1nKT0+e1xuICAgICAgICAgICAgc2V0UmVmKGltZyk7XG4gICAgICAgICAgICBoYW5kbGVMb2FkaW5nKGltZywgc3JjU3RyaW5nLCBsYXlvdXQsIHBsYWNlaG9sZGVyLCBvbkxvYWRpbmdDb21wbGV0ZSk7XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiBfb2JqZWN0U3ByZWFkKHtcbiAgICAgICAgfSwgaW1nU3R5bGUsIGJsdXJTdHlsZSlcbiAgICB9KSksIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcIm5vc2NyaXB0XCIsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImltZ1wiLCBPYmplY3QuYXNzaWduKHtcbiAgICB9LCByZXN0LCBnZW5lcmF0ZUltZ0F0dHJzKHtcbiAgICAgICAgc3JjLFxuICAgICAgICB1bm9wdGltaXplZCxcbiAgICAgICAgbGF5b3V0LFxuICAgICAgICB3aWR0aDogd2lkdGhJbnQsXG4gICAgICAgIHF1YWxpdHk6IHF1YWxpdHlJbnQsXG4gICAgICAgIHNpemVzLFxuICAgICAgICBsb2FkZXJcbiAgICB9KSwge1xuICAgICAgICBkZWNvZGluZzogXCJhc3luY1wiLFxuICAgICAgICBcImRhdGEtbmltZ1wiOiBsYXlvdXQsXG4gICAgICAgIHN0eWxlOiBpbWdTdHlsZSxcbiAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgIGxvYWRpbmc6IGxvYWRpbmcgfHwgJ2xhenknXG4gICAgfSkpKSwgcHJpb3JpdHkgPyAvLyBOb3RlIGhvdyB3ZSBvbWl0IHRoZSBgaHJlZmAgYXR0cmlidXRlLCBhcyBpdCB3b3VsZCBvbmx5IGJlIHJlbGV2YW50XG4gICAgLy8gZm9yIGJyb3dzZXJzIHRoYXQgZG8gbm90IHN1cHBvcnQgYGltYWdlc3Jjc2V0YCwgYW5kIGluIHRob3NlIGNhc2VzXG4gICAgLy8gaXQgd291bGQgbGlrZWx5IGNhdXNlIHRoZSBpbmNvcnJlY3QgaW1hZ2UgdG8gYmUgcHJlbG9hZGVkLlxuICAgIC8vXG4gICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc2VtYW50aWNzLmh0bWwjYXR0ci1saW5rLWltYWdlc3Jjc2V0XG4gICAgLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KF9oZWFkLmRlZmF1bHQsIG51bGwsIC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY3JlYXRlRWxlbWVudChcImxpbmtcIiwge1xuICAgICAgICBrZXk6ICdfX25pbWctJyArIGltZ0F0dHJpYnV0ZXMuc3JjICsgaW1nQXR0cmlidXRlcy5zcmNTZXQgKyBpbWdBdHRyaWJ1dGVzLnNpemVzLFxuICAgICAgICByZWw6IFwicHJlbG9hZFwiLFxuICAgICAgICBhczogXCJpbWFnZVwiLFxuICAgICAgICBocmVmOiBpbWdBdHRyaWJ1dGVzLnNyY1NldCA/IHVuZGVmaW5lZCA6IGltZ0F0dHJpYnV0ZXMuc3JjLFxuICAgICAgICAvLyBAdHMtaWdub3JlOiBpbWFnZXNyY3NldCBpcyBub3QgeWV0IGluIHRoZSBsaW5rIGVsZW1lbnQgdHlwZS5cbiAgICAgICAgaW1hZ2VzcmNzZXQ6IGltZ0F0dHJpYnV0ZXMuc3JjU2V0LFxuICAgICAgICAvLyBAdHMtaWdub3JlOiBpbWFnZXNpemVzIGlzIG5vdCB5ZXQgaW4gdGhlIGxpbmsgZWxlbWVudCB0eXBlLlxuICAgICAgICBpbWFnZXNpemVzOiBpbWdBdHRyaWJ1dGVzLnNpemVzXG4gICAgfSkpIDogbnVsbCkpO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplU3JjKHNyYykge1xuICAgIHJldHVybiBzcmNbMF0gPT09ICcvJyA/IHNyYy5zbGljZSgxKSA6IHNyYztcbn1cbmZ1bmN0aW9uIGltZ2l4TG9hZGVyKHsgcm9vdCAsIHNyYyAsIHdpZHRoICwgcXVhbGl0eSAgfSkge1xuICAgIC8vIERlbW86IGh0dHBzOi8vc3RhdGljLmltZ2l4Lm5ldC9kYWlzeS5wbmc/YXV0bz1mb3JtYXQmZml0PW1heCZ3PTMwMFxuICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoYCR7cm9vdH0ke25vcm1hbGl6ZVNyYyhzcmMpfWApO1xuICAgIGNvbnN0IHBhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXM7XG4gICAgcGFyYW1zLnNldCgnYXV0bycsIHBhcmFtcy5nZXQoJ2F1dG8nKSB8fCAnZm9ybWF0Jyk7XG4gICAgcGFyYW1zLnNldCgnZml0JywgcGFyYW1zLmdldCgnZml0JykgfHwgJ21heCcpO1xuICAgIHBhcmFtcy5zZXQoJ3cnLCBwYXJhbXMuZ2V0KCd3JykgfHwgd2lkdGgudG9TdHJpbmcoKSk7XG4gICAgaWYgKHF1YWxpdHkpIHtcbiAgICAgICAgcGFyYW1zLnNldCgncScsIHF1YWxpdHkudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIHJldHVybiB1cmwuaHJlZjtcbn1cbmZ1bmN0aW9uIGFrYW1haUxvYWRlcih7IHJvb3QgLCBzcmMgLCB3aWR0aCAgfSkge1xuICAgIHJldHVybiBgJHtyb290fSR7bm9ybWFsaXplU3JjKHNyYyl9P2ltd2lkdGg9JHt3aWR0aH1gO1xufVxuZnVuY3Rpb24gY2xvdWRpbmFyeUxvYWRlcih7IHJvb3QgLCBzcmMgLCB3aWR0aCAsIHF1YWxpdHkgIH0pIHtcbiAgICAvLyBEZW1vOiBodHRwczovL3Jlcy5jbG91ZGluYXJ5LmNvbS9kZW1vL2ltYWdlL3VwbG9hZC93XzMwMCxjX2xpbWl0LHFfYXV0by90dXJ0bGVzLmpwZ1xuICAgIGNvbnN0IHBhcmFtcyA9IFtcbiAgICAgICAgJ2ZfYXV0bycsXG4gICAgICAgICdjX2xpbWl0JyxcbiAgICAgICAgJ3dfJyArIHdpZHRoLFxuICAgICAgICAncV8nICsgKHF1YWxpdHkgfHwgJ2F1dG8nKVxuICAgIF07XG4gICAgbGV0IHBhcmFtc1N0cmluZyA9IHBhcmFtcy5qb2luKCcsJykgKyAnLyc7XG4gICAgcmV0dXJuIGAke3Jvb3R9JHtwYXJhbXNTdHJpbmd9JHtub3JtYWxpemVTcmMoc3JjKX1gO1xufVxuZnVuY3Rpb24gY3VzdG9tTG9hZGVyKHsgc3JjICB9KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBJbWFnZSB3aXRoIHNyYyBcIiR7c3JjfVwiIGlzIG1pc3NpbmcgXCJsb2FkZXJcIiBwcm9wLmAgKyBgXFxuUmVhZCBtb3JlOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9uZXh0LWltYWdlLW1pc3NpbmctbG9hZGVyYCk7XG59XG5mdW5jdGlvbiBkZWZhdWx0TG9hZGVyKHsgcm9vdCAsIHNyYyAsIHdpZHRoICwgcXVhbGl0eSAgfSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIGNvbnN0IG1pc3NpbmdWYWx1ZXMgPSBbXTtcbiAgICAgICAgLy8gdGhlc2Ugc2hvdWxkIGFsd2F5cyBiZSBwcm92aWRlZCBidXQgbWFrZSBzdXJlIHRoZXkgYXJlXG4gICAgICAgIGlmICghc3JjKSBtaXNzaW5nVmFsdWVzLnB1c2goJ3NyYycpO1xuICAgICAgICBpZiAoIXdpZHRoKSBtaXNzaW5nVmFsdWVzLnB1c2goJ3dpZHRoJyk7XG4gICAgICAgIGlmIChtaXNzaW5nVmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV4dCBJbWFnZSBPcHRpbWl6YXRpb24gcmVxdWlyZXMgJHttaXNzaW5nVmFsdWVzLmpvaW4oJywgJyl9IHRvIGJlIHByb3ZpZGVkLiBNYWtlIHN1cmUgeW91IHBhc3MgdGhlbSBhcyBwcm9wcyB0byB0aGUgXFxgbmV4dC9pbWFnZVxcYCBjb21wb25lbnQuIFJlY2VpdmVkOiAke0pTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICBzcmMsXG4gICAgICAgICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgICAgICAgcXVhbGl0eVxuICAgICAgICAgICAgfSl9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyYy5zdGFydHNXaXRoKCcvLycpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBwYXJzZSBzcmMgXCIke3NyY31cIiBvbiBcXGBuZXh0L2ltYWdlXFxgLCBwcm90b2NvbC1yZWxhdGl2ZSBVUkwgKC8vKSBtdXN0IGJlIGNoYW5nZWQgdG8gYW4gYWJzb2x1dGUgVVJMIChodHRwOi8vIG9yIGh0dHBzOi8vKWApO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3JjLnN0YXJ0c1dpdGgoJy8nKSAmJiBjb25maWdEb21haW5zKSB7XG4gICAgICAgICAgICBsZXQgcGFyc2VkU3JjO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBwYXJzZWRTcmMgPSBuZXcgVVJMKHNyYyk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gcGFyc2Ugc3JjIFwiJHtzcmN9XCIgb24gXFxgbmV4dC9pbWFnZVxcYCwgaWYgdXNpbmcgcmVsYXRpdmUgaW1hZ2UgaXQgbXVzdCBzdGFydCB3aXRoIGEgbGVhZGluZyBzbGFzaCBcIi9cIiBvciBiZSBhbiBhYnNvbHV0ZSBVUkwgKGh0dHA6Ly8gb3IgaHR0cHM6Ly8pYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJiAhY29uZmlnRG9tYWlucy5pbmNsdWRlcyhwYXJzZWRTcmMuaG9zdG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHNyYyBwcm9wICgke3NyY30pIG9uIFxcYG5leHQvaW1hZ2VcXGAsIGhvc3RuYW1lIFwiJHtwYXJzZWRTcmMuaG9zdG5hbWV9XCIgaXMgbm90IGNvbmZpZ3VyZWQgdW5kZXIgaW1hZ2VzIGluIHlvdXIgXFxgbmV4dC5jb25maWcuanNcXGBcXG5gICsgYFNlZSBtb3JlIGluZm86IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL25leHQtaW1hZ2UtdW5jb25maWd1cmVkLWhvc3RgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYCR7cm9vdH0/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHNyYyl9Jnc9JHt3aWR0aH0mcT0ke3F1YWxpdHkgfHwgNzV9YDtcbn1cblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW1hZ2UuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF9yb3V0ZXIgPSByZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9yb3V0ZXIvcm91dGVyXCIpO1xudmFyIF9yb3V0ZXIxID0gcmVxdWlyZShcIi4vcm91dGVyXCIpO1xudmFyIF91c2VJbnRlcnNlY3Rpb24gPSByZXF1aXJlKFwiLi91c2UtaW50ZXJzZWN0aW9uXCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxuY29uc3QgcHJlZmV0Y2hlZCA9IHtcbn07XG5mdW5jdGlvbiBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCBvcHRpb25zKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8ICFyb3V0ZXIpIHJldHVybjtcbiAgICBpZiAoISgwLCBfcm91dGVyKS5pc0xvY2FsVVJMKGhyZWYpKSByZXR1cm47XG4gICAgLy8gUHJlZmV0Y2ggdGhlIEpTT04gcGFnZSBpZiBhc2tlZCAob25seSBpbiB0aGUgY2xpZW50KVxuICAgIC8vIFdlIG5lZWQgdG8gaGFuZGxlIGEgcHJlZmV0Y2ggZXJyb3IgaGVyZSBzaW5jZSB3ZSBtYXkgYmVcbiAgICAvLyBsb2FkaW5nIHdpdGggcHJpb3JpdHkgd2hpY2ggY2FuIHJlamVjdCBidXQgd2UgZG9uJ3RcbiAgICAvLyB3YW50IHRvIGZvcmNlIG5hdmlnYXRpb24gc2luY2UgdGhpcyBpcyBvbmx5IGEgcHJlZmV0Y2hcbiAgICByb3V0ZXIucHJlZmV0Y2goaHJlZiwgYXMsIG9wdGlvbnMpLmNhdGNoKChlcnIpPT57XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyByZXRocm93IHRvIHNob3cgaW52YWxpZCBVUkwgZXJyb3JzXG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBjdXJMb2NhbGUgPSBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmxvY2FsZSAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zLmxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlO1xuICAgIC8vIEpvaW4gb24gYW4gaW52YWxpZCBVUkkgY2hhcmFjdGVyXG4gICAgcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXSA9IHRydWU7XG59XG5mdW5jdGlvbiBpc01vZGlmaWVkRXZlbnQoZXZlbnQpIHtcbiAgICBjb25zdCB7IHRhcmdldCAgfSA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgcmV0dXJuIHRhcmdldCAmJiB0YXJnZXQgIT09ICdfc2VsZicgfHwgZXZlbnQubWV0YUtleSB8fCBldmVudC5jdHJsS2V5IHx8IGV2ZW50LnNoaWZ0S2V5IHx8IGV2ZW50LmFsdEtleSB8fCBldmVudC5uYXRpdmVFdmVudCAmJiBldmVudC5uYXRpdmVFdmVudC53aGljaCA9PT0gMjtcbn1cbmZ1bmN0aW9uIGxpbmtDbGlja2VkKGUsIHJvdXRlciwgaHJlZiwgYXMsIHJlcGxhY2UsIHNoYWxsb3csIHNjcm9sbCwgbG9jYWxlKSB7XG4gICAgY29uc3QgeyBub2RlTmFtZSAgfSA9IGUuY3VycmVudFRhcmdldDtcbiAgICBpZiAobm9kZU5hbWUgPT09ICdBJyAmJiAoaXNNb2RpZmllZEV2ZW50KGUpIHx8ICEoMCwgX3JvdXRlcikuaXNMb2NhbFVSTChocmVmKSkpIHtcbiAgICAgICAgLy8gaWdub3JlIGNsaWNrIGZvciBicm93c2Vy4oCZcyBkZWZhdWx0IGJlaGF2aW9yXG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vICBhdm9pZCBzY3JvbGwgZm9yIHVybHMgd2l0aCBhbmNob3IgcmVmc1xuICAgIGlmIChzY3JvbGwgPT0gbnVsbCAmJiBhcy5pbmRleE9mKCcjJykgPj0gMCkge1xuICAgICAgICBzY3JvbGwgPSBmYWxzZTtcbiAgICB9XG4gICAgLy8gcmVwbGFjZSBzdGF0ZSBpbnN0ZWFkIG9mIHB1c2ggaWYgcHJvcCBpcyBwcmVzZW50XG4gICAgcm91dGVyW3JlcGxhY2UgPyAncmVwbGFjZScgOiAncHVzaCddKGhyZWYsIGFzLCB7XG4gICAgICAgIHNoYWxsb3csXG4gICAgICAgIGxvY2FsZSxcbiAgICAgICAgc2Nyb2xsXG4gICAgfSk7XG59XG5mdW5jdGlvbiBMaW5rKHByb3BzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgZnVuY3Rpb24gY3JlYXRlUHJvcEVycm9yKGFyZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoYEZhaWxlZCBwcm9wIHR5cGU6IFRoZSBwcm9wIFxcYCR7YXJncy5rZXl9XFxgIGV4cGVjdHMgYSAke2FyZ3MuZXhwZWN0ZWR9IGluIFxcYDxMaW5rPlxcYCwgYnV0IGdvdCBcXGAke2FyZ3MuYWN0dWFsfVxcYCBpbnN0ZWFkLmAgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyBcIlxcbk9wZW4geW91ciBicm93c2VyJ3MgY29uc29sZSB0byB2aWV3IHRoZSBDb21wb25lbnQgc3RhY2sgdHJhY2UuXCIgOiAnJykpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgIGNvbnN0IHJlcXVpcmVkUHJvcHNHdWFyZCA9IHtcbiAgICAgICAgICAgIGhyZWY6IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVxdWlyZWRQcm9wcyA9IE9iamVjdC5rZXlzKHJlcXVpcmVkUHJvcHNHdWFyZCk7XG4gICAgICAgIHJlcXVpcmVkUHJvcHMuZm9yRWFjaCgoa2V5KT0+e1xuICAgICAgICAgICAgaWYgKGtleSA9PT0gJ2hyZWYnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gPT0gbnVsbCB8fCB0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHByb3BzW2tleV0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGNyZWF0ZVByb3BFcnJvcih7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgICAgICAgICBleHBlY3RlZDogJ2BzdHJpbmdgIG9yIGBvYmplY3RgJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogcHJvcHNba2V5XSA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiBwcm9wc1trZXldXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVHlwZVNjcmlwdCB0cmljayBmb3IgdHlwZS1ndWFyZGluZzpcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgICAgICAgICAgY29uc3QgXyA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgIGNvbnN0IG9wdGlvbmFsUHJvcHNHdWFyZCA9IHtcbiAgICAgICAgICAgIGFzOiB0cnVlLFxuICAgICAgICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgICAgICAgIHNjcm9sbDogdHJ1ZSxcbiAgICAgICAgICAgIHNoYWxsb3c6IHRydWUsXG4gICAgICAgICAgICBwYXNzSHJlZjogdHJ1ZSxcbiAgICAgICAgICAgIHByZWZldGNoOiB0cnVlLFxuICAgICAgICAgICAgbG9jYWxlOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG9wdGlvbmFsUHJvcHMgPSBPYmplY3Qua2V5cyhvcHRpb25hbFByb3BzR3VhcmQpO1xuICAgICAgICBvcHRpb25hbFByb3BzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgICAgIGNvbnN0IHZhbFR5cGUgPSB0eXBlb2YgcHJvcHNba2V5XTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdhcycpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHNba2V5XSAmJiB2YWxUeXBlICE9PSAnc3RyaW5nJyAmJiB2YWxUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdsb2NhbGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gJiYgdmFsVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2AnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSAncmVwbGFjZScgfHwga2V5ID09PSAnc2Nyb2xsJyB8fCBrZXkgPT09ICdzaGFsbG93JyB8fCBrZXkgPT09ICdwYXNzSHJlZicgfHwga2V5ID09PSAncHJlZmV0Y2gnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHByb3BzW2tleV0gIT0gbnVsbCAmJiB2YWxUeXBlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiAnYGJvb2xlYW5gJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnVzZWQtdmFyc1xuICAgICAgICAgICAgICAgIGNvbnN0IF8gPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBUaGlzIGhvb2sgaXMgaW4gYSBjb25kaXRpb25hbCBidXQgdGhhdCBpcyBvayBiZWNhdXNlIGBwcm9jZXNzLmVudi5OT0RFX0VOVmAgbmV2ZXIgY2hhbmdlc1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaG9va3MvcnVsZXMtb2YtaG9va3NcbiAgICAgICAgY29uc3QgaGFzV2FybmVkID0gX3JlYWN0LmRlZmF1bHQudXNlUmVmKGZhbHNlKTtcbiAgICAgICAgaWYgKHByb3BzLnByZWZldGNoICYmICFoYXNXYXJuZWQuY3VycmVudCkge1xuICAgICAgICAgICAgaGFzV2FybmVkLmN1cnJlbnQgPSB0cnVlO1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdOZXh0LmpzIGF1dG8tcHJlZmV0Y2hlcyBhdXRvbWF0aWNhbGx5IGJhc2VkIG9uIHZpZXdwb3J0LiBUaGUgcHJlZmV0Y2ggYXR0cmlidXRlIGlzIG5vIGxvbmdlciBuZWVkZWQuIE1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzL3ByZWZldGNoLXRydWUtZGVwcmVjYXRlZCcpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHAgPSBwcm9wcy5wcmVmZXRjaCAhPT0gZmFsc2U7XG4gICAgY29uc3Qgcm91dGVyID0gKDAsIF9yb3V0ZXIxKS51c2VSb3V0ZXIoKTtcbiAgICBjb25zdCB7IGhyZWYgLCBhcyAgfSA9IF9yZWFjdC5kZWZhdWx0LnVzZU1lbW8oKCk9PntcbiAgICAgICAgY29uc3QgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSAoMCwgX3JvdXRlcikucmVzb2x2ZUhyZWYocm91dGVyLCBwcm9wcy5ocmVmLCB0cnVlKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhyZWY6IHJlc29sdmVkSHJlZixcbiAgICAgICAgICAgIGFzOiBwcm9wcy5hcyA/ICgwLCBfcm91dGVyKS5yZXNvbHZlSHJlZihyb3V0ZXIsIHByb3BzLmFzKSA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmXG4gICAgICAgIH07XG4gICAgfSwgW1xuICAgICAgICByb3V0ZXIsXG4gICAgICAgIHByb3BzLmhyZWYsXG4gICAgICAgIHByb3BzLmFzXG4gICAgXSk7XG4gICAgbGV0IHsgY2hpbGRyZW4gLCByZXBsYWNlICwgc2hhbGxvdyAsIHNjcm9sbCAsIGxvY2FsZSAgfSA9IHByb3BzO1xuICAgIC8vIERlcHJlY2F0ZWQuIFdhcm5pbmcgc2hvd24gYnkgcHJvcFR5cGUgY2hlY2suIElmIHRoZSBjaGlsZHJlbiBwcm92aWRlZCBpcyBhIHN0cmluZyAoPExpbms+ZXhhbXBsZTwvTGluaz4pIHdlIHdyYXAgaXQgaW4gYW4gPGE+IHRhZ1xuICAgIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNoaWxkcmVuID0gLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KFwiYVwiLCBudWxsLCBjaGlsZHJlbik7XG4gICAgfVxuICAgIC8vIFRoaXMgd2lsbCByZXR1cm4gdGhlIGZpcnN0IGNoaWxkLCBpZiBtdWx0aXBsZSBhcmUgcHJvdmlkZWQgaXQgd2lsbCB0aHJvdyBhbiBlcnJvclxuICAgIGxldCBjaGlsZDtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNoaWxkID0gX3JlYWN0LmRlZmF1bHQuQ2hpbGRyZW4ub25seShjaGlsZHJlbik7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNdWx0aXBsZSBjaGlsZHJlbiB3ZXJlIHBhc3NlZCB0byA8TGluaz4gd2l0aCBcXGBocmVmXFxgIG9mIFxcYCR7cHJvcHMuaHJlZn1cXGAgYnV0IG9ubHkgb25lIGNoaWxkIGlzIHN1cHBvcnRlZCBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9saW5rLW11bHRpcGxlLWNoaWxkcmVuYCArICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IFwiIFxcbk9wZW4geW91ciBicm93c2VyJ3MgY29uc29sZSB0byB2aWV3IHRoZSBDb21wb25lbnQgc3RhY2sgdHJhY2UuXCIgOiAnJykpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBfcmVhY3QuZGVmYXVsdC5DaGlsZHJlbi5vbmx5KGNoaWxkcmVuKTtcbiAgICB9XG4gICAgY29uc3QgY2hpbGRSZWYgPSBjaGlsZCAmJiB0eXBlb2YgY2hpbGQgPT09ICdvYmplY3QnICYmIGNoaWxkLnJlZjtcbiAgICBjb25zdCBbc2V0SW50ZXJzZWN0aW9uUmVmLCBpc1Zpc2libGVdID0gKDAsIF91c2VJbnRlcnNlY3Rpb24pLnVzZUludGVyc2VjdGlvbih7XG4gICAgICAgIHJvb3RNYXJnaW46ICcyMDBweCdcbiAgICB9KTtcbiAgICBjb25zdCBzZXRSZWYgPSBfcmVhY3QuZGVmYXVsdC51c2VDYWxsYmFjaygoZWwpPT57XG4gICAgICAgIHNldEludGVyc2VjdGlvblJlZihlbCk7XG4gICAgICAgIGlmIChjaGlsZFJlZikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBjaGlsZFJlZiA9PT0gJ2Z1bmN0aW9uJykgY2hpbGRSZWYoZWwpO1xuICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGNoaWxkUmVmLmN1cnJlbnQgPSBlbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgY2hpbGRSZWYsXG4gICAgICAgIHNldEludGVyc2VjdGlvblJlZlxuICAgIF0pO1xuICAgIF9yZWFjdC5kZWZhdWx0LnVzZUVmZmVjdCgoKT0+e1xuICAgICAgICBjb25zdCBzaG91bGRQcmVmZXRjaCA9IGlzVmlzaWJsZSAmJiBwICYmICgwLCBfcm91dGVyKS5pc0xvY2FsVVJMKGhyZWYpO1xuICAgICAgICBjb25zdCBjdXJMb2NhbGUgPSB0eXBlb2YgbG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlO1xuICAgICAgICBjb25zdCBpc1ByZWZldGNoZWQgPSBwcmVmZXRjaGVkW2hyZWYgKyAnJScgKyBhcyArIChjdXJMb2NhbGUgPyAnJScgKyBjdXJMb2NhbGUgOiAnJyldO1xuICAgICAgICBpZiAoc2hvdWxkUHJlZmV0Y2ggJiYgIWlzUHJlZmV0Y2hlZCkge1xuICAgICAgICAgICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywge1xuICAgICAgICAgICAgICAgIGxvY2FsZTogY3VyTG9jYWxlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sIFtcbiAgICAgICAgYXMsXG4gICAgICAgIGhyZWYsXG4gICAgICAgIGlzVmlzaWJsZSxcbiAgICAgICAgbG9jYWxlLFxuICAgICAgICBwLFxuICAgICAgICByb3V0ZXJcbiAgICBdKTtcbiAgICBjb25zdCBjaGlsZFByb3BzID0ge1xuICAgICAgICByZWY6IHNldFJlZixcbiAgICAgICAgb25DbGljazogKGUpPT57XG4gICAgICAgICAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjaGlsZC5wcm9wcy5vbkNsaWNrKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgICAgICAgICBsaW5rQ2xpY2tlZChlLCByb3V0ZXIsIGhyZWYsIGFzLCByZXBsYWNlLCBzaGFsbG93LCBzY3JvbGwsIGxvY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGNoaWxkUHJvcHMub25Nb3VzZUVudGVyID0gKGUpPT57XG4gICAgICAgIGlmICghKDAsIF9yb3V0ZXIpLmlzTG9jYWxVUkwoaHJlZikpIHJldHVybjtcbiAgICAgICAgaWYgKGNoaWxkLnByb3BzICYmIHR5cGVvZiBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNoaWxkLnByb3BzLm9uTW91c2VFbnRlcihlKTtcbiAgICAgICAgfVxuICAgICAgICBwcmVmZXRjaChyb3V0ZXIsIGhyZWYsIGFzLCB7XG4gICAgICAgICAgICBwcmlvcml0eTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8vIElmIGNoaWxkIGlzIGFuIDxhPiB0YWcgYW5kIGRvZXNuJ3QgaGF2ZSBhIGhyZWYgYXR0cmlidXRlLCBvciBpZiB0aGUgJ3Bhc3NIcmVmJyBwcm9wZXJ0eSBpc1xuICAgIC8vIGRlZmluZWQsIHdlIHNwZWNpZnkgdGhlIGN1cnJlbnQgJ2hyZWYnLCBzbyB0aGF0IHJlcGV0aXRpb24gaXMgbm90IG5lZWRlZCBieSB0aGUgdXNlclxuICAgIGlmIChwcm9wcy5wYXNzSHJlZiB8fCBjaGlsZC50eXBlID09PSAnYScgJiYgISgnaHJlZicgaW4gY2hpbGQucHJvcHMpKSB7XG4gICAgICAgIGNvbnN0IGN1ckxvY2FsZSA9IHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGU7XG4gICAgICAgIC8vIHdlIG9ubHkgcmVuZGVyIGRvbWFpbiBsb2NhbGVzIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gYSBkb21haW4gbG9jYWxlXG4gICAgICAgIC8vIHNvIHRoYXQgbG9jYWxlIGxpbmtzIGFyZSBzdGlsbCB2aXNpdGFibGUgaW4gZGV2ZWxvcG1lbnQvcHJldmlldyBlbnZzXG4gICAgICAgIGNvbnN0IGxvY2FsZURvbWFpbiA9IHJvdXRlciAmJiByb3V0ZXIuaXNMb2NhbGVEb21haW4gJiYgKDAsIF9yb3V0ZXIpLmdldERvbWFpbkxvY2FsZShhcywgY3VyTG9jYWxlLCByb3V0ZXIgJiYgcm91dGVyLmxvY2FsZXMsIHJvdXRlciAmJiByb3V0ZXIuZG9tYWluTG9jYWxlcyk7XG4gICAgICAgIGNoaWxkUHJvcHMuaHJlZiA9IGxvY2FsZURvbWFpbiB8fCAoMCwgX3JvdXRlcikuYWRkQmFzZVBhdGgoKDAsIF9yb3V0ZXIpLmFkZExvY2FsZShhcywgY3VyTG9jYWxlLCByb3V0ZXIgJiYgcm91dGVyLmRlZmF1bHRMb2NhbGUpKTtcbiAgICB9XG4gICAgcmV0dXJuKC8qI19fUFVSRV9fKi8gX3JlYWN0LmRlZmF1bHQuY2xvbmVFbGVtZW50KGNoaWxkLCBjaGlsZFByb3BzKSk7XG59XG52YXIgX2RlZmF1bHQgPSBMaW5rO1xuZXhwb3J0cy5kZWZhdWx0ID0gX2RlZmF1bHQ7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmsuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoID0gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2g7XG5leHBvcnRzLm5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoID0gdm9pZCAwO1xuZnVuY3Rpb24gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aCkge1xuICAgIHJldHVybiBwYXRoLmVuZHNXaXRoKCcvJykgJiYgcGF0aCAhPT0gJy8nID8gcGF0aC5zbGljZSgwLCAtMSkgOiBwYXRoO1xufVxuY29uc3Qgbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSBwcm9jZXNzLmVudi5fX05FWFRfVFJBSUxJTkdfU0xBU0ggPyAocGF0aCk9PntcbiAgICBpZiAoL1xcLlteL10rXFwvPyQvLnRlc3QocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGgpO1xuICAgIH0gZWxzZSBpZiAocGF0aC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJldHVybiBwYXRoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwYXRoICsgJy8nO1xuICAgIH1cbn0gOiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaDtcbmV4cG9ydHMubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZXF1ZXN0SWRsZUNhbGxiYWNrID0gZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2sgPSB2b2lkIDA7XG5jb25zdCByZXF1ZXN0SWRsZUNhbGxiYWNrID0gdHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYucmVxdWVzdElkbGVDYWxsYmFjayAmJiBzZWxmLnJlcXVlc3RJZGxlQ2FsbGJhY2suYmluZCh3aW5kb3cpIHx8IGZ1bmN0aW9uKGNiKSB7XG4gICAgbGV0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgY2Ioe1xuICAgICAgICAgICAgZGlkVGltZW91dDogZmFsc2UsXG4gICAgICAgICAgICB0aW1lUmVtYWluaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgNTAgLSAoRGF0ZS5ub3coKSAtIHN0YXJ0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIDEpO1xufTtcbmV4cG9ydHMucmVxdWVzdElkbGVDYWxsYmFjayA9IHJlcXVlc3RJZGxlQ2FsbGJhY2s7XG5jb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2sgPSB0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2sgJiYgc2VsZi5jYW5jZWxJZGxlQ2FsbGJhY2suYmluZCh3aW5kb3cpIHx8IGZ1bmN0aW9uKGlkKSB7XG4gICAgcmV0dXJuIGNsZWFyVGltZW91dChpZCk7XG59O1xuZXhwb3J0cy5jYW5jZWxJZGxlQ2FsbGJhY2sgPSBjYW5jZWxJZGxlQ2FsbGJhY2s7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlcXVlc3QtaWRsZS1jYWxsYmFjay5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubWFya0Fzc2V0RXJyb3IgPSBtYXJrQXNzZXRFcnJvcjtcbmV4cG9ydHMuaXNBc3NldEVycm9yID0gaXNBc3NldEVycm9yO1xuZXhwb3J0cy5nZXRDbGllbnRCdWlsZE1hbmlmZXN0ID0gZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdDtcbmV4cG9ydHMuY3JlYXRlUm91dGVMb2FkZXIgPSBjcmVhdGVSb3V0ZUxvYWRlcjtcbnZhciBfZ2V0QXNzZXRQYXRoRnJvbVJvdXRlID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi4vc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZVwiKSk7XG52YXIgX3JlcXVlc3RJZGxlQ2FsbGJhY2sgPSByZXF1aXJlKFwiLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2tcIik7XG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikge1xuICAgIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgICAgIGRlZmF1bHQ6IG9ialxuICAgIH07XG59XG4vLyAzLjhzIHdhcyBhcmJpdHJhcmlseSBjaG9zZW4gYXMgaXQncyB3aGF0IGh0dHBzOi8vd2ViLmRldi9pbnRlcmFjdGl2ZVxuLy8gY29uc2lkZXJzIGFzIFwiR29vZFwiIHRpbWUtdG8taW50ZXJhY3RpdmUuIFdlIG11c3QgYXNzdW1lIHNvbWV0aGluZyB3ZW50XG4vLyB3cm9uZyBiZXlvbmQgdGhpcyBwb2ludCwgYW5kIHRoZW4gZmFsbC1iYWNrIHRvIGEgZnVsbCBwYWdlIHRyYW5zaXRpb24gdG9cbi8vIHNob3cgdGhlIHVzZXIgc29tZXRoaW5nIG9mIHZhbHVlLlxuY29uc3QgTVNfTUFYX0lETEVfREVMQVkgPSAzODAwO1xuZnVuY3Rpb24gd2l0aEZ1dHVyZShrZXksIG1hcCwgZ2VuZXJhdG9yKSB7XG4gICAgbGV0IGVudHJ5ID0gbWFwLmdldChrZXkpO1xuICAgIGlmIChlbnRyeSkge1xuICAgICAgICBpZiAoJ2Z1dHVyZScgaW4gZW50cnkpIHtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeS5mdXR1cmU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShlbnRyeSk7XG4gICAgfVxuICAgIGxldCByZXNvbHZlcjtcbiAgICBjb25zdCBwcm9tID0gbmV3IFByb21pc2UoKHJlc29sdmUpPT57XG4gICAgICAgIHJlc29sdmVyID0gcmVzb2x2ZTtcbiAgICB9KTtcbiAgICBtYXAuc2V0KGtleSwgZW50cnkgPSB7XG4gICAgICAgIHJlc29sdmU6IHJlc29sdmVyLFxuICAgICAgICBmdXR1cmU6IHByb21cbiAgICB9KTtcbiAgICByZXR1cm4gZ2VuZXJhdG9yID8gZ2VuZXJhdG9yKCkudGhlbigodmFsdWUpPT4ocmVzb2x2ZXIodmFsdWUpLCB2YWx1ZSlcbiAgICApIDogcHJvbTtcbn1cbmZ1bmN0aW9uIGhhc1ByZWZldGNoKGxpbmspIHtcbiAgICB0cnkge1xuICAgICAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpO1xuICAgICAgICByZXR1cm4oLy8gZGV0ZWN0IElFMTEgc2luY2UgaXQgc3VwcG9ydHMgcHJlZmV0Y2ggYnV0IGlzbid0IGRldGVjdGVkXG4gICAgICAgIC8vIHdpdGggcmVsTGlzdC5zdXBwb3J0XG4gICAgICAgICghIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIWRvY3VtZW50LmRvY3VtZW50TW9kZSkgfHwgbGluay5yZWxMaXN0LnN1cHBvcnRzKCdwcmVmZXRjaCcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5jb25zdCBjYW5QcmVmZXRjaCA9IGhhc1ByZWZldGNoKCk7XG5mdW5jdGlvbiBwcmVmZXRjaFZpYURvbShocmVmLCBhcywgbGluaykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaW5rW3JlbD1cInByZWZldGNoXCJdW2hyZWZePVwiJHtocmVmfVwiXWApKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKTtcbiAgICAgICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbDpcbiAgICAgICAgaWYgKGFzKSBsaW5rLmFzID0gYXM7XG4gICAgICAgIGxpbmsucmVsID0gYHByZWZldGNoYDtcbiAgICAgICAgbGluay5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU47XG4gICAgICAgIGxpbmsub25sb2FkID0gcmVzO1xuICAgICAgICBsaW5rLm9uZXJyb3IgPSByZWo7XG4gICAgICAgIC8vIGBocmVmYCBzaG91bGQgYWx3YXlzIGJlIGxhc3Q6XG4gICAgICAgIGxpbmsuaHJlZiA9IGhyZWY7XG4gICAgICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluayk7XG4gICAgfSk7XG59XG5jb25zdCBBU1NFVF9MT0FEX0VSUk9SID0gU3ltYm9sKCdBU1NFVF9MT0FEX0VSUk9SJyk7XG5mdW5jdGlvbiBtYXJrQXNzZXRFcnJvcihlcnIpIHtcbiAgICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KGVyciwgQVNTRVRfTE9BRF9FUlJPUiwge1xuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNBc3NldEVycm9yKGVycikge1xuICAgIHJldHVybiBlcnIgJiYgQVNTRVRfTE9BRF9FUlJPUiBpbiBlcnI7XG59XG5mdW5jdGlvbiBhcHBlbmRTY3JpcHQoc3JjLCBzY3JpcHQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCk9PntcbiAgICAgICAgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICAgIC8vIFRoZSBvcmRlciBvZiBwcm9wZXJ0eSBhc3NpZ25tZW50IGhlcmUgaXMgaW50ZW50aW9uYWwuXG4gICAgICAgIC8vIDEuIFNldHVwIHN1Y2Nlc3MvZmFpbHVyZSBob29rcyBpbiBjYXNlIHRoZSBicm93c2VyIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gICAgZXhlY3V0ZXMgd2hlbiBgc3JjYCBpcyBzZXQuXG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSByZXNvbHZlO1xuICAgICAgICBzY3JpcHQub25lcnJvciA9ICgpPT5yZWplY3QobWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzY3JpcHQ6ICR7c3JjfWApKSlcbiAgICAgICAgO1xuICAgICAgICAvLyAyLiBDb25maWd1cmUgdGhlIGNyb3NzLW9yaWdpbiBhdHRyaWJ1dGUgYmVmb3JlIHNldHRpbmcgYHNyY2AgaW4gY2FzZSB0aGVcbiAgICAgICAgLy8gICAgYnJvd3NlciBiZWdpbnMgdG8gZmV0Y2guXG4gICAgICAgIHNjcmlwdC5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU47XG4gICAgICAgIC8vIDMuIEZpbmFsbHksIHNldCB0aGUgc291cmNlIGFuZCBpbmplY3QgaW50byB0aGUgRE9NIGluIGNhc2UgdGhlIGNoaWxkXG4gICAgICAgIC8vICAgIG11c3QgYmUgYXBwZW5kZWQgZm9yIGZldGNoaW5nIHRvIHN0YXJ0LlxuICAgICAgICBzY3JpcHQuc3JjID0gc3JjO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgfSk7XG59XG4vLyBXZSB3YWl0IGZvciBwYWdlcyB0byBiZSBidWlsdCBpbiBkZXYgYmVmb3JlIHdlIHN0YXJ0IHRoZSByb3V0ZSB0cmFuc2l0aW9uXG4vLyB0aW1lb3V0IHRvIHByZXZlbnQgYW4gdW4tbmVjZXNzYXJ5IGhhcmQgbmF2aWdhdGlvbiBpbiBkZXZlbG9wbWVudC5cbmxldCBkZXZCdWlsZFByb21pc2U7XG4vLyBSZXNvbHZlIGEgcHJvbWlzZSB0aGF0IHRpbWVzIG91dCBhZnRlciBnaXZlbiBhbW91bnQgb2YgbWlsbGlzZWNvbmRzLlxuZnVuY3Rpb24gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChwLCBtcywgZXJyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpPT57XG4gICAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgcC50aGVuKChyKT0+e1xuICAgICAgICAgICAgLy8gUmVzb2x2ZWQsIGNhbmNlbCB0aGUgdGltZW91dFxuICAgICAgICAgICAgY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlc29sdmUocik7XG4gICAgICAgIH0pLmNhdGNoKHJlamVjdCk7XG4gICAgICAgIC8vIFdlIHdyYXAgdGhlc2UgY2hlY2tzIHNlcGFyYXRlbHkgZm9yIGJldHRlciBkZWFkLWNvZGUgZWxpbWluYXRpb24gaW5cbiAgICAgICAgLy8gcHJvZHVjdGlvbiBidW5kbGVzLlxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgIChkZXZCdWlsZFByb21pc2UgfHwgUHJvbWlzZS5yZXNvbHZlKCkpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAoMCwgX3JlcXVlc3RJZGxlQ2FsbGJhY2spLnJlcXVlc3RJZGxlQ2FsbGJhY2soKCk9PnNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sIG1zKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+c2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBtcylcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSB7XG4gICAgaWYgKHNlbGYuX19CVUlMRF9NQU5JRkVTVCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVCk7XG4gICAgfVxuICAgIGNvbnN0IG9uQnVpbGRNYW5pZmVzdCA9IG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xuICAgICAgICAvLyBNYW5kYXRvcnkgYmVjYXVzZSB0aGlzIGlzIG5vdCBjb25jdXJyZW50IHNhZmU6XG4gICAgICAgIGNvbnN0IGNiID0gc2VsZi5fX0JVSUxEX01BTklGRVNUX0NCO1xuICAgICAgICBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0IgPSAoKT0+e1xuICAgICAgICAgICAgcmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QpO1xuICAgICAgICAgICAgY2IgJiYgY2IoKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzb2x2ZVByb21pc2VXaXRoVGltZW91dChvbkJ1aWxkTWFuaWZlc3QsIE1TX01BWF9JRExFX0RFTEFZLCBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoJ0ZhaWxlZCB0byBsb2FkIGNsaWVudCBidWlsZCBtYW5pZmVzdCcpKSk7XG59XG5mdW5jdGlvbiBnZXRGaWxlc0ZvclJvdXRlKGFzc2V0UHJlZml4LCByb3V0ZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgICAgIHNjcmlwdHM6IFtcbiAgICAgICAgICAgICAgICBhc3NldFByZWZpeCArICcvX25leHQvc3RhdGljL2NodW5rcy9wYWdlcycgKyBlbmNvZGVVUkkoKDAsIF9nZXRBc3NldFBhdGhGcm9tUm91dGUpLmRlZmF1bHQocm91dGUsICcuanMnKSksIFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIC8vIFN0eWxlcyBhcmUgaGFuZGxlZCBieSBgc3R5bGUtbG9hZGVyYCBpbiBkZXZlbG9wbWVudDpcbiAgICAgICAgICAgIGNzczogW11cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkudGhlbigobWFuaWZlc3QpPT57XG4gICAgICAgIGlmICghKHJvdXRlIGluIG1hbmlmZXN0KSkge1xuICAgICAgICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9va3VwIHJvdXRlOiAke3JvdXRlfWApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBhbGxGaWxlcyA9IG1hbmlmZXN0W3JvdXRlXS5tYXAoKGVudHJ5KT0+YXNzZXRQcmVmaXggKyAnL19uZXh0LycgKyBlbmNvZGVVUkkoZW50cnkpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY3JpcHRzOiBhbGxGaWxlcy5maWx0ZXIoKHYpPT52LmVuZHNXaXRoKCcuanMnKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIGNzczogYWxsRmlsZXMuZmlsdGVyKCh2KT0+di5lbmRzV2l0aCgnLmNzcycpXG4gICAgICAgICAgICApXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVSb3V0ZUxvYWRlcihhc3NldFByZWZpeCkge1xuICAgIGNvbnN0IGVudHJ5cG9pbnRzID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IGxvYWRlZFNjcmlwdHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgc3R5bGVTaGVldHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgcm91dGVzID0gbmV3IE1hcCgpO1xuICAgIGZ1bmN0aW9uIG1heWJlRXhlY3V0ZVNjcmlwdChzcmMpIHtcbiAgICAgICAgbGV0IHByb20gPSBsb2FkZWRTY3JpcHRzLmdldChzcmMpO1xuICAgICAgICBpZiAocHJvbSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb207XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2tpcCBleGVjdXRpbmcgc2NyaXB0IGlmIGl0J3MgYWxyZWFkeSBpbiB0aGUgRE9NOlxuICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyY149XCIke3NyY31cIl1gKSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRlZFNjcmlwdHMuc2V0KHNyYywgcHJvbSA9IGFwcGVuZFNjcmlwdChzcmMpKTtcbiAgICAgICAgcmV0dXJuIHByb207XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZldGNoU3R5bGVTaGVldChocmVmKSB7XG4gICAgICAgIGxldCBwcm9tID0gc3R5bGVTaGVldHMuZ2V0KGhyZWYpO1xuICAgICAgICBpZiAocHJvbSkge1xuICAgICAgICAgICAgcmV0dXJuIHByb207XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGVTaGVldHMuc2V0KGhyZWYsIHByb20gPSBmZXRjaChocmVmKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICBpZiAoIXJlcy5vaykge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3R5bGVzaGVldDogJHtocmVmfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcy50ZXh0KCkudGhlbigodGV4dCk9Pih7XG4gICAgICAgICAgICAgICAgICAgIGhyZWY6IGhyZWYsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IHRleHRcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgICAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKGVycik7XG4gICAgICAgIH0pKTtcbiAgICAgICAgcmV0dXJuIHByb207XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHdoZW5FbnRyeXBvaW50IChyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpdGhGdXR1cmUocm91dGUsIGVudHJ5cG9pbnRzKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FbnRyeXBvaW50IChyb3V0ZSwgZXhlY3V0ZSkge1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKGV4ZWN1dGUpLnRoZW4oKGZuKT0+Zm4oKVxuICAgICAgICAgICAgKS50aGVuKChleHBvcnRzKT0+KHtcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50OiBleHBvcnRzICYmIGV4cG9ydHMuZGVmYXVsdCB8fCBleHBvcnRzLFxuICAgICAgICAgICAgICAgICAgICBleHBvcnRzOiBleHBvcnRzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICwgKGVycik9Pih7XG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiBlcnJcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKS50aGVuKChpbnB1dCk9PntcbiAgICAgICAgICAgICAgICBjb25zdCBvbGQgPSBlbnRyeXBvaW50cy5nZXQocm91dGUpO1xuICAgICAgICAgICAgICAgIGVudHJ5cG9pbnRzLnNldChyb3V0ZSwgaW5wdXQpO1xuICAgICAgICAgICAgICAgIGlmIChvbGQgJiYgJ3Jlc29sdmUnIGluIG9sZCkgb2xkLnJlc29sdmUoaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvYWRSb3V0ZSAocm91dGUsIHByZWZldGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gd2l0aEZ1dHVyZShyb3V0ZSwgcm91dGVzLCAoKT0+e1xuICAgICAgICAgICAgICAgIGNvbnN0IHJvdXRlRmlsZXNQcm9taXNlID0gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpLnRoZW4oKHsgc2NyaXB0cyAsIGNzcyAgfSk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5cG9pbnRzLmhhcyhyb3V0ZSkgPyBbXSA6IFByb21pc2UuYWxsKHNjcmlwdHMubWFwKG1heWJlRXhlY3V0ZVNjcmlwdCkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwoY3NzLm1hcChmZXRjaFN0eWxlU2hlZXQpKSwgXG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2hlbkVudHJ5cG9pbnQocm91dGUpLnRoZW4oKGVudHJ5cG9pbnQpPT4oe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5cG9pbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVzOiByZXNbMV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGRldkJ1aWxkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJvdXRlRmlsZXNQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJvdXRlRmlsZXNQcm9taXNlLmZpbmFsbHkoKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmVQcm9taXNlV2l0aFRpbWVvdXQocm91dGVGaWxlc1Byb21pc2UsIE1TX01BWF9JRExFX0RFTEFZLCBtYXJrQXNzZXRFcnJvcihuZXcgRXJyb3IoYFJvdXRlIGRpZCBub3QgY29tcGxldGUgbG9hZGluZzogJHtyb3V0ZX1gKSkpLnRoZW4oKHsgZW50cnlwb2ludCAsIHN0eWxlcyAgfSk9PntcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZXM6IHN0eWxlc1xuICAgICAgICAgICAgICAgICAgICB9LCBlbnRyeXBvaW50KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdlcnJvcicgaW4gZW50cnlwb2ludCA/IGVudHJ5cG9pbnQgOiByZXM7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKGVycik9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZWZldGNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIGNhY2hlIGVycm9ycyBkdXJpbmcgcHJlZmV0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHByZWZldGNoIChyb3V0ZSkge1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL0dvb2dsZUNocm9tZUxhYnMvcXVpY2tsaW5rL2Jsb2IvNDUzYTY2MWZhMWZhOTQwZTJkMmUwNDQ0NTIzOThlMzhjNjdhOThmYi9zcmMvaW5kZXgubWpzI0wxMTUtTDExOFxuICAgICAgICAgICAgLy8gTGljZW5zZTogQXBhY2hlIDIuMFxuICAgICAgICAgICAgbGV0IGNuO1xuICAgICAgICAgICAgaWYgKGNuID0gbmF2aWdhdG9yLmNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAvLyBEb24ndCBwcmVmZXRjaCBpZiB1c2luZyAyRyBvciBpZiBTYXZlLURhdGEgaXMgZW5hYmxlZC5cbiAgICAgICAgICAgICAgICBpZiAoY24uc2F2ZURhdGEgfHwgLzJnLy50ZXN0KGNuLmVmZmVjdGl2ZVR5cGUpKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpLnRoZW4oKG91dHB1dCk9PlByb21pc2UuYWxsKGNhblByZWZldGNoID8gb3V0cHV0LnNjcmlwdHMubWFwKChzY3JpcHQpPT5wcmVmZXRjaFZpYURvbShzY3JpcHQsICdzY3JpcHQnKVxuICAgICAgICAgICAgICAgICkgOiBbXSlcbiAgICAgICAgICAgICkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICgwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykucmVxdWVzdElkbGVDYWxsYmFjaygoKT0+dGhpcy5sb2FkUm91dGUocm91dGUsIHRydWUpLmNhdGNoKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKC8vIHN3YWxsb3cgcHJlZmV0Y2ggZXJyb3JzXG4gICAgICAgICAgICAoKT0+e1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZS1sb2FkZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJSb3V0ZXJcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF9yb3V0ZXIuZGVmYXVsdDtcbiAgICB9XG59KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpdGhSb3V0ZXJcIiwge1xuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIF93aXRoUm91dGVyLmRlZmF1bHQ7XG4gICAgfVxufSk7XG5leHBvcnRzLnVzZVJvdXRlciA9IHVzZVJvdXRlcjtcbmV4cG9ydHMuY3JlYXRlUm91dGVyID0gY3JlYXRlUm91dGVyO1xuZXhwb3J0cy5tYWtlUHVibGljUm91dGVySW5zdGFuY2UgPSBtYWtlUHVibGljUm91dGVySW5zdGFuY2U7XG5leHBvcnRzLmRlZmF1bHQgPSB2b2lkIDA7XG52YXIgX3JlYWN0ID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwicmVhY3RcIikpO1xudmFyIF9yb3V0ZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuLi9zaGFyZWQvbGliL3JvdXRlci9yb3V0ZXJcIikpO1xudmFyIF9yb3V0ZXJDb250ZXh0ID0gcmVxdWlyZShcIi4uL3NoYXJlZC9saWIvcm91dGVyLWNvbnRleHRcIik7XG52YXIgX3dpdGhSb3V0ZXIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCIuL3dpdGgtcm91dGVyXCIpKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmNvbnN0IHNpbmdsZXRvblJvdXRlciA9IHtcbiAgICByb3V0ZXI6IG51bGwsXG4gICAgcmVhZHlDYWxsYmFja3M6IFtdLFxuICAgIHJlYWR5IChjYikge1xuICAgICAgICBpZiAodGhpcy5yb3V0ZXIpIHJldHVybiBjYigpO1xuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlDYWxsYmFja3MucHVzaChjYik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuLy8gQ3JlYXRlIHB1YmxpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSByb3V0ZXIgaW4gdGhlIHNpbmdsZXRvblJvdXRlclxuY29uc3QgdXJsUHJvcGVydHlGaWVsZHMgPSBbXG4gICAgJ3BhdGhuYW1lJyxcbiAgICAncm91dGUnLFxuICAgICdxdWVyeScsXG4gICAgJ2FzUGF0aCcsXG4gICAgJ2NvbXBvbmVudHMnLFxuICAgICdpc0ZhbGxiYWNrJyxcbiAgICAnYmFzZVBhdGgnLFxuICAgICdsb2NhbGUnLFxuICAgICdsb2NhbGVzJyxcbiAgICAnZGVmYXVsdExvY2FsZScsXG4gICAgJ2lzUmVhZHknLFxuICAgICdpc1ByZXZpZXcnLFxuICAgICdpc0xvY2FsZURvbWFpbicsXG4gICAgJ2RvbWFpbkxvY2FsZXMnLCBcbl07XG5jb25zdCByb3V0ZXJFdmVudHMgPSBbXG4gICAgJ3JvdXRlQ2hhbmdlU3RhcnQnLFxuICAgICdiZWZvcmVIaXN0b3J5Q2hhbmdlJyxcbiAgICAncm91dGVDaGFuZ2VDb21wbGV0ZScsXG4gICAgJ3JvdXRlQ2hhbmdlRXJyb3InLFxuICAgICdoYXNoQ2hhbmdlU3RhcnQnLFxuICAgICdoYXNoQ2hhbmdlQ29tcGxldGUnLCBcbl07XG5jb25zdCBjb3JlTWV0aG9kRmllbGRzID0gW1xuICAgICdwdXNoJyxcbiAgICAncmVwbGFjZScsXG4gICAgJ3JlbG9hZCcsXG4gICAgJ2JhY2snLFxuICAgICdwcmVmZXRjaCcsXG4gICAgJ2JlZm9yZVBvcFN0YXRlJywgXG5dO1xuLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHNpbmdsZXRvblJvdXRlciwgJ2V2ZW50cycsIHtcbiAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gX3JvdXRlci5kZWZhdWx0LmV2ZW50cztcbiAgICB9XG59KTtcbnVybFByb3BlcnR5RmllbGRzLmZvckVhY2goKGZpZWxkKT0+e1xuICAgIC8vIEhlcmUgd2UgbmVlZCB0byB1c2UgT2JqZWN0LmRlZmluZVByb3BlcnR5IGJlY2F1c2Ugd2UgbmVlZCB0byByZXR1cm5cbiAgICAvLyB0aGUgcHJvcGVydHkgYXNzaWduZWQgdG8gdGhlIGFjdHVhbCByb3V0ZXJcbiAgICAvLyBUaGUgdmFsdWUgbWlnaHQgZ2V0IGNoYW5nZWQgYXMgd2UgY2hhbmdlIHJvdXRlcyBhbmQgdGhpcyBpcyB0aGVcbiAgICAvLyBwcm9wZXIgd2F5IHRvIGFjY2VzcyBpdFxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsIGZpZWxkLCB7XG4gICAgICAgIGdldCAoKSB7XG4gICAgICAgICAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKTtcbiAgICAgICAgICAgIHJldHVybiByb3V0ZXJbZmllbGRdO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbmNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpPT57XG4gICAgc2luZ2xldG9uUm91dGVyW2ZpZWxkXSA9ICguLi5hcmdzKT0+e1xuICAgICAgICBjb25zdCByb3V0ZXIgPSBnZXRSb3V0ZXIoKTtcbiAgICAgICAgcmV0dXJuIHJvdXRlcltmaWVsZF0oLi4uYXJncyk7XG4gICAgfTtcbn0pO1xucm91dGVyRXZlbnRzLmZvckVhY2goKGV2ZW50KT0+e1xuICAgIHNpbmdsZXRvblJvdXRlci5yZWFkeSgoKT0+e1xuICAgICAgICBfcm91dGVyLmRlZmF1bHQuZXZlbnRzLm9uKGV2ZW50LCAoLi4uYXJncyk9PntcbiAgICAgICAgICAgIGNvbnN0IGV2ZW50RmllbGQgPSBgb24ke2V2ZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpfSR7ZXZlbnQuc3Vic3RyaW5nKDEpfWA7XG4gICAgICAgICAgICBjb25zdCBfc2luZ2xldG9uUm91dGVyID0gc2luZ2xldG9uUm91dGVyO1xuICAgICAgICAgICAgaWYgKF9zaW5nbGV0b25Sb3V0ZXJbZXZlbnRGaWVsZF0pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKC4uLmFyZ3MpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciB3aGVuIHJ1bm5pbmcgdGhlIFJvdXRlciBldmVudDogJHtldmVudEZpZWxkfWApO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGAke2Vyci5tZXNzYWdlfVxcbiR7ZXJyLnN0YWNrfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KTtcbmZ1bmN0aW9uIGdldFJvdXRlcigpIHtcbiAgICBpZiAoIXNpbmdsZXRvblJvdXRlci5yb3V0ZXIpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9ICdObyByb3V0ZXIgaW5zdGFuY2UgZm91bmQuXFxuJyArICdZb3Ugc2hvdWxkIG9ubHkgdXNlIFwibmV4dC9yb3V0ZXJcIiBvbiB0aGUgY2xpZW50IHNpZGUgb2YgeW91ciBhcHAuXFxuJztcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH1cbiAgICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlcjtcbn1cbnZhciBfZGVmYXVsdCA9IHNpbmdsZXRvblJvdXRlcjtcbmV4cG9ydHMuZGVmYXVsdCA9IF9kZWZhdWx0O1xuZnVuY3Rpb24gdXNlUm91dGVyKCkge1xuICAgIHJldHVybiBfcmVhY3QuZGVmYXVsdC51c2VDb250ZXh0KF9yb3V0ZXJDb250ZXh0LlJvdXRlckNvbnRleHQpO1xufVxuZnVuY3Rpb24gY3JlYXRlUm91dGVyKC4uLmFyZ3MpIHtcbiAgICBzaW5nbGV0b25Sb3V0ZXIucm91dGVyID0gbmV3IF9yb3V0ZXIuZGVmYXVsdCguLi5hcmdzKTtcbiAgICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MuZm9yRWFjaCgoY2IpPT5jYigpXG4gICAgKTtcbiAgICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MgPSBbXTtcbiAgICByZXR1cm4gc2luZ2xldG9uUm91dGVyLnJvdXRlcjtcbn1cbmZ1bmN0aW9uIG1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZShyb3V0ZXIpIHtcbiAgICBjb25zdCBfcm91dGVyMSA9IHJvdXRlcjtcbiAgICBjb25zdCBpbnN0YW5jZSA9IHtcbiAgICB9O1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgb2YgdXJsUHJvcGVydHlGaWVsZHMpe1xuICAgICAgICBpZiAodHlwZW9mIF9yb3V0ZXIxW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGluc3RhbmNlW3Byb3BlcnR5XSA9IE9iamVjdC5hc3NpZ24oQXJyYXkuaXNBcnJheShfcm91dGVyMVtwcm9wZXJ0eV0pID8gW10gOiB7XG4gICAgICAgICAgICB9LCBfcm91dGVyMVtwcm9wZXJ0eV0pIC8vIG1ha2VzIHN1cmUgcXVlcnkgaXMgbm90IHN0YXRlZnVsXG4gICAgICAgICAgICA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBfcm91dGVyMVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIC8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbiAgICBpbnN0YW5jZS5ldmVudHMgPSBfcm91dGVyLmRlZmF1bHQuZXZlbnRzO1xuICAgIGNvcmVNZXRob2RGaWVsZHMuZm9yRWFjaCgoZmllbGQpPT57XG4gICAgICAgIGluc3RhbmNlW2ZpZWxkXSA9ICguLi5hcmdzKT0+e1xuICAgICAgICAgICAgcmV0dXJuIF9yb3V0ZXIxW2ZpZWxkXSguLi5hcmdzKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJvdXRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMudXNlSW50ZXJzZWN0aW9uID0gdXNlSW50ZXJzZWN0aW9uO1xudmFyIF9yZWFjdCA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciBfcmVxdWVzdElkbGVDYWxsYmFjayA9IHJlcXVpcmUoXCIuL3JlcXVlc3QtaWRsZS1jYWxsYmFja1wiKTtcbmNvbnN0IGhhc0ludGVyc2VjdGlvbk9ic2VydmVyID0gdHlwZW9mIEludGVyc2VjdGlvbk9ic2VydmVyICE9PSAndW5kZWZpbmVkJztcbmZ1bmN0aW9uIHVzZUludGVyc2VjdGlvbih7IHJvb3RNYXJnaW4gLCBkaXNhYmxlZCAgfSkge1xuICAgIGNvbnN0IGlzRGlzYWJsZWQgPSBkaXNhYmxlZCB8fCAhaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gICAgY29uc3QgdW5vYnNlcnZlID0gKDAsIF9yZWFjdCkudXNlUmVmKCk7XG4gICAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gKDAsIF9yZWFjdCkudXNlU3RhdGUoZmFsc2UpO1xuICAgIGNvbnN0IHNldFJlZiA9ICgwLCBfcmVhY3QpLnVzZUNhbGxiYWNrKChlbCk9PntcbiAgICAgICAgaWYgKHVub2JzZXJ2ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICB1bm9ic2VydmUuY3VycmVudCgpO1xuICAgICAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRGlzYWJsZWQgfHwgdmlzaWJsZSkgcmV0dXJuO1xuICAgICAgICBpZiAoZWwgJiYgZWwudGFnTmFtZSkge1xuICAgICAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSBvYnNlcnZlKGVsLCAoaXNWaXNpYmxlKT0+aXNWaXNpYmxlICYmIHNldFZpc2libGUoaXNWaXNpYmxlKVxuICAgICAgICAgICAgLCB7XG4gICAgICAgICAgICAgICAgcm9vdE1hcmdpblxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIGlzRGlzYWJsZWQsXG4gICAgICAgIHJvb3RNYXJnaW4sXG4gICAgICAgIHZpc2libGVcbiAgICBdKTtcbiAgICAoMCwgX3JlYWN0KS51c2VFZmZlY3QoKCk9PntcbiAgICAgICAgaWYgKCFoYXNJbnRlcnNlY3Rpb25PYnNlcnZlcikge1xuICAgICAgICAgICAgaWYgKCF2aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaWRsZUNhbGxiYWNrID0gKDAsIF9yZXF1ZXN0SWRsZUNhbGxiYWNrKS5yZXF1ZXN0SWRsZUNhbGxiYWNrKCgpPT5zZXRWaXNpYmxlKHRydWUpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCk9PigwLCBfcmVxdWVzdElkbGVDYWxsYmFjaykuY2FuY2VsSWRsZUNhbGxiYWNrKGlkbGVDYWxsYmFjaylcbiAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LCBbXG4gICAgICAgIHZpc2libGVcbiAgICBdKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBzZXRSZWYsXG4gICAgICAgIHZpc2libGVcbiAgICBdO1xufVxuZnVuY3Rpb24gb2JzZXJ2ZShlbGVtZW50LCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGNvbnN0IHsgaWQgLCBvYnNlcnZlciAsIGVsZW1lbnRzICB9ID0gY3JlYXRlT2JzZXJ2ZXIob3B0aW9ucyk7XG4gICAgZWxlbWVudHMuc2V0KGVsZW1lbnQsIGNhbGxiYWNrKTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKGVsZW1lbnQpO1xuICAgIHJldHVybiBmdW5jdGlvbiB1bm9ic2VydmUoKSB7XG4gICAgICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KTtcbiAgICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKGVsZW1lbnQpO1xuICAgICAgICAvLyBEZXN0cm95IG9ic2VydmVyIHdoZW4gdGhlcmUncyBub3RoaW5nIGxlZnQgdG8gd2F0Y2g6XG4gICAgICAgIGlmIChlbGVtZW50cy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICBvYnNlcnZlcnMuZGVsZXRlKGlkKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5jb25zdCBvYnNlcnZlcnMgPSBuZXcgTWFwKCk7XG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihvcHRpb25zKSB7XG4gICAgY29uc3QgaWQgPSBvcHRpb25zLnJvb3RNYXJnaW4gfHwgJyc7XG4gICAgbGV0IGluc3RhbmNlID0gb2JzZXJ2ZXJzLmdldChpZCk7XG4gICAgaWYgKGluc3RhbmNlKSB7XG4gICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9XG4gICAgY29uc3QgZWxlbWVudHMgPSBuZXcgTWFwKCk7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpPT57XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpPT57XG4gICAgICAgICAgICBjb25zdCBjYWxsYmFjayA9IGVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gZW50cnkuaXNJbnRlcnNlY3RpbmcgfHwgZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAwO1xuICAgICAgICAgICAgaWYgKGNhbGxiYWNrICYmIGlzVmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGlzVmlzaWJsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0sIG9wdGlvbnMpO1xuICAgIG9ic2VydmVycy5zZXQoaWQsIGluc3RhbmNlID0ge1xuICAgICAgICBpZCxcbiAgICAgICAgb2JzZXJ2ZXIsXG4gICAgICAgIGVsZW1lbnRzXG4gICAgfSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD11c2UtaW50ZXJzZWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gd2l0aFJvdXRlcjtcbnZhciBfcmVhY3QgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KHJlcXVpcmUoXCJyZWFjdFwiKSk7XG52YXIgX3JvdXRlciA9IHJlcXVpcmUoXCIuL3JvdXRlclwiKTtcbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHtcbiAgICAgICAgZGVmYXVsdDogb2JqXG4gICAgfTtcbn1cbmZ1bmN0aW9uIHdpdGhSb3V0ZXIoQ29tcG9zZWRDb21wb25lbnQpIHtcbiAgICBmdW5jdGlvbiBXaXRoUm91dGVyV3JhcHBlcihwcm9wcykge1xuICAgICAgICByZXR1cm4oLyojX19QVVJFX18qLyBfcmVhY3QuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvbXBvc2VkQ29tcG9uZW50LCBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHJvdXRlcjogKDAsIF9yb3V0ZXIpLnVzZVJvdXRlcigpXG4gICAgICAgIH0sIHByb3BzKSkpO1xuICAgIH1cbiAgICBXaXRoUm91dGVyV3JhcHBlci5nZXRJbml0aWFsUHJvcHMgPSBDb21wb3NlZENvbXBvbmVudC5nZXRJbml0aWFsUHJvcHM7XG4gICAgV2l0aFJvdXRlcldyYXBwZXIub3JpZ0dldEluaXRpYWxQcm9wcyA9IENvbXBvc2VkQ29tcG9uZW50Lm9yaWdHZXRJbml0aWFsUHJvcHM7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IENvbXBvc2VkQ29tcG9uZW50LmRpc3BsYXlOYW1lIHx8IENvbXBvc2VkQ29tcG9uZW50Lm5hbWUgfHwgJ1Vua25vd24nO1xuICAgICAgICBXaXRoUm91dGVyV3JhcHBlci5kaXNwbGF5TmFtZSA9IGB3aXRoUm91dGVyKCR7bmFtZX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIFdpdGhSb3V0ZXJXcmFwcGVyO1xufVxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD13aXRoLXJvdXRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZ2V0RG9tYWluTG9jYWxlID0gZ2V0RG9tYWluTG9jYWxlO1xuZXhwb3J0cy5hZGRMb2NhbGUgPSBhZGRMb2NhbGU7XG5leHBvcnRzLmRlbExvY2FsZSA9IGRlbExvY2FsZTtcbmV4cG9ydHMuaGFzQmFzZVBhdGggPSBoYXNCYXNlUGF0aDtcbmV4cG9ydHMuYWRkQmFzZVBhdGggPSBhZGRCYXNlUGF0aDtcbmV4cG9ydHMuZGVsQmFzZVBhdGggPSBkZWxCYXNlUGF0aDtcbmV4cG9ydHMuaXNMb2NhbFVSTCA9IGlzTG9jYWxVUkw7XG5leHBvcnRzLmludGVycG9sYXRlQXMgPSBpbnRlcnBvbGF0ZUFzO1xuZXhwb3J0cy5yZXNvbHZlSHJlZiA9IHJlc29sdmVIcmVmO1xuZXhwb3J0cy5kZWZhdWx0ID0gdm9pZCAwO1xudmFyIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoID0gcmVxdWlyZShcIi4uLy4uLy4uL2NsaWVudC9ub3JtYWxpemUtdHJhaWxpbmctc2xhc2hcIik7XG52YXIgX3JvdXRlTG9hZGVyID0gcmVxdWlyZShcIi4uLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXJcIik7XG52YXIgX2Rlbm9ybWFsaXplUGFnZVBhdGggPSByZXF1aXJlKFwiLi4vLi4vLi4vc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aFwiKTtcbnZhciBfbm9ybWFsaXplTG9jYWxlUGF0aCA9IHJlcXVpcmUoXCIuLi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aFwiKTtcbnZhciBfbWl0dCA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQocmVxdWlyZShcIi4uL21pdHRcIikpO1xudmFyIF91dGlscyA9IHJlcXVpcmUoXCIuLi91dGlsc1wiKTtcbnZhciBfaXNEeW5hbWljID0gcmVxdWlyZShcIi4vdXRpbHMvaXMtZHluYW1pY1wiKTtcbnZhciBfcGFyc2VSZWxhdGl2ZVVybCA9IHJlcXVpcmUoXCIuL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybFwiKTtcbnZhciBfcXVlcnlzdHJpbmcgPSByZXF1aXJlKFwiLi91dGlscy9xdWVyeXN0cmluZ1wiKTtcbnZhciBfcmVzb2x2ZVJld3JpdGVzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChyZXF1aXJlKFwiLi91dGlscy9yZXNvbHZlLXJld3JpdGVzXCIpKTtcbnZhciBfcm91dGVNYXRjaGVyID0gcmVxdWlyZShcIi4vdXRpbHMvcm91dGUtbWF0Y2hlclwiKTtcbnZhciBfcm91dGVSZWdleCA9IHJlcXVpcmUoXCIuL3V0aWxzL3JvdXRlLXJlZ2V4XCIpO1xuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDoge1xuICAgICAgICBkZWZhdWx0OiBvYmpcbiAgICB9O1xufVxubGV0IGRldGVjdERvbWFpbkxvY2FsZTtcbmlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgZGV0ZWN0RG9tYWluTG9jYWxlID0gcmVxdWlyZSgnLi4vaTE4bi9kZXRlY3QtZG9tYWluLWxvY2FsZScpLmRldGVjdERvbWFpbkxvY2FsZTtcbn1cbmNvbnN0IGJhc2VQYXRoID0gcHJvY2Vzcy5lbnYuX19ORVhUX1JPVVRFUl9CQVNFUEFUSCB8fCAnJztcbmZ1bmN0aW9uIGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdSb3V0ZSBDYW5jZWxsZWQnKSwge1xuICAgICAgICBjYW5jZWxsZWQ6IHRydWVcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZFBhdGhQcmVmaXgocGF0aCwgcHJlZml4KSB7XG4gICAgcmV0dXJuIHByZWZpeCAmJiBwYXRoLnN0YXJ0c1dpdGgoJy8nKSA/IHBhdGggPT09ICcvJyA/ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2gocHJlZml4KSA6IGAke3ByZWZpeH0ke3BhdGhOb1F1ZXJ5SGFzaChwYXRoKSA9PT0gJy8nID8gcGF0aC5zdWJzdHJpbmcoMSkgOiBwYXRofWAgOiBwYXRoO1xufVxuZnVuY3Rpb24gZ2V0RG9tYWluTG9jYWxlKHBhdGgsIGxvY2FsZSwgbG9jYWxlcywgZG9tYWluTG9jYWxlcykge1xuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgIGxvY2FsZSA9IGxvY2FsZSB8fCAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGF0aCwgbG9jYWxlcykuZGV0ZWN0ZWRMb2NhbGU7XG4gICAgICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKGRvbWFpbkxvY2FsZXMsIHVuZGVmaW5lZCwgbG9jYWxlKTtcbiAgICAgICAgaWYgKGRldGVjdGVkRG9tYWluKSB7XG4gICAgICAgICAgICByZXR1cm4gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke2RldGVjdGVkRG9tYWluLmRvbWFpbn0ke2Jhc2VQYXRoIHx8ICcnfSR7bG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlID8gJycgOiBgLyR7bG9jYWxlfWB9JHtwYXRofWA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRMb2NhbGUocGF0aCwgbG9jYWxlLCBkZWZhdWx0TG9jYWxlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgY29uc3QgcGF0aG5hbWUgPSBwYXRoTm9RdWVyeUhhc2gocGF0aCk7XG4gICAgICAgIGNvbnN0IHBhdGhMb3dlciA9IHBhdGhuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNvbnN0IGxvY2FsZUxvd2VyID0gbG9jYWxlICYmIGxvY2FsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICByZXR1cm4gbG9jYWxlICYmIGxvY2FsZSAhPT0gZGVmYXVsdExvY2FsZSAmJiAhcGF0aExvd2VyLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlTG93ZXIgKyAnLycpICYmIHBhdGhMb3dlciAhPT0gJy8nICsgbG9jYWxlTG93ZXIgPyBhZGRQYXRoUHJlZml4KHBhdGgsICcvJyArIGxvY2FsZSkgOiBwYXRoO1xuICAgIH1cbiAgICByZXR1cm4gcGF0aDtcbn1cbmZ1bmN0aW9uIGRlbExvY2FsZShwYXRoLCBsb2NhbGUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICBjb25zdCBwYXRobmFtZSA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKTtcbiAgICAgICAgY29uc3QgcGF0aExvd2VyID0gcGF0aG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY29uc3QgbG9jYWxlTG93ZXIgPSBsb2NhbGUgJiYgbG9jYWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIHJldHVybiBsb2NhbGUgJiYgKHBhdGhMb3dlci5zdGFydHNXaXRoKCcvJyArIGxvY2FsZUxvd2VyICsgJy8nKSB8fCBwYXRoTG93ZXIgPT09ICcvJyArIGxvY2FsZUxvd2VyKSA/IChwYXRobmFtZS5sZW5ndGggPT09IGxvY2FsZS5sZW5ndGggKyAxID8gJy8nIDogJycpICsgcGF0aC5zdWJzdHIobG9jYWxlLmxlbmd0aCArIDEpIDogcGF0aDtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG5mdW5jdGlvbiBwYXRoTm9RdWVyeUhhc2gocGF0aCkge1xuICAgIGNvbnN0IHF1ZXJ5SW5kZXggPSBwYXRoLmluZGV4T2YoJz8nKTtcbiAgICBjb25zdCBoYXNoSW5kZXggPSBwYXRoLmluZGV4T2YoJyMnKTtcbiAgICBpZiAocXVlcnlJbmRleCA+IC0xIHx8IGhhc2hJbmRleCA+IC0xKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBxdWVyeUluZGV4ID4gLTEgPyBxdWVyeUluZGV4IDogaGFzaEluZGV4KTtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG5mdW5jdGlvbiBoYXNCYXNlUGF0aChwYXRoKSB7XG4gICAgcGF0aCA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKTtcbiAgICByZXR1cm4gcGF0aCA9PT0gYmFzZVBhdGggfHwgcGF0aC5zdGFydHNXaXRoKGJhc2VQYXRoICsgJy8nKTtcbn1cbmZ1bmN0aW9uIGFkZEJhc2VQYXRoKHBhdGgpIHtcbiAgICAvLyB3ZSBvbmx5IGFkZCB0aGUgYmFzZXBhdGggb24gcmVsYXRpdmUgdXJsc1xuICAgIHJldHVybiBhZGRQYXRoUHJlZml4KHBhdGgsIGJhc2VQYXRoKTtcbn1cbmZ1bmN0aW9uIGRlbEJhc2VQYXRoKHBhdGgpIHtcbiAgICBwYXRoID0gcGF0aC5zbGljZShiYXNlUGF0aC5sZW5ndGgpO1xuICAgIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHBhdGggPSBgLyR7cGF0aH1gO1xuICAgIHJldHVybiBwYXRoO1xufVxuZnVuY3Rpb24gaXNMb2NhbFVSTCh1cmwpIHtcbiAgICAvLyBwcmV2ZW50IGEgaHlkcmF0aW9uIG1pc21hdGNoIG9uIGhyZWYgZm9yIHVybCB3aXRoIGFuY2hvciByZWZzXG4gICAgaWYgKHVybC5zdGFydHNXaXRoKCcvJykgfHwgdXJsLnN0YXJ0c1dpdGgoJyMnKSB8fCB1cmwuc3RhcnRzV2l0aCgnPycpKSByZXR1cm4gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICAvLyBhYnNvbHV0ZSB1cmxzIGNhbiBiZSBsb2NhbCBpZiB0aGV5IGFyZSBvbiB0aGUgc2FtZSBvcmlnaW5cbiAgICAgICAgY29uc3QgbG9jYXRpb25PcmlnaW4gPSAoMCwgX3V0aWxzKS5nZXRMb2NhdGlvbk9yaWdpbigpO1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IG5ldyBVUkwodXJsLCBsb2NhdGlvbk9yaWdpbik7XG4gICAgICAgIHJldHVybiByZXNvbHZlZC5vcmlnaW4gPT09IGxvY2F0aW9uT3JpZ2luICYmIGhhc0Jhc2VQYXRoKHJlc29sdmVkLnBhdGhuYW1lKTtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFzKHJvdXRlLCBhc1BhdGhuYW1lLCBxdWVyeSkge1xuICAgIGxldCBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnO1xuICAgIGNvbnN0IGR5bmFtaWNSZWdleCA9ICgwLCBfcm91dGVSZWdleCkuZ2V0Um91dGVSZWdleChyb3V0ZSk7XG4gICAgY29uc3QgZHluYW1pY0dyb3VwcyA9IGR5bmFtaWNSZWdleC5ncm91cHM7XG4gICAgY29uc3QgZHluYW1pY01hdGNoZXMgPSAvLyBUcnkgdG8gbWF0Y2ggdGhlIGR5bmFtaWMgcm91dGUgYWdhaW5zdCB0aGUgYXNQYXRoXG4gICAgKGFzUGF0aG5hbWUgIT09IHJvdXRlID8gKDAsIF9yb3V0ZU1hdGNoZXIpLmdldFJvdXRlTWF0Y2hlcihkeW5hbWljUmVnZXgpKGFzUGF0aG5hbWUpIDogJycpIHx8IC8vIEZhbGwgYmFjayB0byByZWFkaW5nIHRoZSB2YWx1ZXMgZnJvbSB0aGUgaHJlZlxuICAgIC8vIFRPRE86IHNob3VsZCB0aGlzIHRha2UgcHJpb3JpdHk7IGFsc28gbmVlZCB0byBjaGFuZ2UgaW4gdGhlIHJvdXRlci5cbiAgICBxdWVyeTtcbiAgICBpbnRlcnBvbGF0ZWRSb3V0ZSA9IHJvdXRlO1xuICAgIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5rZXlzKGR5bmFtaWNHcm91cHMpO1xuICAgIGlmICghcGFyYW1zLmV2ZXJ5KChwYXJhbSk9PntcbiAgICAgICAgbGV0IHZhbHVlID0gZHluYW1pY01hdGNoZXNbcGFyYW1dIHx8ICcnO1xuICAgICAgICBjb25zdCB7IHJlcGVhdCAsIG9wdGlvbmFsICB9ID0gZHluYW1pY0dyb3Vwc1twYXJhbV07XG4gICAgICAgIC8vIHN1cHBvcnQgc2luZ2xlLWxldmVsIGNhdGNoLWFsbFxuICAgICAgICAvLyBUT0RPOiBtb3JlIHJvYnVzdCBoYW5kbGluZyBmb3IgdXNlci1lcnJvciAocGFzc2luZyBgL2ApXG4gICAgICAgIGxldCByZXBsYWNlZCA9IGBbJHtyZXBlYXQgPyAnLi4uJyA6ICcnfSR7cGFyYW19XWA7XG4gICAgICAgIGlmIChvcHRpb25hbCkge1xuICAgICAgICAgICAgcmVwbGFjZWQgPSBgJHshdmFsdWUgPyAnLycgOiAnJ31bJHtyZXBsYWNlZH1dYDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVwZWF0ICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSkgdmFsdWUgPSBbXG4gICAgICAgICAgICB2YWx1ZVxuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gKG9wdGlvbmFsIHx8IHBhcmFtIGluIGR5bmFtaWNNYXRjaGVzKSAmJiAvLyBJbnRlcnBvbGF0ZSBncm91cCBpbnRvIGRhdGEgVVJMIGlmIHByZXNlbnRcbiAgICAgICAgKGludGVycG9sYXRlZFJvdXRlID0gaW50ZXJwb2xhdGVkUm91dGUucmVwbGFjZShyZXBsYWNlZCwgcmVwZWF0ID8gdmFsdWUubWFwKC8vIHRoZXNlIHZhbHVlcyBzaG91bGQgYmUgZnVsbHkgZW5jb2RlZCBpbnN0ZWFkIG9mIGp1c3RcbiAgICAgICAgLy8gcGF0aCBkZWxpbWl0ZXIgZXNjYXBlZCBzaW5jZSB0aGV5IGFyZSBiZWluZyBpbnNlcnRlZFxuICAgICAgICAvLyBpbnRvIHRoZSBVUkwgYW5kIHdlIGV4cGVjdCBVUkwgZW5jb2RlZCBzZWdtZW50c1xuICAgICAgICAvLyB3aGVuIHBhcnNpbmcgZHluYW1pYyByb3V0ZSBwYXJhbXNcbiAgICAgICAgKHNlZ21lbnQpPT5lbmNvZGVVUklDb21wb25lbnQoc2VnbWVudClcbiAgICAgICAgKS5qb2luKCcvJykgOiBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKSB8fCAnLycpO1xuICAgIH0pKSB7XG4gICAgICAgIGludGVycG9sYXRlZFJvdXRlID0gJycgLy8gZGlkIG5vdCBzYXRpc2Z5IGFsbCByZXF1aXJlbWVudHNcbiAgICAgICAgO1xuICAgIC8vIG4uYi4gV2UgaWdub3JlIHRoaXMgZXJyb3IgYmVjYXVzZSB3ZSBoYW5kbGUgd2FybmluZyBmb3IgdGhpcyBjYXNlIGluXG4gICAgLy8gZGV2ZWxvcG1lbnQgaW4gdGhlIGA8TGluaz5gIGNvbXBvbmVudCBkaXJlY3RseS5cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICByZXN1bHQ6IGludGVycG9sYXRlZFJvdXRlXG4gICAgfTtcbn1cbmZ1bmN0aW9uIG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeSwgcGFyYW1zKSB7XG4gICAgY29uc3QgZmlsdGVyZWRRdWVyeSA9IHtcbiAgICB9O1xuICAgIE9iamVjdC5rZXlzKHF1ZXJ5KS5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgIGlmICghcGFyYW1zLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkUXVlcnlba2V5XSA9IHF1ZXJ5W2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZmlsdGVyZWRRdWVyeTtcbn1cbmZ1bmN0aW9uIHJlc29sdmVIcmVmKHJvdXRlciwgaHJlZiwgcmVzb2x2ZUFzKSB7XG4gICAgLy8gd2UgdXNlIGEgZHVtbXkgYmFzZSB1cmwgZm9yIHJlbGF0aXZlIHVybHNcbiAgICBsZXQgYmFzZTtcbiAgICBsZXQgdXJsQXNTdHJpbmcgPSB0eXBlb2YgaHJlZiA9PT0gJ3N0cmluZycgPyBocmVmIDogKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oaHJlZik7XG4gICAgLy8gcmVwZWF0ZWQgc2xhc2hlcyBhbmQgYmFja3NsYXNoZXMgaW4gdGhlIFVSTCBhcmUgY29uc2lkZXJlZFxuICAgIC8vIGludmFsaWQgYW5kIHdpbGwgbmV2ZXIgbWF0Y2ggYSBOZXh0LmpzIHBhZ2UvZmlsZVxuICAgIGNvbnN0IHVybFByb3RvTWF0Y2ggPSB1cmxBc1N0cmluZy5tYXRjaCgvXlthLXpBLVpdezEsfTpcXC9cXC8vKTtcbiAgICBjb25zdCB1cmxBc1N0cmluZ05vUHJvdG8gPSB1cmxQcm90b01hdGNoID8gdXJsQXNTdHJpbmcuc3Vic3RyKHVybFByb3RvTWF0Y2hbMF0ubGVuZ3RoKSA6IHVybEFzU3RyaW5nO1xuICAgIGNvbnN0IHVybFBhcnRzID0gdXJsQXNTdHJpbmdOb1Byb3RvLnNwbGl0KCc/Jyk7XG4gICAgaWYgKCh1cmxQYXJ0c1swXSB8fCAnJykubWF0Y2goLyhcXC9cXC98XFxcXCkvKSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIGhyZWYgcGFzc2VkIHRvIG5leHQvcm91dGVyOiAke3VybEFzU3RyaW5nfSwgcmVwZWF0ZWQgZm9yd2FyZC1zbGFzaGVzICgvLykgb3IgYmFja3NsYXNoZXMgXFxcXCBhcmUgbm90IHZhbGlkIGluIHRoZSBocmVmYCk7XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRVcmwgPSAoMCwgX3V0aWxzKS5ub3JtYWxpemVSZXBlYXRlZFNsYXNoZXModXJsQXNTdHJpbmdOb1Byb3RvKTtcbiAgICAgICAgdXJsQXNTdHJpbmcgPSAodXJsUHJvdG9NYXRjaCA/IHVybFByb3RvTWF0Y2hbMF0gOiAnJykgKyBub3JtYWxpemVkVXJsO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gYmVjYXVzZSBpdCBjYW5ub3QgYmUgcm91dGVkIGJ5IHRoZSBOZXh0LmpzIHJvdXRlclxuICAgIGlmICghaXNMb2NhbFVSTCh1cmxBc1N0cmluZykpIHtcbiAgICAgICAgcmV0dXJuIHJlc29sdmVBcyA/IFtcbiAgICAgICAgICAgIHVybEFzU3RyaW5nXG4gICAgICAgIF0gOiB1cmxBc1N0cmluZztcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgYmFzZSA9IG5ldyBVUkwodXJsQXNTdHJpbmcuc3RhcnRzV2l0aCgnIycpID8gcm91dGVyLmFzUGF0aCA6IHJvdXRlci5wYXRobmFtZSwgJ2h0dHA6Ly9uJyk7XG4gICAgfSBjYXRjaCAoXykge1xuICAgICAgICAvLyBmYWxsYmFjayB0byAvIGZvciBpbnZhbGlkIGFzUGF0aCB2YWx1ZXMgZS5nLiAvL1xuICAgICAgICBiYXNlID0gbmV3IFVSTCgnLycsICdodHRwOi8vbicpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBjb25zdCBmaW5hbFVybCA9IG5ldyBVUkwodXJsQXNTdHJpbmcsIGJhc2UpO1xuICAgICAgICBmaW5hbFVybC5wYXRobmFtZSA9ICgwLCBfbm9ybWFsaXplVHJhaWxpbmdTbGFzaCkubm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2goZmluYWxVcmwucGF0aG5hbWUpO1xuICAgICAgICBsZXQgaW50ZXJwb2xhdGVkQXMgPSAnJztcbiAgICAgICAgaWYgKCgwLCBfaXNEeW5hbWljKS5pc0R5bmFtaWNSb3V0ZShmaW5hbFVybC5wYXRobmFtZSkgJiYgZmluYWxVcmwuc2VhcmNoUGFyYW1zICYmIHJlc29sdmVBcykge1xuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSAoMCwgX3F1ZXJ5c3RyaW5nKS5zZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KGZpbmFsVXJsLnNlYXJjaFBhcmFtcyk7XG4gICAgICAgICAgICBjb25zdCB7IHJlc3VsdCAsIHBhcmFtcyAgfSA9IGludGVycG9sYXRlQXMoZmluYWxVcmwucGF0aG5hbWUsIGZpbmFsVXJsLnBhdGhuYW1lLCBxdWVyeSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkQXMgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIGhhc2g6IGZpbmFsVXJsLmhhc2gsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnksIHBhcmFtcylcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB0aGUgb3JpZ2luIGRpZG4ndCBjaGFuZ2UsIGl0IG1lYW5zIHdlIHJlY2VpdmVkIGEgcmVsYXRpdmUgaHJlZlxuICAgICAgICBjb25zdCByZXNvbHZlZEhyZWYgPSBmaW5hbFVybC5vcmlnaW4gPT09IGJhc2Uub3JpZ2luID8gZmluYWxVcmwuaHJlZi5zbGljZShmaW5hbFVybC5vcmlnaW4ubGVuZ3RoKSA6IGZpbmFsVXJsLmhyZWY7XG4gICAgICAgIHJldHVybiByZXNvbHZlQXMgPyBbXG4gICAgICAgICAgICByZXNvbHZlZEhyZWYsXG4gICAgICAgICAgICBpbnRlcnBvbGF0ZWRBcyB8fCByZXNvbHZlZEhyZWZcbiAgICAgICAgXSA6IHJlc29sdmVkSHJlZjtcbiAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgIHJldHVybiByZXNvbHZlQXMgPyBbXG4gICAgICAgICAgICB1cmxBc1N0cmluZ1xuICAgICAgICBdIDogdXJsQXNTdHJpbmc7XG4gICAgfVxufVxuZnVuY3Rpb24gc3RyaXBPcmlnaW4odXJsKSB7XG4gICAgY29uc3Qgb3JpZ2luID0gKDAsIF91dGlscykuZ2V0TG9jYXRpb25PcmlnaW4oKTtcbiAgICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgob3JpZ2luKSA/IHVybC5zdWJzdHJpbmcob3JpZ2luLmxlbmd0aCkgOiB1cmw7XG59XG5mdW5jdGlvbiBwcmVwYXJlVXJsQXMocm91dGVyLCB1cmwsIGFzKSB7XG4gICAgLy8gSWYgdXJsIGFuZCBhcyBwcm92aWRlZCBhcyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24sXG4gICAgLy8gd2UnbGwgZm9ybWF0IHRoZW0gaW50byB0aGUgc3RyaW5nIHZlcnNpb24gaGVyZS5cbiAgICBsZXQgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSByZXNvbHZlSHJlZihyb3V0ZXIsIHVybCwgdHJ1ZSk7XG4gICAgY29uc3Qgb3JpZ2luID0gKDAsIF91dGlscykuZ2V0TG9jYXRpb25PcmlnaW4oKTtcbiAgICBjb25zdCBocmVmSGFkT3JpZ2luID0gcmVzb2x2ZWRIcmVmLnN0YXJ0c1dpdGgob3JpZ2luKTtcbiAgICBjb25zdCBhc0hhZE9yaWdpbiA9IHJlc29sdmVkQXMgJiYgcmVzb2x2ZWRBcy5zdGFydHNXaXRoKG9yaWdpbik7XG4gICAgcmVzb2x2ZWRIcmVmID0gc3RyaXBPcmlnaW4ocmVzb2x2ZWRIcmVmKTtcbiAgICByZXNvbHZlZEFzID0gcmVzb2x2ZWRBcyA/IHN0cmlwT3JpZ2luKHJlc29sdmVkQXMpIDogcmVzb2x2ZWRBcztcbiAgICBjb25zdCBwcmVwYXJlZFVybCA9IGhyZWZIYWRPcmlnaW4gPyByZXNvbHZlZEhyZWYgOiBhZGRCYXNlUGF0aChyZXNvbHZlZEhyZWYpO1xuICAgIGNvbnN0IHByZXBhcmVkQXMgPSBhcyA/IHN0cmlwT3JpZ2luKHJlc29sdmVIcmVmKHJvdXRlciwgYXMpKSA6IHJlc29sdmVkQXMgfHwgcmVzb2x2ZWRIcmVmO1xuICAgIHJldHVybiB7XG4gICAgICAgIHVybDogcHJlcGFyZWRVcmwsXG4gICAgICAgIGFzOiBhc0hhZE9yaWdpbiA/IHByZXBhcmVkQXMgOiBhZGRCYXNlUGF0aChwcmVwYXJlZEFzKVxuICAgIH07XG59XG5mdW5jdGlvbiByZXNvbHZlRHluYW1pY1JvdXRlKHBhdGhuYW1lLCBwYWdlcykge1xuICAgIGNvbnN0IGNsZWFuUGF0aG5hbWUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKCgwLCBfZGVub3JtYWxpemVQYWdlUGF0aCkuZGVub3JtYWxpemVQYWdlUGF0aChwYXRobmFtZSkpO1xuICAgIGlmIChjbGVhblBhdGhuYW1lID09PSAnLzQwNCcgfHwgY2xlYW5QYXRobmFtZSA9PT0gJy9fZXJyb3InKSB7XG4gICAgICAgIHJldHVybiBwYXRobmFtZTtcbiAgICB9XG4gICAgLy8gaGFuZGxlIHJlc29sdmluZyBocmVmIGZvciBkeW5hbWljIHJvdXRlc1xuICAgIGlmICghcGFnZXMuaW5jbHVkZXMoY2xlYW5QYXRobmFtZSkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICAgICAgICBwYWdlcy5zb21lKChwYWdlKT0+e1xuICAgICAgICAgICAgaWYgKCgwLCBfaXNEeW5hbWljKS5pc0R5bmFtaWNSb3V0ZShwYWdlKSAmJiAoMCwgX3JvdXRlUmVnZXgpLmdldFJvdXRlUmVnZXgocGFnZSkucmUudGVzdChjbGVhblBhdGhuYW1lKSkge1xuICAgICAgICAgICAgICAgIHBhdGhuYW1lID0gcGFnZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKTtcbn1cbmNvbnN0IG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uID0gcHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTiAmJiB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiAnc2Nyb2xsUmVzdG9yYXRpb24nIGluIHdpbmRvdy5oaXN0b3J5ICYmICEhZnVuY3Rpb24oKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IHYgPSAnX19uZXh0JztcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXNlcXVlbmNlc1xuICAgICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh2LCB2KSwgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh2KSwgdHJ1ZTtcbiAgICB9IGNhdGNoIChuKSB7XG4gICAgfVxufSgpO1xuY29uc3QgU1NHX0RBVEFfTk9UX0ZPVU5EID0gU3ltYm9sKCdTU0dfREFUQV9OT1RfRk9VTkQnKTtcbmZ1bmN0aW9uIGZldGNoUmV0cnkodXJsLCBhdHRlbXB0cykge1xuICAgIHJldHVybiBmZXRjaCh1cmwsIHtcbiAgICAgICAgLy8gQ29va2llcyBhcmUgcmVxdWlyZWQgdG8gYmUgcHJlc2VudCBmb3IgTmV4dC5qcycgU1NHIFwiUHJldmlldyBNb2RlXCIuXG4gICAgICAgIC8vIENvb2tpZXMgbWF5IGFsc28gYmUgcmVxdWlyZWQgZm9yIGBnZXRTZXJ2ZXJTaWRlUHJvcHNgLlxuICAgICAgICAvL1xuICAgICAgICAvLyA+IGBmZXRjaGAgd29u4oCZdCBzZW5kIGNvb2tpZXMsIHVubGVzcyB5b3Ugc2V0IHRoZSBjcmVkZW50aWFscyBpbml0XG4gICAgICAgIC8vID4gb3B0aW9uLlxuICAgICAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRmV0Y2hfQVBJL1VzaW5nX0ZldGNoXG4gICAgICAgIC8vXG4gICAgICAgIC8vID4gRm9yIG1heGltdW0gYnJvd3NlciBjb21wYXRpYmlsaXR5IHdoZW4gaXQgY29tZXMgdG8gc2VuZGluZyAmXG4gICAgICAgIC8vID4gcmVjZWl2aW5nIGNvb2tpZXMsIGFsd2F5cyBzdXBwbHkgdGhlIGBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ2BcbiAgICAgICAgLy8gPiBvcHRpb24gaW5zdGVhZCBvZiByZWx5aW5nIG9uIHRoZSBkZWZhdWx0LlxuICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoI2NhdmVhdHNcbiAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidcbiAgICB9KS50aGVuKChyZXMpPT57XG4gICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICBpZiAoYXR0ZW1wdHMgPiAxICYmIHJlcy5zdGF0dXMgPj0gNTAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZldGNoUmV0cnkodXJsLCBhdHRlbXB0cyAtIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXMgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLm5vdEZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vdEZvdW5kOiBTU0dfREFUQV9OT1RfRk9VTkRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzdGF0aWMgcHJvcHNgKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCBpc1NlcnZlclJlbmRlcikge1xuICAgIHJldHVybiBmZXRjaFJldHJ5KGRhdGFIcmVmLCBpc1NlcnZlclJlbmRlciA/IDMgOiAxKS5jYXRjaCgoZXJyKT0+e1xuICAgICAgICAvLyBXZSBzaG91bGQgb25seSB0cmlnZ2VyIGEgc2VydmVyLXNpZGUgdHJhbnNpdGlvbiBpZiB0aGlzIHdhcyBjYXVzZWRcbiAgICAgICAgLy8gb24gYSBjbGllbnQtc2lkZSB0cmFuc2l0aW9uLiBPdGhlcndpc2UsIHdlJ2QgZ2V0IGludG8gYW4gaW5maW5pdGVcbiAgICAgICAgLy8gbG9vcC5cbiAgICAgICAgaWYgKCFpc1NlcnZlclJlbmRlcikge1xuICAgICAgICAgICAgKDAsIF9yb3V0ZUxvYWRlcikubWFya0Fzc2V0RXJyb3IoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfSk7XG59XG5jbGFzcyBSb3V0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhdGhuYW1lMSwgcXVlcnkxLCBhczEsIHsgaW5pdGlhbFByb3BzICwgcGFnZUxvYWRlciAsIEFwcCAsIHdyYXBBcHAgLCBDb21wb25lbnQ6IENvbXBvbmVudDEgLCBlcnI6IGVycjEgLCBzdWJzY3JpcHRpb24gLCBpc0ZhbGxiYWNrICwgbG9jYWxlICwgbG9jYWxlcyAsIGRlZmF1bHRMb2NhbGUgLCBkb21haW5Mb2NhbGVzICwgaXNQcmV2aWV3ICB9KXtcbiAgICAgICAgLy8gU3RhdGljIERhdGEgQ2FjaGVcbiAgICAgICAgdGhpcy5zZGMgPSB7XG4gICAgICAgIH07XG4gICAgICAgIC8vIEluLWZsaWdodCBTZXJ2ZXIgRGF0YSBSZXF1ZXN0cywgZm9yIGRlZHVwaW5nXG4gICAgICAgIHRoaXMuc2RyID0ge1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pZHggPSAwO1xuICAgICAgICB0aGlzLm9uUG9wU3RhdGUgPSAoZSk9PntcbiAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gZS5zdGF0ZTtcbiAgICAgICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBnZXQgc3RhdGUgYXMgdW5kZWZpbmVkIGZvciB0d28gcmVhc29ucy5cbiAgICAgICAgICAgICAgICAvLyAgMS4gV2l0aCBvbGRlciBzYWZhcmkgKDwgOCkgYW5kIG9sZGVyIGNocm9tZSAoPCAzNClcbiAgICAgICAgICAgICAgICAvLyAgMi4gV2hlbiB0aGUgVVJMIGNoYW5nZWQgd2l0aCAjXG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBJbiB0aGUgYm90aCBjYXNlcywgd2UgZG9uJ3QgbmVlZCB0byBwcm9jZWVkIGFuZCBjaGFuZ2UgdGhlIHJvdXRlLlxuICAgICAgICAgICAgICAgIC8vIChhcyBpdCdzIGFscmVhZHkgY2hhbmdlZClcbiAgICAgICAgICAgICAgICAvLyBCdXQgd2UgY2FuIHNpbXBseSByZXBsYWNlIHRoZSBzdGF0ZSB3aXRoIHRoZSBuZXcgY2hhbmdlcy5cbiAgICAgICAgICAgICAgICAvLyBBY3R1YWxseSwgZm9yICgxKSB3ZSBkb24ndCBuZWVkIHRvIG5vdGhpbmcuIEJ1dCBpdCdzIGhhcmQgdG8gZGV0ZWN0IHRoYXQgZXZlbnQuXG4gICAgICAgICAgICAgICAgLy8gU28sIGRvaW5nIHRoZSBmb2xsb3dpbmcgZm9yICgxKSBkb2VzIG5vIGhhcm0uXG4gICAgICAgICAgICAgICAgY29uc3QgeyBwYXRobmFtZTogcGF0aG5hbWUxICwgcXVlcnk6IHF1ZXJ5MSAgfSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFuZ2VTdGF0ZSgncmVwbGFjZVN0YXRlJywgKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUxKSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5MVxuICAgICAgICAgICAgICAgIH0pLCAoMCwgX3V0aWxzKS5nZXRVUkwoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGF0ZS5fX04pIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZm9yY2VkU2Nyb2xsO1xuICAgICAgICAgICAgY29uc3QgeyB1cmwgLCBhczogYXMxICwgb3B0aW9ucyAsIGlkeCAgfSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04pIHtcbiAgICAgICAgICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lkeCAhPT0gaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTbmFwc2hvdCBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHNlbGYucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHNlbGYucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIG9sZCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHYgPSBzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCdfX25leHRfc2Nyb2xsXycgKyBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcmNlZFNjcm9sbCA9IEpTT04ucGFyc2Uodik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VkU2Nyb2xsID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2lkeCA9IGlkeDtcbiAgICAgICAgICAgIGNvbnN0IHsgcGF0aG5hbWU6IHBhdGhuYW1lMSAgfSA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybCh1cmwpO1xuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IHJlLXJlbmRlciBvbiBpbml0aWFsIGxvYWQsXG4gICAgICAgICAgICAvLyBjYW4gYmUgY2F1c2VkIGJ5IG5hdmlnYXRpbmcgYmFjayBmcm9tIGFuIGV4dGVybmFsIHNpdGVcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3NyICYmIGFzMSA9PT0gdGhpcy5hc1BhdGggJiYgcGF0aG5hbWUxID09PSB0aGlzLnBhdGhuYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSWYgdGhlIGRvd25zdHJlYW0gYXBwbGljYXRpb24gcmV0dXJucyBmYWxzeSwgcmV0dXJuLlxuICAgICAgICAgICAgLy8gVGhleSB3aWxsIHRoZW4gYmUgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIHRoZSBldmVudC5cbiAgICAgICAgICAgIGlmICh0aGlzLl9icHMgJiYgIXRoaXMuX2JwcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmNoYW5nZSgncmVwbGFjZVN0YXRlJywgdXJsLCBhczEsIE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgfSwgb3B0aW9ucywge1xuICAgICAgICAgICAgICAgIHNoYWxsb3c6IG9wdGlvbnMuc2hhbGxvdyAmJiB0aGlzLl9zaGFsbG93LFxuICAgICAgICAgICAgICAgIGxvY2FsZTogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgICAgICB9KSwgZm9yY2VkU2Nyb2xsKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gcmVwcmVzZW50cyB0aGUgY3VycmVudCBjb21wb25lbnQga2V5XG4gICAgICAgIHRoaXMucm91dGUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lMSk7XG4gICAgICAgIC8vIHNldCB1cCB0aGUgY29tcG9uZW50IGNhY2hlIChieSByb3V0ZSBrZXlzKVxuICAgICAgICB0aGlzLmNvbXBvbmVudHMgPSB7XG4gICAgICAgIH07XG4gICAgICAgIC8vIFdlIHNob3VsZCBub3Qga2VlcCB0aGUgY2FjaGUsIGlmIHRoZXJlJ3MgYW4gZXJyb3JcbiAgICAgICAgLy8gT3RoZXJ3aXNlLCB0aGlzIGNhdXNlIGlzc3VlcyB3aGVuIHdoZW4gZ29pbmcgYmFjayBhbmRcbiAgICAgICAgLy8gY29tZSBhZ2FpbiB0byB0aGUgZXJyb3JlZCBwYWdlLlxuICAgICAgICBpZiAocGF0aG5hbWUxICE9PSAnL19lcnJvcicpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1t0aGlzLnJvdXRlXSA9IHtcbiAgICAgICAgICAgICAgICBDb21wb25lbnQ6IENvbXBvbmVudDEsXG4gICAgICAgICAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcm9wczogaW5pdGlhbFByb3BzLFxuICAgICAgICAgICAgICAgIGVycjogZXJyMSxcbiAgICAgICAgICAgICAgICBfX05fU1NHOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU0csXG4gICAgICAgICAgICAgICAgX19OX1NTUDogaW5pdGlhbFByb3BzICYmIGluaXRpYWxQcm9wcy5fX05fU1NQXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29tcG9uZW50c1snL19hcHAnXSA9IHtcbiAgICAgICAgICAgIENvbXBvbmVudDogQXBwLFxuICAgICAgICAgICAgc3R5bGVTaGVldHM6IFtdXG4gICAgICAgIH07XG4gICAgICAgIC8vIEJhY2t3YXJkcyBjb21wYXQgZm9yIFJvdXRlci5yb3V0ZXIuZXZlbnRzXG4gICAgICAgIC8vIFRPRE86IFNob3VsZCBiZSByZW1vdmUgdGhlIGZvbGxvd2luZyBtYWpvciB2ZXJzaW9uIGFzIGl0IHdhcyBuZXZlciBkb2N1bWVudGVkXG4gICAgICAgIHRoaXMuZXZlbnRzID0gUm91dGVyLmV2ZW50cztcbiAgICAgICAgdGhpcy5wYWdlTG9hZGVyID0gcGFnZUxvYWRlcjtcbiAgICAgICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lMTtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5MTtcbiAgICAgICAgLy8gaWYgYXV0byBwcmVyZW5kZXJlZCBhbmQgZHluYW1pYyByb3V0ZSB3YWl0IHRvIHVwZGF0ZSBhc1BhdGhcbiAgICAgICAgLy8gdW50aWwgYWZ0ZXIgbW91bnQgdG8gcHJldmVudCBoeWRyYXRpb24gbWlzbWF0Y2hcbiAgICAgICAgY29uc3QgYXV0b0V4cG9ydER5bmFtaWMgPSAoMCwgX2lzRHluYW1pYykuaXNEeW5hbWljUm91dGUocGF0aG5hbWUxKSAmJiBzZWxmLl9fTkVYVF9EQVRBX18uYXV0b0V4cG9ydDtcbiAgICAgICAgdGhpcy5hc1BhdGggPSBhdXRvRXhwb3J0RHluYW1pYyA/IHBhdGhuYW1lMSA6IGFzMTtcbiAgICAgICAgdGhpcy5iYXNlUGF0aCA9IGJhc2VQYXRoO1xuICAgICAgICB0aGlzLnN1YiA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jbGMgPSBudWxsO1xuICAgICAgICB0aGlzLl93cmFwQXBwID0gd3JhcEFwcDtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGlnbm9yZSBleHRyYSBwb3BTdGF0ZSBpbiBzYWZhcmkgb24gbmF2aWdhdGluZ1xuICAgICAgICAvLyBiYWNrIGZyb20gZXh0ZXJuYWwgc2l0ZVxuICAgICAgICB0aGlzLmlzU3NyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0ZhbGxiYWNrID0gaXNGYWxsYmFjaztcbiAgICAgICAgdGhpcy5pc1JlYWR5ID0gISEoc2VsZi5fX05FWFRfREFUQV9fLmdzc3AgfHwgc2VsZi5fX05FWFRfREFUQV9fLmdpcCB8fCBzZWxmLl9fTkVYVF9EQVRBX18uYXBwR2lwICYmICFzZWxmLl9fTkVYVF9EQVRBX18uZ3NwIHx8ICFhdXRvRXhwb3J0RHluYW1pYyAmJiAhc2VsZi5sb2NhdGlvbi5zZWFyY2ggJiYgIXByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMpO1xuICAgICAgICB0aGlzLmlzUHJldmlldyA9ICEhaXNQcmV2aWV3O1xuICAgICAgICB0aGlzLmlzTG9jYWxlRG9tYWluID0gZmFsc2U7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZTtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlcyA9IGxvY2FsZXM7XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGUgPSBkZWZhdWx0TG9jYWxlO1xuICAgICAgICAgICAgdGhpcy5kb21haW5Mb2NhbGVzID0gZG9tYWluTG9jYWxlcztcbiAgICAgICAgICAgIHRoaXMuaXNMb2NhbGVEb21haW4gPSAhIWRldGVjdERvbWFpbkxvY2FsZShkb21haW5Mb2NhbGVzLCBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBcImFzXCIgZG9lc24ndCBzdGFydCB3aXRoIGRvdWJsZSBzbGFzaGVzIG9yIGVsc2UgaXQgY2FuXG4gICAgICAgICAgICAvLyB0aHJvdyBhbiBlcnJvciBhcyBpdCdzIGNvbnNpZGVyZWQgaW52YWxpZFxuICAgICAgICAgICAgaWYgKGFzMS5zdWJzdHIoMCwgMikgIT09ICcvLycpIHtcbiAgICAgICAgICAgICAgICAvLyBpbiBvcmRlciBmb3IgYGUuc3RhdGVgIHRvIHdvcmsgb24gdGhlIGBvbnBvcHN0YXRlYCBldmVudFxuICAgICAgICAgICAgICAgIC8vIHdlIGhhdmUgdG8gcmVnaXN0ZXIgdGhlIGluaXRpYWwgcm91dGUgdXBvbiBpbml0aWFsaXphdGlvblxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5fc2hvdWxkUmVzb2x2ZUhyZWYgPSBhczEgIT09IHBhdGhuYW1lMTtcbiAgICAgICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKCdyZXBsYWNlU3RhdGUnLCAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBhZGRCYXNlUGF0aChwYXRobmFtZTEpLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeTogcXVlcnkxXG4gICAgICAgICAgICAgICAgfSksICgwLCBfdXRpbHMpLmdldFVSTCgpLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMub25Qb3BTdGF0ZSk7XG4gICAgICAgICAgICAvLyBlbmFibGUgY3VzdG9tIHNjcm9sbCByZXN0b3JhdGlvbiBoYW5kbGluZyB3aGVuIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIGJyb3dzZXIncyBkZWZhdWx0IGhhbmRsaW5nXG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgICAgICAgICAgIGlmIChtYW51YWxTY3JvbGxSZXN0b3JhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZWxvYWQoKSB7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAqIEdvIGJhY2sgaW4gaGlzdG9yeVxuICAgKi8gYmFjaygpIHtcbiAgICAgICAgd2luZG93Lmhpc3RvcnkuYmFjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICogUGVyZm9ybXMgYSBgcHVzaFN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovIHB1c2godXJsLCBhcywgb3B0aW9ucyA9IHtcbiAgICB9KSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiByZW1vdmUgaW4gdGhlIGZ1dHVyZSB3aGVuIHdlIHVwZGF0ZSBoaXN0b3J5IGJlZm9yZSByb3V0ZSBjaGFuZ2VcbiAgICAgICAgICAgIC8vIGlzIGNvbXBsZXRlLCBhcyB0aGUgcG9wc3RhdGUgZXZlbnQgc2hvdWxkIGhhbmRsZSB0aGlzIGNhcHR1cmUuXG4gICAgICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTbmFwc2hvdCBzY3JvbGwgcG9zaXRpb24gcmlnaHQgYmVmb3JlIG5hdmlnYXRpbmcgdG8gYSBuZXcgcGFnZTpcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSgnX19uZXh0X3Njcm9sbF8nICsgdGhpcy5faWR4LCBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiBzZWxmLnBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogc2VsZi5wYWdlWU9mZnNldFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAge1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAoeyB1cmwgLCBhcyAgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmNoYW5nZSgncHVzaFN0YXRlJywgdXJsLCBhcywgb3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgKiBQZXJmb3JtcyBhIGByZXBsYWNlU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi8gcmVwbGFjZSh1cmwsIGFzLCBvcHRpb25zID0ge1xuICAgIH0pIHtcbiAgICAgICAgKHsgdXJsICwgYXMgIH0gPSBwcmVwYXJlVXJsQXModGhpcywgdXJsLCBhcykpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3JlcGxhY2VTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBhc3luYyBjaGFuZ2UobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zLCBmb3JjZWRTY3JvbGwpIHtcbiAgICAgICAgaWYgKCFpc0xvY2FsVVJMKHVybCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNob3VsZFJlc29sdmVIcmVmID0gdXJsID09PSBhcyB8fCBvcHRpb25zLl9oIHx8IG9wdGlvbnMuX3Nob3VsZFJlc29sdmVIcmVmO1xuICAgICAgICAvLyBmb3Igc3RhdGljIHBhZ2VzIHdpdGggcXVlcnkgcGFyYW1zIGluIHRoZSBVUkwgd2UgZGVsYXlcbiAgICAgICAgLy8gbWFya2luZyB0aGUgcm91dGVyIHJlYWR5IHVudGlsIGFmdGVyIHRoZSBxdWVyeSBpcyB1cGRhdGVkXG4gICAgICAgIGlmIChvcHRpb25zLl9oKSB7XG4gICAgICAgICAgICB0aGlzLmlzUmVhZHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByZXZMb2NhbGUgPSB0aGlzLmxvY2FsZTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgIHRoaXMubG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgPT09IGZhbHNlID8gdGhpcy5kZWZhdWx0TG9jYWxlIDogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5sb2NhbGU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMubG9jYWxlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gdGhpcy5sb2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRBcyA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcyk7XG4gICAgICAgICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZXMpO1xuICAgICAgICAgICAgaWYgKGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGU7XG4gICAgICAgICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXJzZWRBcy5wYXRobmFtZSk7XG4gICAgICAgICAgICAgICAgYXMgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcyk7XG4gICAgICAgICAgICAgICAgdXJsID0gYWRkQmFzZVBhdGgoKDAsIF9ub3JtYWxpemVMb2NhbGVQYXRoKS5ub3JtYWxpemVMb2NhbGVQYXRoKGhhc0Jhc2VQYXRoKHVybCkgPyBkZWxCYXNlUGF0aCh1cmwpIDogdXJsLCB0aGlzLmxvY2FsZXMpLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkaWROYXZpZ2F0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB3cmFwIHRoaXMgaW4gdGhlIGVudiBjaGVjayBhZ2FpbiBzaW5jZSByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgICAvLyBtb3ZlcyB0aGlzIG9uIGl0cyBvd24gZHVlIHRvIHRoZSByZXR1cm5cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlZjtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgbG9jYWxlIGlzbid0IGNvbmZpZ3VyZWQgaGFyZCBuYXZpZ2F0ZSB0byBzaG93IDQwNCBwYWdlXG4gICAgICAgICAgICAgICAgaWYgKCEoKHJlZiA9IHRoaXMubG9jYWxlcykgPT09IG51bGwgfHwgcmVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZWYuaW5jbHVkZXModGhpcy5sb2NhbGUpKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGFkZExvY2FsZShwYXJzZWRBcy5wYXRobmFtZSwgdGhpcy5sb2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyB3YXMgcHJldmlvdXNseSBhIHJldHVybiBidXQgd2FzIHJlbW92ZWQgaW4gZmF2b3JcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICAgICAgICAgICAgZGlkTmF2aWdhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGRldGVjdGVkRG9tYWluID0gZGV0ZWN0RG9tYWluTG9jYWxlKHRoaXMuZG9tYWluTG9jYWxlcywgdW5kZWZpbmVkLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB3ZSBhcmUgbmF2aWdhdGluZyB0byBhIGRvbWFpbiBsb2NhbGUgZW5zdXJlIHdlIHJlZGlyZWN0IHRvIHRoZVxuICAgICAgICAgICAgICAgIC8vIGNvcnJlY3QgZG9tYWluXG4gICAgICAgICAgICAgICAgaWYgKCFkaWROYXZpZ2F0ZSAmJiBkZXRlY3RlZERvbWFpbiAmJiB0aGlzLmlzTG9jYWxlRG9tYWluICYmIHNlbGYubG9jYXRpb24uaG9zdG5hbWUgIT09IGRldGVjdGVkRG9tYWluLmRvbWFpbikge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhc05vQmFzZVBhdGggPSBkZWxCYXNlUGF0aChhcyk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke2RldGVjdGVkRG9tYWluLmRvbWFpbn0ke2FkZEJhc2VQYXRoKGAke3RoaXMubG9jYWxlID09PSBkZXRlY3RlZERvbWFpbi5kZWZhdWx0TG9jYWxlID8gJycgOiBgLyR7dGhpcy5sb2NhbGV9YH0ke2FzTm9CYXNlUGF0aCA9PT0gJy8nID8gJycgOiBhc05vQmFzZVBhdGh9YCB8fCAnLycpfWA7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgICAgICAgICAgIC8vIG9mIGJldHRlciBkZWFkIGNvZGUgZWxpbWluYXRpb24gd2l0aCByZWdlbmVyYXRvciBydW50aW1lXG4gICAgICAgICAgICAgICAgICAgIGRpZE5hdmlnYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGlkTmF2aWdhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKCk9PntcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW9wdGlvbnMuX2gpIHtcbiAgICAgICAgICAgIHRoaXMuaXNTc3IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBtYXJraW5nIHJvdXRlIGNoYW5nZXMgYXMgYSBuYXZpZ2F0aW9uIHN0YXJ0IGVudHJ5XG4gICAgICAgIGlmIChfdXRpbHMuU1QpIHtcbiAgICAgICAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ3JvdXRlQ2hhbmdlJyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgeyBzaGFsbG93ID1mYWxzZSAgfSA9IG9wdGlvbnM7XG4gICAgICAgIGNvbnN0IHJvdXRlUHJvcHMgPSB7XG4gICAgICAgICAgICBzaGFsbG93XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9pbkZsaWdodFJvdXRlKSB7XG4gICAgICAgICAgICB0aGlzLmFib3J0Q29tcG9uZW50TG9hZCh0aGlzLl9pbkZsaWdodFJvdXRlLCByb3V0ZVByb3BzKTtcbiAgICAgICAgfVxuICAgICAgICBhcyA9IGFkZEJhc2VQYXRoKGFkZExvY2FsZShoYXNCYXNlUGF0aChhcykgPyBkZWxCYXNlUGF0aChhcykgOiBhcywgb3B0aW9ucy5sb2NhbGUsIHRoaXMuZGVmYXVsdExvY2FsZSkpO1xuICAgICAgICBjb25zdCBjbGVhbmVkQXMgPSBkZWxMb2NhbGUoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsIHRoaXMubG9jYWxlKTtcbiAgICAgICAgdGhpcy5faW5GbGlnaHRSb3V0ZSA9IGFzO1xuICAgICAgICBsZXQgbG9jYWxlQ2hhbmdlID0gcHJldkxvY2FsZSAhPT0gdGhpcy5sb2NhbGU7XG4gICAgICAgIC8vIElmIHRoZSB1cmwgY2hhbmdlIGlzIG9ubHkgcmVsYXRlZCB0byBhIGhhc2ggY2hhbmdlXG4gICAgICAgIC8vIFdlIHNob3VsZCBub3QgcHJvY2VlZC4gV2Ugc2hvdWxkIG9ubHkgY2hhbmdlIHRoZSBzdGF0ZS5cbiAgICAgICAgLy8gV0FSTklORzogYF9oYCBpcyBhbiBpbnRlcm5hbCBvcHRpb24gZm9yIGhhbmRpbmcgTmV4dC5qcyBjbGllbnQtc2lkZVxuICAgICAgICAvLyBoeWRyYXRpb24uIFlvdXIgYXBwIHNob3VsZCBfbmV2ZXJfIHVzZSB0aGlzIHByb3BlcnR5LiBJdCBtYXkgY2hhbmdlIGF0XG4gICAgICAgIC8vIGFueSB0aW1lIHdpdGhvdXQgbm90aWNlLlxuICAgICAgICBpZiAoIW9wdGlvbnMuX2ggJiYgdGhpcy5vbmx5QUhhc2hDaGFuZ2UoY2xlYW5lZEFzKSAmJiAhbG9jYWxlQ2hhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLmFzUGF0aCA9IGNsZWFuZWRBcztcbiAgICAgICAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgLy8gVE9ETzogZG8gd2UgbmVlZCB0aGUgcmVzb2x2ZWQgaHJlZiB3aGVuIG9ubHkgYSBoYXNoIGNoYW5nZT9cbiAgICAgICAgICAgIHRoaXMuY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9IYXNoKGNsZWFuZWRBcyk7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeSh0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0sIG51bGwpO1xuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdoYXNoQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcGFyc2VkID0gKDAsIF9wYXJzZVJlbGF0aXZlVXJsKS5wYXJzZVJlbGF0aXZlVXJsKHVybCk7XG4gICAgICAgIGxldCB7IHBhdGhuYW1lOiBwYXRobmFtZTEgLCBxdWVyeTogcXVlcnkxICB9ID0gcGFyc2VkO1xuICAgICAgICAvLyBUaGUgYnVpbGQgbWFuaWZlc3QgbmVlZHMgdG8gYmUgbG9hZGVkIGJlZm9yZSBhdXRvLXN0YXRpYyBkeW5hbWljIHBhZ2VzXG4gICAgICAgIC8vIGdldCB0aGVpciBxdWVyeSBwYXJhbWV0ZXJzIHRvIGFsbG93IGVuc3VyaW5nIHRoZXkgY2FuIGJlIHBhcnNlZCBwcm9wZXJseVxuICAgICAgICAvLyB3aGVuIHJld3JpdHRlbiB0b1xuICAgICAgICBsZXQgcGFnZXMsIHJld3JpdGVzO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFnZXMgPSBhd2FpdCB0aGlzLnBhZ2VMb2FkZXIuZ2V0UGFnZUxpc3QoKTtcbiAgICAgICAgICAgICh7IF9fcmV3cml0ZXM6IHJld3JpdGVzICB9ID0gYXdhaXQgKDAsIF9yb3V0ZUxvYWRlcikuZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyMSkge1xuICAgICAgICAgICAgLy8gSWYgd2UgZmFpbCB0byByZXNvbHZlIHRoZSBwYWdlIGxpc3Qgb3IgY2xpZW50LWJ1aWxkIG1hbmlmZXN0LCB3ZSBtdXN0XG4gICAgICAgICAgICAvLyBkbyBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb246XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGFza2VkIHRvIGNoYW5nZSB0aGUgY3VycmVudCBVUkwgd2Ugc2hvdWxkIHJlbG9hZCB0aGUgY3VycmVudCBwYWdlXG4gICAgICAgIC8vIChub3QgbG9jYXRpb24ucmVsb2FkKCkgYnV0IHJlbG9hZCBnZXRJbml0aWFsUHJvcHMgYW5kIG90aGVyIE5leHQuanMgc3R1ZmZzKVxuICAgICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gc2V0IHRoZSBtZXRob2QgPSByZXBsYWNlU3RhdGUgYWx3YXlzXG4gICAgICAgIC8vIGFzIHRoaXMgc2hvdWxkIG5vdCBnbyBpbnRvIHRoZSBoaXN0b3J5IChUaGF0J3MgaG93IGJyb3dzZXJzIHdvcmspXG4gICAgICAgIC8vIFdlIHNob3VsZCBjb21wYXJlIHRoZSBuZXcgYXNQYXRoIHRvIHRoZSBjdXJyZW50IGFzUGF0aCwgbm90IHRoZSB1cmxcbiAgICAgICAgaWYgKCF0aGlzLnVybElzTmV3KGNsZWFuZWRBcykgJiYgIWxvY2FsZUNoYW5nZSkge1xuICAgICAgICAgICAgbWV0aG9kID0gJ3JlcGxhY2VTdGF0ZSc7XG4gICAgICAgIH1cbiAgICAgICAgLy8gd2UgbmVlZCB0byByZXNvbHZlIHRoZSBhcyB2YWx1ZSB1c2luZyByZXdyaXRlcyBmb3IgZHluYW1pYyBTU0dcbiAgICAgICAgLy8gcGFnZXMgdG8gYWxsb3cgYnVpbGRpbmcgdGhlIGRhdGEgVVJMIGNvcnJlY3RseVxuICAgICAgICBsZXQgcmVzb2x2ZWRBcyA9IGFzO1xuICAgICAgICAvLyB1cmwgYW5kIGFzIHNob3VsZCBhbHdheXMgYmUgcHJlZml4ZWQgd2l0aCBiYXNlUGF0aCBieSB0aGlzXG4gICAgICAgIC8vIHBvaW50IGJ5IGVpdGhlciBuZXh0L2xpbmsgb3Igcm91dGVyLnB1c2gvcmVwbGFjZSBzbyBzdHJpcCB0aGVcbiAgICAgICAgLy8gYmFzZVBhdGggZnJvbSB0aGUgcGF0aG5hbWUgdG8gbWF0Y2ggdGhlIHBhZ2VzIGRpciAxLXRvLTFcbiAgICAgICAgcGF0aG5hbWUxID0gcGF0aG5hbWUxID8gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChkZWxCYXNlUGF0aChwYXRobmFtZTEpKSA6IHBhdGhuYW1lMTtcbiAgICAgICAgaWYgKHNob3VsZFJlc29sdmVIcmVmICYmIHBhdGhuYW1lMSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICAgICAgICBvcHRpb25zLl9zaG91bGRSZXNvbHZlSHJlZiA9IHRydWU7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhcy5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9ICgwLCBfcmVzb2x2ZVJld3JpdGVzKS5kZWZhdWx0KGFkZEJhc2VQYXRoKGFkZExvY2FsZShjbGVhbmVkQXMsIHRoaXMubG9jYWxlKSksIHBhZ2VzLCByZXdyaXRlcywgcXVlcnkxLCAocCk9PnJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpXG4gICAgICAgICAgICAgICAgLCB0aGlzLmxvY2FsZXMpO1xuICAgICAgICAgICAgICAgIHJlc29sdmVkQXMgPSByZXdyaXRlc1Jlc3VsdC5hc1BhdGg7XG4gICAgICAgICAgICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIGFsbG93IHRoZSBjb3JyZWN0IHBhZ2UgY2h1bmsgdG8gYmUgbG9hZGVkXG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lMSA9IHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZjtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gYWRkQmFzZVBhdGgocGF0aG5hbWUxKTtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGF0aG5hbWUxLCBwYWdlcyk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUxKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lMSA9IHBhcnNlZC5wYXRobmFtZTtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gYWRkQmFzZVBhdGgocGF0aG5hbWUxKTtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91dGUgPSAoMCwgX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2gpLnJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lMSk7XG4gICAgICAgIGlmICghaXNMb2NhbFVSTChhcykpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIGhyZWY6IFwiJHt1cmx9XCIgYW5kIGFzOiBcIiR7YXN9XCIsIHJlY2VpdmVkIHJlbGF0aXZlIGhyZWYgYW5kIGV4dGVybmFsIGFzYCArIGBcXG5TZWUgbW9yZSBpbmZvOiBodHRwczovL25leHRqcy5vcmcvZG9jcy9tZXNzYWdlcy9pbnZhbGlkLXJlbGF0aXZlLXVybC1leHRlcm5hbC1hc2ApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhcztcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlZEFzID0gZGVsTG9jYWxlKGRlbEJhc2VQYXRoKHJlc29sdmVkQXMpLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgIGlmICgoMCwgX2lzRHluYW1pYykuaXNEeW5hbWljUm91dGUocm91dGUpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWRBcyA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChyZXNvbHZlZEFzKTtcbiAgICAgICAgICAgIGNvbnN0IGFzUGF0aG5hbWUgPSBwYXJzZWRBcy5wYXRobmFtZTtcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlUmVnZXggPSAoMCwgX3JvdXRlUmVnZXgpLmdldFJvdXRlUmVnZXgocm91dGUpO1xuICAgICAgICAgICAgY29uc3Qgcm91dGVNYXRjaCA9ICgwLCBfcm91dGVNYXRjaGVyKS5nZXRSb3V0ZU1hdGNoZXIocm91dGVSZWdleCkoYXNQYXRobmFtZSk7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRJbnRlcnBvbGF0ZSA9IHJvdXRlID09PSBhc1BhdGhuYW1lO1xuICAgICAgICAgICAgY29uc3QgaW50ZXJwb2xhdGVkQXMgPSBzaG91bGRJbnRlcnBvbGF0ZSA/IGludGVycG9sYXRlQXMocm91dGUsIGFzUGF0aG5hbWUsIHF1ZXJ5MSkgOiB7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCFyb3V0ZU1hdGNoIHx8IHNob3VsZEludGVycG9sYXRlICYmICFpbnRlcnBvbGF0ZWRBcy5yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtaXNzaW5nUGFyYW1zID0gT2JqZWN0LmtleXMocm91dGVSZWdleC5ncm91cHMpLmZpbHRlcigocGFyYW0pPT4hcXVlcnkxW3BhcmFtXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKG1pc3NpbmdQYXJhbXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGAke3Nob3VsZEludGVycG9sYXRlID8gYEludGVycG9sYXRpbmcgaHJlZmAgOiBgTWlzbWF0Y2hpbmcgXFxgYXNcXGAgYW5kIFxcYGhyZWZcXGBgfSBmYWlsZWQgdG8gbWFudWFsbHkgcHJvdmlkZSBgICsgYHRoZSBwYXJhbXM6ICR7bWlzc2luZ1BhcmFtcy5qb2luKCcsICcpfSBpbiB0aGUgXFxgaHJlZlxcYCdzIFxcYHF1ZXJ5XFxgYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKChzaG91bGRJbnRlcnBvbGF0ZSA/IGBUaGUgcHJvdmlkZWQgXFxgaHJlZlxcYCAoJHt1cmx9KSB2YWx1ZSBpcyBtaXNzaW5nIHF1ZXJ5IHZhbHVlcyAoJHttaXNzaW5nUGFyYW1zLmpvaW4oJywgJyl9KSB0byBiZSBpbnRlcnBvbGF0ZWQgcHJvcGVybHkuIGAgOiBgVGhlIHByb3ZpZGVkIFxcYGFzXFxgIHZhbHVlICgke2FzUGF0aG5hbWV9KSBpcyBpbmNvbXBhdGlibGUgd2l0aCB0aGUgXFxgaHJlZlxcYCB2YWx1ZSAoJHtyb3V0ZX0pLiBgKSArIGBSZWFkIG1vcmU6IGh0dHBzOi8vbmV4dGpzLm9yZy9kb2NzL21lc3NhZ2VzLyR7c2hvdWxkSW50ZXJwb2xhdGUgPyAnaHJlZi1pbnRlcnBvbGF0aW9uLWZhaWxlZCcgOiAnaW5jb21wYXRpYmxlLWhyZWYtYXMnfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hvdWxkSW50ZXJwb2xhdGUpIHtcbiAgICAgICAgICAgICAgICBhcyA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgICAgIH0sIHBhcnNlZEFzLCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lOiBpbnRlcnBvbGF0ZWRBcy5yZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5OiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnkxLCBpbnRlcnBvbGF0ZWRBcy5wYXJhbXMpXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBNZXJnZSBwYXJhbXMgaW50byBgcXVlcnlgLCBvdmVyd3JpdGluZyBhbnkgc3BlY2lmaWVkIGluIHNlYXJjaFxuICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24ocXVlcnkxLCByb3V0ZU1hdGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgICAgICAgbGV0IHJvdXRlSW5mbyA9IGF3YWl0IHRoaXMuZ2V0Um91dGVJbmZvKHJvdXRlLCBwYXRobmFtZTEsIHF1ZXJ5MSwgYXMsIHJlc29sdmVkQXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgbGV0IHsgZXJyb3IgLCBwcm9wcyAsIF9fTl9TU0cgLCBfX05fU1NQICB9ID0gcm91dGVJbmZvO1xuICAgICAgICAgICAgLy8gaGFuZGxlIHJlZGlyZWN0IG9uIGNsaWVudC10cmFuc2l0aW9uXG4gICAgICAgICAgICBpZiAoKF9fTl9TU0cgfHwgX19OX1NTUCkgJiYgcHJvcHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocHJvcHMucGFnZVByb3BzICYmIHByb3BzLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1QpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb24gPSBwcm9wcy5wYWdlUHJvcHMuX19OX1JFRElSRUNUO1xuICAgICAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiBkZXN0aW5hdGlvbiBpcyBpbnRlcm5hbCAocmVzb2x2ZXMgdG8gYSBwYWdlKSBhbmQgYXR0ZW1wdFxuICAgICAgICAgICAgICAgICAgICAvLyBjbGllbnQtbmF2aWdhdGlvbiBpZiBpdCBpcyBmYWxsaW5nIGJhY2sgdG8gaGFyZCBuYXZpZ2F0aW9uIGlmXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0J3Mgbm90XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvbi5zdGFydHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZEhyZWYgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwoZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkSHJlZi5wYXRobmFtZSA9IHJlc29sdmVEeW5hbWljUm91dGUocGFyc2VkSHJlZi5wYXRobmFtZSwgcGFnZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB1cmw6IG5ld1VybCAsIGFzOiBuZXdBcyAgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCBkZXN0aW5hdGlvbiwgZGVzdGluYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKG1ldGhvZCwgbmV3VXJsLCBuZXdBcywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmlzUHJldmlldyA9ICEhcHJvcHMuX19OX1BSRVZJRVc7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIFNTRyBkYXRhIDQwNFxuICAgICAgICAgICAgICAgIGlmIChwcm9wcy5ub3RGb3VuZCA9PT0gU1NHX0RBVEFfTk9UX0ZPVU5EKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBub3RGb3VuZFJvdXRlO1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudCgnLzQwNCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvNDA0JztcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvX2Vycm9yJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByb3V0ZUluZm8gPSBhd2FpdCB0aGlzLmdldFJvdXRlSW5mbyhub3RGb3VuZFJvdXRlLCBub3RGb3VuZFJvdXRlLCBxdWVyeTEsIGFzLCByZXNvbHZlZEFzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFsbG93OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICB0aGlzLmNoYW5nZVN0YXRlKG1ldGhvZCwgdXJsLCBhcywgb3B0aW9ucyk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFwcENvbXAgPSB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50O1xuICAgICAgICAgICAgICAgIHdpbmRvdy5uZXh0LmlzUHJlcmVuZGVyZWQgPSBhcHBDb21wLmdldEluaXRpYWxQcm9wcyA9PT0gYXBwQ29tcC5vcmlnR2V0SW5pdGlhbFByb3BzICYmICFyb3V0ZUluZm8uQ29tcG9uZW50LmdldEluaXRpYWxQcm9wcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb25zLl9oICYmIHBhdGhuYW1lMSA9PT0gJy9fZXJyb3InICYmICgocmVmID0gc2VsZi5fX05FWFRfREFUQV9fLnByb3BzKSA9PT0gbnVsbCB8fCByZWYgPT09IHZvaWQgMCA/IHZvaWQgMCA6IChyZWYxID0gcmVmLnBhZ2VQcm9wcykgPT09IG51bGwgfHwgcmVmMSA9PT0gdm9pZCAwID8gdm9pZCAwIDogcmVmMS5zdGF0dXNDb2RlKSA9PT0gNTAwICYmIChwcm9wcyA9PT0gbnVsbCB8fCBwcm9wcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogcHJvcHMucGFnZVByb3BzKSkge1xuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBzdGF0dXNDb2RlIGlzIHN0aWxsIGNvcnJlY3QgZm9yIHN0YXRpYyA1MDAgcGFnZVxuICAgICAgICAgICAgICAgIC8vIHdoZW4gdXBkYXRpbmcgcXVlcnkgaW5mb3JtYXRpb25cbiAgICAgICAgICAgICAgICBwcm9wcy5wYWdlUHJvcHMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNoYWxsb3cgcm91dGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIHNhbWUgcGFnZSBVUkwgY2hhbmdlcy5cbiAgICAgICAgICAgIGNvbnN0IGlzVmFsaWRTaGFsbG93Um91dGUgPSBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGU7XG4gICAgICAgICAgICB2YXIgX3Njcm9sbDtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZFNjcm9sbCA9IChfc2Nyb2xsID0gb3B0aW9ucy5zY3JvbGwpICE9PSBudWxsICYmIF9zY3JvbGwgIT09IHZvaWQgMCA/IF9zY3JvbGwgOiAhaXNWYWxpZFNoYWxsb3dSb3V0ZTtcbiAgICAgICAgICAgIGNvbnN0IHJlc2V0U2Nyb2xsID0gc2hvdWxkU2Nyb2xsID8ge1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgfSA6IG51bGw7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLnNldChyb3V0ZSwgcGF0aG5hbWUxLCBxdWVyeTEsIGNsZWFuZWRBcywgcm91dGVJbmZvLCBmb3JjZWRTY3JvbGwgIT09IG51bGwgJiYgZm9yY2VkU2Nyb2xsICE9PSB2b2lkIDAgPyBmb3JjZWRTY3JvbGwgOiByZXNldFNjcm9sbCkuY2F0Y2goKGUpPT57XG4gICAgICAgICAgICAgICAgaWYgKGUuY2FuY2VsbGVkKSBlcnJvciA9IGVycm9yIHx8IGU7XG4gICAgICAgICAgICAgICAgZWxzZSB0aHJvdyBlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnJvciwgY2xlYW5lZEFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5sYW5nID0gdGhpcy5sb2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUNvbXBsZXRlJywgYXMsIHJvdXRlUHJvcHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gY2F0Y2ggKGVycjEpIHtcbiAgICAgICAgICAgIGlmIChlcnIxLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zID0ge1xuICAgIH0pIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygd2luZG93Lmhpc3RvcnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkgaXMgbm90IGF2YWlsYWJsZS5gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHdpbmRvdy5oaXN0b3J5W21ldGhvZF0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkuJHttZXRob2R9IGlzIG5vdCBhdmFpbGFibGVgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgfHwgKDAsIF91dGlscykuZ2V0VVJMKCkgIT09IGFzKSB7XG4gICAgICAgICAgICB0aGlzLl9zaGFsbG93ID0gb3B0aW9ucy5zaGFsbG93O1xuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnlbbWV0aG9kXSh7XG4gICAgICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgICAgIGFzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgICAgICAgX19OOiB0cnVlLFxuICAgICAgICAgICAgICAgIGlkeDogdGhpcy5faWR4ID0gbWV0aG9kICE9PSAncHVzaFN0YXRlJyA/IHRoaXMuX2lkeCA6IHRoaXMuX2lkeCArIDFcbiAgICAgICAgICAgIH0sIC8vIE1vc3QgYnJvd3NlcnMgY3VycmVudGx5IGlnbm9yZXMgdGhpcyBwYXJhbWV0ZXIsIGFsdGhvdWdoIHRoZXkgbWF5IHVzZSBpdCBpbiB0aGUgZnV0dXJlLlxuICAgICAgICAgICAgLy8gUGFzc2luZyB0aGUgZW1wdHkgc3RyaW5nIGhlcmUgc2hvdWxkIGJlIHNhZmUgYWdhaW5zdCBmdXR1cmUgY2hhbmdlcyB0byB0aGUgbWV0aG9kLlxuICAgICAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkvcmVwbGFjZVN0YXRlXG4gICAgICAgICAgICAnJywgYXMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZVJvdXRlSW5mb0Vycm9yKGVyciwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcm91dGVQcm9wcywgbG9hZEVycm9yRmFpbCkge1xuICAgICAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgICAgICAgLy8gYnViYmxlIHVwIGNhbmNlbGxhdGlvbiBlcnJvcnNcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKDAsIF9yb3V0ZUxvYWRlcikuaXNBc3NldEVycm9yKGVycikgfHwgbG9hZEVycm9yRmFpbCkge1xuICAgICAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyLCBhcywgcm91dGVQcm9wcyk7XG4gICAgICAgICAgICAvLyBJZiB3ZSBjYW4ndCBsb2FkIHRoZSBwYWdlIGl0IGNvdWxkIGJlIG9uZSBvZiBmb2xsb3dpbmcgcmVhc29uc1xuICAgICAgICAgICAgLy8gIDEuIFBhZ2UgZG9lc24ndCBleGlzdHNcbiAgICAgICAgICAgIC8vICAyLiBQYWdlIGRvZXMgZXhpc3QgaW4gYSBkaWZmZXJlbnQgem9uZVxuICAgICAgICAgICAgLy8gIDMuIEludGVybmFsIGVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHBhZ2VcbiAgICAgICAgICAgIC8vIFNvLCBkb2luZyBhIGhhcmQgcmVsb2FkIGlzIHRoZSBwcm9wZXIgd2F5IHRvIGRlYWwgd2l0aCB0aGlzLlxuICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBhcztcbiAgICAgICAgICAgIC8vIENoYW5naW5nIHRoZSBVUkwgZG9lc24ndCBibG9jayBleGVjdXRpbmcgdGhlIGN1cnJlbnQgY29kZSBwYXRoLlxuICAgICAgICAgICAgLy8gU28gbGV0J3MgdGhyb3cgYSBjYW5jZWxsYXRpb24gZXJyb3Igc3RvcCB0aGUgcm91dGluZyBsb2dpYy5cbiAgICAgICAgICAgIHRocm93IGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKTtcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IENvbXBvbmVudDE7XG4gICAgICAgICAgICBsZXQgc3R5bGVTaGVldHM7XG4gICAgICAgICAgICBsZXQgcHJvcHM7XG4gICAgICAgICAgICBpZiAodHlwZW9mIENvbXBvbmVudDEgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBzdHlsZVNoZWV0cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAoeyBwYWdlOiBDb21wb25lbnQxICwgc3R5bGVTaGVldHMgIH0gPSBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KCcvX2Vycm9yJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgcm91dGVJbmZvID0ge1xuICAgICAgICAgICAgICAgIHByb3BzLFxuICAgICAgICAgICAgICAgIENvbXBvbmVudDogQ29tcG9uZW50MSxcbiAgICAgICAgICAgICAgICBzdHlsZVNoZWV0cyxcbiAgICAgICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICAgICAgZXJyb3I6IGVyclxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghcm91dGVJbmZvLnByb3BzKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gYXdhaXQgdGhpcy5nZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50MSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChnaXBFcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgaW4gZXJyb3IgcGFnZSBgZ2V0SW5pdGlhbFByb3BzYDogJywgZ2lwRXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcm91dGVJbmZvLnByb3BzID0ge1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3V0ZUluZm87XG4gICAgICAgIH0gY2F0Y2ggKHJvdXRlSW5mb0Vycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlUm91dGVJbmZvRXJyb3Iocm91dGVJbmZvRXJyLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZVByb3BzLCB0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRSb3V0ZUluZm8ocm91dGUsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIHJlc29sdmVkQXMsIHJvdXRlUHJvcHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nUm91dGVJbmZvID0gdGhpcy5jb21wb25lbnRzW3JvdXRlXTtcbiAgICAgICAgICAgIGlmIChyb3V0ZVByb3BzLnNoYWxsb3cgJiYgZXhpc3RpbmdSb3V0ZUluZm8gJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXhpc3RpbmdSb3V0ZUluZm87XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBjYWNoZWRSb3V0ZUluZm8gPSBleGlzdGluZ1JvdXRlSW5mbyAmJiAnaW5pdGlhbCcgaW4gZXhpc3RpbmdSb3V0ZUluZm8gPyB1bmRlZmluZWQgOiBleGlzdGluZ1JvdXRlSW5mbztcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5mbyA9IGNhY2hlZFJvdXRlSW5mbyA/IGNhY2hlZFJvdXRlSW5mbyA6IGF3YWl0IHRoaXMuZmV0Y2hDb21wb25lbnQocm91dGUpLnRoZW4oKHJlcyk9Pih7XG4gICAgICAgICAgICAgICAgICAgIENvbXBvbmVudDogcmVzLnBhZ2UsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlU2hlZXRzOiByZXMuc3R5bGVTaGVldHMsXG4gICAgICAgICAgICAgICAgICAgIF9fTl9TU0c6IHJlcy5tb2QuX19OX1NTRyxcbiAgICAgICAgICAgICAgICAgICAgX19OX1NTUDogcmVzLm1vZC5fX05fU1NQXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCB7IENvbXBvbmVudDogQ29tcG9uZW50MSAsIF9fTl9TU0cgLCBfX05fU1NQICB9ID0gcm91dGVJbmZvO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSAgfSA9IHJlcXVpcmUoJ3JlYWN0LWlzJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc1ZhbGlkRWxlbWVudFR5cGUoQ29tcG9uZW50MSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZGVmYXVsdCBleHBvcnQgaXMgbm90IGEgUmVhY3QgQ29tcG9uZW50IGluIHBhZ2U6IFwiJHtwYXRobmFtZX1cImApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBkYXRhSHJlZjtcbiAgICAgICAgICAgIGlmIChfX05fU1NHIHx8IF9fTl9TU1ApIHtcbiAgICAgICAgICAgICAgICBkYXRhSHJlZiA9IHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZigoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbih7XG4gICAgICAgICAgICAgICAgICAgIHBhdGhuYW1lLFxuICAgICAgICAgICAgICAgICAgICBxdWVyeVxuICAgICAgICAgICAgICAgIH0pLCByZXNvbHZlZEFzLCBfX05fU1NHLCB0aGlzLmxvY2FsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IGF3YWl0IHRoaXMuX2dldERhdGEoKCk9Pl9fTl9TU0cgPyB0aGlzLl9nZXRTdGF0aWNEYXRhKGRhdGFIcmVmKSA6IF9fTl9TU1AgPyB0aGlzLl9nZXRTZXJ2ZXJEYXRhKGRhdGFIcmVmKSA6IHRoaXMuZ2V0SW5pdGlhbFByb3BzKENvbXBvbmVudDEsIC8vIHdlIHByb3ZpZGUgQXBwVHJlZSBsYXRlciBzbyB0aGlzIG5lZWRzIHRvIGJlIGBhbnlgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgICAgIGFzUGF0aDogYXMsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZTogdGhpcy5sb2NhbGUsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZXM6IHRoaXMubG9jYWxlcyxcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdExvY2FsZTogdGhpcy5kZWZhdWx0TG9jYWxlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByb3V0ZUluZm8ucHJvcHMgPSBwcm9wcztcbiAgICAgICAgICAgIHRoaXMuY29tcG9uZW50c1tyb3V0ZV0gPSByb3V0ZUluZm87XG4gICAgICAgICAgICByZXR1cm4gcm91dGVJbmZvO1xuICAgICAgICB9IGNhdGNoIChlcnIyKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihlcnIyLCBwYXRobmFtZSwgcXVlcnksIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQocm91dGUsIHBhdGhuYW1lLCBxdWVyeSwgYXMsIGRhdGEsIHJlc2V0U2Nyb2xsKSB7XG4gICAgICAgIHRoaXMuaXNGYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJvdXRlID0gcm91dGU7XG4gICAgICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZTtcbiAgICAgICAgdGhpcy5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgICB0aGlzLmFzUGF0aCA9IGFzO1xuICAgICAgICByZXR1cm4gdGhpcy5ub3RpZnkoZGF0YSwgcmVzZXRTY3JvbGwpO1xuICAgIH1cbiAgICAvKipcbiAgICogQ2FsbGJhY2sgdG8gZXhlY3V0ZSBiZWZvcmUgcmVwbGFjaW5nIHJvdXRlciBzdGF0ZVxuICAgKiBAcGFyYW0gY2IgY2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWRcbiAgICovIGJlZm9yZVBvcFN0YXRlKGNiKSB7XG4gICAgICAgIHRoaXMuX2JwcyA9IGNiO1xuICAgIH1cbiAgICBvbmx5QUhhc2hDaGFuZ2UoYXMpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFzUGF0aCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjb25zdCBbb2xkVXJsTm9IYXNoLCBvbGRIYXNoXSA9IHRoaXMuYXNQYXRoLnNwbGl0KCcjJyk7XG4gICAgICAgIGNvbnN0IFtuZXdVcmxOb0hhc2gsIG5ld0hhc2hdID0gYXMuc3BsaXQoJyMnKTtcbiAgICAgICAgLy8gTWFrZXMgc3VyZSB3ZSBzY3JvbGwgdG8gdGhlIHByb3ZpZGVkIGhhc2ggaWYgdGhlIHVybC9oYXNoIGFyZSB0aGUgc2FtZVxuICAgICAgICBpZiAobmV3SGFzaCAmJiBvbGRVcmxOb0hhc2ggPT09IG5ld1VybE5vSGFzaCAmJiBvbGRIYXNoID09PSBuZXdIYXNoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgdXJscyBhcmUgY2hhbmdlLCB0aGVyZSdzIG1vcmUgdGhhbiBhIGhhc2ggY2hhbmdlXG4gICAgICAgIGlmIChvbGRVcmxOb0hhc2ggIT09IG5ld1VybE5vSGFzaCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBoYXNoIGhhcyBjaGFuZ2VkLCB0aGVuIGl0J3MgYSBoYXNoIG9ubHkgY2hhbmdlLlxuICAgICAgICAvLyBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSB0byBoYW5kbGUgYm90aCB0aGUgZW50ZXIgYW5kXG4gICAgICAgIC8vIGxlYXZlIGhhc2ggPT09ICcnIGNhc2VzLiBUaGUgaWRlbnRpdHkgY2FzZSBmYWxscyB0aHJvdWdoXG4gICAgICAgIC8vIGFuZCBpcyB0cmVhdGVkIGFzIGEgbmV4dCByZWxvYWQuXG4gICAgICAgIHJldHVybiBvbGRIYXNoICE9PSBuZXdIYXNoO1xuICAgIH1cbiAgICBzY3JvbGxUb0hhc2goYXMpIHtcbiAgICAgICAgY29uc3QgWywgaGFzaF0gPSBhcy5zcGxpdCgnIycpO1xuICAgICAgICAvLyBTY3JvbGwgdG8gdG9wIGlmIHRoZSBoYXNoIGlzIGp1c3QgYCNgIHdpdGggbm8gdmFsdWUgb3IgYCN0b3BgXG4gICAgICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgICAgICBpZiAoaGFzaCA9PT0gJycgfHwgaGFzaCA9PT0gJ3RvcCcpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaXJzdCB3ZSBjaGVjayBpZiB0aGUgZWxlbWVudCBieSBpZCBpcyBmb3VuZFxuICAgICAgICBjb25zdCBpZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCk7XG4gICAgICAgIGlmIChpZEVsKSB7XG4gICAgICAgICAgICBpZEVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlcmUncyBubyBlbGVtZW50IHdpdGggdGhlIGlkLCB3ZSBjaGVjayB0aGUgYG5hbWVgIHByb3BlcnR5XG4gICAgICAgIC8vIFRvIG1pcnJvciBicm93c2Vyc1xuICAgICAgICBjb25zdCBuYW1lRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShoYXNoKVswXTtcbiAgICAgICAgaWYgKG5hbWVFbCkge1xuICAgICAgICAgICAgbmFtZUVsLnNjcm9sbEludG9WaWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdXJsSXNOZXcoYXNQYXRoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzUGF0aCAhPT0gYXNQYXRoO1xuICAgIH1cbiAgICAvKipcbiAgICogUHJlZmV0Y2ggcGFnZSBjb2RlLCB5b3UgbWF5IHdhaXQgZm9yIHRoZSBkYXRhIGR1cmluZyBwYWdlIHJlbmRlcmluZy5cbiAgICogVGhpcyBmZWF0dXJlIG9ubHkgd29ya3MgaW4gcHJvZHVjdGlvbiFcbiAgICogQHBhcmFtIHVybCB0aGUgaHJlZiBvZiBwcmVmZXRjaGVkIHBhZ2VcbiAgICogQHBhcmFtIGFzUGF0aCB0aGUgYXMgcGF0aCBvZiB0aGUgcHJlZmV0Y2hlZCBwYWdlXG4gICAqLyBhc3luYyBwcmVmZXRjaCh1cmwsIGFzUGF0aCA9IHVybCwgb3B0aW9ucyA9IHtcbiAgICB9KSB7XG4gICAgICAgIGxldCBwYXJzZWQgPSAoMCwgX3BhcnNlUmVsYXRpdmVVcmwpLnBhcnNlUmVsYXRpdmVVcmwodXJsKTtcbiAgICAgICAgbGV0IHsgcGF0aG5hbWU6IHBhdGhuYW1lMiAgfSA9IHBhcnNlZDtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwYXRobmFtZTIgPSAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGF0aG5hbWUyLCB0aGlzLmxvY2FsZXMpLnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lMjtcbiAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgICAgIGxldCBwYXJzZWRBcyA9ICgwLCBfcGFyc2VSZWxhdGl2ZVVybCkucGFyc2VSZWxhdGl2ZVVybChhc1BhdGgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGxvY2FsZVBhdGhSZXN1bHQgPSAoMCwgX25vcm1hbGl6ZUxvY2FsZVBhdGgpLm5vcm1hbGl6ZUxvY2FsZVBhdGgocGFyc2VkQXMucGF0aG5hbWUsIHRoaXMubG9jYWxlcyk7XG4gICAgICAgICAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBsb2NhbGVQYXRoUmVzdWx0LnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgIG9wdGlvbnMubG9jYWxlID0gbG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSB8fCB0aGlzLmRlZmF1bHRMb2NhbGU7XG4gICAgICAgICAgICAgICAgYXNQYXRoID0gKDAsIF91dGlscykuZm9ybWF0V2l0aFZhbGlkYXRpb24ocGFyc2VkQXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KCk7XG4gICAgICAgIGxldCByZXNvbHZlZEFzID0gYXNQYXRoO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0hBU19SRVdSSVRFUyAmJiBhc1BhdGguc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICAgICAgICBsZXQgcmV3cml0ZXM7XG4gICAgICAgICAgICAoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyAgfSA9IGF3YWl0ICgwLCBfcm91dGVMb2FkZXIpLmdldENsaWVudEJ1aWxkTWFuaWZlc3QoKSk7XG4gICAgICAgICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9ICgwLCBfcmVzb2x2ZVJld3JpdGVzKS5kZWZhdWx0KGFkZEJhc2VQYXRoKGFkZExvY2FsZShhc1BhdGgsIHRoaXMubG9jYWxlKSksIHBhZ2VzLCByZXdyaXRlcywgcGFyc2VkLnF1ZXJ5LCAocCk9PnJlc29sdmVEeW5hbWljUm91dGUocCwgcGFnZXMpXG4gICAgICAgICAgICAsIHRoaXMubG9jYWxlcyk7XG4gICAgICAgICAgICByZXNvbHZlZEFzID0gZGVsTG9jYWxlKGRlbEJhc2VQYXRoKHJld3JpdGVzUmVzdWx0LmFzUGF0aCksIHRoaXMubG9jYWxlKTtcbiAgICAgICAgICAgIGlmIChyZXdyaXRlc1Jlc3VsdC5tYXRjaGVkUGFnZSAmJiByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWYpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgdGhlIGNvcnJlY3QgcGFnZSBjaHVuayB0byBiZSBsb2FkZWRcbiAgICAgICAgICAgICAgICBwYXRobmFtZTIgPSByZXdyaXRlc1Jlc3VsdC5yZXNvbHZlZEhyZWY7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnBhdGhuYW1lID0gcGF0aG5hbWUyO1xuICAgICAgICAgICAgICAgIHVybCA9ICgwLCBfdXRpbHMpLmZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSByZXNvbHZlRHluYW1pY1JvdXRlKHBhcnNlZC5wYXRobmFtZSwgcGFnZXMpO1xuICAgICAgICAgICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUyKSB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUyID0gcGFyc2VkLnBhdGhuYW1lO1xuICAgICAgICAgICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lMjtcbiAgICAgICAgICAgICAgICB1cmwgPSAoMCwgX3V0aWxzKS5mb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdXRlID0gKDAsIF9ub3JtYWxpemVUcmFpbGluZ1NsYXNoKS5yZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZTIpO1xuICAgICAgICAvLyBQcmVmZXRjaCBpcyBub3Qgc3VwcG9ydGVkIGluIGRldmVsb3BtZW50IG1vZGUgYmVjYXVzZSBpdCB3b3VsZCB0cmlnZ2VyIG9uLWRlbWFuZC1lbnRyaWVzXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5wYWdlTG9hZGVyLl9pc1NzZyhyb3V0ZSkudGhlbigoaXNTc2cpPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3NnID8gdGhpcy5fZ2V0U3RhdGljRGF0YSh0aGlzLnBhZ2VMb2FkZXIuZ2V0RGF0YUhyZWYodXJsLCByZXNvbHZlZEFzLCB0cnVlLCB0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgIT09ICd1bmRlZmluZWQnID8gb3B0aW9ucy5sb2NhbGUgOiB0aGlzLmxvY2FsZSkpIDogZmFsc2U7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHRoaXMucGFnZUxvYWRlcltvcHRpb25zLnByaW9yaXR5ID8gJ2xvYWRQYWdlJyA6ICdwcmVmZXRjaCddKHJvdXRlKSwgXG4gICAgICAgIF0pO1xuICAgIH1cbiAgICBhc3luYyBmZXRjaENvbXBvbmVudChyb3V0ZSkge1xuICAgICAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGNhbmNlbCA9IHRoaXMuY2xjID0gKCk9PntcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudFJlc3VsdCA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5sb2FkUGFnZShyb3V0ZSk7XG4gICAgICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKGBBYm9ydCBmZXRjaGluZyBjb21wb25lbnQgZm9yIHJvdXRlOiBcIiR7cm91dGV9XCJgKTtcbiAgICAgICAgICAgIGVycm9yLmNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgICAgICAgdGhpcy5jbGMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb21wb25lbnRSZXN1bHQ7XG4gICAgfVxuICAgIF9nZXREYXRhKGZuKSB7XG4gICAgICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgY2FuY2VsID0gKCk9PntcbiAgICAgICAgICAgIGNhbmNlbGxlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2xjID0gY2FuY2VsO1xuICAgICAgICByZXR1cm4gZm4oKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgaWYgKGNhbmNlbCA9PT0gdGhpcy5jbGMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsYyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY2FuY2VsbGVkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyMiA9IG5ldyBFcnJvcignTG9hZGluZyBpbml0aWFsIHByb3BzIGNhbmNlbGxlZCcpO1xuICAgICAgICAgICAgICAgIGVycjIuY2FuY2VsbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnIyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U3RhdGljRGF0YShkYXRhSHJlZikge1xuICAgICAgICBjb25zdCB7IGhyZWY6IGNhY2hlS2V5ICB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJiAhdGhpcy5pc1ByZXZpZXcgJiYgdGhpcy5zZGNbY2FjaGVLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuc2RjW2NhY2hlS2V5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpLnRoZW4oKGRhdGEpPT57XG4gICAgICAgICAgICB0aGlzLnNkY1tjYWNoZUtleV0gPSBkYXRhO1xuICAgICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZ2V0U2VydmVyRGF0YShkYXRhSHJlZikge1xuICAgICAgICBjb25zdCB7IGhyZWY6IHJlc291cmNlS2V5ICB9ID0gbmV3IFVSTChkYXRhSHJlZiwgd2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBpZiAodGhpcy5zZHJbcmVzb3VyY2VLZXldKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZHJbcmVzb3VyY2VLZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnNkcltyZXNvdXJjZUtleV0gPSBmZXRjaE5leHREYXRhKGRhdGFIcmVmLCB0aGlzLmlzU3NyKS50aGVuKChkYXRhKT0+e1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2RyW3Jlc291cmNlS2V5XTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KS5jYXRjaCgoZXJyMik9PntcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNkcltyZXNvdXJjZUtleV07XG4gICAgICAgICAgICB0aHJvdyBlcnIyO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0SW5pdGlhbFByb3BzKENvbXBvbmVudCwgY3R4KSB7XG4gICAgICAgIGNvbnN0IHsgQ29tcG9uZW50OiBBcHAxICB9ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddO1xuICAgICAgICBjb25zdCBBcHBUcmVlID0gdGhpcy5fd3JhcEFwcChBcHAxKTtcbiAgICAgICAgY3R4LkFwcFRyZWUgPSBBcHBUcmVlO1xuICAgICAgICByZXR1cm4gKDAsIF91dGlscykubG9hZEdldEluaXRpYWxQcm9wcyhBcHAxLCB7XG4gICAgICAgICAgICBBcHBUcmVlLFxuICAgICAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICAgICAgcm91dGVyOiB0aGlzLFxuICAgICAgICAgICAgY3R4XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhYm9ydENvbXBvbmVudExvYWQoYXMsIHJvdXRlUHJvcHMpIHtcbiAgICAgICAgaWYgKHRoaXMuY2xjKSB7XG4gICAgICAgICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBidWlsZENhbmNlbGxhdGlvbkVycm9yKCksIGFzLCByb3V0ZVByb3BzKTtcbiAgICAgICAgICAgIHRoaXMuY2xjKCk7XG4gICAgICAgICAgICB0aGlzLmNsYyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbm90aWZ5KGRhdGEsIHJlc2V0U2Nyb2xsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN1YihkYXRhLCB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50LCByZXNldFNjcm9sbCk7XG4gICAgfVxufVxuUm91dGVyLmV2ZW50cyA9ICgwLCBfbWl0dCkuZGVmYXVsdCgpO1xuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yb3V0ZXIuanMubWFwIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgRm9vdGVyV3JhcHBlciB9IGZyb20gJy4vc3R5bGUnO1xyXG5cclxuY29uc3QgRm9vdGVyOiBSZWFjdC5GQyA9ICgpID0+IHtcclxuICByZXR1cm4gPEZvb3RlcldyYXBwZXI+PC9Gb290ZXJXcmFwcGVyPjtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEZvb3RlcjtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgRm9vdGVyV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgaGVpZ2h0OiAxMDBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlZWVlO1xyXG5gO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XHJcbmltcG9ydCB7IExpIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5pbnRlcmZhY2UgSUhlYWRJdGVtIHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGNvbnRlbnRUeXBlSWQ6IG51bWJlcjtcclxufVxyXG5cclxuY29uc3QgSGVhZEl0ZW06IFJlYWN0LkZDPElIZWFkSXRlbT4gPSAoeyB0aXRsZSwgY29udGVudFR5cGVJZCB9KSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxMaT5cclxuICAgICAgPExpbmtcclxuICAgICAgICBocmVmPXt7XHJcbiAgICAgICAgICBwYXRobmFtZTogJy90b3VyJyxcclxuICAgICAgICAgIHF1ZXJ5OiB7IHRpdGxlLCBjb250ZW50VHlwZUlkIH0sXHJcbiAgICAgICAgfX1cclxuICAgICAgICBhcz17YC90b3VyP3RpdGxlPSR7dGl0bGV9JmNvbnRlbnRUeXBlSWQ9JHtjb250ZW50VHlwZUlkfWB9XHJcbiAgICAgID5cclxuICAgICAgICA8YT5cclxuICAgICAgICAgIHsvKiA8bGk+e3RpdGxlfTwvbGk+ICovfVxyXG4gICAgICAgICAge3RpdGxlfVxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9MaW5rPlxyXG4gICAgPC9MaT5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgSGVhZEl0ZW07XHJcbiIsImltcG9ydCBzdHlsZWQgZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExpID0gc3R5bGVkLmxpYFxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgJiBhIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHdpZHRoOiAxMDA7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCBGb290ZXIgZnJvbSAnLi4vRm9vdGVyJztcclxuaW1wb3J0IE5hdmJhciBmcm9tICcuLi8uLi9jb250YWluZXJzL05hdmJhcic7XHJcbmltcG9ydCB7IE1haW5XcmFwcGVyIH0gZnJvbSAnLi9zdHlsZSc7XHJcblxyXG5jb25zdCBMYXlvdXQ6IFJlYWN0LkZDID0gKHsgY2hpbGRyZW4gfSkgPT4ge1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8TmF2YmFyIC8+XHJcbiAgICAgIDxNYWluV3JhcHBlcj57Y2hpbGRyZW59PC9NYWluV3JhcHBlcj5cclxuICAgICAgPEZvb3RlciAvPlxyXG4gICAgPC8+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IExheW91dDtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgTWFpbldyYXBwZXIgPSBzdHlsZWQuZGl2YFxyXG4gIHdpZHRoOiAxMzAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cucGN9IHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJztcclxuaW1wb3J0IHtcclxuICBOYXZiYXJXcmFwcGVyLFxyXG4gIExvZ28sXHJcbiAgU2VhcmNoLFxyXG4gIEFjY291bnQsXHJcbiAgQ2F0ZWdvcnksXHJcbiAgTW9iaWxlU2VhcmNoLFxyXG4gIFdyYXBwZXIsXHJcbiAgSGFtYnVyZ2VyTWVudSxcclxuICBMb2dvdXRCdXR0b24sXHJcbn0gZnJvbSAnLi9zdHlsZSc7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgUm9vdFN0YXRlIH0gZnJvbSAnLi4vLi4vbW9kdWxlcyc7XHJcbmltcG9ydCB7IGxvZ291dEFzeW5jIH0gZnJvbSAnLi4vLi4vbW9kdWxlcy91c2VyJztcclxuaW1wb3J0IFNlYXJjaEZvcm0gZnJvbSAnLi4vU2VhcmNoRm9ybSc7XHJcbmltcG9ydCB7IE1lbnVPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IEhlYWRJdGVtIGZyb20gJy4uLy4uL2NvbXBvbmVudHMvSGVhZGVySXRlbSc7XHJcbmltcG9ydCB1c2VUb2dnbGUgZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXNlVG9nZ2xlJztcclxuaW1wb3J0IEltYWdlIGZyb20gJ25leHQvaW1hZ2UnO1xyXG5cclxuY29uc3QgTmF2YmFyOiBSZWFjdC5GQyA9ICgpID0+IHtcclxuICBjb25zdCBbdG9nZ2xlLCB0b2dnbGVIYW5idXJnZXIsIHNldFRvZ2dsZV0gPSB1c2VUb2dnbGUoZmFsc2UpO1xyXG4gIGNvbnN0IHsgbWUgfSA9IHVzZVNlbGVjdG9yKChzdGF0ZTogUm9vdFN0YXRlKSA9PiBzdGF0ZS51c2VyKTtcclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcbiAgY29uc3Qgb25DbGlja0xvZ291dCA9IFJlYWN0LnVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIGRpc3BhdGNoKGxvZ291dEFzeW5jLnJlcXVlc3QoKSk7XHJcbiAgICBzZXRUb2dnbGUoZmFsc2UpO1xyXG4gIH0sIFtkaXNwYXRjaCwgc2V0VG9nZ2xlXSk7XHJcblxyXG4gIGNvbnN0IGNsb3NlSGFtYnVyZ2VyID0gUmVhY3QudXNlQ2FsbGJhY2soKCkgPT4ge1xyXG4gICAgc2V0VG9nZ2xlKGZhbHNlKTtcclxuICB9LCBbc2V0VG9nZ2xlXSk7XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8V3JhcHBlcj5cclxuICAgICAgPE5hdmJhcldyYXBwZXI+XHJcbiAgICAgICAgPExvZ28gb25DbGljaz17Y2xvc2VIYW1idXJnZXJ9PlxyXG4gICAgICAgICAgPExpbmsgaHJlZj1cIi9cIj5cclxuICAgICAgICAgICAgPGE+XHJcbiAgICAgICAgICAgICAgPEltYWdlXHJcbiAgICAgICAgICAgICAgICBzcmM9XCIvbG9nby5wbmdcIlxyXG4gICAgICAgICAgICAgICAgd2lkdGg9ezEzMH1cclxuICAgICAgICAgICAgICAgIGhlaWdodD17NjB9XHJcbiAgICAgICAgICAgICAgICBhbHQ9XCLslrTrlJTqsIjrnphcIlxyXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk9e3RydWV9XHJcbiAgICAgICAgICAgICAgLz5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgIDwvTG9nbz5cclxuXHJcbiAgICAgICAgPENhdGVnb3J5IHRvZ2dsZT17dG9nZ2xlfSBvbkNsaWNrPXt0b2dnbGVIYW5idXJnZXJ9PlxyXG4gICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLqtIDqtJHsp4BcIiBjb250ZW50VHlwZUlkPXsxMn0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi66y47ZmU7Iuc7ISkXCIgY29udGVudFR5cGVJZD17MTR9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuy2leygnFwiIGNvbnRlbnRUeXBlSWQ9ezE1fSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLsvZTsiqRcIiBjb250ZW50VHlwZUlkPXsyNX0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi66CI7Y+s7LigXCIgY29udGVudFR5cGVJZD17Mjh9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSXRlbSB0aXRsZT1cIuyImeuwlVwiIGNvbnRlbnRUeXBlSWQ9ezMyfSAvPlxyXG4gICAgICAgICAgICA8SGVhZEl0ZW0gdGl0bGU9XCLsh7ztlZFcIiBjb250ZW50VHlwZUlkPXszOH0gLz5cclxuICAgICAgICAgICAgPEhlYWRJdGVtIHRpdGxlPVwi7Iud64u5XCIgY29udGVudFR5cGVJZD17Mzl9IC8+XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvQ2F0ZWdvcnk+XHJcblxyXG4gICAgICAgIDxTZWFyY2g+XHJcbiAgICAgICAgICA8U2VhcmNoRm9ybSBsYWJlbD1cInBjXCIgLz5cclxuICAgICAgICA8L1NlYXJjaD5cclxuXHJcbiAgICAgICAgPEFjY291bnQgdG9nZ2xlPXt0b2dnbGV9PlxyXG4gICAgICAgICAge21lID8gKFxyXG4gICAgICAgICAgICA8PlxyXG4gICAgICAgICAgICAgIDxMb2dvdXRCdXR0b24gb25DbGljaz17b25DbGlja0xvZ291dH0+66Gc6re47JWE7JuDIDwvTG9nb3V0QnV0dG9uPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPExpbmsgaHJlZj1cIi9sb2dpblwiPlxyXG4gICAgICAgICAgICAgICAgPGEgb25DbGljaz17Y2xvc2VIYW1idXJnZXJ9PlxyXG4gICAgICAgICAgICAgICAgICA8c3Bhbj7roZzqt7jsnbg8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgICA8Lz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgPC9BY2NvdW50PlxyXG4gICAgICAgIDxIYW1idXJnZXJNZW51PlxyXG4gICAgICAgICAgPE1lbnVPdXRsaW5lZCBvbkNsaWNrPXt0b2dnbGVIYW5idXJnZXJ9IC8+XHJcbiAgICAgICAgPC9IYW1idXJnZXJNZW51PlxyXG4gICAgICA8L05hdmJhcldyYXBwZXI+XHJcbiAgICAgIDxNb2JpbGVTZWFyY2ggb25DbGljaz17Y2xvc2VIYW1idXJnZXJ9PlxyXG4gICAgICAgIDxTZWFyY2hGb3JtIGxhYmVsPVwibW9iaWxlXCIgLz5cclxuICAgICAgPC9Nb2JpbGVTZWFyY2g+XHJcbiAgICA8L1dyYXBwZXI+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgcG9zaXRpb246IHN0aWNreTtcclxuICB0b3A6IDA7XHJcbiAgei1pbmRleDogOTk5O1xyXG4gIGhlaWdodDogODBweDtcclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBOYXZiYXJXcmFwcGVyID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIHBhZGRpbmc6IDEwcHggMDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjZWVlZWVlO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICAvLyBwYWRkaW5nOiAwO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBNb2JpbGVTZWFyY2ggPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IG5vbmU7XHJcbiAgaGVpZ2h0OiA1MHB4O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIGJveC1zaGFkb3c6IDAgMXB4IDNweCAwIHJnYigwIDAgMCAvIDEyJSk7XHJcbiAgICAmIGZvcm0ge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgbWFyZ2luOiAwIDUlO1xyXG4gICAgfVxyXG5cclxuICAgICYgZm9ybSBpbnB1dCB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5tb2JpbGVTfSB7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IExvZ28gPSBzdHlsZWQuZGl2YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgbWFyZ2luLWxlZnQ6IDMwcHg7XHJcbiAgZmxleDogMS41O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gICAgZmxleDogMTtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgICAvLyAmIGEge1xyXG4gICAgLy8gICBwYWRkaW5nOiAyMHB4IDA7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IENhdGVnb3J5ID0gc3R5bGVkLmRpdjx7IHRvZ2dsZTogYm9vbGVhbiB9PmBcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXg6IDM7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgLy8gcGFkZGluZzogMjBweCAwO1xyXG4gICYgdWwge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICB9XHJcbiAgJiBhIHtcclxuICAgIGZvbnQtc2l6ZTogMThweDtcclxuICAgIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuICAgIGNvbG9yOiAjMDAwO1xyXG4gICAgbWFyZ2luLWxlZnQ6IDEwcHg7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgZGlzcGxheTogJHsocHJvcHMpID0+IChwcm9wcy50b2dnbGUgPyAnYmxvY2snIDogJ25vbmUnKX07XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgICYgdWwge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIH1cclxuICAgICYgdWwgbGkge1xyXG4gICAgICBtYXJnaW4tbGVmdDogMDtcclxuICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UyZTJlMjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgJiBhIHtcclxuICAgICAgcGFkZGluZzogMTJweCA1cHg7XHJcbiAgICAgIG1hcmdpbi1sZWZ0OiAwO1xyXG4gICAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IFNlYXJjaCA9IHN0eWxlZC5kaXZgXHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBmbGV4OiAyO1xyXG4gIC8vIHBhZGRpbmc6IDIwcHggMDtcclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy5sYXB0b3B9IHtcclxuICAgIGRpc3BsYXk6IG5vbmU7XHJcbiAgfVxyXG5gO1xyXG5cclxuZXhwb3J0IGNvbnN0IEFjY291bnQgPSBzdHlsZWQuZGl2PHsgdG9nZ2xlOiBib29sZWFuIH0+YFxyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleDogMTtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xyXG4gICYgYSB7XHJcbiAgICBmb250LXNpemU6IDE1cHg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYTczZTg7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDEycHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgbWFyZ2luLXJpZ2h0OiAzMHB4O1xyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyYjdkZTk7XHJcbiAgICB9XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgZGlzcGxheTogJHsocHJvcHMpID0+IChwcm9wcy50b2dnbGUgPyAnZmxleCcgOiAnbm9uZScpfTtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgICAmIGEge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgYm9yZGVyLXJhZGl1czogMDtcclxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICBjb2xvcjogIzAwMDtcclxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgICAgcGFkZGluZzogMTJweCA1cHg7XHJcbiAgICAgIGZvbnQtZmFtaWx5OiBCTUpVQTtcclxuICAgICAgZm9udC1zaXplOiAyMnB4O1xyXG4gICAgICBtYXJnaW4tcmlnaHQ6IDBweDtcclxuICAgICAgJjpob3ZlciB7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2UyZTJlMjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBIYW1idXJnZXJNZW51ID0gc3R5bGVkLmRpdmBcclxuICBkaXNwbGF5OiBub25lO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IDI1cHg7XHJcbiAgICByaWdodDogMjBweDtcclxuICAgIGZvbnQtc2l6ZTogMzBweDtcclxuICB9XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgTG9nb3V0QnV0dG9uID0gc3R5bGVkLmJ1dHRvbmBcclxuICBwYWRkaW5nOiA2cHggMTBweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjNWY2MzY4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThlYWVkO1xyXG4gIGNvbG9yOiAjM2MzZDQwO1xyXG4gIG1hcmdpbi1yaWdodDogMzBweDtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgZm9udC1mYW1pbHk6ICdHb3d1biBCYXRhbmcnLCBzZXJpZjtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LnRhYmxldH0ge1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgY29sb3I6ICMwMDA7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmO1xyXG4gICAgcGFkZGluZzogMTJweCA1cHg7XHJcbiAgICBmb250LWZhbWlseTogQk1KVUE7XHJcbiAgICBmb250LXNpemU6IDIycHg7XHJcbiAgICBtYXJnaW4tcmlnaHQ6IDBweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgJjpob3ZlciB7XHJcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICNlMmUyZTI7XHJcbiAgICB9XHJcbiAgfVxyXG5gO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuaW1wb3J0IHsgSW5wdXQsIFNlYXJjaEJ1dHRvbiwgU2VhcmNoV3JhcHBlciB9IGZyb20gJy4vc3R5bGUnO1xyXG5pbXBvcnQgeyBTZWFyY2hPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuaW1wb3J0IHVzZUlucHV0IGZyb20gJy4uLy4uLy4uL3V0aWxzL3VzZUlucHV0JztcclxuXHJcbmludGVyZmFjZSBJU2VhcmNoRm9ybSB7XHJcbiAgbGFiZWw6IHN0cmluZztcclxufVxyXG5cclxuY29uc3QgU2VhcmNoRm9ybTogUmVhY3QuRkM8SVNlYXJjaEZvcm0+ID0gKHsgbGFiZWwgfSkgPT4ge1xyXG4gIGNvbnN0IFtzZWFyY2gsIG9uQ2hhbmdlU2VhcmNoXSA9IHVzZUlucHV0KCcnKTtcclxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcclxuICBjb25zdCBvblNlYXJjaCA9IHVzZUNhbGxiYWNrKFxyXG4gICAgKGU6IFJlYWN0LkZvcm1FdmVudCkgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHJvdXRlci5wdXNoKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHBhdGhuYW1lOiAnL3NlYXJjaCcsXHJcbiAgICAgICAgICBxdWVyeTogeyBzZWFyY2g6IHNlYXJjaCwgcGFnZU5vOiAxIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBgL3NlYXJjaD9zZWFyY2g9JHtzZWFyY2h9YFxyXG4gICAgICApO1xyXG4gICAgfSxcclxuICAgIFtyb3V0ZXIsIHNlYXJjaF1cclxuICApO1xyXG4gIHJldHVybiAoXHJcbiAgICA8PlxyXG4gICAgICA8Zm9ybSBvblN1Ym1pdD17b25TZWFyY2h9PlxyXG4gICAgICAgIDxTZWFyY2hXcmFwcGVyPlxyXG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2Ake2xhYmVsfS1zZWFyY2hgfT48L2xhYmVsPlxyXG4gICAgICAgICAgPElucHV0XHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgaWQ9e2Ake2xhYmVsfS1zZWFyY2hgfVxyXG4gICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17b25DaGFuZ2VTZWFyY2h9XHJcbiAgICAgICAgICAvPlxyXG4gICAgICAgICAgPFNlYXJjaEJ1dHRvbiB0eXBlPVwic3VibWl0XCI+XHJcbiAgICAgICAgICAgIDxTZWFyY2hPdXRsaW5lZCBzdHlsZT17eyBjb2xvcjogJ3doaXRlJyB9fSAvPlxyXG4gICAgICAgICAgPC9TZWFyY2hCdXR0b24+XHJcbiAgICAgICAgPC9TZWFyY2hXcmFwcGVyPlxyXG4gICAgICA8L2Zvcm0+XHJcbiAgICA8Lz5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoRm9ybTtcclxuIiwiaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XHJcblxyXG5leHBvcnQgY29uc3QgSW5wdXQgPSBzdHlsZWQuaW5wdXRgXHJcbiAgYm9yZGVyLXJhZGl1czogMTVweCAwIDAgMTVweDtcclxuICBjb2xvcjogI2ZmZjtcclxuICBib3JkZXI6IDJweCBzb2xpZCAjMzMzMzMzO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICMzMzMzMzM7XHJcbiAgYm9yZGVyLXJpZ2h0OiBub25lO1xyXG4gIHBhZGRpbmc6IDE1cHg7XHJcbiAgd2lkdGg6IDIwMHB4O1xyXG4gIGhlaWdodDogNDVweDtcclxuICBvdXRsaW5lOiBub25lO1xyXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gIGZvbnQtZmFtaWx5OiBCTUhBTk5BQWlyO1xyXG4gIGZvbnQtc2l6ZTogMThweDtcclxuICBsZXR0ZXItc3BhY2luZzogMXB4O1xyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93LmxhcHRvcH0ge1xyXG4gIH1cclxuICAkeyh7IHRoZW1lIH0pID0+IHRoZW1lLndpbmRvdy50YWJsZXR9IHtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubW9iaWxlU30ge1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBjb25zdCBTZWFyY2hCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxyXG4gIHdpZHRoOiA0NXB4O1xyXG4gIGhlaWdodDogNDVweDtcclxuICBiYWNrZ3JvdW5kOiAjMzMzMzMzO1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgYm9yZGVyOiBub25lO1xyXG4gIGJvcmRlci1yYWRpdXM6IDAgMTVweCAxNXB4IDA7XHJcbmA7XHJcblxyXG5leHBvcnQgY29uc3QgU2VhcmNoV3JhcHBlciA9IHN0eWxlZC5kaXZgXHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgJiBsYWJlbCB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IC0xMDAwcHg7XHJcbiAgICBsZWZ0OiAtMTAwMHB4O1xyXG4gIH1cclxuXHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cubGFwdG9wfSB7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICB9XHJcbiAgJHsoeyB0aGVtZSB9KSA9PiB0aGVtZS53aW5kb3cudGFibGV0fSB7XHJcbiAgfVxyXG4gICR7KHsgdGhlbWUgfSkgPT4gdGhlbWUud2luZG93Lm1vYmlsZVN9IHtcclxuICB9XHJcbmA7XHJcbiIsImltcG9ydCB7XHJcbiAgQWRkQ29tbWVudFBheWxvYWQsXHJcbiAgQ29tbWVudERhdGEsXHJcbiAgTG9hZENvbW1lbnRQYXlsb2FkLFxyXG4gIE1vZGlmeUNvbW1lbnRQYXlsb2FkLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUFzeW5jQWN0aW9uIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmltcG9ydCB7IERlbGV0ZUNvbW1lbnRQYXlsb2FkIH0gZnJvbSAnLic7XHJcbmV4cG9ydCBjb25zdCBBRERfQ09NTUVOVF9SRVFVRVNUID0gJ0FERF9DT01NRU5UX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgQUREX0NPTU1FTlRfU1VDQ0VTUyA9ICdBRERfQ09NTUVOVF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IEFERF9DT01NRU5UX0ZBSUxVUkUgPSAnQUREX0NPTU1FTlRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9BRF9DT01NRU5UX1JFUVVFU1QgPSAnTE9BRF9DT01NRU5UX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgTE9BRF9DT01NRU5UX1NVQ0NFU1MgPSAnTE9BRF9DT01NRU5UX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTE9BRF9DT01NRU5UX0ZBSUxVUkUgPSAnTE9BRF9DT01NRU5UX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERFTEVURV9DT01NRU5UX1JFUVVFU1QgPSAnREVMRVRFX0NPTU1FTlRfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBERUxFVEVfQ09NTUVOVF9TVUNDRVNTID0gJ0RFTEVURV9DT01NRU5UX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgREVMRVRFX0NPTU1FTlRfRkFJTFVSRSA9ICdERUxFVEVfQ09NTUVOVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBNT0RJRllfQ09NTUVOVF9SRVFVRVNUID0gJ01PRElGWV9DT01NRU5UX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgTU9ESUZZX0NPTU1FTlRfU1VDQ0VTUyA9ICdNT0RJRllfQ09NTUVOVF9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IE1PRElGWV9DT01NRU5UX0ZBSUxVUkUgPSAnTU9ESUZZX0NPTU1FTlRfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgYWRkQ29tbWVudEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgQUREX0NPTU1FTlRfUkVRVUVTVCxcclxuICBBRERfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIEFERF9DT01NRU5UX0ZBSUxVUkVcclxuKTxBZGRDb21tZW50UGF5bG9hZCwgQ29tbWVudERhdGFbXSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkQ29tbWVudEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgTE9BRF9DT01NRU5UX1JFUVVFU1QsXHJcbiAgTE9BRF9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgTE9BRF9DT01NRU5UX0ZBSUxVUkVcclxuKTxMb2FkQ29tbWVudFBheWxvYWQsIENvbW1lbnREYXRhW10sIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgZGVsZXRlQ29tbWVudEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgREVMRVRFX0NPTU1FTlRfUkVRVUVTVCxcclxuICBERUxFVEVfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIERFTEVURV9DT01NRU5UX0ZBSUxVUkVcclxuKTxEZWxldGVDb21tZW50UGF5bG9hZCwgQ29tbWVudERhdGFbXSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBtb2RpZnlDb21tZW50QXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBNT0RJRllfQ09NTUVOVF9SRVFVRVNULFxyXG4gIE1PRElGWV9DT01NRU5UX1NVQ0NFU1MsXHJcbiAgTU9ESUZZX0NPTU1FTlRfRkFJTFVSRVxyXG4pPE1vZGlmeUNvbW1lbnRQYXlsb2FkLCBDb21tZW50RGF0YVtdLCBBeGlvc0Vycm9yPigpO1xyXG4iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi9yZWR1Y2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi90eXBlJztcclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3NhZ2EnO1xyXG4iLCJpbXBvcnQgeyBDb21tZW50U3RhdGUgfSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBwcm9kdWNlIH0gZnJvbSAnaW1tZXInO1xyXG5pbXBvcnQge1xyXG4gIEFERF9DT01NRU5UX1JFUVVFU1QsXHJcbiAgQUREX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBBRERfQ09NTUVOVF9GQUlMVVJFLFxyXG4gIExPQURfQ09NTUVOVF9SRVFVRVNULFxyXG4gIExPQURfQ09NTUVOVF9TVUNDRVNTLFxyXG4gIExPQURfQ09NTUVOVF9GQUlMVVJFLFxyXG4gIERFTEVURV9DT01NRU5UX1JFUVVFU1QsXHJcbiAgREVMRVRFX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBERUxFVEVfQ09NTUVOVF9GQUlMVVJFLFxyXG4gIE1PRElGWV9DT01NRU5UX1JFUVVFU1QsXHJcbiAgTU9ESUZZX0NPTU1FTlRfU1VDQ0VTUyxcclxuICBNT0RJRllfQ09NTUVOVF9GQUlMVVJFLFxyXG59IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHsgY3JlYXRlUmVkdWNlciB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5jb25zdCBpbml0aWFsU3RhdGU6IENvbW1lbnRTdGF0ZSA9IHtcclxuICBjb21tZW50TGlzdDogW10sXHJcbiAgY29tbWVudEFkZGVkOiBmYWxzZSxcclxuICBpc0FkZGluZ0NvbW1lbnQ6IGZhbHNlLFxyXG4gIGNvbW1lbnRFcnJvcjogJycsXHJcbiAgY29tbWVudEVkaXRlZEVycm9yOiBmYWxzZSxcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIElDb21tZW50UmVkdWNlclN0YXRlID0gdHlwZW9mIGluaXRpYWxTdGF0ZTtcclxuXHJcbmNvbnN0IGNvbW1lbnQgPSBjcmVhdGVSZWR1Y2VyKGluaXRpYWxTdGF0ZSwge1xyXG4gIFtBRERfQ09NTUVOVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzQWRkaW5nQ29tbWVudCA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFcnJvciA9ICcnO1xyXG4gICAgfSksXHJcbiAgW0FERF9DT01NRU5UX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0FkZGluZ0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtBRERfQ09NTUVOVF9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNBZGRpbmdDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRFcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0xPQURfQ09NTUVOVF9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gW107XHJcbiAgICB9KSxcclxuICBbTE9BRF9DT01NRU5UX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50TGlzdCA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0xPQURfQ09NTUVOVF9GQUlMVVJFXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmNvbW1lbnRMaXN0ID0gW107XHJcbiAgICB9KSxcclxuICBbREVMRVRFX0NPTU1FTlRfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50RXJyb3IgPSAnJztcclxuICAgIH0pLFxyXG4gIFtERUxFVEVfQ09NTUVOVF9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtERUxFVEVfQ09NTUVOVF9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudEVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICB9KSxcclxuICBbTU9ESUZZX0NPTU1FTlRfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50RWRpdGVkRXJyb3IgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtNT0RJRllfQ09NTUVOVF9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuY29tbWVudExpc3QgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQuY29tbWVudEVkaXRlZEVycm9yID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbTU9ESUZZX0NPTU1FTlRfRkFJTFVSRV06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5jb21tZW50RWRpdGVkRXJyb3IgPSB0cnVlO1xyXG4gICAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29tbWVudDtcclxuIiwiaW1wb3J0IHtcclxuICBMb2FkQ29tbWVudFBheWxvYWQsXHJcbiAgTG9hZENvbW1lbnRSZXNwb25zZSxcclxuICBBZGRDb21tZW50UGF5bG9hZCxcclxuICBEZWxldGVDb21tZW50UGF5bG9hZCxcclxuICBNb2RpZnlDb21tZW50UGF5bG9hZCxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5pbXBvcnQge1xyXG4gIGFkZENvbW1lbnRBc3luYyxcclxuICBsb2FkQ29tbWVudEFzeW5jLFxyXG4gIGRlbGV0ZUNvbW1lbnRBc3luYyxcclxuICBtb2RpZnlDb21tZW50QXN5bmMsXHJcbn0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyB0YWtlTGF0ZXN0LCBwdXQsIGNhbGwsIGZvcmssIGFsbCB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcblxyXG4vLyDrjJPquIAg7LaU6rCAXHJcbmZ1bmN0aW9uIGFkZENvbW1lbnRBUEkoeyBjb250ZW50aWQsIGNvbW1lbnRUZXh0IH06IEFkZENvbW1lbnRQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLnBvc3QoYC9jb21tZW50LyR7Y29udGVudGlkfWAsIHsgY29udGVudDogY29tbWVudFRleHQgfSk7XHJcbn1cclxuZnVuY3Rpb24qIGFkZENvbW1lbnRTYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgYWRkQ29tbWVudEFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9hZENvbW1lbnRSZXNwb25zZSA9IHlpZWxkIGNhbGwoXHJcbiAgICAgIGFkZENvbW1lbnRBUEksXHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkXHJcbiAgICApO1xyXG4gICAgeWllbGQgcHV0KGFkZENvbW1lbnRBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQoYWRkQ29tbWVudEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hBZGRDb21tZW50KCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QoYWRkQ29tbWVudEFzeW5jLnJlcXVlc3QsIGFkZENvbW1lbnRTYWdhKTtcclxufVxyXG5cclxuLy8g64yT6riAIOuhnOuTnFxyXG5mdW5jdGlvbiBsb2FkQ29tbWVudHNBUEkoeyBjb250ZW50SWQgfTogTG9hZENvbW1lbnRQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmdldChgL2NvbW1lbnQvJHtjb250ZW50SWR9YCk7XHJcbn1cclxuZnVuY3Rpb24qIGxvYWRDb21tZW50c1NhZ2EoXHJcbiAgYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBsb2FkQ29tbWVudEFzeW5jLnJlcXVlc3Q+XHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvYWRDb21tZW50UmVzcG9uc2UgPSB5aWVsZCBjYWxsKFxyXG4gICAgICBsb2FkQ29tbWVudHNBUEksXHJcbiAgICAgIGFjdGlvbi5wYXlsb2FkXHJcbiAgICApO1xyXG4gICAgeWllbGQgcHV0KGxvYWRDb21tZW50QXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGxvYWRDb21tZW50QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaExvYWRDb21tZW50cygpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGxvYWRDb21tZW50QXN5bmMucmVxdWVzdCwgbG9hZENvbW1lbnRzU2FnYSk7XHJcbn1cclxuXHJcbi8vIOuMk+q4gCDsgq3soJxcclxuZnVuY3Rpb24gZGVsZXRlQ29tbWVudEFQSSh7IGlkLCBjb250ZW50aWQgfTogRGVsZXRlQ29tbWVudFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZGVsZXRlKGAvY29tbWVudC8ke2lkfS8ke2NvbnRlbnRpZH1gKTtcclxufVxyXG5cclxuZnVuY3Rpb24qIGRlbGV0ZUNvbW1lbnRTYWdhKFxyXG4gIGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgZGVsZXRlQ29tbWVudEFzeW5jLnJlcXVlc3Q+XHJcbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IExvYWRDb21tZW50UmVzcG9uc2UgPSB5aWVsZCBjYWxsKFxyXG4gICAgICBkZWxldGVDb21tZW50QVBJLFxyXG4gICAgICBhY3Rpb24ucGF5bG9hZFxyXG4gICAgKTtcclxuICAgIHlpZWxkIHB1dChkZWxldGVDb21tZW50QXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGRlbGV0ZUNvbW1lbnRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaFJlbW92ZUNvbW1lbnQoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChkZWxldGVDb21tZW50QXN5bmMucmVxdWVzdCwgZGVsZXRlQ29tbWVudFNhZ2EpO1xyXG59XHJcblxyXG4vLyDrjJPquIDsiJjsoJVcclxuZnVuY3Rpb24gbW9kaWZ5Q29tbWVudEFQSSh7XHJcbiAgaWQsXHJcbiAgZWRpdENvbW1lbnQsXHJcbiAgY29udGVudGlkLFxyXG59OiBNb2RpZnlDb21tZW50UGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5wdXQoYC9jb21tZW50LyR7aWR9LyR7Y29udGVudGlkfWAsIHsgY29udGVudDogZWRpdENvbW1lbnQgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uKiBtb2RpZnlDb21tZW50U2FnYShcclxuICBhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIG1vZGlmeUNvbW1lbnRBc3luYy5yZXF1ZXN0PlxyXG4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2FkQ29tbWVudFJlc3BvbnNlID0geWllbGQgY2FsbChcclxuICAgICAgbW9kaWZ5Q29tbWVudEFQSSxcclxuICAgICAgYWN0aW9uLnBheWxvYWRcclxuICAgICk7XHJcbiAgICB5aWVsZCBwdXQobW9kaWZ5Q29tbWVudEFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChtb2RpZnlDb21tZW50QXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hNb2RpZnlDb21tZW50KCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobW9kaWZ5Q29tbWVudEFzeW5jLnJlcXVlc3QsIG1vZGlmeUNvbW1lbnRTYWdhKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24qIGNvbW1lbnRTYWdhKCkge1xyXG4gIHlpZWxkIGFsbChbXHJcbiAgICBmb3JrKHdhdGNoQWRkQ29tbWVudCksXHJcbiAgICBmb3JrKHdhdGNoTG9hZENvbW1lbnRzKSxcclxuICAgIGZvcmsod2F0Y2hSZW1vdmVDb21tZW50KSxcclxuICAgIGZvcmsod2F0Y2hNb2RpZnlDb21tZW50KSxcclxuICBdKTtcclxufVxyXG4iLCJpbXBvcnQge1xyXG4gIERldGFpbERhdGEsXHJcbiAgU2VhcmNoRGF0YSxcclxuICBSZWdpb25EYXRhLFxyXG4gIFNlYXJjaFBheWxvYWQsXHJcbiAgRGV0YWlsUGF5bG9hZCxcclxuICBSZWdpb25QYXlsb2FkLFxyXG4gIEFsbERhdGEsXHJcbn0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgQXhpb3NFcnJvciB9IGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgY3JlYXRlQXN5bmNBY3Rpb24gfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBSRUdJT05fVE9VUl9SRVFVRVNUID0gJ1JFR0lPTl9UT1VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgUkVHSU9OX1RPVVJfU1VDQ0VTUyA9ICdSRUdJT05fVE9VUl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IFJFR0lPTl9UT1VSX0ZBSUxVUkUgPSAnUkVHSU9OX1RPVVJfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgU0VBUkNIX1RPVVJfUkVRVUVTVCA9ICdTRUFSQ0hfVE9VUl9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IFNFQVJDSF9UT1VSX1NVQ0NFU1MgPSAnU0VBUkNIX1RPVVJfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBTRUFSQ0hfVE9VUl9GQUlMVVJFID0gJ1NFQVJDSF9UT1VSX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IERFVEFJTF9UT1VSX1JFUVVFU1QgPSAnREVUQUlMX1RPVVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBERVRBSUxfVE9VUl9TVUNDRVNTID0gJ0RFVEFJTF9UT1VSX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgREVUQUlMX1RPVVJfRkFJTFVSRSA9ICdERVRBSUxfVE9VUl9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBBTExfVE9VUl9SRVFVRVNUID0gJ0FMTF9UT1VSX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgQUxMX1RPVVJfU1VDQ0VTUyA9ICdBTExfVE9VUl9TVUNDRVNTJztcclxuZXhwb3J0IGNvbnN0IEFMTF9UT1VSX0ZBSUxVUkUgPSAnQUxMX1RPVVJfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgYWxsQXN5bmMgPSBjcmVhdGVBc3luY0FjdGlvbihcclxuICBBTExfVE9VUl9SRVFVRVNULFxyXG4gIEFMTF9UT1VSX1NVQ0NFU1MsXHJcbiAgQUxMX1RPVVJfRkFJTFVSRVxyXG4pPHVuZGVmaW5lZCwgQWxsRGF0YSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBzZWFyY2hBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIFNFQVJDSF9UT1VSX1JFUVVFU1QsXHJcbiAgU0VBUkNIX1RPVVJfU1VDQ0VTUyxcclxuICBTRUFSQ0hfVE9VUl9GQUlMVVJFXHJcbik8U2VhcmNoUGF5bG9hZCwgU2VhcmNoRGF0YSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCByZWdpb25Bc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIFJFR0lPTl9UT1VSX1JFUVVFU1QsXHJcbiAgUkVHSU9OX1RPVVJfU1VDQ0VTUyxcclxuICBSRUdJT05fVE9VUl9GQUlMVVJFXHJcbik8UmVnaW9uUGF5bG9hZCwgUmVnaW9uRGF0YSwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBkZXRhaWxBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIERFVEFJTF9UT1VSX1JFUVVFU1QsXHJcbiAgREVUQUlMX1RPVVJfU1VDQ0VTUyxcclxuICBERVRBSUxfVE9VUl9GQUlMVVJFXHJcbik8RGV0YWlsUGF5bG9hZCwgRGV0YWlsRGF0YSwgQXhpb3NFcnJvcj4oKTtcclxuIiwiZXhwb3J0IHsgZGVmYXVsdCB9IGZyb20gJy4vcmVkdWNlcic7XHJcbmV4cG9ydCAqIGZyb20gJy4vdHlwZSc7XHJcbmV4cG9ydCAqIGZyb20gJy4vYWN0aW9uJztcclxuZXhwb3J0ICogZnJvbSAnLi9zYWdhJztcclxuIiwiaW1wb3J0IHsgY3JlYXRlUmVkdWNlciB9IGZyb20gJ3R5cGVzYWZlLWFjdGlvbnMnO1xyXG5pbXBvcnQge1xyXG4gIFJFR0lPTl9UT1VSX1JFUVVFU1QsXHJcbiAgUkVHSU9OX1RPVVJfU1VDQ0VTUyxcclxuICBSRUdJT05fVE9VUl9GQUlMVVJFLFxyXG4gIFNFQVJDSF9UT1VSX1JFUVVFU1QsXHJcbiAgU0VBUkNIX1RPVVJfU1VDQ0VTUyxcclxuICBTRUFSQ0hfVE9VUl9GQUlMVVJFLFxyXG4gIERFVEFJTF9UT1VSX1JFUVVFU1QsXHJcbiAgREVUQUlMX1RPVVJfU1VDQ0VTUyxcclxuICBERVRBSUxfVE9VUl9GQUlMVVJFLFxyXG4gIEFMTF9UT1VSX1JFUVVFU1QsXHJcbiAgQUxMX1RPVVJfU1VDQ0VTUyxcclxuICBBTExfVE9VUl9GQUlMVVJFLFxyXG59IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHByb2R1Y2UgZnJvbSAnaW1tZXInO1xyXG5pbXBvcnQgeyBEZXRhaWxBY3Rpb24sIERldGFpbFN0YXRlIH0gZnJvbSAnLi90eXBlJztcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZTogRGV0YWlsU3RhdGUgPSB7XHJcbiAgc2VhcmNoUmVzdWx0OiB7XHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGRhdGE6IHtcclxuICAgICAgaXRlbXM6ICcnLFxyXG4gICAgICBudW1PZlJvd3M6IDEwLFxyXG4gICAgICBwYWdlTm86IDEsXHJcbiAgICAgIHRvdGFsQ291bnQ6IDAsXHJcbiAgICAgIHNlYXJjaDogJycsXHJcbiAgICB9LFxyXG4gICAgZXJyb3I6IG51bGwsXHJcbiAgfSxcclxuICBkZXRhaWxSZXN1bHQ6IHtcclxuICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBpdGVtczogeyBpdGVtOiBudWxsIH0sXHJcbiAgICAgIG51bU9mUm93czogMTAsXHJcbiAgICAgIHBhZ2VObzogMSxcclxuICAgICAgdG90YWxDb3VudDogMSxcclxuICAgIH0sXHJcbiAgICBlcnJvcjogbnVsbCxcclxuICB9LFxyXG4gIGFsbERhdGE6IHtcclxuICAgIGxvYWRpbmc6IGZhbHNlLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBpdGVtczoge1xyXG4gICAgICAgIGl0ZW06IFtdLFxyXG4gICAgICAgIGZlc3RpdmFsOiBbXSxcclxuICAgICAgICBzbGVlcDogW10sXHJcbiAgICAgIH0sXHJcbiAgICAgIG51bU9mUm93czogMTAsXHJcbiAgICAgIHBhZ2VObzogMSxcclxuICAgICAgdG90YWxDb3VudDogMSxcclxuICAgIH0sXHJcbiAgICBlcnJvcjogbnVsbCxcclxuICB9LFxyXG4gIHJlZ2lvblJlc3VsdDoge1xyXG4gICAgbG9hZGluZzogZmFsc2UsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGl0ZW1zOiB7IGl0ZW06IFtdIH0sXHJcbiAgICAgIG51bU9mUm93czogMTAsXHJcbiAgICAgIHBhZ2VObzogMSxcclxuICAgICAgdG90YWxDb3VudDogMSxcclxuICAgIH0sXHJcbiAgICBlcnJvcjogbnVsbCxcclxuICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgSURldGFpbFJlZHVjZXJTdGF0ZSA9IHR5cGVvZiBpbml0aWFsU3RhdGU7XHJcblxyXG5jb25zdCBkZXRhaWwgPSBjcmVhdGVSZWR1Y2VyPERldGFpbFN0YXRlLCBEZXRhaWxBY3Rpb24+KGluaXRpYWxTdGF0ZSwge1xyXG4gIFtTRUFSQ0hfVE9VUl9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEuaXRlbXMgPSAnJztcclxuICAgIH0pLFxyXG4gIFtTRUFSQ0hfVE9VUl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEuaXRlbXMgPSBhY3Rpb24ucGF5bG9hZC5pdGVtcztcclxuICAgICAgZHJhZnQuc2VhcmNoUmVzdWx0LmRhdGEubnVtT2ZSb3dzID0gYWN0aW9uLnBheWxvYWQubnVtT2ZSb3dzO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5wYWdlTm8gPSBhY3Rpb24ucGF5bG9hZC5wYWdlTm87XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5kYXRhLnRvdGFsQ291bnQgPSBhY3Rpb24ucGF5bG9hZC50b3RhbENvdW50O1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5zZWFyY2ggPSBhY3Rpb24ucGF5bG9hZC5zZWFyY2g7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbU0VBUkNIX1RPVVJfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnNlYXJjaFJlc3VsdC5lcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5zZWFyY2hSZXN1bHQuZGF0YS5pdGVtcyA9ICcnO1xyXG4gICAgfSksXHJcbiAgW0RFVEFJTF9UT1VSX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZGF0YS5pdGVtcy5pdGVtID0gbnVsbDtcclxuICAgIH0pLFxyXG4gIFtERVRBSUxfVE9VUl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmRhdGEuaXRlbXMgPSBhY3Rpb24ucGF5bG9hZC5pdGVtcztcclxuICAgICAgZHJhZnQuZGV0YWlsUmVzdWx0LmRhdGEudG90YWxDb3VudCA9IGFjdGlvbi5wYXlsb2FkLnRvdGFsQ291bnQ7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5lcnJvciA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbREVUQUlMX1RPVVJfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmRldGFpbFJlc3VsdC5lcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICBkcmFmdC5kZXRhaWxSZXN1bHQuZGF0YS5pdGVtcy5pdGVtID0gbnVsbDtcclxuICAgIH0pLFxyXG4gIFtSRUdJT05fVE9VUl9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmRhdGEuaXRlbXMuaXRlbSA9IFtdO1xyXG4gICAgfSksXHJcbiAgW1JFR0lPTl9UT1VSX1NVQ0NFU1NdOiAoc3RhdGUsIGFjdGlvbikgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZGF0YS5pdGVtcyA9IGFjdGlvbi5wYXlsb2FkLml0ZW1zO1xyXG4gICAgICBkcmFmdC5yZWdpb25SZXN1bHQuZGF0YS50b3RhbENvdW50ID0gYWN0aW9uLnBheWxvYWQudG90YWxDb3VudDtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmxvYWRpbmcgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtSRUdJT05fVE9VUl9GQUlMVVJFXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQucmVnaW9uUmVzdWx0LmVycm9yID0gYWN0aW9uLnBheWxvYWQ7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LnJlZ2lvblJlc3VsdC5kYXRhLml0ZW1zLml0ZW0gPSBbXTtcclxuICAgIH0pLFxyXG4gIFtBTExfVE9VUl9SRVFVRVNUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEubG9hZGluZyA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZXJyb3IgPSBudWxsO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuaXRlbSA9IFtdO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuZmVzdGl2YWwgPSBbXTtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5kYXRhLml0ZW1zLnNsZWVwID0gW107XHJcbiAgICB9KSxcclxuICBbQUxMX1RPVVJfU1VDQ0VTU106IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YSA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmVycm9yID0gbnVsbDtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICB9KSxcclxuICBbQUxMX1RPVVJfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgZHJhZnQuYWxsRGF0YS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5pdGVtID0gW107XHJcbiAgICAgIGRyYWZ0LmFsbERhdGEuZGF0YS5pdGVtcy5mZXN0aXZhbCA9IFtdO1xyXG4gICAgICBkcmFmdC5hbGxEYXRhLmRhdGEuaXRlbXMuc2xlZXAgPSBbXTtcclxuICAgIH0pLFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRldGFpbDtcclxuIiwiaW1wb3J0IHtcclxuICBTZWFyY2hSZXNwb25zZSxcclxuICBTZWFyY2hQYXlsb2FkLFxyXG4gIERldGFpbFJlc3BvbnNlLFxyXG4gIERldGFpbFBheWxvYWQsXHJcbiAgUmVnaW9uUmVzcG9uc2UsXHJcbiAgUmVnaW9uUGF5bG9hZCxcclxuICBBbGxSZXNwb25zZSxcclxufSBmcm9tICcuL3R5cGUnO1xyXG5pbXBvcnQgeyBzZWFyY2hBc3luYywgZGV0YWlsQXN5bmMsIHJlZ2lvbkFzeW5jLCBhbGxBc3luYyB9IGZyb20gJy4vYWN0aW9uJztcclxuaW1wb3J0IHsgdGFrZUxhdGVzdCwgcHV0LCBjYWxsLCBhbGwsIGZvcmsgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5pbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xyXG5cclxuLy8g66mU7J24IO2ZlOuptFxyXG5mdW5jdGlvbiBhbGxBUEkoKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmdldCgnL2RldGFpbC9hbGwnKTtcclxufVxyXG5mdW5jdGlvbiogYWxsRGF0YVNhZ2EoKSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogQWxsUmVzcG9uc2UgPSB5aWVsZCBjYWxsKGFsbEFQSSk7XHJcbiAgICB5aWVsZCBwdXQoYWxsQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIHlpZWxkIHB1dChhbGxBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoQWxsRGF0YSgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KGFsbEFzeW5jLnJlcXVlc3QsIGFsbERhdGFTYWdhKTtcclxufVxyXG5cclxuLy8g6rKA7IOJ6riw64qlXHJcbmZ1bmN0aW9uIHNlYXJjaEFQSSh7IHNlYXJjaCwgcGFnZU5vLCBhcnJhbmdlIH06IFNlYXJjaFBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MuZ2V0KGAvZGV0YWlsL3NlYXJjaGAsIHtcclxuICAgIHBhcmFtczoge1xyXG4gICAgICBzZWFyY2gsXHJcbiAgICAgIHBhZ2VObyxcclxuICAgICAgYXJyYW5nZSxcclxuICAgIH0sXHJcbiAgfSk7XHJcbn1cclxuZnVuY3Rpb24qIHNlYXJjaERldGFpbFNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBzZWFyY2hBc3luYy5yZXF1ZXN0Pikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXN1bHQ6IFNlYXJjaFJlc3BvbnNlID0geWllbGQgY2FsbChzZWFyY2hBUEksIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIHlpZWxkIHB1dChzZWFyY2hBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICBjb25zb2xlLmVycm9yKGUpO1xyXG4gICAgeWllbGQgcHV0KHNlYXJjaEFzeW5jLmZhaWx1cmUoZS5yZXNwb25zZS5kYXRhKSk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiogd2F0Y2hTZWFyY2hEZXRhaWwoKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChzZWFyY2hBc3luYy5yZXF1ZXN0LCBzZWFyY2hEZXRhaWxTYWdhKTtcclxufVxyXG5cclxuLy8g7KeA7Jet6riw67CYIOqygOyDiVxyXG5mdW5jdGlvbiByZWdpb25BUEkoe1xyXG4gIGFycmFuZ2UsXHJcbiAgYXJlYUNvZGUsXHJcbiAgY29udGVudFR5cGVJZCxcclxuICBwYWdlTm8sXHJcbiAgbnVtT2ZSb3dzLFxyXG59OiBSZWdpb25QYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmdldCgnL2RldGFpbC9yZWdpb24nLCB7XHJcbiAgICBwYXJhbXM6IHtcclxuICAgICAgYXJyYW5nZSxcclxuICAgICAgYXJlYUNvZGUsXHJcbiAgICAgIGNvbnRlbnRUeXBlSWQsXHJcbiAgICAgIHBhZ2VObyxcclxuICAgICAgbnVtT2ZSb3dzLFxyXG4gICAgfSxcclxuICB9KTtcclxufVxyXG5mdW5jdGlvbiogcmVnaW9uRGV0YWlsU2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHJlZ2lvbkFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogUmVnaW9uUmVzcG9uc2UgPSB5aWVsZCBjYWxsKHJlZ2lvbkFQSSwgYWN0aW9uLnBheWxvYWQpO1xyXG4gICAgeWllbGQgcHV0KHJlZ2lvbkFzeW5jLnN1Y2Nlc3MocmVzdWx0LmRhdGEpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICB5aWVsZCBwdXQocmVnaW9uQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaFJlZ2lvbkRldGFpbCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KHJlZ2lvbkFzeW5jLnJlcXVlc3QsIHJlZ2lvbkRldGFpbFNhZ2EpO1xyXG59XHJcblxyXG4vLyDsg4HshLgg7KCV67O0XHJcbmZ1bmN0aW9uIGRldGFpbEFQSSh7IGNvbnRlbnRJZCwgY29udGVudFR5cGVJZCB9OiBEZXRhaWxQYXlsb2FkKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmdldChgL2RldGFpbC8ke2NvbnRlbnRUeXBlSWR9LyR7Y29udGVudElkfWApO1xyXG59XHJcbmZ1bmN0aW9uKiBkZXRhaWxSZXN1bHRTYWdhKGFjdGlvbjogUmV0dXJuVHlwZTx0eXBlb2YgZGV0YWlsQXN5bmMucmVxdWVzdD4pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBEZXRhaWxSZXNwb25zZSA9IHlpZWxkIGNhbGwoZGV0YWlsQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQoZGV0YWlsQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgY29uc29sZS5lcnJvcihlKTtcclxuICAgIHlpZWxkIHB1dChkZXRhaWxBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoRGV0YWlsUmVzdWx0KCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QoZGV0YWlsQXN5bmMucmVxdWVzdCwgZGV0YWlsUmVzdWx0U2FnYSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKiBkZXRhaWxTYWdhKCkge1xyXG4gIHlpZWxkIGFsbChbXHJcbiAgICBmb3JrKHdhdGNoU2VhcmNoRGV0YWlsKSxcclxuICAgIGZvcmsod2F0Y2hEZXRhaWxSZXN1bHQpLFxyXG4gICAgZm9yayh3YXRjaFJlZ2lvbkRldGFpbCksXHJcbiAgICBmb3JrKHdhdGNoQWxsRGF0YSksXHJcbiAgXSk7XHJcbn1cclxuIiwiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcclxuaW1wb3J0IHsgSFlEUkFURSB9IGZyb20gJ25leHQtcmVkdXgtd3JhcHBlcic7XHJcbmltcG9ydCB7IEFueUFjdGlvbiwgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBhbGwsIGNhbGwgfSBmcm9tICdyZWR1eC1zYWdhL2VmZmVjdHMnO1xyXG5pbXBvcnQgdXNlciBmcm9tICcuL3VzZXInO1xyXG5pbXBvcnQgZGV0YWlsIGZyb20gJy4vZGV0YWlsJztcclxuaW1wb3J0IGNvbW1lbnQgZnJvbSAnLi9jb21tZW50JztcclxuaW1wb3J0IHVzZXJTYWdhIGZyb20gJy4vdXNlci9zYWdhJztcclxuaW1wb3J0IGRldGFpbFNhZ2EgZnJvbSAnLi9kZXRhaWwvc2FnYSc7XHJcbmltcG9ydCBjb21tZW50U2FnYSBmcm9tICcuL2NvbW1lbnQvc2FnYSc7XHJcbmltcG9ydCB7IElVc2VyUmVkdWNlclN0YXRlIH0gZnJvbSAnLi91c2VyL3JlZHVjZXInO1xyXG5pbXBvcnQgeyBJQ29tbWVudFJlZHVjZXJTdGF0ZSB9IGZyb20gJy4vY29tbWVudC9yZWR1Y2VyJztcclxuaW1wb3J0IHsgSURldGFpbFJlZHVjZXJTdGF0ZSB9IGZyb20gJy4vZGV0YWlsL3JlZHVjZXInO1xyXG5cclxuY29uc3QgYmFja1VybCA9XHJcbiAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJ1xyXG4gICAgPyAnaHR0cDovL2FwaS53ZHl3Zy5zaXRlJ1xyXG4gICAgOiBgaHR0cDovL2xvY2FsaG9zdDo4MDgxYDtcclxuYXhpb3MuZGVmYXVsdHMuYmFzZVVSTCA9IGAke2JhY2tVcmx9L2FwaWA7XHJcbmF4aW9zLmRlZmF1bHRzLndpdGhDcmVkZW50aWFscyA9IHRydWU7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElSZWR1Y2VyU3RhdGUge1xyXG4gIHVzZXI6IElVc2VyUmVkdWNlclN0YXRlO1xyXG4gIGNvbW1lbnQ6IElDb21tZW50UmVkdWNlclN0YXRlO1xyXG4gIGRldGFpbDogSURldGFpbFJlZHVjZXJTdGF0ZTtcclxufVxyXG5cclxuY29uc3Qgcm9vdFJlZHVjZXIgPSAoXHJcbiAgc3RhdGU6IElSZWR1Y2VyU3RhdGUgfCB1bmRlZmluZWQsXHJcbiAgYWN0aW9uOiBBbnlBY3Rpb25cclxuKTogSVJlZHVjZXJTdGF0ZSA9PiB7XHJcbiAgaWYgKGFjdGlvbi50eXBlID09PSBIWURSQVRFKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAuLi5zdGF0ZSxcclxuICAgICAgLi4uYWN0aW9uLnBheWxvYWQsXHJcbiAgICB9O1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gY29tYmluZVJlZHVjZXJzKHtcclxuICAgICAgdXNlcixcclxuICAgICAgZGV0YWlsLFxyXG4gICAgICBjb21tZW50LFxyXG4gICAgfSkoc3RhdGUsIGFjdGlvbik7XHJcbiAgfVxyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgUm9vdFN0YXRlID0gUmV0dXJuVHlwZTx0eXBlb2Ygcm9vdFJlZHVjZXI+O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcm9vdFJlZHVjZXI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24qIHJvb3RTYWdhKCkge1xyXG4gIHlpZWxkIGFsbChbY2FsbCh1c2VyU2FnYSksIGNhbGwoZGV0YWlsU2FnYSksIGNhbGwoY29tbWVudFNhZ2EpXSk7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBTaWdudXBQYXlsb2FkLFxyXG4gIFNpZ251cFJlc3BvbnNlLFxyXG4gIExvZ2luUmVzcG9uc2UsXHJcbiAgTG9naW5QYXlsb2FkLFxyXG59IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCB7IEF4aW9zRXJyb3IgfSBmcm9tICdheGlvcyc7XHJcbmltcG9ydCB7IGNyZWF0ZUFzeW5jQWN0aW9uIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmltcG9ydCB7IGRlcHJlY2F0ZWQgfSBmcm9tICd0eXBlc2FmZS1hY3Rpb25zJztcclxuY29uc3QgeyBjcmVhdGVTdGFuZGFyZEFjdGlvbiB9ID0gZGVwcmVjYXRlZDtcclxuXHJcbmV4cG9ydCBjb25zdCBTSUdOX1VQX1JFUVVFU1QgPSAnU0lHTl9VUF9SRVFVRVNUJztcclxuZXhwb3J0IGNvbnN0IFNJR05fVVBfU1VDQ0VTUyA9ICdTSUdOX1VQX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgU0lHTl9VUF9GQUlMVVJFID0gJ1NJR05fVVBfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9HX0lOX1JFUVVFU1QgPSAnTE9HX0lOX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgTE9HX0lOX1NVQ0NFU1MgPSAnTE9HX0lOX1NVQ0NFU1MnO1xyXG5leHBvcnQgY29uc3QgTE9HX0lOX0ZBSUxVUkUgPSAnTE9HX0lOX0ZBSUxVUkUnO1xyXG5cclxuZXhwb3J0IGNvbnN0IExPR19PVVRfUkVRVUVTVCA9ICdMT0dfT1VUX1JFUVVFU1QnO1xyXG5leHBvcnQgY29uc3QgTE9HX09VVF9TVUNDRVNTID0gJ0xPR19PVVRfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBMT0dfT1VUX0ZBSUxVUkUgPSAnTE9HX09VVF9GQUlMVVJFJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0FEX1VTRVJfUkVRVUVTVCA9ICdMT0FEX1VTRVJfUkVRVUVTVCc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX1VTRVJfU1VDQ0VTUyA9ICdMT0FEX1VTRVJfU1VDQ0VTUyc7XHJcbmV4cG9ydCBjb25zdCBMT0FEX1VTRVJfRkFJTFVSRSA9ICdMT0FEX1VTRVJfRkFJTFVSRSc7XHJcblxyXG5leHBvcnQgY29uc3QgU0lHTl9VUF9SRVNFVCA9ICdTSUdOX1VQX1JFU0VUJztcclxuXHJcbmV4cG9ydCBjb25zdCBzaWdudXBBc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIFNJR05fVVBfUkVRVUVTVCxcclxuICBTSUdOX1VQX1NVQ0NFU1MsXHJcbiAgU0lHTl9VUF9GQUlMVVJFXHJcbik8U2lnbnVwUGF5bG9hZCwgU2lnbnVwUmVzcG9uc2UsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3QgbG9naW5Bc3luYyA9IGNyZWF0ZUFzeW5jQWN0aW9uKFxyXG4gIExPR19JTl9SRVFVRVNULFxyXG4gIExPR19JTl9TVUNDRVNTLFxyXG4gIExPR19JTl9GQUlMVVJFXHJcbik8TG9naW5QYXlsb2FkLCBMb2dpblJlc3BvbnNlLCBBeGlvc0Vycm9yPigpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGxvZ291dEFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgTE9HX09VVF9SRVFVRVNULFxyXG4gIExPR19PVVRfU1VDQ0VTUyxcclxuICBMT0dfT1VUX0ZBSUxVUkVcclxuKTx1bmRlZmluZWQsIHVuZGVmaW5lZCwgQXhpb3NFcnJvcj4oKTtcclxuXHJcbmV4cG9ydCBjb25zdCBsb2FkVXNlckFzeW5jID0gY3JlYXRlQXN5bmNBY3Rpb24oXHJcbiAgTE9BRF9VU0VSX1JFUVVFU1QsXHJcbiAgTE9BRF9VU0VSX1NVQ0NFU1MsXHJcbiAgTE9BRF9VU0VSX0ZBSUxVUkVcclxuKTx1bmRlZmluZWQsIExvZ2luUmVzcG9uc2UsIEF4aW9zRXJyb3I+KCk7XHJcblxyXG5leHBvcnQgY29uc3Qgc2lnbnVwUmVzZXQgPSBjcmVhdGVTdGFuZGFyZEFjdGlvbihTSUdOX1VQX1JFU0VUKSgpO1xyXG4iLCJleHBvcnQgeyBkZWZhdWx0IH0gZnJvbSAnLi9yZWR1Y2VyJztcclxuZXhwb3J0ICogZnJvbSAnLi90eXBlJztcclxuZXhwb3J0ICogZnJvbSAnLi9hY3Rpb24nO1xyXG5leHBvcnQgKiBmcm9tICcuL3NhZ2EnO1xyXG4iLCJpbXBvcnQgeyBjcmVhdGVSZWR1Y2VyIH0gZnJvbSAndHlwZXNhZmUtYWN0aW9ucyc7XHJcbmltcG9ydCB7IFVzZXJTdGF0ZSwgVXNlckFjdGlvbiB9IGZyb20gJy4vdHlwZSc7XHJcbmltcG9ydCBwcm9kdWNlIGZyb20gJ2ltbWVyJztcclxuaW1wb3J0IHtcclxuICBMT0dfSU5fUkVRVUVTVCxcclxuICBMT0dfSU5fU1VDQ0VTUyxcclxuICBMT0dfSU5fRkFJTFVSRSxcclxuICBTSUdOX1VQX1JFUVVFU1QsXHJcbiAgU0lHTl9VUF9TVUNDRVNTLFxyXG4gIFNJR05fVVBfRkFJTFVSRSxcclxuICBTSUdOX1VQX1JFU0VULFxyXG4gIExPR19PVVRfUkVRVUVTVCxcclxuICBMT0dfT1VUX1NVQ0NFU1MsXHJcbiAgTE9HX09VVF9GQUlMVVJFLFxyXG4gIExPQURfVVNFUl9SRVFVRVNULFxyXG4gIExPQURfVVNFUl9TVUNDRVNTLFxyXG4gIExPQURfVVNFUl9GQUlMVVJFLFxyXG59IGZyb20gJy4vYWN0aW9uJztcclxuXHJcbmV4cG9ydCB0eXBlIElVc2VyUmVkdWNlclN0YXRlID0gdHlwZW9mIGluaXRpYWxTdGF0ZTtcclxuXHJcbmNvbnN0IGluaXRpYWxTdGF0ZTogVXNlclN0YXRlID0ge1xyXG4gIGlzTG9nZ2luZ2luOiBmYWxzZSxcclxuICBpc0xvZ2dpbmdvdXQ6IGZhbHNlLFxyXG4gIGxvZ2luRXJyb3I6ICcnLFxyXG4gIGlzU2lnbmVkdXA6IGZhbHNlLFxyXG4gIGlzU2lnbmluZ3VwOiBmYWxzZSxcclxuICBzaWdudXBFcnJvcjogJycsXHJcbiAgbWU6IG51bGwsXHJcbn07XHJcblxyXG5jb25zdCB1c2VyID0gY3JlYXRlUmVkdWNlcjxVc2VyU3RhdGUsIFVzZXJBY3Rpb24+KGluaXRpYWxTdGF0ZSwge1xyXG4gIFtTSUdOX1VQX1JFUVVFU1RdOiAoc3RhdGUpID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNTaWduaW5ndXAgPSB0cnVlO1xyXG4gICAgICBkcmFmdC5pc1NpZ25lZHVwID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LnNpZ251cEVycm9yID0gJyc7XHJcbiAgICB9KSxcclxuICBbU0lHTl9VUF9TVUNDRVNTXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmluZ3VwID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmVkdXAgPSB0cnVlO1xyXG4gICAgfSksXHJcbiAgW1NJR05fVVBfRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmluZ3VwID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmVkdXAgPSBmYWxzZTtcclxuICAgICAgZHJhZnQuc2lnbnVwRXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtTSUdOX1VQX1JFU0VUXTogKHN0YXRlKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzU2lnbmVkdXAgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtMT0dfSU5fUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdpbiA9IHRydWU7XHJcbiAgICAgIGRyYWZ0LmxvZ2luRXJyb3IgPSAnJztcclxuICAgICAgZHJhZnQubWUgPSBudWxsO1xyXG4gICAgfSksXHJcbiAgW0xPR19JTl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQuaXNMb2dnaW5naW4gPSBmYWxzZTtcclxuICAgICAgZHJhZnQubWUgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtMT0dfSU5fRkFJTFVSRV06IChzdGF0ZSwgYWN0aW9uKSA9PlxyXG4gICAgcHJvZHVjZShzdGF0ZSwgKGRyYWZ0KSA9PiB7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ2luID0gZmFsc2U7XHJcbiAgICAgIGRyYWZ0Lm1lID0gbnVsbDtcclxuICAgICAgZHJhZnQubG9naW5FcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgfSksXHJcbiAgW0xPR19PVVRfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdvdXQgPSB0cnVlO1xyXG4gICAgfSksXHJcbiAgW0xPR19PVVRfU1VDQ0VTU106IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5tZSA9IG51bGw7XHJcbiAgICAgIGRyYWZ0LmlzTG9nZ2luZ291dCA9IGZhbHNlO1xyXG4gICAgfSksXHJcbiAgW0xPR19PVVRfRkFJTFVSRV06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICBkcmFmdC5pc0xvZ2dpbmdvdXQgPSBmYWxzZTtcclxuICAgIH0pLFxyXG4gIFtMT0FEX1VTRVJfUkVRVUVTVF06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICAvL1xyXG4gICAgfSksXHJcbiAgW0xPQURfVVNFUl9TVUNDRVNTXTogKHN0YXRlLCBhY3Rpb24pID0+XHJcbiAgICBwcm9kdWNlKHN0YXRlLCAoZHJhZnQpID0+IHtcclxuICAgICAgZHJhZnQubWUgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgIH0pLFxyXG4gIFtMT0FEX1VTRVJfRkFJTFVSRV06IChzdGF0ZSkgPT5cclxuICAgIHByb2R1Y2Uoc3RhdGUsIChkcmFmdCkgPT4ge1xyXG4gICAgICAvL1xyXG4gICAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlcjtcclxuIiwiaW1wb3J0IHsgU2lnbnVwUmVzdWx0LCBMb2dpblJlc3VsdCwgU2lnbnVwUGF5bG9hZCwgTG9naW5QYXlsb2FkIH0gZnJvbSAnLi90eXBlJztcclxuaW1wb3J0IHsgc2lnbnVwQXN5bmMsIGxvZ2luQXN5bmMsIGxvZ291dEFzeW5jLCBsb2FkVXNlckFzeW5jIH0gZnJvbSAnLi9hY3Rpb24nO1xyXG5pbXBvcnQgeyBwdXQsIHRha2VMYXRlc3QsIGNhbGwsIGFsbCwgZm9yayB9IGZyb20gJ3JlZHV4LXNhZ2EvZWZmZWN0cyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG4vL+2ajOybkOqwgOyehVxyXG5mdW5jdGlvbiBzaWdudXBBUEkoc2lnbnVwRGF0YTogU2lnbnVwUGF5bG9hZCkge1xyXG4gIHJldHVybiBheGlvcy5wb3N0KCcvdXNlci9zaWdudXAnLCBzaWdudXBEYXRhKTtcclxufVxyXG5mdW5jdGlvbiogc2lnbnVwU2FnYShhY3Rpb246IFJldHVyblR5cGU8dHlwZW9mIHNpZ251cEFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogU2lnbnVwUmVzdWx0ID0geWllbGQgY2FsbChzaWdudXBBUEksIGFjdGlvbi5wYXlsb2FkKTtcclxuICAgIHlpZWxkIHB1dChzaWdudXBBc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQoc2lnbnVwQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaFNpZ251cCgpIHtcclxuICB5aWVsZCB0YWtlTGF0ZXN0KHNpZ251cEFzeW5jLnJlcXVlc3QsIHNpZ251cFNhZ2EpO1xyXG59XHJcblxyXG4vLyDroZzqt7jsnbhcclxuZnVuY3Rpb24gbG9naW5BUEkobG9naW5EYXRhOiBMb2dpblBheWxvYWQpIHtcclxuICByZXR1cm4gYXhpb3MucG9zdCgnL3VzZXIvbG9naW4nLCBsb2dpbkRhdGEpO1xyXG59XHJcbmZ1bmN0aW9uKiBsb2dpblNhZ2EoYWN0aW9uOiBSZXR1cm5UeXBlPHR5cGVvZiBsb2dpbkFzeW5jLnJlcXVlc3Q+KSB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3VsdDogTG9naW5SZXN1bHQgPSB5aWVsZCBjYWxsKGxvZ2luQVBJLCBhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICB5aWVsZCBwdXQobG9naW5Bc3luYy5zdWNjZXNzKHJlc3VsdC5kYXRhKSk7XHJcbiAgfSBjYXRjaCAoZTogYW55KSB7XHJcbiAgICB5aWVsZCBwdXQobG9naW5Bc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoTG9naW4oKSB7XHJcbiAgeWllbGQgdGFrZUxhdGVzdChsb2dpbkFzeW5jLnJlcXVlc3QsIGxvZ2luU2FnYSk7XHJcbn1cclxuXHJcbi8vIOuhnOq3uOyVhOybg1xyXG5mdW5jdGlvbiBsb2dvdXRBUEkoKSB7XHJcbiAgYXhpb3MucG9zdCgnL3VzZXIvbG9nb3V0Jywge30pO1xyXG59XHJcbmZ1bmN0aW9uKiBsb2dvdXRTYWdhKCkge1xyXG4gIHRyeSB7XHJcbiAgICB5aWVsZCBjYWxsKGxvZ291dEFQSSk7XHJcbiAgICB5aWVsZCBwdXQobG9nb3V0QXN5bmMuc3VjY2VzcygpKTtcclxuICB9IGNhdGNoIChlOiBhbnkpIHtcclxuICAgIHlpZWxkIHB1dChsb2dvdXRBc3luYy5mYWlsdXJlKGUucmVzcG9uc2UuZGF0YSkpO1xyXG4gIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24qIHdhdGNoTG9nb3V0KCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobG9nb3V0QXN5bmMucmVxdWVzdCwgbG9nb3V0U2FnYSk7XHJcbn1cclxuXHJcbi8vIOuhnOq3uOyduCDsnKDsp4BcclxuZnVuY3Rpb24gbG9hZFVzZXJBUEkoKSB7XHJcbiAgcmV0dXJuIGF4aW9zLmdldChgL3VzZXIvYCk7XHJcbn1cclxuZnVuY3Rpb24qIGxvYWRVc2VyU2FnYSgpIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzdWx0OiBMb2dpblJlc3VsdCA9IHlpZWxkIGNhbGwobG9hZFVzZXJBUEkpO1xyXG4gICAgeWllbGQgcHV0KGxvYWRVc2VyQXN5bmMuc3VjY2VzcyhyZXN1bHQuZGF0YSkpO1xyXG4gIH0gY2F0Y2ggKGU6IGFueSkge1xyXG4gICAgeWllbGQgcHV0KGxvYWRVc2VyQXN5bmMuZmFpbHVyZShlLnJlc3BvbnNlLmRhdGEpKTtcclxuICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uKiB3YXRjaExvYWRVc2VyKCkge1xyXG4gIHlpZWxkIHRha2VMYXRlc3QobG9hZFVzZXJBc3luYy5yZXF1ZXN0LCBsb2FkVXNlclNhZ2EpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiogdXNlclNhZ2EoKSB7XHJcbiAgeWllbGQgYWxsKFtcclxuICAgIGZvcmsod2F0Y2hTaWdudXApLFxyXG4gICAgZm9yayh3YXRjaExvZ2luKSxcclxuICAgIGZvcmsod2F0Y2hMb2dvdXQpLFxyXG4gICAgZm9yayh3YXRjaExvYWRVc2VyKSxcclxuICBdKTtcclxufVxyXG4iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnO1xyXG5pbXBvcnQgcmVkdWNlciwgeyByb290U2FnYSB9IGZyb20gJy4uL21vZHVsZXMnO1xyXG5pbXBvcnQgeyBjcmVhdGVXcmFwcGVyIH0gZnJvbSAnbmV4dC1yZWR1eC13cmFwcGVyJztcclxuaW1wb3J0IHdpdGhSZWR1eFNhZ2EgZnJvbSAnbmV4dC1yZWR1eC1zYWdhJztcclxuaW1wb3J0IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlLCB7IFRhc2sgfSBmcm9tICdyZWR1eC1zYWdhJztcclxuaW1wb3J0IHsgYXBwbHlNaWRkbGV3YXJlLCBjb21wb3NlLCBjcmVhdGVTdG9yZSwgU3RvcmUgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IGNvbXBvc2VXaXRoRGV2VG9vbHMgfSBmcm9tICdyZWR1eC1kZXZ0b29scy1leHRlbnNpb24nO1xyXG5pbXBvcnQgeyBUaGVtZVByb3ZpZGVyIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgdGhlbWUgZnJvbSAnLi4vLi4vc3R5bGVzL3RoZW1lJztcclxuaW1wb3J0IEdsb2JhbFN0eWxlIGZyb20gJy4uLy4uL3N0eWxlcy9HbG9iYWxTdHlsZSc7XHJcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vY29tcG9uZW50cy9MYXlvdXQnO1xyXG5pbXBvcnQgeyBIZWxtZXQgfSBmcm9tICdyZWFjdC1oZWxtZXQnO1xyXG5pbXBvcnQgSGVhZCBmcm9tICduZXh0L2hlYWQnO1xyXG5pbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcyc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFNhZ2FTdG9yZSBleHRlbmRzIFN0b3JlIHtcclxuICBzYWdhVGFzazogVGFzaztcclxufVxyXG5cclxuY29uc3QgVG91ciA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDw+XHJcbiAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgICAgPEhlYWQ+XHJcbiAgICAgICAgICA8bWV0YSBjaGFyU2V0PVwiVVRGLThcIiAvPlxyXG4gICAgICAgICAgPHRpdGxlPuyWtOuUlOqwiOuemDwvdGl0bGU+XHJcbiAgICAgICAgICA8bWV0YSBuYW1lPVwiZGVzY3JpcHRpb25cIiBjb250ZW50PVwi64yA7ZWc66+86rWtIOq0gOq0keyngCDshozqsJxcIiAvPlxyXG4gICAgICAgICAgPG1ldGFcclxuICAgICAgICAgICAgbmFtZT1cInZpZXdwb3J0XCJcclxuICAgICAgICAgICAgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCxpbml0aWFsLXNjYWxlPTEuMCxtaW5pbXVtLXNjYWxlPTEuMCxtYXhpbXVtLXNjYWxlPTUuMCx1c2VyLXNjYWxhYmxlPXllcyx2aWV3cG9ydC1maXQ9Y292ZXJcIlxyXG4gICAgICAgICAgLz5cclxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwi7Ja065SU6rCI656YXCIgLz5cclxuICAgICAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwi64yA7ZWc66+86rWtIOq0gOq0keyngCDshozqsJxcIiAvPlxyXG4gICAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzp0eXBlXCIgY29udGVudD1cIndlYnNpdGVcIiAvPlxyXG4gICAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCJodHRwOi8vd2R5d2cuc2l0ZS9vZy5wbmdcIiAvPlxyXG4gICAgICAgICAgPGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIC8+XHJcbiAgICAgICAgPC9IZWFkPlxyXG4gICAgICAgIDxHbG9iYWxTdHlsZSAvPlxyXG4gICAgICAgIDxMYXlvdXQ+XHJcbiAgICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgICAgPC9MYXlvdXQ+XHJcbiAgICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICAgIDwvPlxyXG4gICk7XHJcbn07XHJcblxyXG5jb25zdCBjb25maWd1cmVTdG9yZSA9ICgpID0+IHtcclxuICBjb25zdCBzYWdhTWlkZGxld2FyZSA9IGNyZWF0ZVNhZ2FNaWRkbGV3YXJlKCk7XHJcbiAgY29uc3QgbWlkZGxld2FyZXMgPSBbc2FnYU1pZGRsZXdhcmVdO1xyXG4gIGNvbnN0IGVuaGFuY2VyID1cclxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuICAgICAgPyBjb21wb3NlKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpXHJcbiAgICAgIDogY29tcG9zZShjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlcykpKTtcclxuICBjb25zdCBzdG9yZSA9IGNyZWF0ZVN0b3JlKHJlZHVjZXIsIGVuaGFuY2VyKTtcclxuICAoc3RvcmUgYXMgU2FnYVN0b3JlKS5zYWdhVGFzayA9IHNhZ2FNaWRkbGV3YXJlLnJ1bihyb290U2FnYSk7XHJcbiAgcmV0dXJuIHN0b3JlO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSBjcmVhdGVXcmFwcGVyKGNvbmZpZ3VyZVN0b3JlKTtcclxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlci53aXRoUmVkdXgod2l0aFJlZHV4U2FnYShUb3VyKSk7XHJcbiIsImltcG9ydCB7IGNyZWF0ZUdsb2JhbFN0eWxlIH0gZnJvbSAnc3R5bGVkLWNvbXBvbmVudHMnO1xyXG5pbXBvcnQgcmVzZXQgZnJvbSAnc3R5bGVkLXJlc2V0JztcclxuXHJcbmNvbnN0IEdsb2JhbFN0eWxlID0gY3JlYXRlR2xvYmFsU3R5bGVgXHJcbiAgJHtyZXNldH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNZXVsamlyb1wiO1xyXG4gICAgZm9udC13ZWlnaHQ6IDkwMDtcclxuICAgIHNyYzogdXJsKFwiL2ZvbnRzL0JNRVVMSklSTy53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XHJcbiAgfVxyXG4gIEBmb250LWZhY2Uge1xyXG4gICAgZm9udC1kaXNwbGF5OiBzd2FwO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiQk1KVUFcIjtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBzcmM6IHVybChcIi9mb250cy9CTUpVQS53b2ZmXCIpIGZvcm1hdChcIndvZmZcIik7XHJcbiAgfVxyXG4gIEBmb250LWZhY2Uge1xyXG4gICAgZm9udC1kaXNwbGF5OiBzd2FwO1xyXG4gICAgZm9udC1mYW1pbHk6IFwiQk1IQU5OQVwiO1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIHNyYzogdXJsKFwiL2ZvbnRzL0JNSEFOTkFfMTF5cnMud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuICBAZm9udC1mYWNlIHtcclxuICAgIGZvbnQtZGlzcGxheTogc3dhcDtcclxuICAgIGZvbnQtZmFtaWx5OiBcIkJNSEFOTkFBaXJcIjtcclxuICAgIHNyYzogdXJsKFwiL2ZvbnRzL0JNSEFOTkFBaXIud29mZlwiKSBmb3JtYXQoXCJ3b2ZmXCIpO1xyXG4gIH1cclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdsb2JhbFN0eWxlO1xyXG4iLCJleHBvcnQgY29uc3Qgc2l6ZSA9IHtcclxuICAgIHBjOiAnMTMwMHB4JyxcclxuICAgIGxhcHRvcDogJzEwMjRweCcsXHJcbiAgICB0YWJsZXQ6ICc3NjhweCcsXHJcbiAgICBtb2JpbGVMOiAnNTAwcHgnLFxyXG4gICAgbW9iaWxlTTogJzQyNXB4JyxcclxuICAgIG1vYmlsZVM6ICczNzVweCcsXHJcbn07XHJcblxyXG5jb25zdCB0aGVtZSA9IHtcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICAgIHBjOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLnBjfSlgLFxyXG4gICAgICAgIGxhcHRvcDogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5sYXB0b3B9KWAsXHJcbiAgICAgICAgdGFibGV0OiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLnRhYmxldH0pYCxcclxuICAgICAgICBtb2JpbGVMOiBgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHtzaXplLm1vYmlsZUx9KWAsXHJcbiAgICAgICAgbW9iaWxlTTogYEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICR7c2l6ZS5tb2JpbGVNfSlgLFxyXG4gICAgICAgIG1vYmlsZVM6IGBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAke3NpemUubW9iaWxlU30pYCxcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0aGVtZTtcclxuIiwiaW1wb3J0IHtcclxuICB1c2VDYWxsYmFjayxcclxuICB1c2VTdGF0ZSxcclxuICBDaGFuZ2VFdmVudCxcclxuICBEaXNwYXRjaCxcclxuICBTZXRTdGF0ZUFjdGlvbixcclxufSBmcm9tICdyZWFjdCc7XHJcblxyXG50eXBlIHVzZUlucHV0SG9vazxUPiA9IFtcclxuICBULFxyXG4gIChlOiBDaGFuZ2VFdmVudDxIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFRleHRBcmVhRWxlbWVudD4pID0+IHZvaWQsXHJcbiAgRGlzcGF0Y2g8U2V0U3RhdGVBY3Rpb248VD4+XHJcbl07XHJcblxyXG5mdW5jdGlvbiB1c2VJbnB1dDxUPihpbml0aWFsVmFsdWU6IFQpOiB1c2VJbnB1dEhvb2s8VD4ge1xyXG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGU8dHlwZW9mIGluaXRpYWxWYWx1ZT4oaW5pdGlhbFZhbHVlKTtcclxuICBjb25zdCBvbkNoYW5nZSA9IHVzZUNhbGxiYWNrKChlKSA9PiB7XHJcbiAgICBzZXRWYWx1ZShlLnRhcmdldC52YWx1ZSk7XHJcbiAgfSwgW10pO1xyXG4gIHJldHVybiBbdmFsdWUsIG9uQ2hhbmdlLCBzZXRWYWx1ZV07XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVzZUlucHV0O1xyXG4iLCJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlQ2FsbGJhY2ssIERpc3BhdGNoLCBTZXRTdGF0ZUFjdGlvbiB9IGZyb20gJ3JlYWN0JztcclxuXHJcbnR5cGUgdXNlVG9nZ2xlSG9vayA9IFtib29sZWFuLCAoKSA9PiB2b2lkLCBEaXNwYXRjaDxTZXRTdGF0ZUFjdGlvbjxib29sZWFuPj5dO1xyXG5cclxuZnVuY3Rpb24gdXNlVG9nZ2xlKGluaXRpYWxWYWx1ZTogYm9vbGVhbik6IHVzZVRvZ2dsZUhvb2sge1xyXG4gIGNvbnN0IFt2YWx1ZSwgc2V0VmFsdWVdID0gdXNlU3RhdGU8dHlwZW9mIGluaXRpYWxWYWx1ZT4oaW5pdGlhbFZhbHVlKTtcclxuICBjb25zdCBvblRvZ2dsZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcclxuICAgIHNldFZhbHVlKCh2YWx1ZSkgPT4gIXZhbHVlKTtcclxuICB9LCBbXSk7XHJcbiAgcmV0dXJuIFt2YWx1ZSwgb25Ub2dnbGUsIHNldFZhbHVlXTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdXNlVG9nZ2xlO1xyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vZGlzdC9jbGllbnQvaW1hZ2UnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Rpc3QvY2xpZW50L2xpbmsnKVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiQGFudC1kZXNpZ24vaWNvbnNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXhpb3NcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiaW1tZXJcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC1yZWR1eC1zYWdhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtcmVkdXgtd3JhcHBlclwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL2Rlbm9ybWFsaXplLXBhZ2UtcGF0aC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2VydmVyL2ltYWdlLWNvbmZpZy5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9oZWFkLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoLmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL21pdHQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyLWNvbnRleHQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2dldC1hc3NldC1wYXRoLWZyb20tcm91dGUuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL2lzLWR5bmFtaWMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3BhcnNlLXJlbGF0aXZlLXVybC5qc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJuZXh0L2Rpc3Qvc2hhcmVkL2xpYi9yb3V0ZXIvdXRpbHMvcXVlcnlzdHJpbmcuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLW1hdGNoZXIuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvcm91dGVyL3V0aWxzL3JvdXRlLXJlZ2V4LmpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvZGlzdC9zaGFyZWQvbGliL3RvLWJhc2UtNjQuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9kaXN0L3NoYXJlZC9saWIvdXRpbHMuanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibmV4dC9oZWFkXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQvcm91dGVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LWlzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0LXJlZHV4XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVkdXgtc2FnYVwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC1zYWdhL2VmZmVjdHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLWNvbXBvbmVudHNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic3R5bGVkLXJlc2V0XCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInR5cGVzYWZlLWFjdGlvbnNcIik7IiwiLyogKGlnbm9yZWQpICovIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdCIsIkltYWdlMSIsIl9yZWFjdCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2hlYWQiLCJfdG9CYXNlNjQiLCJfaW1hZ2VDb25maWciLCJfdXNlSW50ZXJzZWN0aW9uIiwiX2RlZmluZVByb3BlcnR5Iiwib2JqIiwia2V5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiX19lc01vZHVsZSIsIl9vYmplY3RTcHJlYWQiLCJ0YXJnZXQiLCJpIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwic291cmNlIiwib3duS2V5cyIsImtleXMiLCJnZXRPd25Qcm9wZXJ0eVN5bWJvbHMiLCJjb25jYXQiLCJmaWx0ZXIiLCJzeW0iLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJmb3JFYWNoIiwiX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzIiwiZXhjbHVkZWQiLCJfb2JqZWN0V2l0aG91dFByb3BlcnRpZXNMb29zZSIsInNvdXJjZVN5bWJvbEtleXMiLCJpbmRleE9mIiwicHJvdG90eXBlIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJjYWxsIiwic291cmNlS2V5cyIsImxvYWRlZEltYWdlVVJMcyIsIlNldCIsImdsb2JhbCIsIl9fTkVYVF9JTUFHRV9JTVBPUlRFRCIsIlZBTElEX0xPQURJTkdfVkFMVUVTIiwidW5kZWZpbmVkIiwibG9hZGVycyIsIk1hcCIsImRlZmF1bHRMb2FkZXIiLCJpbWdpeExvYWRlciIsImNsb3VkaW5hcnlMb2FkZXIiLCJha2FtYWlMb2FkZXIiLCJjdXN0b21Mb2FkZXIiLCJWQUxJRF9MQVlPVVRfVkFMVUVTIiwiaXNTdGF0aWNSZXF1aXJlIiwic3JjIiwiaXNTdGF0aWNJbWFnZURhdGEiLCJpc1N0YXRpY0ltcG9ydCIsImRldmljZVNpemVzIiwiY29uZmlnRGV2aWNlU2l6ZXMiLCJpbWFnZVNpemVzIiwiY29uZmlnSW1hZ2VTaXplcyIsImxvYWRlciIsImNvbmZpZ0xvYWRlciIsInBhdGgiLCJjb25maWdQYXRoIiwiZG9tYWlucyIsImNvbmZpZ0RvbWFpbnMiLCJwcm9jZXNzIiwiZW52IiwiX19ORVhUX0lNQUdFX09QVFMiLCJpbWFnZUNvbmZpZ0RlZmF1bHQiLCJhbGxTaXplcyIsInNvcnQiLCJhIiwiYiIsImdldFdpZHRocyIsIndpZHRoIiwibGF5b3V0Iiwic2l6ZXMiLCJ2aWV3cG9ydFdpZHRoUmUiLCJwZXJjZW50U2l6ZXMiLCJtYXRjaCIsImV4ZWMiLCJwdXNoIiwicGFyc2VJbnQiLCJzbWFsbGVzdFJhdGlvIiwiTWF0aCIsIm1pbiIsIndpZHRocyIsInMiLCJraW5kIiwibWFwIiwidyIsImZpbmQiLCJwIiwiZ2VuZXJhdGVJbWdBdHRycyIsInVub3B0aW1pemVkIiwicXVhbGl0eSIsInNyY1NldCIsImxhc3QiLCJqb2luIiwiZ2V0SW50IiwieCIsImRlZmF1bHRJbWFnZUxvYWRlciIsImxvYWRlclByb3BzIiwibG9hZCIsImdldCIsInJvb3QiLCJFcnJvciIsIlZBTElEX0xPQURFUlMiLCJoYW5kbGVMb2FkaW5nIiwiaW1nIiwicGxhY2Vob2xkZXIiLCJvbkxvYWRpbmdDb21wbGV0ZSIsImhhbmRsZUxvYWQiLCJzdGFydHNXaXRoIiwiZGVjb2RlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJjYXRjaCIsInRoZW4iLCJzdHlsZSIsImJhY2tncm91bmRTaXplIiwiYmFja2dyb3VuZEltYWdlIiwiYWRkIiwibmF0dXJhbFdpZHRoIiwibmF0dXJhbEhlaWdodCIsInJlZiIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnQiLCJnZXRDb21wdXRlZFN0eWxlIiwiZGlzcGxheSIsImNvbnNvbGUiLCJ3YXJuIiwicG9zaXRpb24iLCJjb21wbGV0ZSIsIm9ubG9hZCIsIl9wYXJhbSIsInByaW9yaXR5IiwibG9hZGluZyIsImxhenlCb3VuZGFyeSIsImNsYXNzTmFtZSIsImhlaWdodCIsIm9iamVjdEZpdCIsIm9iamVjdFBvc2l0aW9uIiwiYmx1ckRhdGFVUkwiLCJhbGwiLCJyZXN0Iiwic3RhdGljU3JjIiwic3RhdGljSW1hZ2VEYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsIndpZHRoSW50IiwiaGVpZ2h0SW50IiwicXVhbGl0eUludCIsImlzTGF6eSIsImhhcyIsImluY2x1ZGVzIiwiU3RyaW5nIiwiaXNOYU4iLCJWQUxJRF9CTFVSX0VYVCIsInJhbmQiLCJmbG9vciIsInJhbmRvbSIsInRvU3RyaW5nIiwic2V0UmVmIiwiaXNJbnRlcnNlY3RlZCIsInVzZUludGVyc2VjdGlvbiIsInJvb3RNYXJnaW4iLCJkaXNhYmxlZCIsImlzVmlzaWJsZSIsIndyYXBwZXJTdHlsZSIsInNpemVyU3R5bGUiLCJzaXplclN2ZyIsImltZ1N0eWxlIiwidG9wIiwibGVmdCIsImJvdHRvbSIsInJpZ2h0IiwiYm94U2l6aW5nIiwicGFkZGluZyIsImJvcmRlciIsIm1hcmdpbiIsIm1pbldpZHRoIiwibWF4V2lkdGgiLCJtaW5IZWlnaHQiLCJtYXhIZWlnaHQiLCJibHVyU3R5bGUiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJvdmVyZmxvdyIsInF1b3RpZW50IiwicGFkZGluZ1RvcCIsImltZ0F0dHJpYnV0ZXMiLCJzcmNTdHJpbmciLCJjcmVhdGVFbGVtZW50IiwiYWx0IiwidG9CYXNlNjQiLCJhc3NpZ24iLCJkZWNvZGluZyIsInJlbCIsImFzIiwiaHJlZiIsImltYWdlc3Jjc2V0IiwiaW1hZ2VzaXplcyIsIm5vcm1hbGl6ZVNyYyIsInNsaWNlIiwidXJsIiwiVVJMIiwicGFyYW1zIiwic2VhcmNoUGFyYW1zIiwic2V0IiwicGFyYW1zU3RyaW5nIiwibWlzc2luZ1ZhbHVlcyIsInBhcnNlZFNyYyIsImVyciIsImVycm9yIiwiaG9zdG5hbWUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJfcm91dGVyIiwiX3JvdXRlcjEiLCJwcmVmZXRjaGVkIiwicHJlZmV0Y2giLCJyb3V0ZXIiLCJvcHRpb25zIiwiaXNMb2NhbFVSTCIsImN1ckxvY2FsZSIsImxvY2FsZSIsImlzTW9kaWZpZWRFdmVudCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsIm1ldGFLZXkiLCJjdHJsS2V5Iiwic2hpZnRLZXkiLCJhbHRLZXkiLCJuYXRpdmVFdmVudCIsIndoaWNoIiwibGlua0NsaWNrZWQiLCJlIiwicmVwbGFjZSIsInNoYWxsb3ciLCJzY3JvbGwiLCJub2RlTmFtZSIsInByZXZlbnREZWZhdWx0IiwiTGluayIsInByb3BzIiwiY3JlYXRlUHJvcEVycm9yIiwiYXJncyIsImV4cGVjdGVkIiwiYWN0dWFsIiwicmVxdWlyZWRQcm9wc0d1YXJkIiwicmVxdWlyZWRQcm9wcyIsIl8iLCJvcHRpb25hbFByb3BzR3VhcmQiLCJwYXNzSHJlZiIsIm9wdGlvbmFsUHJvcHMiLCJ2YWxUeXBlIiwiaGFzV2FybmVkIiwidXNlUmVmIiwiY3VycmVudCIsInVzZVJvdXRlciIsInVzZU1lbW8iLCJyZXNvbHZlZEhyZWYiLCJyZXNvbHZlZEFzIiwicmVzb2x2ZUhyZWYiLCJjaGlsZHJlbiIsImNoaWxkIiwiQ2hpbGRyZW4iLCJvbmx5IiwiY2hpbGRSZWYiLCJzZXRJbnRlcnNlY3Rpb25SZWYiLCJ1c2VDYWxsYmFjayIsImVsIiwidXNlRWZmZWN0Iiwic2hvdWxkUHJlZmV0Y2giLCJpc1ByZWZldGNoZWQiLCJjaGlsZFByb3BzIiwib25DbGljayIsImRlZmF1bHRQcmV2ZW50ZWQiLCJvbk1vdXNlRW50ZXIiLCJ0eXBlIiwibG9jYWxlRG9tYWluIiwiaXNMb2NhbGVEb21haW4iLCJnZXREb21haW5Mb2NhbGUiLCJsb2NhbGVzIiwiZG9tYWluTG9jYWxlcyIsImFkZEJhc2VQYXRoIiwiYWRkTG9jYWxlIiwiZGVmYXVsdExvY2FsZSIsImNsb25lRWxlbWVudCIsIl9kZWZhdWx0IiwicmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2giLCJub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaCIsImVuZHNXaXRoIiwiX19ORVhUX1RSQUlMSU5HX1NMQVNIIiwidGVzdCIsInJlcXVlc3RJZGxlQ2FsbGJhY2siLCJjYW5jZWxJZGxlQ2FsbGJhY2siLCJzZWxmIiwiYmluZCIsIndpbmRvdyIsImNiIiwic3RhcnQiLCJEYXRlIiwibm93Iiwic2V0VGltZW91dCIsImRpZFRpbWVvdXQiLCJ0aW1lUmVtYWluaW5nIiwibWF4IiwiaWQiLCJjbGVhclRpbWVvdXQiLCJtYXJrQXNzZXRFcnJvciIsImlzQXNzZXRFcnJvciIsImdldENsaWVudEJ1aWxkTWFuaWZlc3QiLCJjcmVhdGVSb3V0ZUxvYWRlciIsIl9nZXRBc3NldFBhdGhGcm9tUm91dGUiLCJfcmVxdWVzdElkbGVDYWxsYmFjayIsIk1TX01BWF9JRExFX0RFTEFZIiwid2l0aEZ1dHVyZSIsImdlbmVyYXRvciIsImVudHJ5IiwiZnV0dXJlIiwicmVzb2x2ZXIiLCJwcm9tIiwiaGFzUHJlZmV0Y2giLCJsaW5rIiwiZG9jdW1lbnQiLCJNU0lucHV0TWV0aG9kQ29udGV4dCIsImRvY3VtZW50TW9kZSIsInJlbExpc3QiLCJzdXBwb3J0cyIsImNhblByZWZldGNoIiwicHJlZmV0Y2hWaWFEb20iLCJyZXMiLCJyZWoiLCJxdWVyeVNlbGVjdG9yIiwiY3Jvc3NPcmlnaW4iLCJfX05FWFRfQ1JPU1NfT1JJR0lOIiwib25lcnJvciIsImhlYWQiLCJhcHBlbmRDaGlsZCIsIkFTU0VUX0xPQURfRVJST1IiLCJTeW1ib2wiLCJhcHBlbmRTY3JpcHQiLCJzY3JpcHQiLCJyZWplY3QiLCJib2R5IiwiZGV2QnVpbGRQcm9taXNlIiwicmVzb2x2ZVByb21pc2VXaXRoVGltZW91dCIsIm1zIiwiY2FuY2VsbGVkIiwiciIsIl9fQlVJTERfTUFOSUZFU1QiLCJvbkJ1aWxkTWFuaWZlc3QiLCJfX0JVSUxEX01BTklGRVNUX0NCIiwiZ2V0RmlsZXNGb3JSb3V0ZSIsImFzc2V0UHJlZml4Iiwicm91dGUiLCJzY3JpcHRzIiwiZW5jb2RlVVJJIiwiY3NzIiwibWFuaWZlc3QiLCJhbGxGaWxlcyIsInYiLCJlbnRyeXBvaW50cyIsImxvYWRlZFNjcmlwdHMiLCJzdHlsZVNoZWV0cyIsInJvdXRlcyIsIm1heWJlRXhlY3V0ZVNjcmlwdCIsImZldGNoU3R5bGVTaGVldCIsImZldGNoIiwib2siLCJ0ZXh0IiwiY29udGVudCIsIndoZW5FbnRyeXBvaW50Iiwib25FbnRyeXBvaW50IiwiZXhlY3V0ZSIsImZuIiwiY29tcG9uZW50IiwiaW5wdXQiLCJvbGQiLCJsb2FkUm91dGUiLCJyb3V0ZUZpbGVzUHJvbWlzZSIsImVudHJ5cG9pbnQiLCJzdHlsZXMiLCJmaW5hbGx5IiwiY24iLCJuYXZpZ2F0b3IiLCJjb25uZWN0aW9uIiwic2F2ZURhdGEiLCJlZmZlY3RpdmVUeXBlIiwib3V0cHV0IiwiX3dpdGhSb3V0ZXIiLCJjcmVhdGVSb3V0ZXIiLCJtYWtlUHVibGljUm91dGVySW5zdGFuY2UiLCJfcm91dGVyQ29udGV4dCIsInNpbmdsZXRvblJvdXRlciIsInJlYWR5Q2FsbGJhY2tzIiwicmVhZHkiLCJ1cmxQcm9wZXJ0eUZpZWxkcyIsInJvdXRlckV2ZW50cyIsImNvcmVNZXRob2RGaWVsZHMiLCJldmVudHMiLCJmaWVsZCIsImdldFJvdXRlciIsIm9uIiwiZXZlbnRGaWVsZCIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic3Vic3RyaW5nIiwiX3NpbmdsZXRvblJvdXRlciIsIm1lc3NhZ2UiLCJzdGFjayIsInVzZUNvbnRleHQiLCJSb3V0ZXJDb250ZXh0IiwiaW5zdGFuY2UiLCJwcm9wZXJ0eSIsIkFycmF5IiwiaXNBcnJheSIsImhhc0ludGVyc2VjdGlvbk9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJpc0Rpc2FibGVkIiwidW5vYnNlcnZlIiwidmlzaWJsZSIsInNldFZpc2libGUiLCJ1c2VTdGF0ZSIsInRhZ05hbWUiLCJvYnNlcnZlIiwiaWRsZUNhbGxiYWNrIiwiZWxlbWVudCIsImNhbGxiYWNrIiwib2JzZXJ2ZXIiLCJlbGVtZW50cyIsImNyZWF0ZU9ic2VydmVyIiwiZGVsZXRlIiwic2l6ZSIsImRpc2Nvbm5lY3QiLCJvYnNlcnZlcnMiLCJlbnRyaWVzIiwiaXNJbnRlcnNlY3RpbmciLCJpbnRlcnNlY3Rpb25SYXRpbyIsIndpdGhSb3V0ZXIiLCJDb21wb3NlZENvbXBvbmVudCIsIldpdGhSb3V0ZXJXcmFwcGVyIiwiZ2V0SW5pdGlhbFByb3BzIiwib3JpZ0dldEluaXRpYWxQcm9wcyIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsImRlbExvY2FsZSIsImhhc0Jhc2VQYXRoIiwiZGVsQmFzZVBhdGgiLCJpbnRlcnBvbGF0ZUFzIiwiX25vcm1hbGl6ZVRyYWlsaW5nU2xhc2giLCJfcm91dGVMb2FkZXIiLCJfZGVub3JtYWxpemVQYWdlUGF0aCIsIl9ub3JtYWxpemVMb2NhbGVQYXRoIiwiX21pdHQiLCJfdXRpbHMiLCJfaXNEeW5hbWljIiwiX3BhcnNlUmVsYXRpdmVVcmwiLCJfcXVlcnlzdHJpbmciLCJfcmVzb2x2ZVJld3JpdGVzIiwiX3JvdXRlTWF0Y2hlciIsIl9yb3V0ZVJlZ2V4IiwiZGV0ZWN0RG9tYWluTG9jYWxlIiwiX19ORVhUX0kxOE5fU1VQUE9SVCIsImJhc2VQYXRoIiwiX19ORVhUX1JPVVRFUl9CQVNFUEFUSCIsImJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IiLCJhZGRQYXRoUHJlZml4IiwicHJlZml4IiwicGF0aE5vUXVlcnlIYXNoIiwibm9ybWFsaXplTG9jYWxlUGF0aCIsImRldGVjdGVkTG9jYWxlIiwiZGV0ZWN0ZWREb21haW4iLCJodHRwIiwiZG9tYWluIiwicGF0aG5hbWUiLCJwYXRoTG93ZXIiLCJ0b0xvd2VyQ2FzZSIsImxvY2FsZUxvd2VyIiwic3Vic3RyIiwicXVlcnlJbmRleCIsImhhc2hJbmRleCIsImxvY2F0aW9uT3JpZ2luIiwiZ2V0TG9jYXRpb25PcmlnaW4iLCJyZXNvbHZlZCIsIm9yaWdpbiIsImFzUGF0aG5hbWUiLCJxdWVyeSIsImludGVycG9sYXRlZFJvdXRlIiwiZHluYW1pY1JlZ2V4IiwiZ2V0Um91dGVSZWdleCIsImR5bmFtaWNHcm91cHMiLCJncm91cHMiLCJkeW5hbWljTWF0Y2hlcyIsImdldFJvdXRlTWF0Y2hlciIsImV2ZXJ5IiwicGFyYW0iLCJyZXBlYXQiLCJvcHRpb25hbCIsInJlcGxhY2VkIiwic2VnbWVudCIsInJlc3VsdCIsIm9taXRQYXJtc0Zyb21RdWVyeSIsImZpbHRlcmVkUXVlcnkiLCJyZXNvbHZlQXMiLCJiYXNlIiwidXJsQXNTdHJpbmciLCJmb3JtYXRXaXRoVmFsaWRhdGlvbiIsInVybFByb3RvTWF0Y2giLCJ1cmxBc1N0cmluZ05vUHJvdG8iLCJ1cmxQYXJ0cyIsInNwbGl0Iiwibm9ybWFsaXplZFVybCIsIm5vcm1hbGl6ZVJlcGVhdGVkU2xhc2hlcyIsImFzUGF0aCIsImZpbmFsVXJsIiwiaW50ZXJwb2xhdGVkQXMiLCJpc0R5bmFtaWNSb3V0ZSIsInNlYXJjaFBhcmFtc1RvVXJsUXVlcnkiLCJoYXNoIiwic3RyaXBPcmlnaW4iLCJwcmVwYXJlVXJsQXMiLCJocmVmSGFkT3JpZ2luIiwiYXNIYWRPcmlnaW4iLCJwcmVwYXJlZFVybCIsInByZXBhcmVkQXMiLCJyZXNvbHZlRHluYW1pY1JvdXRlIiwicGFnZXMiLCJjbGVhblBhdGhuYW1lIiwiZGVub3JtYWxpemVQYWdlUGF0aCIsInNvbWUiLCJwYWdlIiwicmUiLCJtYW51YWxTY3JvbGxSZXN0b3JhdGlvbiIsIl9fTkVYVF9TQ1JPTExfUkVTVE9SQVRJT04iLCJoaXN0b3J5Iiwic2Vzc2lvblN0b3JhZ2UiLCJzZXRJdGVtIiwicmVtb3ZlSXRlbSIsIm4iLCJTU0dfREFUQV9OT1RfRk9VTkQiLCJmZXRjaFJldHJ5IiwiYXR0ZW1wdHMiLCJjcmVkZW50aWFscyIsInN0YXR1cyIsImpzb24iLCJkYXRhIiwibm90Rm91bmQiLCJmZXRjaE5leHREYXRhIiwiZGF0YUhyZWYiLCJpc1NlcnZlclJlbmRlciIsIlJvdXRlciIsImNvbnN0cnVjdG9yIiwicGF0aG5hbWUxIiwicXVlcnkxIiwiYXMxIiwiaW5pdGlhbFByb3BzIiwicGFnZUxvYWRlciIsIkFwcCIsIndyYXBBcHAiLCJDb21wb25lbnQiLCJDb21wb25lbnQxIiwiZXJyMSIsInN1YnNjcmlwdGlvbiIsImlzRmFsbGJhY2siLCJpc1ByZXZpZXciLCJzZGMiLCJzZHIiLCJfaWR4Iiwib25Qb3BTdGF0ZSIsInN0YXRlIiwiY2hhbmdlU3RhdGUiLCJnZXRVUkwiLCJfX04iLCJmb3JjZWRTY3JvbGwiLCJpZHgiLCJwYWdlWE9mZnNldCIsInkiLCJwYWdlWU9mZnNldCIsImdldEl0ZW0iLCJwYXJzZSIsInBhcnNlUmVsYXRpdmVVcmwiLCJpc1NzciIsIl9icHMiLCJjaGFuZ2UiLCJfc2hhbGxvdyIsImNvbXBvbmVudHMiLCJpbml0aWFsIiwiX19OX1NTRyIsIl9fTl9TU1AiLCJhdXRvRXhwb3J0RHluYW1pYyIsIl9fTkVYVF9EQVRBX18iLCJhdXRvRXhwb3J0Iiwic3ViIiwiY2xjIiwiX3dyYXBBcHAiLCJpc1JlYWR5IiwiZ3NzcCIsImdpcCIsImFwcEdpcCIsImdzcCIsImxvY2F0aW9uIiwic2VhcmNoIiwiX19ORVhUX0hBU19SRVdSSVRFUyIsIl9zaG91bGRSZXNvbHZlSHJlZiIsImFkZEV2ZW50TGlzdGVuZXIiLCJzY3JvbGxSZXN0b3JhdGlvbiIsInJlbG9hZCIsImJhY2siLCJtZXRob2QiLCJzaG91bGRSZXNvbHZlSHJlZiIsIl9oIiwicHJldkxvY2FsZSIsInBhcnNlZEFzIiwibG9jYWxlUGF0aFJlc3VsdCIsImRpZE5hdmlnYXRlIiwiYXNOb0Jhc2VQYXRoIiwiU1QiLCJwZXJmb3JtYW5jZSIsIm1hcmsiLCJyb3V0ZVByb3BzIiwiX2luRmxpZ2h0Um91dGUiLCJhYm9ydENvbXBvbmVudExvYWQiLCJjbGVhbmVkQXMiLCJsb2NhbGVDaGFuZ2UiLCJvbmx5QUhhc2hDaGFuZ2UiLCJlbWl0Iiwic2Nyb2xsVG9IYXNoIiwibm90aWZ5IiwicGFyc2VkIiwicmV3cml0ZXMiLCJnZXRQYWdlTGlzdCIsIl9fcmV3cml0ZXMiLCJ1cmxJc05ldyIsInJld3JpdGVzUmVzdWx0IiwibWF0Y2hlZFBhZ2UiLCJyb3V0ZVJlZ2V4Iiwicm91dGVNYXRjaCIsInNob3VsZEludGVycG9sYXRlIiwibWlzc2luZ1BhcmFtcyIsInJlZjEiLCJyb3V0ZUluZm8iLCJnZXRSb3V0ZUluZm8iLCJwYWdlUHJvcHMiLCJfX05fUkVESVJFQ1QiLCJkZXN0aW5hdGlvbiIsInBhcnNlZEhyZWYiLCJuZXdVcmwiLCJuZXdBcyIsIl9fTl9QUkVWSUVXIiwibm90Rm91bmRSb3V0ZSIsImZldGNoQ29tcG9uZW50IiwiYXBwQ29tcCIsIm5leHQiLCJpc1ByZXJlbmRlcmVkIiwic3RhdHVzQ29kZSIsImlzVmFsaWRTaGFsbG93Um91dGUiLCJfc2Nyb2xsIiwic2hvdWxkU2Nyb2xsIiwicmVzZXRTY3JvbGwiLCJkb2N1bWVudEVsZW1lbnQiLCJsYW5nIiwiaGFuZGxlUm91dGVJbmZvRXJyb3IiLCJsb2FkRXJyb3JGYWlsIiwiZ2lwRXJyIiwicm91dGVJbmZvRXJyIiwiZXhpc3RpbmdSb3V0ZUluZm8iLCJjYWNoZWRSb3V0ZUluZm8iLCJtb2QiLCJpc1ZhbGlkRWxlbWVudFR5cGUiLCJnZXREYXRhSHJlZiIsIl9nZXREYXRhIiwiX2dldFN0YXRpY0RhdGEiLCJfZ2V0U2VydmVyRGF0YSIsImVycjIiLCJiZWZvcmVQb3BTdGF0ZSIsIm9sZFVybE5vSGFzaCIsIm9sZEhhc2giLCJuZXdVcmxOb0hhc2giLCJuZXdIYXNoIiwic2Nyb2xsVG8iLCJpZEVsIiwiZ2V0RWxlbWVudEJ5SWQiLCJzY3JvbGxJbnRvVmlldyIsIm5hbWVFbCIsImdldEVsZW1lbnRzQnlOYW1lIiwicGF0aG5hbWUyIiwiX2lzU3NnIiwiaXNTc2ciLCJjYW5jZWwiLCJjb21wb25lbnRSZXN1bHQiLCJsb2FkUGFnZSIsImNhY2hlS2V5IiwicmVzb3VyY2VLZXkiLCJjdHgiLCJBcHAxIiwiQXBwVHJlZSIsImxvYWRHZXRJbml0aWFsUHJvcHMiLCJSZWFjdCIsIkZvb3RlcldyYXBwZXIiLCJGb290ZXIiLCJzdHlsZWQiLCJkaXYiLCJMaSIsIkhlYWRJdGVtIiwidGl0bGUiLCJjb250ZW50VHlwZUlkIiwibGkiLCJ0aGVtZSIsInRhYmxldCIsIk5hdmJhciIsIk1haW5XcmFwcGVyIiwiTGF5b3V0IiwicGMiLCJsYXB0b3AiLCJOYXZiYXJXcmFwcGVyIiwiTG9nbyIsIlNlYXJjaCIsIkFjY291bnQiLCJDYXRlZ29yeSIsIk1vYmlsZVNlYXJjaCIsIldyYXBwZXIiLCJIYW1idXJnZXJNZW51IiwiTG9nb3V0QnV0dG9uIiwidXNlRGlzcGF0Y2giLCJ1c2VTZWxlY3RvciIsImxvZ291dEFzeW5jIiwiU2VhcmNoRm9ybSIsIk1lbnVPdXRsaW5lZCIsInVzZVRvZ2dsZSIsIkltYWdlIiwidG9nZ2xlIiwidG9nZ2xlSGFuYnVyZ2VyIiwic2V0VG9nZ2xlIiwibWUiLCJ1c2VyIiwiZGlzcGF0Y2giLCJvbkNsaWNrTG9nb3V0IiwicmVxdWVzdCIsImNsb3NlSGFtYnVyZ2VyIiwibW9iaWxlUyIsImJ1dHRvbiIsIklucHV0IiwiU2VhcmNoQnV0dG9uIiwiU2VhcmNoV3JhcHBlciIsIlNlYXJjaE91dGxpbmVkIiwidXNlSW5wdXQiLCJsYWJlbCIsIm9uQ2hhbmdlU2VhcmNoIiwib25TZWFyY2giLCJwYWdlTm8iLCJjb2xvciIsImNyZWF0ZUFzeW5jQWN0aW9uIiwiQUREX0NPTU1FTlRfUkVRVUVTVCIsIkFERF9DT01NRU5UX1NVQ0NFU1MiLCJBRERfQ09NTUVOVF9GQUlMVVJFIiwiTE9BRF9DT01NRU5UX1JFUVVFU1QiLCJMT0FEX0NPTU1FTlRfU1VDQ0VTUyIsIkxPQURfQ09NTUVOVF9GQUlMVVJFIiwiREVMRVRFX0NPTU1FTlRfUkVRVUVTVCIsIkRFTEVURV9DT01NRU5UX1NVQ0NFU1MiLCJERUxFVEVfQ09NTUVOVF9GQUlMVVJFIiwiTU9ESUZZX0NPTU1FTlRfUkVRVUVTVCIsIk1PRElGWV9DT01NRU5UX1NVQ0NFU1MiLCJNT0RJRllfQ09NTUVOVF9GQUlMVVJFIiwiYWRkQ29tbWVudEFzeW5jIiwibG9hZENvbW1lbnRBc3luYyIsImRlbGV0ZUNvbW1lbnRBc3luYyIsIm1vZGlmeUNvbW1lbnRBc3luYyIsInByb2R1Y2UiLCJjcmVhdGVSZWR1Y2VyIiwiaW5pdGlhbFN0YXRlIiwiY29tbWVudExpc3QiLCJjb21tZW50QWRkZWQiLCJpc0FkZGluZ0NvbW1lbnQiLCJjb21tZW50RXJyb3IiLCJjb21tZW50RWRpdGVkRXJyb3IiLCJjb21tZW50IiwiZHJhZnQiLCJhY3Rpb24iLCJwYXlsb2FkIiwiYXhpb3MiLCJ0YWtlTGF0ZXN0IiwicHV0IiwiZm9yayIsImFkZENvbW1lbnRBUEkiLCJjb250ZW50aWQiLCJjb21tZW50VGV4dCIsInBvc3QiLCJhZGRDb21tZW50U2FnYSIsInN1Y2Nlc3MiLCJmYWlsdXJlIiwicmVzcG9uc2UiLCJ3YXRjaEFkZENvbW1lbnQiLCJsb2FkQ29tbWVudHNBUEkiLCJjb250ZW50SWQiLCJsb2FkQ29tbWVudHNTYWdhIiwid2F0Y2hMb2FkQ29tbWVudHMiLCJkZWxldGVDb21tZW50QVBJIiwiZGVsZXRlQ29tbWVudFNhZ2EiLCJ3YXRjaFJlbW92ZUNvbW1lbnQiLCJtb2RpZnlDb21tZW50QVBJIiwiZWRpdENvbW1lbnQiLCJtb2RpZnlDb21tZW50U2FnYSIsIndhdGNoTW9kaWZ5Q29tbWVudCIsImNvbW1lbnRTYWdhIiwiUkVHSU9OX1RPVVJfUkVRVUVTVCIsIlJFR0lPTl9UT1VSX1NVQ0NFU1MiLCJSRUdJT05fVE9VUl9GQUlMVVJFIiwiU0VBUkNIX1RPVVJfUkVRVUVTVCIsIlNFQVJDSF9UT1VSX1NVQ0NFU1MiLCJTRUFSQ0hfVE9VUl9GQUlMVVJFIiwiREVUQUlMX1RPVVJfUkVRVUVTVCIsIkRFVEFJTF9UT1VSX1NVQ0NFU1MiLCJERVRBSUxfVE9VUl9GQUlMVVJFIiwiQUxMX1RPVVJfUkVRVUVTVCIsIkFMTF9UT1VSX1NVQ0NFU1MiLCJBTExfVE9VUl9GQUlMVVJFIiwiYWxsQXN5bmMiLCJzZWFyY2hBc3luYyIsInJlZ2lvbkFzeW5jIiwiZGV0YWlsQXN5bmMiLCJzZWFyY2hSZXN1bHQiLCJpdGVtcyIsIm51bU9mUm93cyIsInRvdGFsQ291bnQiLCJkZXRhaWxSZXN1bHQiLCJpdGVtIiwiYWxsRGF0YSIsImZlc3RpdmFsIiwic2xlZXAiLCJyZWdpb25SZXN1bHQiLCJkZXRhaWwiLCJhbGxBUEkiLCJhbGxEYXRhU2FnYSIsIndhdGNoQWxsRGF0YSIsInNlYXJjaEFQSSIsImFycmFuZ2UiLCJzZWFyY2hEZXRhaWxTYWdhIiwid2F0Y2hTZWFyY2hEZXRhaWwiLCJyZWdpb25BUEkiLCJhcmVhQ29kZSIsInJlZ2lvbkRldGFpbFNhZ2EiLCJ3YXRjaFJlZ2lvbkRldGFpbCIsImRldGFpbEFQSSIsImRldGFpbFJlc3VsdFNhZ2EiLCJ3YXRjaERldGFpbFJlc3VsdCIsImRldGFpbFNhZ2EiLCJIWURSQVRFIiwiY29tYmluZVJlZHVjZXJzIiwidXNlclNhZ2EiLCJiYWNrVXJsIiwiZGVmYXVsdHMiLCJiYXNlVVJMIiwid2l0aENyZWRlbnRpYWxzIiwicm9vdFJlZHVjZXIiLCJyb290U2FnYSIsImRlcHJlY2F0ZWQiLCJjcmVhdGVTdGFuZGFyZEFjdGlvbiIsIlNJR05fVVBfUkVRVUVTVCIsIlNJR05fVVBfU1VDQ0VTUyIsIlNJR05fVVBfRkFJTFVSRSIsIkxPR19JTl9SRVFVRVNUIiwiTE9HX0lOX1NVQ0NFU1MiLCJMT0dfSU5fRkFJTFVSRSIsIkxPR19PVVRfUkVRVUVTVCIsIkxPR19PVVRfU1VDQ0VTUyIsIkxPR19PVVRfRkFJTFVSRSIsIkxPQURfVVNFUl9SRVFVRVNUIiwiTE9BRF9VU0VSX1NVQ0NFU1MiLCJMT0FEX1VTRVJfRkFJTFVSRSIsIlNJR05fVVBfUkVTRVQiLCJzaWdudXBBc3luYyIsImxvZ2luQXN5bmMiLCJsb2FkVXNlckFzeW5jIiwic2lnbnVwUmVzZXQiLCJpc0xvZ2dpbmdpbiIsImlzTG9nZ2luZ291dCIsImxvZ2luRXJyb3IiLCJpc1NpZ25lZHVwIiwiaXNTaWduaW5ndXAiLCJzaWdudXBFcnJvciIsInNpZ251cEFQSSIsInNpZ251cERhdGEiLCJzaWdudXBTYWdhIiwid2F0Y2hTaWdudXAiLCJsb2dpbkFQSSIsImxvZ2luRGF0YSIsImxvZ2luU2FnYSIsIndhdGNoTG9naW4iLCJsb2dvdXRBUEkiLCJsb2dvdXRTYWdhIiwid2F0Y2hMb2dvdXQiLCJsb2FkVXNlckFQSSIsImxvYWRVc2VyU2FnYSIsIndhdGNoTG9hZFVzZXIiLCJyZWR1Y2VyIiwiY3JlYXRlV3JhcHBlciIsIndpdGhSZWR1eFNhZ2EiLCJjcmVhdGVTYWdhTWlkZGxld2FyZSIsImFwcGx5TWlkZGxld2FyZSIsImNvbXBvc2UiLCJjcmVhdGVTdG9yZSIsImNvbXBvc2VXaXRoRGV2VG9vbHMiLCJUaGVtZVByb3ZpZGVyIiwiR2xvYmFsU3R5bGUiLCJIZWFkIiwiVG91ciIsImNvbmZpZ3VyZVN0b3JlIiwic2FnYU1pZGRsZXdhcmUiLCJtaWRkbGV3YXJlcyIsImVuaGFuY2VyIiwic3RvcmUiLCJzYWdhVGFzayIsInJ1biIsIndyYXBwZXIiLCJ3aXRoUmVkdXgiLCJjcmVhdGVHbG9iYWxTdHlsZSIsInJlc2V0IiwibW9iaWxlTCIsIm1vYmlsZU0iLCJpbml0aWFsVmFsdWUiLCJzZXRWYWx1ZSIsIm9uQ2hhbmdlIiwib25Ub2dnbGUiXSwic291cmNlUm9vdCI6IiJ9