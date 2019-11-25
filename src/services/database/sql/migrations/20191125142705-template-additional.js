module.exports = {
  up: (queryInterface, Sequelize) => {
    const addViberTtl = () => queryInterface.addColumn('CmpTemplates', 'viberTtl', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    const addFacebookTag = () => queryInterface.addColumn('CmpTemplates', 'facebookTag', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    const addCategory = () => queryInterface.addColumn('CmpTemplates', 'category', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    return Promise.resolve()
      .then(addViberTtl)
      .then(addFacebookTag)
      .then(addCategory);
  },
  down: (queryInterface) => {
    const removeViberTtl = () => queryInterface.removeColumn('CmpTemplate', 'viberTtl');
    const removeFacebookTag = () => queryInterface.removeColumn('CmpTemplate', 'facebookTag');
    const removeCategory = () => queryInterface.removeColumn('CmpTemplate', 'category');

    return Promise.resolve()
      .then(removeViberTtl)
      .then(removeFacebookTag)
      .then(removeCategory);
  },
};
