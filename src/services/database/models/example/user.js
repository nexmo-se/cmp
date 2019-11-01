import S from 'sequelize';

/**
 * Name of sequelize table
 */
const name = 'user';
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
  first_name: {
    type: S.STRING,
    allowNull: true,
    defaultValue: '',
  },
  last_name: {
    type: S.STRING,
    allowNull: true,
    defaultValue: '',
  },
  email: {
    type: S.STRING,
    allowNull: true,
    defaultValue: '',
  },
  creation_date: {
    type: S.DATE,
    allowNull: false,
    defaultValue: '0000-00-00 00:00:00.000',
  },
  active: {
    type: S.BOOLEAN,
    allowNull: false,
    defaultValue: '1',
  },
};
/**
 * Sequelize define options
 */
const options = {
  tableName: 'user',
  createdAt: 'creation_date',
  updatedAt: false,
  classMethods: {
    associate(thisModel, allModels) {
      // Add association here
    },
  },
};

export default sequelize => sequelize.define(name, attributes, options);
