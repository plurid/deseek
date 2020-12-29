// #region imports
    // #region libraries
    import React, {
        useRef,
        useState,
        useEffect,
        forwardRef,
        useImperativeHandle,
    } from 'react';

    import {
        Theme,
    } from '@plurid/plurid-themes';

    import {
        PluridIconReset,
        PluridIconDelete,
    } from '@plurid/plurid-icons-react';

    import {
        useThrottledCallback,
    } from '@plurid/plurid-functions-react';
    // #endregion libraries


    // #region external
    import {
        PluridTextline,
        PluridPureButton,
        PluridSpinner,
    } from '~kernel-services/styled';
    // #endregion external


    // #region internal
    import {
        StyledEntityView,
        StyledEntityViewTop,
        StyledEntityFilterLine,
        StyledEntityFilterCancel,
        StyledTopButtons,
        StyledEntityListContainer,
        StyledEntityList,
        StyledEntityListItem,
        StyledActionButton,
        StyledNoRows,
    } from './styled';
    // #endregion internal
// #endregion imports



// #region module
export interface EntityViewProperties {
    // #region required
        // #region values
        generalTheme: Theme;
        interactionTheme: Theme;

        rowsHeader: JSX.Element;
        rowTemplate: string;
        rows: JSX.Element[];
        noRows: string;
        // #endregion values

        // #region methods
        // #endregion methods
    // #endregion required

    // #region optional
        // #region values
        entities?: any[];
        actionButtonText?: string;
        loading?: number;
        // #endregion values

        // #region methods
        actionButtonClick?: () => void;
        filterUpdate?: (
            value: any,
        ) => void;
        refresh?: () => void;

        actionScrollBottom?: (
            entities: any[],
        ) => void;
        // #endregion methods
    // #endregion optional
}

export interface EntityViewRefAttributes {
    resetFilterValue: () => void;
}

export type EntityViewType = EntityViewProperties & React.RefAttributes<EntityViewRefAttributes>;

