import decode from "jwt-decode";
import { Base64 } from "js-base64";
import { setAuthorization } from "./api";

export const encodeData = (payload) => {
    try {
        let dataString = Base64.btoa(encodeURI(JSON.stringify(payload)));
        return dataString;
    } catch (error) {
        return null;
    }
};

export const decodeData = (token) => {
    try {
        let payload = JSON.parse(decodeURI(Base64.atob(token)));
        return payload;
    } catch (error) {
        return null;
    }
};


export function login(token, appId = "") {
    localStorage.setItem("accessToken", token);
    setAuthorization();
    return true;
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("fcmToken");
    setAuthorization();
    window.location.href = `${window.location.origin}/`;
    return true;
}


export function isAuth() {
    try {
        const tokenChecked = localStorage.getItem("accessToken");
        if (tokenChecked) {
            return tokenChecked;
        }
        return false;
    } catch (err) {
        return false;
    }
}