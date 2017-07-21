import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class Navbar extends Component {


	render() {
		return (
			<div>
					<div className='ui fluid six item menu'>
							<Link className='item' to='/'>Latest</Link>
							<Link className='item' to='/'>Popular</Link>	
							<Link className='item' to='/'>Technology</Link>
							<Link className='item' to='/'>Creativity</Link>
							<Link className='item' to='/'>Lifestyle</Link>
							<Link className='item' to='/'>Culture</Link>
					</div>
			</div>
		)
	}
}