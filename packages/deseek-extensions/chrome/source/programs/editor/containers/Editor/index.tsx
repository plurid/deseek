// #region imports
    // #region libraries
    import React, {
        useContext,
        useRef,
        useEffect,
        useState,
    } from 'react';

    import * as rrweb from 'rrweb';
    // #endregion libraries


    // #region external
    import Context from '../../context';
    // #endregion external


    // #region internal
    import {
        StyledEditor,
        StyledReplayer,
    } from './styled';

    import Tabs from './components/Tabs';
    import Controls from './components/Controls';
    // #endregion internal
// #endregion imports



// #region module
export interface EditorProperties {
}

const Editor: React.FC<EditorProperties> = (
    properties,
) => {
    // #region properties
    const context: any = useContext(Context);
    const {
        theme,
    } = context;
    // #endregion properties


    // #region references
    const replayerElement = useRef<HTMLDivElement | null>(null);
    const replayer = useRef<rrweb.Replayer | null>(null);
    // #endregion references


    // #region state
    const [
        selectedTab,
        setSelectedTab,
    ] = useState(null);

    const [
        recorded,
        setRecorded,
    ] = useState(null);

    const [
        events,
        setEvents,
    ] = useState([]);

    const [
        playing,
        setPlaying,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const finish = () => {
        chrome.runtime.sendMessage({
            type: 'FINISH',
        });
    }

    const play = () => {
        if (!replayer.current) {
            return;
        }

        replayer.current.play();
        setPlaying(true);
    }

    const getCurrentTime = () => {
        if (!replayer.current) {
            return;
        }

        return replayer.current.getCurrentTime();
    }

    const getMetadata = () => {
        if (!replayer.current) {
            return;
        }

        return replayer.current.getMetaData();
    }

    const pause = () => {
        if (!replayer.current) {
            return;
        }

        replayer.current.pause();
        setPlaying(false);
    }

    const selectRecord = (
        id: string,
    ) => {
        if (!recorded) {
            return;
        }

        const index = recorded.records.findIndex((record: any) => record.id === id);
        const record = recorded.records.find((record: any) => record.id === id);
        if (!record) {
            return;
        }

        setSelectedTab(index);
        setEvents(record.data);
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (!replayerElement.current) {
            return;
        }

        if (events.length < 2) {
            return;
        }

        // replayerElement.current.innerHTML = "";

        replayer.current = new rrweb.Replayer(events as any, {
            root: replayerElement.current,
        });
    }, [
        events,
    ]);

    useEffect(() => {
        chrome.runtime.sendMessage(
            {
                type: 'EXTRACT',
            },
        );

        chrome.runtime.onMessage.addListener(
            (
                message,
            ) => {
                setRecorded(message.recorded);
            },
        );
    }, []);
    // #endregion effects


    // #region render
    return (
        <StyledEditor
            theme={theme}
        >
            <Tabs
            // #region required
                // #region values
                theme={theme}
                recorded={recorded}
                selectedTab={selectedTab}
                // #endregion values

                // #region methods
                selectRecord={selectRecord}
                // #endregion methods
            // #endregion required
            />

            <StyledReplayer>
                <div
                    ref={replayerElement}
                />

                <Controls
                // #region required
                    // #region values
                    theme={theme}
                    events={events}
                    playing={playing}
                    // #endregion values

                    // #region methods
                    play={play}
                    pause={pause}
                    getCurrentTime={getCurrentTime}
                    getMetadata={getMetadata}
                    finish={finish}
                    // #endregion methods
                // #endregion required
                />
            </StyledReplayer>
        </StyledEditor>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Editor;
// #endregion exports
