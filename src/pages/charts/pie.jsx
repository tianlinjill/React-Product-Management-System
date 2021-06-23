import React, {Component} from 'react'
import {Card} from 'antd'
import ReactEcharts from 'echarts-for-react'

/*
后台管理的饼图路由组件
 */
export default class Pie extends Component {

  getOption = () => {
    return {
      title : {
        text: 'Customer source Date',
        subtext: 'only for example',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['direct visit','Google A.D','Insgram A.D','Youtuber','Search engine']
      },
      series : [
        {
          name: 'Customer source',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:335, name:'Direct visit'},
            {value:310, name:'Google A.D'},
            {value:234, name:'Insgram A.D'},
            {value:135, name:'Youtuber'},
            {value:1548, name:'Search engine'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

  }

 
  render() {
    return (
      <div>
        <Card title='Customers source Graph'>
          <ReactEcharts option={this.getOption()} style={{height: 400}}/>
        </Card>
      </div>
    )
  }
}
