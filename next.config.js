module.exports = {
    async redirects() {
      return [
        {
          source: '/old-home-path',
          destination: '/',
          permanent: true,
        },
        {
          source: '/home',
          destination: '/',
          permanent: true,
        },
      ];
    },
  };
  