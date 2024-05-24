/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const nextConfigFunction = async (phase) => {
    const withPWA = (await import('next-pwa')).default({
      dest: 'public',
      register: true,
      skipWaiting: true,
    });
    return withPWA(nextConfig);
};

export default nextConfigFunction;
