// #region module
export interface ActiveData {
    activeDeseeking: string;
    options: Options;
}

export interface Options {
    minimalFrame: boolean;
    neverRecordOn: string[];
}
// #endregion module