const EntityView: React.ForwardRefExoticComponent<EntityViewType> = forwardRef((
    properties,
    reference,
) => {
    // #region properties
    const {
        // #region required
            // #region values
            generalTheme,
            interactionTheme,

            rowsHeader,
            rowTemplate,
            rows,
            noRows,
            // #endregion values

            // #region methods
            // #endregion methods
        // #endregion required

        // #region optional
            // #region values.
            entities,
            actionButtonText,
            loading,
            // #endregion values

            // #region methods
            actionButtonClick,
            filterUpdate,
            refresh,
            actionScrollBottom,
            // #endregion methods
        // #endregion optional
    } = properties;
    // #endregion properties


    // #region references
    const bottomTimeout = useRef<number | null>();
    const entityList = useRef<HTMLUListElement | null>(null);
    // #endregion references


    // #region state
    const [
        searchValue,
        setSearchValue,
    ] = useState('');
    const [
        filterLength,
        setFilterLength,
    ] = useState('SMALL');
    const [
        refreshClicked,
        setRefreshClicked,
    ] = useState(false);
    // #endregion state


    // #region handlers
    const handleScroll = useThrottledCallback(() => {
        const element = entityList.current;

        if (!element) {
            return;
        }

        const scrolledAmount = element.scrollTop + element.getBoundingClientRect().height
        const bottomReached = scrolledAmount >= element.scrollHeight;

        if (bottomReached && actionScrollBottom && entities) {
            actionScrollBottom(entities);
        }
    }, 1000);

    const clearFilterValue = () => {
        setSearchValue('');

        if (filterUpdate) {
            filterUpdate('');
        }
    }
    // #endregion handlers


    // #region effects
    useEffect(() => {
        if (refreshClicked) {
            setTimeout(() => {
                setRefreshClicked(false);
            }, 1500);
        }
    }, [
        refreshClicked,
    ]);

    /**
     * Action at Bottom of List.
     */
    useEffect(() => {
        bottomTimeout.current = setTimeout(() => {
            if (entityList.current && actionScrollBottom) {
                entityList.current.addEventListener('scroll', handleScroll);
            }
        }, 100);

        return () => {
            if (bottomTimeout.current) {
                clearTimeout(bottomTimeout.current);
            }

            if (entityList.current && actionScrollBottom) {
                entityList.current.removeEventListener('scroll', handleScroll);
            }
        }
    }, [
        entities,
    ]);

    /**
     * Filter length
     */
    useEffect(() => {
        if (searchValue.length <= 30) {
            if (filterLength !== 'SMALL') {
                setFilterLength('SMALL');
            }
        } else {
            if (filterLength !== 'LARGE') {
                setFilterLength('LARGE');
            }
        }
    }, [
        searchValue,
    ]);

    useImperativeHandle(
        reference,
        () => ({
            resetFilterValue() {
                clearFilterValue();
            }
        }),
    )
    // #endregion effects


    // #region render
    return (
        <StyledEntityView
            theme={generalTheme}
        >
            {!!loading
            && (
                <PluridSpinner
                    theme={generalTheme}
                />
            )}

            <StyledEntityViewTop>
                <StyledEntityFilterLine>
                    <PluridTextline
                        text={searchValue}
                        placeholder="filter"
                        atChange={(event) => {
                            const {
                                value,
                            } = event.target;

                            setSearchValue(value);

                            if (filterUpdate) {
                                filterUpdate(value);
                            }
                        }}
                        atKeyDown={(event) => {
                            if (event.key === 'Escape') {
                                clearFilterValue();
                            }
                        }}
                        theme={interactionTheme}
                        spellCheck={false}
                        autoCapitalize="false"
                        autoComplete="false"
                        autoCorrect="false"
                        level={2}
                        style={{
                            width: filterLength === 'SMALL' ? '300px' : '600px',
                            paddingRight: '2rem',
                        }}
                    />

                    {searchValue && (
                        <StyledEntityFilterCancel
                            filterLength={filterLength}
                        >
                            <PluridIconDelete
                                atClick={() => {
                                    clearFilterValue();
                                }}
                            />
                        </StyledEntityFilterCancel>
                    )}
                </StyledEntityFilterLine>

                <StyledTopButtons>
                    {refresh
                    && !refreshClicked
                    && (
                        <PluridIconReset
                            atClick={() => {
                                setRefreshClicked(true);
                                refresh();
                            }}
                            theme={generalTheme}
                        />
                    )}
                </StyledTopButtons>
            </StyledEntityViewTop>

            {rows.length === 0 && (
                <StyledNoRows>
                    {noRows}
                </StyledNoRows>
            )}

            {rows.length !== 0 && (
                <StyledEntityListContainer
                    theme={generalTheme}
                >
                    <StyledEntityList
                        theme={generalTheme}
                        header={true}
                    >
                        <StyledEntityListItem
                            rowTemplate={rowTemplate}
                        >
                            {rowsHeader}
                        </StyledEntityListItem>
                    </StyledEntityList>

                    <StyledEntityList
                        theme={generalTheme}
                        ref={entityList}
                        loading={loading}
                    >
                        {rows.map(row => {
                            return (
                                <StyledEntityListItem
                                    key={Math.random() + ''}
                                    rowTemplate={rowTemplate}
                                >
                                    {row}
                                </StyledEntityListItem>
                            );
                        })}
                    </StyledEntityList>
                </StyledEntityListContainer>
            )}

            {actionButtonText && (
                <StyledActionButton>
                    <PluridPureButton
                        text={actionButtonText}
                        atClick={() => actionButtonClick
                            ? actionButtonClick() : undefined
                        }
                        theme={interactionTheme}
                        level={2}
                    />
                </StyledActionButton>
            )}
        </StyledEntityView>
    );
    // #endregion render
});
// #endregion module



// #region exports
export default EntityView;
// #endregion exports
