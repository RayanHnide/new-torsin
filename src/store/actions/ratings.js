import API from "../../helpers/api";

export function getTalentRating() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_RATING' });
        API.apiGet('getRating')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_RATING`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_RATING`, payload: [] });
            });
    };
}