// #region imports
    // #region libraries
    import { AnyAction } from 'redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        graphql,
    } from '@plurid/plurid-functions';
    // #endregion libraries


    // #region external
    import {
        InputQuery,
    } from '~server/data/interfaces';

    import {
        AnalyticsRecordsCount,
    } from '~kernel-data/interfaces';

    import client from '~kernel-services/graphql/client';

    import {
        GET_CURRENT_OWNER,
        GET_USAGE_TYPE,
        GET_RECORDS,
        GET_TESTS,
        GET_ANALYTICS_LAST_PERIOD,
        GET_ANALYTICS_SIZE,
        GET_CODE,
        VERIFY_UNIQUE_ID,
    } from '~kernel-services/graphql/query';

    import actions from '~kernel-services/state/actions';
    // #endregion external
// #endregion imports



// #region module
/**
 * Get current owner.
 *
 * @param dispatch
 */
const getCurrentOwner = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
    const dispatchSetOwnerID: typeof actions.view.setViewOwnerID = (
        payload,
    ) => dispatch(
        actions.view.setViewOwnerID(payload),
    );
    const dispatchDataSetActiveProviderID: typeof actions.data.setActiveProviderID = (
        payload,
    ) => dispatch(
        actions.data.setActiveProviderID(payload),
    );
    const dispatchDataAddEntities: typeof actions.data.addEntities = (
        payload,
    ) => dispatch(
        actions.data.addEntities(payload),
    );

    try {
        const query = await client.query({
            query: GET_CURRENT_OWNER,
            fetchPolicy: 'no-cache',
        });

        const response = query.data.getCurrentOwner;

        if (!response.status) {
            return false;
        }

        const {
            id,
            analytics,
            tokens,
            projects,
            spaces,
            providers,
            repositories,
            formats,
            notifiers,
            testers,
        } = graphql.deleteTypenames(response.data);

        const {
            entries,
            faults,
            size,
        } = analytics;

        dispatchSetOwnerID(id);

        if (providers.length > 0) {
            dispatchDataSetActiveProviderID(providers[0].id);
        }

        dispatchDataAddEntities({
            type: 'analytics.entries',
            data: entries,
        });
        dispatchDataAddEntities({
            type: 'analytics.faults',
            data: faults,
        });
        dispatchDataAddEntities({
            type: 'analytics.size',
            data: size,
        });
        dispatchDataAddEntities({
            type: 'tokens',
            data: tokens,
        });
        dispatchDataAddEntities({
            type: 'projects',
            data: projects,
        });
        dispatchDataAddEntities({
            type: 'spaces',
            data: spaces,
        });
        dispatchDataAddEntities({
            type: 'providers',
            data: providers,
        });
        dispatchDataAddEntities({
            type: 'repositories',
            data: repositories,
        });
        dispatchDataAddEntities({
            type: 'formats',
            data: formats,
        });
        dispatchDataAddEntities({
            type: 'notifiers',
            data: notifiers,
        });
        dispatchDataAddEntities({
            type: 'testers',
            data: testers,
        });

        return true;
    } catch (error) {
        return false;
    }
}


/**
 * Get current owner and return true if set.
 *
 * @param setViewUsageType
 */
const getUsageType = async (
    setViewUsageType: typeof actions.view.setViewUsageType,
) => {
    const query = await client.query({
        query: GET_USAGE_TYPE,
    });

    const response = query.data.getUsageType;

    if (response.status) {
        const usageType = response.data;
        setViewUsageType(usageType);

        switch (usageType) {
            case 'PRIVATE_USAGE':
                return 'private';
            case 'PUBLIC':
                return 'general';
            case 'CUSTOM_LOGIC':
                return 'general';
        }
    }

    return;
}


const getRecords = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    pagination?: InputQuery,
) => {
    const dispatchDataAddEntities: typeof actions.data.addEntities = (
        payload,
    ) => dispatch(
        actions.data.addEntities(payload),
    );

    try {
        const input = {
            count: pagination?.count,
            start: pagination?.start,
        };

        const query = await client.query({
            query: GET_RECORDS,
            fetchPolicy: 'no-cache',
            variables: {
                input,
            },
        });

        const response = query.data.getRecords;

        if (!response.status) {
            return false;
        }

        const records = graphql.deleteTypenames(response.data);

        dispatchDataAddEntities({
            type: 'records',
            data: records,
            push: pagination ? 'CONCATENATE' : '',
        });

        return true;
    } catch (error) {
        return false;
    }
}


