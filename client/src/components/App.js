import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Header from './header'
import Navbar from './navbar'
import StoriesShow from './stories_show'
import ModalAuth from './modal'

class App extends Component {
  renderPromo() {
    var messageStyle = {
      'background-image': 'url("https://images4.alphacoders.com/605/thumb-1920-60578.jpg")',
      'background-size': 'cover',
      'background-position': '50% 50%',
    }
    if (!this.props.authenticated) {
      return (
        <div className='row'>
          <div style={messageStyle} className="ui message">
            <h1>Hello, world!</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium est qui quia atque eaque itaque nisi, officiis deleniti molestiae maxime eligendi laborum, nam, neque repellendus vel temporibus similique, eveniet quibusdam!</p>
              <ModalAuth trigger={<h3 className='ui positive basic button'>Get Started</h3>}/>
          </div>
        </div>
      ) 
    }    
  }

  render() {
    return (
      <div>
        <Navbar />
        {this.renderPromo()}
        <StoriesShow />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default connect(mapStateToProps)(App)
