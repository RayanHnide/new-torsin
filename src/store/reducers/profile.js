const INITIAL_STATE = {
  profilelist: [],
  skillsList: [],
  servicesList: [],
  adminServices: [],
  allServices: [],
  searchUser: [],
  uploadData: [],
  loading: false,
};

const ProfileReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "REQUEST_PROFILE_LIST":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_SKILLS_LIST":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_SERVICES_LIST":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_ADMIN_SERVICES":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_ALL_SERVICES":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_SEARCH_USER":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_UPLOAD_DATA":
      return {
        ...state,
        loading: true,
      };
    case "SET_PROFILE_LIST":
      return {
        ...state,
        loading: false,
        profilelist: action.payload,
      };
    case "SET_UPLOAD_DATA":
      return {
        ...state,
        loading: false,
        uploadData: action.payload,
      };
    case "SET_SKILLS_LIST":
      return {
        ...state,
        loading: false,
        skillsList: action.payload,
      };
    case "SET_SERVICES_LIST":
      return {
        ...state,
        loading: false,
        servicesList: action.payload,
      };
    case "SET_ADMIN_SERVICES":
      return {
        ...state,
        loading: false,
        adminServices: action.payload,
      };
    case "SET_ALL_SERVICES":
      return {
        ...state,
        loading: false,
        allServices: action.payload,
      };
    case "SET_SEARCH_USER":
      return {
        ...state,
        loading: false,
        searchUser: action.payload,
      };
    default:
      return state;
  }
};

export default ProfileReducers;
