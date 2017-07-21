import React, { Component } from 'react';
import { connect } from 'react-redux';
import {fetchStories} from '../actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';

class StoriesShow extends Component {
  componentDidMount() {
  	this.props.fetchStories();
  }

  renderStories() {
		return _.map(this.props.stories, story => {
	  	return (
	      <div key={story._id} className='container'>
	        <div className="equal-height-container">
	          <Link className="first" to={`/story/${story._id}`}></Link>
	          <div className="second">
	            <div className="second-a">
	              <Link to={`/story/${story._id}`} className="second-a-1">
	                <div>
	                  <h4>{story.title}</h4>
	                </div>
	              </Link>
	              <div className="second-a-2">
	                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora corporis, harum, quibusdam </p>
	              </div>
	            </div>
	            <div className="second-b">
	              <h5>BBBBB</h5>
	              <p>sascas</p>
	            </div>
	          </div>
	        </div>	
	      </div>
	  	)
	  })
  }

  render() {
  	return (
  		<div className="ui two column centered grid">
  			{this.renderStories()}
  		</div>
		)
 	}
}

function mapStateToProps(state) {
	console.log(state)
	return { stories: state.posts };
}
export default connect(mapStateToProps, {fetchStories})(StoriesShow)
