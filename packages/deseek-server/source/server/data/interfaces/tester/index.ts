// #region imports
    // #region external
    import {
        Tester,
    } from '../general';
    // #endregion external
// #endregion imports



// #region module
export interface TesterConfigurationPhase {
    method?: string;
    text: string;
    level: number | string;
}


export interface TesterConfiguration {
    phases: TesterConfigurationPhase[];

    /**
     * The test will run after the delay has passed
     * after the first record hits the server.
     *
     * Default: `5_000` milliseconds.
     */
    startDelay?: number;

    /**
     * After the `startDelay`, if the test cannot yet start,
     * it will retry to start.
     *
     * Default: equal to `startDelay`.
     */
    retryDelay?: number;

    /**
     * The test will timeout after the time passed after the `startDelay`.
     *
     * Default: `60_000` milliseconds.
     */
    timeout?: number;
}


export type RequiredTesterConfiguration = Required<TesterConfiguration>;


export interface TesterCall {
    contact: number;
    data: Tester;
    configuration: RequiredTesterConfiguration;
    inHandle?: boolean;
}
// #endregion module
