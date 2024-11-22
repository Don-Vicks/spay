// next.config.ts
import type { NextConfig } from "next";
import webpack from "webpack"; // Ensure compatibility with TypeScript

const nextConfig: NextConfig = {
    reactStrictMode: true, // Enables React's strict mode for highlighting potential issues
    swcMinify: true,       // Use the SWC compiler for faster builds and minification

    webpack(config) {
        // Add custom Webpack plugins or configuration
        config.plugins.push(
            new webpack.NormalModuleReplacementPlugin(
                /^isomorphic-form-data$/,
                `${config.context}/form-data-mock.js`
            )
        );
        return config;
    },
};

export default nextConfig;
