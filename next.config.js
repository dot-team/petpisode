/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    distDir: './dist',
    basePath: process.env.NEXT_PUBLIC_BASE_PATH, // `/some-base-path`.
};
