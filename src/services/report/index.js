import Summary from './summary';

export default (container) => {
  const { L } = container.defaultLogger('Report Service');

  return {
    summary: Summary(container),
  };
};
