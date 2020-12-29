// #region imports
    // #region libraries
    import {
        storageType,
    } from '~server/data/constants';

    import {
        Storage as IStorage,
        StorageType,
        StorageUploadKind,
    } from '~server/data/interfaces';
    // #endregion libraries


    // #region internal
    import filesystemStorage from './filesystem';
    import amazonStorage from './amazon';
    import googleStorage from './google';
    // #endregion internal
// #endregion imports



// #region module
class Storage implements IStorage{
    private type: StorageType;

    constructor(
        type: StorageType,
    ) {
        this.type = type;
    }

    public async download(
        filename: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.download(
                    filename,
                );
            case storageType.amazon:
                return amazonStorage.download(
                    filename,
                );
            case storageType.google:
                return googleStorage.download(
                    filename,
                );
            default:
                return;
        }
    }

    public async downloadAll(
        directory: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.downloadAll(
                    directory,
                );
            case storageType.amazon:
                return amazonStorage.downloadAll(
                    directory,
                );
            case storageType.google:
                return googleStorage.downloadAll(
                    directory,
                );
            default:
                return [];
        }
    }

    public async upload(
        filename: string,
        data: Buffer,
        kind?: StorageUploadKind,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.upload(
                    filename,
                    data,
                    kind,
                );
            case storageType.amazon:
                return amazonStorage.upload(
                    filename,
                    data,
                    kind,
                );
            case storageType.google:
                return googleStorage.upload(
                    filename,
                    data,
                    kind,
                );
        }
    }

    public async obliterate(
        filename: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.obliterate(
                    filename,
                );
            case storageType.amazon:
                return amazonStorage.obliterate(
                    filename,
                );
            case storageType.google:
                return googleStorage.obliterate(
                    filename,
                );
            default:
                return;
        }
    }

    public async obliterateAll(
        path: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.obliterateAll(
                    path,
                );
            case storageType.amazon:
                return amazonStorage.obliterateAll(
                    path,
                );
            case storageType.google:
                return googleStorage.obliterateAll(
                    path,
                );
            default:
                return;
        }
    }

    public async generateLocations() {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.generateLocations();
            case storageType.amazon:
                return amazonStorage.generateLocations();
            case storageType.google:
                return googleStorage.generateLocations();
            default:
                return;
        }
    }

    public async readDirectory(
        path: string,
    ) {
        switch (this.type) {
            case storageType.filesystem:
                return filesystemStorage.readDirectory(
                    path,
                );
            case storageType.amazon:
                return amazonStorage.readDirectory(
                    path,
                );
            case storageType.google:
                return googleStorage.readDirectory(
                    path,
                );
            default:
                return [];
        }
    }
}
// #endregion module



// #region exports
export default Storage;
// #endregion exports
