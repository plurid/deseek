// #region module
const humanByteSize = (
    size: number,
) => {
    if (size < 1024) return size + ' B';
    const i = Math.floor(Math.log(size) / Math.log(1024));
    let num: number | string = (size / Math.pow(1024, i));
    const round = Math.round(num);

    num = round < 10
        ? num.toFixed(2)
        : round < 100
            ? num.toFixed(1)
            : round;

    return `${num} ${'KMGTPEZY'[i-1]}B`;
}
// #endregion module



// #region exports
export {
    humanByteSize,
};
// #endregion exports
