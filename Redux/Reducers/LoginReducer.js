import {LOGIN_EMAIL} from '../Actions/LoginAction';

const initialState = {
  email: null,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_EMAIL: {
      return {
        ...state,
        email: action.payload,
      };
      break;
    }
    default: {
      return state;
    }
  }
};

export default LoginReducer;
