
import React from 'react';
import Logo from './img/Logo.png';
// import {Link, useNavigate} from 'react-router-dom';
// import ChatLogout from './img/ChatLogout.png';
// import ChatDashboard from './img/ChatDashboard.png';


// import Chat from './img/Chat.png';
// import Notification from './img/Notification.png';

//Create a new functional header component
const Header = () => (
        <header>
            <nav className="nav">

            <img className="nav-logo" src={Logo} alt="Logo" />
                <ul className="nav-items">
                    <li>About</li>
                    <li>Contact</li>
                    
                </ul>
                <button className="login-button" to='/login'><a href='/Login'>Login</a></button>
                <button className="request-demo"><a href='/Register'>Register</a></button>
                

            </nav>
        </header>
    
);

export default Header;
// const Header = () => (

//     <div className = "main_header">
//         <div className = "header">
//             {/* <img className = "logo" src={Logo} alt="Logo" /> */}
//             <button className = "header_logout_button" ><a href="https://react.school" target="_blank">Help</a></button>
//             <button className = "header_logout_button" ><a href="https://react.school" target="_blank">Logout</a></button>
//             <button className = "header_open_dashboard_button" ><a href="https://react.school" target="_blank">Dashboard</a></button>
//             <img className = "header_icon" src={Notification} alt="Notification" width={50} />
//             <img className = "header_icon" src={Chat} alt="Chat" width={50} />
//         </div>
//     </div>
// );

// export default Header;
