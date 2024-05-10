const INITIAL_STATE = {
    loading: false,
    talentDetails: [],
};

const TalentReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_TALENT_DETAILS":
            return {
                ...state,
                loading: true,
            };
        case "SET_TALENT_DETAILS":
            return {
                ...state,
                loading: false,
                talentDetails: action.payload,
            };
        default:
            return state;
    }
};

export default TalentReducers;