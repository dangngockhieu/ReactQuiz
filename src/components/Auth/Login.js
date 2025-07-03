import './Auth.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiService'; 
import { toast } from 'react-toastify'; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {ImSpinner10} from "react-icons/im";
import {useDispatch} from 'react-redux';
import { doLogin } from '../../redux/action/userAction'; 
import Language from '../Header/Language';
import { useTranslation} from 'react-i18next';
const Login = (props)=>{
    const { t } = useTranslation();

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
    const handleKeyDown = (event) => {
        if(event.key === 'Enter') {
            handleLogin();
        }
    }
    return (
        <div className="auth-container">
            <div className='header'>
                <span>{t('homepage.title_login1')}</span>
                <button className='btn-submit' style={{background: "#ccc"}} onClick={()=>handleShowSignUp()}>{t('homepage.signup')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>App</div>
            <div className='welcome col-4 mx-auto'>{t('homepage.title_login3')}</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' 
                        className="form-control" 
                        value={email}
                        onChange={(event)=>setEmail(event.target.value)}
                        onKeyDown={(event) => handleKeyDown(event)}
                    />
                </div>
                <div className='form-group'>
                    <label>{t('homepage.password')}</label>
                    <div style={{ position: 'relative' }}>
                        <input type={showPassword ? "text" : "password"}
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} 
                            onKeyDown={(event) => handleKeyDown(event)}
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
                    <span className="forot-password">{t('homepage.title_login2')}</span>
                    <div>
                        <button className='btn-submit mx-auto'
                            onClick={()=>handleLogin()}
                            disabled={isLoading}>
                            {isLoading===true && <ImSpinner10 className='loader-icon' /> }
                            <span>{t('homepage.login')}</span>
                        </button>
                    </div>
                    <div className="text-center">
                        <span className="back" onClick={()=>{navigate('/')}}>{t('homepage.gotohomepage')}</span>
                    </div>
            </div>
        </div>  
    )
}
export default Login;