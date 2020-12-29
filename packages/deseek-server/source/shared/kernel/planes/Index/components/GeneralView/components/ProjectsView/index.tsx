// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        compareValues,
    } from '~server/utilities/general';

    import {
        Project,
    } from '~server/data/interfaces';

    import EntityView from '~kernel-components/EntityView';

    import client from '~kernel-services/graphql/client';

    import {
        OBLITERATE_PROJECT,
    } from '~kernel-services/graphql/mutate';

    import {
        getCurrentOwner,
    } from '~kernel-services/logic/queries';

    import { AppState } from '~kernel-services/state/store';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';

    import {
        getFilterIDs,
    } from '~kernel-services/utilities';
    // #endregion external


    // #region internal
    import {
        projectRowRenderer,
        createSearchTerms,
    } from './logic';
    // #endregion internal
// #endregion imports



// #region module
export interface ProjectsViewOwnProperties {
    // #region required
        // #region values
        // #endregion values

        // #region methods
        setGeneralView: any;
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion optional
}

export interface ProjectsViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
    stateProjects: Project[];
}

export interface ProjectsViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchRemoveEntity: typeof actions.data.removeEntity;
}

export type ProjectsViewProperties = ProjectsViewOwnProperties
    & ProjectsViewStateProperties
    & ProjectsViewDispatchProperties;

const ProjectsView: React.FC<ProjectsViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            // #endregion values

            // #region methods
            setGeneralView,
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion optional

        // #region state
        stateGeneralTheme,
        stateInteractionTheme,
        stateProjects,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchRemoveEntity,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region handlers
    const handleProjectObliterate = async (
        id: string,
    ) => {
        try {
            dispatchRemoveEntity({
                type: 'project',
                id,
            });

            const input = {
                value: id,
            };

            await client.mutate({
                mutation: OBLITERATE_PROJECT,
                variables: {
                    input,
                },
            });
        } catch (error) {
            return;
        }
    }
    // #endregion handlers


    // #region state
    const [searchTerms, setSearchTerms] = useState(
        createSearchTerms(stateProjects),
    );

    const [filteredRows, setFilteredRows] = useState(
        stateProjects.map(
            project => projectRowRenderer(
                project,
                handleProjectObliterate,
            ),
        ),
    );
    // #endregion state


    // #region handlers
    const filterUpdate = (
        rawValue: string,
    ) => {
        const value = rawValue.toLowerCase();

        const filterIDs = getFilterIDs(
            searchTerms,
            value,
        );

        const filteredProjects = stateProjects.filter(stateProject => {
            if (filterIDs.includes(stateProject.id)) {
                return true;
            }

            return false;
        });

        const sortedProjects = filteredProjects.sort(
            compareValues('name'),
        );

        setFilteredRows(
            sortedProjects.map(
                project => projectRowRenderer(
                    project,
                    handleProjectObliterate,
                ),
            ),
        );
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const searchTerms = createSearchTerms(
            stateProjects,
        );
        const filteredRows = stateProjects.map(
            project => projectRowRenderer(
                project,
                handleProjectObliterate,
            ),
        );

        setSearchTerms(searchTerms);
        setFilteredRows(filteredRows);
    }, [
        stateProjects,
    ]);
    // #endregion effects


    // #region render
    const rowsHeader = (
        <>
            <div>
                id
            </div>

            <div>
                name
            </div>

            <div />
        </>
    );

    return (
        <EntityView
            generalTheme={stateGeneralTheme}
            interactionTheme={stateInteractionTheme}

            rowTemplate="2fr 2fr 30px"
            rowsHeader={rowsHeader}
            rows={filteredRows}
            noRows="no projects"

            actionButtonText="Generate Project"
            actionButtonClick={() => {
                setGeneralView('generate-project');
            }}

            filterUpdate={filterUpdate}
            refresh={() => {
                getCurrentOwner(dispatch);
            }}
        />
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): ProjectsViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
    stateProjects: selectors.data.getProjects(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): ProjectsViewDispatchProperties => ({
    dispatch,
    dispatchRemoveEntity: (
        payload,
    ) => dispatch (
        actions.data.removeEntity(payload),
    ),
});


const ConnectedProjectsView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(ProjectsView);
// #endregion module



// #region exports
export default ConnectedProjectsView;
// #endregion exports
