import {useState} from "react";
import './Navigation.css';
import Logo from "./../../icons/ic-logo.svg";
import Navtoggle from "./../../icons/ic-sidebar.svg";
import IcHome from "../../icons/ic-home.svg" ;
import IcManage from "../../icons/ic-manage.svg" ;
import IcCalender from "../../icons/ic-calendar.svg" ;
import IcNotification from "../../icons/ic-notification.svg" ;
import IcControl from "../../icons/ic-control.svg" ;
import IcHelp from "../../icons/ic-help.svg" ;
import IcSettings from "../../icons/ic-setting.svg" ;
import IcExit from "../../icons/ic-exit.svg" ;


function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(prev => !prev);

  return (
    <nav className={`${isOpen ? 'navClosed' : 'navOpen'}`}>
      <header>
        <div className="logo-wrapper">
          <div className="logo">
            <button><img src={Logo} alt="logo" /></button>
          </div>
          <div className="nav-toggle">
            <button onClick={() => handleClick(isOpen)}><img src={Navtoggle} alt="menu" /></button>
          </div>
        </div>
      </header>
      <div className="main-nav">
        <ul>
          <li className="logo nav-logo home">
            <img src={IcHome} alt="logo" />
            <span>Home</span>
          </li>
          <li className="logo nav-logo manage">
            <img src={IcManage} alt="logo" />
            <span>User management</span>
          </li>
          <li className="logo nav-logo event">
            <img src={IcCalender} alt="logo" />
            <span>Events</span>
          </li>
          <li className="logo nav-logo notification">
            <img src={IcNotification} alt="logo" />
            <span>Notifications</span>
          </li>
          <li className="logo nav-logo control">
            <img src={IcControl} alt="logo" />
            <span>Access Control</span>
          </li>
        </ul>
      </div>

      <div className="system-nav">
        <ul>
          <li className="logo nav-logo support">
            <img src={IcHelp} alt="logo" />
            <span>Support</span>
          </li>
          <li className="logo nav-logo settings">
            <img src={IcSettings} alt="logo" />
            <span>Settings</span>
          </li>
        </ul>
      </div>
      <div className="account-nav">
        <ul>
          <li className="logo nav-logo exit">
            <img src={IcExit} alt="logo" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
