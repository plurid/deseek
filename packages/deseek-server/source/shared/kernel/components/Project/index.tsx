// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        Project as IProject,
    } from '~server/data/interfaces';

    import {
        addEntityMutation,
    } from '~kernel-services/logic/mutations';

    import {
        GENERATE_PROJECT,
    } from '~kernel-services/graphql/mutate';

    import {
        StyledH1,
        StyledPluridPureButton,
        StyledPluridLinkButton,

        PluridInputLine,
    } from '~kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledProject,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface ProjectProperties {
    // #region required
        // #region values
        theme: Theme;
        // #endregion values

        // #region methods
        action: (
            project: IProject,
        ) => void;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        cancel?: () => void;
        // #endregion methods
    // #endregion optional
}

const Project: React.FC<ProjectProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            // #endregion values

            // #region methods
            action,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            cancel,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region state
    const [
        projectName,
        setProjectName,
    ] = useState('');
    // #endregion state


    // #region handlers
    const addProject = async () => {
        if (!projectName) {
            return;
        }

        const project: IProject | undefined = await addEntityMutation(
            {
                value: projectName,
            },
            GENERATE_PROJECT,
            'generateProject',
        );

        if (project) {
            action(project);
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            addProject();
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledProject
            theme={theme}
        >
            <StyledH1>
                generate project
            </StyledH1>

            <PluridInputLine
                name="name"
                text={projectName}
                theme={theme}
                atChange={(event) => setProjectName(event.target.value)}
                atKeyDown={handleEnter}
            />

            <StyledPluridPureButton
                text="Generate Project"
                atClick={() => addProject()}
                level={2}
                disabled={!projectName}
            />

            {cancel && (
                <StyledPluridLinkButton
                    text="cancel"
                    atClick={() => cancel()}
                    theme={theme}
                    level={2}
                />
            )}
        </StyledProject>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Project;
// #endregion exports
