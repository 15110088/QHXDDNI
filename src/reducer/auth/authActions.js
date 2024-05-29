import AsyncStorage from '@react-native-community/async-storage'
import { API_URL } from '../../config/utilities/config';
import { timeoutPromise } from '../../config/utilities/Tool';

export const AUTH_LOADING = 'AUTH_LOADING';
export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const EDIT_INFO = 'EDIT_INFO ';
export const UPLOAD_PROFILEPIC = 'UPLOAD_PROFILEPIC';
export const FORGET_PASSWORD = 'FORGET_PASSWORD';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const RESET_ERROR = 'RESET_ERROR';
export const LOADING_FRIST = 'LOADING_FRIST';


//import AskingExpoToken from '../../components/Notification/AskingNotiPermission';

//Create dataStorage
const saveDataToStorage = (name, data) => {
  AsyncStorage.setItem(
    name,
    JSON.stringify({
      data,
    }),
  );
};

export const SignUp = (name, email, password) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/register`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: SIGN_UP,
      });
    } catch (err) {
      throw err;
    }
  };
};



//Logout
export const LoadingFristAction = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_FRIST
    });
  };
};

//Login
export const LoginUser = (email, password,token) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
    const resData ={
        email:email,
       password:password,
       token:token
    }
      dispatch(setLogoutTimer(60 * 60 * 1000));
      dispatch({
        type: LOGIN,
        user: resData,
      });
    } catch (err) {
      throw err;
    }
  };
};



export const UploadProfilePic = (imageUri, filename, type) => {
  return async (dispatch, getState) => {
    dispatch({
      type: AUTH_LOADING,
    });
    const user = getState().auth.user;
    let formData = new FormData();
    // Infer the type of the image
    formData.append('profilePic', {
      uri: imageUri,
      name: filename,
      type,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/photo/${user.userid}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'auth-token': user.token,
          },
          method: 'PATCH',
          body: formData,
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }

      dispatch({
        type: UPLOAD_PROFILEPIC,
        profilePic: imageUri,
      });
    } catch (err) {
      throw err;
    }
  };
};

export const ForgetPassword = (email) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(`${API_URL}/user/reset_pw`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            email,
          }),
        }),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: FORGET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};
export const ResetPassword = (password, url) => {
  return async (dispatch) => {
    dispatch({
      type: AUTH_LOADING,
    });
    try {
      const response = await timeoutPromise(
        fetch(
          `${API_URL}/user/receive_new_password/${url.userid}/${url.token}`,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
              password,
            }),
          },
        ),
      );
      if (!response.ok) {
        const errorResData = await response.json();
        dispatch({
          type: AUTH_FAILURE,
        });
        throw new Error(errorResData.err);
      }
      dispatch({
        type: RESET_PASSWORD,
      });
    } catch (err) {
      throw err;
    }
  };
};

//Logout
export const LogoutAction = () => {
  return (dispatch) => {
    AsyncStorage.removeItem('user');
    dispatch({
      type: LOGOUT,
      user: {},
    });
  };
};

//Auto log out
let timer;
const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};
const setLogoutTimer = (expirationTime) => {
  return (dispatch) => {
    timer = setTimeout(async () => {
      await dispatch(Logout());
      alert('Logout section expired');
    }, expirationTime);
  };
};