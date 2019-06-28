import {retrieveData,storeData} from "../utilities/localStorage";

export const fetchUsers = () => dispatch => {
  const users = retrieveData('users');
  dispatch({
    type: 'FETCH_USERS',
    data : users
  });
};
