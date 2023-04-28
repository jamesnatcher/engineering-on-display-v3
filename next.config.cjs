/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  images: {
    domains: ['https://spxmwntvjxpmaccslwqz.supabase.co'],
    path: '',
    loader: 'imgix',
  },
};

module.exports = nextConfig;
