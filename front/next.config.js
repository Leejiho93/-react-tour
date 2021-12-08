/** @type {import('next').NextConfig} */
// module.exports = {
//   reactStrictMode: true,
// }


// fileSystemInfo error
//
// module.exports = {
//   webpack(config) {
//     config.infrastructureLogging = { debug: /PackFileCache/ }
//     return config;
//   }
// }


// module.exports = {
//   reactStrictMode: true,
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: 'empty'
//       }
//     }

//     return config
//   }
// }

module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) config.resolve.fallback.fs = false;
    return config;
  }
};
