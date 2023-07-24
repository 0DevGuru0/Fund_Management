import path from 'path';

import chalk from 'chalk';
import log, { LogLevelNumbers } from 'loglevel';
import PrettyError from 'pretty-error';

const isProduction = process.env.NODE_ENV === 'production';
const isTest = process.env.NODE_ENV === 'test';

// Configure Pretty Error to log more readable errors
const prettyError = new PrettyError();
prettyError.alias('webpack-internal:///', '');
prettyError.skipNodeFiles();
prettyError.skipPath('internal/process/task_queues.js');
prettyError.skipPath(path.resolve(__dirname, '../', 'build/server.js'));
prettyError.appendStyle({
  // this is a simple selector to the element that says 'Error'
  'pretty-error > header > title:first-child > kind': {
    // which we can hide:
    display: 'none',
  },
  'pretty-error > header > colon': {
    // we hide that too:
    display: 'none',
  },
  'pretty-error': {
    marginLeft: '0',
  },
  'pretty-error > trace': {
    marginLeft: '1',
  },
  'pretty-error > header > message': {
    color: 'bright-red',
  },
});

const originalConfig = log.methodFactory;
log.methodFactory = function (
  methodName: string,
  logLevel: LogLevelNumbers,
  loggerName: string | symbol,
) {
  const personalizedConfig = originalConfig(methodName, logLevel, loggerName);
  return function (...messages: any[]) {
    personalizedConfig.apply(undefined, messageGenerator(methodName, messages));
  };
};

log.enableAll();

export const sysLog = log.getLogger('system-log');
if (isTest) {
  sysLog.setLevel('warn');
} else {
  sysLog.enableAll();
}

export const apiLog = log.getLogger('app-api');
if (isProduction) {
  apiLog.enableAll();
} else {
  apiLog.setLevel('warn');
}

const messageGenerator = (logType: string, messages: string[]): string[] => {
  let type = logType,
    msgs = messages;
  switch (logType) {
    case 'info':
      type = chalk.green(`${logType}`);
      break;
    case 'error':
      type = chalk.red(`${logType}`);
      msgs = messages.map((msg) => prettyError.render(msg));
      break;
    case 'warn':
      type = chalk.yellow(`${logType}`);
      break;
    default:
      break;
  }

  const levelPrefix = `[${type}] `;
  return [levelPrefix].concat(msgs);
};
