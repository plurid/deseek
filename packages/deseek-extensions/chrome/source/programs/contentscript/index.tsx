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


const startRecording = async (
    message: any,
) => {
    if (message.type !== 'START_RECORD') {
        return;
    }

    stopRecord = rrweb.record({
        emit: (event) => {
            recordedEvents.push(event);
        },
    });
}

chrome.runtime.onMessage.addListener(startRecording);


window.addEventListener('blur', () => {
    if (!stopRecord) {
        return;
    }

    stopRecord();

    chrome.runtime.sendMessage({
        type: 'RECORDING',
        data: recordedEvents,
    });
    recordedEvents = [];
});


async function contentscript() {
    try {
        const {
            extensionOn,
        } = await chromeStorage.get('extensionOn');

        const {
            activeDeseeking,
        } = await chromeStorage.get('activeDeseeking');

        const {
            options,
        } = await chromeStorage.get('options');

        if (!extensionOn) {
            return;
        }

        const deseekFrameID = 'deseek-recording-frame-' + Math.floor(Math.random() * 1000);
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


async function contentscriptMain() {
    await contentscript();
};


contentscriptMain();
// #endregion module
