import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <div className='post-form flex-box-post'>
      <div className='post-group my-1'>
        <div className='btn'>
          <i className='fa-solid fa-pencil'></i> Opret et indlæg
        </div>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='skriv et indlæg'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        ></textarea>
        <input
          type='submit'
          className='btn btn-success my-1'
          value='Opret indlæg'
        />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
