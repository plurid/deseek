// #region imports
    // #region libraries
    import {
        ClientToken,
        Project,
        Space,
        ClientProvider,
        Repository,
        Format,
        ClientNotifier,
        Tester,
        LoggedRecord,
        Test,
    } from '~server/data/interfaces';
    // #endregion libraries


    // #region exports
    import {
        AnalyticsRecordsCount,
        AnalyticsSize,
    } from '~kernel-data/interfaces';
    // #endregion exports
// #endregion imports



// #region module
export type AddableEntityType =
    | 'token'
    | 'project'
    | 'space'
    | 'provider'
    | 'repository'
    | 'format'
    | 'notifier'
    | 'tester'
    | 'record'
    | 'test'
    | 'code';

export const ADD_ENTITY = 'ADD_ENTITY';
export interface AddEntityPayload {
    type: AddableEntityType;
    data: any;
}
export interface AddEntityAction {
    type: typeof ADD_ENTITY;
    payload: AddEntityPayload;
}


export type RemovableEntityType =
    | 'token'
    | 'project'
    | 'space'
    | 'provider'
    | 'repository'
    | 'format'
    | 'notifier'
    | 'tester'
    | 'record'
    | 'test'
    | 'code';

export const REMOVE_ENTITY = 'REMOVE_ENTITY';
export interface RemoveEntityPayload {
    type: RemovableEntityType;
    id: string;
}
export interface RemoveEntityAction {
    type: typeof REMOVE_ENTITY;
    payload: RemoveEntityPayload;
}


export type AddableEntitiesType =
    | 'tokens'
    | 'projects'
    | 'spaces'
    | 'providers'
    | 'repositories'
    | 'formats'
    | 'notifiers'
    | 'testers'
    | 'records'
    | 'tests'
    | 'analytics.entries'
    | 'analytics.faults'
    | 'analytics.size';

export const ADD_ENTITIES = 'ADD_ENTITIES';
export interface AddEntitiesPayload {
    type: AddableEntitiesType;
    data: any;
    push?: string;
}
export interface AddEntitiesAction {
    type: typeof ADD_ENTITIES;
    payload: AddEntitiesPayload;
}


export type RemoveableEntitiesType =
    | 'records'
    | 'tests';

export const REMOVE_ENTITIES = 'REMOVE_ENTITIES';
export interface RemoveEntitiesPayload {
    type: RemoveableEntitiesType;
    ids: string[];
}
export interface RemoveEntitiesAction {
    type: typeof REMOVE_ENTITIES;
    payload: RemoveEntitiesPayload;
}


export const SET_ACTIVE_PROVIDER_ID = 'SET_ACTIVE_PROVIDER_ID';
export interface SetActiveProviderIDAction {
    type: typeof SET_ACTIVE_PROVIDER_ID;
    payload: string;
}


export const SET_PROVIDERS = 'SET_PROVIDERS';
export interface SetProvidersAction {
    type: typeof SET_PROVIDERS;
    payload: ClientProvider[];
}


export const SET_REPOSITORIES = 'SET_REPOSITORIES';
export interface SetRepositoriesAction {
    type: typeof SET_REPOSITORIES;
    payload: Repository[];
}


export const CLEAR_DATA = 'CLEAR_DATA';
export interface ClearDataAction {
    type: typeof CLEAR_DATA;
    payload: undefined;
}


export interface State {
    analytics: {
        entries: AnalyticsRecordsCount;
        faults: AnalyticsRecordsCount;
        size: AnalyticsSize;
    },
    tokens: ClientToken[];
    projects: Project[];
    spaces: Space[];
    activeProviderID: string;
    providers: ClientProvider[];
    repositories: Repository[];
    formats: Format[];
    notifiers: ClientNotifier[];
    testers: Tester[];
    records: LoggedRecord[];
    tests: Test[];
    code: Record<string, string[]>;
}


export type Actions =
    | AddEntityAction
    | RemoveEntityAction
    | AddEntitiesAction
    | RemoveEntitiesAction
    | SetActiveProviderIDAction
    | SetProvidersAction
    | SetRepositoriesAction
    | ClearDataAction;
// #endregion module
