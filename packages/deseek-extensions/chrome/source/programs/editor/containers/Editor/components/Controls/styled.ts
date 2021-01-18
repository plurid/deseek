// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #region libraries
// #region imports



// #region module
export interface IStyledControls {
    theme: Theme;
}

export const StyledControls = styled.div<IStyledControls>`
    position: absolute;
    bottom: 10px;
    left: 0;
    display: flex;
    width: 100%;
`;
// #region module
