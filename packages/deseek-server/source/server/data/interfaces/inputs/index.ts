// #region imports
    // #region external
    import {
        CodeProvider,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
export interface InputOf<T> {
    input: T;
}


export interface InputValueString {
    value: string;
}


export interface InputQuery {
    count?: number;
    start?: string;
}


export interface InputGenerateToken {
    name: string;
}


export interface InputGenerateSpace {
    name: string;
    project: string;
}


export interface InputAddProvider {
    type: CodeProvider;
    token: string;
    name: string;
}


export interface InputLinkRepository {
    providerID: string;
    nameWithOwner: string;
}


export interface InputGenerateFormat {
    identifier: string;
    transform: string;
}


export interface InputGenerateNotifier {
    name: string;
    notifyOn: string[];
    type: string;
    data: string;
}


export interface InputGenerateTester {
    id?: string;
    name: string;
    project: string;
    suite: string;
    scenario: string;
    configuration: string;
}


export interface InputObliterateRecords {
    filter?: string;
    ids?: string[];
}


export interface InputObliterateTests {
    filter?: string;
    ids?: string[];
}



export interface InputGetAnalyticsLastPeriod {
    project: string;
    period: string;
    type: string;
}

export interface InputGetAnalyticsLastPeriodData {
    project: string;
    period: string;
}


export interface InputGetAnalyticsSize {
    project: string;
}


export interface InputGetCode {
    repository: InputGetCodeRepository;
    context: InputGetCodeContext;
}

export interface InputGetCodeRepository {
    provider: string;
    name: string;
    branch: string;
    commit: string;
}

export interface InputGetCodeContext {
    file: string;
    line: number;
    column: number;
}


export interface InputVerifyUniqueID {
    type: string;
    value: string;
}
// #endregion module
