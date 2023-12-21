/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/bookit-v1",
    DB_URI: "",
    API_URL: "http://localhost:3000",
    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "dsada2321312h312312h123123bhdabhsdahsdb%%$^&"
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
