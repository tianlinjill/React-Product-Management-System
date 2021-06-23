import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactECharts from 'echarts-for-react'; 
export default class Bar extends Component {

    //bar chart's init object  
    getOption = () => {
        return {
            title: {
                text: 'Top 6 Sales Meals',
                x:'center'
            },
            tooltip: {},
            legend: {
                data:['Sales Date']
            },
            xAxis: {
                data: ["Satay Chicken Rice","Beef pasta","Superfood Bowl","Crumbed Chicken","Beef Massaman","Cajun Chicken"]
            },
            yAxis: {},
            series: [{
                name: 'sales',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    }


    render() {
        return (
            <div>
                <Card>
                    <Button type='primary' onClick = {this.update}></Button>                    
                </Card>
                <Card title='Bar-Chart'>
                    <ReactECharts option={this.getOption()} />
                </Card>
            </div>
        )
    }
}
