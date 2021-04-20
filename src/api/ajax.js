/**
 * this module is for package axios to send ajax request
 * 
 */

import axios from 'axios'
import {message} from 'antd'
export default function ajax(url, data = {}, type='GET' ) {
   return new Promise((resolve, reject) => {
       
       let promise;
    if (type === 'GET') { //GET request
        promise= axios.get(url, {
            params: data
        });
        
    } else if (type === 'POST') {
       promise= axios.post(url, data)
       }
       promise.then((response) => {
           resolve(response.data)
           
          
       }).catch(error => {
           message.error("Request error: ",error.message)
       })
       
   })
   
   
}