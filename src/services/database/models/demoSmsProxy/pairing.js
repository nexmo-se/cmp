import S from 'sequelize';

/**
 * Name of sequelize table
 */
const name = 'pairing';
/**
 * Table structure
 */
const attributes = {
  id: {
    type: S.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  number1: {
    type: S.STRING(45),
    allowNull: false,
    unique: true,
  },
  number2: {
    type: S.STRING(45),
    allowNull: false,
    unique: true,
  },
  lvn: {
    type: S.STRING(45),
    allowNull: false,
  },
  nidsUserId: {
    type: S.STRING(45),
    allowNull: false,
  },
};
/**
 * Sequelize define options
 */
const options = {
  tableName: 'pairing',
  createdAt: false,
  updatedAt: false,
  classMethods: {
    associate(thisModel, allModels) {
      // Add association here
    },
  },
};

export default sequelize => sequelize.define(name, attributes, options);
