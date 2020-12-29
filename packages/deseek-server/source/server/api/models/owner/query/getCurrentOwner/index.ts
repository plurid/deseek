// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const getCurrentOwner = async (
    context: Context,
) => {
    try {
        const {
            request,
            privateUsage,
            privateOwnerIdentonym,
        } = context;

        const logic = request.delogLogic;

        if (logic) {
            const owner = await logic.getCurrentOwner();

            return {
                status: true,
                data: owner,
            };
        }

        if (privateUsage) {
            if (!privateOwnerIdentonym) {
                return {
                    status: false,
                };
            }

            return {
                status: true,
                data: {
                    id: privateOwnerIdentonym,
                },
            };
        }

        return {
            status: false,
        };
    } catch (error) {
        return {
            status: false,
        };
    }
}
// #endregion module



// #region exports
export default getCurrentOwner;
// #endregion exports
