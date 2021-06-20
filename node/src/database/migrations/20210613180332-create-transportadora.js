module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      'transportadoras',
      {
        trans_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        trans_nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        trans_servico: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        trans_prazo_entrega: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        trans_preco_frete: {
          type: Sequelize.DECIMAL,
          allowNull: false,
        },
      },
    );
  },

  down: queryInterface => {
    return queryInterface.sequelize.query(
      'DROP TABLE IF EXISTS transportadoras'
    );
  },
};
