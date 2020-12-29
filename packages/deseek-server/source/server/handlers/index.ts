// #region imports
    // #region libraries
    import PluridServer from '@plurid/plurid-react-server';
    // #endregion libraries


    // #region external
    import {
        DelogLogic,
    } from '~server/data/interfaces';
    // #endregion external


    // #region internal
    import setupGlobal from './global';
    import setupMiddleware from './middleware';
    import setupGraphQL from './graphql';
    // #endregion internal
// #endregion imports



// #region module
const setupHandlers = async (
    server: PluridServer,
    logic?: DelogLogic,
) => {
    const instance = server.instance();

    await setupGlobal();
    await setupMiddleware(
        instance,
        logic,
    );
    await setupGraphQL(
        instance,
        logic,
    );
}
// #endregion module



// #region exports
export default setupHandlers;
// #endregion exports
