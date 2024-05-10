const INITIAL_STATE = {
    loading: false,
    notificationList: [],
    adminPercentage: [],
};

const NotificationReducers = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "REQUEST_NOTIFICATIONS_LIST":
            return {
                ...state,
                loading: true,
            };
        case "REQUEST_ADMIN_PERCENTAGE":
            return {
                ...state,
                loading: true,
            }
        case "SET_NOTIFICATIONS_LIST":
            return {
                ...state,
                loading: false,
                notificationList: action.payload,
            };
        case "SET_ADMIN_PERCENTAGE":
            return {
                ...state,
                loading: false,
                adminPercentage: action?.payload,
            }
        default:
            return state;
    }
};

export default NotificationReducers;