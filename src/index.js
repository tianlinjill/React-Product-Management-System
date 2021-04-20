/*
entry js
 */

import React from 'react'
import ReactDom from 'react-dom'
import App from './App'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'

// read user from local, save in memory
const user = storageUtils.getUser();
memoryUtils.user = user;

ReactDom.render(<App/>,document.getElementById('root'))
