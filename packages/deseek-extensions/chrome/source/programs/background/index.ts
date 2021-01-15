// #region imports
    // #region internal
    import Recorder from './Recorder';
    // #endregion internal
// #endregion imports



// #region exports
const uploadRecorded = (
    data: any,
) => {

}


let recorder: Recorder | null;

const onMessage = async (
    request: any,
    sender: chrome.runtime.MessageSender,
) => {
    const {
        type,
        data,
    } = request.message;

    const tabID = sender.tab.id;

    switch (type) {
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
}


const backgroundMain = () => {
    chrome.runtime.onMessage.addListener(onMessage);
}


backgroundMain();

// #endregion exports
