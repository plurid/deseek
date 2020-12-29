// #region imports
    // #region external
    import * as Types from '../types';

    import initialState from '../initial';

    import resolvers from '../resolvers';
    // #endregion external
// #endregion imports



// #region module
const reducer = (
    state: Types.State = initialState,
    action: Types.Actions,
): Types.State => {
    switch(action.type) {
        case Types.ADD_ENTITY:
            return resolvers.addEntity(state, action);
        case Types.REMOVE_ENTITY:
            return resolvers.removeEntity(state, action);
        case Types.ADD_ENTITIES:
            return resolvers.addEntities(state, action);
        case Types.REMOVE_ENTITIES:
            return resolvers.removeEntities(state, action);
        case Types.SET_ACTIVE_PROVIDER_ID:
            return resolvers.setActiveProviderID(state, action);
        case Types.SET_PROVIDERS:
            return resolvers.setProviders(state, action);
        case Types.SET_REPOSITORIES:
            return resolvers.setRepositories(state, action);
        case Types.CLEAR_DATA:
            return resolvers.clearData(state, action);
        default:
            return {
                ...state,
            };
    }
}
// #endregion module



// #region exports
export default reducer;
// #endregion exports
