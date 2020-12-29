// #region imports
    // #region libraries
    import fs, {
        promises as promisesFS,
    } from 'fs';
    // #endregion libraries


    // #region external
    import {
        logLevel,
        logLevels,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
/**
 * Given a directory path, makes the directory and all the subdirectories required.
 *
 * @param directory
 */
export const makeDirectorySync = (
    directory: string,
) => {
    fs.mkdirSync(directory, {
        recursive: true,
    });
}


export const obliterateDirectory = async (
    target: string,
) => {
    try {
        await promisesFS.rmdir(target, {
            recursive: true,
        });
    } catch (error) {
        if (logLevel <= logLevels.error) {
            console.log('[Delog Error] :: obliterateDirectory', error);
        }

        return;
    }
}
// #endregion module
