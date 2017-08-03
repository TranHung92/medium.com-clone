import { FETCH_STORIES, READ_STORY } from '../actions/types';
import _ from 'lodash';

import {
	FETCH_COMMENTS
} from '../actions/types'

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_COMMENTS:
			return _.mapKeys(action.payload.data, '_id');
		default:
			return state;
	}
}