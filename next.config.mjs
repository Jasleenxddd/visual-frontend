export default {
  async headers() {
    return [
      {
        source: '/:path*', // This applies to all routes
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
          {
              key: 'Content-Security-Policy',
              value: "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com;",
            },
        ],
      },
    ];
  },
};
