import React from 'react'
import CalenderLogo from '../../media/calendar_2020q4_2x.png'
import KeepNotes from '../../media/keep_2020q4v3_2x.png'
import Tasks from '../../media/tasks_2021_2x.png'
import Contacts from '../../media/contacts_2022_2x.png'
import AddIcon from '../../media/gm_add_black_24dp.png'
import '../../styles/rightSidebar.css'

const index = () => {
  return (
    <div className='rightSideBar'>
        <a href='https://calendar.google.com/calendar/u/0/r' target='_blank'>
            <div className='rightsidebar_inner'>
                <img src={CalenderLogo} ></img>
            </div>
        </a>
        <a href='https://keep.google.com/u/0/' target='_blank'>
            <div className='rightsidebar_inner'>
                <img src={KeepNotes}></img>
            </div>
        </a>
        <a href='https://tasks.google.com/u/0/tasks/list/~default' target='_blank'>
            <div className='rightsidebar_inner'>
                <img src={Tasks}></img>
            </div>
        </a>
        <a href='https://contacts.google.com/u/0/?hl=en_GB' target='_blank'>
            <div className='rightsidebar_inner'>
                <img src={Contacts}></img>
            </div>
        </a>
            <div className='rightsidebar_inner' style={{marginTop:"20px"}}>
                <img src={AddIcon}></img>
            </div>
    </div>
  )
}

export default index