import 'react-pro-sidebar/dist/css/styles.css';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';

import {FaGem} from 'react-icons/fa';
import sidebarBg from '../../assets/bg2.jpg';


import { DiReact } from "react-icons/di";
import { MdDashboard } from "react-icons/md";

import './SideBar.scss';
import {Link, useNavigate} from 'react-router-dom';

const SideBar = (props) => {
    const navigate = useNavigate();
    const { collapsed, toggled, handleToggleSidebar } = props;
    return (
        <>
            <ProSidebar
                image={sidebarBg}
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                onToggle={handleToggleSidebar}
            >
            <SidebarHeader>
                <div style={{
                    paddingTop: '24px',
                    paddingBottom: '24px',
                    paddingLeft: '13px',
                    paddingRight: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    fontSize: 18,
                    letterSpacing: '1px',
                }}
            >
            <DiReact size={'3em'} color={"00bfff"} />
            {!collapsed && (
                <span
                    style={{ fontSize: "20px", paddingLeft: "10px", verticalAlign: "middle" }}
                    onClick={() => navigate('/')}
                >
                    Admin
                </span>
            )}
            </div>
        </SidebarHeader>

                <SidebarContent>
                    <Menu iconShape="circle">
                        <MenuItem
                            icon={<MdDashboard style={{fontSize:"25px"}}/>}
                            style={{fontSize:"15px"}}
                        >
                            Dashboard
                            <Link to="/admins" />
                        </MenuItem>
                    </Menu>
                    <Menu iconShape="circle">
                        <SubMenu
                            icon={<FaGem style={{fontSize:"25px"}}/>}
                            title="Features"
                            style={{fontSize:"15px"}}
                        >
                            <MenuItem> 
                                Quản lý Users
                                <Link to="/admins/manage-users" />
                            </MenuItem>
                            <MenuItem> 
                                Quản lý Bài Quiz
                                <Link to="/admins/manage-quiz" />
                            </MenuItem>
                            <MenuItem> 
                                Quản lý Câu Hỏi
                                <Link to="/admins/manage-questions" />
                            </MenuItem>
                        </SubMenu>

                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 20px',
                        }}
                    >
                        <a
                            href="https://github.com/dangngockhieu/React"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                        <span style={{ display: 'flex', alignItems: 'center',whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                            <span style={{ fontSize: "21.5px" }}>&#169;</span > 
                            <span style={{fontSize: "13px"}}>View Source</span>
                        </span>
                        </a>
                    </div>
                </SidebarFooter>
            </ProSidebar>
        </>
    )
}

export default SideBar;