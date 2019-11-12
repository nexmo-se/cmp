import Joi from 'joi';

export default {
  login: {
    query: {},
    params: {},
    body: {
      username: Joi.string().min(1).required(),
      password: Joi.string().min(1).required(),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
    },
  },

  register: {
    query: {},
    params: {},
    body: {
      username: Joi.string().min(1).required(),
      password: Joi.string().min(1).required(),
      passwordConfirm: Joi.any().valid(Joi.ref('password')).required().options({
        language: {
          any: {
            allowOnly: 'must match password',
          },
        },
      }),
      passwordHash: Joi.string().forbidden(),
      passwordSalt: Joi.string().forbidden(),
      firstName: Joi.string().min(1).required(),
      lastName: Joi.string().min(1).required(),
    },
  },
};
