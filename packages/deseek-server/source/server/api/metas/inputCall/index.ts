// #region imports
    // #region external
    import {
        Context,
        MethodLogs,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
const inputCall = async <T>(
    input: T,
    context: Context,
    call: (input: T) => Promise<void>,
    logs: MethodLogs,
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
        logs.infoStart,
        logLevels.info,
    );
    // #endregion log start


    try {
        // #region private usage
        if (privateUsage) {
            logger.log(
                logs.infoHandlePrivateUsage,
                logLevels.trace,
            );

            if (!privateOwnerIdentonym) {
                logger.log(
                    logs.infoEndPrivateUsage,
                    logLevels.info,
                );

                return {
                    status: false,
                };
            }

            await call(input);

            logger.log(
                logs.infoSuccessPrivateUsage,
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
                logs.infoHandleCustomLogicUsage,
                logLevels.trace,
            );

            await call(input);

            logger.log(
                logs.infoEndCustomLogicUsage,
                logLevels.info,
            );

            return {
                status: true,
            };
        }
        // #endregion logic usage


        // #region public usage
        await call(input);

        logger.log(
            logs.infoSuccess,
            logLevels.info,
        );

        return {
            status: true,
        };
        // #endregion public usage
    } catch (error) {
        // #region error handle
        logger.log(
            logs.errorEnd,
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
export default inputCall;
// #endregion exports
