// #region imports
    // #region external
    import {
        Context,
        InputOf,
    } from '~server/data/interfaces';

    import {
        Setup,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    getSetup: (
        _: any,
        __: any,
        context: Context,
    ) => Setup.Query.getSetup(
        context,
    ),
    verifyUniqueID: (
        _: any,
        { input }: InputOf<any>,
        context: Context,
    ) => Setup.Query.verifyUniqueID(
        input,
        context,
    ),
};
// #endregion exports
