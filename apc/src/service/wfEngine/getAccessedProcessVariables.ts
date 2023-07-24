export const getAccessedProcessVariables = (
  config: Record<string, any> | string,
): string[] => {
  const configString = typeof config === 'string' ? config : JSON.stringify(config);
  const formSplitted = configString.split(
    /{{[\s]*form\.processVariables\.(.+?)([.].+?)?[\s]*}}/,
  );
  const variableNames = new Set<string>();
  for (let i = 1; i < formSplitted.length; i += 3) {
    const variableName = formSplitted[i];
    variableNames.add(variableName);
  }
  return Array.from(variableNames);
};
