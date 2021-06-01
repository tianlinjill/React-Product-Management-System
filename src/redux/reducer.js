// generate and return new state to componet according to old state and assigned action
import storageUtils from '../utils/storageUtils'
import { combineReducers } from 'redux'
import {
    SET_HEAD_TITLE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
} from './action-types'
//manage page head title
const initHeadTitle ='Home'
function headTitle(state=initHeadTitle, action) {
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }
}

//manage current login user
const initUser = storageUtils.getUser()
function user(state=initUser, action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg
            return { ...state, errorMsg }
        case RESET_USER:
            return {}
        default:
            return state
    }
}
export default combineReducers({
    headTitle,
    user, 
}) 
  
