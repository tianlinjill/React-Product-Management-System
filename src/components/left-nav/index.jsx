import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
// left navigation component
const { SubMenu } = Menu;
 class LeftNav extends Component {
     getMeunNodes = (menuList) => {
         const path = this.props.location.pathname
            return menuList.map((item) => {
                if (!item.children) {
                    return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                    )
                } else {
                    //check if children item was input in url
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0 )
                    if (cItem) {
                        this.openKey = item.key
                    }
                    
                    return (
                        <SubMenu
                            key={item.key}
                            title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                            }
                        >
                        {this.getMeunNodes(item.children)}
                        </SubMenu>
                    )
                }
            })
        }
    
     UNSAFE_componentWillMount() {
        this.meunNodes =  this.getMeunNodes(menuList);
       }
     render() {
        const openKey = this.openKey
        let path = this.props.location.pathname
        if(path.indexOf('/product')=== 0) { //make sub route could also be selected by left nav
             path = '/product'
         }
        return (
            <div  className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt="" />
                    <h1>Navigation</h1>
                </Link>
            <Menu
                mode="inline"
                theme="dark"
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}    
            >
            { this.meunNodes}
            </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)