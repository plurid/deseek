// #region imports
    // #region libraries
    import React from 'react';

    import { AnyAction } from 'redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        PluridIconStatistics,
        PluridIconLocked,
        PluridIconApps,
        PluridIconFrame,
        PluridIconToolbox,
        PluridIconRepository,
        PluridIconEdit,
        PluridIconContact,
        PluridIconCommand,
        PluridIconInfo,
        PluridIconNewStateline,
        PluridIconArrowRight,
        PluridIconDocuments,
        PluridIconExternalLink,
        PluridIconExit,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import delogLogo from '../../assets/delog-logo.png';

    import Project from '~kernel-components/Project';

    import { AppState } from '~kernel-services/state/store';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import ProjectsView from './components/ProjectsView';

    import {
        StyledGeneralView,
        StyledGeneralSelectors,
        StyledGeneralSelectorItem,
        StyledGeneralPeformer,
        StyledGeneralHelp,
        StyledGeneralHelpItem,
        StyledGeneralSelected,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export const generalSelectors = [
    'projects',
];

export const generalSelectorsIcons = {
    projects: PluridIconApps,
};


export const renderSelectedView = (
    stateIndexGeneralSelector: any,
    setGeneralView: any,
) => {
    switch (stateIndexGeneralSelector) {
        case 'projects':
            return (
                <ProjectsView
                    setGeneralView={setGeneralView}
                />
            );
        default:
            return (<></>);
    }
}


export const renderGeneralView = (
    state: AppState,
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    openManual: any,
    logout: any,
    findEntityByID: any,
    mouseOverSelectors: any,
    setMouseOverSelectors: any,
    setCompactSelectors: any,
    selectedView: any,
    setSelectedView: any,
    setGeneralView: any,
) => {
    const stateGeneralTheme = selectors.themes.getGeneralTheme(state);
    const stateInteractionTheme = selectors.themes.getInteractionTheme(state);
    const stateIndexGeneralSelector = selectors.view.getIndexGeneralSelector(state);
    const stateIndexGeneralView = selectors.view.getIndexGeneralView(state);
    const stateViewCompactSelectors = selectors.view.getViewCompactSelectors(state);
    const stateViewOwnerID = selectors.view.getViewOwnerID(state);
    const stateViewUsageType = selectors.view.getViewUsageType(state);
    const stateViewActiveProviderID = selectors.data.getActiveProviderID(state);

    const dispatchAddEntity = (
        payload: any,
    ) => dispatch(
        actions.data.addEntity(payload),
    );
    // const dispatchViewSetEditID = (
    //     payload: any,
    // ) => dispatch (
    //     actions.view.setEditID(payload),
    // );


    switch (stateIndexGeneralView) {
        case 'general':
            return (
                <StyledGeneralView
                    compactSelectors={stateViewCompactSelectors}
                >
                    <StyledGeneralSelectors
                        onMouseEnter={() => setMouseOverSelectors(true)}
                        onMouseLeave={() => setMouseOverSelectors(false)}
                        theme={stateGeneralTheme}
                        compactSelectors={stateViewCompactSelectors}
                        viewUsageType={stateViewUsageType}
                    >
                        <StyledGeneralPeformer
                            compactSelectors={stateViewCompactSelectors}
                        >
                            {!stateViewCompactSelectors && (
                                <>
                                    <div>
                                        <img
                                            src={delogLogo}
                                            alt="delog"
                                            height={30}
                                            onClick={() => setCompactSelectors(true)}
                                        />
                                    </div>

                                    <div>
                                        delog
                                    </div>
                                </>
                            )}

                            {stateViewCompactSelectors
                            && mouseOverSelectors
                            && (
                                <PluridIconArrowRight
                                    atClick={() => setCompactSelectors(false)}
                                />
                            )}
                        </StyledGeneralPeformer>

                        <ul>
                            {generalSelectors.map(selector => {
                                const Icon = generalSelectorsIcons[selector];

                                return (
                                    <StyledGeneralSelectorItem
                                        key={selector}
                                        onClick={() => setSelectedView(selector)}
                                        theme={stateGeneralTheme}
                                        selected={selector === stateIndexGeneralSelector}
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <Icon />

                                        {!stateViewCompactSelectors && (
                                            <div>
                                                {selector}
                                            </div>
                                        )}
                                    </StyledGeneralSelectorItem>
                                );
                            })}
                        </ul>

                        <StyledGeneralHelp>
                            {mouseOverSelectors && (
                                <ul>
                                    <StyledGeneralHelpItem
                                        onClick={() => openManual()}
                                        compactSelectors={stateViewCompactSelectors}
                                    >
                                        <PluridIconDocuments />

                                        {!stateViewCompactSelectors && (
                                            <>
                                                <div>
                                                    manual
                                                </div>

                                                <PluridIconExternalLink />
                                            </>
                                        )}
                                    </StyledGeneralHelpItem>

                                    {stateViewUsageType === 'PRIVATE_USAGE' && (
                                        <StyledGeneralHelpItem
                                            onClick={() => logout()}
                                            compactSelectors={stateViewCompactSelectors}
                                        >
                                            <PluridIconExit />

                                            {!stateViewCompactSelectors && (
                                                <>
                                                    <div>
                                                        logout ({stateViewOwnerID})
                                                    </div>

                                                    <div />
                                                </>
                                            )}
                                        </StyledGeneralHelpItem>
                                    )}
                                </ul>
                            )}
                        </StyledGeneralHelp>
                    </StyledGeneralSelectors>

                    <StyledGeneralSelected>
                        {selectedView}
                    </StyledGeneralSelected>
                </StyledGeneralView>
            );
        case 'generate-project':
            return (
                <Project
                    theme={stateInteractionTheme}
                    action={(project) => {
                        dispatchAddEntity({
                            type: 'project',
                            data: project,
                        });

                        setGeneralView('general');
                    }}
                    cancel={() => setGeneralView('general')}
                />
            );
        default:
            return (
                <></>
            );
    }
}
// #endregion module
