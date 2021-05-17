import React, { Component } from 'react'
import { Button, Card, message, Modal, Table } from 'antd'
import { PAGE_SIZE } from '../../utils/constains'
import { reqRoles } from '../../api/index'
import AddForm from './AddForm'
import AuthForm from './AuthForm'
import { reqAddRoles, reqUpdateRole } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {fromateDate} from '../../utils/dateUtils'
export default class Role extends Component {
    state = {
        roles: [ ],// role list
        role: {}, //selected row's role object
        isShowAdd: false,// show add user Modal
        isShowAuth:false // show authorization role modal
    }
    constructor (props) {
    super(props)
    this.auth = React.createRef()
  }
    initColumns = () => {
        this.columns = [
            {
                title: 'Username',
                dataIndex:'name',
                
            },
             {
                title: 'Creation Time',
                dataIndex: 'create_time',
                render: (create_time)=>fromateDate(create_time)
                
            },
              {
                title: 'Authorization time',
                dataIndex: 'auth_time',
                render: (auth_time)=>fromateDate(auth_time)
                
            },
               {
                title: 'Authorizer',
                dataIndex:'auth_name',
                
            },
        ]
    }
    getRoles = async() => {
        const result = await reqRoles()
        if (result.status === 0) {
            const roles = result.data
            this.setState({roles})
        }
    }
    // add new user
    addRole = () => {
        // validate input
        this.form.validateFields(async(errors, values) => {
            if (!errors) {
                this.setState({isShowAdd:false})
                const { roleName } = values
                // reset the input fields
                this.form.resetFields()
                const result = await reqAddRoles(roleName)
                if (result.status === 0) {
                    message.success('Role added successfully!')
                    const role = result.data
                    this.setState(state => ({
                        roles:[...state.roles, role]
                    }))
                } else {
                    message.error('Failed to add role!')
                }
            }
        })
        // collect data
        // send request
        // update list
    }
    updateRole = async () => {
        this.setState({
            isShowAuth:false
        })
        const role = this.state.role
        const menus = this.auth.current.getMenus()
        role.menus = menus
        console.log(memoryUtils.user)
        role.auth_name = memoryUtils.user.username
        role.auth_time = memoryUtils.user.create_time
        // update role
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
           
            // if update current user's role authorization, init storage , force to log out
            if (role._id === memoryUtils.user.role_id) {
                // init storage
                memoryUtils.user = {}
                storageUtils.removeUser()
                // force log out
                this.props.history.replace('/login')
                 message.warning('The current user authorization have been modified, please login!')
            } else {
                 message.success('Role authorization set successfully!')
                this.setState({
                roles:[...this.state.roles]
                })
            }
            
        }
    }
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getRoles()
    }
    // callback when role onclick
    onRow = (role) => {
        return {
            onClick: event => {
                console.log(role)
                this.setState({role})
             },
         }
    }
    render() {
        const {roles, role, isShowAdd, isShowAuth} = this.state
        const title = (
            <span>
                <Button type='primary' onClick={()=>{this.setState({isShowAdd:true})}} style={{marginRight:'20px'}} >Create New Role</Button>
                <Button type='primary' onClick={()=>{this.setState({isShowAuth:true})}} disabled={!role._id}>Set Role authorization</Button>
            </span>
        )

       

        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey='_id'
                    rowSelection={{
                        type: 'radio',
                        selectedRowKeys: [role._id],
                        onSelect: (role) => {
                            this.setState({role})
                        }

                    }}
                    onRow = {this.onRow}
                    pagination={{
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper:true,
                    }}
                    dataSource={roles}
                    columns={this.columns} />
                <Modal
                    title="Add new Role"
                    visible={isShowAdd}
                    onOk={this.addRole}
                    onCancel={() => {
                        this.setState({ isShowAdd: false })
                        this.form.resetFields()
                    }}
                    >
                    <AddForm
                        setForm={(form)=>{this.form = form}}
                       />
                    
                </Modal>
                <Modal
                    title="Role authorization"
                    visible={isShowAuth}
                    onOk={this.updateRole}
                    onCancel={() => {
                        this.setState({ isShowAuth: false })
                    }}
                    >
                    <AuthForm
                        ref = {this.auth}
                        role= {role}
                       />
                    
                </Modal>
            </Card>
        )
    }
}
