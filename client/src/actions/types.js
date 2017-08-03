export const FETCH_STORIES = 'FETCH_STORIES'
export const READ_STORY = 'READ_STORY'
export const CREATE_STORY = 'CREATE_STORY'
export const DELETE_STORY = 'DELETE_STORY'
export const CREATE_COMMENT = 'CREATE_COMMENT'
export const FETCH_COMMENTS = 'FETCH_COMMENTS'

export const AUTH_USER = 'AUTH_USER'
export const UNAUTH_USER = 'UNAUTH_USER'
export const AUTH_ERROR = 'AUTH_ERROR'

const isDev = process.env.NODE_ENV === 'development'

export const ROOT_URL = isDev ? 
	'http://localhost:6060/api' : 
	'https://story-teller.herokuapp.com/api'
