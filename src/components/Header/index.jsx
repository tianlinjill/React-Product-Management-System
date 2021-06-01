import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import WeatherIcon from 'react-open-weather-icons'
import './index.less'
import { reqWeather } from '../../api'
import { Modal } from 'antd';
import { fromateDate } from '../../utils/dateUtils'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button'
import { connect } from 'react-redux'
import {logout} from '../../redux/actions'

 class Header extends Component {
    state = {
        currentTime: fromateDate(Date.now()),
        weatherIcon: '',
        weather: '',
     }
     
    getWeather = async () => {
        const { weather } = await reqWeather()
        this.setState({
            weatherIcon: weather[0].icon,
            weather:weather[0].main
        })
     }
     
    getTime = () => {
        this.timer = setInterval(() => {
            const currentTime= fromateDate(Date.now())
            this.setState({currentTime})  
        },1000)
     }

     getTitle = () => {
         var path = this.props.location.pathname
         let title
         menuList.forEach((item) => {
             if (item.key === path) {
                 title = item.title
             } else if (item.children) {
                 //find matched title in all children item
                 const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                 if (cItem) {
                     // cItem existed means find success
                  title = cItem.title   
                 }
             }
         })
         return title
     }

     logOut = () => {
         const { confirm } = Modal;
         confirm({
            title: 'Do you Want to Log out the System?',
            onOk:()=> {
                this.props.logout()
            },
        });
     }
   
    componentDidMount() {
        //get current weather
        this.getWeather()
        //get current time
        this.getTime()
     }
    componentWillUnmount() {
        clearInterval(this.timer)
     }

    render() {
        const { weatherIcon, weather,currentTime } = this.state;
        const username = this.props.user.username
        //const title = this.getTitle()
        const title = this.props.headTitle
        return (
            <div className="Header">
                <div className="header-top">
                    <span>Welcome, { username}</span>
                    <LinkButton type="primary" onClick={this.logOut}>Log out</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{ title}</div>
                    <div className="header-bottom-right">
                        <span>{currentTime}</span>
                        <WeatherIcon name={weatherIcon} className="my-awesome-icon" />
                        <span>{weather}</span>
                    </div>
                </div> 
            </div>
        )
    }
}
export default connect(
    state => ({ headTitle: state.headTitle, user: state.user }),
    {logout}
)(withRouter(Header))