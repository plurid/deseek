// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const GET_CURRENT_OWNER = gql`
    query GetCurrentOwner {
        getCurrentOwner {
            status
            error {
                path
                type
                message
            }
            data {
                id
                analytics {
                    entries {
                        project
                        period
                        data {
                            name
                            value
                        }
                    }
                    faults {
                        project
                        period
                        data {
                            name
                            value
                        }
                    }
                    size {
                        project
                        value
                    }
                }
                tokens {
                    id
                    name
                    startsWith
                }
                projects {
                    id
                    name
                }
                spaces {
                    id
                    name
                    project
                }
                providers {
                    id
                    name
                    type
                }
                repositories {
                    id
                    name
                    isPrivate
                }
                formats {
                    id
                    identifier
                    transform
                }
                notifiers {
                    id
                    name
                    notifyOn
                    type
                    data
                }
                testers {
                    id
                    name
                    project
                    suite
                    scenario
                    configuration
                }
            }
        }
    }
`;


export const GET_USAGE_TYPE = gql`
    query GetUsageType {
        getUsageType {
            status
            error {
                path
                type
                message
            }
            data
        }
    }
`;


export const GET_RECORDS = gql`
    query GetRecords($input: InputQuery) {
        getRecords(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                id

                text
                time
                level
                log

                project
                space

                format

                method
                error
                extradata
                context {
                    mode
                    suite
                    scenario
                    sharedID
                    sharedOrder
                    call {
                        repository {
                            provider
                            name
                            branch
                            commit
                            basePath
                        }
                        caller {
                            file
                            line
                            column
                        }
                    }
                }
            }
        }
    }
`;


export const GET_TESTS = gql`
    query GetTests($input: InputQuery) {
        getTests(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                id
                status
                tester
                time
                phasesStatus
            }
        }
    }
`;



export const GET_PROVIDER_REPOSITORIES = gql`
    query GetProviderRepositories($input: InputValueString!) {
        getProviderRepositories(input: $input) {
            status
            data {
                id
                name
                isPrivate
            }
        }
    }
`;


export const GET_CODE = gql`
    query GetCode($input: InputGetCode!) {
        getCode(input: $input) {
            status
            error {
                path
                type
                message
            }
            data {
                lines
            }
        }
    }
`;


export const VERIFY_UNIQUE_ID = gql`
    query VerifyUniqueID($input: InputVerifyUniqueID!) {
        verifyUniqueID(input: $input) {
            status
            error {
                type
                path
                message
            }
        }
    }
`;
// #endregion module
