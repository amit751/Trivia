require("dotenv").config();
module.exports = {
  development: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATA_BASE,
    host: process.env.SQL_HOST,
    dialect: process.env.SQL_DIALECT,
    define: {
      underscored: true,
    },
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
  test: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATA_BASE,
    host: process.env.SQL_HOST,
    dialect: process.env.SQL_DIALECT,
    define: {
      underscored: true,
    },
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
  production: {
    username: process.env.SQL_USERNAME,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATA_BASE,
    dialect: process.env.SQL_DIALECT,
    define: {
      underscored: true,
    },
    dialectOptions: {
      socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`,
    },
  },
};
