import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as userAuth from '../../utils/userAuth.js';
import FormContainer from '../FormContainer/FormContainer';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Button';
import Logo from '../Logo/Logo';
import PopupMessage from '../PopupMessage/PopupMessage.js';
//import useInput from '../../hooks/useInput.js';
import './Login.css';

/*
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      popup: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChange(e) {
    const {name, value} = e.target;
    this.setState({
      [name]: value 
    });
  }

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
         
          <FormInput
            type= "email"
            id='email'
            name='email'
            value={this.state.email} 
            onChange={this.handleChange}
          >
            Email
          </FormInput>
          
          <FormInput 
            type= "password"
            id='password'
            name='password'
            value={this.state.password} 
            onChange={this.handleChange}
          >
            Password
          </FormInput>
          
          <Button type="submit" className="button">
            Login
          </Button>
        </FormContainer>
        
        <PopupMessage 
          message={this.state.message}
          isOpen={this.state.popup}
        />
      </div>
    );
  } 
};
*/
function Login(props) {
  const [message, setMessage] = useState('')
  const [popupActive, setPopupActive] = useState(false)
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    if (!message) return
    setPopupActive(true)
    const timer = setTimeout(() => {
      setPopupActive(false)
    }, 3000);
    return () => clearTimeout(timer) 
  }, [])
  
  // HANDLE CHANGE
  function handleChange(e) {
    const {name, value} = e.target

    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  // HANDLE SUBMIT
  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      return;
    }
  
    userAuth.authorize(formData.email, formData.password)
      .then((data) => {
        if (data) {
          setFormData({
            email: '',
            password: ''
          })
          props.handleLogin(e)
          history.push('/movies')
        } else {
          setMessage('Error')
        }})
        .catch(err => setMessage(err.message))
  } 

  return (
    <div className='login'>
      <Logo />
      <FormContainer
        title='Nice to see you!'
        question='Not a member yet?'
        link='signup'
        linkName='Sign up'
        onSubmit={handleSubmit}
      >
        {/* EAMIL */}
        <FormInput
          type= "email"
          id='email'
          name='email'
          value={formData.email} 
          onChange={handleChange}
        >
          Email
        </FormInput>
        
        {/* PASSWORD */}
        <FormInput 
          type= "password"
          id='password'
          name='password'
          value={formData.password} 
          onChange={handleChange}
        >
          Password
        </FormInput>
        
        {/* BUTTON */}
        <Button type="submit" className="button">
          Login
        </Button>
      </FormContainer>
        
      {/* POPUP MESSAGE */}
      <PopupMessage 
        message={message}
        popupActive={popupActive}
        setPopupActive={setPopupActive}
      />
    </div>
  )
}

export default Login;
