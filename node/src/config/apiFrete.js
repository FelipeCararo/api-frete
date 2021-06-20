const axios = require('axios').default;

const Api = axios.create({
  baseURL: process.env.URL_FRETE,
});

module.exports = Api;
