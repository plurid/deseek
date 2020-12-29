// #region imports
    // #region external
    import {
        Context,
        InputVerifyUniqueID,
    } from '~server/data/interfaces';

    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const verifyUniqueID = async (
    input: InputVerifyUniqueID,
    context: Context,
) => {
    const {
        privateUsage,
        privateOwnerIdentonym,
    } = context;

    try {
        const {
            type,
            value,
        } = input;

        if (privateUsage) {
            if (!privateOwnerIdentonym) {
                return {
                    status: false,
                };
            }

            const exists = await database.get(
                type,
                value,
            );

            if (exists) {
                return {
                    status: false,
                };
            }

            return {
                status: true,
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
export default verifyUniqueID;
// #endregion exports
