import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import Like from '../../images/like.png';
import Liked from '../../images/liked.png';
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    title,
    tools,
    text,
    imageUrl,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
  },
  showActions,
}) => {
  const [isVideo, setIsVideo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    fetch(imageUrl)
      .then(response => {
        const contentType = response.headers.get('content-type');
        if (contentType.includes('video')) {
          setIsVideo(true);
        } else if (contentType.includes('image')) {
          setIsVideo(false);
        } else {
          throw new Error('Invalid media type');
        }
      })
      .catch(() => {
        setIsVideo(null);
      });
  }, [imageUrl]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLike = () => {
    if (liked) {
      removeLike(_id);
    } else {
      addLike(_id);
    }
    setLiked(!liked);
  };

  return (
    <div className='post'>
      <div className='post-header'>
        <Link to={`/profile/${user}`}>
          <img src={avatar} alt='' className='post-profile-image' />
        </Link>
        <div className='post-header-text'>
          <h3 className='post-name'>{name}</h3>
          <p className='post-date'>
            Udgivet den <Moment format='DD-MM-YYYY'>{date}</Moment>
          </p>
        </div>
        <button className='settings-toggle' onClick={handleClick}>
          <i class='fa fa-ellipsis-vertical'></i>
        </button>
        {!auth.loading && user === auth.user._id && isOpen && (
          <div className='settings-menu'>
            <ul className='dropdown-content'>
              <li>
                <a onClick={e => deletePost(_id)} type='button'>
                  <i class='fa fa-trash-can'></i> Fjern oplæg
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className='post-body'>
        <h2>{title}</h2>
        <p className='post-text'>{text}</p>
        {isVideo ? (
          <video className='video-control' controls>
            <source src={imageUrl} type='video/mp4' />
          </video>
        ) : (
          <img src={imageUrl} alt='Post image' className='post-image' />
        )}
        <div>
          <hr />
          <h4>Værktøjer</h4>
          <ul className='tools-flex'>
            {tools.slice(0, 4).map((tool, index) => (
              <li key={index} className='text-primary tools-items'>
                <i className='fa fa-solid fa-circle-check'></i> {tool}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='post-footer'>
        {showActions && (
          <Fragment>
            <div className='post-button'>
              <div className='like-flex'>
                <button className='like-options' onClick={handleLike}>
                  {liked ? (
                    <img src={Liked} className='like' />
                  ) : (
                    <img src={Like} className='like' />
                  )}
                </button>
                {likes.length > 0 && (
                  <span data-testid='counter' className='comment-count'>
                    {likes.length}
                  </span>
                )}
              </div>
            </div>
            <Link to={`/posts/${_id}`} className='post-button comments-button '>
              <i className='fa fa-comment'></i> Kommentarer{' '}
              {comments.length > 0 && (
                <span className='comment-count'>{comments.length}</span>
              )}
            </Link>
            <button className='post-button share-button'>
              <i className='fa fa-share'></i> Del
            </button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
