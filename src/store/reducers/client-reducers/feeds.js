const INITIAL_STATE = {
    loading: false,
    feedsList: [],
};

const FeedsReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_FEEDS_LIST":
            return {
                ...state,
                loading: true,
            };
        case "SET_FEEDS_LIST":
            return {
                ...state,
                loading: false,
                feedsList: action.payload,
            };
        default:
            return state;
    }
};

export default FeedsReducers;