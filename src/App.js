import { doc, setDoc } from 'firebase/firestore';
import { Fragment, useState } from 'react';
import './App.css';
import { db } from './component/config';
import Header from "./component/Header"
import Posts from "./component/Posts"
import Upload from './component/Upload';

function App() {
  const [userAuthed, setUserAuthed] = useState("")

  return (
    <div className="app">

      <Header setuser={setUserAuthed} />

      {userAuthed ? (
        <Fragment>
          <Posts />
          <Upload userAuthed={userAuthed} />
        </Fragment>
      ) : <h2>please log in so you could post!</h2>}
      

      
    </div>
  );
}


export default App;
