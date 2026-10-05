// import { withNextVideo } from "next-video/process";

// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default withNextVideo(nextConfig);
// // export default nextConfig;

import withVideos from "next-videos";

export default withVideos({
  async headers() {
    return ["/Media/:path*", "/images/:path*"].map((source) => ({
      source,
      headers: [{
        key: "Cache-Control",
        value: "public, max-age=86400, stale-while-revalidate=604800",
      }],
    }));
  },
});
