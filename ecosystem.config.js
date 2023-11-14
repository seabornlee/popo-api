module.exports = {
  apps: [
    {
      name: "popo-api",
      script: "app.js",
      env: {},
      env_production: {
        DATABASE_URL: process.env.DATABASE_URL,
        NODE_ENV: "production",
      },
    },
  ],
};
