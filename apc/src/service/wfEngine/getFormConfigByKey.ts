const ctx = require.context('./processes/forms', true, /\.\/(.*)\.json$/);

type FormConfig = Record<string, any>;

interface ConfigMap {
  [processDefKey: string]: {
    [taskDefKey: string]: FormConfig;
  };
}
const configMap: ConfigMap = {};

for (const path of ctx.keys()) {
  const jsonConfig = ctx(path);

  const [, processDefKey, taskDefKey] = path.match(/\/(.*?)\/(.*?)\.json$/)!;
  configMap[processDefKey] = configMap[processDefKey] ?? {};
  configMap[processDefKey][taskDefKey] = jsonConfig;
}

export const getFormConfigByKey = async (
  processDefKey: string,
  taskDefKey: string,
): Promise<FormConfig> => {
  return configMap[processDefKey][taskDefKey];
};
