// #region imports
    // #region libraries
    import styled from 'styled-components';
    // #endregion libraries
// #endregion imports



// #region module
export const StyledPopup: any = styled.div`
    background-color: ${(props: any) => {
        return props.theme.backgroundColorPrimary;
    }};
    color: ${(props: any) => {
        return props.theme.colorPrimary;
    }};

    height: 250px;
    width: 300px;
    text-align: left;
    user-select: none;

    a {
        color: ${(props: any) => {
            return props.theme.colorSecondary;
        }};
        text-decoration: none;
    }
`;


export const StyledPopupContainer: any = styled.div`
    height: 100%;
    width: 260px;
    display: grid;
    margin: 0 auto;
`;


export const StyledPopupContainerItemsView: any = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 60px 130px 60px;
    align-items: center;
`;


export const StyledViewOptionsButton: any = styled.div`
    text-align: center;
`;


export const StyledDeseekID: any = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 60px;
    align-items: center;
`;


export const StyledActiveDeseeking: any = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 30px 30px 60px;
    align-items: center;
    text-align: center;
`;
// #endregion module
