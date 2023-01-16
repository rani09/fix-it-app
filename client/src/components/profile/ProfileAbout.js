import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about bg-light p-2'>
      {bio && (
        <Fragment>
          <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
          <p>{bio}</p>

          <div className='line'></div>
        </Fragment>
      )}
      <h2 className='text-primary'>Færdigheder</h2>
      <div className='tools-flex f-flex'>
        {skills.map((skill, index) => (
          <div key={index} className='tools-items'>
            <i className='fa fa-solid fa-circle-check'></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
