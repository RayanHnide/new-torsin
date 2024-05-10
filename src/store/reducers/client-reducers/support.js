const INITIAL_STATE = {
    loading: false,
    supportTicketList: [],
    supportChatList: [],
};

const SupportReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_SUPPORT_TICKET_LIST":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_SUPPORT_CHAT_LIST":
            return {
                ...state,
                loading: true,
            }
        case "SET_SUPPORT_TICKET_LIST":
            return {
                ...state,
                loading: false,
                supportTicketList: action.payload,
            };
        case "SET_SUPPORT_CHAT_LIST":
            return {
                ...state,
                loading: false,
                supportChatList: action.payload,
            };
        default:
            return state;
    }
};

export default SupportReducers;