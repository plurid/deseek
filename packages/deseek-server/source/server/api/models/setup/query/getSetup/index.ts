// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getSetup = async (
    context: Context,
) => {
    const {
        projects,
        privateUsage,
        privateOwnerIdentonym,
    } = context;


    if (privateUsage) {
        if (!privateOwnerIdentonym) {
            return {
                status: false,
            };
        }

        return {
            status: true,
            data: {
                projects,
            },
        };
    }


    return {
        status: true,
        data: {
            projects,
        },
    };
}
// #endregion module



// #region exports
export default getSetup;
// #endregion exports
