import store from "store"

/**
 * This module is for local data save
 * 
 */
const USER_KEY = 'user_key'
export default {
    // save user
    saveUser(user) {
      store.set(USER_KEY, user)
    },

    // get user
    getUser() {
        return store.get(USER_KEY) || {}
    },
    // remove user
    removeUser() {
       store.remove(USER_KEY)
    }

}
