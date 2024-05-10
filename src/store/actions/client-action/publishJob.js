import API from "../../../helpers/api/index";

export function getAdminServices(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ADMIN_SERVICES' });
        API.apiGet('getAdminServices', `?serviceName=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ADMIN_SERVICES`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ADMIN_SERVICES`, payload: [] });
            })
    };
}

export function getAllServices() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ALL_SERVICES' });
        API.apiGet('getAdminServices')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ALL_SERVICES`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ALL_SERVICES`, payload: [] });
            })
    };
}

export function getPublishedJobs() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PUBLISHED_JOBS' });
        API.apiGet('getPublishedJobs')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PUBLISHED_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PUBLISHED_JOBS`, payload: [] });
            })
    }
}

export function getActiveJobs() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ACTIVE_JOBS' });
        API.apiGet('getActiveJob')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ACTIVE_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ACTIVE_JOBS`, payload: [] });
            })
    }
}

export function getPastJobs() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_PAST_JOBS' });
        API.apiGet('getPastJob')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_PAST_JOBS`, payload: response?.data?.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_PAST_JOBS`, payload: [] });
            })
    }
}

export function getCorresCity(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_CORRESPONDING_CITY' });
        API.apiGet('getCity', `?countryName=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: 'SET_CORRESPONDING_CITY', payload: response.data.response });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_CORRESPONDING_CITY`, payload: [] });
            });
    };
}