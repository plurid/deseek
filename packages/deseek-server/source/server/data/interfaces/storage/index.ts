// #region module
export type StorageType =
    | StorageTypeFilesystem
    | StorageTypeAmazon
    | StorageTypeGoogle;

export type StorageTypeFilesystem = 'filesystem';
export type StorageTypeAmazon = 'amazon';
export type StorageTypeGoogle = 'google';

export interface StorageTypeData {
    filesystem: StorageTypeFilesystem;
    amazon: StorageTypeAmazon;
    google: StorageTypeGoogle;
}


export interface Storage {
    download: StorageDownload;
    downloadAll: StorageDownloadAll;
    upload: StorageUpload;
    obliterate: StorageObliterate;
    obliterateAll: StorageObliterateAll;
    generateLocations: StorageGenerateLocations;
    readDirectory: StorageReadDirectory;
}

export type StorageDownload = (
    filename: string,
) => Promise<string | undefined>;

export type StorageDownloadAll = (
    directory: string,
) => Promise<any[]>;

export type StorageUpload = (
    filename: string,
    data: Buffer,
    kind?: StorageUploadKind,
) => Promise<true | void>;

export type StorageObliterate = (
    filename: string,
) => Promise<true | undefined>;

export type StorageObliterateAll = (
    path: string,
) => Promise<true | undefined>;

export type StorageGenerateLocations = () => Promise<true | undefined>;

export type StorageReadDirectory = (
    path: string,
) => Promise<string[]>;


export type StorageUploadKind =
    | 'write'
    | 'append';
// #endregion module
