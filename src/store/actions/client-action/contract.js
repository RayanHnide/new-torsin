import API from "../../helpers/api/index";

export function getAllContractsList() {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_ALL_CONTRACT_LIST' });
        API.apiGet('getContractList')
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_ALL_CONTRACT_LIST`, payload: response?.data?.response?.data });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_ALL_CONTRACT_LIST`, payload: [] });
            });
    };
}

export function getContractsList(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_CONTRACT_LIST' });
        API.apiGet('getContractList', `?status=${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_CONTRACT_LIST`, payload: response?.data?.response?.data });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_CONTRACT_LIST`, payload: [] });
            });
    };
}

export function getContractDetails(params) {
    return (dispatch) => {
        dispatch({ type: 'REQUEST_CONTRACT_DETAILS' });
        API.apiGet('getContractDetail', `/${params}`)
            .then((response) => {
                if (response.data) {
                    dispatch({ type: `SET_CONTRACT_DETAILS`, payload: response?.data?.response?.data });
                }
            })
            .catch((err) => {
                dispatch({ type: `SET_CONTRACT_DETAILS`, payload: [] });
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
