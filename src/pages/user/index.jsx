import React, { Component } from 'react'
import { Card, Table, Button,Modal, message } from 'antd'
import { fromateDate } from '../../utils/dateUtils'
import LinkButton from '../../components/link-button'
import { PAGE_SIZE } from '../../utils/constains'
import { reqUsers,reqUserDelete,reqAddorUpdateUser } from '../../api/index'
import UserAddUpdateForm from './Add-update-Form'
export default class User extends Component {
     state = {
         users: [],// users' list date
         isShow: false,// control the add or update modal show
         roles:[],
            
    }
    initColumns = () => {
        this.columns = [
            {
                title: 'Username',
                dataIndex:'username',
            },
            {
                title: 'Email Address',
                dataIndex: 'email',
            },
            {
                title: 'Registration Date',
                dataIndex: 'create_time',
                render: (create_time)=>fromateDate(create_time)
            },
            {
                title: 'Role',
                dataIndex: 'role_id',
                 render:(role_id) => this.roleNames[role_id]
            },
            {
                title: 'Setting',
                render: (user) => {
                     return (
                         <span>
                             <LinkButton onClick={() => this.showUpdate(user)}>Update</LinkButton>
                             <LinkButton onClick={() => this.deleteUser(user)}>Delete</LinkButton>
                        </span>
                    )
                } 
            },
         ]
    }
    // show Create new User button
    showAdd = () => {
        this.user = null// init this.user
        this.setState({isShow: true})
    }
    showUpdate = (user) => {
        this.user = user
        this.setState({isShow: true})
    }
    deleteUser = (user) => {
        Modal.confirm({
            title: `Do you want to delete ${user.username}?`,
            onOk: async()=> {
                const result = await reqUserDelete(user._id)
                if (result.status === 0) {
                    message.success('User has been deleted successful!')
                    this.getUser()
                } else {
                    message.error('failed to delete this User.')
                }
                }
            });
    }
    
    getUser = async() => {
        const result = await reqUsers()
        if (result.status === 0) {
            const { users, roles } = result.data
             this.initRoleName(roles)
            this.setState({ users, roles })
             console.log('getUser中的 this.roleName', this.roleNames)
        }
    }
    initRoleName = (roles) => {
        console.log('initRoleName调用了')
        const roleNames = roles.reduce((pre, role) => {
            pre[role._id]=role.name
          return pre  
        }, {})
        this.roleNames = roleNames
    }
    addOrUpdateUser = async() => {
        this.setState({isShow:false})
        // collect data
        const user = this.form.getFieldsValue()
        this.form.resetFields()
        console.log(this.user)
        // send request
        // update user should have user._id
        if (this.user) {
            console.log('进入了')
            user._id = this.user._id
        }
        const result = await reqAddorUpdateUser(user)
        if (result.status === 0) {
            message.success(`User${this.user ? ' updated':' addded '} success!`)
            this.getUser()
        } else {
            message.error(`Failed to ${this.user ? ' updated':' addded'} the user`)
        }
       
    }
    
    UNSAFE_componentWillMount() {
        this.initColumns()
         
    }
    componentDidMount() {
       this.getUser()
        //console.log('thisRolename', this.roleNames)
          console.log("did mount调用了 this.roleName:", this.roleNames)
    }
    render() {
        const { users, isShow, roles } = this.state
        const user = this.user || {}
        console.log('Does render has user?', this.user)
        const title = (
            <Button type='primary' onClick={this.showAdd}>Add new user</Button>
        )

        return (
            <Card title={title} >
                <Table
                    bordered
                    rowKey='_id'
                    pagination={{defaultPageSize: PAGE_SIZE}}
                    dataSource={users}
                    columns={this.columns}
                />
                <Modal
                    title={user._id ? 'Update the user': 'Add new user'}
                    visible={isShow}
                    onOk={this.addOrUpdateUser}
                    onCancel={() => {
                        this.setState({ isShow: false })
                        this.form.resetFields()
                    }}
                    >
                    <UserAddUpdateForm
                        setForm={(form) => { this.form = form }}
                        user={user}
                        roles= {roles}
                    />
                </Modal>
            </Card>
            
        )
    }
}
