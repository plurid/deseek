// #region imports
    // #region libraries
    import React, {
        useRef,
        useEffect,
        useState,
    } from 'react';

    import * as rrweb from 'rrweb';
    // #endregion libraries


    // #region internal
    import {
        StyledEditor,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface EditorProperties {
}

const Editor: React.FC<EditorProperties> = (
    properties,
) => {
    // #region references
    const replayer = useRef<HTMLDivElement | null>(null);
    // #endregion references


    // #region state
    const [
        events,
        setEvents,
    ] = useState([]);
    // #endregion state


    // #region effects
    useEffect(() => {
        if (!replayer.current) {
            return;
        }

        if (events.length < 2) {
            return;
        }

        new rrweb.Replayer(events as any, {
            root: replayer.current,
        });
    }, [
        events,
    ]);
    // #endregion effects


    // #region render
    return (
        <StyledEditor>
            <div
                ref={replayer}
            />
        </StyledEditor>
    );
    // #endregion render
}
// #endregion module



// #region exports
export default Editor;
// #endregion exports
