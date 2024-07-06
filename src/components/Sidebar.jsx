import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('/')
  const [isMinimized, setIsMinimized] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null) // Reference to the dropdown element

  const handleLinkClick = (path) => {
    setActiveLink(path)
  }

  const toggleSidebar = () => {
    setIsMinimized(!isMinimized)
    if (!isMinimized) {
      setDropdownOpen(false)
    }
  }

  const toggleDropdown = (e) => {
    e.preventDefault()
    setDropdownOpen(!dropdownOpen)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <>
      <div className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${isMinimized ? 'sidebar-minimized' : ''}`} style={{ width: isMinimized ? '80px' : '280px', height: '100vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-3 mb-md-0">
          {!isMinimized && (
            <a href="/" className="d-flex align-items-center text-white text-decoration-none">
              <svg className="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
              <span className="fs-4">Sidebar</span>
            </a>
          )}
          <button className={`btn btn-dark ${isMinimized ? 'm-auto' : ''}`} onClick={toggleSidebar}>
            <FontAwesomeIcon icon='fa fa-bars' />
          </button>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${activeLink === '/' ? 'active' : ''} text-white`}
              onClick={() => handleLinkClick('/')}
            >
              <FontAwesomeIcon icon='fa fa-home' /> {!isMinimized && 'Home'}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about2"
              className={`nav-link ${activeLink === '/about2' ? 'active' : ''} text-white`}
              onClick={() => handleLinkClick('/about2')}
            >
              <FontAwesomeIcon icon='fa fa-city' /> {!isMinimized && 'About'}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/cat"
              className={`nav-link ${activeLink === '/cat' ? 'active' : ''} text-white`}
              onClick={() => handleLinkClick('/cat')}
            >
              <FontAwesomeIcon icon='fa-solid fa-cat' /> {!isMinimized && 'Cats'}
            </Link>
          </li>
          {/* Other menu items */}
        </ul>
        <hr />
        <div className={`dropup ${dropdownOpen && 'show'}`} ref={dropdownRef}>
          <a 
            href='#' 
            className={`d-flex align-items-center text-white text-decoration-none ${!isMinimized ? 'dropdown-toggle' : ''}`} 
            id="dropdownUser1" 
            onClick={isMinimized ? toggleDropdown : undefined}
            data-bs-toggle={!isMinimized ? 'dropdown' : undefined} 
            aria-expanded={dropdownOpen}
          >
            <img src="https://github.com/mdo.png" alt="User Icon" width="32" height="32" className={`rounded-circle ${isMinimized ? 'm-auto' : 'me-2'}`} />
            {!isMinimized && <strong>mdo</strong>}
          </a>
          <ul className={`dropdown-menu dropdown-menu-dark text-small shadow ${dropdownOpen && 'show'}`} aria-labelledby="dropdownUser1" data-bs-popper={isMinimized ? 'static' : undefined}>
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
