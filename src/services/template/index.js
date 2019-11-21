export default () => {
  const getText = (templateBody, parameters) => {
    let contentBody = templateBody;

    for (let i = 0; i < parameters.length; i += 1) {
      const parameter = parameters[i];
      const pattern = `\\{\\{${i + 1}\\}\\}`;
      const regexp = new RegExp(pattern, 'g');
      contentBody = contentBody.replace(regexp, parameter);
    }

    return contentBody;
  };

  return {
    getText,
  };
};
