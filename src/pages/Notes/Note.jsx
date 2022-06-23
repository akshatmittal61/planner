import React from 'react'
import MaterialIcons from '../../components/MaterialIcons'

const Note = ({title,content,trashed,archived}) => {
  return (
    <div className='note'>
        <div className='note-title'>
            <span>{title}</span>
        </div>
        <div className='note-content'>
            {content}
        </div>
        <div className='note-buttons'>
            {
                !trashed&&<button>
                    <MaterialIcons>delete</MaterialIcons>
                </button>
            }
        </div>
    </div>
  )
}

export default Note