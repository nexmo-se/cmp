/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nexmo_attributes', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    account_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    attr_type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    attr_value: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'nexmo_attributes'
  });
};
