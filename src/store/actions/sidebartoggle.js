export function setOpen(toggle) {

    localStorage.setItem('open', toggle);

    return (dispatch) => {
        dispatch({
            type: "SET_TOGGLE",
            payload: toggle,
        })
    }
}

export function setHide(toggle) {

    localStorage.setItem('hide', toggle);

    return (dispatch) => {
        dispatch({
            type: "SET_HIDE",
            payload: toggle,
        })
    }
}