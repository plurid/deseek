// #region imports
    // #region external
    import {
        DelogOwner,
        OwnerToken,

        Provider,
    } from '../general';

    import {
        Notifier,
    } from '../notifier';

    import {
        Logger,
    } from '../logger';

    import {
        InputValueString,
        InputAddProvider,
    } from '../inputs';
    // #endregion external
// #endregion imports



// #region module
export interface DelogLogicProvider {
    register: (
        input: InputAddProvider,
    ) => Promise<Provider | undefined>;
    deregister: (
        input: InputValueString,
    ) => Promise<boolean>;
}


export interface DelogLogic {
    getCurrentOwner: () => Promise<DelogOwner>;
    checkOwnerToken: (
        token: string,
    ) => Promise<boolean>;
    getOwnerToken: (
        identonym: string,
        key: string,
    ) => Promise<OwnerToken>;
    logger: Logger;

    provider: DelogLogicProvider;
}
// #endregion module
