// Navbar.jsx
import { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../Assets/images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Dp from '../../Assets/images/dp.jpg';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scroll, setScroll] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const navElement = document.querySelector('.nav-links7');
      const menuButton = document.querySelector('.mobile-menu-button7');
      
      if (mobileMenuOpen && navElement && 
          !navElement.contains(event.target) && 
          !menuButton.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isLoginPage = location.pathname === '/signin' || location.pathname === '/signup';
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userImageUrl');
    setDropdownOpen(false);
    navigate('/signin');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const scrollToSection = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar7 ${scroll ? 'navbar-scroll7' : ''} ${isHomePage ? 'navbar-home7' : 'navbar-other7'}`}>
      <div className="container7">
        <div className="navbar-content7">
          <Link to="/" className="logo7">
            <div className="logo-icon7">
              <img src={logo} alt="uniurbanestates" />
            </div>
            <span className="logo-text7">UniUrbanEstate</span>
          </Link>

          <div className={`mobile-menu-button7 ${mobileMenuOpen ? 'active7' : ''}`} onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className={`nav-links7 ${mobileMenuOpen ? 'show-mobile-menu7' : ''}`}>
            <div className="nav-center7">
              <Link to="/" className={`nav-item7 ${location.pathname === '/' ? 'active7' : ''}`}>
                <span className="nav-text7">Home</span>
              </Link>
              <a href="#about" className="nav-item7" onClick={() => scrollToSection('about')}>
                <Link to="/about" className="nav-text7">
                <span className="nav-text7">About</span>
                </Link>
              </a>
              <a href="Property-List" className="nav-item7" onClick={() => scrollToSection('Property-List')}>
                <span className="nav-text7">Properties</span>
              </a>
              {/* <a href="#faq" className="nav-item7" onClick={() => scrollToSection('faq')}>
                <span className="nav-text7">FAQ</span>
              </a> */}
              {/* <Link to="/contact" className={`nav-item7 ${location.pathname === '/contact' ? 'active7' : ''}`}>
                <span className="nav-text7">Contact</span>
              </Link> */}
            </div>

            <div className="nav-right7">
              {!isLoginPage && !isLoggedIn && (
                <div className="auth-buttons7">
                  <Link to="/signin" className="signin-btn7">Sign In</Link>
                  <Link to="/signup" className="signup-btn7">Sign Up</Link>
                </div>
              )}

              {isLoggedIn && (
                <div className="user-profile7">
                  <div className="user-avatar7" onClick={toggleDropdown}>
                    <img src={Dp} alt="User" />
                    <span className="user-status7"></span>
                    {scroll && <span className="user-name7">{localStorage.getItem('username')}</span>}
                  </div>
                  
                  <div className={`dropdown-menu7 ${dropdownOpen ? 'dropdown-active7' : ''}`}>
                    <div className="dropdown-header7">
                      <img src={Dp} alt="User" className="dropdown-avatar7" />
                      <div className="dropdown-user-info7">
                        <span className="dropdown-username7">{localStorage.getItem('username')}</span>
                        <span className="dropdown-email7">{localStorage.getItem('email')}</span>
                      </div>
                    </div>
                    <div className="dropdown-divider7"></div>
                    <ul className="dropdown-list7">
                      <li className="dropdown-item7" onClick={() => navigate('/dashboard')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="7" height="7"></rect>
                          <rect x="14" y="3" width="7" height="7"></rect>
                          <rect x="14" y="14" width="7" height="7"></rect>
                          <rect x="3" y="14" width="7" height="7"></rect>
                        </svg>
                        <span>Dashboard</span>
                      </li>
                      <li className="dropdown-item7" onClick={() => navigate('/profile')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <span>Profile</span>
                      </li>
                      <li className="dropdown-item7" onClick={() => navigate('/saved-posts')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Saved Properties</span>
                      </li>
                      <li className="dropdown-item7" onClick={() => navigate('/listed-properties')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                        <span>My Listings</span>
                      </li>
                      <div className="dropdown-divider7"></div>
                      <li className="dropdown-item7 logout-item7" onClick={handleLogout}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                          <polyline points="16 17 21 12 16 7"></polyline>
                          <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;