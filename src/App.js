import './App.css';
import driveLogo from './media/drive-logo.png';
import Header from './components/header'
import SideBar from './components/sidebar'

const favicon = document.querySelector("link[rel='icon']");
if (favicon) {
  favicon.href = driveLogo;
}

function App() {
  return (
    <div className="App">
        <Header></Header>
        <SideBar></SideBar>
        {/* auth = true*/}
        {/*  no auth = log in */}
    </div>
  );
} 

export default App;
