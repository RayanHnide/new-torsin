import axios from './instance';
import * as auth from '../auth';
import apiKeys from './apiKeys';

const getUrlByKey = (key) => {
    return apiKeys[key];
};

class API {
    // eslint-disable-next-line lines-around-comment
    /**
     * auth2 login api
     * @param {string} url String
     * @param {object} payload Object
     * @param {object} action Object e.g {type: 'AUTH', dispatch: function(){} }
     * @returns {Promise<void>} void
     */

    static apiGet = async (key, args) => {
        if (typeof args === 'string') {
            return axios.get(getUrlByKey(key) + args, {
                withCredentials: false,
            });
        }
        return axios.get(getUrlByKey(key), {
            data: args,
            withCredentials: false,
        });
    };

    static apiGetByKey = async (key, args, query) => {
        if (typeof args === 'string') {
            return axios.get(getUrlByKey(key) + args, {
                withCredentials: false,
            });
        }
        return axios.get(`${getUrlByKey(key)}/query?${query}`, {
            data: args,
            withCredentials: false,
        });
    };

    static apiPost = async (key, args, headers) => {
        return axios.post(getUrlByKey(key), args, headers);
    };

    static apiPut = async (key, args, headers) => {
        return axios.put(getUrlByKey(key), args, headers);
    };

    static apiPatch = async (key, args, headers) => {
        return axios.patch(key, args, headers);
    };

}

export default API;

axios.interceptors.request.use(
    (configs) => {
        // const loading = true;
        return configs;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        // const loading = false;
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // eslint-disable-next-line no-console
            auth.logout();
        }
        return Promise.reject(error);
    }
);


export const setAuthorization = () => {
    // to consider major cookies security
    // axios.defaults.withCredentials = false;
    axios.defaults.headers.common.Authorization =
        process.browser && localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';
    // axios.defaults.headers.common.Platform = `Torsin`;
    // axios.defaults.headers.common[`Version`] = '1.0.0';
    // axios.defaults.headers.common.version = 'v1'; // API VERSION
};

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgzMDAzOTA4LCJpYXQiOjE2ODI1NzE5MDgsImp0aSI6IjE4NjVmZGIxODQxYzRjNDNiZGI5YjE3YTkzNzAxMzA1IiwidXNlcl9pZCI6MTN9.O2R7MUoda1EHNK2vbw4vFNYfw4UYxM8Nr5guHkVKLjM
setAuthorization();