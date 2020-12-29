// #region imports
    // #region external
    import {
        DatabaseType,
        StorageType,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const DATABASE_TYPE = (process.env.DELOG_DATABASE_TYPE as DatabaseType | undefined)
    || 'mongo';

export const STORAGE_TYPE = (process.env.DELOG_STORAGE_TYPE as StorageType | undefined)
    || 'filesystem';


export const LOG_LEVEL = process.env.DELOG_LOG_LEVEL || '7';
export const QUIET = process.env.DELOG_QUIET === 'true';

export const logLevel = QUIET
    ? 0
    : parseInt(LOG_LEVEL);


export const CUSTOM_LOGIC_USAGE = process.env.DELOG_CUSTOM_LOGIC_USAGE === 'true';


export const PRIVATE_USAGE = process.env.DELOG_PRIVATE_USAGE === 'true'
export const PRIVATE_OWNER_IDENTONYM = process.env.DELOG_PRIVATE_OWNER_IDENTONYM || '';
export const PRIVATE_OWNER_KEY = process.env.DELOG_PRIVATE_OWNER_KEY || '';
export const PRIVATE_TOKEN = process.env.DELOG_PRIVATE_TOKEN || '';


export const MONGO_USERNAME = process.env.DELOG_MONGO_USERNAME || '';
export const MONGO_PASSWORD = process.env.DELOG_MONGO_PASSWORD || '';
export const MONGO_ADDRESS = process.env.DELOG_MONGO_ADDRESS || '';
export const MONGO_CONNECTION_STRING = process.env.DELOG_MONGO_CONNECTION_STRING || '';


export const TEST_MODE = process.env.DELOG_TEST_MODE === 'true';



export const OPTIMIZATION_BATCH_WRITE_SIZE = parseInt(process.env.DELOG_OPTIMIZATION_BATCH_WRITE_SIZE || '') || 1000;
export const OPTIMIZATION_BATCH_WRITE_TIME = parseInt(process.env.DELOG_OPTIMIZATION_BATCH_WRITE_TIME || '') || 5000;
// #endregion module
