import axios from 'axios'

import {
	READ_STORY,
	CREATE_STORY,
	FETCH_STORIES,
	ROOT_URL
} from './types'

export function readStory(id) {
	const request = axios.get(`${ROOT_URL}/story/${id}`)
	return {
		type: READ_STORY,
		payload: request
	}
}

export function createStory(values, callback) {
	console.log('createStory')
	const request = axios.post(`${ROOT_URL}/new-story`, values).then(() => callback())
	return {
		type: CREATE_STORY,
		payload: request
	}
}

export function fetchStories() {
	const request = axios.get(`${ROOT_URL}/`)
	return {
		type: FETCH_STORIES,
		payload: request
	}
}