const getTests = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    pagination?: InputQuery,
) => {
    const dispatchDataAddEntities: typeof actions.data.addEntities = (
        payload,
    ) => dispatch(
        actions.data.addEntities(payload),
    );

    try {
        const input = {
            count: pagination?.count,
            start: pagination?.start,
        };

        const query = await client.query({
            query: GET_TESTS,
            fetchPolicy: 'no-cache',
            variables: {
                input,
            },
        });

        const response = query.data.getTests;

        if (!response.status) {
            return false;
        }

        const tests = graphql.deleteTypenames(response.data);

        dispatchDataAddEntities({
            type: 'tests',
            data: tests,
            push: pagination ? 'CONCATENATE' : '',
        });

        return true;
    } catch (error) {
        return false;
    }
}


const getProjects = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
    const dispatchDataAddEntities: typeof actions.data.addEntities = (
        payload,
    ) => dispatch(
        actions.data.addEntities(payload),
    );

    try {
        const query = await client.query({
            query: GET_CURRENT_OWNER,
            fetchPolicy: 'no-cache',
        });

        const response = query.data.getCurrentOwner;

        if (!response.status) {
            return false;
        }

        const {
            projects,

        } = graphql.deleteTypenames(response.data);

        dispatchDataAddEntities({
            type: 'projects',
            data: projects,
        });

        return true;
    } catch (error) {
        return false;
    }
}


/**
 * Get analytics last period.
 *
 * @param dispatch
 */
const getAnalyticsLastPeriod = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    input: any,
) => {
    const dispatchDataAddEntities: typeof actions.data.addEntities = (
        payload,
    ) => dispatch(
        actions.data.addEntities(payload),
    );

    try {
        const {
            project,
            period,
            type,
        } = input;

        const query = await client.query({
            query: GET_ANALYTICS_LAST_PERIOD,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const response = query.data.getAnalyticsLastPeriod;

        if (!response.status) {
            return false;
        }

        const {
            fatal,
            error,
            warn,
            info,
            debug,
            trace,
        } = graphql.deleteTypenames(response.data);

        switch (type) {
            case 'entries': {
                const entries: AnalyticsRecordsCount = {
                    project,
                    period,
                    data: [
                        { name: 'fatal', value: fatal, },
                        { name: 'error', value: error, },
                        { name: 'warn', value: warn, },
                        { name: 'info', value: info, },
                        { name: 'debug', value: debug, },
                        { name: 'trace', value: trace, },
                    ],
                };

                dispatchDataAddEntities({
                    type: 'analytics.entries',
                    data: entries,
                });

                break;
            }
            case 'faults': {
                const faults: AnalyticsRecordsCount = {
                    project,
                    period,
                    data: [
                        { name: 'fatal', value: fatal, },
                        { name: 'error', value: error, },
                        { name: 'warn', value: warn, },
                    ],
                };

                dispatchDataAddEntities({
                    type: 'analytics.faults',
                    data: faults,
                });
                break;
            }
        }

        return true;
    } catch (error) {
        return false;
    }
}


/**
 * Get analytics size.
 *
 * @param dispatch
 */
const getAnalyticsSize = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    input: any,
) => {
    const dispatchDataAddEntities: typeof actions.data.addEntities = (
        payload,
    ) => dispatch(
        actions.data.addEntities(payload),
    );

    try {
        const query = await client.query({
            query: GET_ANALYTICS_SIZE,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const response = query.data.getAnalyticsSize;

        if (!response.status) {
            return false;
        }

        const {
            project,
            value,
        } = graphql.deleteTypenames(response.data);

        dispatchDataAddEntities({
            type: 'analytics.size',
            data: {
                project,
                value,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}


const getCode = async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    input: any,
) => {
    const dispatchDataAddEntity: typeof actions.data.addEntity = (
        payload,
    ) => dispatch(
        actions.data.addEntity(payload),
    );

    try {
        const {
            id,
            repository,
            context,
        } = input;

        const query = await client.query({
            query: GET_CODE,
            variables: {
                input: {
                    repository,
                    context,
                },
            },
            fetchPolicy: 'no-cache',
        });

        const response = query.data.getCode;

        if (!response.status) {
            return false;
        }

        const {
            lines
        } = graphql.deleteTypenames(response.data);

        dispatchDataAddEntity({
            type: 'code',
            data: {
                id,
                value: [
                    ...lines,
                ],
            },
        });

        return [
            ...lines,
        ];
    } catch (error) {
        return false;
    }
}


const verifyUniqueID = async (
    input: any,
) => {
    try {
        const query = await client.query({
            query: VERIFY_UNIQUE_ID,
            variables: {
                input,
            },
            fetchPolicy: 'no-cache',
        });

        const response = query.data.verifyUniqueID;

        if (!response.status) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}
// #endregion module



// #region exports
export {
    getCurrentOwner,
    getUsageType,
    getRecords,
    getTests,
    getProjects,
    getAnalyticsLastPeriod,
    getAnalyticsSize,
    getCode,
    verifyUniqueID,
};
// #endregion exports
