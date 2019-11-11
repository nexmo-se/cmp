import Joi from 'joi';

export default {
  listUsers: {
    query: {},
    params: {},
    body: {},
  },
  deleteAllUsers: {
    query: {},
    params: {},
    body: {},
  },

  readMyUser: {
    query: {},
    params: {},
    body: {},
  },
  updateMyUser: {
    query: {},
    params: {},
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      password: Joi.string().forbidden(),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
    },
  },
  changeMyUserPassword: {
    query: {},
    params: {},
    body: {
      password: Joi.string().min(6).required(),
      passwordConfirm: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
    },
  },

  readUser: {
    query: {},
    params: {
      userId: Joi.string().min(1).required(),
    },
    body: {},
  },
  updateUser: {
    query: {},
    params: {
      userId: Joi.string().min(1).required(),
    },
    body: {
      firstName: Joi.string(),
      lastName: Joi.string(),
      password: Joi.string().forbidden(),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
    },
  },
  deleteUser: {
    query: {},
    params: {
      userId: Joi.string().min(1).required(),
    },
    body: {},
  },
  changeUserPassword: {
    query: {},
    params: {
      userId: Joi.string().min(1).required(),
    },
    body: {
      password: Joi.string().min(6).required(),
      passwordConfirm: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
    },
  },
};
