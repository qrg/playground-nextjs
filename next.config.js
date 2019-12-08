const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});

const nextConfig = {
  async exportPathMap() {
    return {
      '/': { page: '/' }
    };
  }
};

module.exports = withBundleAnalyzer(nextConfig);
