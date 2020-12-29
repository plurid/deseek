// #region module
/**
 * A filter can be a string which can globally/generally match with something about a log
 * (a substring, a timestamp, etc), or can be a semi-structured query, as in `key: value` pairs,
 * comma-separated.
 *
 * @param filter
 */
const parseFilter = (
    filter: string | undefined,
) => {
    if (!filter) {
        return;
    }

    const groups = filter.split(',');

    if (groups.length === 0) {
        return filter;
    }

    if (groups.length === 1) {
        // ensure that it is a string or a query search

        const split = groups[0].split(':');

        if (split.length > 2) {
            return filter;
        }

        const key = split[0];
        const value = split[1];

        if (!key && !value) {
            return filter;
        }
    }

    const projects = [];
    const spaces = [];
    const levels = [];
    const logs = [];

    for (const group of groups) {
        const split = group.split(':');

        const key = split[0];
        const value = split[1];

        if (key && value) {
            const cleanKey = key.trim().toLowerCase();
            const cleanValue = value.trim().toLowerCase();

            switch (cleanKey) {
                case 'project':
                    projects.push(cleanValue);
                    break;
                case 'space':
                    spaces.push(cleanValue);
                    break;
                case 'level':
                    levels.push(cleanValue);
                    break;
                case 'log':
                    logs.push(cleanValue);
                    break;
            }
        }
    }

    if (
        projects.length === 0
        && spaces.length === 0
        && levels.length === 0
        && logs.length === 0
    ) {
        return filter;
    }

    const pairs = {
        projects,
        spaces,
        levels,
        logs,
    };

    return pairs;
}
// #endregion module



// #region exports
export {
    parseFilter,
};
// #endregion exports
