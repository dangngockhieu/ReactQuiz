import { FETCH_USER_LOGIN_SUCCESS,
        USER_LOGOUT_SUCCESS,
        UPDATE_USER_INFO
        } from "../action/userAction";

const INITIAL_STATE = {
    account: {
        access_token: '',
        refresh_token: '',
        username: '',
        image: '',
        role: '',
        email: ''
    },
    isAuthenticated: false
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            return {
                ...state, account: {
                    access_token: action?.payload?.DT?.access_token,
                    refresh_token: action?.payload?.DT?.refresh_token,
                    username: action?.payload?.DT?.user?.username,
                    image: action?.payload?.DT?.user?.image,
                    role: action?.payload?.DT?.user?.role,
                    email: action?.payload?.DT?.user?.email
                },
                isAuthenticated: true
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    refresh_token: '',
                    username: '',
                    image: '',
                    role: '',
                    email: ''
                },
                isAuthenticated: false
            };
        case UPDATE_USER_INFO:
            return {
                ...state,
                account: {
                    ...state.account,
                    username: action.payload.username,
                    image: action.payload.image
                }
            };
        default: return state;
    }
};

export default userReducer;
