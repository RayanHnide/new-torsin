const INITIAL_STATE = {
    loading: false,
    allRatings: [],
};

const RatingReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_RATING":
            return {
                ...state,
                loading: true,
            };
        case "SET_RATING":
            return {
                ...state,
                loading: false,
                allRatings: action.payload,
            };
        default:
            return state;
    }
};

export default RatingReducers;