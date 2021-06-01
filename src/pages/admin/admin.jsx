import React, { Component } from 'react'
import { Redirect,Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux'

import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/'
import Header from '../../components/Header'
import Home from '../home/'
import Product from '../product/'
import Category from '../category'
import User from '../user/'
import Role from '../role/'
import Line from '../charts/line'
import Bar from '../charts/bar'
import Pie from '../charts/pie'
const {  Footer, Sider, Content } = Layout;
  /*
  back-end admin component router
   */
 class Admin extends Component {
    render() {
        const user = this.props.user
        // if localstorage don not save user (user not logined)
        if (!user || !user._id) {
            // user not logined 
            return<Redirect  to='/login'/>
        }
        return (
                <Layout style={{minHeight:'100%'}}>
                <Sider >
                    <LeftNav />
                </Sider>
                <Layout>
                   <Header>Header</Header>
                       
                    <Content style={{margin: 20,backgroundColor: '#fff' }}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie}/>
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                <Footer style={{textAlign:'center', color:'#ccc'}}>Designed by Jeffrey Feng</Footer>
            </Layout>
            </Layout>
           
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {}
)(Admin)
        