import * as colorette from 'colorette';
import { Params } from 'nestjs-pino';
import conf from '../conf';

export const pinoConf: Params = {

  pinoHttp: [
    {
      level: conf.env.prod ? 'info' : 'debug',
      transport: !conf.env.prod ? {
        target: 'pino-pretty',
        options: {
          colorize: colorette.isColorSupported,
          levelFirst: true,
          messageFormat: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
          ignore: 'pid,hostname',
          hideObject: false,
          singleLine: false,
        },
      } : null,
      base: null, // need pid to differ between dynos / containers
      serializers: filterOutput(),
    }, null,
  ],
};

function filterOutput() {
  if (conf.log.removeHeaders) {
    return {
      req: removeHeaders,
      res: removeHeaders,
    };
  }
}

function removeHeaders(o) {
  delete o?.headers;
  return o;
}
