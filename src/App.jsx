// import Message from './Message'
// import ListGroup from './components/ListGroup'
// import AlertButton from './components/AlertButton'
// import AlertMessage from './components/AlertMessage'
// import NavBar from './components/NavBar'
// import { useState } from 'react'

// const App = () => {
//   const [alertVisible, setAlertVisibility] = useState(false)
//   return (
//     <>
//       <NavBar />
//       { alertVisible && 
//         <AlertMessage onClose={()=> setAlertVisibility(false)}>
//           This is a primary alert—check it out!
//         </AlertMessage>
//       }
//       <AlertButton color="primary" onClick={() => setAlertVisibility(true)}/>
//       <Message />
//       <ListGroup />
//     </>
//   )
// }

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import About from './About2'
import CityDetail from './views/City'
import Sidebar from './components/Sidebar'

const Layout = () => (
  <>
    <div className="d-flex flex-row">
      <Sidebar />
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about2" element={<About />} />
        <Route path="/city" element={<CityDetail />} />
      </Routes>
    </div>
  </>
)

const App = () => (
  <Router>
    <Routes>
      <Route path="/*" element={<Layout />} />
    </Routes>
  </Router>
)

export default App
