import { render, fireEvent, screen } from '@testing-library/react';
import PostItem from '../components/posts/PostItem';
import renderer from 'react-test-renderer';

test('Counter likes for post item', () => {
  it('should counter likes', () => {
    const post = { text: 'Hej med dig' };
    render(<PostItem post={post} />);

    const counter = screen.getByTestId('text');
    const like = screen.getByTestId('like');

    fireEvent.click(like);
    expect(counter).toHaveTextContent('1');
  });

  it('should counter unlike', () => {
    render(<PostItem post={post} />);

    const counter = screen.getByTestId('text');
    const unlike = screen.getByTestId('unlike');

    fireEvent.click(unlike);
    expect(counter).toHaveTextContent('');
  });
});

describe('Counter Snapshot', () => {
  it('should matches DOM Snapshot', () => {
    const tree = renderer.create(<PostItem />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
