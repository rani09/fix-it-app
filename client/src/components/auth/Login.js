import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='flex-box'>
        <h1 className='large text-primary'>Log ind</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Log ind på din konto
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group my-1'>
            <small className='form-text'>Angiv en e-mail adresse</small>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
            
          </div>
          <div className='form-group'>
          <small className='form-text'>Adgangskode</small>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='6'
            />
          </div>
          <input type='submit' className='btn btn-success my-1' value='Log ind' />
        </form>
        <p className='my-1'>
          Har du ikke en konto? <Link to='/register'>Tilmeld dig</Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.prototypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
