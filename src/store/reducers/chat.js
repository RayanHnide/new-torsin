const INITIAL_STATE = {
    loading: false,
    acceptedProposalJobs: [],
};

const ChatReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_PROPOSED_ALL_JOB":
            return {
                ...state,
                loading: true,
            };
        case "SET_PROPOSED_ALL_JOB":
            return {
                ...state,
                loading: false,
                acceptedProposalJobs: action.payload,
            };
        default:
            return state;
    }
};

export default ChatReducers;