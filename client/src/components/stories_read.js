import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Headroom from 'react-headroom';
import * as StoriesActions from '../actions';

import Header from './header';
import Navbar from './navbar';

class StoriesRead extends Component {
	componentDidMount() {
		window.scrollTo(0, 0)
		const { id } = this.props.match.params
		this.props.readStory(id)
	}

	render() {
		const { story } = this.props;
		//console.log(story)
		if(!story) {
			return <div>Loading...</div>;
		}
 
		return (
			<div>
					<Header />
				
				<div className='container'>
					<Link to='/'>Back to Index</Link>
					<h3>{story.title}</h3>
					<p>{story.content}</p>					
				</div>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
				<h1>hello</h1>
			</div>
		)
	}
}


function mapStateToProps({ posts }, ownProps) {
	console.log(posts)

	return { story: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, StoriesActions)(StoriesRead)