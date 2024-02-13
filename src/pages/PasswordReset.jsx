import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import EndPoints from '../config/EndPoints';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordReset = () => {
    const navigate = useNavigate();
    // () => 
    const emailRef = useRef(null);

    function handlePasswordReset(e){
        e.preventDefault();

        const email = emailRef.current.value;

        if(email){
            fetch(`${EndPoints.Base_url}${EndPoints.Forgot_Password}`, {
                method: 'POST',
                headers : {
                    "Content-Type" : 'application/json',
                },
                timeout:16000,
                body : JSON.stringify({
                    email,
                })
            })
            .then((response) => {
                 return response.json();
            })
            .then((result) => {
                if(!result.success){
                    toast.warning(result.message);
                    navigate('/signup')
                }else{
                    toast.info(`We sent an email to your ${email}`);
                }
            })
            .catch((err) => toast.error(err));
        }else{
            alert('email id is required');
        }
    }

  return (
    <div className='container d-flex text-start'>
        <div className='card p-0' style={{"width" : "400px"}}>
            <div className='card-body'>
            <h3 className='mb-3'>Reset Password</h3>
            <div class="mb-3" >
                <label htmlFor='email' className='form-label'>Email address</label>
                <input type="email" id='email' ref={emailRef} className="form-control" placeholder="name@example.com"/>  
            </div>
            <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button"
                 onClick={handlePasswordReset}>Reset Password</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default PasswordReset