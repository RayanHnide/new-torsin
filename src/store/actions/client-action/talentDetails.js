import API from "../../helpers/api/index";

export function getTalentDetails(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_TALENT_DETAILS' });
        API.apiGet('talentDetails', `?skill=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_TALENT_DETAILS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_TALENT_DETAILS`, payload: [] });
            });
    };
}