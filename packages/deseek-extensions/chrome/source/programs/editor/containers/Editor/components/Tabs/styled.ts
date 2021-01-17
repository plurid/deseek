// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledTabs {
    theme: Theme;
}

export const StyledTabs = styled.div<IStyledTabs>`
    display: flex;
    height: 40px;
`;
// #region module
