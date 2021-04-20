import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import PorductAddUpdate from './add-update-form'
import ProductDeatil from './detail'
import ProductHome from './home'
export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/product' component={ProductHome} />
                <Route path='/product/addupdate' component={PorductAddUpdate} />
                <Route path='/product/detail' component={ProductDeatil} />
                <Redirect to='/product'/>
            </Switch>
        )
    }
}
