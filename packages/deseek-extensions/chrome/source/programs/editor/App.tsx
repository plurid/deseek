// #region imports
    // #region libraries
    import React from 'react';
    import themes from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        chromeStorage,
    } from '../../services/utilities';
    // #endregion external


    // #region internal
    import Context from './context';

    import Editor from './containers/Editor';
    // #endregion internal
// #endregion imports



// #region module
class App extends React.Component {
    constructor(props: any) {
        super(props);

        this.state = {
            theme: themes.plurid,
        };
    }

    async componentDidMount() {
        const { theme } = await chromeStorage.get('theme');
        if (theme) {
            this.setState({
                theme: (themes as any)[theme],
            });
        }
    }

    public render() {
        return (
            <Context.Provider
                value={this.state}
            >
                <Editor />
            </Context.Provider>
        );
    }
}
// #endregion module



// #region exports
export default App;
// #endregion exports
