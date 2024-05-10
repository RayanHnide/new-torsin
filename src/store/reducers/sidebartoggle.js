const initialState = {
    toggle: true,
    hide: false
    // Other initial state values
};

const SidebarReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOGGLE':
            return {
                ...state,
                toggle: action.payload,
            };

        case 'SET_HIDE':
            return {
                ...state,
                hide: action.payload,
            };
        default:
            return state;
    }
};

export default SidebarReducer;
