// #region imports
    // #region libraries
    import React, {
        useState,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconFrame,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region internal
    import {
        StyledTab,
        StyledTabTitle,
        StyledTabData,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface TabProperties {
    // #region required
        // #region values
        theme: Theme;
        index: number;
        data: any;
        selected: boolean;
        // #endregion values

        // #region methods
        selectRecord: (
            index: number,
        ) => void;
        // #endregion methods
    // #endregion required
}

const Tab: React.FC<TabProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            index,
            data,
            selected,
            // #endregion values

            // #region methods
            selectRecord,
            // #endregion methods
        // #endregion required
    } = properties;

    const {
        url,
        title,
    } = data;
    // #endregion properties


    // #region state
    const [
        mouseOver,
        setMouseOver,
    ] = useState(false);

    const [
        showTabData,
        setShowTabData,
    ] = useState(false);
    // #endregion state


    // #region effects
    useEffect(() => {
        if (mouseOver) {
            setShowTabData(true);
        } else {
            setShowTabData(false);
        }
    }, [
        mouseOver,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledTab
            theme={theme}
            selected={selected}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            <StyledTabTitle
               onClick={() => selectRecord(index)}
               theme={theme}
            >
                {title}
            </StyledTabTitle>

            {mouseOver && (
                <PluridIconFrame />
            )}

            {showTabData && (
                <StyledTabData
                    theme={theme}
                    selected={selected}
                >
                    {url}
                </StyledTabData>
            )}
        </StyledTab>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Tab;
// #endregion exports
