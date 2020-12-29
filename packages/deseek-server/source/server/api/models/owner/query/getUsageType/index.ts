// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getUsageType = async (
    context: Context,
) => {
    try {
        const {
            request,
            privateUsage,
        } = context;

        if (request.delogLogic) {
            return {
                status: true,
                data: 'CUSTOM_LOGIC',
            };
        }

        if (privateUsage) {
            return {
                status: true,
                data: 'PRIVATE_USAGE'
            };
        }

        return {
            status: true,
            data: 'PUBLIC',
        };
    } catch (error) {
        return {
            status: true,
            data: 'PUBLIC',
        };
    }
}
// #endregion module



// #region exports
export default getUsageType;
// #endregion exports
