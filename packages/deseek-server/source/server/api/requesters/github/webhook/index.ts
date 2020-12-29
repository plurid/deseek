// #region imports
    // #region libraries
    import {
        Request,
        Response,
    } from 'express';
    // #endregion libraries


    // #region external
    import {
        Commit,
    } from '~server/data/interfaces';

    import {
        logLevel,
        logLevels,
        codeProvider,
    } from '~server/data/constants';

    import {
        getActiveRepository,
        updateRootRepository,
    } from '~server/logic/operators/repositories';
    // #endregion external
// #endregion imports



// #region module
const handleGithubWebhook = async (
    request: Request,
    response: Response,
) => {
    try {
        if (logLevel <= logLevels.info) {
            console.log('[Info : Start] :: handleGithubWebhook');
        }

        const data = request.body;

        const {
            ref,
            head_commit: headCommit,
            repository,
        } = data;

        if (
            !ref
            || !headCommit
            || !repository
        ) {
            /** No Content */
            if (logLevel <= logLevels.info) {
                console.log('[Info : End] :: handleGithubWebhook :: 204');
            }

            response.status(204).end();
            return;
        }

        const branchName = ref.replace('refs/heads/', '');
        const repositoryName = repository.full_name;

        const activeRepository = await getActiveRepository(
            repositoryName,
            '',
        );
        if (!activeRepository) {
            /** No Content */
            if (logLevel <= logLevels.info) {
                console.log('[Info : End] :: handleGithubWebhook :: 204');
            }

            response.status(204).end();
            return;
        }

        /** OK */
        response.status(200).end();

        await updateRootRepository(
            repositoryName,
            codeProvider.github,
        );

        const commit: Commit = {
            id: headCommit.id,
            added: headCommit.added,
            removed: headCommit.removed,
            modified: headCommit.modified,
        };

        if (logLevel <= logLevels.info) {
            console.log('[Info : End] :: handleGithubWebhook :: 200');
        }
    } catch (error) {
        if (logLevel <= logLevels.error) {
            console.log('[Error : End] :: handleGithubWebhook', error);
        }

        /** Bad Request */
        response.status(400).end();
        return;
    }
}
// #endregion module



// #region exports
export default handleGithubWebhook;
// #endregion exports
