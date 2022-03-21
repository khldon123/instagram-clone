import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {storage} from "./config"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import "./uploadbtn.css"
import {db} from "./config"
import { Grid } from "@mui/material";





const Input = styled('input')({
    display: 'none',
});





export default function UploadButtons({userAuthed, caption, setCaption, setProgress}) {

    const [file, setFile] = useState()

    const handleChange = (e) => {
        const file = e.target.files[0]
        setFile(file)
    }
    const handleUpload = async () => {

        if (!caption) alert("Fill Every Field!")

        // create path in the firebase
        const storRef = ref(storage, `images/${file.name}`)
        // upload the file 
        const uploadTask = uploadBytesResumable(storRef, file)
        // this triggers on each upload change 
        uploadTask.on(
            "state_change",
            (snapshot) => {
                // getting the progress bar
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(prog)
            },
            (error) => {
                console.log(error.message)
            },
                () => {
                
                getDownloadURL(uploadTask.snapshot.ref)
                .then((downloadUrl => {
                    const collectionRef = collection(db, "posts");
                    console.log(userAuthed, caption, downloadUrl)
                    const payload = {
                        username:userAuthed.displayName,
                        content:caption,
                        imgUrl:downloadUrl,
                        createdAt:serverTimestamp()
                    }
                    addDoc(collectionRef, payload)
                    setCaption("")
                    setProgress(0)
                }))
            }
        )

    }
    return (
        <div className="upload_btn">




            <label htmlFor="icon-button-file">
                        <Input accept="image/*" id="icon-button-file" type="file" onChange={handleChange}/>
                        <IconButton color="primary" aria-label="upload picture" component="span">
                            <PhotoCamera />
                        </IconButton>
                        <Button variant="contained"onClick={handleUpload} sx={{marginRight:"10px"}} >Upload</Button>
            </label>
        </div>


    );
}