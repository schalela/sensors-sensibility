import { render } from 'react-testing-library';
import Github from './github';

describe('Github', () => {
  it('should render', () => {
    const container = render(<Github />);
    expect(container).toMatchSnapshot();
  });
});
