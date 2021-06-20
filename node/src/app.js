const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const Youch = require('youch');
const Boom = require('@hapi/boom');
const HttpStatus = require('http-status-codes');

require('express-async-errors');
require("dotenv/config");
require('../src/database');

const routes = require('./routes.js');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.handleException();
  }

  middlewares() {
    this.server.use(cors({ origin: true, credentials: true }));
    this.server.use(helmet());
    this.server.use(express.json());
  }

  routes() {
    this.server.use('/', routes);
  }

  handleException() {
    this.server.use(async (err, req, res, next) => {
      if (Boom.isBoom(err)) {
        return res
          .status(err.output.statusCode)
          .json({ error: err.output.payload });
      }

      if (process.env.NODE_ENV === 'development') {
        return res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json(await new Youch(err, req).toJSON());
      }

      // Se é um erro não tratado
      // eslint-disable-next-line no-console
      console.log(err);

      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error:
          'Ocorreu um erro inesperado!',
      });
    });
  }
}

module.exports = new App();
