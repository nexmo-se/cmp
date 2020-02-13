import Joi from 'joi';

export default {
  listUsers: {
    query: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      username: Joi.string(),
      firstName: Joi.string(),
      lastName: Joi.string(),
    },
    params: {},
    body: {},
  },
  searchUsers: {
    query: {},
    params: {},
    body: {
      limit: Joi.number().integer(),
      offset: Joi.number().integer(),
      username: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      firstName: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
      lastName: Joi.alternatives().try(
        Joi.string(),
        Joi.array().items(Joi.string()),
      ),
    },
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
      username: Joi.string().forbidden(),
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
      username: Joi.string().forbidden(),
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
  addUserRole: {
    query: {},
    params: {
      userId: Joi.string().min(1).required(),
    },
    body: {
      role: Joi.string().min(1).required(),
    },
  },
  removeUserRole: {
    query: {},
    params: {
      userId: Joi.string().min(1).required(),
    },
    body: {
      role: Joi.string().min(1).required(),
    },
  },
};
