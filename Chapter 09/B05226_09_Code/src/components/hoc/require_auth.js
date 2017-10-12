import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom'
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };
    
    render() {
      if (!this.props.authenticated) {
        return <Redirect to="/"/>
      } else{
        return <ComposedComponent {...this.props} />
      }
    }
  }
  
  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }
  
  return connect(mapStateToProps)(Authentication);
}