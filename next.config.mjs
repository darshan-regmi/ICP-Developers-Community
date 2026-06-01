/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // GitHub avatar URLs (https://github.com/{user}.png) redirect to
    // avatars.githubusercontent.com. Next.js Image follows the redirect,
    // so both hostnames need to be allowlisted.
    remotePatterns: [
      { protocol: "https", hostname: "github.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
