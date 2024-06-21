import { useState } from 'react'
import AlertButton from "./components/AlertButton"
import AlertMessage from "./components/AlertMessage"

const About2 = () => {
  const [alertVisible, setAlertVisibility] = useState(false)
  return (
    <>
      { alertVisible && 
        <AlertMessage onClose={()=> setAlertVisibility(false)}>
            This is a primary alert—check it out!
        </AlertMessage>
      }
      <AlertButton color="primary" onClick={() => setAlertVisibility(true)}/>
    </>
  )
}

export default About2