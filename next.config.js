const nextBuildId = require('next-build-id')

/** @type {import("next").NextConfig} */
module.exports = {
    reactStrictMode: true,

    generateBuildId: () => nextBuildId({ dir: __dirname }),
}
