import API from "../../helpers/api/index";

export function getProfileDetails(params) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_PROFILE_LIST" });
    API.apiGet("getProfileDetails")
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_PROFILE_LIST`, payload: response?.data?.response?.data });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_PROFILE_LIST`, payload: [] });
      });
  };
}

export function getSkillsDetails(params) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_SKILLS_LIST" });
    API.apiGet("getSkillsDetails")
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_SKILLS_LIST`, payload: response?.data?.response });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_SKILLS_LIST`, payload: [] });
      });
  };
}

export function getServicessDetails(params) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_SERVICES_LIST" });
    API.apiGet("getServicesDetails")
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_SERVICES_LIST`, payload: response?.data?.response });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_SERVICES_LIST`, payload: [] });
      });
  };
}

export function getAdminServices(params) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_ADMIN_SERVICES" });
    API.apiGet("getAdminServices", `?serviceName=${params}`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_ADMIN_SERVICES`, payload: response?.data?.response });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_ADMIN_SERVICES`, payload: [] });
      });
  };
}

export function getAllServices() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_ALL_SERVICES" });
    API.apiGet("getAdminServices")
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_ALL_SERVICES`, payload: response?.data?.response });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_ALL_SERVICES`, payload: [] });
      });
  };
}
////////////////
export function getAllServicesClient() {
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
//////////////////////
export function getSearchUser(params) {
  return (dispatch) => {
    dispatch({ type: "REQUEST_SEARCH_USER" });
    API.apiGet("searchUser", `?fullName=${params}`)
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_SEARCH_USER`, payload: response?.data?.response });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_SEARCH_USER`, payload: [] });
      });
  };
}

export function getUploadData() {
  return (dispatch) => {
    dispatch({ type: "REQUEST_UPLOAD_DATA" });
    API.apiGet("getUploadData")
      .then((response) => {
        if (response.data) {
          dispatch({ type: `SET_UPLOAD_DATA`, payload: response?.data?.response });
        }
      })
      .catch((err) => {
        dispatch({ type: `SET_UPLOAD_DATA`, payload: [] });
      });
  };
}
