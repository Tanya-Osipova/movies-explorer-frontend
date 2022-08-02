import React from 'react';
import { withRouter } from 'react-router-dom'; 
import FormContainer from '../FormContainer/FormContainer';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import * as userAuth from '../../utils/userAuth.js';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // HANDLE CHANGE
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value
    });
  }
  // HANDLE SUBMIT
  handleSubmit(e) {
    e.preventDefault()
    if(this.state.password) {
      const { username, email, password } = this.state;
      userAuth.register(username, email, password).then((res) => {
        if(res) {
          this.setState({
            message: 'Success'
          }, () => {
            this.props.history.push('/signin');
          })
        } else {
          this.setState({
            message: 'Error'
          })
        }
      })
    }
  }
  
  render() {
    return (
      <div className='register'>
        <Logo />
        <FormContainer
          title='Welcome!'
          question='Already have an account?'
          link='signin'
          linkName='Login'
          onSubmit={this.handleSubmit}
        >
          {/* USERNAME */}
          <InputField 
            type='text'
            id='username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          >
            Username
          </InputField>
          {/* EMAIL */}
          <InputField
            type='email'
            id='email'
            name='email'
            value={this.state.email} 
            onChange={this.handleChange}
          >
            Email
          </InputField>
          {/* PASSWORD */}
          <InputField 
            type='password'
            id='password'
            name='password'
            value={this.state.password} 
            onChange={this.handleChange}
          >
            Password
          </InputField>
          {/* BUTTON */}
          <Button type="submit">
            Sign up
          </Button>
        </FormContainer>
      </div>
    )
  }
};

export default withRouter(Register); 
