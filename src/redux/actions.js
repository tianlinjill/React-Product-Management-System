// actions creator module
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from './action-types'
import { reqLogin } from '../api/index'
import storageUtils from '../utils/storageUtils'
//set head's title(sync) action
export const setHeadTitle = (headTitle) => ({ type: SET_HEAD_TITLE, data: headTitle })

// receive user data sync action
export const receiveUser =(user)=>({type:RECEIVE_USER, user})
// show error message sync action
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })

export const logout = () => {
    // delete localstorage's user data
    storageUtils.removeUser()
    // return action 
    return {type:RESET_USER}
}
// Login function async action
export const login = (username,password) => {
    return async dispatch => {
        //执行异步代码
        // 1. process async ajax request
        const result = await reqLogin(username,password)
        //2.1 if success, dispatch success sync action
        if (result.status === 0) {
            const user = result.data
            //save user date to local
            storageUtils.saveUser(user)
            dispatch(receiveUser(user))
        } else {
        //2.2 if faild, dispatch faild sync action
            const msg = result.msg
            dispatch(showErrorMsg(msg))
            
        }
        
    }
}