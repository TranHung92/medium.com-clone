import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { routerReducer, routerStateReducer } from 'react-router-redux';
import auth from './auth';
import stories from './stories';
import comments from './comments'

const rootReducer = combineReducers({
	stories,
	routerReducer,
	form,
	auth,
	comments
})

export default rootReducer