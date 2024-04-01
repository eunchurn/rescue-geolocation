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
      },
      {
        source: "/create",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ]
      },
      {
        source: "/rescue",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0"
          }
        ]
      },
      {
        source: "/tracking",
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
