// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
const GET_ANALYTICS_LAST_PERIOD = gql`
    query GetAnalyticsLastPeriod($input: InputGetAnalyticsLastPeriod!) {
        getAnalyticsLastPeriod(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                fatal
                error
                warn
                info
                debug
                trace
            }
        }
    }
`;


const GET_ANALYTICS_SIZE = gql`
    query GetAnalyticsSize($input: InputGetAnalyticsSize!) {
        getAnalyticsSize(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                project
                value
            }
        }
    }
`;
// #endregion module



// #region exports
export {
    GET_ANALYTICS_LAST_PERIOD,
    GET_ANALYTICS_SIZE,
};
// #endregion exports
