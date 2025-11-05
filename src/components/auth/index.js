import React, { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../../firebase";

const Login = ({ onLogin }) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("userEmail", user.email);
        onLogin(user);
      } else {
        localStorage.removeItem("userEmail");
        onLogin(null);
      }
    });
    return () => unsubscribe();
  }, [onLogin]);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("userEmail", user.email);
      onLogin(user);
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Google Drive Clone</h2>
      <p>Login to access your files</p>
      <button
        onClick={handleLogin}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4285F4",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
