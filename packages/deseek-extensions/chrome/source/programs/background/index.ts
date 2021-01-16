// #region imports
    // #region external
    import {
        chromeStorage,
    } from '../../services/utilities';
    // #endregion external


    // #region internal
    import Recorder from './Recorder';
    // #endregion internal
// #endregion imports



// #region module
chrome.tabs.onActivated.addListener(async (
    {
        tabId,
    },
) => {
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

    chrome.tabs.sendMessage(
        tabId,
        {
            type: 'START_RECORD',
        },
    );

    // chrome.tabs.get(tabId, (data) => {
    //     // data.url
    //     console.log('data', data);
    // });
});



const uploadRecorded = async (
    data: any,
) => {
    // create graphql client
    // upload data
}


let recorder: Recorder | null;

const onMessage = async (
    message: any,
    sender: chrome.runtime.MessageSender,
) => {
    try {
        const {
            type,
            data,
        } = message;

        const tabID = sender.tab.id;

        switch (type) {
            case 'RECORDING':
                if (!recorder) {
                    return;
                }
                recorder.record({
                    focusedAt: Date.now(),
                    url: '',
                    data,
                });
                break;
            case 'INITIALIZE':
                recorder = new Recorder();
                break;
            case 'FOCUS':
                if (!recorder) {
                    return;
                }
                recorder.record(data);
                break;
            case 'END':
                {
                    if (!recorder) {
                        return;
                    }
                    recorder.end();
                    const recorded = recorder.extract();
                    uploadRecorded(recorded);
                    recorder = null;
                    break;
                }

            default:
                const response = {
                    status: false,
                };
                chrome.tabs.sendMessage(
                    tabID,
                    { message: { ...response } },
                );
                return;
        }
    } catch (error) {
        console.log('error', error);

        return;
    }
}


const backgroundMain = () => {
    chrome.runtime.onMessage.addListener(onMessage);
}


backgroundMain();
// #endregion module
