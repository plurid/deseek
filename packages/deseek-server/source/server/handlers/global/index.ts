// #region imports
    // #region external
    import database from '~server/services/database';
    // #endregion external
// #endregion imports



// #region module
const setup = async () => {
    try {
        await database.initialize();
    } catch (error) {
        return;
    }
}
// #endregion module



// #region exports
export default setup;
// #endregion exports
