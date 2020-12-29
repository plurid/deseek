// #region imports
    // #region libraries
    import React, {
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
    import Head from '~kernel-components/Head';

    import {
        getCurrentOwner,
        getUsageType,
    } from '~kernel-services/logic/queries';

    import { AppState } from '~kernel-services/state/store';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';
    // #endregion external


    // #region internal
    import {
        StyledHome,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface HomeOwnProperties {
}

export interface HomeStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface HomeDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    dispatchSetViewLoading: typeof actions.view.setViewLoading;
    dispatchSetViewType: typeof actions.view.setViewType;
    dispatchSetViewUsageType: typeof actions.view.setViewUsageType;
}

export type HomeProperties = HomeOwnProperties
    & HomeStateProperties
    & HomeDispatchProperties;

const Home: React.FC<HomeProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        // stateGeneralTheme,
        // stateInteractionTheme,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchSetViewLoading,
        dispatchSetViewType,
        dispatchSetViewUsageType,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region effects
    useEffect(() => {
        const loadData = async () => {
            let indexView = 'initial';

            /** Get usage type */
            const usageType = await getUsageType(dispatchSetViewUsageType);
            if (usageType) {
                indexView = usageType;
            }

            /** Get current owner */
            const ownerSet = await getCurrentOwner(dispatch);
            if (ownerSet) {
                indexView = 'general';
            }

            dispatchSetViewType({
                type: 'indexView',
                value: indexView,
            });

            dispatchSetViewLoading(false);
        }

        loadData();
    }, []);
    // #endregion effects


    // #region render
    return (
        <StyledHome>
            <Head />
        </StyledHome>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): HomeStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): HomeDispatchProperties => ({
    dispatch,
    dispatchSetViewLoading: (
        loading,
    ) => dispatch(
        actions.view.setViewLoading(loading),
    ),
    dispatchSetViewType: (
        payload,
    ) => dispatch(
        actions.view.setViewType(payload),
    ),
    dispatchSetViewUsageType: (
        usageType,
    ) => dispatch(
        actions.view.setViewUsageType(usageType),
    ),
});


const ConnectedHome = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(Home);
// #endregion module



// #region exports
export default ConnectedHome;
// #endregion exports
