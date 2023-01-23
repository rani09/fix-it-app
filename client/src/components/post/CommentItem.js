import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className='post'>
      <div className='post-header'>
        <Link to={`/profile/${user}`}>
          <img className='round-img' src={avatar} alt='' />
          <h3 className='post-name'>{name}</h3>
        </Link>
        <div className='post-header-text'>
          <h3 className='post-name'>{name}</h3>
          <p className='post-date'>
            Posted on <Moment format='DD/MM/YYYY'>{date}</Moment>
          </p>
        </div>
        <button className='settings-toggle' onClick={handleClick}>
          <i className='fa fa-ellipsis-vertical'></i>
        </button>
        {!auth.loading && user === auth.user._id && isOpen && (
          <div className='settings-menu'>
            <ul className='dropdown-content'>
              <button
                onClick={e => deleteComment(postId, _id)}
                className='like-options'
                type='button'
              >
                <i className='fa fa-trash-can'></i> Fjern post
              </button>
            </ul>
          </div>
        )}
      </div>
      <div className='post-body'>
        <p className='post-text'>{text}</p>
      </div>
    </div>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
