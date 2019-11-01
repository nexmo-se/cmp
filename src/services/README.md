# Adding Service

1) Create a folder for your demo with any name you prefer, in camelCase.

2) Add `index.js` (for specifying routes) and other files as necessary. Sub-services may also follow the skeleton to obtain required services and config from the `container`.

3) Import service in `src/container/index.js` using PascalCase:
```
import SampleService from '../services/sample';
```

4) Add service to container in camelCase:
```
container.sampleService = SampleService(container);
```

5) You may now use your new service via the container anywhere.


# File Skeletons
Services should be a function that takes in a `container` and returns a JSON object with methods to be exposed to the world.

```
export default (container) => {
  const doSomething = () => {
    console.log('Do Something');
  };

  const doSomethingAsync = async () => {
    try {
      console.log('Do Something Async');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    doSomething,
    doSomethingAsync,
  };
};

```

### Logger module

The logger module is exposed in the `container.defaultLogger` property. The logger is composed by the main function, called `L` and by other functions that will be developed in the future (logging in Slack, etc). The `L` accepts an argument as input, that will be appended in the beginning of the log.

Example of use:

```
// Remember to set the file name as argument

const { L } = container.defaultLogger('App.js');
L.debug("Hello CSE Team!") // [DEBUG] App.js - Hello CSE Team!

```