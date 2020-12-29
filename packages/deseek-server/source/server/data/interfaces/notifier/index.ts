// #region imports
    import {
        LoggedRecord,
    } from '../general';
// #endregion imports



// #region module
export type Notifier =
    | NotifierAPI
    | NotifierEmail;


export type ClientNotifier =
    | ClientNotifierAPI
    | ClientNotifierEmail;


export interface NotifierBase {
    id: string;
    name: string;
    notifyOn: NotificationType[];
}

export interface NotifierAPI extends NotifierBase {
    type: NotifierTypeAPI;
    data: StoredNotifierAPIData;
}

export interface ClientNotifierAPI extends NotifierBase {
    type: NotifierTypeAPI;
    data: ClientNotifierAPIData;
}

export interface NotifierEmail extends NotifierBase {
    type: NotifierTypeEmail;
    data: StoredNotifierEmailData;
}

export interface ClientNotifierEmail extends NotifierBase {
    type: NotifierTypeEmail;
    data: ClientNotifierEmailData;
}


export type NotifierTypeAPI = 'api';
export type NotifierTypeEmail = 'email';
export type NotifierType =
    | NotifierTypeAPI
    | NotifierTypeEmail;


export interface NotifierEmailBase {
    notifyTo: string[];
}

export interface StoredNotifierEmailData extends NotifierEmailBase {
    authentication: NotifierEmailAuthentication;
}

export interface ClientNotifierEmailData extends NotifierEmailBase {
    authentication: ClientNotifierEmailAuthentication;
}

export type ClientNotifierEmailAuthentication = Omit<NotifierEmailAuthentication, 'password'>;

export interface NotifierEmailAuthentication {
    host: string;
    port: number;
    secure: boolean;
    username: string;
    password: string;
    sender: string;
}


export interface NotifierAPIBaseData {
    endpoint: string;
}

export interface StoredNotifierAPIData extends NotifierAPIBaseData {
    secret: string;
}

export interface ClientNotifierAPIData extends NotifierAPIBaseData {
    startsWith: string;
}


export interface Notification {
    status: 'SUCCESS' | 'ERROR';
    kind: 'REGISTER' | 'DEREGISTER';
    entity:
        | 'PROJECT';
    data: string;
}

export type NotificationType =
    | 'ENTITY_REGISTRATION'
    | 'ENTITY_DEREGISTRATION'
    | 'RECORDED_FATAL'
    | 'RECORDED_ERROR'
    | 'RECORDED_WARN'
    | 'TEST_FAIL'
    | 'TEST_SUCCESS';

export type NotificationTypes = Record<NotificationType, NotificationType>;


export interface NotificationEventBase {
    type: 'entity' | 'record' | 'test';
}

export interface NotificationEventEntity extends NotificationEventBase {
    type: 'entity';
    data: string;
}

export interface NotificationEventRecord extends NotificationEventBase {
    type: 'record';
    data: LoggedRecord;
}

export interface NotificationEventTest extends NotificationEventBase {
    type: 'test';
    data: any;
}

export type NotificationEvent =
    | NotificationEventEntity
    | NotificationEventRecord
    | NotificationEventTest;
// #endregion module
