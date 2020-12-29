// #region imports
    // #region libraries
    import express from 'express';
    // #endregion libraries
// #endregion imports



// #region module
export const getRoutes = (
    instance: express.Application,
) => {
    const routes = instance._router.stack           // registered routes
                    .filter((r: any) => r.route)    // take out all the middleware
                    .map((r: any) => r.route.path)  // get all the paths

    return routes;
}


export const delistenRoute = (
    routepath: string,
    instance: express.Application,
) => {
    const routes = instance._router.stack;

    routes.forEach(removeMiddlewares);
    function removeMiddlewares(
        route: any,
        i: any,
        routes: any,
    ) {
        if (route.path === routepath) {
            routes.splice(i, 1);
        }

        if (route.route) {
            route.route.stack.forEach(removeMiddlewares);
        }
    }

    return true;
}
// #endregion module
