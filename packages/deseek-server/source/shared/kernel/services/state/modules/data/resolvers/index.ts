// #region imports
    // #region internal
    import * as Types from '../types';

    import initialState from '../initial';
    // #endregion internal
// #endregion imports



// #region module
export const addEntity = (
    state: Types.State,
    action: Types.AddEntityAction,
): Types.State => {
    const {
        type,
        data,
    } = action.payload;

    const newState = {
        ...state,
    };

    let tokens = [
        ...newState.tokens,
    ];
    let projects = [
        ...newState.projects,
    ];
    let spaces = [
        ...newState.spaces,
    ];
    let providers = [
        ...newState.providers,
    ];
    let repositories = [
        ...newState.repositories,
    ];
    let formats = [
        ...newState.formats,
    ];
    let notifiers = [
        ...newState.notifiers,
    ];
    let testers = [
        ...newState.testers,
    ];
    let code = {
        ...newState.code,
    };


    switch (type) {
        case 'token':
            tokens = [
                ...tokens,
                {
                    ...data,
                },
            ];
            break;
        case 'project':
            projects = [
                ...projects,
                {
                    ...data,
                },
            ];
            break;
        case 'space':
            spaces = [
                ...spaces,
                {
                    ...data,
                },
            ];
            break;
        case 'provider':
            providers = [
                ...providers,
                {
                    ...data,
                },
            ];
            break;
        case 'repository':
            repositories = [
                ...repositories,
                {
                    ...data,
                },
            ];
            break;
        case 'format':
            formats = [
                ...formats,
                {
                    ...data,
                },
            ];
            break;
        case 'notifier':
            notifiers = [
                ...notifiers,
                {
                    ...data,
                },
            ];
            break;
        case 'tester':
            testers = [
                ...testers,
                {
                    ...data,
                },
            ];
            break;
        case 'code':
            code = {
                ...code,
            };
            code[data.id] = {
                ...data.value,
            };
            break;
    }

    return {
        ...newState,
        tokens: [
            ...tokens,
        ],
        projects: [
            ...projects,
        ],
        spaces: [
            ...spaces,
        ],
        providers: [
            ...providers,
        ],
        repositories: [
            ...repositories,
        ],
        formats: [
            ...formats,
        ],
        notifiers: [
            ...notifiers,
        ],
        testers: [
            ...testers,
        ],
        code: {
            ...code,
        },
    };
}


export const removeEntity = (
    state: Types.State,
    action: Types.RemoveEntityAction,
): Types.State => {
    const {
        id,
        type,
    } = action.payload;

    const newState = {
        ...state,
    };

    let tokens = [
        ...newState.tokens,
    ];
    let projects = [
        ...newState.projects,
    ];
    let spaces = [
        ...newState.spaces,
    ];
    let providers = [
        ...newState.providers,
    ];
    let repositories = [
        ...newState.repositories,
    ];
    let formats = [
        ...newState.formats,
    ];
    let notifiers = [
        ...newState.notifiers,
    ];
    let testers = [
        ...newState.testers,
    ];
    let records = [
        ...newState.records,
    ];
    let tests = [
        ...newState.tests,
    ];
    const code = {
        ...newState.code,
    };


    switch (type) {
        case 'token':
            tokens = tokens.filter(
                token => token.id !== id
            );
            break;
        case 'project':
            projects = projects.filter(
                project => project.id !== id
            );
            break;
        case 'space':
            spaces = spaces.filter(
                space => space.id !== id
            );
            break;
        case 'provider':
            providers = providers.filter(
                provider => provider.id !== id
            );
            break;
        case 'repository':
            repositories = repositories.filter(
                repository => repository.id !== id
            );
            break;
        case 'format':
            formats = formats.filter(
                format => format.id !== id
            );
            break;
        case 'notifier':
            notifiers = notifiers.filter(
                notifier => notifier.id !== id
            );
            break;
        case 'tester':
            testers = testers.filter(
                tester => tester.id !== id
            );
            break;
        case 'record':
            records = records.filter(
                record => record.id !== id
            );
            break;
        case 'test':
            tests = tests.filter(
                test => test.id !== id
            );
            break;
        case 'code':
            delete code[id];
            break;
    }

    return {
        ...newState,
        tokens: [
            ...tokens,
        ],
        projects: [
            ...projects,
        ],
        spaces: [
            ...spaces,
        ],
        providers: [
            ...providers,
        ],
        repositories: [
            ...repositories,
        ],
        formats: [
            ...formats,
        ],
        notifiers: [
            ...notifiers,
        ],
        testers: [
            ...testers,
        ],
        records: [
            ...records,
        ],
        tests: [
            ...tests,
        ],
        code: {
            ...code,
        },
    };
}


