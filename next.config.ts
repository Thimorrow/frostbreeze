export default {
  experimental: {
    ppr: true,
    // inlineCss bricht next/font: relative Font-URLs im inlinten CSS
    // loesen gegen die Seiten-URL auf (/media/... -> 404) statt /_next/static/.
    inlineCss: false,
    useCache: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};
