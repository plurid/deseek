// #region imports
    // #region libraries
    import merge from 'lodash.merge';
    // #endregion libraries


    // #region internal
    import owner from './owner/resolvers';
    import projects from './projects/resolvers';
    import setup from './setup/resolvers';
    // #endregion internal
// #endregion imports



// #region module
const generateResolvers = (
    ...imports: any[]
) => {
    const resolvers = {};

    merge(
        resolvers,
        ...imports,
    );

    return resolvers;
}

const resolvers = generateResolvers(
    owner,
    projects,
    setup,
);
// #endregion module



// #region exports
export default resolvers;
// #endregion exports
