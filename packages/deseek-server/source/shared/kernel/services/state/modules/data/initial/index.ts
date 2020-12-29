// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
const initialState: Types.State = {
    analytics: {
        entries: {
            project: 'all projects',
            period: 'hour',
            data: [],
        },
        faults: {
            project: 'all projects',
            period: 'hour',
            data: [],
        },
        size: {
            project: 'all projects',
            value: 0,
        },
    },
    tokens: [],
    projects: [],
    spaces: [],
    activeProviderID: '',
    providers: [],
    repositories: [],
    formats: [],
    notifiers: [],
    testers: [],
    records: [],
    tests: [],
    code: {},
};
// #endregion module



// #region exports
export default initialState;
// #endregion exports
