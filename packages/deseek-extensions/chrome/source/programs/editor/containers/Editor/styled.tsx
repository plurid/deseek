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

export const StyledEditor = styled.div<IStyledEditor>`
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
    grid-template-columns: 1fr;
    grid-template-rows: 60px auto;
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
        background-image: url('data:image/png;base64,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');
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
        /* height: 700px; */
    }
`;


export const StyledReplayer = styled.div`
    position: relative;
    display: grid;
    justify-content: center;
    grid-template-rows: 500px;
`;
// #endregion module
