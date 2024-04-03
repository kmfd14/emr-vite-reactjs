import Message from './Message'
import ListGroup from './components/ListGroup'
import AlertButton from './components/AlertButton'
import AlertMessage from './components/AlertMessage'
import NavBar from './components/NavBar'
import { useState } from 'react'

function App() {
  const [alertVisible, setAlertVisibility] = useState(false)
  return (
    <>
      <NavBar />
      { alertVisible && 
        <AlertMessage onClose={()=> setAlertVisibility(false)}>
          This is a primary alert—check it out!
        </AlertMessage>
      }
      <AlertButton color="primary" onClick={() => setAlertVisibility(true)}/>
      <Message />
      <ListGroup />
    </>
  )
}

export default App
