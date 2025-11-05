import "./App.css";
import React, { useState, useEffect } from "react";
import driveLogo from "./media/drive-logo.png";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import FileList from "./components/filesView/FileList";
import NewFile from "./components/sidebar/NewFile";
import RightSideBar from "./components/rightSidebar";
import Login from "./components/auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const favicon = document.querySelector("link[rel='icon']");
if (favicon) {
  favicon.href = driveLogo;
}

function App() {
  const [reload, setReload] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Detect if a user is logged in or not
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </p>
    );

  return (
    <div className="App">
      {user ? (
        <>
          <Header user={user} setUser={setUser} />
          <div className="app_main">
            <div className="app_sidebar">
              <NewFile
                user={user}
                onUploadSuccess={() => setReload((r) => !r)}
              />
              <SideBar />
            </div>
            <FileList user={user} reload={reload} />
            <RightSideBar />
          </div>
        </>
      ) : (
        <Login onLogin={setUser} />
      )}
    </div>
  );
}

export default App;
