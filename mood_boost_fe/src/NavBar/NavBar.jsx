import homebtn from "../icons/homebtn"
import "./NavBar.css";
import { NavLink } from 'react-router-dom';


function NavBar () {
    return (
        <nav>
            <NavLink to="/" className="home">
                <img className="homebtn" src={ homebtn } alt="Back to home page" />
            </NavLink>
            <ul>
                <li><NavLink ></NavLink></li>
                <li><NavLink ></NavLink></li>
                <li><NavLink ></NavLink></li>
            </ul>
        </nav>
        

    )
}

export default NavBar;