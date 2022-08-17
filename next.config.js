/** @type {import('next').NextConfig} */

const isProd = (process.env.NODE_ENV || "production") === "production";
const assetPrefix = isProd ? "https://typescontents.shop" : "";

const nextConfig = {
  assetPrefix: assetPrefix,
  images: {
    loader: "akamai",
    path: "",
  },
};

module.exports = nextConfig;
