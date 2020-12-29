// #region imports
    // #region external
    import {
        Context,
        InputValueString,
    } from '~server/data/interfaces';

    import {
        registerProject,
    } from '~server/logic/operators/projects';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const generateProjectLogs = generateMethodLogs('generateProject');


const generateProject = async (
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
        generateProjectLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region input unpack
        const {
            value: name,
        } = input;
        // #endregion input unpack


        // #region private usage
        if (privateUsage) {
            logger.log(
                generateProjectLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    generateProjectLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            const project = await registerProject(
                name,
                privateOwnerIdentonym,
            );

            logger.log(
                generateProjectLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: project,
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.delogLogic;

        if (customLogicUsage && logic) {
            logger.log(
                generateProjectLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const project = await registerProject(
                name,
                '',
            );

            logger.log(
                generateProjectLogs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: project,
            };
        }
        // #endregion logic usage


        // #region public usage
        const project = await registerProject(
            name,
            '',
        );

        logger.log(
            generateProjectLogs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
            data: project,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            generateProjectLogs.errorEnd,
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
export default generateProject;
// #endregion exports
