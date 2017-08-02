import axios from 'axios'
import {
	CREATE_COMMENT,
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