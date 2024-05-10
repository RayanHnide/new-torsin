const INITIAL_STATE = {
    profilelist: [],
    loading: false,
};

const ProfileReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_PROFILE_LIST":
            return {
                ...state,
                loading: true,
            };
        case "SET_PROFILE_LIST":
            return {
                ...state,
                loading: false,
                profilelist: action.payload,
            };
        default:
            return state;
    }
};

export default ProfileReducers;