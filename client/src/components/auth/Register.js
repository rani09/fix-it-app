import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  useEffect(() => {
    document.title = 'Tilmeld dig';
  }, []);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }
  return (
    <Fragment>
      <section className='flex-box'>
        <h1 className='large text-primary'>Tilmeld dig</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Opret 'en konto
        </p>
        <form className='form' onSubmit={e => onSubmit(e)}>
          <div className='form-group my-1'>
            <small className='form-text'>Indtast dit fuldnavn</small>
            <input
              type='text'
              placeholder='navn'
              name='name'
              value={name}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Angive en valid e-mail adresse</small>
            <input
              type='email'
              placeholder='e-mail adresse'
              name='email'
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Indtast en adgangskode</small>
            <input
              type='password'
              placeholder='adgangskode'
              name='password'
              value={password}
              onChange={e => onChange(e)}
            />
          </div>
          <div className='form-group my-1'>
            <small className='form-text'>Gentag adgangskode</small>
            <input
              type='password'
              placeholder='bekræfte adgangskode'
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
            />
          </div>
          <input type='submit' className='btn btn-success' value='Tilmeld' />
        </form>
        <p className='my-1'>
          Er du allerede bruger?
          <Link to='/login'> Log ind</Link>
        </p>
      </section>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
