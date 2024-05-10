const INITIAL_STATE = {
    loading: false,
    cardDetails: [],
};

const PaymentReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_CARD_DETAILS":
            return {
                ...state,
                loading: true,
            };
        case "SET_CARD_DETAILS":
            return {
                ...state,
                loading: false,
                cardDetails: action.payload,
            };
        default:
            return state;
    }
};

export default PaymentReducers;