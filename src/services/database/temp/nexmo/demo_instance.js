/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('demo_instance', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    demo_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'demo_base',
        key: 'id'
      }
    },
    account_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      references: {
        model: 'nexmo_account',
        key: 'id'
      }
    },
    language: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    modified: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'demo_instance'
  });
};
