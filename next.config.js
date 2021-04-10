const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  future: {
    webpack5: true
  },
  async exportPathMap() {
    return {
      '/': { page: '/' }
    };
  }
};

module.exports = withBundleAnalyzer(nextConfig);
