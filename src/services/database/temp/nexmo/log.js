/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('log', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    userid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    demo: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    accountid: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true
    },
    event: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    results: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'log'
  });
};
