import React, { Component } from 'react'
import { Form, Input,Select } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const { Option } = Select
//Update/delete component
class UserAddUpdateForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        user: PropTypes.object,
        roles:PropTypes.array.isRequired,
    }
     UNSAFE_componentWillMount() {
         this.props.setForm(this.props.form)
        
    }
    
     
    render() {
        const { user, roles } = this.props
         const { getFieldDecorator } = this.props.form
        const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: {span: 14 },
                };
        return (
            <Form>
                <Item label='Username' {...formItemLayout}>
                     {
                        getFieldDecorator('username', {
                            initialValue: user.username,
                             rules: [
                                {required:true,message:" Name is required!"}
                            ]
                        })(
                           <Input  placeholder='Please Enter the Username'/>
                        )
                    }
                </Item>
                {
                    user._id ? null : (
                        <Item label='Password' {...formItemLayout}>
                        {
                        getFieldDecorator('password', {
                            initialValue: '',
                             rules: [
                                {required:true,message:" password is required!"}
                            ]
                        })(
                           <Input type='password' placeholder='Please Enter the passowrd'/>
                        )
                        }
                        </Item>
                    )
                }
                
                <Item label='Phone Number' {...formItemLayout}>
                     {
                        getFieldDecorator('phone', {
                            initialValue: user.phone,
                             rules: [
                                 { required: true, message: " Phone Number is required!" },
                            ]
                        })(
                           <Input placeholder='Please Enter Your phone number'/>
                        )
                    }
                </Item>
                <Item label='Email Address' {...formItemLayout}>
                     {
                        getFieldDecorator('email', {
                            initialValue: user.email,
                        })(
                           <Input  placeholder='Please Enter the New Role Name'/>
                        )
                    }
                </Item>
                <Item label='Role' {...formItemLayout}>
                    {
                     getFieldDecorator('role_id', {
                     initialValue: user.role_id,
                     })(
                         <Select >
                             {
                                 roles.map(role=><Option key={role._id} value={role._id}>{role.name} </Option>)
                            }
                        </Select>)}
                </Item>
                
           </Form>
        )
    }
}
export default Form.create()(UserAddUpdateForm)