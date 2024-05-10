import API from "../../helpers/api/index";

export function getFeeds() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_FEEDS_LIST' });
        API.apiGet('getFeed')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_FEEDS_LIST`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_FEEDS_LIST`, payload: [] });
            });
    };
}
