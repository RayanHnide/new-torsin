import API from "../../helpers/api/index";

export function getNotificationsList(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_NOTIFICATIONS_LIST' });
        API.apiGet('getNotification')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_NOTIFICATIONS_LIST`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_NOTIFICATIONS_LIST`, payload: [] });
            });
    };
}

export function getAdminPercentage() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ADMIN_PERCENTAGE' });
        API.apiGet('getAdminPercentage')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ADMIN_PERCENTAGE`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ADMIN_PERCENTAGE`, payload: [] });
            });
    };
}
