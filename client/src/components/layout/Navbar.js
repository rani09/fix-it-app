import React, { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import logo from './brand-logo.svg';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const authLinks = (
    <ul>
      <li>
        <NavLink to='/posts' onClick={() => setShowNavbar(!showNavbar)}>
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink to='/profiles' onClick={() => setShowNavbar(!showNavbar)}>
          Virksomheder
        </NavLink>
      </li>
      <li>
        <NavLink to='/dashboard' onClick={() => setShowNavbar(!showNavbar)}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <a
          onClick={e => {
            e.preventDefault();
            setShowNavbar(!showNavbar);
            logout();
          }}
          href='#!'
        >
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const gusetLinks = (
    <ul>
      <li>
        <NavLink to='/posts' onClick={() => setShowNavbar(!showNavbar)}>
          Posts
        </NavLink>
      </li>
      <li>
        <NavLink to='/profiles' onClick={() => setShowNavbar(!showNavbar)}>
          Virksomheder
        </NavLink>
      </li>
      <li>
        <NavLink to='/register' onClick={() => setShowNavbar(!showNavbar)}>
          Tilmeld dig
        </NavLink>
      </li>
      <li>
        <NavLink to='/login' onClick={() => setShowNavbar(!showNavbar)}>
          Log ind
        </NavLink>
      </li>
    </ul>
  );
  return (
    <div className='container'>
      <nav className='navbar'>
        <div className='nav-container'>
          <div className='logo'>
            <NavLink to='/'>
              <img src={logo} alt='fix-it' />
            </NavLink>
          </div>
          {showNavbar && <Fragment></Fragment> ? (
            <Fragment>
              <div className='menu-icon' onClick={handleShowNavbar}>
                <i className='fa-solid fa-xmark fa-2x'></i>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div className='menu-icon' onClick={handleShowNavbar}>
                <i className='fa-solid fa-bars fa-2x'></i>
              </div>
            </Fragment>
          )}

          <div className={`nav-elements ${showNavbar && 'active'}`}>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : gusetLinks}</Fragment>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
