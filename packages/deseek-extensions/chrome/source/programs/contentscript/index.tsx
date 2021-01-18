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
let stopRecord: () => void | null;
let recordedEvents: any[] = [];
let deseekFrameID: string | null;
let focusedAt: number | null;



const verifyActive = async () => {
    if (!chrome.storage.sync) {
        return;
    }

    const {
        extensionOn,
    } = await chromeStorage.get('extensionOn');
    if (!extensionOn) {
        return;
    }

    const {
        activeDeseeking,
    } = await chromeStorage.get('activeDeseeking');
    if (!activeDeseeking) {
        return;
    }

    return activeDeseeking;
}


const contentscriptRender = async () => {
    try {
        const activeDeseeking = await verifyActive();
        if (!activeDeseeking) {
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


const contentscriptDerender = () => {
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

    const activeDeseeking = await verifyActive();
    if (!activeDeseeking) {
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
window.addEventListener('focus', () => {
    startRecording({
        type: 'START_RECORD',
    });
});


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
// #endregion module
