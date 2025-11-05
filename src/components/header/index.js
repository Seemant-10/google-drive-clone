import React, { useEffect, useState } from "react";
import "../../styles/Header.css";
import GDriveLogo from "../../media/drive-logo.png";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsRoundedIcon from "@mui/icons-material/AppsRounded";
import GeminiLogo from "../../media/Google-gemini-icon.svg.png";
import { auth, provider } from "../../firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const Header = ({ setUser }) => {
  const [user, setLocalUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setLocalUser(currentUser);
        setUser(currentUser);
        localStorage.setItem("userEmail", currentUser.email);
      } else {
        setLocalUser(null);
        setUser(null);
        localStorage.removeItem("userEmail");
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleLogin = async () => {
    try {
      // Force Google to show account picker every time
      provider.setCustomParameters({ prompt: "select_account" });

      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setLocalUser(user);
      setUser(user);
      localStorage.setItem("userEmail", user.email);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setLocalUser(null);
    setUser(null);
    localStorage.removeItem("userEmail");
    setShowMenu(false);
  };

  return (
    <div className="header">
      <div className="header_logo" title="Google Drive">
        <img src={GDriveLogo} alt="Drive Logo" />
        <span>Drive</span>
      </div>

      <div className="header_searchContainer">
        <div className="header_searchBar">
          <div>
            <SearchIcon />
            <input type="text" placeholder="Search in Drive" />
          </div>
          <ExpandMoreIcon />
        </div>
      </div>

      <div className="header_icons">
        <div className="header_icons_inner">
          <HelpOutlineIcon />
        </div>
        <div className="header_icons_inner">
          <SettingsIcon />
        </div>
        <div className="header_icons_inner_gemini">
          <img src={GeminiLogo} height="24" alt="Gemini" />
        </div>
        <div className="header_icons_inner">
          <AppsRoundedIcon />
        </div>

        {/* User profile / login control */}
        <div className="header_icons_inner" style={{ position: "relative" }}>
          {user ? (
            <>
              <img
                src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}`}
                alt="User"
                title={`${user.displayName} (${user.email})`}
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => setShowMenu((prev) => !prev)}
              />

              {showMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "45px",
                    right: "0",
                    background: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    borderRadius: "8px",
                    padding: "10px 0",
                    minWidth: "160px",
                    textAlign: "left",
                    zIndex: 1000,
                  }}
                >
                  <div
                    style={{
                      padding: "8px 16px",
                      borderBottom: "1px solid #eee",
                      fontSize: "14px",
                      color: "#333",
                    }}
                  >
                    <strong>{user.displayName}</strong>
                    <br />
                    <span style={{ fontSize: "12px", color: "#777" }}>
                      {user.email}
                    </span>
                  </div>

                  <div
                    onClick={handleLogout}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      color: "#d93025",
                      fontWeight: "500",
                    }}
                  >
                    Sign Out
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleLogin}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                cursor: "pointer",
                background: "#f0f0f0",
              }}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
