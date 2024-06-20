import React from "react";
import ReactDOM from "react-dom";
import NavBar from '../src/components/NavBar.jsx'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <h1>This is from about.jsx file</h1>
    <NavBar />
  </React.StrictMode>,
)
