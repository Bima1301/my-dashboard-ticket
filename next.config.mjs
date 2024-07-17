/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    redirects: async () => {
        return [{
            source: '/',
            destination: '/overview',
            permanent: false,
        }, ]
    }
};

export default nextConfig;