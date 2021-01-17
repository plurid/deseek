// #region imports
    // #region libraries
    import React from 'react';

    import ReactDOM from 'react-dom';

    import * as rrweb from 'rrweb';
    // #endregion libraries


    // #region external
    import {
        chromeStorage,
    } from '../../services/utilities';

    import {
        defaultOptions,
    } from '../../data/constants';
    // #endregion external


    // #region internal
    import RecordingFrame from './components/RecordingFrame';
    // #endregion internal
// #endregion imports



// #region module
// let chromeRuntimePort = chrome.runtime.connect();
// console.log('chromeRuntimePort', chromeRuntimePort);

let stopRecord: () => void | null;
let recordedEvents: any[] = [];
let deseekFrameID: string | null;
let focusedAt: number | null;


async function contentscriptRender() {
    try {
        const {
            extensionOn,
        } = await chromeStorage.get('extensionOn');

        const {
            activeDeseeking,
        } = await chromeStorage.get('activeDeseeking');

        // const {
        //     options,
        // } = await chromeStorage.get('options');

        if (!extensionOn || !activeDeseeking) {
            return;
        }

        deseekFrameID = 'deseek-recording-frame-' + Math.floor(Math.random() * 10_000);
        const element = document.createElement('div');
        element.id = deseekFrameID;
        document.body.appendChild(element);

        ReactDOM.render(
            <RecordingFrame />,
            document.getElementById(deseekFrameID) as HTMLElement,
        );
    } catch (error) {
        return;
    }
}


function contentscriptDerender() {
    if (!deseekFrameID) {
        return;
    }

    const element = document.getElementById(deseekFrameID);
    if (!element) {
        return;
    }
    element.remove();
}



const startRecording = async (
    message: any,
) => {
    if (message.type !== 'START_RECORD') {
        return;
    }

    console.log('startRecording');

    stopRecord = rrweb.record({
        emit: (event) => {
            recordedEvents.push(event);
        },
    });
    focusedAt = Date.now();

    contentscriptRender();
}

chrome.runtime.onMessage.addListener(startRecording);


const stopRecording = () => {
    // if (!chromeRuntimePort) {
    //     return;
    // }

    if (!stopRecord) {
        return;
    }

    console.log('stopRecord');

    stopRecord();

    chrome.runtime.sendMessage({
        type: 'RECORDING',
        data: {
            focusedAt,
            url: location.href,
            title: document.title,
            events: recordedEvents,
            deseekFrameID,
        },
    });
    recordedEvents = [];

    contentscriptDerender();
}

window.addEventListener('blur', stopRecording);



// chromeRuntimePort.onDisconnect.addListener(() => {
//     chromeRuntimePort = null;
//     window.removeEventListener('blur', stopRecording);
// });
// #endregion module
