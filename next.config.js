const nextBuildId = require('next-build-id')

/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,

    generateBuildId: () => nextBuildId({ dir: __dirname }),

    async redirects() {
        return [
            {
                source: "/p/:slug",
                destination: "/projects/:slug",
                permanent: false,
            },
            {
                source: "/u/:slug",
                destination: "/user/:slug",
                permanent: false,
            },
            {
                source: "/n/:slug",
                destination: "/new/:slug",
                permanent: false,
            },
        ]
    }
}
