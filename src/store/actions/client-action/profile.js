import API from "../../../helpers/api/index";

export function getProfileDetails(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROFILE_LIST' });
        API.apiGet('getProfileDetails')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PROFILE_LIST`, payload: response?.data?.response?.data });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PROFILE_LIST`, payload: [] });
            });
    };
} 
