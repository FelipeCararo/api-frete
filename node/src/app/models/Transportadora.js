const { Sequelize, Model } = require('sequelize');

class Transportadora extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'trans_id',
        },
        nome: {
          type: Sequelize.STRING,
          field: 'trans_nome',
        },
        servico: {
          type: Sequelize.STRING,
          field: 'trans_servico',
        },
        prazo_entrega: {
          type: Sequelize.INTEGER,
          field: 'trans_prazo_entrega',
        },
        preco_frete: {
          type: Sequelize.DECIMAL,
          field: 'trans_preco_frete',
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

}

Transportadora.TABLE = 'transportadoras';

module.exports = Transportadora;
