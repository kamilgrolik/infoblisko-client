import Router from 'next/router';
import Cookie from 'js-cookie';
import axios from 'axios';
import { UsersPermissionsRegisterInput } from '../common/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

interface LoginData {
  identifier: string;
  password: string;
}

export const registerUser = (registerData: UsersPermissionsRegisterInput) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return;
  }
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/register`, registerData)
      .then(res => {
        //set token response from Strapi for server validation
        Cookie.set('token', res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push('/');
      })
      .catch(error => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const login = (loginData: LoginData) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return;
  }

  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/auth/local/`, loginData)
      .then(res => {
        //set token response from Strapi for server validation
        Cookie.set('token', res.data.jwt);

        //resolve the promise to set loading to false in SignUp form
        resolve(res);
        //redirect back to home page for restaurance selection
        Router.push('/');
      })
      .catch(error => {
        //reject the promise and pass the error object back to the form
        reject(error);
      });
  });
};

export const logout = () => {
  //remove token and user cookie
  Cookie.remove('token');
  delete window.__user;
  // sync logout between multiple windows
  window.localStorage.setItem('logout', Date.now());
  //redirect to the home page
  Router.push('/');
};
