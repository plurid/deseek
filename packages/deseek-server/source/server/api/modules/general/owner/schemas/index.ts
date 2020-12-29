// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getCurrentOwner: ResponseOwner!
        getUsageType: ResponseUsageType!
    }
`;


export const mutations = gql`
    extend type Mutation {
        login(input: InputLogin!): ResponseOwner!
        logout: Response!
    }
`;


export const types = gql`
    type ResponseOwner {
        status: Boolean!
        error: Error
        data: Owner
    }

    type Owner {
        id: ID!
    }

    type ResponseUsageType {
        status: Boolean!
        error: Error
        data: String!
    }
`;


export const input = gql`
    input InputLogin {
        identonym: String!
        key: String!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
    ${input}
`;
// #endregion exports
