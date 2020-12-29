// #region imports
    // #region internal
    import * as githubRequests from './requests';

    import handleWebhook from './webhook';
    // #endregion internal
// #endregion imports



// #region exports
export default {
    ...githubRequests,
    handleWebhook,
};
// #endregion exports
