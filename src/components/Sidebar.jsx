import { useState  } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('/')

  const handleLinkClick = (path) => {
    setActiveLink(path);
  }

  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px', height: '100vh' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
          <span className="fs-4">Sidebar</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${activeLink === '/' ? 'active' : ''} text-white`}
              onClick={() => handleLinkClick('/')}
            >
              <FontAwesomeIcon icon='fas fa-home'/> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about2"
              className={`nav-link ${activeLink === '/about2' ? 'active' : ''} text-white`}
              onClick={() => handleLinkClick('/about2')}
            >
              <FontAwesomeIcon icon='fas fa-city'/> About
            </Link>
          </li>
          {/* Other menu items */}
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" />
            <strong>mdo</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Sidebar
