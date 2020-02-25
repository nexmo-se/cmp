module.exports = {
  up: (queryInterface, Sequelize) => {
    const addStartHour = () => queryInterface.addColumn('CmpCampaigns', 'activeStartHour', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    const addStartMinute = () => queryInterface.addColumn('CmpCampaigns', 'activeStartMinute', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    const addEndHour = () => queryInterface.addColumn('CmpCampaigns', 'activeEndHour', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    const addEndMinute = () => queryInterface.addColumn('CmpCampaigns', 'activeEndMinute', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    const addActiveOnWeekends = () => queryInterface.addColumn('CmpCampaigns', 'activeOnWeekends', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
    const addTimezone = () => queryInterface.addColumn('CmpCampaigns', 'timezone', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });
    return Promise.resolve()
      .then(addStartHour)
      .then(addStartMinute)
      .then(addEndHour)
      .then(addEndMinute)
      .then(addActiveOnWeekends)
      .then(addTimezone);
  },
  down: (queryInterface) => {
    const removeStartHour = () => queryInterface.removeColumn('CmpCampaigns', 'activeStartHour');
    const removeStartMinute = () => queryInterface.removeColumn('CmpCampaigns', 'activeStartMinute');
    const removeEndHour = () => queryInterface.removeColumn('CmpCampaigns', 'activeEndHour');
    const removeEndMinute = () => queryInterface.removeColumn('CmpCampaigns', 'activeEndMinute');
    const removeActiveOnWeekends = () => queryInterface.removeColumn('CmpCampaigns', 'activeOnWeekends');
    const removeTimezone = () => queryInterface.removeColumn('CmpCampaigns', 'timezone');
    return Promise.resolve()
      .then(removeStartHour)
      .then(removeStartMinute)
      .then(removeEndHour)
      .then(removeEndMinute)
      .then(removeActiveOnWeekends)
      .then(removeTimezone);
  },
};
