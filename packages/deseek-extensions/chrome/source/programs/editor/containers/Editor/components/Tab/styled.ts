// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledTab {
    theme: Theme;
}

export const StyledTab = styled.div<IStyledTab>`
    background-color: ${
        ({
            theme,
        }: IStyledTab) => theme.backgroundColorSecondary
    };
    height: 100%;
    width: 150px;
`;
// #region module
