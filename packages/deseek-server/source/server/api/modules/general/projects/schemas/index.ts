// #region imports
    // #region libraries
    import gql from 'graphql-tag';
    // #endregion libraries
// #endregion imports



// #region module
export const queries = gql`
    extend type Query {
        getProjects: ResponseProjects!
    }
`;


export const mutations = gql`
    extend type Mutation {
        generateProject(input: InputValueString!): ResponseProject!
        obliterateProject(input: InputValueString!): Response!
    }
`;


export const types = gql`
    type ResponseProject {
        status: Boolean!
        error: Error
        data: Project
    }

    type ResponseProjects {
        status: Boolean!
        error: Error
        data: [Project!]
    }

    type Project {
        id: String!
        name: String!
    }

    extend type Owner {
        projects: [Project!]!
    }
`;
// #endregion module



// #region exports
export default gql`
    ${queries}
    ${mutations}
    ${types}
`;
// #endregion exports
