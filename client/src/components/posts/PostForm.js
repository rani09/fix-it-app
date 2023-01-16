import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import Modal from 'react-modal';

const PostForm = ({ addPost }) => {
  const options = [
    'Af- og udtrækker',
    'Byggepladshegn',
    'Hæftepistol og -hammer',
    'Høvl',
    'Opmærkning',
    'Sav',
    'Skruetvinge',
    'Tommestok',
    'File',
    'Glasløfter',
    'Gipsværktøj',
    'Fuge- og skrumpistol',
    'Hammer',
    'Nøgleværktøj',
    'Palleløfter',
    'Nedstryger',
    'Polsøger',
    'Stige',
    'Værktøjskasse og opbevaring',
  ];
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({ title: '', text: '' });
  const [file, setFile] = useState(null);
  const { title, text } = formData;
  const onChange = e =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };
  const handleOptionChange = e => {
    const selected = selectedOptions.slice();
    if (e.target.checked) {
      selected.push(e.target.value);
    } else {
      selected.splice(selected.indexOf(e.target.value), 1);
    }
    setSelectedOptions(selected);
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formDataPost = new FormData();
    formDataPost.append('title', title);
    formDataPost.append('text', text);
    formDataPost.append('tools', selectedOptions);
    formDataPost.append('imageUrl', file);
    addPost(formDataPost);
  };
  return (
    <Fragment>
      <div className='post-form post'>
        <form
          className='form my-1'
          id='create-post-form'
          onSubmit={e => onSubmit(e)}
        >
          <div class='input-group'>
            <label>Title</label>
            <input
              type='text'
              name='title'
              placeholder='Titel på post'
              className='text-area-title'
              value={title}
              onChange={e => onChange(e)}
            />
          </div>
          <div class='input-group'>
          <label>Beskrivelse</label>
          <textarea
            type='text'
            name='text'
            cols='30'
            rows='3'
            className='text-area'
            placeholder='Beskrivelse af posten'
            value={text}
            onChange={e => onChange(e)}
            required
          ></textarea>
          </div>
          <div className='m'>
            {selectedOptions.length === 0 ? (
              <p>Værktøjer valgt: 0</p>
            ) : (
              <p>Værktøjer valgt: {selectedOptions.join(', ')}</p>
            )}
          </div>
          <button
            className='btn'
            onClick={e => {
              setShowModal(true);
              e.preventDefault();
            }}
          >
            <i class='fa fa-screwdriver-wrench'></i> Tilføj værktøjer
          </button>
          <Modal
            isOpen={showModal}
            onRequestClose={() => setShowModal(false)}
            ariaHideApp={false}
            className='modal'
            overlayClassName='modal-overlay'
            style={{ content: { width: '500px', height: 'auto' } }}
          >
            <h2>
              <i class='fa fa-screwdriver-wrench'></i> Vælg værktøjer
            </h2>
            <div className='option-flex'>
              {options.map(option => (
                <div key={option} className='option-item'>
                  <input
                    type='checkbox'
                    value={option}
                    onChange={handleOptionChange}
                    checked={selectedOptions.includes(option)}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
            <hr />
            <div className='option-flex'>
              <button
                className='btn btn-danger option-item'
                onClick={() => setShowModal(false)}
              >
                Luk
              </button>
              <button
                className='btn btn-success option-item'
                onClick={() => setShowModal(false)}
              >
                Gem
              </button>
            </div>
          </Modal>
          <div className='p-1'></div>
          <div className='input_container'>
            <input
              type='file'
              name='imageUrl'
              id='imageUrl'
              onChange={e => handleFileChange(e)}
            />
          </div>

          <input
            type='submit'
            className='btn btn-success my-1'
            value='Opret indlæg'
          />
        </form>
      </div>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
