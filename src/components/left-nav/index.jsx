import React, { Component } from 'react'
import { Link ,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd';
import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
// left navigation component
const { SubMenu } = Menu;
class LeftNav extends Component {
    // user authorization check
    hasAuth = (item) => {
        const {key, isPublic} = item
        const menus = memoryUtils.user.role.menus
        const username = memoryUtils.user.username
         /**
          * 1. if current user is admin :true
          * 2. if current item isPublic== true :true
          * 3. current's menus has key in item :true
          */
        if (username === 'admin' || isPublic || menus.indexOf(key) !== -1) {
            return true
        } else if(item.children) {// 4 if current user has submenue's authorization :true
            return !!item.children.find(child => menus.indexOf(child.key) !== -1)
        }
        return false
     }
     getMeunNodes = (menuList) => {
          const path = this.props.location.pathname
         return menuList.reduce((pre, item) => {
             if (this.hasAuth(item)) {
                 if (!item.children) {
                 pre.push((
                     <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
             } else {
                 const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                 if (cItem) {
                    this.openKey = item.key
                }
                 pre.push((
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
                 ))
            }
            }
            return pre
         },[])
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