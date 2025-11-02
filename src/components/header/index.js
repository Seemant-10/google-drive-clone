import React from 'react'
import '../../styles/Header.css'

import GDriveLogo from '../../media/drive-logo.png'
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import GeminiLogo from '../../media/Google-gemini-icon.svg.png'

const index = () => {
  return (
    <div className='header'>
        <div className="header_logo">
            <img src={GDriveLogo} alt=""></img>
            <span>Drive</span>
        </div>
        <div className="header_searchContainer">

            <div className="header_searchBar">
                <div>
                    <SearchIcon></SearchIcon>
                    <input type = 'text' placeholder='Search in Drive'></input>
                </div>
                <ExpandMoreIcon></ExpandMoreIcon>
            </div>

        </div>
        <div className="header_icons">
            <HelpOutlineIcon></HelpOutlineIcon>
            <SettingsIcon></SettingsIcon>
            <img src= {GeminiLogo} height="24"></img>
            <AppsRoundedIcon></AppsRoundedIcon>
            <img src="" alt=""/>
        </div> 
    </div>
  )
}

export default index