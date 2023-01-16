import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='post'>
      <div className='post-header'>
        <img src={avatar} alt='' className='post-profile-image' />
        <div className='post-header-text'>
          <h3 className='post-name'>{name}</h3>
          <div className='post-date'>
            {status} {company && <span> hos {company}</span>}
            <br />
            {location && <span>{location}</span>}
          </div>
        </div>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          Se profil
        </Link>
      </div>
      <div className='post-body'>
        <ul className='tools-flex'>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index} className='text-primary tools-items'>
              <i className='fa fa-solid fa-circle-check'></i> {skill}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
