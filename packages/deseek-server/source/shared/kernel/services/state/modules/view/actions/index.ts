// #region imports
    // #region external
    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
export const setViewLoading = (
    payload: boolean,
): Types.SetViewLoadingAction => {
    return {
        type: Types.SET_VIEW_LOADING,
        payload,
    };
}


export const setViewType = (
    payload: Types.SetViewTypePayload,
): Types.SetViewTypeAction => {
    return {
        type: Types.SET_VIEW_TYPE,
        payload,
    };
}


export const setEditID = (
    payload: Types.SetEditIDPayload,
): Types.SetEditIDAction => {
    return {
        type: Types.SET_EDIT_ID,
        payload,
    };
}


export const setViewCompactSelectors = (
    payload: boolean,
): Types.SetViewCompactSelectorsAction => {
    return {
        type: Types.SET_VIEW_COMPACT_SELECTORS,
        payload,
    };
}


export const setViewOwnerID = (
    id: string,
): Types.SetViewOwnerIDAction => {
    return {
        type: Types.SET_VIEW_OWNER_ID,
        payload: id,
    };
}


export const setViewUsageType = (
    usageType: string,
): Types.SetViewUsageTypeAction => {
    return {
        type: Types.SET_VIEW_USAGE_TYPE,
        payload: usageType,
    };
}



const actions = {
    setViewLoading,
    setViewType,
    setEditID,
    setViewCompactSelectors,
    setViewOwnerID,
    setViewUsageType,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
