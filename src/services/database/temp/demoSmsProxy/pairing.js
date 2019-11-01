/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pairing', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    number1: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    number2: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true
    },
    lvn: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    nidsUserId: {
      type: DataTypes.STRING(45),
      allowNull: false
    }
  }, {
    tableName: 'pairing'
  });
};
