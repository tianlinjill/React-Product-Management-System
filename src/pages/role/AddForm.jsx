import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item

class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }
     UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }
     
    render() {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: {span: 14 },
                };
        return (
            <Form>
                <Item label='Role Name' {...formItemLayout}>
                     {
                        getFieldDecorator('roleName', {
                            initialValue: '',
                              rules: [
                                {required:true,message:" Name is required!"}
                            ]
                        })(
                           <Input  placeholder='Please Enter the New Role Name'/>
                        )
                    }
                </Item>
           </Form>
        )
    }
}
export default Form.create()(AddForm)