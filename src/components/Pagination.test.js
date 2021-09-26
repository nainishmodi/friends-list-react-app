import { mount } from 'enzyme';
import Pagination from './Pagination';

const mockItems = [
    {
        "id": 1,
        "friendName": "Mahendra Singh Dhoni",
        "isFavorite": true
    },
    {
        "id": 2,
        "friendName": "ABD",
        "isFavorite": true
    },
    {
        "id": 3,
        "friendName": "Virat Kohli",
        "isFavorite": false
    },
    {
        "id": 4,
        "friendName": "Rohit Shama",
        "isFavorite": false
    },
    {
        "id": 5,
        "friendName": "Sourav Ganguly",
        "isFavorite": false
    }
];

//mock fn that need to pass as props
const onChangePage = jest.fn();

describe('Friends List App shared component testing', () => {
  test('should be implement as a shared component', () => {
    const wrapper = mount( <Pagination items={mockItems} onChangePage={onChangePage} /> );
    expect(wrapper.exists('.pagination')).toBeTruthy();
    expect(onChangePage).toHaveBeenCalled();
    //Unmounting component
    wrapper.unmount();
  });
});