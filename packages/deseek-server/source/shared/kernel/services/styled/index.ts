// #region imports
    // #region libraries
    import styled from 'styled-components';

    import {
        universal,
    } from '@plurid/plurid-ui-components-react';
    // #endregion libraries
// #endregion imports



// #region module
const {
    buttons: {
        PureButton: PluridPureButton,
        LinkButton: PluridLinkButton,
        RefreshButton: PluridRefreshButton,
    },
    inputs: {
        Textline: PluridTextline,
        Dropdown: PluridDropdown,
        InputLine: PluridInputLine,
        InputSwitch: PluridInputSwitch,
        InputBox: PluridInputBox,
    },
    markers: {
        Spinner: PluridSpinner,
    },
    varia: {
        CopyableLine: PluridCopyableLine,
        TextItem: PluridTextItem,
    },
} = universal;

export {
    PluridPureButton,
    PluridLinkButton,
    PluridRefreshButton,

    PluridTextline,
    PluridDropdown,
    PluridInputLine,
    PluridInputSwitch,
    PluridInputBox,

    PluridSpinner,

    PluridCopyableLine,
    PluridTextItem,
};


export const StyledH1 = styled.h1`
    margin-bottom: 2rem;
`;


export const StyledPluridTextline = styled(PluridTextline)`
    width: 350px;
`;


export const StyledPluridPureButton = styled(PluridPureButton)`
    margin: 1rem auto;
    margin-top: 4rem;
    width: 250px;
`;


export const StyledPluridLinkButton = styled(PluridLinkButton)`
    display: grid;
    place-content: center;
    margin: 30px auto;
`;
// #endregion module
