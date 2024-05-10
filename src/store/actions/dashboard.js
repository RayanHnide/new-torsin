import API from "../../helpers/api/index";

export function getSkillsJobs(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_SKILLS_JOBS' });
        API.apiGet('jobCorrSkills')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_SKILLS_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_SKILLS_JOBS`, payload: [] });
            });
    };
}

export function getAllJobs(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ALL_JOBS' });
        API.apiGet('allJobs')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ALL_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ALL_JOBS`, payload: [] });
            });
    };
}

export function getActiveJobs(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ACTIVE_JOBS' });
        API.apiGet('getActiveJobs')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ACTIVE_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ACTIVE_JOBS`, payload: [] });
            });
    };
}

export function getPastJobs(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PAST_JOBS' });
        API.apiGet('getPastJobs')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PAST_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PAST_JOBS`, payload: [] });
            });
    };
}

export function getSearchJobs(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_SEARCH_JOB' });
        API.apiGet('searchJob', `?search=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_SEARCH_JOB`, payload: response.data });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_SEARCH_JOB`, payload: [] });
            });
    };
}
