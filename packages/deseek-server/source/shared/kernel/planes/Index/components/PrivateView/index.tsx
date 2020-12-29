// #region imports
    // #region libraries
    import React, {
        useState,
    } from 'react';

    import { AnyAction } from 'redux';
    import { connect } from 'react-redux';
    import { ThunkDispatch } from 'redux-thunk';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import delogLogo from '../../assets/delog-logo.png';

    import client from '~kernel-services/graphql/client';

    import {
        LOGIN,
    } from '~kernel-services/graphql/mutate';

    import {
        getCurrentOwner,
    } from '~kernel-services/logic/queries';

    import { AppState } from '~kernel-services/state/store';
    import selectors from '~kernel-services/state/selectors';
    import actions from '~kernel-services/state/actions';

    import {
        PluridPureButton,
        PluridInputLine,
    } from '~kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledPrivateView,
        StyledLoginButtons,
        StyledLoginButton,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface PrivateViewOwnProperties {
}

export interface PrivateViewStateProperties {
    stateGeneralTheme: Theme;
    stateInteractionTheme: Theme;
}

export interface PrivateViewDispatchProperties {
    dispatch: ThunkDispatch<{}, {}, AnyAction>;
    dispatchSetViewType: typeof actions.view.setViewType;
}

export type PrivateViewProperties = PrivateViewOwnProperties
    & PrivateViewStateProperties
    & PrivateViewDispatchProperties;

const PrivateView: React.FC<PrivateViewProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region state
        stateInteractionTheme,
        // #endregion state

        // #region dispatch
        dispatch,
        dispatchSetViewType,
        // #endregion dispatch
    } = properties;
    // #endregion properties


    // #region state
    const [
        identonym,
        setIdentonym,
    ] = useState('');
    const [
        key,
        setKey,
    ] = useState('');
    const [
        error,
        setError,
    ] = useState('');
    // #endregion state


    // #region handlers
    const login = async () => {
        try {
            setError('');

            if (!identonym || !key) {
                setError('identonym and key required.');
                return;
            }

            const input = {
                identonym,
                key,
            };

            const mutation = await client.mutate({
                mutation: LOGIN,
                variables: {
                    input,
                },
            });

            const response = mutation.data.login;

            if (!response.status) {
                setError('something is wrong. try again.');
                return;
            }

            await getCurrentOwner(dispatch);

            dispatchSetViewType({
                type: 'indexView',
                value: 'general',
            });
        } catch (error) {
            return;
        }
    }

    const handleEnter = (
        event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key === 'Enter') {
            login();
        }
    }
    // #endregion handlers


    // #region render
    return (
        <StyledPrivateView>
            <div>
                <img
                    src={delogLogo}
                    alt="delog logo"
                    height={250}
                />
            </div>

            <h1>
                delog private usage
            </h1>

            <StyledLoginButtons>
                <PluridInputLine
                    text={identonym}
                    name="identonym"
                    theme={stateInteractionTheme}
                    atChange={(event) => setIdentonym(event.target.value)}
                    atKeyDown={(event) => handleEnter(event)}
                />

                <PluridInputLine
                    text={key}
                    name="key"
                    type="password"
                    theme={stateInteractionTheme}
                    atChange={(event) => setKey(event.target.value)}
                    atKeyDown={(event) => handleEnter(event)}
                />

                <div
                    style={{
                        minHeight: '30px',
                        marginTop: '2rem',
                    }}
                >
                    {error}
                </div>
            </StyledLoginButtons>

            <StyledLoginButton>
                <PluridPureButton
                    text="Login"
                    atClick={() => login()}
                    level={2}
                />
            </StyledLoginButton>
        </StyledPrivateView>
    );
    // #endregion render
}


const mapStateToProperties = (
    state: AppState,
): PrivateViewStateProperties => ({
    stateGeneralTheme: selectors.themes.getGeneralTheme(state),
    stateInteractionTheme: selectors.themes.getInteractionTheme(state),
});


const mapDispatchToProperties = (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
): PrivateViewDispatchProperties => ({
    dispatch,
    dispatchSetViewType: (
        payload,
    ) => dispatch(
        actions.view.setViewType(payload),
    ),
});


const ConnectedPrivateView = connect(
    mapStateToProperties,
    mapDispatchToProperties,
)(PrivateView);
// #endregion module



// #region exports
export default ConnectedPrivateView;
// #endregion exports
