import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {

    // 为每个路由生成类型声明
    typedRoutes: true
  }

};


export default withNextIntl(nextConfig);
