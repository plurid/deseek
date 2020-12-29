// #region imports
    // #region libraries
    import {
        Request,
        Response,
        Application,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        ClientToken,
        Project,
        Space,
        Provider,
        Repository,
        Format,
        Tester,
    } from '../general';

    import {
        ClientNotifier,
    } from '../notifier';

    import {
        DelogLogic,
    } from '../logic';

    import {
        Logger,
        LogLevels,
    } from '../logger';
    // #endregion external
// #endregion imports



// #region module
export interface Context {
    request: DelogRequest;
    response: Response;

    instance: Application;

    tokens: ClientToken[];
    projects: Project[];
    spaces: Space[];
    providers: Provider[];
    repositories: Repository[];
    formats: Format[];
    // notifiers: ClientNotifier[];
    notifiers: any[];
    testers: Tester[];

    customLogicUsage: boolean;

    privateUsage: boolean;
    privateOwnerIdentonym: string | undefined;

    logger: Logger;
    logLevel: number;
    logLevels: LogLevels;
}


export type DelogRequest = Request & {
    delogLogic: DelogLogic | undefined;
    rawBody: string | undefined;
}
// #endregion module
