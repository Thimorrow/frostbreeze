export default {
  experimental: {
    // 'incremental' statt true: bei globalem PPR geht die statische Shell
    // immer mit Status 200 raus, notFound() in [page]/[handle] kann den
    // Status nicht mehr aendern -> Soft-404. Opt-in nur fuer Routen ohne
    // 404-Semantik (Home, /search).
    ppr: "incremental",
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
