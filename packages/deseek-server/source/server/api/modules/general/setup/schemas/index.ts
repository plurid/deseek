// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getSetup: ResponseSetup!
        verifyUniqueID(input: InputVerifyUniqueID!): Response!
    }
`;


export const types = gql`
    type ResponseSetup {
        status: Boolean!
        error: Error
        data: Setup
    }

    type Setup {
        projects: [Project!]
    }
`;


export const input = gql`
    input InputVerifyUniqueID {
        type: String!
        value: String!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${types}
    ${input}
`;
// #endregion exports
