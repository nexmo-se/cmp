const uuid = require('uuid');
const bcrypt = require('bcrypt');


module.exports = {
  up: (queryInterface) => {
    const numberOfRounds = parseInt(process.env.HASH_SALT_ROUNDS || '10', 10);

    const id = uuid.v4();
    const username = 'sysadmin';
    const password = 'password123';
    const firstName = 'System';
    const lastName = 'Admin';

    const createUser = () => {
      const passwordSalt = bcrypt.genSaltSync(numberOfRounds);
      const passwordHash = bcrypt.hashSync(password, passwordSalt);

      return queryInterface.bulkInsert('Users', [{
        id,
        username,
        passwordHash,
        passwordSalt,
        firstName,
        lastName,
        deleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    };

    const addRoles = () => {
      const data = [
        {
          id: uuid.v4(),
          user: id,
          role: 'superadmin',
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          user: id,
          role: 'admin',
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuid.v4(),
          user: id,
          role: 'user',
          deleted: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      return queryInterface.bulkInsert('UserRoles', data, {});
    };

    return createUser()
      .then(addRoles);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('UserRoles', null, {})
      .then(() => queryInterface.bulkDelete('Users', null, {}));
  },
};
