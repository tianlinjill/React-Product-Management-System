import React, { Component } from 'react'
import { Card, Button,Icon,Table, message,Modal } from 'antd';
import LinkButton from '../../components/link-button'
import AddFrom from './add-form'
import UpdateFrom from './update-form'
import {reqCategorys,reqUpdateCategory,reqAddCategory} from '../../api'

//products category route
export default class Category extends Component {

    state = {
        loading:false,// welther loading data
        categorys: [],// First class category
        subCategorys:[],// sub category data
        parentId: '0',//current rendered category table's parentId, first class:'0', sub class:'1'
        parentName: '',//current rendered category table's parent name
        showModal:0// control addCategory and updateCategory 0 =false, 1:addCategory,2:updateCategory
    }

    //initialization colums
    /**
     * parentId: if null request according to the state
     *           else :use parms to send request
     * 
     */
    initColumns = () => {
         this.columns = [
            {
                title: 'Category Name',
                dataIndex: 'name',
            },
            {
                title: 'Setting',
                width:350,
                render: (category) => (
                    <span>
                        <LinkButton onClick={()=>{this.showUpdateCategory(category)}}>Update Category</LinkButton>
                        {this.state.parentId==='0'?<LinkButton onClick={() => this.showSubCategorys(category)}>Check Sub Class Category</LinkButton>: null}
                    </span>
                )
            }
            ]
    }
    // async get first class category
    getCategorys = async (parentId) => {
        // show loading before send request
        this.setState({ loading: true }) // start loading anime
         parentId  = this.state.parentId || parentId
        // get class category data
        const result = await reqCategorys(parentId)
        this.setState({ loading: false })//// end loading anime
        if (result.status === 0) { // req data success!
            const categorys = result.data // this data could be first or sub class
            if (parentId === '0') {// if first class
                // update the first class category state data
                this.setState({
                    categorys
                })
            } else {// sub class
                // update the sub class category state data
                this.setState({ subCategorys: categorys})
                }
        }else {// req data failed!
                message.error('Get category information failed!')
            }
    }
    showFirstCategory = () => {
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys:[],
        })
    }
    // show selected sub class data
    showSubCategorys = (category) => {
        //update state
        this.setState({
            parentId: category._id,
            parentName: category.name
            
        }, () => {
            this.getCategorys()
            console.log('parentId',this.state.parentId)
        })
        console.log('parentId',this.state.parentId)    
        //get sub class category data
        this.getCategorys()
    }
    showAddCategory=  () => {
        this.setState({
            showModal:1
        })
    }
    addCategory =  () => {
         this.form.validateFields(async(err,values) => {
             if (!err) {
                 // close the modal
                this.setState({
                    showModal:0
                })
                // collect data, submit add category request
                const { parentId, categoryName } = values
                // reset entered data
                this.form.resetFields()
                const result = await reqAddCategory(parentId, categoryName)
                if (result.status === 0) {
                    
                    if (parentId === this.state.parentId) {
                        // 3. update current table
                        this.getCategorys()
                    } else if (parentId==='0'){ // add first class category in sub class category, update table, but no need to show first category

                    }
                
                }
             }
         })
        
        
        
    }
    //show the update confirm modal
    showUpdateCategory = (category) => {
        // save the category object
        this.category = category
         this.setState({
            showModal:2
        })
    }
    // Click oK to send ajax request to update the request
    updateCategory =  () => {
        // form validation!, only valudated date could be process.
        this.form.validateFields(async(errors, values) => {
            if (!errors) {
                // 1. close modal
                this.setState({
                    showModal:0
                })
                const categoryId = this.category._id
                const {categoryName} = values
                // reset entered data
                this.form.resetFields()
                // 2. ajax to request update category
                const result = await reqUpdateCategory({ categoryId, categoryName })
                if (result.status === 0) {
                    // 3. update table 
                    this.getCategorys()
                }    
            }
        })
        
    }

    handleCancel = () => {
        // 2. ajax to request update category
        this.form.resetFields()
        // close modal
        this.setState({
            showModal:0
        })
       
    }
    //init column before render
    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    // get category data after component mounted, ajax request to get data
    componentDidMount() {
        this.getCategorys()// get frist class category because the default state  parentId is '0'
        
    }

    render() {
        const {categorys,subCategorys,parentId,parentName,loading,showModal} = this.state
        const category = this.category||{} // if  do not have value :null object
        
       
        const title = parentId === '0' ? 'First Class' : (
            <span>
                <LinkButton onClick={this.showFirstCategory}>First Class</LinkButton>
                <Icon type='arrow-right' style={{marginRight:5}}></Icon>
                <span>{parentName}</span>

            </span>
        )
        const extra = (
            <Button type='primary' onClick={this.showAddCategory}>
                <Icon type='plus' />
                Add
            </Button>
        )
        return (
             <Card title={title} extra={extra} >
                <Table
                    dataSource={ parentId==='0' ? categorys : subCategorys}
                    rowKey='_id'
                    columns={this.columns}
                    bordered={true}
                    loading={loading}
                    //default page is first page, add untd's quick jumer function
                    pagination={{defaultCurrent:1,showQuickJumper:true}}
                />
                <Modal
                    title="Add New Category"
                    visible={showModal===1}
                    onOk={this.addCategory}
                    onCancel={this.handleCancel}
                    >
                    <AddFrom
                        setForm={(form)=>{this.form = form}}
                        categorys={categorys}
                        parentId={parentId} />
                    
                </Modal>
                <Modal
                    title="Update Category"
                    visible={showModal===2}
                    onOk={this.updateCategory}
                    onCancel={this.handleCancel}
                    >
                    <UpdateFrom categoryName={category.name} setForm={(form)=>{this.form = form}}/>
                </Modal>
      
            </Card>
        )
    }
}
