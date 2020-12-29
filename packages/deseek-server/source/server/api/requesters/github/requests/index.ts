// #region imports
    // #region libraries
    import {
        promises as fs,
    } from 'fs';

    import path from 'path';

    import {
        exec,
    } from 'child_process';
    // #endregion libraries


    // #region external
    import {
        BASE_PATH_REPOSITORIES,
        BASE_PATH,
    } from '~server/data/constants';

    import {
        Provider,
        Repository,
    } from '~server/data/interfaces';

    import {
        requester,
    } from '../requester';

    import {
        VIEWER_LOGIN,
        QUERY_REPOSITORIES,
        QUERY_REPOSITORY_BY_NAME_OWNER,
    } from '../query';
    // #endregion external
// #endregion imports



// #region module
export const getOwner = async (
    provider: Provider,
) => {
    const client = requester(provider.token);

    const query = await client.query({
        query: VIEWER_LOGIN,
    });

    const {
        data,
    } = query;

    if (!data) {
        return;
    }

    const {
        login,
    } = data.viewer;

    return {
        identonym: login,
    };
}


export const downloadRepository = async (
    token: string,
    name: string,
    repositoryPath: string,
) => {
    const gitCloneCommand = `git clone https://${token}@github.com/${name}.git ./root`;

    return new Promise((resolve, reject) => {
        exec(gitCloneCommand, {
            cwd: repositoryPath,
        }, (error) => {
            if (error) {
                console.log(error);
                reject(0);
            }

            resolve(true);
        });
    });
}


export const getRepository = async (
    token: string,
    name: string,
) => {
    const repositoryPath = BASE_PATH_REPOSITORIES + 'github/' + name;
    const resolvedRepositoryPath = path.join(
        BASE_PATH,
        repositoryPath,
    );

    try {
        await fs.mkdir(
            resolvedRepositoryPath,
            {
                recursive: true,
            },
        );
    } catch (error) {
        return;
    }

    await downloadRepository(
        token,
        name,
        resolvedRepositoryPath,
    );
}


export const getRepositoriesData = async (
    provider: Provider,
    ownedBy: string,
) => {
    try {
        const client = requester(provider.token);

        const query = await client.query({
            query: QUERY_REPOSITORIES,
        });

        const {
            data,
        } = query;

        if (!data) {
            return;
        }

        const repositoriesData = data.viewer.repositories.nodes;

        const repositories: Repository[] = repositoriesData.map(
            (providerRepository: any) => {
                const {
                    nameWithOwner,
                    databaseId,
                    isPrivate,
                } = providerRepository;

                const repository: Repository = {
                    id: databaseId,
                    name: nameWithOwner,
                    isPrivate,
                    providerID: provider.id,
                    ownedBy,
                };

                return repository;
            }
        );

        return repositories;
    } catch (error) {
        return;
    }
}


export const getRepositoryDataByNameWithOwner = async (
    provider: Provider,
    nameWithOwner: string,
    ownedBy: string,
) => {
    try {
        const client = requester(provider.token);

        const split = nameWithOwner.split('/');
        const owner = split[0];
        const name = split[1];

        const query = await client.query({
            query: QUERY_REPOSITORY_BY_NAME_OWNER,
            variables: {
                name,
                owner,
            },
        });

        const {
            data,
        } = query;

        if (!data) {
            return;
        }

        const repositoryData: Repository = {
            id: data.repository.databaseId,
            isPrivate: data.repository.isPrivate,
            name: data.repository.nameWithOwner,
            providerID: provider.id,
            ownedBy,
        };

        return repositoryData;
    } catch (error) {
        return;
    }
}
// #endregion module
