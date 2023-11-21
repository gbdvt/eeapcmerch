const defaultState = {
    token: "",
    isAdmin: "",
    name: "",
    email: "",
    isLoggedIn: false
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case "SET_AUTH_INFO":
            return {
                ...state,
                token: action.token,
                isAdmin: action.isAdmin,
                name: action.name,
                email: action.email,
                isLoggedIn: action.token.length > 3
            }

        case "LOG_OUT":
            return {
                token: "",
                isAdmin: "",
                name: "",
                email: "",
                isLoggedIn: false
                
            }

        default:
            return state
    }
}