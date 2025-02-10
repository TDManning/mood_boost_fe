import "./NavBar.css";
import { LogOut, Menu } from "lucide-react";
import homebtn from "../icons/home.png";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user, setUser }) {
  const [username, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(sessionStorage.getItem("userId") || "Guest");
    }
  }, [user]);

  function handleLogout() {
    setUser(null);
    setUserName("Guest");
    sessionStorage.clear();
    console.log("User Logged Out");
  }

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <NavLink to="/" className="home">
          <img className="homebtn" src={homebtn} alt="Back to home page" />
        </NavLink>
        <ul className="nav-links">
          <li>
            <span className="mood-boosts-title">
              <Menu className="menu-icon" />
              Mood Boosts
            </span>
            <ul className="dropdown">
              <li>
                <NavLink to="/breathing" className="navbar_boosts breathing">
                  Breathing Exercises
                </NavLink>
              </li>
              <li>
                <NavLink to="/quote" className="navbar_boosts quote">
                  Inspirational Quotes
                </NavLink>
              </li>
              <li>
                <NavLink to="/joke" className="navbar_boosts joke">
                  Joke Generator
                </NavLink>
              </li>
              <li>
                <NavLink to="/user" className="navbar_boosts user">
                  User History
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
        <div className="auth-buttons">
          <button className="guest-user-btn" onClick={handleLogout}>
            🎭 New Guest User
          </button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

// Former code with Specific User Functionality Added

// import "./NavBar.css";
// import { LogOut, Menu } from "lucide-react";
// import homebtn from "../icons/home.png";
// import Modal from "../Modal/Modal";
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// function NavBar({ user, setUser }) {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [username, setUserName] = useState("");

//   useEffect(() => {
//     const pageContent = document.querySelector(".page-content");
//     if (modalOpen) {
//       pageContent.classList.add("blur");
//     } else {
//       pageContent.classList.remove("blur");
//     }
//   }, [modalOpen]);

//   // ✅ Automatically Assign a Guest User on Page Load
//   useEffect(() => {
//     const assignGuestUser = async () => {
//       if (!sessionStorage.getItem("userId")) {
//         console.log("Assigning guest user...");
//         try {
//           const response = await fetch("http://localhost:3000/api/v1/guest_user");

//           if (!response.ok) {
//             console.error("Failed to fetch guest user. Status:", response.status);
//             throw new Error("Guest user creation failed");
//           }

//           const data = await response.json();
//           sessionStorage.setItem("userId", data.guest_id);
//           setUser(data.guest_id);
//           setUserName("Guest");
//           console.log("✅ Guest user assigned:", data.guest_id);
//         } catch (error) {
//           console.error("❌ Error fetching guest user:", error);
//         }
//       } else {
//         setUser(sessionStorage.getItem("userId"));
//       }
//     };

//     assignGuestUser();
//   }, [setUser]);

//   function handleOpenModal() {
//     setModalOpen(true);
//   }

//   function handleCloseModal() {
//     setModalOpen(false);
//   }

//   function handleLogout() {
//     setUser(null);
//     setUserName("");
//     sessionStorage.clear();
//     console.log("User Logged Out");
//   }

//   function handleLoginSuccess(userId, userUserName) {
//     setUser(userId);
//     setUserName(userUserName);
//     sessionStorage.setItem("userId", userId);
//   }

//   return (
//     <div className="navbar-wrapper">
//       <nav className="navbar">
//         <NavLink to="/" className="home">
//           <img className="homebtn" src={homebtn} alt="Back to home page" />
//         </NavLink>

//         <ul className="nav-links">
//           <li>
//             <span className="mood-boosts-title">
//               <Menu className="menu-icon" />
//               Mood Boosts
//             </span>
//             <ul className="dropdown">
//               <li>
//                 <NavLink to="/breathing" className="navbar_boosts breathing">
//                   Breathing Exercises
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/quote" className="navbar_boosts quote">
//                   Inspirational Quotes
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/joke" className="navbar_boosts joke">
//                   Joke Generator
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink to="/user" className="navbar_boosts user">
//                   User History
//                 </NavLink>
//               </li>
//             </ul>
//           </li>
//         </ul>

//         {/* ✅ Always show Login/Register button for account switch */}
//         <div className="auth-buttons">
//           {user ? (
//             <>
//               <button className="logout" onClick={handleLogout}>
//                 <LogOut className="logout-icon" /> 🔄 New Guest User
//               </button>
//               <button className="login" onClick={handleOpenModal}>
        
//                 👤 Login/Register
//               </button>
//             </>
//           ) : (
//             <button className="login" onClick={handleOpenModal}>
//               👤 Login/Register
//             </button>
//           )
//           }
//         </div>
//       </nav>

//       <Modal
//         modalOpen={modalOpen}
//         onClose={handleCloseModal}
//         resetToSignIn={modalOpen}
//         onLoginSuccess={handleLoginSuccess}
//         user={user}
//         setUser={setUser}
//         setUserName={setUserName}
//       />
//     </div>
//   );
// }

// export default NavBar;

