import React from 'react'
import '../../styles/SidebarItem.css'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const SideBarItem = ({arrow, icon, label}) => {
  return (
    <div className='sideBarItem'>
        <div className='sideBarItem_arrow'>
            {arrow && (<ArrowRightIcon></ArrowRightIcon>)}
        </div>
        <div className='sideBarItem_main'>
            {icon}
            <p>{label}</p>
        </div>
    </div>
  )
}

export default SideBarItem