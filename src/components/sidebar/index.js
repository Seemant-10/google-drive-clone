import React from 'react'
import SideBarItem from './SideBarItem'
import '../../styles/Sidebar.css'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';

const index = () => {
  return (
    <div className='sideBar'>
        <div className='sideBar_itemsContainer'>
            <SideBarItem icon = {(<HomeOutlinedIcon></HomeOutlinedIcon>)} label = {'Home'}></SideBarItem>
            <SideBarItem arrow icon = {(<InsertDriveFileIcon></InsertDriveFileIcon>)} label = {'My Drive'}></SideBarItem>
            <SideBarItem arrow icon = {(<DevicesIcon></DevicesIcon>)} label = {'Computers'}></SideBarItem>
            <SideBarItem icon = {(<PeopleAltIcon></PeopleAltIcon>)} label = {'Shared with me'}></SideBarItem>
            <SideBarItem icon = {(<ScheduleIcon></ScheduleIcon>)} label = {'Recent'}></SideBarItem>
            <SideBarItem icon = {(<StarBorderIcon></StarBorderIcon>)} label = {'Starred'}></SideBarItem>
            <SideBarItem icon = {(<ReportGmailerrorredIcon></ReportGmailerrorredIcon>)} label = {'Spam'}></SideBarItem>
            <SideBarItem icon = {(<DeleteOutlineIcon></DeleteOutlineIcon>)} label = {'Bin'}></SideBarItem>
            <SideBarItem icon = {(<CloudOutlinedIcon></CloudOutlinedIcon>)} label = {'Storage'}></SideBarItem>

        </div>
    </div>
  )
}

export default index