export const addEntities = (
    state: Types.State,
    action: Types.AddEntitiesAction,
): Types.State => {
    const {
        type,
        data,
        push,
    } = action.payload;

    const newState = {
        ...state,
    };


    let analytics = {
        ...newState.analytics,
    };
    let tokens = [
        ...newState.tokens,
    ];
    let projects = [
        ...newState.projects,
    ];
    let spaces = [
        ...newState.spaces,
    ];
    let providers = [
        ...newState.providers,
    ];
    let repositories = [
        ...newState.repositories,
    ];
    let formats = [
        ...newState.formats,
    ];
    let notifiers = [
        ...newState.notifiers,
    ];
    let testers = [
        ...newState.testers,
    ];
    let records = [
        ...newState.records,
    ];
    let tests = [
        ...newState.tests,
    ];


    switch (type) {
        case 'analytics.entries':
            analytics = {
                ...analytics,
                entries: {
                    ...data,
                },
            };
            break;
        case 'analytics.faults':
            analytics = {
                ...analytics,
                faults: {
                    ...data,
                },
            };
            break;
        case 'analytics.size':
            analytics = {
                ...analytics,
                size: {
                    ...data,
                },
            };
            break;
        case 'tokens':
            tokens = [
                ...data,
            ];
            break;
        case 'projects':
            projects = [
                ...data,
            ];
            break;
        case 'spaces':
            spaces = [
                ...data,
            ];
            break;
        case 'providers':
            providers = [
                ...data,
            ];
            break;
        case 'repositories':
            repositories = [
                ...data,
            ];
            break;
        case 'formats':
            formats = [
                ...data,
            ];
            break;
        case 'notifiers':
            notifiers = [
                ...data,
            ];
            break;
        case 'testers':
            testers = [
                ...data,
            ];
            break;
        case 'records':
            if (push === 'CONCATENATE') {
                records = [
                    ...records,
                    ...data,
                ];
            } else {
                records = [
                    ...data,
                ];
            }
            break;
        case 'tests':
            tests = [
                ...data,
            ];
            break;
    }

    return {
        ...newState,
        analytics: {
            ...analytics,
        },
        tokens: [
            ...tokens,
        ],
        projects: [
            ...projects,
        ],
        spaces: [
            ...spaces,
        ],
        providers: [
            ...providers,
        ],
        repositories: [
            ...repositories,
        ],
        formats: [
            ...formats,
        ],
        notifiers: [
            ...notifiers,
        ],
        testers: [
            ...testers,
        ],
        records: [
            ...records,
        ],
        tests: [
            ...tests,
        ],
    };
}


export const removeEntities = (
    state: Types.State,
    action: Types.RemoveEntitiesAction,
): Types.State => {
    const {
        type,
        ids,
    } = action.payload;

    const newState = {
        ...state,
    };

    let records = [
        ...newState.records,
    ];
    let tests = [
        ...newState.tests,
    ];


    switch (type) {
        case 'records':
            records = records.filter(record => !ids.includes(record.id));
            break;
        case 'tests':
            tests = tests.filter(test => !ids.includes(test.id));
            break;
    }

    return {
        ...newState,
        records: [
            ...records,
        ],
        tests: [
            ...tests,
        ],
    };
}


export const setActiveProviderID = (
    state: Types.State,
    action: Types.SetActiveProviderIDAction,
): Types.State => {
    return {
        ...state,
        activeProviderID: action.payload,
    };
}


export const setProviders = (
    state: Types.State,
    action: Types.SetProvidersAction,
): Types.State => {
    return {
        ...state,
        providers: [
            ...action.payload,
        ],
    };
}


export const setRepositories = (
    state: Types.State,
    action: Types.SetRepositoriesAction,
): Types.State => {
    return {
        ...state,
        repositories: [
            ...action.payload,
        ],
    };
}


export const clearData = (
    state: Types.State,
    action: Types.ClearDataAction,
): Types.State => {
    return {
        ...initialState,
    };
}



const resolvers = {
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
export default resolvers;
// #endregion exports
