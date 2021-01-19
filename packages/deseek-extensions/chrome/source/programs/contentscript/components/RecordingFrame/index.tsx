// #region imports
    // #region libraries
    import React from 'react';
    // #endregion libraries


    // #region internal
    import {
        StyledRecordingFrame,
        StyledRecordingText,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface RecordingFrameProperties {
    minimalFrame: boolean;
}

const RecordingFrame: React.FC<RecordingFrameProperties> = (
    properties,
) => {
    // #region properties
    const {
        minimalFrame,
    } = properties;
    // #endregion properties


    // #region render
    return (
        <StyledRecordingFrame
            minimalFrame={minimalFrame}
        >
            {!minimalFrame && (
                <StyledRecordingText>
                    deseek recording
                </StyledRecordingText>
            )}
        </StyledRecordingFrame>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default RecordingFrame;
// #endregion exports
