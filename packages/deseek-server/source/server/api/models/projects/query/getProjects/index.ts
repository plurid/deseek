// #region imports
    // #region external
    import {
        Context,
    } from '~server/data/interfaces';

    import {
        generateMethodLogs,
    } from '~server/utilities';
    // #endregion external
// #endregion imports



// #region module
export const getProjectsLogs = generateMethodLogs('getProjects');

const getProjects = async (
    context: Context,
) => {
    // #region context unpack
    const {
        projects,
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
        getProjectsLogs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                getProjectsLogs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    getProjectsLogs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            logger.log(
                getProjectsLogs.infoSuccessPrivateUsage,
                logLevels.info,
            );

            return {
                status: true,
                data: [
                    ...projects,
                ],
            };
        }
        // #endregion private usage


        // #region logic usage
        const logic = request.delogLogic;

        if (customLogicUsage && logic) {
            logger.log(
                getProjectsLogs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            const owner = await logic.getCurrentOwner();

            return {
                status: true,
                data: [
                    ...owner.projects,
                ],
            };
        }
        // #endregion logic usage


        // #region public usage
        logger.log(
            getProjectsLogs.infoSuccessCustomLogicUsage,
            logLevels.info,
        );

        return {
            status: true,
            data: [
                ...projects,
            ],
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            getProjectsLogs.errorEnd,
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
export default getProjects;
// #endregion exports
