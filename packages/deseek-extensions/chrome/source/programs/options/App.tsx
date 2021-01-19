// #region imports
    // #region libraries
    import React from 'react';
    import themes from '@plurid/plurid-themes';
    // #endregion libraries


    // #region external
    import {
        chromeStorage,
    } from '../../services/utilities';

    import {
        defaultOptions,
    } from '../../data/constants';
    // #endregion external


    // #region internal
    import Context from './context';

    import Options from './containers/Options';
    // #endregion internal
// #endregion imports



// #region module
class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            theme: themes.plurid,
            setTheme: this.setTheme,
            options: {
                ...defaultOptions,
            },
        };
    }

    async componentDidMount() {
        const { theme } = await chromeStorage.get('theme');
        const { options } = await chromeStorage.get('options');

        const selectedTheme = (themes as any)[theme];

        const selectedOptions = {
            minimalFrame: options?.minimalFrame ?? defaultOptions.minimalFrame,
            neverRecordOn: options?.neverRecordOn || defaultOptions.neverRecordOn,
        };

        const { initialOptionsSet } = await chromeStorage.get('initialOptionsSet');
        if (!initialOptionsSet) {
            await chromeStorage.set({
                options: selectedTheme,
            });
            await chromeStorage.set({
                initialOptionsSet: true,
            });
        }

        if (theme) {
            this.setState({
                theme: selectedTheme,
                options: selectedOptions,
            });
        }
    }

    public render() {
        return (
            <Context.Provider value={this.state}>
                <Options />
            </Context.Provider>
        );
    }

    private setTheme = async (theme: string) => {
        this.setState({
            theme: (themes as any)[theme],
        });

        await chromeStorage.set({theme});
    }
}
// #endregion module



// #region exports
export default App;
// #endregion exports
