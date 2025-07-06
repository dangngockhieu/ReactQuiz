export const FETCH_USER_LOGIN_SUCCESS = 'FETCH_USER_LOGIN_SUCCESS';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const UPDATE_USER_INFO = 'UPDATE_USER_INFO';

export const doLogin = (data)=>{
    return {
        type: FETCH_USER_LOGIN_SUCCESS,
        payload: data
    }
}

export const doLogout = (data)=>{
    return {
        type: USER_LOGOUT_SUCCESS
    }
}

export const doUpdateUserInfo = (data)=>{
    return {
        type: UPDATE_USER_INFO,
        payload: data
    }
}