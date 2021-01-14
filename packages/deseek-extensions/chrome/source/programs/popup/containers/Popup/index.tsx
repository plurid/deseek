// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
        useContext,
    } from 'react';
    // #endregion libraries


    // #region external
    import Context from '../../context';

    import ButtonInline from '../../../../components/ButtonInline';

    import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';

    import {
        chromeStorage,
    } from '../../../../services/utilities';

    import {
        PluridTextline,
    } from '../../../../services/styled';
    // #endregion external


    // #region internal
    import {
        StyledPopup,
        StyledPopupContainer,
        StyledPopupContainerItemsView,
        StyledViewOptionsButton,
        StyledDeseekID,
        StyledActiveDeseeking,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
const Popup: React.FC<any> = (
    properties,
) => {
    // #region state
    const [
        extensionOnOff,
        setExtensionOnOff,
    ] = useState(true);
    // #endregion state


    // #region handlers
    const context: any = useContext(Context);
    const {
        theme,
    } = context;

    const openOptions = () => {
        chrome.runtime.openOptionsPage();
    }
    // #endregion handlers


    // #region state
    const [
        deseekID,
        setDeseekID,
    ] = useState('');

    const [
        activeDeseeking,
        setActiveDeseeking,
    ] = useState('');
    // #endregion state


    // #region effects
    useEffect(() => {
        const getExtensionState = async () => {
            const { extensionOn } = await chromeStorage.get('extensionOn');
            setExtensionOnOff(!!extensionOn);
        }

        getExtensionState();
    }, []);

    useEffect(() => {
        const setExtensionState = async () => {
            await chromeStorage.set({extensionOn: extensionOnOff});
        }
        setExtensionState();
    }, [
        extensionOnOff,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledPopup
            theme={theme}
        >
            <StyledPopupContainer>
                <StyledPopupContainerItemsView>
                    <ItemExtensionOnOff
                        theme={theme}
                        extensionOnOff={extensionOnOff}
                        setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                    />

                    <div>
                        {extensionOnOff && !activeDeseeking && (
                            <StyledDeseekID>
                                <div
                                    style={{
                                        textAlign: 'center',
                                    }}
                                >
                                    start deseeking for id
                                </div>

                                <PluridTextline
                                    theme={theme}
                                    text={deseekID}
                                    atChange={(event) => setDeseekID(event.target.value)}
                                    enterAtClick={() => {
                                        setActiveDeseeking(deseekID);
                                        setDeseekID('');
                                    }}
                                    level={2}
                                    spellCheck={false}
                                    autoCapitalize="false"
                                    autoComplete="false"
                                    autoCorrect="false"
                                />
                            </StyledDeseekID>
                        )}

                        {extensionOnOff && activeDeseeking && (
                            <StyledActiveDeseeking>
                                <div>
                                    currently deseeking for id
                                </div>

                                <div>
                                    {activeDeseeking}
                                </div>

                                <div>
                                    <div
                                        onClick={() => {
                                            setActiveDeseeking('');
                                        }}
                                    >
                                        cancel
                                    </div>

                                    <div>
                                        finish
                                    </div>
                                </div>
                            </StyledActiveDeseeking>
                        )}
                    </div>

                    <StyledViewOptionsButton>
                        <ButtonInline
                            theme={theme}
                            atClick={openOptions}
                        >
                            view options
                        </ButtonInline>
                    </StyledViewOptionsButton>
                </StyledPopupContainerItemsView>
            </StyledPopupContainer>
        </StyledPopup>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Popup;
// #endregion exports
