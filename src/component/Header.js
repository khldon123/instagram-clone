import React, { useState, useEffect, Fragment } from 'react'
import "./header.css"
import Modal from '@mui/material/Modal';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {auth} from "./config"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile} from 'firebase/auth'
import { async } from '@firebase/util';
function getModalStyle() {

    return {
        position:"absolute",
        top:`50%`,
        left:`50%`,
        transform:"translate(-50%, -50%)",
        width:"300px",
        height:"170px",
        background:"white"
    }

}


function Header({setuser}) {
    const [openSignIn, setSignIn] = useState(false)
    const [openSignUp, setSignUp] = useState(false)
    const [user, setUser] = useState()
    const [username, setUsername] = useState()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const[modalStyle] = React.useState(getModalStyle)


    // handling opening and closing the modal
    const handleOpenSignIn = () => {
        setSignIn(true)
    }
    const handleCloseSignIn = () => {
        setSignIn(false)
    }
    
    const handleOpenSignUp = () => {
        setSignUp(true)
    }
    const handleCloseSignUp = () => {
        setSignUp(false)
    }


    // handling the authoration for the user

    const signUp = async () => {
        // check if the three fields are filled
        if(username && email && password) {

            try {
                // createemail for the user
                const res =  await createUserWithEmailAndPassword(auth, email, password)
                // update the displayName with the {username}
                await updateProfile(auth.currentUser, {
                    'displayName':username
                })  
                // remove the email and password and then close the modal
                setEmail("")
                setPassword("")
                setSignUp(false)
            } catch (e){
                alert(e.message)
            }

        } else { 
            alert("please Fill all the fields")
        }
    }

    const signIn = async () => {
        if(email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password)

                setEmail("")
                setPassword("")
                setSignIn(false)
            } catch(e) {
                alert(e.message)
            }
        } else {
            alert("Please Fill all The Fields")
        }
    }
    const handleSignOut = async () => {
        await signOut(auth)
    }
    
    useEffect( () => {
        onAuthStateChanged(auth, async (authUser) => {
            setUser(authUser)
            // this for updating the usedrAuthed property in the app comp
            setuser(authUser)  
        })
    }, [])
    

    return (
        <div className='header'>
            <img className='header_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" />
                <ul className='header_links'>
                    <Modal
                        open={openSignUp}
                        onClose={handleCloseSignUp}

                    >
                        <Box paddingX={2.1} paddingY={1} style={modalStyle} sx={{
                            display:"flex",
                            flexDirection:"column"
                        }}>
                            <img className='header_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" />
                            <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}  />
                            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button onClick={signUp} sx={{
                                color:"gray"
                            }}>Sign Up</Button>
                        </Box>
                    </Modal>


                    <Modal
                        open={openSignIn}
                        onClose={handleCloseSignIn}

                    >
                        <Box paddingX={2.1} paddingY={1} className="sign_in_modal" style={modalStyle} sx={{
                            display:"flex",
                            flexDirection:"column",
                        }}>
                            <img className='header_img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" alt="" />
                            <Input placeholder="Email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <Button onClick={signIn} sx={{
                                color:"gray"
                            }}>Sign In</Button>
                        </Box>
                    </Modal>
                    {
                    user ? (<li className='sign_in cursor_pointer' onClick={handleSignOut}>LOGOUT</li>) :
                        (
                            <Fragment>
                                <li className='sign_in cursor_pointer' onClick={handleOpenSignUp}>SIGN UP</li>
                                <li className='cursor_pointer' onClick={handleOpenSignIn}>SIGN IN</li>
                            </Fragment>
                        )
                    }

                </ul>
        </div>
    )
}

export default Header