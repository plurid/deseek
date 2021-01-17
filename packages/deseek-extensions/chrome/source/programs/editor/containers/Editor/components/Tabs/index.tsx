// #region imports
    // #region libraries
    import React from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import Tab from '../Tab';
    // #endregion external


    // #region internal
    import {
        StyledTabs,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface TabsProperties {
    // #region required
        // #region values
        theme: Theme;
        recorded: any;
        // #endregion values

        // #region methods
        selectRecord: (
            id: string,
        ) => void;
        // #endregion methods
    // #endregion required
}

const Tabs: React.FC<TabsProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            recorded,
            // #endregion values

            // #region methods
            selectRecord,
            // #endregion methods
        // #endregion required
    } = properties;
    // #endregion properties


    // #region render
    if (!recorded) {
        return (
            <></>
        );
    }

    return (
        <StyledTabs
            theme={theme}
        >
            {recorded.records.map((record: any) => {
                const {
                    id,
                } = record;

                return (
                    <Tab
                        key={id}
                        theme={theme}
                        data={record}
                        selectRecord={selectRecord}
                    />
                );
            })}
        </StyledTabs>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Tabs;
// #endregion exports
