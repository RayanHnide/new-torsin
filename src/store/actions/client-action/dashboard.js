import API from '../../../helpers/api/index';

export function getProposalTalentDetails(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROPOSAL_TALENT_DETAILS' });
        API.apiGet('getTalentProposalJob', `?jobId=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PROPOSAL_TALENT_DETAILS`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PROPOSAL_TALENT_DETAILS`, payload: [] });
            });
    };
}

export function getProposedJobs() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PROPOSED_JOB' });
        API.apiGet('getProposalJob')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PROPOSED_JOB`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PROPOSED_JOB`, payload: [] });
            });
    };
}

export function getTopRatedTalents() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_TOP_RATED_TALENTS' });
        API.apiGet('topRatedTalents')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_TOP_RATED_TALENTS`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_TOP_RATED_TALENTS`, payload: [] });
            });
    };
}

export function searchTopRatedTalents(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_SEARCH_TOP_RATED_TALENTS' });
        API.apiGet('topRatedTalents', `?skill=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_SEARCH_TOP_RATED_TALENTS`, payload: response.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_SEARCH_TOP_RATED_TALENTS`, payload: [] });
            });
    };
}