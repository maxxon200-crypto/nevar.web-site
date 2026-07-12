/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  eslint: {
    // Lint is run explicitly in CI; do not fail production builds on lint.
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        // Long-cache the self-hosted, content-hashed font files.
        source: "/_next/static/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
