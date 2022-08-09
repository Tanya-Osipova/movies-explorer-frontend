import React from 'react';
import { withRouter } from 'react-router-dom'; 
import * as userAuth from '../../utils/userAuth.js';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import PopupMessage from '../PopupMessage/PopupMessage.js';
import './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      popup: false
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
    if (this.state.password) {
      const { username, email, password } = this.state;
      userAuth.register(username, email, password).then((res) => {
        if(res) {
          this.setState({
            message: 'Success'
          }, () => {
              this.setState({ popup : true });
              const timer = setTimeout(() => {
              this.setState({ popup : false });
              this.props.history.push('/signin')
            }, 3000)
            return () => clearTimeout(timer)
          })
        } else {
          this.setState({
            message: 'Error'
          }, () => {
            this.setState({ popup : true });
            const timer = setTimeout(() => {
            this.setState({ popup : false });
            }, 3000);
            return () => clearTimeout(timer)
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
          <FormInput 
            type='text'
            id='username'
            name='username'
            value={this.state.username}
            onChange={this.handleChange}
          >
            Username
          </FormInput>
          {/* EMAIL */}
          <FormInput
            type='email'
            id='email'
            name='email'
            value={this.state.email} 
            onChange={this.handleChange}
            required
          >
            Email
          </FormInput>
          {/* PASSWORD */}
          <FormInput 
            type='password'
            id='password'
            name='password'
            value={this.state.password} 
            onChange={this.handleChange}
            required
          >
            Password
          </FormInput>
          {/* BUTTON */}
          <Button type="submit">
            Sign up
          </Button>
        </FormContainer>
        {/* MESSAGE POPUP */}
        <PopupMessage 
          message={this.state.message}
          isOpen={this.state.popup}
        />
      </div>
    )
  }
};

export default withRouter(Register); 
