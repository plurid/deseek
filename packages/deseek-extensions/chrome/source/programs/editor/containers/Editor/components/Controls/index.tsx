// #region imports
    // #region libraries
    import React, {
        useRef,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        PluridPureButton,
    } from '../../../../../../services/styled';
    // #endregion external


    // #region internal
    import {
        StyledControls,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
export interface ControlsProperties {
    // #region required
        // #region values
        theme: Theme;
        events: any[];
        playing: boolean;
        // #endregion values

        // #region methods
        play: any;
        pause: any;
        getCurrentTime: any;
        getMetadata: any;
        finish: any;
        // #endregion methods
    // #endregion required
}

const Controls: React.FC<ControlsProperties> = (
    properties,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            theme,
            events,
            playing,
            // #endregion values

            // #region methods
            play,
            pause,
            getCurrentTime,
            getMetadata,
            finish,
            // #endregion methods
        // #endregion required
    } = properties;
    // #endregion properties


    // #region references
    const interval = useRef<NodeJS.Timeout | null>(null);
    // #endregion references


    // #region effects
    useEffect(() => {
        if (!playing) {
            return;
        }

        interval.current = setInterval(() => {
            const time = getCurrentTime();
            const metadata = getMetadata();
            console.log('time', time);
            console.log('metadata', metadata);
        }, 1000);

        return () => {
            if (interval.current) {
                clearInterval(interval.current);
            }
        }
    }, [
        playing,
    ])
    // #endregion effects


    // #region render
    return (
        <StyledControls
            theme={theme}
        >
            {events.length > 2 && (
                <>
                    <PluridPureButton
                        text={playing ? 'pause' : 'play'}
                        atClick={() => playing ? pause() : play()}
                        level={2}
                    />

                    <PluridPureButton
                        text="finish"
                        atClick={() => finish()}
                        level={2}
                    />
                </>
            )}
        </StyledControls>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Controls;
// #endregion exports
