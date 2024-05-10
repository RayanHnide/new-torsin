const INITIAL_STATE = {
    loading: false,
    paymentCardList: [],
    accountDetails: {},
    talentPaymentList: [],
};

const PaymentMethodReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_PAYMENT_LIST":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_TALENT_PAYMENT_LIST":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_ACCOUNT_DETAILS":
            return {
                ...state,
                loading: true,
            };
        case "SET_PAYMENT_LIST":
            return {
                ...state,
                loading: false,
                paymentCardList: action.payload,
            };
        case "SET_TALENT_PAYMENT_LIST":
            return {
                ...state,
                loading: false,
                talentPaymentList: action.payload,
            };
        case "SET_ACCOUNT_DETAILS":
            return {
                ...state,
                loading: false,
                accountDetails: action.payload,
            };
        default:
            return state;
    }
};

export default PaymentMethodReducers;