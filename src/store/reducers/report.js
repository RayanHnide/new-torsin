const INITIAL_STATE = {
    loading: false,
    supportList: [],
};

const ReportReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_SUPPORT_LIST":
            return {
                ...state,
                loading: true,
            };
        case "SET_SUPPORT_LIST":
            return {
                ...state,
                loading: false,
                supportList: action.payload,
            };
        default:
            return state;
    }
};

export default ReportReducers;