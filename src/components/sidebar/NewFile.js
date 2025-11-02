import React from 'react'
import '../../styles/NewFile.css'
import AddIcon from '@mui/icons-material/Add';

const NewFile = () => {
  return (
    <div className='newFile'>
        <div className='newFile_container'>
            <AddIcon></AddIcon>
            <p>New</p>
        </div>
    </div>
  )
}

export default NewFile