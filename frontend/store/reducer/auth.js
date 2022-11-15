import {LOGIN, SIGNUP} from '../action/auth';

const initailValue = {
  userId: null,
  token: null,
};

export default (state = initailValue, action) => {
    console.log(action.userData);
  switch (action.type) {
    case SIGNUP:
      // console.log(action);
      return {
        token: action.userData.token,
        userId: action.userData.userId,
      };
    case LOGIN:
      return {
        token: action.userData.token,
        userId: action.userData.userId,
      };
    default:
      return state;
  }
};
