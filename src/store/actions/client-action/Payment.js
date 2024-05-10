import API from "../../../helpers/api/index";

export function getCardDetails() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_CARD_DETAILS' });
        API.apiGet('addCard')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_CARD_DETAILS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_CARD_DETAILS`, payload: [] });
            });
    };
}