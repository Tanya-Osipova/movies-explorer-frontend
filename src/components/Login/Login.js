import React from 'react';
import { withRouter } from 'react-router-dom';
import * as userAuth from '../../utils/userAuth.js';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import PopupMessage from '../PopupMessage/PopupMessage.js';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
    if (!this.state.email || !this.state.password) {
      return;
    }
    userAuth.authorize(this.state.email, this.state.password)
    .then((data) => {
      if (data) {
        this.setState({
          email: '', 
          password: ''
        }, () => {
          this.props.handleLogin(e);
          this.props.history.push('/movies');
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
    .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='login'>
        <Logo />
        <FormContainer
          title='Nice to see you!'
          question='Not a member yet?'
          link='signup'
          linkName='Sign up'
          onSubmit={this.handleSubmit}
        >
          {/* EMAIL */}
          <FormInput
            type='email'
            id='email'
            name='email'
            required
            value={this.state.email} 
            onChange={this.handleChange}
          >
            Email
          </FormInput>
          {/* PASSWORD */}
          <FormInput 
            type='password'
            id='password'
            name='password'
            required
            value={this.state.password} 
            onChange={this.handleChange}
          >
            Password
          </FormInput>
          {/* BUTTON */}
          <Button type="submit" className="button">
            Login
          </Button>
        </FormContainer>
        {/* MESSAGE POPUP */}
        <PopupMessage 
          message={this.state.message}
          isOpen={this.state.popup}
        />
      </div>
    );
  } 
};

export default withRouter(Login);
