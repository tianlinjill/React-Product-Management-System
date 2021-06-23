import React, { Component } from 'react'
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react'
export default class Line extends Component {
    state = {
    sales: [5, 20, 36, 10, 10, 20], 
    stores: [6, 10, 25, 20, 15, 10], 
    }
    update = () => {
    this.setState(state => ({
      sales: state.sales.map(sale => sale + 1),
      stores: state.stores.reduce((pre, store) => {
        pre.push(store-1)
        return pre
      }, []),
    }))
    }
    getOption = (sales, stores) => {
    return {
      title: {
        text: 'Meal Catetegory In stock VS sales '
      },
      tooltip: {},
      legend: {
        data:['sales', 'In stock']
      },
      xAxis: {
        data: ["Muscle Gain","Calorie Control","Meals for Every Body","Performance","Cheat Meals","Healthy Snacks"]
      },
      yAxis: {},
      series: [{
        name: 'sales',
        type: 'line',
        data: sales
      }, {
        name: 'In stock',
        type: 'line',
        data: stores
      }]
    }
  }

    render() {
      const {sales, stores} = this.state
    return (
      <div>
        <Card>
          <Button type='primary' onClick={this.update}>update</Button>
        </Card>

        <Card title='Line chart'>
          <ReactEcharts option={this.getOption(sales, stores)} />
        </Card>

      </div>
    )
    }
}
