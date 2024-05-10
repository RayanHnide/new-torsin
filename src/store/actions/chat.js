import API from "../../helpers/api";

export function getAcceptedProposalJobs() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROPOSED_ALL_JOB' });
        API.apiGet('acceptProposalJobs')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PROPOSED_ALL_JOB`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PROPOSED_ALL_JOB`, payload: [] });
            });
    };
}