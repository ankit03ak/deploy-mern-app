import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../utils/utils';

const Signup = () => {

    const [signInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    

    const handleChange = (e) =>{
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = {...signInfo}
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }


    const handleSignup = async (e) =>{
        e.preventDefault();
        const { name, email, password } = signInfo;
        if(!name || !email || !password){
            return handleError('name , email and password required')
        }
        try {
            const url = "https://deploy-mern-app-api.vercel.app/signup"
            const response = await fetch(url, {
                method : "POST",
                headers : {
                    'Content-Type' : 'application/json'

                },
                body : JSON.stringify(signInfo)
            })

            const result = await response.json();

            const { success, message, error } = result;

            console.log(success, message);
            console.log(result)

            if(success){
                handleSuccess(message);
                setTimeout(()=>{
                    navigate('/login')
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
            // console.log("Something went wrong \n", error)
            handleError(error)
        }
    }

  return (
    <div className='container'>
        <h1>Signup</h1>
        <form onSubmit={handleSignup}>
                <div>
                <label htmlFor='name'> Name</label>
                <input
                    onChange={handleChange}
                    type = 'text'
                    name = 'name'
                    autoFocus
                    placeholder='Enter Your Name...'
                    value = {signInfo.name}
                    />
            </div>
                <div>
                <label htmlFor='email'> Email</label>
                <input
                    onChange={handleChange}
                    type = 'email'
                    name = 'email'
                    autoFocus
                    placeholder='Enter Your Email...'
                    value = {signInfo.email}

                    />
            </div>
                <div>
                <label htmlFor='password'> Password</label>
                <input
                    onChange={handleChange}
                    type = 'password'
                    name = 'password'
                    autoFocus
                    placeholder='Create Password...'
                    value = {signInfo.password}

                />
            </div>
            <button>Signup</button>
            <span> Already have an account ? 
                <Link to='/login'>Login</Link>
            </span>
        </form>
        <ToastContainer />

    </div>
  )
};

export default Signup;
