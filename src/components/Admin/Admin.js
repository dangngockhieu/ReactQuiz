import SideBar from "./SideBar";
import './Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import {Outlet} from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation} from 'react-i18next';
import Language from "../Header/Language";
import NavDropDown from 'react-bootstrap/NavDropdown';
const Admin = (props) => {
    const { t } = useTranslation();
    const [collapsed, setCollapsed] = useState(false);

    return (
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
                            <NavDropDown.Item>{t('homepage.profile')}</NavDropDown.Item>
                            <NavDropDown.Item >{t('homepage.logout')}</NavDropDown.Item>
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
    )
}
export default Admin;