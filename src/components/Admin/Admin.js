import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import {Outlet} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation} from 'react-i18next';
import Language from "../Header/Language";
import NavDropDown from 'react-bootstrap/NavDropdown';
import AdminProfile from './AdminProfile';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { doLogout } from '../../redux/action/userAction';
import {useNavigate} from 'react-router-dom';
import { Logout } from "../../services/apiService";
const Admin = (props) => {
    const { t } = useTranslation();
    const [isShowModelProfile, setIsShowModelProfile] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const account = useSelector(state => state.user.account);
    const dispatch=useDispatch();
    const navigate = useNavigate();
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
        <>
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <div className="admin-header-left">
                        <FaBars style={{fontSize:"20px", cursor:"pointer"}}onClick={() => setCollapsed(!collapsed)} />
                        <div className="content">{t('admin.page')}</div>
                    </div>
                    <div className="admin-header-right">
                        <Language />
                        <NavDropDown className="nav-a" title={t('homepage.setting')} id="basic-nav-dropdown">
                            <NavDropDown.Item onClick={()=> setIsShowModelProfile(true)}>{t('homepage.profile')}</NavDropDown.Item>
                            <NavDropDown.Item onClick={()=>handelLogout()}>{t('homepage.logout')}</NavDropDown.Item>
                        </NavDropDown>
                    </div>
                      
                    
                </div>
                <div className="admin-main">
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>                     
            </div>      
        </div>
        <AdminProfile 
            show={isShowModelProfile}
            setShow={setIsShowModelProfile} />
        </>
    )
}
export default Admin;