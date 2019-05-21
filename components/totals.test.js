import { render } from 'react-testing-library';
import Totals from './totals';

describe('Totals', () => {
  it('should render', () => {
    const container = render(<Totals>The totals</Totals>);
    expect(container).toMatchSnapshot();
  });
});
