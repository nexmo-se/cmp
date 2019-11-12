module.exports = {
  up: (queryInterface, Sequelize) => {
    const createUsersTable = () => queryInterface.createTable('Users', {
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
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
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

    const createUserRolesTable = () => queryInterface.createTable('UserRoles', {
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
      deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false,
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
    return createUsersTable().then(createUserRolesTable);
  },
  down: (queryInterface) => {
    const dropUserRolesTable = () => queryInterface.dropTable('UserRoles');
    const dropUsersTable = () => queryInterface.dropTable('Users');
    return dropUserRolesTable().then(dropUsersTable);
  },
};
