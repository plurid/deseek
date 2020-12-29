// #region imports
    // #region libraries
    import fetch from 'cross-fetch';

    import {
        ApolloClient,
        createHttpLink,
        InMemoryCache,
    } from '@apollo/client';
    // #endregion libraries

    // #region external
    import {
        GITHUB_API,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
export const requester = (
    token: string,
) => new ApolloClient({
    link: createHttpLink({
        uri: GITHUB_API,
        credentials: 'include',
        fetch,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    }),
    cache: new InMemoryCache(),
});
// #endregion module
