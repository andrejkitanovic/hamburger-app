import * as actionTypes from "./actionTypes";
import axios from 'axios'

export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) => {
    return {
        type:actionTypes.AUTH_SUCCESS,
        token,
        userId
    }
}

export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem("userId")
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const authSignout = (exiprationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        },exiprationTime * 1000)
    }
}

export const setAuthRedirectPath = path => {
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path
    }
}
 
export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCAI4Rba2HQMenPObnGdMOzRittUSvQSQw"
        if (!isSignup){
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCAI4Rba2HQMenPObnGdMOzRittUSvQSQw"
        }

        axios.post(url,{email,password,returnSecureToken:true})
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000)
            localStorage.setItem("token",res.data.idToken)
            localStorage.setItem("expirationDate" ,expirationDate)
            localStorage.setItem("userId",res.data.localId)
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(authSignout(res.data.expiresIn))
        })
        .catch(err => dispatch(authFail(err.response.data.error)))
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token) {
            dispatch(logout())
        }
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate < new Date()){
                dispatch(logout())
            }else {
                const userId = localStorage.getItem('userId')
                dispatch(authSuccess(token,userId))
                dispatch(authSignout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}