// #region imports
    // #region libraries
    import path from 'path';
    // #endregion libraries


    // #region external
    import {
        CodeProviderData,
    } from '~server/data/interfaces';
    // #endregion external
// #endregion imports



// #region module
export const COOKIE_PRIVATE_TOKEN = 'PVTTKN';

export const HEALTH_CHECK_ENDPOINT = '/service-check/health';


export const BASE_PATH = process.env.DELOG_BASE_PATH || process.cwd();
export const BASE_PATH_PROJECTS = '/data/projects/';
export const BASE_PATH_REPOSITORIES = '/data/repositories/';


export const projectsPath = path.join(BASE_PATH, BASE_PATH_PROJECTS);
export const repositoriesPath = path.join(BASE_PATH, BASE_PATH_REPOSITORIES);



export const GITHUB_API = 'https://api.github.com/graphql';
export const GITHUB_PROVIDER = 'github';

export const BITBUCKET_PROVIDER = 'bitbucket';


export const codeProvider: CodeProviderData = {
    github: GITHUB_PROVIDER,
    bitbucket: BITBUCKET_PROVIDER,
};
// #endregion module
