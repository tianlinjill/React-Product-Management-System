import React, { Component } from 'react'
import {Button, Row, Col} from 'antd'
import { connect } from 'react-redux'
import { setHeadTitle } from '../../redux/actions'
import './notFont.less'
class NotFond extends Component {
     

    goHome = () => {
        this.props.setHeadTitle('Home')
        this.props.history.replace('/home')
    }
    render() {
        return (
            <Row className='not-found'>
                <Col span={16} className='left'></Col>
                <Col span={8} className='right'>
                <h1>404 Error</h1>
                <h2>Sorry, we can’t seem to find what you’re looking for.</h2>
                <div>
                    <Button type='primary' onClick={this.goHome}>
                    Back to Home
                    </Button>
                </div>
                </Col>
            </Row>
        )
    }
}

export default connect(
    null,
    {setHeadTitle}
)(NotFond)
