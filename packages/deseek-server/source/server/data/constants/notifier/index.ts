// #region imports
    // #region external
    import {
        NotificationTypes
    } from '../../interfaces/notifier';
    // #endregion external
// #endregion imports



// #region module
const notificationTypes: NotificationTypes = {
    ENTITY_REGISTRATION: 'ENTITY_REGISTRATION',
    ENTITY_DEREGISTRATION: 'ENTITY_DEREGISTRATION',
    RECORDED_FATAL: 'RECORDED_FATAL',
    RECORDED_ERROR: 'RECORDED_ERROR',
    RECORDED_WARN: 'RECORDED_WARN',
    TEST_FAIL: 'TEST_FAIL',
    TEST_SUCCESS: 'TEST_SUCCESS',
}
// #endregion module



// #region exports
export {
    notificationTypes,
};
// #endregion exports
