import React, { Component } from 'react';
import axios from 'axios';
import env from '../../src/env';
import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  state = {
    loading: true,
    isAuthenticated: false,
  }

  componentDidMount() {
    let params = {name: '', password: ''},
      token = JSON.parse(localStorage.getItem('user'));
    
    if (token)
      params = token.data;
    axios.post(env.url + 'validateUser', 
    {
      name: params.name, 
      password: params.password
    }).then(() => {
      this.setState({
        loading: false,
        isAuthenticated: true,
      });
    })
    .catch(() => {
      this.setState({
        loading: false,
        isAuthenticated: false
      })
    });
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>Carregando</div>;
    } else {
      return (
        <Route {...rest} render={props => (
          <div>
            {!this.state.isAuthenticated && <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />}
            <Component {...this.props} />
          </div>
          )}
        />
      )
    }
  }
}

export default PrivateRoute;