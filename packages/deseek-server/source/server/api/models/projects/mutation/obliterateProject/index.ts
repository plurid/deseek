// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        deregisterProject,
    } from '~server/logic/operators/projects';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const obliterateProjectLogs = generateMethodLogs('obliterateProject');


const obliterateProject = async (
    input: InputValueString,
    context: Context,
) => {
    // #region context unpack
    const {
        request,

        privateUsage,
        privateOwnerIdentonym,

        customLogicUsage,

        logger,
        logLevels,
    } = context;
    // #endregion context unpack


    // #region log start
    logger.log(
        obliterateProjectLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            value,
        } = input;
        // #endregion input unpack


        // #region private usage
        if (privateUsage) {
            logger.log(
                obliterateProjectLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    obliterateProjectLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await deregisterProject(value);

            logger.log(
                obliterateProjectLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.delogLogic;

        if (customLogicUsage && logic) {
            logger.log(
                obliterateProjectLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            await deregisterProject(value);

            logger.log(
                obliterateProjectLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await deregisterProject(value);

        logger.log(
            obliterateProjectLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            obliterateProjectLogs.errorEnd,
            logLevels.error,
            error,
        );

        return {
            status: false,
        };
        // #endregion error handle
    }
}
// #endregion module



// #region exports
export default obliterateProject;
// #endregion exports
