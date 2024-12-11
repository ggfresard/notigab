// eslint-disable-next-line @typescript-eslint/no-require-imports
const withPWA = require("next-pwa")({
    dest: "public",
})

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({})

export default nextConfig
