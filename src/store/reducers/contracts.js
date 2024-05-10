const INITIAL_STATE = {
    contractList: [],
    contractDetails: [],
    allContractsList: [],
    loading: false,
};

const ContractReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_CONTRACT_LIST":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_ALL_CONTRACT_LIST":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_CONTRACT_DETAILS":
            return {
                ...state,
                loading: true,
            }
        case "SET_CONTRACT_LIST":
            return {
                ...state,
                loading: false,
                contractList: action.payload,
            };
        case "SET_ALL_CONTRACT_LIST":
            return {
                ...state,
                loading: false,
                allContractsList: action.payload,
            };
        case "SET_CONTRACT_DETAILS":
            return {
                ...state,
                loading: false,
                contractDetails: action?.payload,
            }
        default:
            return state;
    }
};

export default ContractReducers;