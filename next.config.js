/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["www.freepnglogos.com"],
  },
};

module.exports = nextConfig;
