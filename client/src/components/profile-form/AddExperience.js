import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const history = useNavigate();
  return (
    <Fragment>
      <section className='flex-box'>
        <h1 className='large text-primary'>Tilføj erfaring</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Tilføj eventuelle
          erfaringer/arbejde, som du har haft tidligere
        </p>
        <small className='form-text'>* = krævede felter</small>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addExperience(formData);
            history('/dashboard');
          }}
        >
          <div className='form-group my-1'>
            <small className='form-text'>Job titel</small>
            <input
              type='text'
              placeholder='* Job titel'
              name='title'
              value={title}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Virksomhed/arbejde</small>
            <input
              type='text'
              placeholder='* virksomhed'
              name='company'
              value={company}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Beliggenhed</small>
            <input
              type='text'
              placeholder='beliggenhed'
              name='location'
              value={location}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Dato fra</small>
            <input
              type='date'
              name='from'
              value={from}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <p>
              <input
                type='checkbox'
                name='current'
                value={current}
                checked={current}
                onChange={e => {
                  setFormData({ ...formData, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              Nuværende arbejde
            </p>
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Dato til</small>
            <input
              type='date'
              name='to'
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Job beskrivelse</small>
            <textarea
              name='description'
              value={description}
              onChange={e => onChange(e)}
              cols='30'
              rows='5'
              placeholder='Job beskrivelse'
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' value='Gem' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Gå tilbage
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
