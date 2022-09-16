/** 
 * @type {import('next').NextConfig} 
 **/

 const fetchVersion = () => {
  const {version} = JSON.parse(require("fs").readFileSync("package.json"))
  return version
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["image.tmdb.org"],
  },
  env: {
    APP_VERSION: fetchVersion(),
  },
};

module.exports = nextConfig;
