import './Auth.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService'; 
import { toast } from 'react-toastify'; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {ImSpinner10} from "react-icons/im";
import {useDispatch} from 'react-redux';
import { doLogin } from '../../redux/action/userAction'; // Assuming you have a userSlice with doLogin action
const Login = (props)=>{
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleShowSignUp = () => {
        navigate('/signup');
    }
    const validateEmail = (email) => {
        return String(email).toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    };
    const handleLogin = async() => {
        const isValidEmail = validateEmail(email);
        if(!email || !isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if(!password) {
            toast.error("Invalid password");
            return;
        } 
        setIsLoading(true);
        let data= await postLogin(email, password);
        if(data && +data.EC === 0) {
            dispatch(doLogin(data));
            toast.success(data.EM);
            setIsLoading(false);
            navigate('/');
        } 
        if(data && +data.EC !== 0) {
            toast.error(data.EM);
            setIsLoading(false);
        }
    }
    return (
        <div className="auth-container">
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button className='btn-submit' style={{background: "#ccc"}} onClick={()=>handleShowSignUp()}>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>Typeform</div>
            <div className='welcome col-4 mx-auto'>Hello, who's this?</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className="form-control" value={email}
                        onChange={(event)=>setEmail(event.target.value)}/>
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                        />
                        <span style={{
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: '#888',  
                        }}
                        onClick={() => setShowPassword(!showPassword)}
                        >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    </div>
                    <span className="forot-password">Forgot password ?</span>
                    <div>
                        <button className='btn-submit mx-auto'
                            onClick={()=>handleLogin()}
                            disabled={isLoading}>
                            {isLoading===true && <ImSpinner10 className='loader-icon' /> }
                            <span>Login</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <span className="back" onClick={()=>{navigate('/')}}>&#60;&#60;  Go to HomePage</span>
                    </div>
            </div>
        </div>  
    )
}
export default Login;