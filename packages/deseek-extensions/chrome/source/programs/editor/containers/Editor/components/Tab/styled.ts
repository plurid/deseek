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
                return theme.backgroundColorTertiary;
            }

            return theme.backgroundColorSecondary;
        }
    };
    box-shadow: ${
        ({
            theme,
        }: IStyledTab) => theme.boxShadowUmbra
    };


    width: 150px;
    height: 30px;
    display: flex;
    align-items: center;
    padding: 0 0.7rem;
    margin-right: 0.7rem;
    border-radius: 20px;
    user-select: none;
    cursor: pointer;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
// #region module
