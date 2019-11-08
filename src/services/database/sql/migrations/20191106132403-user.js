module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.createTable('Users', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      passwordSalt: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      firstName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    queryInterface.createTable('UserRoles', {
      id: {
        type: Sequelize.STRING(45),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      user: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    queryInterface.dropTable('UserRoles');
    queryInterface.dropTable('Users');
  },
};
