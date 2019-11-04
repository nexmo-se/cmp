export default () => ({
  defaultLogger: () => ({
    L: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
  }),
});
