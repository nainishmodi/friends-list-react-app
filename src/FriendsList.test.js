import { mount } from 'enzyme';
import FriendsList from './FriendsList';

describe('Friends List App', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = mount( <FriendsList /> );
  });

  afterAll(() => {
    wrapper.unmount();
  });

  test('should renders Friends List App controls.', () => {
    expect(wrapper.find('h4').text()).toBe('Friends List');
    expect(wrapper.exists('#friendName')).toBe(true);
    expect(wrapper.exists('.frd-list-view')).toBe(false);
  });

  test('should able to add new friends in to the list.', () => {
    const newFriendNameInput = wrapper.find("#friendName");
    const someFriendNames = ['John Doe ', 'Bruce Wayne ', 'Peter Parker ', 'Tony Starc ', 'James Cameroon '];

    someFriendNames.forEach(f => {
      newFriendNameInput.simulate("focus");
      newFriendNameInput.simulate("change", { target: { value: f } });
      newFriendNameInput.simulate('keypress', {key: 'Enter'});
    });

    expect(wrapper.exists('.frd-list-view')).toBe(true);
    const friendInfo = wrapper.find('#friendInfo');

    expect(friendInfo.at(0).text()).toBe('John Doe is your friend');
    expect(friendInfo.at(1).text()).toBe('Bruce Wayne is your friend');
    expect(friendInfo.at(2).text()).toBe('Peter Parker is your friend');
    expect(friendInfo.at(3).text()).toBe('Tony Starc is your friend');
  });

  // test('should able to make friends as favorite.', () => {
  //   const favoriteElm = wrapper.find('#actions').find('.uil-star').at(2);
  //   favoriteElm.simulate("click");
  //   const logSpy = jest.spyOn('markFriendAsFavorite');
  //   expect(logSpy).toBeCalled();
  // });
})
