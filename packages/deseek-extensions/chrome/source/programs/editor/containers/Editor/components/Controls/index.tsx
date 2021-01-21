// #region imports
    // #region libraries
    import React, {
        useRef,
        useEffect,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconPlay,
        PluridIconPause,
    } from '@plurid/plurid-icons-react';
    // #endregion libraries


    // #region external
    import {
        PluridPureButton,
    } from '../../../../../../services/styled';
    // #endregion external


    // #region internal
    import {
        StyledControls,
        StyledControlsTime,
        StyledControlsTimePlayed,
        StyledControlsButtons,
    } from './styled';
    // #endregion internal
// #region imports



// #region module
const summedTime = (
    recorded: any,
) => {
    if (!recorded) {
        return;
    }

    // let time = 0;

    // recorded.records.map((record: any) => {
    //     let recordTime = 0;

    //     record.data.map((view: any) => {
    //         recordTime += view.delay;
    //     });

    //     time += recordTime;
    // });

    const time = (recorded.end - recorded.start) / 1000;

    return time;
}

export interface ControlsProperties {
    // #region required
        // #region values
        theme: Theme;
        recorded: any;
        events: any[];
        playing: boolean;
        // #endregion values

        // #region methods
        play: () => void;
        pause: () => void;
        getCurrentTime: any;
        getMetadata: any;
        interact: () => void;
        setTime: (
            value: number,
        ) => void;
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
            recorded,
            events,
            playing,
            // #endregion values

            // #region methods
            play,
            pause,
            getCurrentTime,
            getMetadata,
            interact,
            setTime,
            finish,
            // #endregion methods
        // #endregion required
    } = properties;

    const currentTime = 0;
    const duration = summedTime(recorded);
    console.log('duration', duration);
    console.log('recorded', recorded);

    const currentTimeWidth = currentTime / duration * 100;
    // #endregion properties


    // #region references
    const timeline = useRef<HTMLDivElement>(null);

    const interval = useRef<NodeJS.Timeout | null>(null);
    // #endregion references


    // #region handlers
    const handleTimeClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!timeline.current) {
            return;
        }

        const clientX = event.clientX;

        const {
            width,
            left,
        } = timeline.current.getBoundingClientRect();

        const timePercentage = (clientX - left) / width * 100;
        const deseekTime = timePercentage * duration / 100;
        console.log('deseekTime', deseekTime);
        setTime(deseekTime);
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (!playing) {
            return;
        }

        interval.current = setInterval(() => {
            const time = getCurrentTime();
            const metadata = getMetadata();
            // console.log('time', time);
            // console.log('metadata', metadata);
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

    // console.log('recorded', recorded);


    // #region render
    if (events.length < 2) {
        return (
            <></>
        );
    }

    return (
        <StyledControls
            theme={theme}
        >
            <StyledControlsTime
                ref={timeline}
                theme={theme}
                onClick={(event) => handleTimeClick(event)}
            >
                <StyledControlsTimePlayed
                    theme={theme}
                    style={{
                        width: currentTimeWidth + '%',
                    }}
                />
            </StyledControlsTime>

            <StyledControlsButtons>
                <div
                    style={{
                        display: 'grid',
                        placeContent: 'center',
                    }}
                >
                    {playing ? (
                        <PluridIconPause
                            atClick={pause}
                        />
                    ) : (
                        <PluridIconPlay
                            atClick={play}
                        />
                    )}
                </div>

                <div />

                <div
                    style={{
                        display: 'grid',
                        placeContent: 'center',
                    }}
                >
                    <PluridPureButton
                        text="Finish"
                        atClick={() => finish()}
                        level={1}
                    />
                </div>
            </StyledControlsButtons>
        </StyledControls>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Controls;
// #endregion exports
