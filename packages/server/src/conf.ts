import { isPlainObject, isUndefined } from 'lodash';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { ConnectionOptions } from 'typeorm';
import { config } from 'dotenv';

const env: NodeJS.ProcessEnv = process.env;

config({ path: join(__dirname, '.env') });

const isProdEnv = env.NODE_ENV === 'production';
const isTestEnv = env.NODE_ENV === 'test';
const isDevEnv = env.NODE_ENV === 'development' || (!isProdEnv && !isTestEnv);

const port = Number(env.PORT) || 3000;

const conf = {
  env: {
    prod: isProdEnv,
    test: isTestEnv,
    dev: isDevEnv,
  },
  port: port,
  typeormConfig: getTypeormConf(isProdEnv),
  userJwtSecret: env.USER_JWT_SECRET ?? 's0meC0mpl1cat3DS3cRET%!!_user',
  hostUrl: (env.HEROKU_APP_NAME ? `https://${env.HEROKU_APP_NAME}.herokuapp.com` : `http://localhost:${port}`),
  apiUrlPath: '/api/v1',
  uploadLimit: env.UPLOAD_LIMIT ?? '2mb',
  rateLimit: {
    enabled: parseBool(env.RATE_LIMIT_ENABLE, isProdEnv),
    throttleTtlSeconds: Number(env.RATE_LIMIT_THROTTLE_SECS || 60),
    throttleLimit: Number(env.RATE_LIMIT_THROTTLE_LIMIT || 200),
  },
  slowDown: {
    windowMs: Number(env.RATE_LIMIT_MINS || 10) * 60 * 1000, // e.g. 10 minutes
    delayAfter: Number(env.RATE_LIMIT_CONS || 1000), // allow e.g. 1000 requests per 10 minutes, then...
    delayMs: Number(env.RATE_LIMIT_DELAY_MS || 500), // begin adding e.g. 500ms of delay per request above 1000:
  },
  log: {
    removeHeaders: parseBool(env.LOG_REMOVE_HEADERS, isProdEnv),
  },
  awsCredentials: {
    region: env.AWS_REGION,
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    bucketName: env.AWS_BUCKET_NAME,
  },
};

if (!isTestEnv && findUndefinedProperty(conf)) {
  throw new Error('undefined conf property: conf.' + findUndefinedProperty(conf));
}

if (isDevEnv) {
  console.log(conf);
}

export default conf;

// -----------------------------------------------------
//       helpers
// -----------------------------------------------------

function findUndefinedProperty(obj: object): string | undefined {
  for (const key in obj) {
    if (!obj.hasOwnProperty(key)) {
      continue;
    }

    const value = obj[key];
    if (isUndefined(value)) {
      return key;
    }

    if (isPlainObject(value) && findUndefinedProperty(value)) {
      return key + '.' + findUndefinedProperty(value);
    }
  }
}

function parseBool(value: unknown, defaultValue = false) {
  if (isUndefined(value)) {
    return defaultValue;
  }

  if (value === 'true' || value === '1' || value === 1 || value === true) {
    return true;
  }

  if (value === 'false' || value === '0' || value === 0 || value === false) {
    return false;
  }

  throw new Error('conf#parseBool: can not parse boolean value' + value);
}

function getTypeormConf(isProd: boolean): ConnectionOptions {
  const dbType = String(env.DB_TYPE);
  let config: ConnectionOptions;
  if (dbType === 'postgres') {
    config = {
      type: dbType,
      ssl: parseBool(env.DB_USE_SSL, isProd) ? { rejectUnauthorized: false } : false, // disable for inmemory db? Or use env variable?
      synchronize: parseBool(env.DB_SYNCHRONIZE, !isProd),
      url: String(env.DATABASE_URL), // will be used if has value instead of other params
    } as PostgresConnectionOptions;
  }

  return {
    ...config,
    entities: [join(__dirname, '**', '**.entity{.ts,.js}')],
    logging: parseBool(env.DB_TYPEORM_LOGGING, !isProd),
  };
}
