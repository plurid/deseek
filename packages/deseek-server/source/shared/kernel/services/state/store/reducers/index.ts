// #region imports
    // #region libraries
    import {
        combineReducers,
    } from 'redux';
    // #endregion libraries


    // #region external
    import modules from '../../modules';
    // #endregion external
// #endregion imports



// #region module
const reducers = combineReducers({
    data: modules.data.reducer,
    themes: modules.themes.reducer,
    view: modules.view.reducer,
});
// #endregion module



// #region exports
export default reducers;
// #endregion exports
