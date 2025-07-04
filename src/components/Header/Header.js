import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavDropDown from 'react-bootstrap/NavDropdown';
import {Logout} from "../../services/apiService";
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation} from 'react-i18next';
import './Header.scss'; 
import { GrReactjs } from "react-icons/gr";
const Header = () => {
  const { t } = useTranslation();
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const handleShowLogin =()=>{
    navigate('/login');
  }
  const handleShowSignUp = () => {
    navigate('/signup');
  }
  const handelLogout = async() => {
    if (!account.email || !account.refresh_token) {
    toast.error("Please login again!");
    dispatch(doLogout());
    navigate('/login');
    return;
  }
    let res = await Logout(account.email, account.refresh_token);
    if(res && res.EC===0){
      dispatch(doLogout());
      navigate('/login');
    }
    else{
      toast.error(res.EM);
    }
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand  style={{ fontSize: "3rem",         
            fontWeight: 600,
            lineHeight: "1.2",
            marginRight: "1.5rem",    
            paddingBottom: "1rem",
            gap: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            }}>
              <div ><GrReactjs style={{animation: "spin 5s infinite linear", 
                transformOriginX: "center",
                transformOriginY: "center", color:"#007bff"}} /> 
              </div>
              App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link nav-strong" style={{ fontSize: "1.5rem" }}>{t('homepage.home')}</NavLink>
            <NavLink to="/users" className="nav-link nav-strong" style={{ fontSize: "1.5rem" }}>{t('homepage.user')}</NavLink>
            <NavLink to="/admins" className="nav-link nav-strong" style={{ fontSize: "1.5rem" }}>{t('homepage.admin')}</NavLink>
          </Nav>
          <Nav className="align-items-center">
                       
            {isAuthenticated ===false ?
              <>
               <button className='btn-login' style={{background: "#ccc"}} onClick={()=>handleShowLogin()}>{t('homepage.login')}</button>
              <button className='btn-signup' onClick={()=>handleShowSignUp()}>{t('homepage.signup')}</button>
              </>
            :
            <NavDropDown className="nav-a" title={t('homepage.setting')} id="basic-nav-dropdown">
              <NavDropDown.Item>{t('homepage.profile')}</NavDropDown.Item>
              <NavDropDown.Item onClick={()=>handelLogout()}>{t('homepage.logout')}</NavDropDown.Item>
            </NavDropDown>
            }
            <div className="ps-2">
              <Language />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;