import { mount } from 'enzyme';
import FriendsList from './FriendsList';

describe('Friends List App', () => {
  let wrapper;

  // add a div with #modal-area id to the global body
  const modalRoot = global.document.createElement("div");
  modalRoot.setAttribute("id", "modal-area");
  const body = global.document.querySelector("body");
  body.appendChild(modalRoot);

  //mock fn of window alert
  window.alert = jest.fn();

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

  test('should able to make friends as favorite.', () => {
    const favoriteBtnElm = wrapper.find('#actions').find('.uil-star').at(2);
    favoriteBtnElm.simulate("click");
    expect(wrapper.find('#friendInfo').at(0).text()).toBe('Peter Parker is your friend');
  });

  test('should able delete friends from the friends list.', () => {
    expect(wrapper.exists('.modal-title')).toBe(false);
    const deleteBtnElm = wrapper.find('#actions').find('.uil-trash-alt').at(2);
    deleteBtnElm.simulate("click");
    expect(wrapper.find('.modal-title').text()).toBe(' Are you sure, you want to delete Bruce Wayne  as your friend? ');
    expect(wrapper.find('.primary').simulate('click'));
    expect(wrapper.exists('.modal-title')).toBe(false);
    expect(window.alert).toBeCalledWith("Bruce Wayne  is now deleted from your friends list.");
  });
})
