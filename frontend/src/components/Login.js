import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils/utils';

const Login = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    

    const handleChange = (e) =>{
        const { name, value } = e.target;
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    }


    const handleLogin = async (e) =>{
        e.preventDefault();
        const {email, password } = loginInfo;
        if(!email || !password){
            return handleError('name , email and password required')
        }
        try {
            const url = "https://loginsign-mern-app-api.vercel.app/auth/login"
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'

                },
                body : JSON.stringify(loginInfo)
            })

            const result = await response.json();
            const { success, message, error, jwtToken, name } = result;

            

            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)
                setTimeout(()=>{
                    navigate('/home')
                }, 1000)
            }
            else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }
            else if(!success){
                handleError(message);
            }

        } catch (error) {
            handleError(error)
        }
    }

  return (
    <div className='container'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
                <div>
                <label htmlFor='email'> Email</label>
                <input
                    onChange={handleChange}
                    type = 'email'
                    name = 'email'
                    autoFocus
                    placeholder='Enter Your Email...'
                    value = {loginInfo.email}

                    />
            </div>
                <div>
                <label htmlFor='password'> Password</label>
                <input
                    onChange={handleChange}
                    type = 'password'
                    name = 'password'
                    autoFocus
                    placeholder='Enter Password...'
                    value = {loginInfo.password}

                />
            </div>
            <button>Login</button>
            <span> Don't have an account ? 
                <Link to='/signup'>Signup</Link>
            </span>
        </form>
        <ToastContainer />

    </div>
  )
};

export default Login;
