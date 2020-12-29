// #region imports
    // #region libraries
    import {
        DelogInputRecord,
    } from '@plurid/delog';
    // #endregion libraries


    // #region external
    import {
        Notifier,
    } from '../notifier';
    // #endregion external
// #endregion imports



// #region module
export interface Token {
    id: string;
    name: string;
    value: string;
    ownedBy: string;
    startsWith: string;
}

export type ClientToken = Omit<Token, 'value' | 'ownedBy'>;


export interface Project {
    id: string;
    name: string;
    ownedBy: string;

    // generatedBy: string;
    // generatedAt: number;
    // sharedWith: ProjectSharer[];
}

export type ProjectEntityAccess =
    | 'CAN_READ'
    | 'CAN_WRITE';

export interface ProjectSharer {
    id: string;
    access: {
    };
}


export interface Space {
    id: string;
    name: string;
    project: string;
    ownedBy: string;
}


export type CodeProvider =
    | CodeProviderGithub
    | CodeProviderBitbucket;


export type CodeProviderGithub = 'github';
export type CodeProviderBitbucket = 'bitbucket';

export interface CodeProviderData {
    github: CodeProviderGithub;
    bitbucket: CodeProviderBitbucket;
}



export interface Provider {
    id: string;
    token: string;
    type: CodeProvider;
    name: string;
    ownedBy: string;
}

export type ClientProvider = Omit<Provider, 'token'>;


export interface Repository {
    id: string;
    name: string;
    isPrivate: boolean;
    providerID: string;
    ownedBy: string;
}


export interface Format {
    id: string;
    identifier: string;
    transform: string;
    ownedBy: string;
}


export interface Tester {
    id: string;
    name: string;
    project: string;
    suite: string;
    scenario: string;
    configuration: string;
    ownedBy: string;
}


export type Record = DelogInputRecord & {
    id: string;
    text: string;
    ownedBy: string;
}


export type LoggedRecord = Record & {
    log: string;
}


export interface Test {
    id: string;
    time: number;
    status: boolean;
    tester: string;
    ownedBy: string;
    phasesStatus: number[];
}


export interface DelogOwner {
    id: string;
    tokens: Token[];
    projects: Project[];
    spaces: Space[];
    providers: Provider[];
    repositories: Repository[];
    formats: Format[];
    notifiers: any[];
    testers: Tester[];
}


export interface OwnerToken {
    token: string;
}



export interface Commit {
    id: string;
    added: string[];
    removed: string[];
    modified: string[];
}
// #endregion module
