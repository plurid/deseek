// #region imports
    // #region libraries
    import {
        gql,
    } from 'apollo-server-express';
    // #endregion libraries
// #endregion imports



// #region module
export const VIEWER_LOGIN = gql`
    query {
        viewer {
            login
        }
    }
`;


export const QUERY_REPOSITORIES = gql`
    query {
        viewer {
            repositories(
                first: 100,
                affiliations:[OWNER, ORGANIZATION_MEMBER, COLLABORATOR]
                ownerAffiliations: [OWNER, ORGANIZATION_MEMBER, COLLABORATOR]
                orderBy: {
                    field: NAME,
                    direction: ASC
                }
            ) {
                totalCount
                nodes {
                    nameWithOwner
                    databaseId
                    isPrivate
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;


export const QUERY_REPOSITORY_BY_NAME_OWNER = gql`
    query QueryRepositoryByNameOwner($name: String!, $owner: String!) {
        repository(
            name: $name
            owner: $owner
        ) {
            nameWithOwner
            name
            databaseId
            isPrivate
            defaultBranchRef {
                target {
                    ... on Commit {
                        zipballUrl
                    }
                }
            }
        }
    }
`;
// #endregion module
