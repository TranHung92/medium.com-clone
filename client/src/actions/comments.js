import axios from 'axios'
import {
	CREATE_COMMENT,
	FETCH_COMMENTS,
	ROOT_URL
} from './types'

export function createComment(id, values) {
	console.log('create comment')
	const request = axios.post(`${ROOT_URL}/story/${id}/new-comment`, values)
	console.log('request', request)
	return {
		type: CREATE_COMMENT,
		payload: request
	}
}

// export function fetchComments(id) {
// 	return function(dispatch) {
// 		axios.get(`${ROOT_URL}/story/${id}/comments`)
// 			.then(res => dispatch(storyComments(res.data)))
// 	}
	
// }

// function storyComments(comments) {
// 	return {
// 		type: FETCH_COMMENTS,
// 		payload: comments
// 	}
// }

export function fetchComments(id) {
	const request = axios.get(`${ROOT_URL}/story/${id}/comments`)
	return {
		type: FETCH_COMMENTS,
		payload: request
	}
}