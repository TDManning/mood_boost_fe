import { NavLink } from 'react-router-dom';
import "./NavBar.css";
import homebtn from '../icons/home.png';
import HomePage from "../HomePage/HomePage";
import BreathingPage from '../BreathingPage/BreathingPage';
import QuotePage from '../QuotePage/QuotePage';
import JokePage from '../JokePage/JokePage';


function NavBar () {
    return (
        <nav className="navbar">
            <NavLink to="/" element={ HomePage } className="home">
                <img className="homebtn" src={ homebtn } alt="Back to home page" />
            </NavLink>
            <ul>
                <li>Mood Boosts
                    <ul className="dropdown">
                        <li><NavLink to="/breathing" element={ BreathingPage }>Breathing Exercies</NavLink></li>
                        <li><NavLink to="/quote" element={ QuotePage }>Inspirational Quotes</NavLink></li>
                        <li><NavLink to="/joke" element={ JokePage }>Joke Generator</NavLink></li>
                    </ul>
                </li>    
            </ul>
            <button className="login">Login/Register</button> 
        </nav>
    )
}

export default NavBar;