import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';

const CreateProfile = ({ createProfile }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const history = useNavigate();
  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData);
    history('/dashboard');
  };
  return (
    <Fragment>
      <section className='flex-box'>
        <h1 className='large text-primary'>Opret din profil</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Lad os få nogle oplysninger for at få
          din profil til at skille sig ud
        </p>
        <small>* = krævede felter</small>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group my-1'>
            <small className='form-text'>
              Giv os en idé om, hvor du er i din karriere
            </small>
            <select name='status' value={status} onChange={e => onChange(e)}>
              <option value='0'>* Vælg status</option>
              <option value='Håndværker'>Håndværker</option>
              <option value='Bager'>Bager</option>
              <option value='Designer'>Designer</option>
              <option value='Software udvikler'>Software udvikler</option>
              <option value='Ingeniør'>Ingeniør</option>
              <option value='Læge'>Læge</option>
              <option value='Lærer'>Lærer</option>
              <option value='Andet'>Andet</option>
            </select>
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>
              Det kan være din egen virksomhed eller en du arbejder for
            </small>
            <input
              type='text'
              placeholder='virksomhed'
              name='company'
              value={company}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>
              Kan være din egen eller en virksomheds hjemmeside
            </small>
            <input
              type='text'
              placeholder='hjemmeside'
              name='website'
              value={website}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>
              By og stat foreslået (f.eks. København, Aalborg)
            </small>
            <input
              type='text'
              placeholder='beliggenhed'
              name='location'
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>
              Brug venligst kommaseparerede værdier (f.eks. Håndværker, tømmer,
              webudvikler, bager)
            </small>
            <input
              type='text'
              placeholder='* erfaringer'
              name='skills'
              value={skills}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Fortæl os lidt om dig selv</small>
            <textarea
              placeholder='en kort beskrivelse af dig selv'
              name='bio'
              value={bio}
              onChange={e => onChange(e)}
            ></textarea>
          </div>

          <div className='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              className='btn btn-light'
            >
              Tilføj sociale netværkslinks
            </button>
            <span>Valgfri</span>
          </div>
          {displaySocialInputs && (
            <Fragment>
              <div className='form-group social-input my-1'>
                <i className='fab fa-twitter fa-2x'></i>
                <input
                  type='text'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form-group social-input my-1'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form-group social-input my-1'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form-group social-input my-1'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={e => onChange(e)}
                />
              </div>

              <div className='form-group social-input my-1'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={e => onChange(e)}
                />
              </div>
            </Fragment>
          )}

          <input type='submit' className='btn btn-primary my-1' value='Gem' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Gå tilbage
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
