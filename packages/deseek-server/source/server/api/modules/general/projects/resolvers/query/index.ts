// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        Projects,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getProjects: (
        _: any,
        __: any,
        context: Context,
    ) => Projects.Query.getProjects(
        context,
    ),
};
// #endregion exports
