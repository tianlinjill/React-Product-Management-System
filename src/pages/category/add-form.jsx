import React, { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item
const Option = Select.Option

class AddForm extends Component {

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categorys: PropTypes.array.isRequired, // first class category's array
        parentId:PropTypes.string.isRequired, //parentId
    }
     UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }
     
    render() {
        const {categorys,parentId} = this.props
        const {getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item>
                    <span style={{fontSize:16}}>Belonged Category：</span>
                    {
                        getFieldDecorator('parentId', {
                            initialValue: parentId
                        })(
                            <Select>
                                
                                <Option value='0' >Add to The First Class</Option>
                                {
                                    categorys.map(item => <Option value={item._id}  key = {item._id}>{item.name}</Option>)
                                }
                            </Select>
                        )
                    }
                    
                </Item>
                <Item>
                    <span style={{fontSize:16}}>Category Name：</span>
                     {
                        getFieldDecorator('categoryName', {
                            initialValue: '',
                              rules: [
                                {required:true,message:"Category name is required!"}
                            ]
                        })(
                           <Input  placeholder='Please Enter the New Category Name'/>
                        )
                    }
                    
                </Item>
           </Form>
        )
    }
}
export default Form.create()(AddForm)