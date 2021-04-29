import React, { Component } from 'react'
import { Redirect,Route, Switch } from 'react-router-dom';

import memoryUtils from '../../utils/memoryUtils'
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
export default class Admin extends Component {
    render() {
        const user = memoryUtils.user;
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
        