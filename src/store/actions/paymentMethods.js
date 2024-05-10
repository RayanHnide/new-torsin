import API from "../../helpers/api/index";

export function getPaymentsList(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PAYMENT_LIST' });
        API.apiGet('getPaymentLink')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PAYMENT_LIST`, payload: response?.data?.response?.accountDetail });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PAYMENT_LIST`, payload: [] });
            });
    };
}

export function getAccountDetails(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PAYMENT_LIST' });
        API.apiGet('getAccountDetails')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ACCOUNT_DETAILS`, payload: { ...response?.data?.response?.Details, isComplete: response?.data?.response?.isComplete } });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ACCOUNT_DETAILS`, payload: [] });
            });
    };
}

export function getTalentPaymentsList(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_TALENT_PAYMENT_LIST' });
        API.apiGet('paymentList')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_TALENT_PAYMENT_LIST`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_TALENT_PAYMENT_LIST`, payload: [] });
            });
    };
}