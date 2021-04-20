import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'
const Item = Form.Item


class UpdateForm extends Component {
    // defence coding formating props
    static propTypes = {
        categoryName: PropTypes.string.isRequired,
        setForm:PropTypes.func.isRequired
    }
     UNSAFE_componentWillMount() {
        // pass the form object to father component by setForm()
        this.props.setForm(this.props.form)
       
    }
    render() {
        const { getFieldDecorator } = this.props.form
        const {categoryName} = this.props
        return (
            <Form>
                <Item>
                    <span style={{fontSize:16}}>Rename the Category:</span>
                     {
                        getFieldDecorator('categoryName', {
                            initialValue: categoryName,
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
export default Form.create()(UpdateForm)