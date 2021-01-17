// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region internal
    import {
        StyledTab,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface TabProperties {
    // #region required
        // #region values
        theme: Theme;
        data: any;
        // #endregion values

        // #region methods
        selectRecord: (
            id: string,
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
            data,
            // #endregion values

            // #region methods
            selectRecord,
            // #endregion methods
        // #endregion required
    } = properties;

    const {
        id,
        url,
        title,
    } = data;
    // #endregion properties


    // #region render
    return (
        <StyledTab
            theme={theme}
            onClick={() => selectRecord(id)}
        >
            {title}
        </StyledTab>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Tab;
// #endregion exports
