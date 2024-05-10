const INITIAL_STATE = {
    loading: false,
    proposedJobs: [],
    proposedJobsDetails: [],
    topRatedTalents: [],
    searchTalentList: []
};

const DashboardReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_PROPOSAL_TALENT_DETAILS":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_PROPOSED_JOB":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_TOP_RATED_TALENTS":
            return {
                ...state,
                loading: true,
            }
        case "REQUEST_SEARCH_TOP_RATED_TALENTS":
            return {
                ...state,
                loading: true,
            }
        case "SET_PROPOSAL_TALENT_DETAILS":
            return {
                ...state,
                loading: false,
                proposedJobsDetails: action.payload,
            };
        case "SET_PROPOSED_JOB":
            return {
                ...state,
                loading: false,
                proposedJobs: action.payload,
            };
        case "SET_TOP_RATED_TALENTS":
            return {
                ...state,
                loading: false,
                topRatedTalents: action.payload,
            };
        case "SET_SEARCH_TOP_RATED_TALENTS":
            return {
                ...state,
                loading: false,
                searchTalentList: action.payload,
            };
        default:
            return state;
    }
};

export default DashboardReducers;