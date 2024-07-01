import { useState } from 'react'
import AlertButton from "./components/AlertButton"
import AlertMessage from "./components/AlertMessage"
import Message from "./components/Message"

const About2 = () => {
  const [alertVisible, setAlertVisibility] = useState(false)
  return (
    <>
      <div className="d-flex flex-column align-items-center w-100">
        <Message message="This is the About page"/>
        { alertVisible && 
          <AlertMessage onClose={()=> setAlertVisibility(false)}>
            This is a primary alert—check it out!
          </AlertMessage>
        }
        <AlertButton color="primary" onClick={() => setAlertVisibility(true)}/>
      </div>
    </>
  )
}

export default About2