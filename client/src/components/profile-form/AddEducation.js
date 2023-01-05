import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import { useNavigate } from 'react-router-dom';

const AddEducation = ({ addEducation }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const history = useNavigate();
  return (
    <Fragment>
      <section className='flex-box'>
        <h1 className='large text-primary'>Tilføj din uddannelse</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Tilføj enhver skole eller
          bootcamp, som du har deltaget i stillinger, som du har haft tidligere
        </p>
        <small>* = krævede felter</small>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addEducation(formData);
            history('/dashboard');
          }}
        >
          <div className='form-group my-1'>
            <small>Skole eller bootcamp</small>
            <input
              type='text'
              placeholder='* Skole eller bootcamp'
              name='school'
              value={school}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group my-1'>
            <small>Grad eller certifikat</small>
            <input
              type='text'
              placeholder='* Grad eller certifikat'
              name='degree'
              value={degree}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group my-1'>
            <small>Studieområde</small>
            <input
              type='text'
              placeholder='studieområde'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small>Dato fra</small>
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
            <small>Dato til</small>
            <input
              type='date'
              name='to'
              value={to}
              onChange={e => onChange(e)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className='form-group my-1'>
            <small>Beskrivelse af skole/bootcamp</small>
            <textarea
              name='description'
              value={description}
              onChange={e => onChange(e)}
              cols='30'
              rows='5'
              placeholder='beskrivelse'
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

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(AddEducation);
