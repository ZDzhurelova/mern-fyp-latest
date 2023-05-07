import React from 'react';
import './/layout.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge } from "antd";




// Receiving props by distructuring the children
function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    //Destructor the user
    const {user} = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    //Create menu with items
    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'ri-home-line',
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'ri-file-list-line',
        },
        //Approve contractor's accoutn
        {
            name: 'Approve',
            path: '/approve-contractor',
            icon: 'ri-hospital-line'

        }];

        const contractorMenu = [
            {
                name: 'Home',
                path: '/',
                icon: 'ri-home-line',
            },
            {
                name: 'Appointments',
                path: '/contractor/appointments',
                icon: 'ri-file-list-line',
            },
            {
                name: 'Profile',
                path: `/contractor/profile${user?._id}`,
                icon: 'ri-user-line'
            },
        ];

        const adminMenu = [
            {
                name: 'Home',
                path: '/',
                icon: 'ri-home-line',
            },
            {
                name: "Users",
                path: "/admin/userslist",
                icon: "ri-user-line",
              },
              {
                name: "Contractors",
                path: "/admin/contractorslist",
                icon: "ri-user-star-line",
              },
              {
                name: "Profile",
                path: "/profile",
                icon: "ri-user-line",
              },
            ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isContractor ? contractorMenu : userMenu;
    const role = user?. isAdmin ? "Admin" : user?.isContractor ? "Contractor" : "User";
    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className={`${collapsed ? 'collapsed-layout-sidebar' : 'layout-sidebar'}`}>
                    <div className='sidebar-header'>
                        <h1 className='role'> {role} </h1>
                    </div>
                    <div className='menu'>
                        {/* Loop through Menu to be rendered */}
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path;

                            return (
                            <div key={menu.name} className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <i className={menu.icon}></i>
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}

                            </div>
                            );
                        })}
                        <div
                            className={`d-flex menu-item `}
                            onClick={() => {
                                localStorage.clear();
                                navigate("/login");
                            }}
                            >
                            <i className="ri-logout-circle-line"></i>
                            {!collapsed && <Link to="/login">Logout</Link>}
                        </div>
                    </div>
                </div>

                <div className='content'>
                    <div className='content-header'>
                        {collapsed ? (
                            <i className="ri-menu-line action-icon" onClick={() => setCollapsed(false)}></i>) : (<i className="ri-close-line  action-icon" onClick={() => setCollapsed(true)}></i>)}
                    
                    <div className='d-flex align-item-center px-4'>
                    <Badge
                        count={user?.unseenNotifications.length}
                        onClick={() => navigate("/notifications")}
                    >
                        <i className="ri-notification-line header-action-icon px-3"></i>
                    </Badge>

                    <Link className='anchor mx-2' to='/profile'>{user?.name}</Link>
                </div>
            </div>
                {/* Render the pages */}
                <div className='content-body'>
                    {children}
                    body
                </div>
            </div>
        </div>
    </div>
    );
}

export default Layout;