/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@rescue/ui"],
  async headers() {
    return [
      {
        source: "/api",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ]
      }
    ]
  }
};
