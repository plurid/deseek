// #region imports
    // #region libraries
    import {
        uuid,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        DelogLogic,
    } from '~server/data/interfaces';

    import {
        logLevel,
    } from '~server/data/constants';

    import Logger from '~server/logic/persisters/logger';
    // #endregion external
// #endregion imports



// #region module
const delogLogic: DelogLogic = {
    getCurrentOwner: async () => {
        return {
            id: uuid.generate(),
            tokens: [],
            projects: [],
            spaces: [],
            providers: [],
            repositories: [],
            formats: [],
            notifiers: [],
            testers: [],
        };
    },
    checkOwnerToken: async (
        token: string,
    ) => {
        if (!token) {
            return false;
        }

        return true;
    },
    getOwnerToken: async (
        identonym,
        key,
    ) => {
        return {
            token: 'owner-token',
        };
    },

    logger: new Logger(logLevel),

    provider: {
        register: async (
            input,
        ) => {
            return undefined;
        },
        deregister: async (
            input,
        ) => {
            return true;
        },
    },
};
// #endregion module



// #region exports
export default delogLogic;
// #endregion exports
