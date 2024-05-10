const INITIAL_STATE = {
    allJobs: [],
    skillJobs: [],
    searchJobs: [],
    activeJobs: [],
    pastJobs: [],
    loading: false,
};

const DashboardReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_ALL_JOBS":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_SKILLS_JOBS":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_SEARCH_JOB":
            return {
                ...state,
                loading: true,
            }
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
        case "SET_SKILLS_JOBS":
            return {
                ...state,
                loading: false,
                skillJobs: action.payload,
            };
        case "SET_ALL_JOBS":
            return {
                ...state,
                loading: false,
                allJobs: action.payload,
            };
        case "SET_SEARCH_JOB":
            return {
                ...state,
                loading: false,
                searchJobs: action.payload,
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
        default:
            return state;
    }
};

export default DashboardReducers;