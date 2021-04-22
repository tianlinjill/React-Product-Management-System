import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'
import './detail.less'
import LinkButton from '../../components/link-button'
import { BASE_IMG_URL } from '../../utils/constains'
import {reqCategoryId} from '../../api/index'
const Item = List.Item
export default class ProductDeatil extends Component {
    state = {
        categoryName:'',// first category name
        subCategoryName:'',// sub category name
    }
    async componentDidMount () {
        const { pCategoryId, categoryId } = this.props.location.state.product
        if (pCategoryId === '0') {
            // this product only have one category
            const result = await reqCategoryId(categoryId)
            console.log(result)
            const  categoryName  = result.data.name
            this.setState({categoryName})
        }else {
            const results = await Promise.all([reqCategoryId(pCategoryId), reqCategoryId(categoryId)])
            const categoryName = results[0].data.name // first category name
            const subCategoryName = results[1].data.name // sub category name
            this.setState({
                categoryName,
                subCategoryName
            })
        }
    }
    render() {
        const { name, desc, price, detail, imgs } = this.props.location.state.product
        const {categoryName, subCategoryName} = this.state
        const title = (
            <span>
                <LinkButton>
                    <Icon type='arrow-left' style={{ marginRight:'10px',color: '#52c41a' }} onClick={() => { this.props.history.goBack()}}/>
                </LinkButton>
                <span style={{fontSize:'25px',fontWeight:'bold'}}> Product Details</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item className='item'>
                        <span className='product-left'>Product Name:</span>
                        <span>{name}</span>
                    </Item>
                    <Item className='item'>
                        <span className='product-left'>Product Introduction:</span>
                        <span>{desc}</span>
                    </Item>
                    <Item className='item'>
                        <span className='product-left'>Product Price:</span>
                        <span>${price}</span>
                    </Item>
                    <Item className='item'>
                        <span className='product-left'>Product Category:</span>
                        <span>
                            {categoryName}
                            {/* {subCategoryName? <><Icon type='arrow-right' /> {subCategoryName}</> : <>' '</>} */}
                            {subCategoryName && (
                                <><Icon type='arrow-right' style={{color:'green', margin:'0 10px '}}/>
                                {subCategoryName}
                                </>
                            )}
                       </span>
                    </Item>
                     <Item className='item'>
                        <span className='product-left'>Product Photo:</span>
                        <span>
                            {
                                imgs.map(img => (
                                    <img
                                        key={img}
                                        className='product-img'
                                        src={BASE_IMG_URL + img}
                                        alt="img" />
                                ))
                            }
                        </span>
                    </Item>
                    <Item className='item'>
                        <span className='product-left'>Product Details:</span>
                        <span dangerouslySetInnerHTML={{__html: detail}}/>
                    </Item>
                </List>
            </Card>
        )
    }
}
