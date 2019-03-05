import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import env from '../../env'
import { Redirect } from 'react-router-dom'
import ErrorMessage from '../../helpers/ErrorMessage'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', password: '', error: false, logedIn: false, url: env.url + 'login' };
    
        this.handleChange = this.handleChange.bind(this);
        this.login = this.login.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name] : e.target.value });
     }

    login(event) {
        event.preventDefault();

        axios.post(this.state.url, 
            {
                name: this.state.name, 
                password: this.state.password
            })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                this.setState({logedIn: true});
            })
            .catch(() => {
                this.setState({error: true})
            });
    }

    render() {
        if (this.state.logedIn)
            return <Redirect to='/feed' />

        return (
            <div>
                <ErrorMessage  showError={this.state.error} message="Erro ao logar"/>
                <h1>Login</h1>
                <form onSubmit={this.login} noValidate autoComplete="off">
                    <TextField
                    id="standard-name"
                    label="Nome"
                    name="name"
                    onChange={this.handleChange}
                    value={this.state.name}
                    margin="normal"
                    />

                    <TextField
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={this.handleChange}
                    name="password"
                    value={this.state.password}
                    margin="normal"
                    />

                    <Button variant="contained" onClick={this.login} color="primary">
                        Login
                    </Button>
                </form>
            </div>
        )
    }
}

export default Login;
