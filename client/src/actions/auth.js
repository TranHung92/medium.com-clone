import axios from 'axios'
import { push } from 'react-router-redux';

import {
	AUTH_USER,
	AUTH_ERROR,
	UNAUTH_USER,
	ROOT_URL
} from './types';

export function signinUser({ username, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, { username, password })
			.then(response => {
				dispatch(authUser(response.data.user))
				localStorage.setItem('token', response.data.token);
				console.log('signin success');
			})
			.catch(() => dispatch(authError('Wrong Login Info')))
	}
}

export function signupUser({ username, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { username, password })
			.then(response => {
				dispatch(authUser(response.data.user));
				localStorage.setItem('token', response.data.token);
				console.log('signup success')
			})
			.catch(error => dispatch(authError(error.response.data.error)));
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function authUser(user) {
	localStorage.setItem('username', user.username);
	localStorage.setItem('userId', user._id);
	return {
		type: AUTH_USER,
		payload: user
	}
}

export function resetError() {
	return authError(null)
}

export function signoutUser() {
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	localStorage.removeItem('userId');
	return { type: UNAUTH_USER }
}