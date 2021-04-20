import React, { Component } from 'react'
import { Card, Table, Select, Icon, Button, Input, message } from 'antd'
import LinkButton from '../../components/link-button'
import { reqProducts,reqSearchProducts,reqUpdateStatus } from '../../api/index'
import { PAGE_SIZE } from '../../utils/constains'

const Option = Select.Option
export default class ProductHome extends Component {

    state = {
        loading:false,
        total: 0,
        products: [],// product array as dataSource
        searchName: '',// search key words
        searchType:'productName',//跟
    }
    // this func is for init table's column
    initColumns = () => {
        //save into this
        this.columns = [
            {
                title: 'Product Name',
                dataIndex: 'name',
               
            },
            {
                title: 'Product Description',
                dataIndex: 'desc',
               
            },
            {
                title: 'Price',
                dataIndex: 'price',
                render: (price) => '$'+ price //
               
            },
            {
                width:200,
                title: 'Status',
                //dataIndex: 'status',
                render: (product) => {
                    const { status, _id } = product
                    const newStatus = status ===1 ? 2 : 1
                     return (
                         <span>
                            <Button
                                type='primary'
                                onClick={()=>this.updateStatus(_id,newStatus) }
                            >
                                {status === 1 ? 'delist ' : 'enroll'}
                            </Button>
                            <span style={{marginLeft:'10px'}}>{status===1 ? 'On Sale': 'delisted'}</span>
                        </span>
                    )
                } 
               
            },
            {
                width:150,
                title: 'Setting',
                //dataIndex: 'status',
                render: (product) => {
                     return (
                        
                         <span>
                             <LinkButton>Update</LinkButton>
                             <LinkButton onClick={() => this.props.history.push('/product/detail',{product})}>Details</LinkButton>
                        </span>
                    )
                } //
               
            },
            ];
    }
    // request for selected page's product data
    getProduct = async (pageNum) => {
        this.pageNum = pageNum
        this.setState({ loading: true })
        const { searchName, searchType } = this.state
        let result
        // if search key word exist
        if (searchName) {
            // request for product list according to the search params
            result = await reqSearchProducts({ pageNum, pageSize:PAGE_SIZE, searchName, searchType })
            console.log(result)
        } else {
            // normal request for product list
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        
        this.setState({loading:false})
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                total,
                products:list
            })
        }
    }
    //update selected product's status
    updateStatus = async(productId,status) => {
        const result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('Update product successfully!')
            this.getProduct(this.pageNum)
        } else {
            message.error('Failed to update product!')
        }
    }

    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProduct(1)
    }

    render() {
        //get State data
        const{loading, total, products, searchType, searchName} = this.state
        const title = (
            <span>
                <Select
                    value={searchType}
                    style={{ width: 250 }}
                    onChange={(value) => this.setState({ searchType: value })}
                >
                    <Option value='productName' > Search by Product name</Option>
                    <Option value='productDesc' > Search by Product description</Option>
                </Select>
                <Input
                    placeholder='Key Word'
                    style={{ width: 150, margin: '0 15px' }}
                    value={searchName}
                    onChange={(event) => this.setState({ searchName: event.target.value })}
                
                />
                <Button type='primary' onClick={() => this.getProduct(1) }>Search</Button>
            </span>
        )
        const extra = (
            <div>
                
                <Button type='primary'>
                    <Icon type='plus' />
                    Add new Product
                    </Button>
            </div>
        )
        return (
           <Card title={title} extra={extra} >
                <Table
                    bordered
                    rowKey='_id'
                    loading={loading}
                    pagination={{
                         current: this.pageNum,
                        defaultPageSize: PAGE_SIZE,
                        showQuickJumper:true,
                        total,
                        onChange:this.getProduct
                    }}
                    dataSource={products} columns={this.columns} />
            </Card>
        )
    }
}
