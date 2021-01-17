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

    import {
        PluridPureButton,
    } from '../../../../services/styled';
    // #endregion external


    // #region internal
    import {
        StyledEditor,
    } from './styled';

    import Tabs from './components/Tabs';
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
        recorded,
        setRecorded,
    ] = useState(null);

    const [
        events,
        setEvents,
    ] = useState([]);
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
    }

    const pause = () => {
        if (!replayer.current) {
            return;
        }

        replayer.current.pause();
    }

    const selectRecord = (
        id: string,
    ) => {
        if (!recorded) {
            return;
        }

        const record = recorded.records.find((record: any) => record.id === id);
        if (!record) {
            return;
        }
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
                console.log('message', message);
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
                theme={theme}
                recorded={recorded}
                selectRecord={selectRecord}
            />

            <div
                ref={replayerElement}
            />

            <div
                style={{
                    display: 'flex',
                    padding: '4rem',
                }}
            >
                <PluridPureButton
                    text="play"
                    atClick={() => {
                        play();
                    }}
                    level={2}
                />

                <PluridPureButton
                    text="pause"
                    atClick={() => {
                        pause();
                    }}
                    level={2}
                />

                <PluridPureButton
                    text="finish"
                    atClick={() => finish()}
                    level={2}
                />
            </div>
        </StyledEditor>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Editor;
// #endregion exports
