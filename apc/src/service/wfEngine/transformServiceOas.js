/* eslint-disable guard-for-in */
const { upperFirst, pickBy } = require('lodash');
const pluralize = require('pluralize');

const prefix = '/iknito/rest';

const verbMap = {
  get: 'get',
  post: 'query',
  put: 'create',
  delete: 'delete',
};

module.exports = (spec) => {
  for (const wrongPath in spec.paths) {
    const path = wrongPath.replace(prefix, '');
    spec.paths[path] = spec.paths[wrongPath];
    const pathComponents = path.replace(/^\//, '').split('/');
    const isRootPath = pathComponents.length === 1;

    const config = spec.paths[path];

    for (const method in config) {
      const methodConf = config[method];
      const verb = verbMap[method.toLocaleLowerCase()];
      const noneParamCmps = pathComponents
        .filter((cmp) => !/^{.*}$/.test(cmp))
        .map((cmp) => upperFirst(cmp));

      const name = isRootPath
        ? pluralize.plural(noneParamCmps[0])
        : noneParamCmps.join('');

      methodConf.operationId = `${verb}${name}`;
    }
  }

  spec.paths = pickBy(spec.paths, (_, key) => !key.includes('/iknito/rest'));

  spec.info.description = 'Workflow Service Rest API';
  spec.info.title = 'Workflow Service Rest API';

  return spec;
};
