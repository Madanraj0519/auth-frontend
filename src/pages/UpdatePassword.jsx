import React, { useRef } from 'react';
import { useNavigate} from 'react-router-dom';
import EndPoints from '../config/EndPoints';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatePassword = () => {

    const navigate = useNavigate();

    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const urlParams = new URLSearchParams(window.location.search);
    const uid = urlParams.get("uid");
    const str = urlParams.get("str");

    console.log(uid);
    console.log(str);

    function handleUpdatePassword(e) {
        e.preventDefault();

        const newPassword = newPasswordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (newPassword && confirmPassword && newPassword === confirmPassword && uid) {
            fetch(`${EndPoints.Base_url}${EndPoints.Update_Password}/${uid}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: confirmPassword,
                })
            })
            .then(response => {
                return response.json();
            })
            .then(result => {
                if (result.success) {
                    toast.success(result.message);
                    navigate('/login');
                }else{
                    toast.warning(result.message);
                }
            })
            .catch(error => {
                toast.error(error);
            });
        } else {
            toast.warning("Password and confirmPassword are invalid");
        }
    }

    return (
        <div className='container d-flex text-start'>
            <div className='card p-0' style={{"width" : "400px"}}>
                <div className='card-body'>
                    <h3 className='mb-3'>Create New Password</h3>
                    <div className="mb-3">
                        <label htmlFor='password' className='form-label'>New Password</label>
                        <input type="password" id='password' ref={newPasswordRef} className="form-control" placeholder="********"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor='confirmPassword' className='form-label'> Confirm Password</label>
                        <input type="password" id='confirmPassword' ref={confirmPasswordRef} className="form-control" placeholder="********"/>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" type="button" onClick={handleUpdatePassword}>Update Password</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdatePassword;
