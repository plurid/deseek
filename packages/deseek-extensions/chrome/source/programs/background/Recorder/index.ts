// #region module
export interface Record {
    id: string;
    focusedAt: number;
    url: string;
    data: any;
}


class Recorder {
    private records: Record[] = [];
    private startTime: number;
    private endTime: number = -1;


    constructor() {
        this.startTime = Date.now();
    }


    public record(
        data: Record,
    ) {
        this.records.push(data);
    }

    public end() {
        this.endTime =  Date.now();
    }

    public ended() {
        return this.endTime > 0;
    }

    public extract() {
        const end = this.endTime > 0
            ? this.endTime
            : Date.now();

        const data = {
            records: this.records,
            start: this.startTime,
            end,
        };

        return data;
    }
}
// #endregion module



// #region exports
export default Recorder;
// #endregion exports
