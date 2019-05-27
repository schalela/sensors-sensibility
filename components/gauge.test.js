import { render } from 'react-testing-library';
import Gauge from './gauge';

describe('Gauge', () => {
  it('should render', () => {
    const container = render(<Gauge
      icon={'/static/ambient_temperature.png'}
      startColor={'green'}
      endColor={'red'}
      maxValue={50}
      value={10}
    />);
    expect(container).toMatchSnapshot();
  });
});
