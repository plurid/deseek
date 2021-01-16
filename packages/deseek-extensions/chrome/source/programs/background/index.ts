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

        switch (type) {
            case 'INITIALIZE':
                console.log('INITIALIZE');
                recorder = new Recorder();
                break;
            case 'RECORDING':
                if (!recorder) {
                    return;
                }
                console.log('RECORDING', data);
                recorder.record({
                    id: Math.random() + '',
                    focusedAt: Date.now(),
                    url: Math.random() + '',
                    data,
                });
                break;
            case 'STOP':
                {
                    if (!recorder) {
                        return;
                    }
                    const recorded = recorder.extract();
                    console.log('STOP', recorded);
                    break;
                }
            case 'EXTRACT':
                {
                    if (!recorder) {
                        return;
                    }
                    const recorded = recorder.extract();
                    console.log('EXTRACT', recorded);
                    const tabID = sender.tab?.id;
                    console.log('EXTRACT tabID', tabID);

                    chrome.tabs.sendMessage(
                        tabID,
                        {
                            recorded,
                        },
                    );
                    break;
                }
            case 'FINISH':
                {
                    if (!recorder) {
                        return;
                    }
                    recorder.end();
                    const recorded = recorder.extract();
                    console.log('FINISH', recorded);
                    uploadRecorded(recorded);
                    recorder = null;
                    break;
                }
            case 'CANCEL':
                recorder = null;
                break;

            default:
                {
                    const tabID = sender.tab?.id;

                    const response = {
                        status: false,
                    };
                    chrome.tabs.sendMessage(
                        tabID,
                        { message: { ...response } },
                    );
                    return;
                }
        }
    } catch (error) {
        return;
    }
}


const backgroundMain = () => {
    chrome.runtime.onMessage.addListener(onMessage);
}


backgroundMain();
// #endregion module
