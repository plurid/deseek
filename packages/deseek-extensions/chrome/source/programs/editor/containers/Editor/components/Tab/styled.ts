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
    selected: boolean;
}

export const StyledTab = styled.div<IStyledTab>`
    background-color: ${
        ({
            theme,
            selected,
        }: IStyledTab) => {
            if (!selected) {
                return theme.backgroundColorSecondary;
            }

            return theme.backgroundColorTertiary;
        }
    };
    box-shadow: ${
        ({
            theme,
        }: IStyledTab) => theme.boxShadowUmbra
    };


    position: relative;
    width: 150px;
    height: 30px;
    display: grid;
    grid-template-columns: 128px 16px;
    grid-gap: 0.5rem;
    text-align: left;
    align-items: center;
    padding: 0 0.7rem;
    margin-right: 0.7rem;
    border-radius: 20px;
    user-select: none;
`;


export interface IStyledTabTitle {
    theme: Theme;
}

export const StyledTabTitle = styled.div<IStyledTabTitle>`
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
// #region module
