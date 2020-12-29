// #region imports
    // #region libraries
    import cloudStorage from '@google-cloud/storage';
    // #endregion libraries


    // #region external
    import {
        QUIET,
    } from '~server/data/constants';

    import {
        Storage,
        StorageDownload,
        StorageDownloadAll,
        StorageUpload,
        StorageObliterate,
        StorageObliterateAll,
        StorageGenerateLocations,
        StorageReadDirectory,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const storageDownload: StorageDownload = async (
    filename,
) => {
    try {
        return '';
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Google could not download ${filename}.`);
        }

        return;
    }
}


const storageDownloadAll: StorageDownloadAll = async (
    directory,
) => {
    try {
        return [];
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Filesystem could not download ${directory}.`);
        }

        return [];
    }
}


const storageUpload: StorageUpload = async (
    filename,
    data,
    kind?,
) => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Google could not upload ${filename}.`);
        }

        return;
    }
}


const storageObliterate: StorageObliterate = async (
    filename,
) => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Google could not obliterate ${filename}.`);
        }

        return;
    }
}


const storageObliterateAll: StorageObliterateAll = async (
    pathway,
) => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log(`[Performer Error 500] :: Google could not obliterate all ${pathway}.`);
        }

        return;
    }
}


const storageGenerateLocations: StorageGenerateLocations = async () => {
    try {
        return true;
    } catch (error) {
        if (!QUIET) {
            console.log('[Performer Error 500] :: Google could not generate locations.');
        }

        return;
    }
}


const storageReadDirectory: StorageReadDirectory = async (
    directoryPath: string,
) => {
    try {

        return [];
    } catch (error) {
        if (!QUIET) {
            console.log(`[Delog Error 500] :: Filesystem could not read directory ${directoryPath}.`);
        }

        return [];
    }
}



const googleStorage: Storage = {
    download: storageDownload,
    downloadAll: storageDownloadAll,
    upload: storageUpload,
    obliterate: storageObliterate,
    obliterateAll: storageObliterateAll,
    generateLocations: storageGenerateLocations,
    readDirectory: storageReadDirectory,
};
// #endregion module



// #region exports
export default googleStorage;
// #endregion exports
