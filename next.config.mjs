/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/weather-app",
    assetPrefix: "/weather-app/",
    images: {
      unoptimized: true, // Ensures images work on GitHub Pages
    },
  };
  
  module.exports = nextConfig;
  
