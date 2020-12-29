// #region imports
    // #region external
    import {
        StorageTypeData,
        StorageTypeFilesystem,
        StorageTypeAmazon,
        StorageTypeGoogle,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const storageTypeFilesystem: StorageTypeFilesystem = 'filesystem';
export const storageTypeAmazon: StorageTypeAmazon = 'amazon';
export const storageTypeGoogle: StorageTypeGoogle = 'google';

export const storageType: StorageTypeData = {
    filesystem: storageTypeFilesystem,
    amazon: storageTypeAmazon,
    google: storageTypeGoogle,
};
// #endregion module
