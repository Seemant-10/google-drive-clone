import './App.css';
import driveLogo from './media/drive-logo.png';
import Header from './components/header'
import SideBar from './components/sidebar'
import FileList from './components/filesView/FileList';

const favicon = document.querySelector("link[rel='icon']");
if (favicon) {
  favicon.href = driveLogo;
}

function App() {
  return (
    <div className="App">
        <Header></Header>
        <div className='app_main'>
          <SideBar></SideBar>
          <FileList></FileList>
        </div>
        {/* auth = true*/}
        {/*  no auth = log in */}
    </div>
  );
} 

export default App;
