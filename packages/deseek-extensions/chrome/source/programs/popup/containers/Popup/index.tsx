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

    import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';

    import {
        chromeStorage,
    } from '../../../../services/utilities';

    import {
        PluridTextline,

        PluridLinkButton,
        PluridPureButton,
    } from '../../../../services/styled';
    // #endregion external


    // #region internal
    import {
        StyledPopup,
        StyledPopupContainer,
        StyledPopupContainerItemsView,
        StyledViewOptionsButton,
        StyledDeseeking,
        StyledDeseekID,
        StyledActiveDeseeking,
        StyledDeseekButtons,
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


    // #region handlers
    const updateActiveDeseeking = async (
        value: string,
    ) => {
        setActiveDeseeking(value);

        await chromeStorage.set({
            activeDeseeking: value,
        });
    }

    const handleDeseekID = () => {
        updateActiveDeseeking(deseekID);
        setDeseekID('');

        chrome.runtime.sendMessage({
            type: 'INITIALIZE',
        });
    }

    const cancelDeseek = () => {
        updateActiveDeseeking('');

        chrome.runtime.sendMessage({
            type: 'CANCEL',
        });
    }

    const stopEditDeseek = () => {
        updateActiveDeseeking('');

        chrome.runtime.sendMessage({
            type: 'STOP',
        });

        chrome.tabs.create({
            url: chrome.runtime.getURL('editor.html'),
        });
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        const getChromeState = async () => {
            const {
                extensionOn,
            } = await chromeStorage.get('extensionOn');
            setExtensionOnOff(!!extensionOn);

            const {
                activeDeseeking,
            } = await chromeStorage.get('activeDeseeking');
            updateActiveDeseeking(activeDeseeking || '');
        }

        getChromeState();
    }, []);

    useEffect(() => {
        const setChromeExtensionState = async () => {
            await chromeStorage.set({
                extensionOn: extensionOnOff,
            });
        }

        setChromeExtensionState();
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

                    <StyledDeseeking>
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
                                    enterAtClick={() => handleDeseekID()}
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

                                <StyledDeseekButtons>
                                    <PluridLinkButton
                                        theme={theme}
                                        text="cancel"
                                        atClick={() => cancelDeseek()}
                                    />

                                    <PluridPureButton
                                        theme={theme}
                                        text="edit"
                                        atClick={() => stopEditDeseek()}
                                        level={2}
                                        style={{
                                            minWidth: 'auto',
                                        }}
                                    />
                                </StyledDeseekButtons>
                            </StyledActiveDeseeking>
                        )}
                    </StyledDeseeking>

                    <StyledViewOptionsButton>
                        <PluridLinkButton
                            theme={theme}
                            text="view options"
                            atClick={openOptions}
                        />
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
