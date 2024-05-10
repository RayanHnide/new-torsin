import API from "../../helpers/api";

export function getSupportList(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_SUPPORT_LIST' });
        API.apiGet('supportList')
            .then((response) => {
                if (response.data) {                    
                    dispatch({ type: `SET_SUPPORT_LIST`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_SUPPORT_LIST`, payload: [] });
            });
    };
}