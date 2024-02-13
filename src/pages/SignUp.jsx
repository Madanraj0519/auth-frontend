import React, { useRef, useState } from 'react';
import EndPoints from '../config/EndPoints';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const userNameRef = useRef(null);
    const userEmailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSignUp(e) {
        e.preventDefault();

        const userName = userNameRef.current.value;
        const userEmail = userEmailRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        const password = passwordRef.current.value;

        if (userName && userEmail) {
            try {
                const response = await fetch(`${EndPoints.Base_url}${EndPoints.CREATE_USER}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: userName,
                        email: userEmail,
                        phoneNumber: phoneNumber,
                        password: password
                    })
                });

                const result = await response.json();
                console.log(result);
                if (result.success) {
                    toast.success(result.message);
                    navigate('/');
                } else {
                    toast.warning(result.message);
                }
            } catch (err) {
                console.error(err);
                setErrorMessage('An error occurred while signing up.');
            }
        } else {
            setErrorMessage('Please fill out all fields.');
        }
    }

    return (
        <div className='container d-flex text-start'>
            <div className='card p-0' style={{ "width": "400px" }}>
                <div className='card-body'>
                    <h3 className='mb-3'>Sign Up</h3>
                    <div className="mb-3" >
                        <label htmlFor='name' className='form-label'>User Name</label>
                        <input type="text" id='name' ref={userNameRef} className="form-control" placeholder="John" />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor='email' className='form-label'>Email address</label>
                        <input type="email" id='email' ref={userEmailRef} className="form-control" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor='phoneNumber' className='form-label'>Phone Number</label>
                        <input type="text" id='phoneNumber' ref={phoneNumberRef} className="form-control" placeholder="+91 1234567890" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input type="password" id='password' ref={passwordRef} className="form-control" placeholder="********" />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="button" onClick={handleSignUp}>Sign Up</button>
                    </div>
                    {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
                </div>
            </div>
        </div>
    )
}

export default SignUp;
