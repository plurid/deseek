// #region imports
    // #region external
    import {
        AppState,
    } from '../../../store';
    // #endregion external
// #endregion imports



// #region module
const getAnalyticsEntries = (state: AppState) => state.data.analytics.entries;
const getAnalyticsFaults = (state: AppState) => state.data.analytics.faults;
const getAnalyticsSize = (state: AppState) => state.data.analytics.size;

const getTokens = (state: AppState) => state.data.tokens;
const getProjects = (state: AppState) => state.data.projects;
const getSpaces = (state: AppState) => state.data.spaces;
const getActiveProviderID = (state: AppState) => state.data.activeProviderID;
const getProviders = (state: AppState) => state.data.providers;
const getRepositories = (state: AppState) => state.data.repositories;
const getFormats = (state: AppState) => state.data.formats;
const getNotifiers = (state: AppState) => state.data.notifiers;
const getTesters = (state: AppState) => state.data.testers;
const getRecords = (state: AppState) => state.data.records;
const getTests = (state: AppState) => state.data.tests;
const getCode = (state: AppState) => state.data.code;


const selectors = {
    getAnalyticsEntries,
    getAnalyticsFaults,
    getAnalyticsSize,

    getTokens,
    getProjects,
    getSpaces,
    getActiveProviderID,
    getProviders,
    getRepositories,
    getFormats,
    getNotifiers,
    getTesters,
    getRecords,
    getTests,
    getCode,
};
// #endregion module



// #region exports
export default selectors;
// #endregion exports
