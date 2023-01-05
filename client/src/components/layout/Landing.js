import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <div className='landing-grid'>
      <h1 className='large'>Velkommen til Fix it</h1>
      <p className='lead w-7'>
        Vi kan hjælpe dig med at fikse de sværeste opgaver, som du kan stå
        overfor, hjemme hos dig selv. Tilmed dig nu og find det der kan hjælpe
        dig på vej til at færdiggøre dit projekt.
      </p>
      <div className='landing-item'>
        <Link to='/login' className='btn btn-white'>
          Log ind
        </Link>
        <Link to='/register' className='btn btn-white'>
          Tilmeld dig
        </Link>
        <div className='video my-8'>
          <p className='lead w-5'>
            Se videoen og få guide til, hvordan vores platform fungerer.
          </p>
          <Link className='btn btn-white' to='/'>
            <i className='fas fa-thin fa-circle-play'></i> Se Video
          </Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
