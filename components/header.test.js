import { render } from 'react-testing-library';
import Header from './header';

describe('Header', () => {
  it('should render', () => {
    const container = render(<Header>Something here</Header>);
    expect(container).toMatchSnapshot();
  });
});
