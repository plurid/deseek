// #region imports
    // #region external
    import {
        Context,
        InputOf,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        Projects,
    } from '~server/api/models';
    // #endregion external
// #endregion imports



// #region exports
export default {
    generateProject: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Projects.Mutation.generateProject(
        input,
        context,
    ),
    obliterateProject: (
        _: any,
        { input }: InputOf<InputValueString>,
        context: Context,
    ) => Projects.Mutation.obliterateProject(
        input,
        context,
    ),
};
// #endregion exports
