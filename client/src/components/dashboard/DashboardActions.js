import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-yellow'>
        <i className='fas fa-user-circle text-primary'></i> Rediger profil
      </Link>
      <Link to='/add-experience' className='btn btn-yellow'>
        <i className='fab fa-black-tie text-primary'></i> Tilføj erfaringer
      </Link>
      <Link to='/add-education' className='btn btn-yellow'>
        <i className='fas fa-graduation-cap text-primary'></i> Tilføj uddannelse
      </Link>
    </div>
  );
};

export default DashboardActions;
