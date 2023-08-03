/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http://127.0.0.1:8000",
  },
  images: {
    domains: ["127.0.0.1", "fizyottolive.com"],
  },
};

module.exports = nextConfig;
