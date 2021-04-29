import React, { Component } from 'react'
import { Card, Input, Icon, Form, Button, Cascader, message} from 'antd'
import LinkButton from '../../components/link-button'
import { reqCategorys,reqAddProduct,reqUpdateProduct } from '../../api/index'
import RichTextEditor from './RichTextEditor'
import PicturesUpload from './PicturesUpload'

const Item = Form.Item
const { TextArea } = Input;

 
class PorductAddUpdate extends Component {
     state = {
            options:[] ,
    };
    constructor(props) {
        super(props);
        this.pw = React.createRef()
        this.editor = React.createRef()
    }

    //validate for price value    
    priceValidator = (rule, value, callback) => {
        if (value*1 >0) {
            callback()
        } else {
            callback('Price must be greater than zero!')
        }
    }
    // send requst to get categorys data from server
    getCategorys = async (parentId) => {
        const result = await reqCategorys(parentId)
        if (result.status === 0) {
            const categorys = result.data
            if (parentId === '0') {
                this.initOptions(categorys)
            } else {
                return categorys
            }
            
        }
    }
    //init option from categorys's data and update state
    initOptions = async (categorys) => {
        //get first category 
       const options= categorys.map(c => ({
            value:c._id,
            label: c.name,
            isLeaf: false,
       }))
        // 如果是二级分类列表的更新
        
        const { isUpdate, product } = this
        const { pCategoryId } = product
        //get sub category
        if (isUpdate && pCategoryId !== '0') {
            const subCategorys = await this.getCategorys(pCategoryId)
            // create childOptions Arr according to sub category
            const childOptions = subCategorys.map(c => ({
                value:c._id,
                label: c.name,
                isLeaf: false,
            }))
            console.log('options:',options)
            console.log('childOptions:',childOptions)
            
            // find childOptions belonged father option
            const targetOption = options.find(option => option.value === pCategoryId)
            //console.log(targetOption)
            // connect the father option and child option
            targetOption.children = childOptions
        }
       
        
        
        
        this.setState({options})
    }
    //handle form submit
    submit = () => {
    // validate date before submit
        this.props.form.validateFields (async(err,values) => {
            if (!err) {
                //1. collect data
                const imgs = this.pw.current.getImgs()
                const detail = this.editor.current.getEditor()
                // ["image-1618820650269.jpg", "image-1618820694393.jpg"]
                //console.log('imgs', imgs)
                // html content
                //console.log('detail', detail) 
                //{name: "联想ThinkPad 翼4809", desc: "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9", price: 6300, categoryIds: Array(2)[0]：pCategoryId[1]:categoryId}
                //console.log('values', values)
                const { name, desc, price, categoryIds } = values
                let pCategoryId,categoryId
                if (categoryIds.length === 1) {
                    // only have one category
                    pCategoryId = '0'
                    categoryId = categoryIds[0];
                } else {
                    pCategoryId = categoryIds[0];
                    categoryId = categoryIds[1];
                }
                // package product object
                const product = { categoryId, pCategoryId, name, desc, price, detail, imgs }
                //send add new product request
                const result = await reqAddProduct(product)
                if (!this.isUpdate) {
                    console.log(this.isUpdate)
                    if (result.status === 0) {
                    message.success('Add product successfully!')
                    this.props.history.goBack()
                    } else {
                    message.error('Failed to add product!')
                    }
                }else {
                    product._id = this.product._id
                    console.log(product)
                    //send update product request
                    const result = await reqUpdateProduct(product)
                    if (result.status === 0) {
                        message.success('Update product successfully!')
                        this.props.history.goBack()
                    } else {
                        message.error('Failed to update product!')
                    }
                }
                
                //2 调用接口请求函数去添加和更新
                //3 根据结果显示数据
            }
        })
    }
    // load Cascader's sub class category data
    loadData =async (selectedOptions) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        // request for sub category list according to the selected category's id
        const subCategory = await this.getCategorys(targetOption.value)
        targetOption.loading = false;
        if (subCategory && subCategory.length >0) {
           const ChildOption = subCategory.map(c => ({
                value:c._id,
                label: c.name,
                isLeaf: true,
           }))
             targetOption.children = ChildOption
        } else {// the slected category donot have sub category
            targetOption.isLeaf = true
        }
         this.setState({
                options: [...this.state.options],
            });
       
    }
    UNSAFE_componentWillMount() {
        const product = this.props.location.state
        this.isUpdate = !!product// true: route from update false: route from add
        this.product = product || {}
    }
    componentDidMount() {
        this.getCategorys('0')// get first class category
       
    }
    
    render() {
        const { product, isUpdate } = this
        const { categoryId, pCategoryId, imgs, detail } = product
        //console.log('product',product)
        //console.log(product)
        const categorysIds = []
        if (isUpdate) {
            // product belong to first category
            if (pCategoryId === '0') {
               categorysIds.push(categoryId) 
            } else {
                categorysIds.push(pCategoryId)
                categorysIds.push(categoryId) 
            }
        }
        
        const { getFieldDecorator } = this.props.form
        // layout for Form
         const formItemLayout = {
                labelCol: { span: 2 },
                wrapperCol: {span: 8 },
                };
        const title = (
            <span>
                <LinkButton >
                    <Icon type='arrow-left'
                        style={{ marginRight: '10px', color: '#52c41a' }}
                        onClick={() => this.props.history.goBack()} />
                </LinkButton>
                <span>{isUpdate?'Update the Product':'Add New Product'}</span>
            </span>
        )
        return (
            <div>
                <Card title={title }>
                    <Form {...formItemLayout}>
                        <Item label="Product Name">
                            {getFieldDecorator('name', {
                                initialValue:product.name,
                                rules: [
                                    {required:true, message:'Product name must be entered'},
                                ]
                            })(<Input placeholder='Please input product name' />)}
                           
                        </Item>
                        <Item label="Product Introduction">
                            {getFieldDecorator('desc', {
                                initialValue:product.desc,
                                rules: [
                                    {required:true, message:'Product Introduction must be entered'},
                                ]
                            })(<TextArea placeholder='Plase enter the product introduction here' autoSize={{ minRows: 2, maxRows: 6 }} />)}
                            
                        </Item>
                        <Item label="Product Price">
                            {getFieldDecorator('price', {
                                initialValue:product.price,
                                rules: [
                                    { required: true, message: 'Product Price must be entered' },
                                    {validator:this.priceValidator}
                                ]
                            })(<Input type='number' min = '0' addonAfter="AUD"/>)}
                        </Item>
                        <Item label="Product Category">
                            {getFieldDecorator('categoryIds', {
                                 initialValue:categorysIds,
                                rules: [
                                    { required: true, message: 'Product Category must be selected' },
                                ]
                            })(<Cascader
                                options={this.state.options}
                                loadData={this.loadData}
                            />)}
                            
                        </Item>
                        <Item label="Product Photo">
                            <PicturesUpload ref={this.pw} imgs={imgs}/>
                        </Item>
                        <Item label="Product Detail"
                            
                             labelCol={{ span: 2 }}
                            wrapperCol={{span: 20 }}
                        >
                            <RichTextEditor ref={this.editor} detail={detail}/>
                        </Item>
                        <Item label="Submit the request">
                            <Button type='primary' onClick={ this.submit}>Submit</Button>
                        </Item>
                    </Form>
                    
                </Card>
            </div>
        )
    }
}
export default Form.create()(PorductAddUpdate)
