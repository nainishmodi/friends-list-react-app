import { mount } from 'enzyme';
import App from './App';

describe('Friends List App testing', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount( <App /> );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test('Renders Friends List App.', () => {
    wrapper = mount(<App />);
  });
})
