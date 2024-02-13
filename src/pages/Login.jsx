import React, { useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import EndPoints from '../config/EndPoints';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const navigate = useNavigate();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    function handleLogin(e){
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if(email && password){
             // fetching the login api
        fetch(`${EndPoints.Base_url}${EndPoints.Login}`, {
            method : 'POST',
            headers : {
                "Content-Type" : 'application/json',
            },
            body : JSON.stringify({
                email,
                password,
            })
        })
        .then((response) => response.json())
        .then((result) => {
            if(result.success){
                toast.success(result.message);
                navigate('/');
            }else{
                toast.warning(result.message);
            }
        })
        .catch((err) => {
            toast.error(err)
        });
        }else{
            alert('Email and password are required to login');
        }     
    }
    
  return (
    <div className='container d-flex text-start'>
        <div className='card p-0' style={{"width" : "400px"}}>
            <div className='card-body'>
            <h3 className='mb-3'>Login In</h3>
            <div class="mb-3" >
                <label htmlFor='email' className='form-label'>Email address</label>
                <input type="email" id='email' ref={emailRef} className="form-control" placeholder="name@example.com"/>  
            </div>
            <div class="mb-3">
                <label htmlFor='password' className='form-label'>Password</label>
                <input type="password" id='password' ref={passwordRef} className="form-control" placeholder="********"/>
            </div>
            <div class="d-grid gap-2 mb-3">
                <button class="btn btn-primary" type="button" onClick={handleLogin}>Sign In</button>
            </div>
            <div>
                <p>
                    Forgot Password?
                    <span><Link to={'/passwordReset'}>Reset Now</Link></span>
                </p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Login