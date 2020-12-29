// #region module
export interface AnalyticsRecordData {
    name: string;
    value: number;
}

export interface AnalyticsRecordsCount {
    project: string;
    period: string;
    data: AnalyticsRecordData[];
}


export interface AnalyticsSize {
    project: string;
    value: number;
}
// #endregion module
