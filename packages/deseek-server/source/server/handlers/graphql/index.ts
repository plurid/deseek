// #region imports
    // #region libraries
    import {
        Application,
    } from 'express';

    import {
        ApolloServer,
    } from 'apollo-server-express';
    // #endregion libraries


    // #region external
    import {
        Context,
        DelogLogic,
    } from '~server/data/interfaces';

    import {
        GRAPHQL_FAVICON,
        GRAPHQL_TITLE,
        GRAPHQL_ENDPOINT,

        CUSTOM_LOGIC_USAGE,
        PRIVATE_USAGE,

        logLevel,
        logLevels,
    } from '~server/data/constants';

    import {
        resolvers,
        schemas,
    } from '~server/api';

    import loadData from '~server/logic/loader';

    import defaultLogger from '~server/services/logger';

    import {
        getPrivateOwner,
    } from '~server/logic/privateUsage';
    // #endregion external
// #endregion imports



// #region module
const setupGraphQLServer = async (
    instance: Application,
    logic?: DelogLogic,
) => {
    const playground = {
        faviconUrl: GRAPHQL_FAVICON,
        title: GRAPHQL_TITLE,
    };

    const customLogicUsage = CUSTOM_LOGIC_USAGE;
    const privateUsage = PRIVATE_USAGE;

    const logger = customLogicUsage && logic
        ? logic.logger
        : defaultLogger;

    const graphQLServer = new ApolloServer({
        typeDefs: schemas,
        resolvers,
        playground,
        context: async ({
            req,
            res,
        }: any) => {
            const privateOwnerIdentonym = privateUsage
                ? await getPrivateOwner(req)
                : '';

            const {
                tokens,
                projects,
                spaces,
                providers,
                repositories,
                formats,
                notifiers,
                testers,
            } = await loadData(
                privateOwnerIdentonym,
            );

            const context: Context = {
                request: req,
                response: res,

                instance,

                tokens,
                projects,
                spaces,
                providers,
                repositories,
                formats,
                notifiers,
                testers,

                customLogicUsage,

                privateUsage,
                privateOwnerIdentonym,

                logger,
                logLevel,
                logLevels,
            };

            return context;
        },
    });

    graphQLServer.applyMiddleware({
        app: instance,
        path: GRAPHQL_ENDPOINT,
    });
}
// #endregion module



// #region exports
export default setupGraphQLServer;
// #endregion exports
