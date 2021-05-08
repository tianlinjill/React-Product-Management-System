import React, { PureComponent } from 'react'
import { Form, Input, Tree } from 'antd'
import PropTypes from 'prop-types'
import menuList from '../../config/menuConfig'
const Item = Form.Item
const { TreeNode } = Tree

export default class AuthForm extends PureComponent {
   static propTypes = {
    role: PropTypes.object
  }
    constructor (props) {
    super(props)
    // 根据传入角色的menus生成初始状态
    const {menus} = this.props.role
    this.state = {
      checkedKeys: menus
    }
  }
 
    onCheck = checkedKeys => {
        console.log('onCheck', checkedKeys);
        this.setState({ checkedKeys });
    }

    getMenus = () => this.state.checkedKeys

    getTreeNodes = (menuList) => {
        return menuList.reduce((pre, item) => {
            pre.push(<TreeNode title={item.title} key={item.key} >
                {item.children ? this.getTreeNodes(item.children  ): null}
            </TreeNode>)
            return pre
        },[])
    }
    UNSAFE_componentWillMount() {
        this.treeNode = this.getTreeNodes(menuList)
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }
    render() {
        console.log('Authform render()')
        const {role} = this.props
        const {checkedKeys} = this.state
        const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: {span: 14 },
                };
        return (
            <div>
                <Item label='Role Name' {...formItemLayout}>
                    <Input value={role.name } disabled/>
                </Item>
                <Tree
                checkable
                defaultExpandAll={true}
                checkedKeys={checkedKeys}
                onCheck={this.onCheck}
                >
                    <TreeNode title="System Authority" key="all">
                        {this.treeNode}
                    </TreeNode>
                </Tree>
           </div>
        )
    }
}
