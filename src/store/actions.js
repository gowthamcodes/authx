import axios from 'axios';
import qs from 'qs';
import { BASE_URL, API } from '../utils/Config';

const Login = (username, password) => {
  return async dispatch => {
    if (username && password) {
      try {
        const response = await axios({
          url: BASE_URL + API.token,
          method: 'POST',
          data: qs.stringify({
            grant_type: 'password',
            UserName: `abs_${username}`,
            Password: password,
          }),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        });

        if (response && response.data) {
          dispatch({
            type: 'LOGIN',
            payload: {
              authToken: response.data.access_token,
              employeeId: response.data.employeeLoginId,
              businessUnitId: response.data.businessUnitId,
            },
          });
        }
      } catch (error) {
        console.log(error.response.request._response);
      }
    }
  };
};

const Logout = () => {
  return async dispatch => {
    dispatch({
      type: 'LOGOUT',
    });
  };
};

export { Login, Logout };
