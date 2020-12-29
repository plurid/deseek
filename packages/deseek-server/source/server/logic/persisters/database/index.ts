// #region imports
    // #region external
    import {
        databaseType,
    } from '~server/data/constants';

    import {
        Database as IDatabase,
        DatabaseType,
        DatabasePagination,
        DatabaseAggregator,
    } from '~server/data/interfaces';
    // #endregion external


    // #region internal
    import amazonDatabase from './amazon';
    import googleDatabase from './google';
    import mongoDatabase from './mongo';
    // #endregion internal
// #endregion imports



// #region module
class Database implements IDatabase {
    private type: DatabaseType;

    constructor(
        type: DatabaseType,
    ) {
        this.type = type;
    }

    public async initialize() {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.initialize();
            case databaseType.google:
                return googleDatabase.initialize();
            case databaseType.mongo:
                return mongoDatabase.initialize();
            default:
                return false;
        }
    }

    public async get(
        entity: string,
        id: string,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.get(
                    entity,
                    id,
                );
            case databaseType.google:
                return googleDatabase.get(
                    entity,
                    id,
                );
            case databaseType.mongo:
                return mongoDatabase.get(
                    entity,
                    id,
                );
            default:
                return;
        }
    }

    public async getAll(
        entity: string,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.getAll(
                    entity,
                );
            case databaseType.google:
                return googleDatabase.getAll(
                    entity,
                );
            case databaseType.mongo:
                return mongoDatabase.getAll(
                    entity,
                );
            default:
                return [];
        }
    }

    public async query(
        entity: string,
        field: string,
        value: string,
        pagination?: DatabasePagination,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.query(
                    entity,
                    field,
                    value,
                    pagination,
                );
            case databaseType.google:
                return googleDatabase.query(
                    entity,
                    field,
                    value,
                    pagination,
                );
            case databaseType.mongo:
                return mongoDatabase.query(
                    entity,
                    field,
                    value,
                    pagination,
                );
            default:
                return [];
        }
    }

    public async size(
        entity: string,
        filter: any,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.size(
                    entity,
                    filter,
                );
            case databaseType.google:
                return googleDatabase.size(
                    entity,
                    filter,
                );
            case databaseType.mongo:
                return mongoDatabase.size(
                    entity,
                    filter,
                );
            default:
                return;
        }
    }

    public async aggregate(
        entity: string,
        pipeline: DatabaseAggregator[],
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.aggregate(
                    entity,
                    pipeline,
                );
            case databaseType.google:
                return googleDatabase.aggregate(
                    entity,
                    pipeline,
                );
            case databaseType.mongo:
                return mongoDatabase.aggregate(
                    entity,
                    pipeline,
                );
            default:
                return;
        }
    }

    public async store(
        entity: string,
        id: string,
        data: any,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.store(
                    entity,
                    id,
                    data,
                );
            case databaseType.google:
                return googleDatabase.store(
                    entity,
                    id,
                    data,
                );
            case databaseType.mongo:
                return mongoDatabase.store(
                    entity,
                    id,
                    data,
                );
            default:
                return;
        }
    }

    public async storeBatch(
        entity: string,
        data: any,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.storeBatch(
                    entity,
                    data,
                );
            case databaseType.google:
                return googleDatabase.storeBatch(
                    entity,
                    data,
                );
            case databaseType.mongo:
                return mongoDatabase.storeBatch(
                    entity,
                    data,
                );
            default:
                return;
        }
    }

    public async update(
        entity: string,
        id: string,
        field: string,
        value: any,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.update(
                    entity,
                    id,
                    field,
                    value,
                );
            case databaseType.google:
                return googleDatabase.update(
                    entity,
                    id,
                    field,
                    value,
                );
            case databaseType.mongo:
                return mongoDatabase.update(
                    entity,
                    id,
                    field,
                    value,
                );
            default:
                return;
        }
    }

    public async obliterate(
        entity: string,
        filter: Record<string, any>,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.obliterate(
                    entity,
                    filter,
                );
            case databaseType.google:
                return googleDatabase.obliterate(
                    entity,
                    filter,
                );
            case databaseType.mongo:
                return mongoDatabase.obliterate(
                    entity,
                    filter,
                );
            default:
                return;
        }
    }

    public async obliterateAll(
        entity: string,
        filter?: Record<string, any>,
    ) {
        switch (this.type) {
            case databaseType.amazon:
                return amazonDatabase.obliterateAll(
                    entity,
                    filter,
                );
            case databaseType.google:
                return googleDatabase.obliterateAll(
                    entity,
                    filter,
                );
            case databaseType.mongo:
                return mongoDatabase.obliterateAll(
                    entity,
                    filter,
                );
            default:
                return;
        }
    }
}
// #endregion module



// #region exports
export default Database;
// #endregion exports
