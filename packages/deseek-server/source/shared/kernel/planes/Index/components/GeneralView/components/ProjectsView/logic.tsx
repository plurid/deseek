// #region imports
    // #region libraries
    import React from 'react';

    import {
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        Project,
    } from '~server/data/interfaces';

    import {
        PluridCopyableLine,
    } from '~kernel-services/styled';
    // #endregion external
// #endregion imports



// #region module
export const projectRowRenderer = (
    project: Project,
    handleProjectObliterate: (
        id: string,
    ) => void,
) => {
    const {
        id,
        name
    } = project;

    return (
        <>
            <PluridCopyableLine
                data={id}
            />

            <div>
                {name}
            </div>

            <PluridIconDelete
                atClick={() => handleProjectObliterate(id)}
            />
        </>
    );
}


export const createSearchTerms = (
    projects: Project[],
) => {
    const searchTerms = projects.map(
        project => {
            const {
                id,
                name,
            } = project;

            const searchTerm = {
                id,
                data: [
                    name.toLowerCase(),
                    id.toLowerCase(),
                ],
            };

            return searchTerm;
        },
    );

    return searchTerms;
}
// #endregion module
