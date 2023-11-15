/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  typescript: {
    ignoreBuildErrors: true, // FIXME: workaround
  },
  eslint: {
    ignoreDuringBuilds: true, // FIXME: workaround
  },
  reactStrictMode: false,
};

export default nextConfig;
