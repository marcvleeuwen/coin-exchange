export enum CC_TYPES {
    // Input options
    TRADE = 0,
    TICKER = 2,
    AGGREGATE_INDEX = 5,
    ORDER_BOOK_L2 = 8,
    FULL_VOLUME = 11,
    FULL_TOP_TIER_VOLUME = 21,
    OHLC_CANDLE = 24,
    TOP_OF_ORDER_BOOK = 30,

    // Status types
    'STREAMERWELCOME' = 20,
    'SUBSCRIBECOMPLETE' = 16,
    'LOADCOMPLETE' = 3,
    'UNSUBSCRIBECOMPLETE' = 17,
    'UNSUBSCRIBEALLCOMPLETE' = 18,
    'HEARTBEAT' = 999,
    'UNAUTHORIZED' = 401,
    'RATE_LIMIT_OPENING_SOCKETS_TOO_FAST' = 429,
    'TOO_MANY_SOCKETS' = 429,
    'TOO_MANY_SUBSCRIPTIONS' = 429,
    'ERROR' = 500
}

export enum CC_ACTIONS {
    SUB_ADD = 'SubAdd'
}
