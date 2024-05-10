const INITIAL_STATE = {
    loading: false,
    proposalStatus: [],
};

const ProposalReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_PROPOSAL_STATUS":
            return {
                ...state,
                loading: true,
            };
        case "SET_PROPOSAL_STATUS":
            return {
                ...state,
                loading: false,
                proposalStatus: action.payload,
            };
        default:
            return state;
    }
};

export default ProposalReducers;