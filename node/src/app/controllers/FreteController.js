const express = require('express');
const Yup = require('yup');
const { QueryTypes } = require('sequelize');

const Api = require('../../config/apiFrete');
const Transportadora = require('../models/Transportadora');
const HttpStatus = require('http-status-codes');

const routes = express.Router();

class FreteController {
  /**
   * Aviso de conexão bem sucedida de exemplo
   * @param {Object} req
   * @param {Object} res
   */
  async connect(req, res) {
    return res.status(HttpStatus.OK).json({ msg: 'Api Conectada.' });
  }

  /**
   * Consulta das métricas das quotas
   * @param {Object} req
   * @param {Object} res
   */
  async metrics(req, res) {
    const { last_quotes } = req.query;

    let paramLastQuotes = '';

    if (last_quotes) {
      paramLastQuotes = ` LIMIT ${last_quotes} `;
    }

    const transportadoras = await Transportadora.sequelize
      .query(
        `
        SELECT trans_nome, 
               count(trans_nome) as quantidade,
               sum(trans_preco_frete) as total,
               avg(trans_preco_frete) as media,
               min(trans_preco_frete),
               max(trans_preco_frete)
          FROM ${Transportadora.TABLE} 
         GROUP BY trans_nome
         ORDER BY total DESC
               ${paramLastQuotes}`
      )
      .then((result) => result)
      .catch(() => false);

    if (!transportadoras) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ error: 'Transportadoras inexistentes' });
    }

    return res.json(transportadoras[0]);
  }

  /**
   * Realiza a criação do user
   * @param {Object} req
   * @param {Object} res
   */
  async quote(req, res) {
    const params = await Yup.object()
      .required()
      .shape({
        remetente: Yup.object().shape({
          cnpj: Yup.string().required(),
        }),
        codigo_plataforma: Yup.string().required(),
        token: Yup.string().required(),
        destinatario: Yup.object().shape({
          endereco: Yup.object().shape({
            cep: Yup.string().required(),
          }),
        }),

        volumes: Yup.array().of(
          Yup.object().shape({
            tipo: Yup.number().required(),
            quantidade: Yup.number().required(),
            peso: Yup.number().required(),
            valor: Yup.number().required(),
            sku: Yup.string().required(),
            altura: Yup.number().required(),
            largura: Yup.number().required(),
            comprimento: Yup.number().required(),
          })
        ),
      })
      .validate(req.body);

    const result = await Api({
      method: 'post',
      url: '/quote-simulator',
      data: params,
    })
      .then(({ data }) => data)
      .catch((error) => false);

    if (!result) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json('Ocorreu um erro ao realizar o quote.');
    }

    async function* getAllCarriers() {
      for (const transportadora of result.transportadoras) {
        let response = {
          nome: transportadora.nome,
          servico: transportadora.servico,
          prazo_entrega: transportadora.prazo_entrega,
          preco_frete: transportadora.preco_frete,
        };

        yield response;
      }
    }

    for await (let transportadora of getAllCarriers()) {
      try {
        await Transportadora.create({
          nome: transportadora.nome,
          servico: transportadora.servico,
          prazo_entrega: transportadora.prazo_entrega,
          preco_frete: transportadora.preco_frete,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json('Ocorreu um erro ao cadastrar a transportadora');
      }
    }

    return res.status(HttpStatus.CREATED).json(result);
  }

  /**
   * Rotas dos Planos de Venda
   */
  routes() {
    routes.get('/', this.connect);
    routes.post('/quote', this.quote);
    routes.get('/metrics', this.metrics);

    return routes;
  }
}

module.exports = new FreteController();
