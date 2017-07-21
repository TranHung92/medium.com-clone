import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer, routerStateReducer } from 'react-router-redux';
import auth from './auth';
import StoryReducer from './stories'

const rootReducer = combineReducers({
	posts: StoryReducer,
	routerReducer,
	form,
	auth
})

export default rootReducer