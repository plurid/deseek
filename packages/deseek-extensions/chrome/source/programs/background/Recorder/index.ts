// #region module
export interface Record {
    focusedAt: number;
}


class Recorder {
    private records: any[] = [];
    private start: number;

    constructor() {
        this.start = Date.now();
    }

    public record() {

    }

    public end() {

    }
}
// #endregion module



// #region exports
export default Recorder;
// #endregion exports
