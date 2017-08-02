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
				dispatch(authUser(username))
				localStorage.setItem('token', response.data.token);
				console.log('signin success')
			})
			.catch(() => dispatch(authError('Wrong Login Info')))
	}
}

export function signupUser({ username, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { username, password })
			.then(response => {
				dispatch(authUser(username));
				localStorage.setItem('token', response.data.token);
				console.log('signup success', response)
			})
			.catch(response => dispatch(authError(response.data.error)));
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function authUser(username) {
	return {
		type: AUTH_USER,
		payload: username
	}
}

export function resetError() {
	return authError(null)
}

export function signoutUser() {
	localStorage.removeItem('token');
	return { type: UNAUTH_USER }
}