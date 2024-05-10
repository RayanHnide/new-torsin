import API from "../../helpers/api";

export function getSupportTicketList(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_SUPPORT_TICKET_LIST' });
        API.apiGet('supportTicketList')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_SUPPORT_TICKET_LIST`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_SUPPORT_TICKET_LIST`, payload: [] });
            });
    };
}

export function getSupportChat(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_SUPPORT_CHAT_LIST' });
        API.apiGet('getSupportChat', `?ticketId=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_SUPPORT_CHAT_LIST`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_SUPPORT_CHAT_LIST`, payload: [] });
            });
    };
}