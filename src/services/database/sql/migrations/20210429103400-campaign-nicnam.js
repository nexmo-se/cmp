module.exports = {
  up: (queryInterface, Sequelize) => {
    const addNiCnam = () => queryInterface.addColumn('CmpCampaigns', 'niCnam', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });

    return Promise.resolve()
      .then(addNiCnam);
  },
  down: (queryInterface) => {
    const removeNiCnam = () => queryInterface.removeColumn('CmpCampaigns', 'niCnam');
    return Promise.resolve()
      .then(removeNiCnam);
  },
};
