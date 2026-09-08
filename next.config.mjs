/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Izinkan gambar cover dari host mana pun (HTTPS). Perketat bila perlu.
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
