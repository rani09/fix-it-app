import React from 'react';
import PropTypes from 'prop-types';

const ProfileTop = ({
  profile: {
    status,
    company,
    location,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className='post'>
      <div className='post-header'>
        <img className='post-profile-image' src={avatar} alt='' />
        <div className='post-header-text'>
          <h3 className='post-name'>{name}</h3>
          <p className='post-date'>
            {status} {company && <span>at {company}</span>}
            <br />
            {location && <span>{location}</span>}
          </p>
        </div>
      </div>
      <div className='post-body'>
        <div className='icons my-1'>
          {website && (
            <a href={website} target='_blank' rel='noopener noreferrer'>
              <i className='fas fa-globe fa-2x'></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
