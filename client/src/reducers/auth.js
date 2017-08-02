import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR
} from '../actions/types'

const loggedInUser = {
	username : localStorage.getItem('username'),
	_id : localStorage.getItem('userId')
}

export default function(state = {}, action) {
	switch (action.type) {
		case AUTH_USER:
			return { ...state, error: '', authenticated: true, user: action.payload ? action.payload : loggedInUser };
		case UNAUTH_USER:
			return { ...state, authenticated: false, user: null };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		default:
			return state
	}	
}