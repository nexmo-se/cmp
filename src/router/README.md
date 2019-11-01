# Adding Demo

1) Create a folder for your demo with any name you prefer, in camelCase

2) Add `index.js` (for specifying routes), `validation.js` (for validating inputs), `controller.js` (for handling request)

3) Import demo in `src/router/index.js` in PascalCase:
```
import SampleDemo from './sampleDemo';
```

4) Add demo in router with demo route you prefer:
```
router.use('/sample', SampleDemo(container));
```

5) The demo should now be up on the demo route on the host.

# File Skeletons

### index.js

```
import validate from 'express-validation';
import Controller from './controller';
import validator from './validation';

export default (container) => {
  const router = container.express.Router();
  const controller = Controller(container);

  router.get('/', (_, res) => res.send('Hello NIDS'));

  // MUST HAVE ROUTE FOR REGISTRATION WHEN NIDS FRONTEND LAUNCHES
  router.route('/register')
    .get(controller.register)
    .post(controller.register);

  // GET
  router.post(
    '/getRoute/:nidsUserId',
    validate(validator.getValidation),
    controller.getController,
  );

  // POST
  router.post(
    '/postRoute/:nidsUserId',
    validate(validator.postValidation),
    controller.postController,
  );

  return router;
};

```

### validation.js
This uses `Joi` for validation, so read up on the available configurations: 

`https://github.com/hapijs/joi`

```
import Joi from 'joi';

export default {
  getValidation: {
    query: {},
    params: {
      nidsUserId: Joi.string().required(),
    },
    body: {},
  },
  postValidation: {
    query: {},
    params: {
      nidsUserId: Joi.string().required(),
    },
    body: {},
  },
};

```

### controller.js
```
export default (container) => {
  const getUserId = (req) => {
    const nexmoIni = container.utils.getIniStuff();
    const bearerToken = container.utils.getBearerToken(req);
    const userId = container.utils.getIdFromJWT(nexmoIni, bearerToken) || 'demo';
    return userId;
  };

  const register = async (req, res, next) => {
    try {
      // Get User Nexmo Ini
      const userId = getUserId(req);
      const userNexmoIni = container.utils.getNexmo(userId);

      // Setup Nexmo Applications (VAPI, MAPI, SMS, etc.) Webhooks here

      res.status(container.httpStatus.OK).send('registered');
    } catch (error) {
      next(error);
    }
  };

  const getController = async (req, res, next) => {
    try {
      console.log(req.params);
      console.log(req.body);
      res.json(req.body);
    } catch (error) {
      next(error);
    }
  };

  const postController = async (req, res, next) => {
    try {
      console.log(req.params);
      console.log(req.body);
      res.json(req.body);
    } catch (error) {
      next(error);
    }
  };

  return {
    register,

    getController,
    postController,
  };
};
```