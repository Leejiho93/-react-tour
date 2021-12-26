const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = withBundleAnalyzer({
  compress: true,
  webpack(config, {}){
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    if (prod) {
      plugins.push(new CompressionPlugin());
    }
    return{
        ...config,
        mode: prod ? 'production' : 'development',
        devtool: prod ? 'hidden-source-map' : 'eval',
        plugins,
    };
},
  images: {
    domains: ['tong.visitkorea.or.kr'],
    minimumCacheTTL: 60,
  },
});
