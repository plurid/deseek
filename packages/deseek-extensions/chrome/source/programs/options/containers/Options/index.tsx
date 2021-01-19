// #region imports
    // #region libraries
    import React, {
        useState,
        useContext,
        useEffect,
    } from 'react';

    import themes from '@plurid/plurid-themes';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries


    // #region external
    import Context from '../../context';

    import Dropdown from '../../../../components/Dropdown';
    import ItemExtensionOnOff from '../../../../components/ItemExtensionOnOff';
    import ButtonCheckmark from '../../../../components/ButtonCheckmark';
    import ButtonInline from '../../../../components/ButtonInline';

    import {
        chromeStorage,
    } from '../../../../services/utilities';

    import {
        defaultOptions,
    } from '../../../../data/constants';
    // #endregion external


    // #region internal
    import {
        StyledOptions,
        StyledOptionsContainer,
        StyledOptionsWrapper,
        StyledOptionsItemLeftRight,
        StyledStateContainer,
        StyledUIContainer,
        StyledPluridTextline,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
const {
    form: {
        FormLeftRight: PluridFormLeftRight,
        Formitem: PluridFormitem,
    },
    typography: {
        Heading: PluridHeading,
    },
    inputs: {
        InputBox: PluridInputBox,
    },
} = universal;


const extractOptions = (
    value: string,
) => {
    const split = value.split(/\s|\n/);
    const values = split
        .map(value =>
            value.trim()
                .replace(/,/, '')
                .replace(/https?:\/\//, '')
        ).filter(value => value !== '');

    return values;
}


export interface OptionsProperties {
}

const Options: React.FC<OptionsProperties> = () => {
    // #region properties
    const context: any = useContext(Context);
    const {
        theme,
        setTheme,
        options,
    } = context;
    // #endregion properties


    // #region state
    const [
        extensionOnOff,
        setExtensionOnOff,
    ] = useState(true);

    const [
        minimalFrame,
        setMinimalFrame,
    ] = useState<boolean>(options.minimalFrame);

    const [
        neverRecordOn,
        setNeverRecordOn,
    ] = useState(options.neverRecordOn.join(', '));
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

    useEffect(() => {
        const setOptions = async () => {
            const { options } = await chromeStorage.get('options');

            if (!options) {
                return;
            }

            const {
                minimalFrame,
                neverRecordOn,
            } = options;

            const neverRecordOnData = neverRecordOn || defaultOptions.neverRecordOn;

            setMinimalFrame(minimalFrame ?? defaultOptions.minimalFrame);
            setNeverRecordOn(neverRecordOnData.join(', '));
        }

        setOptions();
    }, []);

    useEffect(() => {
        const saveOptions = async () => {
            const options = {
                minimalFrame,
                neverRecordOn: Array.isArray(neverRecordOn)
                    ? neverRecordOn
                    : extractOptions(neverRecordOn),
            };

            await chromeStorage.set({options});
        }

        saveOptions();
    }, [
        minimalFrame,
        neverRecordOn,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledOptions
            theme={theme}
        >
            <StyledOptionsContainer>
                <StyledOptionsWrapper>
                    <StyledStateContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            state
                        </PluridHeading>

                        <ItemExtensionOnOff
                            theme={theme}
                            extensionOnOff={extensionOnOff}
                            setExtensionOnOff={() => setExtensionOnOff(!extensionOnOff)}
                        />

                        <PluridFormitem>
                            <PluridInputBox
                                theme={theme}
                                name="never record on"
                                text={neverRecordOn}
                                atChange={(event) => setNeverRecordOn(event.target.value)}
                                // placeholder="e.g., plurid.com"
                                style={{
                                    whiteSpace: 'pre-wrap',
                                }}
                            />
                        </PluridFormitem>
                    </StyledStateContainer>


                    <StyledUIContainer>
                        <PluridHeading
                            theme={theme}
                            type="h2"
                            style={{
                                padding: '0 0.7rem',
                            }}
                        >
                            interface
                        </PluridHeading>

                        <PluridFormLeftRight
                            style={{
                                padding: '0.3rem 0.7rem',
                            }}
                        >
                            <div>
                                theme
                            </div>

                            <Dropdown
                                theme={theme}
                                selected={theme.name}
                                items={Object.keys(themes)}
                                onSelect={setTheme}
                            />
                        </PluridFormLeftRight>

                        <PluridFormitem
                            theme={theme}
                        >
                            <ButtonCheckmark
                                checked={minimalFrame}
                                text="minimal frame (not recommended)"
                                theme={theme}
                                toggle={() => setMinimalFrame(mininal => !mininal)}
                            />
                        </PluridFormitem>
                    </StyledUIContainer>

                    <div
                        style={{
                            display: 'grid',
                            placeContent: 'center',
                            margin: '40px',
                        }}
                    >
                        <ButtonInline
                            theme={theme}
                            atClick={() => {
                            }}
                        >
                            reset to defaults
                        </ButtonInline>
                    </div>
                </StyledOptionsWrapper>
            </StyledOptionsContainer>
        </StyledOptions>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Options;
// #endregion exports
