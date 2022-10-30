import React, { useEffect, useState } from "react";
import { Button, Container, FormButton, Header, Input } from "semantic-ui-react";
import { signOut } from 'firebase/auth'
import { auth, db } from '../firebase.config'
import { useNavigate } from 'react-router-dom'
import { v4 } from 'uuid'
import { set, ref } from 'firebase/database'

function Home() {

  const [todo, setTodo] = useState("")

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate('/')
      }
    })
  }, [])

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/')
      })
      .catch((err) => {
        alert(err.message)
      })
  }

  // READ
  //ADD
  const writeToDatabase = () => {
    const uidd = v4()
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uid: uidd,
    })
    setTodo('')
  }
  //UPDATE
  //DELETE

  return (
    <>
      <Container text style={{ marginTop: "25px" }}>
        <Header>
          <Input
            type="text"
            placeholder="Add something .."
            value={todo}
            onChange={(e) =>
              setTodo(e.target.value)}
          /><br />

        </Header>

      </Container>
      <br />
      <Container>
        <div>
          <FormButton onClick={writeToDatabase}>Add Something</FormButton>
          <h2>Home page</h2>
          <Button primary onClick={handleSignOut} >Log out</Button>

        </div>
      </Container>
    </>
  )
}

export default Home;
