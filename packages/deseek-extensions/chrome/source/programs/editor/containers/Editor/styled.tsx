// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledEditor {
    theme: Theme;
}

export const StyledEditor = styled.div`
    background-color: ${
        ({
            theme,
        }: IStyledEditor) => theme.backgroundColorSecondary
    };
    background: ${
        ({
            theme,
        }: IStyledEditor) => {
            const foregroundGradient = theme.type === 'dark'
                ? theme.backgroundColorTertiary
                : theme.backgroundColorPrimary;
            const backgroundGradient = theme.type === 'dark'
                ? theme.backgroundColorPrimary
                : theme.backgroundColorTertiary;

            return `radial-gradient(
                ellipse at center,
                ${foregroundGradient} 0%,
                ${backgroundGradient} 100%)
            `;
        }
    };

    display: grid;
    place-content: center;
    padding: 2rem;
    height: 100%;


    /* replayer */
    .replayer-wrapper {
        position: relative;
    }

    .replayer-mouse {
        position: absolute;
        width: 20px;
        height: 20px;
        transition: 0.05s linear;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjMDAwMDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGRhdGEtbmFtZT0iTGF5ZXIgMSIgdmlld0JveD0iMCAwIDUwIDUwIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPkRlc2lnbl90bnA8L3RpdGxlPjxwYXRoIGQ9Ik00OC43MSw0Mi45MUwzNC4wOCwyOC4yOSw0NC4zMywxOEExLDEsMCwwLDAsNDQsMTYuMzlMMi4zNSwxLjA2QTEsMSwwLDAsMCwxLjA2LDIuMzVMMTYuMzksNDRhMSwxLDAsMCwwLDEuNjUuMzZMMjguMjksMzQuMDgsNDIuOTEsNDguNzFhMSwxLDAsMCwwLDEuNDEsMGw0LjM4LTQuMzhBMSwxLDAsMCwwLDQ4LjcxLDQyLjkxWm0tNS4wOSwzLjY3TDI5LDMyYTEsMSwwLDAsMC0xLjQxLDBsLTkuODUsOS44NUwzLjY5LDMuNjlsMzguMTIsMTRMMzIsMjcuNThBMSwxLDAsMCwwLDMyLDI5TDQ2LjU5LDQzLjYyWiI+PC9wYXRoPjwvc3ZnPg==');
    }

    .replayer-mouse::after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        background: rgb(73, 80, 246);
        transform: translate(-10px, -10px);
        opacity: 0.3;
    }

    .replayer-mouse.active::after {
        animation: click 0.2s ease-in-out 1;
    }

    .replayer-mouse-tail {
        position: absolute;
        pointer-events: none;
    }

    @keyframes click {
        0% {
            opacity: 0.3;
            width: 20px;
            height: 20px;
            border-radius: 10px;
            transform: translate(-10px, -10px);
        }
        50% {
            opacity: 0.5;
            width: 10px;
            height: 10px;
            border-radius: 5px;
            transform: translate(-5px, -5px);
        }
    }


    iframe {
        border: none;
    }
`;
// #endregion module
