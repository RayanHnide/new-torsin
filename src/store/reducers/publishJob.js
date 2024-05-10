const INITIAL_STATE = {
    loading: false,
    adminServices: [],
    allServices: [],
    publishedJobs: [],
    activeJobs: [],
    pastJobs: [],
    corresCity: []
};

const PublishJobReducers = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case "REQUEST_ADMIN_SERVICES":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_ALL_SERVICES":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_PUBLISHED_JOBS":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_ACTIVE_JOBS":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_PAST_JOBS":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_CORRESPONDING_CITY":
            return {
                ...state,
                loading: true,
            };
        case "SET_ADMIN_SERVICES":
            return {
                ...state,
                loading: false,
                adminServices: action.payload,
            };
        case "SET_ALL_SERVICES":
            return {
                ...state,
                loading: false,
                allServices: action.payload,
            };
        case "SET_PUBLISHED_JOBS":
            return {
                ...state,
                loading: false,
                publishedJobs: action.payload,
            };
        case "SET_ACTIVE_JOBS":
            return {
                ...state,
                loading: false,
                activeJobs: action.payload,
            };
        case "SET_PAST_JOBS":
            return {
                ...state,
                loading: false,
                pastJobs: action.payload,
            };
        case "SET_CORRESPONDING_CITY":
            return {
                ...state,
                loading: false,
                corresCity: action.payload,
            };
        default:
            return state;
    }
};

export default PublishJobReducers;