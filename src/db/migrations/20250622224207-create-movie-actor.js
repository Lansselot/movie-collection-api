'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MovieActors', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUIDV4,
      },
      movieId: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'Movies',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      actorId: {
        type: Sequelize.UUIDV4,
        allowNull: false,
        references: {
          model: 'Actors',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovieActors');
  },
};
