import { FETCH_STORIES, READ_STORY } from '../actions/types';
import _ from 'lodash';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_STORIES:
			return _.mapKeys(action.payload.data, '_id');
		case READ_STORY:
			return { ...state, [action.payload.data._id]: action.payload.data };
		default:
			return state;
	}
}