import withPWABuilder from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = withPWABuilder({
    dest: "public",
})({})

export default nextConfig
