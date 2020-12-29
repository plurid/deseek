// #region imports
    // #region libraries
    import {
        MongoClient,
        ObjectID,
    } from 'mongodb';

    import {
        calculateObjectSize,
    } from 'bson';
    // #endregion libraries


    // #region external
    import {
        Database,
        DatabaseInitialize,
        DatabaseGet,
        DatabaseGetAll,
        DatabaseQuery,
        DatabaseSize,
        DatabaseAggregate,
        DatabaseStore,
        DatabaseStoreBatch,
        DatabaseUpdate,
        DatabaseObliterate,
        DatabaseObliterateAll,
    } from '~server/data/interfaces';

    import {
        MONGO_USERNAME,
        MONGO_PASSWORD,
        MONGO_ADDRESS,
        MONGO_CONNECTION_STRING,
    } from '~server/data/constants';
    // #endregion external
// #endregion imports



// #region module
let connection: MongoClient | undefined;

const mongoNoConnectionError = 'Delog Error :: No mongo connection.';

const DATABASE = 'delog';


const createConnection = async () => {
    try {
        const uri = MONGO_CONNECTION_STRING || `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_ADDRESS}`;

        const connection = await MongoClient.connect(
            uri,
            {
                useUnifiedTopology: true,
            },
        );

        return connection;
    } catch (error) {
        return;
    }
}


const initialize: DatabaseInitialize = async () => {
    connection = await createConnection();
    return true;
}


const get: DatabaseGet = async (
    entity,
    id,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        const item = await collection.findOne({
            id,
        });

        return item;
    } catch (error) {
        return;
    }
}


const getAll: DatabaseGetAll = async (
    entity,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return [];
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        return [];
    } catch (error) {
        return [];
    }
}


const query: DatabaseQuery = async (
    entity,
    field,
    value,
    pagination,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return [];
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        const filter: any = {};
        filter[field] = value;


        if (pagination) {
            const {
                start,
                type,
            } = pagination;

            const count = pagination?.count || 20;

            if (start) {
                const item = await collection.findOne({
                    'id': start,
                });

                if (item) {
                    const lastID = new ObjectID(item._id);
                    filter['_id'] = {
                        '$lt': lastID,
                    };
                }
            }

            const sortType = type === 'last' ? -1 : 1;

            const cursor = collection
                .find(filter)
                .sort({
                    $natural: sortType,
                }).limit(count);

            const items = await cursor.toArray();

            return items;
        }


        const cursor = collection.find(filter);

        const items = await cursor.toArray();

        return items;
    } catch (error) {
        return [];
    }
}


const size: DatabaseSize = async (
    entity,
    filter,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        const cursor = collection.find(filter);

        let sizes = 0;

        await cursor.forEach(item => {
            const size = calculateObjectSize(item);
            sizes += size;
        });

        return sizes;
    } catch (error) {
        return 0;
    }
}


const aggregate: DatabaseAggregate = async (
    entity: string,
    pipeline,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        const cursor = collection.aggregate(pipeline);

        const data = await cursor.toArray();

        return data;
    } catch (error) {
        return;
    }
}


const store: DatabaseStore = async (
    entity,
    id,
    data,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return false;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        await collection.insertOne(
            data,
        );

        return true;
    } catch (error) {
        return false;
    }
}


const storeBatch: DatabaseStoreBatch = async (
    entity,
    data,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return false;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        collection.insertMany(
            data,
        );

        return;
    } catch (error) {
        return;
    }
}


const update: DatabaseUpdate = async (
    entity,
    id,
    field,
    value,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        return true;
    } catch (error) {
        return false;
    }
}


const obliterate: DatabaseObliterate = async (
    entity,
    filter,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        const deletion = await collection.deleteOne({
            ...filter,
        });

        if (deletion.deletedCount !== 1) {
            return false;
        }

        return true;
    } catch (error) {
        return false;
    }
}


const obliterateAll: DatabaseObliterateAll = async (
    entity,
    filter,
) => {
    if (!connection) {
        console.log(mongoNoConnectionError);
        return;
    }

    try {
        const database = connection.db(DATABASE);

        const collection = database.collection(entity);

        if (!filter) {
            await collection.drop();

            return;
        }

        await collection.deleteMany(filter);

        return;
    } catch (error) {
        return;
    }
}



const mongoDatabase: Database = {
    initialize,
    get,
    getAll,
    query,
    size,
    aggregate,
    store,
    storeBatch,
    update,
    obliterate,
    obliterateAll,
};
// #endregion module



// #region exports
export default mongoDatabase;
// #endregion exports
