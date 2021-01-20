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
    display: grid;
    width: 100%;
    left: 0;
    bottom: 0;
    background: hsla(220, 10%, 20%, 0.8);
`;


export interface IStyledControlsTime {
    theme: Theme;
}

export const StyledControlsTime = styled.div<IStyledControlsTime>`
    width: 100%;
    height: 20px;
    background: hsla(220, 10%, 10%, 0.5);
    cursor: pointer;
`;


export const StyledControlsButtons = styled.div`
    display: grid;
    grid-template-columns: 50px auto 200px;
    align-items: center;
    height: 70px;
`;
// #region module
