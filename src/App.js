import { useState } from "react";
import Pagination from './components/Pagination';
import Modal from "./components/Modal";
import "./App.css";
var friendObj, clonedData;

//Funtional component
const App = () => {
  //Get state from storage if page refresh
  let initialState = localStorage.getItem('myFriendsList');
  if(initialState) {
    initialState = JSON.parse(initialState);
    clonedData = [...initialState];
  }
  else initialState = [];
  //State for new friend name.
  const [newFriendName, setNewFriendName] = useState("");
  //State for list of friends.
  const [myFriendsList, setMyFriendsList] = useState(initialState);
  //State search friends from list.
  const [searchFriendTerm, setSearchFriendTerm] = useState("");
  //State for page that maintain the pagination.
  const [pageOfItems, setPageOfItems] = useState(initialState);
  //State for confirmation
  const [showConfirm, setShowConfirm] = useState(false);

  //Fn to handle new friend name
  const handleInput = (e) => {
    setNewFriendName(e.target.value);
  };

  //fn to search friend based on search term
  const searchFriend = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchFriendTerm(value);
    //Filtering names based on search term
    const searchResults = clonedData.filter(name => name.friendName.toLowerCase().includes(value));
    setMyFriendsList(searchResults);
  };
  
  //fn to search friend based on search term
  function saveStateToLocalStorage(data) {
    //Maintaining the original records
    clonedData = [...data];
    localStorage.setItem('myFriendsList', JSON.stringify(data));
  };

  //Fn to add new friend to the list.
  const addNewFriend = () => {
    //If empty then return
    if(newFriendName.trim().length < 2 ) return;
    let _myFriendsList = [...myFriendsList];
    //Checking if same name friend is already in the list
    const isAlreadyAdded = _myFriendsList.find(m => m.friendName.toLowerCase() === newFriendName.toLowerCase());
    if(isAlreadyAdded) return alert(`${newFriendName} is already in your friends list.`);
    //Payload to add new friend
    const newFriendNameDetails = {
      id: +new Date(),
      friendName: newFriendName,
      isFavorite: false
    };
    //Adding new friend to the list
    _myFriendsList.push(newFriendNameDetails);
    //Updating the state with latest freinds list
    setMyFriendsList(_myFriendsList);
    //Saving state to the local storage
    saveStateToLocalStorage(_myFriendsList);
    //Reset new friend input after 
    setNewFriendName("");
  };

  //Fn to delete friend from the records
  const deleteMyFriend = () => {
    const updatedFriendsList = [...myFriendsList];
    //Find the index of selected record for delete
    const index = updatedFriendsList.findIndex(f => f.id === friendObj.id);
    //Removing the entry from the array
    updatedFriendsList.splice(index, 1);
    //Closing the modal
    hideModal();
    //Updating friends list
    setMyFriendsList(updatedFriendsList);
    saveStateToLocalStorage(updatedFriendsList);
    alert(`${friendObj.friendName} is now deleted from your friends list.`);
    friendObj = {};
  };

  //Fn to mark friend as Favorite
  const markFriendAsFavorite = (id) => {
    let friendsList = [...myFriendsList];
    const index = friendsList.findIndex(f => f.id === id);
    friendsList[index].isFavorite = !friendsList[index].isFavorite;
    //Sorting friends list based favorite
    friendsList.sort((x, y) => y.isFavorite - x.isFavorite);
    setMyFriendsList(friendsList);
    saveStateToLocalStorage(friendsList);
  };

  //When page changes we will get updated list
  const onChangePage = (pageOfItems) => {
    // update state with new page of items
    setPageOfItems([...pageOfItems]);
  };

  //FN to confirm delete a frnd and we show modal from here
  const confirmDelete = (friend) => {
    friendObj = Object.assign({}, friend);
    setShowConfirm(true);
  };

  //Fn to Hide modal/popup
  const hideModal = () => {
    setShowConfirm(false);
  };

  return (
    <>
      <div className="friendList-box">
      <h4>Friends List</h4>
        {/* <div className="switch-area">
          <label className="switch">
            <input type="checkbox" id="togBtn" />
            <div className="slider round"></div>
          </label>
        </div> */}
        <input
          type="text"
          name="friendName"
          id="friendName"
          placeholder="Enter your friend's name"
          value={newFriendName}
          onChange={handleInput}
          autoComplete="off"
          onKeyPress={(event) => event.key === "Enter" && addNewFriend()}
        />
        <input
          type="text"
          name="searchFriend"
          id="searchFriend"
          placeholder="Search your friends from here name"
          value={searchFriendTerm}
          onChange={searchFriend}
          autoComplete="off"
        />
        {pageOfItems.map((f) => {
          return (
            <div key={f.id} className="frd-list-view">
              <div>
                <h5>{f.friendName}</h5>
                <small>is your friend</small>
              </div>
              <div>
                <i className={`uil uil-star ${f.isFavorite && 'fav-frd'}`} onClick={() => markFriendAsFavorite(f.id)}></i>
                <i className="uil uil-trash-alt" onClick={() => confirmDelete(f)}></i>
              </div>
            </div>
          )
        })}

        <Pagination key={myFriendsList.length} items={myFriendsList} onChangePage={onChangePage}/>

        {showConfirm && 
          <Modal hideModal={hideModal}>
              <>
                <p> Are you sure, you want to delete <strong> {friendObj && friendObj.friendName} </strong> as your friend? </p>
                <hr/>
                <div className="modal-footer">
                  <button type="button" className="primary" onClick={deleteMyFriend}>
                    Confirm
                  </button>
                  <button type="button" className="danger" onClick={hideModal}>
                    Close
                  </button>
                </div>
              </>
          </Modal>
        }
        {(pageOfItems.length == 0) && <p className="text-center">No friends found.</p>}
      </div>
    </>
  );
};

export default App;
