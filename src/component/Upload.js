import React, {useState} from 'react'
import Caption from './Caption'
import Progress from './Progress'
import UploadButtons from './UploadButton'
import "./upload.css"
import { Box } from '@mui/system'

function Upload({userAuthed, setIsCaptioned}) {

    const [caption, setCaption] = useState("")
    const [progress, setProgress] = useState(0)


    return (
        <div className='upload'>
            <Caption caption={caption} setCaption={setCaption}/>
            <Box sx={{
                display: "flex",
                justifyContent: "center",
                
                marginTop:"10px"
            }}>
                <UploadButtons setIsCaptioned={setIsCaptioned} userAuthed={userAuthed} caption={caption} setCaption={setCaption} setProgress={setProgress}/>
                <Progress progValue={progress} />
            </Box>

        </div>
    )
}

export default Upload