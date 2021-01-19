// #region imports
    // #region libraries
    import styled from 'styled-components';
    // #endregion libraries
// #endregion imports



// #region module
export interface IStyledRecordingFrame {
    minimalFrame: boolean;
}

export const StyledRecordingFrame = styled.div<IStyledRecordingFrame>`
    border: ${
        ({
            minimalFrame,
        }) => minimalFrame ? '0.2rem': '1.1rem'
    } solid red;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99999;
    opacity: 0.5;
    pointer-events: none;
`;


export const StyledRecordingText = styled.div`
    pointer-events: none;
    position: fixed;
    top: 1px;
    left: 2px;
    color: white;
    font-family: Ubuntu;
    font-size: 0.8rem;
    text-transform: uppercase;
`;
// #endregion module
