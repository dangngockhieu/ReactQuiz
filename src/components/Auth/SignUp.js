import './Auth.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postSignUp } from '../../services/apiService'; 
import { toast } from 'react-toastify'; 
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useTranslation} from 'react-i18next';
import Language from '../Header/Language';
const SignUp = (props)=>{
    const { t } = useTranslation();

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const handleShowLogin =()=>{
        navigate('/login');
    }
    const validateEmail = (email) => {
        return String(email).toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    };
    const handleSignUp = async() => {
        //validate 
        const isValidEmail = validateEmail(email);
        if(!email || !isValidEmail) {
            toast.error("Invalid email");
            return;
        }
        if(!password) {
            toast.error("Invalid password");
            return;
        } 
  let data = await postSignUp(email, password);
  if(data && data.EC === 0) {
    toast.success("SignUp successfully");
    navigate('/login');
  } 
  if(data && data.EC !== 0) {
    toast.error(data.message);
  }
}
    
    return (
        <div className="auth-container">
            <div className='header'>
                <span>{t('signup.title1')}</span>
                <button className='btn-submit' style={{background: "#ccc"}} onClick={()=>handleShowLogin()}>{t('signup.login')}</button>
                <Language />
            </div>
            <div className='title col-4 mx-auto'>App</div>
            <div className='welcome col-4 mx-auto'>{t('signup.title2')}</div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className="form-control" value={email}
                        onChange={(event)=>setEmail(event.target.value)}/>
                </div>

            <div className='form-group'>
                <label>{t('signup.username')}</label>
                    <input type='text' className="form-control" value={username}
                        onChange={(event)=>setUsername(event.target.value)}/>
            </div>

            <div className='form-group'>
                <label>{t('signup.password')}</label>
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

                <div>
                    <button className='btn-submit mx-auto'
                        onClick={()=>handleSignUp()}
                    >{t('signup.title3')}</button>
                </div>

                <div className="text-center">
                    <span className="back" onClick={()=>{navigate('/')}}>{t('signup.gotohomepage')}</span>
                </div>
            </div>
        </div>  
    )
}
export default SignUp;