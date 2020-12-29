// #region imports
    // #region external
    import {
        ClientProvider,
        Repository,
    } from '~server/data/interfaces';

    import * as Types from '../types';
    // #endregion external
// #endregion imports



// #region module
export const addEntity = (
    payload: Types.AddEntityPayload,
): Types.AddEntityAction => {
    return {
        type: Types.ADD_ENTITY,
        payload,
    };
}


export const removeEntity = (
    payload: Types.RemoveEntityPayload,
): Types.RemoveEntityAction => {
    return {
        type: Types.REMOVE_ENTITY,
        payload,
    };
}


export const addEntities = (
    payload: Types.AddEntitiesPayload,
): Types.AddEntitiesAction => {
    return {
        type: Types.ADD_ENTITIES,
        payload,
    };
}


export const removeEntities = (
    payload: Types.RemoveEntitiesPayload,
): Types.RemoveEntitiesAction => {
    return {
        type: Types.REMOVE_ENTITIES,
        payload,
    };
}


export const setActiveProviderID = (
    providerID: string,
): Types.SetActiveProviderIDAction => {
    return {
        type: Types.SET_ACTIVE_PROVIDER_ID,
        payload: providerID,
    };
}


export const setProviders = (
    providers: ClientProvider[],
): Types.SetProvidersAction => {
    return {
        type: Types.SET_PROVIDERS,
        payload: providers,
    };
}


export const setRepositories = (
    repositories: Repository[],
): Types.SetRepositoriesAction => {
    return {
        type: Types.SET_REPOSITORIES,
        payload: repositories,
    };
}


export const clearData = (): Types.ClearDataAction => {
    return {
        type: Types.CLEAR_DATA,
        payload: undefined,
    };
}



const actions = {
    addEntity,
    removeEntity,
    addEntities,
    removeEntities,
    setActiveProviderID,
    setProviders,
    setRepositories,
    clearData,
};
// #endregion module



// #region exports
export default actions;
// #endregion exports
