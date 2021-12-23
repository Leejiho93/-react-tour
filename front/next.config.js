// /** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, {webpack}){
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    return{
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins,
    };
},
  // webpack: (config, { isServer }) => {
  //   if (!isServer) config.resolve.fallback.fs = false;
  //   return config;
  // },
  images: {
    domains: ['tong.visitkorea.or.kr'],
    minimumCacheTTL: 60,
  },
});
