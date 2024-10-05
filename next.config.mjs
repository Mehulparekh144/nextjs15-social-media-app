/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental : {
    staleTimes : { // Caching of page segments 
      dynamic : 30 // Is used when page is neither statically generated nor fully prefetched
    }
  },
  serverExternalPackages : ["@node-rs/argon2"] // Needed for Lucia-Auth
};

export default nextConfig;
