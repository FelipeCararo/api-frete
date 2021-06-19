// eslint-disable-next-line no-console
const logging = process.env.NODE_ENV === 'development' ? console.log : false;

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  username: process.env.POSTGRESQL_USER,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
  logging,
  define: {
    timestamps: false,
    underscored: true,
    underscoredAll: true,
  },
};
