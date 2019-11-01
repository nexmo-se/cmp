import S from 'sequelize';

/**
 * Name of sequelize table
 */
const name = 'demo_base';

const attributes = {


  id: {
    type: S.INTEGER(10).UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: S.STRING(200),
    allowNull: true,
  },
  url: {
    type: S.TEXT,
    allowNull: true,
  },
  port: {
    type: S.TEXT,
    allowNull: true,
  },
  description: {
    type: S.TEXT,
    allowNull: true,
  },
  component: {
    type: S.STRING(100),
    allowNull: true,
  },
  intro: {
    type: S.TEXT,
    allowNull: true,
  },
  summary: {
    type: S.TEXT,
    allowNull: true,
  },
  languages: {
    type: S.TEXT,
    allowNull: true,
  },
  category: {
    type: S.STRING(45),
    allowNull: true,
  },
  icon: {
    type: S.STRING(100),
    allowNull: true,
  },
  requirements: {
    type: S.TEXT,
    allowNull: true,
  },
  active: {
    type: S.INTEGER(11),
    allowNull: true,
    defaultValue: '1',
  },
};
/**
 * Sequelize define options
 */
const options = {
  tableName: name,
  createdAt: 'creation_date',
  updatedAt: false,
  classMethods: {
    associate(thisModel, allModels) {
      // Add association here
    },
  },
};

export default sequelize => sequelize.define(name, attributes, options);
