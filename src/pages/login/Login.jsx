import React, {Component} from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Icon, Input, Button,message  } from 'antd';
import { reqLogin } from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';

const Item = Form.Item
/*
login component router
 */
class Login extends Component {
  handleSubmit = (event) => {
      // stop event's default behavior(auto submit)
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        // request for user login
        const result = await reqLogin(username, password)
        // login success!
        if (result.status === 0) {
          //login success
          message.success('Login success! Welcome to Management System!')
          //
          const user = result.data;
         
          // save the logined user's data to utils files
          memoryUtils.user = user;// save in memory
          storageUtils.saveUser(user);// save in local

          //Route to Admin page
          this.props.history.replace('/')
        } else {
          // login failed!
          message.error(result.msg)
        }
      } else {
        console.log('login Failed!');
      }
    });
      
  }
  //validator for password
  validatorPwd=(rule, value, callback) => {
    console.log('validatorPwd', rule, value);
    if (!value) {
      callback('Password is required!')
    } else if (value.length < 5) {
      callback('Password length should at least 5!')
    } else if (value.length > 12) {
      callback('Password length should be less than 12!')
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      callback('Password shoule be character, number or underline!')
    } else {
      //verification passed
      callback()
    }
  }

  render() {
    // if user logined, redired to admin page
    const user = memoryUtils.user;
     
    if (user && user._id) {
      return <Redirect to='/'/>
    }



    const form = this.props.form;
    const { getFieldDecorator } = form;

    //user not log in
    return (
      <div className="login">
          <header className="login-header">
            <img src={logo} alt="logo"/>
            <h1>React Project: Back-end Management System</h1>
          </header>
          <section className="login-content">
            <h2>User Login</h2>
            {/*login from start*/}
              <Form onSubmit={this.handleSubmit} className="login-form">
              <Item>
              {
                getFieldDecorator('username', {
                  //username verify rules
                  rules: [
                    { required: true,whitespace:true, message: 'Please input your username!' },
                    { min: 5, message: 'Username should input at least 4-12 charecters!' },
                    { max: 12, message: 'Username should input at least 4-12 charecters!' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username shoule be character, number or underline!' },
                  
                  
                  ],
                })(
                  <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Username"
                />
                )  
              }
            </Item>
            <Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      validator:this.validatorPwd
                    }
                  ]
                })(
                  <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="Password"
                />
                )
              }
              </Item>
              <Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
              </Item>
            </Form>
          </section>
      </div>
    )
    }
}

const WrapLogin = Form.create()(Login)
export default WrapLogin
/**
 * 1. front-end form verification
 *  1.1 verify rules
 *    a. user must input
 *    b. number must between 4-12 
 *    c. input must be characters number or underline
 *          
 * 2. collect form input data
 * 
 * 
 */


